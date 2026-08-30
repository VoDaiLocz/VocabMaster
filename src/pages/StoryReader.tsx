// ============================================
// Interactive Full-Length Bilingual Webnovel Reader
// ============================================

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { BILINGUAL_STORIES_DATA } from '@/data/stories'
import {
  BilingualStory,
  StoryChapter,
  StoryParagraph,
  StorySentence,
  StoryQuizQuestion,
  StoryBookmark,
} from '@/types/story'
import { speakWord } from '@/utils/quiz'
import { lookupWord, WordLookupResult } from '@/services/dictionaryService'
import {
  getStoryProgress,
  saveChapterProgress,
  markChapterCompleted,
  toggleBookmark,
  calculateStoryProgressPercent,
} from '@/services/storyProgressService'
import { getCustomStories } from '@/services/customStoryService'
import { resolveChapterOnDemand } from '@/services/onlineNovelStreamerService'
import { WordLookupPopover } from '@/components/video/WordLookupPopover'
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Volume2,
  Sparkles,
  Trophy,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  List,
  Search,
  X,
  Bookmark,
  BookmarkCheck,
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  SkipBack,
  Sliders,
  Maximize2,
  Minimize2,
  Check,
  Clock,
  FileText,
} from 'lucide-react'

type ReaderTheme = 'sepia' | 'light' | 'dark' | 'forest'
type ReadingMode = 'tap_to_reveal' | 'interleaved' | 'immersion' | 'vietnamese_only'
type FontFamily = 'font-serif' | 'font-sans' | 'font-mono'

