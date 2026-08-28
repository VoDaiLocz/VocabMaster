import { memo, useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import { Volume2, Image as ImageIcon, Sparkles } from 'lucide-react'
import type { WordWithProgress } from '@/types'
import { speakWord } from '@/utils/quiz'
import { getWordImageUrl, ImageStyle } from '@/services/imageService'

interface FlipCardProps {
  word: WordWithProgress
  isFlipped: boolean
  onFlip: () => void
}

export const FlipCard = memo(function FlipCard({ word, isFlipped, onFlip }: FlipCardProps) {
  const [imgStyle, setImgStyle] = useState<ImageStyle>('3d')
  const [showImage, setShowImage] = useState<boolean>(true)
  const [imgLoaded, setImgLoaded] = useState<boolean>(false)

  const imageUrl = getWordImageUrl(word.term, imgStyle, word.image_url)

  const handleSpeak = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      speakWord(word.term)
    },
    [word.term],
  )

  const toggleStyle = (e: React.MouseEvent) => {
    e.stopPropagation()
    const styles: ImageStyle[] = ['3d', 'illustration', 'photo', 'watercolor']
    const nextIdx = (styles.indexOf(imgStyle) + 1) % styles.length
    setImgStyle(styles[nextIdx])
    setImgLoaded(false)
  }

  return (
    <div className='perspective-1000 w-full max-w-md mx-auto'>
      <motion.div
        className='relative w-full h-[420px] cursor-pointer'
        onClick={onFlip}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <CardFace>
          {showImage && (
            <div className='relative w-full h-44 mb-3 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-700/50 shadow-inner group'>
              <img
                src={imageUrl}
                alt={word.term}
                onLoad={() => setImgLoaded(true)}
                className={
                  'w-full h-full object-cover transition-all duration-500 ' +
                  (imgLoaded ? 'scale-100 opacity-100' : 'scale-105 opacity-0 blur-sm')
                }
              />
              <button
                onClick={toggleStyle}
                className='absolute top-2 right-2 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-[10px] font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity'
                title='Đổi phong cách ảnh minh họa'
              >
                <Sparkles size={11} className='text-amber-400' />
                <span className='capitalize'>{imgStyle}</span>
              </button>
            </div>
          )}

          <h2 className='text-3xl font-extrabold text-gray-900 dark:text-white mb-1'>
            {word.term}
          </h2>
          {word.phonetic && (
            <p className='text-gray-500 dark:text-gray-400 text-sm font-mono mb-3'>
              {word.phonetic}
            </p>
          )}

          <div className='flex items-center gap-3 mt-1'>
            <button
              onClick={handleSpeak}
              className='p-3 bg-primary-100 dark:bg-primary-900/60 text-primary-600 dark:text-primary-400 rounded-full hover:bg-primary-500 hover:text-white transition-all shadow-sm'
              aria-label='Phát âm'
              title='Phát âm chuẩn'
            >
              <Volume2 size={20} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setShowImage(!showImage)
              }}
              className='p-3 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors'
              title='Bật / Tắt ảnh minh họa'
            >
              <ImageIcon size={18} />
            </button>
          </div>

          <p className='mt-4 text-gray-400 dark:text-gray-500 text-xs font-medium'>
            Chạm để lật xem nghĩa
          </p>
        </CardFace>

        {/* Back */}
        <CardFace isBack>
          <div className='w-full text-center space-y-4'>
            <span className='px-3 py-1 rounded-full text-xs font-bold bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-800'>
              Định Nghĩa
            </span>
            <p className='text-2xl font-bold text-gray-900 dark:text-white leading-relaxed'>
              {word.definition}
            </p>
            {word.example && (
              <div className='p-3.5 rounded-xl bg-gray-50 dark:bg-gray-700/40 border border-gray-100 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-300 italic'>
                "{word.example}"
              </div>
            )}
            <div className='pt-2'>
              <button
                onClick={handleSpeak}
                className='inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary-100 dark:bg-primary-900/60 text-primary-600 dark:text-primary-400 hover:bg-primary-500 hover:text-white text-xs font-bold transition-all'
              >
                <Volume2 size={15} /> Nghe lại: {word.term}
              </button>
            </div>
          </div>
        </CardFace>
      </motion.div>
    </div>
  )
})

// Card face component
interface CardFaceProps {
  children: React.ReactNode
  isBack?: boolean
}

const CardFace = memo(function CardFace({ children, isBack }: CardFaceProps) {
  return (
    <div
      className='absolute inset-0 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center'
      style={{
        backfaceVisibility: 'hidden',
        transform: isBack ? 'rotateY(180deg)' : undefined,
      }}
    >
      {children}
    </div>
  )
})
