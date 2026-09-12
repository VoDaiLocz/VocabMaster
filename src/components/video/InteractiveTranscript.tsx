import React, { useEffect, useRef, useState, useMemo, memo } from 'react'
import { TranscriptCue, translateEnToVi } from '@/services/youtubeTranscriptService'
import { BookmarkPlus, Search, Volume2, Play, Languages } from 'lucide-react'
import {
  speakLanguage,
  speakBilingualAudio,
  stopBilingualAudio,
} from '@/services/bilingualAudioService'

interface InteractiveTranscriptProps {
  cues: TranscriptCue[]
  currentTime: number
  onSeek: (seconds: number) => void
  onWordClick: (word: string, contextSentence: string, contextVi?: string) => void
  onAddNote: (cue: TranscriptCue) => void
  onLoadCustomCues?: (newCues: TranscriptCue[]) => void
  onOpenExplorer?: () => void
  interleavedMode?: boolean
  onToggleInterleavedMode?: () => void
  isInterleavedSpeaking?: boolean
}

type SubtitleMode = 'both' | 'en-only' | 'hover-vi'

const formatTimestamp = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

interface CueItemProps {
  cue: TranscriptCue
  isActive: boolean
  subMode: SubtitleMode
  onSeek: (seconds: number) => void
  onWordClick: (word: string, contextSentence: string, contextVi?: string) => void
  onAddNote: (cue: TranscriptCue) => void
}

