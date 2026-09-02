import fs from 'fs'
import path from 'path'

const METADATA_FILE = path.join(process.cwd(), 'src/data/offline_se_videos_metadata.json')
const OUTPUT_FILE = path.join(process.cwd(), 'src/data/offline_transcripts.json')

const INSTANCES = [
  'https://invidious.nerdvpn.de',
  'https://vid.puffyan.us',
  'https://invidious.drgns.space',
  'https://invidious.adminforge.de',
  'https://invidious.slipfox.xyz',
  'https://invidious.protokolla.fi',
  'https://iv.ggtyler.dev',
]

async function fetchFromInvidious(videoId) {
  for (const instance of INSTANCES) {
    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 8000)
      const res = await fetch(`${instance}/api/v1/captions/${videoId}?format=vtt`, { signal: controller.signal })
      clearTimeout(timeout)
      
      if (!res.ok) continue
      const data = await res.json()
      
      // Lấy phụ đề tiếng Anh
      const enCaption = data.captions?.find(c => c.language_code.startsWith('en'))
      if (!enCaption) continue
      
      // Tải nội dung
      const vttRes = await fetch(instance + enCaption.url)
      if (!vttRes.ok) continue
      
      const text = await vttRes.text()
      if (text.includes('WEBVTT')) {
        return text
      }
    } catch (e) {
      continue
    }
  }
  return null
}

function parseVttToCues(vttText) {
  const lines = vttText.split('\n')
  const cues = []
  let currentCue = null
  let idCounter = 1

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line || line === 'WEBVTT') continue

    if (line.includes('-->')) {
      const parts = line.split('-->')
      const start = parseTime(parts[0])
      const end = parseTime(parts[1])
      
      currentCue = {
        id: idCounter++,
        start,
        end,
        duration: end - start,
        textEn: '',
        textVi: '... (Bản dịch đang được tải) ...', // Offline data, tạm thời
        words: []
      }
      cues.push(currentCue)
    } else if (currentCue) {
      if (currentCue.textEn) currentCue.textEn += ' ' + line
      else currentCue.textEn = line
      
      // Cleanup tags like <c> or </c>
      currentCue.textEn = currentCue.textEn.replace(/<[^>]+>/g, '').trim()
    }
  }
  
  // Format words
  for (const c of cues) {
    c.words = c.textEn.split(/\s+/).filter(Boolean)
  }

  return cues
}

function parseTime(timeStr) {
  const t = timeStr.trim().split(':')
  if (t.length === 3) {
    return parseFloat(t[0]) * 3600 + parseFloat(t[1]) * 60 + parseFloat(t[2])
  } else if (t.length === 2) {
    return parseFloat(t[0]) * 60 + parseFloat(t[1])
  }
  return 0
}

async function run() {
  console.log('🚀 Bắt đầu cào dữ liệu Offline bằng Invidious...')
  const rawMetadata = fs.readFileSync(METADATA_FILE, 'utf-8')
  const videos = JSON.parse(rawMetadata)
  
  let db = {}
  if (fs.existsSync(OUTPUT_FILE)) {
    db = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf-8'))
  }

  for (let i = 0; i < videos.length; i++) {
    const vid = videos[i].videoId
    if (db[vid] && db[vid].length > 0) {
      console.log(`[${i + 1}/${videos.length}] Đã có sẵn: ${vid} - Bỏ qua.`)
      continue
    }

    console.log(`[${i + 1}/${videos.length}] Đang cào phụ đề cho: ${vid} - ${videos[i].title}...`)
    const vtt = await fetchFromInvidious(vid)
    if (vtt) {
      const cues = parseVttToCues(vtt)
      if (cues.length > 0) {
        db[vid] = cues
        console.log(`   -> Thành công: Tải được ${cues.length} câu.`)
        // Save incremental
        fs.writeFileSync(OUTPUT_FILE, JSON.stringify(db, null, 2))
      } else {
        console.log(`   -> Lỗi: Phân tích VTT rỗng.`)
      }
    } else {
      console.log(`   -> Thất bại: Invidious API không trả về dữ liệu.`)
    }
    
    await new Promise(r => setTimeout(r, 1000))
  }
  
  console.log(`✅ Hoàn tất! Đã lưu toàn bộ vào ${OUTPUT_FILE}`)
}

run()