export const StoryReader: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  const story: BilingualStory = useMemo(() => {
    const custom = getCustomStories()
    const all = [...custom, ...BILINGUAL_STORIES_DATA]
    return all.find((s) => s.id === id) || BILINGUAL_STORIES_DATA[0]
  }, [id])

  // Chapter Navigation & Progress State
  const initialProgress = useMemo(() => getStoryProgress(story.id), [story.id])
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(() => {
    if (
      initialProgress.lastReadChapterIndex >= 0 &&
      initialProgress.lastReadChapterIndex < story.chapters.length
    ) {
      return initialProgress.lastReadChapterIndex
    }
    return 0
  })

  const [completedChapterIds, setCompletedChapterIds] = useState<number[]>(
    initialProgress.completedChapterIds || [],
  )
  const [bookmarks, setBookmarks] = useState<StoryBookmark[]>(initialProgress.bookmarks || [])
  const [isChapterDrawerOpen, setIsChapterDrawerOpen] = useState<boolean>(false)
  const [isBookmarksModalOpen, setIsBookmarksModalOpen] = useState<boolean>(false)
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false)
  const [chapterSearchQuery, setChapterSearchQuery] = useState<string>('')
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false)

  // Scroll Progress Percentage State (0 - 100%)
  const [scrollPercent, setScrollPercent] = useState<number>(0)

  const currentChapter: StoryChapter = story.chapters[activeChapterIndex] || story.chapters[0]

  // Reader Customization Settings (Persisted in localStorage)
  const [theme, setTheme] = useState<ReaderTheme>(() => {
    return (localStorage.getItem('vocab_story_theme') as ReaderTheme) || 'sepia'
  })
  const [readingMode, setReadingMode] = useState<ReadingMode>(() => {
    return (localStorage.getItem('vocab_story_mode') as ReadingMode) || 'tap_to_reveal'
  })
  const [fontFamily, setFontFamily] = useState<FontFamily>(() => {
    return (localStorage.getItem('vocab_story_font') as FontFamily) || 'font-serif'
  })
  const [fontSize, setFontSize] = useState<number>(() => {
    const saved = localStorage.getItem('vocab_story_font_size')
    return saved ? parseInt(saved, 10) : 18
  })

  const [revealedParagraphs, setRevealedParagraphs] = useState<Record<number, boolean>>({})
  const [activeSentenceId, setActiveSentenceId] = useState<number | null>(null)

  // Streamed on-demand paragraphs
  const [streamedParagraphs, setStreamedParagraphs] = useState<StoryParagraph[]>(
    currentChapter.paragraphs || [],
  )
  const [loadingChapterContent, setLoadingChapterContent] = useState<boolean>(false)

  useEffect(() => {
    if (!currentChapter.paragraphs || currentChapter.paragraphs.length === 0) {
      setLoadingChapterContent(true)
      resolveChapterOnDemand(story.id, currentChapter.chapterNumber, story.titleVi)
        .then((paras) => {
          setStreamedParagraphs(paras)
          setLoadingChapterContent(false)
        })
        .catch(() => setLoadingChapterContent(false))
    } else {
      setStreamedParagraphs(currentChapter.paragraphs)
      setLoadingChapterContent(false)
    }
  }, [story.id, currentChapter.chapterNumber, currentChapter.paragraphs, story.titleVi])

  const activeParagraphs = useMemo(() => {
    return currentChapter.paragraphs && currentChapter.paragraphs.length > 0
      ? currentChapter.paragraphs
      : streamedParagraphs
  }, [currentChapter.paragraphs, streamedParagraphs])

  // Continuous Audio Player State
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false)
  const [audioSpeed, setAudioSpeed] = useState<number>(1.0)
  const [currentAudioSentenceIndex, setCurrentAudioSentenceIndex] = useState<number>(-1)
  const isAudioPlayingRef = useRef<boolean>(false)

  const flattenedSentences = useMemo(() => {
    return activeParagraphs.flatMap((p) => p.sentences || [])
  }, [activeParagraphs])

  // Word lookup popup state
  const [selectedWordData, setSelectedWordData] = useState<WordLookupResult | null>(null)

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [earnedXp, setEarnedXp] = useState(0)

  const stopAudio = useCallback(() => {
    setIsPlayingAudio(false)
    isAudioPlayingRef.current = false
    setCurrentAudioSentenceIndex(-1)
    setActiveSentenceId(null)
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
  }, [])

  // Listen to Window Scroll for Reading Progress Bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight <= 0) {
        setScrollPercent(100)
      } else {
        const currentProgress = (window.scrollY / totalHeight) * 100
        setScrollPercent(Math.min(100, Math.max(0, Math.round(currentProgress))))
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Save chapter progress on chapter switch
  useEffect(() => {
    saveChapterProgress(story.id, activeChapterIndex)
  }, [story.id, activeChapterIndex])

  // Save reader settings
  useEffect(() => {
    localStorage.setItem('vocab_story_theme', theme)
    localStorage.setItem('vocab_story_mode', readingMode)
    localStorage.setItem('vocab_story_font', fontFamily)
    localStorage.setItem('vocab_story_font_size', fontSize.toString())
  }, [theme, readingMode, fontFamily, fontSize])

  // Stop audio on chapter change or unmount
  useEffect(() => {
    stopAudio()
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [activeChapterIndex, stopAudio])

  // Toggle reveal for a specific paragraph
  const handleToggleReveal = (pId: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    setRevealedParagraphs((prev) => ({
      ...prev,
      [pId]: !prev[pId],
    }))
  }

  // One-click Reveal All / Collapse All translations for long chapters
  const handleRevealAllParagraphs = () => {
    const allRevealed: Record<number, boolean> = {}
    activeParagraphs.forEach((p) => {
      allRevealed[p.id] = true
    })
    setRevealedParagraphs(allRevealed)
  }

  const handleCollapseAllParagraphs = () => {
    setRevealedParagraphs({})
  }

  // Play audio for an individual sentence
  const handleSpeakSentence = (sentence: StorySentence, e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    stopAudio()
    setActiveSentenceId(sentence.id)
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const u = new SpeechSynthesisUtterance(sentence.textEn)
      u.lang = 'en-US'
      u.rate = audioSpeed
      u.onend = () => setActiveSentenceId(null)
      u.onerror = () => setActiveSentenceId(null)
      window.speechSynthesis.speak(u)
    }
  }

  // Continuous Audio Player Functions
  const playSentenceAtIndex = (index: number) => {
    if (index < 0 || index >= flattenedSentences.length) {
      stopAudio()
      return
    }
    const targetSentence = flattenedSentences[index]
    setCurrentAudioSentenceIndex(index)
    setActiveSentenceId(targetSentence.id)

    // Smooth scroll to active sentence
    const element = document.getElementById(`sentence-${targetSentence.id}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(targetSentence.textEn)
      utterance.lang = 'en-US'
      utterance.rate = audioSpeed
      utterance.onend = () => {
        if (isAudioPlayingRef.current) {
          playSentenceAtIndex(index + 1)
        }
      }
      utterance.onerror = () => {
        if (isAudioPlayingRef.current) {
          playSentenceAtIndex(index + 1)
        }
      }
      window.speechSynthesis.speak(utterance)
    }
  }

  const startContinuousAudio = () => {
    setIsPlayingAudio(true)
    isAudioPlayingRef.current = true
    const startIndex = currentAudioSentenceIndex >= 0 ? currentAudioSentenceIndex : 0
    playSentenceAtIndex(startIndex)
  }

  const pauseContinuousAudio = () => {
    setIsPlayingAudio(false)
    isAudioPlayingRef.current = false
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
  }

  const handleNextAudioSentence = () => {
    if (currentAudioSentenceIndex < flattenedSentences.length - 1) {
      playSentenceAtIndex(currentAudioSentenceIndex + 1)
    }
  }

  const handlePrevAudioSentence = () => {
    if (currentAudioSentenceIndex > 0) {
      playSentenceAtIndex(currentAudioSentenceIndex - 1)
    }
  }

  // Word click to open dictionary modal
  const handleWordClick = async (word: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const cleanWord = word.replace(/[^a-zA-Z]/g, '').trim()
    if (cleanWord) {
      speakWord(cleanWord)
      const data = await lookupWord(cleanWord)
      setSelectedWordData(data)
    }
  }

  // Bookmark toggling
  const handleToggleBookmark = (paragraph: StoryParagraph, e: React.MouseEvent) => {
    e.stopPropagation()
    const res = toggleBookmark(story.id, {
      chapterId: currentChapter.id,
      chapterNumber: currentChapter.chapterNumber,
      paragraphId: paragraph.id,
      textEn: paragraph.textEn.slice(0, 140) + (paragraph.textEn.length > 140 ? '...' : ''),
      textVi: paragraph.textVi.slice(0, 140) + (paragraph.textVi.length > 140 ? '...' : ''),
    })
    setBookmarks(res.bookmarks)
  }

  const isParagraphBookmarked = (pId: number) => {
    return bookmarks.some((b) => b.chapterId === currentChapter.id && b.paragraphId === pId)
  }

  // Submit Quiz
  const handleAnswerQuiz = (qId: string, optionIdx: number) => {
    if (quizSubmitted) return
    setQuizAnswers((prev) => ({ ...prev, [qId]: optionIdx }))
  }

  const handleSubmitQuiz = () => {
    if (!currentChapter.comprehensionQuiz) return
    let correctCount = 0
    currentChapter.comprehensionQuiz.forEach((q: StoryQuizQuestion) => {
      if (quizAnswers[q.id] === q.correctIndex) {
        correctCount++
      }
    })
    const bonusXp = correctCount * 50 + 100
    setEarnedXp(bonusXp)
    setQuizSubmitted(true)
    // Mark chapter as completed
    const updated = markChapterCompleted(story.id, currentChapter.id)
    setCompletedChapterIds(updated.completedChapterIds)
  }

  const handleManualMarkCompleted = () => {
    const updated = markChapterCompleted(story.id, currentChapter.id)
    setCompletedChapterIds(updated.completedChapterIds)
  }

  const selectChapter = (idx: number) => {
    stopAudio()
    setActiveChapterIndex(idx)
    setIsChapterDrawerOpen(false)
    setRevealedParagraphs({})
    setQuizAnswers({})
    setQuizSubmitted(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleNextChapter = () => {
    if (activeChapterIndex < story.chapters.length - 1) {
      selectChapter(activeChapterIndex + 1)
    }
  }

  const handlePrevChapter = () => {
    if (activeChapterIndex > 0) {
      selectChapter(activeChapterIndex - 1)
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {})
      setIsFullscreen(true)
    } else {
      document.exitFullscreen().catch(() => {})
      setIsFullscreen(false)
    }
  }

  const filteredChapters = useMemo(() => {
    const q = chapterSearchQuery.toLowerCase().trim()
    if (!q) {
      return story.chapters.slice(0, 100)
    }
    return story.chapters
      .filter((ch) => {
        return (
          ch.chapterNumber.toString().includes(q) ||
          ch.titleEn.toLowerCase().includes(q) ||
          ch.titleVi.toLowerCase().includes(q) ||
          ch.descriptionVi.toLowerCase().includes(q)
        )
      })
      .slice(0, 100)
  }, [story.chapters, chapterSearchQuery])

  // Theme styling configurations
  const themeClasses = {
    sepia: 'bg-[#f5ebd7] text-[#3e2e1d]',
    light: 'bg-[#f8fafc] text-gray-900',
    dark: 'bg-[#0f172a] text-slate-100',
    forest: 'bg-[#e8efe9] text-[#1c3829]',
  }

  const headerThemeClasses = {
    sepia: 'bg-[#fbf4e6]/95 border-[#e5d4bc] text-[#3e2e1d]',
    light: 'bg-white/95 border-gray-200 text-gray-900',
    dark: 'bg-[#1e293b]/95 border-slate-700 text-slate-100',
    forest: 'bg-[#f1f7f2]/95 border-[#cde0d2] text-[#1c3829]',
  }

  const cardThemeClasses = {
    sepia: 'bg-[#fcf8ee] border-[#ebdcc7] shadow-sm',
    light: 'bg-white border-gray-100 shadow-sm',
    dark: 'bg-[#1e293b] border-slate-700/80 shadow-sm',
    forest: 'bg-[#f4faf5] border-[#d5e7da] shadow-sm',
  }

  const isCurrentChapterCompleted = completedChapterIds.includes(currentChapter.id)
  const progressPercent = useMemo(() => {
    return calculateStoryProgressPercent(story, {
      storyId: story.id,
      lastReadChapterIndex: activeChapterIndex,
      completedChapterIds,
      lastReadAt: 0,
    })
  }, [story, activeChapterIndex, completedChapterIds])

  // Count total words in current chapter
  const actualWordCount = useMemo(() => {
    return activeParagraphs.reduce((sum, p) => sum + p.textEn.split(/\s+/).length, 0)
  }, [activeParagraphs])

  return (
    <div
      className={`min-h-screen transition-colors duration-300 pb-36 ${themeClasses[theme]} ${fontFamily}`}
    >
      {/* Top Real-time Scroll Progress Bar */}
      <div className='fixed top-0 left-0 right-0 h-1 z-50 bg-black/5 dark:bg-white/10'>
        <div
          className='h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-150'
          style={{ width: `${scrollPercent}%` }}
        />
      </div>

      {/* Sticky Reader Navigation Header */}
      <div
        className={`sticky top-0 z-30 backdrop-blur-md border-b px-3 sm:px-6 py-2.5 transition-colors ${headerThemeClasses[theme]}`}
      >
        <div className='max-w-4xl mx-auto flex items-center justify-between gap-2'>
          {/* Back & Chapter Drawer Button */}
          <div className='flex items-center gap-2'>
            <Link
              to='/stories'
              className='flex items-center gap-1.5 p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 text-xs sm:text-sm font-bold opacity-85 hover:opacity-100 transition-all no-underline text-inherit'
            >
              <ArrowLeft size={18} />
              <span className='hidden md:inline'>Thư viện</span>
            </Link>

            <button
              onClick={() => setIsChapterDrawerOpen(true)}
              className='flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 text-xs font-bold hover:bg-emerald-600 hover:text-white transition-all shadow-sm'
              title='Danh sách tất cả các chương'
            >
              <List size={14} />
              <span>
                Chương {currentChapter.chapterNumber}/{story.chapters.length}
              </span>
            </button>
          </div>

          {/* Reading Mode Switcher Tabs */}
          <div className='hidden sm:flex items-center gap-1 bg-black/5 dark:bg-white/5 p-1 rounded-2xl'>
            <button
              onClick={() => setReadingMode('tap_to_reveal')}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                readingMode === 'tap_to_reveal'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'opacity-70 hover:opacity-100'
              }`}
              title='Chạm vào đoạn văn để mở bản dịch tiếng Việt'
            >
              <Eye size={13} />
              <span>Chạm để dịch</span>
            </button>

            <button
              onClick={() => setReadingMode('interleaved')}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                readingMode === 'interleaved'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'opacity-70 hover:opacity-100'
              }`}
              title='Hiện song song tiếng Anh và tiếng Việt'
            >
              <BookOpen size={13} />
              <span>Song ngữ</span>
            </button>

            <button
              onClick={() => setReadingMode('immersion')}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                readingMode === 'immersion'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'opacity-70 hover:opacity-100'
              }`}
              title='Chỉ hiển thị tiếng Anh để đắm chìm'
            >
              <span>🇺🇸 Tiếng Anh</span>
            </button>

            <button
              onClick={() => setReadingMode('vietnamese_only')}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                readingMode === 'vietnamese_only'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'opacity-70 hover:opacity-100'
              }`}
              title='Chỉ hiển thị bản dịch tiếng Việt'
            >
              <span>🇻🇳 Tiếng Việt</span>
            </button>
          </div>

          {/* Quick Controls: Bookmarks, Settings, Fullscreen */}
          <div className='flex items-center gap-1 sm:gap-2'>
            <button
              onClick={() => setIsBookmarksModalOpen(true)}
              className='p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 opacity-80 hover:opacity-100 transition-all relative'
              title='Xem danh sách đoạn văn đã đánh dấu'
            >
              <Bookmark size={17} />
              {bookmarks.length > 0 && (
                <span className='absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-500' />
              )}
            </button>

            <button
              onClick={() => setIsSettingsModalOpen(true)}
              className='p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 opacity-80 hover:opacity-100 transition-all'
              title='Cài đặt giao diện & cỡ chữ'
            >
              <Sliders size={17} />
            </button>

            <button
              onClick={toggleFullscreen}
              className='p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 opacity-80 hover:opacity-100 transition-all hidden md:flex'
              title='Bật/Tắt toàn màn hình'
            >
              {isFullscreen ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Reading Container */}
      <div className='max-w-3xl mx-auto px-4 sm:px-6 pt-6 space-y-6'>
        {/* Story Breadcrumbs & Overall Progress Bar */}
        <div className={`p-4 rounded-3xl border ${cardThemeClasses[theme]} space-y-2`}>
          <div className='flex items-center justify-between text-xs font-bold'>
            <div className='flex items-center gap-2'>
              <span className='px-2 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'>
                {story.level}
              </span>
              <span className='line-clamp-1'>{story.titleVi}</span>
            </div>
            <span className='text-emerald-600 dark:text-emerald-400 font-mono'>
              {progressPercent}% hoàn thành bộ truyện
            </span>
          </div>
          <div className='w-full h-2 rounded-full bg-black/5 dark:bg-white/10 overflow-hidden'>
            <div
              className='h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500'
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Chapter Header Card with Full-Length Novel Metadata */}
        <div className='text-center space-y-3 pb-6 border-b border-black/10 dark:border-white/10'>
          <div className='flex items-center justify-center gap-2 flex-wrap'>
            <span className='px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20'>
              {currentChapter.volume || 'Quyển 1'}
            </span>
            <span className='px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 flex items-center gap-1'>
              <Clock size={12} /> ~{currentChapter.estimatedMinutes || 15} phút đọc
            </span>
            <span className='px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20 flex items-center gap-1 font-mono'>
              <FileText size={12} /> {actualWordCount || currentChapter.wordCount} từ (
              {activeParagraphs.length} đoạn)
            </span>
            {isCurrentChapterCompleted && (
              <span className='px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-600 text-white flex items-center gap-1 shadow-sm'>
                <Check size={12} /> Đã đọc xong
              </span>
            )}
          </div>

          <h1 className='text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight'>
            {currentChapter.titleEn}
          </h1>
          <p className='text-base sm:text-lg font-medium opacity-85'>{currentChapter.titleVi}</p>

          {/* Quick Translation Controls for Long Chapters */}
          {readingMode === 'tap_to_reveal' && (
            <div className='flex items-center justify-center gap-2 pt-2'>
              <button
                onClick={handleRevealAllParagraphs}
                className='px-3 py-1.5 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-emerald-600 hover:text-white text-xs font-bold transition-all flex items-center gap-1 opacity-80 hover:opacity-100'
                title='Hiển thị tất cả bản dịch tiếng Việt'
              >
                <Eye size={13} /> Mở tất cả bản dịch
              </button>
              <button
                onClick={handleCollapseAllParagraphs}
                className='px-3 py-1.5 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 text-xs font-bold transition-all flex items-center gap-1 opacity-70 hover:opacity-100'
                title='Thu gọn tất cả bản dịch'
              >
                <EyeOff size={13} /> Thu gọn tất cả
              </button>
            </div>
          )}
        </div>

        {/* Target Vocabulary Spotlight */}
        {currentChapter.targetVocabulary && currentChapter.targetVocabulary.length > 0 && (
          <div className={`p-4 sm:p-5 rounded-3xl border ${cardThemeClasses[theme]} space-y-3`}>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400'>
                <Sparkles size={16} /> Từ Vựng Then Chốt Trong Chương:
              </div>
              <span className='text-[11px] opacity-60'>Chạm từ để nghe & tra nghĩa</span>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-1'>
              {currentChapter.targetVocabulary.map(
                (v: { word: string; ipa: string; meaningVi: string }) => (
                  <div
                    key={v.word}
                    onClick={(e) => handleWordClick(v.word, e)}
                    className='p-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 hover:border-emerald-500 hover:shadow-sm cursor-pointer transition-all flex flex-col justify-between'
                  >
                    <div className='flex items-center justify-between'>
                      <span className='text-xs font-bold text-emerald-700 dark:text-emerald-300'>
                        {v.word}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          speakWord(v.word)
                        }}
                        className='p-1 hover:text-emerald-500 transition-colors'
                        title='Phát âm từ vựng'
                      >
                        <Volume2 size={14} className='opacity-80' />
                      </button>
                    </div>
                    <p className='text-[10px] opacity-60 font-mono mt-0.5'>{v.ipa}</p>
                    <p className='text-[11px] font-medium line-clamp-1 mt-1 opacity-90'>
                      {v.meaningVi}
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>
        )}

        {/* Loading Indicator for Streamed Chapter */}
        {loadingChapterContent && (
          <div className='p-8 rounded-3xl border border-dashed border-emerald-500/30 text-center space-y-2 bg-emerald-500/5 animate-pulse'>
            <Sparkles size={24} className='mx-auto text-emerald-500 animate-spin' />
            <p className='text-xs font-bold text-emerald-700 dark:text-emerald-300'>
              Đang phát luồng dữ liệu Chương {currentChapter.chapterNumber}...
            </p>
          </div>
        )}

        {/* Story Paragraphs Container */}
        <div className='space-y-6 leading-relaxed'>
          {activeParagraphs.map((p: StoryParagraph, pIdx: number) => {
            const isRevealed =
              readingMode === 'interleaved' ||
              readingMode === 'vietnamese_only' ||
              !!revealedParagraphs[p.id]
            const isBookmarked = isParagraphBookmarked(p.id)

            return (
              <div
                key={p.id}
                id={`paragraph-${p.id}`}
                onClick={() => readingMode === 'tap_to_reveal' && handleToggleReveal(p.id)}
                className={`p-5 sm:p-7 rounded-3xl border transition-all relative group ${
                  cardThemeClasses[theme]
                } ${
                  readingMode === 'tap_to_reveal'
                    ? 'cursor-pointer hover:border-emerald-400 hover:shadow-md'
                    : ''
                }`}
              >
                {/* Paragraph Number Badge & Bookmark Action Top-Right */}
                <div className='flex items-center justify-between mb-2 text-[10px] font-mono opacity-50'>
                  <span>
                    Đoạn {pIdx + 1} / {activeParagraphs.length}
                  </span>
                  <button
                    onClick={(e) => handleToggleBookmark(p, e)}
                    className={`p-1.5 rounded-xl transition-all ${
                      isBookmarked
                        ? 'text-amber-500 bg-amber-500/10 opacity-100'
                        : 'opacity-0 group-hover:opacity-60 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                    title={isBookmarked ? 'Bỏ đánh dấu đoạn này' : 'Đánh dấu lưu đoạn văn này'}
                  >
                    {isBookmarked ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                  </button>
                </div>

                {/* English Content (Hidden in vietnamese_only mode) */}
                {readingMode !== 'vietnamese_only' && (
                  <div
                    style={{ fontSize: `${fontSize}px`, lineHeight: '1.95' }}
                    className='text-justify space-y-1'
                  >
                    {p.sentences.map((sent: StorySentence) => {
                      const isSentenceActive = activeSentenceId === sent.id
                      const words = sent.textEn.split(' ')

                      return (
                        <span
                          key={sent.id}
                          id={`sentence-${sent.id}`}
                          className={`inline rounded-lg px-1 py-0.5 transition-all duration-300 ${
                            isSentenceActive
                              ? 'bg-amber-300/40 dark:bg-amber-500/30 ring-2 ring-amber-400/50'
                              : ''
                          }`}
                        >
                          {words.map((w: string, idx: number) => (
                            <span
                              key={idx}
                              onClick={(e) => handleWordClick(w, e)}
                              className='hover:text-emerald-600 dark:hover:text-emerald-400 hover:underline cursor-pointer transition-colors'
                            >
                              {w}{' '}
                            </span>
                          ))}
                          <button
                            onClick={(e) => handleSpeakSentence(sent, e)}
                            className='inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-600 hover:text-white transition-all ml-1 align-middle'
                            title='Phát âm câu này'
                          >
                            <Volume2 size={11} />
                          </button>{' '}
                        </span>
                      )
                    })}
                  </div>
                )}

                {/* Vietnamese Translation Accordion / Interleaved Box */}
                {readingMode !== 'immersion' && (
                  <>
                    {isRevealed ? (
                      <div
                        className={`mt-4 pt-3.5 border-t border-black/10 dark:border-white/10 text-sm opacity-90 leading-relaxed rounded-2xl p-4 bg-emerald-500/10 text-emerald-950 dark:text-emerald-200`}
                      >
                        <div className='text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1 flex items-center justify-between'>
                          <span>🇻🇳 Bản dịch tiếng Việt:</span>
                          {readingMode === 'tap_to_reveal' && (
                            <button
                              onClick={(e) => handleToggleReveal(p.id, e)}
                              className='text-[10px] underline hover:opacity-75'
                            >
                              Thu gọn
                            </button>
                          )}
                        </div>
                        <p style={{ fontSize: `${Math.max(14, fontSize - 2)}px` }}>{p.textVi}</p>
                      </div>
                    ) : (
                      <div
                        onClick={(e) => handleToggleReveal(p.id, e)}
                        className='mt-3 flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 opacity-75 hover:opacity-100 transition-opacity cursor-pointer'
                      >
                        <Eye size={14} /> Chạm để xem bản dịch tiếng Việt của đoạn này
                      </div>
                    )}
                  </>
                )}
              </div>
            )
          })}
        </div>

        {/* Chapter Completion Check & Next/Prev Controls */}
        <div className={`p-6 rounded-3xl border ${cardThemeClasses[theme]} space-y-4`}>
          <div className='flex items-center justify-between flex-wrap gap-3'>
            <div className='flex items-center gap-2'>
              <button
                onClick={handleManualMarkCompleted}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                  isCurrentChapterCompleted
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-black/5 dark:bg-white/5 hover:bg-emerald-500 hover:text-white'
                }`}
              >
                <CheckCircle2 size={16} />
                <span>
                  {isCurrentChapterCompleted
                    ? 'Đã hoàn thành chương này'
                    : 'Đánh dấu đã đọc xong chương'}
                </span>
              </button>
            </div>

            <button
              onClick={() => setIsChapterDrawerOpen(true)}
              className='px-3.5 py-2 rounded-2xl bg-black/5 dark:bg-white/5 text-xs font-bold flex items-center gap-1.5 hover:bg-black/10'
            >
              <List size={14} /> Mục lục ({story.chapters.length} chương)
            </button>
          </div>

          <div className='flex items-center justify-between gap-4 pt-2 border-t border-black/10 dark:border-white/10'>
            <button
              onClick={handlePrevChapter}
              disabled={activeChapterIndex === 0}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all ${
                activeChapterIndex === 0
                  ? 'opacity-40 cursor-not-allowed bg-black/5 dark:bg-white/5'
                  : 'bg-black/5 dark:bg-white/5 hover:bg-emerald-500 hover:text-white shadow-sm'
              }`}
            >
              <ChevronLeft size={16} /> Chương trước
            </button>

            <button
              onClick={handleNextChapter}
              disabled={activeChapterIndex === story.chapters.length - 1}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all ${
                activeChapterIndex === story.chapters.length - 1
                  ? 'opacity-40 cursor-not-allowed bg-black/5 dark:bg-white/5'
                  : 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/25 hover:bg-emerald-500'
              }`}
            >
              Chương tiếp theo <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Comprehension Quiz Section */}
        {currentChapter.comprehensionQuiz && currentChapter.comprehensionQuiz.length > 0 && (
          <div className={`p-6 sm:p-8 rounded-3xl border ${cardThemeClasses[theme]} space-y-6`}>
            <div className='flex items-center gap-3'>
              <div className='w-11 h-11 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center'>
                <Trophy size={24} />
              </div>
              <div>
                <h3 className='text-lg font-bold font-display'>
                  Mini-Quiz Đọc Hiểu Cốt Truyện Chương {currentChapter.chapterNumber}
                </h3>
                <p className='text-xs opacity-70'>
                  Trả lời đúng các câu hỏi trắc nghiệm để tích lũy +{earnedXp || 100} XP
                </p>
              </div>
            </div>

            <div className='space-y-6'>
              {currentChapter.comprehensionQuiz.map((q: StoryQuizQuestion, qIdx: number) => (
                <div key={q.id} className='space-y-3'>
                  <p className='text-sm sm:text-base font-bold'>
                    Câu {qIdx + 1}: {q.question}
                  </p>

                  <div className='grid grid-cols-1 gap-2.5'>
                    {q.options.map((opt: string, optIdx: number) => {
                      const isSelected = quizAnswers[q.id] === optIdx
                      const isCorrect = optIdx === q.correctIndex
                      const showResult = quizSubmitted

                      let btnStyle = 'bg-black/5 dark:bg-white/5 border-transparent'
                      if (showResult) {
                        if (isCorrect)
                          btnStyle =
                            'bg-emerald-500/20 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-bold'
                        else if (isSelected && !isCorrect)
                          btnStyle =
                            'bg-rose-500/20 border-rose-500 text-rose-700 dark:text-rose-300'
                      } else if (isSelected) {
                        btnStyle = 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={quizSubmitted}
                          onClick={() => handleAnswerQuiz(q.id, optIdx)}
                          className={`p-3.5 rounded-2xl text-left text-xs sm:text-sm font-medium border transition-all flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {showResult && isCorrect && (
                            <CheckCircle2 size={16} className='text-emerald-500 shrink-0' />
                          )}
                          {showResult && isSelected && !isCorrect && (
                            <XCircle size={16} className='text-rose-500 shrink-0' />
                          )}
                        </button>
                      )
                    })}
                  </div>

                  {quizSubmitted && (
                    <p className='text-xs font-medium p-3 rounded-2xl bg-emerald-500/10 text-emerald-800 dark:text-emerald-300'>
                      💡 Giải thích: {q.explanation}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {!quizSubmitted ? (
              <button
                onClick={handleSubmitQuiz}
                className='w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all'
              >
                Kiểm Tra Đáp Án & Nhận XP
              </button>
            ) : (
              <div className='p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-1.5'>
                <p className='text-base font-bold text-emerald-600 dark:text-emerald-400'>
                  🎉 Chúc Mừng Bạn Đã Hoàn Thành Bài Đọc Chương Này!
                </p>
                <p className='text-xs opacity-75'>
                  Bạn đã nhận được +{earnedXp} XP và ghi nhận tiến độ vào hồ sơ học tập.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Floating Audio TTS Sticky Bar */}
      <div className='fixed bottom-4 left-4 right-4 max-w-xl mx-auto z-40'>
        <div
          className={`p-3 rounded-3xl backdrop-blur-xl border shadow-2xl flex items-center justify-between gap-3 ${headerThemeClasses[theme]}`}
        >
          <div className='flex items-center gap-2'>
            <button
              onClick={isPlayingAudio ? pauseContinuousAudio : startContinuousAudio}
              className='w-11 h-11 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/25 transition-transform hover:scale-105'
              title={isPlayingAudio ? 'Tạm dừng nghe' : 'Bắt đầu nghe tự động toàn chương'}
            >
              {isPlayingAudio ? (
                <Pause size={18} />
              ) : (
                <Play size={18} className='translate-x-0.5' />
              )}
            </button>

            <div>
              <p className='text-xs font-bold line-clamp-1'>
                {isPlayingAudio ? 'Đang đọc tự động...' : 'Nghe Audio Toàn Chương'}
              </p>
              <p className='text-[10px] opacity-60'>
                {currentAudioSentenceIndex >= 0
                  ? `Câu ${currentAudioSentenceIndex + 1} / ${flattenedSentences.length}`
                  : `${flattenedSentences.length} câu tiếng Anh`}
              </p>
            </div>
          </div>

          <div className='flex items-center gap-1.5'>
            <button
              onClick={handlePrevAudioSentence}
              disabled={!isPlayingAudio || currentAudioSentenceIndex <= 0}
              className='p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 opacity-70 hover:opacity-100 disabled:opacity-30'
              title='Câu trước đó'
            >
              <SkipBack size={15} />
            </button>

            <button
              onClick={handleNextAudioSentence}
              disabled={
                !isPlayingAudio || currentAudioSentenceIndex >= flattenedSentences.length - 1
              }
              className='p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 opacity-70 hover:opacity-100 disabled:opacity-30'
              title='Câu tiếp theo'
            >
              <SkipForward size={15} />
            </button>

            {/* Speed Selector */}
            <select
              value={audioSpeed}
              onChange={(e) => setAudioSpeed(parseFloat(e.target.value))}
              className='px-2 py-1 rounded-xl bg-black/5 dark:bg-white/5 text-xs font-bold border-none outline-none cursor-pointer'
              title='Tốc độ đọc'
            >
              <option value='0.75'>0.75x</option>
              <option value='1.0'>1.0x</option>
              <option value='1.25'>1.25x</option>
              <option value='1.5'>1.5x</option>
            </select>

            {isPlayingAudio && (
              <button
                onClick={stopAudio}
                className='p-2 rounded-xl hover:bg-rose-500/10 text-rose-500'
                title='Dừng hẳn'
              >
                <RotateCcw size={15} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Chapter Navigator Drawer Modal */}
      {isChapterDrawerOpen && (
        <div className='fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end animate-in fade-in duration-200'>
          <div
            className={`w-full max-w-md h-full shadow-2xl flex flex-col ${headerThemeClasses[theme]}`}
          >
            {/* Drawer Header */}
            <div className='p-4 border-b border-black/10 dark:border-white/10 flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <List className='text-emerald-600' size={20} />
                <h3 className='font-bold font-display text-base'>
                  Mục Lục ({story.chapters.length} chương)
                </h3>
              </div>
              <button
                onClick={() => setIsChapterDrawerOpen(false)}
                className='p-1.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 text-gray-400'
              >
                <X size={20} />
              </button>
            </div>

            {/* Chapter Search Box & Quick Jump */}
            <div className='p-3 border-b border-black/10 dark:border-white/10 space-y-2'>
              <div className='relative'>
                <Search
                  size={15}
                  className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
                />
                <input
                  type='text'
                  value={chapterSearchQuery}
                  onChange={(e) => setChapterSearchQuery(e.target.value)}
                  placeholder='Tìm kiếm chương (VD: 1, hoang ha, thanh duong...)'
                  className='w-full pl-9 pr-3 py-2 rounded-xl bg-black/5 dark:bg-white/5 text-xs outline-none border border-transparent focus:border-emerald-500'
                />
              </div>

              {/* Quick Jump Input */}
              <div className='flex items-center gap-2'>
                <input
                  type='number'
                  min={1}
                  max={story.chapters.length}
                  placeholder={`Nhảy nhanh tới chương (1 - ${story.chapters.length})...`}
                  className='flex-1 px-3 py-1.5 rounded-xl bg-black/5 dark:bg-white/5 text-xs outline-none border border-transparent focus:border-emerald-500 font-mono'
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const val = parseInt((e.target as HTMLInputElement).value, 10)
                      if (val >= 1 && val <= story.chapters.length) {
                        selectChapter(val - 1)
                      }
                    }
                  }}
                />
              </div>
            </div>

            {/* Chapters List */}
            <div className='flex-1 overflow-y-auto p-3 space-y-2'>
              {filteredChapters.map((ch) => {
                const actualIdx = story.chapters.findIndex((c) => c.id === ch.id)
                const isSelected = activeChapterIndex === actualIdx
                const isCompleted = completedChapterIds.includes(ch.id)

                return (
                  <button
                    key={ch.id}
                    onClick={() => selectChapter(actualIdx)}
                    className={`w-full p-3.5 rounded-2xl text-left border transition-all flex flex-col gap-1 ${
                      isSelected
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                        : 'bg-black/5 dark:bg-white/5 border-transparent hover:border-emerald-400'
                    }`}
                  >
                    <div className='flex items-center justify-between text-xs font-bold'>
                      <span className='flex items-center gap-1.5'>
                        {isCompleted && <CheckCircle2 size={13} className='text-emerald-400' />}
                        Chương {ch.chapterNumber}: {ch.titleVi}
                      </span>
                      <span
                        className={`text-[10px] font-mono ${
                          isSelected ? 'text-emerald-100' : 'opacity-60'
                        }`}
                      >
                        {ch.wordCount} từ
                      </span>
                    </div>
                    <p
                      className={`text-[11px] line-clamp-1 ${
                        isSelected ? 'text-emerald-100' : 'opacity-70'
                      }`}
                    >
                      {ch.descriptionVi}
                    </p>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Bookmarks Modal */}
      {isBookmarksModalOpen && (
        <div className='fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4'>
          <div
            className={`w-full max-w-lg rounded-3xl p-6 shadow-2xl border ${headerThemeClasses[theme]} space-y-4 max-h-[80vh] flex flex-col`}
          >
            <div className='flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-3'>
              <div className='flex items-center gap-2'>
                <Bookmark className='text-amber-500' size={20} />
                <h3 className='font-bold text-base'>Đoạn Văn Đã Đánh Dấu ({bookmarks.length})</h3>
              </div>
              <button
                onClick={() => setIsBookmarksModalOpen(false)}
                className='p-1.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 text-gray-400'
              >
                <X size={18} />
              </button>
            </div>

            <div className='flex-1 overflow-y-auto space-y-3 pr-1'>
              {bookmarks.length === 0 ? (
                <div className='text-center py-8 opacity-60 text-xs'>
                  Chưa có đoạn văn nào được đánh dấu. Bấm vào biểu tượng Bookmark trên góc mỗi đoạn
                  văn để lưu lại.
                </div>
              ) : (
                bookmarks.map((bm) => (
                  <div
                    key={bm.id}
                    onClick={() => {
                      const chIdx = story.chapters.findIndex((c) => c.id === bm.chapterId)
                      if (chIdx >= 0) {
                        selectChapter(chIdx)
                        setIsBookmarksModalOpen(false)
                      }
                    }}
                    className='p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 hover:border-amber-400 cursor-pointer space-y-1.5 transition-all'
                  >
                    <div className='flex items-center justify-between text-xs font-bold text-amber-600 dark:text-amber-400'>
                      <span>Chương {bm.chapterNumber}</span>
                      <span className='text-[10px] opacity-60'>Bấm để chuyển đến</span>
                    </div>
                    <p className='text-xs italic font-serif opacity-90 line-clamp-2'>
                      "{bm.textEn}"
                    </p>
                    <p className='text-[11px] opacity-70 line-clamp-2'>{bm.textVi}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Reader Settings Modal */}
      {isSettingsModalOpen && (
        <div className='fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4'>
          <div
            className={`w-full max-w-md rounded-3xl p-6 shadow-2xl border ${headerThemeClasses[theme]} space-y-5`}
          >
            <div className='flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-3'>
              <div className='flex items-center gap-2'>
                <Sliders className='text-emerald-600' size={20} />
                <h3 className='font-bold text-base'>Cài Đặt Đọc Sách</h3>
              </div>
              <button
                onClick={() => setIsSettingsModalOpen(false)}
                className='p-1.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 text-gray-400'
              >
                <X size={18} />
              </button>
            </div>

            {/* Theme selector */}
            <div className='space-y-2'>
              <p className='text-xs font-bold opacity-75'>Màu nền chủ đề:</p>
              <div className='grid grid-cols-4 gap-2'>
                <button
                  onClick={() => setTheme('sepia')}
                  className={`p-2.5 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1 bg-[#f5ebd7] text-[#3e2e1d] ${
                    theme === 'sepia' ? 'ring-2 ring-emerald-500 border-emerald-500' : ''
                  }`}
                >
                  <span>Giấy Cổ</span>
                </button>
                <button
                  onClick={() => setTheme('light')}
                  className={`p-2.5 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1 bg-white text-gray-900 ${
                    theme === 'light' ? 'ring-2 ring-emerald-500 border-emerald-500' : ''
                  }`}
                >
                  <span>Nền Sáng</span>
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`p-2.5 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1 bg-[#0f172a] text-white ${
                    theme === 'dark' ? 'ring-2 ring-emerald-500 border-emerald-500' : ''
                  }`}
                >
                  <span>Nền Tối</span>
                </button>
                <button
                  onClick={() => setTheme('forest')}
                  className={`p-2.5 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1 bg-[#e8efe9] text-[#1c3829] ${
                    theme === 'forest' ? 'ring-2 ring-emerald-500 border-emerald-500' : ''
                  }`}
                >
                  <span>Thảo Mộc</span>
                </button>
              </div>
            </div>

            {/* Font Family selector */}
            <div className='space-y-2'>
              <p className='text-xs font-bold opacity-75'>Kiểu chữ hiển thị:</p>
              <div className='grid grid-cols-3 gap-2'>
                <button
                  onClick={() => setFontFamily('font-serif')}
                  className={`p-2.5 rounded-2xl border text-xs font-serif font-bold ${
                    fontFamily === 'font-serif'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-black/5 dark:bg-white/5'
                  }`}
                >
                  Serif (Cổ điển)
                </button>
                <button
                  onClick={() => setFontFamily('font-sans')}
                  className={`p-2.5 rounded-2xl border text-xs font-sans font-bold ${
                    fontFamily === 'font-sans'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-black/5 dark:bg-white/5'
                  }`}
                >
                  Sans (Hiện đại)
                </button>
                <button
                  onClick={() => setFontFamily('font-mono')}
                  className={`p-2.5 rounded-2xl border text-xs font-mono font-bold ${
                    fontFamily === 'font-mono'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-black/5 dark:bg-white/5'
                  }`}
                >
                  Mono (Code)
                </button>
              </div>
            </div>

            {/* Font Size +/- */}
            <div className='space-y-2'>
              <div className='flex items-center justify-between text-xs font-bold'>
                <span className='opacity-75'>Cỡ chữ:</span>
                <span className='font-mono text-emerald-600 dark:text-emerald-400'>
                  {fontSize}px
                </span>
              </div>
              <div className='flex items-center gap-3'>
                <button
                  onClick={() => setFontSize((s) => Math.max(14, s - 2))}
                  className='flex-1 py-2.5 rounded-2xl bg-black/5 dark:bg-white/5 font-bold text-sm hover:bg-black/10'
                >
                  A- (Nhỏ hơn)
                </button>
                <button
                  onClick={() => setFontSize((s) => Math.min(26, s + 2))}
                  className='flex-1 py-2.5 rounded-2xl bg-black/5 dark:bg-white/5 font-bold text-sm hover:bg-black/10'
                >
                  A+ (Lớn hơn)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Word Lookup Popover */}
      {selectedWordData && (
        <WordLookupPopover wordData={selectedWordData} onClose={() => setSelectedWordData(null)} />
      )}
    </div>
  )
}
