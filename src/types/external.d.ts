// ============================================
// Type Declarations for External Libraries
// ============================================

declare module 'pdfjs-dist' {
    export interface GlobalWorkerOptions {
        workerSrc: string
    }

    export interface PDFDocumentProxy {
        numPages: number
        getPage(pageNumber: number): Promise<PDFPageProxy>
    }

    export interface PDFPageProxy {
        getTextContent(): Promise<TextContent>
        getViewport(options: { scale: number }): Viewport
        render(options: { canvasContext: CanvasRenderingContext2D; viewport: Viewport }): Promise<void>
    }

    export interface TextContent {
        items: TextItem[]
    }

    export interface TextItem {
        str: string
    }

    export interface Viewport {
        width: number
        height: number
    }

    export interface GetDocumentParams {
        data: ArrayBuffer | Uint8Array
        cMapUrl?: string
        cMapPacked?: boolean
    }

    export interface LoadingTask<T> {
        promise: Promise<T>
        cancel(reason?: Error): void
    }

    export function getDocument(params: GetDocumentParams): LoadingTask<PDFDocumentProxy>
    export const version: string
}

declare module 'tesseract.js' {
    export interface RecognizeResult {
        data: {
            text: string
            confidence: number
            words: OCRWord[]
            paragraphs: OCRParagraph[]
        }
    }

    export interface OCRWord {
        text: string
        confidence: number
        bbox: BBox
    }

    export interface OCRParagraph {
        text: string
        confidence: number
    }

    export interface BBox {
        x0: number
        y0: number
        x1: number
        y1: number
    }

    export interface LoggerMessage {
        status: string
        progress: number
    }

    export default function recognize(
        image: string | HTMLImageElement | HTMLCanvasElement,
        lang?: string,
        options?: {
            logger?: (m: LoggerMessage) => void
        }
    ): Promise<RecognizeResult>
}
