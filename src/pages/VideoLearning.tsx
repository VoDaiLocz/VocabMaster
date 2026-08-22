// ============================================
// Video Learning Page (YouTube Bilingual)
// ============================================

import React, { useState, useEffect, useCallback } from 'react'
import {
  extractYouTubeVideoId,
  fetchYouTubeBilingualTranscript,
  TranscriptCue,
  CURATED_LEARNING_VIDEOS,
  VideoInfo,
} from '@/services/youtubeTranscriptService'
import { lookupWord, WordLookupResult } from '@/services/dictionaryService'
import {
  YouTubePlayer,
  InteractiveTranscript,
  WordLookupPopover,
  VideoNotesDrawer,
  VideoNote,
} from '@/components/video'
import { Youtube, Sparkles, Link2, Compass, X } from 'lucide-react'
import { useDeckStore } from '@/store/deckStore'

export const VideoLearning: React.FC = () => {
  const { fetchDecks } = useDeckStore()
  const [inputUrl, setInputUrl] = useState('')
  const [showSearchModal, setShowSearchModal] = useState(false)
  const [currentVideoId, setCurrentVideoId] = useState<string | null>('UF8uR6Z6KLc') // Default to Steve Jobs
  const [currentVideoInfo, setCurrentVideoInfo] = useState<VideoInfo | null>(
    CURATED_LEARNING_VIDEOS[0].info,
  )
  const [cues, setCues] = useState<TranscriptCue[]>(CURATED_LEARNING_VIDEOS[0].sampleCues)
  const [loading, setLoading] = useState(false)
  const [loadProgress, setLoadProgress] = useState(0)
  const [loadStatus, setLoadStatus] = useState('Đang kết nối...')
  const [currentTime, setCurrentTime] = useState(0)
  const [seekToTime, setSeekToTime] = useState<number | null>(null)
  const [autoPause, setAutoPause] = useState(false)
  const [activeWordLookup, setActiveWordLookup] = useState<WordLookupResult | null>(null)
  const [notes, setNotes] = useState<VideoNote[]>([])

  // Ensure decks are loaded
  useEffect(() => {
    fetchDecks()
  }, [fetchDecks])

  // Load Video Transcript with explicit percentage steps
  const handleLoadVideo = async (videoId: string, info?: VideoInfo) => {
    setLoading(true)
    setLoadProgress(10)
    setLoadStatus('Đang kết nối tới YouTube...')
    setCurrentVideoId(videoId)
    setCurrentTime(0)
    setSeekToTime(0)

    const foundCurated = CURATED_LEARNING_VIDEOS.find((v) => v.info.videoId === videoId)
    if (info) {
      setCurrentVideoInfo(info)
    } else if (foundCurated) {
      setCurrentVideoInfo(foundCurated.info)
    } else {
      setCurrentVideoInfo({
        videoId,
        title: 'Video YouTube Học Tiếng Anh',
        channel: 'YouTube Creator',
        thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      })
    }

    // Step 2: Extracting
    const progressTimer1 = setTimeout(() => {
      setLoadProgress(40)
      setLoadStatus('Đang trích xuất toàn bộ luồng phụ đề gốc...')
    }, 300)

    // Step 3: Translating & Tokenizing
    const progressTimer2 = setTimeout(() => {
      setLoadProgress(75)
      setLoadStatus('Đang biên dịch song ngữ AI & gán từ điển tương tác...')
    }, 700)

    try {
      const transcriptCues = await fetchYouTubeBilingualTranscript(videoId)
      setLoadProgress(95)
      setLoadStatus(`Đã xử lý ${transcriptCues.length} câu thoại song ngữ...`)
      await new Promise((r) => setTimeout(r, 300))
      setLoadProgress(100)
      setLoadStatus('Hoàn tất! Sẵn sàng bài học.')
      setCues(transcriptCues)
      await new Promise((r) => setTimeout(r, 200))
    } catch (err) {
      console.error('Failed to load transcript:', err)
    } finally {
      clearTimeout(progressTimer1)
      clearTimeout(progressTimer2)
      setLoading(false)
      setLoadProgress(0)
    }
  }

  // Handle URL submit
  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputUrl.trim()) return

    const videoId = extractYouTubeVideoId(inputUrl)
    if (videoId) {
      handleLoadVideo(videoId)
      setInputUrl('')
    } else {
      alert('Đường dẫn YouTube không hợp lệ. Vui lòng kiểm tra lại link.')
    }
  }

  // Navigation callbacks
  const handlePrevSentence = useCallback(() => {
    const currentIndex = cues.findIndex((c) => currentTime >= c.start && currentTime <= c.end)
    if (currentIndex > 0) {
      setSeekToTime(cues[currentIndex - 1].start)
    } else if (cues[0]) {
      setSeekToTime(cues[0].start)
    }
  }, [cues, currentTime])

  const handleNextSentence = useCallback(() => {
    const currentIndex = cues.findIndex((c) => currentTime >= c.start && currentTime <= c.end)
    if (currentIndex >= 0 && currentIndex < cues.length - 1) {
      setSeekToTime(cues[currentIndex + 1].start)
    }
  }, [cues, currentTime])

  const handleRepeatSentence = useCallback(() => {
    const currentCue = cues.find((c) => currentTime >= c.start && currentTime <= c.end)
    if (currentCue) {
      setSeekToTime(currentCue.start)
    }
  }, [cues, currentTime])

  // Word Click Handler
  const handleWordClick = async (rawWord: string, contextSentence: string) => {
    const result = await lookupWord(rawWord, contextSentence)
    setActiveWordLookup(result)
  }

  // Add Note Handler
  const handleAddNote = (newNoteData: { timestamp: number; quote: string; userNote: string }) => {
    const newNote: VideoNote = {
      id: Date.now().toString(),
      ...newNoteData,
      createdAt: new Date().toISOString(),
    }
    setNotes((prev) => [newNote, ...prev])
  }

  const handleDeleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id))
  }

  const currentCue = cues.find((c) => currentTime >= c.start && currentTime <= c.end)

  return (
    <div className='p-2 sm:p-4 md:p-6 max-w-7xl mx-auto space-y-3 sm:space-y-4'>
      {/* Top Minimal Header */}
      <div className='flex items-center justify-between gap-2 px-1'>
        <div className='flex items-center gap-2 min-w-0'>
          <div className='p-1.5 sm:p-2 rounded-xl bg-red-600 text-white shadow-sm shrink-0'>
            <Youtube size={18} className='sm:w-5 sm:h-5' />
          </div>
          <div className='min-w-0'>
            <h1 className='font-display font-bold text-sm sm:text-lg text-gray-900 dark:text-white truncate'>
              {currentVideoInfo?.title || 'Video Song Ngữ'}
            </h1>
            <p className='text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 truncate'>
              {currentVideoInfo?.channel || 'YouTube English'} • {cues.length} câu song ngữ
            </p>
          </div>
        </div>

        {/* Change Video & Recommendations Pill */}
        <button
          onClick={() => setShowSearchModal(true)}
          className='flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary-50 dark:bg-primary-950/50 text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-800/60 text-xs font-bold hover:bg-primary-100 transition-all shrink-0 active:scale-95 shadow-sm'
        >
          <Compass size={14} />
          <span className='hidden sm:inline'>Đổi Video / Link</span>
          <span className='sm:hidden'>Đổi video</span>
        </button>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className='h-64 sm:h-80 flex flex-col items-center justify-center p-6 bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm'>
          <div className='w-full max-w-md space-y-4 text-center'>
            <div className='w-12 h-12 rounded-2xl bg-primary-100 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 flex items-center justify-center mx-auto shadow-inner'>
              <Sparkles size={24} className='animate-pulse text-primary-500' />
            </div>
            <div>
              <h3 className='text-base font-bold font-display text-gray-900 dark:text-white'>
                Đang xử lý bài học video
              </h3>
              <p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>{loadStatus}</p>
            </div>
            <div className='w-full h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden p-0.5 border border-gray-200 dark:border-gray-700/60'>
              <div
                className='h-full bg-gradient-to-r from-primary-600 via-indigo-500 to-primary-400 rounded-full transition-all duration-300'
                style={{ width: `${loadProgress}%` }}
              />
            </div>
          </div>
        </div>
      ) : currentVideoId ? (
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 items-start'>
          {/* Left Column on Desktop / Main Player on Mobile */}
          <div className='lg:col-span-7 space-y-3'>
            <YouTubePlayer
              videoId={currentVideoId}
              onTimeUpdate={setCurrentTime}
              onPrevSentence={handlePrevSentence}
              onNextSentence={handleNextSentence}
              onRepeatSentence={handleRepeatSentence}
              autoPause={autoPause}
              onToggleAutoPause={() => setAutoPause((p) => !p)}
              seekToTime={seekToTime}
            />

            {/* Desktop Notes Drawer (Hidden on Mobile) */}
            <div className='hidden lg:block h-72'>
              <VideoNotesDrawer
                notes={notes}
                currentTime={currentTime}
                currentQuote={currentCue?.textEn}
                onAddNote={handleAddNote}
                onDeleteNote={handleDeleteNote}
                onSeek={(time) => setSeekToTime(time)}
              />
            </div>
          </div>

          {/* Right Column on Desktop / Immediate Subtitle Stream on Mobile */}
          <div className='lg:col-span-5 h-[calc(100dvh-290px)] sm:h-[480px] lg:h-[620px]'>
            <InteractiveTranscript
              cues={cues}
              currentTime={currentTime}
              onSeek={(time) => setSeekToTime(time)}
              onWordClick={handleWordClick}
              onAddNote={(cue) => {
                handleAddNote({
                  timestamp: Math.round(cue.start),
                  quote: cue.textEn,
                  userNote: cue.textVi,
                })
              }}
            />
          </div>
        </div>
      ) : null}

      {/* Modal / Dialog for Video Search & Curated Recommendations */}
      {showSearchModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn'>
          <div className='w-full max-w-lg bg-white dark:bg-dark-card rounded-2xl p-5 shadow-2xl border border-gray-200 dark:border-gray-800 space-y-4 max-h-[85vh] flex flex-col'>
            {/* Modal Header */}
            <div className='flex items-center justify-between pb-2 border-b border-gray-100 dark:border-gray-800'>
              <div className='flex items-center gap-2'>
                <Compass size={18} className='text-primary-500' />
                <h3 className='font-display font-bold text-base text-gray-900 dark:text-white'>
                  Chọn Video Học Tiếng Anh
                </h3>
              </div>
              <button
                onClick={() => setShowSearchModal(false)}
                className='p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
              >
                <X size={18} />
              </button>
            </div>

            {/* Custom URL Input Form */}
            <form
              onSubmit={(e) => {
                handleUrlSubmit(e)
                setShowSearchModal(false)
              }}
              className='flex items-center gap-2'
            >
              <div className='relative flex-1'>
                <Link2
                  size={16}
                  className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
                />
                <input
                  type='text'
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  placeholder='Dán link YouTube bất kỳ...'
                  className='w-full pl-9 pr-3 py-2 rounded-xl text-xs sm:text-sm bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500'
                  autoFocus
                />
              </div>
              <button
                type='submit'
                className='px-3.5 py-2 rounded-xl bg-primary-600 hover:bg-primary-500 text-white text-xs sm:text-sm font-semibold shadow-md shadow-primary-500/25 transition-all shrink-0'
              >
                Mở
              </button>
            </form>

            {/* Curated list */}
            <div className='flex-1 overflow-y-auto space-y-2 pr-1'>
              <div className='text-xs font-semibold text-gray-400 uppercase tracking-wider'>
                Video đề xuất hay nhất
              </div>
              <div className='space-y-2'>
                {CURATED_LEARNING_VIDEOS.map((item) => {
                  const isSelected = currentVideoId === item.info.videoId
                  return (
                    <div
                      key={item.info.videoId}
                      onClick={() => {
                        handleLoadVideo(item.info.videoId, item.info)
                        setShowSearchModal(false)
                      }}
                      className={`p-2.5 rounded-xl flex items-center gap-3 cursor-pointer transition-all border ${
                        isSelected
                          ? 'bg-primary-50/80 dark:bg-primary-950/30 border-primary-300 dark:border-primary-800 shadow-sm'
                          : 'bg-white dark:bg-gray-800/40 border-gray-100 dark:border-gray-800 hover:border-primary-200'
                      }`}
                    >
                      <img
                        src={item.info.thumbnailUrl}
                        alt={item.info.title}
                        className='w-16 h-11 object-cover rounded-lg'
                      />
                      <div className='flex-1 min-w-0'>
                        <h4 className='text-xs font-bold text-gray-900 dark:text-gray-100 truncate'>
                          {item.info.title}
                        </h4>
                        <p className='text-[10px] text-gray-500 dark:text-gray-400 truncate mt-0.5'>
                          {item.info.channel} • {item.info.durationFormatted}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Word Lookup Modal */}
      {activeWordLookup && (
        <WordLookupPopover wordData={activeWordLookup} onClose={() => setActiveWordLookup(null)} />
      )}
    </div>
  )
}
