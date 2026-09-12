// ============================================
// Offline & Online Multi-Tier High-Precision Dictionary Service
// ============================================

import { getAllVocabularyDecks } from '@/data'

export interface WordLookupResult {
  term: string
  definition: string
  phonetic: string
  partOfSpeech: string
  example: string
  audioUrl?: string
}

// Built-in high frequency core vocabulary cache for instant response
export const COMMON_WORD_MAP: Record<string, Partial<WordLookupResult>> = {
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

interface OfflineEntry {
  definition: string
  phonetic?: string
  example?: string
  partOfSpeech?: string
}

let offlineDictIndex: Map<string, OfflineEntry> | null = null

/**
 * Lazily build in-memory offline dictionary index combining Oxford, TOEIC, IELTS, and Tech vocab
 */
export function getOfflineDictIndex(): Map<string, OfflineEntry> {
  if (offlineDictIndex) return offlineDictIndex
  offlineDictIndex = new Map()

  // 1. Index curated terms
  for (const [key, val] of Object.entries(COMMON_WORD_MAP)) {
    if (val.definition) {
      offlineDictIndex.set(key.toLowerCase(), {
        definition: val.definition,
        phonetic: val.phonetic,
        example: val.example,
        partOfSpeech: val.partOfSpeech,
      })
    }
  }

  // 2. Index all vocabulary decks from Oxford, IELTS, TOEIC
  try {
    const allDecks = getAllVocabularyDecks()
    for (const deck of allDecks) {
      if (!Array.isArray(deck.words)) continue
      for (const w of deck.words) {
        if (!w || !w.term || !w.definition) continue
        const cleaned = cleanWord(w.term)
        if (cleaned && !offlineDictIndex.has(cleaned)) {
          offlineDictIndex.set(cleaned, {
            definition: w.definition,
            phonetic: w.phonetic,
            example: w.example,
          })
        }
      }
    }
  } catch (err) {
    console.warn('Failed to index offline dictionary packs:', err)
  }

  return offlineDictIndex
}

/**
 * Lemmatization & Stemming: searches direct match or inflected root
 */
function findInOfflineDict(term: string): OfflineEntry | null {
  const dict = getOfflineDictIndex()
  if (dict.has(term)) return dict.get(term)!

  // Inflection candidate generator
  const candidates: string[] = []

  // Suffix: -ies -> -y (e.g. copies -> copy)
  if (term.endsWith('ies') && term.length > 4) {
    candidates.push(term.slice(0, -3) + 'y')
  }
  // Suffix: -es -> base (e.g. watches -> watch)
  if (term.endsWith('es') && term.length > 3) {
    candidates.push(term.slice(0, -2))
  }
  // Suffix: -s -> base (e.g. books -> book)
  if (term.endsWith('s') && term.length > 2) {
    candidates.push(term.slice(0, -1))
  }

  // Suffix: -ied -> -y (e.g. studied -> study)
  if (term.endsWith('ied') && term.length > 4) {
    candidates.push(term.slice(0, -3) + 'y')
  }
  // Suffix: -ed -> base, base+e (e.g. played -> play, liked -> like, stopped -> stop)
  if (term.endsWith('ed') && term.length > 3) {
    candidates.push(term.slice(0, -2))
    candidates.push(term.slice(0, -1))
    if (term.length > 4 && term[term.length - 3] === term[term.length - 4]) {
      candidates.push(term.slice(0, -3)) // stopped -> stop
    }
  }

  // Suffix: -ing -> base, base+e (e.g. walking -> walk, making -> make, running -> run)
  if (term.endsWith('ing') && term.length > 4) {
    const root = term.slice(0, -3)
    candidates.push(root)
    candidates.push(root + 'e')
    if (root.length > 2 && root[root.length - 1] === root[root.length - 2]) {
      candidates.push(root.slice(0, -1)) // running -> run
    }
  }

  // Suffix: -er, -est (e.g. greater -> great, greatest -> great)
  if (term.endsWith('est') && term.length > 4) {
    candidates.push(term.slice(0, -3))
  }
  if (term.endsWith('er') && term.length > 3) {
    candidates.push(term.slice(0, -2))
  }

  // Suffix: -ly (e.g. greatly -> great, completely -> complete)
  if (term.endsWith('ly') && term.length > 3) {
    candidates.push(term.slice(0, -2))
    candidates.push(term.slice(0, -2) + 'e')
  }

  for (const candidate of candidates) {
    if (dict.has(candidate)) {
      return dict.get(candidate)!
    }
  }

  return null
}

/**
 * Fast Online Vietnamese Translation via Google GTX Endpoint (~100ms)
 */
async function translateWordToVi(text: string): Promise<string> {
  if (!text) return ''
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 2500)
    const res = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${encodeURIComponent(text)}`,
      { signal: controller.signal },
    )
    clearTimeout(timeoutId)
    if (res.ok) {
      const data = await res.json()
      if (Array.isArray(data) && Array.isArray(data[0])) {
        const translated = (data[0] as Array<[string]>)
          .map((item) => item[0])
          .join('')
          .trim()
        if (translated && translated.toLowerCase() !== text.toLowerCase()) {
          return translated
        }
      }
    }
  } catch {
    // Ignore and fallback
  }
  return ''
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

/**
 * Optional dictionary API metadata (phonetic, part of speech, english definition)
 */
async function fetchDictMetadata(term: string): Promise<{
  phonetic?: string
  partOfSpeech?: string
  example?: string
  audioUrl?: string
  enDefinition?: string
}> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 1200)
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
        const phon = item.phonetic || item.phonetics?.find((p) => p.text)?.text || ''
        const audio =
          item.phonetics?.find((p) => p.audio)?.audio ||
          `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(term)}&type=2`
        return {
          phonetic: phon,
          partOfSpeech: meaning?.partOfSpeech || 'word',
          example: meaning?.definitions?.[0]?.example || '',
          audioUrl: audio,
          enDefinition: meaning?.definitions?.[0]?.definition || '',
        }
      }
    }
  } catch {
    // Ignore
  }
  return {
    audioUrl: `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(term)}&type=2`,
  }
}

/**
 * Master multi-tier word lookup:
 * Tier 1: Instant offline dictionary search with Lemmatization (0ms)
 * Tier 2: Real-time Online Vietnamese Translation & Phonetics (100-200ms)
 * Tier 3: Context sentence translation fallback
 * Tier 4: Honest definition (never dummy placeholder)
 */
export async function lookupWord(
  rawWord: string,
  contextSentence?: string,
  contextVi?: string,
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

  // Tier 1: Instant Offline Dictionary Match (0ms)
  const offline = findInOfflineDict(term)
  if (offline && offline.definition) {
    return {
      term,
      definition: offline.definition,
      phonetic: offline.phonetic || '',
      partOfSpeech: offline.partOfSpeech || 'word',
      example: contextSentence || offline.example || '',
      audioUrl: `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(term)}&type=2`,
    }
  }

  // Tier 2: Real-time Online Vietnamese Translation & Phonetics (100-200ms)
  const [onlineVi, meta] = await Promise.all([translateWordToVi(term), fetchDictMetadata(term)])

  if (onlineVi) {
    return {
      term,
      definition: onlineVi,
      phonetic: meta.phonetic || '',
      partOfSpeech: meta.partOfSpeech || 'word',
      example: contextSentence || meta.example || '',
      audioUrl:
        meta.audioUrl ||
        `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(term)}&type=2`,
    }
  }

  // Tier 3: Context sentence translation fallback
  if (contextVi && contextVi.trim()) {
    return {
      term,
      definition: `Nghĩa trong câu: "${contextVi.trim()}"`,
      phonetic: meta.phonetic || '',
      partOfSpeech: meta.partOfSpeech || 'word',
      example: contextSentence || '',
      audioUrl:
        meta.audioUrl ||
        `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(term)}&type=2`,
    }
  }

  // Tier 4: English definition or term itself (Never static placeholder)
  return {
    term,
    definition: meta.enDefinition || term,
    phonetic: meta.phonetic || '',
    partOfSpeech: meta.partOfSpeech || 'word',
    example: contextSentence || '',
    audioUrl:
      meta.audioUrl || `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(term)}&type=2`,
  }
}
