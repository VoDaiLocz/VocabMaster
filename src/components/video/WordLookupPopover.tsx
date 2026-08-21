// ============================================
// Word Lookup Popover & Flashcard Creator
// ============================================

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, Plus, Check, X, Bookmark, Sparkles } from 'lucide-react'
import { WordLookupResult } from '@/services/dictionaryService'
import { useDeckStore } from '@/store/deckStore'

interface WordLookupPopoverProps {
  wordData: WordLookupResult | null
  onClose: () => void
  onSaved?: () => void
}

export const WordLookupPopover: React.FC<WordLookupPopoverProps> = ({
  wordData,
  onClose,
  onSaved,
}) => {
  const { decks, createWord } = useDeckStore()
  const [selectedDeckId, setSelectedDeckId] = useState<number | null>(
    decks.length > 0 ? decks[0].id : null,
  )
  const [isSaving, setIsSaving] = useState(false)
  const [savedSuccess, setSavedSuccess] = useState(false)

  if (!wordData) return null

  const handlePlayAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(wordData.term)
      utterance.lang = 'en-US'
      utterance.rate = 0.9
      window.speechSynthesis.speak(utterance)
    } else if (wordData.audioUrl) {
      const audio = new Audio(wordData.audioUrl)
      audio.play().catch(() => {})
    }
  }

  const handleSaveToDeck = async () => {
    if (!selectedDeckId) return
    setIsSaving(true)
    try {
      await createWord({
        deck_id: selectedDeckId,
        term: wordData.term,
        definition: wordData.definition,
        example: wordData.example,
        phonetic: wordData.phonetic,
      })
      setSavedSuccess(true)
      if (onSaved) onSaved()
      setTimeout(() => {
        onClose()
      }, 1200)
    } catch (err) {
      console.error('Failed to save word:', err)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <AnimatePresence>
      <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm'>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className='w-full max-w-md bg-white dark:bg-dark-card rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 p-6 overflow-hidden relative'
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className='absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
          >
            <X size={20} />
          </button>

          {/* Header & Term */}
          <div className='flex items-start gap-4 mb-4 pr-6'>
            <div className='w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 flex items-center justify-center font-bold text-xl shadow-sm'>
              {wordData.term.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className='flex items-center gap-2'>
                <h3 className='text-2xl font-bold font-display text-gray-900 dark:text-white capitalize'>
                  {wordData.term}
                </h3>
                <button
                  onClick={handlePlayAudio}
                  className='p-1.5 rounded-full bg-primary-50 dark:bg-primary-950 text-primary-600 dark:text-primary-400 hover:bg-primary-100 transition-colors'
                  title='Phát âm'
                >
                  <Volume2 size={18} />
                </button>
              </div>
              <div className='flex items-center gap-2 mt-1 text-sm text-gray-500 dark:text-gray-400'>
                {wordData.phonetic && <span className='font-mono'>{wordData.phonetic}</span>}
                {wordData.partOfSpeech && (
                  <span className='px-2 py-0.5 rounded-md text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'>
                    {wordData.partOfSpeech}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Definition */}
          <div className='mb-4 p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800'>
            <div className='text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1'>
              <Sparkles size={14} className='text-primary-500' /> Nghĩa tiếng Việt
            </div>
            <p className='text-gray-800 dark:text-gray-100 font-medium text-base'>
              {wordData.definition}
            </p>
          </div>

          {/* Example in Context */}
          {wordData.example && (
            <div className='mb-6 p-3 rounded-xl bg-primary-50/50 dark:bg-primary-950/20 border border-primary-100 dark:border-primary-900/30'>
              <div className='text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-1'>
                Ngữ cảnh trong video
              </div>
              <p className='text-sm text-gray-700 dark:text-gray-300 italic'>
                "{wordData.example}"
              </p>
            </div>
          )}

          {/* Save to Deck Selector */}
          <div className='space-y-3 pt-2 border-t border-gray-100 dark:border-gray-800'>
            <div className='flex items-center justify-between text-sm'>
              <label className='text-gray-600 dark:text-gray-400 font-medium flex items-center gap-1.5'>
                <Bookmark size={16} /> Lưu vào bộ từ:
              </label>
              {decks.length > 0 ? (
                <select
                  value={selectedDeckId || ''}
                  onChange={(e) => setSelectedDeckId(Number(e.target.value))}
                  className='bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5 text-sm text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500'
                >
                  {decks.map((deck) => (
                    <option key={deck.id} value={deck.id}>
                      {deck.name} ({deck.word_count || 0})
                    </option>
                  ))}
                </select>
              ) : (
                <span className='text-xs text-amber-500'>Chưa có bộ từ vựng</span>
              )}
            </div>

            {/* Action Buttons */}
            <div className='flex gap-3 pt-1'>
              <button
                onClick={onClose}
                className='flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm font-medium transition-colors'
              >
                Đóng
              </button>
              <button
                onClick={handleSaveToDeck}
                disabled={isSaving || savedSuccess || !selectedDeckId}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg transition-all ${
                  savedSuccess
                    ? 'bg-emerald-500 shadow-emerald-500/30'
                    : 'bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-600 shadow-primary-500/25'
                }`}
              >
                {savedSuccess ? (
                  <>
                    <Check size={18} /> Đã lưu vào Deck
                  </>
                ) : isSaving ? (
                  'Đang lưu...'
                ) : (
                  <>
                    <Plus size={18} /> Lưu Flashcard
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
