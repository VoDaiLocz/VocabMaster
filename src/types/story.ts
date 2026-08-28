// ============================================
// Bilingual Story Types
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
  coverImage: string
  category: StoryCategory
  level: 'A1 - Sơ cấp' | 'A2 - Cơ bản' | 'B1 - Trung cấp' | 'B2 - Khá' | 'C1 - Nâng cao'
  estimatedMinutes: number
  wordCount: number
  descriptionVi: string
  targetVocabulary: { word: string; ipa: string; meaningVi: string }[]
  paragraphs: StoryParagraph[]
  comprehensionQuiz?: StoryQuizQuestion[]
}
