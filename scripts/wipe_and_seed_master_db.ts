// ============================================================================
// WIPE & SEED MASTER DATABASE SCRIPT FOR VOCABMASTER
// ============================================================================
import fs from 'fs'
import path from 'path'
import initSqlJs from 'sql.js'

// Import existing high-quality datasets
import { OXFORD_A1_A2 } from '../src/data/real-data/oxford-3000'
import {
  TOEIC_PART_1_2,
  TOEIC_PART_3_4,
  TOEIC_PART_5_6,
  TOEIC_PART_7,
  TOEIC_BUSINESS_TOPIC,
} from '../src/data/real-data/toeic-comprehensive'
import {
  TOEIC_0_250,
  TOEIC_250_500,
  TOEIC_500_700,
  TOEIC_700_850,
  TOEIC_850_990,
} from '../src/data/real-data/toeic-roadmap'
import fundamentalsData from '../src/data/fundamentals_300_words.json'
import toeic1500Data from '../src/data/toeic_1500_vocabulary.json'

interface WordItem {
  term: string
  definition: string
  example?: string
  phonetic?: string
}

interface DeckDef {
  name: string
  description: string
  color: string
  icon: string
  words: WordItem[]
}

const DB_PATH = '/home/vodailoc/.config/vocabmaster/vocabmaster.db'

// Deduplication helper
function deduplicateWords(words: WordItem[]): WordItem[] {
  const seen = new Set<string>()
  const result: WordItem[] = []
  for (const w of words) {
    const key = w.term.trim().toLowerCase()
    if (!key || seen.has(key)) continue
    seen.add(key)
    result.push({
      term: w.term.trim(),
      definition: w.definition.trim(),
      example: w.example ? w.example.trim() : '',
      phonetic: w.phonetic ? w.phonetic.trim() : '',
    })
  }
  return result
}

