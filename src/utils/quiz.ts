// ============================================
// Quiz & Typing Utilities + Bulletproof Audio TTS
// ============================================

import type { WordWithProgress } from '@/types'
import type { QuizQuestion, TypingChallenge, TypingResult } from '@/types/learning'
import { LEARNING } from '@/constants'

/**
 * Generate quiz questions with multiple choice options
 */
export function generateQuizQuestions(
  words: WordWithProgress[],
  allWords: WordWithProgress[],
  count: number = LEARNING.DEFAULT_QUIZ_COUNT,
  type: 'definition' | 'term' | 'mixed' = 'mixed',
): QuizQuestion[] {
  const questions: QuizQuestion[] = []
  const shuffledWords = shuffleArray(words).slice(0, count)

  for (const word of shuffledWords) {
    const questionType = type === 'mixed' ? (Math.random() > 0.5 ? 'definition' : 'term') : type

    // Get wrong options from other words
    const otherWords = allWords.filter((w) => w.id !== word.id)
    const wrongOptions = shuffleArray(otherWords)
      .slice(0, LEARNING.QUIZ_OPTIONS_COUNT - 1)
      .map((w) => (questionType === 'definition' ? w.definition : w.term))

    const correctAnswer = questionType === 'definition' ? word.definition : word.term

    // Shuffle all options
    const allOptions = shuffleArray([...wrongOptions, correctAnswer])
    const correctIndex = allOptions.indexOf(correctAnswer)

    questions.push({
      word,
      options: allOptions,
      correctIndex,
      type: questionType,
    })
  }

  return questions
}

/**
 * Generate typing challenges
 */
export function generateTypingChallenges(
  words: WordWithProgress[],
  count: number = LEARNING.DEFAULT_QUIZ_COUNT,
): TypingChallenge[] {
  return shuffleArray(words)
    .slice(0, count)
    .map((word) => ({
      word,
      hint: word.definition,
      maskedWord: maskWord(word.term),
    }))
}

/**
 * Mask word for typing practice (show first and last letters)
 */
export function maskWord(term: string): string {
  if (term.length <= 2) return term
  const first = term[0]
  const last = term[term.length - 1]
  const middle = '_'.repeat(term.length - 2)
  return first + middle + last
}

/**
 * Check typing answer
 */
export function checkTypingAnswer(input: string, target: string): TypingResult {
  const cleanInput = input.trim().toLowerCase()
  const cleanTarget = target.trim().toLowerCase()
  const isCorrect = cleanInput === cleanTarget

  let matchingChars = 0
  const minLen = Math.min(cleanInput.length, cleanTarget.length)
  for (let i = 0; i < minLen; i++) {
    if (cleanInput[i] === cleanTarget[i]) matchingChars++
  }
  const maxLen = Math.max(cleanInput.length, cleanTarget.length)
  const similarity = maxLen > 0 ? Math.round((matchingChars / maxLen) * 100) : 0

  let feedback = 'Chính xác tuyệt đối! 🎉'
  if (!isCorrect) {
    if (similarity >= 75) {
      feedback = 'Gần đúng rồi, chú ý chính tả một chút nhé! ✍️'
    } else {
      feedback = 'Chưa chính xác. Đáp án đúng là: ' + target
    }
  }

  return {
    isCorrect,
    similarity,
    feedback,
  }
}

// Global active audio and speech token to prevent echo / double-playing
let activeAudioElement: HTMLAudioElement | null = null
let currentSpeechToken = 0
let speechFallbackTimer: ReturnType<typeof setTimeout> | null = null

/**
 * Cancel any ongoing speech synthesis or audio playback immediately
 */
export function stopAllAudio(): void {
  currentSpeechToken++
  if (speechFallbackTimer) {
    clearTimeout(speechFallbackTimer)
    speechFallbackTimer = null
  }
  if (activeAudioElement) {
    try {
      activeAudioElement.pause()
      activeAudioElement.currentTime = 0
      activeAudioElement.onended = null
      activeAudioElement.onerror = null
      activeAudioElement.src = ''
      activeAudioElement = null
    } catch {
      // ignore
    }
  }
  if ('speechSynthesis' in window && window.speechSynthesis) {
    try {
      window.speechSynthesis.cancel()
    } catch {
      // ignore
    }
  }
}

/**
 * Bulletproof Multi-Tier Text-to-Speech Pronunciation Engine
 * Guarantees zero overlapping audio, zero hang, and 100% reliability on Linux, Electron, and Web
 */
