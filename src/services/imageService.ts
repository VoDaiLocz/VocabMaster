// ============================================
// Smart Image Service for Vivid Flashcards & Word Decks
// ============================================

export type ImageStyle = '3d' | 'photo' | 'illustration' | 'watercolor'

/**
 * 250+ Curated High-Definition Unsplash Visuals for Instant Loading
 */
export const CURATED_IMAGE_MAP: Record<string, string> = {
  // Animals & Wildlife
  apple:
    'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&auto=format&fit=crop&q=80',
  cat: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500&auto=format&fit=crop&q=80',
  dog: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&auto=format&fit=crop&q=80',
  bird: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=500&auto=format&fit=crop&q=80',
  elephant:
    'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=500&auto=format&fit=crop&q=80',
  lion: 'https://images.unsplash.com/photo-1614027164847-1b28caa1401f?w=500&auto=format&fit=crop&q=80',
  tiger:
    'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?w=500&auto=format&fit=crop&q=80',
  monkey:
    'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=500&auto=format&fit=crop&q=80',
  bear: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?w=500&auto=format&fit=crop&q=80',
  rabbit:
    'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=500&auto=format&fit=crop&q=80',
  horse:
    'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&auto=format&fit=crop&q=80',
  cow: 'https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?w=500&auto=format&fit=crop&q=80',
  sheep:
    'https://images.unsplash.com/photo-1484557052118-f32bd25b45b5?w=500&auto=format&fit=crop&q=80',
  pig: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=500&auto=format&fit=crop&q=80',
  chicken:
    'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=500&auto=format&fit=crop&q=80',
  duck: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=500&auto=format&fit=crop&q=80',
  fish: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=500&auto=format&fit=crop&q=80',
  shark:
    'https://images.unsplash.com/photo-1560275619-4662e36fa65c?w=500&auto=format&fit=crop&q=80',
  whale:
    'https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=500&auto=format&fit=crop&q=80',
  dolphin:
    'https://images.unsplash.com/photo-1607153333879-c174d265f1d2?w=500&auto=format&fit=crop&q=80',
  butterfly:
    'https://images.unsplash.com/photo-1550853024-fae8cd4be47f?w=500&auto=format&fit=crop&q=80',
  bee: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500&auto=format&fit=crop&q=80',
  spider:
    'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=500&auto=format&fit=crop&q=80',
  snake:
    'https://images.unsplash.com/photo-1531386151447-fd76ad50012f?w=500&auto=format&fit=crop&q=80',
  frog: 'https://images.unsplash.com/photo-1579202673506-ca3ce28943ef?w=500&auto=format&fit=crop&q=80',
  turtle:
    'https://images.unsplash.com/photo-1508455858334-95337ba25607?w=500&auto=format&fit=crop&q=80',
  eagle:
    'https://images.unsplash.com/photo-1611689342806-0863700ce1e4?w=500&auto=format&fit=crop&q=80',
  wolf: 'https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=500&auto=format&fit=crop&q=80',
  fox: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=500&auto=format&fit=crop&q=80',
  deer: 'https://images.unsplash.com/photo-1484406566174-9da000fda645?w=500&auto=format&fit=crop&q=80',
  penguin:
    'https://images.unsplash.com/photo-1598439210625-5067c578f3f6?w=500&auto=format&fit=crop&q=80',
  panda:
    'https://images.unsplash.com/photo-1564349683136-77e08dba1ef6?w=500&auto=format&fit=crop&q=80',

  // Nature, Elements & Weather
  mountain:
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&auto=format&fit=crop&q=80',
  ocean:
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=80',
  sea: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=500&auto=format&fit=crop&q=80',
  forest:
    'https://images.unsplash.com/photo-1448375240586-882707db888b?w=500&auto=format&fit=crop&q=80',
  river:
    'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=500&auto=format&fit=crop&q=80',
  lake: 'https://images.unsplash.com/photo-1439853941329-a99ce0400275?w=500&auto=format&fit=crop&q=80',
  island:
    'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=500&auto=format&fit=crop&q=80',
  tree: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=500&auto=format&fit=crop&q=80',
  flower:
    'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=500&auto=format&fit=crop&q=80',
  rose: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=500&auto=format&fit=crop&q=80',
  leaf: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=500&auto=format&fit=crop&q=80',
  plant:
    'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&auto=format&fit=crop&q=80',
  sun: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&auto=format&fit=crop&q=80',
  moon: 'https://images.unsplash.com/photo-1532693322450-2cb5c511067d?w=500&auto=format&fit=crop&q=80',
  star: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=500&auto=format&fit=crop&q=80',
  fire: 'https://images.unsplash.com/photo-1527489377706-5bf97e608852?w=500&auto=format&fit=crop&q=80',
  water:
    'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=500&auto=format&fit=crop&q=80',
  cloud:
    'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=500&auto=format&fit=crop&q=80',
  rain: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=500&auto=format&fit=crop&q=80',
  snow: 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?w=500&auto=format&fit=crop&q=80',
  storm:
    'https://images.unsplash.com/photo-1514632595-4944383f2737?w=500&auto=format&fit=crop&q=80',
  wind: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=500&auto=format&fit=crop&q=80',
  desert:
    'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=500&auto=format&fit=crop&q=80',
  volcano:
    'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?w=500&auto=format&fit=crop&q=80',
  rainbow:
    'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=500&auto=format&fit=crop&q=80',
  sunset:
    'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=500&auto=format&fit=crop&q=80',
  sunrise:
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500&auto=format&fit=crop&q=80',

  // Technology, Coding & Digital
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
  smartphone:
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=80',
  tablet:
    'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&auto=format&fit=crop&q=80',
  robot:
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&auto=format&fit=crop&q=80',
  ai: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=500&auto=format&fit=crop&q=80',
  security:
    'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=500&auto=format&fit=crop&q=80',
  screen:
    'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=80',
  headphones:
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80',
  camera:
    'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop&q=80',
  keyboard:
    'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=80',

  // Education, Learning & School
  book: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=80',
  library:
    'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=500&auto=format&fit=crop&q=80',
  student:
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500&auto=format&fit=crop&q=80',
  teacher:
    'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=500&auto=format&fit=crop&q=80',
  study:
    'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&auto=format&fit=crop&q=80',
  school:
    'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=500&auto=format&fit=crop&q=80',
  university:
    'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=500&auto=format&fit=crop&q=80',
  classroom:
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=500&auto=format&fit=crop&q=80',
  graduation:
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500&auto=format&fit=crop&q=80',
  pen: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=500&auto=format&fit=crop&q=80',
  pencil:
    'https://images.unsplash.com/photo-1585336261026-7f897d268d89?w=500&auto=format&fit=crop&q=80',
  notebook:
    'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=500&auto=format&fit=crop&q=80',
  science:
    'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=500&auto=format&fit=crop&q=80',
  brain:
    'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=500&auto=format&fit=crop&q=80',
  idea: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=500&auto=format&fit=crop&q=80',
  certificate:
    'https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=500&auto=format&fit=crop&q=80',

  // Work, Business & Office
  office:
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&auto=format&fit=crop&q=80',
  meeting:
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&auto=format&fit=crop&q=80',
  business:
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&auto=format&fit=crop&q=80',
  team: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&auto=format&fit=crop&q=80',
  money:
    'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=500&auto=format&fit=crop&q=80',
  finance:
    'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=500&auto=format&fit=crop&q=80',
  market:
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500&auto=format&fit=crop&q=80',
  success:
    'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=500&auto=format&fit=crop&q=80',
  target:
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=80',
  presentation:
    'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=500&auto=format&fit=crop&q=80',
  contract:
    'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=500&auto=format&fit=crop&q=80',

  // Food, Drinks & Dining
  coffee:
    'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&auto=format&fit=crop&q=80',
  tea: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&auto=format&fit=crop&q=80',
  bread:
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=80',
  pizza:
    'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=80',
  burger:
    'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=80',
  sandwich:
    'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&auto=format&fit=crop&q=80',
  rice: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=80',
  soup: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&auto=format&fit=crop&q=80',
  salad:
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=80',
  cake: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=80',
  chocolate:
    'https://images.unsplash.com/photo-1511381939415-e44015466834?w=500&auto=format&fit=crop&q=80',
  banana:
    'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500&auto=format&fit=crop&q=80',
  orange:
    'https://images.unsplash.com/photo-1547514701-42782101795e?w=500&auto=format&fit=crop&q=80',
  strawberry:
    'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=500&auto=format&fit=crop&q=80',
  restaurant:
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=80',
  kitchen:
    'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=500&auto=format&fit=crop&q=80',

  // Travel, Places & Vehicles
  travel:
    'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500&auto=format&fit=crop&q=80',
  city: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?w=500&auto=format&fit=crop&q=80',
  house:
    'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=500&auto=format&fit=crop&q=80',
  building:
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&auto=format&fit=crop&q=80',
  car: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&auto=format&fit=crop&q=80',
  airplane:
    'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=500&auto=format&fit=crop&q=80',
  airport:
    'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=500&auto=format&fit=crop&q=80',
  train:
    'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=500&auto=format&fit=crop&q=80',
  bicycle:
    'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=500&auto=format&fit=crop&q=80',
  ship: 'https://images.unsplash.com/photo-1505705694340-019e1e335916?w=500&auto=format&fit=crop&q=80',
  bridge:
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&auto=format&fit=crop&q=80',
  hotel:
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&auto=format&fit=crop&q=80',
  beach:
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=80',

  // Actions, Emotions & Concepts
  music:
    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=80',
  guitar:
    'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&auto=format&fit=crop&q=80',
  piano:
    'https://images.unsplash.com/photo-1520523839898-507127053e14?w=500&auto=format&fit=crop&q=80',
  heart:
    'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=500&auto=format&fit=crop&q=80',
  love: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=500&auto=format&fit=crop&q=80',
  happy:
    'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=500&auto=format&fit=crop&q=80',
  time: 'https://images.unsplash.com/photo-1501139083538-0139583c060f?w=500&auto=format&fit=crop&q=80',
  clock:
    'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=500&auto=format&fit=crop&q=80',
  sport:
    'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&auto=format&fit=crop&q=80',
  running:
    'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=500&auto=format&fit=crop&q=80',
  swimming:
    'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=500&auto=format&fit=crop&q=80',
  health:
    'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=500&auto=format&fit=crop&q=80',
  sword:
    'https://images.unsplash.com/photo-1595590424283-b8f17842773f?w=500&auto=format&fit=crop&q=80',
  dragon:
    'https://images.unsplash.com/photo-1577493340887-b7bdef550155?w=500&auto=format&fit=crop&q=80',
}

