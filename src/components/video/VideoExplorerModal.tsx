// ============================================
// In-App Direct YouTube Video Picker & IT/AI Flows
// ============================================

import React, { useState, useMemo, useEffect } from 'react'
import {
  X,
  Search,
  Play,
  Clock,
  BookOpen,
  Link2,
  CheckCircle2,
  Filter,
  Layers,
  ChevronRight,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Youtube,
  Tv,
} from 'lucide-react'
import {
  VideoInfo,
  ALL_CURATED_LEARNING_VIDEOS,
  extractYouTubeVideoId,
} from '@/services/youtubeTranscriptService'
import { IT_AI_LEARNING_FLOWS } from '@/data/itLearningFlows'
import {
  searchYouTubeDirectly,
  POPULAR_YOUTUBE_TOPICS,
  YouTubeSearchResult,
} from '@/services/youtubeSearchService'

interface VideoExplorerModalProps {
  currentVideoId: string | null
  onSelectVideo: (
    videoId: string,
    info?: VideoInfo,
    flowContext?: { flowTitle: string; step: number; totalSteps: number },
  ) => void
  onClose: () => void
}

type TabMode = 'yt_direct' | 'flows' | 'videos'
type CategoryType = 'all' | 'tech' | 'work' | 'speeches' | 'daily' | 'movies'

const CATEGORIES: { id: CategoryType; label: string; icon: string }[] = [
  { id: 'all', label: '🌟 Tất cả', icon: '🌟' },
  { id: 'tech', label: '💻 IT & Trí Tuệ Nhân Tạo (AI)', icon: '💻' },
  { id: 'work', label: '💼 Phỏng Vấn & Công Sở', icon: '💼' },
  { id: 'speeches', label: '🎤 Diễn Thuyết & TED', icon: '🎤' },
  { id: 'daily', label: '💬 Đời Sống & Giao Tiếp', icon: '💬' },
  { id: 'movies', label: '🎬 Phim Ảnh & Cảm Hứng', icon: '🎬' },
]

