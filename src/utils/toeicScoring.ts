// ============================================================================
// BẢNG QUY ĐỔI ĐIỂM TOEIC CHUẨN ETS (SCALE 10 - 990) & PHÂN TÍCH NĂNG LỰC
// ============================================================================

export interface ToeicScoreResult {
  listeningRaw: number
  readingRaw: number
  listeningScaled: number
  readingScaled: number
  totalScaled: number
  percentage: number
  cefrLevel: string
  proficiencyTitle: string
  partBreakdown: { [part: number]: { total: number; correct: number; percentage: number } }
  recommendations: string[]
}

// Bảng barem chuẩn ETS Listening (0 -> 100 câu đúng)
const LISTENING_SCALE: number[] = [
  5, 5, 5, 10, 15, 20, 25, 30, 35, 40, // 0 - 9
  45, 50, 55, 60, 65, 70, 75, 80, 85, 90, // 10 - 19
  95, 100, 105, 110, 115, 120, 125, 130, 135, 140, // 20 - 29
  145, 150, 155, 160, 165, 170, 175, 180, 185, 190, // 30 - 39
  195, 200, 205, 210, 215, 220, 225, 230, 235, 240, // 40 - 49
  245, 250, 255, 260, 265, 270, 275, 280, 285, 290, // 50 - 59
  295, 300, 310, 320, 325, 330, 340, 345, 355, 360, // 60 - 69
  370, 375, 385, 390, 400, 405, 415, 420, 430, 435, // 70 - 79
  445, 450, 460, 465, 470, 475, 480, 485, 490, 495, // 80 - 89
  495, 495, 495, 495, 495, 495, 495, 495, 495, 495, 495 // 90 - 100
]

// Bảng barem chuẩn ETS Reading (0 -> 100 câu đúng)
const READING_SCALE: number[] = [
  5, 5, 5, 5, 10, 15, 20, 25, 30, 35, // 0 - 9
  40, 45, 50, 55, 60, 65, 70, 75, 80, 85, // 10 - 19
  90, 95, 100, 105, 110, 115, 120, 125, 130, 135, // 20 - 29
  140, 145, 150, 155, 160, 165, 170, 175, 180, 185, // 30 - 39
  190, 195, 200, 205, 210, 215, 220, 225, 230, 235, // 40 - 49
  240, 245, 250, 255, 260, 265, 270, 275, 280, 285, // 50 - 59
  290, 295, 300, 305, 315, 320, 325, 335, 340, 350, // 60 - 69
  355, 365, 370, 380, 385, 390, 395, 400, 405, 410, // 70 - 79
  415, 420, 425, 430, 435, 440, 445, 450, 455, 460, // 80 - 89
  465, 470, 475, 480, 485, 490, 495, 495, 495, 495, 495 // 90 - 100
]

export function calculateToeicScore(
  userAnswers: { [qId: string]: number },
  questions: Array<{ id: string; part: number; correctAnswer: number }>
): ToeicScoreResult {
  let listeningRaw = 0
  let listeningTotal = 0
  let readingRaw = 0
  let readingTotal = 0

  const partBreakdown: { [part: number]: { total: number; correct: number; percentage: number } } = {
    1: { total: 0, correct: 0, percentage: 0 },
    2: { total: 0, correct: 0, percentage: 0 },
    3: { total: 0, correct: 0, percentage: 0 },
    4: { total: 0, correct: 0, percentage: 0 },
    5: { total: 0, correct: 0, percentage: 0 },
    6: { total: 0, correct: 0, percentage: 0 },
    7: { total: 0, correct: 0, percentage: 0 },
  }

  questions.forEach((q) => {
    const isListening = q.part >= 1 && q.part <= 4
    const isCorrect = userAnswers[q.id] === q.correctAnswer

    if (isListening) {
      listeningTotal++
      if (isCorrect) listeningRaw++
    } else {
      readingTotal++
      if (isCorrect) readingRaw++
    }

    if (partBreakdown[q.part]) {
      partBreakdown[q.part].total++
      if (isCorrect) partBreakdown[q.part].correct++
    }
  })

  // Normalize raw count to 100-scale if test has fewer or more than 100 questions
  const normListeningRaw = listeningTotal > 0 ? Math.round((listeningRaw / listeningTotal) * 100) : 0
  const normReadingRaw = readingTotal > 0 ? Math.round((readingRaw / readingTotal) * 100) : 0

  const listeningScaled = LISTENING_SCALE[Math.min(100, Math.max(0, normListeningRaw))] || 5
  const readingScaled = READING_SCALE[Math.min(100, Math.max(0, normReadingRaw))] || 5
  const totalScaled = listeningScaled + readingScaled

  // Compute percentages per part
  Object.keys(partBreakdown).forEach((k) => {
    const p = parseInt(k, 10)
    const data = partBreakdown[p]
    data.percentage = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0
  })

  const totalQuestions = listeningTotal + readingTotal
  const totalCorrect = listeningRaw + readingRaw
  const percentage = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0

  // Determine CEFR & Title
  let cefrLevel = 'A1 (Beginner)'
  let proficiencyTitle = 'Mới bắt đầu làm quen'
  if (totalScaled >= 905) {
    cefrLevel = 'C1 (Advanced Master)'
    proficiencyTitle = 'Giao tiếp quốc tế thành thạo như người bản xứ'
  } else if (totalScaled >= 785) {
    cefrLevel = 'B2 (Working Proficiency)'
    proficiencyTitle = 'Làm việc chuyên nghiệp tại tập đoàn đa quốc gia'
  } else if (totalScaled >= 600) {
    cefrLevel = 'B1 (Intermediate)'
    proficiencyTitle = 'Đủ tiêu chuẩn tốt nghiệp đại học & giao tiếp văn phòng'
  } else if (totalScaled >= 450) {
    cefrLevel = 'A2 (Elementary)'
    proficiencyTitle = 'Hiểu các thông báo và trao đổi căn bản'
  }

  // Generate actionable AI recommendations
  const recommendations: string[] = []
  if (partBreakdown[2].percentage < 70) {
    recommendations.push('Part 2 (Hỏi & Đáp) cần rèn luyện phản xạ né bẫy trả lời gián tiếp và bẫy lặp từ/đồng âm.')
  }
  if (partBreakdown[3].percentage < 70 || partBreakdown[4].percentage < 70) {
    recommendations.push('Part 3 & 4 cần đọc trước 3 câu hỏi trước khi audio phát để bắt trúng từ khóa trong bài nói.')
  }
  if (partBreakdown[5].percentage < 75) {
    recommendations.push('Part 5 cần củng cố 17 chuyên đề ngữ pháp, đặc biệt là chia thì động từ và từ loại danh-tính-động-trạng.')
  }
  if (partBreakdown[7].percentage < 70) {
    recommendations.push('Part 7 cần tối ưu tốc độ đọc lướt (Skimming & Scanning) cho đoạn kép và đoạn ba để tránh thiếu giờ.')
  }
  if (recommendations.length === 0) {
    recommendations.push('Phong độ xuất sắc! Hãy duy trì luyện giải các đề ETS 2024 mới nhất để giữ nhịp phản xạ.')
  }

  return {
    listeningRaw,
    readingRaw,
    listeningScaled,
    readingScaled,
    totalScaled,
    percentage,
    cefrLevel,
    proficiencyTitle,
    partBreakdown,
    recommendations
  }
}
