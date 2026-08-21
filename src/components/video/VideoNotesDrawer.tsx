// ============================================
// Timestamped Video Notes Component
// ============================================

import React, { useState } from 'react'
import { Bookmark, Plus, Trash2, Clock } from 'lucide-react'

export interface VideoNote {
  id: string
  timestamp: number
  quote: string
  userNote: string
  createdAt: string
}

interface VideoNotesDrawerProps {
  notes: VideoNote[]
  currentTime: number
  currentQuote?: string
  onAddNote: (note: { timestamp: number; quote: string; userNote: string }) => void
  onDeleteNote: (id: string) => void
  onSeek: (seconds: number) => void
}

export const VideoNotesDrawer: React.FC<VideoNotesDrawerProps> = ({
  notes,
  currentTime,
  currentQuote,
  onAddNote,
  onDeleteNote,
  onSeek,
}) => {
  const [inputText, setInputText] = useState('')

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputText.trim()) return

    onAddNote({
      timestamp: Math.round(currentTime),
      quote: currentQuote || '',
      userNote: inputText.trim(),
    })
    setInputText('')
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className='flex flex-col h-full bg-white dark:bg-dark-card rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 p-4'>
      <div className='flex items-center justify-between mb-3'>
        <h3 className='font-display font-bold text-base text-gray-900 dark:text-white flex items-center gap-2'>
          <Bookmark size={18} className='text-primary-500' />
          <span>Ghi chú Video ({notes.length})</span>
        </h3>
        <span className='text-xs text-gray-400 font-mono'>Hiện tại: {formatTime(currentTime)}</span>
      </div>

      {/* Add note input form */}
      <form onSubmit={handleSave} className='mb-4 space-y-2'>
        <div className='relative'>
          <input
            type='text'
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Ghi chú tại [${formatTime(currentTime)}]...`}
            className='w-full px-3.5 py-2.5 rounded-xl text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-800 dark:text-gray-100'
          />
          <button
            type='submit'
            disabled={!inputText.trim()}
            className='absolute right-1.5 top-1.5 bottom-1.5 px-3 rounded-lg bg-primary-600 hover:bg-primary-500 text-white text-xs font-semibold disabled:opacity-40 transition-opacity flex items-center gap-1 shadow-sm'
          >
            <Plus size={14} /> Thêm
          </button>
        </div>
        {currentQuote && (
          <p className='text-xs text-gray-400 truncate px-1 italic'>"{currentQuote}"</p>
        )}
      </form>

      {/* List of notes */}
      <div className='flex-1 overflow-y-auto space-y-2.5 pr-1'>
        {notes.length === 0 ? (
          <div className='py-8 text-center text-gray-400 text-xs'>
            Chưa có ghi chú nào. Hãy bấm thêm ghi chú khi gặp ngữ pháp hoặc cấu trúc hay!
          </div>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className='p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 hover:border-primary-200 dark:hover:border-primary-800 transition-all group'
            >
              <div className='flex items-center justify-between mb-1'>
                <button
                  onClick={() => onSeek(note.timestamp)}
                  className='text-xs font-mono font-bold text-primary-600 dark:text-primary-400 flex items-center gap-1 hover:underline'
                >
                  <Clock size={12} /> {formatTime(note.timestamp)}
                </button>
                <button
                  onClick={() => onDeleteNote(note.id)}
                  className='opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all'
                  title='Xóa ghi chú'
                >
                  <Trash2 size={13} />
                </button>
              </div>

              {note.quote && (
                <p className='text-xs text-gray-500 dark:text-gray-400 italic mb-1 line-clamp-2'>
                  "{note.quote}"
                </p>
              )}

              <p className='text-sm text-gray-800 dark:text-gray-200 font-medium'>
                {note.userNote}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
