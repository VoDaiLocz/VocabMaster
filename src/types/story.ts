// ============================================
// Bilingual Story & Novel Types
// ============================================

export interface StorySentence {
  id: number
  textEn: string
  textVi: string
  words?: string[]
}

export interface StoryParagraph {
  id: number
  textEn: string
  textVi: string
  sentences: StorySentence[]
}

export interface StoryQuizQuestion {
  id: string
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export type StoryCategory = 'xianxia' | 'tech' | 'fables' | 'life'

export interface BilingualStory {
  id: string
  slug: string
  titleEn: string
  titleVi: string
  author: string
  rating: number // e.g. 4.9
  readsCount: string // e.g. '1.2M'
  coverImage: string
  category: StoryCategory
  level: 'A1 - Sơ cấp' | 'A2 - Cơ bản' | 'B1 - Trung cấp' | 'B2 - Khá' | 'C1 - Nâng cao'
  estimatedMinutes: number
  wordCount: number
  descriptionVi: string
  tags: string[]
  targetVocabulary: { word: string; ipa: string; meaningVi: string }[]
  paragraphs: StoryParagraph[]
  comprehensionQuiz?: StoryQuizQuestion[]
}
