// ============================================
// Web & Capacitor SQLite Database Polyfill (sql.js + IndexedDB)
// Enables full offline database capabilities on Android & Web
// ============================================

import initSqlJs, { Database as SqlJsDatabase } from 'sql.js'

const IDB_NAME = 'VocabMasterWebStorage'
const IDB_STORE = 'sqlite_db'
const IDB_KEY = 'sqlite_binary'

let dbInstance: SqlJsDatabase | null = null
let isInitialized = false

function openIndexedDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(IDB_NAME, 1)
    req.onupgradeneeded = () => {
      req.result.createObjectStore(IDB_STORE)
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

async function loadPersistedBinary(): Promise<Uint8Array | null> {
  try {
    const idb = await openIndexedDB()
    return new Promise((resolve) => {
      const tx = idb.transaction(IDB_STORE, 'readonly')
      const req = tx.objectStore(IDB_STORE).get(IDB_KEY)
      req.onsuccess = () => resolve(req.result || null)
      req.onerror = () => resolve(null)
    })
  } catch (e) {
    console.warn('[WebDB] Could not read IndexedDB:', e)
    return null
  }
}

async function persistDatabase(): Promise<void> {
  if (!dbInstance) return
  try {
    const binary = dbInstance.export()
    const idb = await openIndexedDB()
    const tx = idb.transaction(IDB_STORE, 'readwrite')
    tx.objectStore(IDB_STORE).put(binary, IDB_KEY)
  } catch (e) {
    console.error('[WebDB] Failed to persist SQLite binary:', e)
  }
}

function escapeValue(val: unknown): string {
  if (val === null || val === undefined) return 'NULL'
  if (typeof val === 'number') return String(val)
  return "'" + String(val).replace(/'/g, "''") + "'"
}

function buildSql(sql: string, params: unknown[]): string {
  let i = 0
  return sql.replace(/\?/g, () => escapeValue(params[i++]))
}

function runInitialMigrations(db: SqlJsDatabase) {
  db.run(`
    CREATE TABLE IF NOT EXISTS decks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      description TEXT,
      color TEXT,
      icon TEXT,
      word_count INTEGER DEFAULT 0,
      created_at TEXT,
      updated_at TEXT
    )
  `)

  db.run(`
    CREATE TABLE IF NOT EXISTS words (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      deck_id INTEGER,
      term TEXT,
      definition TEXT,
      example TEXT,
      phonetic TEXT,
      image_url TEXT,
      synonyms TEXT,
      antonyms TEXT,
      word_family TEXT,
      created_at TEXT
    )
  `)

  db.run(`
    CREATE TABLE IF NOT EXISTS progress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      word_id INTEGER UNIQUE,
      ease_factor REAL DEFAULT 2.5,
      interval INTEGER DEFAULT 0,
      repetitions INTEGER DEFAULT 0,
      next_review TEXT,
      status TEXT DEFAULT 'new',
      last_reviewed TEXT,
      leitner_box INTEGER DEFAULT 1,
      correct_streak INTEGER DEFAULT 0,
      wrong_count INTEGER DEFAULT 0,
      total_reviews INTEGER DEFAULT 0,
      avg_response_time INTEGER DEFAULT 0
    )
  `)

  db.run(`
    CREATE TABLE IF NOT EXISTS stats (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT UNIQUE,
      words_learned INTEGER DEFAULT 0,
      words_reviewed INTEGER DEFAULT 0,
      correct_count INTEGER DEFAULT 0,
      time_spent INTEGER DEFAULT 0,
      xp_earned INTEGER DEFAULT 0,
      quiz_score INTEGER DEFAULT 0,
      typing_score INTEGER DEFAULT 0,
      streak_maintained INTEGER DEFAULT 0
    )
  `)

  db.run(`CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT)`)

  db.run(`
    CREATE TABLE IF NOT EXISTS achievements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      description TEXT,
      icon TEXT,
      xp_reward INTEGER DEFAULT 0,
      unlocked_at TEXT,
      progress INTEGER DEFAULT 0,
      target INTEGER DEFAULT 1
    )
  `)

  db.run(`
    CREATE TABLE IF NOT EXISTS study_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      started_at TEXT,
      ended_at TEXT,
      mode TEXT,
      words_studied INTEGER DEFAULT 0,
      correct_count INTEGER DEFAULT 0,
      xp_earned INTEGER DEFAULT 0
    )
  `)

  db.run(`
    CREATE TABLE IF NOT EXISTS reminders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      time TEXT,
      enabled INTEGER DEFAULT 1,
      days TEXT DEFAULT '1,2,3,4,5,6,0'
    )
  `)

  // Default settings
  const defaults = [
    ['theme', 'system'],
    ['daily_goal', '20'],
    ['streak', '0'],
    ['total_xp', '0'],
    ['level', '1'],
    ['reminder_enabled', 'true'],
    ['reminder_time', '09:00'],
    ['sound_enabled', 'true'],
    ['mini_mode_opacity', '0.95'],
  ]

  for (const [key, value] of defaults) {
    db.run(`INSERT OR IGNORE INTO settings (key, value) VALUES ('${key}', '${value}')`)
  }

  // Default achievements
  const achievements = [
    ['first_word', 'Khởi đầu', 'Học từ đầu tiên', '🌱', 10, 1],
    ['words_10', 'Người học chăm chỉ', 'Học 10 từ', '📚', 25, 10],
    ['words_50', 'Nhà ngôn ngữ', 'Học 50 từ', '🎓', 50, 50],
    ['words_100', 'Bậc thầy từ vựng', 'Học 100 từ', '👑', 100, 100],
    ['words_500', 'Huyền thoại', 'Học 500 từ', '🏆', 500, 500],
    ['streak_3', 'Kiên trì', '3 ngày streak', '🔥', 30, 3],
    ['streak_7', 'Tuần lễ vàng', '7 ngày streak', '⭐', 70, 7],
    ['streak_30', 'Tháng hoàn hảo', '30 ngày streak', '💎', 300, 30],
    ['perfect_quiz', 'Hoàn hảo', 'Quiz 100% đúng', '🎯', 50, 1],
    ['speed_demon', 'Tốc độ', 'Trả lời dưới 3 giây', '⚡', 25, 1],
    ['night_owl', 'Cú đêm', 'Học sau 22h', '🦉', 15, 1],
    ['early_bird', 'Chim sớm', 'Học trước 7h', '🐦', 15, 1],
    ['mastered_10', 'Thành thạo', 'Thuộc 10 từ', '✅', 50, 10],
    ['mastered_50', 'Chuyên gia', 'Thuộc 50 từ', '🌟', 150, 50],
  ]

  for (const [type, name, desc, icon, xp, target] of achievements) {
    db.run(`
      INSERT OR IGNORE INTO achievements (type, name, description, icon, xp_reward, target)
      VALUES ('${type}', '${name}', '${desc}', '${icon}', ${xp}, ${target})
    `)
  }
}

export async function initWebDatabase(): Promise<void> {
  if (isInitialized) return
  if (
    typeof window !== 'undefined' &&
    (window as unknown as { electronAPI?: unknown }).electronAPI
  ) {
    console.log('[WebDB] Electron detected, skipping web SQLite polyfill.')
    isInitialized = true
    return
  }

  console.log('[WebDB] Initializing in-browser SQLite with sql.js + IndexedDB...')

  try {
    const SQL = await initSqlJs({
      locateFile: (file) => {
        return `./${file}`
      },
    })

    const existingBinary = await loadPersistedBinary()
    if (existingBinary && existingBinary.length > 0) {
      console.log('[WebDB] Restoring existing database from IndexedDB')
      dbInstance = new SQL.Database(existingBinary)
    } else {
      console.log('[WebDB] Creating fresh SQLite database instance')
      dbInstance = new SQL.Database()
      runInitialMigrations(dbInstance)
      await persistDatabase()
    }

    // Bind window.electronAPI polyfill
    const polyfillAPI = {
      minimize: async () => {},
      maximize: async () => {},
      close: async () => {},

      getTheme: async () => {
        return localStorage.getItem('theme') || 'system'
      },
      setTheme: async (theme: string) => {
        localStorage.setItem('theme', theme)
        if (
          theme === 'dark' ||
          (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
        ) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      },

      dbQuery: async <T = unknown>(sql: string, params?: unknown[]): Promise<T[]> => {
        if (!dbInstance) return []
        try {
          const finalSql = params?.length ? buildSql(sql, params) : sql
          const result = dbInstance.exec(finalSql)
          if (!result.length) return []
          const { columns, values } = result[0]
          return values.map((row) => {
            const obj: Record<string, unknown> = {}
            columns.forEach((col, i) => (obj[col] = row[i]))
            return obj as T
          })
        } catch (e) {
          console.error('[WebDB] query error:', e, sql)
          return []
        }
      },

      dbGet: async <T = unknown>(sql: string, params?: unknown[]): Promise<T | null> => {
        if (!dbInstance) return null
        try {
          const finalSql = params?.length ? buildSql(sql, params) : sql
          const result = dbInstance.exec(finalSql)
          if (!result.length || !result[0].values.length) return null
          const { columns, values } = result[0]
          const obj: Record<string, unknown> = {}
          columns.forEach((col, i) => (obj[col] = values[0][i]))
          return obj as T
        } catch (e) {
          console.error('[WebDB] get error:', e, sql)
          return null
        }
      },

      dbRun: async (
        sql: string,
        params?: unknown[],
      ): Promise<{ lastId: number; changes: number }> => {
        if (!dbInstance) return { lastId: 0, changes: 0 }
        try {
          const finalSql = params?.length ? buildSql(sql, params) : sql
          dbInstance.run(finalSql)
          const changes = dbInstance.getRowsModified()
          const res = dbInstance.exec('SELECT last_insert_rowid() as id')
          const lastId = Number(res[0]?.values[0]?.[0] || 0)
          await persistDatabase()
          return { lastId, changes }
        } catch (e) {
          console.error('[WebDB] run error:', e, sql)
          return { lastId: 0, changes: 0 }
        }
      },

      dbBatch: async (operations: Array<{ sql: string; params: unknown[] }>) => {
        if (!dbInstance) return { success: false, lastId: 0, changes: 0 }
        try {
          dbInstance.run('BEGIN TRANSACTION')
          let totalChanges = 0
          for (const op of operations) {
            const finalSql = op.params?.length ? buildSql(op.sql, op.params) : op.sql
            dbInstance.run(finalSql)
            totalChanges += dbInstance.getRowsModified()
          }
          const res = dbInstance.exec('SELECT last_insert_rowid() as id')
          const lastId = Number(res[0]?.values[0]?.[0] || 0)
          dbInstance.run('COMMIT')
          await persistDatabase()
          return { success: true, lastId, changes: totalChanges }
        } catch (e) {
          try {
            dbInstance.run('ROLLBACK')
          } catch {
            // ignore
          }
          console.error('[WebDB] batch error:', e)
          return { success: false, lastId: 0, changes: 0 }
        }
      },

      dbExec: async (sql: string) => {
        if (!dbInstance) return { success: false, error: 'DB not ready' }
        try {
          dbInstance.run(sql)
          await persistDatabase()
          return { success: true }
        } catch (e) {
          return { success: false, error: String(e) }
        }
      },

      dbImportVocabulary: async (
        deckId: number,
        words: Array<{ term: string; definition: string; example?: string; phonetic?: string }>,
      ) => {
        if (!dbInstance) return { success: false, count: 0 }
        try {
          dbInstance.run('BEGIN TRANSACTION')
          let insertedCount = 0
          for (const w of words) {
            const wordSql = `INSERT INTO words (deck_id, term, definition, example, phonetic) VALUES (?, ?, ?, ?, ?)`
            const finalWordSql = buildSql(wordSql, [
              deckId,
              w.term,
              w.definition,
              w.example || '',
              w.phonetic || '',
            ])
            dbInstance.run(finalWordSql)

            const res = dbInstance.exec('SELECT last_insert_rowid() as id')
            const wordId = Number(res[0]?.values[0]?.[0] || 0)
            if (wordId > 0) {
              const progressSql = `INSERT OR IGNORE INTO progress (word_id, status) VALUES (?, 'new')`
              dbInstance.run(buildSql(progressSql, [wordId]))
              insertedCount++
            }
          }

          const updateDeckSql = `UPDATE decks SET word_count = word_count + ? WHERE id = ?`
          dbInstance.run(buildSql(updateDeckSql, [insertedCount, deckId]))
          dbInstance.run('COMMIT')
          await persistDatabase()
          return { success: true, count: insertedCount }
        } catch (e) {
          try {
            dbInstance.run('ROLLBACK')
          } catch {
            // ignore
          }
          console.error('[WebDB] bulk import error:', e)
          return { success: false, count: 0, error: String(e) }
        }
      },

      openMiniMode: async () => {},
      closeMiniMode: async () => {},
      showNotification: async (title: string, body: string) => {
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification(title, { body })
        }
      },
      setReminder: async () => {},
      fetchYouTubeTranscript: async () => [],
    }

    ;(window as unknown as { electronAPI: typeof polyfillAPI }).electronAPI = polyfillAPI
    isInitialized = true
    console.log('[WebDB] SQLite polyfill active and ready!')
  } catch (err) {
    console.error('[WebDB] Failed to initialize sql.js:', err)
  }
}
