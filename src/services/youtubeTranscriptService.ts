// ============================================
// YouTube Transcript & Bilingual Service
// ============================================

export interface TranscriptCue {
  id: number
  start: number // in seconds
  duration: number // in seconds
  end: number // in seconds
  textEn: string
  textVi: string
  words: string[]
}

export interface VideoInfo {
  videoId: string
  title: string
  channel: string
  thumbnailUrl: string
  durationFormatted?: string
}

// Sample Curated English Learning Videos with Bilingual Transcripts
export const CURATED_LEARNING_VIDEOS: { info: VideoInfo; sampleCues: TranscriptCue[] }[] = [
  {
    info: {
      videoId: 'UF8uR6Z6KLc',
      title: 'Steve Jobs 2005 Stanford Commencement Address',
      channel: 'Stanford University',
      thumbnailUrl: 'https://img.youtube.com/vi/UF8uR6Z6KLc/hqdefault.jpg',
      durationFormatted: '15:04',
    },
    sampleCues: [
      {
        id: 1,
        start: 0.5,
        duration: 4.0,
        end: 4.5,
        textEn: 'I am honored to be with you today at your commencement.',
        textVi: 'Tôi rất vinh hạnh được có mặt cùng các bạn hôm nay tại lễ tốt nghiệp này.',
        words: [
          'I',
          'am',
          'honored',
          'to',
          'be',
          'with',
          'you',
          'today',
          'at',
          'your',
          'commencement.',
        ],
      },
      {
        id: 2,
        start: 4.8,
        duration: 5.2,
        end: 10.0,
        textEn: 'From one of the finest universities in the world.',
        textVi: 'Từ một trong những trường đại học danh giá và xuất sắc nhất trên thế giới.',
        words: ['From', 'one', 'of', 'the', 'finest', 'universities', 'in', 'the', 'world.'],
      },
      {
        id: 3,
        start: 10.5,
        duration: 4.5,
        end: 15.0,
        textEn: 'Truth be told, I never graduated from college.',
        textVi: 'Nói thật lòng, tôi chưa từng tốt nghiệp đại học.',
        words: ['Truth', 'be', 'told,', 'I', 'never', 'graduated', 'from', 'college.'],
      },
      {
        id: 4,
        start: 15.5,
        duration: 5.5,
        end: 21.0,
        textEn: 'And this is the closest I have ever gotten to a college graduation.',
        textVi: 'Và đây là lần tôi tiến gần nhất tới một buổi lễ tốt nghiệp đại học.',
        words: [
          'And',
          'this',
          'is',
          'the',
          'closest',
          'I',
          'have',
          'ever',
          'gotten',
          'to',
          'a',
          'college',
          'graduation.',
        ],
      },
      {
        id: 5,
        start: 21.5,
        duration: 5.0,
        end: 26.5,
        textEn: 'Today, I want to tell you three stories from my life.',
        textVi: 'Hôm nay, tôi muốn kể cho các bạn nghe ba câu chuyện trong cuộc đời tôi.',
        words: [
          'Today,',
          'I',
          'want',
          'to',
          'tell',
          'you',
          'three',
          'stories',
          'from',
          'my',
          'life.',
        ],
      },
      {
        id: 6,
        start: 27.0,
        duration: 3.5,
        end: 30.5,
        textEn: "That's it. No big deal. Just three stories.",
        textVi: 'Chỉ vậy thôi. Không có gì to tát cả. Chỉ là ba câu chuyện.',
        words: ["That's", 'it.', 'No', 'big', 'deal.', 'Just', 'three', 'stories.'],
      },
      {
        id: 7,
        start: 31.0,
        duration: 5.0,
        end: 36.0,
        textEn: 'The first story is about connecting the dots.',
        textVi: 'Câu chuyện đầu tiên là về việc kết nối những dấu chấm.',
        words: ['The', 'first', 'story', 'is', 'about', 'connecting', 'the', 'dots.'],
      },
      {
        id: 8,
        start: 36.5,
        duration: 6.0,
        end: 42.5,
        textEn: 'You have to trust that the dots will somehow connect in your future.',
        textVi:
          'Bạn phải tin tưởng rằng những dấu mốc sẽ bằng cách nào đó kết nối lại trong tương lai của bạn.',
        words: [
          'You',
          'have',
          'to',
          'trust',
          'that',
          'the',
          'dots',
          'will',
          'somehow',
          'connect',
          'in',
          'your',
          'future.',
        ],
      },
      {
        id: 9,
        start: 43.0,
        duration: 5.5,
        end: 48.5,
        textEn: 'Stay Hungry. Stay Foolish.',
        textVi: 'Hãy luôn khao khát. Hãy luôn dại khờ.',
        words: ['Stay', 'Hungry.', 'Stay', 'Foolish.'],
      },
    ],
  },
  {
    info: {
      videoId: 'iG9CE55wbtY',
      title: 'How to Learn Any Language in 6 Months | Chris Lonsdale | TEDx',
      channel: 'TEDx Talks',
      thumbnailUrl: 'https://img.youtube.com/vi/iG9CE55wbtY/hqdefault.jpg',
      durationFormatted: '18:26',
    },
    sampleCues: [
      {
        id: 1,
        start: 0.5,
        duration: 4.5,
        end: 5.0,
        textEn: 'Have you ever wondered why some people learn languages so fast?',
        textVi: 'Bạn đã bao giờ tự hỏi tại sao một số người học ngoại ngữ lại nhanh đến vậy?',
        words: [
          'Have',
          'you',
          'ever',
          'wondered',
          'why',
          'some',
          'people',
          'learn',
          'languages',
          'so',
          'fast?',
        ],
      },
      {
        id: 2,
        start: 5.5,
        duration: 5.0,
        end: 10.5,
        textEn: 'The secret is not about talent, it is about the right principles.',
        textVi:
          'Bí quyết không nằm ở tài năng bẩm sinh, mà nằm ở những nguyên tắc cốt lõi đúng đắn.',
        words: [
          'The',
          'secret',
          'is',
          'not',
          'about',
          'talent,',
          'it',
          'is',
          'about',
          'the',
          'right',
          'principles.',
        ],
      },
      {
        id: 3,
        start: 11.0,
        duration: 5.0,
        end: 16.0,
        textEn: 'Focus on language content that is relevant to you.',
        textVi: 'Hãy tập trung vào nội dung ngôn ngữ có liên quan trực tiếp đến bạn.',
        words: ['Focus', 'on', 'language', 'content', 'that', 'is', 'relevant', 'to', 'you.'],
      },
      {
        id: 4,
        start: 16.5,
        duration: 5.5,
        end: 22.0,
        textEn: 'Use your new language as a tool to communicate from day one.',
        textVi: 'Hãy sử dụng ngôn ngữ mới như một công cụ để giao tiếp ngay từ ngày đầu tiên.',
        words: [
          'Use',
          'your',
          'new',
          'language',
          'as',
          'a',
          'tool',
          'to',
          'communicate',
          'from',
          'day',
          'one.',
        ],
      },
    ],
  },
]

