// ============================================
// Smart Image Service for Vivid Flashcards
// ============================================

export type ImageStyle = '3d' | 'photo' | 'illustration' | 'watercolor'

/**
 * Curated high-res educational illustrations for core vocabulary
 */
const CURATED_IMAGE_MAP: Record<string, string> = {
  apple:
    'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&auto=format&fit=crop&q=80',
  cat: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&auto=format&fit=crop&q=80',
  dog: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&auto=format&fit=crop&q=80',
  mountain:
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&auto=format&fit=crop&q=80',
  ocean:
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&auto=format&fit=crop&q=80',
  sword:
    'https://images.unsplash.com/photo-1595590424283-b8f17842773f?w=400&auto=format&fit=crop&q=80',
  dragon:
    'https://images.unsplash.com/photo-1577493340887-b7bdef550155?w=400&auto=format&fit=crop&q=80',
  star: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=400&auto=format&fit=crop&q=80',
  book: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=80',
  computer:
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&auto=format&fit=crop&q=80',
  forest:
    'https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&auto=format&fit=crop&q=80',
  fire: 'https://images.unsplash.com/photo-1527489377706-5bf97e608852?w=400&auto=format&fit=crop&q=80',
  water:
    'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400&auto=format&fit=crop&q=80',
  sun: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&auto=format&fit=crop&q=80',
  moon: 'https://images.unsplash.com/photo-1532693322450-2cb5c511067d?w=400&auto=format&fit=crop&q=80',
}

/**
 * Get an instant vivid image URL for any English word or phrase
 */
export function getWordImageUrl(
  term: string,
  style: ImageStyle = '3d',
  existingUrl?: string | null,
): string {
  if (existingUrl && existingUrl.startsWith('http')) {
    return existingUrl
  }

  const cleanTerm = term.trim().toLowerCase()
  if (CURATED_IMAGE_MAP[cleanTerm]) {
    return CURATED_IMAGE_MAP[cleanTerm]
  }

  let prompt = ''
  switch (style) {
    case '3d':
      prompt = `vibrant 3D digital icon of ${cleanTerm}, isometric, colorful, soft studio lighting, cute design, transparent clean background, 8k resolution`
      break
    case 'illustration':
      prompt = `modern minimalist vector flat art illustration of ${cleanTerm}, elegant color palette, high quality`
      break
    case 'watercolor':
      prompt = `artistic soft watercolor painting of ${cleanTerm}, delicate strokes, pastel aesthetic`
      break
    case 'photo':
    default:
      prompt = `professional clean studio photography of ${cleanTerm}, high definition, sharp focus`
      break
  }

  const encodedPrompt = encodeURIComponent(prompt)
  return `https://image.pollinations.ai/prompt/${encodedPrompt}?width=400&height=280&nologo=true&seed=${getStableSeed(cleanTerm)}`
}

/**
 * Simple stable hash to keep image consistent per word
 */
function getStableSeed(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash) % 100000
}
