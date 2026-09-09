// ============================================
// Full Stack Software Engineering Roadmap (International Standard)
// 100% Complete Bilingual Subtitles (0:00 to end)
// Thiết kế chuẩn nấc thang: Intern ➔ Fresher ➔ Junior ➔ Mid-Level ➔ Senior ➔ Staff+ / Lead
// ============================================

import { VideoInfo, TranscriptCue } from '@/services/youtubeTranscriptService'
import offlineSeMetadata from './offline_se_videos_metadata.json'

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
    sampleCues: [], // Tự động nạp 100% full transcript từ offline_transcripts.json
    quiz: [],
  })
})

// Helper lấy danh sách CuratedVideo theo thứ tự mảng ID
function getVideosByIds(ids: string[]): CuratedVideo[] {
  return ids.map((id) => videoMap.get(id)).filter((v): v is CuratedVideo => v !== undefined)
}

// =======================================================================
// BỘ DANH MỤC VIDEO PHÂN CẤP THEO NẤC THANG TỪ INTERN ĐẾN STAFF+
// =======================================================================

// Cấp 1: Intern (Thực tập sinh - Nền tảng nhập môn & Thuật toán - Đủ 30 Video Chuẩn Quốc Tế)
const INTERN_IDS = [
  'iG9CE55wbtY', // Sir Ken Robinson TED (19:24, 427 câu) - Do schools kill creativity? (Tư duy sáng tạo & Giáo dục)
  'KLlXCFG5TnA', // Big-O Notation & Algorithm Complexity (NeetCode - 11:27, 195 câu song ngữ)
  'UF8uR6Z6KLc', // Steve Jobs Stanford 2005 (15:04, 244 câu) - Stay Hungry Stay Foolish
  '8aGhZQkoFbQ', // Event Loop & Call Stack Internals (Philip Roberts JSConf - 26:48, 336 câu)
  'rrB13utjYV4', // Linux in 100s (24 câu)
  'I4EWvMFj37g', // Bash Shell in 100s (23 câu)
  'hwP7WQkmECE', // Git Version Control in 100s (20 câu)
  '-txKSRn0qeA', // Vim in 100s (98 câu)
  'c4OyfL5o7DU', // Neovim in 100s (20 câu)
  'ok-plXXHlWw', // HTML in 100s (21 câu)
  'OEV8gMkCHXQ', // CSS in 100s (19 câu)
  'DHjqpvDnNGE', // JavaScript in 100s (23 câu)
  'x7X9w_GIm1s', // Python in 100s (19 câu)
  'MNeX4EGtR5Y', // C++ in 100s (24 câu)
  '446E-r0rXHI', // Go in 100s (20 câu)
  '5C_HPTJg5ek', // Rust in 100s (21 câu)
  'l9AzO1FMgM8', // Java in 100s (20 câu)
  'cbB3QEwWMlA', // WebAssembly (WASM) in 100s (20 câu)
  'mr15Xzb1Ook', // Tailwind CSS in 100s (19 câu)
  'UVR9lhUGAyU', // DNS in 100s (20 câu)
  'zsjvFFKOm3c', // SQL in 100s (20 câu)
  'n2Fluyr3lbc', // PostgreSQL in 100s (23 câu)
  '-MTSQjw5DrM', // RESTful APIs in 100s (96 câu)
  'ENrzD9HAZK4', // Node.js Ultimate Beginner Guide (159 câu)
  'zQnBQ4tB3ZA', // TypeScript in 100s (22 câu)
  'Tn6-PIqc4UM', // React in 100s (20 câu)
  'Gjnup-PuquQ', // Docker in 100s (20 câu)
  'JKxlsvZXG7c', // Nginx in 100s (20 câu)
  'scEDHsr3APg', // DevOps CI/CD in 100s (18 câu)
  'ZV5yTm4pT8g', // OAuth 2.0 Explained (28 câu)
]

