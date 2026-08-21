// ============================================
// Interactive Bilingual Subtitles Transcript with Natural Typography & Active Waveform Highlighting
// ============================================

import React, { useEffect, useRef, useState } from 'react'
import { TranscriptCue } from '@/services/youtubeTranscriptService'
import { BookmarkPlus, Search, Volume2 } from 'lucide-react'

interface InteractiveTranscriptProps {
  cues: TranscriptCue[]
  currentTime: number
  onSeek: (seconds: number) => void
  onWordClick: (word: string, contextSentence: string) => void
  onAddNote: (cue: TranscriptCue) => void
}

type SubtitleMode = 'both' | 'en-only' | 'hover-vi'

export const InteractiveTranscript: React.FC<InteractiveTranscriptProps> = ({
  cues,
  currentTime,
  onSeek,
  onWordClick,
  onAddNote,
}) => {
  const [subMode, setSubMode] = useState<SubtitleMode>('both')
  const [searchQuery, setSearchQuery] = useState('')
  const activeCueRef = useRef<HTMLDivElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  // Find currently active cue with high accuracy from 00:00
  let activeIndex = -1
  if (cues.length > 0) {
    // 1. Direct exact range match
    const exactIdx = cues.findIndex((c) => currentTime >= c.start && currentTime <= c.end + 0.3)
    if (exactIdx !== -1) {
      activeIndex = exactIdx
    } else {
      // 2. Latest started cue
      for (let i = cues.length - 1; i >= 0; i--) {
        if (currentTime >= cues[i].start) {
          activeIndex = i
          break
        }
      }
    }
    // Default to first cue if at the very beginning
    if (activeIndex === -1 && currentTime <= cues[0].start + 1.0) {
      activeIndex = 0
    }
  }

  // Auto-scroll to keep active sentence centered
  useEffect(() => {
    if (activeCueRef.current && containerRef.current) {
      activeCueRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      })
    }
  }, [activeIndex])

  const formatTimestamp = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Filter cues by search query
  const filteredCues = cues.filter(
    (c) =>
      c.textEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.textVi.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className='flex flex-col h-full bg-white dark:bg-dark-card rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden'>
      {/* Header & Controls */}
      <div className='p-4 border-b border-gray-100 dark:border-gray-800 flex flex-wrap items-center justify-between gap-3 bg-gray-50/50 dark:bg-gray-800/40'>
        <div>
          <h3 className='font-display font-bold text-base text-gray-900 dark:text-white flex items-center gap-2'>
            <span>Phụ đề Song Ngữ</span>
            <span className='px-2 py-0.5 rounded-full text-xs bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 font-semibold'>
              {cues.length} câu
            </span>
          </h3>
          <p className='text-xs text-gray-500 dark:text-gray-400'>
            Nhấp vào từ bất kỳ để tra nghĩa & lưu Flashcard
          </p>
        </div>

        {/* Subtitle Mode Controls */}
        <div className='flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl text-xs'>
          <button
            onClick={() => setSubMode('both')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              subMode === 'both'
                ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            Song ngữ
          </button>
          <button
            onClick={() => setSubMode('en-only')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              subMode === 'en-only'
                ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            Chỉ EN
          </button>
          <button
            onClick={() => setSubMode('hover-vi')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              subMode === 'hover-vi'
                ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm'
                : 'text-gray-500 dark:text-gray-400'
            }`}
            title='Chỉ hiện tiếng Việt khi di chuột vào câu'
          >
            Ẩn VI (Hover)
          </button>
        </div>
      </div>

      {/* Search in transcript */}
      <div className='px-4 py-2 border-b border-gray-100 dark:border-gray-800/60 flex items-center gap-2 bg-white dark:bg-dark-card'>
        <Search size={16} className='text-gray-400' />
        <input
          type='text'
          placeholder='Tìm kiếm câu thoại hoặc từ vựng trong video...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='w-full text-xs bg-transparent border-none focus:outline-none text-gray-700 dark:text-gray-200'
        />
      </div>

      {/* Transcript Scroll Area */}
      <div ref={containerRef} className='flex-1 overflow-y-auto p-3 space-y-2'>
        {filteredCues.length === 0 ? (
          <div className='py-12 text-center text-gray-400 text-sm'>
            Không tìm thấy câu nào phù hợp với từ khóa.
          </div>
        ) : (
          filteredCues.map((cue) => {
            const isActive = activeIndex !== -1 && cues[activeIndex]?.id === cue.id

            return (
              <div
                key={cue.id}
                ref={isActive ? activeCueRef : null}
                className={`transition-all rounded-xl p-3.5 border ${
                  isActive
                    ? 'bg-gradient-to-r from-primary-50/90 to-indigo-50/50 dark:from-primary-950/60 dark:to-indigo-950/30 border-l-4 border-l-primary-500 border-primary-200 dark:border-primary-800/80 shadow-md ring-1 ring-primary-500/20'
                    : 'bg-white dark:bg-dark-card border-gray-100 dark:border-gray-800/60 border-l-4 border-l-transparent hover:bg-gray-50/80 dark:hover:bg-gray-800/40'
                }`}
              >
                {/* Header info & timestamp with live audio wave indicator */}
                <div className='flex items-center justify-between mb-2'>
                  <div className='flex items-center gap-2'>
                    <button
                      onClick={() => onSeek(cue.start)}
                      className={`px-2.5 py-0.5 rounded-lg font-mono text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm ${
                        isActive
                          ? 'bg-primary-600 text-white shadow-primary-500/30 scale-105'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-primary-100 dark:hover:bg-primary-900/40 hover:text-primary-600'
                      }`}
                    >
                      <span>▶</span>
                      <span>{formatTimestamp(cue.start)}</span>
                    </button>

                    {isActive && (
                      <div className='flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 text-[11px] font-bold animate-pulse'>
                        <Volume2 size={12} className='animate-bounce' />
                        <span>Đang phát</span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => onAddNote(cue)}
                    className='p-1.5 rounded-lg text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
                    title='Ghi chú câu này'
                  >
                    <BookmarkPlus size={16} />
                  </button>
                </div>

                {/* English sentence with bold, clear typography and click-to-lookup */}
                <p
                  className={`leading-relaxed transition-colors ${
                    isActive
                      ? 'text-base font-bold text-gray-950 dark:text-white'
                      : 'text-sm font-medium text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {cue.words.map((word, wIdx) => (
                    <span
                      key={wIdx}
                      onClick={() => onWordClick(word, cue.textEn)}
                      className={`inline cursor-pointer rounded-sm transition-all duration-150 ${
                        isActive
                          ? 'hover:bg-primary-200/80 dark:hover:bg-primary-800/80 hover:text-primary-700 dark:hover:text-primary-300 underline decoration-primary-300 decoration-1 underline-offset-2'
                          : 'hover:bg-primary-100 dark:hover:bg-primary-900/60 hover:text-primary-600 dark:hover:text-primary-400'
                      }`}
                      title='Nhấp để tra từ & lưu Flashcard'
                    >
                      {word}
                      {wIdx < cue.words.length - 1 ? ' ' : ''}
                    </span>
                  ))}
                </p>

                {/* Vietnamese translation */}
                {subMode !== 'en-only' && (
                  <p
                    className={`mt-1.5 leading-normal transition-opacity ${
                      isActive
                        ? 'text-xs font-semibold text-primary-700 dark:text-primary-300'
                        : 'text-xs font-normal text-gray-500 dark:text-gray-400'
                    } ${subMode === 'hover-vi' ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}
                  >
                    {cue.textVi}
                  </p>
                )}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
