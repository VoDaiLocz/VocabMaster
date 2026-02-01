// ============================================
// Deck Store - Zustand State Management
// ============================================

import { create } from 'zustand'
import type { Deck, WordWithProgress } from '@/types'

// ============================================
// Types
// ============================================

interface NewWord {
    deck_id: number
    term: string
    definition: string
    example?: string
    phonetic?: string
}

export interface ImportWord {
    term: string
    definition: string
    example?: string
    phonetic?: string
}

// Progress callback type for batch operations
export type ImportProgressCallback = (progress: { current: number; total: number }) => void

interface DeckState {
    decks: Deck[]
    currentDeck: Deck | null
    words: WordWithProgress[]
    loading: boolean
}

interface DeckActions {
    fetchDecks: () => Promise<void>
    fetchDeck: (id: number) => Promise<void>
    createDeck: (name: string, description: string, color: string, icon: string) => Promise<number>
    deleteDeck: (id: number) => Promise<void>
    fetchWords: (deckId: number) => Promise<void>
    createWord: (word: NewWord) => Promise<void>
    importWords: (deckId: number, words: ImportWord[], onProgress?: ImportProgressCallback) => Promise<number>
    importWordsWithDeduplication: (deckId: number, words: ImportWord[], onProgress?: ImportProgressCallback) => Promise<{ inserted: number; skipped: number }>
    getExistingTerms: (deckId: number) => Promise<Set<string>>
    selectDeck: (deckId: number | null) => void
    deleteWord: (wordId: number, deckId: number) => Promise<void>
}

type DeckStore = DeckState & DeckActions

// ============================================
// Initial State
// ============================================

const initialState: DeckState = {
    decks: [],
    currentDeck: null,
    words: [],
    loading: false,
}

// ============================================
// Store
// ============================================

