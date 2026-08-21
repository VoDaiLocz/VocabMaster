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
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1.0)

  const isElectron =
    typeof window !== 'undefined' &&
    Boolean(
      (window as unknown as { electronAPI?: unknown }).electronAPI ||
      navigator.userAgent.toLowerCase().includes('electron'),
    )

  // Inject Clean CSS and setup webview events
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

  // --- Electron Webview Controls ---
  const sendWebviewCommand = useCallback(
    (action: 'play' | 'pause' | 'toggle' | 'seek' | 'rate', value?: number) => {
      if (!webviewRef.current || !webviewRef.current.executeJavaScript) return
      try {
        if (action === 'toggle') {
          webviewRef.current.executeJavaScript(`
          (() => {
            const v = document.querySelector('video');
            if (v) {
              if (v.paused) { v.play().catch(() => {}); } else { v.pause(); }
            }
          })()
        `)
        } else if (action === 'play') {
          webviewRef.current.executeJavaScript(`
          (() => {
            const v = document.querySelector('video');
            if (v && v.paused) v.play().catch(() => {});
          })()
        `)
        } else if (action === 'pause') {
          webviewRef.current.executeJavaScript(`
          (() => {
            const v = document.querySelector('video');
            if (v && !v.paused) v.pause();
          })()
        `)
        } else if (action === 'seek' && typeof value === 'number') {
          webviewRef.current.executeJavaScript(`
          (() => {
            const v = document.querySelector('video');
            if (v) {
              v.currentTime = ${value};
              v.play().catch(() => {});
            }
          })()
        `)
        } else if (action === 'rate' && typeof value === 'number') {
          webviewRef.current.executeJavaScript(`
          (() => {
            const v = document.querySelector('video');
            if (v) v.playbackRate = ${value};
          })()
        `)
        }
      } catch {
        // Silently catch
      }
    },
    [],
  )

  // Poll video time and state from Electron Webview
  useEffect(() => {
    if (!isElectron) return

    const interval = setInterval(async () => {
      if (!webviewRef.current || !webviewRef.current.executeJavaScript) return
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
    }, 200)

    return () => clearInterval(interval)
  }, [isElectron, onTimeUpdate])

  // Handle seekToTime prop changes
  useEffect(() => {
    if (seekToTime !== null && seekToTime !== undefined) {
      if (isElectron) {
        sendWebviewCommand('seek', seekToTime)
      } else if (iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: 'command', func: 'seekTo', args: [seekToTime, true] }),
          '*',
        )
      }
      setIsPlaying(true)
    }
  }, [seekToTime, isElectron, sendWebviewCommand])

  // Play / Pause Toggle
  const togglePlay = useCallback(() => {
    if (isElectron) {
      sendWebviewCommand('toggle')
      setIsPlaying((prev) => !prev)
    } else if (iframeRef.current && iframeRef.current.contentWindow) {
      const func = isPlaying ? 'pauseVideo' : 'playVideo'
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func, args: [] }),
        '*',
      )
      setIsPlaying((prev) => !prev)
    }
  }, [isElectron, isPlaying, sendWebviewCommand])

  // Change Speed
  const handleRateChange = (rate: number) => {
    setPlaybackRate(rate)
    if (isElectron) {
      sendWebviewCommand('rate', rate)
    } else if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: 'setPlaybackRate', args: [rate] }),
        '*',
      )
    }
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

  // Use Watch URL in Webview (bypasses Error 152 entirely)
  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1&rel=0`

  return (
    <div className='flex flex-col rounded-2xl overflow-hidden bg-black shadow-2xl border border-gray-800'>
      {/* Video Container */}
      <div className='relative w-full aspect-video bg-black overflow-hidden'>
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
            src={embedUrl}
            title='YouTube video player'
            className='w-full h-full border-0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            allowFullScreen
          />
        )}
      </div>

      {/* Learning Control Toolbar */}
      <div className='p-3 bg-gray-950/95 backdrop-blur-md border-t border-gray-800 flex flex-wrap items-center justify-between gap-3 text-white'>
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

          {/* Direct Open Link fallback */}
          <a
            href={watchUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='p-2 rounded-lg bg-gray-900 hover:bg-gray-800 text-gray-400 hover:text-white transition-colors text-xs flex items-center gap-1'
            title='Mở video trực tiếp trên YouTube'
          >
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  )
}
