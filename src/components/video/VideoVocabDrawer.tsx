// ============================================
// Video Vocabulary Drawer & Deck Fast-Creator
// Cho phép vừa xem video vừa note từ vựng trực tiếp vào Bộ từ vựng
// ============================================

import React, { useState, useEffect, useMemo } from 'react'
import {
  BookOpen,
  Plus,
  Trash2,
  Volume2,
  Sparkles,
  Check,
  FolderPlus,
  Clock,
  BookmarkCheck,
  Quote,
  X,
} from 'lucide-react'
import { useDeckStore } from '@/store/deckStore'
import { lookupWord } from '@/services/dictionaryService'
import { speakWord } from '@/utils/quiz'
import type { VideoNote } from './VideoNotesDrawer'
export type { VideoNote }

interface VideoVocabDrawerProps {
  currentTime: number
  currentQuote?: string
  notes?: VideoNote[]
  onAddNote?: (note: { timestamp: number; quote: string; userNote: string }) => void
  onDeleteNote?: (id: string) => void
  onSeek?: (seconds: number) => void
  prefillWord?: string
  prefillSentence?: string
}

interface NewWordForm {
  term: string
  definition: string
  example: string
  phonetic: string
}

const INITIAL_FORM: NewWordForm = {
  term: '',
  definition: '',
  example: '',
  phonetic: '',
}