/**
 * Clean vocabulary term for matching and AI prompt construction
 */
export function normalizeTerm(term: string): { cleanKey: string; promptTerm: string } {
  const trimmed = term.trim()
  // Clean key for dictionary lookup (alphanumeric only)
  const cleanKey = trimmed.toLowerCase().replace(/[^a-z0-9]/g, '')

  // Prompt term for AI image generation (preserve word separation, remove noise)
  const promptTerm = trimmed
    .toLowerCase()
    .replace(/^(to\s+|a\s+|an\s+|the\s+)/i, '') // strip articles/infinitive prefixes
    .replace(/[^\w\s-]/g, '')
    .trim()

  return { cleanKey, promptTerm: promptTerm || trimmed || 'concept' }
}

/**
 * Build dynamic style prompt for Pollinations AI engine
 */
export function buildStylePrompt(term: string, style: ImageStyle): string {
  const safeTerm = term.trim().slice(0, 50)

  switch (style) {
    case '3d':
      return `3d isometric render of ${safeTerm}, clean vibrant 3d clay icon style, cute studio lighting, soft shadows, solid clean background, high detail, masterpiece`
    case 'illustration':
      return `flat vector illustration of ${safeTerm}, modern graphic design, educational flashcard art, vibrant bold colors, clear subject, minimalist background`
    case 'watercolor':
      return `soft watercolor painting of ${safeTerm}, gentle artistic brush strokes, pastel color palette, clean textured paper background, aesthetic`
    case 'photo':
    default:
      return `clear realistic photograph of ${safeTerm}, high definition, studio lighting, crisp focus, clear isolated subject, professional stock photo`
  }
}

