// ============================================================================
// MODULE 3: SỔ TAY 60 KỸ XẢO & BẪY ĐỀ THI TOEIC (PART 1 - PART 7)
// Khai thác 100% từ toeic_exam_tactics.json bóc tách chuẩn ETS
// ============================================================================

import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Award,
  Search,
  Bookmark,
  Volume2,
  Lightbulb,
  HelpCircle,
  Flame,
  ArrowRight,
} from 'lucide-react'
import { Button } from '@/components/common/Button'
import rawTacticsData from '@/data/toeic_exam_tactics.json'

// Web Speech helper
function speak(text: string) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'en-US'
  utterance.rate = 1.0
  window.speechSynthesis.speak(utterance)
}

interface ExamTactic {
  id: string
  trickNumber: number
  part: number
  title: string
  category: string
  description: string
  examples: string[]
}

const ALL_TACTICS = rawTacticsData as ExamTactic[]

const PART_NAMES: Record<number, { title: string; subtitle: string; color: string }> = {
  1: {
    title: 'Part 1: Mô tả tranh',
    subtitle: 'Photographs (8 Kỹ xảo)',
    color: 'from-amber-500 to-orange-600',
  },
  2: {
    title: 'Part 2: Hỏi & Đáp',
    subtitle: 'Question-Response (7 Kỹ xảo)',
    color: 'from-blue-500 to-indigo-600',
  },
  3: {
    title: 'Part 3: Đoạn hội thoại',
    subtitle: 'Conversations (10 Kỹ xảo)',
    color: 'from-purple-500 to-violet-600',
  },
  4: {
    title: 'Part 4: Bài nói ngắn',
    subtitle: 'Short Talks (10 Kỹ xảo)',
    color: 'from-pink-500 to-rose-600',
  },
  5: {
    title: 'Part 5: Hoàn thành câu',
    subtitle: 'Incomplete Sentences (10 Kỹ xảo)',
    color: 'from-emerald-500 to-teal-600',
  },
  6: {
    title: 'Part 6: Điền đoạn văn',
    subtitle: 'Text Completion (7 Kỹ xảo)',
    color: 'from-cyan-500 to-blue-600',
  },
  7: {
    title: 'Part 7: Đọc hiểu',
    subtitle: 'Reading Comprehension (8 Kỹ xảo)',
    color: 'from-violet-500 to-fuchsia-600',
  },
}

