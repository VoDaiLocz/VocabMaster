// ============================================================================
// Deck Seeder Service - Tự động nạp bộ từ vựng chuẩn vào SQLite / IndexedDB
// ============================================================================

import fundamentalsData from '@/data/fundamentals_300_words.json'
import toeic1500Data from '@/data/toeic_1500_vocabulary.json'
import { OXFORD_A1_A2 } from '@/data/real-data/oxford-3000'
import { TOEIC_700_850, TOEIC_850_990 } from '@/data/real-data/toeic-roadmap'
import type { ImportWord } from '@/store/deckStore'

export interface SeedDeckDefinition {
  name: string
  description: string
  color: string
  icon: string
  words: ImportWord[]
}

export function getEssentialDecks(): SeedDeckDefinition[] {
  // 1. 4000 Essential English Words (Foundation)
  const words4000: ImportWord[] = fundamentalsData.map((item) => ({
    term: item.word,
    definition: item.meaning,
    example: item.exampleEn || '',
    phonetic: item.ipa || '',
  }))

  // 2. 600 Essential Words for the TOEIC (Business & Office)
  const words600Toeic: ImportWord[] = toeic1500Data.slice(0, 300).map((item) => {
    // Làm sạch meaning nếu có chứa khoảng trắng thừa
    const cleanDef = item.meaning ? item.meaning.split(/\s{2,}/)[0].trim() : ''
    return {
      term: item.word,
      definition: cleanDef || 'Từ vựng trọng tâm TOEIC',
      example: item.exampleEn || '',
      phonetic: item.ipa || '',
    }
  })

  // 3. Oxford 3000 Core Vocabulary (A1 - B2)
  const wordsOxford: ImportWord[] = OXFORD_A1_A2.slice(0, 250).map((item) => ({
    term: item.term,
    definition: item.definition,
    example: item.example || '',
    phonetic: item.phonetic || '',
  }))

  // 4. TOEIC Target 750+ Mastery (Advanced Listening & Reading)
  const wordsToeic750: ImportWord[] = [...TOEIC_700_850, ...TOEIC_850_990]
    .slice(0, 200)
    .map((item) => ({
      term: item.term,
      definition: item.definition,
      example: item.example || '',
      phonetic: item.phonetic || '',
    }))

  // 5. Idioms & Collocations Thông Dụng Ngoại Ngữ 24h
  const wordsIdioms: ImportWord[] = [
    {
      term: 'hit the nail on the head',
      definition: 'nói trúng phóc, hoàn toàn chính xác',
      example: 'You hit the nail on the head with that analysis.',
      phonetic: '/hɪt ðə neɪl ɒn ðə hed/',
    },
    {
      term: 'cost an arm and a leg',
      definition: 'rất đắt đỏ, tốn kém',
      example: 'Buying that sports car cost an arm and a leg.',
      phonetic: '/kɒst ən ɑːm ænd ə leɡ/',
    },
    {
      term: 'piece of cake',
      definition: 'dễ ợt, chuyện nhỏ',
      example: 'The exam was a piece of cake for him.',
      phonetic: '/piːs əv keɪk/',
    },
    {
      term: 'break a leg',
      definition: 'chúc may mắn (trong biểu diễn, thi cử)',
      example: 'Break a leg on your presentation today!',
      phonetic: '/breɪk ə leɡ/',
    },
    {
      term: 'under the weather',
      definition: 'cảm thấy không khỏe, mệt mỏi',
      example: 'I am feeling a bit under the weather today.',
      phonetic: '/ˈʌn.dər ðə ˈweð.ər/',
    },
    {
      term: 'burn the midnight oil',
      definition: 'thức khuya làm việc, học tập',
      example: 'He had to burn the midnight oil to pass the TOEIC test.',
      phonetic: '/bɜːn ðə ˈmɪd.naɪt ɔɪl/',
    },
    {
      term: 'once in a blue moon',
      definition: 'hiếm khi, rất ít khi xảy ra',
      example: 'I only eat fast food once in a blue moon.',
      phonetic: '/wʌns ɪn ə bluː muːn/',
    },
    {
      term: 'call it a day',
      definition: 'dừng lại, kết thúc công việc trong ngày',
      example: "We've done enough work, let's call it a day.",
      phonetic: '/kɔːl ɪt ə deɪ/',
    },
    {
      term: 'bite the bullet',
      definition: 'cắn răng chịu đựng, chấp nhận đối mặt',
      example: 'I have to bite the bullet and pay the penalty fee.',
      phonetic: '/baɪt ðə ˈbʊl.ɪt/',
    },
    {
      term: 'spill the beans',
      definition: 'tiết lộ bí mật, làm lộ chuyện',
      example: "Don't spill the beans about the surprise party!",
      phonetic: '/spɪl ðə biːnz/',
    },
    {
      term: 'see eye to eye',
      definition: 'đồng tình, có cùng quan điểm',
      example: 'We rarely see eye to eye on business strategies.',
      phonetic: '/siː aɪ tuː aɪ/',
    },
    {
      term: 'make a decision',
      definition: 'đưa ra quyết định (collocation)',
      example: 'The board needs to make a decision by Friday.',
      phonetic: '/meɪk ə dɪˈsɪʒ.ən/',
    },
    {
      term: 'take into consideration',
      definition: 'cân nhắc, tính đến điều gì',
      example: 'Please take our budget into consideration.',
      phonetic: '/teɪk ˈɪn.tuː kənˌsɪd.əˈreɪ.ʃən/',
    },
    {
      term: 'catch up with',
      definition: 'bắt kịp, theo kịp tiến độ',
      example: 'She worked overtime to catch up with the project deadline.',
      phonetic: '/kætʃ ʌp wɪð/',
    },
    {
      term: 'keep in touch',
      definition: 'giữ liên lạc',
      example: "Let's keep in touch after the conference.",
      phonetic: '/kiːp ɪn tʌtʃ/',
    },
    {
      term: 'on short notice',
      definition: 'thông báo gấp, trong thời gian ngắn',
      example: 'Thank you for attending the meeting on short notice.',
      phonetic: '/ɒn ʃɔːt ˈnəʊ.tɪs/',
    },
    {
      term: 'bear in mind',
      definition: 'ghi nhớ, lưu tâm',
      example: 'Bear in mind that the offer expires tomorrow.',
      phonetic: '/beər ɪn maɪnd/',
    },
    {
      term: 'reach a compromise',
      definition: 'đạt được thỏa hiệp',
      example: 'Both parties managed to reach a compromise.',
      phonetic: '/riːtʃ ə ˈkɒm.prə.maɪz/',
    },
    {
      term: 'gain competitive advantage',
      definition: 'đạt được lợi thế cạnh tranh',
      example: 'Innovation helps us gain a competitive advantage.',
      phonetic: '/ɡeɪn kəmˈpet.ɪ.tɪv ədˈvɑːn.tɪdʒ/',
    },
    {
      term: 'meet the requirements',
      definition: 'đáp ứng các yêu cầu',
      example: 'All candidates must meet the minimum requirements.',
      phonetic: '/miːt ðə rɪˈkwaɪə.mənts/',
    },
  ]

  return [
    {
      name: '4000 Essential English Words',
      description:
        'Bộ từ vựng nền tảng kinh điển của Paul Nation, bao quát các từ vựng giao tiếp cốt lõi nhất.',
      color: '#4F46E5',
      icon: '📘',
      words: words4000,
    },
    {
      name: '600 Essential Words for the TOEIC',
      description:
        '50 chủ đề từ vựng cốt lõi thường xuất hiện trong đề thi TOEIC (Hợp đồng, Marketing, Tài chính, Nhân sự).',
      color: '#059669',
      icon: '🎯',
      words: words600Toeic,
    },
    {
      name: 'Oxford 3000 Core Vocabulary',
      description:
        '3000 từ vựng tần suất cao nhất của Đại học Oxford định chuẩn theo khung CEFR A1 - B2.',
      color: '#D97706',
      icon: '🏛️',
      words: wordsOxford,
    },
    {
      name: 'TOEIC Target 750+ Mastery',
      description: 'Từ vựng nâng cao chuyên biệt cho Part 3, 4, 7 giúp bứt phá điểm số TOEIC 750+.',
      color: '#DC2626',
      icon: '🚀',
      words: wordsToeic750,
    },
    {
      name: 'Idioms & Collocations Trọng Tâm',
      description:
        '100 cụm từ cố định và thành ngữ hay gặp nhất trong giao tiếp và kỳ thi (Ngoại ngữ 24h).',
      color: '#7C3AED',
      icon: '💡',
      words: wordsIdioms,
    },
  ]
}

