// ============================================
// Full Stack Modern Software Engineering Roadmap (2025/2026 Big Tech Standard)
// 100% Complete Bilingual Subtitles & Real Tech Mastery
// Thiết kế 6 Giai đoạn Kỹ sư chuẩn xu hướng hiện đại (Mỗi giai đoạn đủ 30 bài học thực chiến)
// ============================================

import { VideoInfo, TranscriptCue } from '@/services/youtubeTranscriptService'
import offlineSeMetadata from './offline_se_videos_metadata.json'
import {
  STAGE1_FOUNDATION_IDS,
  STAGE2_TYPESCRIPT_REACT_IDS,
  STAGE3_GOLANG_BACKEND_IDS,
  STAGE4_RUST_SYSTEMS_IDS,
  STAGE5_STORAGE_STREAMING_IDS,
  STAGE6_AI_SYSTEM_DESIGN_IDS,
  INTERN_IDS,
  FRESHER_IDS,
  JUNIOR_IDS,
  MID_LEVEL_IDS,
  SENIOR_IDS,
  STAFF_LEAD_IDS,
  EXPANDED_CURRICULUM_METADATA,
} from './curriculumData'

export interface LearningFlowStep {
  step: number
  info: VideoInfo
  sampleCues: TranscriptCue[]
}

export interface CuratedVideo {
  info: Omit<VideoInfo, 'category' | 'level' | 'sentenceCount'>
  sampleCues: TranscriptCue[]
  quiz?: any[]
}

export interface LearningFlow {
  id: string
  phaseNumber?: number
  levelRank?: 'Intern' | 'Fresher' | 'Junior' | 'Mid-Level' | 'Senior' | 'Staff+'
  title: string
  subtitle?: string
  description: string
  icon?: string
  thumbnailUrl?: string
  level?: 'A2 - Cơ bản' | 'B1 - Trung cấp' | 'B2 - Khá' | 'C1 - Nâng cao'
  estimatedHours?: string
  category?: 'ai' | 'code' | 'career'
  badge?: string
  videos: CuratedVideo[]
}

// Map nhanh từ videoId sang đối tượng CuratedVideo
const videoMap = new Map<string, CuratedVideo>()

// 1. Nạp từ metadata offline có sẵn
offlineSeMetadata.forEach((meta: any) => {
  videoMap.set(meta.videoId, {
    info: {
      videoId: meta.videoId,
      title: meta.title,
      channel: meta.channel,
      thumbnailUrl: `https://img.youtube.com/vi/${meta.videoId}/hqdefault.jpg`,
      durationFormatted: meta.durationFormatted || '02:30',
      description: meta.description,
      tags: meta.tags,
      sentenceCount: meta.sentenceCount,
    } as any,
    sampleCues: [],
    quiz: [],
  })
})

// 2. Nạp thêm toàn bộ danh mục video chuyên sâu hiện đại
EXPANDED_CURRICULUM_METADATA.forEach((meta) => {
  videoMap.set(meta.videoId, {
    info: {
      videoId: meta.videoId,
      title: meta.title,
      channel: meta.channel,
      thumbnailUrl: `https://img.youtube.com/vi/${meta.videoId}/hqdefault.jpg`,
      durationFormatted: meta.durationFormatted,
      description: meta.description,
      tags: meta.tags,
      sentenceCount: meta.sentenceCount || 150,
    } as any,
    sampleCues: [],
    quiz: [],
  })
})

// Helper lấy danh sách CuratedVideo theo thứ tự mảng ID
function getVideosByIds(ids: string[]): CuratedVideo[] {
  return ids.map((id) => videoMap.get(id)).filter((v): v is CuratedVideo => v !== undefined)
}

