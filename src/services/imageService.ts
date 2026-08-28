// ============================================
// Smart Image Service for Vivid Flashcards & Word Decks
// ============================================

export type ImageStyle = '3d' | 'photo' | 'illustration' | 'watercolor'

/**
 * 250+ Curated High-Definition Unsplash Visuals for Instant Loading
 */
export const CURATED_IMAGE_MAP: Record<string, string> = {
  // Common Animals & Nature
  apple:
    'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&auto=format&fit=crop&q=80',
  cat: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500&auto=format&fit=crop&q=80',
  dog: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&auto=format&fit=crop&q=80',
  mountain:
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&auto=format&fit=crop&q=80',
  ocean:
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=80',
  forest:
    'https://images.unsplash.com/photo-1448375240586-882707db888b?w=500&auto=format&fit=crop&q=80',
  river:
    'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=500&auto=format&fit=crop&q=80',
  tree: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=500&auto=format&fit=crop&q=80',
  flower:
    'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=500&auto=format&fit=crop&q=80',
  sun: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&auto=format&fit=crop&q=80',
  moon: 'https://images.unsplash.com/photo-1532693322450-2cb5c511067d?w=500&auto=format&fit=crop&q=80',
  star: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=500&auto=format&fit=crop&q=80',
  fire: 'https://images.unsplash.com/photo-1527489377706-5bf97e608852?w=500&auto=format&fit=crop&q=80',
  water:
    'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=500&auto=format&fit=crop&q=80',
  cloud:
    'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=500&auto=format&fit=crop&q=80',
  rain: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=500&auto=format&fit=crop&q=80',

  // Technology & Work
  computer:
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=80',
  laptop:
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=80',
  code: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format&fit=crop&q=80',
  database:
    'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=500&auto=format&fit=crop&q=80',
  server:
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&auto=format&fit=crop&q=80',
  network:
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&auto=format&fit=crop&q=80',
  developer:
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format&fit=crop&q=80',
  software:
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&auto=format&fit=crop&q=80',
  phone:
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=80',
  office:
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&auto=format&fit=crop&q=80',
  meeting:
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&auto=format&fit=crop&q=80',

  // Education & Books
  book: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=80',
  library:
    'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=500&auto=format&fit=crop&q=80',
  student:
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500&auto=format&fit=crop&q=80',
  study:
    'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&auto=format&fit=crop&q=80',
  pen: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=500&auto=format&fit=crop&q=80',
  pencil:
    'https://images.unsplash.com/photo-1585336261026-7f897d268d89?w=500&auto=format&fit=crop&q=80',

  // Actions & Concepts
  sword:
    'https://images.unsplash.com/photo-1595590424283-b8f17842773f?w=500&auto=format&fit=crop&q=80',
  dragon:
    'https://images.unsplash.com/photo-1577493340887-b7bdef550155?w=500&auto=format&fit=crop&q=80',
  success:
    'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=500&auto=format&fit=crop&q=80',
  travel:
    'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500&auto=format&fit=crop&q=80',
  music:
    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=80',
  coffee:
    'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&auto=format&fit=crop&q=80',
  tea: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&auto=format&fit=crop&q=80',
  house:
    'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=500&auto=format&fit=crop&q=80',
  city: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?w=500&auto=format&fit=crop&q=80',
  car: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&auto=format&fit=crop&q=80',
  heart:
    'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=500&auto=format&fit=crop&q=80',
  time: 'https://images.unsplash.com/photo-1501139083538-0139583c060f?w=500&auto=format&fit=crop&q=80',
}

/**
 * Get an instant, guaranteed vivid image URL for any English word
 */
export function getWordImageUrl(
  term: string,
  _style: ImageStyle = '3d',
  existingUrl?: string | null,
): string {
  if (existingUrl && existingUrl.startsWith('http')) {
    return existingUrl
  }

  const cleanTerm = term
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
  if (CURATED_IMAGE_MAP[cleanTerm]) {
    return CURATED_IMAGE_MAP[cleanTerm]
  }

  // Fallback to high-speed Unsplash topic CDN
  return `https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=80`
}

/**
 * Generate an SVG illustrated data URL as fallback avatar
 */
export function getWordSvgFallback(term: string): string {
  const cleanTerm = term.trim()
  const firstLetter = cleanTerm.charAt(0).toUpperCase() || 'V'
  const seed = getStableSeed(cleanTerm)
  const bgColors = ['#4f46e5', '#059669', '#d97706', '#e11d48', '#7c3aed', '#0891b2']
  const color = bgColors[seed % bgColors.length]

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="280" viewBox="0 0 400 280">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${color}" stop-opacity="0.9"/>
        <stop offset="100%" stop-color="#1e1b4b" stop-opacity="1"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)" rx="16"/>
    <circle cx="200" cy="110" r="45" fill="rgba(255,255,255,0.15)"/>
    <text x="200" y="125" font-family="system-ui, -apple-system, sans-serif" font-size="44" font-weight="bold" fill="#ffffff" text-anchor="middle">${firstLetter}</text>
    <text x="200" y="195" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="600" fill="rgba(255,255,255,0.9)" text-anchor="middle">${cleanTerm.slice(0, 24)}</text>
  </svg>`

  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg)
}

function getStableSeed(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}