export function ToeicTacticsMaster() {
  const navigate = useNavigate()
  const [selectedPart, setSelectedPart] = useState<number | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [bookmarkedTricks, setBookmarkedTricks] = useState<Set<number>>(() => {
    try {
      const saved = localStorage.getItem('toeic_bookmarked_tactics')
      return saved ? new Set(JSON.parse(saved)) : new Set()
    } catch {
      return new Set()
    }
  })
  const [filterBookmarkedOnly, setFilterBookmarkedOnly] = useState(false)

  // Save bookmarks
  useEffect(() => {
    try {
      localStorage.setItem('toeic_bookmarked_tactics', JSON.stringify(Array.from(bookmarkedTricks)))
    } catch {
      // ignore
    }
  }, [bookmarkedTricks])

  const toggleBookmark = (trickNumber: number) => {
    setBookmarkedTricks((prev) => {
      const next = new Set(prev)
      if (next.has(trickNumber)) next.delete(trickNumber)
      else next.add(trickNumber)
      return next
    })
  }

  // Count tactics per Part
  const partCounts = useMemo(() => {
    const map: Record<number, number> = {}
    ALL_TACTICS.forEach((t) => {
      map[t.part] = (map[t.part] || 0) + 1
    })
    return map
  }, [])

  // Filtered tactics list
  const filteredTactics = useMemo(() => {
    return ALL_TACTICS.filter((t) => {
      const matchPart = selectedPart === 'all' || t.part === selectedPart
      const matchBookmark = !filterBookmarkedOnly || bookmarkedTricks.has(t.trickNumber)
      const query = searchQuery.toLowerCase().trim()
      const matchQuery =
        !query ||
        t.title.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query) ||
        `#${t.trickNumber}`.includes(query) ||
        `${t.trickNumber}` === query

      return matchPart && matchBookmark && matchQuery
    })
  }, [selectedPart, filterBookmarkedOnly, searchQuery, bookmarkedTricks])

  return (
    <div className='max-w-7xl mx-auto px-3 sm:px-6 py-6 pb-24 text-gray-800 dark:text-gray-100'>
      {/* Hero Header */}
      <div className='bg-gradient-to-r from-amber-600 via-orange-600 to-rose-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-orange-900/20 mb-8 relative overflow-hidden'>
        <div className='relative z-10 max-w-3xl'>
          <div className='inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold tracking-wide uppercase text-amber-100 mb-3'>
            <Award size={14} /> Bí Kíp Thực Chiến ETS
          </div>
          <h1 className='text-2xl sm:text-4xl font-extrabold tracking-tight mb-2'>
            60 Kỹ Xảo & Bẫy Đề Thi TOEIC Part 1 - Part 7
          </h1>
          <p className='text-amber-100 text-sm sm:text-base leading-relaxed'>
            Tổng hợp 60 thủ thuật nhận diện bẫy đề thi trong 3 giây, công thức chọn nhanh phương án
            đúng và mẹo né bẫy phổ biến của các giám khảo ETS.
          </p>
        </div>
        <div className='absolute -right-6 -bottom-10 opacity-15 pointer-events-none'>
          <Flame size={260} />
        </div>
      </div>

      {/* Control Bar: Part Filters & Search */}
      <div className='bg-white dark:bg-gray-800/80 rounded-2xl p-4 border border-gray-200 dark:border-gray-700/60 shadow-sm mb-6 space-y-4'>
        {/* Search & Bookmark Filter */}
        <div className='flex flex-col sm:flex-row items-center gap-3 justify-between'>
          <div className='relative w-full sm:w-96'>
            <Search className='absolute left-3.5 top-3 text-gray-400' size={18} />
            <input
              type='text'
              placeholder='Tìm theo mẹo (#01-#60) hoặc từ khóa...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500'
            />
          </div>

          <div className='flex items-center gap-2 w-full sm:w-auto justify-end'>
            <button
              onClick={() => setFilterBookmarkedOnly((prev) => !prev)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                filterBookmarkedOnly
                  ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
              }`}
            >
              <Bookmark size={15} className={filterBookmarkedOnly ? 'fill-current' : ''} />
              <span>Đã lưu ({bookmarkedTricks.size})</span>
            </button>
          </div>
        </div>

        {/* Part Tabs (Part 1 - Part 7) */}
        <div className='flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none'>
          <button
            onClick={() => setSelectedPart('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedPart === 'all'
                ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-sm'
                : 'bg-gray-100 dark:bg-gray-750 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
            }`}
          >
            Tất cả 60 Kỹ xảo
          </button>

          {([1, 2, 3, 4, 5, 6, 7] as const).map((partNum) => {
            const isSelected = selectedPart === partNum
            const count = partCounts[partNum] || 0
            return (
              <button
                key={partNum}
                onClick={() => setSelectedPart(partNum)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20'
                    : 'bg-gray-100 dark:bg-gray-750 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
                }`}
              >
                <span>Part {partNum}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] ${isSelected ? 'bg-white/20 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Tactics Cards Grid */}
      {filteredTactics.length === 0 ? (
        <div className='bg-white dark:bg-gray-800/80 rounded-2xl p-12 text-center border border-gray-200 dark:border-gray-700'>
          <HelpCircle size={48} className='mx-auto text-gray-400 mb-3' />
          <h3 className='text-lg font-bold text-gray-800 dark:text-gray-200'>
            Không tìm thấy kỹ xảo phù hợp
          </h3>
          <p className='text-sm text-gray-500 mt-1'>Thử đổi từ khóa hoặc bộ lọc Part khác.</p>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {filteredTactics.map((tactic) => {
            const isBookmarked = bookmarkedTricks.has(tactic.trickNumber)
            const partInfo = PART_NAMES[tactic.part] || {
              title: `Part ${tactic.part}`,
              subtitle: '',
              color: 'from-gray-600 to-gray-800',
            }

            return (
              <div
                key={tactic.id}
                className='bg-white dark:bg-gray-800/90 rounded-2xl p-6 border border-gray-200/80 dark:border-gray-700/60 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group'
              >
                <div>
                  {/* Top metadata */}
                  <div className='flex items-center justify-between gap-3 mb-3'>
                    <div className='flex items-center gap-2'>
                      <span className='px-2.5 py-1 rounded-lg text-xs font-extrabold bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm'>
                        Mẹo #{String(tactic.trickNumber).padStart(2, '0')}
                      </span>
                      <span className='px-2.5 py-0.5 rounded-md text-xs font-semibold bg-gray-100 dark:bg-gray-750 text-gray-700 dark:text-gray-300'>
                        Part {tactic.part}
                      </span>
                    </div>

                    <button
                      onClick={() => toggleBookmark(tactic.trickNumber)}
                      className={`p-2 rounded-xl transition-colors ${
                        isBookmarked
                          ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/50'
                          : 'text-gray-400 hover:text-amber-500 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                      title={isBookmarked ? 'Bỏ lưu' : 'Lưu kỹ xảo này'}
                    >
                      <Bookmark size={18} className={isBookmarked ? 'fill-current' : ''} />
                    </button>
                  </div>

                  {/* Title */}
                  <h3 className='text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-snug'>
                    {tactic.title}
                  </h3>

                  {/* Description / Trap Analysis */}
                  <div className='text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4 whitespace-pre-line bg-gray-50 dark:bg-gray-900/40 p-4 rounded-xl border border-gray-100 dark:border-gray-800'>
                    {tactic.description}
                  </div>

                  {/* Examples if present */}
                  {tactic.examples && tactic.examples.length > 0 && (
                    <div className='space-y-2 mb-4'>
                      <div className='text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5'>
                        <Lightbulb size={14} /> Ví dụ thực chiến:
                      </div>
                      {tactic.examples.map((ex, i) => (
                        <div
                          key={i}
                          className='p-3 rounded-lg bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 text-xs sm:text-sm text-gray-800 dark:text-gray-200 flex items-start justify-between gap-2 font-medium'
                        >
                          <span className='leading-relaxed'>{ex}</span>
                          <button
                            onClick={() => speak(ex.replace(/^[\s\d.]*/, ''))}
                            className='p-1 text-gray-400 hover:text-amber-600 shrink-0'
                            title='Phát âm ví dụ'
                          >
                            <Volume2 size={15} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom Action: Practice Part questions */}
                <div className='pt-4 border-t border-gray-100 dark:border-gray-700/60 flex items-center justify-between'>
                  <span className='text-xs text-gray-500 dark:text-gray-400'>
                    {partInfo.subtitle}
                  </span>
                  <Button
                    onClick={() => navigate(`/toeic-7parts?part=${tactic.part}`)}
                    variant='outline'
                    className='text-xs py-1.5 px-3 border-amber-500/40 hover:bg-amber-50 dark:hover:bg-amber-950/30 text-amber-600 dark:text-amber-400'
                  >
                    Luyện câu hỏi Part {tactic.part} <ArrowRight size={14} className='ml-1' />
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