// Export các mảng ID
export {
  STAGE1_FOUNDATION_IDS,
  STAGE2_TYPESCRIPT_REACT_IDS,
  STAGE3_GOLANG_BACKEND_IDS,
  STAGE4_RUST_SYSTEMS_IDS,
  STAGE5_STORAGE_STREAMING_IDS,
  STAGE6_AI_SYSTEM_DESIGN_IDS,
  INTERN_IDS,
  FRESHER_IDS,
  JUNIOR_IDS,
  MID_LEVEL_IDS,
  SENIOR_IDS,
  STAFF_LEAD_IDS,
}

export const IT_AI_LEARNING_FLOWS: LearningFlow[] = [
  {
    id: 'se-overview',
    phaseNumber: 0,
    title: '🌟 Toàn Bộ Tuyển Tập Kỹ Sư Phần Mềm Hiện Đại (180 Bài Học Chuyên Sâu)',
    subtitle: 'Lộ trình Quốc tế Toàn diện: Systems, Modern Web, Go, Rust, AI & Cloud',
    description:
      'Tuyển tập 180 video YouTube chuyên sâu thực chiến 2025/2026: Andrej Karpathy (AI/LLMs), The Cherno (C++ Systems), Matt Pocock (TypeScript), Anthony GG (Go), Jack Herrington (React 19), Hussein Nasser (Databases), ByteByteGo (System Design), TechWorld with Nana (Docker/K8s) với 100% phụ đề song ngữ và Thuyết minh xen kẽ.',
    icon: '🚀',
    badge: 'Toàn Bộ Tuyển Tập (180 Bài)',
    level: 'B2 - Khá',
    estimatedHours: '60+ giờ',
    category: 'code',
    videos: [
      ...getVideosByIds(STAGE1_FOUNDATION_IDS),
      ...getVideosByIds(STAGE2_TYPESCRIPT_REACT_IDS),
      ...getVideosByIds(STAGE3_GOLANG_BACKEND_IDS),
      ...getVideosByIds(STAGE4_RUST_SYSTEMS_IDS),
      ...getVideosByIds(STAGE5_STORAGE_STREAMING_IDS),
      ...getVideosByIds(STAGE6_AI_SYSTEM_DESIGN_IDS),
    ],
  },
  {
    id: 'se-level-1-intern',
    phaseNumber: 1,
    levelRank: 'Intern',
    title: 'Giai Đoạn 1: Systems Foundation, C++ Memory & Linux CLI (30 Bài Thực Chiến)',
    subtitle: 'The Cherno (C++), LeetCode Big-O (NeetCode), Linux FHS, Git DAG & Networking',
    description:
      'Khởi đầu nền tảng kỹ sư hiện đại: Ngôn ngữ C++ và cơ chế bộ nhớ máy tính (The Cherno), giải thuật LeetCode và phân tích Big-O (NeetCode), Linux Terminal, Bash Shell Scripting, Git DAG Merge vs Rebase và hạ tầng mạng TCP/IP.',
    icon: '💻',
    badge: 'Stage 1: Foundation (30 Bài)',
    level: 'A2 - Cơ bản',
    estimatedHours: '8.5 giờ',
    category: 'code',
    videos: getVideosByIds(STAGE1_FOUNDATION_IDS),
  },
  {
    id: 'se-level-2-fresher',
    phaseNumber: 2,
    levelRank: 'Fresher',
    title: 'Giai Đoạn 2: Modern Frontend & TypeScript 5+ Masterclass (30 Bài)',
    subtitle: 'TypeScript Compiler, React 19 RSC, Fiber Reconciliation & Clean Code',
    description:
      'Làm chủ công nghệ Web tiên tiến: Lập trình TypeScript tĩnh, Next.js Full Stack App Router, kiến trúc React 19 Server Components, Virtual DOM Fiber, V8 Event Loop (Philip Roberts) và Clean Code Guard Clauses (CodeAesthetic).',
    icon: '⚡',
    badge: 'Stage 2: Web & TS (30 Bài)',
    level: 'B1 - Trung cấp',
    estimatedHours: '9.5 giờ',
    category: 'code',
    videos: getVideosByIds(STAGE2_TYPESCRIPT_REACT_IDS),
  },
  {
    id: 'se-level-3-junior',
    phaseNumber: 3,
    levelRank: 'Junior',
    title: 'Giai Đoạn 3: Modern Backend & Concurrency với Golang & Python (30 Bài)',
    subtitle: 'Golang Microservices, Concurrency CSP, Node.js Libuv, REST APIs & Python',
    description:
      'Xây dựng hệ thống Backend chịu tải cao: Ngôn ngữ Golang cho Microservices, Goroutines & Channels, tự viết Container bằng Go (Liz Rice), Node.js phía máy chủ và lập trình Python OOP thực tế.',
    icon: '🐹',
    badge: 'Stage 3: Go Backend (30 Bài)',
    level: 'B1 - Trung cấp',
    estimatedHours: '10.0 giờ',
    category: 'code',
    videos: getVideosByIds(STAGE3_GOLANG_BACKEND_IDS),
  },
  {
    id: 'se-level-4-mid',
    phaseNumber: 4,
    levelRank: 'Mid-Level',
    title: 'Giai Đoạn 4: Systems Programming với Rust & Database Engines (30 Bài)',
    subtitle: 'Rust Memory Safety, B-Trees vs B+ Trees, PostgreSQL ACID & Indexing',
    description:
      'Lập trình hệ thống với Rust an toàn bộ nhớ không cần Garbage Collector, bản chất cấu trúc cây B-Tree cho cơ sở dữ liệu, giao dịch ACID và phân tích chỉ mục Indexing trên PostgreSQL cùng Hussein Nasser.',
    icon: '🦀',
    badge: 'Stage 4: Rust & DB (30 Bài)',
    level: 'B2 - Khá',
    estimatedHours: '9.0 giờ',
    category: 'code',
    videos: getVideosByIds(STAGE4_RUST_SYSTEMS_IDS),
  },
  {
    id: 'se-level-5-senior',
    phaseNumber: 5,
    levelRank: 'Senior',
    title: 'Giai Đoạn 5: In-Memory Storage, Caching & Distributed Event Streaming (30 Bài)',
    subtitle: 'Redis RAM Architecture, Kafka 1 Trillion Throughput, RabbitMQ & GraphQL',
    description:
      'Tầng lưu trữ tốc độ cao và truyền phát sự kiện: Tại sao Redis siêu nhanh với Single-threaded Event Loop, Apache Kafka ghi tuần tự đĩa xử lý hàng nghìn tỷ thông điệp, hàng đợi RabbitMQ và GraphQL declarative fetching.',
    icon: '🔥',
    badge: 'Stage 5: Redis & Kafka (30 Bài)',
    level: 'B2 - Khá',
    estimatedHours: '8.5 giờ',
    category: 'code',
    videos: getVideosByIds(STAGE5_STORAGE_STREAMING_IDS),
  },
  {
    id: 'se-level-6-staff',
    phaseNumber: 6,
    levelRank: 'Staff+',
    title: 'Giai Đoạn 6: AI Engineering (LLMs), High-Scale System Design & Cloud DevOps (30 Bài)',
    subtitle: 'Andrej Karpathy (LLMs), ByteByteGo System Design, Docker, Kubernetes & OAuth 2',
    description:
      'Đỉnh cao kiến trúc kỹ sư hiện đại 2025/2026: Kiến trúc mô hình ngôn ngữ lớn LLMs cùng Andrej Karpathy (OpenAI), 20 khái niệm System Design (NeetCode), Rate Limiter & Consistent Hashing (ByteByteGo), Docker và Kubernetes cùng TechWorld with Nana, Bảo mật OAuth 2.0 / OIDC.',
    icon: '🤖',
    badge: 'Stage 6: AI & System Design (30 Bài)',
    level: 'C1 - Nâng cao',
    estimatedHours: '12.0 giờ',
    category: 'ai',
    videos: getVideosByIds(STAGE6_AI_SYSTEM_DESIGN_IDS),
  },
]
