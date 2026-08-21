import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Volume2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  Bookmark,
  Sparkles,
  RotateCcw,
} from 'lucide-react'
import { SentenceItem } from '@/data/sentence-patterns/types'
import { useDeckStore } from '@/store/deckStore'

interface SentenceTilesBuilderProps {
  sentence: SentenceItem
  onNext: () => void
  onCorrectAnswer?: () => void
}

function deterministicShuffle(arr: string[], seedStr: string): string[] {
  const copy = [...arr]
  let seed = 0
  for (let i = 0; i < seedStr.length; i++) {
    seed = (seed << 5) - seed + seedStr.charCodeAt(i)
  }
  for (let i = copy.length - 1; i > 0; i--) {
    seed = Math.abs((seed * 9301 + 49297) % 233280)
    const j = Math.floor((seed / 233280) * (i + 1))
    const temp = copy[i]
    copy[i] = copy[j]
    copy[j] = temp
  }
  return copy
}

export const SentenceTilesBuilder: React.FC<SentenceTilesBuilderProps> = ({
  sentence,
  onNext,
  onCorrectAnswer,
}) => {
  const { decks, createWord } = useDeckStore()
  const [selectedIndices, setSelectedIndices] = useState<number[]>([])
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle')
  const [showHint, setShowHint] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  // Deterministically shuffle available word tiles for this sentence
  const shuffledTiles = useMemo(() => {
    return deterministicShuffle(sentence.wordTiles, sentence.id || sentence.textEn)
  }, [sentence])

  // Reset state when moving to a new sentence
  useEffect(() => {
    setSelectedIndices([])
    setStatus('idle')
    setShowHint(false)
    setIsSaved(false)
  }, [sentence])

  // Tap on available tile in pool
  const handleTileClick = (index: number) => {
    if (status === 'correct') return
    if (!selectedIndices.includes(index)) {
      setSelectedIndices((prev) => [...prev, index])
      setStatus('idle')
    }
  }

  // Tap on selected tile to remove from answer slot
  const handleRemoveTile = (selectedIndexPos: number) => {
    if (status === 'correct') return
    setSelectedIndices((prev) => prev.filter((_, idx) => idx !== selectedIndexPos))
    setStatus('idle')
  }

  // Play audio of the correct English sentence
  const playAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(sentence.textEn)
      utterance.lang = 'en-US'
      utterance.rate = 0.9
      window.speechSynthesis.speak(utterance)
    }
  }

  // Clean string helper for checking
  const normalize = (str: string) =>
    str
      .toLowerCase()
      .replace(/[.,?!'"]/g, '')
      .replace(/\s+/g, ' ')
      .trim()

  // Check user answer
  const handleCheck = () => {
    const constructedSentence = selectedIndices.map((idx) => shuffledTiles[idx]).join(' ')

    const isMatch =
      normalize(constructedSentence) === normalize(sentence.textEn) ||
      (sentence.alternatives &&
        sentence.alternatives.some((alt) => normalize(constructedSentence) === normalize(alt)))

    if (isMatch) {
      setStatus('correct')
      playAudio()
      if (onCorrectAnswer) onCorrectAnswer()
    } else {
      setStatus('wrong')
    }
  }

  // Reset answer tiles
  const handleReset = () => {
    setSelectedIndices([])
    setStatus('idle')
  }

  // Save full sentence to Flashcard deck
  const handleSaveToDeck = async () => {
    if (decks.length === 0) return
    const targetDeckId = decks[0].id
    try {
      await createWord({
        deck_id: targetDeckId,
        term: sentence.textEn,
        definition: sentence.textVi,
        example: `Khung câu: ${sentence.pattern}`,
      })
      setIsSaved(true)
    } catch (err) {
      console.error('Failed to save sentence to deck:', err)
    }
  }

  return (
    <div className='w-full max-w-3xl mx-auto bg-white dark:bg-dark-card rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 p-6 md:p-8 space-y-6'>
      {/* Pattern Badge */}
      <div className='flex items-center justify-between'>
        <div className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300'>
          <Sparkles size={14} /> Khung: {sentence.pattern}
        </div>
        <button
          onClick={() => setShowHint((h) => !h)}
          className='text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-primary-600 flex items-center gap-1 transition-colors'
        >
          <HelpCircle size={14} /> {showHint ? 'Ẩn gợi ý' : 'Xem gợi ý'}
        </button>
      </div>

      {/* Target Vietnamese Prompt */}
      <div className='p-4 md:p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800'>
        <span className='text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-1'>
          Hãy đặt câu tiếng Anh cho ý sau:
        </span>
        <h2 className='text-xl md:text-2xl font-bold font-display text-gray-900 dark:text-white leading-relaxed'>
          "{sentence.textVi}"
        </h2>
      </div>

      {/* Grammar Hint Dropdown */}
      {showHint && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className='p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-amber-800 dark:text-amber-300 text-xs leading-relaxed'
        >
          💡 <strong>Giải thích ngữ pháp:</strong> {sentence.explanation}
        </motion.div>
      )}

      {/* Answer Slot (Where selected tiles are placed) */}
      <div
        className={`min-h-[90px] p-4 rounded-2xl border-2 border-dashed flex flex-wrap items-center gap-2 transition-all ${
          status === 'correct'
            ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-400 dark:border-emerald-700'
            : status === 'wrong'
              ? 'bg-red-50/60 dark:bg-red-950/20 border-red-400 dark:border-red-700'
              : selectedIndices.length > 0
                ? 'bg-primary-50/30 dark:bg-primary-950/10 border-primary-300 dark:border-primary-800'
                : 'bg-gray-50/50 dark:bg-gray-800/30 border-gray-200 dark:border-gray-700'
        }`}
      >
        {selectedIndices.length === 0 ? (
          <span className='text-sm text-gray-400 dark:text-gray-500 italic mx-auto'>
            Chạm vào các khối từ bên dưới để ghép thành câu hoàn chỉnh...
          </span>
        ) : (
          selectedIndices.map((tileIdx, pos) => (
            <motion.button
              key={`${tileIdx}-${pos}`}
              layout
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={() => handleRemoveTile(pos)}
              className='px-3.5 py-2 rounded-xl bg-primary-600 text-white font-medium text-sm md:text-base shadow-sm hover:bg-primary-700 transition-colors'
            >
              {shuffledTiles[tileIdx]}
            </motion.button>
          ))
        )}
      </div>

      {/* Available Word Tiles Pool */}
      <div className='flex flex-wrap items-center justify-center gap-2.5 pt-2'>
        {shuffledTiles.map((tile, idx) => {
          const isSelected = selectedIndices.includes(idx)
          return (
            <button
              key={idx}
              onClick={() => handleTileClick(idx)}
              disabled={isSelected || status === 'correct'}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm md:text-base border transition-all ${
                isSelected
                  ? 'opacity-20 bg-gray-100 dark:bg-gray-800 border-transparent cursor-not-allowed'
                  : 'bg-white dark:bg-dark-card border-gray-200 dark:border-gray-700 hover:border-primary-400 hover:shadow-md text-gray-800 dark:text-gray-100 active:scale-95'
              }`}
            >
              {tile}
            </button>
          )
        })}
      </div>

      {/* Result Status Feedback Banner */}
      <AnimatePresence>
        {status === 'correct' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className='p-4 rounded-2xl bg-emerald-100 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 space-y-2'
          >
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2 font-bold text-base'>
                <CheckCircle2 size={20} className='text-emerald-600 dark:text-emerald-400' />
                <span>CHÍNH XÁC! (+15 XP)</span>
              </div>
              <button
                onClick={playAudio}
                className='p-1.5 rounded-lg bg-emerald-200 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-100 hover:bg-emerald-300 transition-colors'
                title='Nghe lại phát âm'
              >
                <Volume2 size={18} />
              </button>
            </div>
            <p className='text-xs text-emerald-700 dark:text-emerald-300'>{sentence.explanation}</p>
          </motion.div>
        )}

        {status === 'wrong' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className='p-3.5 rounded-2xl bg-red-100 dark:bg-red-950/40 border border-red-300 dark:border-red-800 text-red-800 dark:text-red-200 flex items-center justify-between text-sm font-medium'
          >
            <div className='flex items-center gap-2'>
              <XCircle size={18} className='text-red-600 dark:text-red-400' />
              <span>Chưa chính xác. Hãy thử sắp xếp lại trật tự từ nhé!</span>
            </div>
            <button
              onClick={handleReset}
              className='px-2.5 py-1 rounded-lg bg-red-200 dark:bg-red-900 text-red-800 dark:text-red-100 text-xs hover:bg-red-300'
            >
              Làm lại
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Control Action Buttons */}
      <div className='flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800'>
        <button
          onClick={handleReset}
          disabled={selectedIndices.length === 0 || status === 'correct'}
          className='px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex items-center gap-1.5 disabled:opacity-30'
        >
          <RotateCcw size={14} /> Xóa chọn
        </button>

        <div className='flex items-center gap-3'>
          {status === 'correct' && (
            <button
              onClick={handleSaveToDeck}
              disabled={isSaved}
              className='px-3.5 py-2.5 rounded-xl border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-950/30 flex items-center gap-1.5 transition-colors'
            >
              <Bookmark size={14} /> {isSaved ? 'Đã lưu vào Deck' : 'Lưu Flashcard'}
            </button>
          )}

          {status === 'correct' ? (
            <button
              onClick={onNext}
              className='px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-sm shadow-lg shadow-emerald-500/25 flex items-center gap-2 transition-all'
            >
              <span>Câu tiếp theo</span>
              <ArrowRight size={16} />
            </button>
          ) : (
            <button
              onClick={handleCheck}
              disabled={selectedIndices.length === 0}
              className='px-6 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-semibold text-sm shadow-lg shadow-primary-500/25 disabled:opacity-40 disabled:pointer-events-none flex items-center gap-2 transition-all'
            >
              <span>Kiểm tra</span>
              <Sparkles size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
