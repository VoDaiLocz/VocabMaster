// ============================================
// Sentence Deep Pedagogical Guide & Interactive Explainer
// Step-by-step master guide for absolute beginners to expert sentence builders
// ============================================

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Layers,
  BookOpen,
  Volume2,
  CheckCircle2,
  Sparkles,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Flame,
  Lightbulb,
  ArrowRight,
  RefreshCw,
} from 'lucide-react'
import { SentenceItem } from '@/data/sentence-patterns/types'
import { speakWord } from '@/utils/quiz'

interface SentenceDeepGuideProps {
  sentence: SentenceItem
  defaultExpanded?: boolean
}

type GuideTab = 'steps' | 'tokens' | 'pitfalls' | 'matrix'

export const SentenceDeepGuide: React.FC<SentenceDeepGuideProps> = ({
  sentence,
  defaultExpanded = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)
  const [activeTab, setActiveTab] = useState<GuideTab>('steps')

  // Dynamic analysis of vocabulary tokens with pedagogical roles
  const analyzedTokens = sentence.wordTiles.map((tile, idx) => {
    const cleanWord = tile.replace(/[.,?!'"]/g, '').trim()
    const lower = cleanWord.toLowerCase()

    let role = 'Thành phần câu'
    let roleColor = 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
    let pos = 'Từ vựng'
    let reason = 'Đóng vai trò bổ trợ ý nghĩa trong cấu trúc câu.'

    if (
      [
        'i',
        'you',
        'we',
        'they',
        'he',
        'she',
        'it',
        'my',
        'your',
        'his',
        'her',
        'our',
        'their',
        'the',
        'a',
        'an',
      ].includes(lower) &&
      idx === 0
    ) {
      role = '1. Chủ ngữ (Subject - S)'
      roleColor = 'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border-blue-200'
      pos = 'Đại từ / Danh từ'
      reason = 'Đứng đầu câu để xác định AI hoặc CÁI GÌ là chủ thể thực hiện hành động.'
    } else if (
      [
        'is',
        'am',
        'are',
        'was',
        'were',
        'have',
        'has',
        'do',
        'does',
        'did',
        'drink',
        'drinks',
        'reads',
        'read',
        'speak',
        'speaks',
        'write',
        'writes',
        'go',
        'goes',
        'send',
        'sends',
        'review',
        'build',
        'create',
        'update',
        'test',
      ].includes(lower)
    ) {
      role = '2. Động từ chính (Verb - V)'
      roleColor =
        'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-200'
      pos = 'Động từ (Action Verb)'
      reason =
        'Đứng ngay sau Chủ ngữ để thể hiện hành động cốt lõi. Cần lưu ý chia thì và ngôi số ít/nhiều.'
    } else if (
      ['can', 'could', 'should', 'must', 'will', 'would', 'may', 'might'].includes(lower)
    ) {
      role = 'Trợ / Khiếm khuyết ĐT (Modal Verb)'
      roleColor =
        'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border-purple-200'
      pos = 'Modal Verb'
      reason = 'Đứng trước Động từ chính để thể hiện khả năng, nghĩa vụ hoặc mức độ lịch sự.'
    } else if (
      [
        'fresh',
        'educational',
        'new',
        'good',
        'important',
        'fast',
        'quick',
        'clear',
        'clean',
        'daily',
        'urgent',
      ].includes(lower)
    ) {
      role = 'Tính từ bổ nghĩa (Adjective)'
      roleColor =
        'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200'
      pos = 'Tính từ (Adjective)'
      reason =
        'Quy tắc vàng tiếng Anh: Tính từ luôn đứng TRƯỚC danh từ để miêu tả đặc điểm tính chất.'
    } else if (
      [
        'coffee',
        'books',
        'email',
        'meeting',
        'report',
        'code',
        'database',
        'feature',
        'system',
        'problem',
        'project',
        'breakfast',
      ].includes(lower)
    ) {
      role = '3. Tân ngữ (Object - O)'
      roleColor =
        'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 border-indigo-200'
      pos = 'Danh từ (Noun)'
      reason = 'Đứng sau Động từ để làm đối tượng chịu tác động trực tiếp của hành động.'
    } else if (
      [
        'every',
        'morning',
        'daily',
        'tonight',
        'yesterday',
        'today',
        'now',
        'soon',
        'always',
        'often',
      ].includes(lower) ||
      idx >= sentence.wordTiles.length - 2
    ) {
      role = '4. Trạng ngữ thời gian/nơi chốn'
      roleColor = 'bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 border-teal-200'
      pos = 'Trạng từ / Cụm giới từ'
      reason = 'Đặt ở cuối câu để chỉ rõ thời gian, tần suất hoặc địa điểm thực hiện hành động.'
    } else if (
      ['in', 'on', 'at', 'before', 'after', 'with', 'by', 'for', 'to', 'from'].includes(lower)
    ) {
      role = 'Giới từ liên kết (Preposition)'
      roleColor = 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-200'
      pos = 'Giới từ (Preposition)'
      reason = 'Nối động từ/danh từ với mốc thời gian hoặc địa điểm tiếp theo.'
    }

    return {
      word: cleanWord,
      display: tile,
      role,
      roleColor,
      pos,
      reason,
    }
  })

  // Dynamic substitution matrix generation
  const substitutionSamples = [
    {
      en: sentence.textEn
        .replace(/^I\b/, 'We')
        .replace(/^She\b/, 'They')
        .replace(/reads\b/, 'read'),
      vi: sentence.textVi.replace(/Tôi\b/, 'Chúng tôi').replace(/Cô ấy\b/, 'Họ'),
      tip: 'Đổi chủ ngữ sang số nhiều (We/They) -> Động từ giữ nguyên mẫu!',
    },
    {
      en: sentence.textEn
        .replace(/fresh coffee/, 'warm green tea')
        .replace(/educational books/, 'technical documents'),
      vi: sentence.textVi
        .replace(/cà phê tươi/, 'trà xanh ấm')
        .replace(/sách giáo dục/, 'tài liệu kỹ thuật'),
      tip: 'Giữ nguyên khung ngữ pháp, chỉ thay đổi tân ngữ và tính từ miêu tả!',
    },
    {
      en: sentence.textEn
        .replace(/every morning\b/, 'on weekends')
        .replace(/before sleeping\b/, 'after work'),
      vi: sentence.textVi
        .replace(/mỗi buổi sáng/, 'vào cuối tuần')
        .replace(/trước khi ngủ/, 'sau giờ làm'),
      tip: 'Thay đổi mốc thời gian ở đuôi câu để diễn tả hoàn cảnh mới!',
    },
  ]

  return (
    <div className='w-full rounded-2xl bg-white dark:bg-dark-card border-2 border-primary-300/80 dark:border-primary-800/80 shadow-md overflow-hidden transition-all'>
      {/* Header Toggle Bar */}
      <button
        onClick={() => setIsExpanded((prev) => !prev)}
        className='w-full p-3.5 sm:p-4 flex items-center justify-between gap-2 bg-gradient-to-r from-primary-100/70 via-indigo-50/50 to-emerald-50/50 dark:from-primary-950/60 dark:via-indigo-950/40 dark:to-emerald-950/40 hover:opacity-95 transition-all text-left'
      >
        <div className='flex items-center gap-2.5 sm:gap-3'>
          <div className='p-2.5 rounded-xl bg-primary-600 text-white shadow-sm'>
            <BookOpen size={18} />
          </div>
          <div>
            <div className='flex items-center gap-2 flex-wrap'>
              <h4 className='text-xs sm:text-sm font-bold text-gray-900 dark:text-white font-display flex items-center gap-1.5'>
                <span>📖 Cẩm Nang Đặt Câu Từng Ly Từng Tý Cho Người Mới</span>
                <Sparkles size={14} className='text-amber-500 fill-amber-400' />
              </h4>
              <span className='px-2.5 py-0.5 rounded-full text-[10px] font-black bg-primary-600 text-white shadow-xs'>
                {sentence.pattern}
              </span>
            </div>
            <p className='text-[11px] text-gray-600 dark:text-gray-300 mt-0.5'>
              Bản đồ 4 bước tư duy • Bóc tách vai trò từng từ • Tránh bẫy dịch • Tự tạo 100 câu mới
            </p>
          </div>
        </div>

        <div className='flex items-center gap-2'>
          <span className='text-xs font-bold text-primary-700 dark:text-primary-300 hidden sm:inline bg-white/80 dark:bg-dark-card/80 px-3 py-1 rounded-lg border border-primary-200 dark:border-primary-800'>
            {isExpanded ? 'Thu gọn cẩm nang' : 'Mở cẩm nang chi tiết'}
          </span>
          {isExpanded ? (
            <ChevronUp size={20} className='text-primary-600' />
          ) : (
            <ChevronDown size={20} className='text-primary-600' />
          )}
        </div>
      </button>

      {/* Expandable Deep Pedagogical Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className='p-4 sm:p-5 space-y-5 border-t border-primary-200 dark:border-primary-800/60'
          >
            {/* Tab Navigation Menu */}
            <div className='grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 rounded-xl bg-gray-100 dark:bg-gray-800/90'>
              <button
                onClick={() => setActiveTab('steps')}
                className={`py-2 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'steps'
                    ? 'bg-white dark:bg-dark-card text-primary-600 dark:text-primary-400 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-400'
                }`}
              >
                <Layers size={14} />
                <span>1. Bản Đồ 4 Bước</span>
              </button>

              <button
                onClick={() => setActiveTab('tokens')}
                className={`py-2 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'tokens'
                    ? 'bg-white dark:bg-dark-card text-primary-600 dark:text-primary-400 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-400'
                }`}
              >
                <BookOpen size={14} />
                <span>2. Bóc Tách Từng Từ</span>
              </button>

              <button
                onClick={() => setActiveTab('pitfalls')}
                className={`py-2 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'pitfalls'
                    ? 'bg-white dark:bg-dark-card text-amber-600 dark:text-amber-400 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-400'
                }`}
              >
                <AlertTriangle size={14} />
                <span>3. Bẫy Word-by-Word</span>
              </button>

              <button
                onClick={() => setActiveTab('matrix')}
                className={`py-2 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'matrix'
                    ? 'bg-white dark:bg-dark-card text-emerald-600 dark:text-emerald-400 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-400'
                }`}
              >
                <Flame size={14} />
                <span>4. Tự Tạo 100 Câu</span>
              </button>
            </div>

            {/* ========================================================================= */}
            {/* TAB 1: 4-STEP MENTAL MODEL FOR COMPLETE BEGINNERS */}
            {/* ========================================================================= */}
            {activeTab === 'steps' && (
              <div className='space-y-4 text-xs sm:text-sm text-gray-800 dark:text-gray-200'>
                <div className='p-3.5 rounded-xl bg-primary-50/70 dark:bg-primary-950/40 border border-primary-200 dark:border-primary-900/50 flex items-center justify-between'>
                  <div>
                    <span className='text-xs font-extrabold text-primary-700 dark:text-primary-300 uppercase tracking-wider block'>
                      Mục tiêu tiếng Việt cần diễn đạt:
                    </span>
                    <h3 className='text-base sm:text-lg font-bold text-gray-900 dark:text-white mt-0.5'>
                      "{sentence.textVi}"
                    </h3>
                  </div>
                  <div className='p-2 rounded-xl bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 font-mono font-bold text-xs shrink-0'>
                    {sentence.pattern}
                  </div>
                </div>

                <div className='space-y-3'>
                  <h5 className='text-xs font-extrabold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1.5'>
                    <Sparkles size={14} className='text-primary-600' />
                    Thực hiện tuần tự 4 bước để tự ghép thành câu chuẩn xác:
                  </h5>

                  {/* Step 1 */}
                  <div className='p-3.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/40 flex items-start gap-3'>
                    <span className='w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5'>
                      1
                    </span>
                    <div>
                      <h6 className='font-bold text-blue-900 dark:text-blue-300 text-xs sm:text-sm'>
                        Bước 1: Xác định "AI / CÁI GÌ" (Chủ ngữ - Subject)
                      </h6>
                      <p className='text-xs text-blue-950 dark:text-blue-200 mt-1 leading-relaxed'>
                        Tìm chủ thể thực hiện hành động đặt ngay ở vị trí đầu tiên của câu. Trong
                        câu này chủ ngữ là <strong>"{sentence.wordTiles[0]}"</strong>.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className='p-3.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 flex items-start gap-3'>
                    <span className='w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5'>
                      2
                    </span>
                    <div>
                      <h6 className='font-bold text-emerald-900 dark:text-emerald-300 text-xs sm:text-sm'>
                        Bước 2: Xác định "HÀNH ĐỘNG GÌ" (Động từ - Verb) & Chia thì
                      </h6>
                      <p className='text-xs text-emerald-950 dark:text-emerald-200 mt-1 leading-relaxed'>
                        Đặt động từ đi liền ngay sau Chủ ngữ. {sentence.explanation}
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className='p-3.5 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/40 flex items-start gap-3'>
                    <span className='w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5'>
                      3
                    </span>
                    <div>
                      <h6 className='font-bold text-indigo-900 dark:text-indigo-300 text-xs sm:text-sm'>
                        Bước 3: Xác định "TÁC ĐỘNG VÀO CÁI GÌ" (Tân ngữ - Object)
                      </h6>
                      <p className='text-xs text-indigo-950 dark:text-indigo-200 mt-1 leading-relaxed'>
                        Đặt đối tượng chịu tác động sau động từ. Lưu ý: nếu có tính từ miêu tả,{' '}
                        <strong>Tính từ phải đứng trước Danh từ</strong> (ví dụ:{' '}
                        <em>fresh coffee</em>, không nói <em>coffee fresh</em>).
                      </p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className='p-3.5 rounded-xl bg-teal-50/60 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900/40 flex items-start gap-3'>
                    <span className='w-6 h-6 rounded-full bg-teal-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5'>
                      4
                    </span>
                    <div>
                      <h6 className='font-bold text-teal-900 dark:text-teal-300 text-xs sm:text-sm'>
                        Bước 4: Đặt "NƠI CHỐN / THỜI GIAN" (Place & Time) ở cuối câu
                      </h6>
                      <p className='text-xs text-teal-950 dark:text-teal-200 mt-1 leading-relaxed'>
                        Quy tắc vàng: Thông tin thời gian (
                        <em>every morning, before sleeping...</em>) luôn đẩy ra vị trí sau cùng của
                        câu để giữ cho cấu trúc câu mạch lạc, đúng chuẩn bản ngữ.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB 2: MICRO TOKEN-BY-TOKEN BREAKDOWN */}
            {/* ========================================================================= */}
            {activeTab === 'tokens' && (
              <div className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <h5 className='text-xs font-extrabold text-gray-500 dark:text-gray-400 uppercase tracking-wider'>
                    Bóc tách chi tiết từng khối từ & lý do đứng ở vị trí này:
                  </h5>
                  <span className='text-[11px] text-gray-400'>
                    (Bấm loa 🔊 để nghe phát âm từng từ)
                  </span>
                </div>

                <div className='space-y-3'>
                  {analyzedTokens.map((item, idx) => (
                    <div
                      key={idx}
                      className='p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 space-y-2 hover:border-primary-300 transition-all'
                    >
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2.5'>
                          <span className='w-5 h-5 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs font-bold flex items-center justify-center font-mono'>
                            {idx + 1}
                          </span>
                          <span className='text-base font-bold text-gray-900 dark:text-white font-mono'>
                            "{item.word}"
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${item.roleColor}`}
                          >
                            {item.role}
                          </span>
                          <span className='text-[11px] text-gray-500 dark:text-gray-400 hidden sm:inline'>
                            ({item.pos})
                          </span>
                        </div>

                        <button
                          onClick={() => speakWord(item.word, 1.0)}
                          className='p-1.5 rounded-lg bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-700 text-primary-600 dark:text-primary-400 hover:bg-primary-50 active:scale-95 transition-all shadow-xs'
                          title={`Phát âm từ: ${item.word}`}
                        >
                          <Volume2 size={16} />
                        </button>
                      </div>

                      <div className='pl-7 text-xs text-gray-600 dark:text-gray-300 leading-relaxed'>
                        👉 <strong>Tại sao đặt ở đây:</strong> {item.reason}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB 3: WORD-BY-WORD PITFALLS & CONTRAST */}
            {/* ========================================================================= */}
            {activeTab === 'pitfalls' && (
              <div className='space-y-4 text-xs sm:text-sm text-gray-800 dark:text-gray-200'>
                <div className='p-3.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-200 space-y-1.5'>
                  <div className='flex items-center gap-2 font-bold text-amber-900 dark:text-amber-300 text-sm'>
                    <AlertTriangle size={17} className='text-amber-600 shrink-0' />
                    <span>Lỗi dịch "Word-by-Word" kinh điển cần tuyệt đối tránh:</span>
                  </div>
                  <p className='text-xs leading-relaxed'>
                    Người Việt thường có thói quen nghĩ từ tiếng Việt nào thì dịch ngay từ tiếng Anh
                    đó theo trật tự tiếng Việt. Điều này làm câu bị gượng gạo, sai ngữ pháp và người
                    bản xứ không hiểu được.
                  </p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-3 pt-1'>
                  {/* Wrong translation */}
                  <div className='p-4 rounded-2xl bg-red-50/70 dark:bg-red-950/30 border-2 border-red-200 dark:border-red-900/50 space-y-2'>
                    <div className='flex items-center gap-2 font-bold text-red-700 dark:text-red-400 text-xs sm:text-sm'>
                      <span>❌ Cách dịch sai theo phản xạ tiếng Việt:</span>
                    </div>
                    <p className='font-mono text-sm text-red-900 dark:text-red-200 font-bold bg-white/60 dark:bg-dark-card/60 p-2 rounded-lg'>
                      "I every morning drink coffee fresh"
                    </p>
                    <p className='text-xs text-red-700 dark:text-red-300'>
                      • Sai lầm 1: Đưa thời gian <em>"every morning"</em> chen vào giữa Chủ ngữ và
                      Động từ.
                      <br />• Sai lầm 2: Đặt tính từ <em>"fresh"</em> sau danh từ <em>"coffee"</em>{' '}
                      theo kiểu tiếng Việt (cà phê tươi).
                    </p>
                  </div>

                  {/* Correct Native Thinking */}
                  <div className='p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border-2 border-emerald-300 dark:border-emerald-800/60 space-y-2'>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-2 font-bold text-emerald-700 dark:text-emerald-400 text-xs sm:text-sm'>
                        <CheckCircle2 size={16} />
                        <span>✅ Tư duy chuẩn bản ngữ (English Mindset):</span>
                      </div>
                      <button
                        onClick={() => speakWord(sentence.textEn, 1.0)}
                        className='p-1 rounded-md bg-emerald-200 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-100 hover:bg-emerald-300'
                        title='Nghe câu chuẩn'
                      >
                        <Volume2 size={14} />
                      </button>
                    </div>
                    <p className='font-mono text-sm text-emerald-950 dark:text-white font-bold bg-white/80 dark:bg-dark-card/80 p-2 rounded-lg'>
                      "{sentence.textEn}"
                    </p>
                    <p className='text-xs text-emerald-800 dark:text-emerald-300'>
                      • Đúng quy tắc 1: <strong>I drink fresh coffee</strong> (Hành động và đối
                      tượng đi liền nhau).
                      <br />• Đúng quy tắc 2: Đẩy mốc thời gian <strong>every morning</strong> ra
                      sau cùng.
                    </p>
                  </div>
                </div>

                <div className='p-3.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50 space-y-1.5'>
                  <div className='flex items-center gap-2 font-bold text-indigo-900 dark:text-indigo-300 text-xs'>
                    <Lightbulb size={15} className='text-indigo-600' />
                    <span>Quy tắc khắc cốt ghi tâm:</span>
                  </div>
                  <p className='text-xs text-indigo-950 dark:text-indigo-200 leading-relaxed'>
                    Tiếng Anh là ngôn ngữ <strong>"Trọng Hành Động"</strong>. Trong mọi tình huống
                    giao tiếp, hãy luôn gắn chặt <strong>[Ai] + [Làm gì] + [Cái gì]</strong> lại với
                    nhau trước, rồi mới thêm các yếu tố phụ như thời gian, địa điểm sau cùng!
                  </p>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB 4: SUBSTITUTION MATRIX (SELF-BUILD 100 NEW SENTENCES) */}
            {/* ========================================================================= */}
            {activeTab === 'matrix' && (
              <div className='space-y-4 text-xs sm:text-sm text-gray-800 dark:text-gray-200'>
                <div className='p-3.5 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 border border-emerald-200 dark:border-emerald-800 space-y-1.5'>
                  <div className='flex items-center gap-2 font-bold text-emerald-900 dark:text-emerald-300 text-sm'>
                    <Flame size={17} className='text-emerald-600' />
                    <span>Bí mật của phản xạ: 1 Khung câu = Tự tạo 100 câu mới!</span>
                  </div>
                  <p className='text-xs text-emerald-950 dark:text-emerald-200 leading-relaxed'>
                    Bạn không cần phải học vẹt từng câu. Chỉ cần giữ nguyên khung{' '}
                    <strong>{sentence.pattern}</strong> và thay thế từ ngữ theo tình huống của bạn:
                  </p>
                </div>

                <div className='space-y-3'>
                  <h5 className='text-xs font-extrabold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1.5'>
                    <RefreshCw size={13} className='text-primary-600' />
                    Các câu biến thể tự tạo tương tự (Chạm để nghe phát âm):
                  </h5>

                  {substitutionSamples.map((sample, idx) => (
                    <div
                      key={idx}
                      onClick={() => speakWord(sample.en, 1.0)}
                      className='p-3.5 rounded-xl bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-700 hover:border-emerald-400 dark:hover:border-emerald-600 cursor-pointer shadow-xs transition-all group space-y-1.5'
                      title='Bấm để nghe câu biến thể này'
                    >
                      <div className='flex items-center justify-between'>
                        <span className='font-mono font-bold text-sm sm:text-base text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors'>
                          "{sample.en}"
                        </span>
                        <div className='p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 group-hover:scale-110 transition-transform shrink-0 ml-2'>
                          <Volume2 size={16} />
                        </div>
                      </div>

                      <p className='text-xs text-gray-500 dark:text-gray-400'>
                        Ý nghĩa: "{sample.vi}"
                      </p>

                      <div className='pt-1 text-[11px] font-medium text-emerald-700 dark:text-emerald-300 flex items-center gap-1'>
                        <ArrowRight size={12} />
                        <span>{sample.tip}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
