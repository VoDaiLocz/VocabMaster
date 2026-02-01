// ============================================
// Import Data Page - Import from Files & PDF
// ============================================

import { useState, useRef, useCallback, memo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
    ArrowLeft, Upload, FileText, Check, AlertCircle, Loader2,
    FileType, X, ChevronDown, ChevronUp, RefreshCw,
    Download, WifiOff, Settings, Image as ImageIcon
} from 'lucide-react'
import { Button } from '@/components/common/Button'
import { useDeckStore } from '@/store/deckStore'
import { PDFProcessor, isValidPDFFile, formatProcessingTime, estimateOCRTime } from '@/services/pdfProcessor'
import { ImageProcessor, isValidImageFile } from '@/services/imageProcessor'
import type { PDFProcessingProgress, PDFProcessingResult } from '@/services/pdfProcessor'
import type { ImageProcessingProgress, ImageProcessingResult } from '@/services/imageProcessor'
import type { ImportWord } from '@/store/deckStore'
import type { Deck } from '@/types'

// ============================================
// Types
// ============================================

interface ImportResult {
    success: boolean
    count: number
    skipped?: number
}

interface ProcessingState {
    isProcessing: boolean
    stage: PDFProcessingProgress['stage'] | ImageProcessingProgress['stage'] | null
    current: number
    total: number
    message: string
    timeElapsed: number
}

// ============================================
// Main Component
// ============================================

