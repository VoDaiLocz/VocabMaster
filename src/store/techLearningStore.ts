// ============================================
// Tech Learning Store - Zustand State Management
// Quản lý Bảng kiến thức kỹ sư phần mềm chuẩn Kanban (Trello-style)
// ============================================

import { create } from 'zustand'

export type TechStage = 'inbox' | 'review' | 'mastered'

export interface TechVocabItem {
  term: string
  meaning: string
}

export interface TechCard {
  id: string
  title: string // Tên khái niệm (VD: Token Bucket Rate Limiter)
  category: string // System Design, Backend, Database, DevOps, Frontend, AI
  summary: string // TL;DR bản chất cốt lõi
  tradeoffs?: {
    pros: string[] // Ưu điểm nổi bật
    cons: string[] // Nhược điểm / Hạn chế
    whenToUse?: string // Khi nào nên áp dụng
  }
  techVocab: TechVocabItem[] // Thuật ngữ tiếng Anh đi kèm
  codeSnippet?: string // Code hoặc config snippet minh họa
  videoId?: string
  videoTitle?: string
  timestamp?: number // Giây trong video để nhảy tới
  stage: TechStage // inbox -> review -> mastered
  createdAt: string
  updatedAt: string
}

interface TechLearningState {
  cards: TechCard[]
  searchQuery: string
  selectedCategory: string | null
  addCard: (card: Omit<TechCard, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateCard: (id: string, updates: Partial<TechCard>) => void
  moveStage: (id: string, newStage: TechStage) => void
  deleteCard: (id: string) => void
  setSearchQuery: (query: string) => void
  setSelectedCategory: (category: string | null) => void
}

const STORAGE_KEY = 'vocabmaster_tech_learning_cards'

// Bộ thẻ mẫu khởi đầu chất lượng cao chuẩn kỹ sư phần mềm
const DEFAULT_TECH_CARDS: TechCard[] = [
  {
    id: 'tech-card-1',
    title: 'Token Bucket Algorithm (Giới Hạn Tốc Độ)',
    category: 'System Design',
    summary:
      'Mỗi giây hệ thống bơm thêm N token vào xô (sức chứa tối đa M). Mỗi request đến phải lấy 1 token; nếu xô hết token, request bị từ chối (HTTP 429) hoặc hoãn lại.',
    tradeoffs: {
      pros: [
        'Hỗ trợ burst capacity: cho phép lưu lượng tăng đột biến trong thời gian ngắn',
        'Bộ nhớ cực nhẹ O(1): chỉ cần lưu 1 số đếm token và 1 timestamp lần nạp cuối',
      ],
      cons: ['Cần đồng bộ atomic (Redis Lua Script) khi chạy trong môi trường phân tán'],
      whenToUse: 'Dùng cho API Gateway, Public API (Stripe, GitHub) chống spam và DDoS.',
    },
    techVocab: [
      { term: 'burst capacity', meaning: 'khả năng chịu lưu lượng tăng đột biến' },
      { term: 'token refill rate', meaning: 'tốc độ bơm token theo thời gian' },
      { term: 'rate limit throttling', meaning: 'hãm/giới hạn tần suất yêu cầu' },
    ],
    videoId: 'YXkOdWBwqaA',
    videoTitle: 'Rate Limiter System Design',
    timestamp: 120,
    stage: 'mastered',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'tech-card-2',
    title: 'Idempotency Key Pattern (Chống Trùng Lặp Giao Dịch)',
    category: 'Backend',
    summary:
      'Client sinh UUID duy nhất cho mỗi giao dịch và gửi trong Header Idempotency-Key. Server lưu kết quả lần đầu, các lần gửi lại cùng Key sẽ trả về ngay kết quả cũ mà không thực hiện trừ tiền 2 lần.',
    tradeoffs: {
      pros: [
        'Loại bỏ triệt để rủi ro double-charge khi mạng chập chờn timeout',
        'Đảm bảo an toàn tuyệt đối cho hệ thống thanh toán phân tán',
      ],
      cons: ['Phải quản lý TTL cho idempotency keys trong Redis/Database'],
      whenToUse: 'Bắt buộc dùng cho Payment APIs, Order Checkout, Webhook Consumers.',
    },
    techVocab: [
      {
        term: 'idempotent operation',
        meaning: 'thao tác thực hiện nhiều lần cho kết quả như nhau',
      },
      { term: 'double billing', meaning: 'tính tiền hai lần do retry mạng' },
      { term: 'atomic lock', meaning: 'khóa nguyên tử chống xử lý đồng thời' },
    ],
    videoId: 'YXkOdWBwqaA',
    videoTitle: 'Rate Limiter & API Design',
    timestamp: 240,
    stage: 'review',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'tech-card-3',
    title: 'B-Tree vs LSM-Tree (Kiến Trúc Chỉ Mục CSDL)',
    category: 'Database',
    summary:
      'B-Tree ghi đè trực tiếp theo trang (In-place update) tối ưu đọc ngẫu nhiên (PostgreSQL, MySQL). LSM-Tree ghi tuần tự vào MemTable rồi Flush xuống SSTable (Append-only) tối ưu ghi siêu tốc (Cassandra, RocksDB).',
    tradeoffs: {
      pros: [
        'B-Tree: Đọc ngẫu nhiên cực nhanh O(log N), độ trễ ổn định',
        'LSM-Tree: Tốc độ ghi tuần tự đột phá, nén dữ liệu tốt hơn',
      ],
      cons: [
        'B-Tree bị Write Amplification cao khi ghi ngẫu nhiên',
        'LSM-Tree tốn CPU lúc Compaction nền gộp các SSTable',
      ],
      whenToUse:
        'Dùng B-Tree cho OLTP truyền thống; dùng LSM-Tree cho Time-Series, Logging, Metrics.',
    },
    techVocab: [
      { term: 'write amplification', meaning: 'hệ số khuếch đại ghi trên ổ cứng' },
      { term: 'compaction', meaning: 'quá trình dọn dẹp và hợp nhất bảng dữ liệu' },
      { term: 'in-place update', meaning: 'cập nhật đè trực tiếp tại vị trí cũ' },
    ],
    videoId: 'uvb00oaa3k8',
    videoTitle: 'Kafka & Storage Engines',
    timestamp: 45,
    stage: 'inbox',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

function loadInitialCards(): TechCard[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    }
  } catch (e) {
    console.warn('Failed to parse tech cards from localStorage:', e)
  }
  return DEFAULT_TECH_CARDS
}

export const useTechLearningStore = create<TechLearningState>((set, get) => ({
  cards: loadInitialCards(),
  searchQuery: '',
  selectedCategory: null,

  addCard: (cardData) => {
    const now = new Date().toISOString()
    const newCard: TechCard = {
      ...cardData,
      id: 'tech-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
      createdAt: now,
      updatedAt: now,
    }
    const updated = [newCard, ...get().cards]
    set({ cards: updated })
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    } catch (e) {
      console.error('Error saving tech cards:', e)
    }
  },

  updateCard: (id, updates) => {
    const updated = get().cards.map((c) =>
      c.id === id ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c,
    )
    set({ cards: updated })
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    } catch (e) {
      console.error('Error saving tech cards:', e)
    }
  },

  moveStage: (id, newStage) => {
    get().updateCard(id, { stage: newStage })
  },

  deleteCard: (id) => {
    const updated = get().cards.filter((c) => c.id !== id)
    set({ cards: updated })
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    } catch (e) {
      console.error('Error saving tech cards:', e)
    }
  },

  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}))
