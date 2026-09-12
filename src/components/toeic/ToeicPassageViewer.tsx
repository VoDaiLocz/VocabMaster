import React, { useState } from 'react'
import { FileText, Mail, MessageSquare, Newspaper, Calendar, Layers, BookOpen } from 'lucide-react'

interface ToeicPassageViewerProps {
  passageText: string
  passageType?: string
  part?: number
}

type FontSize = 'sm' | 'base' | 'lg'

export const ToeicPassageViewer: React.FC<ToeicPassageViewerProps> = ({
  passageText,
  passageType = '',
  part = 7,
}) => {
  const [fontSize, setFontSize] = useState<FontSize>('base')

  if (!passageText) return null

  // Typography class based on font size selection
  const fontClasses: Record<FontSize, { body: string; leading: string }> = {
    sm: { body: 'text-xs sm:text-sm', leading: 'leading-relaxed' },
    base: { body: 'text-sm sm:text-base', leading: 'leading-7' },
    lg: { body: 'text-base sm:text-lg', leading: 'leading-8' },
  }

  // Detect multiple documents
  const hasMultipleDocs = passageText.includes('=== DOCUMENT')
  const docSections = hasMultipleDocs
    ? passageText
        .split(/(?==== DOCUMENT)/)
        .map((s) => s.trim())
        .filter(Boolean)
    : [passageText]

  // Detect document type for badge
  const isDouble = passageType.toLowerCase().includes('and') || docSections.length === 2
  const isTriple =
    docSections.length >= 3 ||
    (passageType.includes(',') && passageType.toLowerCase().includes('and'))
  const isChat =
    passageType.toLowerCase().includes('chat') || passageType.toLowerCase().includes('text message')

  const getDocIcon = (title: string) => {
    const t = title.toLowerCase()
    if (t.includes('e-mail') || t.includes('letter'))
      return <Mail className='w-4 h-4 text-sky-500' />
    if (t.includes('chat') || t.includes('message'))
      return <MessageSquare className='w-4 h-4 text-emerald-500' />
    if (t.includes('schedule') || t.includes('itinerary'))
      return <Calendar className='w-4 h-4 text-amber-500' />
    if (t.includes('article') || t.includes('review'))
      return <Newspaper className='w-4 h-4 text-purple-500' />
    return <FileText className='w-4 h-4 text-indigo-500' />
  }

  // Render formatted lines of a single document
  const renderDocContent = (content: string) => {
    const lines = content.split('\n')
    const elements: React.ReactNode[] = []
    let emailHeaders: { key: string; val: string }[] = []

    const flushEmailHeaders = () => {
      if (emailHeaders.length > 0) {
        elements.push(
          <div
            key={`email-hdrs-${elements.length}`}
            className='mb-4 p-3.5 bg-sky-50/70 dark:bg-sky-950/30 border border-sky-200/70 dark:border-sky-800/50 rounded-xl space-y-1.5 text-xs sm:text-sm font-sans'
          >
            {emailHeaders.map((h, i) => (
              <div key={i} className='flex items-baseline gap-2'>
                <span className='font-bold uppercase tracking-wider text-sky-700 dark:text-sky-300 min-w-[65px]'>
                  {h.key}:
                </span>
                <span className='text-gray-800 dark:text-gray-200 font-medium'>{h.val}</span>
              </div>
            ))}
          </div>,
        )
        emailHeaders = []
      }
    }

    let lineIdx = 0
    while (lineIdx < lines.length) {
      const line = lines[lineIdx]
      const trimmed = line.trim()
      if (!trimmed) {
        flushEmailHeaders()
        lineIdx++
        continue
      }

      // Skip document title headers if already processed
      if (trimmed.startsWith('=== DOCUMENT')) {
        lineIdx++
        continue
      }

      // Email header pattern (From:, To:, Date:, Subject:)
      const emailHeaderMatch = trimmed.match(/^(From|To|Date|Subject|Sent|Cc|Re)\s*:\s*(.*)$/i)
      if (emailHeaderMatch) {
        emailHeaders.push({ key: emailHeaderMatch[1], val: emailHeaderMatch[2] })
        lineIdx++
        continue
      }

      flushEmailHeaders()

      // Markdown table pattern: | Col 1 | Col 2 |
      if (trimmed.startsWith('|')) {
        const tableLines: string[] = []
        while (lineIdx < lines.length && lines[lineIdx].trim().startsWith('|')) {
          tableLines.push(lines[lineIdx].trim())
          lineIdx++
        }

        if (tableLines.length >= 2) {
          const parseRow = (r: string) =>
            r
              .split('|')
              .slice(1, -1)
              .map((c) => c.trim())

          const headers = parseRow(tableLines[0])
          const isSeparator = tableLines[1].replace(/[\s:\-|]/g, '').length === 0
          const bodyRows = (isSeparator ? tableLines.slice(2) : tableLines.slice(1)).map(parseRow)

          elements.push(
            <div
              key={`tbl-${lineIdx}`}
              className='my-4 overflow-x-auto rounded-xl border border-gray-200/90 dark:border-gray-800 shadow-xs bg-white dark:bg-gray-900/40'
            >
              <table className='w-full text-xs sm:text-sm border-collapse font-sans text-left'>
                <thead>
                  <tr className='bg-gray-100/90 dark:bg-gray-800/90 text-gray-900 dark:text-gray-100 font-bold border-b border-gray-200 dark:border-gray-700'>
                    {headers.map((h, hIdx) => (
                      <th
                        key={hIdx}
                        className='py-2.5 px-3.5 border-r border-gray-200/70 dark:border-gray-700/70 last:border-r-0'
                      >
                        {renderInlineMarkdown(h)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-100 dark:divide-gray-800/60'>
                  {bodyRows.map((row, rIdx) => (
                    <tr
                      key={rIdx}
                      className='hover:bg-indigo-50/30 dark:hover:bg-indigo-950/20 transition-colors'
                    >
                      {row.map((cell, cIdx) => (
                        <td
                          key={cIdx}
                          className='py-2 px-3.5 border-r border-gray-100 dark:border-gray-800/60 last:border-r-0 text-gray-800 dark:text-gray-200'
                        >
                          {renderInlineMarkdown(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>,
          )
          continue
        }
      }

      // Browser Mockup Bar: 🌐 **http://...** or 🌐 **www...**
      if (trimmed.startsWith('🌐')) {
        const webMatch = trimmed.match(
          /^🌐\s*(?:\*\*)?(https?:\/\/[^\s*|]+|www\.[^\s*|]+)(?:\*\*)?(?:\s*\|\s*(.*))?/i,
        )
        if (webMatch) {
          const [, url, pageTitle] = webMatch
          elements.push(
            <div
              key={`browser-${lineIdx}`}
              className='my-3 rounded-xl border border-gray-200 dark:border-gray-700/70 bg-gray-50/60 dark:bg-gray-900/60 overflow-hidden shadow-xs font-sans'
            >
              <div className='flex items-center gap-2 px-3 py-2 bg-gray-200/60 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-700/60 text-xs'>
                <div className='flex items-center gap-1.5 mr-2'>
                  <span className='w-2.5 h-2.5 rounded-full bg-red-400/80 inline-block' />
                  <span className='w-2.5 h-2.5 rounded-full bg-amber-400/80 inline-block' />
                  <span className='w-2.5 h-2.5 rounded-full bg-emerald-400/80 inline-block' />
                </div>
                <div className='flex-1 max-w-md bg-white dark:bg-gray-950 px-3 py-1 rounded-md text-[11px] font-mono text-gray-600 dark:text-gray-300 border border-gray-200/80 dark:border-gray-800 flex items-center gap-1.5 truncate'>
                  <span className='text-emerald-500 font-bold'>🔒</span>
                  <span className='text-sky-600 dark:text-sky-400'>{url}</span>
                </div>
              </div>
              {pageTitle && (
                <div className='px-4 py-2.5 font-bold text-gray-900 dark:text-white text-sm sm:text-base border-b border-gray-100 dark:border-gray-800/60 bg-white/60 dark:bg-gray-900/30'>
                  {renderInlineMarkdown(pageTitle.trim())}
                </div>
              )}
            </div>,
          )
          lineIdx++
          continue
        }
      }

      // Chat message bubble: 💬 **Speaker** (Time):\nMessage
      if (trimmed.startsWith('💬')) {
        const chatMatch = trimmed.match(/^💬\s*\*\*(.*?)\*\*\s*\((.*?)\)(?::)?\s*(.*)$/)
        if (chatMatch) {
          const [, speaker, time, inlineMsg] = chatMatch
          elements.push(
            <div key={`chat-${lineIdx}`} className='mb-3 flex items-start gap-2.5'>
              <div className='w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-xs shrink-0 border border-emerald-300 dark:border-emerald-700'>
                {speaker.slice(0, 2).toUpperCase()}
              </div>
              <div className='flex-1 max-w-[88%]'>
                <div className='flex items-center gap-2 mb-1'>
                  <span className='font-bold text-xs text-gray-900 dark:text-white'>{speaker}</span>
                  <span className='text-[11px] text-gray-500 dark:text-gray-400'>{time}</span>
                </div>
                <div className='bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 rounded-2xl rounded-tl-sm px-3.5 py-2 text-sm text-gray-800 dark:text-gray-200 font-sans shadow-xs'>
                  {inlineMsg}
                </div>
              </div>
            </div>,
          )
          lineIdx++
          continue
        }
      }

      // Title heading (### ...)
      if (trimmed.startsWith('### ')) {
        elements.push(
          <h3
            key={`h3-${lineIdx}`}
            className='text-base sm:text-lg font-bold text-gray-900 dark:text-white mt-3 mb-2 font-sans tracking-tight'
          >
            {trimmed.replace('### ', '')}
          </h3>,
        )
        lineIdx++
        continue
      }

      // Bullet points (• ...)
      if (trimmed.startsWith('• ') || trimmed.startsWith('- ')) {
        elements.push(
          <div
            key={`bullet-${lineIdx}`}
            className='flex items-start gap-2 py-0.5 text-gray-800 dark:text-gray-200'
          >
            <span className='text-indigo-500 font-bold'>•</span>
            <span className='flex-1'>{renderInlineMarkdown(trimmed.slice(2))}</span>
          </div>,
        )
        lineIdx++
        continue
      }

      // Special highlight lines: 📅 Showtime / 📞 Phone / ✉️ Email
      if (trimmed.startsWith('📅') || trimmed.startsWith('📞') || trimmed.startsWith('✉️')) {
        elements.push(
          <div
            key={`info-${lineIdx}`}
            className='my-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800/70 rounded-xl text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200 inline-block mr-2'
          >
            {renderInlineMarkdown(trimmed)}
          </div>,
        )
        lineIdx++
        continue
      }

      // Theater / Announcement presentation tag
      if (trimmed.startsWith('🎭')) {
        elements.push(
          <div
            key={`theater-${lineIdx}`}
            className='text-xs sm:text-sm font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-1'
          >
            {renderInlineMarkdown(trimmed)}
          </div>,
        )
        lineIdx++
        continue
      }

      // Dear ... salutation
      if (trimmed.startsWith('Dear ')) {
        elements.push(
          <div
            key={`salutation-${lineIdx}`}
            className='font-bold text-gray-900 dark:text-white my-2.5 font-sans'
          >
            {trimmed}
          </div>,
        )
        lineIdx++
        continue
      }

      // Closing salutation (Sincerely, Warmest Regards, etc.)
      if (
        /^(Warmest Regards|Sincerely|Best Regards|Warm Regards|Regards|Cordially),?$/i.test(trimmed)
      ) {
        elements.push(
          <div
            key={`close-${lineIdx}`}
            className='mt-4 font-semibold text-gray-800 dark:text-gray-200 italic'
          >
            {trimmed}
          </div>,
        )
        lineIdx++
        continue
      }

      // Regular paragraph
      elements.push(
        <p key={`p-${lineIdx}`} className='mb-3 text-gray-800 dark:text-gray-200 text-justify'>
          {renderInlineMarkdown(trimmed)}
        </p>,
      )
      lineIdx++
    }

    flushEmailHeaders()
    return elements
  }

  // Simple inline parser for **bold** and *italic*
  const renderInlineMarkdown = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g)
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className='font-bold text-gray-900 dark:text-white'>
            {part.slice(2, -2)}
          </strong>
        )
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return (
          <em key={i} className='italic text-gray-700 dark:text-gray-300'>
            {part.slice(1, -1)}
          </em>
        )
      }
      return part
    })
  }

  return (
    <div className='mb-6 bg-white dark:bg-gray-900/80 rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-sm overflow-hidden'>
      {/* Top Directive & Tool Bar */}
      <div className='px-4 sm:px-5 py-3 bg-gradient-to-r from-indigo-50/80 via-blue-50/50 to-white dark:from-indigo-950/40 dark:via-gray-900 dark:to-gray-900 border-b border-gray-200/70 dark:border-gray-800 flex flex-wrap items-center justify-between gap-2.5'>
        <div className='flex items-center gap-2'>
          <span className='px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider bg-indigo-600 text-white shadow-xs flex items-center gap-1.5'>
            {isTriple ? (
              <>
                <Layers className='w-3.5 h-3.5' /> Part 7 • Đoạn Ba
              </>
            ) : isDouble ? (
              <>
                <Layers className='w-3.5 h-3.5' /> Part 7 • Đoạn Kép
              </>
            ) : isChat ? (
              <>
                <MessageSquare className='w-3.5 h-3.5' /> Part 7 • Đoạn Chat
              </>
            ) : part === 6 ? (
              <>
                <BookOpen className='w-3.5 h-3.5' /> Part 6 • Hoàn Thành Đoạn
              </>
            ) : (
              <>
                <FileText className='w-3.5 h-3.5' /> Part 7 • Đọc Hiểu
              </>
            )}
          </span>

          {passageType && (
            <span className='text-xs font-medium text-gray-600 dark:text-gray-300 line-clamp-1 italic max-w-md'>
              {passageType}
            </span>
          )}
        </div>

        {/* Font Size Adjuster (A- / A / A+) */}
        <div className='flex items-center gap-1 bg-white dark:bg-gray-800/80 p-1 rounded-xl border border-gray-200 dark:border-gray-700/60 shadow-xs'>
          <button
            type='button'
            onClick={() => setFontSize('sm')}
            title='Cỡ chữ nhỏ'
            className={`px-2 py-1 rounded-lg text-xs font-bold transition-all ${
              fontSize === 'sm'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            A-
          </button>
          <button
            type='button'
            onClick={() => setFontSize('base')}
            title='Cỡ chữ tiêu chuẩn'
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              fontSize === 'base'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            A
          </button>
          <button
            type='button'
            onClick={() => setFontSize('lg')}
            title='Cỡ chữ lớn dễ đọc'
            className={`px-2 py-1 rounded-lg text-xs font-bold transition-all ${
              fontSize === 'lg'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            A+
          </button>
        </div>
      </div>

      {/* Main Passage Content Body */}
      <div
        className={`p-4 sm:p-6 max-h-[500px] overflow-y-auto space-y-5 font-sans ${fontClasses[fontSize].body} ${fontClasses[fontSize].leading}`}
      >
        {docSections.map((section, sIdx) => {
          // Extract header if section starts with === DOCUMENT
          const docHeaderMatch = section.match(/^===\s*DOCUMENT\s*(.*?)\s*===/i)
          const docTitle = docHeaderMatch ? docHeaderMatch[1].trim() : ''
          const cleanSection = docHeaderMatch
            ? section.replace(/^===\s*DOCUMENT.*$/m, '').trim()
            : section

          return (
            <div
              key={sIdx}
              className={`rounded-2xl p-4 sm:p-5 transition-all ${
                hasMultipleDocs
                  ? 'bg-gray-50/90 dark:bg-gray-900/60 border border-gray-200/90 dark:border-gray-800 shadow-xs'
                  : 'bg-transparent'
              }`}
            >
              {docTitle && (
                <div className='flex items-center gap-2 pb-3 mb-3.5 border-b border-gray-200/80 dark:border-gray-800 text-xs sm:text-sm font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400'>
                  {getDocIcon(docTitle)}
                  <span>Tài liệu {docTitle}</span>
                </div>
              )}
              {renderDocContent(cleanSection)}
            </div>
          )
        })}
      </div>
    </div>
  )
}
