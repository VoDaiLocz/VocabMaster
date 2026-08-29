// ============================================
// Offline / Zero-Config Fast Dictionary Service
// ============================================

export interface WordLookupResult {
  term: string
  definition: string
  phonetic: string
  partOfSpeech: string
  example: string
  audioUrl?: string
}

// Built-in high frequency core vocabulary cache for instant response
const COMMON_WORD_MAP: Record<string, Partial<WordLookupResult>> = {
  honored: { definition: 'vinh dự, vinh hạnh', phonetic: '/ˈɑː.nɚd/', partOfSpeech: 'adj' },
  commencement: {
    definition: 'lễ tốt nghiệp, sự bắt đầu',
    phonetic: '/kəˈmens.mənt/',
    partOfSpeech: 'noun',
  },
  finest: {
    definition: 'tuyệt vời nhất, xuất sắc nhất',
    phonetic: '/ˈfaɪ.nɪst/',
    partOfSpeech: 'adj',
  },
  graduated: { definition: 'đã tốt nghiệp', phonetic: '/ˈɡrædʒ.u.eɪtɪd/', partOfSpeech: 'verb' },
  graduation: { definition: 'sự tốt nghiệp', phonetic: '/ˌɡrædʒ.uˈeɪ.ʃən/', partOfSpeech: 'noun' },
  connecting: { definition: 'kết nối, liên kết', phonetic: '/kəˈnek.tɪŋ/', partOfSpeech: 'verb' },
  trust: { definition: 'tin tưởng, niềm tin', phonetic: '/trʌst/', partOfSpeech: 'verb/noun' },
  foolish: { definition: 'dại khờ, ngốc nghếch', phonetic: '/ˈfuː.lɪʃ/', partOfSpeech: 'adj' },
  hungry: { definition: 'khao khát, đói', phonetic: '/ˈhʌŋ.ɡri/', partOfSpeech: 'adj' },
  wondered: { definition: 'tự hỏi, băn khoăn', phonetic: '/ˈwʌn.dɚd/', partOfSpeech: 'verb' },
  relevant: {
    definition: 'thích hợp, có liên quan',
    phonetic: '/ˈrel.ə.vənt/',
    partOfSpeech: 'adj',
  },
  principles: {
    definition: 'các nguyên tắc cốt lõi',
    phonetic: '/ˈprɪn.sə.pəlz/',
    partOfSpeech: 'noun',
  },
  communicate: {
    definition: 'giao tiếp, truyền đạt',
    phonetic: '/kəˈmjuː.nə.keɪt/',
    partOfSpeech: 'verb',
  },
  vocabulary: { definition: 'từ vựng', phonetic: '/vəˈkæb.jə.ler.i/', partOfSpeech: 'noun' },
  transcript: {
    definition: 'bản ghi âm/bản phụ đề',
    phonetic: '/ˈtræn.skrɪpt/',
    partOfSpeech: 'noun',
  },
  breakthrough: {
    definition: 'đột phá, bước tiến lớn',
    phonetic: '/ˈbreɪk.θruː/',
    partOfSpeech: 'noun',
  },
  mastering: { definition: 'tinh thông, làm chủ', phonetic: '/ˈmæs.tɚ.ɪŋ/', partOfSpeech: 'verb' },
  context: { definition: 'ngữ cảnh, bối cảnh', phonetic: '/ˈkɑːn.tekst/', partOfSpeech: 'noun' },
  generative: {
    definition: 'tạo sinh, có khả năng tạo mới',
    phonetic: '/ˈdʒen.ər.ə.tɪv/',
    partOfSpeech: 'adj',
  },
  intelligence: {
    definition: 'trí tuệ, trí thông minh',
    phonetic: '/ɪnˈtel.ə.dʒəns/',
    partOfSpeech: 'noun',
  },
  transformer: {
    definition: 'kiến trúc mạng nơ-ron Transformer',
    phonetic: '/trænsˈfɔːr.mɚ/',
    partOfSpeech: 'noun',
  },
  prompt: { definition: 'câu lệnh chỉ dẫn cho AI', phonetic: '/prɑːmpt/', partOfSpeech: 'noun' },
  engineering: {
    definition: 'ngành kỹ thuật, kỹ nghệ',
    phonetic: '/ˌen.dʒɪˈnɪr.ɪŋ/',
    partOfSpeech: 'noun',
  },
  neural: { definition: 'thuộc về nơ-ron thần kinh', phonetic: '/ˈnʊr.əl/', partOfSpeech: 'adj' },
  networks: {
    definition: 'các mạng lưới, hệ thống mạng',
    phonetic: '/ˈnet.wɝːks/',
    partOfSpeech: 'noun',
  },
  clean: { definition: 'sạch sẽ, chuẩn mực, rõ ràng', phonetic: '/kliːn/', partOfSpeech: 'adj' },
  code: { definition: 'mã nguồn, lập trình', phonetic: '/koʊd/', partOfSpeech: 'noun' },
  feature: {
    definition: 'tính năng, đặc điểm nổi bật',
    phonetic: '/ˈfiː.tʃɚ/',
    partOfSpeech: 'noun',
  },
  allow: { definition: 'cho phép, thừa nhận', phonetic: '/əˈlaʊ/', partOfSpeech: 'verb' },
  isolation: {
    definition: 'sự độc lập, cô lập',
    phonetic: '/ˌaɪ.səˈleɪ.ʃən/',
    partOfSpeech: 'noun',
  },
  effective: { definition: 'hiệu quả, có tác dụng', phonetic: '/əˈfek.tɪv/', partOfSpeech: 'adj' },
  instructions: {
    definition: 'các chỉ dẫn, hướng dẫn',
    phonetic: '/ɪnˈstrʌk.ʃənz/',
    partOfSpeech: 'noun',
  },
  developer: {
    definition: 'lập trình viên, kỹ sư phần mềm',
    phonetic: '/dɪˈvel.ə.pɚ/',
    partOfSpeech: 'noun',
  },
  developers: {
    definition: 'các lập trình viên, kỹ sư phát triển phần mềm',
    phonetic: '/dɪˈvel.ə.pɚz/',
    partOfSpeech: 'noun',
  },
  branch: { definition: 'nhánh mã nguồn (Git branch)', phonetic: '/bræntʃ/', partOfSpeech: 'noun' },
  branches: {
    definition: 'các nhánh mã nguồn trong Git',
    phonetic: '/ˈbræn.tʃɪz/',
    partOfSpeech: 'noun',
  },
  interview: {
    definition: 'buổi phỏng vấn xin việc',
    phonetic: '/ˈɪn.t̬ɚ.vjuː/',
    partOfSpeech: 'noun',
  },
  architecture: {
    definition: 'kiến trúc hệ thống phần mềm',
    phonetic: '/ˈɑːr.kə.tek.tʃɚ/',
    partOfSpeech: 'noun',
  },
  microservices: {
    definition: 'kiến trúc vi dịch vụ',
    phonetic: '/ˈmaɪ.kroʊˌsɝː.vɪ.sɪz/',
    partOfSpeech: 'noun',
  },
  monolith: {
    definition: 'kiến trúc khối đơn nhất',
    phonetic: '/ˈmɑː.nə.lɪθ/',
    partOfSpeech: 'noun',
  },
  standup: {
    definition: 'buổi họp nhanh hàng ngày (Scrum)',
    phonetic: '/ˈstænd.ʌp/',
    partOfSpeech: 'noun',
  },
}

