// ============================================
// Mini Mode Page - Compact Learning Window
// ============================================

import { useEffect, useCallback, memo } from 'react'
import { X, Volume2, RotateCcw } from 'lucide-react'
import { useLearningStore } from '@/store/learningStore'
import { speakWord } from '@/utils/quiz'
import { getWordImageUrl, getWordSvgFallback } from '@/services/imageService'
import type { Quality } from '@/types'

// ============================================
// Main Component
// ============================================

export function MiniMode() {
  const {
    todayWords,
    currentIndex,
    isFlipped,
    sessionComplete,
    fetchTodayWords,
    flipCard,
    answerCard,
    resetSession,
  } = useLearningStore()

  const currentWord = todayWords[currentIndex]

  useEffect(() => {
    fetchTodayWords()
  }, [fetchTodayWords])

  // Keyboard shortcuts
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!currentWord || sessionComplete) return

      if (e.code === 'Space' && !isFlipped) {
        e.preventDefault()
        flipCard()
      } else if (isFlipped) {
        const keyMap: Record<string, Quality> = { '1': 1, '2': 2, '3': 3 }
        const quality = keyMap[e.key]
        if (quality) answerCard(quality)
      }
    },
    [currentWord, isFlipped, sessionComplete, flipCard, answerCard],
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  const handleRestart = useCallback(() => {
    resetSession()
    fetchTodayWords()
  }, [resetSession, fetchTodayWords])

  // Empty or complete state
  if (sessionComplete || todayWords.length === 0) {
    return (
      <MiniModeLayout>
        <EmptyState isEmpty={todayWords.length === 0} onRestart={handleRestart} />
      </MiniModeLayout>
    )
  }

  const progress = ((currentIndex + 1) / todayWords.length) * 100

  return (
    <MiniModeLayout progress={progress} currentIndex={currentIndex} total={todayWords.length}>
      <CardContent word={currentWord} isFlipped={isFlipped} onFlip={flipCard} />
      {isFlipped && <AnswerButtons onAnswer={answerCard} />}
      <KeyboardHints isFlipped={isFlipped} />
    </MiniModeLayout>
  )
}

// ============================================
// Layout Component
// ============================================

interface MiniModeLayoutProps {
  children: React.ReactNode
  progress?: number
  currentIndex?: number
  total?: number
}

const MiniModeLayout = memo(function MiniModeLayout({
  children,
  progress,
  currentIndex,
  total,
}: MiniModeLayoutProps) {
  const closeMiniMode = useCallback(() => {
    window.electronAPI.closeMiniMode()
  }, [])

  return (
    <div className='h-screen flex flex-col bg-white dark:bg-gray-900'>
      {/* Title bar */}
      <div
        className='h-8 bg-gray-100 dark:bg-gray-800 flex items-center justify-between px-3 select-none'
        style={{ WebkitAppRegion: 'drag' } as React.CSSProperties}
      >
        <span className='text-xs font-medium text-gray-600 dark:text-gray-400'>
          {currentIndex !== undefined && total !== undefined
            ? `${currentIndex + 1}/${total}`
            : 'VocabMaster Mini'}
        </span>
        <button
          onClick={closeMiniMode}
          className='p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded'
          style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
        >
          <X size={14} />
        </button>
      </div>

      {/* Progress bar */}
      {progress !== undefined && (
        <div className='h-1 bg-gray-200 dark:bg-gray-700'>
          <div className='h-full bg-primary-500 transition-all' style={{ width: `${progress}%` }} />
        </div>
      )}

      {children}
    </div>
  )
})

// ============================================
// Sub-components
// ============================================

interface EmptyStateProps {
  isEmpty: boolean
  onRestart: () => void
}

