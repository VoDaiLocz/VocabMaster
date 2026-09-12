// ============================================
// App Root Component
// ============================================

import React, { Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { TitleBar, Sidebar, AchievementPopup, MobileNav, ErrorBoundary } from '@/components/common'
import { Home } from '@/pages/Home'
import { Learn } from '@/pages/Learn'
import { Decks } from '@/pages/Decks'
import { DeckDetail } from '@/pages/DeckDetail'
import { Library } from '@/pages/Library'
import { Stats } from '@/pages/Stats'
import { Settings } from '@/pages/Settings'
import { Achievements } from '@/pages/Achievements'
import { MiniMode } from '@/pages/MiniMode'
import { ImportData } from '@/pages/ImportData'

// Lazy load heavy components to reduce initial bundle size
const VideoLearning = React.lazy(() =>
  import('@/pages/VideoLearning').then((m) => ({ default: m.VideoLearning })),
)
const SentenceMaster = React.lazy(() =>
  import('@/pages/SentenceMaster').then((m) => ({ default: m.SentenceMaster })),
)
const Quiz = React.lazy(() => import('@/pages/Quiz').then((m) => ({ default: m.Quiz })))
const Typing = React.lazy(() => import('@/pages/Typing').then((m) => ({ default: m.Typing })))
const TechBoardPage = React.lazy(() =>
  import('@/pages/TechBoardPage').then((m) => ({ default: m.TechBoardPage })),
)
const GrammarMaster = React.lazy(() =>
  import('@/pages/GrammarMaster').then((m) => ({ default: m.GrammarMaster })),
)

// TOEIC Study4 Modules
const Toeic7PartsArena = React.lazy(() =>
  import('@/pages/Toeic7PartsArena').then((m) => ({ default: m.Toeic7PartsArena })),
)
const ToeicGrammarHandbook = React.lazy(() =>
  import('@/pages/ToeicGrammarHandbook').then((m) => ({ default: m.ToeicGrammarHandbook })),
)
const ToeicTacticsMaster = React.lazy(() =>
  import('@/pages/ToeicTacticsMaster').then((m) => ({ default: m.ToeicTacticsMaster })),
)
const ToeicVocabArena = React.lazy(() =>
  import('@/pages/ToeicVocabArena').then((m) => ({ default: m.ToeicVocabArena })),
)

const LoadingSpinner = () => (
  <div className='flex-1 flex items-center justify-center min-h-[400px]'>
    <div className='w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin'></div>
  </div>
)

export default function App() {
  const location = useLocation()
  const isMiniMode = location.pathname === '/mini' || location.hash === '#/mini'

  if (isMiniMode) {
    return (
      <ErrorBoundary>
        <MiniMode />
      </ErrorBoundary>
    )
  }

  return (
    <div className='h-screen flex flex-col bg-primary-50 dark:bg-dark-bg relative overflow-hidden'>
      <BackgroundEffects />
      <TitleBar />

      <div className='flex-1 flex overflow-hidden z-10 relative'>
        <Sidebar />
        <main className='flex-1 overflow-y-auto scroll-smooth pb-16 md:pb-0'>
          <div className='min-h-full w-full'>
            <ErrorBoundary>
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/learn' element={<Learn />} />
                  <Route path='/sentence-master' element={<SentenceMaster />} />
                  <Route path='/video-learning' element={<VideoLearning />} />
                  <Route path='/video' element={<VideoLearning />} />
                  <Route path='/grammar-master' element={<GrammarMaster />} />
                  <Route path='/grammar' element={<GrammarMaster />} />

                  {/* TOEIC Ecosystem Study4 */}
                  <Route path='/toeic-7parts' element={<Toeic7PartsArena />} />
                  <Route path='/toeic-reading' element={<Toeic7PartsArena />} />
                  <Route path='/toeic-practice' element={<Toeic7PartsArena />} />
                  <Route path='/toeic' element={<Toeic7PartsArena />} />
                  <Route path='/toeic-grammar' element={<ToeicGrammarHandbook />} />
                  <Route path='/toeic-tactics' element={<ToeicTacticsMaster />} />
                  <Route path='/toeic-vocab' element={<ToeicVocabArena />} />

                  <Route path='/tech-board' element={<TechBoardPage />} />
                  <Route path='/learning-board' element={<TechBoardPage />} />
                  <Route path='/quiz' element={<Quiz />} />
                  <Route path='/typing' element={<Typing />} />
                  <Route path='/decks' element={<Decks />} />
                  <Route path='/decks/:id' element={<DeckDetail />} />
                  <Route path='/library' element={<Library />} />
                  <Route path='/stats' element={<Stats />} />
                  <Route path='/achievements' element={<Achievements />} />
                  <Route path='/settings' element={<Settings />} />
                  <Route path='/import' element={<ImportData />} />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </div>
        </main>
      </div>

      <MobileNav />
      <AchievementPopup />
    </div>
  )
}

// Background gradient effects
function BackgroundEffects() {
  return (
    <>
      <div className='absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-primary-400/20 blur-[100px] animate-pulse-slow pointer-events-none' />
      <div className='absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-secondary-400/20 blur-[100px] animate-pulse-slow pointer-events-none' />
    </>
  )
}