// Collocations & Idioms (Ngoại Ngữ 24h & Mai Phương)
const IDIOMS_AND_COLLOCATIONS: WordItem[] = [
  { term: 'hit the nail on the head', definition: 'nói trúng phóc, hoàn toàn chính xác', example: 'You hit the nail on the head with that market analysis.', phonetic: '/hɪt ðə neɪl ɒn ðə hed/' },
  { term: 'cost an arm and a leg', definition: 'rất đắt đỏ, tốn kém chi phí lớn', example: 'Upgrading the legacy servers cost an arm and a leg.', phonetic: '/kɒst ən ɑːm ænd ə leɡ/' },
  { term: 'piece of cake', definition: 'dễ ợt, công việc đơn giản', example: 'Writing the unit test was a piece of cake.', phonetic: '/piːs əv keɪk/' },
  { term: 'break a leg', definition: 'chúc may mắn (trong thuyết trình, thi cử)', example: 'Break a leg on your product presentation today!', phonetic: '/breɪk ə leɡ/' },
  { term: 'under the weather', definition: 'cảm thấy không khỏe, mệt mỏi', example: 'He is working from home as he feels under the weather.', phonetic: '/ˈʌn.dər ðə ˈweð.ər/' },
  { term: 'burn the midnight oil', definition: 'thức khuya làm việc, ôn thi', example: 'The engineering team burned the midnight oil before launch.', phonetic: '/bɜːn ðə ˈmɪd.naɪt ɔɪl/' },
  { term: 'once in a blue moon', definition: 'rất hiếm khi xảy ra', example: 'System outages occur once in a blue moon.', phonetic: '/wʌns ɪn ə bluː muːn/' },
  { term: 'call it a day', definition: 'dừng lại, kết thúc công việc trong ngày', example: "We've resolved the major bugs, let's call it a day.", phonetic: '/kɔːl ɪt ə deɪ/' },
  { term: 'bite the bullet', definition: 'cắn răng chịu đựng, chấp nhận khó khăn', example: 'We have to bite the bullet and refactor the codebase.', phonetic: '/baɪt ðə ˈbʊl.ɪt/' },
  { term: 'spill the beans', definition: 'tiết lộ bí mật, làm lộ thông tin', example: "Don't spill the beans about the upcoming product release.", phonetic: '/spɪl ðə biːnz/' },
  { term: 'see eye to eye', definition: 'đồng tình, có cùng quan điểm', example: 'The PM and tech lead see eye to eye on architecture.', phonetic: '/siː aɪ tuː aɪ/' },
  { term: 'make a decision', definition: 'đưa ra quyết định dứt khoát', example: 'Management must make a decision regarding vendor selection.', phonetic: '/meɪk ə dɪˈsɪʒ.ən/' },
  { term: 'take into consideration', definition: 'cân nhắc, tính đến điều gì', example: 'Please take network latency into consideration.', phonetic: '/teɪk ˈɪn.tuː kənˌsɪd.əˈreɪ.ʃən/' },
  { term: 'catch up with', definition: 'bắt kịp, theo kịp tiến độ', example: 'We implemented caching to catch up with traffic surges.', phonetic: '/kætʃ ʌp wɪð/' },
  { term: 'keep in touch', definition: 'giữ liên lạc, duy trì quan hệ', example: "Let's keep in touch after the technology conference.", phonetic: '/kiːp ɪn tʌtʃ/' },
  { term: 'on short notice', definition: 'thông báo gấp, trong thời gian ngắn', example: 'Thank you for deploying the hotfix on short notice.', phonetic: '/ɒn ʃɔːt ˈnəʊ.tɪs/' },
  { term: 'bear in mind', definition: 'ghi nhớ, lưu tâm', example: 'Bear in mind that the database migration is irreversible.', phonetic: '/beər ɪn maɪnd/' },
  { term: 'reach a compromise', definition: 'đạt được thỏa hiệp đôi bên', example: 'Both parties reached a compromise on project milestones.', phonetic: '/riːtʃ ə ˈkɒm.prə.maɪz/' },
  { term: 'gain competitive advantage', definition: 'đạt được lợi thế cạnh tranh', example: 'High performance delivers a key competitive advantage.', phonetic: '/ɡeɪn kəmˈpet.ɪ.tɪv ədˈvɑːn.tɪdʒ/' },
  { term: 'meet the requirements', definition: 'đáp ứng đầy đủ các tiêu chí yêu cầu', example: 'The candidate meets all technical requirements.', phonetic: '/miːt ðə rɪˈkwaɪə.mənts/' },
  { term: 'in accordance with', definition: 'phù hợp với, tuân theo quy định', example: 'The system was built in accordance with GDPR guidelines.', phonetic: '/ɪn əˈkɔː.dəns wɪð/' },
  { term: 'as a matter of fact', definition: 'trên thực tế, thực tế là', example: 'As a matter of fact, the benchmark shows 40% improvement.', phonetic: '/æz ə ˈmæt.ər əv fækt/' },
  { term: 'take advantage of', definition: 'tận dụng cơ hội, ưu thế', example: 'We take advantage of multi-core CPUs using worker threads.', phonetic: '/teɪk ədˈvɑːn.tɪdʒ əv/' },
  { term: 'in terms of', definition: 'xét về mặt, về phương diện', example: 'In terms of throughput, Go outperforms Node.js here.', phonetic: '/ɪn tɜːmz əv/' },
  { term: 'come up with', definition: 'nghĩ ra, nảy ra (giải pháp, ý tưởng)', example: 'The team came up with an ingenious caching pattern.', phonetic: '/kʌm ʌp wɪð/' }
]

