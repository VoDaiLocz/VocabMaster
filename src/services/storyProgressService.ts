// ============================================
// Story Reading Progress & Bookmarks Service
// ============================================

import { StoryProgress, StoryBookmark, BilingualStory } from '@/types/story'

const STORAGE_PREFIX = 'vocab_master_story_progress_'

export const getStoryProgress = (storyId: string): StoryProgress => {
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${storyId}`)
    if (!raw) {
      return {
        storyId,
        lastReadChapterIndex: 0,
        completedChapterIds: [],
        lastReadAt: Date.now(),
        bookmarks: [],
      }
    }
    const parsed = JSON.parse(raw)
    return {
      storyId,
      lastReadChapterIndex:
        typeof parsed.lastReadChapterIndex === 'number' ? parsed.lastReadChapterIndex : 0,
      completedChapterIds: Array.isArray(parsed.completedChapterIds)
        ? parsed.completedChapterIds
        : [],
      lastReadAt: typeof parsed.lastReadAt === 'number' ? parsed.lastReadAt : Date.now(),
      bookmarks: Array.isArray(parsed.bookmarks) ? parsed.bookmarks : [],
    }
  } catch (e) {
    console.error('Failed to get story progress:', e)
    return {
      storyId,
      lastReadChapterIndex: 0,
      completedChapterIds: [],
      lastReadAt: Date.now(),
      bookmarks: [],
    }
  }
}

export const saveChapterProgress = (storyId: string, chapterIndex: number): void => {
  try {
    const current = getStoryProgress(storyId)
    current.lastReadChapterIndex = chapterIndex
    current.lastReadAt = Date.now()
    localStorage.setItem(`${STORAGE_PREFIX}${storyId}`, JSON.stringify(current))
  } catch (e) {
    console.error('Failed to save chapter progress:', e)
  }
}

export const markChapterCompleted = (storyId: string, chapterId: number): StoryProgress => {
  try {
    const current = getStoryProgress(storyId)
    if (!current.completedChapterIds.includes(chapterId)) {
      current.completedChapterIds.push(chapterId)
    }
    current.lastReadAt = Date.now()
    localStorage.setItem(`${STORAGE_PREFIX}${storyId}`, JSON.stringify(current))
    return current
  } catch (e) {
    console.error('Failed to mark chapter completed:', e)
    return getStoryProgress(storyId)
  }
}

export const toggleBookmark = (
  storyId: string,
  bookmarkData: {
    chapterId: number
    chapterNumber: number
    paragraphId: number
    textEn: string
    textVi: string
  },
): { isBookmarked: boolean; bookmarks: StoryBookmark[] } => {
  try {
    const current = getStoryProgress(storyId)
    const existingBookmarks = current.bookmarks || []
    const existingIndex = existingBookmarks.findIndex(
      (b) => b.chapterId === bookmarkData.chapterId && b.paragraphId === bookmarkData.paragraphId,
    )

    let updatedBookmarks: StoryBookmark[]
    let isBookmarked = false

    if (existingIndex >= 0) {
      updatedBookmarks = existingBookmarks.filter((_, idx) => idx !== existingIndex)
      isBookmarked = false
    } else {
      const newBm: StoryBookmark = {
        id: `${bookmarkData.chapterId}_${bookmarkData.paragraphId}_${Date.now()}`,
        ...bookmarkData,
        createdAt: Date.now(),
      }
      updatedBookmarks = [newBm, ...existingBookmarks]
      isBookmarked = true
    }

    current.bookmarks = updatedBookmarks
    localStorage.setItem(`${STORAGE_PREFIX}${storyId}`, JSON.stringify(current))
    return { isBookmarked, bookmarks: updatedBookmarks }
  } catch (e) {
    console.error('Failed to toggle bookmark:', e)
    return { isBookmarked: false, bookmarks: [] }
  }
}

export const calculateStoryProgressPercent = (
  story: BilingualStory,
  progress?: StoryProgress,
): number => {
  if (!story.chapters || story.chapters.length === 0) return 0
  const prog = progress || getStoryProgress(story.id)
  const completedCount = prog.completedChapterIds.filter((cid) =>
    story.chapters.some((ch) => ch.id === cid),
  ).length
  return Math.round((completedCount / story.chapters.length) * 100)
}
