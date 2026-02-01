// ============================================
// Logger Module for Electron Main Process
// ============================================

import { app } from 'electron'
import path from 'path'
import fs from 'fs'

// Log file path - lazy initialization
let LOG_PATH: string | null = null

function getLogPathInternal(): string {
    if (!LOG_PATH) {
        LOG_PATH = path.join(app.getPath('userData'), 'app.log')
    }
    return LOG_PATH
}

// Initialize log file (only after app is ready)
function initLogFile(): void {
    try {
        const logPath = getLogPathInternal()
        fs.writeFileSync(logPath, `--- Application Started at ${new Date().toISOString()} ---\n`)
    } catch (e) {
        console.error('Failed to init log file', e)
    }
}

// Export initialization function to be called from main.ts
let initialized = false
export function initLogger(): void {
    if (!initialized) {
        initialized = true
        initLogFile()
    }
}

/**
 * Log info message
 */
export function log(message: string, ...args: unknown[]): void {
    const formattedArgs = args.map((a) => JSON.stringify(a)).join(' ')
    const msg = `[INFO] ${message} ${formattedArgs}\n`

    console.log(message, ...args)

    try {
        fs.appendFileSync(getLogPathInternal(), msg)
    } catch {
        // Ignore write errors
    }
}

/**
 * Log error message
 */
export function logError(message: string, error?: unknown): void {
    const errStr = error instanceof Error ? error.stack : JSON.stringify(error)
    const msg = `[ERROR] ${message} ${errStr}\n`

    console.error(message, error)

    try {
        fs.appendFileSync(getLogPathInternal(), msg)
    } catch {
        // Ignore write errors
    }
}

/**
 * Get log file path
 */
export function getLogPath(): string {
    return getLogPathInternal()
}
