// ============================================
// In-App YouTube Video Explorer Modal
// ============================================

import React, { useState, useMemo } from 'react'
import {
  X,
  Search,
  Compass,
  Play,
  Clock,
  BookOpen,
  Link2,
  CheckCircle2,
  Filter,
} from 'lucide-react'
import { VideoInfo, ALL_CURATED_LEARNING_VIDEOS, extractYouTubeVideoId } from '@/services/youtubeTranscriptService'

interface VideoExplorerModalProps {
  currentVideoId: string | null
  onSelectVideo: (videoId: string, info?: VideoInfo) => void
  onClose: () => void
}

type CategoryType = 'all' | 'speeches' | 'daily' | 'work' | 'tech' | 'movies'

const CATEGORIES: { id: CategoryType; label: string; icon: string }[] = [
  { id: 'all', label: '🌟 Tất cả', icon: '🌟' },
  { id: 'speeches', label: '🎤 Diễn Thuyết & TED', icon: '🎤' },
  { id: 'daily', label: '💬 Đời Sống & Giao Tiếp', icon: '💬' },
  { id: 'work', label: '💼 Phỏng Vấn & Công Sở', icon: '💼' },
  { id: 'tech', label: '💻 Công Nghệ & IT', icon: '💻' },
  { id: 'movies', label: '🎬 Phim Ảnh & Cảm Hứng', icon: '🎬' },
]