const CueItem = memo<CueItemProps>(
  ({ cue, isActive, subMode, onSeek, onWordClick, onAddNote }) => {
    const isSameAsEn = (val?: string) =>
      !val || val.trim().toLowerCase() === cue.textEn.trim().toLowerCase()

    const initialVi = !isSameAsEn(cue.textVi) ? cue.textVi : ''
    const [viTranslation, setViTranslation] = useState(initialVi)
    const [speakingMode, setSpeakingMode] = useState<'idle' | 'en' | 'vi' | 'bilingual'>('idle')
    const [bilingualPhase, setBilingualPhase] = useState<'idle' | 'en' | 'vi'>('idle')

    useEffect(() => {
      if (!isSameAsEn(cue.textVi)) {
        setViTranslation(cue.textVi)
      } else if (isActive && !viTranslation) {
        translateEnToVi(cue.textEn).then((translated) => {
          if (translated && !isSameAsEn(translated)) {
            cue.textVi = translated
            setViTranslation(translated)
          }
        })
      }
    }, [cue, isActive, viTranslation])

    // Cleanup audio khi unmount hoặc đổi cue
    useEffect(() => {
      return () => {
        if (speakingMode !== 'idle') {
          stopBilingualAudio()
        }
      }
    }, [speakingMode])

    const handleSpeakEn = async () => {
      if (speakingMode === 'en') {
        stopBilingualAudio()
        setSpeakingMode('idle')
        return
      }
      setSpeakingMode('en')
      await speakLanguage(cue.textEn, 'en')
      setSpeakingMode('idle')
    }

    const handleSpeakVi = async () => {
      const targetVi = viTranslation || cue.textVi
      if (!targetVi) return

      if (speakingMode === 'vi') {
        stopBilingualAudio()
        setSpeakingMode('idle')
        return
      }
      setSpeakingMode('vi')
      await speakLanguage(targetVi, 'vi')
      setSpeakingMode('idle')
    }

    const handleSpeakBilingual = async () => {
      const targetVi = viTranslation || cue.textVi

      if (speakingMode === 'bilingual') {
        stopBilingualAudio()
        setSpeakingMode('idle')
        setBilingualPhase('idle')
        return
      }

      setSpeakingMode('bilingual')
      await speakBilingualAudio(cue.textEn, targetVi || '', (phase) => {
        setBilingualPhase(phase)
      })
      setSpeakingMode('idle')
      setBilingualPhase('idle')
    }

    return (
      <div
        id={`cue-item-${cue.id}`}
        data-cue-id={cue.id}
        onClick={() => onSeek(cue.start)}
        className={`cursor-pointer transition-all duration-200 rounded-2xl p-3 sm:p-3.5 border ${
          isActive
            ? 'bg-gradient-to-r from-primary-50/90 to-indigo-50/60 dark:from-primary-950/70 dark:to-indigo-950/40 border-l-4 border-l-primary-500 border-primary-300 dark:border-primary-700 shadow-md ring-1 ring-primary-500/20'
            : 'bg-white dark:bg-dark-card border-gray-100 dark:border-gray-800/60 border-l-4 border-l-transparent hover:bg-gray-50/80 dark:hover:bg-gray-800/40 opacity-75 hover:opacity-100'
        }`}
      >
        {/* Header: Timestamp, Audio Controls (EN, VI, Song ngữ), and Add Note */}
        <div className='flex items-center justify-between mb-1.5 gap-1.5 flex-wrap'>
          <div className='flex items-center gap-1.5 flex-wrap'>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onSeek(cue.start)
              }}
              className={`px-2 py-0.5 rounded-md font-mono text-[11px] sm:text-xs font-bold flex items-center gap-1 transition-all ${
                isActive
                  ? 'bg-primary-600 text-white shadow-sm shadow-primary-500/30'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-primary-100 dark:hover:bg-primary-900/40 hover:text-primary-600'
              }`}
            >
              <Play size={10} className='fill-current' />
              <span>{formatTimestamp(cue.start)}</span>
            </button>

            {/* Nút phát âm Tiếng Anh */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleSpeakEn()
              }}
              className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] sm:text-[11px] font-bold transition-all ${
                speakingMode === 'en'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30 animate-pulse'
                  : 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/60'
              }`}
              title={speakingMode === 'en' ? 'Dừng đọc EN' : 'Phát âm tiếng Anh'}
            >
              <Volume2 size={11} className={speakingMode === 'en' ? 'animate-bounce' : ''} />
              <span>EN</span>
            </button>

            {/* Nút phát âm Tiếng Việt */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleSpeakVi()
              }}
              className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] sm:text-[11px] font-bold transition-all ${
                speakingMode === 'vi'
                  ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-500/30 animate-pulse'
                  : 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/60'
              }`}
              title={speakingMode === 'vi' ? 'Dừng đọc VI' : 'Đọc bản dịch tiếng Việt'}
            >
              <Volume2 size={11} className={speakingMode === 'vi' ? 'animate-bounce' : ''} />
              <span>VI</span>
            </button>

            {/* Nút phát âm Song Ngữ (EN -> nghỉ 350ms -> VI) */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleSpeakBilingual()
              }}
              className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-bold transition-all ${
                speakingMode === 'bilingual'
                  ? 'bg-amber-500 text-white animate-pulse shadow-sm shadow-amber-500/30'
                  : isActive
                    ? 'bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900/50'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/30'
              }`}
              title={speakingMode === 'bilingual' ? 'Dừng đọc song ngữ' : 'Đọc câu này song ngữ (EN ➔ VI)'}
            >
              <Languages size={11} />
              <span>
                {speakingMode === 'bilingual'
                  ? bilingualPhase === 'en'
                    ? 'Đọc EN...'
                    : 'Đọc VI...'
                  : 'Song ngữ'}
              </span>
            </button>
          </div>

          <div className='flex items-center gap-1'>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onAddNote(cue)
              }}
              className='p-1 rounded-lg text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
              title='Ghi chú câu này'
            >
              <BookmarkPlus size={14} />
            </button>
          </div>
        </div>

        {/* English sentence with interactive click-to-lookup words */}
        <p
          className={`leading-relaxed transition-colors ${
            isActive
              ? 'text-sm sm:text-base font-bold text-gray-950 dark:text-white'
              : 'text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300'
          }`}
        >
          {cue.words.map((word, wIdx) => (
            <span
              key={wIdx}
              onClick={(e) => {
                e.stopPropagation()
                onWordClick(word, cue.textEn, cue.textVi)
              }}
              className={`inline cursor-pointer rounded-sm px-0.5 transition-colors ${
                isActive
                  ? 'hover:bg-primary-200 dark:hover:bg-primary-800/80 hover:text-primary-800 dark:hover:text-primary-200 underline decoration-primary-400 decoration-1 underline-offset-2'
                  : 'hover:bg-primary-100 dark:hover:bg-primary-900/60 hover:text-primary-600 dark:hover:text-primary-400'
              }`}
              title='Nhấp để tra từ'
            >
              {word}{' '}
            </span>
          ))}
        </p>

        {/* Vietnamese translation */}
        {subMode !== 'en-only' && (
          <p
            className={`mt-1 text-xs leading-normal transition-opacity ${
              isActive
                ? 'font-semibold text-primary-700 dark:text-primary-300'
                : 'font-normal text-gray-500 dark:text-gray-400'
            } ${subMode === 'hover-vi' ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}
          >
            {(!isSameAsEn(viTranslation) && viTranslation) ||
              (!isSameAsEn(cue.textVi) && cue.textVi) ||
              (isActive ? 'Đang dịch tiếng Việt...' : '')}
          </p>
        )}
      </div>
    )
  },
  (prev, next) => {
    return (
      prev.isActive === next.isActive &&
      prev.subMode === next.subMode &&
      prev.cue.id === next.cue.id &&
      prev.cue.textVi === next.cue.textVi
    )
  },
)
CueItem.displayName = 'CueItem'