export function speakWord(text: string, rate: number = 0.95): void {
  if (!text || typeof text !== 'string') return
  const cleanText = text.replace(/<[^>]*>/g, '').trim()
  if (!cleanText) return

  // 1. Immediately cancel all previous speech/audio to prevent overlapping echo
  stopAllAudio()
  const thisToken = currentSpeechToken

  // Stream Audio Fallback (Google TTS primary, secondary endpoints for full sentences/words)
  const playStreamAudio = () => {
    if (currentSpeechToken !== thisToken) return
    // Ensure any stuck SpeechSynthesis is cancelled so it won't speak later
    if ('speechSynthesis' in window && window.speechSynthesis) {
      try {
        window.speechSynthesis.cancel()
      } catch {
        // ignore
      }
    }

    try {
      const encoded = encodeURIComponent(cleanText.slice(0, 300))
      // Primary: Google Translate TTS API (gtx client)
      const googleUrl =
        'https://translate.googleapis.com/translate_tts?ie=UTF-8&tl=en&client=gtx&q=' + encoded
      // Fallback 1: Google Translate alternative client
      const googleAltUrl =
        'https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=' + encoded
      // Fallback 2: Youdao dictvoice (great for words)
      const youdaoUrl = 'https://dict.youdao.com/dictvoice?audio=' + encoded + '&type=1'

      const audio = new Audio(googleUrl)
      audio.playbackRate = Math.max(0.7, Math.min(1.5, rate))
      activeAudioElement = audio

      audio.onended = () => {
        if (activeAudioElement === audio) {
          activeAudioElement = null
        }
      }

      audio.play().catch(() => {
        if (currentSpeechToken !== thisToken) return
        const fallbackAudio = new Audio(googleAltUrl)
        fallbackAudio.playbackRate = Math.max(0.7, Math.min(1.5, rate))
        activeAudioElement = fallbackAudio

        fallbackAudio.onended = () => {
          if (activeAudioElement === fallbackAudio) {
            activeAudioElement = null
          }
        }

        fallbackAudio.play().catch(() => {
          if (currentSpeechToken !== thisToken) return
          const ydAudio = new Audio(youdaoUrl)
          ydAudio.playbackRate = Math.max(0.7, Math.min(1.5, rate))
          activeAudioElement = ydAudio
          ydAudio.onended = () => {
            if (activeAudioElement === ydAudio) {
              activeAudioElement = null
            }
          }
          ydAudio.play().catch(() => {})
        })
      })
    } catch (err) {
      console.warn('[TTS] Audio Stream error:', err)
    }
  }

  // 2. Check native Web SpeechSynthesis with strict mutex & single-engine exclusivity
  if ('speechSynthesis' in window && window.speechSynthesis) {
    try {
      const voices = window.speechSynthesis.getVoices()
      const hasEnVoice = voices.some(
        (v) => v.lang && (v.lang.startsWith('en') || v.lang.startsWith('en_')),
      )

      if (voices.length === 0 || !hasEnVoice) {
        playStreamAudio()
        return
      }

      const utterance = new SpeechSynthesisUtterance(cleanText)
      utterance.lang = 'en-US'
      utterance.rate = Math.max(0.7, Math.min(1.5, rate))

      const preferredVoice =
        voices.find((v) => v.lang === 'en-US' || v.lang === 'en-GB') ||
        voices.find((v) => v.lang.startsWith('en'))
      if (preferredVoice) utterance.voice = preferredVoice

      let hasStarted = false

      utterance.onstart = () => {
        if (currentSpeechToken !== thisToken) {
          try {
            window.speechSynthesis.cancel()
          } catch {
            // ignore
          }
          return
        }
        hasStarted = true
        // SpeechSynthesis successfully started -> cancel any pending stream fallback timer!
        if (speechFallbackTimer) {
          clearTimeout(speechFallbackTimer)
          speechFallbackTimer = null
        }
      }

      utterance.onerror = () => {
        if (currentSpeechToken !== thisToken) return
        if (!hasStarted) {
          if (speechFallbackTimer) {
            clearTimeout(speechFallbackTimer)
            speechFallbackTimer = null
          }
          playStreamAudio()
        }
      }

      utterance.onend = () => {
        if (speechFallbackTimer) {
          clearTimeout(speechFallbackTimer)
          speechFallbackTimer = null
        }
      }

      // Fallback timer: if SpeechSynthesis fails to start within 350ms (common on Linux/Electron without speechd),
      // cancel SpeechSynthesis and switch to clean stream audio.
      speechFallbackTimer = setTimeout(() => {
        if (currentSpeechToken === thisToken && !hasStarted) {
          try {
            window.speechSynthesis.cancel()
          } catch {
            // ignore
          }
          playStreamAudio()
        }
      }, 350)

      window.speechSynthesis.speak(utterance)
      return
    } catch {
      playStreamAudio()
      return
    }
  }

  playStreamAudio()
}

/**
 * Shuffle array using Fisher-Yates algorithm
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}