export const useDeckStore = create<DeckStore>((set, get) => ({
    ...initialState,

    fetchDecks: async () => {
        try {
            const decks = await window.electronAPI.dbQuery<Deck>(
                'SELECT * FROM decks ORDER BY id DESC'
            )
            set({ decks })
        } catch (e) {
            console.error('fetchDecks error:', e)
            set({ decks: [] })
        }
    },

    fetchDeck: async (id: number) => {
        try {
            const deck = await window.electronAPI.dbGet<Deck>(
                'SELECT * FROM decks WHERE id = ?',
                [id]
            )
            set({ currentDeck: deck })
        } catch (e) {
            console.error('fetchDeck error:', e)
            set({ currentDeck: null })
        }
    },

    createDeck: async (name, description, color, icon) => {
        try {
            const result = await window.electronAPI.dbRun(
                'INSERT INTO decks (name, description, color, icon) VALUES (?, ?, ?, ?)',
                [name, description, color, icon]
            )
            await get().fetchDecks()
            return result.lastId
        } catch (e) {
            console.error('createDeck error:', e)
            return 0
        }
    },

    deleteDeck: async (id: number) => {
        try {
            // Delete in correct order: progress -> words -> deck
            await window.electronAPI.dbRun(
                'DELETE FROM progress WHERE word_id IN (SELECT id FROM words WHERE deck_id = ?)',
                [id]
            )
            await window.electronAPI.dbRun(
                'DELETE FROM words WHERE deck_id = ?',
                [id]
            )
            await window.electronAPI.dbRun(
                'DELETE FROM decks WHERE id = ?',
                [id]
            )

            set({ currentDeck: null, words: [] })
            await get().fetchDecks()
        } catch (e) {
            console.error('deleteDeck error:', e)
        }
    },

    fetchWords: async (deckId: number) => {
        set({ loading: true })
        try {
            const words = await window.electronAPI.dbQuery<WordWithProgress>(`
        SELECT w.*, p.ease_factor, p.interval, p.repetitions, 
               p.next_review, p.status, p.last_reviewed
        FROM words w 
        LEFT JOIN progress p ON w.id = p.word_id
        WHERE w.deck_id = ? 
        ORDER BY w.id
      `, [deckId])
            set({ words, loading: false })
        } catch (e) {
            console.error('fetchWords error:', e)
            set({ words: [], loading: false })
        }
    },

    createWord: async (word: NewWord) => {
        try {
            const result = await window.electronAPI.dbRun(
                'INSERT INTO words (deck_id, term, definition, example, phonetic) VALUES (?, ?, ?, ?, ?)',
                [word.deck_id, word.term, word.definition, word.example ?? '', word.phonetic ?? '']
            )

            if (result.lastId > 0) {
                await Promise.all([
                    window.electronAPI.dbRun(
                        'INSERT INTO progress (word_id) VALUES (?)',
                        [result.lastId]
                    ),
                    window.electronAPI.dbRun(
                        'UPDATE decks SET word_count = word_count + 1 WHERE id = ?',
                        [word.deck_id]
                    ),
                ])
            }

            await Promise.all([
                get().fetchWords(word.deck_id),
                get().fetchDecks(),
            ])
        } catch (e) {
            console.error('createWord error:', e)
        }
    },

    /**
     * Import multiple words into a deck without duplicate checking.
     * Often used for system decks where we know the data is clean.
     */
    importWords: async (deckId: number, words: ImportWord[], onProgress?: ImportProgressCallback) => {
        try {
            if (onProgress) onProgress({ current: 0, total: words.length })
            const result = await window.electronAPI.dbImportVocabulary(deckId, words)

            if (!result.success) {
                throw new Error(result.error || 'Bulk import failed')
            }

            // 2. Update local state
            await get().fetchDecks()
            await get().fetchWords(deckId)

            if (onProgress) onProgress({ current: result.count, total: result.count })
            return result.count
        } catch (e) {
            console.error('importWords error:', e)
            throw e
        }
    },

    /**
     * Import multiple words into a deck with duplicate checking.
     * Uses the specialized bulk import API for performance.
     */
    importWordsWithDeduplication: async (deckId: number, words: ImportWord[], onProgress?: ImportProgressCallback) => {
        let skipped = 0

        try {
            // 1. Get existing terms in the deck for deduplication
            // We do this in the store to avoid unnecessary DB entries
            const existingTerms = await get().getExistingTerms(deckId)

            // 2. Filter out words that already exist in this deck (case-insensitive)
            const uniqueWords: ImportWord[] = []
            for (const word of words) {
                const key = word.term.toLowerCase().trim()
                if (!existingTerms.has(key)) {
                    uniqueWords.push(word)
                    existingTerms.add(key) // Add to temporary set so we don't add duplicates from the same file
                } else {
                    skipped++
                }
            }

            // 3. If no new words to add, exit early
            if (uniqueWords.length === 0) {
                return { inserted: 0, skipped }
            }

            // 4. Use the specialized bulk import API on the Main process
            // This is much faster as it uses a single transaction and single disk save
            if (onProgress) onProgress({ current: 0, total: uniqueWords.length })
            const result = await window.electronAPI.dbImportVocabulary(deckId, uniqueWords)

            if (!result.success) {
                throw new Error(result.error || 'Bulk import failed')
            }

            // 5. Update local state
            await get().fetchDecks()
            await get().fetchWords(deckId)

            if (onProgress) onProgress({ current: result.count, total: result.count })
            return { inserted: result.count, skipped }
        } catch (e) {
            console.error('importWordsWithDeduplication error:', e)
            throw e
        }
    },

    getExistingTerms: async (deckId: number) => {
        try {
            const words = await window.electronAPI.dbQuery<{ term: string }>(
                'SELECT term FROM words WHERE deck_id = ?',
                [deckId]
            )
            return new Set(words.map(w => w.term.toLowerCase()))
        } catch (e) {
            console.error('getExistingTerms error:', e)
            return new Set<string>()
        }
    },

    selectDeck: (deckId: number | null) => {
        if (deckId === null) {
            set({ currentDeck: null })
        } else {
            const deck = get().decks.find(d => d.id === deckId)
            if (deck) {
                set({ currentDeck: deck })
            }
        }
    },

    deleteWord: async (wordId: number, deckId: number) => {
        try {
            await Promise.all([
                window.electronAPI.dbRun('DELETE FROM progress WHERE word_id = ?', [wordId]),
                window.electronAPI.dbRun('DELETE FROM words WHERE id = ?', [wordId]),
                window.electronAPI.dbRun(
                    'UPDATE decks SET word_count = word_count - 1 WHERE id = ?',
                    [deckId]
                ),
            ])

            await Promise.all([
                get().fetchWords(deckId),
                get().fetchDecks(),
            ])
        } catch (e) {
            console.error('deleteWord error:', e)
        }
    },
}))
