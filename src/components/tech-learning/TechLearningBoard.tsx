// ============================================
// Tech Learning Board (Kanban & Concept System)
// Bảng học tập kiến thức công nghệ chuẩn kỹ sư phần mềm kiểu Trello
// ============================================

import React, { useState, useMemo } from 'react'
import {
  Kanban,
  Search,
  Plus,
  ArrowRight,
  ArrowLeft,
  Trash2,
  Volume2,
  Sparkles,
  CheckCircle2,
  Clock,
  BookOpen,
  X,
  PlusCircle,
  Check,
} from 'lucide-react'
import { useTechLearningStore, TechCard, TechStage } from '@/store/techLearningStore'
import { useDeckStore } from '@/store/deckStore'
import { speakWord } from '@/utils/quiz'

interface TechLearningBoardProps {
  onNavigateToVideo?: (videoId: string, timestamp?: number) => void
  currentVideoId?: string
  currentVideoTitle?: string
  currentTime?: number
}

const CATEGORIES = ['Tất cả', 'System Design', 'Backend', 'Database', 'DevOps', 'Frontend', 'AI']

export const TechLearningBoard: React.FC<TechLearningBoardProps> = ({
  onNavigateToVideo,
  currentVideoId,
  currentVideoTitle,
  currentTime = 0,
}) => {
  const {
    cards,
    searchQuery,
    selectedCategory,
    addCard,
    moveStage,
    deleteCard,
    setSearchQuery,
    setSelectedCategory,
  } = useTechLearningStore()

  const { decks, createWord } = useDeckStore()

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [copiedVocabTerm, setCopiedVocabTerm] = useState<string | null>(null)

  // Form state cho modal tạo thẻ mới
  const [newTitle, setNewTitle] = useState('')
  const [newCategory, setNewCategory] = useState('System Design')
  const [newSummary, setNewSummary] = useState('')
  const [newPros, setNewPros] = useState('')
  const [newCons, setNewCons] = useState('')
  const [newWhenToUse, setNewWhenToUse] = useState('')
  const [newVocabTerm, setNewVocabTerm] = useState('')
  const [newVocabMeaning, setNewVocabMeaning] = useState('')
  const [newStage, setNewStage] = useState<TechStage>('inbox')

  // Lọc thẻ theo từ khóa tìm kiếm và danh mục
  const filteredCards = useMemo(() => {
    return cards.filter((card) => {
      const matchCategory =
        !selectedCategory || selectedCategory === 'Tất cả'
          ? true
          : card.category.toLowerCase() === selectedCategory.toLowerCase()

      const q = searchQuery.toLowerCase().trim()
      if (!q) return matchCategory

      const matchText =
        card.title.toLowerCase().includes(q) ||
        card.summary.toLowerCase().includes(q) ||
        card.category.toLowerCase().includes(q) ||
        card.techVocab.some(
          (v) => v.term.toLowerCase().includes(q) || v.meaning.toLowerCase().includes(q),
        )

      return matchCategory && matchText
    })
  }, [cards, searchQuery, selectedCategory])

  // Phân chia theo 3 cột Kanban
  const inboxCards = useMemo(
    () => filteredCards.filter((c) => c.stage === 'inbox'),
    [filteredCards],
  )
  const reviewCards = useMemo(
    () => filteredCards.filter((c) => c.stage === 'review'),
    [filteredCards],
  )
  const masteredCards = useMemo(
    () => filteredCards.filter((c) => c.stage === 'mastered'),
    [filteredCards],
  )

  // Tỷ lệ làm chủ kiến thức
  const masteryPercentage = useMemo(() => {
    if (cards.length === 0) return 0
    const mastered = cards.filter((c) => c.stage === 'mastered').length
    return Math.round((mastered / cards.length) * 100)
  }, [cards])

  // Xử lý tạo thẻ mới
  const handleCreateCard = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim() || !newSummary.trim()) return

    const prosList = newPros
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)
    const consList = newCons
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)

    const techVocabList = []
    if (newVocabTerm.trim()) {
      techVocabList.push({
        term: newVocabTerm.trim(),
        meaning: newVocabMeaning.trim() || 'Thuật ngữ kỹ thuật',
      })
    }

    addCard({
      title: newTitle.trim(),
      category: newCategory,
      summary: newSummary.trim(),
      tradeoffs: {
        pros: prosList,
        cons: consList,
        whenToUse: newWhenToUse.trim() || undefined,
      },
      techVocab: techVocabList,
      videoId: currentVideoId,
      videoTitle: currentVideoTitle,
      timestamp: Math.round(currentTime),
      stage: newStage,
    })

    // Reset form
    setNewTitle('')
    setNewSummary('')
    setNewPros('')
    setNewCons('')
    setNewWhenToUse('')
    setNewVocabTerm('')
    setNewVocabMeaning('')
    setIsCreateModalOpen(false)
  }

  // Nhanh chóng lưu thuật ngữ tiếng Anh từ thẻ vào Bộ từ vựng SQLite
  const handleSaveVocabToDeck = async (term: string, meaning: string) => {
    const targetDeckId = decks.length > 0 ? decks[0].id : null
    if (!targetDeckId) return

    await createWord({
      deck_id: targetDeckId,
      term,
      definition: meaning,
      example: `Thuật ngữ chuyên ngành công nghệ phần mềm`,
    })

    setCopiedVocabTerm(term)
    setTimeout(() => setCopiedVocabTerm(null), 1800)
  }

  const formatTimestamp = (seconds?: number) => {
    if (typeof seconds !== 'number') return '00:00'
    const m = Math.floor(seconds / 60)
    const s = Math.floor(seconds % 60)
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const getCategoryColor = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'system design':
        return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20'
      case 'backend':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
      case 'database':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
      case 'devops':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
      case 'ai':
        return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20'
      default:
        return 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20'
    }
  }

  return (
    <div className='flex flex-col h-full bg-gray-50/50 dark:bg-dark-bg/60 rounded-2xl p-3 sm:p-5 space-y-4 overflow-hidden'>
      {/* Top Header & Overview */}
      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-200/80 dark:border-gray-800/80'>
        <div className='space-y-1'>
          <div className='flex items-center gap-2'>
            <div className='p-2 rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-500/20'>
              <Kanban size={18} />
            </div>
            <div>
              <h2 className='text-lg font-bold font-display text-gray-900 dark:text-white flex items-center gap-2'>
                <span>Bảng Học Tập Kỹ Thuật (Tech Knowledge Board)</span>
                <span className='text-xs px-2 py-0.5 rounded-full bg-primary-100 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 font-normal'>
                  Trello Style
                </span>
              </h2>
              <p className='text-xs text-gray-500 dark:text-gray-400'>
                Hệ thống ghi chép bản chất công nghệ, so sánh Trade-offs & làm chủ kiến thức thực
                chiến
              </p>
            </div>
          </div>
        </div>

        {/* Progress & Add button */}
        <div className='flex items-center gap-3'>
          <div className='hidden md:flex flex-col items-end text-xs'>
            <span className='font-semibold text-gray-700 dark:text-gray-300'>
              Làm chủ: {masteredCards.length}/{cards.length} kiến thức ({masteryPercentage}%)
            </span>
            <div className='w-36 h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden mt-1'>
              <div
                className='h-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-500'
                style={{ width: `${masteryPercentage}%` }}
              />
            </div>
          </div>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className='px-3.5 py-2 rounded-xl bg-primary-600 hover:bg-primary-500 active:scale-95 text-white text-xs font-bold shadow-md shadow-primary-600/25 flex items-center gap-1.5 transition-all'
          >
            <Plus size={15} />
            <span>Thêm Thẻ Kiến Thức</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className='flex flex-wrap items-center justify-between gap-2.5 text-xs'>
        {/* Category Pills */}
        <div className='flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5'>
          {CATEGORIES.map((cat) => {
            const isSelected = (!selectedCategory && cat === 'Tất cả') || selectedCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat === 'Tất cả' ? null : cat)}
                className={`px-3 py-1.5 rounded-xl font-medium transition-all shrink-0 ${
                  isSelected
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-sm'
                    : 'bg-white dark:bg-dark-card border border-gray-200/80 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {cat}
              </button>
            )
          })}
        </div>

        {/* Search input */}
        <div className='relative min-w-[200px] flex-1 sm:flex-none'>
          <Search size={14} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
          <input
            type='text'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder='Tìm kiếm khái niệm, trade-off, từ vựng...'
            className='w-full pl-8 pr-3 py-1.5 rounded-xl text-xs bg-white dark:bg-dark-card border border-gray-200/80 dark:border-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1.5 focus:ring-primary-500'
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className='absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'
            >
              <X size={13} />
            </button>
          )}
        </div>
      </div>

      {/* Kanban Board Columns (3 Columns Trello-Style) */}
      <div className='flex-1 grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 overflow-y-auto sm:overflow-hidden'>
        {/* Column 1: 💡 Đang tìm hiểu / Mới gặp (Inbox) */}
        <div className='flex flex-col bg-amber-50/40 dark:bg-gray-900/40 border border-amber-200/60 dark:border-amber-900/30 rounded-2xl p-3 overflow-hidden h-[500px] md:h-full'>
          <div className='flex items-center justify-between pb-2 mb-2 border-b border-amber-200/40 dark:border-amber-900/30 shrink-0'>
            <div className='flex items-center gap-2'>
              <div className='w-2.5 h-2.5 rounded-full bg-amber-500' />
              <h3 className='font-bold text-xs text-amber-900 dark:text-amber-300 uppercase tracking-wider'>
                💡 Mới Gặp / Khám Phá ({inboxCards.length})
              </h3>
            </div>
          </div>

          <div className='flex-1 overflow-y-auto space-y-3 pr-1 no-scrollbar'>
            {inboxCards.length === 0 ? (
              <div className='py-12 text-center text-xs text-gray-400'>
                Chưa có thẻ mới nào. Nhấn "+ Thêm Thẻ Kiến Thức" để ghi nhận!
              </div>
            ) : (
              inboxCards.map((card) => renderTechCard(card, 'inbox'))
            )}
          </div>
        </div>

        {/* Column 2: ⚡ Đang thực hành / Cần ôn lại (Review) */}
        <div className='flex flex-col bg-indigo-50/40 dark:bg-gray-900/40 border border-indigo-200/60 dark:border-indigo-900/30 rounded-2xl p-3 overflow-hidden h-[500px] md:h-full'>
          <div className='flex items-center justify-between pb-2 mb-2 border-b border-indigo-200/40 dark:border-indigo-900/30 shrink-0'>
            <div className='flex items-center gap-2'>
              <div className='w-2.5 h-2.5 rounded-full bg-indigo-500' />
              <h3 className='font-bold text-xs text-indigo-900 dark:text-indigo-300 uppercase tracking-wider'>
                ⚡ Đang Đào Sâu / Cần Ôn ({reviewCards.length})
              </h3>
            </div>
          </div>

          <div className='flex-1 overflow-y-auto space-y-3 pr-1 no-scrollbar'>
            {reviewCards.length === 0 ? (
              <div className='py-12 text-center text-xs text-gray-400'>
                Kéo hoặc chuyển thẻ sang đây khi cần đào sâu và thực hành!
              </div>
            ) : (
              reviewCards.map((card) => renderTechCard(card, 'review'))
            )}
          </div>
        </div>

        {/* Column 3: 🎯 Đã nắm vững / Thực chiến (Mastered) */}
        <div className='flex flex-col bg-emerald-50/40 dark:bg-gray-900/40 border border-emerald-200/60 dark:border-emerald-900/30 rounded-2xl p-3 overflow-hidden h-[500px] md:h-full'>
          <div className='flex items-center justify-between pb-2 mb-2 border-b border-emerald-200/40 dark:border-emerald-900/30 shrink-0'>
            <div className='flex items-center gap-2'>
              <div className='w-2.5 h-2.5 rounded-full bg-emerald-500' />
              <h3 className='font-bold text-xs text-emerald-900 dark:text-emerald-300 uppercase tracking-wider'>
                🎯 Đã Làm Chủ ({masteredCards.length})
              </h3>
            </div>
          </div>

          <div className='flex-1 overflow-y-auto space-y-3 pr-1 no-scrollbar'>
            {masteredCards.length === 0 ? (
              <div className='py-12 text-center text-xs text-gray-400'>
                Chưa có thẻ nào được đánh dấu làm chủ. Hãy ôn luyện để thăng hạng!
              </div>
            ) : (
              masteredCards.map((card) => renderTechCard(card, 'mastered'))
            )}
          </div>
        </div>
      </div>

      {/* Modal Tạo Thẻ Kiến Thức Kỹ Thuật Chuẩn Kỹ Sư */}
      {isCreateModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in'>
          <div className='w-full max-w-2xl bg-white dark:bg-dark-card rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 p-4 sm:p-6 overflow-y-auto max-h-[90vh] space-y-4'>
            {/* Modal Header */}
            <div className='flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800'>
              <div className='flex items-center gap-2'>
                <div className='p-2 rounded-xl bg-primary-100 dark:bg-primary-950 text-primary-600'>
                  <Sparkles size={18} />
                </div>
                <div>
                  <h3 className='font-bold text-base text-gray-900 dark:text-white'>
                    Tạo Thẻ Kiến Thức Kỹ Thuật Mới
                  </h3>
                  <p className='text-xs text-gray-500'>
                    Mô hình ghi chú chuẩn kỹ sư: Bản chất + Trade-offs + Thuật ngữ tiếng Anh
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className='text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1'
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateCard} className='space-y-3.5 text-xs'>
              {/* Tiêu đề & Danh mục */}
              <div className='grid grid-cols-1 sm:grid-cols-3 gap-2.5'>
                <div className='sm:col-span-2 space-y-1'>
                  <label className='font-bold text-gray-700 dark:text-gray-300'>
                    Tên khái niệm / Chủ đề *
                  </label>
                  <input
                    type='text'
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder='VD: Write-Through vs Write-Back Caching'
                    required
                    className='w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-1.5 focus:ring-primary-500'
                  />
                </div>

                <div className='space-y-1'>
                  <label className='font-bold text-gray-700 dark:text-gray-300'>
                    Danh mục chuyên ngành
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className='w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1.5 focus:ring-primary-500'
                  >
                    {CATEGORIES.filter((c) => c !== 'Tất cả').map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* TL;DR Bản chất cốt lõi */}
              <div className='space-y-1'>
                <label className='font-bold text-gray-700 dark:text-gray-300'>
                  Bản chất cốt lõi (TL;DR - Giải thích ngắn gọn 1-2 câu) *
                </label>
                <textarea
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  placeholder='VD: Write-Through ghi đồng thời vào cả Cache và Database, nhất quán cao nhưng chậm. Write-Back chỉ ghi vào Cache rồi ghi nền vào DB, cực nhanh nhưng có rủi ro mất dữ liệu nếu cache sập.'
                  rows={2}
                  required
                  className='w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1.5 focus:ring-primary-500'
                />
              </div>

              {/* Trade-offs: Pros & Cons */}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-2.5'>
                <div className='space-y-1'>
                  <label className='font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1'>
                    <CheckCircle2 size={13} /> Ưu điểm (Mỗi dòng 1 ý)
                  </label>
                  <textarea
                    value={newPros}
                    onChange={(e) => setNewPros(e.target.value)}
                    placeholder='- Đọc dữ liệu nhanh tức thì&#10;- Không bao giờ gặp stale data'
                    rows={2}
                    className='w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-emerald-200 dark:border-emerald-900/40 text-gray-900 dark:text-white focus:outline-none focus:ring-1.5 focus:ring-emerald-500'
                  />
                </div>

                <div className='space-y-1'>
                  <label className='font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1'>
                    <X size={13} /> Nhược điểm / Đánh đổi (Mỗi dòng 1 ý)
                  </label>
                  <textarea
                    value={newCons}
                    onChange={(e) => setNewCons(e.target.value)}
                    placeholder='- Độ trễ ghi cao hơn&#10;- Tốn thêm băng thông mạng'
                    rows={2}
                    className='w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-rose-200 dark:border-rose-900/40 text-gray-900 dark:text-white focus:outline-none focus:ring-1.5 focus:ring-rose-500'
                  />
                </div>
              </div>

              {/* Khi nào nên áp dụng */}
              <div className='space-y-1'>
                <label className='font-bold text-gray-700 dark:text-gray-300'>
                  Khi nào nên áp dụng thực tế (Use-case)
                </label>
                <input
                  type='text'
                  value={newWhenToUse}
                  onChange={(e) => setNewWhenToUse(e.target.value)}
                  placeholder='VD: Dùng Write-Through cho số dư tài khoản ngân hàng, thông tin thanh toán.'
                  className='w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1.5 focus:ring-primary-500'
                />
              </div>

              {/* Thuật ngữ tiếng Anh đi kèm */}
              <div className='p-3 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 space-y-2'>
                <span className='font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5'>
                  <BookOpen size={13} /> Thuật ngữ tiếng Anh trọng tâm (Tùy chọn)
                </span>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                  <input
                    type='text'
                    value={newVocabTerm}
                    onChange={(e) => setNewVocabTerm(e.target.value)}
                    placeholder='Từ tiếng Anh (VD: cache invalidation)'
                    className='w-full px-3 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-indigo-200 dark:border-indigo-800 text-gray-900 dark:text-white'
                  />
                  <input
                    type='text'
                    value={newVocabMeaning}
                    onChange={(e) => setNewVocabMeaning(e.target.value)}
                    placeholder='Nghĩa tiếng Việt (VD: hủy/làm mới bộ nhớ đệm)'
                    className='w-full px-3 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-indigo-200 dark:border-indigo-800 text-gray-900 dark:text-white'
                  />
                </div>
              </div>

              {/* Chọn cột khởi đầu */}
              <div className='flex items-center justify-between pt-2'>
                <div className='flex items-center gap-2'>
                  <span className='font-medium text-gray-600 dark:text-gray-400'>Đặt vào cột:</span>
                  <select
                    value={newStage}
                    onChange={(e) => setNewStage(e.target.value as TechStage)}
                    className='px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-bold'
                  >
                    <option value='inbox'>💡 Mới Gặp (Inbox)</option>
                    <option value='review'>⚡ Đang Ôn Luyện (Review)</option>
                    <option value='mastered'>🎯 Đã Làm Chủ (Mastered)</option>
                  </select>
                </div>

                <div className='flex items-center gap-2'>
                  <button
                    type='button'
                    onClick={() => setIsCreateModalOpen(false)}
                    className='px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-200'
                  >
                    Hủy
                  </button>
                  <button
                    type='submit'
                    disabled={!newTitle.trim() || !newSummary.trim()}
                    className='px-5 py-2 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold shadow-md shadow-primary-600/30 disabled:opacity-40'
                  >
                    Lưu Thẻ Kiến Thức
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )

  // Hàm render từng Card kiến thức
  function renderTechCard(card: TechCard, currentColumnStage: TechStage) {
    return (
      <div
        key={card.id}
        className='p-3.5 rounded-2xl bg-white dark:bg-dark-card border border-gray-200/80 dark:border-gray-800 hover:border-indigo-300 dark:hover:border-indigo-700 shadow-sm transition-all space-y-2.5 group relative'
      >
        {/* Card Header: Category Badge & Delete */}
        <div className='flex items-center justify-between gap-1'>
          <span
            className={`text-[10px] px-2 py-0.5 rounded-md font-bold uppercase tracking-wider border ${getCategoryColor(
              card.category,
            )}`}
          >
            {card.category}
          </span>

          <button
            onClick={() => deleteCard(card.id)}
            title='Xóa thẻ'
            className='text-gray-300 hover:text-red-500 dark:text-gray-600 dark:hover:text-red-400 p-0.5 transition-colors opacity-0 group-hover:opacity-100'
          >
            <Trash2 size={13} />
          </button>
        </div>

        {/* Title */}
        <h4 className='font-bold text-xs sm:text-sm text-gray-900 dark:text-white leading-snug'>
          {card.title}
        </h4>

        {/* TL;DR Summary */}
        <p className='text-xs text-gray-600 dark:text-gray-300 leading-relaxed'>{card.summary}</p>

        {/* Trade-offs Section (Ưu / Nhược) */}
        {card.tradeoffs && (
          <div className='space-y-1.5 p-2 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 text-[11px]'>
            {card.tradeoffs.pros.length > 0 && (
              <div className='space-y-0.5'>
                <span className='font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1'>
                  <CheckCircle2 size={11} /> Ưu điểm:
                </span>
                <ul className='list-disc list-inside text-gray-600 dark:text-gray-300 pl-1 space-y-0.5'>
                  {card.tradeoffs.pros.map((p, idx) => (
                    <li key={idx} className='truncate'>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {card.tradeoffs.cons.length > 0 && (
              <div className='space-y-0.5 pt-1 border-t border-gray-200/50 dark:border-gray-700/50'>
                <span className='font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1'>
                  <X size={11} /> Nhược điểm / Rủi ro:
                </span>
                <ul className='list-disc list-inside text-gray-600 dark:text-gray-300 pl-1 space-y-0.5'>
                  {card.tradeoffs.cons.map((c, idx) => (
                    <li key={idx} className='truncate'>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {card.tradeoffs.whenToUse && (
              <p className='text-[10px] text-indigo-600 dark:text-indigo-400 pt-1 border-t border-gray-200/50 dark:border-gray-700/50 italic'>
                💡 <strong>Khi nào dùng:</strong> {card.tradeoffs.whenToUse}
              </p>
            )}
          </div>
        )}

        {/* Tech Vocabulary Chips */}
        {card.techVocab.length > 0 && (
          <div className='space-y-1'>
            <span className='text-[10px] font-bold text-gray-400 uppercase tracking-wider'>
              Thuật ngữ tiếng Anh:
            </span>
            <div className='flex flex-wrap gap-1'>
              {card.techVocab.map((v, i) => (
                <div
                  key={i}
                  className='inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60 text-[11px]'
                >
                  <span className='font-semibold'>{v.term}</span>
                  <span className='text-[10px] text-gray-500 dark:text-gray-400'>
                    ({v.meaning})
                  </span>
                  <button
                    onClick={() => speakWord(v.term)}
                    title='Nghe phát âm'
                    className='text-indigo-500 hover:text-indigo-700 p-0.5'
                  >
                    <Volume2 size={11} />
                  </button>

                  <button
                    onClick={() => handleSaveVocabToDeck(v.term, v.meaning)}
                    title='Lưu vào Bộ từ vựng SQLite'
                    className='text-indigo-500 hover:text-primary-600 p-0.5'
                  >
                    {copiedVocabTerm === v.term ? (
                      <Check size={11} className='text-emerald-500' />
                    ) : (
                      <PlusCircle size={11} />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer: Video Source & Move Stage Buttons */}
        <div className='flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800/80 text-xs'>
          {/* Video reference with timestamp */}
          {card.videoId ? (
            <button
              onClick={() => onNavigateToVideo && onNavigateToVideo(card.videoId!, card.timestamp)}
              title='Xem lại đoạn video giải thích'
              className='text-[11px] font-mono text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1 truncate max-w-[140px]'
            >
              <Clock size={11} />
              <span>
                {card.videoTitle || 'Video'} @ {formatTimestamp(card.timestamp)}
              </span>
            </button>
          ) : (
            <span className='text-[10px] text-gray-400'>Tự tạo</span>
          )}

          {/* Kanban Stage Transition Buttons (1-Click Move) */}
          <div className='flex items-center gap-1'>
            {currentColumnStage !== 'inbox' && (
              <button
                onClick={() =>
                  moveStage(card.id, currentColumnStage === 'mastered' ? 'review' : 'inbox')
                }
                title='Lùi lại 1 cột'
                className='p-1 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 text-[10px] font-medium transition-colors flex items-center gap-0.5'
              >
                <ArrowLeft size={11} />
              </button>
            )}

            {currentColumnStage !== 'mastered' && (
              <button
                onClick={() =>
                  moveStage(card.id, currentColumnStage === 'inbox' ? 'review' : 'mastered')
                }
                title='Tiến lên cột tiếp theo'
                className='px-2 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:hover:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold transition-colors flex items-center gap-0.5'
              >
                <span>{currentColumnStage === 'inbox' ? 'Ôn tập' : 'Làm chủ'}</span>
                <ArrowRight size={11} />
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }
}
