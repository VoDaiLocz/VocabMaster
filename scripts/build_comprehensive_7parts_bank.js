const fs = require('fs');
const path = require('path');

function readJsonl(filePath) {
  if (!fs.existsSync(filePath)) return [];
  return fs.readFileSync(filePath, 'utf-8').split('\n').filter(Boolean).map(l => JSON.parse(l));
}

const unifiedList = [];

// 1. PART 1 (Photographs)
const p1Raw = readJsonl('/home/vodailoc/toeci/data/manual-extraction/taking-toeic-1/part1-house/items.jsonl');
p1Raw.forEach((q, idx) => {
  const choicesArr = [q.choices.A, q.choices.B, q.choices.C, q.choices.D];
  const correctIdx = ['A', 'B', 'C', 'D'].indexOf(q.correctAnswer);
  const audioFile = q.audioRelativePath ? path.basename(q.audioRelativePath).replace(/\s+/g, '_') : '';
  const imgFile = q.imageRelativePath ? path.basename(q.imageRelativePath) : '';

  unifiedList.push({
    id: `q-p1-${q.questionNumber || idx + 1}`,
    part: 1,
    partName: 'Part 1: Mô tả ảnh (Photographs)',
    questionNumber: q.questionNumber || idx + 1,
    question: 'Look at the photograph and choose the statement that best describes what you see in the picture.',
    audioUrl: audioFile ? `audio/toeic/${audioFile}` : '',
    imageUrl: imgFile ? `images/toeic/${imgFile}` : '',
    options: choicesArr,
    correctAnswer: correctIdx >= 0 ? correctIdx : 0,
    transcript: `(A) ${choicesArr[0]} | (B) ${choicesArr[1]} | (C) ${choicesArr[2]} | (D) ${choicesArr[3]}`,
    detailedExplanation: `Phương án ${q.correctAnswer} miêu tả chính xác nhất hành động/đối tượng trong bức ảnh: "${q.correctAnswerText || choicesArr[correctIdx]}". Các phương án khác đưa ra hành động sai hoặc không có trong hình.`,
    examTrap: 'Bẫy đề thi Part 1 thường sử dụng thì hiện tại tiếp diễn bị động (is being + V3) cho vật thể không có người tác động, hoặc các từ đồng âm/gần âm để gây nhiễu.',
    translation: `Dịch câu trả lời đúng: ${q.correctAnswerText || choicesArr[correctIdx]}`
  });
});

// 2. PART 2 (Question - Response)
const p2Raw = readJsonl('/home/vodailoc/toeci/data/manual-extraction/taking-toeic-1/listening-part2-3-4/items.jsonl');
p2Raw.forEach((q, idx) => {
  const choicesArr = [q.options.A, q.options.B, q.options.C];
  const correctIdx = ['A', 'B', 'C'].indexOf(q.correctAnswer);
  const audioFile = q.audioRelativePath ? path.basename(q.audioRelativePath).replace(/\s+/g, '_') : '';

  unifiedList.push({
    id: q.questionId || `q-p2-${idx + 1}`,
    part: 2,
    partName: 'Part 2: Hỏi & Đáp (Question-Response)',
    questionNumber: q.questionNumber || idx + 1,
    question: q.prompt || 'Listen to the question and select the best response.',
    audioUrl: audioFile ? `audio/toeic/${audioFile}` : '',
    options: choicesArr,
    correctAnswer: correctIdx >= 0 ? correctIdx : 0,
    transcript: q.transcript || '',
    detailedExplanation: q.learnerExplanation || `Phương án ${q.correctAnswer} là câu phản hồi hợp lý nhất cho câu hỏi.`,
    examTrap: 'Bẫy Part 2 phổ biến nhất là bẫy lặp từ (Same-sound trap): đề bài lặp lại từ trong câu hỏi ở phương án sai để lừa thí sinh nghe bắt từ.',
    translation: `Câu hỏi: ${q.prompt}`
  });
});

// 3. PART 3 (Conversations)
const p3Files = [
  '/home/vodailoc/toeci/data/manual-extraction/taking-toeic-1/listening-part2-3-4/workplace-dilemmas-114-117.jsonl',
  '/home/vodailoc/toeci/data/manual-extraction/taking-toeic-1/listening-part2-3-4/staffing-changes-119-122.jsonl',
  '/home/vodailoc/toeci/data/manual-extraction/taking-toeic-1/listening-part2-3-4/daily-life-and-travel-124-132.jsonl',
  '/home/vodailoc/toeci/data/manual-extraction/taking-toeic-1/listening-part2-3-4/graphic-supported-118-161.jsonl'
];
let p3Count = 0;
p3Files.forEach(f => {
  const items = readJsonl(f).filter(x => x.toeicPart === 3);
  items.forEach(q => {
    p3Count++;
    const choicesArr = [q.options.A, q.options.B, q.options.C, q.options.D];
    const correctIdx = ['A', 'B', 'C', 'D'].indexOf(q.correctAnswer);
    const audioFile = q.audioRelativePath ? path.basename(q.audioRelativePath).replace(/\s+/g, '_') : '';
    const imgFile = q.imageRelativePath ? path.basename(q.imageRelativePath) : '';

    unifiedList.push({
      id: q.questionId || `q-p3-${p3Count}`,
      part: 3,
      partName: 'Part 3: Đoạn hội thoại (Conversations)',
      questionNumber: q.questionNumber || p3Count,
      groupId: q.groupId || '',
      question: q.prompt || 'Listen to the conversation and answer the question.',
      audioUrl: audioFile ? `audio/toeic/${audioFile}` : '',
      imageUrl: imgFile ? `images/toeic/${imgFile}` : '',
      options: choicesArr,
      correctAnswer: correctIdx >= 0 ? correctIdx : 0,
      transcript: q.transcript || '',
      detailedExplanation: q.learnerExplanation || `Phương án ${q.correctAnswer} là câu trả lời đúng dựa theo nội dung đối thoại.`,
      examTrap: 'Bẫy Part 3 thường nằm ở các từ phủ định (hardly, rarely) hoặc người nói thay đổi ý định giữa chừng (Actually, However...).',
      translation: `Câu hỏi: ${q.prompt}`
    });
  });
});