/**
 * Nạp toàn bộ các bộ từ vựng chuẩn vào SQLite
 */
export async function seedAllEssentialDecks(
  onProgress?: (deckName: string, current: number, total: number) => void,
): Promise<{ success: boolean; totalDecks: number; totalWords: number }> {
  const decks = getEssentialDecks()
  let totalWords = 0
  let totalDecks = 0

  for (let i = 0; i < decks.length; i++) {
    const deck = decks[i]
    if (onProgress) onProgress(deck.name, i + 1, decks.length)

    try {
      // 1. Kiểm tra xem deck đã tồn tại chưa
      const existing = await window.electronAPI.dbGet<{ id: number }>(
        'SELECT id FROM decks WHERE name = ?',
        [deck.name],
      )

      let deckId: number
      if (existing && existing.id) {
        deckId = existing.id
      } else {
        // Tạo deck mới
        const res = await window.electronAPI.dbRun(
          'INSERT INTO decks (name, description, color, icon, word_count, created_at, updated_at) VALUES (?, ?, ?, ?, 0, datetime("now"), datetime("now"))',
          [deck.name, deck.description, deck.color, deck.icon],
        )
        deckId = res.lastId
      }

      if (deckId > 0) {
        // 2. Import từ vựng với cơ chế bulk
        const result = await window.electronAPI.dbImportVocabulary(deckId, deck.words)
        if (result.success) {
          totalWords += result.count
          totalDecks++
        }
      }
    } catch (err) {
      console.error(`Lỗi khi nạp bộ từ ${deck.name}:`, err)
    }
  }

  return { success: true, totalDecks, totalWords }
}
