import { OXFORD_A1_A2 } from './real-data/oxford-3000'
import { IELTS_ACADEMIC, TOEIC_BUSINESS } from './real-data/ielts-specialized'
import { TOEIC_ROADMAP_DECKS } from './real-data/toeic-roadmap'
import {
    TOEIC_PART_1_2,
    TOEIC_PART_3_4,
    TOEIC_PART_5_6,
    TOEIC_PART_7,
    TOEIC_BUSINESS_TOPIC
} from './real-data/toeic-comprehensive'
import { EXTRA_DECKS } from './vocabulary-packs'

export interface VocabWord {
    term: string
    definition: string
    example: string
    phonetic: string
}

function deduplicateVocabulary(words: VocabWord[]): VocabWord[] {
    const seen = new Map<string, VocabWord>()
    for (const word of words) {
        const key = word.term.toLowerCase().trim()
        if (!seen.has(key)) {
            seen.set(key, word)
        }
    }
    return Array.from(seen.values())
}

export interface VocabDeck {
    name: string
    words: VocabWord[]
    color: string
    icon: string
    description: string
}

const DECKS: VocabDeck[] = [
    ...TOEIC_ROADMAP_DECKS,
    {
        name: 'Oxford 3000 (A1-B2)',
        words: OXFORD_A1_A2,
        color: '#4F46E5',
        icon: '📘',
        description: '3000 tu vung cot loi quan trong nhat trong tieng Anh.'
    },
    {
        name: 'IELTS Academic Vocab',
        words: IELTS_ACADEMIC,
        color: '#DC2626',
        icon: '🎓',
        description: 'Tu vung hoc thuat chuyen sau cho bai thi IELTS.'
    },
    {
        name: 'TOEIC Part 1: Photographs',
        words: deduplicateVocabulary(TOEIC_PART_1_2.slice(0, 200)),
        color: '#F59E0B',
        icon: '📸',
        description: 'Từ vựng trọng tâm cho phần thi mô tả tranh.'
    },
    {
        name: 'TOEIC Part 2: Question-Response',
        words: deduplicateVocabulary(TOEIC_PART_1_2.slice(200)),
        color: '#D97706',
        icon: '❓',
        description: 'Từ vựng và các tình huống hỏi đáp thường gặp.'
    },
    {
        name: 'TOEIC Part 3: Conversations',
        words: deduplicateVocabulary(TOEIC_PART_3_4.slice(0, 400)),
        color: '#B45309',
        icon: '💬',
        description: 'Từ vựng cho các đoạn hội thoại tại nơi làm việc.'
    },
    {
        name: 'TOEIC Part 4: Short Talks',
        words: deduplicateVocabulary(TOEIC_PART_3_4.slice(400)),
        color: '#92400E',
        icon: '📢',
        description: 'Từ vựng cho các bài thông báo, tin nhắn thoại.'
    },
    {
        name: 'TOEIC Part 5: Incomplete Sentences',
        words: deduplicateVocabulary(TOEIC_PART_5_6.slice(0, 350)),
        color: '#EF4444',
        icon: '📝',
        description: 'Tổng hợp từ loại và cấu trúc thường gặp trong Part 5.'
    },
    {
        name: 'TOEIC Part 6: Text Completion',
        words: deduplicateVocabulary(TOEIC_PART_5_6.slice(350)),
        color: '#B91C1C',
        icon: '📰',
        description: 'Từ vựng điền vào đoạn văn và ngữ cảnh văn phòng.'
    },
    {
        name: 'TOEIC Part 7: Reading Comprehension',
        words: deduplicateVocabulary([...TOEIC_PART_7, ...TOEIC_BUSINESS_TOPIC, ...TOEIC_BUSINESS]),
        color: '#7F1D1D',
        icon: '📚',
        description: 'Từ vựng nâng cao cho các bài đọc thư tín, quảng cáo.'
    },
    ...EXTRA_DECKS
]

export function getAllVocabularyDecks(): VocabDeck[] {
    return DECKS
}

export function getTotalWordCount(): number {
    return DECKS.reduce((sum, deck) => sum + deck.words.length, 0)
}

export function getDeckByName(name: string): VocabDeck | undefined {
    return DECKS.find(d => d.name === name)
}