const EmptyState = memo(function EmptyState({ isEmpty, onRestart }: EmptyStateProps) {
  return (
    <div className='flex-1 flex flex-col items-center justify-center p-4'>
      <div className='text-4xl mb-3'>{isEmpty ? '📚' : '🎉'}</div>
      <h2 className='text-lg font-bold mb-2'>{isEmpty ? 'Chưa có từ' : 'Hoàn thành!'}</h2>
      <p className='text-sm text-gray-500 text-center mb-4'>
        {isEmpty ? 'Thêm từ vựng để bắt đầu' : 'Bạn đã học xong hôm nay!'}
      </p>
      {!isEmpty && (
        <button
          onClick={onRestart}
          className='flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg text-sm'
        >
          <RotateCcw size={14} /> Học lại
        </button>
      )}
    </div>
  )
})

interface CardContentProps {
  word: {
    term: string
    phonetic: string | null
    definition: string
    example: string | null
  }
  isFlipped: boolean
  onFlip: () => void
}

const CardContent = memo(function CardContent({ word, isFlipped, onFlip }: CardContentProps) {
  const handleSpeak = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      speakWord(word.term)
    },
    [word.term],
  )

  const imageUrl = getWordImageUrl(
    word.term,
    '3d',
    (word as { image_url?: string | null }).image_url,
  )

  return (
    <div
      className='flex-1 flex flex-col items-center justify-center p-4 cursor-pointer relative overflow-hidden'
      onClick={() => !isFlipped && onFlip()}
    >
      {!isFlipped && (
        <div className='absolute inset-x-0 top-0 h-32 opacity-20 pointer-events-none'>
          <img
            key={imageUrl}
            src={imageUrl}
            alt={word.term}
            loading='lazy'
            onError={(e) => {
              e.currentTarget.src = getWordSvgFallback(word.term)
            }}
            className='w-full h-full object-cover blur-sm'
          />
        </div>
      )}
      <div className='z-10 flex flex-col items-center'>
        <h2 className='text-2xl font-bold text-center mb-1'>{word.term}</h2>
        {word.phonetic && <p className='text-gray-500 text-sm mb-2'>{word.phonetic}</p>}
        <button
          onClick={handleSpeak}
          className='p-2 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-3 shadow-sm hover:scale-105 transition-transform'
        >
          <Volume2 className='text-primary-500' size={18} />
        </button>

        {isFlipped ? (
          <div className='text-center border-t border-gray-100 dark:border-gray-800 pt-3 w-full animate-in fade-in'>
            <p className='text-gray-700 dark:text-gray-200 font-medium mb-1'>{word.definition}</p>
            {word.example && (
              <p className='text-gray-500 text-xs italic bg-gray-50 dark:bg-gray-800/40 p-2 rounded'>
                "{word.example}"
              </p>
            )}
          </div>
        ) : (
          <p className='text-gray-400 text-xs mt-2'>Nhấn để xem nghĩa</p>
        )}
      </div>
    </div>
  )
})

interface AnswerButtonsProps {
  onAnswer: (quality: Quality) => void
}

const AnswerButtons = memo(function AnswerButtons({ onAnswer }: AnswerButtonsProps) {
  const buttons = [
    { quality: 1 as Quality, emoji: '😟', label: 'Chưa nhớ', color: 'red' },
    { quality: 2 as Quality, emoji: '🤔', label: 'Tạm nhớ', color: 'yellow' },
    { quality: 3 as Quality, emoji: '😊', label: 'Thuộc', color: 'green' },
  ]

  return (
    <div className='flex gap-2 p-3 bg-gray-50 dark:bg-gray-800'>
      {buttons.map(({ quality, emoji, label, color }) => (
        <button
          key={quality}
          onClick={() => onAnswer(quality)}
          className={`flex-1 py-2 bg-${color}-100 dark:bg-${color}-900/30 rounded-lg text-${color}-600 text-sm font-medium hover:bg-${color}-200 transition-colors`}
        >
          {emoji} {label}
        </button>
      ))}
    </div>
  )
})

interface KeyboardHintsProps {
  isFlipped: boolean
}

const KeyboardHints = memo(function KeyboardHints({ isFlipped }: KeyboardHintsProps) {
  return (
    <div className='text-center text-xs text-gray-400 py-1 bg-gray-50 dark:bg-gray-800'>
      {isFlipped ? '[1] [2] [3]' : '[Space]'}
    </div>
  )
})