export const VideoExplorerModal: React.FC<VideoExplorerModalProps> = ({
  currentVideoId,
  onSelectVideo,
  onClose,
}) => {
  const [tabMode, setTabMode] = useState<TabMode>('yt_direct')
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [ytResults, setYtResults] = useState<YouTubeSearchResult[]>([])
  const [isSearchingYt, setIsSearchingYt] = useState(false)
  const [customUrl, setCustomUrl] = useState('')
  const [showCustomInput, setShowCustomInput] = useState(false)
  const [urlError, setUrlError] = useState('')
  const [expandedFlowId, setExpandedFlowId] = useState<string>(IT_AI_LEARNING_FLOWS[0].id)

  // Trigger live YouTube search
  const handleSearchYouTube = async (query: string) => {
    setIsSearchingYt(true)
    try {
      const results = await searchYouTubeDirectly(query || 'AI')
      setYtResults(results)
    } finally {
      setIsSearchingYt(false)
    }
  }

  // Initial YouTube search load
  useEffect(() => {
    handleSearchYouTube('AI')
  }, [])

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

  // Filter flows based on search query
  const filteredFlows = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    if (!q) return IT_AI_LEARNING_FLOWS

    return IT_AI_LEARNING_FLOWS.filter((flow) => {
      return (
        flow.title.toLowerCase().includes(q) ||
        flow.subtitle.toLowerCase().includes(q) ||
        flow.description.toLowerCase().includes(q) ||
        flow.videos.some(
          (v) =>
            v.info.title.toLowerCase().includes(q) ||
            v.info.tags?.some((t) => t.toLowerCase().includes(q)),
        )
      )
    })
  }, [searchQuery])

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
    <div className='fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md animate-fadeIn'>
      <div className='w-full max-w-4xl bg-white dark:bg-dark-card rounded-3xl p-4 sm:p-6 shadow-2xl border border-gray-200/80 dark:border-gray-800 space-y-4 max-h-[92vh] flex flex-col'>
        {/* Header */}
        <div className='flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800/80 shrink-0'>
          <div className='flex items-center gap-3'>
            <div className='p-2.5 rounded-2xl bg-gradient-to-tr from-red-600 to-primary-600 text-white shadow-md shadow-red-500/25'>
              <Youtube size={22} />
            </div>
            <div>
              <h3 className='font-display font-black text-base sm:text-xl text-gray-900 dark:text-white flex items-center gap-2'>
                Trỏ & Chọn Trực Tiếp Video YouTube
              </h3>
              <p className='text-xs text-gray-500 dark:text-gray-400'>
                Tìm kiếm và trỏ chọn bất kỳ video nào trực tiếp trên YouTube mà không cần dán link
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

        {/* Mode Switcher Tabs */}
        <div className='flex items-center justify-between gap-2 shrink-0 flex-wrap'>
          <div className='flex items-center p-1 rounded-2xl bg-gray-100 dark:bg-gray-800/80 border border-gray-200/60 dark:border-gray-700/60'>
            <button
              onClick={() => {
                setTabMode('yt_direct')
                handleSearchYouTube(searchQuery || 'AI')
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                tabMode === 'yt_direct'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Tv size={14} />
              <span>🔴 Trỏ Chọn YouTube (Trực Tiếp)</span>
            </button>

            <button
              onClick={() => setTabMode('flows')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                tabMode === 'flows'
                  ? 'bg-white dark:bg-gray-900 text-primary-600 dark:text-primary-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <GraduationCap size={14} />
              <span>🗺️ Lộ Trình IT & AI ({IT_AI_LEARNING_FLOWS.length})</span>
            </button>

            <button
              onClick={() => setTabMode('videos')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                tabMode === 'videos'
                  ? 'bg-white dark:bg-gray-900 text-primary-600 dark:text-primary-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Layers size={14} />
              <span>🎥 Thư Viện ({ALL_CURATED_LEARNING_VIDEOS.length})</span>
            </button>
          </div>

          {/* Quick Paste Link Option */}
          <button
            onClick={() => setShowCustomInput((prev) => !prev)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
              showCustomInput
                ? 'bg-primary-50 dark:bg-primary-950/40 border-primary-300 dark:border-primary-800 text-primary-600'
                : 'bg-white dark:bg-gray-800/40 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-gray-400'
            }`}
          >
            <Link2 size={14} />
            <span>Dán link YouTube</span>
          </button>
        </div>

        {/* Live Search Bar */}
        <div className='space-y-2 shrink-0'>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (tabMode === 'yt_direct') {
                handleSearchYouTube(searchQuery)
              }
            }}
            className='flex items-center gap-2'
          >
            <div className='relative flex-1'>
              <Search
                size={16}
                className='absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400'
              />
              <input
                type='text'
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  if (tabMode === 'yt_direct') {
                    handleSearchYouTube(e.target.value)
                  }
                }}
                placeholder={
                  tabMode === 'yt_direct'
                    ? 'Tìm trực tiếp trên YouTube (VD: Python, Machine Learning, Clean Code, TED, Steve Jobs...)...'
                    : tabMode === 'flows'
                      ? 'Tìm kiếm lộ trình học (AI, LLM, Clean Code, Git, Phỏng vấn IT...)...'
                      : 'Tìm video, diễn giả, từ khóa...'
                }
                className='w-full pl-10 pr-4 py-2.5 rounded-2xl text-xs sm:text-sm bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all placeholder:text-gray-400'
                autoFocus
              />
              {searchQuery && (
                <button
                  type='button'
                  onClick={() => {
                    setSearchQuery('')
                    if (tabMode === 'yt_direct') handleSearchYouTube('')
                  }}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs'
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {tabMode === 'yt_direct' && (
              <button
                type='submit'
                className='px-4 py-2.5 rounded-2xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-md shadow-red-500/20 transition-all shrink-0 flex items-center gap-1.5'
              >
                <Search size={14} />
                <span className='hidden sm:inline'>Tìm YouTube</span>
              </button>
            )}
          </form>

          {/* Quick Search Chips (When in YouTube Direct Picker Mode) */}
          {tabMode === 'yt_direct' && (
            <div className='flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5'>
              {POPULAR_YOUTUBE_TOPICS.map((topic, tIdx) => (
                <button
                  key={tIdx}
                  onClick={() => {
                    setSearchQuery(topic.query)
                    handleSearchYouTube(topic.query)
                  }}
                  className='px-3 py-1 rounded-xl text-[11px] font-semibold bg-gray-100 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 dark:hover:text-red-400 transition-colors shrink-0'
                >
                  {topic.label}
                </button>
              ))}
            </div>
          )}

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

          {/* Category Tabs (When in Video Library Mode) */}
          {tabMode === 'videos' && (
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
          )}
        </div>

        {/* Content Area */}
        <div className='flex-1 overflow-y-auto pr-1 min-h-[300px]'>
          {tabMode === 'yt_direct' ? (
            /* ========================================================== */
            /* TAB 1: DIRECT YOUTUBE SEARCH & VIDEO PICKER               */
            /* ========================================================== */
            <div>
              {isSearchingYt ? (
                <div className='text-center py-12 space-y-2'>
                  <Sparkles size={28} className='animate-spin mx-auto text-red-500' />
                  <p className='text-xs font-bold text-gray-500'>Đang tìm kiếm trực tiếp trên YouTube...</p>
                </div>
              ) : ytResults.length === 0 ? (
                <div className='text-center py-12 space-y-2'>
                  <Filter size={32} className='mx-auto text-gray-300 dark:text-gray-600' />
                  <p className='text-sm font-semibold text-gray-500 dark:text-gray-400'>
                    Không tìm thấy video nào. Hãy thử nhập từ khóa khác ở trên!
                  </p>
                </div>
              ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                  {ytResults.map((ytVideo) => {
                    const isSelected = currentVideoId === ytVideo.videoId

                    return (
                      <div
                        key={ytVideo.videoId}
                        id={`yt-direct-card-${ytVideo.videoId}`}
                        onClick={() => {
                          onSelectVideo(ytVideo.videoId, {
                            videoId: ytVideo.videoId,
                            title: ytVideo.title,
                            channel: ytVideo.channel,
                            thumbnailUrl: ytVideo.thumbnailUrl,
                            durationFormatted: ytVideo.durationFormatted,
                            description: ytVideo.description,
                            tags: ytVideo.tags,
                          })
                          onClose()
                        }}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer group flex flex-col justify-between space-y-3 relative overflow-hidden ${
                          isSelected
                            ? 'bg-red-50/70 dark:bg-red-950/30 border-red-500 ring-2 ring-red-500/20 shadow-md'
                            : 'bg-white dark:bg-gray-800/50 border-gray-100 dark:border-gray-800 hover:border-red-400 dark:hover:border-red-700 hover:shadow-xl hover:-translate-y-0.5'
                        }`}
                      >
                        {/* Top: Thumbnail & Channel Info */}
                        <div className='flex gap-3'>
                          <div className='relative w-32 sm:w-36 aspect-video rounded-xl overflow-hidden bg-black shrink-0 shadow-sm'>
                            <img
                              src={ytVideo.thumbnailUrl}
                              alt={ytVideo.title}
                              className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                              loading='lazy'
                            />
                            {/* Glowing Play & Pick Overlay */}
                            <div className='absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
                              <div className='px-2.5 py-1.5 rounded-xl bg-red-600 text-white font-bold text-[10px] shadow-lg flex items-center gap-1'>
                                <Play size={11} className='fill-white' />
                                <span>Trỏ chọn video này</span>
                              </div>
                            </div>
                            {ytVideo.durationFormatted && (
                              <div className='absolute bottom-1 right-1 px-1.5 py-0.5 rounded-md bg-black/85 text-[9px] font-mono font-bold text-white flex items-center gap-0.5'>
                                <Clock size={9} />
                                {ytVideo.durationFormatted}
                              </div>
                            )}
                          </div>

                          <div className='flex-1 min-w-0 space-y-1'>
                            <span className='px-1.5 py-0.5 rounded-md text-[9px] font-extrabold bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200/60 dark:border-red-900/50 flex items-center gap-1 w-fit'>
                              <Youtube size={10} />
                              YouTube
                            </span>

                            <h4 className='text-xs sm:text-sm font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors leading-snug'>
                              {ytVideo.title}
                            </h4>

                            <p className='text-[11px] text-gray-500 dark:text-gray-400 truncate font-medium'>
                              {ytVideo.channel}
                            </p>
                          </div>
                        </div>

                        {/* Description */}
                        {ytVideo.description && (
                          <p className='text-[11px] text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed'>
                            {ytVideo.description}
                          </p>
                        )}

                        {/* Direct Select Call-To-Action */}
                        <div className='flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800/80'>
                          <div className='flex items-center gap-1 overflow-hidden'>
                            {ytVideo.tags?.slice(0, 2).map((tag, tIdx) => (
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
                                ? 'text-red-600 dark:text-red-400'
                                : 'text-gray-500 group-hover:text-red-600 dark:group-hover:text-red-400'
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
                                Chọn học ngay
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
          ) : tabMode === 'flows' ? (
            /* ========================================================== */
            /* TAB 2: IT & AI LEARNING FLOWS (ROADMAP VIEW)              */
            /* ========================================================== */
            <div className='space-y-4'>
              {filteredFlows.length === 0 ? (
                <div className='text-center py-12 space-y-2'>
                  <Filter size={32} className='mx-auto text-gray-300 dark:text-gray-600' />
                  <p className='text-sm font-semibold text-gray-500 dark:text-gray-400'>
                    Không tìm thấy lộ trình phù hợp với "{searchQuery}"
                  </p>
                </div>
              ) : (
                filteredFlows.map((flow) => {
                  const isExpanded = expandedFlowId === flow.id
                  const totalSteps = flow.videos.length

                  return (
                    <div
                      key={flow.id}
                      id={`flow-card-${flow.id}`}
                      className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
                        isExpanded
                          ? 'bg-gradient-to-b from-white to-gray-50/50 dark:from-dark-card dark:to-gray-900/50 border-primary-300 dark:border-primary-800/80 shadow-lg'
                          : 'bg-white dark:bg-gray-850 border-gray-200/80 dark:border-gray-800 hover:border-gray-300'
                      }`}
                    >
                      {/* Flow Header Banner */}
                      <div
                        onClick={() => setExpandedFlowId((prev) => (prev === flow.id ? '' : flow.id))}
                        className='p-4 sm:p-5 flex items-start justify-between gap-3 cursor-pointer select-none group'
                      >
                        <div className='flex items-start gap-3.5 min-w-0'>
                          <div className='text-3xl sm:text-4xl p-2 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700/60 shrink-0 group-hover:scale-105 transition-transform'>
                            {flow.icon}
                          </div>

                          <div className='space-y-1 min-w-0'>
                            <div className='flex items-center gap-2 flex-wrap'>
                              <span className='px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-primary-50 dark:bg-primary-950/50 text-primary-600 dark:text-primary-400 border border-primary-200/60 dark:border-primary-800/60'>
                                {flow.level}
                              </span>
                              <span className='px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 flex items-center gap-1'>
                                <Clock size={10} />
                                {flow.estimatedHours}
                              </span>
                              <span className='px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400'>
                                {totalSteps} Bài học liên kết
                              </span>
                            </div>

                            <h4 className='font-display font-extrabold text-base sm:text-lg text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors'>
                              {flow.title}
                            </h4>

                            <p className='text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed'>
                              {flow.description}
                            </p>
                          </div>
                        </div>

                        <button
                          className={`p-2 rounded-xl transition-transform duration-300 ${
                            isExpanded
                              ? 'rotate-90 bg-primary-100 dark:bg-primary-950/60 text-primary-600'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
                          }`}
                        >
                          <ChevronRight size={18} />
                        </button>
                      </div>

                      {/* Flow Steps List (Expanded) */}
                      {isExpanded && (
                        <div className='px-4 sm:px-5 pb-5 pt-2 border-t border-gray-100 dark:border-gray-800/80 space-y-3'>
                          <div className='text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5'>
                            <Sparkles size={13} className='text-primary-500' />
                            Các bước bài học trong lộ trình
                          </div>

                          <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
                            {flow.videos.map((vItem) => {
                              const isSelected = currentVideoId === vItem.info.videoId

                              return (
                                <div
                                  key={vItem.info.videoId}
                                  id={`flow-step-${vItem.info.videoId}`}
                                  onClick={() => {
                                    onSelectVideo(vItem.info.videoId, vItem.info, {
                                      flowTitle: flow.title,
                                      step: vItem.step,
                                      totalSteps,
                                    })
                                    onClose()
                                  }}
                                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-2.5 group relative ${
                                    isSelected
                                      ? 'bg-primary-50/80 dark:bg-primary-950/40 border-primary-500 ring-2 ring-primary-500/20 shadow-md'
                                      : 'bg-white dark:bg-gray-800/60 border-gray-200/80 dark:border-gray-700/80 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-md'
                                  }`}
                                >
                                  {/* Step Badge & Duration */}
                                  <div className='flex items-center justify-between'>
                                    <span className='px-2 py-0.5 rounded-lg text-[10px] font-black bg-gradient-to-r from-primary-600 to-indigo-600 text-white shadow-xs'>
                                      Bước {vItem.step}
                                    </span>
                                    <span className='text-[10px] font-mono font-bold text-gray-500 dark:text-gray-400 flex items-center gap-0.5'>
                                      <Clock size={10} />
                                      {vItem.info.durationFormatted}
                                    </span>
                                  </div>

                                  {/* Thumbnail Preview */}
                                  <div className='relative aspect-video rounded-xl overflow-hidden bg-black shadow-xs'>
                                    <img
                                      src={vItem.info.thumbnailUrl}
                                      alt={vItem.info.title}
                                      className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                                      loading='lazy'
                                    />
                                    <div className='absolute inset-0 bg-black/25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
                                      <div className='p-2 rounded-full bg-primary-600 text-white shadow-lg'>
                                        <Play size={13} className='fill-white' />
                                      </div>
                                    </div>
                                  </div>

                                  {/* Title & Channel */}
                                  <div>
                                    <h5 className='text-xs font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors leading-snug'>
                                      {vItem.info.title}
                                    </h5>
                                    <p className='text-[10px] text-gray-400 truncate mt-0.5'>
                                      {vItem.info.channel}
                                    </p>
                                  </div>

                                  {/* Action CTA */}
                                  <div className='pt-2 border-t border-gray-100 dark:border-gray-700/60 flex items-center justify-between'>
                                    <span className='text-[10px] text-blue-600 dark:text-blue-400 font-bold'>
                                      {vItem.info.sentenceCount} câu song ngữ
                                    </span>

                                    <span
                                      className={`text-xs font-bold flex items-center gap-1 ${
                                        isSelected
                                          ? 'text-primary-600 dark:text-primary-400'
                                          : 'text-gray-500 group-hover:text-primary-600'
                                      }`}
                                    >
                                      {isSelected ? (
                                        <>
                                          <CheckCircle2 size={12} />
                                          Đang học
                                        </>
                                      ) : (
                                        <>
                                          Học ngay
                                          <ArrowRight size={12} />
                                        </>
                                      )}
                                    </span>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })
              )}
            </div>
          ) : (
            /* ========================================================== */
            /* TAB 3: ALL VIDEOS CATALOGUE                                */
            /* ========================================================== */
            <div>
              {filteredVideos.length === 0 ? (
                <div className='text-center py-12 space-y-2'>
                  <Filter size={32} className='mx-auto text-gray-300 dark:text-gray-600' />
                  <p className='text-sm font-semibold text-gray-500 dark:text-gray-400'>
                    Không tìm thấy video nào phù hợp với "{searchQuery}"
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
                        <div className='flex gap-3'>
                          <div className='relative w-28 sm:w-32 aspect-video rounded-xl overflow-hidden bg-black shrink-0 shadow-sm'>
                            <img
                              src={info.thumbnailUrl}
                              alt={info.title}
                              className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                              loading='lazy'
                            />
                            <div className='absolute inset-0 bg-black/25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
                              <div className='p-1.5 rounded-full bg-primary-600 text-white shadow-lg'>
                                <Play size={12} className='fill-white' />
                              </div>
                            </div>
                            {info.durationFormatted && (
                              <div className='absolute bottom-1 right-1 px-1.5 py-0.5 rounded-md bg-black/80 text-[9px] font-mono font-bold text-white flex items-center gap-0.5'>
                                <Clock size={9} />
                                {info.durationFormatted}
                              </div>
                            )}
                          </div>

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

                        {info.description && (
                          <p className='text-[11px] text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed'>
                            {info.description}
                          </p>
                        )}

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
          )}
        </div>
      </div>
    </div>
  )
}
