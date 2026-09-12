// ============================================================================
// MODULE: ĐẤU TRƯỜNG LUYỆN THI TOEIC ETS 2017 - 2026 & FULL TEST 120 PHÚT
// Chuẩn Study4, Santa TOEIC & Prep.vn | Tích hợp 1.796 câu hỏi thực tế & barem điểm ETS
// Tích hợp 141 tài liệu gốc từ 3 Sheet Google Drive (Kho đề ETS, Sách TOEIC, Chuyên ngành)
// ============================================================================

import { useState, useMemo, useEffect, useRef } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import {
  CheckCircle2,
  XCircle,
  ChevronRight,
  ChevronLeft,
  Lightbulb,
  AlertTriangle,
  Flag,
  Clock,
  Bookmark,
  Sparkles,
  Layers,
  BookOpen,
  Award,
  Filter,
  Play,
  Pause,
  FileText,
  Eye,
  EyeOff,
  Headphones,
  ExternalLink,
  Trophy,
  Target,
  RotateCcw,
  Search,
  Zap,
  Check,
  FolderOpen
} from 'lucide-react'
import { Button } from '@/components/common/Button'
import qBankRaw from '@/data/toeic_7parts_comprehensive_bank.json'
import tacticsRaw from '@/data/toeic_exam_tactics.json'
import examSeriesRaw from '@/data/toeic_exam_series.json'
import toeicDocsRaw from '@/data/tai_lieu_toeic.json'
import { calculateToeicScore, ToeicScoreResult } from '@/utils/toeicScoring'

export interface UnifiedToeicQuestion {
  id: string
  part: number
  partName: string
  questionNumber?: number
  groupId?: string
  topicId?: string
  topicName?: string
  question: string
  passageText?: string
  passageType?: string
  audioUrl?: string
  imageUrl?: string
  options: string[]
  correctAnswer: number
  transcript?: string
  detailedExplanation?: string
  examTrap?: string
  translation?: string
}

export interface ExamTactic {
  id: string
  trickNumber: number
  part: number
  title: string
  category: string
  description: string
  examples: string[]
}

export interface ExamSeries {
  id: string
  year: number
  title: string
  subtitle: string
  difficulty: string
  badge: string
  badgeColor: string
  stars: number
  totalTests: number
  driveUrl: string
  description: string
  highlights: string[]
}

export interface ToeicDocItem {
  id: number
  title: string
  driveUrl: string
}

const ALL_QUESTIONS: UnifiedToeicQuestion[] = qBankRaw as UnifiedToeicQuestion[]
const ALL_TACTICS: ExamTactic[] = tacticsRaw as ExamTactic[]
const ALL_SERIES: ExamSeries[] = examSeriesRaw as ExamSeries[]
const ALL_TOEIC_DOCS: ToeicDocItem[] = toeicDocsRaw as ToeicDocItem[]

const PART_CONFIG = [
  { part: 1, name: 'Part 1: Mô tả ảnh', count: '12 câu', desc: 'Photographs - Nhìn ảnh chọn câu miêu tả đúng nhất (Audio MP3)' },
  { part: 2, name: 'Part 2: Hỏi & Đáp', count: '47 câu', desc: 'Question-Response - Nghe câu hỏi và chọn phản hồi (Audio MP3)' },
  { part: 3, name: 'Part 3: Hội thoại', count: '60 câu', desc: 'Conversations - Nghe đối thoại nhiều người & biểu đồ (Audio MP3)' },
  { part: 4, name: 'Part 4: Độc thoại', count: '42 câu', desc: 'Short Talks - Nghe bài nói, thông báo, tin nhắn thoại (Audio MP3)' },
  { part: 5, name: 'Part 5: Hoàn thành câu', count: '1.285 câu', desc: 'Incomplete Sentences - 17 chuyên đề ngữ pháp & từ vựng' },
  { part: 6, name: 'Part 6: Điền đoạn văn', count: '80 câu', desc: 'Text Completion - Đọc hiểu văn bản & điền từ vào chỗ trống' },
  { part: 7, name: 'Part 7: Đọc hiểu', count: '270 câu', desc: 'Reading Comprehension - Đọc hiểu đoạn đơn, đoạn kép, đoạn ba' },
]

// Hàm tạo danh sách câu hỏi đề thi mô phỏng chuẩn ETS
function generateExamQuestions(seriesId: string, mode: 'full' | 'mini'): UnifiedToeicQuestion[] {
  const seriesIndex = Math.max(0, ALL_SERIES.findIndex((s) => s.id === seriesId))
  const offset = seriesIndex * 7

  const getPartQuestions = (partNum: number, count: number) => {
    const partPool = ALL_QUESTIONS.filter((q) => q.part === partNum)
    if (partPool.length === 0) return []
    const start = (offset * 3) % partPool.length
    const result: UnifiedToeicQuestion[] = []
    for (let i = 0; i < count; i++) {
      result.push(partPool[(start + i) % partPool.length])
    }
    return result
  }

  if (mode === 'mini') {
    // Mini Test: 50 câu (25 LC + 25 RC)
    const p1 = getPartQuestions(1, 2)
    const p2 = getPartQuestions(2, 6)
    const p3 = getPartQuestions(3, 9)
    const p4 = getPartQuestions(4, 8)
    const p5 = getPartQuestions(5, 8)
    const p6 = getPartQuestions(6, 4)
    const p7 = getPartQuestions(7, 13)
    return [...p1, ...p2, ...p3, ...p4, ...p5, ...p6, ...p7]
  }

  // Full Test: 200 câu (100 LC + 100 RC)
  const p1 = getPartQuestions(1, 6)
  const p2 = getPartQuestions(2, 25)
  const p3 = getPartQuestions(3, 39)
  const p4 = getPartQuestions(4, 30)
  const p5 = getPartQuestions(5, 30)
  const p6 = getPartQuestions(6, 16)
  const p7 = getPartQuestions(7, 54)
  return [...p1, ...p2, ...p3, ...p4, ...p5, ...p6, ...p7]
}