/**
 * Clean word from punctuation
 */
export function cleanWord(rawWord: string): string {
  if (!rawWord) return ''
  return rawWord
    .replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, '')
    .trim()
    .toLowerCase()
}

/**
 * Quick lookup for a clicked word
 */
export async function lookupWord(
  rawWord: string,
  contextSentence?: string,
): Promise<WordLookupResult> {
  const term = cleanWord(rawWord)
  if (!term) {
    return {
      term: rawWord,
      definition: 'Không xác định được từ',
      phonetic: '',
      partOfSpeech: '',
      example: contextSentence || '',
    }
  }

  // 1. Check local cache (Instant 0ms response)
  if (COMMON_WORD_MAP[term]) {
    const cached = COMMON_WORD_MAP[term]
    return {
      term,
      definition: cached.definition || 'Từ vựng trong ngữ cảnh bài học',
      phonetic: cached.phonetic || '',
      partOfSpeech: cached.partOfSpeech || 'word',
      example: contextSentence || '',
      audioUrl: `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(term)}&type=2`,
    }
  }

  interface DictPhonetic {
    text?: string
    audio?: string
  }

  interface DictMeaning {
    partOfSpeech?: string
    definitions?: { definition?: string; example?: string }[]
  }

  interface DictEntry {
    phonetic?: string
    phonetics?: DictPhonetic[]
    meanings?: DictMeaning[]
  }

  // 2. Fetch free public dictionary API with 600ms timeout
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 600)

    const res = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(term)}`,
      { signal: controller.signal },
    )
    clearTimeout(timeoutId)

    if (res.ok) {
      const data = (await res.json()) as DictEntry[]
      if (Array.isArray(data) && data[0]) {
        const item = data[0]
        const meaning = item.meanings?.[0]
        const def = meaning?.definitions?.[0]?.definition || ''
        const pos = meaning?.partOfSpeech || ''
        const phon = item.phonetic || item.phonetics?.find((p) => p.text)?.text || ''
        const audio =
          item.phonetics?.find((p) => p.audio)?.audio ||
          `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(term)}&type=2`

        return {
          term,
          definition: def,
          phonetic: phon,
          partOfSpeech: pos,
          example: contextSentence || meaning?.definitions?.[0]?.example || '',
          audioUrl: audio,
        }
      }
    }
  } catch (err) {
    // Graceful offline fallback
  }

  // 3. Fallback
  return {
    term,
    definition: 'Từ vựng tiếng Anh trong ngữ cảnh video',
    phonetic: '',
    partOfSpeech: 'word',
    example: contextSentence || '',
    audioUrl: `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(term)}&type=2`,
  }
}
