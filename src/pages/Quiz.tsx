// ============================================
// Quiz Page - Multiple Choice Quiz Mode
// ============================================

import { useEffect, useState, useCallback, memo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle, XCircle, Volume2, Trophy, Zap, ArrowRight } from 'lucide-react'
import { Button } from '@/components/common/Button'
import { useLearningStore } from '@/store/learningStore'
import { useDeckStore } from '@/store/deckStore'
import { generateQuizQuestions, speakWord } from '@/utils/quiz'
import { getToday } from '@/utils/date'
import { checkSpecialAchievements } from '@/store/achievementStore'
import { LEARNING } from '@/constants'
import type { QuizQuestion, WordWithProgress } from '@/types'
import type { QuizScore } from '@/types/learning'

// ============================================
// Main Component
// ============================================

export function Quiz() {
    const { decks, fetchDecks } = useDeckStore()
    const { todayWords, fetchTodayWords } = useLearningStore()
    const [allWords, setAllWords] = useState<WordWithProgress[]>([])
    const [questions, setQuestions] = useState<QuizQuestion[]>([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
    const [showResult, setShowResult] = useState(false)
    const [score, setScore] = useState<QuizScore>({ correct: 0, total: 0 })
    const [quizComplete, setQuizComplete] = useState(false)
    const [startTime, setStartTime] = useState(0)
    const [isStarted, setIsStarted] = useState(false)
    const [selectedDeckId, setSelectedDeckId] = useState<number | null>(null)

    // Load initial data
    useEffect(() => {
        fetchDecks()
    }, [fetchDecks])

    const startQuiz = async (deckId: number | null) => {
        setIsStarted(true)
        setSelectedDeckId(deckId)
        await fetchTodayWords(deckId || undefined)

        // Load words for distractor generation
        const words = await window.electronAPI.dbQuery<WordWithProgress>(`
            SELECT w.*, p.ease_factor, p.interval, p.repetitions, p.status
            FROM words w LEFT JOIN progress p ON w.id = p.word_id
            ${deckId ? `WHERE w.deck_id = ${deckId}` : ''}
            LIMIT 10000
        `)
        setAllWords(words)
    }

    // Generate questions when words are loaded
    useEffect(() => {
        if (isStarted && todayWords.length > 0 && allWords.length > 0) {
            const quizQuestions = generateQuizQuestions(todayWords, allWords, todayWords.length, 'mixed')
            setQuestions(quizQuestions)
            setStartTime(Date.now())
        }
    }, [isStarted, todayWords, allWords])

    const currentQuestion = questions[currentIndex]

    // Handle answer selection
    const handleAnswer = useCallback(async (index: number) => {
        if (showResult) return

        setSelectedAnswer(index)
        setShowResult(true)

        const isCorrect = index === currentQuestion.correctIndex
        const responseTime = Date.now() - startTime

        if (isCorrect) {
            setScore((prev) => ({ ...prev, correct: prev.correct + 1 }))
            if (responseTime < LEARNING.SPEED_ACHIEVEMENT_MS) {
                await checkSpecialAchievements('speed_demon')
            }
        }

        setScore((prev) => ({ ...prev, total: prev.total + 1 }))
    }, [showResult, currentQuestion, startTime])

    // Move to next question
    const nextQuestion = useCallback(async () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex((prev) => prev + 1)
            setSelectedAnswer(null)
            setShowResult(false)
            setStartTime(Date.now())
        } else {
            setQuizComplete(true)

            // Check perfect quiz achievement
            if (score.correct === questions.length) {
                await checkSpecialAchievements('perfect_quiz')
            }

            // Save quiz score
            await window.electronAPI.dbRun(
                'UPDATE stats SET quiz_score = quiz_score + ? WHERE date = ?',
                [score.correct, getToday()]
            )
        }
    }, [currentIndex, questions.length, score.correct])

    // Keyboard shortcuts
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (quizComplete) return

        if (!showResult) {
            const keyIndex = parseInt(e.key) - 1
            if (keyIndex >= 0 && keyIndex < (currentQuestion?.options.length ?? 0)) {
                handleAnswer(keyIndex)
            }
        } else if (e.code === 'Space' || e.code === 'Enter') {
            e.preventDefault()
            nextQuestion()
        }
    }, [showResult, currentQuestion, quizComplete, handleAnswer, nextQuestion])

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [handleKeyDown])

    // Restart quiz
    const restartQuiz = useCallback(async () => {
        await startQuiz(selectedDeckId)
        setCurrentIndex(0)
        setSelectedAnswer(null)
        setShowResult(false)
        setScore({ correct: 0, total: 0 })
        setQuizComplete(false)
    }, [selectedDeckId])

    // Render selection screen if not started
    if (!isStarted) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[80vh] p-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Chọn bộ từ vựng</h1>
                    <p className="text-gray-500">Hãy chọn bộ từ vựng bạn muốn ôn tập hôm nay.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
                    {/* All Decks Option */}
                    <button
                        onClick={() => startQuiz(null)}
                        className="group relative flex flex-col p-6 bg-white dark:bg-gray-800 rounded-3xl border-2 border-transparent hover:border-primary-500 shadow-xl hover:shadow-2xl transition-all text-left overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Zap size={80} className="text-primary-500" />
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4 text-2xl">
                            🎯
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Tất cả các bộ</h3>
                        <p className="text-sm text-gray-500 mb-4">Ôn tập ngẫu nhiên từ toàn bộ kho từ vựng của bạn.</p>
                        <div className="mt-auto flex items-center text-primary-600 font-semibold group-hover:translate-x-1 transition-transform">
                            Bắt đầu ngay <ArrowRight size={18} className="ml-2" />
                        </div>
                    </button>

                    {/* Individual Decks */}
                    {decks.map((deck) => (
                        <button
                            key={deck.id}
                            onClick={() => startQuiz(deck.id)}
                            className="group relative flex flex-col p-6 bg-white dark:bg-gray-800 rounded-3xl border-2 border-transparent hover:border-primary-500 shadow-xl hover:shadow-2xl transition-all text-left"
                            style={{ '--deck-color': deck.color } as any}
                        >
                            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-2xl" style={{ backgroundColor: `${deck.color}20` }}>
                                {deck.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{deck.name}</h3>
                            <p className="text-sm text-gray-500 mb-4 line-clamp-2">{deck.description}</p>
                            <div className="mt-auto flex items-center font-semibold group-hover:translate-x-1 transition-transform" style={{ color: deck.color }}>
                                Bắt đầu <ArrowRight size={18} className="ml-2" />
                            </div>
                        </button>
                    ))}
                </div>

                <Link to="/" className="mt-12 text-gray-500 hover:text-gray-900 flex items-center">
                    <ArrowLeft size={20} className="mr-2" /> Quay lại trang chủ
                </Link>
            </div>
        )
    }

    // Not enough words
    if (questions.length === 0) {
        return <NotEnoughWordsState />
    }

    // Quiz complete
    if (quizComplete) {
        return <QuizCompleteState score={score} onRestart={restartQuiz} />
    }

    const progress = ((currentIndex + 1) / questions.length) * 100

    return (
        <div className="h-full flex flex-col p-8">
            <QuizHeader score={score} currentIndex={currentIndex} total={questions.length} />
            <ProgressBar progress={progress} />

            <div className="flex-1 flex flex-col items-center justify-center">
                <div className="w-full max-w-2xl">
                    <QuestionCard question={currentQuestion} />
                    <OptionsGrid
                        options={currentQuestion.options}
                        correctIndex={currentQuestion.correctIndex}
                        selectedAnswer={selectedAnswer}
                        showResult={showResult}
                        onSelect={handleAnswer}
                    />
                    {showResult && (
                        <div className="mt-6 text-center">
                            <Button onClick={nextQuestion} size="lg">
                                {currentIndex < questions.length - 1 ? 'Câu tiếp theo' : 'Xem kết quả'} →
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            <KeyboardHints showResult={showResult} />
        </div>
    )
}

// ============================================
// Sub-components
// ============================================

const NotEnoughWordsState = memo(function NotEnoughWordsState() {
    return (
        <div className="h-full flex flex-col items-center justify-center p-8">
            <div className="text-6xl mb-4">📝</div>
            <h1 className="text-2xl font-bold mb-2">Chưa đủ từ để quiz</h1>
            <p className="text-gray-500 mb-6">Cần ít nhất {LEARNING.MIN_WORDS_FOR_QUIZ} từ để tạo quiz</p>
            <Link to="/library">
                <Button>📚 Thêm từ vựng</Button>
            </Link>
        </div>
    )
})

interface QuizCompleteStateProps {
    score: QuizScore
    onRestart: () => void
}

const QuizCompleteState = memo(function QuizCompleteState({ score, onRestart }: QuizCompleteStateProps) {
    const percentage = Math.round((score.correct / score.total) * 100)
    const isPerfect = percentage === 100

    return (
        <div className="h-full flex flex-col items-center justify-center p-8">
            <div className="text-6xl mb-4">
                {isPerfect ? '🏆' : percentage >= 70 ? '🎉' : '💪'}
            </div>
            <h1 className="text-3xl font-bold mb-2">
                {isPerfect ? 'Hoàn hảo!' : percentage >= 70 ? 'Tuyệt vời!' : 'Cố gắng thêm!'}
            </h1>
            <p className="text-xl text-gray-600 mb-6">
                Bạn đúng <span className="font-bold text-primary-500">{score.correct}/{score.total}</span> câu ({percentage}%)
            </p>
            <ResultProgressBar percentage={percentage} isPerfect={isPerfect} />
            <div className="flex gap-4">
                <Link to="/">
                    <Button variant="secondary">
                        <ArrowLeft size={18} className="mr-2" /> Về trang chủ
                    </Button>
                </Link>
                <Button onClick={onRestart}>
                    <Trophy size={18} className="mr-2" /> Chơi lại
                </Button>
            </div>
        </div>
    )
})

interface QuizHeaderProps {
    score: QuizScore
    currentIndex: number
    total: number
}

const QuizHeader = memo(function QuizHeader({ score, currentIndex, total }: QuizHeaderProps) {
    return (
        <div className="flex items-center justify-between mb-6">
            <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-gray-700">
                <ArrowLeft size={20} /> Quay lại
            </Link>
            <div className="flex items-center gap-4">
                <span className="text-green-500 font-medium">✓ {score.correct}</span>
                <span className="text-gray-400">|</span>
                <span className="text-gray-500">{currentIndex + 1}/{total}</span>
            </div>
        </div>
    )
})

interface ProgressBarProps {
    progress: number
}

const ProgressBar = memo(function ProgressBar({ progress }: ProgressBarProps) {
    return (
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full mb-8">
            <div
                className="h-full bg-primary-500 rounded-full transition-all"
                style={{ width: `${progress}%` }}
            />
        </div>
    )
})

interface QuestionCardProps {
    question: QuizQuestion
}

const QuestionCard = memo(function QuestionCard({ question }: QuestionCardProps) {
    const handleSpeak = useCallback(() => {
        speakWord(question.word.term)
    }, [question.word.term])

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-8 text-center">
            <p className="text-sm text-gray-500 mb-4">
                {question.type === 'definition' ? 'Chọn nghĩa đúng của từ:' : 'Từ nào có nghĩa:'}
            </p>
            <div className="flex items-center justify-center gap-3 mb-2">
                <h2 className="text-3xl font-bold">
                    {question.type === 'definition' ? question.word.term : question.word.definition}
                </h2>
                {question.type === 'definition' && (
                    <button
                        onClick={handleSpeak}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                    >
                        <Volume2 size={24} className="text-primary-500" />
                    </button>
                )}
            </div>
            {question.type === 'definition' && question.word.phonetic && (
                <p className="text-gray-500">{question.word.phonetic}</p>
            )}
        </div>
    )
})

