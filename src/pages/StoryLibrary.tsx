// ============================================
// Enhanced Bilingual Story Library Page
// ============================================

import React, { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BILINGUAL_STORIES_DATA } from '@/data/stories'
import { StoryCategory, BilingualStory } from '@/types/story'
import { getStoryProgress, calculateStoryProgressPercent } from '@/services/storyProgressService'
import {
  getCustomStories,
  saveCustomStory,
  deleteCustomStory,
  parseRawNovelText,
} from '@/services/customStoryService'
import {
  POPULAR_ONLINE_NOVEL_PRESETS,
  importOnlinePresetToLibrary,
} from '@/services/onlineNovelStreamerService'
import {
  BookOpen,
  Search,
  ChevronRight,
  Star,
  Layers,
  BookMarked,
  Filter,
  PlusCircle,
  X,
  Upload,
  Trash2,
  Sparkles,
  Globe,
  Check,
} from 'lucide-react'

export const StoryLibrary: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<StoryCategory | 'all'>('all')
  const [selectedLevel, setSelectedLevel] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Custom stories state
  const [customStories, setCustomStories] = useState<BilingualStory[]>([])
  const [isImportModalOpen, setIsImportModalOpen] = useState(false)
  const [importTab, setImportTab] = useState<'preset' | 'txt'>('preset')

  // Import form state
  const [importTitleVi, setImportTitleVi] = useState('')
  const [importTitleEn, setImportTitleEn] = useState('')
  const [importAuthor, setImportAuthor] = useState('')
  const [importCategory, setImportCategory] = useState<StoryCategory>('xianxia')
  const [importLevel, setImportLevel] = useState('B1 - Trung cấp')
  const [importContent, setImportContent] = useState('')
  const [importing, setImporting] = useState(false)
  const [importedPresetId, setImportedPresetId] = useState<string | null>(null)

  useEffect(() => {
    setCustomStories(getCustomStories())
  }, [])

  // All combined stories
  const allStories = useMemo(() => {
    return [...customStories, ...BILINGUAL_STORIES_DATA]
  }, [customStories])

  const CATEGORIES: { id: StoryCategory | 'all'; label: string; icon: string }[] = [
    { id: 'all', label: 'Tất cả thể loại', icon: '✨' },
    { id: 'xianxia', label: 'Tiên Hiệp & Tu Chân', icon: '⚔️' },
    { id: 'tech', label: 'Công Nghệ & Startup', icon: '💻' },
    { id: 'detective', label: 'Trinh Thám & Bí Ẩn', icon: '🕵️‍♂️' },
    { id: 'fables', label: 'Ngụ Ngôn & Triết Lý', icon: '📜' },
    { id: 'life', label: 'Đời Sống & Chữa Lành', icon: '🌸' },
  ]

  const LEVELS = [
    { id: 'all', label: 'Tất cả trình độ' },
    { id: 'A2 - Cơ bản', label: 'A2 - Cơ bản' },
    { id: 'B1 - Trung cấp', label: 'B1 - Trung cấp' },
    { id: 'B2 - Khá', label: 'B2 - Khá' },
  ]

  // Filter stories
  const filteredStories = useMemo(() => {
    return allStories.filter((story) => {
      const matchesCat = selectedCategory === 'all' || story.category === selectedCategory
      const matchesLevel = selectedLevel === 'all' || story.level === selectedLevel
      const q = searchQuery.toLowerCase().trim()
      const matchesSearch =
        !q ||
        story.titleEn.toLowerCase().includes(q) ||
        story.titleVi.toLowerCase().includes(q) ||
        story.descriptionVi.toLowerCase().includes(q) ||
        story.author.toLowerCase().includes(q) ||
        (story.tags && story.tags.some((t) => t.toLowerCase().includes(q)))
      return matchesCat && matchesLevel && matchesSearch
    })
  }, [allStories, selectedCategory, selectedLevel, searchQuery])

  // Total library statistics
  const totalChapters = useMemo(() => {
    return allStories.reduce((sum, s) => sum + s.chapters.length, 0)
  }, [allStories])

  const totalWords = useMemo(() => {
    return allStories.reduce(
      (sum, s) => sum + s.chapters.reduce((cSum, c) => cSum + c.wordCount, 0),
      0,
    )
  }, [allStories])

  // Handle file upload (.txt)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!importTitleVi) {
      setImportTitleVi(file.name.replace(/\.[^/.]+$/, ''))
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const text = event.target?.result as string
      if (text) {
        setImportContent(text)
      }
    }
    reader.readAsText(file)
  }

  // Handle preset 1-click import
  const handleImportPreset = (presetId: string) => {
    const imported = importOnlinePresetToLibrary(presetId)
    if (imported) {
      setCustomStories(getCustomStories())
      setImportedPresetId(presetId)
      setTimeout(() => setImportedPresetId(null), 2500)
    }
  }

  // Handle manual text import submit
  const handleExecuteImport = () => {
    if (!importTitleVi.trim() || !importContent.trim()) {
      alert('Vui lòng nhập tiêu đề truyện và dán/tải nội dung văn bản!')
      return
    }

    setImporting(true)
    setTimeout(() => {
      const newStory = parseRawNovelText(
        importTitleVi,
        importTitleEn || importTitleVi,
        importAuthor || 'Tác Giả Khuyết Danh',
        importCategory,
        importLevel,
        importContent,
      )

      saveCustomStory(newStory)
      setCustomStories(getCustomStories())
      setImporting(false)
      setIsImportModalOpen(false)
      setImportTitleVi('')
      setImportTitleEn('')
      setImportAuthor('')
      setImportContent('')
    }, 100)
  }

  const handleDeleteCustomStory = (e: React.MouseEvent, storyId: string) => {
    e.preventDefault()
    e.stopPropagation()
    if (confirm('Bạn có chắc chắn muốn xóa bộ truyện đã nhập này khỏi thư viện?')) {
      deleteCustomStory(storyId)
      setCustomStories(getCustomStories())
    }
  }

  // Preview chapter count in import modal
  const previewChapterCount = useMemo(() => {
    if (!importContent) return 0
    const matches = importContent.match(/^\s*(Chương|Chapter|Hồi|Hồi thứ|Tiết)\s+\d+/gim)
    return matches
      ? matches.length
      : Math.max(1, Math.ceil(importContent.split(/\r?\n\r?\n/).length / 20))
  }, [importContent])

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-white pb-28'>
      {/* Hero Header Banner */}
      <div className='bg-gradient-to-r from-emerald-700 via-teal-700 to-indigo-800 text-white pt-8 pb-14 px-4 sm:px-6 lg:px-8 shadow-inner'>
        <div className='max-w-6xl mx-auto space-y-4'>
          <div className='flex items-center justify-between flex-wrap gap-4'>
            <div className='flex items-center gap-3.5'>
              <div className='w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner'>
                <BookOpen size={26} className='text-amber-300' />
              </div>
              <div>
                <span className='px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30'>
                  Extensive Reading Hub
                </span>
                <h1 className='text-2xl sm:text-3xl font-extrabold font-display'>
                  Thư Viện Tiểu Thuyết Song Ngữ Anh - Việt
                </h1>
              </div>
            </div>

            {/* Quick Stats & Import Button */}
            <div className='flex items-center gap-2 sm:gap-3 flex-wrap'>
              <div className='flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 text-xs font-bold'>
                <div>
                  <span className='text-amber-300 font-mono text-sm font-extrabold'>
                    {allStories.length}
                  </span>{' '}
                  bộ truyện
                </div>
                <span>•</span>
                <div>
                  <span className='text-emerald-300 font-mono text-sm font-extrabold'>
                    {totalChapters}
                  </span>{' '}
                  chương
                </div>
                <span>•</span>
                <div>
                  <span className='text-cyan-300 font-mono text-sm font-extrabold'>
                    ~{totalWords.toLocaleString()}
                  </span>{' '}
                  từ vựng
                </div>
              </div>

              <button
                onClick={() => setIsImportModalOpen(true)}
                className='px-4 py-2 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/25 flex items-center gap-1.5 transition-all'
              >
                <PlusCircle size={16} /> Nhập Truyện Online / TXT
              </button>
            </div>
          </div>

          <p className='text-sm sm:text-base text-emerald-100 max-w-2xl leading-relaxed'>
            Nâng cao vốn từ vựng và phản xạ đọc hiểu tự nhiên thông qua các bộ truyện dài trọn vẹn
            đa thể loại: Tiên Hiệp, Công Nghệ AI, Trinh Thám Cổ Điển, Ngụ Ngôn Triết Lý và Đời Sống.
          </p>

          {/* Search Box */}
          <div className='relative max-w-xl pt-2'>
            <Search
              className='absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400'
              size={18}
            />
            <input
              type='text'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Tìm kiếm theo tên truyện, tác giả, nội dung hoặc #tag...'
              className='w-full pl-10 pr-4 py-3 rounded-2xl bg-white/10 backdrop-blur-md text-white placeholder-emerald-200/60 border border-white/20 focus:outline-none focus:border-amber-400 focus:bg-white/20 transition-all text-sm'
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className='absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white'
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 space-y-6'>
        {/* Category Filters Bar */}
        <div className='flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none'>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 shadow-sm ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                    : 'bg-white dark:bg-dark-card text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-dark-border border border-gray-100 dark:border-dark-border'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            )
          })}
        </div>

        {/* Level Filter Tags */}
        <div className='flex items-center justify-between flex-wrap gap-3 bg-white dark:bg-dark-card p-3.5 rounded-2xl border border-gray-100 dark:border-dark-border shadow-sm'>
          <div className='flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-gray-400'>
            <Filter size={14} /> Lọc theo trình độ:
          </div>

          <div className='flex items-center gap-1.5 flex-wrap'>
            {LEVELS.map((lvl) => {
              const isSelected = selectedLevel === lvl.id
              return (
                <button
                  key={lvl.id}
                  onClick={() => setSelectedLevel(lvl.id)}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-emerald-500 text-white font-bold'
                      : 'bg-gray-100 dark:bg-dark-bg text-gray-600 dark:text-gray-400 hover:bg-gray-200'
                  }`}
                >
                  {lvl.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Stories Grid */}
        {filteredStories.length === 0 ? (
          <div className='text-center py-16 bg-white dark:bg-dark-card rounded-3xl border border-dashed border-gray-200 dark:border-dark-border space-y-3'>
            <BookOpen size={48} className='mx-auto text-gray-400 opacity-60' />
            <p className='text-base font-bold text-gray-600 dark:text-gray-300'>
              Không tìm thấy bộ truyện nào phù hợp với bộ lọc.
            </p>
            <p className='text-xs text-gray-400'>
              Thử xóa từ khóa tìm kiếm hoặc chọn "Tất cả thể loại".
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {filteredStories.map((story) => {
              const progress = getStoryProgress(story.id)
              const percent = calculateStoryProgressPercent(story, progress)
              const hasRead = progress.lastReadChapterIndex >= 0
              const isCustom =
                story.id.startsWith('custom-story-') || story.id.startsWith('stream-')

              return (
                <div
                  key={story.id}
                  className='group bg-white dark:bg-dark-card rounded-3xl border border-gray-100 dark:border-dark-border overflow-hidden hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-xl transition-all duration-300 flex flex-col justify-between'
                >
                  {/* Card Cover & Header */}
                  <div>
                    <div className='relative h-48 w-full overflow-hidden bg-slate-800'>
                      <img
                        src={story.coverImage}
                        alt={story.titleVi}
                        className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90'
                      />
                      <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent' />

                      {/* Level Badge Top-Left */}
                      <span className='absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-600/90 text-white backdrop-blur-md shadow-md'>
                        {story.level}
                      </span>

                      {/* Custom Delete Button or Reads Count Top-Right */}
                      {isCustom ? (
                        <button
                          onClick={(e) => handleDeleteCustomStory(e, story.id)}
                          className='absolute top-3 right-3 p-2 rounded-full bg-rose-600 text-white shadow-md hover:bg-rose-500 transition-all'
                          title='Xóa truyện đã nhập này'
                        >
                          <Trash2 size={14} />
                        </button>
                      ) : (
                        <span className='absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-black/60 text-amber-300 backdrop-blur-md flex items-center gap-1 border border-white/10'>
                          <Star size={12} className='fill-amber-300' /> {story.rating} (
                          {story.readsCount})
                        </span>
                      )}

                      {/* Title on cover */}
                      <div className='absolute bottom-3 left-3 right-3 text-white space-y-0.5'>
                        <p className='text-xs font-mono opacity-80 line-clamp-1'>{story.titleEn}</p>
                        <h3 className='text-base font-extrabold font-display line-clamp-1 group-hover:text-emerald-300 transition-colors'>
                          {story.titleVi}
                        </h3>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className='p-4 space-y-3'>
                      {/* Meta stats: chapters, words, author */}
                      <div className='flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-1'>
                        <span className='flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400'>
                          <Layers size={13} /> {story.chapters.length} chương
                        </span>
                        <span className='line-clamp-1'>Tác giả: {story.author}</span>
                      </div>

                      <p className='text-xs text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed'>
                        {story.descriptionVi}
                      </p>

                      {/* Tags */}
                      {story.tags && (
                        <div className='flex items-center gap-1.5 flex-wrap pt-1'>
                          {story.tags.slice(0, 3).map((t, idx) => (
                            <span
                              key={idx}
                              className='px-2 py-0.5 rounded-lg bg-gray-100 dark:bg-dark-bg text-[10px] font-semibold text-gray-600 dark:text-gray-400'
                            >
                              #{t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Footer: Progress & Action CTA */}
                  <div className='p-4 pt-0 space-y-3'>
                    {/* Reading Progress Indicator */}
                    <div className='space-y-1.5'>
                      <div className='flex items-center justify-between text-[11px] font-bold'>
                        <span className='text-gray-500 dark:text-gray-400 flex items-center gap-1'>
                          <BookMarked size={12} />
                          {hasRead
                            ? `Đang đọc: Chương ${progress.lastReadChapterIndex + 1}/${story.chapters.length}`
                            : 'Chưa đọc'}
                        </span>
                        <span className='text-emerald-600 dark:text-emerald-400 font-mono'>
                          {percent}%
                        </span>
                      </div>
                      <div className='w-full h-1.5 rounded-full bg-gray-100 dark:bg-dark-border overflow-hidden'>
                        <div
                          className='h-full bg-emerald-500 rounded-full transition-all duration-300'
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>

                    {/* Read CTA Button */}
                    <Link
                      to={`/stories/${story.id}`}
                      className='w-full py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all no-underline'
                    >
                      <span>{hasRead ? 'Đọc Tiếp Chương Dở' : 'Bắt Đầu Đọc Truyện'}</span>
                      <ChevronRight size={15} />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Novel Import & Online Streamer Modal */}
      {isImportModalOpen && (
        <div className='fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4'>
          <div className='w-full max-w-2xl bg-white dark:bg-dark-card rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-200 dark:border-dark-border space-y-5 max-h-[90vh] flex flex-col'>
            {/* Header */}
            <div className='flex items-center justify-between border-b border-gray-100 dark:border-dark-border pb-3'>
              <div className='flex items-center gap-2'>
                <PlusCircle className='text-amber-500' size={24} />
                <div>
                  <h3 className='font-bold text-lg font-display'>
                    Nhập & Nạp Bộ Truyện Hàng Ngàn Chương
                  </h3>
                  <p className='text-xs text-gray-500'>
                    Hỗ trợ nạp 1-click kho truyện online hoặc tải tệp TXT
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsImportModalOpen(false)}
                className='p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-border text-gray-400'
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className='flex items-center gap-2 border-b border-gray-100 dark:border-dark-border pb-2'>
              <button
                onClick={() => setImportTab('preset')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  importTab === 'preset'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'bg-gray-100 dark:bg-dark-bg text-gray-600 dark:text-gray-400'
                }`}
              >
                <Globe size={15} /> ⚡ Kho Online 5.000+ Chương (1-Click)
              </button>
              <button
                onClick={() => setImportTab('txt')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  importTab === 'txt'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-dark-bg text-gray-600 dark:text-gray-400'
                }`}
              >
                <Upload size={15} /> 📁 Tải Tệp TXT / Dán Raw
              </button>
            </div>

            {/* Modal Tab 1: Presets 5000+ Chapters */}
            {importTab === 'preset' ? (
              <div className='flex-1 overflow-y-auto space-y-3 pr-1'>
                <p className='text-xs text-gray-500 leading-relaxed'>
                  Chọn ngay các siêu phẩm đã được cấu hình sẵn hệ thống{' '}
                  <strong>mục lục hàng ngàn chương hoàn chỉnh</strong> và cơ chế phát luồng
                  On-Demand:
                </p>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                  {POPULAR_ONLINE_NOVEL_PRESETS.map((preset) => {
                    const isAdded =
                      importedPresetId === preset.id ||
                      customStories.some((s) => s.id === preset.id)

                    return (
                      <div
                        key={preset.id}
                        className='p-3.5 rounded-2xl bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border flex flex-col justify-between gap-2 hover:border-amber-400 transition-colors'
                      >
                        <div className='space-y-1'>
                          <div className='flex items-center justify-between'>
                            <span className='px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 font-extrabold text-[10px]'>
                              {preset.totalChapters} Chương Full
                            </span>
                            <span className='text-[10px] text-gray-400'>{preset.author}</span>
                          </div>
                          <h4 className='font-bold text-xs line-clamp-1'>{preset.titleVi}</h4>
                          <p className='text-[11px] text-gray-500 line-clamp-2'>
                            {preset.descriptionVi}
                          </p>
                        </div>

                        <button
                          onClick={() => handleImportPreset(preset.id)}
                          className={`w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                            isAdded
                              ? 'bg-emerald-600 text-white'
                              : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-sm'
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check size={14} /> Đã Thêm Vào Thư Viện
                            </>
                          ) : (
                            <>
                              <PlusCircle size={14} /> Nạp Trọn Bộ {preset.totalChapters} Chap
                            </>
                          )}
                        </button>
                      </div>
                    )
                  })}
                </div>
              </div>
            ) : (
              /* Modal Tab 2: Manual TXT Import */
              <div className='flex-1 overflow-y-auto space-y-4 pr-1 text-xs sm:text-sm'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                  <div>
                    <label className='font-bold opacity-75 block mb-1'>
                      Tên tác phẩm (Tiếng Việt): *
                    </label>
                    <input
                      type='text'
                      value={importTitleVi}
                      onChange={(e) => setImportTitleVi(e.target.value)}
                      placeholder='VD: Phàm Nhân Tu Tiên, Đấu La Đại Lục...'
                      className='w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border outline-none focus:border-emerald-500'
                    />
                  </div>
                  <div>
                    <label className='font-bold opacity-75 block mb-1'>
                      Tên tiếng Anh (hoặc để trống):
                    </label>
                    <input
                      type='text'
                      value={importTitleEn}
                      onChange={(e) => setImportTitleEn(e.target.value)}
                      placeholder='VD: A Record of a Mortal Journey...'
                      className='w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border outline-none focus:border-emerald-500'
                    />
                  </div>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
                  <div>
                    <label className='font-bold opacity-75 block mb-1'>Tác giả:</label>
                    <input
                      type='text'
                      value={importAuthor}
                      onChange={(e) => setImportAuthor(e.target.value)}
                      placeholder='VD: Vong Ngữ, Tình Hà Dĩ Thâm...'
                      className='w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border outline-none focus:border-emerald-500'
                    />
                  </div>
                  <div>
                    <label className='font-bold opacity-75 block mb-1'>Thể loại:</label>
                    <select
                      value={importCategory}
                      onChange={(e) => setImportCategory(e.target.value as StoryCategory)}
                      className='w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border outline-none focus:border-emerald-500 cursor-pointer'
                    >
                      <option value='xianxia'>⚔️ Tiên Hiệp & Tu Chân</option>
                      <option value='tech'>💻 Công Nghệ & AI</option>
                      <option value='detective'>🕵️‍♂️ Trinh Thám</option>
                      <option value='fables'>📜 Ngụ Ngôn</option>
                      <option value='life'>🌸 Đời Sống</option>
                    </select>
                  </div>
                  <div>
                    <label className='font-bold opacity-75 block mb-1'>Trình độ:</label>
                    <select
                      value={importLevel}
                      onChange={(e) => setImportLevel(e.target.value)}
                      className='w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border outline-none focus:border-emerald-500 cursor-pointer'
                    >
                      <option value='A2 - Cơ bản'>A2 - Cơ bản</option>
                      <option value='B1 - Trung cấp'>B1 - Trung cấp</option>
                      <option value='B2 - Khá'>B2 - Khá</option>
                    </select>
                  </div>
                </div>

                {/* Upload file .txt */}
                <div className='border-2 border-dashed border-gray-200 dark:border-dark-border rounded-2xl p-4 text-center hover:border-emerald-500 transition-colors'>
                  <Upload size={24} className='mx-auto text-emerald-500 mb-1' />
                  <p className='font-bold text-xs'>Tải lên tệp văn bản (.txt) của truyện</p>
                  <p className='text-[11px] text-gray-400 mt-0.5'>
                    Hỗ trợ file truyện dài hàng trăm chương
                  </p>
                  <input
                    type='file'
                    accept='.txt'
                    onChange={handleFileUpload}
                    className='hidden'
                    id='novel-file-input'
                  />
                  <label
                    htmlFor='novel-file-input'
                    className='inline-block mt-2 px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-600 font-bold text-xs cursor-pointer hover:bg-emerald-500 hover:text-white transition-all'
                  >
                    Chọn Tệp Từ Máy Tính
                  </label>
                </div>

                {/* Raw Content Textarea */}
                <div>
                  <div className='flex items-center justify-between mb-1'>
                    <label className='font-bold opacity-75'>
                      Hoặc dán toàn bộ nội dung văn bản: *
                    </label>
                    {previewChapterCount > 0 && (
                      <span className='text-xs font-bold text-emerald-600 flex items-center gap-1'>
                        <Sparkles size={12} /> Nhận diện ~{previewChapterCount} chương
                      </span>
                    )}
                  </div>
                  <textarea
                    rows={8}
                    value={importContent}
                    onChange={(e) => setImportContent(e.target.value)}
                    placeholder='Dán nội dung truyện tại đây (Tự động nhận diện các tiêu đề Chương 1, Chương 2, Chapter 1...)'
                    className='w-full p-3 rounded-2xl bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border outline-none focus:border-emerald-500 text-xs font-mono leading-relaxed'
                  />
                </div>
              </div>
            )}

            {/* Footer Buttons */}
            <div className='flex items-center justify-end gap-3 pt-3 border-t border-gray-100 dark:border-dark-border'>
              <button
                onClick={() => setIsImportModalOpen(false)}
                className='px-4 py-2 rounded-2xl bg-gray-100 dark:bg-dark-border text-xs font-bold'
              >
                Đóng
              </button>
              {importTab === 'txt' && (
                <button
                  onClick={handleExecuteImport}
                  disabled={importing || !importTitleVi.trim() || !importContent.trim()}
                  className='px-6 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/25 disabled:opacity-40 flex items-center gap-1.5'
                >
                  {importing
                    ? 'Đang phân tích và nhập...'
                    : `Xác Nhận Nhập Truyện (${previewChapterCount} chương)`}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