// 4. PART 4 (Short Talks)
const p4Files = [
  '/home/vodailoc/toeci/data/manual-extraction/taking-toeic-1/listening-part2-3-4/part4-ads-broadcasts-tours-152-160.jsonl',
  '/home/vodailoc/toeci/data/manual-extraction/taking-toeic-1/listening-part2-3-4/part4-telephone-messages-148-151.jsonl',
  '/home/vodailoc/toeci/data/manual-extraction/taking-toeic-1/listening-part2-3-4/graphic-supported-118-161.jsonl'
];
let p4Count = 0;
p4Files.forEach(f => {
  const items = readJsonl(f).filter(x => x.toeicPart === 4);
  items.forEach(q => {
    p4Count++;
    const choicesArr = [q.options.A, q.options.B, q.options.C, q.options.D];
    const correctIdx = ['A', 'B', 'C', 'D'].indexOf(q.correctAnswer);
    const audioFile = q.audioRelativePath ? path.basename(q.audioRelativePath).replace(/\s+/g, '_') : '';
    const imgFile = q.imageRelativePath ? path.basename(q.imageRelativePath) : '';

    unifiedList.push({
      id: q.questionId || `q-p4-${p4Count}`,
      part: 4,
      partName: 'Part 4: Bài nói ngắn (Short Talks)',
      questionNumber: q.questionNumber || p4Count,
      groupId: q.groupId || '',
      question: q.prompt || 'Listen to the talk and answer the question.',
      audioUrl: audioFile ? `audio/toeic/${audioFile}` : '',
      imageUrl: imgFile ? `images/toeic/${imgFile}` : '',
      options: choicesArr,
      correctAnswer: correctIdx >= 0 ? correctIdx : 0,
      transcript: q.transcript || '',
      detailedExplanation: q.learnerExplanation || `Phương án ${q.correctAnswer} là câu trả lời chính xác theo nội dung bài nói.`,
      examTrap: 'Bẫy Part 4 thường hỏi mục đích tổng thể hoặc chi tiết số liệu, ngày tháng dễ nhầm lẫn.',
      translation: `Câu hỏi: ${q.prompt}`
    });
  });
});

// 5. PART 5 (Incomplete Sentences)
const p5Raw = JSON.parse(fs.readFileSync('src/data/extractedQuestionBank.json', 'utf-8'));
p5Raw.forEach((q, idx) => {
  unifiedList.push({
    id: q.id || `q-p5-${idx + 1}`,
    part: 5,
    partName: 'Part 5: Hoàn thành câu (Incomplete Sentences)',
    questionNumber: idx + 1,
    topicId: q.topicId || 'general',
    topicName: q.topicName || 'Ngữ pháp chung',
    question: q.question,
    options: q.options,
    correctAnswer: q.correctAnswer,
    detailedExplanation: q.detailedExplanation,
    examTrap: q.examTrap,
    translation: q.translation
  });
});

// 6. PART 6 & PART 7 (Reading Passages)
const p67Raw = readJsonl('/home/vodailoc/toeci/data/manual-extraction/sparta-lcrc-reading-tests-part6-7-from-txt.jsonl');
p67Raw.forEach((q, idx) => {
  const choicesArr = [q.options.A, q.options.B, q.options.C, q.options.D];
  const correctIdx = ['A', 'B', 'C', 'D'].indexOf(q.correctAnswer);
  const isPart6 = q.toeicPart === 6;

  unifiedList.push({
    id: `q-p${q.toeicPart}-${q.questionNumber || idx + 1}`,
    part: q.toeicPart,
    partName: isPart6 ? 'Part 6: Điền đoạn văn (Text Completion)' : 'Part 7: Đọc hiểu văn bản (Reading Comprehension)',
    questionNumber: q.questionNumber || idx + 1,
    groupId: q.groupId || '',
    question: q.prompt || (isPart6 ? `Complete blank (${q.questionNumber}) in the passage.` : 'Answer the question based on the reading passage.'),
    passageText: q.passageText || '',
    passageType: q.passageType || '',
    options: choicesArr,
    correctAnswer: correctIdx >= 0 ? correctIdx : 0,
    detailedExplanation: `Phương án ${q.correctAnswer} là đáp án chính xác thỏa mãn ngữ cảnh của đoạn văn.`,
    examTrap: isPart6 ? 'Bẫy Part 6: Chú ý câu trước và câu sau chỗ trống để xác định liên từ và thời thì phù hợp.' : 'Bẫy Part 7: Tránh suy diễn quá mức, chỉ chọn các thông tin được khẳng định trực tiếp hoặc ngụ ý rõ trong đoạn văn.',
    translation: q.passageType ? `Loại văn bản: ${q.passageType}` : ''
  });
});

console.log(`Successfully compiled ${unifiedList.length} unified TOEIC questions.`);

// Summary by part
const summary = {};
unifiedList.forEach(q => { summary[q.part] = (summary[q.part] || 0) + 1; });
console.log('Summary by Part:', summary);

const outPath = 'src/data/toeic_7parts_comprehensive_bank.json';
fs.writeFileSync(outPath, JSON.stringify(unifiedList, null, 2), 'utf-8');
console.log(`Saved unified database to ${outPath} (${(fs.statSync(outPath).size / 1024 / 1024).toFixed(2)} MB)`);