export function ImportData() {
    const { createDeck, importWordsWithDeduplication, fetchDecks, decks, fetchDeck } = useDeckStore()

    // File state
    const [file, setFile] = useState<File | null>(null)
    const [isPDFFile, setIsPDFFile] = useState(false)

    // Processing state
    const [processing, setProcessing] = useState<ProcessingState>({
        isProcessing: false,
        stage: null,
        current: 0,
        total: 1,
        message: '',
        timeElapsed: 0,
    })

    // Preview state
    const [preview, setPreview] = useState<ImportWord[]>([])
    const [allExtractedWords, setAllExtractedWords] = useState<ImportWord[]>([])

    // Import options
    const [deckName, setDeckName] = useState('')
    const [selectedDeckId, setSelectedDeckId] = useState<number | null>(null)
    const [createNewDeck, setCreateNewDeck] = useState(true)
    const [isCreatingDeck, setIsCreatingDeck] = useState(false)

    // Result state
    const [result, setResult] = useState<ImportResult | null>(null)
    const [error, setError] = useState('')
    const [showOCRWarning, setShowOCRWarning] = useState(false)

    // UI state
    const [dragActive, setDragActive] = useState(false)
    const [expandedPreview, setExpandedPreview] = useState(false)
    const [ocrEstimate, setOcrEstimate] = useState<number>(0)

    const fileInputRef = useRef<HTMLInputElement>(null)
    const pdfProcessorRef = useRef<PDFProcessor | null>(null)
    const imageProcessorRef = useRef<ImageProcessor | null>(null)
    const startTimeRef = useRef<number>(0)
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

    // Initialize PDF processor
    useEffect(() => {
        pdfProcessorRef.current = new PDFProcessor({
            enableOCR: true,
            ocrLanguage: 'eng',
            extractWordDefinitions: true,
            minWordLength: 2,
        })

        imageProcessorRef.current = new ImageProcessor({
            ocrLanguage: 'eng+vie',
            minWordLength: 2,
            extractWordDefinitions: true,
        })

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current)
            }
        }
    }, [])

    // Start timer for processing time
    const startTimer = useCallback(() => {
        startTimeRef.current = Date.now()
        timerRef.current = setInterval(() => {
            setProcessing(prev => ({
                ...prev,
                timeElapsed: Date.now() - startTimeRef.current
            }))
        }, 1000)
    }, [])

    const stopTimer = useCallback(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current)
            timerRef.current = null
        }
    }, [])

    // Parse regular file
    const parseFile = useCallback(async (text: string, ext: string): Promise<ImportWord[]> => {
        let words: ImportWord[] = []

        if (ext === 'json') {
            try {
                const data = JSON.parse(text)
                if (Array.isArray(data)) {
                    words = data.map((item: Record<string, unknown>) => ({
                        term: String(item.term || item.word || item.front || ''),
                        definition: String(item.definition || item.meaning || item.back || ''),
                        example: String(item.example || item.sentence || ''),
                        phonetic: String(item.phonetic || item.pronunciation || ''),
                    }))
                }
            } catch {
                throw new Error('File JSON không hợp lệ')
            }
        } else {
            const lines = text.split('\n').filter((line) => line.trim())
            words = lines.map((line) => {
                const parts = line.split(/[,\t;|]/)
                return {
                    term: parts[0]?.trim() || '',
                    definition: parts[1]?.trim() || '',
                    example: parts[2]?.trim() || '',
                    phonetic: parts[3]?.trim() || '',
                }
            })
        }

        return words.filter((w) => w.term && w.definition)
    }, [])

    // Process file (PDF or regular)
    const processFile = useCallback(async (selectedFile: File) => {
        setFile(selectedFile)
        setError('')
        setResult(null)
        setPreview([])
        setAllExtractedWords([])
        setProcessing({
            isProcessing: true,
            stage: 'loading',
            current: 0,
            total: 0,
            message: 'Đang kiểm tra file...',
            timeElapsed: 0,
        })

        const isPDF = isValidPDFFile(selectedFile)
        const isImage = isValidImageFile(selectedFile)
        setIsPDFFile(isPDF)

        if (isPDF) {
            try {
                const pdfProcessor = pdfProcessorRef.current!

                pdfProcessor.setProgressCallback((progress: PDFProcessingProgress) => {
                    setProcessing(prev => ({
                        ...prev,
                        stage: progress.stage,
                        current: progress.current,
                        total: progress.total,
                        message: progress.message,
                    }))
                })

                const arrayBuffer = await selectedFile.arrayBuffer()
                const isScanned = await pdfProcessor.isPDFScannedPublic(arrayBuffer)

                if (isScanned) {
                    const pageCount = await pdfProcessor.getPageCountPublic(arrayBuffer)
                    const estimate = estimateOCRTime(pageCount, true)
                    setOcrEstimate(estimate)
                    setShowOCRWarning(true)
                    stopTimer()
                    setProcessing(prev => ({ ...prev, isProcessing: false }))
                    return
                }

                startTimer()
                const result: PDFProcessingResult = await pdfProcessor.processPDF(selectedFile)
                stopTimer()

                if (result.success) {
                    setAllExtractedWords(result.words)
                    setPreview(result.words.slice(0, 10))
                    setProcessing({
                        isProcessing: false,
                        stage: 'complete',
                        current: result.extractedWords,
                        total: result.extractedWords,
                        message: `Đã trích xuất ${result.extractedWords} từ`,
                        timeElapsed: result.processingTime,
                    })
                } else {
                    setError(result.errors.join('\n') || 'Không thể xử lý PDF')
                    setProcessing(prev => ({ ...prev, isProcessing: false }))
                }
            } catch (err) {
                stopTimer()
                setError(err instanceof Error ? err.message : 'Lỗi khi xử lý PDF')
                setProcessing(prev => ({ ...prev, isProcessing: false }))
            }
        } else if (isImage) {
            try {
                startTimer()
                const imageProcessor = imageProcessorRef.current!

                imageProcessor.setProgressCallback((progress: ImageProcessingProgress) => {
                    setProcessing(prev => ({
                        ...prev,
                        stage: progress.stage,
                        current: progress.current,
                        total: progress.total,
                        message: progress.message,
                    }))
                })

                const result: ImageProcessingResult = await imageProcessor.processImage(selectedFile)
                stopTimer()

                if (result.success) {
                    setAllExtractedWords(result.words)
                    setPreview(result.words.slice(0, 10))
                    setProcessing({
                        isProcessing: false,
                        stage: 'complete',
                        current: result.extractedWords,
                        total: result.extractedWords,
                        message: `Đã trích xuất ${result.extractedWords} từ`,
                        timeElapsed: result.processingTime,
                    })
                } else {
                    setError(result.errors.join('\n') || 'Không thể xử lý hình ảnh')
                    setProcessing(prev => ({ ...prev, isProcessing: false }))
                }
            } catch (err) {
                stopTimer()
                setError(err instanceof Error ? err.message : 'Lỗi khi xử lý hình ảnh')
                setProcessing(prev => ({ ...prev, isProcessing: false }))
            }
        } else {
            stopTimer()
            try {
                const text = await selectedFile.text()
                const ext = selectedFile.name.split('.').pop()?.toLowerCase() || ''
                const words = await parseFile(text, ext)

                if (words.length === 0) {
                    setError('Không tìm thấy từ vựng hợp lệ trong file')
                } else {
                    setAllExtractedWords(words)
                    setPreview(words.slice(0, 10))
                    setProcessing({
                        isProcessing: false,
                        stage: 'complete',
                        current: words.length,
                        total: words.length,
                        message: `Đã đọc ${words.length} từ`,
                        timeElapsed: 0,
                    })
                }
            } catch {
                setError('Không thể đọc file. Vui lòng kiểm tra định dạng.')
            }
        }
    }, [startTimer, stopTimer, parseFile])

    // Handle file selection
    const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        if (!selectedFile) return
        await processFile(selectedFile)
    }, [processFile])

    // Handle drag and drop
    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true)
        } else if (e.type === 'dragleave') {
            setDragActive(false)
        }
    }, [])

    const handleDrop = useCallback(async (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)

        const files = e.dataTransfer.files
        if (files && files[0]) {
            await processFile(files[0])
        }
    }, [processFile])

    // Proceed with OCR after warning
    const proceedWithOCR = useCallback(async () => {
        setShowOCRWarning(false)
        if (!file) return

        setProcessing({
            isProcessing: true,
            stage: 'ocr',
            current: 0,
            total: 100,
            message: 'Đang khởi tạo OCR...',
            timeElapsed: 0,
        })

        startTimer()

        try {
            const pdfProcessor = pdfProcessorRef.current!
            pdfProcessor.setProgressCallback((progress: PDFProcessingProgress) => {
                setProcessing(prev => ({
                    ...prev,
                    stage: progress.stage,
                    current: progress.current,
                    total: progress.total,
                    message: progress.message,
                }))
            })

            const result: PDFProcessingResult = await pdfProcessor.processPDF(file)
            stopTimer()

            if (result.success) {
                setAllExtractedWords(result.words)
                setPreview(result.words.slice(0, 10))
                setProcessing({
                    isProcessing: false,
                    stage: 'complete',
                    current: result.extractedWords,
                    total: result.extractedWords,
                    message: `Đã trích xuất ${result.extractedWords} từ (${result.errors.length} lỗi)`,
                    timeElapsed: result.processingTime,
                })
            } else {
                setError(result.errors.join('\n') || 'Không thể xử lý PDF')
                setProcessing(prev => ({ ...prev, isProcessing: false }))
            }
        } catch (err) {
            stopTimer()
            setError(err instanceof Error ? err.message : 'Lỗi OCR')
            setProcessing(prev => ({ ...prev, isProcessing: false }))
        }
    }, [file, startTimer, stopTimer])

    // Handle import
    const handleImport = useCallback(async () => {
        if (allExtractedWords.length === 0) return

        if (createNewDeck && !deckName.trim()) {
            setError('Vui lòng nhập tên bộ từ')
            return
        }

        if (!createNewDeck && !selectedDeckId) {
            setError('Vui lòng chọn bộ từ')
            return
        }

        setIsCreatingDeck(true)
        setError('')

        try {
            let deckId: number

            if (createNewDeck) {
                deckId = await createDeck(deckName, `Imported from ${file?.name || 'PDF'}`, '#6C63FF', '📥')
            } else {
                deckId = selectedDeckId!
            }

            const importResult = await importWordsWithDeduplication(deckId, allExtractedWords)
            await fetchDecks()

            if (!createNewDeck) {
                await fetchDeck(deckId)
            }

            setResult({
                success: true,
                count: importResult.inserted,
                skipped: importResult.skipped
            })
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : 'Import thất bại')
        }

        setIsCreatingDeck(false)
    }, [allExtractedWords, createNewDeck, deckName, selectedDeckId, file, createDeck, importWordsWithDeduplication, fetchDecks, fetchDeck])

    // Reset form
    const resetForm = useCallback(() => {
        setResult(null)
        setFile(null)
        setPreview([])
        setAllExtractedWords([])
        setDeckName('')
        setSelectedDeckId(null)
        setError('')
        stopTimer()
    }, [stopTimer])

    // Retry
    const handleRetry = useCallback(() => {
        if (file) {
            processFile(file)
        }
    }, [file, processFile])

    if (result) {
        const targetDeckName = createNewDeck ? deckName : decks.find(d => d.id === selectedDeckId)?.name || ''
        return <SuccessState count={result.count} skipped={result.skipped} deckName={targetDeckName} onReset={resetForm} />
    }

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <Header isPDF={isPDFFile} />

            <DropZone
                file={file}
                dragActive={dragActive}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                fileInputRef={fileInputRef}
                onFileSelect={handleFileSelect}
                isProcessing={processing.isProcessing}
            />

            {showOCRWarning && (
                <OCRWarningModal
                    estimatedTime={ocrEstimate}
                    onProceed={proceedWithOCR}
                    onCancel={() => {
                        setShowOCRWarning(false)
                        setFile(null)
                    }}
                />
            )}

            {(processing.isProcessing || processing.stage === 'complete') && (
                <ProcessingProgress
                    stage={processing.stage}
                    current={processing.current}
                    total={processing.total}
                    message={processing.message}
                    timeElapsed={processing.timeElapsed}
                />
            )}

            {processing.stage === 'complete' && allExtractedWords.length === 0 && (
                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-8 text-center mb-6">
                    <p className="text-orange-600 dark:text-orange-400 font-medium">Không tìm thấy từ vựng nào trong file này.</p>
                    <p className="text-sm text-gray-500 mt-1">Hãy thử kiểm tra lại định dạng file hoặc độ rõ của hình ảnh.</p>
                </div>
            )}

            {preview.length > 0 && !processing.isProcessing && (
                <PreviewSection
                    words={allExtractedWords}
                    preview={preview}
                    expanded={expandedPreview}
                    onToggleExpand={() => setExpandedPreview(!expandedPreview)}
                    onUpdateWord={(index, updated) => {
                        const newWords = [...allExtractedWords]
                        newWords[index] = updated
                        setAllExtractedWords(newWords)
                        if (index < 10) {
                            const newPreview = [...preview]
                            newPreview[index] = updated
                            setPreview(newPreview)
                        }
                    }}
                    onRemoveWord={(index) => {
                        const newWords = allExtractedWords.filter((_, i) => i !== index)
                        setAllExtractedWords(newWords)
                        setPreview(newWords.slice(0, 10))
                    }}
                />
            )}

            {error && (
                <ErrorMessage
                    message={error}
                    onRetry={handleRetry}
                    onClear={() => setError('')}
                />
            )}

            {preview.length > 0 && !processing.isProcessing && (
                <DeckSelectionSection
                    createNewDeck={createNewDeck}
                    setCreateNewDeck={setCreateNewDeck}
                    deckName={deckName}
                    setDeckName={setDeckName}
                    selectedDeckId={selectedDeckId}
                    setSelectedDeckId={setSelectedDeckId}
                    decks={decks}
                />
            )}

            {preview.length > 0 && !processing.isProcessing && (
                <ImportButton
                    onClick={handleImport}
                    disabled={(!createNewDeck && !selectedDeckId) || (createNewDeck && !deckName.trim()) || isCreatingDeck}
                    loading={isCreatingDeck}
                    wordCount={allExtractedWords.length}
                />
            )}

            <FormatGuide isPDF={isPDFFile} file={file} />
        </div>
    )
}

