// =======================================================================
// Grammar Master Pro - International Standard EdTech Architecture
// Bách Khoa 21 Chuyên Đề Ngữ Pháp & Ngân Hàng 1.285 Câu Hỏi Thực Chiến
// =======================================================================

import React, { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { GRAMMAR_30_DAYS, GrammarDay } from '@/data/grammarCurriculumData'
import ENCYCLOPEDIA_DATA from '@/data/extractedGrammarEncyclopedia.json'
import QUESTION_BANK from '@/data/extractedQuestionBank.json'
import ENRICHED_DAYS from '@/data/enrichedCurriculumDays.json'
import {
  GraduationCap,
  BookOpen,
  Search,
  CheckCircle2,
  XCircle,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  Volume2,
  ChevronRight,
  Calendar,
  Layers,
  Award,
  Flame,
  BookmarkCheck,
  Check,
  RotateCcw,
  Zap,
  BookMarked,
} from 'lucide-react'
import { speakLanguage } from '@/services/bilingualAudioService'

type ActiveTab = 'roadmap' | 'encyclopedia' | 'practice' | 'handbook'

interface EncyclopediaTopic {
  id: string
  folder: string
  nameVi: string
  nameEn: string
  category: string
  level: string
  days: number[]
  overview: string
  formulas: string[]
  examples: { en: string; vi: string }[]
  notes: string
}

export const GrammarMaster: React.FC = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<ActiveTab>('roadmap')
  const [selectedDay, setSelectedDay] = useState<GrammarDay | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  // Encyclopedia State
  const [activeTopicId, setActiveTopicId] = useState<string>(ENCYCLOPEDIA_DATA[0]?.id || 'tenses')

  // Practice State
  const [practiceTopicFilter, setPracticeTopicFilter] = useState<string>('all')
  const [practiceLevelFilter, setPracticeLevelFilter] = useState<string>('all')
  const [currentExIndex, setCurrentExIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isAnswerChecked, setIsAnswerChecked] = useState(false)
  const [practiceScore, setPracticeScore] = useState({ correct: 0, total: 0 })

  // Progress State persisted in localStorage
  const [completedDays, setCompletedDays] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('vocabmaster_completed_grammar_days')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('vocabmaster_completed_grammar_days', JSON.stringify(completedDays))
    } catch {
      // ignore
    }
  }, [completedDays])

  const toggleDayCompleted = (dayNum: number) => {
    setCompletedDays((prev) =>
      prev.includes(dayNum) ? prev.filter((d) => d !== dayNum) : [...prev, dayNum],
    )
  }

  // Audio Pronunciation
  const handlePronounce = (text: string, lang: 'en' | 'vi' = 'en') => {
    speakLanguage(text, lang)
  }

  // Selected Encyclopedia Topic
  const currentTopic = useMemo(() => {
    return (
      (ENCYCLOPEDIA_DATA as EncyclopediaTopic[]).find((t) => t.id === activeTopicId) ||
      (ENCYCLOPEDIA_DATA[0] as EncyclopediaTopic)
    )
  }, [activeTopicId])

  // Filtered Practice Questions from 1,285 Question Bank
  const filteredQuestions = useMemo(() => {
    let list = QUESTION_BANK as any[]
    if (practiceTopicFilter !== 'all') {
      list = list.filter((q) => q.topicId === practiceTopicFilter)
    }
    if (practiceLevelFilter !== 'all') {
      list = list.filter((q) => q.difficulty === practiceLevelFilter)
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      list = list.filter(
        (item) =>
          item.question.toLowerCase().includes(q) ||
          item.topicName.toLowerCase().includes(q) ||
          item.detailedExplanation.toLowerCase().includes(q),
      )
    }
    return list
  }, [practiceTopicFilter, practiceLevelFilter, searchQuery])

  // Reset index when filter changes
  useEffect(() => {
    setCurrentExIndex(0)
    setSelectedAnswer(null)
    setIsAnswerChecked(false)
  }, [practiceTopicFilter, practiceLevelFilter])

  const currentExercise = filteredQuestions[currentExIndex] || null

  const handleSelectOption = (index: number) => {
    if (isAnswerChecked) return
    setSelectedAnswer(index)
  }

  const handleCheckAnswer = () => {
    if (selectedAnswer === null || !currentExercise || isAnswerChecked) return
    setIsAnswerChecked(true)
    const isCorrect = selectedAnswer === currentExercise.correctAnswer
    setPracticeScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }))
  }

  const handleNextQuestion = () => {
    if (currentExIndex < filteredQuestions.length - 1) {
      setCurrentExIndex((prev) => prev + 1)
      setSelectedAnswer(null)
      setIsAnswerChecked(false)
    }
  }

  const handleResetPractice = () => {
    setCurrentExIndex(0)
    setSelectedAnswer(null)
    setIsAnswerChecked(false)
    setPracticeScore({ correct: 0, total: 0 })
  }

  // Jump from Roadmap/Encyclopedia to Practice
  const jumpToPracticeTopic = (topicId: string) => {
    // Find matching topic in ENCYCLOPEDIA_DATA
    const found = (ENCYCLOPEDIA_DATA as EncyclopediaTopic[]).find(
      (t) => t.id === topicId || t.category.toLowerCase() === topicId.toLowerCase(),
    )
    if (found) {
      setPracticeTopicFilter(found.id)
    } else {
      setPracticeTopicFilter('all')
    }
    setActiveTab('practice')
    setCurrentExIndex(0)
    setSelectedAnswer(null)
    setIsAnswerChecked(false)
  }

  const jumpToEncyclopediaTopic = (topicId: string) => {
    const found = (ENCYCLOPEDIA_DATA as EncyclopediaTopic[]).find(
      (t) => t.id === topicId || t.category.toLowerCase() === topicId.toLowerCase(),
    )
    if (found) {
      setActiveTopicId(found.id)
    }
    setActiveTab('encyclopedia')
  }

  // Helper to count questions in a day
  const getDayQuestionCount = (dayNum: number): number => {
    const questions = (ENRICHED_DAYS as Record<string, any[]>)[String(dayNum)]
    return questions ? questions.length : 15
  }

  return (
    <div className='min-h-screen bg-gray-50/50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200 pb-16'>
      {/* 1. TOP BRAND & PROGRESS HEADER (EDTECH DASHBOARD) */}
      <header className='sticky top-0 z-30 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200/80 dark:border-gray-800 px-4 sm:px-6 lg:px-8 py-3.5 transition-all shadow-xs'>
        <div className='max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4'>
          {/* Logo & Headline */}
          <div className='flex items-center gap-3'>
            <div className='w-11 h-11 rounded-2xl bg-gradient-to-tr from-primary-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-primary-500/20'>
              <GraduationCap size={24} className='animate-pulse' />
            </div>
            <div>
              <div className='flex items-center gap-2'>
                <h1 className='text-lg sm:text-xl font-black tracking-tight text-gray-900 dark:text-white'>
                  Grammar Master <span className='text-primary-600 dark:text-primary-400'>Pro</span>
                </h1>
                <span className='px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800'>
                  International Edition
                </span>
              </div>
              <p className='text-xs text-gray-500 dark:text-gray-400 font-medium line-clamp-1'>
                Tổng ôn 30 ngày ngữ pháp & 1.285 câu hỏi thực chiến chuẩn A1 - C1 / TOEIC 800+
              </p>
            </div>
          </div>

          {/* Quick Stats & Global Search */}
          <div className='flex items-center flex-wrap gap-2.5 sm:gap-3'>
            {/* Completion Pill */}
            <div className='flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold'>
              <BookmarkCheck size={15} className='text-emerald-600 dark:text-emerald-400' />
              <span>
                {completedDays.length}/30 ngày ({Math.round((completedDays.length / 30) * 100)}%)
              </span>
            </div>

            {/* Questions Bank Badge */}
            <div className='hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/80 text-purple-800 dark:text-purple-300 text-xs font-bold'>
              <Award size={15} className='text-purple-600 dark:text-purple-400' />
              <span>1.285 Câu hỏi chuẩn</span>
            </div>

            {/* 21 Topics Badge */}
            <div className='hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/80 text-indigo-800 dark:text-indigo-300 text-xs font-bold'>
              <BookOpen size={15} className='text-indigo-600 dark:text-indigo-400' />
              <span>21 Chuyên đề</span>
            </div>
          </div>
        </div>
      </header>

      {/* 2. MAIN WORKSPACE CONTAINER */}
      <main className='max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-5 space-y-6'>
        {/* Navigation Tabs (Modern Segmented Control) */}
        <div className='flex items-center justify-between flex-wrap gap-3 pb-1'>
          <div className='flex items-center gap-1.5 p-1.5 rounded-2xl bg-gray-200/70 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700/80 max-w-full overflow-x-auto no-scrollbar'>
            <button
              onClick={() => setActiveTab('roadmap')}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === 'roadmap'
                  ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Calendar size={16} />
              <span>Lộ Trình 30 Ngày</span>
            </button>

            <button
              onClick={() => setActiveTab('encyclopedia')}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === 'encyclopedia'
                  ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Layers size={16} />
              <span>Bách Khoa 21 Chuyên Đề</span>
              <span className='px-1.5 py-0.2 rounded-full bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-primary-300 text-[10px] font-black'>
                21
              </span>
            </button>

            <button
              onClick={() => setActiveTab('practice')}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === 'practice'
                  ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Zap size={16} />
              <span>Luyện Thi 1.285 Câu</span>
              <span className='px-1.5 py-0.2 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-black'>
                Live
              </span>
            </button>

            <button
              onClick={() => setActiveTab('handbook')}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === 'handbook'
                  ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <BookOpen size={16} />
              <span>Cẩm Nang Công Thức</span>
            </button>
          </div>

          {/* Search Box */}
          <div className='relative w-full sm:w-64'>
            <Search
              size={15}
              className='absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'
            />
            <input
              type='text'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Tìm công thức, câu hỏi...'
              className='w-full pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs sm:text-sm placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-primary-500/30'
            />
          </div>
        </div>

        {/* ================================================================= */}
        {/* TAB 1: 30-DAY SYLLABUS ROADMAP                                    */}
        {/* ================================================================= */}
        {activeTab === 'roadmap' && (
          <div className='space-y-6'>
            {/* Motivation banner */}
            <div className='p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-primary-600 via-indigo-600 to-purple-600 text-white shadow-lg shadow-primary-600/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4'>
              <div className='space-y-1 max-w-2xl'>
                <div className='flex items-center gap-2'>
                  <Flame size={20} className='text-amber-300' />
                  <h2 className='text-base sm:text-lg font-black tracking-tight'>
                    Lộ Trình Tổng Ôn 30 Ngày Ngữ Pháp Tiếng Anh
                  </h2>
                </div>
                <p className='text-xs sm:text-sm text-primary-100 font-medium leading-relaxed'>
                  Thiết kế theo chuẩn mục lục sách giáo trình, từ cấp độ nền tảng A1-A2 đến bẫy đề
                  thi nâng cao C1 / TOEIC 800+. Mỗi ngày tích hợp sẵn 15 - 100+ câu hỏi thực chiến
                  có lời giải chi tiết.
                </p>
              </div>

              <div className='flex items-center gap-3 shrink-0'>
                <button
                  onClick={() => jumpToPracticeTopic('all')}
                  className='px-4 py-2.5 rounded-2xl bg-white text-primary-700 hover:bg-primary-50 active:scale-95 text-xs sm:text-sm font-black shadow-md transition-all flex items-center gap-2'
                >
                  <Zap size={16} />
                  <span>Bắt đầu luyện tập ngay</span>
                </button>
              </div>
            </div>

            {/* 30 Days Grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4'>
              {GRAMMAR_30_DAYS.map((day) => {
                const isCompleted = completedDays.includes(day.day)
                const qCount = getDayQuestionCount(day.day)

                return (
                  <div
                    key={day.day}
                    className={`relative p-4 rounded-3xl border transition-all duration-200 flex flex-col justify-between hover:shadow-md ${
                      isCompleted
                        ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800'
                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/80 hover:border-primary-400 dark:hover:border-primary-500'
                    }`}
                  >
                    {/* Top Row: Day badge & Completion checkbox */}
                    <div className='flex items-center justify-between gap-2 mb-2.5'>
                      <span
                        className={`px-2.5 py-1 rounded-xl text-xs font-black uppercase tracking-wider ${
                          isCompleted
                            ? 'bg-emerald-500 text-white'
                            : 'bg-primary-50 dark:bg-primary-950 text-primary-700 dark:text-primary-300'
                        }`}
                      >
                        DAY {day.day}
                      </span>

                      <button
                        onClick={() => toggleDayCompleted(day.day)}
                        className={`w-7 h-7 rounded-xl border flex items-center justify-center transition-all ${
                          isCompleted
                            ? 'bg-emerald-500 border-emerald-500 text-white'
                            : 'border-gray-300 dark:border-gray-600 hover:border-emerald-500 text-transparent'
                        }`}
                        title={isCompleted ? 'Đánh dấu chưa hoàn thành' : 'Đánh dấu đã hoàn thành'}
                      >
                        <Check size={15} className={isCompleted ? 'stroke-[3]' : ''} />
                      </button>
                    </div>

                    {/* Book Page Reference & Category */}
                    <div className='flex items-center gap-1.5 text-[10px] font-bold text-gray-500 dark:text-gray-400 mb-1.5'>
                      <span className='px-1.5 py-0.5 rounded-md bg-gray-100 dark:bg-gray-700'>
                        Trang {day.pageBookRef}
                      </span>
                      <span className='truncate'>{day.category}</span>
                    </div>

                    {/* Title */}
                    <div className='space-y-1 mb-3'>
                      <h3 className='font-bold text-xs sm:text-sm text-gray-900 dark:text-white line-clamp-2 leading-snug'>
                        {day.title}
                      </h3>
                      <p className='text-[11px] text-gray-500 dark:text-gray-400 line-clamp-1 italic'>
                        {day.titleEn}
                      </p>
                    </div>

                    {/* Bottom Metadata & Action Buttons */}
                    <div className='pt-2.5 border-t border-gray-100 dark:border-gray-700/60 flex items-center justify-between gap-1'>
                      <span className='text-[11px] font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1'>
                        <Zap size={12} />
                        <span>{qCount} câu</span>
                      </span>

                      <div className='flex items-center gap-1'>
                        <button
                          onClick={() => setSelectedDay(day)}
                          className='p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 hover:text-primary-600 text-xs font-semibold'
                          title='Xem chi tiết bài học'
                        >
                          <BookOpen size={14} />
                        </button>
                        <button
                          onClick={() => jumpToPracticeTopic(day.category.toLowerCase())}
                          className='p-1.5 rounded-lg bg-primary-50 dark:bg-primary-950/60 hover:bg-primary-100 text-primary-600 dark:text-primary-400 text-xs font-bold'
                          title='Luyện câu hỏi ngày này'
                        >
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 2: 21-TOPIC MASTER-DETAIL ENCYCLOPEDIA                         */}
        {/* ================================================================= */}
        {activeTab === 'encyclopedia' && (
          <div className='grid grid-cols-12 gap-5 sm:gap-6 items-start'>
            {/* Left Sidebar: 21 Topics Navigation */}
            <div className='col-span-12 lg:col-span-4 space-y-3 sticky top-20'>
              <div className='p-3.5 rounded-3xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xs space-y-3'>
                <div className='flex items-center justify-between px-1'>
                  <h3 className='font-black text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400'>
                    21 Chuyên Đề Ngữ Pháp Gốc
                  </h3>
                  <span className='text-xs font-bold text-primary-600 dark:text-primary-400'>
                    {(ENCYCLOPEDIA_DATA as EncyclopediaTopic[]).length} bài giảng
                  </span>
                </div>

                {/* Topics list with smooth scrolling */}
                <div className='space-y-1.5 max-h-[calc(100vh-230px)] overflow-y-auto pr-1'>
                  {(ENCYCLOPEDIA_DATA as EncyclopediaTopic[]).map((topic, idx) => {
                    const isActive = topic.id === activeTopicId

                    return (
                      <button
                        key={topic.id}
                        onClick={() => setActiveTopicId(topic.id)}
                        className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                          isActive
                            ? 'bg-primary-50 dark:bg-primary-950/60 border-primary-500 text-primary-900 dark:text-primary-200 shadow-xs'
                            : 'bg-gray-50/60 dark:bg-gray-850/60 border-transparent hover:border-gray-200 dark:hover:border-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <div className='flex items-center gap-2.5 min-w-0'>
                          <span
                            className={`w-6 h-6 rounded-lg text-[11px] font-black flex items-center justify-center shrink-0 ${
                              isActive
                                ? 'bg-primary-600 text-white'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                            }`}
                          >
                            {idx + 1}
                          </span>
                          <div className='min-w-0'>
                            <h4 className='font-bold text-xs sm:text-sm truncate'>
                              {topic.nameVi}
                            </h4>
                            <p className='text-[10px] text-gray-400 truncate'>{topic.nameEn}</p>
                          </div>
                        </div>

                        <span className='px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase shrink-0 bg-white/80 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700'>
                          {topic.category}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Right Pane: Deep Reader for Selected Topic */}
            <div className='col-span-12 lg:col-span-8 space-y-5'>
              {currentTopic ? (
                <div className='p-5 sm:p-7 rounded-3xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xs space-y-6'>
                  {/* Topic Hero Banner */}
                  <div className='space-y-3 pb-5 border-b border-gray-100 dark:border-gray-700/80'>
                    <div className='flex items-center justify-between flex-wrap gap-2'>
                      <div className='flex items-center gap-2'>
                        <span className='px-2.5 py-1 rounded-xl bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-primary-300 text-xs font-black uppercase'>
                          {currentTopic.category}
                        </span>
                        <span className='px-2.5 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-bold'>
                          {currentTopic.level}
                        </span>
                      </div>

                      <button
                        onClick={() => jumpToPracticeTopic(currentTopic.id)}
                        className='px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center gap-1.5'
                      >
                        <Zap size={14} />
                        <span>Luyện ngay câu hỏi của bài này</span>
                      </button>
                    </div>

                    <h2 className='text-xl sm:text-2xl font-black text-gray-900 dark:text-white tracking-tight'>
                      {currentTopic.nameVi}
                    </h2>
                    <p className='text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400'>
                      {currentTopic.nameEn}
                    </p>

                    <p className='text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed bg-primary-50/50 dark:bg-primary-950/30 p-3.5 rounded-2xl border border-primary-200/60 dark:border-primary-800/50'>
                      {currentTopic.overview}
                    </p>
                  </div>

                  {/* Core Formulas Section */}
                  {currentTopic.formulas && currentTopic.formulas.length > 0 && (
                    <div className='space-y-3'>
                      <div className='flex items-center gap-2 text-xs font-black uppercase tracking-wider text-gray-500 dark:text-gray-400'>
                        <Sparkles size={15} className='text-amber-500' />
                        <span>Cấu Trúc & Công Thức Cốt Lõi</span>
                      </div>

                      <div className='grid grid-cols-1 gap-2.5'>
                        {currentTopic.formulas.map((form, fIdx) => (
                          <div
                            key={fIdx}
                            className='p-3 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 font-mono text-xs sm:text-sm text-primary-700 dark:text-primary-300 font-bold flex items-center gap-2.5'
                          >
                            <span className='w-5 h-5 rounded-md bg-primary-100 dark:bg-primary-950 text-primary-600 flex items-center justify-center text-[10px] shrink-0'>
                              ✓
                            </span>
                            <span className='break-all'>{form}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Bilingual Real Examples */}
                  {currentTopic.examples && currentTopic.examples.length > 0 && (
                    <div className='space-y-3'>
                      <div className='flex items-center gap-2 text-xs font-black uppercase tracking-wider text-gray-500 dark:text-gray-400'>
                        <BookOpen size={15} className='text-indigo-500' />
                        <span>Ví Dụ Minh Họa Song Ngữ Đối Chiếu</span>
                      </div>

                      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                        {currentTopic.examples.map((ex, exIdx) => (
                          <div
                            key={exIdx}
                            className='p-3.5 rounded-2xl bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/50 space-y-1.5'
                          >
                            <div className='flex items-start justify-between gap-2'>
                              <p className='text-xs sm:text-sm font-bold text-gray-900 dark:text-white leading-relaxed'>
                                {ex.en}
                              </p>
                              <button
                                onClick={() => handlePronounce(ex.en, 'en')}
                                className='p-1 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-600 dark:text-indigo-300 shrink-0'
                                title='Nghe phát âm'
                              >
                                <Volume2 size={14} />
                              </button>
                            </div>
                            {ex.vi && (
                              <p className='text-xs text-gray-500 dark:text-gray-400 italic'>
                                {ex.vi}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Deep Handbook & Irregular Verbs Hub Link */}
                  <div className='p-5 rounded-3xl bg-gradient-to-r from-teal-500/10 via-emerald-500/10 to-cyan-500/10 border border-teal-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
                    <div className='space-y-1'>
                      <div className='flex items-center gap-2 text-sm font-bold text-teal-800 dark:text-teal-300'>
                        <BookMarked size={18} className='text-teal-600' />
                        <span>Bách Khoa Tra Cứu Toàn Thư & Từ Điển 360 Động Từ Bất Quy Tắc</span>
                      </div>
                      <p className='text-xs text-gray-600 dark:text-gray-300'>
                        Xem bảng đối chiếu bẫy đề thi ETS, 60+ công thức cú pháp mở rộng và tra cứu
                        V1-V2-V3 kèm phát âm.
                      </p>
                    </div>
                    <button
                      onClick={() => navigate('/toeic-grammar')}
                      className='px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 active:bg-teal-700 text-white text-xs font-bold shadow-md shadow-teal-600/20 flex items-center gap-2 shrink-0'
                    >
                      <span>Mở Cẩm Nang Toàn Thư</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className='p-8 text-center text-gray-500'>Vui lòng chọn một chuyên đề.</div>
              )}
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 3: 1,285 INTERACTIVE PRACTICE & EXAM ENGINE                   */}
        {/* ================================================================= */}
        {activeTab === 'practice' && (
          <div className='max-w-4xl mx-auto space-y-5'>
            {/* Filter & Score Bar */}
            <div className='p-4 rounded-3xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3'>
              {/* Topic & Level Dropdown */}
              <div className='flex items-center flex-wrap gap-2'>
                <select
                  value={practiceTopicFilter}
                  onChange={(e) => setPracticeTopicFilter(e.target.value)}
                  aria-label='Lọc theo chuyên đề'
                  className='px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 border-none text-xs font-bold text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-primary-500'
                >
                  <option value='all'>Tất cả chuyên đề (1.285 câu)</option>
                  {(ENCYCLOPEDIA_DATA as EncyclopediaTopic[]).map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.nameVi}
                    </option>
                  ))}
                </select>

                <select
                  value={practiceLevelFilter}
                  onChange={(e) => setPracticeLevelFilter(e.target.value)}
                  aria-label='Lọc theo cấp độ'
                  className='px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 border-none text-xs font-bold text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-primary-500'
                >
                  <option value='all'>Mọi cấp độ</option>
                  <option value='A1-A2 Foundation'>A1-A2 Foundation</option>
                  <option value='B1-B2 Intermediate'>B1-B2 Intermediate</option>
                  <option value='C1 / TOEIC 800+'>C1 / TOEIC 800+</option>
                </select>
              </div>

              {/* Score & Counter */}
              <div className='flex items-center gap-2 text-xs font-bold'>
                <span className='px-3 py-1.5 rounded-xl bg-primary-50 dark:bg-primary-950 text-primary-700 dark:text-primary-300'>
                  Câu {filteredQuestions.length > 0 ? currentExIndex + 1 : 0} /{' '}
                  {filteredQuestions.length}
                </span>

                <span className='px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'>
                  Đúng: {practiceScore.correct} / {practiceScore.total} (
                  {practiceScore.total > 0
                    ? Math.round((practiceScore.correct / practiceScore.total) * 100)
                    : 0}
                  %)
                </span>

                <button
                  onClick={handleResetPractice}
                  className='p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500'
                  title='Làm lại từ đầu'
                >
                  <RotateCcw size={14} />
                </button>
              </div>
            </div>

            {/* Question Card */}
            {currentExercise ? (
              <div className='p-6 sm:p-8 rounded-3xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm space-y-6'>
                {/* Question Top Tags */}
                <div className='flex items-center justify-between text-xs'>
                  <div className='flex items-center gap-2'>
                    <span className='px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-extrabold uppercase'>
                      {currentExercise.topicName || 'Ngữ Pháp Thực Chiến'}
                    </span>
                    <span className='px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 font-bold'>
                      {currentExercise.difficulty}
                    </span>
                  </div>

                  <button
                    onClick={() => handlePronounce(currentExercise.question, 'en')}
                    className='px-2.5 py-1 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-primary-50 text-gray-700 dark:text-gray-300 hover:text-primary-600 flex items-center gap-1.5 font-bold text-xs'
                  >
                    <Volume2 size={14} />
                    <span>Nghe câu hỏi</span>
                  </button>
                </div>

                {/* Question Text */}
                <div className='space-y-2'>
                  <h3 className='text-base sm:text-xl font-black text-gray-900 dark:text-white leading-relaxed font-sans'>
                    {currentExercise.question}
                  </h3>
                  {isAnswerChecked && currentExercise.translation && (
                    <p className='text-xs sm:text-sm text-gray-500 dark:text-gray-400 italic bg-gray-50 dark:bg-gray-900/40 p-2.5 rounded-xl border border-gray-200/50 dark:border-gray-700/50'>
                      💡 {currentExercise.translation}
                    </p>
                  )}
                </div>

                {/* Options 48px Touch-Safe Grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3.5'>
                  {currentExercise.options.map((opt: string, optIdx: number) => {
                    let btnStyle =
                      'border-gray-200 dark:border-gray-700 hover:border-primary-400 bg-gray-50/50 dark:bg-gray-900/40 text-gray-800 dark:text-gray-200'

                    if (selectedAnswer === optIdx && !isAnswerChecked) {
                      btnStyle =
                        'border-primary-500 bg-primary-50 dark:bg-primary-950 text-primary-700 dark:text-primary-300 ring-2 ring-primary-500/30'
                    }

                    if (isAnswerChecked) {
                      if (optIdx === currentExercise.correctAnswer) {
                        btnStyle =
                          'border-emerald-500 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500/30 font-bold'
                      } else if (selectedAnswer === optIdx) {
                        btnStyle =
                          'border-red-500 bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300'
                      } else {
                        btnStyle = 'opacity-40 border-gray-200 dark:border-gray-700'
                      }
                    }

                    const labels = ['A', 'B', 'C', 'D']

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(optIdx)}
                        className={`min-h-[48px] p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between gap-3 active:scale-[0.99] ${btnStyle}`}
                      >
                        <div className='flex items-center gap-3 min-w-0'>
                          <span className='w-7 h-7 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-black flex items-center justify-center text-xs shrink-0'>
                            {labels[optIdx]}
                          </span>
                          <span className='font-bold leading-snug break-words'>{opt}</span>
                        </div>
                        {isAnswerChecked && optIdx === currentExercise.correctAnswer && (
                          <CheckCircle2 size={20} className='text-emerald-500 shrink-0' />
                        )}
                        {isAnswerChecked &&
                          selectedAnswer === optIdx &&
                          optIdx !== currentExercise.correctAnswer && (
                            <XCircle size={20} className='text-red-500 shrink-0' />
                          )}
                      </button>
                    )
                  })}
                </div>

                {/* Bottom Submit Action */}
                <div className='flex items-center justify-end gap-3 pt-2'>
                  {!isAnswerChecked ? (
                    <button
                      onClick={handleCheckAnswer}
                      disabled={selectedAnswer === null}
                      className='min-h-[44px] px-6 py-2.5 rounded-2xl bg-primary-600 hover:bg-primary-500 active:bg-primary-700 text-white text-xs sm:text-sm font-black shadow-lg shadow-primary-600/30 transition-all disabled:opacity-40'
                    >
                      Kiểm tra đáp án
                    </button>
                  ) : (
                    <button
                      onClick={handleNextQuestion}
                      className='min-h-[44px] flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white text-xs sm:text-sm font-black shadow-lg shadow-emerald-600/30 transition-all'
                    >
                      <span>Câu tiếp theo</span>
                      <ArrowRight size={16} />
                    </button>
                  )}
                </div>

                {/* EXPANDABLE DETAILED EXPLANATION BOX */}
                {isAnswerChecked && (
                  <div className='mt-5 p-5 rounded-3xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/80 space-y-3 animate-fadeIn text-xs sm:text-sm'>
                    <div className='flex items-center gap-2 font-black text-indigo-900 dark:text-indigo-200 text-xs uppercase tracking-wider'>
                      <Lightbulb size={17} className='text-indigo-600 dark:text-indigo-400' />
                      <span>Phân Tích Ngữ Pháp & Lời Giải Chi Tiết</span>
                    </div>

                    <p className='text-gray-800 dark:text-gray-200 leading-relaxed font-medium'>
                      {currentExercise.detailedExplanation}
                    </p>

                    {currentExercise.examTrap && (
                      <div className='p-3 rounded-2xl bg-amber-500/10 border border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-200 text-xs font-semibold flex items-start gap-2'>
                        <AlertTriangle size={15} className='text-amber-600 shrink-0 mt-0.5' />
                        <span>{currentExercise.examTrap}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className='p-10 rounded-3xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-center text-gray-500 space-y-2'>
                <p className='font-bold text-sm'>
                  Không tìm thấy câu hỏi phù hợp với bộ lọc hiện tại.
                </p>
                <button
                  onClick={() => {
                    setPracticeTopicFilter('all')
                    setPracticeLevelFilter('all')
                    setSearchQuery('')
                  }}
                  className='text-xs font-bold text-primary-600 hover:underline'
                >
                  Xóa bộ lọc để xem toàn bộ 1.285 câu
                </button>
              </div>
            )}
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 4: RAPID HANDBOOK CHEATSHEET                                  */}
        {/* ================================================================= */}
        {activeTab === 'handbook' && (
          <div className='space-y-6'>
            <div className='p-4 sm:p-5 rounded-3xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/60 flex items-center justify-between gap-4'>
              <div className='space-y-1'>
                <h3 className='font-black text-sm text-purple-900 dark:text-purple-200'>
                  Cẩm Nang Tra Cứu Công Thức & Dấu Hiệu Nhận Biết
                </h3>
                <p className='text-xs text-purple-700 dark:text-purple-300'>
                  Bảng tổng hợp nhanh các công thức ngữ pháp cốt lõi trích xuất từ 21 chuyên đề
                  chuẩn quốc tế.
                </p>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {(ENCYCLOPEDIA_DATA as EncyclopediaTopic[])
                .filter((t) => {
                  if (!searchQuery) return true
                  return (
                    t.nameVi.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    t.formulas.some((f: string) =>
                      f.toLowerCase().includes(searchQuery.toLowerCase()),
                    )
                  )
                })
                .map((topic, tIdx) => (
                  <div
                    key={tIdx}
                    className='p-5 rounded-3xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xs space-y-4 flex flex-col justify-between hover:shadow-md transition-all'
                  >
                    <div className='space-y-3'>
                      <div className='flex items-center justify-between'>
                        <span className='px-2.5 py-1 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-xs font-black uppercase'>
                          {topic.category}
                        </span>
                        <span className='text-[10px] font-bold text-gray-400'>
                          {topic.formulas.length} công thức
                        </span>
                      </div>

                      <h3 className='text-base font-black text-gray-900 dark:text-white'>
                        {topic.nameVi}
                      </h3>
                      <p className='text-xs text-gray-500 dark:text-gray-400 font-semibold'>
                        {topic.nameEn}
                      </p>

                      <div className='space-y-2'>
                        {topic.formulas.slice(0, 4).map((form: string, fIdx: number) => (
                          <div
                            key={fIdx}
                            className='p-2.5 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700/80 font-mono text-xs text-primary-700 dark:text-primary-300 font-bold'
                          >
                            {form}
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => jumpToEncyclopediaTopic(topic.id)}
                      className='w-full py-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-primary-50 hover:text-primary-600 text-gray-700 dark:text-gray-300 text-xs font-bold transition-all flex items-center justify-center gap-1.5'
                    >
                      <span>Xem toàn văn chuyên đề</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}
      </main>

      {/* 3. MODAL CHI TIẾT NGÀY TRONG LỘ TRÌNH 30 NGÀY */}
      {selectedDay && (
        <div className='fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4'>
          <div className='bg-white dark:bg-gray-850 rounded-3xl border border-gray-200 dark:border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col animate-scaleUp'>
            {/* Modal Header */}
            <div className='p-5 sm:p-6 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between sticky top-0 bg-white/95 dark:bg-gray-850/95 backdrop-blur-md z-10'>
              <div className='flex items-center gap-2.5'>
                <span className='px-2.5 py-1 rounded-xl bg-primary-600 text-white text-xs font-black'>
                  DAY {selectedDay.day}
                </span>
                <h2 className='text-base sm:text-lg font-black text-gray-900 dark:text-white'>
                  {selectedDay.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedDay(null)}
                className='w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 flex items-center justify-center font-bold'
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className='p-5 sm:p-6 space-y-5 flex-1'>
              <div className='text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-gray-900/60 p-4 rounded-2xl border border-gray-200/80 dark:border-gray-700/60'>
                {selectedDay.summary}
              </div>

              {/* Core Formulas */}
              <div className='space-y-2.5'>
                <h4 className='text-xs font-black uppercase text-gray-400 tracking-wider'>
                  Công Thức Trọng Tâm (Trang {selectedDay.pageBookRef})
                </h4>
                {selectedDay.coreFormulas.map((form, fIdx) => (
                  <div
                    key={fIdx}
                    className='p-3.5 rounded-2xl bg-primary-50/50 dark:bg-primary-950/30 border border-primary-100 dark:border-primary-900/40 space-y-1.5'
                  >
                    <div className='font-mono font-bold text-xs sm:text-sm text-primary-700 dark:text-primary-300'>
                      {form.formula}
                    </div>
                    <div className='text-xs text-gray-600 dark:text-gray-300'>{form.meaning}</div>
                  </div>
                ))}
              </div>

              {/* Modal Actions */}
              <div className='pt-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-end gap-3'>
                <button
                  onClick={() => {
                    const d = selectedDay
                    setSelectedDay(null)
                    jumpToPracticeTopic(d.category.toLowerCase())
                  }}
                  className='px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-600/20 flex items-center gap-1.5'
                >
                  <Zap size={14} />
                  <span>Luyện {getDayQuestionCount(selectedDay.day)} câu hỏi của ngày này</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GrammarMaster