export const VideoVocabDrawer: React.FC<VideoVocabDrawerProps> = ({
  currentTime,
  currentQuote,
  notes = [],
  onAddNote,
  onDeleteNote,
  onSeek,
  prefillWord,
  prefillSentence,
}) => {
  const { decks, words, fetchDecks, fetchWords, createWord, createDeck, deleteWord } =
    useDeckStore()

  const [activeTab, setActiveTab] = useState<'vocab' | 'list' | 'notes'>('vocab')
  const [selectedDeckId, setSelectedDeckId] = useState<number | null>(() => {
    const saved = localStorage.getItem('last_video_deck_id')
    return saved ? parseInt(saved, 10) : null
  })

  const [form, setForm] = useState<NewWordForm>(INITIAL_FORM)
  const [isLookingUp, setIsLookingUp] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [showCreateDeckInput, setShowCreateDeckInput] = useState(false)
  const [newDeckName, setNewDeckName] = useState('')

  // Ghi chú video thông thường
  const [noteInputText, setNoteInputText] = useState('')

  // Đảm bảo nạp decks ban đầu
  useEffect(() => {
    fetchDecks()
  }, [fetchDecks])

  // Chọn deck mặc định nếu chưa chọn hoặc deck hiện tại bị xóa
  useEffect(() => {
    if (decks.length > 0) {
      if (!selectedDeckId || !decks.some((d) => d.id === selectedDeckId)) {
        const firstId = decks[0].id
        setSelectedDeckId(firstId)
        localStorage.setItem('last_video_deck_id', firstId.toString())
      }
    }
  }, [decks, selectedDeckId])

  // Nạp danh sách từ vựng của deck đã chọn
  useEffect(() => {
    if (selectedDeckId) {
      fetchWords(selectedDeckId)
    }
  }, [selectedDeckId, fetchWords])

  // Khi có prefillWord từ ngoài (ví dụ click từ trên transcript)
  useEffect(() => {
    if (prefillWord) {
      setForm((prev) => ({
        ...prev,
        term: prefillWord,
        example: prefillSentence || prev.example,
      }))
      setActiveTab('vocab')
    }
  }, [prefillWord, prefillSentence])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Chuyển đổi deck
  const handleSelectDeck = (deckId: number) => {
    setSelectedDeckId(deckId)
    localStorage.setItem('last_video_deck_id', deckId.toString())
  }

  // Tạo nhanh deck mới ngay trong drawer
  const handleCreateNewDeck = async () => {
    if (!newDeckName.trim()) return
    const newId = await createDeck(
      newDeckName.trim(),
      'Tạo từ bài học Video Song Ngữ',
      '#6366f1',
      'Youtube',
    )
    setNewDeckName('')
    setShowCreateDeckInput(false)
    if (newId) {
      handleSelectDeck(newId)
    }
  }

  // Tra nhanh nghĩa & phiên âm để gợi ý cho ô nhập
  const handleQuickLookup = async () => {
    if (!form.term.trim()) return
    setIsLookingUp(true)
    try {
      const res = await lookupWord(form.term.trim(), form.example || currentQuote)
      setForm((prev) => ({
        ...prev,
        definition: prev.definition || res.definition || '',
        phonetic: prev.phonetic || res.phonetic || '',
        example: prev.example || res.example || currentQuote || '',
      }))
    } catch (e) {
      console.error('Quick lookup failed:', e)
    } finally {
      setIsLookingUp(false)
    }
  }

  // Lưu từ vựng vào bộ từ vựng đã chọn
  const handleSaveWord = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!form.term.trim() || !form.definition.trim()) return

    let targetDeckId = selectedDeckId
    if (!targetDeckId) {
      if (decks.length > 0) {
        targetDeckId = decks[0].id
      } else {
        targetDeckId = await createDeck(
          'Từ vựng YouTube',
          'Các từ vựng lưu từ Video Song Ngữ',
          '#6366f1',
          'Youtube',
        )
      }
      setSelectedDeckId(targetDeckId)
    }

    await createWord({
      deck_id: targetDeckId,
      term: form.term.trim(),
      definition: form.definition.trim(),
      example: form.example.trim() || undefined,
      phonetic: form.phonetic.trim() || undefined,
    })

    setSaveSuccess(true)
    setForm(INITIAL_FORM)
    setTimeout(() => {
      setSaveSuccess(false)
    }, 2000)
  }

  // Lưu ghi chú video thường
  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault()
    if (!noteInputText.trim() || !onAddNote) return
    onAddNote({
      timestamp: Math.round(currentTime),
      quote: currentQuote || '',
      userNote: noteInputText.trim(),
    })
    setNoteInputText('')
  }

  const activeDeck = useMemo(() => {
    return decks.find((d) => d.id === selectedDeckId) || null
  }, [decks, selectedDeckId])

  return (
    <div className='flex flex-col h-full bg-white dark:bg-dark-card rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 p-3 sm:p-4 overflow-hidden'>
      {/* Top Header: Title & Deck Selector */}
      <div className='flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-gray-100 dark:border-gray-800/80 shrink-0'>
        <div className='flex items-center gap-2'>
          <div className='p-1.5 rounded-lg bg-primary-100 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400'>
            <BookOpen size={16} />
          </div>
          <div>
            <h3 className='font-display font-bold text-sm text-gray-900 dark:text-white leading-tight'>
              Sổ từ vựng Video
            </h3>
            <p className='text-[10px] text-gray-500 dark:text-gray-400'>
              Lưu từ trực tiếp vào Bộ từ vựng
            </p>
          </div>
        </div>

        {/* Deck Selector & Quick Create Deck */}
        <div className='flex items-center gap-1.5'>
          {showCreateDeckInput ? (
            <div className='flex items-center gap-1 bg-gray-50 dark:bg-gray-800 p-1 rounded-lg border border-gray-200 dark:border-gray-700'>
              <input
                type='text'
                value={newDeckName}
                onChange={(e) => setNewDeckName(e.target.value)}
                placeholder='Tên bộ mới...'
                className='text-xs px-2 py-0.5 bg-transparent text-gray-900 dark:text-white focus:outline-none w-28'
                autoFocus
                onKeyDown={(e) => e.key === 'Enter' && handleCreateNewDeck()}
              />
              <button
                onClick={handleCreateNewDeck}
                disabled={!newDeckName.trim()}
                className='px-2 py-0.5 bg-primary-600 hover:bg-primary-500 text-white rounded text-[11px] font-medium disabled:opacity-40'
              >
                Tạo
              </button>
              <button
                onClick={() => setShowCreateDeckInput(false)}
                className='text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-0.5'
              >
                <X size={13} />
              </button>
            </div>
          ) : (
            <div className='flex items-center gap-1'>
              <select
                value={selectedDeckId || ''}
                onChange={(e) => handleSelectDeck(Number(e.target.value))}
                className='text-xs bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary-500 max-w-[140px] sm:max-w-[180px] truncate'
              >
                {decks.map((deck) => (
                  <option key={deck.id} value={deck.id}>
                    📁 {deck.name} ({deck.word_count || 0})
                  </option>
                ))}
              </select>

              <button
                onClick={() => setShowCreateDeckInput(true)}
                title='Tạo bộ từ vựng mới'
                className='p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors'
              >
                <FolderPlus size={14} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tabs Switcher: Ghi từ mới / Từ đã lưu / Ghi chú */}
      <div className='flex items-center justify-between gap-1 mt-2.5 mb-3 p-1 bg-gray-100/80 dark:bg-gray-800/60 rounded-xl text-xs shrink-0'>
        <button
          onClick={() => setActiveTab('vocab')}
          className={`flex-1 py-1.5 px-2 rounded-lg font-medium transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'vocab'
              ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
          }`}
        >
          <Plus size={14} />
          <span>Ghi từ mới</span>
        </button>

        <button
          onClick={() => setActiveTab('list')}
          className={`flex-1 py-1.5 px-2 rounded-lg font-medium transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'list'
              ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
          }`}
        >
          <BookmarkCheck size={14} />
          <span>Đã lưu ({words.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('notes')}
          className={`flex-1 py-1.5 px-2 rounded-lg font-medium transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'notes'
              ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
          }`}
        >
          <Clock size={14} />
          <span>Ghi chú ({notes.length})</span>
        </button>
      </div>

      {/* Tab 1: Form Ghi từ vựng bằng tay y hệt bên Bộ từ vựng */}
      {activeTab === 'vocab' && (
        <div className='flex-1 overflow-y-auto no-scrollbar space-y-2.5 pr-0.5'>
          {saveSuccess && (
            <div className='p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in slide-in-from-top-1'>
              <Check size={15} className='shrink-0' />
              <span>
                Đã lưu từ vựng vào bộ <strong>{activeDeck?.name || 'Từ vựng'}</strong> thành công!
              </span>
            </div>
          )}

          <form onSubmit={handleSaveWord} className='space-y-2'>
            {/* Hàng 1: Từ vựng + Nút tra nhanh */}
            <div className='flex items-center gap-1.5'>
              <div className='flex-1 relative'>
                <input
                  type='text'
                  value={form.term}
                  onChange={(e) => setForm({ ...form, term: e.target.value })}
                  placeholder='Từ tiếng Anh * (VD: latency, deadlock)'
                  className='w-full px-3 py-1.5 rounded-xl text-xs bg-gray-50 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-1.5 focus:ring-primary-500 font-medium text-gray-900 dark:text-white'
                  required
                />
              </div>

              <button
                type='button'
                onClick={handleQuickLookup}
                disabled={!form.term.trim() || isLookingUp}
                title='Tra nhanh nghĩa & phiên âm'
                className='px-2.5 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-xs font-medium flex items-center gap-1 border border-indigo-200/60 dark:border-indigo-800/50 shrink-0 disabled:opacity-40 transition-all'
              >
                <Sparkles size={13} className={isLookingUp ? 'animate-spin' : ''} />
                <span className='hidden sm:inline'>Tra nhanh</span>
              </button>
            </div>

            {/* Hàng 2: Nghĩa tiếng Việt + Phiên âm */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
              <input
                type='text'
                value={form.definition}
                onChange={(e) => setForm({ ...form, definition: e.target.value })}
                placeholder='Nghĩa tiếng Việt * (VD: độ trễ hệ thống)'
                className='w-full px-3 py-1.5 rounded-xl text-xs bg-gray-50 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-1.5 focus:ring-primary-500 text-gray-900 dark:text-white'
                required
              />

              <input
                type='text'
                value={form.phonetic}
                onChange={(e) => setForm({ ...form, phonetic: e.target.value })}
                placeholder='Phiên âm (tùy chọn: /ˈleɪ.tən.si/)'
                className='w-full px-3 py-1.5 rounded-xl text-xs bg-gray-50 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-1.5 focus:ring-primary-500 text-gray-700 dark:text-gray-300 font-mono text-[11px]'
              />
            </div>

            {/* Hàng 3: Ví dụ câu trích từ video */}
            <div className='relative'>
              <input
                type='text'
                value={form.example}
                onChange={(e) => setForm({ ...form, example: e.target.value })}
                placeholder='Câu ví dụ (tự gõ hoặc lấy câu thoại video)'
                className='w-full px-3 py-1.5 pr-20 rounded-xl text-xs bg-gray-50 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-1.5 focus:ring-primary-500 text-gray-800 dark:text-gray-200 italic'
              />

              {currentQuote && (
                <button
                  type='button'
                  onClick={() => setForm({ ...form, example: currentQuote })}
                  title='Lấy câu thoại đang phát vào ô ví dụ'
                  className='absolute right-1 top-1 bottom-1 px-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-[10px] font-semibold flex items-center gap-0.5 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors'
                >
                  <Quote size={11} /> Lấy câu thoại
                </button>
              )}
            </div>

            {/* Nút hành động chính: Lưu vào bộ từ vựng */}
            <div className='flex items-center justify-between gap-2 pt-1'>
              <button
                type='button'
                onClick={() => setForm(INITIAL_FORM)}
                className='text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 px-2 py-1'
              >
                Xóa trắng
              </button>

              <button
                type='submit'
                disabled={!form.term.trim() || !form.definition.trim()}
                className='px-4 py-2 rounded-xl bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-500 hover:to-indigo-500 active:scale-95 text-white text-xs font-bold shadow-md shadow-primary-500/20 disabled:opacity-40 transition-all flex items-center gap-1.5 ml-auto'
              >
                <Plus size={15} />
                <span>Lưu vào bộ từ vựng</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 2: Danh sách các từ vựng đã lưu trong Bộ này */}
      {activeTab === 'list' && (
        <div className='flex-1 overflow-y-auto no-scrollbar space-y-2 pr-0.5'>
          {words.length === 0 ? (
            <div className='py-8 text-center text-gray-400 text-xs'>
              Chưa có từ vựng nào trong bộ <strong>{activeDeck?.name || 'này'}</strong>.<br />
              Hãy chuyển sang tab <strong>Ghi từ mới</strong> để note từ ngay!
            </div>
          ) : (
            words.map((w) => (
              <div
                key={w.id}
                className='p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 hover:border-primary-200 dark:hover:border-primary-800 transition-all flex items-start justify-between gap-2 group'
              >
                <div className='min-w-0 flex-1 space-y-0.5'>
                  <div className='flex items-center gap-2'>
                    <span className='font-bold text-xs text-gray-900 dark:text-white capitalize'>
                      {w.term}
                    </span>
                    {w.phonetic && (
                      <span className='text-[10px] text-gray-400 font-mono'>{w.phonetic}</span>
                    )}
                    <button
                      onClick={() => speakWord(w.term)}
                      title='Nghe phát âm'
                      className='text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors p-0.5'
                    >
                      <Volume2 size={13} />
                    </button>
                  </div>

                  <p className='text-xs text-gray-700 dark:text-gray-300 font-medium'>
                    {w.definition}
                  </p>

                  {w.example && (
                    <p className='text-[11px] text-gray-400 dark:text-gray-500 italic truncate'>
                      "{w.example}"
                    </p>
                  )}
                </div>

                <button
                  onClick={() => selectedDeckId && deleteWord(w.id, selectedDeckId)}
                  title='Xóa từ khỏi bộ'
                  className='text-gray-300 hover:text-red-500 dark:text-gray-600 dark:hover:text-red-400 transition-colors p-1 opacity-60 group-hover:opacity-100'
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 3: Ghi chú bài học thông thường theo mốc thời gian */}
      {activeTab === 'notes' && (
        <div className='flex-1 overflow-y-auto no-scrollbar flex flex-col space-y-2.5 pr-0.5'>
          {/* Ô nhập ghi chú */}
          <form onSubmit={handleSaveNote} className='space-y-1.5'>
            <div className='relative'>
              <input
                type='text'
                value={noteInputText}
                onChange={(e) => setNoteInputText(e.target.value)}
                placeholder={`Ghi chú tại [${formatTime(currentTime)}]...`}
                className='w-full px-3 py-1.5 pr-16 rounded-xl text-xs bg-gray-50 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-1.5 focus:ring-primary-500 text-gray-800 dark:text-gray-100'
              />
              <button
                type='submit'
                disabled={!noteInputText.trim()}
                className='absolute right-1 top-1 bottom-1 px-2.5 rounded-lg bg-primary-600 hover:bg-primary-500 text-white text-[11px] font-semibold disabled:opacity-40 transition-opacity flex items-center gap-1 shadow-sm'
              >
                <Plus size={12} /> Thêm
              </button>
            </div>
            {currentQuote && (
              <p className='text-[11px] text-gray-400 truncate px-1 italic'>"{currentQuote}"</p>
            )}
          </form>

          {/* Danh sách ghi chú */}
          <div className='flex-1 overflow-y-auto space-y-2'>
            {notes.length === 0 ? (
              <div className='py-8 text-center text-gray-400 text-xs'>
                Chưa có ghi chú nào tại mốc thời gian.
              </div>
            ) : (
              notes.map((note) => (
                <div
                  key={note.id}
                  className='p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 hover:border-primary-200 dark:hover:border-primary-800 transition-all group'
                >
                  <div className='flex items-center justify-between mb-1'>
                    <button
                      onClick={() => onSeek && onSeek(note.timestamp)}
                      className='text-[11px] font-mono font-bold text-primary-600 dark:text-primary-400 flex items-center gap-1 hover:underline'
                    >
                      <Clock size={11} />
                      <span>{formatTime(note.timestamp)}</span>
                    </button>
                    {onDeleteNote && (
                      <button
                        onClick={() => onDeleteNote(note.id)}
                        className='text-gray-400 hover:text-red-500 p-0.5 opacity-0 group-hover:opacity-100 transition-opacity'
                      >
                        <Trash2 size={12} />
                      </button>
                    )}
                  </div>
                  <p className='text-xs text-gray-800 dark:text-gray-200 font-medium'>
                    {note.userNote}
                  </p>
                  {note.quote && (
                    <p className='text-[10px] text-gray-400 italic mt-0.5 truncate'>
                      "{note.quote}"
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