// ============================================
// Sub-components
// ============================================

const Header = memo(function Header({ isPDF }: { isPDF: boolean }) {
    return (
        <div className="flex items-center gap-4 mb-8">
            <Link to="/library" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <ArrowLeft size={20} />
            </Link>
            <div>
                <h1 className="text-2xl font-bold">Import từ vựng</h1>
                <p className="text-gray-500">
                    {isPDF ? 'Hỗ trợ PDF với OCR' : 'Hỗ trợ JSON, CSV, TXT, PDF, Hình ảnh (OCR)'}
                </p>
            </div>
        </div>
    )
})

interface SuccessStateProps {
    count: number
    skipped?: number
    deckName: string
    onReset: () => void
}

const SuccessState = memo(function SuccessState({ count, skipped, deckName, onReset }: SuccessStateProps) {
    return (
        <div className="p-8 max-w-2xl mx-auto">
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-8 text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="text-green-500" size={32} />
                </div>
                <h2 className="text-xl font-bold text-green-600 mb-2">Import thành công!</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                    Đã thêm <strong>{count}</strong> từ vào bộ "{deckName}"
                </p>
                {skipped && skipped > 0 && (
                    <p className="text-sm text-gray-400 mb-6">
                        (Đã bỏ qua {skipped} từ trùng lặp)
                    </p>
                )}
                <div className="flex gap-4 justify-center">
                    <Link to="/decks">
                        <Button>Xem bộ từ</Button>
                    </Link>
                    <Button variant="secondary" onClick={onReset}>
                        Import thêm
                    </Button>
                </div>
            </div>
        </div>
    )
})