// International Software Engineering Vocabulary
const IT_SWE_VOCABULARY: WordItem[] = [
  { term: 'idempotent', definition: 'tính chất một thao tác thực hiện nhiều lần vẫn cho kết quả như lần đầu', example: 'HTTP GET, PUT, and DELETE methods must be idempotent.', phonetic: '/ˌaɪ.dəmˈpəʊ.tənt/' },
  { term: 'concurrency', definition: 'xử lý đồng thời nhiều tác vụ trong cùng khoảng thời gian', example: 'Go goroutines provide lightweight concurrency.', phonetic: '/kənˈkʌr.ən.si/' },
  { term: 'deadlock', definition: 'bế tắc khi hai hay nhiều tiến trình chờ tài nguyên của nhau', example: 'Careless lock acquisition order caused a severe deadlock.', phonetic: '/ˈded.lɒk/' },
  { term: 'race condition', definition: 'xung đột tài nguyên xảy ra khi kết quả phụ thuộc vào thứ tự thực thi của các luồng', example: 'Use mutexes or atomic operations to prevent race conditions.', phonetic: '/reɪs kənˈdɪʃ.ən/' },
  { term: 'throughput', definition: 'lượng công việc hoặc yêu cầu được xử lý trong một đơn vị thời gian', example: 'The new message queue increased throughput to 50k req/sec.', phonetic: '/ˈθruː.pʊt/' },
  { term: 'latency', definition: 'thời gian trễ từ khi gửi yêu cầu đến khi nhận được phản hồi', example: 'Edge caching reduces p99 latency significantly.', phonetic: '/ˈleɪ.tən.si/' },
  { term: 'circuit breaker', definition: 'mẫu thiết kế ngắt kết nối tự động khi dịch vụ hạ tầng lỗi để tránh sập chuỗi', example: 'The circuit breaker tripped after 5 consecutive downstream timeouts.', phonetic: '/ˈsɜː.kɪt ˈbreɪ.kər/' },
  { term: 'consistent hashing', definition: 'thuật toán băm phân tán giúp giảm thiểu việc di chuyển key khi thêm/bớt node', example: 'Memcached clusters use consistent hashing for rebalancing.', phonetic: '/kənˈsɪs.tənt ˈhæʃ.ɪŋ/' },
  { term: 'sharding', definition: 'phương pháp phân mảnh cơ sở dữ liệu theo chiều ngang qua nhiều máy chủ', example: 'Database sharding enabled horizontal scalability across 16 nodes.', phonetic: '/ˈʃɑː.dɪŋ/' },
  { term: 'eventual consistency', definition: 'tính nhất quán sau cùng trong hệ thống phân tán (CAP Theorem)', example: 'NoSQL databases often choose availability and eventual consistency.', phonetic: '/ɪˈven.tʃu.əl kənˈsɪs.tən.si/' },
  { term: 'immutability', definition: 'tính bất biến, trạng thái không thể bị sửa đổi sau khi khởi tạo', example: 'Immutability prevents unintended side effects in React state.', phonetic: '/ɪˌmjuː.təˈbɪl.ə.ti/' },
  { term: 'memoization', definition: 'kỹ thuật tối ưu hóa lưu trữ kết quả của các lệnh gọi hàm tốn kém', example: 'React useMemo caches values via memoization.', phonetic: '/ˌmem.oʊ.ɪˈzeɪ.ʃən/' },
  { term: 'backpressure', definition: 'cơ chế kiểm soát dòng dữ liệu khi bên nhận xử lý chậm hơn bên gửi', example: 'Reactive streams handle backpressure to avoid out-of-memory errors.', phonetic: '/ˈbækˌpreʃ.ər/' },
  { term: 'rate limiting', definition: 'giới hạn số lượng yêu cầu của client trong một khoảng thời gian', example: 'We deployed a token bucket algorithm for API rate limiting.', phonetic: '/reɪt ˈlɪm.ɪ.tɪŋ/' },
  { term: 'connection pool', definition: 'hồ chứa các kết nối database được duy trì để tái sử dụng', example: 'The PostgreSQL connection pool was exhausted during the flash sale.', phonetic: '/kəˈnek.ʃən puːl/' }
]

