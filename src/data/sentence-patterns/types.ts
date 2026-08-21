// ============================================
// Sentence Master Data Types
// ============================================

export type SentenceStageId = '1_foundation' | '2_daily' | '3_workplace' | '4_it_tech'

export interface SentenceTopic {
  id: string
  stageId: SentenceStageId
  title: string
  titleVi: string
  description: string
  icon: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  sentences: SentenceItem[]
}

export interface SentenceItem {
  id: string
  textEn: string
  textVi: string
  pattern: string
  explanation: string
  hint?: string
  wordTiles: string[]
  alternatives?: string[]
}

export interface StageMetadata {
  id: SentenceStageId
  name: string
  subtitle: string
  description: string
  color: string
  icon: string
  topicCount: number
  sentenceCount: number
}