interface DropZoneProps {
    file: File | null
    dragActive: boolean
    onDragEnter: (e: React.DragEvent) => void
    onDragLeave: (e: React.DragEvent) => void
    onDragOver: (e: React.DragEvent) => void
    onDrop: (e: React.DragEvent) => void
    fileInputRef: React.RefObject<HTMLInputElement>
    onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void
    isProcessing: boolean
}

const DropZone = memo(function DropZone({
    file,
    dragActive,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDrop,
    fileInputRef,
    onFileSelect,
    isProcessing,
}: DropZoneProps) {
    const isPDF = file && isValidPDFFile(file)

    return (
        <div
            className={`relative bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm mb-6 transition-all ${dragActive ? 'border-2 border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-2 border-dashed border-gray-300 dark:border-gray-600'
                }`}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDragOver={onDragOver}
            onDrop={onDrop}
        >
            <input
                ref={fileInputRef}
                type="file"
                accept=".json,.csv,.txt,.pdf,image/jpeg,image/png,image/webp"
                onChange={onFileSelect}
                className="hidden"
                disabled={isProcessing}
            />

            <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isProcessing}
                className="w-full"
            >
                {isProcessing ? (
                    <div className="text-center py-8">
                        <Loader2 size={48} className="animate-spin mx-auto mb-4 text-primary-500" />
                        <p className="text-gray-600 dark:text-gray-400">Đang xử lý...</p>
                    </div>
                ) : file ? (
                    <div className="text-center py-4">
                        {isPDF ? (
                            <FileType size={48} className="mx-auto mb-4 text-red-500" />
                        ) : isValidImageFile(file) ? (
                            <ImageIcon size={48} className="mx-auto mb-4 text-blue-500" />
                        ) : (
                            <FileText size={48} className="mx-auto mb-4 text-primary-500" />
                        )}
                        <p className="font-medium text-lg">{file.name}</p>
                        <p className="text-sm text-gray-400 mt-1">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                fileInputRef.current?.click()
                            }}
                            className="mt-4 text-primary-500 hover:text-primary-600 text-sm flex items-center justify-center gap-1"
                        >
                            <RefreshCw size={14} />
                            Chọn file khác
                        </button>
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <Upload size={48} className="mx-auto mb-4 text-gray-400" />
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                            Kéo thả file vào đây hoặc nhấn để chọn
                        </p>
                        <p className="text-sm text-gray-400 mt-2">
                            Hỗ trợ JSON, CSV, TXT, PDF, Hình ảnh (có OCR)
                        </p>
                    </div>
                )}
            </button>
        </div>
    )
})