/**
 * Extract YouTube Video ID from standard URLs, Shorts, and embed links
 */
export function extractYouTubeVideoId(url: string): string | null {
  if (!url || typeof url !== 'string') return null

  const trimmed = url.trim()

  // Direct 11-char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed
  }

  // Standard regex patterns
  const patterns = [
    /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
    /^https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
    /^https?:\/\/youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /^https?:\/\/(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /^https?:\/\/(?:www\.)?youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
  ]

  for (const pattern of patterns) {
    const match = trimmed.match(pattern)
    if (match && match[1]) {
      return match[1]
    }
  }

  return null
}

/**
 * Clean text from HTML entities and extra whitespace
 */
function cleanCaptionText(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\n+/g, ' ')
    .trim()
}

/**
 * Parse XML TimedText into cues
 */
function parseTimedTextXml(xmlStr: string): { start: number; dur: number; text: string }[] {
  const parser = new DOMParser()
  const xmlDoc = parser.parseFromString(xmlStr, 'text/xml')
  const textNodes = xmlDoc.getElementsByTagName('text')
  const results: { start: number; dur: number; text: string }[] = []

  for (let i = 0; i < textNodes.length; i++) {
    const node = textNodes[i]
    const start = parseFloat(node.getAttribute('start') || '0')
    const dur = parseFloat(node.getAttribute('dur') || '3')
    const rawText = node.textContent || ''
    const text = cleanCaptionText(rawText)

    if (text) {
      results.push({ start, dur, text })
    }
  }

  return results
}

