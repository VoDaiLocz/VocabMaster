// ============================================
// YouTube Video Player with Learning Controls
// ============================================

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { Play, Pause, RotateCcw, SkipBack, SkipForward, Gauge, Sparkles } from 'lucide-react'

interface YouTubePlayerProps {
  videoId: string
  onTimeUpdate: (time: number) => void
  onPrevSentence: () => void
  onNextSentence: () => void
  onRepeatSentence: () => void
  autoPause: boolean
  onToggleAutoPause: () => void
  seekToTime?: number | null
}

interface YTPlayerInstance {
  destroy?: () => void
  seekTo?: (seconds: number, allowSeekAhead: boolean) => void
  playVideo?: () => void
  pauseVideo?: () => void
  getCurrentTime?: () => number
  setPlaybackRate?: (rate: number) => void
}

declare global {
  interface Window {
    YT: {
      Player: new (element: HTMLElement, config: Record<string, unknown>) => YTPlayerInstance
      PlayerState: {
        PLAYING: number
        PAUSED: number
        ENDED: number
      }
    }
    onYouTubeIframeAPIReady: () => void
  }
}

export const YouTubePlayer: React.FC<YouTubePlayerProps> = ({
  videoId,
  onTimeUpdate,
  onPrevSentence,
  onNextSentence,
  onRepeatSentence,
  autoPause,
  onToggleAutoPause,
  seekToTime,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<YTPlayerInstance | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1.0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize YouTube Iframe API
  useEffect(() => {
    let isMounted = true

    const loadIframeAPI = () => {
      if (!window.YT) {
        const tag = document.createElement('script')
        tag.src = 'https://www.youtube.com/iframe_api'
        const firstScriptTag = document.getElementsByTagName('script')[0]
        firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag)
      }
    }

    const initPlayer = () => {
      if (!containerRef.current || !window.YT || !window.YT.Player) return

      // Destroy previous instance
      if (playerRef.current && playerRef.current.destroy) {
        try {
          playerRef.current.destroy()
        } catch (err) {
          console.debug('Player cleanup:', err)
        }
      }

      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId: videoId,
        host: 'https://www.youtube.com',
        playerVars: {
          autoplay: 0,
          controls: 1,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          fs: 1,
          origin: 'https://www.youtube.com',
          enablejsapi: 1,
        },
        events: {
          onReady: () => {
            if (isMounted) {
              setPlaybackRate(1.0)
            }
          },
          onStateChange: (event: { data: number }) => {
            if (isMounted) {
              setIsPlaying(event.data === window.YT.PlayerState.PLAYING)
            }
          },
          onError: (event: { data: number }) => {
            console.warn('YouTube Player Error Code:', event.data)
          },
        },
      })
    }

    if (window.YT && window.YT.Player) {
      initPlayer()
    } else {
      window.onYouTubeIframeAPIReady = () => {
        if (isMounted) initPlayer()
      }
      loadIframeAPI()
    }

    return () => {
      isMounted = false
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (playerRef.current && playerRef.current.destroy) {
        try {
          playerRef.current.destroy()
        } catch (err) {
          console.debug('Player unmount cleanup:', err)
        }
      }
    }
  }, [videoId])

  // Sync seekToTime from parent
  useEffect(() => {
    if (
      seekToTime !== null &&
      seekToTime !== undefined &&
      playerRef.current &&
      playerRef.current.seekTo
    ) {
      playerRef.current.seekTo(seekToTime, true)
      if (playerRef.current.playVideo) {
        playerRef.current.playVideo()
      }
    }
  }, [seekToTime])

  // Periodic time update ticker
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (playerRef.current && playerRef.current.getCurrentTime) {
        try {
          const currentTime = playerRef.current.getCurrentTime()
          if (typeof currentTime === 'number') {
            onTimeUpdate(currentTime)
          }
        } catch (err) {
          console.debug('Time update polling:', err)
        }
      }
    }, 200)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [onTimeUpdate])

  // Play / Pause Toggle
  const togglePlay = useCallback(() => {
    if (!playerRef.current) return
    try {
      if (isPlaying) {
        playerRef.current.pauseVideo?.()
      } else {
        playerRef.current.playVideo?.()
      }
    } catch (err) {
      console.debug('Play/pause toggle:', err)
    }
  }, [isPlaying])

  // Change Speed
  const handleRateChange = (rate: number) => {
    setPlaybackRate(rate)
    if (playerRef.current && playerRef.current.setPlaybackRate) {
      playerRef.current.setPlaybackRate(rate)
    }
  }

  // Keyboard Shortcuts Handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid hotkeys when typing in input
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return
      }

      if (e.code === 'Space') {
        e.preventDefault()
        togglePlay()
      } else if (e.code === 'KeyA' || e.key === 'ArrowLeft') {
        e.preventDefault()
        onPrevSentence()
      } else if (e.code === 'KeyD' || e.key === 'ArrowRight') {
        e.preventDefault()
        onNextSentence()
      } else if (e.code === 'KeyR') {
        e.preventDefault()
        onRepeatSentence()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [togglePlay, onPrevSentence, onNextSentence, onRepeatSentence])

  return (
    <div className='flex flex-col rounded-2xl overflow-hidden bg-black/90 shadow-2xl border border-gray-800'>
      {/* Video Container */}
      <div className='relative w-full aspect-video bg-black'>
        <div ref={containerRef} className='w-full h-full' />
      </div>

      {/* Learning Control Toolbar */}
      <div className='p-3 bg-gray-950/80 backdrop-blur-md border-t border-gray-800/80 flex flex-wrap items-center justify-between gap-3 text-white'>
        {/* Navigation & Loop Buttons */}
        <div className='flex items-center gap-2'>
          <button
            onClick={onPrevSentence}
            className='p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 transition-colors flex items-center gap-1 text-xs'
            title='Câu trước (Phím A hoặc ←)'
          >
            <SkipBack size={16} />
            <span className='hidden sm:inline'>Câu trước [A]</span>
          </button>

          <button
            onClick={togglePlay}
            className='p-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white shadow-lg shadow-primary-600/30 transition-colors'
            title='Phát / Tạm dừng (Phím Space)'
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>

          <button
            onClick={onRepeatSentence}
            className='p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-primary-400 transition-colors flex items-center gap-1 text-xs'
            title='Lặp lại câu này (Phím R)'
          >
            <RotateCcw size={16} />
            <span className='hidden sm:inline'>Lặp lại [R]</span>
          </button>

          <button
            onClick={onNextSentence}
            className='p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 transition-colors flex items-center gap-1 text-xs'
            title='Câu sau (Phím D hoặc →)'
          >
            <span className='hidden sm:inline'>Câu sau [D]</span>
            <SkipForward size={16} />
          </button>
        </div>

        {/* Speed Controls & Auto Pause */}
        <div className='flex items-center gap-3'>
          {/* Speed Selector */}
          <div className='flex items-center gap-1 bg-gray-900 px-2 py-1 rounded-lg border border-gray-800 text-xs'>
            <Gauge size={14} className='text-gray-400' />
            {[0.75, 1.0, 1.25].map((rate) => (
              <button
                key={rate}
                onClick={() => handleRateChange(rate)}
                className={`px-2 py-0.5 rounded ${
                  playbackRate === rate
                    ? 'bg-primary-600 text-white font-bold'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {rate}x
              </button>
            ))}
          </div>

          {/* Auto-pause toggle */}
          <button
            onClick={onToggleAutoPause}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              autoPause
                ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                : 'bg-gray-900 border-gray-800 text-gray-400 hover:text-gray-200'
            }`}
            title='Tự động dừng khi hết câu để đọc và nhại lại'
          >
            <Sparkles size={14} />
            <span>Auto-pause: {autoPause ? 'BẬT' : 'TẮT'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
