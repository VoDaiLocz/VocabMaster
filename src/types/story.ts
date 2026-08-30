// ============================================
// Bilingual Story & Multi-Chapter Novel Types
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

export interface StoryChapter {
  id: number
  chapterNumber: number
  volume?: string
  titleEn: string
  titleVi: string
  estimatedMinutes: number
  wordCount: number
  descriptionVi: string
  targetVocabulary: { word: string; ipa: string; meaningVi: string }[]
  paragraphs: StoryParagraph[]
  comprehensionQuiz?: StoryQuizQuestion[]
}

export type StoryCategory = 'xianxia' | 'tech' | 'detective' | 'fables' | 'life'

export interface BilingualStory {
  id: string
  slug: string
  titleEn: string
  titleVi: string
  author: string
  rating: number
  readsCount: string
  coverImage: string
  category: StoryCategory
  level: 'A1 - Sơ cấp' | 'A2 - Cơ bản' | 'B1 - Trung cấp' | 'B2 - Khá' | 'C1 - Nâng cao'
  descriptionVi: string
  tags: string[]
  chapters: StoryChapter[]
}

export interface StoryBookmark {
  id: string
  chapterId: number
  chapterNumber: number
  paragraphId: number
  textEn: string
  textVi: string
  createdAt: number
}

export interface StoryProgress {
  storyId: string
  lastReadChapterIndex: number
  completedChapterIds: number[]
  lastReadAt: number
  bookmarks?: StoryBookmark[]
}