async function wipeAndSeedDatabase() {
  console.log('🚀 Khởi động tiến trình làm sạch và nạp Master Database...')

  // Đọc file WASM từ node_modules/sql.js/dist/sql-wasm.wasm
  const wasmPath = path.resolve('./node_modules/sql.js/dist/sql-wasm.wasm')
  const wasmBinary = fs.readFileSync(wasmPath)

  const SQL = await initSqlJs({ wasmBinary: wasmBinary.buffer })

  if (!fs.existsSync(DB_PATH)) {
    console.error('❌ Không tìm thấy database tại:', DB_PATH)
    process.exit(1)
  }

  const dbBuffer = fs.readFileSync(DB_PATH)
  const db = new SQL.Database(dbBuffer)

  console.log('🧹 Đang xóa toàn bộ dữ liệu từ vựng cũ theo yêu cầu người dùng...')
  db.run('BEGIN TRANSACTION')
  db.run('DELETE FROM progress;')
  db.run('DELETE FROM words;')
  db.run('DELETE FROM decks;')
  try {
    db.run("DELETE FROM sqlite_sequence WHERE name IN ('words', 'decks', 'progress');")
  } catch (e) {
    // sqlite_sequence might not exist if no autoincrement fired
  }
  db.run('COMMIT')
  console.log('✅ Đã xóa sạch dữ liệu cũ.')

  // 1. Chuẩn bị 7 Master Decks
  console.log('📦 Đang đóng gói 7 Master Decks phân loại kỹ lưỡng...')

  // Master Deck 1: 600 Essential Words for the TOEIC (50 Business Topics)
  const toeic600Raw: WordItem[] = [
    ...TOEIC_PART_1_2,
    ...TOEIC_BUSINESS_TOPIC,
    ...toeic1500Data.map((item) => {
      const cleanDef = item.meaning ? item.meaning.split(/\s{2,}/)[0].trim() : ''
      return {
        term: item.word,
        definition: cleanDef || 'Từ vựng trọng tâm TOEIC',
        example: item.exampleEn || '',
        phonetic: item.ipa || '',
      }
    })
  ]
  const deck1Words = deduplicateWords(toeic600Raw).slice(0, 600)

  // Master Deck 2: 4000 Essential English Words (Paul Nation Foundation)
  const deck2Words = deduplicateWords([
    ...fundamentalsData.map((item) => ({
      term: item.word,
      definition: item.meaning,
      example: item.exampleEn || '',
      phonetic: item.ipa || '',
    })),
    ...TOEIC_0_250.map((item) => ({
      term: item.term,
      definition: item.definition,
      example: item.example || '',
      phonetic: item.phonetic || '',
    })),
    ...TOEIC_250_500.map((item) => ({
      term: item.term,
      definition: item.definition,
      example: item.example || '',
      phonetic: item.phonetic || '',
    }))
  ]).slice(0, 500)

  // Master Deck 3: Oxford 3000™ Core Vocabulary (CEFR A1 - B2)
  const deck3Words = deduplicateWords(
    OXFORD_A1_A2.map((item) => ({
      term: item.term,
      definition: item.definition,
      example: item.example || '',
      phonetic: item.phonetic || '',
    }))
  )

  // Master Deck 4: TOEIC Target 750+ & 900+ Mastery (Bứt Phá Điểm Số)
  const deck4Words = deduplicateWords([
    ...TOEIC_500_700.map((item) => ({ term: item.term, definition: item.definition, example: item.example || '', phonetic: item.phonetic || '' })),
    ...TOEIC_700_850.map((item) => ({ term: item.term, definition: item.definition, example: item.example || '', phonetic: item.phonetic || '' })),
    ...TOEIC_850_990.map((item) => ({ term: item.term, definition: item.definition, example: item.example || '', phonetic: item.phonetic || '' })),
    ...TOEIC_PART_7.map((item) => ({ term: item.term, definition: item.definition, example: item.example || '', phonetic: item.phonetic || '' })),
  ])

  // Master Deck 5: TOEIC Part 5 & 6 Grammatical Traps & Lexical Clues
  const deck5Words = deduplicateWords(
    TOEIC_PART_5_6.map((item) => ({
      term: item.term,
      definition: item.definition,
      example: item.example || '',
      phonetic: item.phonetic || '',
    }))
  )

  // Master Deck 6: Collocations & Thành Ngữ Thường Gặp (Ngoại Ngữ 24h & Mai Phương)
  const deck6Words = deduplicateWords(IDIOMS_AND_COLLOCATIONS)

  // Master Deck 7: IT & Software Engineering English (International SWE)
  const deck7Words = deduplicateWords(IT_SWE_VOCABULARY)

  const masterDecks: DeckDef[] = [
    {
      name: '600 Essential Words for the TOEIC (50 Business Units)',
      description: 'Bộ 600 từ vựng kinh điển chuẩn ETS & Barron phân chia theo 50 chủ đề công sở, hợp đồng, marketing, tài chính và nhân sự.',
      color: '#059669',
      icon: '🎯',
      words: deck1Words,
    },
    {
      name: '4000 Essential English Words (Paul Nation Foundation)',
      description: 'Giáo trình kinh điển của Giáo sư Paul Nation bao quát từ vựng giao tiếp cốt lõi tần suất cao nhất.',
      color: '#4F46E5',
      icon: '📘',
      words: deck2Words,
    },
    {
      name: 'Oxford 3000™ Core Vocabulary (CEFR A1 - B2)',
      description: 'Bộ từ vựng cốt lõi của Đại học Oxford định chuẩn theo Khung tham chiếu châu Âu CEFR A1 - B2.',
      color: '#D97706',
      icon: '🏛️',
      words: deck3Words,
    },
    {
      name: 'TOEIC Target 750+ & 900+ Mastery',
      description: 'Từ vựng học thuật, kinh tế và bẫy đề thi nâng cao trong Part 3, 4, 7 giúp bứt phá điểm số tối đa (Hacker TOEIC, ETS 2024).',
      color: '#DC2626',
      icon: '🚀',
      words: deck4Words,
    },
    {
      name: 'TOEIC Part 5 & 6 Grammatical Traps & Clues',
      description: 'Tổng hợp từ vựng chuyên biệt cho cấu trúc ngữ pháp Part 5 & 6: từ loại, liên từ, giới từ và cạm bẫy ra đề.',
      color: '#7C3AED',
      icon: '⚡',
      words: deck5Words,
    },
    {
      name: 'Collocations & Thành Ngữ Thường Gặp (Ngoại Ngữ 24h & Mai Phương)',
      description: 'Các cụm từ cố định, thành ngữ và kết hợp từ xuất hiện liên tục trong bài thi và giao tiếp quốc tế.',
      color: '#0891B2',
      icon: '💡',
      words: deck6Words,
    },
    {
      name: 'IT & Software Engineering English (International SWE)',
      description: 'Bộ từ vựng và khái niệm kỹ thuật máy tính, hệ thống phân tán, kiến trúc phần mềm chuẩn quốc tế.',
      color: '#2563EB',
      icon: '💻',
      words: deck7Words,
    },
  ]

  let totalInsertedWords = 0

  for (let d = 0; d < masterDecks.length; d++) {
    const deck = masterDecks[d]
    console.log(`\n📂 [Deck ${d + 1}/${masterDecks.length}] Đang nạp: ${deck.name} (${deck.words.length} từ)...`)

    db.run('BEGIN TRANSACTION')

    // 1. Insert Deck
    const deckSql = `INSERT INTO decks (name, description, color, icon, word_count, created_at, updated_at) VALUES (?, ?, ?, ?, ?, datetime('now'), datetime('now'))`
    db.run(deckSql, [deck.name, deck.description, deck.color, deck.icon, deck.words.length])

    const res = db.exec('SELECT last_insert_rowid() as id')
    const deckId = Number(res[0]?.values[0]?.[0] || 0)

    if (deckId <= 0) {
      db.run('ROLLBACK')
      console.error(`❌ Không lấy được deckId cho ${deck.name}`)
      continue
    }

    // 2. Insert Words & Progress
    const insertWordStmt = db.prepare(`INSERT INTO words (deck_id, term, definition, example, phonetic, created_at) VALUES (?, ?, ?, ?, ?, datetime('now'))`)
    const insertProgressStmt = db.prepare(`INSERT INTO progress (word_id, ease_factor, interval, repetitions, status, leitner_box) VALUES (?, 2.5, 0, 0, 'new', 1)`)

    let deckCount = 0
    for (const w of deck.words) {
      insertWordStmt.run([deckId, w.term, w.definition, w.example || '', w.phonetic || ''])
      const wordRes = db.exec('SELECT last_insert_rowid() as id')
      const wordId = Number(wordRes[0]?.values[0]?.[0] || 0)

      if (wordId > 0) {
        insertProgressStmt.run([wordId])
        deckCount++
      }
    }

    insertWordStmt.free()
    insertProgressStmt.free()

    // Cập nhật word_count thực tế
    db.run(`UPDATE decks SET word_count = ? WHERE id = ?`, [deckCount, deckId])

    db.run('COMMIT')
    totalInsertedWords += deckCount
    console.log(`  -> Đã nạp thành công ${deckCount} từ cho Deck ${deck.name}`)
  }

  // Ghi lại dữ liệu xuống file SQLite
  console.log(`\n💾 Đang xuất và lưu dữ liệu vào đĩa cứng: ${DB_PATH}...`)
  const data = db.export()
  fs.writeFileSync(DB_PATH, Buffer.from(data))

  console.log(`\n🎉 HOÀN THÀNH TẤT CẢ!`)
  console.log(`   - Tổng số Decks: ${masterDecks.length}`)
  console.log(`   - Tổng số từ vựng nạp mới: ${totalInsertedWords}`)
}

wipeAndSeedDatabase().catch((err) => {
  console.error('Fatal error seeding database:', err)
  process.exit(1)
})