export function Toeic7PartsArena() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  // Tab View điều hướng chính
  const [activeView, setActiveView] = useState<'series' | 'practice' | 'exam' | 'results' | 'mistakes' | 'resources'>('series')

  // --- STATE: KHO ĐỀ ETS ---
  const [selectedYearFilter, setSelectedYearFilter] = useState<string>('all')
  const [seriesSearchTerm, setSeriesSearchTerm] = useState<string>('')

  // --- STATE: TÀI LIỆU SHEET 1 ---
  const [docSearchTerm, setDocSearchTerm] = useState<string>('')

  // --- STATE: THI THỬ MÔ PHỎNG ---
  const [currentExamSeries, setCurrentExamSeries] = useState<ExamSeries>(ALL_SERIES[1] || ALL_SERIES[0])
  const [examMode, setExamMode] = useState<'full' | 'mini'>('full')
  const [examQuestions, setExamQuestions] = useState<UnifiedToeicQuestion[]>([])
  const [examCurrentIndex, setExamCurrentIndex] = useState<number>(0)
  const [examAnswers, setExamAnswers] = useState<Record<string, number>>({})
  const [examFlagged, setExamFlagged] = useState<Set<number>>(new Set())
  const [examTimeRemaining, setExamTimeRemaining] = useState<number>(7200) // 120 phút cho full, 30 phút cho mini
  const [isExamRunning, setIsExamRunning] = useState<boolean>(false)
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false)
  const [examResult, setExamResult] = useState<ToeicScoreResult | null>(null)
  const [examPaletteFilter, setExamPaletteFilter] = useState<'all' | 'unanswered' | 'flagged'>('all')

  // --- STATE: LUYỆN TẬP TỪNG PART ---
  const paramPart = searchParams.get('part')
  const paramTopic = searchParams.get('topic')

  const [selectedPart, setSelectedPart] = useState<number>(() => {
    if (paramPart) {
      const p = parseInt(paramPart, 10)
      if (p >= 1 && p <= 7) return p
    }
    return 1
  })

  const [selectedTopic, setSelectedTopic] = useState<string>(() => {
    return paramTopic || 'All'
  })

  const [practiceIndex, setPracticeIndex] = useState<number>(0)
  const [practiceAnswers, setPracticeAnswers] = useState<Record<number, number>>({})
  const [practiceFlagged, setPracticeFlagged] = useState<Set<number>>(new Set())
  const [practiceShowExplanation, setPracticeShowExplanation] = useState<boolean>(false)
  const [practiceShowTranscript, setPracticeShowTranscript] = useState<boolean>(false)
  const [practicePaletteFilter, setPracticePaletteFilter] = useState<'all' | 'unanswered' | 'flagged'>('all')

  // --- STATE: SỔ TAY CÂU HỎI SAI ---
  const [savedMistakes, setSavedMistakes] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('toeic_saved_mistakes')
      return saved ? new Set(JSON.parse(saved)) : new Set()
    } catch {
      return new Set()
    }
  })
  const [mistakeFilterPart, setMistakeFilterPart] = useState<number | 'all'>('all')
  const [reviewFilter, setReviewFilter] = useState<'all' | 'wrong' | 'correct'>('all')

  // Audio Player State chung
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [playbackRate, setPlaybackRate] = useState<number>(1.0)
  const [audioDuration, setAudioDuration] = useState<number>(0)
  const [audioCurrentTime, setAudioCurrentTime] = useState<number>(0)

  // Lưu sổ tay sai vào localStorage
  useEffect(() => {
    try {
      localStorage.setItem('toeic_saved_mistakes', JSON.stringify(Array.from(savedMistakes)))
    } catch {
      // ignore
    }
  }, [savedMistakes])

  // Lắng nghe URL params
  useEffect(() => {
    if (paramTopic) {
      setSelectedTopic(paramTopic)
      setSelectedPart(5)
      setActiveView('practice')
    }
    if (paramPart) {
      const p = parseInt(paramPart, 10)
      if (p >= 1 && p <= 7) {
        setSelectedPart(p)
        setActiveView('practice')
      }
    }
  }, [paramTopic, paramPart])

  // Topics for Part 5
  const topicsSummary = useMemo(() => {
    const map: Record<string, number> = {}
    ALL_QUESTIONS.filter((q) => q.part === 5).forEach((q) => {
      const t = q.topicName || 'Chuyên đề chung'
      map[t] = (map[t] || 0) + 1
    })
    return Object.entries(map).sort((a, b) => b[1] - a[1])
  }, [])

  // Relevant tactics for selected Part
  const currentPartTactics = useMemo(() => {
    return ALL_TACTICS.filter((t) => t.part === selectedPart)
  }, [selectedPart])

  // Filter questions for practice mode
  const filteredPracticeQuestions = useMemo(() => {
    let list = ALL_QUESTIONS.filter((q) => q.part === selectedPart)
    if (selectedPart === 5 && selectedTopic !== 'All') {
      list = list.filter((q) => q.topicName === selectedTopic || q.topicId === selectedTopic)
    }
    return list
  }, [selectedPart, selectedTopic])

  const currentPracticeQ = filteredPracticeQuestions[practiceIndex] || filteredPracticeQuestions[0]

  // Filter series in series explorer
  const filteredSeries = useMemo(() => {
    return ALL_SERIES.filter((s) => {
      const matchYear =
        selectedYearFilter === 'all'
          ? true
          : selectedYearFilter === '2025'
          ? s.year === 2025
          : selectedYearFilter === '2024'
          ? s.year === 2024
          : selectedYearFilter === '2023'
          ? s.year === 2023
          : selectedYearFilter === '2022'
          ? s.year === 2022
          : selectedYearFilter === '2021'
          ? s.year === 2021
          : selectedYearFilter === '2020'
          ? s.year === 2020
          : selectedYearFilter === '2019'
          ? s.year === 2019
          : selectedYearFilter === 'sparta'
          ? s.id.includes('sparta')
          : true

      const matchSearch =
        seriesSearchTerm === '' ||
        s.title.toLowerCase().includes(seriesSearchTerm.toLowerCase()) ||
        s.subtitle.toLowerCase().includes(seriesSearchTerm.toLowerCase()) ||
        s.description.toLowerCase().includes(seriesSearchTerm.toLowerCase())

      return matchYear && matchSearch
    })
  }, [selectedYearFilter, seriesSearchTerm])

  // Filter Sheet 1 resources
  const filteredDocs = useMemo(() => {
    return ALL_TOEIC_DOCS.filter((d) => {
      if (!docSearchTerm) return true
      return d.title.toLowerCase().includes(docSearchTerm.toLowerCase())
    })
  }, [docSearchTerm])

  // Countdown timer cho phòng thi
  useEffect(() => {
    if (!isExamRunning || activeView !== 'exam') return

    const timer = setInterval(() => {
      setExamTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          handleFinishExam()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isExamRunning, activeView, examQuestions, examAnswers])

  // Sync audio source
  const currentAudioUrl = useMemo(() => {
    if (activeView === 'exam') {
      return examQuestions[examCurrentIndex]?.audioUrl
    }
    if (activeView === 'practice') {
      return currentPracticeQ?.audioUrl
    }
    return undefined
  }, [activeView, examQuestions, examCurrentIndex, currentPracticeQ])

  useEffect(() => {
    if (audioRef.current && currentAudioUrl) {
      const src = currentAudioUrl.startsWith('/') ? currentAudioUrl : `/${currentAudioUrl}`
      audioRef.current.src = src
      audioRef.current.playbackRate = playbackRate
      audioRef.current.load()
      setIsPlaying(false)
    }
  }, [currentAudioUrl, playbackRate])

  const togglePlayAudio = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))
    }
  }

  const handleSeekAudio = (delta: number) => {
    if (!audioRef.current) return
    audioRef.current.currentTime = Math.max(0, Math.min(audioDuration, audioRef.current.currentTime + delta))
  }

  const handleChangePlaybackRate = (rate: number) => {
    setPlaybackRate(rate)
    if (audioRef.current) {
      audioRef.current.playbackRate = rate
    }
  }

  // Bắt đầu thi thử (Full Test hoặc Mini Test)
  const handleStartExam = (series: ExamSeries, mode: 'full' | 'mini') => {
    setCurrentExamSeries(series)
    setExamMode(mode)
    const questions = generateExamQuestions(series.id, mode)
    setExamQuestions(questions)
    setExamCurrentIndex(0)
    setExamAnswers({})
    setExamFlagged(new Set())
    setExamTimeRemaining(mode === 'full' ? 7200 : 1800)
    setIsExamRunning(true)
    setShowSubmitModal(false)
    setActiveView('exam')
  }

  // Nộp bài thi và tính điểm ETS
  const handleFinishExam = () => {
    setIsExamRunning(false)
    setShowSubmitModal(false)
    const scoreResult = calculateToeicScore(
      examAnswers,
      examQuestions.map((q) => ({ id: q.id, part: q.part, correctAnswer: q.correctAnswer }))
    )
    setExamResult(scoreResult)
    setActiveView('results')
  }

  // Toggle gắn cờ trong lúc thi
  const handleToggleExamFlag = () => {
    setExamFlagged((prev) => {
      const next = new Set(prev)
      if (next.has(examCurrentIndex)) next.delete(examCurrentIndex)
      else next.add(examCurrentIndex)
      return next
    })
  }

  // Lưu câu sai
  const handleToggleSaveMistake = (qId: string) => {
    setSavedMistakes((prev) => {
      const next = new Set(prev)
      if (next.has(qId)) next.delete(qId)
      else next.add(qId)
      return next
    })
  }

  // Lưu tất cả câu sai trong bài thi vào sổ tay
  const handleSaveAllExamMistakes = () => {
    const wrongIds = examQuestions
      .filter((q) => examAnswers[q.id] !== undefined && examAnswers[q.id] !== q.correctAnswer)
      .map((q) => q.id)

    setSavedMistakes((prev) => {
      const next = new Set(prev)
      wrongIds.forEach((id) => next.add(id))
      return next
    })
  }

  // Format thời gian HH:MM:SS hoặc MM:SS
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    if (hrs > 0) {
      return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Questions in mistakes notebook
  const mistakeQuestions = useMemo(() => {
    return ALL_QUESTIONS.filter((q) => savedMistakes.has(q.id)).filter((q) =>
      mistakeFilterPart === 'all' ? true : q.part === mistakeFilterPart
    )
  }, [savedMistakes, mistakeFilterPart])

  return (
    <div className='max-w-7xl mx-auto px-3 sm:px-6 py-6 pb-24 text-gray-800 dark:text-gray-100 font-sans'>
      {/* Audio element ẩn */}
      <audio
        ref={audioRef}
        onTimeUpdate={(e) => setAudioCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setAudioDuration(e.currentTarget.duration)}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Header Banner */}
      <div className='bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-indigo-950/20 mb-6 relative overflow-hidden'>
        <div className='relative z-10 max-w-3xl'>
          <div className='inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold tracking-wide uppercase text-blue-100 mb-3'>
            <Layers size={14} /> Hệ Thống Luyện Thi TOEIC Chuẩn ETS 2017 - 2026 & Study4
          </div>
          <h1 className='text-2xl sm:text-4xl font-extrabold tracking-tight mb-2'>
            Đấu Trường Luyện Đề TOEIC 7 Part
          </h1>
          <p className='text-blue-100 text-sm sm:text-base leading-relaxed'>
            Luyện thi toàn diện <strong className='text-white font-bold underline'>1.796 câu hỏi thực tế</strong>, 9 bộ đề ETS từ 2017 đến 2026, mô phỏng phòng thi 120 phút, tính điểm barem chuẩn IIG/ETS và kho 141 tài liệu Google Drive gốc.
          </p>
        </div>
        <div className='absolute -right-8 -bottom-10 opacity-15 pointer-events-none'>
          <Award size={260} />
        </div>
      </div>

      {/* Top Main Navigation Tabs */}
      <div className='bg-white dark:bg-gray-800/80 rounded-2xl p-2 border border-gray-200 dark:border-gray-700/60 shadow-sm mb-6'>
        <div className='flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none'>
          <button
            onClick={() => setActiveView('series')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 min-h-[44px] ${
              activeView === 'series'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-gray-100 dark:bg-gray-750 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
            }`}
          >
            <BookOpen size={16} />
            <span>Kho Đề ETS 2017 - 2026</span>
            <span className='px-1.5 py-0.5 rounded-md text-[10px] font-semibold bg-white/20 text-white'>9 Bộ Đề</span>
          </button>

          <button
            onClick={() => setActiveView('practice')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 min-h-[44px] ${
              activeView === 'practice'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-gray-100 dark:bg-gray-750 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
            }`}
          >
            <Sparkles size={16} />
            <span>Luyện Thi Từng Part (1 - 7)</span>
            <span className='px-1.5 py-0.5 rounded-md text-[10px] font-semibold bg-white/20 text-white'>1.796 Câu</span>
          </button>

          {isExamRunning && (
            <button
              onClick={() => setActiveView('exam')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 min-h-[44px] ${
                activeView === 'exam'
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                  : 'bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 hover:bg-rose-200 animate-pulse'
              }`}
            >
              <Clock size={16} />
              <span>Phòng Thi ({formatTime(examTimeRemaining)})</span>
            </button>
          )}

          {examResult && (
            <button
              onClick={() => setActiveView('results')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 min-h-[44px] ${
                activeView === 'results'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'bg-gray-100 dark:bg-gray-750 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
              }`}
            >
              <Trophy size={16} />
              <span>Điểm Thi ETS ({examResult.totalScaled}/990)</span>
            </button>
          )}

          <button
            onClick={() => setActiveView('mistakes')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 min-h-[44px] ${
              activeView === 'mistakes'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-gray-100 dark:bg-gray-750 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
            }`}
          >
            <Bookmark size={16} />
            <span>Sổ Tay Câu Hỏi Sai</span>
            <span className='px-1.5 py-0.5 rounded-md text-[10px] font-semibold bg-amber-500 text-white'>
              {savedMistakes.size}
            </span>
          </button>

          <button
            onClick={() => setActiveView('resources')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 min-h-[44px] ${
              activeView === 'resources'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-gray-100 dark:bg-gray-750 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
            }`}
          >
            <FolderOpen size={16} />
            <span>Kho Sách & Tài Liệu Gốc</span>
            <span className='px-1.5 py-0.5 rounded-md text-[10px] font-semibold bg-indigo-500 text-white'>
              {ALL_TOEIC_DOCS.length} Sách
            </span>
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* VIEW 1: KHO ĐỀ ETS 2017 - 2026 (SERIES EXPLORER)                       */}
      {/* ===================================================================== */}
      {activeView === 'series' && (
        <div className='space-y-6'>
          {/* Filter Bar & Search */}
          <div className='bg-white dark:bg-gray-800/80 rounded-2xl p-4 border border-gray-200 dark:border-gray-700/60 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4'>
            <div className='flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 scrollbar-none'>
              {[
                { id: 'all', label: 'Tất Cả Bộ Đề' },
                { id: '2025', label: 'ETS 2025/2026' },
                { id: '2024', label: 'ETS 2024' },
                { id: '2023', label: 'ETS 2023' },
                { id: '2022', label: 'ETS 2022' },
                { id: '2021', label: 'ETS 2021' },
                { id: '2020', label: 'ETS 2020' },
                { id: 'sparta', label: 'Sparta 850+' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedYearFilter(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors min-h-[36px] ${
                    selectedYearFilter === item.id
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-750 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className='relative w-full md:w-72'>
              <Search className='absolute left-3 top-2.5 text-gray-400' size={16} />
              <input
                type='text'
                placeholder='Tìm kiếm bộ đề...'
                value={seriesSearchTerm}
                onChange={(e) => setSeriesSearchTerm(e.target.value)}
                className='w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 dark:text-gray-200 min-h-[36px]'
              />
            </div>
          </div>

          {/* Grid Bộ Đề ETS */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {filteredSeries.map((series) => (
              <div
                key={series.id}
                className='bg-white dark:bg-gray-800/90 rounded-2xl p-5 border border-gray-200 dark:border-gray-700/60 shadow-sm hover:shadow-md transition-all flex flex-col justify-between'
              >
                <div>
                  <div className='flex items-center justify-between gap-2 mb-3'>
                    <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold text-white ${series.badgeColor}`}>
                      {series.badge}
                    </span>
                    <div className='flex items-center text-amber-400 text-xs gap-0.5'>
                      {'★'.repeat(series.stars)}
                    </div>
                  </div>

                  <h3 className='font-bold text-gray-900 dark:text-white text-base leading-snug mb-1'>
                    {series.title}
                  </h3>
                  <p className='text-xs text-indigo-600 dark:text-indigo-400 font-medium mb-3'>{series.subtitle}</p>
                  <p className='text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-4'>
                    {series.description}
                  </p>

                  <div className='bg-gray-50 dark:bg-gray-900/60 rounded-xl p-3 mb-4 space-y-1.5'>
                    <div className='text-[11px] font-semibold text-gray-500 dark:text-gray-400'>
                      Độ khó & Mục tiêu: <span className='text-gray-800 dark:text-gray-200 font-bold'>{series.difficulty}</span>
                    </div>
                    <div className='text-[11px] font-semibold text-gray-500 dark:text-gray-400'>
                      Quy mô: <span className='text-gray-800 dark:text-gray-200 font-bold'>{series.totalTests} Đề Full Test</span>
                    </div>
                  </div>

                  <div className='space-y-1 mb-5'>
                    {series.highlights.map((h, i) => (
                      <div key={i} className='flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-300'>
                        <Check size={12} className='text-emerald-500 shrink-0' />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className='space-y-2 pt-3 border-t border-gray-100 dark:border-gray-700/60'>
                  <div className='grid grid-cols-2 gap-2'>
                    <Button
                      variant='primary'
                      onClick={() => handleStartExam(series, 'full')}
                      className='text-xs py-2 px-2 bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center gap-1 min-h-[40px]'
                    >
                      <Clock size={13} /> Thi Thử 200 Câu
                    </Button>
                    <Button
                      variant='outline'
                      onClick={() => handleStartExam(series, 'mini')}
                      className='text-xs py-2 px-2 border-indigo-400 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-950 flex items-center justify-center gap-1 min-h-[40px]'
                    >
                      <Zap size={13} /> Mini Test 50 Câu
                    </Button>
                  </div>

                  <div className='flex items-center gap-2'>
                    <Button
                      variant='ghost'
                      onClick={() => {
                        setSelectedPart(1)
                        setActiveView('practice')
                      }}
                      className='text-xs py-1.5 px-2 flex-1 text-gray-600 dark:text-gray-300 min-h-[36px]'
                    >
                      <BookOpen size={13} className='mr-1' /> Luyện Theo Part
                    </Button>

                    <a
                      href={series.driveUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='inline-flex items-center justify-center gap-1 text-xs py-1.5 px-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium min-h-[36px]'
                    >
                      <ExternalLink size={12} /> Drive Gốc
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* VIEW 2: KHO SÁCH & TÀI LIỆU GỐC (SHEET 1 - 73 TÀI LIỆU)               */}
      {/* ===================================================================== */}
      {activeView === 'resources' && (
        <div className='space-y-6'>
          <div className='bg-white dark:bg-gray-800/80 rounded-2xl p-5 border border-gray-200 dark:border-gray-700/60 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
            <div>
              <h2 className='text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2'>
                <FolderOpen size={20} className='text-indigo-600' /> Kho Giáo Trình & Tài Liệu Gốc ({ALL_TOEIC_DOCS.length} Sách & Bộ Đề)
              </h2>
              <p className='text-xs text-gray-500 dark:text-gray-400 mt-0.5'>
                Tổng hợp trọn vẹn toàn bộ các sách, tài liệu tự học, khoá luyện thi TOEIC từ file Google Sheet trích xuất gốc.
              </p>
            </div>

            <div className='relative w-full sm:w-72'>
              <Search className='absolute left-3 top-2.5 text-gray-400' size={16} />
              <input
                type='text'
                placeholder='Tìm sách, giáo trình...'
                value={docSearchTerm}
                onChange={(e) => setDocSearchTerm(e.target.value)}
                className='w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 dark:text-gray-200 min-h-[36px]'
              />
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {filteredDocs.map((doc) => (
              <div
                key={doc.id}
                className='bg-white dark:bg-gray-800/80 rounded-2xl p-4 border border-gray-200 dark:border-gray-700/60 shadow-sm hover:shadow-md transition-all flex flex-col justify-between'
              >
                <div>
                  <div className='flex items-center gap-2 mb-2'>
                    <span className='px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-indigo-100 text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300'>
                      TÀI LIỆU #{doc.id}
                    </span>
                  </div>
                  <h4 className='font-bold text-sm text-gray-900 dark:text-white mb-3 line-clamp-2'>
                    {doc.title}
                  </h4>
                </div>

                <div className='pt-3 border-t border-gray-100 dark:border-gray-700/60'>
                  <a
                    href={doc.driveUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/50 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold transition-colors min-h-[38px]'
                  >
                    <ExternalLink size={13} /> Mở Thư Mục Google Drive
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* VIEW 3: PHÒNG THI THỬ MÔ PHỎNG (EXAM SIMULATION)                      */}
      {/* ===================================================================== */}
      {activeView === 'exam' && examQuestions.length > 0 && (
        <div className='space-y-5'>
          {/* Header Phòng Thi Cố Định */}
          <div className='bg-white dark:bg-gray-800/90 rounded-2xl p-4 border border-gray-200 dark:border-gray-700/60 shadow-sm sticky top-0 z-30 flex flex-wrap items-center justify-between gap-4'>
            <div>
              <div className='flex items-center gap-2'>
                <span className='px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300'>
                  {examMode === 'full' ? 'FULL TEST 120 PHÚT' : 'MINI TEST 30 PHÚT'}
                </span>
                <h2 className='font-extrabold text-sm sm:text-base text-gray-900 dark:text-white'>
                  {currentExamSeries.title}
                </h2>
              </div>
              <div className='text-xs text-gray-500 dark:text-gray-400 mt-0.5'>
                Đã làm: <strong className='text-indigo-600 dark:text-indigo-400'>{Object.keys(examAnswers).length}</strong> / {examQuestions.length} câu
              </div>
            </div>

            {/* Đồng hồ đếm ngược */}
            <div className='flex items-center gap-3'>
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono font-bold text-base sm:text-lg border min-h-[44px] ${
                  examTimeRemaining <= 300
                    ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-600 border-rose-300 dark:border-rose-800 animate-pulse'
                    : examTimeRemaining <= 900
                    ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-600 border-amber-300 dark:border-amber-800'
                    : 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 border-indigo-200 dark:border-indigo-800'
                }`}
              >
                <Clock size={18} />
                <span>{formatTime(examTimeRemaining)}</span>
              </div>

              <Button
                variant='primary'
                onClick={() => setShowSubmitModal(true)}
                className='text-xs py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold min-h-[44px]'
              >
                Nộp Bài Thi
              </Button>
            </div>
          </div>

          {/* Khung Làm Bài Thi */}
          <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
            {/* Cột Trái & Giữa: Nội dung câu hỏi (Chiếm 3 cột) */}
            <div className='lg:col-span-3 space-y-5'>
              {(() => {
                const q = examQuestions[examCurrentIndex]
                if (!q) return null
                const selectedAns = examAnswers[q.id]
                const isFlagged = examFlagged.has(examCurrentIndex)

                return (
                  <div className='bg-white dark:bg-gray-800/80 rounded-2xl p-6 border border-gray-200 dark:border-gray-700/60 shadow-sm'>
                    {/* Thanh tiêu đề câu hỏi */}
                    <div className='flex items-center justify-between pb-4 mb-4 border-b border-gray-100 dark:border-gray-700/60'>
                      <div className='flex items-center gap-2'>
                        <span className='px-3 py-1 rounded-lg text-xs font-extrabold bg-indigo-600 text-white'>
                          Câu {examCurrentIndex + 1} / {examQuestions.length}
                        </span>
                        <span className='text-xs font-bold text-gray-500 dark:text-gray-400'>
                          Part {q.part}: {PART_CONFIG.find((p) => p.part === q.part)?.name}
                        </span>
                      </div>

                      <button
                        onClick={handleToggleExamFlag}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors min-h-[38px] ${
                          isFlagged
                            ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 border border-amber-300'
                            : 'bg-gray-100 dark:bg-gray-750 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
                        }`}
                      >
                        <Flag size={14} fill={isFlagged ? 'currentColor' : 'none'} />
                        <span>{isFlagged ? 'Đã gắn cờ' : 'Gắn cờ'}</span>
                      </button>
                    </div>

                    {/* Audio Player cho Part 1 - 4 trong lúc thi */}
                    {q.part <= 4 && q.audioUrl && (
                      <div className='bg-indigo-50/60 dark:bg-indigo-950/30 rounded-2xl p-4 border border-indigo-100 dark:border-indigo-900/40 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4'>
                        <div className='flex items-center gap-3'>
                          <button
                            onClick={togglePlayAudio}
                            className='w-12 h-12 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shadow-md shadow-indigo-600/30 transition-transform active:scale-95'
                          >
                            {isPlaying ? <Pause size={20} /> : <Play size={20} className='ml-0.5' />}
                          </button>
                          <div>
                            <div className='text-xs font-bold text-gray-800 dark:text-gray-200'>
                              Audio Đề Thi Chuẩn Part {q.part}
                            </div>
                            <div className='text-[11px] text-gray-500 font-mono'>
                              {formatTime(Math.floor(audioCurrentTime))} / {formatTime(Math.floor(audioDuration))}
                            </div>
                          </div>
                        </div>

                        <div className='flex items-center gap-2'>
                          <button
                            onClick={() => handleSeekAudio(-3)}
                            className='px-3 py-1.5 rounded-lg text-xs font-bold bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 text-gray-700 dark:text-gray-200 min-h-[36px]'
                          >
                            -3s
                          </button>
                          <button
                            onClick={() => handleSeekAudio(3)}
                            className='px-3 py-1.5 rounded-lg text-xs font-bold bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 text-gray-700 dark:text-gray-200 min-h-[36px]'
                          >
                            +3s
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Ảnh mô tả Part 1 */}
                    {q.part === 1 && q.imageUrl && (
                      <div className='mb-6 flex justify-center'>
                        <img
                          src={q.imageUrl}
                          alt='Part 1 Photograph'
                          className='max-h-72 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm object-contain'
                        />
                      </div>
                    )}

                    {/* Đoạn văn đọc hiểu Part 6 & Part 7 */}
                    {(q.part === 6 || q.part === 7) && q.passageText && (
                      <div className='bg-gray-50 dark:bg-gray-900/60 rounded-2xl p-5 border border-gray-200 dark:border-gray-700/60 mb-6 font-serif text-sm leading-relaxed whitespace-pre-line text-gray-800 dark:text-gray-200 max-h-96 overflow-y-auto'>
                        {q.passageType && (
                          <div className='text-[11px] font-sans font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2'>
                            [{q.passageType}]
                          </div>
                        )}
                        {q.passageText}
                      </div>
                    )}

                    {/* Nội dung câu hỏi */}
                    <div className='text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-6 leading-relaxed'>
                      {q.question}
                    </div>

                    {/* 4 Phương Án Lựa Chọn (Chế độ thi - Không hiện đúng/sai ngay) */}
                    <div className='space-y-3 mb-6'>
                      {q.options.map((opt, optIdx) => {
                        const label = String.fromCharCode(65 + optIdx)
                        const isChosen = selectedAns === optIdx

                        return (
                          <button
                            key={optIdx}
                            onClick={() => {
                              setExamAnswers((prev) => ({ ...prev, [q.id]: optIdx }))
                            }}
                            className={`w-full text-left p-4 rounded-xl text-sm sm:text-base font-medium transition-all flex items-center justify-between border min-h-[50px] ${
                              isChosen
                                ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-600 text-indigo-950 dark:text-indigo-200 ring-2 ring-indigo-500/20 shadow-sm'
                                : 'bg-gray-50 dark:bg-gray-750/50 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200'
                            }`}
                          >
                            <div className='flex items-center gap-3'>
                              <span
                                className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 border ${
                                  isChosen
                                    ? 'bg-indigo-600 text-white border-indigo-600'
                                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600'
                                }`}
                              >
                                {label}
                              </span>
                              <span>{opt}</span>
                            </div>
                          </button>
                        )
                      })}
                    </div>

                    {/* Điều hướng Trước / Kế tiếp */}
                    <div className='flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700/60'>
                      <Button
                        variant='outline'
                        disabled={examCurrentIndex === 0}
                        onClick={() => setExamCurrentIndex((prev) => Math.max(0, prev - 1))}
                        className='text-xs py-2 px-4 min-h-[40px]'
                      >
                        <ChevronLeft size={16} className='mr-1' /> Câu Trước
                      </Button>

                      <Button
                        variant='primary'
                        disabled={examCurrentIndex === examQuestions.length - 1}
                        onClick={() => setExamCurrentIndex((prev) => Math.min(examQuestions.length - 1, prev + 1))}
                        className='text-xs py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white min-h-[40px]'
                      >
                        Câu Kế Tiếp <ChevronRight size={16} className='ml-1' />
                      </Button>
                    </div>
                  </div>
                )
              })()}
            </div>

            {/* Cột Phải: Bảng Hoa Tiêu Đề Thi (Palette) */}
            <div className='space-y-4'>
              <div className='bg-white dark:bg-gray-800/80 rounded-2xl p-4 border border-gray-200 dark:border-gray-700/60 shadow-sm'>
                <div className='flex items-center justify-between mb-3'>
                  <h3 className='font-bold text-sm text-gray-900 dark:text-white'>Bảng Câu Hỏi</h3>
                  <span className='text-xs text-gray-500 dark:text-gray-400'>
                    {Object.keys(examAnswers).length} / {examQuestions.length}
                  </span>
                </div>

                {/* Filter palette */}
                <div className='flex items-center gap-1 mb-3'>
                  {(['all', 'unanswered', 'flagged'] as const).map((ft) => (
                    <button
                      key={ft}
                      onClick={() => setExamPaletteFilter(ft)}
                      className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-colors min-h-[30px] ${
                        examPaletteFilter === ft
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                      }`}
                    >
                      {ft === 'all' && 'Tất cả'}
                      {ft === 'unanswered' && 'Chưa làm'}
                      {ft === 'flagged' && 'Có cờ'}
                    </button>
                  ))}
                </div>

                {/* Question Nodes Grid */}
                <div className='grid grid-cols-5 gap-1.5 max-h-[500px] overflow-y-auto p-1'>
                  {examQuestions.map((q, idx) => {
                    const isCur = idx === examCurrentIndex
                    const isAnswered = examAnswers[q.id] !== undefined
                    const isFlagged = examFlagged.has(idx)

                    if (examPaletteFilter === 'unanswered' && isAnswered) return null
                    if (examPaletteFilter === 'flagged' && !isFlagged) return null

                    let btnClass =
                      'h-9 rounded-xl font-bold text-xs flex items-center justify-center relative border transition-all '
                    if (isCur) {
                      btnClass += 'ring-2 ring-indigo-500 ring-offset-2 '
                    }
                    if (isAnswered) {
                      btnClass += 'bg-indigo-600 text-white border-indigo-700'
                    } else {
                      btnClass += 'bg-gray-100 dark:bg-gray-750 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700'
                    }

                    return (
                      <button key={q.id} onClick={() => setExamCurrentIndex(idx)} className={btnClass}>
                        <span>{idx + 1}</span>
                        {isFlagged && (
                          <div className='absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full ring-2 ring-white dark:ring-gray-800' />
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Modal Xác Nhận Nộp Bài */}
          {showSubmitModal && (
            <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4'>
              <div className='bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-gray-200 dark:border-gray-700'>
                <div className='flex items-center gap-3 text-amber-500 mb-4'>
                  <AlertTriangle size={28} />
                  <h3 className='text-lg font-extrabold text-gray-900 dark:text-white'>Xác Nhận Nộp Bài Thi</h3>
                </div>

                <p className='text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed'>
                  Bạn đã trả lời <strong className='text-indigo-600 dark:text-indigo-400 font-bold'>{Object.keys(examAnswers).length}</strong> trên tổng số{' '}
                  <strong className='font-bold'>{examQuestions.length}</strong> câu hỏi.
                </p>

                {examQuestions.length - Object.keys(examAnswers).length > 0 && (
                  <div className='p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800/50 text-xs text-amber-700 dark:text-amber-300 mb-6'>
                    ⚠️ Bạn vẫn còn {examQuestions.length - Object.keys(examAnswers).length} câu chưa trả lời. Bạn có chắc chắn muốn nộp bài để tính điểm không?
                  </div>
                )}

                <div className='flex items-center justify-end gap-3'>
                  <Button variant='outline' onClick={() => setShowSubmitModal(false)} className='text-xs py-2 px-4 min-h-[40px]'>
                    Tiếp Tục Làm Bài
                  </Button>
                  <Button
                    variant='primary'
                    onClick={handleFinishExam}
                    className='text-xs py-2 px-5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold min-h-[40px]'
                  >
                    Nộp Bài Ngay
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ===================================================================== */}
      {/* VIEW 4: KẾT QUẢ ĐIỂM THI CHUẨN ETS 990 (SCORE REPORT)                  */}
      {/* ===================================================================== */}
      {activeView === 'results' && examResult && (
        <div className='space-y-6'>
          {/* Hero Score Card */}
          <div className='bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden'>
            <div className='relative z-10 flex flex-col md:flex-row items-center justify-between gap-8'>
              <div>
                <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-indigo-100 mb-3'>
                  <Trophy size={14} className='text-amber-300' /> Báo Cáo Điểm Thi Chuẩn ETS
                </div>
                <h2 className='text-2xl sm:text-3xl font-black mb-1'>{currentExamSeries.title}</h2>
                <p className='text-xs sm:text-sm text-indigo-200 mb-4'>
                  Cấp độ: <strong className='text-white font-bold'>{examResult.cefrLevel}</strong> - {examResult.proficiencyTitle}
                </p>
                <div className='flex flex-wrap items-center gap-3 text-xs'>
                  <span className='px-3 py-1.5 rounded-xl bg-white/10 font-semibold'>
                    Tổng đúng: {examResult.listeningRaw + examResult.readingRaw} / {examQuestions.length} câu ({examResult.percentage}%)
                  </span>
                  <span className='px-3 py-1.5 rounded-xl bg-white/10 font-semibold'>
                    Listening: {examResult.listeningScaled} / 495
                  </span>
                  <span className='px-3 py-1.5 rounded-xl bg-white/10 font-semibold'>
                    Reading: {examResult.readingScaled} / 495
                  </span>
                </div>
              </div>

              {/* Big Scaled Score Dial */}
              <div className='w-44 h-44 rounded-full border-8 border-indigo-400/40 bg-white/10 backdrop-blur-md flex flex-col items-center justify-center shrink-0 shadow-2xl'>
                <span className='text-xs uppercase font-bold text-indigo-200'>Điểm Quy Đổi ETS</span>
                <span className='text-4xl sm:text-5xl font-black tracking-tight text-white my-1'>
                  {examResult.totalScaled}
                </span>
                <span className='text-xs font-semibold text-amber-300'>Thang Điểm 990</span>
              </div>
            </div>
          </div>

          {/* Radar & Part Breakdown */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* 7 Parts Performance */}
            <div className='bg-white dark:bg-gray-800/80 rounded-2xl p-6 border border-gray-200 dark:border-gray-700/60 shadow-sm'>
              <h3 className='font-bold text-sm sm:text-base text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
                <Layers size={18} className='text-indigo-600' /> Tỷ Lệ Chính Xác Từng Part
              </h3>
              <div className='space-y-3'>
                {PART_CONFIG.map((p) => {
                  const data = examResult.partBreakdown[p.part] || { correct: 0, total: 0, percentage: 0 }
                  return (
                    <div key={p.part} className='space-y-1'>
                      <div className='flex items-center justify-between text-xs font-semibold'>
                        <span className='text-gray-700 dark:text-gray-300'>{p.name}</span>
                        <span className='text-gray-900 dark:text-white font-bold'>
                          {data.correct} / {data.total} ({data.percentage}%)
                        </span>
                      </div>
                      <div className='h-2.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden'>
                        <div
                          className={`h-full rounded-full transition-all ${
                            data.percentage >= 80 ? 'bg-emerald-500' : data.percentage >= 60 ? 'bg-blue-500' : 'bg-amber-500'
                          }`}
                          style={{ width: `${data.percentage}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* AI Diagnostic & Recommendations */}
            <div className='bg-white dark:bg-gray-800/80 rounded-2xl p-6 border border-gray-200 dark:border-gray-700/60 shadow-sm flex flex-col justify-between'>
              <div>
                <h3 className='font-bold text-sm sm:text-base text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
                  <Sparkles size={18} className='text-purple-600' /> Chẩn Đoán AI & Lộ Trình Cải Thiện
                </h3>
                <div className='space-y-3 mb-6'>
                  {examResult.recommendations.map((rec, i) => (
                    <div
                      key={i}
                      className='p-3 rounded-xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/50 text-xs text-purple-900 dark:text-purple-200 flex items-start gap-2.5'
                    >
                      <Target size={16} className='text-purple-600 shrink-0 mt-0.5' />
                      <span className='leading-relaxed'>{rec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className='flex flex-wrap items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-700/60'>
                <Button
                  variant='primary'
                  onClick={() => handleStartExam(currentExamSeries, examMode)}
                  className='text-xs py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white min-h-[38px]'
                >
                  <RotateCcw size={14} className='mr-1' /> Làm Lại Đề Này
                </Button>
                <Button
                  variant='outline'
                  onClick={handleSaveAllExamMistakes}
                  className='text-xs py-2 px-4 border-amber-400 text-amber-700 dark:text-amber-300 hover:bg-amber-50 min-h-[38px]'
                >
                  <Bookmark size={14} className='mr-1' /> Lưu Tất Cả Câu Sai
                </Button>
                <Button
                  variant='ghost'
                  onClick={() => setActiveView('series')}
                  className='text-xs py-2 px-4 min-h-[38px]'
                >
                  Chọn Đề Khác
                </Button>
              </div>
            </div>
          </div>

          {/* Question-by-Question Review */}
          <div className='bg-white dark:bg-gray-800/80 rounded-2xl p-6 border border-gray-200 dark:border-gray-700/60 shadow-sm'>
            <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6'>
              <h3 className='font-bold text-base text-gray-900 dark:text-white flex items-center gap-2'>
                <FileText size={18} className='text-indigo-600' /> Chi Tiết Từng Câu Hỏi & Lời Giải
              </h3>

              <div className='flex items-center gap-1.5'>
                {(['all', 'wrong', 'correct'] as const).map((rf) => (
                  <button
                    key={rf}
                    onClick={() => setReviewFilter(rf)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors min-h-[36px] ${
                      reviewFilter === rf
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                    }`}
                  >
                    {rf === 'all' && 'Tất cả'}
                    {rf === 'wrong' && 'Câu sai'}
                    {rf === 'correct' && 'Câu đúng'}
                  </button>
                ))}
              </div>
            </div>

            <div className='space-y-4 max-h-[700px] overflow-y-auto pr-2'>
              {examQuestions.map((q, idx) => {
                const userChoice = examAnswers[q.id]
                const isCorrect = userChoice === q.correctAnswer
                const isSaved = savedMistakes.has(q.id)

                if (reviewFilter === 'wrong' && isCorrect) return null
                if (reviewFilter === 'correct' && !isCorrect) return null

                return (
                  <div
                    key={q.id}
                    className={`p-5 rounded-2xl border transition-all ${
                      isCorrect
                        ? 'border-emerald-200 dark:border-emerald-800/50 bg-emerald-50/30 dark:bg-emerald-950/20'
                        : 'border-rose-200 dark:border-rose-800/50 bg-rose-50/30 dark:bg-rose-950/20'
                    }`}
                  >
                    <div className='flex items-center justify-between mb-3'>
                      <div className='flex items-center gap-2'>
                        <span
                          className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs text-white ${
                            isCorrect ? 'bg-emerald-600' : 'bg-rose-600'
                          }`}
                        >
                          {idx + 1}
                        </span>
                        <span className='text-xs font-bold text-gray-500 dark:text-gray-400'>
                          Part {q.part}: {q.partName}
                        </span>
                      </div>

                      <button
                        onClick={() => handleToggleSaveMistake(q.id)}
                        className={`p-1.5 rounded-lg text-xs ${
                          isSaved ? 'text-amber-500' : 'text-gray-400 hover:text-amber-500'
                        }`}
                      >
                        <Bookmark size={16} fill={isSaved ? 'currentColor' : 'none'} />
                      </button>
                    </div>

                    <div className='text-sm sm:text-base font-bold text-gray-900 dark:text-white mb-3'>
                      {q.question}
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3'>
                      {q.options.map((opt, oIdx) => {
                        const label = String.fromCharCode(65 + oIdx)
                        const isChosen = userChoice === oIdx
                        const isTarget = q.correctAnswer === oIdx

                        let optClass = 'p-2.5 rounded-xl text-xs font-medium border flex items-center gap-2 '
                        if (isTarget) {
                          optClass += 'bg-emerald-100 dark:bg-emerald-900/60 border-emerald-500 text-emerald-900 dark:text-emerald-100 font-bold'
                        } else if (isChosen && !isTarget) {
                          optClass += 'bg-rose-100 dark:bg-rose-900/60 border-rose-500 text-rose-900 dark:text-rose-100 font-bold line-through'
                        } else {
                          optClass += 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300'
                        }

                        return (
                          <div key={oIdx} className={optClass}>
                            <span className='font-bold'>{label}.</span>
                            <span>{opt}</span>
                          </div>
                        )
                      })}
                    </div>

                    {q.detailedExplanation && (
                      <div className='bg-white/80 dark:bg-gray-800/80 rounded-xl p-3 border border-gray-200 dark:border-gray-700 text-xs text-gray-700 dark:text-gray-300 leading-relaxed mt-2'>
                        <div className='font-bold text-indigo-600 dark:text-indigo-400 mb-1 flex items-center gap-1'>
                          <Lightbulb size={13} /> Lời giải chi tiết:
                        </div>
                        {q.detailedExplanation}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* VIEW 5: SỔ TAY CÂU HỎI SAI (MISTAKES NOTEBOOK)                         */}
      {/* ===================================================================== */}
      {activeView === 'mistakes' && (
        <div className='space-y-6'>
          <div className='bg-white dark:bg-gray-800/80 rounded-2xl p-5 border border-gray-200 dark:border-gray-700/60 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
            <div>
              <h2 className='text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2'>
                <Bookmark size={20} className='text-amber-500' /> Sổ Tay Câu Hỏi Sai ({savedMistakes.size} câu)
              </h2>
              <p className='text-xs text-gray-500 dark:text-gray-400 mt-0.5'>
                Tập trung luyện lại các câu bạn đã làm sai trong phòng thi hoặc khi luyện Part để xóa sạch lỗ hổng kiến thức.
              </p>
            </div>

            <div className='flex items-center gap-2'>
              <select
                value={mistakeFilterPart}
                onChange={(e) => setMistakeFilterPart(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                className='px-3 py-2 rounded-xl text-xs bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 min-h-[38px]'
              >
                <option value='all'>Tất cả các Part</option>
                {[1, 2, 3, 4, 5, 6, 7].map((p) => (
                  <option key={p} value={p}>
                    Part {p}
                  </option>
                ))}
              </select>

              {savedMistakes.size > 0 && (
                <Button
                  variant='ghost'
                  onClick={() => setSavedMistakes(new Set())}
                  className='text-xs py-2 px-3 text-rose-600 hover:bg-rose-50 min-h-[38px]'
                >
                  Xóa tất cả
                </Button>
              )}
            </div>
          </div>

          {mistakeQuestions.length === 0 ? (
            <div className='bg-white dark:bg-gray-800/80 rounded-2xl p-12 text-center border border-gray-200 dark:border-gray-700/60'>
              <CheckCircle2 size={48} className='mx-auto text-emerald-500 mb-3' />
              <h3 className='text-base font-bold text-gray-900 dark:text-white mb-1'>Không Có Câu Hỏi Sai Nào</h3>
              <p className='text-xs text-gray-500 dark:text-gray-400 max-w-sm mx-auto'>
                Sổ tay câu hỏi sai của bạn đang trống. Khi làm bài thi thử hoặc luyện đề, hãy bấm biểu tượng dấu trang để lưu các câu bạn muốn xem lại!
              </p>
            </div>
          ) : (
            <div className='space-y-4'>
              {mistakeQuestions.map((q, idx) => (
                <div
                  key={q.id}
                  className='bg-white dark:bg-gray-800/80 rounded-2xl p-5 border border-gray-200 dark:border-gray-700/60 shadow-sm'
                >
                  <div className='flex items-center justify-between mb-3'>
                    <div className='flex items-center gap-2'>
                      <span className='px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200'>
                        Câu {idx + 1}
                      </span>
                      <span className='text-xs font-bold text-gray-500 dark:text-gray-400'>
                        Part {q.part}: {q.partName}
                      </span>
                    </div>

                    <button
                      onClick={() => handleToggleSaveMistake(q.id)}
                      className='text-xs font-semibold text-rose-500 hover:underline min-h-[36px] px-2 flex items-center'
                    >
                      Đã nắm vững (Xóa)
                    </button>
                  </div>

                  <div className='text-base font-bold text-gray-900 dark:text-white mb-3'>{q.question}</div>

                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4'>
                    {q.options.map((opt, oIdx) => {
                      const isCorrect = oIdx === q.correctAnswer
                      return (
                        <div
                          key={oIdx}
                          className={`p-3 rounded-xl text-xs font-medium border ${
                            isCorrect
                              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 text-emerald-800 dark:text-emerald-200 font-bold'
                              : 'bg-gray-50 dark:bg-gray-750 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          <span className='font-bold mr-1.5'>{String.fromCharCode(65 + oIdx)}.</span>
                          <span>{opt}</span>
                        </div>
                      )
                    })}
                  </div>

                  {q.detailedExplanation && (
                    <div className='bg-indigo-50/50 dark:bg-indigo-950/30 rounded-xl p-3 border border-indigo-100 dark:border-indigo-900/40 text-xs text-gray-700 dark:text-gray-300 leading-relaxed'>
                      <strong className='text-indigo-600 dark:text-indigo-400'>Giải thích: </strong>
                      {q.detailedExplanation}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ===================================================================== */}
      {/* VIEW 6: LUYỆN THI TỪNG PART (PRACTICE BY PART)                        */}
      {/* ===================================================================== */}
      {activeView === 'practice' && (
        <div className='space-y-6'>
          {/* 7 Part Selector Tabs */}
          <div className='bg-white dark:bg-gray-800/80 rounded-2xl p-3 border border-gray-200 dark:border-gray-700/60 shadow-sm'>
            <div className='flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none'>
              {PART_CONFIG.map((p) => {
                const isSelected = selectedPart === p.part
                return (
                  <button
                    key={p.part}
                    onClick={() => {
                      setSelectedPart(p.part)
                      setPracticeIndex(0)
                      setPracticeAnswers({})
                      setPracticeShowExplanation(false)
                      if (p.part !== 5) setSelectedTopic('All')
                    }}
                    className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 min-h-[44px] ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                        : 'bg-gray-100 dark:bg-gray-750 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
                    }`}
                  >
                    <span>{p.name}</span>
                    <span
                      className={`px-1.5 py-0.5 rounded-md text-[10px] font-semibold ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                      }`}
                    >
                      {p.count}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Briefing Card for Selected Part */}
          <div className='bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/40 dark:via-purple-950/30 dark:to-pink-950/30 p-5 rounded-2xl border border-indigo-200/60 dark:border-indigo-800/40'>
            <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-3'>
              <div>
                <h3 className='font-bold text-gray-900 dark:text-white text-base sm:text-lg flex items-center gap-2'>
                  {selectedPart <= 4 ? <Headphones size={20} className='text-indigo-600' /> : <FileText size={20} className='text-indigo-600' />}
                  {PART_CONFIG.find((x) => x.part === selectedPart)?.name}
                </h3>
                <p className='text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-0.5'>
                  {PART_CONFIG.find((x) => x.part === selectedPart)?.desc}
                </p>
              </div>
              <div className='flex items-center gap-2 shrink-0'>
                {currentPartTactics.length > 0 && (
                  <Button
                    variant='outline'
                    onClick={() => navigate(`/toeic-tactics`)}
                    className='text-xs py-1.5 px-3 border-indigo-400 text-indigo-700 dark:text-indigo-300 min-h-[36px]'
                  >
                    <Award size={14} className='mr-1' /> Xem {currentPartTactics.length} Mẹo Part {selectedPart}
                  </Button>
                )}
              </div>
            </div>

            {/* Chuyên đề ngữ pháp cho Part 5 */}
            {selectedPart === 5 && (
              <div className='mt-4 pt-4 border-t border-indigo-200/50 dark:border-indigo-800/30'>
                <div className='text-xs font-bold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1.5'>
                  <Filter size={14} className='text-indigo-600' /> Lọc theo 17 chuyên đề ngữ pháp Part 5:
                </div>
                <div className='flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1'>
                  <button
                    onClick={() => {
                      setSelectedTopic('All')
                      setPracticeIndex(0)
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors min-h-[32px] ${
                      selectedTopic === 'All'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Tất cả (1.285 câu)
                  </button>
                  {topicsSummary.map(([topic, count]) => (
                    <button
                      key={topic}
                      onClick={() => {
                        setSelectedTopic(topic)
                        setPracticeIndex(0)
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors min-h-[32px] ${
                        selectedTopic === topic
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {topic} ({count})
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Main Practice Area */}
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
            {/* Question Card (2 Cols) */}
            <div className='lg:col-span-2 space-y-6'>
              {currentPracticeQ && (
                <div className='bg-white dark:bg-gray-800/80 rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700/60 shadow-sm'>
                  {/* Top bar question header */}
                  <div className='flex items-center justify-between pb-4 mb-5 border-b border-gray-100 dark:border-gray-700/60'>
                    <div className='flex items-center gap-2'>
                      <span className='px-3 py-1 rounded-lg text-xs font-extrabold bg-indigo-600 text-white shadow-sm'>
                        Câu {practiceIndex + 1} / {filteredPracticeQuestions.length}
                      </span>
                      {currentPracticeQ.topicName && (
                        <span className='text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-md'>
                          {currentPracticeQ.topicName}
                        </span>
                      )}
                    </div>

                    <div className='flex items-center gap-2'>
                      <button
                        onClick={() => {
                          setPracticeFlagged((prev) => {
                            const next = new Set(prev)
                            if (next.has(practiceIndex)) next.delete(practiceIndex)
                            else next.add(practiceIndex)
                            return next
                          })
                        }}
                        className={`p-2 rounded-xl text-xs font-semibold transition-colors min-h-[38px] ${
                          practiceFlagged.has(practiceIndex)
                            ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 border border-amber-300'
                            : 'bg-gray-100 dark:bg-gray-750 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
                        }`}
                        title='Gắn cờ xem lại'
                      >
                        <Flag size={16} fill={practiceFlagged.has(practiceIndex) ? 'currentColor' : 'none'} />
                      </button>

                      <button
                        onClick={() => handleToggleSaveMistake(currentPracticeQ.id)}
                        className={`p-2 rounded-xl text-xs font-semibold transition-colors min-h-[38px] ${
                          savedMistakes.has(currentPracticeQ.id)
                            ? 'bg-amber-500 text-white shadow-sm'
                            : 'bg-gray-100 dark:bg-gray-750 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
                        }`}
                        title='Lưu vào sổ tay câu sai'
                      >
                        <Bookmark size={16} fill={savedMistakes.has(currentPracticeQ.id) ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                  </div>

                  {/* Study4 Audio Player cho LC */}
                  {selectedPart <= 4 && currentPracticeQ.audioUrl && (
                    <div className='bg-indigo-50/60 dark:bg-indigo-950/30 rounded-2xl p-4 border border-indigo-100 dark:border-indigo-900/40 mb-6'>
                      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                        <div className='flex items-center gap-3'>
                          <button
                            onClick={togglePlayAudio}
                            className='w-12 h-12 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shadow-md shadow-indigo-600/30 transition-transform active:scale-95 shrink-0'
                          >
                            {isPlaying ? <Pause size={22} /> : <Play size={22} className='ml-0.5' />}
                          </button>
                          <div>
                            <div className='text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5'>
                              <Headphones size={14} className='text-indigo-600' /> Audio Đề Thi Chuẩn ETS
                            </div>
                            <div className='text-[11px] text-gray-500 font-mono'>
                              {formatTime(Math.floor(audioCurrentTime))} / {formatTime(Math.floor(audioDuration))}
                            </div>
                          </div>
                        </div>

                        {/* Controls: -3s, +3s, speed */}
                        <div className='flex items-center gap-2 flex-wrap'>
                          <button
                            onClick={() => handleSeekAudio(-3)}
                            className='px-2.5 py-1.5 rounded-lg text-xs font-bold bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 text-gray-700 dark:text-gray-200 min-h-[36px]'
                          >
                            -3s
                          </button>
                          <button
                            onClick={() => handleSeekAudio(3)}
                            className='px-2.5 py-1.5 rounded-lg text-xs font-bold bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 text-gray-700 dark:text-gray-200 min-h-[36px]'
                          >
                            +3s
                          </button>

                          <div className='flex items-center gap-1 bg-white dark:bg-gray-800 p-1 rounded-lg border border-gray-200 dark:border-gray-700'>
                            {[0.75, 1.0, 1.25].map((rate) => (
                              <button
                                key={rate}
                                onClick={() => handleChangePlaybackRate(rate)}
                                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  playbackRate === rate ? 'bg-indigo-600 text-white' : 'text-gray-600 dark:text-gray-300'
                                }`}
                              >
                                {rate}x
                              </button>
                            ))}
                          </div>

                          <button
                            onClick={() => setPracticeShowTranscript((prev) => !prev)}
                            className='p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 min-h-[36px]'
                            title={practiceShowTranscript ? 'Ẩn Lời Thoại' : 'Hiện Lời Thoại (Transcript)'}
                          >
                            {practiceShowTranscript ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>

                      {practiceShowTranscript && currentPracticeQ.transcript && (
                        <div className='mt-4 pt-3 border-t border-indigo-100 dark:border-indigo-900/40 text-xs text-gray-700 dark:text-gray-300 font-serif leading-relaxed whitespace-pre-line'>
                          <span className='font-bold text-indigo-600 font-sans block mb-1'>Lời thoại (Transcript):</span>
                          {currentPracticeQ.transcript}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Ảnh Part 1 */}
                  {selectedPart === 1 && currentPracticeQ.imageUrl && (
                    <div className='mb-6 flex justify-center'>
                      <img
                        src={currentPracticeQ.imageUrl}
                        alt='Part 1'
                        className='max-h-80 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm object-contain'
                      />
                    </div>
                  )}

                  {/* Đoạn văn đọc hiểu Part 6 & 7 */}
                  {(selectedPart === 6 || selectedPart === 7) && currentPracticeQ.passageText && (
                    <div className='bg-gray-50 dark:bg-gray-900/60 rounded-2xl p-5 border border-gray-200 dark:border-gray-700/60 mb-6 font-serif text-sm leading-relaxed whitespace-pre-line text-gray-800 dark:text-gray-200 max-h-96 overflow-y-auto'>
                      {currentPracticeQ.passageType && (
                        <div className='text-[11px] font-sans font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2'>
                          [{currentPracticeQ.passageType}]
                        </div>
                      )}
                      {currentPracticeQ.passageText}
                    </div>
                  )}

                  {/* Câu hỏi */}
                  <div className='text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-6 leading-relaxed'>
                    {currentPracticeQ.question}
                  </div>

                  {/* 4 Phương án A, B, C, D */}
                  <div className='space-y-3 mb-6'>
                    {currentPracticeQ.options.map((opt, optIdx) => {
                      const label = String.fromCharCode(65 + optIdx)
                      const userAns = practiceAnswers[practiceIndex]
                      const isChosen = userAns === optIdx
                      const isCorrect = currentPracticeQ.correctAnswer === optIdx

                      let btnStyle =
                        'w-full text-left p-4 rounded-2xl text-sm sm:text-base font-medium transition-all flex items-center justify-between border min-h-[50px] '

                      if (userAns !== undefined) {
                        if (isCorrect) {
                          btnStyle += 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-950 dark:text-emerald-100 font-bold'
                        } else if (isChosen && !isCorrect) {
                          btnStyle += 'bg-rose-50 dark:bg-rose-950/50 border-rose-500 text-rose-950 dark:text-rose-100 font-bold'
                        } else {
                          btnStyle += 'bg-gray-50 dark:bg-gray-750/30 border-gray-200 dark:border-gray-700 opacity-60 text-gray-600'
                        }
                      } else {
                        btnStyle +=
                          'bg-gray-50 dark:bg-gray-750/50 border-gray-200 dark:border-gray-700 hover:bg-gray-100 text-gray-800 dark:text-gray-200'
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => {
                            setPracticeAnswers((prev) => ({ ...prev, [practiceIndex]: optIdx }))
                            setPracticeShowExplanation(true)
                          }}
                          className={btnStyle}
                        >
                          <div className='flex items-center gap-3'>
                            <span
                              className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 border ${
                                userAns !== undefined && isCorrect
                                  ? 'bg-emerald-600 text-white border-emerald-600'
                                  : userAns !== undefined && isChosen
                                  ? 'bg-rose-600 text-white border-rose-600'
                                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600'
                              }`}
                            >
                              {label}
                            </span>
                            <span>{opt}</span>
                          </div>
                          {userAns !== undefined && isCorrect && <CheckCircle2 size={20} className='text-emerald-500' />}
                          {userAns !== undefined && isChosen && !isCorrect && <XCircle size={20} className='text-rose-500' />}
                        </button>
                      )
                    })}
                  </div>

                  {/* Lời giải chi tiết Study4 */}
                  {practiceShowExplanation && (
                    <div className='bg-gradient-to-br from-indigo-50/90 to-purple-50/90 dark:from-indigo-950/40 dark:to-purple-950/40 rounded-2xl p-5 border border-indigo-200 dark:border-indigo-800/50 space-y-3 mb-6'>
                      <div className='flex items-center justify-between'>
                        <h4 className='font-bold text-sm text-indigo-900 dark:text-indigo-200 flex items-center gap-2'>
                          <Lightbulb size={16} className='text-amber-500' /> Phân Tích & Lời Giải Chi Tiết Study4
                        </h4>
                        <span className='text-xs font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-900/60 px-2.5 py-1 rounded-lg'>
                          Đáp án đúng: {String.fromCharCode(65 + currentPracticeQ.correctAnswer)}
                        </span>
                      </div>

                      {currentPracticeQ.translation && (
                        <div className='text-xs text-gray-700 dark:text-gray-300 leading-relaxed'>
                          <strong className='text-indigo-700 dark:text-indigo-300'>Dịch nghĩa: </strong>
                          {currentPracticeQ.translation}
                        </div>
                      )}

                      {currentPracticeQ.detailedExplanation && (
                        <div className='text-xs text-gray-700 dark:text-gray-300 leading-relaxed'>
                          <strong className='text-indigo-700 dark:text-indigo-300'>Phân tích ngữ pháp: </strong>
                          {currentPracticeQ.detailedExplanation}
                        </div>
                      )}

                      {currentPracticeQ.examTrap && (
                        <div className='p-3 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-800 dark:text-amber-200 flex items-start gap-2'>
                          <AlertTriangle size={15} className='text-amber-600 shrink-0 mt-0.5' />
                          <div>
                            <strong>Cảnh báo bẫy đề thi: </strong>
                            {currentPracticeQ.examTrap}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Chuyển câu Trước / Kế tiếp */}
                  <div className='flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700/60'>
                    <Button
                      variant='outline'
                      disabled={practiceIndex === 0}
                      onClick={() => {
                        setPracticeIndex((prev) => Math.max(0, prev - 1))
                        setPracticeShowExplanation(false)
                      }}
                      className='text-xs py-2 px-4 min-h-[40px]'
                    >
                      <ChevronLeft size={16} className='mr-1' /> Câu Trước
                    </Button>

                    <Button
                      variant='primary'
                      disabled={practiceIndex === filteredPracticeQuestions.length - 1}
                      onClick={() => {
                        setPracticeIndex((prev) => Math.min(filteredPracticeQuestions.length - 1, prev + 1))
                        setPracticeShowExplanation(false)
                      }}
                      className='text-xs py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white min-h-[40px]'
                    >
                      Câu Kế Tiếp <ChevronRight size={16} className='ml-1' />
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Bảng hoa tiêu câu hỏi (1 Col) */}
            <div>
              <div className='bg-white dark:bg-gray-800/80 rounded-2xl p-5 border border-gray-200 dark:border-gray-700/60 shadow-sm'>
                <div className='flex items-center justify-between mb-3'>
                  <h3 className='font-bold text-sm text-gray-900 dark:text-white'>Bảng Hoa Tiêu</h3>
                  <span className='text-xs text-gray-500'>
                    {Object.keys(practiceAnswers).length} / {filteredPracticeQuestions.length} câu
                  </span>
                </div>

                <div className='flex items-center gap-1.5 mb-4'>
                  {(['all', 'unanswered', 'flagged'] as const).map((ft) => (
                    <button
                      key={ft}
                      onClick={() => setPracticePaletteFilter(ft)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors min-h-[30px] ${
                        practicePaletteFilter === ft
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                      }`}
                    >
                      {ft === 'all' && 'Tất cả'}
                      {ft === 'unanswered' && 'Chưa làm'}
                      {ft === 'flagged' && 'Có cờ'}
                    </button>
                  ))}
                </div>

                <div className='grid grid-cols-5 gap-1.5 max-h-96 overflow-y-auto p-1'>
                  {filteredPracticeQuestions.map((q, idx) => {
                    const isCur = idx === practiceIndex
                    const ans = practiceAnswers[idx]
                    const hasFlag = practiceFlagged.has(idx)
                    const isCorrect = ans !== undefined && q.correctAnswer === ans

                    if (practicePaletteFilter === 'unanswered' && ans !== undefined) return null
                    if (practicePaletteFilter === 'flagged' && !hasFlag) return null

                    let nodeClass =
                      'h-9 rounded-xl font-bold text-xs flex items-center justify-center relative border transition-all '
                    if (isCur) {
                      nodeClass += 'ring-2 ring-indigo-500 ring-offset-2 '
                    }
                    if (ans !== undefined) {
                      if (isCorrect) nodeClass += 'bg-emerald-500 text-white border-emerald-600'
                      else nodeClass += 'bg-rose-500 text-white border-rose-600'
                    } else {
                      nodeClass +=
                        'bg-gray-100 dark:bg-gray-750 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700'
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          setPracticeIndex(idx)
                          setPracticeShowExplanation(false)
                        }}
                        className={nodeClass}
                      >
                        <span>{idx + 1}</span>
                        {hasFlag && (
                          <div className='absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full ring-2 ring-white dark:ring-gray-800' />
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export { Toeic7PartsArena as ToeicReadingArena }