// Cấp 2: Fresher (Mới ra trường / Lập trình viên Web & Runtime sâu - Đủ 30 Video Chuẩn Quốc Tế)
const FRESHER_IDS = [
  'KjY94sAKLlw', // TypeScript for Senior Engineers (Matt Pocock - 18:45, 1859 câu)
  'X48VuDVv0do', // Kubernetes Architecture & Ingress (TechWorld with Nana - 58:40, 1392 câu)
  'w7ejDZ8SWv8', // React 19 & Server Components Walkthrough (Jack Herrington - 13:10, 886 câu)
  'qSJAvd5Mgio', // Design TinyURL URL Shortener (ByteByteGo - 12:35, 712 câu)
  'pg19Z8LL06w', // Docker Crash Course for Absolute Beginners (TechWorld with Nana - 45:30, 444 câu)
  '8aGhZQkoFbQ', // What the heck is the event loop anyway? (Philip Roberts - 26:48, 336 câu)
  'ENrzD9HAZK4', // Node.js Ultimate Guide: Libuv & Async (Fireship - 11:32, 159 câu)
  '-qNSXK7s7_w', // Database Indexing Explained with PostgreSQL (Hussein Nasser - 24:18, 138 câu)
  'YXkOdWBwqaA', // Rate Limiter System Design: Token Bucket (ByteByteGo - 10:20, 111 câu)
  'Sklc_fQBmcs', // Next.js Architecture in 100s (Fireship - 12:15, 103 câu)
  '-MTSQjw5DrM', // RESTful APIs Best Practices in 100s (Fireship - 96 câu)
  'SqcXvc3ZmRU', // Microservices vs Monolith Architecture (Hussein Nasser - 16:45, 79 câu)
  'tzq4asJegKY', // Elasticsearch & Lucene Search Engines (Fireship - 09:40, 76 câu)
  'UF9Iqmg94tk', // Consistent Hashing Algorithms (ByteByteGo - 08:12, 51 câu)
  'M4TufsFlv_o', // Bun JavaScript Runtime in 100s (Fireship - 37 câu)
  'ZV5yTm4pT8g', // OAuth 2.0 & OpenID Connect Deep Dive (ByteByteGo - 28 câu)
  'ZzI9JE0i6Lc', // AWS Cloud Infrastructure in 100s (Fireship - 25 câu)
  'NQ3fZtyXji0', // RabbitMQ Message Queues in 100s (Fireship - 23 câu)
  'zBZgdTb-dns', // Supabase Realtime PostgreSQL in 100s (Fireship - 22 câu)
  'uvb00oaa3k8', // Kafka Distributed Streaming in 100s (Fireship - 21 câu)
  'G1rOthIU-uo', // Redis In-Memory Caching in 100s (Fireship - 21 câu)
  'eIQh02xuVw4', // GraphQL Query Language in 100s (Fireship - 20 câu)
  'F0G9lZ7gecE', // Deno Secure Runtime in 100s (Fireship - 20 câu)
  'nhBVL41-_Cw', // Vue.js 3 in 100s (Fireship - 19 câu)
  'rv3Yq-B8qp4', // Svelte Frontend in 100s (Fireship - 20 câu)
  '-bt_y4Loofg', // MongoDB NoSQL in 100s (Fireship - 20 câu)
  'PziYflu8cB8', // Kubernetes in 100s (Fireship - 20 câu)
  'tomUWcQ0P3k', // Terraform IaC in 100s (Fireship - 20 câu)
  'xT8oP0wy-A0', // Kotlin Multiplatform in 100s (Fireship - 20 câu)
  'nAchMctX4YA', // Swift Native Architecture in 100s (Fireship - 20 câu)
]