export const VideoExplorerModal: React.FC<VideoExplorerModalProps> = ({
  currentVideoId,
  onSelectVideo,
  onClose,
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [customUrl, setCustomUrl] = useState('')
  const [showCustomInput, setShowCustomInput] = useState(false)
  const [urlError, setUrlError] = useState('')

  // Filter video catalog based on category and live search query
  const filteredVideos = useMemo(() => {
    return ALL_CURATED_LEARNING_VIDEOS.filter((item) => {
      const { info } = item
      const matchesCategory =
        activeCategory === 'all' || info.category === activeCategory

      const q = searchQuery.toLowerCase().trim()
      if (!q) return matchesCategory

      const matchesSearch =
        info.title.toLowerCase().includes(q) ||
        info.channel.toLowerCase().includes(q) ||
        (info.description && info.description.toLowerCase().includes(q)) ||
        (info.tags && info.tags.some((tag) => tag.toLowerCase().includes(q)))

      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  // Handle custom URL submission
  const handleCustomUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setUrlError('')

    const id = extractYouTubeVideoId(customUrl.trim())
    if (!id) {
      setUrlError('Link YouTube không hợp lệ. Vui lòng kiểm tra lại!')
      return
    }

    onSelectVideo(id, {
      videoId: id,
      title: `YouTube Video (${id})`,
      channel: 'YouTube Creator',
      thumbnailUrl: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
      durationFormatted: 'Bilingual',
    })
    onClose()
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-md animate-fadeIn'>
      <div className='w-full max-w-3xl bg-white dark:bg-dark-card rounded-3xl p-4 sm:p-6 shadow-2xl border border-gray-200/80 dark:border-gray-800 space-y-4 max-h-[90vh] flex flex-col'>
        {/* Header */}
        <div className='flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800/80'>
          <div className='flex items-center gap-2.5'>
            <div className='p-2 rounded-2xl bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400'>
              <Compass size={22} />
            </div>
            <div>
              <h3 className='font-display font-black text-lg sm:text-xl text-gray-900 dark:text-white flex items-center gap-2'>
                Kho Video Học Tiếng Anh Song Ngữ
                <span className='px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400'>
                  {ALL_CURATED_LEARNING_VIDEOS.length} Video
                </span>
              </h3>
              <p className='text-xs text-gray-500 dark:text-gray-400'>
                Chọn video trực tiếp bên dưới hoặc tìm kiếm theo chủ đề mà không cần dán link
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className='p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
            aria-label='Close Modal'
          >
            <X size={20} />
          </button>
        </div>

        {/* Live Search & Custom Link Toggle */}
        <div className='space-y-2.5'>
          <div className='flex items-center gap-2'>
            <div className='relative flex-1'>
              <Search
                size={16}
                className='absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400'
              />
              <input
                type='text'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='Tìm video, diễn giả, chủ đề (Steve Jobs, Daily English, TED, Interview, IT...)...'
                className='w-full pl-10 pr-4 py-2.5 rounded-2xl text-xs sm:text-sm bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all placeholder:text-gray-400'
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs'
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <button
              onClick={() => setShowCustomInput((prev) => !prev)}
              className={`px-3 py-2.5 rounded-2xl text-xs font-semibold border transition-all flex items-center gap-1.5 shrink-0 ${
                showCustomInput
                  ? 'bg-primary-50 dark:bg-primary-950/40 border-primary-300 dark:border-primary-800 text-primary-600'
                  : 'bg-white dark:bg-gray-800/40 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-gray-400'
              }`}
              title='Nhập link YouTube tùy chỉnh'
            >
              <Link2 size={15} />
              <span className='hidden sm:inline'>Dán link riêng</span>
            </button>
          </div>

          {/* Collapsible Custom URL Input */}
          {showCustomInput && (
            <form
              onSubmit={handleCustomUrlSubmit}
              className='p-3 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700/80 space-y-2 animate-fadeIn'
            >
              <div className='flex items-center gap-2'>
                <input
                  type='text'
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  placeholder='Dán link YouTube (VD: https://www.youtube.com/watch?v=...)'
                  className='flex-1 px-3.5 py-2 rounded-xl text-xs bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500'
                />
                <button
                  type='submit'
                  className='px-4 py-2 rounded-xl bg-primary-600 hover:bg-primary-500 text-white text-xs font-bold shadow-md shadow-primary-500/20 transition-all shrink-0'
                >
                  Mở Video
                </button>
              </div>
              {urlError && <p className='text-xs text-rose-500 font-medium'>{urlError}</p>}
            </form>
          )}

          {/* Category Tabs */}
          <div className='flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5'>
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 active:scale-95 ${
                    isActive
                      ? 'bg-primary-600 text-white shadow-md shadow-primary-500/25 ring-2 ring-primary-500/20'
                      : 'bg-gray-100 dark:bg-gray-800/60 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {cat.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Video Grid / List */}
        <div className='flex-1 overflow-y-auto pr-1 space-y-3 min-h-[250px]'>
          {filteredVideos.length === 0 ? (
            <div className='text-center py-12 space-y-2'>
              <Filter size={32} className='mx-auto text-gray-300 dark:text-gray-600' />
              <p className='text-sm font-semibold text-gray-500 dark:text-gray-400'>
                Không tìm thấy video nào phù hợp với từ khóa "{searchQuery}"
              </p>
              <p className='text-xs text-gray-400'>
                Hãy thử tìm bằng từ khóa khác hoặc dán link YouTube trực tiếp ở trên.
              </p>
            </div>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
              {filteredVideos.map((item) => {
                const { info } = item
                const isSelected = currentVideoId === info.videoId

                return (
                  <div
                    key={info.videoId}
                    id={`video-card-${info.videoId}`}
                    onClick={() => {
                      onSelectVideo(info.videoId, info)
                      onClose()
                    }}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer group flex flex-col justify-between space-y-3 relative overflow-hidden ${
                      isSelected
                        ? 'bg-primary-50/70 dark:bg-primary-950/30 border-primary-500 ring-2 ring-primary-500/20 shadow-md'
                        : 'bg-white dark:bg-gray-800/50 border-gray-100 dark:border-gray-800 hover:border-primary-300 dark:hover:border-primary-800 hover:shadow-lg'
                    }`}
                  >
                    {/* Top row: Thumbnail & Badges */}
                    <div className='flex gap-3'>
                      <div className='relative w-28 sm:w-32 aspect-video rounded-xl overflow-hidden bg-black shrink-0 shadow-sm'>
                        <img
                          src={info.thumbnailUrl}
                          alt={info.title}
                          className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                          loading='lazy'
                        />
                        {/* Play Icon Overlay */}
                        <div className='absolute inset-0 bg-black/25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
                          <div className='p-1.5 rounded-full bg-primary-600 text-white shadow-lg'>
                            <Play size={12} className='fill-white' />
                          </div>
                        </div>
                        {/* Duration Badge */}
                        {info.durationFormatted && (
                          <div className='absolute bottom-1 right-1 px-1.5 py-0.5 rounded-md bg-black/80 text-[9px] font-mono font-bold text-white flex items-center gap-0.5'>
                            <Clock size={9} />
                            {info.durationFormatted}
                          </div>
                        )}
                      </div>

                      {/* Info & Level */}
                      <div className='flex-1 min-w-0 space-y-1'>
                        <div className='flex items-center gap-1.5 flex-wrap'>
                          {info.level && (
                            <span className='px-1.5 py-0.5 rounded-md text-[9px] font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200/60 dark:border-amber-900/50'>
                              {info.level}
                            </span>
                          )}
                          {info.sentenceCount && (
                            <span className='px-1.5 py-0.5 rounded-md text-[9px] font-bold bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-900/50 flex items-center gap-0.5'>
                              <BookOpen size={9} />
                              {info.sentenceCount} câu
                            </span>
                          )}
                        </div>

                        <h4 className='text-xs sm:text-sm font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors leading-snug'>
                          {info.title}
                        </h4>

                        <p className='text-[11px] text-gray-500 dark:text-gray-400 truncate'>
                          {info.channel}
                        </p>
                      </div>
                    </div>

                    {/* Bottom: Description & Tags */}
                    {info.description && (
                      <p className='text-[11px] text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed'>
                        {info.description}
                      </p>
                    )}

                    {/* Action button */}
                    <div className='flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800/80'>
                      <div className='flex items-center gap-1 overflow-hidden'>
                        {info.tags?.slice(0, 2).map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className='text-[10px] text-gray-400 dark:text-gray-500 font-medium'
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <span
                        className={`text-xs font-bold flex items-center gap-1 ${
                          isSelected
                            ? 'text-primary-600 dark:text-primary-400'
                            : 'text-gray-500 group-hover:text-primary-600 dark:group-hover:text-primary-400'
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <CheckCircle2 size={13} />
                            Đang học
                          </>
                        ) : (
                          <>
                            <Play size={11} className='fill-current' />
                            Học ngay
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
