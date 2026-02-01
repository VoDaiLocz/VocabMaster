// ============================================
// PDF Processor Service with OCR Support
// ============================================

import type { ImportWord } from '@/store/deckStore'

// ============================================
// Types
// ============================================

export interface PDFProcessingOptions {
    enableOCR: boolean
    ocrLanguage: 'eng' | 'vie' | 'eng+vie'
    extractWordDefinitions: boolean
    minWordLength: number
    maxDefinitionsPerWord: number
}

export interface PDFProcessingProgress {
    stage: 'loading' | 'extracting' | 'ocr' | 'parsing' | 'validating' | 'complete'
    current: number
    total: number
    message: string
}

export interface PDFProcessingResult {
    success: boolean
    words: ImportWord[]
    totalPages: number
    extractedWords: number
    errors: string[]
    processingTime: number
}

export interface PDFDocumentInfo {
    title: string
    author: string
    pageCount: number
    isEncrypted: boolean
    isScanned: boolean
}

// Default options
export const DEFAULT_PDF_OPTIONS: PDFProcessingOptions = {
    enableOCR: true,
    ocrLanguage: 'eng',
    extractWordDefinitions: true,
    minWordLength: 2,
    maxDefinitionsPerWord: 3,
}

// ============================================
// PDF Processor Class
// ============================================

export class PDFProcessor {
    private options: PDFProcessingOptions
    private onProgress: ((progress: PDFProcessingProgress) => void) | null = null

    constructor(options: Partial<PDFProcessingOptions> = {}) {
        this.options = { ...DEFAULT_PDF_OPTIONS, ...options }
    }

    /**
     * Set progress callback
     */
    setProgressCallback(callback: (progress: PDFProcessingProgress) => void): void {
        this.onProgress = callback
    }

    /**
     * Report progress to callback
     */
    private reportProgress(stage: PDFProcessingProgress['stage'], current: number, total: number, message: string): void {
        if (this.onProgress) {
            this.onProgress({ stage, current, total, message })
        }
    }