interface ProcessingProgressProps {
    stage: PDFProcessingProgress['stage'] | null
    current: number
    total: number
    message: string
    timeElapsed: number
}

const ProcessingProgress = memo(function ProcessingProgress({
    stage,
    current,
    total,
    message,
    timeElapsed,
}: ProcessingProgressProps) {
    const getStageIcon = () => {
        switch (stage) {
            case 'loading': return <Download size={18} className="text-blue-500" />
            case 'extracting': return <FileText size={18} className="text-green-500" />
            case 'ocr': return <FileType size={18} className="text-orange-500" />
            case 'parsing': return <Settings size={18} className="text-purple-500" />
            case 'validating': return <Check size={18} className="text-teal-500" />
            case 'complete': return <Check size={18} className="text-green-500" />
            default: return <Loader2 size={18} className="animate-spin text-gray-400" />
        }
    }

    const getProgressPercent = () => {
        if (stage === 'complete' || total === 0) return 100
        if (stage === 'ocr') return current
        return Math.round((current / total) * 100)
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    {getStageIcon()}
                    <span className="font-medium">{message}</span>
                </div>
                <span className="text-sm text-gray-400">{formatProcessingTime(timeElapsed)}</span>
            </div>

            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-2">
                <div
                    className={`${stage === 'complete' ? 'bg-green-500' : 'bg-primary-500'} h-3 rounded-full transition-all duration-300`}
                    style={{ width: `${getProgressPercent()}%` }}
                />
            </div>

            <div className="flex justify-between text-sm text-gray-400">
                <span>{stage === 'ocr' ? `${current}%` : `${current}/${total}`}</span>
                <span>{getProgressPercent()}%</span>
            </div>
        </div>
    )
})

