// ============================================
// Library Page - Vocabulary Packs & Google Drive Master Library
// Tích hợp 141 tài liệu gốc từ 3 Sheet (ETS 2017-2026, TOEIC, Tiếng Anh cơ bản & chuyên ngành)
// ============================================

import { useState, useCallback, useMemo, memo } from 'react'
import { Link } from 'react-router-dom'
import { Download, Check, Loader2, Upload, ExternalLink, Search, FolderOpen, Sparkles } from 'lucide-react'
import { Button } from '@/components/common/Button'
import { useDeckStore } from '@/store/deckStore'
import { getAllVocabularyDecks, getTotalWordCount, VocabDeck } from '@/data'
import { LIBRARY_FILTERS } from '@/constants'
import toeicDocsRaw from '@/data/tai_lieu_toeic.json'
import basicDocsRaw from '@/data/tieng_anh_co_ban.json'
import examSeriesRaw from '@/data/toeic_exam_series.json'

type FilterType = (typeof LIBRARY_FILTERS)[number]

interface UnifiedDocItem {
  id: string
  title: string
  category: 'ets' | 'toeic' | 'basic' | 'specialized' | 'ipa' | 'vstep'
  categoryLabel: string
  badgeColor: string
  driveUrl: string
}

export function Library() {
  const [mainTab, setMainTab] = useState<'flashcards' | 'driveDocs'>('flashcards')

  // --- Flashcard Store State ---
  const { createDeck, importWords, fetchDecks } = useDeckStore()
  const [importing, setImporting] = useState<string | null>(null)
  const [imported, setImported] = useState<Record<string, number>>({})
  const [error, setError] = useState('')
  const [filter, setFilter] = useState<FilterType>('ALL')
  const [importProgress, setImportProgress] = useState<{ current: number; total: number } | null>(null)

  const decks = getAllVocabularyDecks()
  const totalWords = getTotalWordCount()

  const filteredDecks = decks.filter((d) => {
    if (filter === 'ALL') return true
    if (filter === 'TOEIC') return d.name.includes('TOEIC')
    if (filter === 'IELTS') return d.name.includes('IELTS') || d.name.includes('Academic')
    if (filter === 'OTHER') return !d.name.includes('TOEIC') && !d.name.includes('IELTS')
    return true
  })

  const handleImport = useCallback(
    async (deck: VocabDeck) => {
      if (importing) return
      setImporting(deck.name)
      setImportProgress(null)
      setError('')

      try {
        const deckId = await createDeck(deck.name, deck.description, deck.color, deck.icon)
        if (!deckId || deckId <= 0) throw new Error('Failed to create deck')

        const count = await importWords(deckId, deck.words, (progress) => {
          setImportProgress(progress)
        })

        setImported((prev) => ({ ...prev, [deck.name]: count }))
        setImportProgress({ current: deck.words.length, total: deck.words.length })
        await fetchDecks()
      } catch (e: unknown) {
        console.error('Import error:', e)
        setError(e instanceof Error ? e.message : 'Import failed')
      }

      setImporting(null)
      setImportProgress(null)
    },
    [importing, createDeck, importWords, fetchDecks],
  )

  // --- Google Drive Docs State (141 Items) ---
  const [docCategoryFilter, setDocCategoryFilter] = useState<string>('all')
  const [docSearch, setDocSearch] = useState<string>('')

  const allDriveDocs: UnifiedDocItem[] = useMemo(() => {
    const list: UnifiedDocItem[] = []

    // 1. Bộ Đề ETS (Sheet 3)
    examSeriesRaw.forEach((s) => {
      list.push({
        id: `ets-${s.id}`,
        title: `${s.title} (${s.totalTests} Đề Full Test)`,
        category: 'ets',
        categoryLabel: 'Đề Thi ETS',
        badgeColor: 'bg-indigo-600',
        driveUrl: s.driveUrl
      })
    })

    // 2. Giáo Trình TOEIC (Sheet 1)
    toeicDocsRaw.forEach((d) => {
      list.push({
        id: `toeic-${d.id}`,
        title: d.title,
        category: 'toeic',
        categoryLabel: 'Sách & Đề TOEIC',
        badgeColor: 'bg-blue-600',
        driveUrl: d.driveUrl
      })
    })

    // 3. Tiếng Anh Cơ Bản & Chuyên Ngành (Sheet 2)
    basicDocsRaw.forEach((b) => {
      const lower = b.title.toLowerCase()
      let cat: UnifiedDocItem['category'] = 'basic'
      let label = 'Tiếng Anh Căn Bản'
      let color = 'bg-emerald-600'

      if (lower.includes('chuyên ngành') || lower.includes('y') || lower.includes('cntt') || lower.includes('khách sạn') || lower.includes('du lịch') || lower.includes('xây dựng') || lower.includes('cơ khí')) {
        cat = 'specialized'
        label = 'Tiếng Anh Chuyên Ngành'
        color = 'bg-amber-600'
      } else if (lower.includes('ipa') || lower.includes('phát âm') || lower.includes('pronunciation')) {
        cat = 'ipa'
        label = 'Phát Âm & 44 Video IPA'
        color = 'bg-purple-600'
      } else if (lower.includes('b1') || lower.includes('b2') || lower.includes('c1') || lower.includes('vstep') || lower.includes('thpt')) {
        cat = 'vstep'
        label = 'Chứng Chỉ B1-C1 & VSTEP'
        color = 'bg-rose-600'
      }

      list.push({
        id: `basic-${b.id}`,
        title: b.title,
        category: cat,
        categoryLabel: label,
        badgeColor: color,
        driveUrl: b.driveUrl
      })
    })

    return list
  }, [])

  const filteredDriveDocs = useMemo(() => {
    return allDriveDocs.filter((item) => {
      const matchCat = docCategoryFilter === 'all' ? true : item.category === docCategoryFilter
      const matchSearch =
        docSearch === '' ||
        item.title.toLowerCase().includes(docSearch.toLowerCase()) ||
        item.categoryLabel.toLowerCase().includes(docSearch.toLowerCase())
      return matchCat && matchSearch
    })
  }, [allDriveDocs, docCategoryFilter, docSearch])

  return (
    <div className='p-3 sm:p-6 md:p-8 space-y-6 max-w-7xl mx-auto'>
      {/* Top Header */}
      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
        <div>
          <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2'>
            📚 Kho Tài Liệu & Bộ Từ Vựng
          </h1>
          <p className='text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1'>
            {decks.length} bộ flashcard ({totalWords} từ vựng) • 141 giáo trình & kho đề Google Drive gốc
          </p>
        </div>

        {mainTab === 'flashcards' && (
          <Link to='/import'>
            <Button variant='secondary' className='min-h-[40px] text-xs sm:text-sm'>
              <Upload size={16} className='mr-2' />
              Import từ file
            </Button>
          </Link>
        )}
      </div>

      {/* Main Tab Switcher */}
      <div className='bg-white dark:bg-gray-800/80 rounded-2xl p-1.5 border border-gray-200 dark:border-gray-700/60 shadow-sm flex items-center gap-2'>
        <button
          onClick={() => setMainTab('flashcards')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 min-h-[44px] ${
            mainTab === 'flashcards'
              ? 'bg-primary-600 text-white shadow-md'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-750'
          }`}
        >
          <Sparkles size={16} />
          <span>Bộ Từ Vựng Flashcard ({decks.length} Decks)</span>
        </button>

        <button
          onClick={() => setMainTab('driveDocs')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 min-h-[44px] ${
            mainTab === 'driveDocs'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-750'
          }`}
        >
          <FolderOpen size={16} />
          <span>Kho Tài Liệu Google Drive ({allDriveDocs.length} Tài Liệu)</span>
        </button>
      </div>

      {/* ===================================================================== */}
      {/* TAB 1: BỘ TỪ VỰNG FLASHCARD                                           */}
      {/* ===================================================================== */}
      {mainTab === 'flashcards' && (
        <div className='space-y-6'>
          <FilterTabs filter={filter} onFilterChange={setFilter} />
          {error && <p className='text-red-500 mt-2 text-xs'>{error}</p>}
          <DeckGrid
            decks={filteredDecks}
            importing={importing}
            imported={imported}
            importProgress={importProgress}
            onImport={handleImport}
          />
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 2: KHO TÀI LIỆU GOOGLE DRIVE (141 TÀI LIỆU GỐC)                   */}
      {/* ===================================================================== */}
      {mainTab === 'driveDocs' && (
        <div className='space-y-6'>
          {/* Filter Bar & Search */}
          <div className='bg-white dark:bg-gray-800/80 rounded-2xl p-4 border border-gray-200 dark:border-gray-700/60 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4'>
            <div className='flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 scrollbar-none'>
              {[
                { id: 'all', label: `Tất Cả (${allDriveDocs.length})` },
                { id: 'ets', label: 'Đề Thi ETS (9 Bộ)' },
                { id: 'toeic', label: 'Sách & Đề TOEIC (73)' },
                { id: 'specialized', label: 'Chuyên Ngành (CNTT, Y...)' },
                { id: 'ipa', label: 'Phát Âm & IPA' },
                { id: 'vstep', label: 'B1-C1 & VSTEP' },
                { id: 'basic', label: 'Tiếng Anh Căn Bản' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setDocCategoryFilter(item.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors min-h-[38px] ${
                    docCategoryFilter === item.id
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-750 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className='relative w-full md:w-72'>
              <Search className='absolute left-3 top-2.5 text-gray-400' size={16} />
              <input
                type='text'
                placeholder='Tìm giáo trình, đề thi...'
                value={docSearch}
                onChange={(e) => setDocSearch(e.target.value)}
                className='w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 dark:text-gray-200 min-h-[38px]'
              />
            </div>
          </div>

          {/* Grid Documents */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {filteredDriveDocs.map((item) => (
              <div
                key={item.id}
                className='bg-white dark:bg-gray-800/80 rounded-2xl p-5 border border-gray-200 dark:border-gray-700/60 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group'
              >
                <div>
                  <div className='flex items-center justify-between gap-2 mb-2'>
                    <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold text-white ${item.badgeColor}`}>
                      {item.categoryLabel}
                    </span>
                  </div>

                  <h3 className='font-bold text-sm sm:text-base text-gray-900 dark:text-white leading-snug mb-3 line-clamp-2'>
                    {item.title}
                  </h3>
                </div>

                <div className='pt-3 border-t border-gray-100 dark:border-gray-700/60'>
                  <a
                    href={item.driveUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/50 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold transition-colors min-h-[40px]'
                  >
                    <ExternalLink size={14} /> Mở Thư Mục Google Drive
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ============================================
// Sub-components
// ============================================

interface FilterTabsProps {
  filter: FilterType
  onFilterChange: (filter: FilterType) => void
}

const FilterTabs = memo(function FilterTabs({ filter, onFilterChange }: FilterTabsProps) {
  const labels: Record<FilterType, string> = {
    ALL: 'Tất cả',
    TOEIC: 'TOEIC',
    IELTS: 'IELTS',
    OTHER: 'Khác',
  }

  return (
    <div className='flex gap-2 mb-6 overflow-x-auto pb-1 scrollbar-none'>
      {LIBRARY_FILTERS.map((f) => (
        <button
          key={f}
          onClick={() => onFilterChange(f)}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors min-h-[38px] whitespace-nowrap ${
            filter === f
              ? 'bg-primary-600 text-white shadow-sm'
              : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
          }`}
        >
          {labels[f]}
        </button>
      ))}
    </div>
  )
})

interface DeckGridProps {
  decks: VocabDeck[]
  importing: string | null
  imported: Record<string, number>
  importProgress: { current: number; total: number } | null
  onImport: (deck: VocabDeck) => void
}

const DeckGrid = memo(function DeckGrid({
  decks,
  importing,
  imported,
  importProgress,
  onImport,
}: DeckGridProps) {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
      {decks.map((deck) => (
        <DeckCard
          key={deck.name}
          deck={deck}
          isImporting={importing === deck.name}
          isImported={deck.name in imported}
          isDisabled={!!importing}
          importProgress={importing === deck.name ? importProgress : null}
          onImport={() => onImport(deck)}
        />
      ))}
    </div>
  )
})

interface DeckCardProps {
  deck: VocabDeck
  isImporting: boolean
  isImported: boolean
  isDisabled: boolean
  importProgress: { current: number; total: number } | null
  onImport: () => void
}

const DeckCard = memo(function DeckCard({
  deck,
  isImporting,
  isImported,
  isDisabled,
  importProgress,
  onImport,
}: DeckCardProps) {
  const progressPercent = importProgress
    ? Math.round((importProgress.current / importProgress.total) * 100)
    : 0

  return (
    <div className='glass rounded-2xl p-5 sm:p-6 card-hover flex flex-col h-full relative overflow-hidden group'>
      <div
        className='absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-10 group-hover:scale-150 transition-transform duration-700'
        style={{ backgroundColor: deck.color }}
      />

      {/* Header */}
      <div className='flex items-start justify-between mb-4 relative z-10'>
        <div
          className='w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shadow-sm transition-transform group-hover:rotate-6'
          style={{ backgroundColor: deck.color + '20' }}
        >
          {deck.icon}
        </div>

        {isImported ? (
          <span className='flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-lg text-xs font-bold uppercase tracking-wide'>
            <Check size={14} strokeWidth={3} /> Đã thêm
          </span>
        ) : (
          <Button
            size='sm'
            onClick={onImport}
            disabled={isDisabled}
            className={`min-h-[38px] ${
              isImporting
                ? 'opacity-70'
                : 'shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40'
            }`}
          >
            {isImporting ? <Loader2 size={16} className='animate-spin' /> : <Download size={16} />}
            <span className='ml-2 font-semibold'>{isImporting ? 'Đang tải...' : 'Tải về'}</span>
          </Button>
        )}
      </div>

      {/* Content */}
      <div className='relative z-10 flex-1'>
        <h3 className='font-bold text-lg sm:text-xl mb-2 text-gray-900 dark:text-white leading-tight'>
          {deck.name}
        </h3>
        <DeckTags name={deck.name} />
        <p className='text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2 leading-relaxed'>
          {deck.description}
        </p>
      </div>

      {/* Progress Bar */}
      {isImporting && importProgress && (
        <div className='mt-4'>
          <div className='flex justify-between text-xs text-gray-500 mb-1'>
            <span>Đang nhập...</span>
            <span>
              {importProgress.current}/{importProgress.total} từ
            </span>
          </div>
          <div className='h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden'>
            <div
              className='h-full bg-primary-500 rounded-full transition-all duration-300'
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <div className='mt-auto pt-4 border-t border-gray-100 dark:border-gray-700/50 flex items-center justify-between text-xs sm:text-sm'>
        <span className='font-bold' style={{ color: deck.color }}>
          {deck.words.length} từ vựng
        </span>
        <div className='flex -space-x-2'>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className='w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-800'
            />
          ))}
        </div>
      </div>
    </div>
  )
})

interface DeckTagsProps {
  name: string
}

const DeckTags = memo(function DeckTags({ name }: DeckTagsProps) {
  const tags = []

  if (name.includes('TOEIC')) {
    tags.push({ label: 'TOEIC', color: 'blue' })
  }
  if (name.includes('IELTS')) {
    tags.push({ label: 'IELTS', color: 'red' })
  }
  if (name.includes('Advanced') || name.includes('Master') || name.includes('Hell')) {
    tags.push({ label: 'HARD', color: 'purple' })
  }

  if (tags.length === 0) return null

  return (
    <div className='flex flex-wrap gap-2 mb-3'>
      {tags.map(({ label, color }) => (
        <span
          key={label}
          className={`px-2 py-0.5 bg-${color}-50 text-${color}-600 dark:bg-${color}-900/20 dark:text-${color}-400 rounded-md text-xs font-bold border border-${color}-100 dark:border-${color}-800`}
        >
          {label}
        </span>
      ))}
    </div>
  )
})