interface OptionsGridProps {
    options: string[]
    correctIndex: number
    selectedAnswer: number | null
    showResult: boolean
    onSelect: (index: number) => void
}

const OptionsGrid = memo(function OptionsGrid({
    options,
    correctIndex,
    selectedAnswer,
    showResult,
    onSelect,
}: OptionsGridProps) {
    return (
        <div className="grid grid-cols-2 gap-4">
            {options.map((option, index) => (
                <OptionButton
                    key={index}
                    index={index}
                    option={option}
                    isCorrect={index === correctIndex}
                    isSelected={selectedAnswer === index}
                    showResult={showResult}
                    onSelect={onSelect}
                />
            ))}
        </div>
    )
})

interface OptionButtonProps {
    index: number
    option: string
    isCorrect: boolean
    isSelected: boolean
    showResult: boolean
    onSelect: (index: number) => void
}

const OptionButton = memo(function OptionButton({
    index,
    option,
    isCorrect,
    isSelected,
    showResult,
    onSelect,
}: OptionButtonProps) {
    let bgClass = 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'

    if (showResult) {
        if (isCorrect) {
            bgClass = 'bg-green-100 dark:bg-green-900/30 border-green-500'
        } else if (isSelected && !isCorrect) {
            bgClass = 'bg-red-100 dark:bg-red-900/30 border-red-500'
        }
    } else if (isSelected) {
        bgClass = 'bg-primary-100 dark:bg-primary-900/30 border-primary-500'
    }

    return (
        <button
            onClick={() => onSelect(index)}
            disabled={showResult}
            className={`p-4 rounded-xl border-2 text-left transition-all ${bgClass} ${showResult ? 'cursor-default' : 'cursor-pointer'}`}
        >
            <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-sm font-medium">
                    {index + 1}
                </span>
                <span className="flex-1">{option}</span>
                {showResult && isCorrect && <CheckCircle className="text-green-500" size={20} />}
                {showResult && isSelected && !isCorrect && <XCircle className="text-red-500" size={20} />}
            </div>
        </button>
    )
})

interface ResultProgressBarProps {
    percentage: number
    isPerfect: boolean
}

const ResultProgressBar = memo(function ResultProgressBar({ percentage, isPerfect }: ResultProgressBarProps) {
    const colorClass = isPerfect ? 'bg-green-500' : percentage >= 70 ? 'bg-primary-500' : 'bg-yellow-500'

    return (
        <div className="w-64 h-4 bg-gray-200 rounded-full overflow-hidden mb-8">
            <div
                className={`h-full rounded-full transition-all ${colorClass}`}
                style={{ width: `${percentage}%` }}
            />
        </div>
    )
})

interface KeyboardHintsProps {
    showResult: boolean
}

const KeyboardHints = memo(function KeyboardHints({ showResult }: KeyboardHintsProps) {
    return (
        <div className="text-center text-sm text-gray-400">
            {showResult ? '[Space/Enter] Tiếp tục' : '[1-4] Chọn đáp án'}
        </div>
    )
})