interface OCRWarningModalProps {
    estimatedTime: number
    onProceed: () => void
    onCancel: () => void
}

const OCRWarningModal = memo(function OCRWarningModal({ estimatedTime, onProceed, onCancel }: OCRWarningModalProps) {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full shadow-2xl">
                <div className="flex items-center gap-3 mb-4">
                    <AlertCircle size={24} className="text-orange-500" />
                    <h3 className="text-lg font-bold">Cảnh báo OCR</h3>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-4">
                    File PDF này là bản scan, cần sử dụng OCR để trích xuất text.
                </p>

                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 mb-2">
                        <WifiOff size={16} />
                        <span className="font-medium">Cần tải dữ liệu ngôn ngữ (~20MB)</span>
                    </div>
                    <p className="text-sm text-orange-600 dark:text-orange-400">
                        Thời gian ước tính: {formatProcessingTime(estimatedTime)}
                    </p>
                </div>

                <div className="flex gap-3">
                    <Button variant="secondary" onClick={onCancel} className="flex-1">
                        Hủy
                    </Button>
                    <Button onClick={onProceed} className="flex-1">
                        Bắt đầu OCR
                    </Button>
                </div>
            </div>
        </div>
    )
})

interface PreviewSectionProps {
    words: ImportWord[]
    preview: ImportWord[]
    expanded: boolean
    onToggleExpand: () => void
    onUpdateWord: (index: number, word: ImportWord) => void
    onRemoveWord: (index: number) => void
}

