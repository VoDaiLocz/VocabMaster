// ============================================
// Robust YouTube Video Player with Learning Controls
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
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1.0)

  // Send command to YouTube Iframe via postMessage
  const sendCommand = useCallback((func: string, args: unknown[] = []) => {
    if (!iframeRef.current || !iframeRef.current.contentWindow) return
    try {
      const message = JSON.stringify({
        event: 'command',
        func: func,
        args: args,
      })
      iframeRef.current.contentWindow.postMessage(message, '*')
    } catch (err) {
      console.debug('Error sending postMessage to YouTube iframe:', err)
    }
  }, [])

  // Listen to incoming messages from YouTube Iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.origin.includes('youtube.com') && !event.origin.includes('youtube-nocookie.com')) {
        return
      }

      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data
        if (data && data.event === 'onStateChange') {
          // 1: PLAYING, 2: PAUSED, 0: ENDED
          setIsPlaying(data.info === 1)
        } else if (data && data.event === 'infoDelivery' && data.info) {
          if (typeof data.info.currentTime === 'number') {
            onTimeUpdate(data.info.currentTime)
          }
          if (typeof data.info.playerState === 'number') {
            setIsPlaying(data.info.playerState === 1)
          }
        }
      } catch {
        // Ignore unparseable postMessage
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [onTimeUpdate])

  // Periodic polling for current time as fallback
  useEffect(() => {
    const interval = setInterval(() => {
      if (iframeRef.current) {
        sendCommand('getCurrentTime')
      }
    }, 250)

    return () => clearInterval(interval)
  }, [sendCommand])

  // Handle seekToTime from parent
  useEffect(() => {
    if (seekToTime !== null && seekToTime !== undefined) {
      sendCommand('seekTo', [seekToTime, true])
      sendCommand('playVideo')
      setIsPlaying(true)
    }
  }, [seekToTime, sendCommand])

  // Play / Pause Toggle
  const togglePlay = useCallback(() => {
    if (isPlaying) {
      sendCommand('pauseVideo')
      setIsPlaying(false)
    } else {
      sendCommand('playVideo')
      setIsPlaying(true)
    }
  }, [isPlaying, sendCommand])

  // Change Speed
  const handleRateChange = (rate: number) => {
    setPlaybackRate(rate)
    sendCommand('setPlaybackRate', [rate])
  }

  // Keyboard Shortcuts Handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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

  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?enablejsapi=1&origin=https://www.youtube.com&playsinline=1&rel=0&modestbranding=1&controls=1&fs=1`

  return (
    <div className='flex flex-col rounded-2xl overflow-hidden bg-black/90 shadow-2xl border border-gray-800'>
      {/* Video Iframe Container */}
      <div className='relative w-full aspect-video bg-black'>
        <iframe
          ref={iframeRef}
          src={embedUrl}
          title='YouTube video player'
          className='w-full h-full border-0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowFullScreen
        />
      </div>

      {/* Learning Control Toolbar */}
      <div className='p-3 bg-gray-950/90 backdrop-blur-md border-t border-gray-800 flex flex-wrap items-center justify-between gap-3 text-white'>
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
