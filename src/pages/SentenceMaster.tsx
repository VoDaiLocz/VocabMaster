// ============================================
// Sentence Master Page (4-Stage Progressive System)
// ============================================

import React, { useState } from 'react'
import {
  SentenceStageId,
  SentenceTopic,
  STAGES_METADATA,
  getTopicsByStage,
} from '@/data/sentence-patterns'
import { SentenceTilesBuilder } from '@/components/sentence'
import {
  Layers,
  Coffee,
  Briefcase,
  Terminal,
  ArrowLeft,
  Sparkles,
  Award,
  Zap,
  Trophy,
  Play,
} from 'lucide-react'

export const SentenceMaster: React.FC = () => {
  const [activeStageId, setActiveStageId] = useState<SentenceStageId>('1_foundation')
  const [activeTopic, setActiveTopic] = useState<SentenceTopic | null>(null)
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0)
  const [combo, setCombo] = useState(0)
  const [earnedXp, setEarnedXp] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)

  const currentTopics = getTopicsByStage(activeStageId)

  // Start practicing a selected topic
  const handleSelectTopic = (topic: SentenceTopic) => {
    setActiveTopic(topic)
    setCurrentSentenceIndex(0)
    setCombo(0)
    setEarnedXp(0)
    setIsCompleted(false)
  }

  // Answer is correct
  const handleCorrect = () => {
    setCombo((c) => c + 1)
    setEarnedXp((xp) => xp + 15 + combo * 5)
  }

  // Move to next sentence in topic
  const handleNextSentence = () => {
    if (!activeTopic) return
    if (currentSentenceIndex < activeTopic.sentences.length - 1) {
      setCurrentSentenceIndex((i) => i + 1)
    } else {
      setIsCompleted(true)
    }
  }

  // Return to topic selection
  const handleBackToTopics = () => {
    setActiveTopic(null)
    setIsCompleted(false)
  }

  // Stage Icon Mapper
  const renderStageIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layers':
        return <Layers size={20} />
      case 'Coffee':
        return <Coffee size={20} />
      case 'Briefcase':
        return <Briefcase size={20} />
      case 'Terminal':
        return <Terminal size={20} />
      default:
        return <Sparkles size={20} />
    }
  }

  return (
    <div className='p-4 md:p-8 max-w-7xl mx-auto space-y-6'>
      {/* Page Header */}
      {!activeTopic && (
        <div>
          <div className='flex items-center gap-2 mb-1'>
            <div className='p-2 rounded-xl bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400'>
              <Sparkles size={24} />
            </div>
            <h1 className='font-display font-bold text-2xl md:text-3xl text-gray-900 dark:text-white'>
              Sentence Master: Luyện Đặt Câu & Tư Duy Giao Tiếp
            </h1>
          </div>
          <p className='text-sm text-gray-500 dark:text-gray-400'>
            Làm chủ hơn 1.000+ khung câu phản xạ qua 4 giai đoạn từ Nền tảng, Đời sống, Công sở đến
            Chuyên ngành IT.
          </p>
        </div>
      )}

      {/* Main Content Arena */}
      {activeTopic ? (
        <div className='space-y-6'>
          {/* Practice Header Bar */}
          <div className='flex items-center justify-between bg-white dark:bg-dark-card p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm'>
            <button
              onClick={handleBackToTopics}
              className='px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 text-xs font-semibold flex items-center gap-1.5 transition-colors'
            >
              <ArrowLeft size={16} /> Danh sách bài học
            </button>

            <div className='text-center'>
              <h3 className='text-sm font-bold text-gray-900 dark:text-white font-display'>
                {activeTopic.titleVi}
              </h3>
              <p className='text-xs text-gray-400 font-medium'>
                Câu {currentSentenceIndex + 1} / {activeTopic.sentences.length}
              </p>
            </div>

            <div className='flex items-center gap-3'>
              {combo > 1 && (
                <div className='flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 text-xs font-bold animate-pulse'>
                  <Zap size={14} /> Combo x{combo}!
                </div>
              )}
              <div className='flex items-center gap-1 text-xs font-bold text-primary-600 dark:text-primary-400'>
                <Award size={16} /> +{earnedXp} XP
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className='w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full overflow-hidden'>
            <div
              className='bg-gradient-to-r from-primary-600 to-emerald-500 h-full transition-all duration-300'
              style={{
                width: `${((currentSentenceIndex + (isCompleted ? 1 : 0)) / activeTopic.sentences.length) * 100}%`,
              }}
            />
          </div>

          {/* Practice Builder or Completion Card */}
          {isCompleted ? (
            <div className='w-full max-w-xl mx-auto bg-white dark:bg-dark-card rounded-3xl p-8 text-center border border-gray-100 dark:border-gray-800 shadow-2xl space-y-6'>
              <div className='w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 to-amber-600 text-white flex items-center justify-center shadow-lg shadow-amber-500/30'>
                <Trophy size={40} />
              </div>
              <div>
                <h2 className='text-2xl font-bold font-display text-gray-900 dark:text-white'>
                  Chúc Mừng! Bạn Đã Hoàn Thành Bài Học
                </h2>
                <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
                  Bạn vừa làm chủ các khung câu của chủ đề: "{activeTopic.titleVi}"
                </p>
              </div>

              <div className='grid grid-cols-2 gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800'>
                <div>
                  <span className='text-xs text-gray-400 font-medium'>Số câu hoàn thành</span>
                  <p className='text-2xl font-bold text-gray-900 dark:text-white font-mono'>
                    {activeTopic.sentences.length}
                  </p>
                </div>
                <div>
                  <span className='text-xs text-gray-400 font-medium'>XP Tích Lũy</span>
                  <p className='text-2xl font-bold text-emerald-600 dark:text-emerald-400 font-mono'>
                    +{earnedXp}
                  </p>
                </div>
              </div>

              <button
                onClick={handleBackToTopics}
                className='w-full py-3.5 rounded-2xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-sm shadow-lg shadow-primary-500/25 transition-all'
              >
                Tiếp tục học các chủ đề khác
              </button>
            </div>
          ) : (
            <SentenceTilesBuilder
              sentence={activeTopic.sentences[currentSentenceIndex]}
              onNext={handleNextSentence}
              onCorrectAnswer={handleCorrect}
            />
          )}
        </div>
      ) : (
        /* Topics & Stages Browser */
        <div className='space-y-6'>
          {/* 4 Stages Tab Selector */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3'>
            {STAGES_METADATA.map((stage) => {
              const isActive = activeStageId === stage.id
              return (
                <div
                  key={stage.id}
                  onClick={() => setActiveStageId(stage.id)}
                  className={`p-4 rounded-2xl cursor-pointer border transition-all relative overflow-hidden ${
                    isActive
                      ? 'bg-white dark:bg-dark-card border-primary-500 ring-2 ring-primary-500/20 shadow-lg'
                      : 'bg-white/60 dark:bg-dark-card/60 border-gray-100 dark:border-gray-800 hover:border-gray-300'
                  }`}
                >
                  <div className='flex items-center gap-3'>
                    <div
                      className={`p-2.5 rounded-xl text-white bg-gradient-to-br ${stage.color} shadow-sm`}
                    >
                      {renderStageIcon(stage.icon)}
                    </div>
                    <div className='min-w-0'>
                      <span className='text-[10px] font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400'>
                        {stage.subtitle}
                      </span>
                      <h4 className='text-sm font-bold text-gray-900 dark:text-white truncate'>
                        {stage.name.split(':')[1] || stage.name}
                      </h4>
                    </div>
                  </div>
                  <p className='text-xs text-gray-500 dark:text-gray-400 mt-2 line-clamp-2'>
                    {stage.description}
                  </p>
                </div>
              )
            })}
          </div>

          {/* Topics Grid for Active Stage */}
          <div className='space-y-3'>
            <div className='flex items-center justify-between'>
              <h3 className='text-base font-bold font-display text-gray-900 dark:text-white'>
                Danh Sách Bài Học ({currentTopics.length} Chủ Đề)
              </h3>
              <span className='text-xs text-gray-400 font-medium'>
                Chọn một chủ đề để bắt đầu luyện tư duy đặt câu
              </span>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {currentTopics.map((topic, idx) => (
                <div
                  key={topic.id}
                  onClick={() => handleSelectTopic(topic)}
                  className='p-5 rounded-2xl bg-white dark:bg-dark-card border border-gray-100 dark:border-gray-800 hover:border-primary-300 dark:hover:border-primary-800 hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between space-y-4'
                >
                  <div>
                    <div className='flex items-center justify-between mb-2'>
                      <span className='text-xs font-mono font-bold text-primary-600 dark:text-primary-400'>
                        Bài {idx + 1}
                      </span>
                      <span className='px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'>
                        {topic.level}
                      </span>
                    </div>
                    <h4 className='text-base font-bold font-display text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors'>
                      {topic.titleVi}
                    </h4>
                    <p className='text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2'>
                      {topic.description}
                    </p>
                  </div>

                  <div className='pt-3 border-t border-gray-100 dark:border-gray-800/60 flex items-center justify-between'>
                    <span className='text-xs text-gray-400 font-medium'>
                      {topic.sentences.length} câu thực chiến
                    </span>
                    <button className='p-2 rounded-xl bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 group-hover:bg-primary-600 group-hover:text-white transition-all shadow-sm'>
                      <Play size={14} fill='currentColor' />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
