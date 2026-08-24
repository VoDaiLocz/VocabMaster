// ============================================
// Sentence Master Data Hub
// ============================================

import { SentenceStageId, SentenceTopic, StageMetadata } from './types'
import { STAGE_1_TOPICS } from './stage1_foundation'
import { STAGE_2_TOPICS } from './stage2_daily'
import { STAGE_3_TOPICS } from './stage3_workplace'
import { STAGE_4_TOPICS } from './stage4_it_tech'
import { STAGE_5_TOPICS } from './stage5_complex_paragraphs'

export * from './types'

export const ALL_SENTENCE_TOPICS: SentenceTopic[] = [
  ...STAGE_1_TOPICS,
  ...STAGE_2_TOPICS,
  ...STAGE_3_TOPICS,
  ...STAGE_4_TOPICS,
  ...STAGE_5_TOPICS,
]

export const STAGES_METADATA: StageMetadata[] = [
  {
    id: '1_foundation',
    name: 'Giai Đoạn 1: Căn Bản & Khung Ngữ Pháp',
    subtitle: 'Nền tảng vững chắc',
    description: 'Nắm vững trật tự từ, 50 khung câu tư duy cốt lõi, thói quen và cảm xúc.',
    color: 'from-blue-500 to-indigo-600',
    icon: 'Layers',
    topicCount: STAGE_1_TOPICS.length,
    sentenceCount: STAGE_1_TOPICS.reduce((acc, t) => acc + t.sentences.length, 0),
  },
  {
    id: '2_daily',
    name: 'Giai Đoạn 2: Giao Tiếp Đời Thường',
    subtitle: 'Phản xạ tự nhiên',
    description: 'Ăn uống, mua sắm, du lịch, hỏi đường, đặt phòng và kết bạn xã giao.',
    color: 'from-emerald-500 to-teal-600',
    icon: 'Coffee',
    topicCount: STAGE_2_TOPICS.length,
    sentenceCount: STAGE_2_TOPICS.reduce((acc, t) => acc + t.sentences.length, 0),
  },
  {
    id: '3_workplace',
    name: 'Giai Đoạn 3: Tiếng Anh Đi Làm & Công Sở',
    subtitle: 'Tác phong chuyên nghiệp',
    description: 'Viết email chuẩn, họp hành, báo cáo tiến độ, đàm phán deadline và từ chối khéo.',
    color: 'from-amber-500 to-orange-600',
    icon: 'Briefcase',
    topicCount: STAGE_3_TOPICS.length,
    sentenceCount: STAGE_3_TOPICS.reduce((acc, t) => acc + t.sentences.length, 0),
  },
  {
    id: '4_it_tech',
    name: 'Giai Đoạn 4: Tiếng Anh Giao Tiếp IT & Phần Mềm',
    subtitle: 'Chuyên ngành công nghệ',
    description: 'Daily Scrum, Code Review trên GitHub, Bug Triaging, Architecture & Phỏng vấn IT.',
    color: 'from-purple-500 to-pink-600',
    icon: 'Terminal',
    topicCount: STAGE_4_TOPICS.length,
    sentenceCount: STAGE_4_TOPICS.reduce((acc, t) => acc + t.sentences.length, 0),
  },
  {
    id: '5_complex_paragraphs',
    name: 'Giai Đoạn 5: Luyện Đặt Câu Dài & Đoạn Văn Phản Xạ',
    subtitle: 'Tư duy logic đa mệnh đề',
    description:
      'Nối câu dài với từ nối logic (Because, Although, In order to), tư duy ghép đoạn văn 3 bước.',
    color: 'from-rose-500 to-pink-600',
    icon: 'Sparkles',
    topicCount: STAGE_5_TOPICS.length,
    sentenceCount: STAGE_5_TOPICS.reduce((acc, t) => acc + t.sentences.length, 0),
  },
]

export function getTopicsByStage(stageId: SentenceStageId): SentenceTopic[] {
  return ALL_SENTENCE_TOPICS.filter((t) => t.stageId === stageId)
}

export function getTopicById(topicId: string): SentenceTopic | undefined {
  return ALL_SENTENCE_TOPICS.find((t) => t.id === topicId)
}
