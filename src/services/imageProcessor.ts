// ============================================
// Image Processor Service - OCR for Vocabulary Extraction
// ============================================

import type { ImportWord } from '@/store/deckStore'

// ============================================
// Types
// ============================================

export interface ImageProcessingOptions {
    ocrLanguage: 'eng' | 'vie' | 'eng+vie'
    minWordLength: number
    extractWordDefinitions: boolean
}

export interface ImageProcessingProgress {
    stage: 'loading' | 'ocr' | 'parsing' | 'complete'
    current: number
    total: number
    message: string
}

export interface ImageProcessingResult {
    success: boolean
    words: ImportWord[]
    extractedWords: number
    errors: string[]
    processingTime: number
}

// Default options
export const DEFAULT_IMAGE_OPTIONS: ImageProcessingOptions = {
    ocrLanguage: 'eng+vie',
    minWordLength: 2,
    extractWordDefinitions: true,
}

// ============================================
// Image Processor Class
// ============================================

export class ImageProcessor {
    private options: ImageProcessingOptions
    private onProgress: ((progress: ImageProcessingProgress) => void) | null = null

    constructor(options: Partial<ImageProcessingOptions> = {}) {
        this.options = { ...DEFAULT_IMAGE_OPTIONS, ...options }
    }

    /**
     * Set progress callback
     */
    setProgressCallback(callback: (progress: ImageProcessingProgress) => void): void {
        this.onProgress = callback
    }

    /**
     * Report progress
     */
    private reportProgress(stage: ImageProcessingProgress['stage'], current: number, total: number, message: string): void {
        if (this.onProgress) {
            this.onProgress({ stage, current, total, message })
        }
    }

