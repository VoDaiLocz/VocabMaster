// ============================================
// Quiz & Typing Utilities
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
 * Mask word for typing hint (show first and last letter)
 */
function maskWord(word: string): string {
  if (word.length <= 2) return '_'.repeat(word.length)
  return `${word[0]}${'_'.repeat(word.length - 2)}${word[word.length - 1]}`
}

/**
 * Check typing answer with fuzzy matching
 */
export function checkTypingAnswer(input: string, correct: string): TypingResult {
  const normalizedInput = input.toLowerCase().trim()
  const normalizedCorrect = correct.toLowerCase().trim()

  if (normalizedInput === normalizedCorrect) {
    return { isCorrect: true, similarity: 100, feedback: 'Chính xác!' }
  }

  const similarity = calculateSimilarity(normalizedInput, normalizedCorrect)

  if (similarity >= LEARNING.TYPING_SIMILARITY_THRESHOLD) {
    return { isCorrect: true, similarity, feedback: 'Gần đúng! (có lỗi chính tả nhỏ)' }
  }

  if (similarity >= LEARNING.TYPING_CLOSE_THRESHOLD) {
    return { isCorrect: false, similarity, feedback: 'Gần đúng rồi, thử lại!' }
  }

  return { isCorrect: false, similarity, feedback: `Sai rồi. Đáp án: ${correct}` }
}

/**
 * Calculate string similarity using Levenshtein distance
 */
function calculateSimilarity(str1: string, str2: string): number {
  const len1 = str1.length
  const len2 = str2.length
  const matrix: number[][] = []

  // Initialize matrix
  for (let i = 0; i <= len1; i++) {
    matrix[i] = [i]
  }
  for (let j = 0; j <= len2; j++) {
    matrix[0][j] = j
  }

  // Fill matrix
  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1, // deletion
        matrix[i][j - 1] + 1, // insertion
        matrix[i - 1][j - 1] + cost, // substitution
      )
    }
  }

  const distance = matrix[len1][len2]
  const maxLen = Math.max(len1, len2)
  return Math.round((1 - distance / maxLen) * 100)
}

// Pre-warm voices on startup
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices()
  }
}

let activeAudioElement: HTMLAudioElement | null = null

/**
 * Speak word or sentence using rock-solid Web Speech API with Android GC protection and multi-tier audio fallback
 */
export function speakWord(text: string, rate = 1): void {
  if (!text || typeof window === 'undefined') return
  const cleanText = text.trim()
  if (!cleanText) return

  // Stop any ongoing fallback audio
  if (activeAudioElement) {
    try {
      activeAudioElement.pause()
      activeAudioElement.src = ''
    } catch {
      // ignore
    }
    activeAudioElement = null
  }

  if ('speechSynthesis' in window) {
    try {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume()
      }

      window.speechSynthesis.cancel()

      // 10ms micro-delay to prevent cancel-deadlock on Chromium / Android WebView
      setTimeout(() => {
        try {
          const utterance = new SpeechSynthesisUtterance(cleanText)
          utterance.lang = 'en-US'
          utterance.rate = Math.max(0.5, Math.min(2.0, rate))
          utterance.pitch = 1.0

          const voices = window.speechSynthesis.getVoices()
          const enVoice = voices.find(
            (v) =>
              v.lang === 'en-US' ||
              v.lang === 'en-GB' ||
              v.lang.startsWith('en_US') ||
              v.lang.startsWith('en-') ||
              v.lang.startsWith('en_'),
          )
          if (enVoice) {
            utterance.voice = enVoice
          }

          utterance.onend = () => {
            ;(window as unknown as { __activeUtterance?: unknown }).__activeUtterance = null
          }
          utterance.onerror = (e) => {
            console.warn('[TTS] SpeechSynthesis error, trying fallback audio:', e)
            ;(window as unknown as { __activeUtterance?: unknown }).__activeUtterance = null
            fallbackAudioSpeak(cleanText, rate)
          }

          ;(window as unknown as { __activeUtterance?: unknown }).__activeUtterance = utterance
          window.speechSynthesis.speak(utterance)
        } catch {
          fallbackAudioSpeak(cleanText, rate)
        }
      }, 10)
      return
    } catch (err) {
      console.warn('[TTS] SpeechSynthesis exception:', err)
    }
  }

  fallbackAudioSpeak(cleanText, rate)
}

function fallbackAudioSpeak(text: string, rate: number) {
  try {
    const encoded = encodeURIComponent(text.slice(0, 200))
    const audioUrl = text.includes(' ')
      ? `https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=${encoded}`
      : `https://dict.youdao.com/dictvoice?audio=${encoded}&type=2`

    const audio = new Audio(audioUrl)
    audio.playbackRate = rate
    activeAudioElement = audio
    audio.play().catch(() => {
      // Secondary fallback
      const altUrl = `https://dict.youdao.com/dictvoice?audio=${encoded}&type=2`
      const altAudio = new Audio(altUrl)
      altAudio.playbackRate = rate
      activeAudioElement = altAudio
      altAudio.play().catch(() => {
        // ignore
      })
    })
  } catch (err) {
    console.error('[TTS] Audio playback error:', err)
  }
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
