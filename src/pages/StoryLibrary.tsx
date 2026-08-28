// ============================================
// Bilingual Story Library Page
// ============================================

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BILINGUAL_STORIES_DATA } from '@/data/stories'
import { StoryCategory } from '@/types/story'
import {
  BookOpen,
  Search,
  Clock,
  ChevronRight,
  Star,
} from 'lucide-react'

export const StoryLibrary: React.FC = () => {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState<StoryCategory | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const CATEGORIES: { id: StoryCategory | 'all'; label: string; icon: string }[] = [
    { id: 'all', label: 'Tất cả truyện', icon: '✨' },
    { id: 'xianxia', label: 'Tiên Hiệp & Tu Chân', icon: '⚔️' },
    { id: 'tech', label: 'Công Nghệ & Khởi Nghiệp', icon: '💻' },
    { id: 'fables', label: 'Ngụ Ngôn & Triết Lý', icon: '🦊' },
  ]

  const filteredStories = BILINGUAL_STORIES_DATA.filter((story) => {
    const matchesCat = selectedCategory === 'all' || story.category === selectedCategory
    const matchesSearch =
      story.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.titleVi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.descriptionVi.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCat && matchesSearch
  })

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-white pb-24'>
      {/* Header Banner */}
      <div className='bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 text-white pt-8 pb-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-6xl mx-auto space-y-4'>
          <div className='flex items-center gap-3'>
            <div className='w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner'>
              <BookOpen size={24} className='text-amber-300' />
            </div>
            <div>
              <span className='px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30'>
                Extensive Reading
              </span>
              <h1 className='text-2xl sm:text-3xl font-extrabold font-display'>
                Đọc Truyện Song Ngữ Anh - Việt
              </h1>
            </div>
          </div>
          <p className='text-sm sm:text-base text-emerald-100 max-w-2xl'>
            Đắm chìm vào thế giới Tiên Hiệp Tu Chân, Khởi nghiệp Công nghệ và Truyện ngụ ngôn. Tra từ điển 1-chạm, nghe audio bản xứ và mở rộng vốn từ tự nhiên.
          </p>

          {/* Search Bar */}
          <div className='pt-2 max-w-xl'>
            <div className='relative'>
              <Search
                size={18}
                className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'
              />
              <input
                type='text'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='Tìm kiếm truyện theo tên, từ khóa...'
                className='w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-dark-card text-gray-900 dark:text-white placeholder-gray-400 border border-transparent focus:border-amber-400 shadow-lg text-sm outline-none transition-all'
              />
            </div>
          </div>
        </div>
      </div>

      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 space-y-6'>
        {/* Category Filters */}
        <div className='flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none'>
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all shadow-sm ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-emerald-500/25 shadow-lg scale-105'
                    : 'bg-white dark:bg-dark-card text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-100 dark:border-gray-800'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            )
          })}
        </div>

        {/* Stories Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredStories.map((story) => (
            <div
              key={story.id}
              id={`story-card-${story.id}`}
              onClick={() => navigate(`/story/${story.id}`)}
              className='group rounded-3xl bg-white dark:bg-dark-card border border-gray-100 dark:border-gray-800 hover:border-emerald-300 dark:hover:border-emerald-700/60 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col overflow-hidden'
            >
              {/* Cover Image */}
              <div className='relative h-48 overflow-hidden bg-gray-900'>
                <img
                  src={story.coverImage}
                  alt={story.titleEn}
                  className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent' />

                {/* Level and Rating badge */}
                <div className='absolute top-3 left-3 flex items-center gap-1.5'>
                  <span className='px-2.5 py-1 rounded-xl bg-black/60 backdrop-blur-md text-[11px] font-bold text-amber-300 border border-white/10'>
                    {story.level}
                  </span>
                  <span className='flex items-center gap-1 px-2 py-1 rounded-xl bg-amber-500/90 backdrop-blur-md text-[11px] font-extrabold text-white shadow-sm'>
                    <Star size={12} className='fill-current' /> {story.rating}
                  </span>
                </div>

                <div className='absolute top-3 right-3 px-2.5 py-1 rounded-xl bg-emerald-600/90 backdrop-blur-md text-[11px] font-bold text-white shadow-sm'>
                  {story.category === 'xianxia'
                    ? '⚔️ Tiên Hiệp'
                    : story.category === 'tech'
                    ? '💻 Công Nghệ'
                    : '🦊 Ngụ Ngôn'}
                </div>

                <div className='absolute bottom-3 left-3 right-3 text-white'>
                  <p className='text-xs text-emerald-300 font-medium line-clamp-1 flex items-center justify-between'>
                    <span>{story.author}</span>
                    <span className='text-[10px] text-amber-200 font-mono'>🔥 {story.readsCount} lượt đọc</span>
                  </p>
                  <h3 className='text-base font-bold font-display line-clamp-1 group-hover:text-amber-300 transition-colors'>
                    {story.titleEn}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className='p-5 flex-1 flex flex-col justify-between space-y-4'>
                <div>
                  <h4 className='text-sm font-bold text-gray-800 dark:text-gray-200 line-clamp-1'>
                    {story.titleVi}
                  </h4>
                  <p className='text-xs text-gray-500 dark:text-gray-400 mt-1.5 line-clamp-2 leading-relaxed'>
                    {story.descriptionVi}
                  </p>
                </div>

                {/* Target Vocab preview */}
                <div className='flex flex-wrap gap-1.5'>
                  {story.targetVocabulary.slice(0, 3).map((v: { word: string; ipa: string; meaningVi: string }) => (
                    <span
                      key={v.word}
                      className='px-2 py-0.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 text-[10px] font-semibold border border-emerald-200/60 dark:border-emerald-800/40'
                    >
                      {v.word}
                    </span>
                  ))}
                  {story.targetVocabulary.length > 3 && (
                    <span className='px-1.5 py-0.5 text-[10px] text-gray-400 font-medium'>
                      +{story.targetVocabulary.length - 3}
                    </span>
                  )}
                </div>

                {/* Tags preview */}
                {story.tags && (
                  <div className='flex flex-wrap gap-1'>
                    {story.tags.slice(0, 3).map((t: string) => (
                      <span
                        key={t}
                        className='px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800/60 text-gray-600 dark:text-gray-400 text-[10px] font-medium'
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                )}

                {/* Footer stats */}
                <div className='pt-3 border-t border-gray-100 dark:border-gray-800/60 flex items-center justify-between text-xs text-gray-400'>
                  <div className='flex items-center gap-3'>
                    <span className='flex items-center gap-1 font-medium'>
                      <Clock size={13} /> {story.estimatedMinutes} phút
                    </span>
                    <span>•</span>
                    <span>{story.wordCount} từ</span>
                  </div>

                  <div className='w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm'>
                    <ChevronRight size={16} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
