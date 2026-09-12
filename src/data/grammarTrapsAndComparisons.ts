// ============================================================================
// DỮ LIỆU BẢNG SO SÁNH NGỮ PHÁP & CẨM NANG BẪY ĐỀ THI TOEIC KINH ĐIỂN
// Được chuẩn hóa theo ngân hàng đề ETS và giáo trình luyện thi quốc tế
// ============================================================================

export interface ComparisonMatrixItem {
  id: string
  title: string
  category: string
  conceptA: {
    name: string
    formula: string
    usage: string
    exampleEn: string
    exampleVi: string
  }
  conceptB: {
    name: string
    formula: string
    usage: string
    exampleEn: string
    exampleVi: string
  }
  keyDifferentiator: string
  examTrapWarning: string
}

export interface GrammarExamTrap {
  id: string
  topicId: string
  topicName: string
  trapTitle: string
  trapType: 'Word Choice' | 'Tense Confusion' | 'Structure Trap' | 'Agreement Trap' | 'Passive Distortion'
  incorrectExample: string
  correctExample: string
  deepAnalysis: string
  etsTestFrequency: 'Rất cao (90%)' | 'Cao (75%)' | 'Trung bình (50%)'
}

export const COMPARISON_MATRICES: ComparisonMatrixItem[] = [
  {
    id: 'cmp-01',
    title: 'Hiện Tại Hoàn Thành (Present Perfect) vs. Quá Khứ Đơn (Past Simple)',
    category: 'Tenses',
    conceptA: {
      name: 'Hiện Tại Hoàn Thành (have/has + V3/ed)',
      formula: 'S + have/has + V3/ed',
      usage: 'Diễn tả hành động xảy ra trong quá khứ nhưng KHÔNG nêu rõ thời gian cụ thể, hoặc hành động bắt đầu trong quá khứ và vẫn đang tiếp diễn/để lại kết quả ở hiện tại.',
      exampleEn: 'Mr. Tanaka has managed the Tokyo branch for over five years.',
      exampleVi: 'Ông Tanaka đã và đang quản lý chi nhánh Tokyo được hơn năm năm rồi (hiện tại vẫn quản lý).'
    },
    conceptB: {
      name: 'Quá Khứ Đơn (V2/ed / did not + V_inf)',
      formula: 'S + V2/ed',
      usage: 'Diễn tả hành động đã chấm dứt hoàn toàn tại một mốc thời gian xác định trong quá khứ (yesterday, last month, ago, in 2021).',
      exampleEn: 'Mr. Tanaka managed the Tokyo branch from 2015 to 2020.',
      exampleVi: 'Ông Tanaka đã quản lý chi nhánh Tokyo từ năm 2015 đến 2020 (nay không còn quản lý nữa).'
    },
    keyDifferentiator: 'Dấu hiệu thời gian quyết định: Nếu câu có "since / for / recently / yet / already" -> Hiện tại hoàn thành; nếu có mốc quá khứ dứt khoát "yesterday / last / ago / in [năm quá khứ]" -> BẮT BUỘC dùng Quá khứ đơn.',
    examTrapWarning: 'Bẫy ETS thường đưa ra từ "recently / lately" (dùng HTHT) nằm xen kẽ với "last week" để gây nhầm lẫn; hoặc đưa "since + mốc quá khứ" khiến thí sinh nhầm tưởng chọn V2 thay vì have/has V3 cho mệnh đề chính.'
  },
  {
    id: 'cmp-02',
    title: 'Liên Từ Chỉ Nhượng Bộ (Although) vs. Giới Từ Nhượng Bộ (Despite)',
    category: 'Conjunctions & Prepositions',
    conceptA: {
      name: 'Liên Từ Nhượng Bộ (Although / Even though / Though)',
      formula: 'Although / Even though + S + V + (O), S + V',
      usage: 'Theo sau bắt buộc phải là một MỆNH ĐỀ HOÀN CHỈNH có đầy đủ Chủ ngữ và Động từ chia thì.',
      exampleEn: 'Although the marketing budget was reduced, sales increased by 20%.',
      exampleVi: 'Mặc dù ngân sách tiếp thị bị cắt giảm, doanh số vẫn tăng 20%.'
    },
    conceptB: {
      name: 'Giới Từ Nhượng Bộ (Despite / In spite of)',
      formula: 'Despite / In spite of + Noun Phrase / V-ing, S + V',
      usage: 'Theo sau bắt buộc là một CỤM DANH TỪ hoặc DANH ĐỘNG TỪ (V-ing), TUYỆT ĐỐI KHÔNG đi với một mệnh đề.',
      exampleEn: 'Despite the budget reduction, sales increased by 20%.',
      exampleVi: 'Mặc cho việc cắt giảm ngân sách, doanh số vẫn tăng 20%.'
    },
    keyDifferentiator: 'Kiểm tra phía sau chỗ trống: Có động từ chia thì (conjugated verb) hay chỉ là danh từ/cụm danh từ. Nếu có động từ chia thì -> Chọn liên từ (Although). Nếu chỉ có cụm từ -> Chọn giới từ (Despite).',
    examTrapWarning: 'ETS rất hay gài cụm danh từ dài có mệnh đề quan hệ rút gọn phía sau (ví dụ: Despite the strict policies implemented last month,...), thí sinh thấy từ "implemented" tưởng là động từ chia thì nên chọn Although là rơi vào bẫy.'
  },
  {
    id: 'cmp-03',
    title: 'Liên Từ Chỉ Nguyên Nhân (Because) vs. Giới Từ Nguyên Nhân (Because of / Due to)',
    category: 'Conjunctions & Prepositions',
    conceptA: {
      name: 'Liên Từ Nguyên Nhân (Because / Since / As / Now that)',
      formula: 'Because / Since / As + S + V + (O)',
      usage: 'Đứng trước một mệnh đề độc lập nêu nguyên nhân lý do.',
      exampleEn: 'Because the shipment was delayed, production was postponed.',
      exampleVi: 'Bởi vì lô hàng bị chậm trễ, việc sản xuất đã bị hoãn lại.'
    },
    conceptB: {
      name: 'Giới Từ Nguyên Nhân (Because of / Due to / Owing to / On account of)',
      formula: 'Because of / Due to + Noun Phrase / V-ing',
      usage: 'Đứng trước một cụm danh từ hoặc V-ing chỉ nguyên nhân.',
      exampleEn: 'Because of the shipment delay, production was postponed.',
      exampleVi: 'Do sự chậm trễ lô hàng, việc sản xuất đã bị hoãn lại.'
    },
    keyDifferentiator: 'Cấu trúc phía sau: Clause (S + V) -> Because/Since/As; Noun Phrase -> Because of / Due to / Owing to.',
    examTrapWarning: 'Cực kỳ lưu ý cụm "Due to the fact that + S + V" tương đương với "Because + S + V". Nếu chỉ có "Due to" thì chỉ đi với danh từ.'
  },
  {
    id: 'cmp-04',
    title: 'Phân Từ Rút Gọn Chủ Động (V-ing) vs. Phân Từ Rút Gọn Bị Động (V-ed/V3)',
    category: 'Participles',
    conceptA: {
      name: 'Hiện Tại Phân Từ - Dạng Chủ Động (V-ing)',
      formula: 'V-ing + Object / Adverb (khi chủ ngữ tự thực hiện hành động)',
      usage: 'Rút gọn mệnh đề quan hệ chủ động hoặc mệnh đề trạng ngữ đồng chủ ngữ khi chủ ngữ là tác nhân gây ra hành động.',
      exampleEn: 'The committee reviewing the proposals will announce the winner tomorrow.',
      exampleVi: 'Hội đồng (người đang xem xét các đề xuất) sẽ công bố người chiến thắng vào ngày mai.'
    },
    conceptB: {
      name: 'Quá Khứ Phân Từ - Dạng Bị Động (V-ed / V3)',
      formula: 'V-ed/V3 (+ by Object) (khi chủ ngữ bị/được tác động)',
      usage: 'Rút gọn mệnh đề quan hệ bị động hoặc mệnh đề trạng ngữ khi chủ ngữ chịu tác động từ bên ngoài.',
      exampleEn: 'The revised proposal submitted by Mr. Henderson was unanimously approved.',
      exampleVi: 'Bản đề xuất đã được chỉnh sửa (được nộp bởi ông Henderson) đã được phê duyệt nhất trí.'
    },
    keyDifferentiator: 'Xem danh từ được bổ nghĩa là chủ thể gây ra hành động (phía sau thường có tân ngữ O -> chọn V-ing) hay danh từ đó bị tác động (phía sau thường có giới từ hoặc không có tân ngữ -> chọn V-ed/V3).',
    examTrapWarning: 'Các động từ chỉ cảm xúc (interest, bore, excite, satisfy): V-ing mô tả tính chất sự vật/sự việc; V-ed mô tả cảm xúc/tâm trạng của con người.'
  },
  {
    id: 'cmp-05',
    title: 'Câu Giả Định Thức Bắt Buộc (Subjunctive Mood) vs. Câu Trần Thuật Thông Thường',
    category: 'Subjunctive Mood',
    conceptA: {
      name: 'Thể Giả Định (Subjunctive with V_inf)',
      formula: 'S + demand/suggest/require/recommend/insist + THAT + S + (should) + V_nguyên_thể',
      usage: 'Bắt buộc động từ mệnh đề sau "that" phải ở dạng NGUYÊN THỂ KHÔNG "TO", bất kể chủ ngữ là số ít (he/she/it) hay thời gian ở quá khứ.',
      exampleEn: 'The board requested that every manager submit the financial audit by Friday.',
      exampleVi: 'Hội đồng quản trị yêu cầu mọi trưởng phòng phải nộp báo cáo kiểm toán trước thứ Sáu (submit giữ nguyên thể dù manager là số ít).'
    },
    conceptB: {
      name: 'Câu Trần Thuật Báo Cáo Thông Thường',
      formula: 'S + announce/state/report + THAT + S + V(chia theo thì & số ít/nhiều)',
      usage: 'Động từ chia thì bình thường theo quy tắc hòa hợp chủ vị.',
      exampleEn: 'The CEO announced that the new branch opens next Monday.',
      exampleVi: 'Tổng giám đốc thông báo rằng chi nhánh mới sẽ khai trương vào thứ Hai tới.'
    },
    keyDifferentiator: 'Nếu mệnh đề chính chứa các động từ/tính từ chỉ sự yêu cầu/khuyên bảo (mandate, require, recommend, ask, suggest, essential, imperative, crucial) + that -> Động từ mệnh đề sau LUÔN Ở DẠNG NGUYÊN MẪU KHÔNG CHIA.',
    examTrapWarning: 'ETS luôn đưa ra phương án chia thì số ít (submits) hoặc quá khứ (submitted) để bẫy người làm theo phản xạ thấy "manager" chọn "submits".'
  },
  {
    id: 'cmp-06',
    title: 'Từ Phân Biệt: Another vs. Other vs. The Other vs. Others vs. The Others',
    category: 'Pronouns & Determiners',
    conceptA: {
      name: 'Another & Other (Tính từ bất định)',
      formula: 'Another + N(đếm được số ít) / Other + N(đếm được số nhiều/không đếm được)',
      usage: 'Another: "một cái/người khác" (chưa xác định); Other: "những cái/người khác".',
      exampleEn: 'We need to hire another software engineer.',
      exampleVi: 'Chúng ta cần tuyển thêm một kỹ sư phần mềm nữa.'
    },
    conceptB: {
      name: 'Others & The Others (Đại từ thay thế)',
      formula: 'Others (những người/vật khác không xác định) / The others (những người/vật còn lại đã xác định)',
      usage: 'Đóng vai trò là Chủ ngữ hoặc Tân ngữ đứng một mình, KHÔNG BAO GIỜ đi kèm danh từ theo sau.',
      exampleEn: 'Some participants liked the seminar, while others found it repetitive.',
      exampleVi: 'Một số người tham dự thích buổi hội thảo, trong khi những người khác thấy nó lặp lại.'
    },
    keyDifferentiator: 'Others có "s" thì ĐỨNG MỘT MÌNH không có danh từ theo sau. Other không có "s" thì PHẢI CÓ DANH TỪ SỐ NHIỀU đi kèm.',
    examTrapWarning: 'Bẫy kinh điển: Đề bài cho chỗ trống trước danh từ số nhiều "____ candidates", phương án đưa ra cả "Others" và "Other". Người học vội vàng thấy "candidates" số nhiều liền chọn "Others" là sai hoàn toàn (đáp án đúng phải là "Other candidates").'
  }
]

