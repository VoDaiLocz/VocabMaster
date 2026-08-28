// ============================================
// Interactive Bilingual Story Reader
// ============================================

import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { BILINGUAL_STORIES_DATA } from '@/data/stories'
import { BilingualStory, StoryParagraph, StorySentence, StoryQuizQuestion } from '@/types/story'
import { speakWord } from '@/utils/quiz'
import { lookupWord, WordLookupResult } from '@/services/dictionaryService'
import { WordLookupPopover } from '@/components/video/WordLookupPopover'
import {
  ArrowLeft,
  Eye,
  Volume2,
  Sparkles,
  Trophy,
  CheckCircle2,
  XCircle,
} from 'lucide-react'

type ReaderTheme = 'light' | 'sepia' | 'dark'
type ReadingMode = 'tap_to_reveal' | 'side_by_side'

export const StoryReader: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const story: BilingualStory | undefined = BILINGUAL_STORIES_DATA.find((s) => s.id === id)

  // Reader Settings
  const [theme, setTheme] = useState<ReaderTheme>('sepia')
  const [readingMode, setReadingMode] = useState<ReadingMode>('tap_to_reveal')
  const [fontSize, setFontSize] = useState<number>(18)
  const [revealedParagraphs, setRevealedParagraphs] = useState<Record<number, boolean>>({})
  const [activeSentenceId, setActiveSentenceId] = useState<number | null>(null)

  // Word lookup popup state
  const [selectedWordData, setSelectedWordData] = useState<WordLookupResult | null>(null)

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [earnedXp, setEarnedXp] = useState(0)

  if (!story) {
    return (
      <div className='min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-dark-bg text-center'>
        <p className='text-base font-bold text-gray-600 dark:text-gray-400'>
          Không tìm thấy truyện yêu cầu.
        </p>
        <button
          onClick={() => navigate('/stories')}
          className='mt-4 px-6 py-2.5 rounded-2xl bg-emerald-600 text-white font-bold text-sm shadow-lg'
        >
          Quay lại Thư viện truyện
        </button>
      </div>
    )
  }

  // Toggle reveal for a paragraph in tap-to-reveal mode
  const handleToggleReveal = (pId: number) => {
    setRevealedParagraphs((prev) => ({
      ...prev,
      [pId]: !prev[pId],
    }))
  }

  // Play audio for a sentence
  const handleSpeakSentence = (sentence: StorySentence) => {
    setActiveSentenceId(sentence.id)
    speakWord(sentence.textEn)
  }

  // Word click to open dictionary modal
  const handleWordClick = async (word: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const cleanWord = word.replace(/[^a-zA-Z]/g, '').trim()
    if (cleanWord) {
      const data = await lookupWord(cleanWord)
      setSelectedWordData(data)
    }
  }

  // Submit Quiz
  const handleAnswerQuiz = (qId: string, optionIdx: number) => {
    if (quizSubmitted) return
    setQuizAnswers((prev) => ({ ...prev, [qId]: optionIdx }))
  }

  const handleSubmitQuiz = () => {
    if (!story.comprehensionQuiz) return
    let correctCount = 0
    story.comprehensionQuiz.forEach((q: StoryQuizQuestion) => {
      if (quizAnswers[q.id] === q.correctIndex) {
        correctCount++
      }
    })
    setEarnedXp(correctCount * 25 + 50)
    setQuizSubmitted(true)
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 pb-24 ${
        theme === 'sepia'
          ? 'bg-[#f4ebd0]'
          : theme === 'dark'
          ? 'bg-[#09090b]'
          : 'bg-gray-100'
      }`}
    >
      {/* Reader Sticky Header */}
      <div
        className={`sticky top-0 z-30 backdrop-blur-md border-b px-4 py-3 ${
          theme === 'sepia'
            ? 'bg-[#fbf0d9]/90 border-[#e8d5b5] text-[#433422]'
            : theme === 'dark'
            ? 'bg-[#18181b]/90 border-[#27272a] text-white'
            : 'bg-white/90 border-gray-200 text-gray-900'
        }`}
      >
        <div className='max-w-4xl mx-auto flex items-center justify-between'>
          <button
            onClick={() => navigate('/stories')}
            className='flex items-center gap-2 text-xs sm:text-sm font-bold opacity-80 hover:opacity-100 transition-opacity'
          >
            <ArrowLeft size={18} />
            <span className='hidden sm:inline'>Thư viện</span>
          </button>

          {/* Reading Mode Selector */}
          <div className='flex items-center gap-1 bg-black/5 dark:bg-white/5 p-1 rounded-xl'>
            <button
              onClick={() => setReadingMode('tap_to_reveal')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                readingMode === 'tap_to_reveal'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'opacity-70 hover:opacity-100'
              }`}
              title='Chạm vào đoạn để mở bản dịch'
            >
              👁️ Chạm để dịch
            </button>
            <button
              onClick={() => setReadingMode('side_by_side')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                readingMode === 'side_by_side'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'opacity-70 hover:opacity-100'
              }`}
              title='Song ngữ song song'
            >
              📖 Song ngữ
            </button>
          </div>

          {/* Theme & Font Controls */}
          <div className='flex items-center gap-2'>
            <div className='flex items-center gap-1'>
              <button
                onClick={() => setTheme('light')}
                className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold border ${
                  theme === 'light' ? 'ring-2 ring-emerald-500' : ''
                } bg-white text-gray-800 border-gray-300`}
                title='Nền Sáng'
              >
                A
              </button>
              <button
                onClick={() => setTheme('sepia')}
                className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold border ${
                  theme === 'sepia' ? 'ring-2 ring-emerald-500' : ''
                } bg-[#fbf0d9] text-[#433422] border-[#e8d5b5]`}
                title='Nền Giấy Cổ (Sepia)'
              >
                A
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold border ${
                  theme === 'dark' ? 'ring-2 ring-emerald-500' : ''
                } bg-[#18181b] text-white border-gray-700`}
                title='Nền Đêm (Dark)'
              >
                A
              </button>
            </div>

            {/* Font size +/- */}
            <div className='flex items-center gap-1 text-xs font-bold opacity-80'>
              <button
                onClick={() => setFontSize((s) => Math.max(14, s - 2))}
                className='px-2 py-1 rounded-lg bg-black/5 dark:bg-white/5'
              >
                A-
              </button>
              <button
                onClick={() => setFontSize((s) => Math.min(26, s + 2))}
                className='px-2 py-1 rounded-lg bg-black/5 dark:bg-white/5'
              >
                A+
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Reading Container */}
      <div className='max-w-3xl mx-auto px-4 sm:px-6 pt-8 space-y-8'>
        {/* Book Title Header */}
        <div className='text-center space-y-3 pb-6 border-b border-black/10 dark:border-white/10'>
          <span className='px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'>
            {story.level} • {story.estimatedMinutes} phút đọc
          </span>
          <h1 className='text-2xl sm:text-4xl font-extrabold font-serif tracking-tight'>
            {story.titleEn}
          </h1>
          <p className='text-base sm:text-lg font-medium opacity-80'>
            {story.titleVi}
          </p>
        </div>

        {/* Vocabulary Spotlight */}
        <div className='p-4 sm:p-5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 space-y-2'>
          <div className='flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400'>
            <Sparkles size={16} /> Từ Vựng Then Chốt Trong Truyện:
          </div>
          <div className='grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1'>
            {story.targetVocabulary.map((v: { word: string; ipa: string; meaningVi: string }) => (
              <div
                key={v.word}
                onClick={(e) => handleWordClick(v.word, e)}
                className='p-2 rounded-xl bg-white/60 dark:bg-black/40 border border-black/5 dark:border-white/10 hover:border-emerald-400 cursor-pointer transition-all'
              >
                <div className='flex items-center justify-between'>
                  <span className='text-xs font-bold text-emerald-700 dark:text-emerald-300'>
                    {v.word}
                  </span>
                  <Volume2 size={12} className='opacity-60' />
                </div>
                <p className='text-[10px] opacity-60 font-mono'>{v.ipa}</p>
                <p className='text-[11px] font-medium line-clamp-1 mt-0.5'>{v.meaningVi}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Story Paragraphs */}
        <div className='space-y-6 font-serif leading-relaxed'>
          {story.paragraphs.map((p: StoryParagraph) => {
            const isRevealed = readingMode === 'side_by_side' || !!revealedParagraphs[p.id]

            return (
              <div
                key={p.id}
                onClick={() => readingMode === 'tap_to_reveal' && handleToggleReveal(p.id)}
                className={`p-5 sm:p-6 rounded-3xl transition-all ${
                  theme === 'sepia'
                    ? 'bg-[#fbf0d9] shadow-sm'
                    : theme === 'dark'
                    ? 'bg-[#18181b] shadow-sm'
                    : 'bg-white shadow-sm'
                } ${readingMode === 'tap_to_reveal' ? 'cursor-pointer hover:shadow-md' : ''}`}
              >
                {/* English Content with Interactive Words */}
                <div
                  style={{ fontSize: `${fontSize}px`, lineHeight: '1.8' }}
                  className='space-y-2'
                >
                  {p.sentences.map((sent: StorySentence) => {
                    const isSentenceActive = activeSentenceId === sent.id
                    const words = sent.textEn.split(' ')

                    return (
                      <span
                        key={sent.id}
                        className={`inline transition-colors rounded px-1 py-0.5 ${
                          isSentenceActive
                            ? 'bg-amber-300/40 dark:bg-amber-500/30'
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
                          onClick={(e) => {
                            e.stopPropagation()
                            handleSpeakSentence(sent)
                          }}
                          className='inline-flex items-center opacity-40 hover:opacity-100 hover:text-emerald-600 transition-all ml-1 align-middle'
                          title='Phát âm câu này'
                        >
                          <Volume2 size={14} />
                        </button>{' '}
                      </span>
                    )
                  })}
                </div>

                {/* Vietnamese Translation Accordion / Box */}
                {isRevealed ? (
                  <div className='mt-4 pt-4 border-t border-black/10 dark:border-white/10 text-sm font-sans opacity-85 leading-relaxed text-emerald-900 dark:text-emerald-200 bg-emerald-500/5 p-3 rounded-2xl'>
                    {p.textVi}
                  </div>
                ) : (
                  <div className='mt-3 flex items-center gap-1.5 text-xs font-sans font-semibold text-emerald-600 dark:text-emerald-400 opacity-60 hover:opacity-100 transition-opacity'>
                    <Eye size={14} /> Chạm để xem bản dịch tiếng Việt
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Comprehension Quiz Section */}
        {story.comprehensionQuiz && story.comprehensionQuiz.length > 0 && (
          <div className='p-6 sm:p-8 rounded-3xl bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-800 shadow-xl space-y-6'>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center'>
                <Trophy size={22} />
              </div>
              <div>
                <h3 className='text-lg font-bold font-display text-gray-900 dark:text-white'>
                  Mini-Quiz Đọc Hiểu Cốt Truyện
                </h3>
                <p className='text-xs text-gray-500 dark:text-gray-400'>
                  Trả lời đúng các câu hỏi để kiểm tra khả năng đọc hiểu và nhận +{earnedXp || 75} XP
                </p>
              </div>
            </div>

            <div className='space-y-6'>
              {story.comprehensionQuiz.map((q: StoryQuizQuestion, qIdx: number) => (
                <div key={q.id} className='space-y-3'>
                  <p className='text-sm sm:text-base font-bold text-gray-800 dark:text-gray-200'>
                    Câu {qIdx + 1}: {q.question}
                  </p>

                  <div className='grid grid-cols-1 gap-2'>
                    {q.options.map((opt: string, optIdx: number) => {
                      const isSelected = quizAnswers[q.id] === optIdx
                      const isCorrect = optIdx === q.correctIndex
                      const showResult = quizSubmitted

                      let btnStyle = 'bg-gray-50 dark:bg-gray-800/40 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300'
                      if (showResult) {
                        if (isCorrect) btnStyle = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-700 dark:text-emerald-300'
                        else if (isSelected && !isCorrect) btnStyle = 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-700 dark:text-rose-300'
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
                          {showResult && isCorrect && <CheckCircle2 size={16} className='text-emerald-500 shrink-0' />}
                          {showResult && isSelected && !isCorrect && <XCircle size={16} className='text-rose-500 shrink-0' />}
                        </button>
                      )
                    })}
                  </div>

                  {quizSubmitted && (
                    <p className='text-xs text-emerald-600 dark:text-emerald-400 font-medium p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/30'>
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
              <div className='p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-2'>
                <p className='text-base font-bold text-emerald-600 dark:text-emerald-400'>
                  🎉 Chúc Mừng Bạn Đã Hoàn Thành Truyện!
                </p>
                <p className='text-xs text-gray-500 dark:text-gray-400'>
                  Bạn đã xuất sắc nhận được +{earnedXp} XP. Hãy tiếp tục khám phá các truyện khác!
                </p>
                <button
                  onClick={() => navigate('/stories')}
                  className='mt-2 px-6 py-2.5 rounded-2xl bg-emerald-600 text-white font-bold text-xs shadow-md'
                >
                  Khám phá truyện tiếp theo
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Word Lookup Popover */}
      {selectedWordData && (
        <WordLookupPopover
          wordData={selectedWordData}
          onClose={() => setSelectedWordData(null)}
        />
      )}
    </div>
  )
}