// Cấp 3: Junior (Kỹ sư độc lập / Clean Code & Đa ngôn ngữ sâu)
const JUNIOR_IDS = [
  'KjY94sAKLlw', // TypeScript for Senior Engineers (Matt Pocock - 18:45, 1859 câu)
  'w7ejDZ8SWv8', // React 19 & RSC Walkthrough (Jack Herrington - 13:10, 886 câu)
  'nhBVL41-_Cw', // Vue.js in 100s
  'rv3Yq-B8qp4', // Svelte in 100s
  '446E-r0rXHI', // Go in 100s
  '5C_HPTJg5ek', // Rust in 100s
  'MNeX4EGtR5Y', // C++ in 100s
  'l9AzO1FMgM8', // Java in 100s
  'cbB3QEwWMlA', // WebAssembly (WASM) in 100s
  'F0G9lZ7gecE', // Deno in 100s
  'M4TufsFlv_o', // Bun in 100s (37 câu)
]

// Cấp 4: Mid-Level (Kỹ sư Backend, Database & Runtimes chuyên sâu)
const MID_LEVEL_IDS = [
  '-qNSXK7s7_w', // Database Indexing B-Tree (Hussein Nasser - 24:18, 138 câu)
  'tzq4asJegKY', // Elasticsearch & Lucene (09:40, 76 câu)
  'G1rOthIU-uo', // Redis in 100s
  'NQ3fZtyXji0', // RabbitMQ in 100s
  'uvb00oaa3k8', // Kafka in 100s
  'UVR9lhUGAyU', // DNS in 100s
  'eIQh02xuVw4', // GraphQL in 100s
  'JKxlsvZXG7c', // Nginx in 100s
  'ZV5yTm4pT8g', // OAuth 2.0 Explained (ByteByteGo - 06:40, 28 câu)
  'tomUWcQ0P3k', // Terraform in 100s
]

// Cấp 5: Senior (Kiến trúc sư System Design, High-Scale & DevOps SRE)
const SENIOR_IDS = [
  'pg19Z8LL06w', // Docker Crash Course (TechWorld with Nana - 45:30, 444 câu)
  'X48VuDVv0do', // Kubernetes Architecture: Pods, Deployments & Ingress (Nana - 58:40, 1392 câu)
  'YXkOdWBwqaA', // Rate Limiter System Design (ByteByteGo - 10:20, 111 câu)
  'UF9Iqmg94tk', // Consistent Hashing (ByteByteGo - 08:12, 51 câu)
  'qSJAvd5Mgio', // URL Shortener TinyURL (ByteByteGo - 12:35, 712 câu)
  'SqcXvc3ZmRU', // Microservices vs Monolith (Hussein Nasser - 16:45, 79 câu)
  'Gjnup-PuquQ', // Docker in 100s
  'PziYflu8cB8', // Kubernetes in 100s
  'scEDHsr3APg', // DevOps CI/CD in 100s
  'ZzI9JE0i6Lc', // AWS Cloud in 100s
]

// Cấp 6: Staff+ / Lead (Lãnh đạo kỹ thuật & Bản lĩnh kỹ sư quốc tế)
const STAFF_LEAD_IDS = [
  'UF8uR6Z6KLc', // Steve Jobs Stanford 2005 (15:04, 244 câu song ngữ)
  'iG9CE55wbtY', // Sir Ken Robinson TED: Do schools kill creativity? (19:24, 427 câu)
  'SqcXvc3ZmRU', // Kiến Trúc Cấp Hệ Thống & Đánh Đổi Chiến Lược (Hussein Nasser - 16:45)
  'YXkOdWBwqaA', // Thiết Kế Chịu Tải & Chống Sập Hệ Thống Lớn (ByteByteGo - 10:20)
  'X48VuDVv0do', // Quy Chuẩn Hạ Tầng Doanh Nghiệp (TechWorld with Nana - 58:40)
  'xT8oP0wy-A0', // Kotlin in 100s
  'nAchMctX4YA', // Swift in 100s
  'lHhRhPV--G0', // Flutter in 100s
]

