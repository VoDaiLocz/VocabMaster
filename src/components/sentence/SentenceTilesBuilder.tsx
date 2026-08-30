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
import { SentenceDeepGuide } from './SentenceDeepGuide'

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
  const [hintMessage, setHintMessage] = useState<string | null>(null)
  const [errorFeedback, setErrorFeedback] = useState<string | null>(null)
  const [isSaved, setIsSaved] = useState(false)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)

  // Deterministically shuffle available word tiles for this sentence
  const shuffledTiles = useMemo(() => {
    return deterministicShuffle(sentence.wordTiles, sentence.id || sentence.textEn)
  }, [sentence])

  // Reset state when moving to a new sentence
  useEffect(() => {
    setSelectedIndices([])
    setStatus('idle')
    setHintLevel(0)
    setHighlightedTileIdx(null)
    setHintMessage(null)
    setErrorFeedback(null)
    setIsSaved(false)
  }, [sentence])

  // Find the tile index in shuffledTiles for the next expected word tile
  const findNextExpectedTileIndex = useCallback(() => {
    const nextPos = selectedIndices.length
    if (nextPos >= sentence.wordTiles.length) return null

    const expectedWord = sentence.wordTiles[nextPos]

    // Find the first unselected tile in shuffledTiles that matches this expected word
    for (let i = 0; i < shuffledTiles.length; i++) {
      if (
        !selectedIndices.includes(i) &&
        (shuffledTiles[i] === expectedWord ||
          normalizeWord(shuffledTiles[i]) === normalizeWord(expectedWord))
      ) {
        return i
      }
    }

    // Fallback: search for any unselected tile that belongs to the sentence
    for (let pos = 0; pos < sentence.wordTiles.length; pos++) {
      const w = sentence.wordTiles[pos]
      for (let i = 0; i < shuffledTiles.length; i++) {
        if (
          !selectedIndices.includes(i) &&
          (shuffledTiles[i] === w || normalizeWord(shuffledTiles[i]) === normalizeWord(w))
        ) {
          return i
        }
      }
    }
    return null
  }, [sentence.wordTiles, selectedIndices, shuffledTiles])

  // Trigger progressive hint (Tier 1: Glowing Yellow Word Highlight + TTS with position explanation, Tier 2: Grammar Breakdown)
  const handleTriggerHint = () => {
    const nextTile = findNextExpectedTileIndex()
    if (nextTile !== null) {
      setHighlightedTileIdx(nextTile)
      setHintLevel(1)
      const word = shuffledTiles[nextTile]
      speakWord(word)
      const nextPos = selectedIndices.length + 1
      setHintMessage(
        `Vị trí ${nextPos}: Hãy chọn từ "${word}" (đang sáng màu vàng) để tiếp nối cấu trúc câu!`,
      )
    } else {
      setHintLevel(2)
      setHintMessage('Xem cẩm nang phân tích 4 bước bên dưới để hiểu sâu và hoàn chỉnh câu!')
    }
  }

  // Tap on available tile in pool (speaks word instantly or full sentence if complete)
  const handleTileClick = (index: number) => {
    if (status === 'correct') {
      playAudio(1.0)
      return
    }
    if (!selectedIndices.includes(index)) {
      const rawWord = shuffledTiles[index]
      const cleanWord = rawWord ? rawWord.replace(/[.,?!'"]/g, '').trim() : ''
      speakWord(cleanWord || rawWord)
      setSelectedIndices((prev) => [...prev, index])
      setStatus('idle')
      setErrorFeedback(null)
      if (highlightedTileIdx === index) {
        setHighlightedTileIdx(null)
        setHintMessage(null)
      }
    }
  }

  // Tap on selected tile in answer slot (speaks word during build or speaks full sentence if complete)
  const handleRemoveTile = (selectedIndexPos: number) => {
    if (status === 'correct') {
      // Khi đã hoàn thiện câu, chạm vào bất kỳ từ nào cũng phát âm toàn bộ câu tiếng Anh
      playAudio(1.0)
      return
    }
    const tileIdx = selectedIndices[selectedIndexPos]
    if (tileIdx !== undefined) {
      const rawWord = shuffledTiles[tileIdx]
      const cleanWord = rawWord ? rawWord.replace(/[.,?!'"]/g, '').trim() : ''
      speakWord(cleanWord || rawWord)
    }
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

  // Speak the user's currently constructed sentence in the answer box
  const playConstructedAudio = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation()
    }
    const rawTokens = selectedIndices.map((idx) => shuffledTiles[idx])
    const constructedSentence = rawTokens.join(' ').replace(/\s+/g, ' ').trim()
    if (constructedSentence) {
      setIsPlayingAudio(true)
      speakWord(constructedSentence, 1.0)
      setTimeout(() => setIsPlayingAudio(false), 2000)
    }
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
      setHintMessage(null)
      playAudio(1.0)
      if (onCorrectAnswer) onCorrectAnswer()
    } else {
      setStatus('wrong')
      // Find first mismatched token
      let mismatchPos = -1
      for (let i = 0; i < constructedWords.length; i++) {
        if (
          i >= sentence.wordTiles.length ||
          normalizeWord(constructedWords[i]) !== normalizeWord(sentence.wordTiles[i])
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
    setHintMessage(null)
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
          {/* Audio Pronunciation Button (Standard 1.0x) */}
          <button
            onClick={() => playAudio(1.0)}
            className='px-3 py-1.5 rounded-xl text-xs font-bold bg-primary-600 hover:bg-primary-500 text-white shadow-sm transition-all flex items-center gap-1.5 active:scale-95'
            title='Nghe phát âm chuẩn cả câu'
          >
            <Volume2 size={15} className={isPlayingAudio ? 'animate-bounce' : ''} />
            <span>Phát âm (1.0x)</span>
          </button>

          {/* Audio Shadowing Slow 0.8x */}
          <button
            onClick={() => playAudio(0.8)}
            className='px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 transition-colors flex items-center gap-1 border border-indigo-200 dark:border-indigo-800/50 active:scale-95'
            title='Nghe âm thanh chậm 0.8x'
          >
            <span>🐢 0.8x</span>
          </button>

          {/* Smart Next-Word Hint Button */}
          <button
            onClick={handleTriggerHint}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm active:scale-95 ${
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

      {/* Target Vietnamese Prompt with Prominent Audio Speaker */}
      <div className='p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-gray-50 to-primary-50/20 dark:from-gray-800/60 dark:to-primary-950/20 border border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3'>
        <div>
          <span className='text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-1'>
            Hãy đặt câu tiếng Anh cho ý sau:
          </span>
          <h2 className='text-lg sm:text-xl md:text-2xl font-bold font-display text-gray-900 dark:text-white leading-relaxed'>
            "{sentence.textVi}"
          </h2>
        </div>

        <button
          onClick={() => playAudio(1.0)}
          className='p-3 rounded-2xl bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 hover:bg-primary-200 hover:scale-105 active:scale-95 transition-all shrink-0 shadow-sm'
          title='Bấm để nghe phát âm mẫu'
          aria-label='Play English Audio'
        >
          <Volume2 size={22} className={isPlayingAudio ? 'animate-bounce' : ''} />
        </button>
      </div>

      {/* Paragraph Context / Real-life Scenario */}
      {sentence.paragraphIdea && (
        <div className='px-3.5 py-2.5 rounded-xl bg-purple-50/80 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/60 text-purple-950 dark:text-purple-200 text-xs flex items-center gap-2'>
          <Sparkles size={15} className='text-purple-600 dark:text-purple-400 shrink-0' />
          <span>
            <strong>Ngữ cảnh ứng dụng:</strong> {sentence.paragraphIdea.topicContext}
          </span>
        </div>
      )}

      {/* Multi-Clause Thinking Pathway (Lego-Block Architecture) */}
      {sentence.clauses && sentence.clauses.length > 0 && (
        <div className='p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-blue-50/70 via-indigo-50/50 to-purple-50/70 dark:from-blue-950/40 dark:via-indigo-950/30 dark:to-purple-950/40 border border-indigo-100 dark:border-indigo-900/50 space-y-2.5'>
          <div className='flex items-center justify-between flex-wrap gap-1'>
            <span className='text-[11px] font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5'>
              <Layers size={14} /> Sơ đồ tư duy bóc tách các vế câu (Multi-Clause Lego Blocks):
            </span>
            <span className='text-[10px] text-gray-500 dark:text-gray-400'>
              Chạm loa để nghe riêng từng vế
            </span>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-2'>
            {sentence.clauses.map((clause, cIdx) => (
              <div
                key={cIdx}
                className='p-2.5 rounded-xl bg-white dark:bg-dark-card border border-indigo-100 dark:border-indigo-900/50 space-y-1 shadow-2xs hover:border-indigo-300 transition-all'
              >
                <div className='flex items-center justify-between'>
                  <span className='text-[10px] font-bold text-indigo-600 dark:text-indigo-400 font-mono'>
                    {clause.label}
                  </span>
                  <button
                    onClick={() => speakWord(clause.en, 1.0)}
                    className='p-1 rounded-md bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 transition-colors'
                    title={`Nghe vế: ${clause.en}`}
                  >
                    <Volume2 size={13} />
                  </button>
                </div>
                <p className='text-xs font-bold text-gray-900 dark:text-white font-mono line-clamp-1'>
                  "{clause.en}"
                </p>
                <p className='text-[11px] text-gray-500 dark:text-gray-400 line-clamp-1'>
                  {clause.vi}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Glowing Yellow Hint Notification Banner */}
      {hintMessage && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className='p-3 rounded-2xl bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-700/60 text-amber-950 dark:text-amber-200 text-xs sm:text-sm font-semibold flex items-center justify-between gap-2 shadow-sm'
        >
          <div className='flex items-center gap-2'>
            <Lightbulb
              size={16}
              className='text-amber-600 dark:text-amber-400 shrink-0 fill-amber-400'
            />
            <span>{hintMessage}</span>
          </div>
          {highlightedTileIdx !== null && (
            <button
              onClick={() => {
                handleTileClick(highlightedTileIdx)
              }}
              className='px-2.5 py-1 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white text-xs font-bold shrink-0 shadow-sm'
            >
              Chọn luôn từ này
            </button>
          )}
        </motion.div>
      )}

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
        className={`min-h-[85px] sm:min-h-[95px] p-3.5 sm:p-4 rounded-2xl border-2 border-dashed flex flex-wrap items-center gap-2 relative transition-all ${
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
          <>
            {selectedIndices.map((tileIdx, pos) => (
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
            ))}

            {/* Quick listen button for the currently constructed sentence */}
            <button
              type='button'
              onClick={playConstructedAudio}
              className='ml-auto p-1.5 rounded-lg bg-primary-100 dark:bg-primary-900/60 text-primary-700 dark:text-primary-300 hover:bg-primary-200 transition-colors flex items-center gap-1 text-[11px] font-semibold active:scale-95 shadow-2xs'
              title='Nghe câu bạn vừa ghép'
              aria-label='Nghe câu vừa ghép'
            >
              <Volume2 size={13} className={isPlayingAudio ? 'animate-bounce' : ''} />
              <span className='hidden sm:inline'>Nghe thử</span>
            </button>
          </>
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
            className='p-4 sm:p-5 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 border-2 border-emerald-400 dark:border-emerald-700 text-emerald-950 dark:text-emerald-100 space-y-3 shadow-md'
          >
            <div className='flex items-center justify-between flex-wrap gap-2'>
              <div className='flex items-center gap-2 font-bold text-sm sm:text-base text-emerald-800 dark:text-emerald-300'>
                <CheckCircle2 size={22} className='text-emerald-600 dark:text-emerald-400' />
                <span>CHÍNH XÁC! (+15 XP)</span>
              </div>
              <div className='flex items-center gap-2'>
                <button
                  onClick={() => playAudio(0.8)}
                  className='px-2.5 py-1 rounded-xl bg-emerald-200 dark:bg-emerald-900/80 hover:bg-emerald-300 text-emerald-900 dark:text-emerald-100 font-bold text-xs flex items-center gap-1 transition-all active:scale-95'
                  title='Nghe chậm 0.8x'
                >
                  <span>🐢 0.8x</span>
                </button>
                <button
                  onClick={() => playAudio(1.0)}
                  className='px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm flex items-center gap-1.5 text-xs font-bold transition-all active:scale-95'
                  title='Nghe phát âm chuẩn cả câu'
                >
                  <Volume2 size={16} className={isPlayingAudio ? 'animate-bounce' : ''} />
                  <span>Phát âm cả câu</span>
                </button>
              </div>
            </div>

            {/* Clickable Full English Sentence Banner */}
            <div
              onClick={() => playAudio(1.0)}
              className='p-3.5 rounded-xl bg-white/80 dark:bg-dark-card/80 border border-emerald-300 dark:border-emerald-700/60 cursor-pointer hover:bg-white dark:hover:bg-dark-card transition-all flex items-center justify-between group shadow-xs'
              title='Chạm để nghe phát âm cả câu'
            >
              <div>
                <span className='text-[10px] uppercase tracking-wider font-extrabold text-emerald-600 dark:text-emerald-400 block mb-0.5'>
                  Câu hoàn chỉnh (Chạm để nghe):
                </span>
                <p className='text-base sm:text-lg font-bold font-display text-emerald-950 dark:text-white group-hover:text-primary-600 transition-colors'>
                  "{sentence.textEn}"
                </p>
              </div>
              <div className='p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 group-hover:scale-110 transition-transform shrink-0 ml-2'>
                <Volume2 size={18} />
              </div>
            </div>

            <p className='text-xs text-emerald-800 dark:text-emerald-200 leading-relaxed font-medium'>
              💡 {sentence.explanation}
            </p>
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

      {/* Deep Pedagogical Guide: Grammar, Vocab & Context */}
      <SentenceDeepGuide sentence={sentence} defaultExpanded={status === 'correct'} />

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