    /**
     * Process PDF file and extract vocabulary
     */
    async processPDF(file: File): Promise<PDFProcessingResult> {
        const startTime = Date.now()
        const errors: string[] = []

        try {
            // Report loading stage
            this.reportProgress('loading', 0, 1, 'Đang tải file PDF...')

            // Check file size (max 50MB)
            const MAX_FILE_SIZE = 50 * 1024 * 1024
            if (file.size > MAX_FILE_SIZE) {
                throw new Error(`File quá lớn. Kích thước tối đa là 50MB.`)
            }

            // Read file as ArrayBuffer
            const arrayBuffer = await file.arrayBuffer()

            // Check if PDF is encrypted
            const isEncrypted = this.isPDFEncrypted(arrayBuffer)
            if (isEncrypted) {
                throw new Error('File PDF được bảo vệ bằng mật khẩu. Vui lòng loại bỏ mật khẩu trước khi import.')
            }

            // Get page count using pdf.js
            this.reportProgress('loading', 1, 1, 'Đang phân tích cấu trúc PDF...')
            const pageCount = await this.getPageCount(arrayBuffer)

            // Determine if PDF is scanned (no text layer)
            const isScanned = await this.isPDFScanned(arrayBuffer)

            // Extract text/OCR from all pages
            const extractedTexts: string[] = []

            for (let i = 1; i <= pageCount; i++) {
                this.reportProgress(isScanned ? 'ocr' : 'extracting', i, pageCount,
                    `Đang xử lý trang ${i}/${pageCount}...`)

                try {
                    const text = await this.extractPageText(arrayBuffer, i, isScanned)
                    if (text && text.trim().length > 0) {
                        extractedTexts.push(text)
                    }
                } catch (err) {
                    errors.push(`Lỗi khi xử lý trang ${i}: ${err}`)
                }
            }

            // Parse extracted text into vocabulary
            this.reportProgress('parsing', 0, 1, 'Đang phân tích từ vựng...')
            const words = await this.parseVocabulary(extractedTexts)

            // Validate and clean words
            this.reportProgress('validating', 0, 1, 'Đang kiểm tra dữ liệu...')
            const validWords = this.validateAndCleanWords(words)

            const processingTime = Date.now() - startTime

            this.reportProgress('complete', 1, 1, `Hoàn thành! Đã trích xuất ${validWords.length} từ.`)

            return {
                success: true,
                words: validWords,
                totalPages: pageCount,
                extractedWords: validWords.length,
                errors,
                processingTime,
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Lỗi không xác định'
            errors.push(errorMessage)

            return {
                success: false,
                words: [],
                totalPages: 0,
                extractedWords: 0,
                errors,
                processingTime: Date.now() - startTime,
            }
        }
    }

    /**
     * Check if PDF is encrypted
     */
    private isPDFEncrypted(arrayBuffer: ArrayBuffer): boolean {
        const bytes = new Uint8Array(arrayBuffer)
        const header = new TextDecoder('latin1').decode(bytes.slice(0, 8))

        // Check for encrypted PDF marker
        if (header.includes('Encrypt')) {
            return true
        }

        // Check for password protection indicators
        const fullText = new TextDecoder('latin1').decode(bytes.slice(0, 1000))
        return fullText.includes('/Encrypt') || fullText.includes('/RC4') || fullText.includes('/AES')
    }

    /**
     * Get page count from PDF
     */
    private async getPageCount(arrayBuffer: ArrayBuffer): Promise<number> {
        // Use dynamic import for pdf.js to avoid SSR issues
        const pdfjsLib = await import('pdfjs-dist')

        // Set worker source
        const workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ; (pdfjsLib as any).GlobalWorkerOptions.workerSrc = workerSrc

        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
        return pdf.numPages
    }

    /**
     * Check if PDF is scanned (no text layer)
     */
    private async isPDFScanned(arrayBuffer: ArrayBuffer): Promise<boolean> {
        const pdfjsLib = await import('pdfjs-dist')

        const workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ; (pdfjsLib as any).GlobalWorkerOptions.workerSrc = workerSrc

        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise

        // Check first few pages for text content
        const samplePages = Math.min(3, pdf.numPages)
        let totalTextItems = 0

        for (let i = 1; i <= samplePages; i++) {
            const page = await pdf.getPage(i)
            const textContent = await page.getTextContent()
            totalTextItems += textContent.items.length
        }

        // If very few text items, likely scanned
        return totalTextItems < 50
    }

    /**
     * Extract text from a single page
     */
    private async extractPageText(arrayBuffer: ArrayBuffer, pageNumber: number, isScanned: boolean): Promise<string> {
        if (isScanned) {
            return this.extractTextWithOCR(arrayBuffer, pageNumber)
        } else {
            return this.extractTextDirectly(arrayBuffer, pageNumber)
        }
    }

    /**
     * Extract text directly from PDF (for text-based PDFs)
     */
    private async extractTextDirectly(arrayBuffer: ArrayBuffer, pageNumber: number): Promise<string> {
        const pdfjsLib = await import('pdfjs-dist')

        const workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ; (pdfjsLib as any).GlobalWorkerOptions.workerSrc = workerSrc

        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
        const page = await pdf.getPage(pageNumber)
        const textContent = await page.getTextContent()

        // Join text items with spaces
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const texts = (textContent.items as any[])
            .map((item: { str: string }) => item.str)
            .filter((str: string) => str.trim().length > 0)

        return texts.join(' ')
    }

    /**
     * Extract text using OCR (for scanned PDFs)
     */
    private async extractTextWithOCR(arrayBuffer: ArrayBuffer, pageNumber: number): Promise<string> {
        // Dynamic import tesseract.js
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const Tesseract = await import('tesseract.js')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const TesseractAny = Tesseract as any

        // Convert page to image using canvas
        const canvas = await this.renderPageToCanvas(arrayBuffer, pageNumber)
        const imageDataUrl = canvas.toDataURL('image/png')

        // Run OCR
        const result = await TesseractAny.recognize(imageDataUrl, this.options.ocrLanguage, {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            logger: (m: any) => {
                if (m.status === 'recognizing text') {
                    this.reportProgress('ocr', pageNumber, 100,
                        `Đang nhận dạng OCR: ${Math.round(m.progress * 100)}%`)
                }
            }
        })

        return result.data.text
    }

    /**
     * Render PDF page to canvas for OCR
     */
    private async renderPageToCanvas(arrayBuffer: ArrayBuffer, pageNumber: number): Promise<HTMLCanvasElement> {
        const pdfjsLib = await import('pdfjs-dist')

        const workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ; (pdfjsLib as any).GlobalWorkerOptions.workerSrc = workerSrc

        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
        const page = await pdf.getPage(pageNumber)

        const viewport = page.getViewport({ scale: 2.0 }) // Higher scale for better OCR
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')

        if (!context) {
            throw new Error('Could not get canvas context')
        }

        canvas.width = viewport.width
        canvas.height = viewport.height

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const renderTask = (page.render as any)({
            canvasContext: context,
            viewport,
        })
        await renderTask.promise

        return canvas
    }

    /**
     * Parse extracted text into vocabulary items
     */
    private async parseVocabulary(texts: string[]): Promise<ImportWord[]> {
        const words: ImportWord[] = []

        // Combine all texts
        const fullText = texts.join('\n\n')

        // Split into potential word-definition pairs
        // Common patterns: "word - definition", "word: definition", "word definition"
        const lines = fullText.split(/\n+/)

        for (const line of lines) {
            const cleanedLine = line.trim()
            if (!cleanedLine || cleanedLine.length < this.options.minWordLength) continue

            // Try different parsing patterns
            const parsed = this.parseLine(cleanedLine)
            if (parsed) {
                words.push(parsed)
            }
        }

        return words
    }

    /**
     * Parse a single line into word-definition pair
     */
    private parseLine(line: string): ImportWord | null {
        // Pattern 1: "word - definition"
        let match = line.match(/^([A-Za-zÀ-ÿ\s'-]+)\s*[-–—:]\s*(.+)$/)
        if (match) {
            return this.createImportWord(match[1].trim(), match[2].trim())
        }

        // Pattern 2: "word: definition"
        match = line.match(/^([A-Za-zÀ-ÿ\s'-]+)\s*[:]\s*(.+)$/)
        if (match) {
            return this.createImportWord(match[1].trim(), match[2].trim())
        }

        // Pattern 3: "word definition" (space-separated, more complex)
        // Only match if first "word" is single and likely a valid word
        const parts = line.split(/\s{2,}/)
        if (parts.length >= 2) {
            const firstPart = parts[0].trim()
            const definition = parts.slice(1).join(' ').trim()

            // Check if first part looks like a word (not too long, no special chars except hyphens)
            if (firstPart.length < 50 && /^[A-Za-zÀ-ÿ'-]+$/.test(firstPart)) {
                return this.createImportWord(firstPart, definition)
            }
        }

        // Pattern 4: "word (phonetic) - definition"
        match = line.match(/^([A-Za-zÀ-ÿ'-]+)\s*\([^)]+\)\s*[-–—:]\s*(.+)$/)
        if (match) {
            return this.createImportWord(match[1].trim(), match[2].trim())
        }

        return null
    }

    /**
     * Create ImportWord object with validation
     */
    private createImportWord(term: string, definition: string): ImportWord | null {
        // Clean up term
        const cleanTerm = term.trim()
        const cleanDefinition = definition.trim()

        // Validate
        if (cleanTerm.length < this.options.minWordLength) return null
        if (cleanTerm.length > 100) return null // Too long, likely not a word
        if (!/^[A-Za-zÀ-ÿ'-]+$/.test(cleanTerm)) return null // Contains invalid characters
        if (cleanDefinition.length < 2) return null
        if (cleanDefinition.length > 1000) return null // Too long

        // Extract phonetic if present in brackets
        let phonetic = ''
        const phoneticMatch = cleanDefinition.match(/\[([^\]]+)\]/)
        if (phoneticMatch) {
            phonetic = phoneticMatch[1]
        }

        // Clean definition (remove phonetic from text)
        let finalDefinition = cleanDefinition.replace(/\[([^\]]+)\]/g, '').trim()

        return {
            term: cleanTerm,
            definition: finalDefinition,
            phonetic: phonetic || undefined,
        }
    }

    /**
     * Validate and remove duplicates
     */
    private validateAndCleanWords(words: ImportWord[]): ImportWord[] {
        const seen = new Map<string, ImportWord>()
        const result: ImportWord[] = []

        for (const word of words) {
            const key = word.term.toLowerCase()

            if (!seen.has(key)) {
                seen.set(key, word)
                result.push(word)
            }
        }

        return result
    }

    /**
     * Get PDF document info
     */
    async getPDFInfo(file: File): Promise<PDFDocumentInfo> {
        const arrayBuffer = await file.arrayBuffer()

        return {
            title: file.name,
            author: 'Unknown',
            pageCount: await this.getPageCount(arrayBuffer),
            isEncrypted: this.isPDFEncrypted(arrayBuffer),
            isScanned: await this.isPDFScanned(arrayBuffer),
        }
    }

    /**
     * Public method to get page count
     */
    async getPageCountPublic(arrayBuffer: ArrayBuffer): Promise<number> {
        return this.getPageCount(arrayBuffer)
    }

    /**
     * Public method to check if PDF is scanned
     */
    async isPDFScannedPublic(arrayBuffer: ArrayBuffer): Promise<boolean> {
        return this.isPDFScanned(arrayBuffer)
    }
}

// ============================================
// Utility Functions
// ============================================

/**
 * Check if file is a valid PDF
 */
export function isValidPDFFile(file: File): boolean {
    const validTypes = ['application/pdf']
    const validExtensions = ['.pdf']

    return validTypes.includes(file.type) ||
        validExtensions.some(ext => file.name.toLowerCase().endsWith(ext))
}

/**
 * Format processing time for display
 */
export function formatProcessingTime(ms: number): string {
    if (ms < 1000) return `${ms}ms`
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`
    return `${Math.floor(ms / 60000)}m ${Math.floor((ms % 60000) / 1000)}s`
}

/**
 * Estimate OCR time based on page count
 */
export function estimateOCRTime(pageCount: number, isScanned: boolean): number {
    if (!isScanned) return pageCount * 100 // 100ms per text-based page
    return pageCount * 5000 // ~5s per scanned page (OCR is slow)
}
