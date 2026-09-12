// ============================================
// Ultra-Resilient YouTube Player (Unified Embed Player)
// ============================================

import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import {
  Play,
  Pause,
  RotateCcw,
  SkipBack,
  SkipForward,
  Gauge,
  Sparkles,
  ExternalLink,
  Languages,
} from 'lucide-react'

interface YouTubePlayerProps {
  videoId: string
  onTimeUpdate: (time: number) => void
  onPrevSentence: () => void
  onNextSentence: () => void
  onRepeatSentence: () => void
  autoPause: boolean
  onToggleAutoPause: () => void
  interleavedMode?: boolean
  onToggleInterleavedMode?: () => void
  isInterleavedSpeaking?: boolean
  speakingCueTextVi?: string
  seekToTime?: number | null
  onSeekComplete?: () => void
  currentCueEnd?: number
  onCueEndReached?: (cueEnd: number) => void
  resumePlaybackTrigger?: number
  onUserAction?: () => void
}

declare global {
  interface Window {
    YT?: {
      Player: new (
        elementId: string | HTMLElement,
        config: {
          videoId?: string
          playerVars?: Record<string, unknown>
          events?: {
            onReady?: (event: { target: unknown }) => void
            onStateChange?: (event: { data: number }) => void
          }
        },
      ) => {
        getCurrentTime: () => number
        getPlayerState: () => number
        playVideo: () => void
        pauseVideo: () => void
        seekTo: (seconds: number, allowSeekAhead?: boolean) => void
        setPlaybackRate: (rate: number) => void
        destroy: () => void
      }
    }
    onYouTubeIframeAPIReady?: () => void
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
  interleavedMode = false,
  onToggleInterleavedMode,
  isInterleavedSpeaking = false,
  speakingCueTextVi = '',
  seekToTime,
  onSeekComplete,
  currentCueEnd,
  onCueEndReached,
  resumePlaybackTrigger,
  onUserAction,
}) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ytPlayerRef = useRef<any>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1.0)
  const [isApiReady, setIsApiReady] = useState(false)

  // High-precision time tracking anchors (Defense-in-depth)
  const lastAuthoritativeTimeRef = useRef<number>(0)
  const lastDispatchedTimeRef = useRef<number>(0)
  const lastSeekEpochRef = useRef<number>(0)
  const lastTimeEpochRef = useRef<number>(0)
  const isPlayingRef = useRef<boolean>(false)
  const playbackRateRef = useRef<number>(1.0)
  const lastAutoPausedCueEndRef = useRef<number | null>(null)

  // Keep refs in sync with current state
  useEffect(() => {
    isPlayingRef.current = isPlaying
  }, [isPlaying])

  useEffect(() => {
    playbackRateRef.current = playbackRate
  }, [playbackRate])

  // Reset player tracking state whenever videoId changes
  useEffect(() => {
    lastAuthoritativeTimeRef.current = 0
    lastDispatchedTimeRef.current = 0
    lastSeekEpochRef.current = 0
    lastTimeEpochRef.current = Date.now()
    lastAutoPausedCueEndRef.current = null
    setIsPlaying(false)
  }, [videoId])

  // Monotonic smoothed time dispatcher: eliminates micro-jitter & backward frame stutter
  const dispatchTimeUpdate = useCallback(
    (newTime: number) => {
      if (typeof newTime !== 'number' || isNaN(newTime) || newTime < 0) return

      const now = Date.now()
      // If user recently explicitly sought (within 800ms), immediately accept target
      if (now - lastSeekEpochRef.current < 800) {
        lastDispatchedTimeRef.current = newTime
        onTimeUpdate(newTime)
        return
      }

      // During active playback, ignore small backward fluctuations (< 0.7s) caused by delayed postMessage frames
      if (isPlayingRef.current) {
        const diff = newTime - lastDispatchedTimeRef.current
        if (diff < 0 && diff > -0.7) {
          return // Drop jittery frame
        }
      }

      lastDispatchedTimeRef.current = newTime
      onTimeUpdate(newTime)
    },
    [onTimeUpdate],
  )

  // Helper to send command directly via postMessage to iframe
  const postIframeCommand = useCallback((func: string, args: unknown[] = []) => {
    if (iframeRef.current?.contentWindow) {
      try {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({
            event: 'command',
            func,
            args,
          }),
          '*',
        )
      } catch (err) {
        console.warn('postIframeCommand error:', err)
      }
    }
  }, [])

  // Send proper YouTube listening ping to register event listeners
  const sendListeningPing = useCallback(() => {
    if (iframeRef.current?.contentWindow) {
      try {
        // Standard YouTube HTML5 postMessage handshake
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: 'listening', id: 1, channel: 'widget' }),
          '*',
        )
        // Command variant
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: 'command', func: 'listening' }),
          '*',
        )
        // Subscribe to state changes
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: 'command', func: 'addEventListener', args: ['onStateChange'] }),
          '*',
        )
      } catch {
        // Cross-origin safe
      }
    }
  }, [])

  // 1. Listen to postMessage from YouTube iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data) return

      try {
        let data = event.data
        if (typeof data === 'string') {
          if (!data.startsWith('{') && !data.startsWith('[')) return
          data = JSON.parse(data)
        }

        if (typeof data !== 'object' || data === null) return

        // 1a. Handle onReady
        if (data.event === 'onReady') {
          setIsApiReady(true)
          sendListeningPing()
        }

        // 1b. Handle infoDelivery or initialDelivery
        if ((data.event === 'infoDelivery' || data.event === 'initialDelivery') && data.info) {
          const info = data.info
          if (typeof info.currentTime === 'number' && !isNaN(info.currentTime)) {
            lastAuthoritativeTimeRef.current = info.currentTime
            lastTimeEpochRef.current = Date.now()
            dispatchTimeUpdate(info.currentTime)
          }

          if (typeof info.playerState === 'number') {
            if (info.playerState === 1) {
              setIsPlaying(true)
            } else if (info.playerState === 2 || info.playerState === 0) {
              setIsPlaying(false)
            }
          }

          if (typeof info.playbackRate === 'number' && !isNaN(info.playbackRate)) {
            setPlaybackRate(info.playbackRate)
          }
        }

        // 1c. Handle direct onStateChange events
        if (data.event === 'onStateChange') {
          const state =
            typeof data.info === 'number'
              ? data.info
              : typeof data.data === 'number'
                ? data.data
                : data.info?.playerState
          if (state === 1) {
            setIsPlaying(true)
            lastTimeEpochRef.current = Date.now()
          } else if (state === 2 || state === 0) {
            setIsPlaying(false)
          }
        }
      } catch {
        // Safely ignore non-JSON messages from other sources
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [dispatchTimeUpdate, sendListeningPing])

  // 2. Load YouTube IFrame API script
  useEffect(() => {
    if (window.YT && window.YT.Player) {
      setIsApiReady(true)
      return
    }

    const existingScript = document.getElementById('youtube-iframe-api')
    if (!existingScript) {
      const tag = document.createElement('script')
      tag.id = 'youtube-iframe-api'
      tag.src = 'https://www.youtube.com/iframe_api'
      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag)
    }

    const prevOnReady = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      if (prevOnReady) prevOnReady()
      setIsApiReady(true)
    }

    const checkInterval = setInterval(() => {
      if (window.YT && window.YT.Player) {
        setIsApiReady(true)
        clearInterval(checkInterval)
      }
    }, 300)

    return () => clearInterval(checkInterval)
  }, [])

  // 3. Initialize / Bind YT.Player instance to existing iframe
  const playerId = 'yt-player-' + videoId
  useEffect(() => {
    if (!isApiReady || !window.YT || !iframeRef.current) return

    if (ytPlayerRef.current?.destroy) {
      try {
        ytPlayerRef.current.destroy()
      } catch {
        // ignore
      }
      ytPlayerRef.current = null
    }

    try {
      ytPlayerRef.current = new window.YT.Player(iframeRef.current, {
        events: {
          onReady: () => {
            setIsApiReady(true)
            sendListeningPing()
          },
          onStateChange: (event: { data: number }) => {
            if (event.data === 1) {
              setIsPlaying(true)
              lastTimeEpochRef.current = Date.now()
            } else if (event.data === 2 || event.data === 0) {
              setIsPlaying(false)
            }
          },
        },
      })
    } catch (err) {
      console.warn('YT.Player binding note (falling back to direct postMessage):', err)
    }

    return () => {
      if (ytPlayerRef.current?.destroy) {
        try {
          ytPlayerRef.current.destroy()
        } catch {
          // ignore
        }
      }
      ytPlayerRef.current = null
    }
  }, [isApiReady, videoId, sendListeningPing])

  // 4. Time Polling & High-Precision Fallback Ticker
  useEffect(() => {
    const interval = setInterval(() => {
      let gotAuthoritative = false

      // 4a. Try reading from YT.Player instance if accessible
      if (ytPlayerRef.current && typeof ytPlayerRef.current.getCurrentTime === 'function') {
        try {
          const currentTime = ytPlayerRef.current.getCurrentTime()
          if (typeof currentTime === 'number' && !isNaN(currentTime)) {
            lastAuthoritativeTimeRef.current = currentTime
            lastTimeEpochRef.current = Date.now()
            dispatchTimeUpdate(currentTime)
            gotAuthoritative = true
          }
          if (typeof ytPlayerRef.current.getPlayerState === 'function') {
            const state = ytPlayerRef.current.getPlayerState()
            if (state === 1 && !isPlayingRef.current) {
              setIsPlaying(true)
            } else if ((state === 2 || state === 0) && isPlayingRef.current) {
              setIsPlaying(false)
            }
          }
        } catch {
          // Cross-origin restriction
        }
      }

      // 4b. Periodically ping iframe to keep event stream active
      sendListeningPing()

      // 4c. High-Precision Interpolation Fallback:
      // When playing, if no authoritative tick in > 200ms, project time smoothly
      if (isPlayingRef.current) {
        const now = Date.now()
        const elapsedSec = (now - lastTimeEpochRef.current) / 1000

        let currentActiveTime = lastAuthoritativeTimeRef.current
        if (!gotAuthoritative && elapsedSec > 0.2) {
          currentActiveTime = Math.max(
            0,
            lastAuthoritativeTimeRef.current + elapsedSec * playbackRateRef.current,
          )
          dispatchTimeUpdate(currentActiveTime)
        } else if (gotAuthoritative) {
          currentActiveTime = lastAuthoritativeTimeRef.current
        }

        // 4d. Auto-Pause or Interleaved check when current sentence ends
        if (
          (autoPause || interleavedMode) &&
          currentCueEnd &&
          currentCueEnd > 0 &&
          lastAutoPausedCueEndRef.current !== currentCueEnd &&
          currentActiveTime >= currentCueEnd - 0.15
        ) {
          lastAutoPausedCueEndRef.current = currentCueEnd
          if (ytPlayerRef.current?.pauseVideo) {
            try {
              ytPlayerRef.current.pauseVideo()
            } catch {
              postIframeCommand('pauseVideo')
            }
          } else {
            postIframeCommand('pauseVideo')
          }
          setIsPlaying(false)
          onCueEndReached?.(currentCueEnd)
        }
      }
    }, 150)

    return () => clearInterval(interval)
  }, [
    dispatchTimeUpdate,
    sendListeningPing,
    autoPause,
    interleavedMode,
    currentCueEnd,
    postIframeCommand,
    onCueEndReached,
  ])

  // Helper methods for play/pause
  const doPlay = useCallback(() => {
    if (ytPlayerRef.current?.playVideo) {
      try {
        ytPlayerRef.current.playVideo()
      } catch {
        postIframeCommand('playVideo')
      }
    } else {
      postIframeCommand('playVideo')
    }
    setIsPlaying(true)
    lastTimeEpochRef.current = Date.now()
  }, [postIframeCommand])

  const doPause = useCallback(() => {
    if (ytPlayerRef.current?.pauseVideo) {
      try {
        ytPlayerRef.current.pauseVideo()
      } catch {
        postIframeCommand('pauseVideo')
      }
    } else {
      postIframeCommand('pauseVideo')
    }
    setIsPlaying(false)
  }, [postIframeCommand])

  // Resume trigger from parent (when Vietnamese TTS finishes)
  useEffect(() => {
    if (resumePlaybackTrigger && resumePlaybackTrigger > 0) {
      doPlay()
    }
  }, [resumePlaybackTrigger, doPlay])

  // 5. Seek To Time Handler
  useEffect(() => {
    if (seekToTime !== null && seekToTime !== undefined && seekToTime >= 0) {
      onUserAction?.()
      if (ytPlayerRef.current?.seekTo) {
        try {
          ytPlayerRef.current.seekTo(seekToTime, true)
          ytPlayerRef.current.playVideo?.()
        } catch {
          postIframeCommand('seekTo', [seekToTime, true])
          postIframeCommand('playVideo')
        }
      } else {
        postIframeCommand('seekTo', [seekToTime, true])
        postIframeCommand('playVideo')
      }
      setIsPlaying(true)
      lastAuthoritativeTimeRef.current = seekToTime
      lastDispatchedTimeRef.current = seekToTime
      lastSeekEpochRef.current = Date.now()
      lastTimeEpochRef.current = Date.now()
      lastAutoPausedCueEndRef.current = null
      dispatchTimeUpdate(seekToTime)
      onSeekComplete?.()
    }
  }, [seekToTime, postIframeCommand, dispatchTimeUpdate, onSeekComplete, onUserAction])

  // 6. Play / Pause Toggle
  const togglePlay = useCallback(() => {
    onUserAction?.()
    if (isPlaying) {
      doPause()
    } else {
      doPlay()
    }
  }, [isPlaying, doPause, doPlay, onUserAction])

  // 7. Change Speed Handler
  const handleRateChange = (rate: number) => {
    setPlaybackRate(rate)
    if (ytPlayerRef.current?.setPlaybackRate) {
      try {
        ytPlayerRef.current.setPlaybackRate(rate)
      } catch {
        postIframeCommand('setPlaybackRate', [rate])
      }
    } else {
      postIframeCommand('setPlaybackRate', [rate])
    }
  }

  // 8. Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      if (target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return

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

  const originParam = useMemo(() => {
    if (typeof window !== 'undefined' && window.location.origin) {
      const orig = window.location.origin
      if (orig.startsWith('http://') || orig.startsWith('https://')) {
        return `&origin=${encodeURIComponent(orig)}`
      }
    }
    return ''
  }, [])

  const embedUrl = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&playsinline=1&rel=0&autoplay=0&iv_load_policy=3&fs=0&cc_load_policy=1&cc_lang_pref=en${originParam}&widget_referrer=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`

  return (
    <div className='flex flex-col shrink-0 rounded-2xl overflow-hidden bg-black shadow-xl border border-gray-800 transition-all'>
      {/* Video Container (Aspect 16:9 on all screens) */}
      <div className='relative w-full aspect-video bg-black overflow-hidden flex items-center justify-center'>
        <iframe
          ref={iframeRef}
          id={playerId}
          src={embedUrl}
          title='YouTube video player'
          className='w-full h-full border-0 bg-black'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          referrerPolicy='strict-origin-when-cross-origin'
          allowFullScreen={false}
          onLoad={() => {
            sendListeningPing()
            setTimeout(sendListeningPing, 400)
            setTimeout(sendListeningPing, 1200)
          }}
        />

        {/* Interleaved Voiceover Active Floating HUD Banner */}
        {isInterleavedSpeaking && (
          <div className='absolute bottom-3 left-3 right-3 sm:left-4 sm:right-auto bg-purple-950/95 backdrop-blur-md border border-purple-500/60 text-purple-100 px-3.5 py-2 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs animate-fadeIn z-20 max-w-md pointer-events-none'>
            <span className='relative flex h-3 w-3 shrink-0'>
              <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75'></span>
              <span className='relative inline-flex rounded-full h-3 w-3 bg-purple-500'></span>
            </span>
            <div className='min-w-0'>
              <div className='font-bold text-white flex items-center gap-1.5'>
                <span>🎙️ Thuyết minh tiếng Việt</span>
                <span className='text-[10px] px-1.5 py-0.2 rounded bg-purple-500/30 text-purple-200 font-mono'>
                  Xen kẽ
                </span>
              </div>
              <p className='truncate text-[11px] text-purple-300 mt-0.5'>{speakingCueTextVi}</p>
            </div>
          </div>
        )}
      </div>

      {/* Mobile-First Learning Control Toolbar (Single row, never wraps) */}
      <div className='p-2 sm:p-3 bg-gray-950/95 backdrop-blur-md border-t border-gray-800/80 flex items-center justify-between gap-1.5 sm:gap-2 text-white overflow-x-auto no-scrollbar'>
        {/* Navigation & Loop Buttons */}
        <div className='flex items-center gap-1.5 sm:gap-2'>
          <button
            onClick={onPrevSentence}
            className='p-2 sm:px-2.5 sm:py-2 rounded-xl bg-gray-800/90 active:bg-gray-700 hover:bg-gray-700 text-gray-200 transition-all flex items-center gap-1 text-xs active:scale-95 shadow-sm'
            title='Câu trước (Phím A hoặc ←)'
            aria-label='Previous Sentence'
          >
            <SkipBack size={15} />
            <span className='hidden sm:inline font-medium'>Câu trước [A]</span>
          </button>

          <button
            onClick={togglePlay}
            className='p-2.5 sm:p-3 rounded-xl bg-primary-600 active:bg-primary-700 hover:bg-primary-500 text-white shadow-lg shadow-primary-600/30 transition-all active:scale-95 flex items-center justify-center'
            title='Phát / Tạm dừng (Phím Space)'
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause size={17} className='fill-white' />
            ) : (
              <Play size={17} className='fill-white' />
            )}
          </button>

          <button
            onClick={onRepeatSentence}
            className='p-2 sm:px-2.5 sm:py-2 rounded-xl bg-gray-800/90 active:bg-gray-700 hover:bg-gray-700 text-gray-200 transition-all flex items-center gap-1 text-xs active:scale-95 shadow-sm'
            title='Lặp lại câu hiện tại (Phím R)'
            aria-label='Repeat Sentence'
          >
            <RotateCcw size={15} />
            <span className='hidden sm:inline font-medium'>Lặp lại [R]</span>
          </button>

          <button
            onClick={onNextSentence}
            className='p-2 sm:px-2.5 sm:py-2 rounded-xl bg-gray-800/90 active:bg-gray-700 hover:bg-gray-700 text-gray-200 transition-all flex items-center gap-1 text-xs active:scale-95 shadow-sm'
            title='Câu tiếp theo (Phím D hoặc →)'
            aria-label='Next Sentence'
          >
            <span className='hidden sm:inline font-medium'>Câu sau [D]</span>
            <SkipForward size={15} />
          </button>
        </div>

        {/* Speed Controls & Auto-Pause */}
        <div className='flex items-center gap-1.5 sm:gap-2'>
          {/* Speed Pills */}
          <div className='flex items-center bg-gray-900/90 border border-gray-800/90 rounded-xl p-0.5 shadow-inner'>
            <Gauge size={13} className='text-gray-400 ml-1.5 mr-1 hidden sm:inline' />
            {[0.25, 0.5, 0.75, 1.0, 1.25].map((speed) => (
              <button
                key={speed}
                onClick={() => handleRateChange(speed)}
                title={`Tốc độ phát ${speed}x`}
                className={
                  'px-1.5 sm:px-2 py-1 rounded-lg text-[10px] sm:text-xs font-semibold transition-all ' +
                  (playbackRate === speed
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'text-gray-400 hover:text-gray-200')
                }
              >
                {speed === 1.0 ? '1x' : `${speed}x`}
              </button>
            ))}
          </div>

          {/* Auto-pause Toggle */}
          <button
            onClick={onToggleAutoPause}
            className={
              'px-2 sm:px-2.5 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1 transition-all active:scale-95 shadow-sm ' +
              (autoPause
                ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-400 shadow-emerald-500/10'
                : 'bg-gray-900/90 border-gray-800/90 text-gray-400 hover:text-gray-200')
            }
            title='Tự động dừng khi hết câu để đọc và nhại lại'
          >
            <Sparkles size={13} className={autoPause ? 'text-emerald-400 animate-pulse' : ''} />
            <span className='hidden sm:inline'>Auto-pause</span>
            <span className='sm:hidden'>Auto</span>
          </button>

          {/* Interleaved Bilingual Voiceover Toggle */}
          {onToggleInterleavedMode && (
            <button
              onClick={onToggleInterleavedMode}
              className={
                'px-2.5 sm:px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 shadow-md ' +
                (interleavedMode
                  ? 'bg-purple-600 border-purple-400 text-white shadow-purple-500/30 ring-2 ring-purple-500/40'
                  : 'bg-gray-900/90 border-gray-700 text-purple-300 hover:text-purple-100 hover:bg-gray-800')
              }
              title='Chế độ Thuyết minh xen kẽ: Video phát tiếng Anh gốc ➔ Tự dừng ➔ Đọc tiếng Việt ➔ Tự phát tiếp câu sau'
            >
              <Languages
                size={14}
                className={
                  isInterleavedSpeaking ? 'text-amber-300 animate-bounce' : 'text-purple-300'
                }
              />
              <span className='hidden sm:inline'>
                {isInterleavedSpeaking
                  ? 'Đang đọc TV...'
                  : interleavedMode
                    ? 'Thuyết minh: BẬT'
                    : 'Thuyết minh xen kẽ'}
              </span>
              <span className='sm:hidden'>
                {isInterleavedSpeaking
                  ? 'Đang đọc...'
                  : interleavedMode
                    ? 'TM: BẬT'
                    : 'Thuyết minh'}
              </span>
            </button>
          )}

          {/* External YouTube Link */}
          <a
            href={'https://www.youtube.com/watch?v=' + videoId}
            target='_blank'
            rel='noopener noreferrer'
            className='p-2 rounded-xl bg-gray-900/90 border border-gray-800/90 text-gray-400 hover:text-gray-200 hover:bg-gray-800 transition-all'
            title='Mở video trên YouTube'
          >
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  )
}
