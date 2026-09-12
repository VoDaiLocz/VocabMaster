// ============================================================================
// MODULE 4: TRUNG TÂM TỪ VỰNG TOEIC 7 PART & BAND ĐIỂM (3.000+ TỪ VỰNG THỰC TẾ)
// Khai thác toeic_1500_vocabulary.json & toeic-comprehensive.ts
// ============================================================================

import { useState, useMemo, useEffect } from 'react'
import {
  Sparkles,
  Search,
  Volume2,
  RotateCw,
  CheckCircle2,
  XCircle,
  Award,
  Layers,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { Button } from '@/components/common/Button'
import raw1500Vocab from '@/data/toeic_1500_vocabulary.json'

// Web Speech helper
function speak(text: string) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'en-US'
  utterance.rate = 0.95
  window.speechSynthesis.speak(utterance)
}

interface VocabItem {
  id: string
  word: string
  pos: string
  ipa: string
  meaning: string
  exampleEn: string
  exampleVi: string
  part?: number | string
}

// Normalize items
const RAW_LIST: VocabItem[] = (raw1500Vocab as any[]).map((v, i) => ({
  id: v.id || `v-${i}`,
  word: v.word,
  pos: v.pos || '',
  ipa: v.ipa || '',
  meaning: v.meaning || '',
  exampleEn: v.exampleEn || '',
  exampleVi: v.exampleVi || '',
  part: v.part || 1,
}))

