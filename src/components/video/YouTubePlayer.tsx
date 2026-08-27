// ============================================
// Ultra-Resilient YouTube Player (Watch Viewport Clean Injection)
// ============================================

import React, { useEffect, useRef, useState, useCallback } from 'react'
import {
  Play,
  Pause,
  RotateCcw,
  SkipBack,
  SkipForward,
  Gauge,
  Sparkles,
  ExternalLink,
} from 'lucide-react'

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

const CLEAN_PLAYER_CSS = `
  #masthead-container,
  #secondary,
  #below,
  #comments,
  ytd-miniplayer,
  #chat,
  tp-yt-app-drawer,
  #guide,
  #ticker,
  #voice-search-button,
  .ytd-searchbox,
  ytd-merch-shelf-renderer {
    display: none !important;
  }
  #page-manager {
    margin-top: 0 !important;
    padding: 0 !important;
  }
  #primary, #primary-inner {
    padding: 0 !important;
    margin: 0 !important;
    max-width: 100% !important;
  }
  #player-container-outer, #player-container-inner, #player-container {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    z-index: 999999 !important;
    padding: 0 !important;
    margin: 0 !important;
  }
  #player {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    z-index: 999999 !important;
    padding: 0 !important;
  }
  #movie_player, .html5-video-player, video {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    object-fit: contain !important;
  }
  body, html, ytd-app {
    overflow: hidden !important;
    background: #000000 !important;
  }
`

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const webviewRef = useRef<any>(null)
  const iframeRef = useRef<HTMLIFrameElement | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ytPlayerRef = useRef<any>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1.0)
  const [isApiReady, setIsApiReady] = useState(false)

  const isElectron =
    typeof window !== 'undefined' &&
    (navigator.userAgent.toLowerCase().includes('electron') ||
      Boolean(
        (window as unknown as { process?: { versions?: { electron?: string } } })
          .process?.versions?.electron,
      ))

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

  // 1. Listen to YouTube postMessage events for real-time time & state synchronization
  useEffect(() => {
    if (isElectron) return

    const handleWindowMessage = (e: MessageEvent) => {
      try {
        const data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data
        if (!data) return

        if (data.event === 'infoDelivery' && data.info) {
          if (typeof data.info.currentTime === 'number' && !isNaN(data.info.currentTime)) {
            onTimeUpdate(data.info.currentTime)
          }
          if (typeof data.info.playerState === 'number') {
            setIsPlaying(data.info.playerState === 1)
          }
        } else if (data.event === 'onStateChange') {
          if (typeof data.info === 'number') {
            setIsPlaying(data.info === 1)
          }
        } else if (data.event === 'onReady') {
          setIsApiReady(true)
        }
      } catch {
        // Non-JSON message from other sources
      }
    }

    window.addEventListener('message', handleWindowMessage)
    return () => window.removeEventListener('message', handleWindowMessage)
  }, [isElectron, onTimeUpdate])

  // 2. Load YouTube IFrame API script as enhancement
  useEffect(() => {
    if (isElectron) return

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
  }, [isElectron])

  // 3. Initialize / Bind YT.Player instance to existing iframe
  const playerId = `yt-player-${videoId}`
  useEffect(() => {
    if (isElectron || !isApiReady || !window.YT || !iframeRef.current) return

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
            postIframeCommand('listening')
          },
          onStateChange: (event: { data: number }) => {
            if (event.data === 1) {
              setIsPlaying(true)
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
  }, [isElectron, isApiReady, videoId, postIframeCommand])

  // 4. Time Polling loop (Runs on both Android/Web and Electron Webview)
  useEffect(() => {
    const interval = setInterval(async () => {
      // Electron webview branch
      if (isElectron && webviewRef.current?.executeJavaScript) {
        try {
          const info = await webviewRef.current.executeJavaScript(`
            (() => {
              const v = document.querySelector('video');
              return v ? { currentTime: v.currentTime, paused: v.paused, playbackRate: v.playbackRate } : null;
            })()
          `)
          if (info && typeof info.currentTime === 'number') {
            onTimeUpdate(info.currentTime)
            setIsPlaying(!info.paused)
          }
        } catch {
          // Webview is loading
        }
        return
      }

      // Android & Web branch: poll via YT Player or request info
      if (!isElectron) {
        if (ytPlayerRef.current && typeof ytPlayerRef.current.getCurrentTime === 'function') {
          try {
            const currentTime = ytPlayerRef.current.getCurrentTime()
            if (typeof currentTime === 'number' && !isNaN(currentTime)) {
              onTimeUpdate(currentTime)
            }
            if (typeof ytPlayerRef.current.getPlayerState === 'function') {
              const state = ytPlayerRef.current.getPlayerState()
              setIsPlaying(state === 1)
            }
          } catch {
            // Player initializing
          }
        } else {
          // Ping iframe to deliver info
          postIframeCommand('listening')
        }
      }
    }, 150)

    return () => clearInterval(interval)
  }, [isElectron, onTimeUpdate, postIframeCommand])

  // 5. Electron CSS and Dom-ready injection
  useEffect(() => {
    if (!isElectron || !webviewRef.current) return

    const webview = webviewRef.current
    const applyCleanView = () => {
      try {
        webview.insertCSS(CLEAN_PLAYER_CSS)
        webview.executeJavaScript(`
          (() => {
            const v = document.querySelector('video');
            if (v && v.paused) {
              v.play().catch(() => {});
            }
          })()
        `)
      } catch {
        // Silently ignore
      }
    }

    webview.addEventListener('dom-ready', applyCleanView)
    webview.addEventListener('did-finish-load', applyCleanView)

    return () => {
      webview.removeEventListener('dom-ready', applyCleanView)
      webview.removeEventListener('did-finish-load', applyCleanView)
    }
  }, [isElectron, videoId])

  // 6. Seek To Time Handler
  useEffect(() => {
    if (seekToTime !== null && seekToTime !== undefined) {
      if (isElectron && webviewRef.current?.executeJavaScript) {
        webviewRef.current.executeJavaScript(`
          (() => {
            const v = document.querySelector('video');
            if (v) {
              v.currentTime = ${seekToTime};
              v.play().catch(() => {});
            }
          })()
        `)
      } else if (!isElectron) {
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
      }
      setIsPlaying(true)
    }
  }, [seekToTime, isElectron, postIframeCommand])

  // 7. Play / Pause Toggle
  const togglePlay = useCallback(() => {
    if (isElectron && webviewRef.current?.executeJavaScript) {
      webviewRef.current.executeJavaScript(`
        (() => {
          const v = document.querySelector('video');
          if (v) {
            if (v.paused) { v.play().catch(() => {}); } else { v.pause(); }
          }
        })()
      `)
      setIsPlaying((prev) => !prev)
    } else if (!isElectron) {
      if (isPlaying) {
        if (ytPlayerRef.current?.pauseVideo) {
          ytPlayerRef.current.pauseVideo()
        } else {
          postIframeCommand('pauseVideo')
        }
        setIsPlaying(false)
      } else {
        if (ytPlayerRef.current?.playVideo) {
          ytPlayerRef.current.playVideo()
        } else {
          postIframeCommand('playVideo')
        }
        setIsPlaying(true)
      }
    }
  }, [isElectron, isPlaying, postIframeCommand])

  // 8. Change Speed Handler
  const handleRateChange = (rate: number) => {
    setPlaybackRate(rate)
    if (isElectron && webviewRef.current?.executeJavaScript) {
      webviewRef.current.executeJavaScript(`
        (() => {
          const v = document.querySelector('video');
          if (v) v.playbackRate = ${rate};
        })()
      `)
    } else if (!isElectron) {
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
  }

  // 9. Keyboard Shortcuts
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

  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?enablejsapi=1&playsinline=1&rel=0&autoplay=0&iv_load_policy=3&fs=0`

  return (
    <div className='flex flex-col shrink-0 rounded-2xl overflow-hidden bg-black shadow-xl border border-gray-800 transition-all'>
      {/* Video Container (Aspect 16:9 on all screens) */}
      <div className='relative w-full aspect-video bg-black overflow-hidden flex items-center justify-center'>
        {isElectron ? (
          <webview
            ref={webviewRef}
            src={watchUrl}
            className='w-full h-full border-0'
            allowpopups='true'
            webpreferences='allowRunningInsecureContent, nativeWindowOpen=true'
          />
        ) : (
          <iframe
            ref={iframeRef}
            id={playerId}
            src={embedUrl}
            title='YouTube video player'
            className='w-full h-full border-0 bg-black'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            allowFullScreen={false}
          />
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
            className='p-2 sm:px-2.5 sm:py-2 rounded-xl bg-gray-800/90 active:bg-gray-700 hover:bg-gray-700 text-primary-400 transition-all flex items-center gap-1 text-xs active:scale-95 shadow-sm'
            title='Lặp lại câu này (Phím R)'
            aria-label='Repeat Sentence'
          >
            <RotateCcw size={15} />
            <span className='hidden sm:inline font-medium'>Lặp lại [R]</span>
          </button>

          <button
            onClick={onNextSentence}
            className='p-2 sm:px-2.5 sm:py-2 rounded-xl bg-gray-800/90 active:bg-gray-700 hover:bg-gray-700 text-gray-200 transition-all flex items-center gap-1 text-xs active:scale-95 shadow-sm'
            title='Câu sau (Phím D hoặc →)'
            aria-label='Next Sentence'
          >
            <span className='hidden sm:inline font-medium'>Câu sau [D]</span>
            <SkipForward size={15} />
          </button>
        </div>

        {/* Speed Controls & Auto Pause */}
        <div className='flex items-center gap-2 sm:gap-3'>
          {/* Speed Selector */}
          <div className='flex items-center gap-1 bg-gray-900/90 px-1.5 py-1 rounded-xl border border-gray-800 text-xs shadow-inner'>
            <Gauge size={13} className='text-gray-400 ml-0.5' />
            {[0.75, 1.0, 1.25].map((rate) => (
              <button
                key={rate}
                onClick={() => handleRateChange(rate)}
                className={`px-1.5 sm:px-2 py-0.5 rounded-lg text-[11px] sm:text-xs font-semibold transition-all ${
                  playbackRate === rate
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'text-gray-400 hover:text-gray-200 active:bg-gray-800'
                }`}
              >
                {rate}x
              </button>
            ))}
          </div>

          {/* Auto-pause toggle */}
          <button
            onClick={onToggleAutoPause}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium border transition-all active:scale-95 ${
              autoPause
                ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 shadow-sm'
                : 'bg-gray-900/90 border-gray-800 text-gray-400 hover:text-gray-200'
            }`}
            title='Tự động dừng khi hết câu để đọc và nhại lại'
            aria-label='Auto Pause Toggle'
          >
            <Sparkles size={13} className={autoPause ? 'text-emerald-400' : 'text-gray-400'} />
            <span className='text-[11px] sm:text-xs font-semibold'>
              {autoPause ? 'Auto-pause' : 'Auto-pause'}
            </span>
          </button>

          {/* Direct Open Link fallback */}
          <a
            href={watchUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='p-1.5 sm:p-2 rounded-xl bg-gray-900/90 hover:bg-gray-800 text-gray-400 hover:text-white transition-colors text-xs flex items-center gap-1 border border-gray-800'
            title='Mở video trực tiếp trên YouTube'
            aria-label='Open in YouTube'
          >
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  )
}
