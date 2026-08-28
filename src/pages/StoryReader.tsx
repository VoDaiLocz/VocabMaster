// ============================================
// Interactive Multi-Chapter Bilingual Story Reader (With Chapter Navigator)
// ============================================

import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { BILINGUAL_STORIES_DATA } from '@/data/stories'
import {
  BilingualStory,
  StoryChapter,
  StoryParagraph,
  StorySentence,
  StoryQuizQuestion,
} from '@/types/story'
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
  ChevronLeft,
  ChevronRight,
  BookOpen,
  List,
  Search,
  X,
  Layers,
} from 'lucide-react'

type ReaderTheme = 'light' | 'sepia' | 'dark'
type ReadingMode = 'tap_to_reveal' | 'interleaved'

export const StoryReader: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const story: BilingualStory | undefined =
    BILINGUAL_STORIES_DATA.find((s) => s.id === id) || BILINGUAL_STORIES_DATA[0]

  // Chapter Navigation State
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0)
  const [isChapterDrawerOpen, setIsChapterDrawerOpen] = useState<boolean>(false)
  const [chapterSearchQuery, setChapterSearchQuery] = useState<string>('')

  const currentChapter: StoryChapter = story.chapters[activeChapterIndex] || story.chapters[0]

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

  // Toggle reveal for a specific paragraph
  const handleToggleReveal = (pId: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    setRevealedParagraphs((prev) => ({
      ...prev,
      [pId]: !prev[pId],
    }))
  }

  // Play audio for a sentence
  const handleSpeakSentence = (sentence: StorySentence, e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    setActiveSentenceId(sentence.id)
    speakWord(sentence.textEn)
  }

  // Word click to open dictionary modal
  const handleWordClick = async (word: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const cleanWord = word.replace(/[^a-zA-Z]/g, '').trim()
    if (cleanWord) {
      speakWord(cleanWord)
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
    if (!currentChapter.comprehensionQuiz) return
    let correctCount = 0
    currentChapter.comprehensionQuiz.forEach((q: StoryQuizQuestion) => {
      if (quizAnswers[q.id] === q.correctIndex) {
        correctCount++
      }
    })
    setEarnedXp(correctCount * 25 + 50)
    setQuizSubmitted(true)
  }

  const selectChapter = (idx: number) => {
    setActiveChapterIndex(idx)
    setIsChapterDrawerOpen(false)
    setRevealedParagraphs({})
    setQuizAnswers({})
    setQuizSubmitted(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleNextChapter = () => {
    if (activeChapterIndex < story.chapters.length - 1) {
      selectChapter(activeChapterIndex + 1)
    }
  }

  const handlePrevChapter = () => {
    if (activeChapterIndex > 0) {
      selectChapter(activeChapterIndex - 1)
    }
  }

  const filteredChapters = story.chapters.filter((ch) => {
    const q = chapterSearchQuery.toLowerCase()
    return (
      ch.chapterNumber.toString().includes(q) ||
      ch.titleEn.toLowerCase().includes(q) ||
      ch.titleVi.toLowerCase().includes(q) ||
      ch.descriptionVi.toLowerCase().includes(q)
    )
  })

  return (
    <div
      className={
        'min-h-screen transition-colors duration-300 pb-24 ' +
        (theme === 'sepia' ? 'bg-[#f4ebd0]' : theme === 'dark' ? 'bg-[#09090b]' : 'bg-gray-100')
      }
    >
      {/* Reader Sticky Header */}
      <div
        className={
          'sticky top-0 z-30 backdrop-blur-md border-b px-4 py-3 ' +
          (theme === 'sepia'
            ? 'bg-[#fbf0d9]/90 border-[#e8d5b5] text-[#433422]'
            : theme === 'dark'
              ? 'bg-[#18181b]/90 border-[#27272a] text-white'
              : 'bg-white/90 border-gray-200 text-gray-900')
        }
      >
        <div className='max-w-4xl mx-auto flex items-center justify-between gap-2'>
          <div className='flex items-center gap-2'>
            <button
              onClick={() => navigate('/stories')}
              className='flex items-center gap-1.5 text-xs sm:text-sm font-bold opacity-80 hover:opacity-100 transition-opacity'
            >
              <ArrowLeft size={18} />
              <span className='hidden sm:inline'>Thư viện</span>
            </button>

            {/* Chapter Drawer Trigger Button */}
            <button
              onClick={() => setIsChapterDrawerOpen(true)}
              className='flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-black/5 dark:bg-white/10 text-xs font-bold hover:bg-emerald-600 hover:text-white transition-all'
              title='Mở danh sách toàn bộ chương'
            >
              <List size={14} />
              <span>Chương {currentChapter.chapterNumber}</span>
            </button>
          </div>

          {/* 2 Explicit Reading Modes */}
          <div className='flex items-center gap-1 bg-black/5 dark:bg-white/5 p-1 rounded-xl'>
            <button
              onClick={() => setReadingMode('tap_to_reveal')}
              className={
                'px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ' +
                (readingMode === 'tap_to_reveal'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'opacity-70 hover:opacity-100')
              }
              title='Chạm vào đoạn để mở bản dịch tiếng Việt'
            >
              <Eye size={13} />
              <span>Chạm để dịch</span>
            </button>

            <button
              onClick={() => setReadingMode('interleaved')}
              className={
                'px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ' +
                (readingMode === 'interleaved'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'opacity-70 hover:opacity-100')
              }
              title='Hiển thị tiếng Anh & tiếng Việt đan xen'
            >
              <BookOpen size={13} />
              <span>Anh - Việt đan xen</span>
            </button>
          </div>

          {/* Theme & Font Controls */}
          <div className='flex items-center gap-2'>
            <div className='flex items-center gap-1'>
              <button
                onClick={() => setTheme('light')}
                className={
                  'w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold border ' +
                  (theme === 'light' ? 'ring-2 ring-emerald-500' : '') +
                  ' bg-white text-gray-800 border-gray-300'
                }
                title='Nền Sáng'
              >
                A
              </button>
              <button
                onClick={() => setTheme('sepia')}
                className={
                  'w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold border ' +
                  (theme === 'sepia' ? 'ring-2 ring-emerald-500' : '') +
                  ' bg-[#fbf0d9] text-[#433422] border-[#e8d5b5]'
                }
                title='Nền Giấy Cổ (Sepia)'
              >
                A
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={
                  'w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold border ' +
                  (theme === 'dark' ? 'ring-2 ring-emerald-500' : '') +
                  ' bg-[#18181b] text-white border-gray-700'
                }
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
      <div className='max-w-3xl mx-auto px-4 sm:px-6 pt-6 space-y-6'>
        {/* Novel Info Banner */}
        <div className='flex items-center justify-between p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-800 dark:text-emerald-300 font-semibold'>
          <span className='flex items-center gap-1.5'>
            <Layers size={14} /> {story.titleVi}
          </span>
          <span className='font-mono opacity-80'>
            Chương {currentChapter.chapterNumber} / {story.chapters.length} (Đang cập nhật)
          </span>
        </div>

        {/* Book & Chapter Header */}
        <div className='text-center space-y-2.5 pb-4 border-b border-black/10 dark:border-white/10'>
          <span className='px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'>
            {story.level} • {currentChapter.estimatedMinutes} phút đọc • {currentChapter.wordCount}{' '}
            từ
          </span>
          <h1 className='text-2xl sm:text-3xl font-extrabold font-serif tracking-tight'>
            {currentChapter.titleEn}
          </h1>
          <p className='text-base sm:text-lg font-medium opacity-80'>{currentChapter.titleVi}</p>
        </div>

        {/* Vocabulary Spotlight */}
        <div className='p-4 sm:p-5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 space-y-2'>
          <div className='flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400'>
            <Sparkles size={16} /> Từ Vựng Then Chốt Trong Chương:
          </div>
          <div className='grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1'>
            {currentChapter.targetVocabulary.map(
              (v: { word: string; ipa: string; meaningVi: string }) => (
                <div
                  key={v.word}
                  onClick={(e) => handleWordClick(v.word, e)}
                  className='p-2 rounded-xl bg-white/60 dark:bg-black/40 border border-black/5 dark:border-white/10 hover:border-emerald-400 cursor-pointer transition-all'
                >
                  <div className='flex items-center justify-between'>
                    <span className='text-xs font-bold text-emerald-700 dark:text-emerald-300'>
                      {v.word}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        speakWord(v.word)
                      }}
                      className='p-1 hover:text-emerald-500'
                      title='Phát âm từ vựng'
                    >
                      <Volume2 size={13} className='opacity-75' />
                    </button>
                  </div>
                  <p className='text-[10px] opacity-60 font-mono'>{v.ipa}</p>
                  <p className='text-[11px] font-medium line-clamp-1 mt-0.5'>{v.meaningVi}</p>
                </div>
              ),
            )}
          </div>
        </div>

        {/* Story Paragraphs */}
        <div className='space-y-6 font-serif leading-relaxed'>
          {currentChapter.paragraphs.map((p: StoryParagraph) => {
            const isRevealed = readingMode === 'interleaved' || !!revealedParagraphs[p.id]

            return (
              <div
                key={p.id}
                onClick={() => readingMode === 'tap_to_reveal' && handleToggleReveal(p.id)}
                className={
                  'p-5 sm:p-6 rounded-3xl transition-all ' +
                  (theme === 'sepia'
                    ? 'bg-[#fbf0d9] shadow-sm'
                    : theme === 'dark'
                      ? 'bg-[#18181b] shadow-sm'
                      : 'bg-white shadow-sm') +
                  (readingMode === 'tap_to_reveal' ? ' cursor-pointer hover:shadow-md' : '')
                }
              >
                {/* English Content with Interactive Words and Pronunciation Buttons */}
                <div
                  style={{ fontSize: fontSize + 'px', lineHeight: '1.85' }}
                  className='space-y-2 text-justify'
                >
                  {p.sentences.map((sent: StorySentence) => {
                    const isSentenceActive = activeSentenceId === sent.id
                    const words = sent.textEn.split(' ')

                    return (
                      <span
                        key={sent.id}
                        className={
                          'inline transition-colors rounded px-1 py-0.5 ' +
                          (isSentenceActive ? 'bg-amber-300/40 dark:bg-amber-500/30' : '')
                        }
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
                          onClick={(e) => handleSpeakSentence(sent, e)}
                          className='inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-600 hover:text-white transition-all ml-1 align-middle'
                          title='Phát âm toàn câu này'
                        >
                          <Volume2 size={11} />
                        </button>{' '}
                      </span>
                    )
                  })}
                </div>

                {/* Vietnamese Translation Accordion / Interleaved Box */}
                {isRevealed ? (
                  <div className='mt-4 pt-3.5 border-t border-black/10 dark:border-white/10 text-sm font-sans opacity-90 leading-relaxed text-emerald-950 dark:text-emerald-200 bg-emerald-500/10 p-3.5 rounded-2xl'>
                    <div className='text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1'>
                      🇻🇳 Bản dịch tiếng Việt:
                    </div>
                    {p.textVi}
                  </div>
                ) : (
                  <div
                    onClick={(e) => handleToggleReveal(p.id, e)}
                    className='mt-3 flex items-center gap-1.5 text-xs font-sans font-semibold text-emerald-600 dark:text-emerald-400 opacity-70 hover:opacity-100 transition-opacity cursor-pointer'
                  >
                    <Eye size={14} /> Chạm để xem bản dịch tiếng Việt của đoạn này
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Chapter Navigation Buttons */}
        <div className='flex items-center justify-between gap-4 pt-4'>
          <button
            onClick={handlePrevChapter}
            disabled={activeChapterIndex === 0}
            className={
              'flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all ' +
              (activeChapterIndex === 0
                ? 'opacity-40 cursor-not-allowed bg-black/5 dark:bg-white/5'
                : 'bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-800 shadow-md hover:bg-emerald-50 dark:hover:bg-emerald-950/30')
            }
          >
            <ChevronLeft size={16} /> Chương trước
          </button>

          <button
            onClick={() => setIsChapterDrawerOpen(true)}
            className='px-4 py-2 rounded-xl bg-black/5 dark:bg-white/5 text-xs font-bold flex items-center gap-1.5'
          >
            <List size={14} /> Mục lục ({story.chapters.length} chap)
          </button>

          <button
            onClick={handleNextChapter}
            disabled={activeChapterIndex === story.chapters.length - 1}
            className={
              'flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all ' +
              (activeChapterIndex === story.chapters.length - 1
                ? 'opacity-40 cursor-not-allowed bg-black/5 dark:bg-white/5'
                : 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/25 hover:bg-emerald-500')
            }
          >
            Chương tiếp theo <ChevronRight size={16} />
          </button>
        </div>

        {/* Comprehension Quiz Section */}
        {currentChapter.comprehensionQuiz && currentChapter.comprehensionQuiz.length > 0 && (
          <div className='p-6 sm:p-8 rounded-3xl bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-800 shadow-xl space-y-6'>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center'>
                <Trophy size={22} />
              </div>
              <div>
                <h3 className='text-lg font-bold font-display text-gray-900 dark:text-white'>
                  Mini-Quiz Đọc Hiểu Cốt Truyện Chương {currentChapter.chapterNumber}
                </h3>
                <p className='text-xs text-gray-500 dark:text-gray-400'>
                  Trả lời câu hỏi trắc nghiệm để nhận +{earnedXp || 75} XP
                </p>
              </div>
            </div>

            <div className='space-y-6'>
              {currentChapter.comprehensionQuiz.map((q: StoryQuizQuestion, qIdx: number) => (
                <div key={q.id} className='space-y-3'>
                  <p className='text-sm sm:text-base font-bold text-gray-800 dark:text-gray-200'>
                    Câu {qIdx + 1}: {q.question}
                  </p>

                  <div className='grid grid-cols-1 gap-2'>
                    {q.options.map((opt: string, optIdx: number) => {
                      const isSelected = quizAnswers[q.id] === optIdx
                      const isCorrect = optIdx === q.correctIndex
                      const showResult = quizSubmitted

                      let btnStyle =
                        'bg-gray-50 dark:bg-gray-800/40 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300'
                      if (showResult) {
                        if (isCorrect)
                          btnStyle =
                            'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-700 dark:text-emerald-300'
                        else if (isSelected && !isCorrect)
                          btnStyle =
                            'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-700 dark:text-rose-300'
                      } else if (isSelected) {
                        btnStyle = 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={quizSubmitted}
                          onClick={() => handleAnswerQuiz(q.id, optIdx)}
                          className={
                            'p-3.5 rounded-2xl text-left text-xs sm:text-sm font-medium border transition-all flex items-center justify-between ' +
                            btnStyle
                          }
                        >
                          <span>{opt}</span>
                          {showResult && isCorrect && (
                            <CheckCircle2 size={16} className='text-emerald-500 shrink-0' />
                          )}
                          {showResult && isSelected && !isCorrect && (
                            <XCircle size={16} className='text-rose-500 shrink-0' />
                          )}
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
                  🎉 Chúc Mừng Bạn Đã Hoàn Thành Chương Này!
                </p>
                <p className='text-xs text-gray-500 dark:text-gray-400'>
                  Bạn đã xuất sắc nhận được +{earnedXp} XP.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Chapter Navigator Drawer Modal */}
      {isChapterDrawerOpen && (
        <div className='fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end animate-in fade-in duration-200'>
          <div className='w-full max-w-md bg-white dark:bg-dark-card h-full shadow-2xl flex flex-col'>
            {/* Drawer Header */}
            <div className='p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <List className='text-emerald-600' size={20} />
                <h3 className='font-bold font-display text-base text-gray-900 dark:text-white'>
                  Mục Lục Chương ({story.chapters.length} chap)
                </h3>
              </div>
              <button
                onClick={() => setIsChapterDrawerOpen(false)}
                className='p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400'
              >
                <X size={20} />
              </button>
            </div>

            {/* Chapter Search Box */}
            <div className='p-3 border-b border-gray-100 dark:border-gray-800'>
              <div className='relative'>
                <Search
                  size={15}
                  className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
                />
                <input
                  type='text'
                  value={chapterSearchQuery}
                  onChange={(e) => setChapterSearchQuery(e.target.value)}
                  placeholder='Tìm kiếm chương (VD: 1, Phương Hạc Linh...)'
                  className='w-full pl-9 pr-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-xs outline-none border border-transparent focus:border-emerald-500'
                />
              </div>
            </div>

            {/* Chapters List */}
            <div className='flex-1 overflow-y-auto p-3 space-y-2'>
              {filteredChapters.map((ch) => {
                const actualIdx = story.chapters.findIndex((c) => c.id === ch.id)
                const isSelected = activeChapterIndex === actualIdx

                return (
                  <button
                    key={ch.id}
                    onClick={() => selectChapter(actualIdx)}
                    className={
                      'w-full p-3 rounded-2xl text-left border transition-all flex flex-col gap-1 ' +
                      (isSelected
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                        : 'bg-gray-50 dark:bg-gray-800/40 border-gray-100 dark:border-gray-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/30')
                    }
                  >
                    <div className='flex items-center justify-between text-xs font-bold'>
                      <span>
                        Chương {ch.chapterNumber}: {ch.titleVi}
                      </span>
                      <span
                        className={
                          'text-[10px] font-mono ' +
                          (isSelected ? 'text-emerald-100' : 'opacity-60')
                        }
                      >
                        {ch.wordCount} từ
                      </span>
                    </div>
                    <p
                      className={
                        'text-[11px] line-clamp-1 ' +
                        (isSelected ? 'text-emerald-100' : 'text-gray-500 dark:text-gray-400')
                      }
                    >
                      {ch.descriptionVi}
                    </p>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Word Lookup Popover */}
      {selectedWordData && (
        <WordLookupPopover wordData={selectedWordData} onClose={() => setSelectedWordData(null)} />
      )}
    </div>
  )
}