export function ToeicVocabArena() {
  const [activeTab, setActiveTab] = useState<'flashcards' | 'list' | 'quiz'>('flashcards')
  const [selectedPart, setSelectedPart] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isFlipped, setIsFlipped] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Mastered tracking
  const [masteredWords, setMasteredWords] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('toeic_mastered_words')
      return saved ? new Set(JSON.parse(saved)) : new Set()
    } catch {
      return new Set()
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('toeic_mastered_words', JSON.stringify(Array.from(masteredWords)))
    } catch {
      // ignore
    }
  }, [masteredWords])

  // Filtered vocabulary list
  const filteredWords = useMemo(() => {
    return RAW_LIST.filter((w) => {
      const matchPart =
        selectedPart === 'all' ||
        (selectedPart === 'p1' && w.part === 1) ||
        (selectedPart === 'p2' && w.part === 2) ||
        (selectedPart === 'p34' && (w.part === 3 || w.part === 4)) ||
        (selectedPart === 'p6' && w.part === 6) ||
        (selectedPart === 'p7' && (w.part === 7 || w.part === 8))

      const q = searchQuery.toLowerCase().trim()
      const matchQuery =
        !q ||
        w.word.toLowerCase().includes(q) ||
        w.meaning.toLowerCase().includes(q) ||
        w.exampleEn.toLowerCase().includes(q)

      return matchPart && matchQuery
    })
  }, [selectedPart, searchQuery])

  const currentWord = filteredWords[currentIndex] || filteredWords[0]
  const isMastered = masteredWords.has(currentWord?.word || '')

  const toggleMastered = (word: string) => {
    setMasteredWords((prev) => {
      const next = new Set(prev)
      if (next.has(word)) next.delete(word)
      else next.add(word)
      return next
    })
  }

  // Quiz State
  const [quizIdx, setQuizIdx] = useState(0)
  const [quizScore, setQuizScore] = useState(0)
  const [quizUserChoice, setQuizUserChoice] = useState<number | null>(null)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [quizQuestions, setQuizQuestions] = useState<
    Array<{
      target: (typeof RAW_LIST)[0]
      options: string[]
      correctIdx: number
    }>
  >([])

  // 10 random quiz questions generated when entering quiz tab or changing filteredWords
  useEffect(() => {
    if (activeTab !== 'quiz') return
    const list = [...filteredWords].sort(() => 0.5 - Math.random()).slice(0, 10)
    const questions = list.map((target) => {
      const wrongOpts = RAW_LIST.filter((x) => x.word !== target.word)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map((x) => x.meaning.split(/[\n\t]/)[0] || x.meaning)

      const correctOpt = target.meaning.split(/[\n\t]/)[0] || target.meaning
      const allOpts = [...wrongOpts, correctOpt].sort(() => 0.5 - Math.random())
      return {
        target,
        options: allOpts,
        correctIdx: allOpts.indexOf(correctOpt),
      }
    })
    setQuizQuestions(questions)
  }, [activeTab, filteredWords])

  const handleNextCard = () => {
    setIsFlipped(false)
    if (currentIndex < filteredWords.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    } else {
      setCurrentIndex(0)
    }
  }

  const handlePrevCard = () => {
    setIsFlipped(false)
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
    }
  }

  return (
    <div className='max-w-7xl mx-auto px-3 sm:px-6 py-6 pb-24 text-gray-800 dark:text-gray-100'>
      {/* Header Banner */}
      <div className='bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-purple-900/20 mb-8 relative overflow-hidden'>
        <div className='relative z-10 max-w-3xl'>
          <div className='inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold tracking-wide uppercase text-purple-100 mb-3'>
            <Sparkles size={14} /> Hệ Thống Ghi Nhớ Từ Vựng Siêu Tốc
          </div>
          <h1 className='text-2xl sm:text-4xl font-extrabold tracking-tight mb-2'>
            Từ Vựng TOEIC 7 Part & Doanh Nghiệp
          </h1>
          <p className='text-purple-100 text-sm sm:text-base leading-relaxed'>
            Làm chủ hơn 3.000 từ vựng cốt lõi với phiên âm IPA, giải nghĩa tiếng Việt, câu ví dụ
            công sở và thẻ ghi nhớ 3D Flashcard Spaced Repetition.
          </p>
        </div>
        <div className='absolute -right-6 -bottom-8 opacity-15 pointer-events-none'>
          <Layers size={240} />
        </div>
      </div>

      {/* Navigation Mode Tabs */}
      <div className='flex flex-wrap items-center justify-between gap-4 mb-6'>
        <div className='flex items-center gap-2 bg-gray-100 dark:bg-gray-800 p-1.5 rounded-2xl'>
          <button
            onClick={() => setActiveTab('flashcards')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'flashcards'
                ? 'bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-300 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
            }`}
          >
            Thẻ 3D Flashcard
          </button>
          <button
            onClick={() => setActiveTab('list')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'list'
                ? 'bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-300 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
            }`}
          >
            Bảng tra cứu ({filteredWords.length})
          </button>
          <button
            onClick={() => {
              setActiveTab('quiz')
              setQuizIdx(0)
              setQuizScore(0)
              setQuizUserChoice(null)
              setQuizCompleted(false)
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'quiz'
                ? 'bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-300 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
            }`}
          >
            Trắc nghiệm Quiz
          </button>
        </div>

        {/* Progress Pill */}
        <div className='flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800'>
          <CheckCircle2 size={16} /> Đã thuộc: {masteredWords.size} / {RAW_LIST.length} từ
        </div>
      </div>

      {/* Filter by Part / Topic */}
      <div className='bg-white dark:bg-gray-800/80 rounded-2xl p-4 border border-gray-200 dark:border-gray-700/60 shadow-sm mb-6 flex flex-col sm:flex-row items-center gap-3 justify-between'>
        <div className='flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none w-full sm:w-auto'>
          {[
            { id: 'all', label: 'Tất cả từ vựng' },
            { id: 'p1', label: 'Part 1: Tranh ảnh' },
            { id: 'p2', label: 'Part 2: Hỏi & Đáp' },
            { id: 'p34', label: 'Part 3-4: Hội thoại' },
            { id: 'p6', label: 'Part 5-6: Ngữ pháp' },
            { id: 'p7', label: 'Part 7: Đọc hiểu' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setSelectedPart(item.id)
                setCurrentIndex(0)
                setIsFlipped(false)
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedPart === item.id
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                  : 'bg-gray-100 dark:bg-gray-750 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className='relative w-full sm:w-72'>
          <Search className='absolute left-3 top-2.5 text-gray-400' size={16} />
          <input
            type='text'
            placeholder='Tìm từ vựng, nghĩa...'
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentIndex(0)
            }}
            className='w-full pl-9 pr-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500'
          />
        </div>
      </div>

      {/* MODE 1: 3D FLASHCARDS */}
      {activeTab === 'flashcards' && currentWord && (
        <div className='max-w-2xl mx-auto flex flex-col items-center'>
          {/* Card Meta Indicator */}
          <div className='w-full flex items-center justify-between text-xs text-gray-400 mb-3 px-2'>
            <span>
              Thẻ {currentIndex + 1} / {filteredWords.length}
            </span>
            <span>Bấm vào thẻ để lật mặt</span>
          </div>

          {/* Flashcard Container */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className='w-full min-h-[340px] bg-white dark:bg-gray-800 rounded-3xl p-8 border-2 border-purple-100 dark:border-purple-900/50 shadow-xl shadow-purple-500/10 cursor-pointer flex flex-col justify-between transition-all duration-300 hover:border-purple-300 relative group'
          >
            {/* Top Bar inside card */}
            <div className='flex items-center justify-between'>
              <span className='px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800'>
                {currentWord.pos || 'vocabulary'}
              </span>

              <div className='flex items-center gap-2'>
                <button
                  type='button'
                  onClick={(e) => {
                    e.stopPropagation()
                    speak(currentWord.word)
                  }}
                  className='p-2 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 hover:bg-purple-100 transition-colors'
                  title='Nghe phát âm'
                >
                  <Volume2 size={18} />
                </button>

                <button
                  type='button'
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleMastered(currentWord.word)
                  }}
                  className={`p-2 rounded-xl transition-colors ${
                    isMastered
                      ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400'
                      : 'bg-gray-100 text-gray-400 dark:bg-gray-700 hover:text-emerald-600'
                  }`}
                  title={isMastered ? 'Đã thuộc từ này' : 'Đánh dấu đã thuộc'}
                >
                  <CheckCircle2 size={18} />
                </button>
              </div>
            </div>

            {/* Center Content: Front vs Back */}
            {!isFlipped ? (
              <div className='my-auto text-center py-6'>
                <h2 className='text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-3'>
                  {currentWord.word}
                </h2>
                {currentWord.ipa && (
                  <p className='font-mono text-base sm:text-lg text-purple-600 dark:text-purple-400'>
                    {currentWord.ipa}
                  </p>
                )}
                <div className='mt-6 inline-flex items-center gap-1.5 text-xs text-gray-400 group-hover:text-purple-500 transition-colors'>
                  <RotateCw size={14} /> Chạm để xem nghĩa & ví dụ
                </div>
              </div>
            ) : (
              <div className='my-auto py-4 space-y-4 animate-in fade-in zoom-in-95 duration-150'>
                <div>
                  <h3 className='text-xs uppercase font-bold text-gray-400 tracking-wider mb-1'>
                    Nghĩa tiếng Việt
                  </h3>
                  <div className='text-xl sm:text-2xl font-bold text-gray-900 dark:text-white leading-snug'>
                    {currentWord.meaning}
                  </div>
                </div>

                {currentWord.exampleEn && (
                  <div className='bg-gray-50 dark:bg-gray-900/60 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 text-left space-y-1.5'>
                    <div className='text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 flex items-center justify-between'>
                      <span>Ví dụ thực tế:</span>
                      <button
                        type='button'
                        onClick={(e) => {
                          e.stopPropagation()
                          speak(currentWord.exampleEn)
                        }}
                        className='text-gray-400 hover:text-purple-600'
                      >
                        <Volume2 size={14} />
                      </button>
                    </div>
                    <p className='text-sm sm:text-base font-medium text-gray-800 dark:text-gray-200'>
                      {currentWord.exampleEn}
                    </p>
                    {currentWord.exampleVi && (
                      <p className='text-xs sm:text-sm text-gray-500 dark:text-gray-400 italic'>
                        {currentWord.exampleVi}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Bottom hint */}
            <div className='text-center text-xs text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-700/50'>
              Part {currentWord.part || 1} • Nhấn Space hoặc mũi tên để chuyển thẻ
            </div>
          </div>

          {/* Stepper Controls */}
          <div className='flex items-center justify-center gap-4 mt-6'>
            <Button
              variant='outline'
              onClick={handlePrevCard}
              disabled={currentIndex === 0}
              className='rounded-xl px-5 py-2.5'
            >
              <ChevronLeft size={18} className='mr-1' /> Thẻ trước
            </Button>

            <Button
              variant='primary'
              onClick={handleNextCard}
              className='bg-purple-600 hover:bg-purple-700 text-white rounded-xl px-6 py-2.5 shadow-md shadow-purple-600/25'
            >
              Thẻ tiếp theo <ChevronRight size={18} className='ml-1' />
            </Button>
          </div>
        </div>
      )}

      {/* MODE 2: VOCABULARY LIST VIEW */}
      {activeTab === 'list' && (
        <div className='bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200 dark:border-gray-700/60 shadow-sm overflow-hidden'>
          <div className='divide-y divide-gray-100 dark:divide-gray-700/60'>
            {filteredWords.map((item, idx) => {
              const mastered = masteredWords.has(item.word)
              return (
                <div
                  key={item.id || idx}
                  className='p-4 sm:p-5 hover:bg-gray-50 dark:hover:bg-gray-750/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4'
                >
                  <div className='flex items-start gap-4'>
                    <button
                      onClick={() => speak(item.word)}
                      className='p-2 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors shrink-0 mt-1'
                      title='Nghe từ'
                    >
                      <Volume2 size={18} />
                    </button>

                    <div>
                      <div className='flex items-center gap-2.5 mb-1'>
                        <span className='text-lg font-bold text-gray-900 dark:text-white'>
                          {item.word}
                        </span>
                        {item.pos && (
                          <span className='text-xs font-semibold text-gray-400'>{item.pos}</span>
                        )}
                        {item.ipa && (
                          <span className='font-mono text-xs text-purple-600 dark:text-purple-400'>
                            {item.ipa}
                          </span>
                        )}
                      </div>
                      <p className='text-sm text-gray-700 dark:text-gray-300 font-medium mb-1.5'>
                        {item.meaning}
                      </p>
                      {item.exampleEn && (
                        <p className='text-xs text-gray-500 dark:text-gray-400 leading-relaxed'>
                          <strong className='text-gray-700 dark:text-gray-300 font-semibold'>
                            VD:
                          </strong>{' '}
                          {item.exampleEn}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className='flex items-center gap-2 self-end sm:self-center shrink-0'>
                    <button
                      onClick={() => toggleMastered(item.word)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                        mastered
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
                      }`}
                    >
                      <CheckCircle2 size={14} />
                      <span>{mastered ? 'Đã thuộc' : 'Chưa thuộc'}</span>
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* MODE 3: SPEED QUIZ */}
      {activeTab === 'quiz' && (
        <div className='max-w-2xl mx-auto'>
          {!quizCompleted ? (
            <div className='bg-white dark:bg-gray-800/90 rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700 shadow-xl space-y-6'>
              <div className='flex items-center justify-between text-xs font-semibold text-gray-500 border-b border-gray-100 dark:border-gray-700 pb-3'>
                <span>
                  Câu hỏi {quizIdx + 1} / {quizQuestions.length}
                </span>
                <span>Điểm số: {quizScore} câu đúng</span>
              </div>

              {/* Target Word */}
              <div className='text-center py-4'>
                <span className='text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400'>
                  Chọn nghĩa tiếng Việt chính xác của từ:
                </span>
                <h3 className='text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mt-2 mb-1'>
                  {quizQuestions[quizIdx]?.target.word}
                </h3>
                <p className='font-mono text-sm text-gray-400'>
                  {quizQuestions[quizIdx]?.target.ipa}
                </p>
              </div>

              {/* 4 Choices */}
              <div className='grid grid-cols-1 gap-3'>
                {quizQuestions[quizIdx]?.options.map((opt, optIdx) => {
                  const isSelected = quizUserChoice === optIdx
                  const isCorrect = optIdx === quizQuestions[quizIdx].correctIdx
                  let btnClasses =
                    'p-4 rounded-xl border text-left font-medium text-sm transition-all flex items-center justify-between '

                  if (quizUserChoice !== null) {
                    if (isCorrect) {
                      btnClasses +=
                        'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-semibold'
                    } else if (isSelected) {
                      btnClasses +=
                        'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-700 dark:text-rose-300'
                    } else {
                      btnClasses += 'border-gray-200 dark:border-gray-700 opacity-50'
                    }
                  } else {
                    btnClasses +=
                      'border-gray-200 dark:border-gray-700 hover:border-purple-500 hover:bg-purple-50/50 dark:hover:bg-purple-950/20 text-gray-800 dark:text-gray-200'
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={quizUserChoice !== null}
                      onClick={() => {
                        setQuizUserChoice(optIdx)
                        if (isCorrect) setQuizScore((prev) => prev + 1)
                      }}
                      className={btnClasses}
                    >
                      <span>{opt}</span>
                      {quizUserChoice !== null && isCorrect && (
                        <CheckCircle2 className='text-emerald-600 shrink-0' size={18} />
                      )}
                      {quizUserChoice !== null && isSelected && !isCorrect && (
                        <XCircle className='text-rose-600 shrink-0' size={18} />
                      )}
                    </button>
                  )
                })}
              </div>

              {/* Next Question button */}
              {quizUserChoice !== null && (
                <div className='flex justify-end pt-2'>
                  <Button
                    variant='primary'
                    onClick={() => {
                      if (quizIdx < quizQuestions.length - 1) {
                        setQuizIdx((prev) => prev + 1)
                        setQuizUserChoice(null)
                      } else {
                        setQuizCompleted(true)
                      }
                    }}
                    className='bg-purple-600 hover:bg-purple-700 text-white rounded-xl'
                  >
                    {quizIdx < quizQuestions.length - 1 ? 'Câu tiếp theo' : 'Xem kết quả'}
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className='bg-white dark:bg-gray-800/90 rounded-3xl p-8 border border-gray-200 dark:border-gray-700 shadow-xl text-center space-y-4'>
              <Award size={56} className='text-amber-500 mx-auto' />
              <h3 className='text-2xl font-extrabold text-gray-900 dark:text-white'>
                Hoàn thành bài Quiz!
              </h3>
              <p className='text-gray-600 dark:text-gray-300'>
                Bạn đã trả lời đúng{' '}
                <strong className='text-purple-600 font-bold'>{quizScore}</strong> /{' '}
                {quizQuestions.length} từ vựng.
              </p>
              <Button
                variant='primary'
                onClick={() => {
                  setQuizIdx(0)
                  setQuizScore(0)
                  setQuizUserChoice(null)
                  setQuizCompleted(false)
                }}
                className='bg-purple-600 hover:bg-purple-700 text-white'
              >
                Làm lại bài Quiz khác
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
