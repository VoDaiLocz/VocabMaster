// ============================================
// Bilingual Audio Service (EN & VI Audio Playback)
// ============================================

let currentAudioElement: HTMLAudioElement | null = null
let isAudioCancelled = false

// In-memory cache for fetched TTS audio data URLs (max 100 entries)
const ttsAudioCache = new Map<string, string>()

/**
 * Stop any currently playing audio or speech synthesis
 */
export function stopBilingualAudio(): void {
  isAudioCancelled = true

  if (currentAudioElement) {
    try {
      currentAudioElement.pause()
      currentAudioElement.removeAttribute('src')
      currentAudioElement.load()
    } catch {
      // ignore
    }
    currentAudioElement = null
  }

  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel()
    } catch {
      // ignore
    }
  }
}

/**
 * Clean text for optimal TTS pronunciation
 */
function sanitizeForTTS(text: string): string {
  if (!text) return ''
  return text
    .replace(/<[^>]*>/g, '') // remove HTML tags
    .replace(/[#*_~`]/g, '') // remove markdown symbols
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Play an audio element from URL or Data URL, resolving ONLY when playback completes
 */
function playAudioSource(src: string): Promise<boolean> {
  return new Promise((resolve) => {
    if (isAudioCancelled) {
      resolve(false)
      return
    }

    try {
      const audio = new Audio()
      audio.preload = 'auto'
      audio.src = src
      currentAudioElement = audio

      let isCleanedUp = false
      const cleanup = () => {
        if (isCleanedUp) return
        isCleanedUp = true
        audio.removeEventListener('ended', onEnded)
        audio.removeEventListener('error', onError)
        if (currentAudioElement === audio) {
          currentAudioElement = null
        }
      }

      const onEnded = () => {
        cleanup()
        resolve(true)
      }

      const onError = () => {
        cleanup()
        resolve(false)
      }

      audio.addEventListener('ended', onEnded, { once: true })
      audio.addEventListener('error', onError, { once: true })

      const playPromise = audio.play()
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          cleanup()
          resolve(false)
        })
      }
    } catch {
      resolve(false)
    }
  })
}

/**
 * Retrieve TTS audio Data URL via Electron IPC proxy or direct URL fallback
 */
async function getTTSAudioSource(cleanText: string, lang: 'en' | 'vi'): Promise<string | null> {
  const cacheKey = `${lang}:${cleanText}`
  if (ttsAudioCache.has(cacheKey)) {
    return ttsAudioCache.get(cacheKey)!
  }

  // 1. First choice: Direct Electron IPC Node fetch (bypasses CORS & Referer checks completely)
  if (typeof window !== 'undefined' && window.electronAPI?.fetchTTSAudio) {
    try {
      const res = await window.electronAPI.fetchTTSAudio(cleanText, lang)
      if (res && res.success && res.audioData) {
        if (ttsAudioCache.size >= 100) {
          const firstKey = ttsAudioCache.keys().next().value
          if (firstKey) ttsAudioCache.delete(firstKey)
        }
        ttsAudioCache.set(cacheKey, res.audioData)
        return res.audioData
      }
    } catch {
      // ignore and fallback
    }
  }

  // 2. Second choice: Direct Google Translate TTS endpoint (works when Referer header rewrite is active)
  return `https://translate.google.com/translate_tts?ie=UTF-8&tl=${lang}&client=tw-ob&q=${encodeURIComponent(
    cleanText,
  )}`
}

/**
 * Split long sentence (>200 chars) into natural speech chunks
 */
function splitTextIntoChunks(text: string, maxLen = 180): string[] {
  if (text.length <= maxLen) return [text]

  const parts: string[] = []
  const sentences = text.split(/([.,!?;:\n]+)/)
  let current = ''

  for (const part of sentences) {
    if (current.length + part.length <= maxLen) {
      current += part
    } else {
      if (current.trim()) parts.push(current.trim())
      current = part
    }
  }
  if (current.trim()) parts.push(current.trim())
  return parts.length > 0 ? parts : [text.slice(0, maxLen)]
}

/**
 * Play audio using Google Translate TTS with chunking and IPC proxy
 */
async function playGoogleTTS(text: string, lang: 'en' | 'vi'): Promise<boolean> {
  const clean = sanitizeForTTS(text)
  if (!clean || isAudioCancelled) return false

  const chunks = splitTextIntoChunks(clean)
  for (const chunk of chunks) {
    if (isAudioCancelled) return false

    const audioSrc = await getTTSAudioSource(chunk, lang)
    if (!audioSrc || isAudioCancelled) return false

    const success = await playAudioSource(audioSrc)
    if (!success || isAudioCancelled) return false
  }

  return true
}

/**
 * Play audio using Web Speech API fallback
 */
function playSpeechSynthesis(text: string, lang: 'en' | 'vi'): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window) || isAudioCancelled) {
      resolve(false)
      return
    }

    try {
      const clean = sanitizeForTTS(text)
      if (!clean) {
        resolve(false)
        return
      }

      const utterance = new SpeechSynthesisUtterance(clean)
      utterance.lang = lang === 'vi' ? 'vi-VN' : 'en-US'
      utterance.rate = lang === 'vi' ? 0.95 : 0.9

      const voices = window.speechSynthesis.getVoices()
      const matchedVoice = voices.find((v) =>
        lang === 'vi' ? v.lang.startsWith('vi') : v.lang.startsWith('en'),
      )
      if (matchedVoice) {
        utterance.voice = matchedVoice
      }

      utterance.onend = () => resolve(true)
      utterance.onerror = () => resolve(false)

      window.speechSynthesis.speak(utterance)
    } catch {
      resolve(false)
    }
  })
}

/**
 * Play audio in a specific language (EN or VI)
 * Awaits until the audio finishes playing completely.
 */
export async function speakLanguage(text: string, lang: 'en' | 'vi'): Promise<boolean> {
  stopBilingualAudio()
  isAudioCancelled = false

  // 1. Try Google TTS via IPC / direct audio
  const ok = await playGoogleTTS(text, lang)
  if (ok || isAudioCancelled) return ok

  // 2. Fallback to Web Speech API
  return playSpeechSynthesis(text, lang)
}

/**
 * Play Bilingual Audio: Read English first -> brief pause -> Read Vietnamese
 */
export async function speakBilingualAudio(
  textEn: string,
  textVi: string,
  onPhaseChange?: (phase: 'idle' | 'en' | 'vi') => void,
): Promise<void> {
  stopBilingualAudio()
  isAudioCancelled = false

  try {
    // Phase 1: Speak English
    if (textEn.trim()) {
      onPhaseChange?.('en')
      await speakLanguage(textEn, 'en')
    }

    if (isAudioCancelled) {
      onPhaseChange?.('idle')
      return
    }

    // Brief transition pause
    await new Promise((r) => setTimeout(r, 350))

    if (isAudioCancelled) {
      onPhaseChange?.('idle')
      return
    }

    // Phase 2: Speak Vietnamese
    if (textVi.trim()) {
      onPhaseChange?.('vi')
      await speakLanguage(textVi, 'vi')
    }
  } finally {
    onPhaseChange?.('idle')
  }
}