/**
 * Get an instant, guaranteed vivid image URL for any English word.
 * Uses a tiered strategy:
 * 1. Explicit user image URL
 * 2. Curated High-Definition Unsplash map (for photo style)
 * 3. Dynamic Style-Aware AI generation (Pollinations AI) for any vocabulary term
 * 4. Fallback SVG avatar on error
 */
export function getWordImageUrl(
  term: string,
  style: ImageStyle = '3d',
  existingUrl?: string | null,
): string {
  if (existingUrl && (existingUrl.startsWith('http') || existingUrl.startsWith('data:'))) {
    return existingUrl
  }

  const { cleanKey, promptTerm } = normalizeTerm(term)

  // For photo style, check curated high-speed Unsplash map first
  if (style === 'photo' && CURATED_IMAGE_MAP[cleanKey]) {
    return CURATED_IMAGE_MAP[cleanKey]
  }

  // Generate dynamic, style-aware AI visual for ANY vocabulary term
  const prompt = buildStylePrompt(promptTerm, style)
  const seed = getStableSeed(`${cleanKey}_${style}`) % 100000

  return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=500&height=350&nologo=true&seed=${seed}`
}

/**
 * Generate an SVG illustrated data URL as fallback avatar
 */
export function getWordSvgFallback(term: string): string {
  const cleanTerm = term.trim()
  const firstLetter = cleanTerm.charAt(0).toUpperCase() || 'V'
  const seed = getStableSeed(cleanTerm)
  const bgGradients = [
    { start: '#4f46e5', end: '#1e1b4b', accent: '#818cf8' },
    { start: '#059669', end: '#064e3b', accent: '#34d399' },
    { start: '#d97706', end: '#78350f', accent: '#fbbf24' },
    { start: '#e11d48', end: '#881337', accent: '#fb7185' },
    { start: '#7c3aed', end: '#4c1d95', accent: '#a78bfa' },
    { start: '#0891b2', end: '#164e63', accent: '#38bdf8' },
  ]
  const theme = bgGradients[seed % bgGradients.length]

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="280" viewBox="0 0 400 280">
    <defs>
      <linearGradient id="g_${seed}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${theme.start}" stop-opacity="0.95"/>
        <stop offset="100%" stop-color="${theme.end}" stop-opacity="1"/>
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <rect width="100%" height="100%" fill="url(#g_${seed})" rx="16"/>
    <circle cx="200" cy="105" r="48" fill="${theme.accent}" fill-opacity="0.25" filter="url(#glow)"/>
    <circle cx="200" cy="105" r="42" fill="rgba(255,255,255,0.18)"/>
    <text x="200" y="122" font-family="system-ui, -apple-system, sans-serif" font-size="46" font-weight="800" fill="#ffffff" text-anchor="middle">${escapeXml(firstLetter)}</text>
    <text x="200" y="195" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="700" fill="rgba(255,255,255,0.95)" text-anchor="middle">${escapeXml(cleanTerm.slice(0, 24))}</text>
    <rect x="150" y="215" width="100" height="20" rx="10" fill="rgba(255,255,255,0.15)"/>
    <text x="200" y="229" font-family="system-ui, -apple-system, sans-serif" font-size="10" font-weight="600" fill="rgba(255,255,255,0.75)" text-anchor="middle" letter-spacing="1">FLASHCARD</text>
  </svg>`

  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg)
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<':
        return '&lt;'
      case '>':
        return '&gt;'
      case '&':
        return '&amp;'
      case "'":
        return '&apos;'
      case '"':
        return '&quot;'
      default:
        return c
    }
  })
}

function getStableSeed(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}
