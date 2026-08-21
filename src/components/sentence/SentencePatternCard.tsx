// ============================================
// Sentence Pattern Explanation Card
// ============================================

import React from 'react'
import { Sparkles, BookOpen, Layers } from 'lucide-react'
import { SentenceTopic } from '@/data/sentence-patterns/types'

interface SentencePatternCardProps {
  topic: SentenceTopic
  onStartPractice: () => void
}

export const SentencePatternCard: React.FC<SentencePatternCardProps> = ({
  topic,
  onStartPractice,
}) => {
  return (
    <div className='p-6 rounded-3xl bg-white dark:bg-dark-card border border-gray-100 dark:border-gray-800 shadow-xl space-y-5'>
      <div className='flex items-start justify-between'>
        <div>
          <span className='px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400'>
            {topic.level}
          </span>
          <h2 className='text-2xl font-bold font-display text-gray-900 dark:text-white mt-2'>
            {topic.titleVi}
          </h2>
          <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
            {topic.title} • {topic.sentences.length} câu thực chiến
          </p>
        </div>
        <div className='p-3 rounded-2xl bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400'>
          <Layers size={24} />
        </div>
      </div>

      <p className='text-sm text-gray-700 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-gray-800/40 p-4 rounded-2xl border border-gray-100 dark:border-gray-800'>
        {topic.description}
      </p>

      {/* Examples Preview */}
      <div className='space-y-2.5'>
        <div className='text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1'>
          <Sparkles size={14} className='text-amber-500' /> Các Khung Câu Tiêu Biểu:
        </div>
        <div className='space-y-2'>
          {topic.sentences.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className='p-3 rounded-xl bg-primary-50/40 dark:bg-primary-950/20 border border-primary-100 dark:border-primary-900/30'
            >
              <div className='text-xs font-mono font-bold text-primary-700 dark:text-primary-300'>
                {item.pattern}
              </div>
              <p className='text-sm font-medium text-gray-800 dark:text-gray-200 mt-0.5'>
                "{item.textEn}"
              </p>
              <p className='text-xs text-gray-500 dark:text-gray-400 mt-0.5'>{item.textVi}</p>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onStartPractice}
        className='w-full py-3.5 rounded-2xl bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-600 text-white font-bold text-sm shadow-lg shadow-primary-500/25 flex items-center justify-center gap-2 transition-all'
      >
        <BookOpen size={18} />
        <span>Bắt Đầu Luyện Đặt Câu</span>
      </button>
    </div>
  )
}