    /**
     * Process Image file and extract vocabulary
     */
    async processImage(file: File): Promise<ImageProcessingResult> {
        const startTime = Date.now()
        const errors: string[] = []

        try {
            this.reportProgress('loading', 0, 1, 'Đang tải hình ảnh...')

            // Convert file to data URL
            const imageDataUrl = await this.fileToDataUrl(file)

            this.reportProgress('ocr', 0, 100, 'Đang nhận dạng chữ từ hình ảnh...')

            // Run OCR
            const Tesseract = await import('tesseract.js')
            const TesseractAny = Tesseract as any

            const worker = await TesseractAny.createWorker(this.options.ocrLanguage, 1, {
                logger: (m: any) => {
                    if (m.status === 'recognizing text') {
                        this.reportProgress('ocr', Math.round(m.progress * 100), 100, `Đang nhận dạng OCR: ${Math.round(m.progress * 100)}%`)
                    }
                }
            })

            const { data: { text } } = await worker.recognize(imageDataUrl)
            await worker.terminate()
            const result = text

            this.reportProgress('parsing', 0, 1, 'Đang phân tích từ vựng...')

            // Parse text into words
            const words = this.parseVocabulary(result)

            const processingTime = Date.now() - startTime
            this.reportProgress('complete', 1, 1, `Hoàn thành! Đã trích xuất ${words.length} từ.`)

            return {
                success: true,
                words,
                extractedWords: words.length,
                errors,
                processingTime,
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Lỗi không xác định'
            errors.push(errorMessage)

            return {
                success: false,
                words: [],
                extractedWords: 0,
                errors,
                processingTime: Date.now() - startTime,
            }
        }
    }

    /**
     * Convert File to Data URL
     */
    private fileToDataUrl(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => resolve(reader.result as string)
            reader.onerror = reject
            reader.readAsDataURL(file)
        })
    }

    /**
     * Parse extracted text into vocabulary
     */
    private parseVocabulary(text: string): ImportWord[] {
        // 1. Global Preprocessing
        // Normalize Unicode, remove control characters, fix common OCR global artifacts
        let normalizedText = text
            .normalize('NFC')
            .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '') // Remove non-printable chars
            .replace(/[|\[\]\(\)]+$/gm, '') // Remove table artifacts at end of lines
            .replace(/^[|\[\]\(\)]+/gm, '') // Remove table artifacts at start of lines

        const words: ImportWord[] = []
        const lines = normalizedText.split(/\n+/)

        for (const line of lines) {
            // 2. Line Preprocessing
            let cleanedLine = this.preProcessLine(line)
            if (!cleanedLine || cleanedLine.length < this.options.minWordLength) continue

            // 3. Multi-stage Parsing
            const parsed = this.intelligentParse(cleanedLine)
            if (parsed) {
                words.push(parsed)
            }
        }

        // De-duplicate and final polish
        return this.validateAndCleanWords(words)
    }

    /**
     * Deep cleaning of a single line from OCR
     */
    private preProcessLine(line: string): string {
        let cleaned = line.trim().normalize('NFC')

        // 1. Remove obvious OCR noise and table artifacts
        cleaned = cleaned
            .replace(/^[|\[\]I1l!{}®©]+/, '')
            .replace(/[|\[\]I1l!{}®©]+$/, '')
            .replace(/^\d+[\s./-]*\s*/, '') // Strip leading numbers
            .replace(/\s{2,}/g, '  ') // Normalize large gaps

        // 2. Fix fuzzy "be" prefix misreads (common in this dataset)
        // Matches: bs, ba, bo, be, b8, 16, etc. followed by a word
        cleaned = cleaned
            .replace(/^(?:b[saeio8q0]|1[be|]|l[be|])\s*([a-z]+)/i, 'be $1')
            .replace(/^(?:b[saeio8q0]|1[be|]|l[be|])([a-z]{3,})/i, 'be $1')

        // 3. Remove leading garbage like "TỦ ", "TÙ " (often misread numbers)
        cleaned = cleaned.replace(/^[A-ZÀ-Ỹ]{1,3}\s+(be\s)/i, '$1')

        // 4. Fix common internal OCR merging artifacts
        return cleaned
            .replace(/([a-zÀ-ÿ])\s*[|I1l]\s*([a-zÀ-ÿ])/gi, '$1 - $2')
            .replace(/\s*[-–—:;]{2,}\s*/g, ' - ')
    }

    /**
     * Intelligent parsing using multiple strategies
     */
    private intelligentParse(line: string): ImportWord | null {
        // Strategy 1: "be + word" + definition (The most common pattern)
        // Aggressive split after "be word"
        const beMatch = line.match(/^(be\s+[a-z]{3,}(?:\s+(?:sb|sth|over|into|out|in|on|up|away|after|before))?)\s+(.*)$/i)
        if (beMatch) {
            let term = beMatch[1]
            let def = beMatch[2]

            // If the term still has some Vietnamese chars leaked in, try to push them to definition
            const vnChars = /[àáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệđìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵ]/i
            const vnInTerm = term.search(vnChars)
            if (vnInTerm > 0) {
                const actualTerm = term.substring(0, vnInTerm).trim()
                const restTerm = term.substring(vnInTerm).trim()
                return this.createImportWord(actualTerm, restTerm + ' ' + def)
            }

            return this.createImportWord(term, def)
        }

        // Strategy 2: English text followed by Vietnamese (Bilingual boundary)
        const vnChars = /[àáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệđìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵ]/i
        const vnIndex = line.search(vnChars)
        if (vnIndex > 0) {
            // Find transition point: last space before first Vietnamese char
            const lastSpace = line.lastIndexOf(' ', vnIndex)
            if (lastSpace > 0) {
                return this.createImportWord(line.substring(0, lastSpace), line.substring(lastSpace))
            }
        }

        // Strategy 3: Explicit delimiters
        const explicitMatch = line.match(/^(.+?)\s*[-–—:;]\s*(.+)$/)
        if (explicitMatch && explicitMatch[1].length < 50) {
            return this.createImportWord(explicitMatch[1], explicitMatch[2])
        }

        // Strategy 4: Table columns (multiple spaces)
        const columns = line.split(/\s{2,}/)
        if (columns.length >= 2) {
            return this.createImportWord(columns[0], columns[1])
        }

        // Strategy 5: Reasonable length phrases
        if (line.length < 80 && line.includes(' ')) {
            const parts = line.split(/\s+/)
            if (parts.length >= 2) {
                return this.createImportWord(parts[0], parts.slice(1).join(' '))
            }
        }

        return null
    }

    private createImportWord(term: string, definition: string): ImportWord | null {
        // Deep cleanup for term
        const cleanTerm = term.trim()
            .replace(/^[|\[\]I1l\s!.,-]+/, '') // leading artifacts
            .replace(/[|\[\]I1l\s!.,-]+$/, '') // trailing artifacts
            .replace(/\s+/g, ' ') // normalize internal whitespace

        // Deep cleanup for definition
        const cleanDefinition = definition.trim()
            .replace(/^[|\[\]I1l\s!.,-]+/, '') // leading artifacts
            .replace(/[|\[\]I1l\s!.,-]+$/, '') // trailing artifacts

        if (cleanTerm.length < this.options.minWordLength || cleanTerm.length > 100) return null

        let phonetic = ''
        const phoneticMatch = cleanDefinition.match(/\[([^\]]+)\]/)
        if (phoneticMatch) {
            phonetic = phoneticMatch[1]
        }

        let finalDefinition = cleanDefinition.replace(/\[([^\]]+)\]/g, '').trim()

        return {
            term: cleanTerm,
            definition: finalDefinition || '...',
            phonetic: phonetic || undefined,
        }
    }

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
}

/**
 * Check if file is a valid Image
 */
export function isValidImageFile(file: File): boolean {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp']
    return validTypes.includes(file.type) ||
        /\.(jpg|jpeg|png|webp)$/i.test(file.name)
}