/**
 * Fetch and build bilingual transcript for a YouTube Video
 */
export async function fetchYouTubeBilingualTranscript(videoId: string): Promise<TranscriptCue[]> {
  // Check if it matches our curated sample database for instant offline experience
  const curated = CURATED_LEARNING_VIDEOS.find((v) => v.info.videoId === videoId)
  if (curated) {
    return curated.sampleCues
  }

  // Attempt to fetch public YouTube timed text directly
  try {
    const proxyBase = 'https://api.allorigins.win/raw?url='
    const enUrl = encodeURIComponent(`https://www.youtube.com/api/timedtext?v=${videoId}&lang=en`)
    const viUrl = encodeURIComponent(
      `https://www.youtube.com/api/timedtext?v=${videoId}&lang=en&tlang=vi`,
    )

    const [enRes, viRes] = await Promise.allSettled([
      fetch(`${proxyBase}${enUrl}`),
      fetch(`${proxyBase}${viUrl}`),
    ])

    let enData = ''
    let viData = ''

    if (enRes.status === 'fulfilled' && enRes.value.ok) {
      enData = await enRes.value.text()
    }
    if (viRes.status === 'fulfilled' && viRes.value.ok) {
      viData = await viRes.value.text()
    }

    if (enData && enData.includes('<text')) {
      const enParsed = parseTimedTextXml(enData)
      const viParsed = viData && viData.includes('<text') ? parseTimedTextXml(viData) : []

      const cues: TranscriptCue[] = enParsed.map((item, idx) => {
        const viMatch = viParsed.find((v) => Math.abs(v.start - item.start) < 1.0)
        return {
          id: idx + 1,
          start: Math.round(item.start * 100) / 100,
          duration: Math.round(item.dur * 100) / 100,
          end: Math.round((item.start + item.dur) * 100) / 100,
          textEn: item.text,
          textVi: viMatch ? viMatch.text : 'Đang dịch ngữ cảnh...',
          words: item.text.split(/\s+/).filter(Boolean),
        }
      })

      if (cues.length > 0) {
        return cues
      }
    }
  } catch (err) {
    console.warn(
      '[TranscriptService] Direct timedtext fetch failed, falling back to simulated transcript:',
      err,
    )
  }

  // Fallback demo transcript for videos without extracted sub
  return [
    {
      id: 1,
      start: 0,
      duration: 5,
      end: 5,
      textEn: 'Welcome to this English video lesson.',
      textVi: 'Chào mừng bạn đến với bài học tiếng Anh qua video này.',
      words: ['Welcome', 'to', 'this', 'English', 'video', 'lesson.'],
    },
    {
      id: 2,
      start: 5.5,
      duration: 6,
      end: 11.5,
      textEn: 'Click any word in the transcript below to see its definition.',
      textVi: 'Nhấp vào bất kỳ từ nào trong phụ đề bên dưới để xem định nghĩa.',
      words: [
        'Click',
        'any',
        'word',
        'in',
        'the',
        'transcript',
        'below',
        'to',
        'see',
        'its',
        'definition.',
      ],
    },
    {
      id: 3,
      start: 12,
      duration: 6,
      end: 18,
      textEn: 'You can easily save new vocabulary directly into your Flashcard decks!',
      textVi: 'Bạn có thể dễ dàng lưu từ vựng mới trực tiếp vào các bộ Flashcard của mình!',
      words: [
        'You',
        'can',
        'easily',
        'save',
        'new',
        'vocabulary',
        'directly',
        'into',
        'your',
        'Flashcard',
        'decks!',
      ],
    },
  ]
}
