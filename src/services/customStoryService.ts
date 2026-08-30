// ============================================
// Custom Webnovel Parser & Local Storage Service
// ============================================

import {
  BilingualStory,
  StoryChapter,
  StoryParagraph,
  StorySentence,
  StoryCategory,
} from '@/types/story'

const CUSTOM_STORIES_STORAGE_KEY = 'vocab_master_custom_stories'

/**
 * Get all custom imported stories from localStorage
 */
export const getCustomStories = (): BilingualStory[] => {
  try {
    const raw = localStorage.getItem(CUSTOM_STORIES_STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as BilingualStory[]
  } catch {
    return []
  }
}

/**
 * Save a custom imported story
 */
export const saveCustomStory = (story: BilingualStory): void => {
  try {
    const existing = getCustomStories()
    const index = existing.findIndex((s) => s.id === story.id)
    if (index >= 0) {
      existing[index] = story
    } else {
      existing.unshift(story)
    }
    localStorage.setItem(CUSTOM_STORIES_STORAGE_KEY, JSON.stringify(existing))
  } catch (err) {
    console.error('Failed to save custom story:', err)
  }
}

/**
 * Delete a custom story by ID
 */
export const deleteCustomStory = (storyId: string): void => {
  try {
    const existing = getCustomStories()
    const filtered = existing.filter((s) => s.id !== storyId)
    localStorage.setItem(CUSTOM_STORIES_STORAGE_KEY, JSON.stringify(filtered))
  } catch (err) {
    console.error('Failed to delete custom story:', err)
  }
}

/**
 * Parse a raw text file or pasted webnovel string into a full BilingualStory object
 * Handles hundreds of chapters automatically using regex delimiters
 */
export const parseRawNovelText = (
  titleVi: string,
  titleEn: string,
  author: string,
  category: StoryCategory = 'xianxia',
  level: string = 'B1 - Trung cấp',
  rawContent: string,
): BilingualStory => {
  const storyId = `custom-story-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`
  const lines = rawContent.split(/\r?\n/)

  const chapters: StoryChapter[] = []
  let currentChapterNumber = 1
  let currentChapterTitleVi = 'Chương 1: Khởi Đầu Hành Trình'
  let currentChapterTitleEn = 'Chapter 1: The Journey Begins'
  let currentChapterParagraphs: string[] = []

  // Regex to detect chapter boundaries in Vietnamese and English webnovels
  const chapterHeaderRegex = /^\s*(Chương|Chapter|Hồi|Hồi thứ|Tiết)\s+(\d+)[:.\-—\s]*(.*?)$/i

  const flushCurrentChapter = () => {
    if (currentChapterParagraphs.length === 0) return

    const paragraphs: StoryParagraph[] = []
    let sentenceCounter = 1

    currentChapterParagraphs.forEach((pText, pIdx) => {
      const cleanP = pText.trim()
      if (!cleanP) return

      // Split into sentences
      const rawSentences = cleanP.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [cleanP]
      const sentences: StorySentence[] = rawSentences
        .map((s) => s.trim())
        .filter(Boolean)
        .map((sText) => {
          return {
            id: sentenceCounter++,
            textEn: sText,
            textVi: sText, // Default mirror for single-language imports; can be tapped to read or dictionary look up
          }
        })

      if (sentences.length > 0) {
        paragraphs.push({
          id: pIdx + 1,
          textEn: cleanP,
          textVi: cleanP,
          sentences,
        })
      }
    })

    const totalWords = paragraphs.reduce((sum, p) => sum + p.textEn.split(/\s+/).length, 0)

    chapters.push({
      id: currentChapterNumber,
      chapterNumber: currentChapterNumber,
      volume: `Quyển ${Math.ceil(currentChapterNumber / 50)}`,
      titleEn: currentChapterTitleEn,
      titleVi: currentChapterTitleVi,
      estimatedMinutes: Math.max(5, Math.ceil(totalWords / 150)),
      wordCount: totalWords,
      descriptionVi: `Diễn biến chương ${currentChapterNumber} của tác phẩm ${titleVi}.`,
      targetVocabulary: [],
      paragraphs,
      comprehensionQuiz: [
        {
          id: `q-${currentChapterNumber}-1`,
          question: `Chương ${currentChapterNumber} có diễn biến chính xoay quanh sự kiện gì?`,
          options: [
            'Nhân vật chính vượt qua thử thách và tiếp tục hành trình tu luyện',
            'Nhân vật chính quyết định từ bỏ',
            'Nhân vật chính đi ngủ',
            'Không có gì xảy ra',
          ],
          correctIndex: 0,
          explanation:
            'Chương truyện khắc họa ý chí kiên định và hành trình tiến bước của nhân vật.',
        },
      ],
    })
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue

    const match = line.match(chapterHeaderRegex)
    if (match) {
      // Flush previous chapter
      flushCurrentChapter()

      const num = parseInt(match[2], 10)
      currentChapterNumber = isNaN(num) ? chapters.length + 1 : num
      const subtitle = match[3] ? match[3].trim() : `Hồi ${currentChapterNumber}`
      currentChapterTitleVi = `Chương ${currentChapterNumber}: ${subtitle || 'Diễn Biến Mới'}`
      currentChapterTitleEn = `Chapter ${currentChapterNumber}: ${subtitle || 'New Turning Point'}`
      currentChapterParagraphs = []
    } else {
      currentChapterParagraphs.push(line)
    }
  }

  // Flush the final chapter
  flushCurrentChapter()

  // If no chapter headers were detected at all, split into 25-paragraph chunks
  if (chapters.length === 0 && currentChapterParagraphs.length > 0) {
    const chunkSize = 20
    for (let i = 0; i < currentChapterParagraphs.length; i += chunkSize) {
      const chunk = currentChapterParagraphs.slice(i, i + chunkSize)
      const chNum = Math.floor(i / chunkSize) + 1
      const paragraphs: StoryParagraph[] = chunk.map((pText, pIdx) => {
        const rawSentences = pText.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [pText]
        return {
          id: pIdx + 1,
          textEn: pText,
          textVi: pText,
          sentences: rawSentences.map((s, sIdx) => ({
            id: sIdx + 1,
            textEn: s.trim(),
            textVi: s.trim(),
          })),
        }
      })

      const totalWords = paragraphs.reduce((sum, p) => sum + p.textEn.split(/\s+/).length, 0)
      chapters.push({
        id: chNum,
        chapterNumber: chNum,
        volume: 'Quyển 1: Tiền Truyện',
        titleEn: `Chapter ${chNum}: Journey Section ${chNum}`,
        titleVi: `Chương ${chNum}: Phân Đoạn ${chNum}`,
        estimatedMinutes: Math.max(5, Math.ceil(totalWords / 150)),
        wordCount: totalWords,
        descriptionVi: `Diễn biến chương ${chNum} của bộ truyện.`,
        targetVocabulary: [],
        paragraphs,
      })
    }
  }

  return {
    id: storyId,
    slug: titleVi.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    titleEn: titleEn || titleVi,
    titleVi,
    author: author || 'Tác Giả Mạng',
    rating: 5.0,
    readsCount: '1.2M',
    coverImage:
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    category,
    level: level as BilingualStory['level'],
    descriptionVi: `Tác phẩm ${titleVi} gồm ${chapters.length} chương được nhập trực tiếp vào thư viện cá nhân.`,
    tags: ['Truyện Nhập Cá Nhân', 'Đầy Đủ Trọn Bộ', 'Hàng Trăm Chương', category],
    chapters: chapters.length > 0 ? chapters : [],
  }
}
