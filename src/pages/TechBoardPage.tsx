// ============================================
// Tech Learning Board Page (Trello / Kanban System)
// Giao diện học tập kiến thức công nghệ chuẩn kỹ sư phần mềm
// ============================================

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { TechLearningBoard } from '@/components/tech-learning/TechLearningBoard'
import { Kanban, ArrowLeft, Youtube } from 'lucide-react'

export const TechBoardPage: React.FC = () => {
  const navigate = useNavigate()

  const handleNavigateToVideo = (videoId: string, timestamp?: number) => {
    navigate(`/video-learning?v=${videoId}${timestamp !== undefined ? `&t=${timestamp}` : ''}`)
  }

  return (
    <div className='p-3 sm:p-6 max-w-7xl mx-auto space-y-4 min-h-[calc(100vh-80px)] animate-fadeIn'>
      {/* Top Banner Navigation */}
      <div className='flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-gray-100 dark:border-gray-800/80'>
        <div className='flex items-center gap-3'>
          <button
            onClick={() => navigate(-1)}
            className='p-2 rounded-xl bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shadow-xs'
            title='Quay lại'
          >
            <ArrowLeft size={18} />
          </button>
          <div className='flex items-center gap-2.5'>
            <div className='p-2 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/20'>
              <Kanban size={22} />
            </div>
            <div>
              <h1 className='font-display font-bold text-xl text-gray-900 dark:text-white flex items-center gap-2'>
                Bảng Học Tập Công Nghệ
                <span className='px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 text-xs font-semibold'>
                  Kanban Trello
                </span>
              </h1>
              <p className='text-xs text-gray-500 dark:text-gray-400'>
                Hệ thống Mental Models, Trade-offs & Từ vựng kỹ thuật cho Kỹ sư phần mềm
              </p>
            </div>
          </div>
        </div>

        <div className='flex items-center gap-2'>
          <button
            onClick={() => navigate('/video-learning')}
            className='flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/40 text-xs font-semibold hover:bg-red-100 transition-all shadow-xs'
          >
            <Youtube size={15} />
            <span>Mở Video Song Ngữ</span>
          </button>
        </div>
      </div>

      {/* Main Board Component */}
      <div className='bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-gray-800 p-3 sm:p-5 shadow-sm'>
        <TechLearningBoard onNavigateToVideo={handleNavigateToVideo} />
      </div>
    </div>
  )
}

export default TechBoardPage