export const GRAMMAR_EXAM_TRAPS: GrammarExamTrap[] = [
  {
    id: 'trap-01',
    topicId: 'tenses',
    topicName: 'Các Thì Trong Tiếng Anh',
    trapTitle: 'Bẫy Phối Thì Với "By The Time"',
    trapType: 'Tense Confusion',
    incorrectExample: '❌ By the time the auditor arrives tomorrow, we prepared all financial statements.',
    correctExample: '✅ By the time the auditor arrives tomorrow, we will have prepared all financial statements.',
    deepAnalysis: 'Quy tắc vàng của By the time: \n1) By the time + Hiện tại đơn (arrives) -> Mệnh đề chính BẮT BUỘC dùng Tương Lai Hoàn Thành (will have + V3/ed).\n2) By the time + Quá khứ đơn (arrived) -> Mệnh đề chính BẮT BUỘC dùng Quá Khứ Hoàn Thành (had + V3/ed).\nETS thường cho thì quá khứ hoặc hiện tại hoàn thành ở mệnh đề chính để đánh lừa thí sinh không nắm vững mốc thời gian.',
    etsTestFrequency: 'Rất cao (90%)'
  },
  {
    id: 'trap-02',
    topicId: 'tenses',
    topicName: 'Các Thì Trong Tiếng Anh',
    trapTitle: 'Bẫy Mệnh Đề Chỉ Thời Gian Trong Tương Lai (When, As soon as, Once)',
    trapType: 'Tense Confusion',
    incorrectExample: '❌ We will sign the contract as soon as the client will approve the terms.',
    correctExample: '✅ We will sign the contract as soon as the client approves the terms.',
    deepAnalysis: 'Trong tiếng Anh, mệnh đề phụ chỉ thời gian bắt đầu bằng When, As soon as, Once, Until, Before, After TUYỆT ĐỐI KHÔNG dùng thì tương lai (will/shall). Phải dùng Hiện Tại Đơn (hoặc Hiện Tại Hoàn Thành) để thay thế.',
    etsTestFrequency: 'Rất cao (90%)'
  },
  {
    id: 'trap-03',
    topicId: 'sv-agreement',
    topicName: 'Sự Hòa Hợp Chủ Vị',
    trapTitle: 'Bẫy Cụm Giới Từ Bổ Nghĩa Chen Giữa Chủ Ngữ Và Động Từ',
    trapType: 'Agreement Trap',
    incorrectExample: '❌ The installation of the new manufacturing machines were completed on time.',
    correctExample: '✅ The installation of the new manufacturing machines was completed on time.',
    deepAnalysis: 'Chủ ngữ thật của câu là danh từ đứng trước giới từ: "The installation" (danh từ số ít), chứ không phải "machines" (danh từ số nhiều nằm trong cụm giới từ "of the new manufacturing machines"). Do đó động từ phải chia số ít: "was completed".',
    etsTestFrequency: 'Rất cao (90%)'
  },
  {
    id: 'trap-04',
    topicId: 'sv-agreement',
    topicName: 'Sự Hòa Hợp Chủ Vị',
    trapTitle: 'Bẫy "A Number Of" vs. "The Number Of"',
    trapType: 'Agreement Trap',
    incorrectExample: '❌ The number of registered participants are increasing steadily.',
    correctExample: '✅ The number of registered participants is increasing steadily.',
    deepAnalysis: '1) "A number of + N số nhiều" mang nghĩa "Nhiều / một số" -> Động từ chia SỐ NHIỀU (plural verb).\n2) "The number of + N số nhiều" mang nghĩa "Số lượng của..." -> Động từ BẮT BUỘC chia SỐ ÍT (singular verb).',
    etsTestFrequency: 'Rất cao (90%)'
  },
  {
    id: 'trap-05',
    topicId: 'passive-voice',
    topicName: 'Thể Bị Động',
    trapTitle: 'Bẫy Động Từ Không Có Dạng Bị Động (Nội Động Từ - Intransitive Verbs)',
    trapType: 'Passive Distortion',
    incorrectExample: '❌ The technical incident was occurred during the system migration.',
    correctExample: '✅ The technical incident occurred during the system migration.',
    deepAnalysis: 'Các nội động từ (Intransitive Verbs) như: occur, happen, appear, disappear, remain, exist, rise, fall, arrive KHÔNG BAO GIỜ chia ở thể bị động vì chúng không nhận tân ngữ trực tiếp.',
    etsTestFrequency: 'Cao (75%)'
  },
  {
    id: 'trap-06',
    topicId: 'word-form',
    topicName: 'Từ Loại & Cấu Tạo Từ',
    trapTitle: 'Bẫy Vị Trí Của Trạng Từ Bổ Nghĩa Cho Động Từ Trong Cụm "Have + V3" hoặc "Be + V3"',
    trapType: 'Word Choice',
    incorrectExample: '❌ The contract has been final reviewed by the senior legal counsel.',
    correctExample: '✅ The contract has been finally reviewed by the senior legal counsel.',
    deepAnalysis: 'Vị trí nằm giữa trợ động từ (have/has/be) và động từ chính (V3/ed) LUÔN LUÔN là một TRẠNG TỪ (Adverb - đuôi ly) để bổ nghĩa cho động từ chính đó: S + have/be + [ADV] + V3/ed.',
    etsTestFrequency: 'Rất cao (90%)'
  },
  {
    id: 'trap-07',
    topicId: 'clauses',
    topicName: 'Mệnh Đề Quan Hệ',
    trapTitle: 'Bẫy Rút Gọn Mệnh Đề Quan Hệ Với Danh Từ Có Mạo Từ "The Only / The First / The Best"',
    trapType: 'Structure Trap',
    incorrectExample: '❌ Dr. Aris is the only researcher discovering the flaw in the algorithm.',
    correctExample: '✅ Dr. Aris is the only researcher to discover the flaw in the algorithm.',
    deepAnalysis: 'Khi danh từ được bổ nghĩa đứng trước có các từ hạn định chỉ thứ tự hoặc độc nhất như: the first, the second, the last, the only, hoặc so sánh nhất (the best, the most), khi rút gọn mệnh đề quan hệ ta BẮT BUỘC dùng TO-INFINITIVE (to + V_inf), KHÔNG dùng V-ing.',
    etsTestFrequency: 'Cao (75%)'
  },
  {
    id: 'trap-08',
    topicId: 'inversion',
    topicName: 'Đảo Ngữ Trong TOEIC',
    trapTitle: 'Bẫy Đảo Ngữ Câu Điều Kiện Loại 1, 2, 3',
    trapType: 'Structure Trap',
    incorrectExample: '❌ Should you will have any further inquiries, please contact our helpline.',
    correctExample: '✅ Should you have any further inquiries, please contact our helpline.',
    deepAnalysis: 'Công thức đảo ngữ điều kiện:\n- Loại 1: Should + S + V_nguyên_thể, S + will + V_inf (thay cho If + S + V_s/es)\n- Loại 2: Were + S + to + V_inf / Were + S + Adj/Noun, S + would + V_inf\n- Loại 3: Had + S + V3/ed, S + would have + V3/ed\nLưu ý: Sau "Should + S" động từ PHẢI Ở DẠNG NGUYÊN THỂ, không dùng "will" hay chia "s/es".',
    etsTestFrequency: 'Rất cao (90%)'
  }
]