export const InteractiveTranscript: React.FC<InteractiveTranscriptProps> = ({
  cues,
  currentTime,
  onSeek,
  onWordClick,
  onAddNote,
  interleavedMode,
  onToggleInterleavedMode,
  isInterleavedSpeaking,
}) => {
  const [subMode, setSubMode] = useState<SubtitleMode>('both')
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const currentActiveIdRef = useRef<number | null>(null)
  const lastScrolledIdRef = useRef<number | null>(null)

  // Find currently active cue with boundary hysteresis to eliminate flickering between cues
  const activeCueId = useMemo(() => {
    if (cues.length === 0) return null

    // 1. Hysteresis: If currently active cue is still valid within a 0.2s margin, stay on it!
    if (currentActiveIdRef.current !== null) {
      const currentCue = cues.find((c) => c.id === currentActiveIdRef.current)
      if (
        currentCue &&
        currentTime >= currentCue.start - 0.05 &&
        currentTime <= currentCue.end + 0.2
      ) {
        return currentCue.id
      }
    }

    // 2. Exact match within start and end
    const exact = cues.find((c) => currentTime >= c.start && currentTime <= c.end)
    if (exact) {
      currentActiveIdRef.current = exact.id
      return exact.id
    }

    // 3. Fallback to latest passed cue
    for (let i = cues.length - 1; i >= 0; i--) {
      if (currentTime >= cues[i].start) {
        currentActiveIdRef.current = cues[i].id
        return cues[i].id
      }
    }

    const firstId = cues[0]?.id ?? null
    currentActiveIdRef.current = firstId
    return firstId
  }, [cues, currentTime])

  // Smart Viewport Containment Scroll: ONLY scroll if the active cue is outside comfortable padding
  // This completely eliminates scroll-thrashing and jitter ("lúc giật lúc ko")
  useEffect(() => {
    if (!activeCueId || activeCueId === lastScrolledIdRef.current) return

    const container = containerRef.current
    if (!container) return
    const el = container.querySelector(`[data-cue-id="${activeCueId}"]`) as HTMLElement | null
    if (!el) return

    const containerRect = container.getBoundingClientRect()
    const elRect = el.getBoundingClientRect()

    // Margin: If item is comfortably visible (between top + 45px and bottom - 45px), DO NOT scroll!
    const isComfortablyVisible =
      elRect.top >= containerRect.top + 45 &&
      elRect.bottom <= containerRect.bottom - 45

    if (isComfortablyVisible) {
      lastScrolledIdRef.current = activeCueId
      return
    }

    lastScrolledIdRef.current = activeCueId
    const relativeTop = elRect.top - containerRect.top + container.scrollTop
    const targetScrollTop = relativeTop - container.clientHeight / 2 + el.offsetHeight / 2

    container.scrollTo({
      top: Math.max(0, targetScrollTop),
      behavior: 'smooth',
    })
  }, [activeCueId])

  // Filter cues by search query
  const filteredCues = useMemo(() => {
    if (!searchQuery.trim()) return cues
    const q = searchQuery.toLowerCase()
    return cues.filter(
      (c) => c.textEn.toLowerCase().includes(q) || c.textVi.toLowerCase().includes(q),
    )
  }, [cues, searchQuery])

  return (
    <div className='flex flex-col h-full bg-white dark:bg-dark-card rounded-2xl shadow-md border border-gray-100 dark:border-gray-800 overflow-hidden'>
      {/* Sleek 1-line Header: Subtitle Mode Tabs + Search + Count */}
      <div className='p-2 sm:p-2.5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between gap-2 bg-gray-50/80 dark:bg-gray-800/40 shrink-0'>
        {/* Mode Switcher */}
        <div className='flex items-center gap-0.5 bg-gray-200/70 dark:bg-gray-800 p-0.5 rounded-xl text-[11px] font-bold'>
          <button
            onClick={() => setSubMode('both')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              subMode === 'both'
                ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'
            }`}
          >
            Song ngữ
          </button>
          <button
            onClick={() => setSubMode('en-only')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              subMode === 'en-only'
                ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'
            }`}
          >
            Chỉ EN
          </button>
          <button
            onClick={() => setSubMode('hover-vi')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              subMode === 'hover-vi'
                ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'
            }`}
          >
            Ẩn VI
          </button>
        </div>

        {/* Interleaved Voiceover Toggle Button */}
        {onToggleInterleavedMode && (
          <button
            onClick={onToggleInterleavedMode}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all active:scale-95 shadow-xs border ${
              interleavedMode
                ? 'bg-purple-600 border-purple-400 text-white shadow-purple-500/30 ring-1 ring-purple-400/40'
                : 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800/60 hover:bg-purple-100 dark:hover:bg-purple-900/50'
            }`}
            title='Chế độ Thuyết minh xen kẽ: Video phát tiếng Anh gốc ➔ Tự dừng ➔ Đọc tiếng Việt ➔ Tự phát tiếp câu sau'
          >
            <Languages size={12} className={isInterleavedSpeaking ? 'animate-bounce text-amber-300' : ''} />
            <span className='hidden sm:inline'>
              {isInterleavedSpeaking ? 'Đang đọc TV...' : interleavedMode ? 'Thuyết minh: BẬT' : 'Thuyết minh xen kẽ'}
            </span>
            <span className='sm:hidden'>
              {interleavedMode ? 'TM: BẬT' : 'TM xen kẽ'}
            </span>
          </button>
        )}

        {/* Right side: Search button toggle & Counter */}
        <div className='flex items-center gap-1.5'>
          <button
            onClick={() => setIsSearchOpen((o) => !o)}
            className={`p-1.5 rounded-lg border text-xs transition-colors ${
              isSearchOpen || searchQuery
                ? 'bg-primary-50 border-primary-200 text-primary-600 dark:bg-primary-950/60 dark:border-primary-800 dark:text-primary-400'
                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500 hover:text-gray-700'
            }`}
            title='Tìm kiếm câu thoại'
          >
            <Search size={14} />
          </button>
          <span className='text-[11px] font-mono font-bold text-gray-400 dark:text-gray-500 px-1'>
            {filteredCues.length} câu
          </span>
        </div>
      </div>

      {/* Expandable Search Bar */}
      {isSearchOpen && (
        <div className='px-3 py-1.5 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2 bg-gray-50/50 dark:bg-gray-850 shrink-0'>
          <Search size={14} className='text-gray-400 shrink-0' />
          <input
            type='text'
            autoFocus
            placeholder='Tìm từ hoặc câu thoại...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='w-full text-xs bg-transparent border-none focus:outline-none text-gray-700 dark:text-gray-200 placeholder:text-gray-400'
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className='text-xs text-gray-400 hover:text-gray-600 px-1'
            >
              ✕
            </button>
          )}
        </div>
      )}

      {/* Transcript Scroll Stream */}
      <div ref={containerRef} className='flex-1 min-h-0 overflow-y-auto p-2.5 sm:p-3 space-y-2'>
        {filteredCues.length === 0 ? (
          <div className='py-12 text-center text-gray-400 text-xs sm:text-sm'>
            Không tìm thấy câu nào phù hợp với từ khóa.
          </div>
        ) : (
          filteredCues.map((cue) => (
            <CueItem
              key={cue.id}
              cue={cue}
              isActive={activeCueId === cue.id}
              subMode={subMode}
              onSeek={onSeek}
              onWordClick={onWordClick}
              onAddNote={onAddNote}
            />
          ))
        )}
      </div>
    </div>
  )
}