export const IT_AI_LEARNING_FLOWS: LearningFlow[] = [
  {
    id: 'se-overview',
    phaseNumber: 0,
    title: '🌟 Toàn Bộ Tuyển Tập Kỹ Sư Phần Mềm (57 Video Trọn Vẹn)',
    subtitle: 'Lộ trình từ Intern đến Staff+ (Full Stack, System Design & Cloud)',
    description:
      'Tuyển tập 57 video YouTube chất lượng cao nhất từ ByteByteGo, Hussein Nasser, Nana, Fireship, Matt Pocock, Philip Roberts, NeetCode với 100% phụ đề song ngữ kỹ thuật đầy đủ từ giây đầu tiên đến giây cuối cùng.',
    icon: '🚀',
    badge: 'Toàn Tuyển Tập',
    level: 'B2 - Khá',
    estimatedHours: '14 giờ',
    category: 'code',
    videos: Array.from(videoMap.values()),
  },
  {
    id: 'se-level-1-intern',
    phaseNumber: 1,
    levelRank: 'Intern',
    title: 'Cấp Độ 1: Intern Engineer (Thực Tập Sinh Nhập Môn - 30 Video)',
    subtitle:
      'Tư Duy Sáng Tạo (Ken Robinson 427 câu), Big-O (NeetCode 195 câu), Steve Jobs (244 câu), Event Loop, Linux, Git & 30 Bài',
    description:
      'Giáo trình 30 video thực chiến chuẩn mực FAANG: Giải phóng tư duy sáng tạo (Sir Ken Robinson TED 427 câu), làm chủ độ phức tạp thuật toán Big-O (NeetCode 195 câu), Steve Jobs Stanford (244 câu), Event Loop (336 câu), hệ điều hành Linux, dòng lệnh Bash, Git DAG, Vim, C++, Go, Rust, WebAssembly, HTML/CSS/JS, SQL và REST API.',
    icon: '🌱',
    badge: '🌱 Intern Level (30 Video)',
    level: 'A2 - Cơ bản',
    estimatedHours: '8.5 giờ',
    category: 'code',
    videos: getVideosByIds(INTERN_IDS),
  },
  {
    id: 'se-level-2-fresher',
    phaseNumber: 2,
    levelRank: 'Fresher',
    title: 'Cấp Độ 2: Fresher Engineer (Hệ Thống Web & Sản Xuất - 30 Video)',
    subtitle:
      'TypeScript Nâng Cao (Matt Pocock 1.859 câu), Kubernetes (Nana 1.392 câu), React 19 RSC (Jack 886 câu), TinyURL (712 câu) & 30 Bài',
    description:
      'Giáo trình 30 video chuyên sâu cấp sản xuất: TypeScript Nâng Cao (Matt Pocock 1.859 câu), Kiến Trúc Kubernetes (Nana 1.392 câu), React 19 RSC (Jack Herrington 886 câu), TinyURL System Design (ByteByteGo 712 câu), Docker Crash Course (Nana 444 câu), Event Loop (336 câu), Node.js (159 câu), Chỉ mục Database PostgreSQL (138 câu), Rate Limiter (111 câu), Microservices, Next.js, Redis, Kafka và Bảo mật OAuth.',
    icon: '🌿',
    badge: '🌿 Fresher Level (30 Video)',
    level: 'B1 - Trung cấp',
    estimatedHours: '12 giờ',
    category: 'code',
    videos: getVideosByIds(FRESHER_IDS),
  },
  {
    id: 'se-level-3-junior',
    phaseNumber: 3,
    levelRank: 'Junior',
    title: 'Cấp Độ 3: Junior Engineer (Kỹ Sư Độc Lập & Clean Code)',
    subtitle:
      'TypeScript Nâng Cao (Matt Pocock 18m), React 19 RSC (Jack Herrington 13m), Go, Rust, C++, Java, WASM, Deno & Bun',
    description:
      'Nâng tầm kỹ năng lập trình độc lập: Kỹ thuật Type-Gymnastics chuyên sâu với Matt Pocock (1.859 câu song ngữ), kiến trúc React Server Components với Jack Herrington (886 câu), làm chủ đa ngôn ngữ hiệu năng cao (Go, Rust, C++, Java) và các runtime hiện đại (Deno, Bun).',
    icon: '⚡',
    badge: '⚡ Junior Level',
    level: 'B1 - Trung cấp',
    estimatedHours: '4 giờ',
    category: 'code',
    videos: getVideosByIds(JUNIOR_IDS),
  },
  {
    id: 'se-level-4-mid',
    phaseNumber: 4,
    levelRank: 'Mid-Level',
    title: 'Cấp Độ 4: Mid-Level Engineer (Kỹ Sư Backend & Database Sâu)',
    subtitle:
      'Database Indexing (Hussein Nasser 24m), Elasticsearch (10m), Redis, RabbitMQ, Kafka, DNS, GraphQL, Nginx & Terraform',
    description:
      'Làm chủ kiến trúc dịch vụ và bộ máy lưu trữ: Cơ chế chỉ mục B-Tree cùng Hussein Nasser (24 phút), tìm kiếm toàn văn Elasticsearch & Lucene, bộ nhớ đệm Redis, thông điệp phân tán Kafka/RabbitMQ, giao thức mạng DNS/GraphQL và hạ tầng Terraform.',
    icon: '🔥',
    badge: '🔥 Mid-Level',
    level: 'B2 - Khá',
    estimatedHours: '4.5 giờ',
    category: 'code',
    videos: getVideosByIds(MID_LEVEL_IDS),
  },
  {
    id: 'se-level-5-senior',
    phaseNumber: 5,
    levelRank: 'Senior',
    title: 'Cấp Độ 5: Senior Engineer (Kiến Trúc Sư System Design & SRE)',
    subtitle:
      'Docker Crash Course (Nana 45m), Kubernetes Architecture (Nana 58m), Rate Limiter, Consistent Hashing, TinyURL & Microservices',
    description:
      'Thiết kế hệ thống phân tán chịu tải hàng triệu người dùng cùng Alex Xu (ByteByteGo) và TechWorld with Nana: Docker Crash Course (444 câu song ngữ), kiến trúc Kubernetes từ Pod đến Ingress (1.392 câu), thiết kế Rate Limiter, băm nhất quán, rút gọn URL và đánh đổi Microservices.',
    icon: '🏛️',
    badge: '🏛️ Senior Level',
    level: 'B2 - Khá',
    estimatedHours: '6.5 giờ',
    category: 'code',
    videos: getVideosByIds(SENIOR_IDS),
  },
  {
    id: 'se-level-6-staff',
    phaseNumber: 6,
    levelRank: 'Staff+',
    title: 'Cấp Độ 6: Staff+ Engineer & Tech Lead (Lãnh Đạo Kỹ Thuật)',
    subtitle:
      'Steve Jobs Stanford (15m), Sir Ken Robinson TED (19m), Kiến Trúc Tổ Chức, Hệ Thống Lớn & Đa Nền Tảng Di Động',
    description:
      'Rèn luyện bản lĩnh lãnh đạo kỹ thuật và định hình chiến lược công nghệ dài hạn: Diễn thuyết kinh điển Steve Jobs tại Stanford (244 câu song ngữ), tư duy sáng tạo khai phóng của Sir Ken Robinson (427 câu), chiến lược kiến trúc chịu tải cấp tổ chức và làm chủ hệ sinh thái di động (Kotlin, Swift, Flutter).',
    icon: '👑',
    badge: '👑 Staff+ Level',
    level: 'C1 - Nâng cao',
    estimatedHours: '4.5 giờ',
    category: 'career',
    videos: getVideosByIds(STAFF_LEAD_IDS),
  },
]
