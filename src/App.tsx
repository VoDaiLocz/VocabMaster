// ============================================
// App Root Component
// ============================================

import { Routes, Route, useLocation } from 'react-router-dom'
import { TitleBar, Sidebar, AchievementPopup, MobileNav } from '@/components/common'
import {
  Home,
  Learn,
  Quiz,
  Typing,
  Decks,
  DeckDetail,
  Library,
  Stats,
  Settings,
  Achievements,
  MiniMode,
  ImportData,
  VideoLearning,
} from '@/pages'

export default function App() {
  const location = useLocation()
  const isMiniMode = location.pathname === '/mini' || location.hash === '#/mini'

  // Mini mode has its own layout
  if (isMiniMode) {
    return <MiniMode />
  }

  return (
    <div className='h-screen flex flex-col bg-primary-50 dark:bg-dark-bg relative overflow-hidden'>
      {/* Ambient Background Mesh */}
      <BackgroundEffects />

      <TitleBar />

      <div className='flex-1 flex overflow-hidden z-10 relative'>
        <Sidebar />
        <main className='flex-1 overflow-y-auto scroll-smooth pb-16 md:pb-0'>
          <div className='min-h-full w-full'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/learn' element={<Learn />} />
              <Route path='/video-learning' element={<VideoLearning />} />
              <Route path='/quiz' element={<Quiz />} />
              <Route path='/typing' element={<Typing />} />
              <Route path='/decks' element={<Decks />} />
              <Route path='/decks/:id' element={<DeckDetail />} />
              <Route path='/library' element={<Library />} />
              <Route path='/stats' element={<Stats />} />
              <Route path='/achievements' element={<Achievements />} />
              <Route path='/settings' element={<Settings />} />
              <Route path='/import' element={<ImportData />} />
              <Route path='/mini' element={<MiniMode />} />
            </Routes>
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