const PreviewSection = memo(function PreviewSection({
    words,
    preview,
    expanded,
    onToggleExpand,
    onUpdateWord,
    onRemoveWord,
}: PreviewSectionProps) {
    const displayWords = expanded ? words : preview

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold">
                    Từ vựng trích xuất ({words.length} từ)
                </h2>
                {words.length > 10 && (
                    <button
                        onClick={onToggleExpand}
                        className="text-primary-500 hover:text-primary-600 text-sm flex items-center gap-1"
                    >
                        {expanded ? (
                            <>
                                <ChevronUp size={16} /> Thu gọn
                            </>
                        ) : (
                            <>
                                <ChevronDown size={16} /> Xem tất cả
                            </>
                        )}
                    </button>
                )}
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
                {displayWords.map((word, i) => (
                    <WordEditCard
                        key={i}
                        word={word}
                        index={i}
                        onUpdate={onUpdateWord}
                        onRemove={onRemoveWord}
                    />
                ))}
            </div>
        </div>
    )
})

interface WordEditCardProps {
    word: ImportWord
    index: number
    onUpdate: (index: number, word: ImportWord) => void
    onRemove: (index: number) => void
}

const WordEditCard = memo(function WordEditCard({ word, index, onUpdate, onRemove }: WordEditCardProps) {
    const [editing, setEditing] = useState(false)
    const [editedTerm, setEditedTerm] = useState(word.term)
    const [editedDefinition, setEditedDefinition] = useState(word.definition)

    const handleSave = () => {
        onUpdate(index, { ...word, term: editedTerm, definition: editedDefinition })
        setEditing(false)
    }

    return (
        <div className={`p-3 bg-gray-50 dark:bg-gray-700 rounded-lg ${editing ? 'ring-2 ring-primary-500' : ''}`}>
            {editing ? (
                <div className="space-y-2">
                    <input
                        type="text"
                        value={editedTerm}
                        onChange={(e) => setEditedTerm(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-600 dark:border-gray-500"
                        placeholder="Từ"
                    />
                    <textarea
                        value={editedDefinition}
                        onChange={(e) => setEditedDefinition(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-600 dark:border-gray-500"
                        placeholder="Nghĩa"
                        rows={2}
                    />
                    <div className="flex gap-2">
                        <Button size="sm" onClick={handleSave}>Lưu</Button>
                        <Button size="sm" variant="secondary" onClick={() => setEditing(false)}>Hủy</Button>
                    </div>
                </div>
            ) : (
                <div className="flex items-start gap-3">
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <span className="font-medium">{word.term}</span>
                            {word.phonetic && (
                                <span className="text-xs text-gray-400">[{word.phonetic}]</span>
                            )}
                        </div>
                        <span className="text-gray-600 dark:text-gray-400 text-sm">
                            {word.definition}
                        </span>
                    </div>
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => setEditing(true)}
                            className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                            title="Sửa"
                        >
                            <Settings size={14} />
                        </button>
                        <button
                            onClick={() => onRemove(index)}
                            className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500 rounded"
                            title="Xóa"
                        >
                            <X size={14} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
})

interface ErrorMessageProps {
    message: string
    onRetry?: () => void
    onClear?: () => void
}

const ErrorMessage = memo(function ErrorMessage({ message, onRetry, onClear }: ErrorMessageProps) {
    return (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
                <AlertCircle size={20} className="text-red-500 mt-0.5" />
                <div className="flex-1">
                    <p className="text-red-600 dark:text-red-400">{message}</p>
                    <div className="flex gap-2 mt-3">
                        {onRetry && (
                            <Button size="sm" variant="secondary" onClick={onRetry}>
                                <RefreshCw size={14} className="mr-1" />
                                Thử lại
                            </Button>
                        )}
                        {onClear && (
                            <Button size="sm" variant="ghost" onClick={onClear}>
                                Bỏ qua
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
})

interface DeckSelectionSectionProps {
    createNewDeck: boolean
    setCreateNewDeck: (value: boolean) => void
    deckName: string
    setDeckName: (value: string) => void
    selectedDeckId: number | null
    setSelectedDeckId: (value: number | null) => void
    decks: Deck[]
}

const DeckSelectionSection = memo(function DeckSelectionSection({
    createNewDeck,
    setCreateNewDeck,
    deckName,
    setDeckName,
    selectedDeckId,
    setSelectedDeckId,
    decks,
}: DeckSelectionSectionProps) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-6">
            <h2 className="font-semibold mb-4">Chọn bộ từ đích</h2>

            <div className="flex gap-4 mb-4">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        checked={createNewDeck}
                        onChange={() => setCreateNewDeck(true)}
                        className="w-4 h-4 text-primary-500"
                    />
                    <span>Tạo bộ từ mới</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        checked={!createNewDeck}
                        onChange={() => setCreateNewDeck(false)}
                        className="w-4 h-4 text-primary-500"
                    />
                    <span>Thêm vào bộ hiện có</span>
                </label>
            </div>

            {createNewDeck ? (
                <input
                    type="text"
                    value={deckName}
                    onChange={(e) => setDeckName(e.target.value)}
                    placeholder="Nhập tên bộ từ mới..."
                    className="w-full px-4 py-3 border rounded-xl dark:bg-gray-700 dark:border-gray-600"
                />
            ) : (
                <div className="space-y-2">
                    {decks.length === 0 ? (
                        <p className="text-gray-400 text-sm">Chưa có bộ từ nào. Hãy tạo bộ từ mới.</p>
                    ) : (
                        decks.map((deck) => (
                            <label
                                key={deck.id}
                                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${selectedDeckId === deck.id
                                    ? 'bg-primary-50 dark:bg-primary-900/20 border border-primary-500'
                                    : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="deck"
                                    checked={selectedDeckId === deck.id}
                                    onChange={() => setSelectedDeckId(deck.id)}
                                    className="w-4 h-4 text-primary-500"
                                />
                                <div className="flex-1">
                                    <span className="font-medium">{deck.name}</span>
                                    <span className="text-sm text-gray-400 ml-2">
                                        ({deck.word_count} từ)
                                    </span>
                                </div>
                            </label>
                        ))
                    )}
                </div>
            )}
        </div>
    )
})

interface ImportButtonProps {
    onClick: () => void
    disabled: boolean
    loading: boolean
    wordCount: number
}

const ImportButton = memo(function ImportButton({ onClick, disabled, loading, wordCount }: ImportButtonProps) {
    return (
        <Button
            onClick={onClick}
            disabled={disabled}
            className="w-full"
            size="lg"
        >
            {loading ? (
                <>
                    <Loader2 size={18} className="animate-spin mr-2" />
                    Đang import...
                </>
            ) : (
                <>
                    <Upload size={18} className="mr-2" />
                    Import {wordCount} từ
                </>
            )}
        </Button>
    )
})

interface FormatGuideProps {
    isPDF: boolean
    file: File | null
}

const FormatGuide = memo(function FormatGuide({ isPDF, file }: FormatGuideProps) {
    return (
        <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <h3 className="font-semibold mb-2">Định dạng file hỗ trợ:</h3>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                {!isPDF && (
                    <>
                        <p><strong>JSON:</strong> {`[{"term": "hello", "definition": "xin chào"}]`}</p>
                        <p><strong>CSV/TXT:</strong> hello,xin chào,Hello world!,/həˈloʊ/</p>
                        <p className="text-xs text-gray-400">Các cột: từ, nghĩa, ví dụ (tùy chọn), phiên âm (tùy chọn)</p>
                    </>
                )}
                {isPDF && (
                    <p className="text-primary-500">
                        <FileType size={16} className="inline mr-1" />
                        File PDF sẽ được xử lý tự động. Nếu là bản scan, OCR sẽ được kích hoạt.
                    </p>
                )}
                {!isPDF && file && isValidImageFile(file) && (
                    <p className="text-blue-500">
                        <ImageIcon size={16} className="inline mr-1" />
                        Hình ảnh sẽ được OCR để trích xuất từ vựng. Quy trình này có thể mất vài giây.
                    </p>
                )}
                {!file && (
                    <p className="text-gray-400 italic">
                        Mẹo: Bạn có thể chụp ảnh sách bài tập hoặc bảng từ vựng để import nhanh chóng.
                    </p>
                )}
            </div>
        </div>
    )
})
