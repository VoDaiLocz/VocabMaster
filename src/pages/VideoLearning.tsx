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
import { Youtube, Sparkles, Link2, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'
import { useDeckStore } from '@/store/deckStore'

export const VideoLearning: React.FC = () => {
  const { fetchDecks } = useDeckStore()
  const [inputUrl, setInputUrl] = useState('')
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
    <div className='p-4 md:p-8 max-w-7xl mx-auto space-y-6'>
      {/* Page Header */}
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <div>
          <div className='flex items-center gap-2 mb-1'>
            <div className='p-2 rounded-xl bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400'>
              <Youtube size={24} />
            </div>
            <h1 className='font-display font-bold text-2xl md:text-3xl text-gray-900 dark:text-white'>
              Học Tiếng Anh qua YouTube Song Ngữ
            </h1>
          </div>
          <p className='text-sm text-gray-500 dark:text-gray-400'>
            Dán link YouTube bất kỳ để xem với phụ đề song ngữ, nhấp từ để tra nghĩa & lưu Flashcard
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleUrlSubmit} className='flex items-center gap-2 w-full md:w-auto'>
          <div className='relative flex-1 md:w-80'>
            <Link2 size={16} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
            <input
              type='text'
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder='Dán link YouTube hoặc Video ID...'
              className='w-full pl-9 pr-4 py-2.5 rounded-xl text-sm bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-sm'
            />
          </div>
          <button
            type='submit'
            className='px-4 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white text-sm font-semibold shadow-lg shadow-primary-500/25 transition-all flex items-center gap-1.5'
          >
            <span>Mở video</span>
            <ArrowRight size={16} />
          </button>
        </form>
      </div>

      {/* Curated Recommendations */}
      <div className='space-y-2'>
        <div className='flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider'>
          <Sparkles size={14} className='text-amber-500' /> Video Đề Xuất Học Tiếng Anh
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3'>
          {CURATED_LEARNING_VIDEOS.map((item) => {
            const isSelected = currentVideoId === item.info.videoId
            return (
              <div
                key={item.info.videoId}
                onClick={() => handleLoadVideo(item.info.videoId, item.info)}
                className={`p-3 rounded-xl flex items-center gap-3 cursor-pointer transition-all border ${
                  isSelected
                    ? 'bg-primary-50/80 dark:bg-primary-950/30 border-primary-300 dark:border-primary-800 shadow-sm'
                    : 'bg-white dark:bg-dark-card border-gray-100 dark:border-gray-800 hover:border-primary-200 dark:hover:border-primary-800'
                }`}
              >
                <img
                  src={item.info.thumbnailUrl}
                  alt={item.info.title}
                  className='w-16 h-12 object-cover rounded-lg'
                />
                <div className='flex-1 min-w-0'>
                  <h4 className='text-xs font-bold text-gray-900 dark:text-gray-100 truncate'>
                    {item.info.title}
                  </h4>
                  <p className='text-[11px] text-gray-500 dark:text-gray-400 truncate mt-0.5'>
                    {item.info.channel} • {item.info.durationFormatted}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Main Learning Workspace */}
      {loading ? (
        <div className='h-96 flex flex-col items-center justify-center p-8 bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm'>
          <div className='w-full max-w-md space-y-5 text-center'>
            <div className='flex items-center justify-center gap-3'>
              <div className='w-12 h-12 rounded-2xl bg-primary-100 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 flex items-center justify-center shadow-inner'>
                <Sparkles size={24} className='animate-pulse text-primary-500' />
              </div>
              <div className='text-left'>
                <h3 className='text-lg font-bold font-display text-gray-900 dark:text-white'>
                  Đang thiết lập phòng học
                </h3>
                <p className='text-xs text-gray-500 dark:text-gray-400 font-medium'>
                  Trích xuất và biên dịch phụ đề song ngữ
                </p>
              </div>
            </div>

            {/* Progress Bar & Percentage */}
            <div className='space-y-2'>
              <div className='flex justify-between items-center text-sm font-semibold'>
                <span className='text-gray-600 dark:text-gray-300 flex items-center gap-1.5'>
                  <Loader2 size={15} className='animate-spin text-primary-500' />
                  {loadStatus}
                </span>
                <span className='text-primary-600 dark:text-primary-400 font-mono text-base font-bold'>
                  {loadProgress}%
                </span>
              </div>
              <div className='w-full h-3.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden p-0.5 border border-gray-200 dark:border-gray-700/60'>
                <div
                  className='h-full bg-gradient-to-r from-primary-600 via-indigo-500 to-primary-400 rounded-full transition-all duration-300 ease-out shadow-sm'
                  style={{ width: `${loadProgress}%` }}
                />
              </div>
            </div>

            <div className='flex items-center justify-center gap-4 text-[11px] text-gray-400 dark:text-gray-500 pt-1'>
              <span>1. Kết nối YouTube</span>
              <span>•</span>
              <span>2. Tải toàn bộ phụ đề</span>
              <span>•</span>
              <span>3. Gán từ điển tương tác</span>
            </div>
          </div>
        </div>
      ) : currentVideoId ? (
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 items-start'>
          {/* Left Column: Player & Notes */}
          <div className='lg:col-span-7 space-y-6'>
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

            {/* Video Info Card */}
            {currentVideoInfo && (
              <div className='p-4 bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-gray-800 flex items-center justify-between'>
                <div>
                  <h2 className='font-display font-bold text-lg text-gray-900 dark:text-white'>
                    {currentVideoInfo.title}
                  </h2>
                  <p className='text-xs text-gray-500 dark:text-gray-400 mt-0.5'>
                    Kênh: {currentVideoInfo.channel}
                  </p>
                </div>
                <div className='flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold'>
                  <CheckCircle2 size={14} /> Song ngữ sẵn sàng
                </div>
              </div>
            )}

            {/* Notes Drawer */}
            <div className='h-80'>
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

          {/* Right Column: Interactive Transcript */}
          <div className='lg:col-span-5 h-[700px]'>
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

      {/* Word Lookup Modal */}
      {activeWordLookup && (
        <WordLookupPopover wordData={activeWordLookup} onClose={() => setActiveWordLookup(null)} />
      )}
    </div>
  )
}
