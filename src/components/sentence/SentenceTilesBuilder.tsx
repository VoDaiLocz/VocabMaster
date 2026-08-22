// ============================================
// Sentence Tiles Reflex Builder with Smart Progressive Hints & Feedback
// ============================================

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Volume2,
  CheckCircle2,
  XCircle,
  Lightbulb,
  ArrowRight,
  Bookmark,
  Sparkles,
  RotateCcw,
  Layers,
} from 'lucide-react'
import { SentenceItem } from '@/data/sentence-patterns/types'
import { useDeckStore } from '@/store/deckStore'
import { speakWord } from '@/utils/quiz'

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

const normalizeWord = (str: string) =>
  str
    .toLowerCase()
    .replace(/[.,?!'"]/g, '')
    .trim()

export const SentenceTilesBuilder: React.FC<SentenceTilesBuilderProps> = ({
  sentence,
  onNext,
  onCorrectAnswer,
}) => {
  const { decks, createWord } = useDeckStore()
  const [selectedIndices, setSelectedIndices] = useState<number[]>([])
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle')
  const [hintLevel, setHintLevel] = useState<number>(0) // 0: None, 1: Next Word, 2: Grammar Pattern
  const [highlightedTileIdx, setHighlightedTileIdx] = useState<number | null>(null)
  const [errorFeedback, setErrorFeedback] = useState<string | null>(null)
  const [isSaved, setIsSaved] = useState(false)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)

  // Deterministically shuffle available word tiles for this sentence
  const shuffledTiles = useMemo(() => {
    return deterministicShuffle(sentence.wordTiles, sentence.id || sentence.textEn)
  }, [sentence])

  // Split target sentence into expected token words
  const expectedTokens = useMemo(() => {
    return sentence.textEn.split(/\s+/).map((w) => normalizeWord(w))
  }, [sentence])

  // Reset state when moving to a new sentence
  useEffect(() => {
    setSelectedIndices([])
    setStatus('idle')
    setHintLevel(0)
    setHighlightedTileIdx(null)
    setErrorFeedback(null)
    setIsSaved(false)
  }, [sentence])

  // Find the tile index for the next expected word
  const findNextExpectedTileIndex = useCallback(() => {
    const nextPos = selectedIndices.length
    if (nextPos >= expectedTokens.length) return null

    const expectedWord = expectedTokens[nextPos]

    // Find the first unselected tile in shuffledTiles that matches this word
    for (let i = 0; i < shuffledTiles.length; i++) {
      if (!selectedIndices.includes(i) && normalizeWord(shuffledTiles[i]) === expectedWord) {
        return i
      }
    }
    return null
  }, [expectedTokens, selectedIndices, shuffledTiles])

  // Trigger progressive hint (Tier 1: Next Word Highlight, Tier 2: Grammar Breakdown)
  const handleTriggerHint = () => {
    const nextTile = findNextExpectedTileIndex()
    if (nextTile !== null) {
      setHighlightedTileIdx(nextTile)
      setHintLevel(1)
    } else {
      setHintLevel(2)
    }
  }

  // Tap on available tile in pool
  const handleTileClick = (index: number) => {
    if (status === 'correct') return
    if (!selectedIndices.includes(index)) {
      setSelectedIndices((prev) => [...prev, index])
      setStatus('idle')
      setErrorFeedback(null)
      if (highlightedTileIdx === index) {
        setHighlightedTileIdx(null)
      }
    }
  }

  // Tap on selected tile to remove from answer slot
  const handleRemoveTile = (selectedIndexPos: number) => {
    if (status === 'correct') return
    setSelectedIndices((prev) => prev.filter((_, idx) => idx !== selectedIndexPos))
    setStatus('idle')
    setErrorFeedback(null)
  }

  // Play audio of the sentence (Full speed or slow 0.8x for shadowing)
  const playAudio = (rate: number = 1.0) => {
    setIsPlayingAudio(true)
    speakWord(sentence.textEn, rate)
    setTimeout(() => setIsPlayingAudio(false), 2000)
  }

  // Clean string helper for checking
  const normalize = (str: string) =>
    str
      .toLowerCase()
      .replace(/[.,?!'"]/g, '')
      .replace(/\s+/g, ' ')
      .trim()

  // Check user answer with smart error diagnostics
  const handleCheck = () => {
    const constructedWords = selectedIndices.map((idx) => shuffledTiles[idx])
    const constructedSentence = constructedWords.join(' ')

    const isMatch =
      normalize(constructedSentence) === normalize(sentence.textEn) ||
      (sentence.alternatives &&
        sentence.alternatives.some((alt) => normalize(constructedSentence) === normalize(alt)))

    if (isMatch) {
      setStatus('correct')
      setErrorFeedback(null)
      setHighlightedTileIdx(null)
      playAudio(1.0)
      if (onCorrectAnswer) onCorrectAnswer()
    } else {
      setStatus('wrong')
      // Find first mismatched token
      let mismatchPos = -1
      for (let i = 0; i < constructedWords.length; i++) {
        if (
          i >= expectedTokens.length ||
          normalizeWord(constructedWords[i]) !== expectedTokens[i]
        ) {
          mismatchPos = i + 1
          break
        }
      }
      if (mismatchPos !== -1) {
        setErrorFeedback(
          `Vị trí từ thứ ${mismatchPos} ('${constructedWords[mismatchPos - 1]}') chưa đúng cấu trúc. Hãy bấm "Gợi ý" để xem tiếp nhé!`,
        )
      } else {
        setErrorFeedback('Câu chưa đủ từ để hoàn chỉnh ý nghĩa. Hãy thêm các từ còn thiếu!')
      }
    }
  }

  // Reset answer tiles
  const handleReset = () => {
    setSelectedIndices([])
    setStatus('idle')
    setHighlightedTileIdx(null)
    setErrorFeedback(null)
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
    <div className='w-full max-w-3xl mx-auto bg-white dark:bg-dark-card rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6'>
      {/* Top Bar: Pattern Badge & Smart Hint Buttons */}
      <div className='flex items-center justify-between gap-2 flex-wrap'>
        <div className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-primary-50 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800/60'>
          <Sparkles size={14} /> Khung: {sentence.pattern}
        </div>

        <div className='flex items-center gap-2'>
          {/* Audio Shadowing Clue */}
          <button
            onClick={() => playAudio(0.8)}
            className='px-2.5 py-1 rounded-xl text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 transition-colors flex items-center gap-1 border border-indigo-200 dark:border-indigo-800/50'
            title='Nghe âm thanh gợi ý tốc độ chậm 0.8x'
          >
            <Volume2 size={14} className={isPlayingAudio ? 'animate-bounce' : ''} />
            <span>Nghe mẫu (0.8x)</span>
          </button>

          {/* Smart Next-Word Hint Button */}
          <button
            onClick={handleTriggerHint}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm active:scale-95 ${
              hintLevel > 0
                ? 'bg-amber-500 text-white shadow-amber-500/25 ring-2 ring-amber-400'
                : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 hover:bg-amber-100'
            }`}
          >
            <Lightbulb size={14} />
            <span>{hintLevel === 0 ? 'Gợi ý từ tiếp theo' : 'Gợi ý thêm'}</span>
          </button>
        </div>
      </div>

      {/* Target Vietnamese Prompt */}
      <div className='p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-gray-50 to-primary-50/20 dark:from-gray-800/60 dark:to-primary-950/20 border border-gray-100 dark:border-gray-800'>
        <span className='text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-1'>
          Hãy đặt câu tiếng Anh cho ý sau:
        </span>
        <h2 className='text-lg sm:text-xl md:text-2xl font-bold font-display text-gray-900 dark:text-white leading-relaxed'>
          "{sentence.textVi}"
        </h2>
      </div>

      {/* Grammar Pattern & Structure Banner (Tier 2 Hint) */}
      {hintLevel >= 2 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className='p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-amber-900 dark:text-amber-200 text-xs leading-relaxed space-y-1.5'
        >
          <div className='flex items-center gap-1.5 font-bold text-amber-800 dark:text-amber-300'>
            <Layers size={14} />
            <span>Khung cấu trúc & Ngữ pháp:</span>
          </div>
          <p>💡 {sentence.explanation}</p>
        </motion.div>
      )}

      {/* Answer Slot (Where selected word tiles are placed) */}
      <div
        className={`min-h-[85px] sm:min-h-[95px] p-3.5 sm:p-4 rounded-2xl border-2 border-dashed flex flex-wrap items-center gap-2 transition-all ${
          status === 'correct'
            ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-400 dark:border-emerald-700 shadow-inner'
            : status === 'wrong'
              ? 'bg-red-50/70 dark:bg-red-950/30 border-red-400 dark:border-red-700'
              : selectedIndices.length > 0
                ? 'bg-primary-50/30 dark:bg-primary-950/20 border-primary-300 dark:border-primary-800'
                : 'bg-gray-50/50 dark:bg-gray-850 border-gray-200 dark:border-gray-700'
        }`}
      >
        {selectedIndices.length === 0 ? (
          <span className='text-xs sm:text-sm text-gray-400 dark:text-gray-500 italic mx-auto text-center px-4'>
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
              className='px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-primary-600 text-white font-semibold text-xs sm:text-sm shadow-sm hover:bg-primary-700 active:scale-95 transition-all'
              title='Chạm để bỏ từ này'
            >
              {shuffledTiles[tileIdx]}
            </motion.button>
          ))
        )}
      </div>

      {/* Available Word Tiles Pool */}
      <div className='flex flex-wrap items-center justify-center gap-2 pt-1'>
        {shuffledTiles.map((tile, idx) => {
          const isSelected = selectedIndices.includes(idx)
          const isHighlighted = highlightedTileIdx === idx

          return (
            <button
              key={idx}
              onClick={() => handleTileClick(idx)}
              disabled={isSelected || status === 'correct'}
              className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl font-semibold text-xs sm:text-sm border transition-all ${
                isSelected
                  ? 'opacity-20 bg-gray-100 dark:bg-gray-800 border-transparent cursor-not-allowed'
                  : isHighlighted
                    ? 'bg-amber-400 text-amber-950 border-amber-500 shadow-lg shadow-amber-400/40 ring-4 ring-amber-300 animate-pulse scale-105 font-bold z-10'
                    : 'bg-white dark:bg-dark-card border-gray-200 dark:border-gray-700 hover:border-primary-400 hover:shadow-sm text-gray-800 dark:text-gray-100 active:scale-95'
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
            className='p-4 rounded-2xl bg-emerald-100 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 space-y-2'
          >
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2 font-bold text-sm sm:text-base'>
                <CheckCircle2 size={20} className='text-emerald-600 dark:text-emerald-400' />
                <span>CHÍNH XÁC! (+15 XP)</span>
              </div>
              <button
                onClick={() => playAudio(1.0)}
                className='p-1.5 rounded-lg bg-emerald-200 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-100 hover:bg-emerald-300 transition-colors'
                title='Nghe phát âm cả câu'
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
            className='p-3.5 rounded-2xl bg-red-100 dark:bg-red-950/40 border border-red-300 dark:border-red-800 text-red-900 dark:text-red-200 space-y-2 text-xs sm:text-sm font-medium'
          >
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <XCircle size={18} className='text-red-600 dark:text-red-400 shrink-0' />
                <span>Chưa chính xác.</span>
              </div>
              <button
                onClick={handleReset}
                className='px-2.5 py-1 rounded-lg bg-red-200 dark:bg-red-900 text-red-800 dark:text-red-100 text-xs font-bold hover:bg-red-300'
              >
                Làm lại
              </button>
            </div>
            {errorFeedback && (
              <p className='text-xs text-red-700 dark:text-red-300 pl-6'>{errorFeedback}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Control Action Buttons */}
      <div className='flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800'>
        <button
          onClick={handleReset}
          disabled={selectedIndices.length === 0 || status === 'correct'}
          className='px-3 py-2 rounded-xl text-xs font-semibold text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex items-center gap-1.5 disabled:opacity-30'
        >
          <RotateCcw size={14} /> Xóa chọn
        </button>

        <div className='flex items-center gap-2 sm:gap-3'>
          {status === 'correct' && (
            <button
              onClick={handleSaveToDeck}
              disabled={isSaved}
              className='px-3 py-2 rounded-xl border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-950/30 flex items-center gap-1.5 transition-colors'
            >
              <Bookmark size={14} /> {isSaved ? 'Đã lưu vào Deck' : 'Lưu Flashcard'}
            </button>
          )}

          {status === 'correct' ? (
            <button
              onClick={onNext}
              className='px-5 sm:px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/25 flex items-center gap-2 transition-all active:scale-95'
            >
              <span>Câu tiếp theo</span>
              <ArrowRight size={16} />
            </button>
          ) : (
            <button
              onClick={handleCheck}
              disabled={selectedIndices.length === 0}
              className='px-5 sm:px-6 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-primary-500/25 disabled:opacity-40 disabled:pointer-events-none flex items-center gap-2 transition-all active:scale-95'
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
