// =======================================================================
// Master 30-Day English Grammar Curriculum (Tổng Ôn 30 Ngày Ngữ Pháp)
// Chuẩn giáo trình Cô Vũ Mai Phương / Ngoại Ngữ 24h & Google Drive Resource
// =======================================================================

export interface GrammarFormula {
  formula: string
  meaning: string
  exampleEn: string
  exampleVi: string
  signals?: string[]
  tip?: string
}

export interface GrammarExercise {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  type: 'multiple-choice' | 'fill-in-blank' | 'error-identification'
  difficulty: 'A1-A2 Foundation' | 'B1-B2 Intermediate' | 'C1 / TOEIC 800+'
  detailedExplanation: string
  examTrap?: string
  translation: string
}

export interface GrammarDay {
  day: number
  title: string
  titleEn: string
  category:
    | 'Tenses'
    | 'S-V Agreement'
    | 'Passive'
    | 'Conditionals'
    | 'Clauses'
    | 'Parts of Speech'
    | 'Collocations'
    | 'Conjunctions'
    | 'Prepositions'
    | 'Review & Test'
  level: 'A1-A2 Foundation' | 'B1-B2 Intermediate' | 'C1 / TOEIC 800+'
  pageBookRef: number
  summary: string
  coreFormulas: GrammarFormula[]
  examTraps: string[]
  exercises: GrammarExercise[]
}

export const GRAMMAR_30_DAYS: GrammarDay[] = [
  {
    day: 1,
    title: 'CÁC THÌ ĐƠN (SIMPLE TENSES)',
    titleEn: 'Present, Past & Future Simple Tenses',
    category: 'Tenses',
    level: 'A1-A2 Foundation',
    pageBookRef: 14,
    summary:
      'Nắm vững cấu trúc, cách sử dụng và dấu hiệu nhận biết của 3 thì đơn: Hiện tại đơn (Present Simple), Quá khứ đơn (Past Simple) và Tương lai đơn (Future Simple).',
    coreFormulas: [
      {
        formula: 'S + V(s/es) / S + do/does not + V_inf',
        meaning:
          'Hiện tại đơn: Diễn tả chân lý, sự thật hiển nhiên, thói quen lặp đi lặp lại hoặc lịch trình biểu.',
        exampleEn: 'The company conducts performance reviews every quarter.',
        exampleVi: 'Công ty tiến hành đánh giá hiệu suất làm việc mỗi quý.',
        signals: ['always', 'usually', 'frequently', 'every day/week/month', 'once a year'],
        tip: 'Chủ ngữ số ít (he/she/it/danh từ không đếm được) động từ thêm s/es. Chú ý các động từ tận cùng bằng o, s, ch, x, sh, z thêm -es.',
      },
      {
        formula: 'S + V2/ed / S + did not + V_inf',
        meaning:
          'Quá khứ đơn: Diễn tả hành động đã xảy ra và kết thúc hoàn toàn tại thời điểm xác định trong quá khứ.',
        exampleEn: 'The marketing director submitted the revised budget proposal yesterday.',
        exampleVi: 'Giám đốc tiếp thị đã nộp bản đề xuất ngân sách đã sửa đổi vào ngày hôm qua.',
        signals: ['yesterday', 'ago', 'last week/month/year', 'in 2020', 'previously'],
        tip: 'Học kỹ bảng động từ bất quy tắc (irregular verbs). Đã có trợ động từ Did thì động từ chính luôn ở dạng nguyên thể không to.',
      },
      {
        formula: "S + will + V_inf / S + will not (won't) + V_inf",
        meaning:
          'Tương lai đơn: Quyết định tức thì tại thời điểm nói, lời hứa, dự đoán không có căn cứ xác thực.',
        exampleEn: 'We will launch the new mobile banking application next month.',
        exampleVi: 'Chúng tôi sẽ ra mắt ứng dụng ngân hàng di động mới vào tháng tới.',
        signals: ['tomorrow', 'next week/month', 'in the near future', 'soon', 'predict that'],
        tip: 'Trong mệnh đề trạng ngữ chỉ thời gian (when, as soon as, before, after), KHÔNG dùng WILL mà dùng Hiện tại đơn để chỉ tương lai.',
      },
    ],
    examTraps: [
      'Bẫy mệnh đề thời gian: Sau When, As soon as, Once, By the time, Until... dù có trạng từ tương lai (tomorrow) vẫn phải dùng Hiện tại đơn.',
      "Bẫy chủ ngữ giả và số lượng: 'A variety of products + V(số nhiều)' nhưng 'Every employee + V(số ít)'.",
      'Bẫy trạng từ chỉ tần suất: Trạng từ đứng trước động từ thường nhưng đứng SAU động từ to-be và trợ động từ.',
    ],
    exercises: [
      {
        id: 'd1-q1',
        question:
          'Mr. Henderson usually _______ the quarterly financial audit before sending it to the board.',
        options: ['reviews', 'is reviewing', 'reviewed', 'will review'],
        correctAnswer: 0,
        type: 'multiple-choice',
        difficulty: 'A1-A2 Foundation',
        translation:
          'Ông Henderson thường xem xét kỹ lưỡng cuộc kiểm toán tài chính hàng quý trước khi gửi cho hội đồng quản trị.',
        detailedExplanation:
          "Dấu hiệu trạng từ 'usually' biểu thị thói quen lặp đi lặp lại ➔ dùng Hiện tại đơn. Chủ ngữ 'Mr. Henderson' là ngôi thứ 3 số ít ➔ động từ thêm -s ('reviews').",
        examTrap: 'Không chia thì tiếp diễn với trạng từ tần suất chỉ thói quen công việc đều đặn.',
      },
      {
        id: 'd1-q2',
        question:
          'The human resources department _______ an official announcement regarding the annual bonus yesterday morning.',
        options: ['issues', 'issued', 'is issuing', 'will issue'],
        correctAnswer: 1,
        type: 'multiple-choice',
        difficulty: 'A1-A2 Foundation',
        translation:
          'Phòng nhân sự đã phát đi thông báo chính thức về tiền thưởng hàng năm vào sáng hôm qua.',
        detailedExplanation:
          "Có trạng ngữ thời gian xác định trong quá khứ 'yesterday morning' ➔ chia thì Quá khứ đơn (V-ed: 'issued').",
        examTrap:
          'Tránh nhầm lẫn giữa Hiện tại hoàn thành và Quá khứ đơn khi có mốc thời gian kết thúc xác định.',
      },
      {
        id: 'd1-q3',
        question:
          'As soon as the technician _______ the server maintenance, we will resume client operations.',
        options: ['will finish', 'finishes', 'finished', 'is finishing'],
        correctAnswer: 1,
        type: 'multiple-choice',
        difficulty: 'B1-B2 Intermediate',
        translation:
          'Ngay sau khi kỹ thuật viên hoàn tất việc bảo trì máy chủ, chúng tôi sẽ tiếp tục các hoạt động phục vụ khách hàng.',
        detailedExplanation:
          "Quy tắc kinh điển trong TOEIC: Trong mệnh đề phụ chỉ thời gian bắt đầu bằng 'As soon as', mệnh đề chính dùng 'will resume' (tương lai) thì mệnh đề phụ BẮT BUỘC dùng Hiện tại đơn ('finishes'), KHÔNG BAO GIỜ dùng 'will'.",
        examTrap:
          'Đây là bẫy câu hỏi Part 5 TOEIC thường xuyên xuất hiện với tần suất trên 80% trong các đề thi.',
      },
    ],
  },
  {
    day: 2,
    title: 'BẪY CÁC THÌ ĐƠN TRONG ĐỀ THI TOEIC',
    titleEn: 'Simple Tenses Traps in TOEIC Part 5 & 6',
    category: 'Tenses',
    level: 'B1-B2 Intermediate',
    pageBookRef: 20,
    summary:
      'Chuyên sâu các bẫy đề thi Part 5 TOEIC về thì đơn: Hòa hợp thì trong mệnh đề thời gian, động từ trạng thái không chia tiếp diễn, và sự khác biệt giữa lịch trình cố định và tương lai gần.',
    coreFormulas: [
      {
        formula:
          'Clause (Future Simple: will + V) + when/before/after/as soon as/until + S + V(s/es) (Present Simple)',
        meaning: 'Hòa hợp thì: Mệnh đề chỉ thời gian không bao giờ chia thì tương lai có WILL.',
        exampleEn: 'We will process the invoice after the shipment arrives at the warehouse.',
        exampleVi: 'Chúng tôi sẽ xử lý hóa đơn sau khi lô hàng đến nhà kho.',
        signals: ['when', 'before', 'after', 'as soon as', 'until', 'by the time'],
        tip: 'Nhìn thấy liên từ thời gian + tương lai ở vế kia ➔ chọn ngay Hiện tại đơn cho vế sau liên từ.',
      },
      {
        formula:
          'Stative Verbs (know, believe, understand, contain, belong to, own, resemble) ➔ KHÔNG chia V-ing',
        meaning:
          'Động từ chỉ trạng thái, sở hữu, cảm xúc luôn chia ở dạng thì đơn, không dùng thì tiếp diễn.',
        exampleEn: 'This document contains confidential proprietary client information.',
        exampleVi: 'Tài liệu này chứa thông tin mật độc quyền của khách hàng.',
        tip: "Đề thi hay bẫy: 'The package is containing...' ➔ Sai! Phải sửa thành 'The package contains...'.",
      },
    ],
    examTraps: [
      "Bẫy 'Currently / At present': Thường dùng Hiện tại đơn hoặc Tiếp diễn, nhưng nếu diễn tả vị trí công tác cố định ('currently serves as CEO') lại ưu tiên thì Hiện tại đơn.",
      'Bẫy By the time + Present Simple ➔ Vế sau dùng Future Perfect (will have + V3/ed).',
      "Bẫy câu hỏi ngữ cảnh công vụ: Chuyến bay, tàu hỏa khởi hành theo thời khóa biểu luôn dùng Hiện tại đơn (e.g. 'The flight departs at 8:00 AM tomorrow').",
    ],
    exercises: [
      {
        id: 'd2-q1',
        question:
          'Payment will be released to the contractor once the project supervisor _______ the completed construction inspection.',
        options: ['approves', 'will approve', 'approved', 'is approving'],
        correctAnswer: 0,
        type: 'multiple-choice',
        difficulty: 'B1-B2 Intermediate',
        translation:
          'Khoản thanh toán sẽ được giải ngân cho nhà thầu một khi người giám sát dự án phê duyệt đợt nghiệm thu thi công hoàn tất.',
        detailedExplanation:
          "Liên từ 'once' (= as soon as / sau khi). Mệnh đề chính có 'will be released' (tương lai) ➔ mệnh đề sau 'once' phải chia Hiện tại đơn số ít: 'approves'.",
        examTrap: "Thí sinh rất hay chọn 'will approve' vì thấy vế trước có will.",
      },
      {
        id: 'd2-q2',
        question:
          'The latest version of our cloud software _______ advanced end-to-end encryption protocols.',
        options: ['is containing', 'contains', 'was contained', 'contain'],
        correctAnswer: 1,
        type: 'multiple-choice',
        difficulty: 'B1-B2 Intermediate',
        translation:
          'Phiên bản mới nhất của phần mềm đám mây của chúng tôi chứa các giao thức mã hóa đầu cuối tiên tiến.',
        detailedExplanation:
          "'Contain' là động từ trạng thái (stative verb), không chia ở thể tiếp diễn ('is containing' là sai). Chủ ngữ 'The latest version' là số ít ➔ chọn 'contains'.",
        examTrap: 'Bẫy động từ trạng thái chỉ bản chất tính năng sản phẩm.',
      },
      {
        id: 'd2-q3',
        question:
          'The high-speed express train to Frankfurt _______ from platform 4 at exactly 6:45 PM this evening.',
        options: ['departs', 'is departing', 'will be departed', 'has departed'],
        correctAnswer: 0,
        type: 'multiple-choice',
        difficulty: 'C1 / TOEIC 800+',
        translation:
          'Chuyến tàu cao tốc đi Frankfurt khởi hành từ sân ga số 4 vào đúng 6 giờ 45 tối nay.',
        detailedExplanation:
          "Hành động trong tương lai nhưng tuân theo lịch trình cố định của phương tiện giao thông công cộng, thời khóa biểu công khai ➔ quy chuẩn ngữ pháp tiếng Anh chuẩn mực dùng thì Hiện tại đơn ('departs').",
        examTrap:
          'Đề thi TOEIC điểm cao 850+ rất chuộng kiểm tra cách dùng Hiện tại đơn chỉ lịch trình cố định.',
      },
    ],
  },
  {
    day: 3,
    title: 'THÌ TIẾP DIỄN (CONTINUOUS TENSES)',
    titleEn: 'Continuous / Progressive Tenses Mastery',
    category: 'Tenses',
    level: 'A1-A2 Foundation',
    pageBookRef: 30,
    summary:
      'Nắm chắc 3 thì tiếp diễn: Hiện tại tiếp diễn, Quá khứ tiếp diễn và Tương lai tiếp diễn. Nhận diện các hành động đang xảy ra, hành động xen vào và hành động song song.',
    coreFormulas: [
      {
        formula: 'S + am/is/are + V-ing',
        meaning:
          'Hiện tại tiếp diễn: Diễn tả hành động đang diễn ra ngay tại thời điểm nói hoặc xu hướng biến đổi tạm thời.',
        exampleEn: 'The engineering team is currently developing a new microservices framework.',
        exampleVi: 'Đội ngũ kỹ thuật hiện đang phát triển một khung kiến trúc microservices mới.',
        signals: [
          'now',
          'at the moment',
          'at present',
          'currently',
          'right now',
          'Look!',
          'Listen!',
        ],
        tip: "Lưu ý trạng từ 'currently' có thể đi với Hiện tại tiếp diễn để nhấn mạnh tính chất tạm thời, đang tiến hành.",
      },
      {
        formula: 'S + was/were + V-ing',
        meaning:
          'Quá khứ tiếp diễn: Hành động đang xảy ra tại một thời điểm xác định trong quá khứ hoặc một hành động đang xảy ra thì hành động khác cắt ngang (When + Past Simple, While + Past Continuous).',
        exampleEn: 'The database server was undergoing maintenance when the power outage occurred.',
        exampleVi: 'Máy chủ cơ sở dữ liệu đang trong quá trình bảo trì thì sự cố mất điện xảy ra.',
        signals: ['at 8 PM yesterday', 'at that time', 'when + V2/ed', 'while + was/were V-ing'],
        tip: 'Hành động kéo dài liên tục chia Quá khứ tiếp diễn, hành động ngắn bất ngờ xen vào chia Quá khứ đơn.',
      },
      {
        formula: 'S + will be + V-ing',
        meaning:
          'Tương lai tiếp diễn: Diễn tả hành động sẽ đang diễn ra tại một thời điểm hoặc khoảng thời gian xác định trong tương lai.',
        exampleEn: 'Our CEO will be delivering the keynote speech at this time tomorrow.',
        exampleVi:
          'Tổng giám đốc của chúng tôi sẽ đang trình bày bài phát biểu khai mạc vào giờ này ngày mai.',
        signals: ['at this time tomorrow', 'at 10 AM next Monday', 'this time next week'],
        tip: 'Có mốc giờ cụ thể trong tương lai (at 9 AM tomorrow) ➔ ưu tiên Tương lai tiếp diễn thay vì Tương lai đơn.',
      },
    ],
    examTraps: [
      'Bẫy When vs While: While thường đi với quá khứ tiếp diễn (hành động dài), When thường đi với quá khứ đơn (hành động cắt ngang).',
      'Bẫy Always + V-ing: Diễn tả sự phàn nàn về một thói quen gây khó chịu (e.g. He is always forgetting his security badge!).',
    ],
    exercises: [
      {
        id: 'd3-q1',
        question:
          'While the system administrators _______ the firewall upgrade, external connections were temporarily disabled.',
        options: ['were installing', 'installed', 'are installing', 'will install'],
        correctAnswer: 0,
        type: 'multiple-choice',
        difficulty: 'B1-B2 Intermediate',
        translation:
          'Trong khi các quản trị viên hệ thống đang cài đặt bản nâng cấp tường lửa, các kết nối bên ngoài tạm thời bị vô hiệu hóa.',
        detailedExplanation:
          "Mệnh đề sau 'While' diễn tả hành động đang diễn ra trong quá khứ kéo dài ('were installing'), vế sau là hành động đồng thời/kết quả trong quá khứ ('were disabled').",
        examTrap:
          "Chủ ngữ 'administrators' số nhiều nên phải dùng 'were installing', không dùng 'was'.",
      },
      {
        id: 'd3-q2',
        question:
          'At this exact hour next Friday, the executive committee _______ candidate presentations for the vacant director role.',
        options: ['will be reviewing', 'reviewed', 'has reviewed', 'is reviewed'],
        correctAnswer: 0,
        type: 'multiple-choice',
        difficulty: 'B1-B2 Intermediate',
        translation:
          'Vào đúng giờ này thứ Sáu tuần tới, ủy ban điều hành sẽ đang xem xét các bài thuyết trình của ứng viên cho vị trí giám đốc còn trống.',
        detailedExplanation:
          "Có mốc thời gian cụ thể trong tương lai 'At this exact hour next Friday' ➔ chia thì Tương lai tiếp diễn ('will be reviewing').",
        examTrap:
          "Nhiều người chỉ chú ý 'next Friday' mà bỏ qua 'at this exact hour' nên chọn nhầm thì tương lai đơn.",
      },
    ],
  },
  {
    day: 4,
    title: 'THÌ HOÀN THÀNH (PERFECT TENSES)',
    titleEn: 'Present, Past & Future Perfect Tenses',
    category: 'Tenses',
    level: 'B1-B2 Intermediate',
    pageBookRef: 44,
    summary:
      'Làm chủ các thì hoàn thành: Hiện tại hoàn thành (kết quả ở hiện tại), Quá khứ hoàn thành (xảy ra trước một hành động quá khứ), và Tương lai hoàn thành (hoàn tất trước mốc tương lai).',
    coreFormulas: [
      {
        formula: 'S + have/has + V3/ed',
        meaning:
          'Hiện tại hoàn thành: Diễn tả hành động xảy ra trong quá khứ kéo dài đến hiện tại, hoặc vừa mới xảy ra để lại kết quả.',
        exampleEn:
          'TechCorp has experienced unprecedented revenue growth over the past three years.',
        exampleVi:
          'Tập đoàn TechCorp đã trải qua sự tăng trưởng doanh thu chưa từng có trong vòng 3 năm qua.',
        signals: [
          'since',
          'for + khoảng thời gian',
          'already',
          'yet',
          'recently',
          'lately',
          'over the past/last + N',
        ],
        tip: 'Dấu hiệu vàng trong TOEIC: over / in / during / for the past / last + N năm/tháng ➔ 100% chia Hiện tại hoàn thành!',
      },
      {
        formula: 'S + had + V3/ed',
        meaning:
          'Quá khứ hoàn thành: Hành động xảy ra và hoàn tất TRƯỚC một hành động hoặc mốc thời gian khác trong quá khứ.',
        exampleEn:
          'By the time the manager arrived, the team had already finalized the technical report.',
        exampleVi: 'Trước khi người quản lý đến, đội ngũ đã hoàn thiện xong bản báo cáo kỹ thuật.',
        signals: ['by the time + Past Simple', 'before + Past Simple', 'after + Past Perfect'],
        tip: 'Công thức cố định: By the time + S + V2/ed, S + had + V3/ed.',
      },
      {
        formula: 'S + will have + V3/ed',
        meaning:
          'Tương lai hoàn thành: Hành động sẽ được hoàn tất TRƯỚC một thời điểm hoặc hành động khác trong tương lai.',
        exampleEn: 'By next December, we will have operated this data center for a decade.',
        exampleVi:
          'Tính đến tháng 12 tới, chúng tôi sẽ vận hành trung tâm dữ liệu này tròn một thập kỷ.',
        signals: [
          'by + mốc thời gian tương lai (by tomorrow, by 2030, by next year)',
          'by the time + Present Simple',
        ],
        tip: 'Công thức cố định: By the time + S + V(s/es), S + will have + V3/ed.',
      },
    ],
    examTraps: [
      'Bẫy Since vs For: Since + mốc thời gian (since 2018, since last Monday); For + khoảng thời gian (for 5 years, for two hours).',
      'Bẫy Since làm liên từ chỉ thời gian: S + have/has + V3/ed + SINCE + S + V2/ed (Mệnh đề sau Since luôn chia Quá khứ đơn!).',
      'Bẫy By the time: By the time + Quá khứ đơn ➔ Quá khứ hoàn thành. By the time + Hiện tại đơn ➔ Tương lai hoàn thành.',
    ],
    exercises: [
      {
        id: 'd4-q1',
        question:
          'Over the last two decades, our software firm _______ its global customer base across forty countries.',
        options: ['has expanded', 'expands', 'expanded', 'was expanding'],
        correctAnswer: 0,
        type: 'multiple-choice',
        difficulty: 'B1-B2 Intermediate',
        translation:
          'Trong hai thập kỷ qua, công ty phần mềm của chúng tôi đã mở rộng tệp khách hàng toàn cầu trên bốn mươi quốc gia.',
        detailedExplanation:
          "Cụm 'Over the last two decades' là dấu hiệu đặc trưng tuyệt đối của thì Hiện tại hoàn thành ➔ chia 'has expanded'.",
        examTrap:
          "Không chia quá khứ đơn khi có cụm 'Over / In / During the past / last + khoảng thời gian'.",
      },
      {
        id: 'd4-q2',
        question:
          'By the time the new director assumed leadership, the previous administration _______ the restructuring plan.',
        options: ['had implemented', 'implements', 'will implement', 'has implemented'],
        correctAnswer: 0,
        type: 'multiple-choice',
        difficulty: 'C1 / TOEIC 800+',
        translation:
          'Trước khi vị giám đốc mới tiếp quản quyền lãnh đạo, ban điều hành tiền nhiệm đã triển khai xong kế hoạch tái cơ cấu.',
        detailedExplanation:
          "'By the time' + mệnh đề quá khứ đơn ('assumed') ➔ mệnh đề chính biểu thị hành động xảy ra trước đó, phải dùng Quá khứ hoàn thành ('had implemented').",
        examTrap:
          'Bẫy tương quan thời gian giữa hành động xảy ra trước và hành động xảy ra sau trong quá khứ.',
      },
    ],
  },
  {
    day: 5,
    title: 'SỰ HÒA HỢP GIỮA CHỦ NGỮ VÀ ĐỘNG TỪ I',
    titleEn: 'Subject-Verb Agreement: Core Rules',
    category: 'S-V Agreement',
    level: 'A1-A2 Foundation',
    pageBookRef: 53,
    summary:
      'Quy tắc hòa hợp số ít và số nhiều, chủ ngữ ghép với AND, và các đại từ bất định (Everyone, Each, Every).',
    coreFormulas: [
      {
        formula: 'Key Formula for Day 5: SỰ HÒA HỢP GIỮA CHỦ NGỮ VÀ ĐỘNG TỪ I',
        meaning:
          'Công thức trọng tâm và nguyên lý cốt lõi của SỰ HÒA HỢP GIỮA CHỦ NGỮ VÀ ĐỘNG TỪ I.',
        exampleEn: 'Professional English example demonstrating Subject-Verb Agreement: Core Rules.',
        exampleVi:
          'Ví dụ tiếng Anh chuyên nghiệp minh họa cấu trúc của SỰ HÒA HỢP GIỮA CHỦ NGỮ VÀ ĐỘNG TỪ I.',
        signals: ['crucial indicator', 'context cue', 'exam keyword'],
        tip: 'Ghi nhớ mẹo làm bài thi: xác định thành phần trước và sau chỗ trống để chọn đúng dạng từ / cấu trúc.',
      },
    ],
    examTraps: [
      'Bẫy thường gặp trong đề thi TOEIC về SỰ HÒA HỢP GIỮA CHỦ NGỮ VÀ ĐỘNG TỪ I: thí sinh hay nhầm lẫn giữa dạng chủ động và bị động hoặc từ loại tương đồng.',
      'Quy tắc loại trừ nhanh: kiểm tra cấu trúc câu trước khi dịch nghĩa để tiết kiệm thời gian làm bài.',
    ],
    exercises: [
      {
        id: 'd5-q1',
        question:
          'The regional director emphasized that all department staff must comply _______ updated safety regulations.',
        options: ['with', 'to', 'for', 'at'],
        correctAnswer: 0,
        type: 'multiple-choice',
        difficulty: 'A1-A2 Foundation',
        translation:
          'Giám đốc khu vực nhấn mạnh rằng toàn thể nhân viên phòng ban phải tuân thủ các quy định an toàn đã cập nhật.',
        detailedExplanation:
          "Cụm giới từ cố định (Collocation / Dependent preposition): 'comply with something' mang nghĩa tuân thủ, tuân theo quy định.",
        examTrap: "Thí sinh rất hay nhầm lẫn giữa 'comply with', 'conform to' và 'adhere to'.",
      },
      {
        id: 'd5-q2',
        question:
          'Despite _______ multiple budget reductions, the engineering team successfully delivered the mobile app on schedule.',
        options: ['facing', 'faced', 'faces', 'face'],
        correctAnswer: 0,
        type: 'multiple-choice',
        difficulty: 'A1-A2 Foundation',
        translation:
          'Mặc dù phải đối mặt với nhiều lần cắt giảm ngân sách, đội ngũ kỹ thuật đã bàn giao thành công ứng dụng di động đúng tiến độ.',
        detailedExplanation:
          "Sau giới từ 'Despite', ta phải dùng danh từ, cụm danh từ hoặc Danh động từ V-ing ('facing').",
        examTrap: "Phân biệt: 'Despite + V-ing / Noun phrase' nhưng 'Although + S + V'.",
      },
    ],
  },
  {
    day: 6,
    title: 'SỰ HÒA HỢP GIỮA CHỦ NGỮ VÀ ĐỘNG TỪ II',
    titleEn: 'Subject-Verb Agreement: Advanced & Traps',
    category: 'S-V Agreement',
    level: 'B1-B2 Intermediate',
    pageBookRef: 58,
    summary:
      'Quy tắc với As well as, Together with, A number of vs The number of, phân số và tỷ lệ phần trăm.',
    coreFormulas: [
      {
        formula: 'Key Formula for Day 6: SỰ HÒA HỢP GIỮA CHỦ NGỮ VÀ ĐỘNG TỪ II',
        meaning:
          'Công thức trọng tâm và nguyên lý cốt lõi của SỰ HÒA HỢP GIỮA CHỦ NGỮ VÀ ĐỘNG TỪ II.',
        exampleEn:
          'Professional English example demonstrating Subject-Verb Agreement: Advanced & Traps.',
        exampleVi:
          'Ví dụ tiếng Anh chuyên nghiệp minh họa cấu trúc của SỰ HÒA HỢP GIỮA CHỦ NGỮ VÀ ĐỘNG TỪ II.',
        signals: ['crucial indicator', 'context cue', 'exam keyword'],
        tip: 'Ghi nhớ mẹo làm bài thi: xác định thành phần trước và sau chỗ trống để chọn đúng dạng từ / cấu trúc.',
      },
    ],
    examTraps: [
      'Bẫy thường gặp trong đề thi TOEIC về SỰ HÒA HỢP GIỮA CHỦ NGỮ VÀ ĐỘNG TỪ II: thí sinh hay nhầm lẫn giữa dạng chủ động và bị động hoặc từ loại tương đồng.',
      'Quy tắc loại trừ nhanh: kiểm tra cấu trúc câu trước khi dịch nghĩa để tiết kiệm thời gian làm bài.',
    ],
    exercises: [
      {
        id: 'd6-q1',
        question:
          'The regional director emphasized that all department staff must comply _______ updated safety regulations.',
        options: ['with', 'to', 'for', 'at'],
        correctAnswer: 0,
        type: 'multiple-choice',
        difficulty: 'B1-B2 Intermediate',
        translation:
          'Giám đốc khu vực nhấn mạnh rằng toàn thể nhân viên phòng ban phải tuân thủ các quy định an toàn đã cập nhật.',
        detailedExplanation:
          "Cụm giới từ cố định (Collocation / Dependent preposition): 'comply with something' mang nghĩa tuân thủ, tuân theo quy định.",
        examTrap: "Thí sinh rất hay nhầm lẫn giữa 'comply with', 'conform to' và 'adhere to'.",
      },
      {
        id: 'd6-q2',
        question:
          'Despite _______ multiple budget reductions, the engineering team successfully delivered the mobile app on schedule.',
        options: ['facing', 'faced', 'faces', 'face'],
        correctAnswer: 0,
        type: 'multiple-choice',
        difficulty: 'B1-B2 Intermediate',
        translation:
          'Mặc dù phải đối mặt với nhiều lần cắt giảm ngân sách, đội ngũ kỹ thuật đã bàn giao thành công ứng dụng di động đúng tiến độ.',
        detailedExplanation:
          "Sau giới từ 'Despite', ta phải dùng danh từ, cụm danh từ hoặc Danh động từ V-ing ('facing').",
        examTrap: "Phân biệt: 'Despite + V-ing / Noun phrase' nhưng 'Although + S + V'.",
      },
    ],
  },
  {
    day: 7,
    title: 'REVIEW TUẦN 1 (TỔNG ÔN THÌ & HÒA HỢP S-V)',
    titleEn: 'Week 1 Comprehensive Review & Practice Test',
    category: 'Review & Test',
    level: 'B1-B2 Intermediate',
    pageBookRef: 66,
    summary:
      'Tổng hợp và luyện đề thực chiến toàn bộ kiến thức 12 thì tiếng Anh và quy tắc hòa hợp chủ vị.',
    coreFormulas: [
      {
        formula: 'Key Formula for Day 7: REVIEW TUẦN 1 (TỔNG ÔN THÌ & HÒA HỢP S-V)',
        meaning:
          'Công thức trọng tâm và nguyên lý cốt lõi của REVIEW TUẦN 1 (TỔNG ÔN THÌ & HÒA HỢP S-V).',
        exampleEn:
          'Professional English example demonstrating Week 1 Comprehensive Review & Practice Test.',
        exampleVi:
          'Ví dụ tiếng Anh chuyên nghiệp minh họa cấu trúc của REVIEW TUẦN 1 (TỔNG ÔN THÌ & HÒA HỢP S-V).',
        signals: ['crucial indicator', 'context cue', 'exam keyword'],
        tip: 'Ghi nhớ mẹo làm bài thi: xác định thành phần trước và sau chỗ trống để chọn đúng dạng từ / cấu trúc.',
      },
    ],
    examTraps: [
      'Bẫy thường gặp trong đề thi TOEIC về REVIEW TUẦN 1 (TỔNG ÔN THÌ & HÒA HỢP S-V): thí sinh hay nhầm lẫn giữa dạng chủ động và bị động hoặc từ loại tương đồng.',
      'Quy tắc loại trừ nhanh: kiểm tra cấu trúc câu trước khi dịch nghĩa để tiết kiệm thời gian làm bài.',
    ],
    exercises: [
      {
        id: 'd7-q1',
        question:
          'The regional director emphasized that all department staff must comply _______ updated safety regulations.',
        options: ['with', 'to', 'for', 'at'],
        correctAnswer: 0,
        type: 'multiple-choice',
        difficulty: 'B1-B2 Intermediate',
        translation:
          'Giám đốc khu vực nhấn mạnh rằng toàn thể nhân viên phòng ban phải tuân thủ các quy định an toàn đã cập nhật.',
        detailedExplanation:
          "Cụm giới từ cố định (Collocation / Dependent preposition): 'comply with something' mang nghĩa tuân thủ, tuân theo quy định.",
        examTrap: "Thí sinh rất hay nhầm lẫn giữa 'comply with', 'conform to' và 'adhere to'.",
      },
      {
        id: 'd7-q2',
        question:
          'Despite _______ multiple budget reductions, the engineering team successfully delivered the mobile app on schedule.',
        options: ['facing', 'faced', 'faces', 'face'],
        correctAnswer: 0,
        type: 'multiple-choice',
        difficulty: 'B1-B2 Intermediate',
        translation:
          'Mặc dù phải đối mặt với nhiều lần cắt giảm ngân sách, đội ngũ kỹ thuật đã bàn giao thành công ứng dụng di động đúng tiến độ.',
        detailedExplanation:
          "Sau giới từ 'Despite', ta phải dùng danh từ, cụm danh từ hoặc Danh động từ V-ing ('facing').",
        examTrap: "Phân biệt: 'Despite + V-ing / Noun phrase' nhưng 'Although + S + V'.",
      },
    ],
  },
  {
    day: 8,
    title: 'BẪY VỀ CÂU BỊ ĐỘNG TRONG ĐỀ THI TOEIC',
    titleEn: 'Passive Voice Mastery & Exam Traps',
    category: 'Passive',
    level: 'B1-B2 Intermediate',
    pageBookRef: 70,
    summary:
      'Cấu trúc bị động, động từ 2 tân ngữ, bị động đặc biệt và bẫy nội động từ không có bị động.',
    coreFormulas: [
      {
        formula: 'Key Formula for Day 8: BẪY VỀ CÂU BỊ ĐỘNG TRONG ĐỀ THI TOEIC',
        meaning:
          'Công thức trọng tâm và nguyên lý cốt lõi của BẪY VỀ CÂU BỊ ĐỘNG TRONG ĐỀ THI TOEIC.',
        exampleEn: 'Professional English example demonstrating Passive Voice Mastery & Exam Traps.',
        exampleVi:
          'Ví dụ tiếng Anh chuyên nghiệp minh họa cấu trúc của BẪY VỀ CÂU BỊ ĐỘNG TRONG ĐỀ THI TOEIC.',
        signals: ['crucial indicator', 'context cue', 'exam keyword'],
        tip: 'Ghi nhớ mẹo làm bài thi: xác định thành phần trước và sau chỗ trống để chọn đúng dạng từ / cấu trúc.',
      },
    ],
    examTraps: [
      'Bẫy thường gặp trong đề thi TOEIC về BẪY VỀ CÂU BỊ ĐỘNG TRONG ĐỀ THI TOEIC: thí sinh hay nhầm lẫn giữa dạng chủ động và bị động hoặc từ loại tương đồng.',
      'Quy tắc loại trừ nhanh: kiểm tra cấu trúc câu trước khi dịch nghĩa để tiết kiệm thời gian làm bài.',
    ],
    exercises: [
      {
        id: 'd8-q1',
        question:
          'The regional director emphasized that all department staff must comply _______ updated safety regulations.',
        options: ['with', 'to', 'for', 'at'],
        correctAnswer: 0,
        type: 'multiple-choice',
        difficulty: 'B1-B2 Intermediate',
        translation:
          'Giám đốc khu vực nhấn mạnh rằng toàn thể nhân viên phòng ban phải tuân thủ các quy định an toàn đã cập nhật.',
        detailedExplanation:
          "Cụm giới từ cố định (Collocation / Dependent preposition): 'comply with something' mang nghĩa tuân thủ, tuân theo quy định.",
        examTrap: "Thí sinh rất hay nhầm lẫn giữa 'comply with', 'conform to' và 'adhere to'.",
      },
      {
        id: 'd8-q2',
        question:
          'Despite _______ multiple budget reductions, the engineering team successfully delivered the mobile app on schedule.',
        options: ['facing', 'faced', 'faces', 'face'],
        correctAnswer: 0,
        type: 'multiple-choice',
        difficulty: 'B1-B2 Intermediate',
        translation:
          'Mặc dù phải đối mặt với nhiều lần cắt giảm ngân sách, đội ngũ kỹ thuật đã bàn giao thành công ứng dụng di động đúng tiến độ.',
        detailedExplanation:
          "Sau giới từ 'Despite', ta phải dùng danh từ, cụm danh từ hoặc Danh động từ V-ing ('facing').",
        examTrap: "Phân biệt: 'Despite + V-ing / Noun phrase' nhưng 'Although + S + V'.",
      },
    ],
  },
  {
    day: 9,
    title: 'CẤU TRÚC BA LOẠI CÂU ĐIỀU KIỆN CƠ BẢN',
    titleEn: 'Conditionals Type 1, 2, 3 Essentials',
    category: 'Conditionals',
    level: 'A1-A2 Foundation',
    pageBookRef: 76,
    summary:
      'Câu điều kiện loại 1 (có thật ở hiện tại/tương lai), loại 2 (giả định trái ngược hiện tại), loại 3 (trái ngược quá khứ).',
    coreFormulas: [
      {
        formula: 'Key Formula for Day 9: CẤU TRÚC BA LOẠI CÂU ĐIỀU KIỆN CƠ BẢN',
        meaning:
          'Công thức trọng tâm và nguyên lý cốt lõi của CẤU TRÚC BA LOẠI CÂU ĐIỀU KIỆN CƠ BẢN.',
        exampleEn:
          'Professional English example demonstrating Conditionals Type 1, 2, 3 Essentials.',
        exampleVi:
          'Ví dụ tiếng Anh chuyên nghiệp minh họa cấu trúc của CẤU TRÚC BA LOẠI CÂU ĐIỀU KIỆN CƠ BẢN.',
        signals: ['crucial indicator', 'context cue', 'exam keyword'],
        tip: 'Ghi nhớ mẹo làm bài thi: xác định thành phần trước và sau chỗ trống để chọn đúng dạng từ / cấu trúc.',
      },
    ],
    examTraps: [
      'Bẫy thường gặp trong đề thi TOEIC về CẤU TRÚC BA LOẠI CÂU ĐIỀU KIỆN CƠ BẢN: thí sinh hay nhầm lẫn giữa dạng chủ động và bị động hoặc từ loại tương đồng.',
      'Quy tắc loại trừ nhanh: kiểm tra cấu trúc câu trước khi dịch nghĩa để tiết kiệm thời gian làm bài.',
    ],
    exercises: [
      {
        id: 'd9-q1',
        question:
          'The regional director emphasized that all department staff must comply _______ updated safety regulations.',
        options: ['with', 'to', 'for', 'at'],
        correctAnswer: 0,
        type: 'multiple-choice',
        difficulty: 'A1-A2 Foundation',
        translation:
          'Giám đốc khu vực nhấn mạnh rằng toàn thể nhân viên phòng ban phải tuân thủ các quy định an toàn đã cập nhật.',
        detailedExplanation:
          "Cụm giới từ cố định (Collocation / Dependent preposition): 'comply with something' mang nghĩa tuân thủ, tuân theo quy định.",
        examTrap: "Thí sinh rất hay nhầm lẫn giữa 'comply with', 'conform to' và 'adhere to'.",
      },
      {
        id: 'd9-q2',
        question:
          'Despite _______ multiple budget reductions, the engineering team successfully delivered the mobile app on schedule.',
        options: ['facing', 'faced', 'faces', 'face'],
        correctAnswer: 0,
        type: 'multiple-choice',
        difficulty: 'A1-A2 Foundation',
        translation:
          'Mặc dù phải đối mặt với nhiều lần cắt giảm ngân sách, đội ngũ kỹ thuật đã bàn giao thành công ứng dụng di động đúng tiến độ.',
        detailedExplanation:
          "Sau giới từ 'Despite', ta phải dùng danh từ, cụm danh từ hoặc Danh động từ V-ing ('facing').",
        examTrap: "Phân biệt: 'Despite + V-ing / Noun phrase' nhưng 'Although + S + V'.",
      },
    ],
  },
  {
    day: 10,
    title: 'CÂU ĐIỀU KIỆN NÂNG CAO VÀ ĐẢO NGỮ',
    titleEn: 'Mixed Conditionals & Inversion in Conditionals',
    category: 'Conditionals',
    level: 'C1 / TOEIC 800+',
    pageBookRef: 86,
    summary:
      'Điều kiện hỗn hợp (Mixed conditionals) và đảo ngữ với Should, Were, Had trong đề thi TOEIC.',
    coreFormulas: [
      {
        formula: 'Key Formula for Day 10: CÂU ĐIỀU KIỆN NÂNG CAO VÀ ĐẢO NGỮ',
        meaning: 'Công thức trọng tâm và nguyên lý cốt lõi của CÂU ĐIỀU KIỆN NÂNG CAO VÀ ĐẢO NGỮ.',
        exampleEn:
          'Professional English example demonstrating Mixed Conditionals & Inversion in Conditionals.',
        exampleVi:
          'Ví dụ tiếng Anh chuyên nghiệp minh họa cấu trúc của CÂU ĐIỀU KIỆN NÂNG CAO VÀ ĐẢO NGỮ.',
        signals: ['crucial indicator', 'context cue', 'exam keyword'],
        tip: 'Ghi nhớ mẹo làm bài thi: xác định thành phần trước và sau chỗ trống để chọn đúng dạng từ / cấu trúc.',
      },
    ],
    examTraps: [
      'Bẫy thường gặp trong đề thi TOEIC về CÂU ĐIỀU KIỆN NÂNG CAO VÀ ĐẢO NGỮ: thí sinh hay nhầm lẫn giữa dạng chủ động và bị động hoặc từ loại tương đồng.',
      'Quy tắc loại trừ nhanh: kiểm tra cấu trúc câu trước khi dịch nghĩa để tiết kiệm thời gian làm bài.',
    ],
    exercises: [
      {
        id: 'd10-q1',
        question:
          'The regional director emphasized that all department staff must comply _______ updated safety regulations.',
        options: ['with', 'to', 'for', 'at'],
        correctAnswer: 0,
        type: 'multiple-choice',
        difficulty: 'C1 / TOEIC 800+',
        translation:
          'Giám đốc khu vực nhấn mạnh rằng toàn thể nhân viên phòng ban phải tuân thủ các quy định an toàn đã cập nhật.',
        detailedExplanation:
          "Cụm giới từ cố định (Collocation / Dependent preposition): 'comply with something' mang nghĩa tuân thủ, tuân theo quy định.",
        examTrap: "Thí sinh rất hay nhầm lẫn giữa 'comply with', 'conform to' và 'adhere to'.",
      },
      {
        id: 'd10-q2',
        question:
          'Despite _______ multiple budget reductions, the engineering team successfully delivered the mobile app on schedule.',
        options: ['facing', 'faced', 'faces', 'face'],
        correctAnswer: 0,
        type: 'multiple-choice',
        difficulty: 'C1 / TOEIC 800+',
        translation:
          'Mặc dù phải đối mặt với nhiều lần cắt giảm ngân sách, đội ngũ kỹ thuật đã bàn giao thành công ứng dụng di động đúng tiến độ.',
        detailedExplanation:
          "Sau giới từ 'Despite', ta phải dùng danh từ, cụm danh từ hoặc Danh động từ V-ing ('facing').",
        examTrap: "Phân biệt: 'Despite + V-ing / Noun phrase' nhưng 'Although + S + V'.",
      },
    ],
  },
  {
    day: 11,
    title: 'MỆNH ĐỀ QUAN HỆ (RELATIVE CLAUSES)',
    titleEn: 'Relative Pronouns & Defining Clauses',
    category: 'Clauses',
    level: 'A1-A2 Foundation',
    pageBookRef: 91,
    summary: 'Cách dùng Who, Whom, Which, That, Whose và trạng từ quan hệ Where, When, Why.',
    coreFormulas: [
      {
        formula: 'Key Formula for Day 11: MỆNH ĐỀ QUAN HỆ (RELATIVE CLAUSES)',
        meaning: 'Công thức trọng tâm và nguyên lý cốt lõi của MỆNH ĐỀ QUAN HỆ (RELATIVE CLAUSES).',
        exampleEn:
          'Professional English example demonstrating Relative Pronouns & Defining Clauses.',
        exampleVi:
          'Ví dụ tiếng Anh chuyên nghiệp minh họa cấu trúc của MỆNH ĐỀ QUAN HỆ (RELATIVE CLAUSES).',
        signals: ['crucial indicator', 'context cue', 'exam keyword'],
        tip: 'Ghi nhớ mẹo làm bài thi: xác định thành phần trước và sau chỗ trống để chọn đúng dạng từ / cấu trúc.',
      },
    ],
    examTraps: [
      'Bẫy thường gặp trong đề thi TOEIC về MỆNH ĐỀ QUAN HỆ (RELATIVE CLAUSES): thí sinh hay nhầm lẫn giữa dạng chủ động và bị động hoặc từ loại tương đồng.',
      'Quy tắc loại trừ nhanh: kiểm tra cấu trúc câu trước khi dịch nghĩa để tiết kiệm thời gian làm bài.',
    ],
    exercises: [
      {
        id: 'd11-q1',
        question:
          'The regional director emphasized that all department staff must comply _______ updated safety regulations.',
        options: ['with', 'to', 'for', 'at'],
        correctAnswer: 0,
        type: 'multiple-choice',
        difficulty: 'A1-A2 Foundation',
        translation:
          'Giám đốc khu vực nhấn mạnh rằng toàn thể nhân viên phòng ban phải tuân thủ các quy định an toàn đã cập nhật.',
        detailedExplanation:
          "Cụm giới từ cố định (Collocation / Dependent preposition): 'comply with something' mang nghĩa tuân thủ, tuân theo quy định.",
        examTrap: "Thí sinh rất hay nhầm lẫn giữa 'comply with', 'conform to' và 'adhere to'.",
      },
      {
        id: 'd11-q2',
        question:
          'Despite _______ multiple budget reductions, the engineering team successfully delivered the mobile app on schedule.',
        options: ['facing', 'faced', 'faces', 'face'],
        correctAnswer: 0,
        type: 'multiple-choice',
        difficulty: 'A1-A2 Foundation',
        translation:
          'Mặc dù phải đối mặt với nhiều lần cắt giảm ngân sách, đội ngũ kỹ thuật đã bàn giao thành công ứng dụng di động đúng tiến độ.',
        detailedExplanation:
          "Sau giới từ 'Despite', ta phải dùng danh từ, cụm danh từ hoặc Danh động từ V-ing ('facing').",
        examTrap: "Phân biệt: 'Despite + V-ing / Noun phrase' nhưng 'Although + S + V'.",
      },
    ],
  },
  {
    day: 12,
    title: 'BẪY MỆNH ĐỀ QUAN HỆ & RÚT GỌN',
    titleEn: 'Reduced Relative Clauses & Advanced Traps',
    category: 'Clauses',
    level: 'B1-B2 Intermediate',
    pageBookRef: 97,
    summary:
      'Rút gọn mệnh đề quan hệ dạng V-ing (chủ động), V-ed/V3 (bị động) và To-V; giới từ đi kèm đại từ quan hệ.',
    coreFormulas: [
      {
        formula: 'Key Formula for Day 12: BẪY MỆNH ĐỀ QUAN HỆ & RÚT GỌN',
        meaning: 'Công thức trọng tâm và nguyên lý cốt lõi của BẪY MỆNH ĐỀ QUAN HỆ & RÚT GỌN.',
        exampleEn:
          'Professional English example demonstrating Reduced Relative Clauses & Advanced Traps.',
        exampleVi:
          'Ví dụ tiếng Anh chuyên nghiệp minh họa cấu trúc của BẪY MỆNH ĐỀ QUAN HỆ & RÚT GỌN.',
        signals: ['crucial indicator', 'context cue', 'exam keyword'],
        tip: 'Ghi nhớ mẹo làm bài thi: xác định thành phần trước và sau chỗ trống để chọn đúng dạng từ / cấu trúc.',
      },
    ],
    examTraps: [
      'Bẫy thường gặp trong đề thi TOEIC về BẪY MỆNH ĐỀ QUAN HỆ & RÚT GỌN: thí sinh hay nhầm lẫn giữa dạng chủ động và bị động hoặc từ loại tương đồng.',
      'Quy tắc loại trừ nhanh: kiểm tra cấu trúc câu trước khi dịch nghĩa để tiết kiệm thời gian làm bài.',
    ],
    exercises: [
      {
        id: 'd12-q1',
        question:
          'The regional director emphasized that all department staff must comply _______ updated safety regulations.',
        options: ['with', 'to', 'for', 'at'],
        correctAnswer: 0,
        type: 'multiple-choice',
        difficulty: 'B1-B2 Intermediate',
        translation:
          'Giám đốc khu vực nhấn mạnh rằng toàn thể nhân viên phòng ban phải tuân thủ các quy định an toàn đã cập nhật.',
        detailedExplanation:
          "Cụm giới từ cố định (Collocation / Dependent preposition): 'comply with something' mang nghĩa tuân thủ, tuân theo quy định.",
        examTrap: "Thí sinh rất hay nhầm lẫn giữa 'comply with', 'conform to' và 'adhere to'.",
      },
      {
        id: 'd12-q2',
        question:
          'Despite _______ multiple budget reductions, the engineering team successfully delivered the mobile app on schedule.',
        options: ['facing', 'faced', 'faces', 'face'],
        correctAnswer: 0,
        type: 'multiple-choice',
        difficulty: 'B1-B2 Intermediate',
        translation:
          'Mặc dù phải đối mặt với nhiều lần cắt giảm ngân sách, đội ngũ kỹ thuật đã bàn giao thành công ứng dụng di động đúng tiến độ.',
        detailedExplanation:
          "Sau giới từ 'Despite', ta phải dùng danh từ, cụm danh từ hoặc Danh động từ V-ing ('facing').",
        examTrap: "Phân biệt: 'Despite + V-ing / Noun phrase' nhưng 'Although + S + V'.",
      },
    ],
  },
  {
    day: 13,
    title: 'REVIEW TUẦN 2 (BỊ ĐỘNG, ĐIỀU KIỆN, MỆNH ĐỀ)',
    titleEn: 'Week 2 Comprehensive Review & Test',
    category: 'Review & Test',
    level: 'B1-B2 Intermediate',
    pageBookRef: 103,
    summary: 'Đề kiểm tra tổng hợp tuần 2 củng cố chắc chắn Bị động, Điều kiện và Mệnh đề quan hệ.',
    coreFormulas: [
      {
        formula: 'Key Formula for Day 13: REVIEW TUẦN 2 (BỊ ĐỘNG, ĐIỀU KIỆN, MỆNH ĐỀ)',
        meaning:
          'Công thức trọng tâm và nguyên lý cốt lõi của REVIEW TUẦN 2 (BỊ ĐỘNG, ĐIỀU KIỆN, MỆNH ĐỀ).',
        exampleEn: 'Professional English example demonstrating Week 2 Comprehensive Review & Test.',
        exampleVi:
          'Ví dụ tiếng Anh chuyên nghiệp minh họa cấu trúc của REVIEW TUẦN 2 (BỊ ĐỘNG, ĐIỀU KIỆN, MỆNH ĐỀ).',
        signals: ['crucial indicator', 'context cue', 'exam keyword'],
        tip: 'Ghi nhớ mẹo làm bài thi: xác định thành phần trước và sau chỗ trống để chọn đúng dạng từ / cấu trúc.',
      },
    ],
    examTraps: [
      'Bẫy thường gặp trong đề thi TOEIC về REVIEW TUẦN 2 (BỊ ĐỘNG, ĐIỀU KIỆN, MỆNH ĐỀ): thí sinh hay nhầm lẫn giữa dạng chủ động và bị động hoặc từ loại tương đồng.',
      'Quy tắc loại trừ nhanh: kiểm tra cấu trúc câu trước khi dịch nghĩa để tiết kiệm thời gian làm bài.',
    ],
    exercises: [
      {
        id: 'd13-q1',
        question:
          'The regional director emphasized that all department staff must comply _______ updated safety regulations.',
        options: ['with', 'to', 'for', 'at'],
        correctAnswer: 0,
        type: 'multiple-choice',
        difficulty: 'B1-B2 Intermediate',
        translation:
          'Giám đốc khu vực nhấn mạnh rằng toàn thể nhân viên phòng ban phải tuân thủ các quy định an toàn đã cập nhật.',
        detailedExplanation:
          "Cụm giới từ cố định (Collocation / Dependent preposition): 'comply with something' mang nghĩa tuân thủ, tuân theo quy định.",
        examTrap: "Thí sinh rất hay nhầm lẫn giữa 'comply with', 'conform to' và 'adhere to'.",
      },
      {
        id: 'd13-q2',
        question:
          'Despite _______ multiple budget reductions, the engineering team successfully delivered the mobile app on schedule.',
        options: ['facing', 'faced', 'faces', 'face'],
        correctAnswer: 0,
        type: 'multiple-choice',
        difficulty: 'B1-B2 Intermediate',
        translation:
          'Mặc dù phải đối mặt với nhiều lần cắt giảm ngân sách, đội ngũ kỹ thuật đã bàn giao thành công ứng dụng di động đúng tiến độ.',
        detailedExplanation:
          "Sau giới từ 'Despite', ta phải dùng danh từ, cụm danh từ hoặc Danh động từ V-ing ('facing').",
        examTrap: "Phân biệt: 'Despite + V-ing / Noun phrase' nhưng 'Although + S + V'.",
      },
    ],
  },
  {
    day: 14,
    title: 'ĐẠI TỪ (PRONOUNS)',
    titleEn: 'Personal, Possessive & Reflexive Pronouns',
    category: 'Parts of Speech',
    level: 'A1-A2 Foundation',
    pageBookRef: 106,
    summary:
      'Phân biệt đại từ nhân xưng, tân ngữ, tính từ sở hữu, đại từ sở hữu và đại từ phản thân (-self/-selves).',
    coreFormulas: [
      {
        formula: 'Key Formula for Day 14: ĐẠI TỪ (PRONOUNS)',
        meaning: 'Công thức trọng tâm và nguyên lý cốt lõi của ĐẠI TỪ (PRONOUNS).',
        exampleEn:
          'Professional English example demonstrating Personal, Possessive & Reflexive Pronouns.',
        exampleVi: 'Ví dụ tiếng Anh chuyên nghiệp minh họa cấu trúc của ĐẠI TỪ (PRONOUNS).',
        signals: ['crucial indicator', 'context cue', 'exam keyword'],
        tip: 'Ghi nhớ mẹo làm bài thi: xác định thành phần trước và sau chỗ trống để chọn đúng dạng từ / cấu trúc.',
      },
    ],
    examTraps: [
      'Bẫy thường gặp trong đề thi TOEIC về ĐẠI TỪ (PRONOUNS): thí sinh hay nhầm lẫn giữa dạng chủ động và bị động hoặc từ loại tương đồng.',
      'Quy tắc loại trừ nhanh: kiểm tra cấu trúc câu trước khi dịch nghĩa để tiết kiệm thời gian làm bài.',
    ],
    exercises: [
      {
        id: 'd14-q1',
        question:
          'The regional director emphasized that all department staff must comply _______ updated safety regulations.',
        options: ['with', 'to', 'for', 'at'],
        correctAnswer: 0,
        type: 'multiple-choice',
        difficulty: 'A1-A2 Foundation',
        translation:
          'Giám đốc khu vực nhấn mạnh rằng toàn thể nhân viên phòng ban phải tuân thủ các quy định an toàn đã cập nhật.',
        detailedExplanation:
          "Cụm giới từ cố định (Collocation / Dependent preposition): 'comply with something' mang nghĩa tuân thủ, tuân theo quy định.",
        examTrap: "Thí sinh rất hay nhầm lẫn giữa 'comply with', 'conform to' và 'adhere to'.",
      },
      {
        id: 'd14-q2',
        question:
          'Despite _______ multiple budget reductions, the engineering team successfully delivered the mobile app on schedule.',
        options: ['facing', 'faced', 'faces', 'face'],
        correctAnswer: 0,
        type: 'multiple-choice',
        difficulty: 'A1-A2 Foundation',
        translation:
          'Mặc dù phải đối mặt với nhiều lần cắt giảm ngân sách, đội ngũ kỹ thuật đã bàn giao thành công ứng dụng di động đúng tiến độ.',
        detailedExplanation:
          "Sau giới từ 'Despite', ta phải dùng danh từ, cụm danh từ hoặc Danh động từ V-ing ('facing').",
        examTrap: "Phân biệt: 'Despite + V-ing / Noun phrase' nhưng 'Although + S + V'.",
      },
    ],
  },
  {
    day: 15,
    title: 'DANH TỪ (NOUNS)',
    titleEn: 'Noun Positions & Common Suffixes',
    category: 'Parts of Speech',
    level: 'A1-A2 Foundation',
    pageBookRef: 114,
    summary:
      'Vị trí của danh từ trong câu, dấu hiệu nhận biết đuôi danh từ (-tion, -ment, -ness, -ity, -ance, -er, -or).',
    coreFormulas: [
      {
        formula: 'Key Formula for Day 15: DANH TỪ (NOUNS)',
        meaning: 'Công thức trọng tâm và nguyên lý cốt lõi của DANH TỪ (NOUNS).',
        exampleEn: 'Professional English example demonstrating Noun Positions & Common Suffixes.',
        exampleVi: 'Ví dụ tiếng Anh chuyên nghiệp minh họa cấu trúc của DANH TỪ (NOUNS).',
        signals: ['crucial indicator', 'context cue', 'exam keyword'],
        tip: 'Ghi nhớ mẹo làm bài thi: xác định thành phần trước và sau chỗ trống để chọn đúng dạng từ / cấu trúc.',
      },
    ],
    examTraps: [
      'Bẫy thường gặp trong đề thi TOEIC về DANH TỪ (NOUNS): thí sinh hay nhầm lẫn giữa dạng chủ động và bị động hoặc từ loại tương đồng.',
      'Quy tắc loại trừ nhanh: kiểm tra cấu trúc câu trước khi dịch nghĩa để tiết kiệm thời gian làm bài.',
    ],
    exercises: [
      {
        id: 'd15-q1',
        question:
          'The regional director emphasized that all department staff must comply _______ updated safety regulations.',
        options: ['with', 'to', 'for', 'at'],
        correctAnswer: 0,
        type: 'multiple-choice',
        difficulty: 'A1-A2 Foundation',
        translation:
          'Giám đốc khu vực nhấn mạnh rằng toàn thể nhân viên phòng ban phải tuân thủ các quy định an toàn đã cập nhật.',
        detailedExplanation:
          "Cụm giới từ cố định (Collocation / Dependent preposition): 'comply with something' mang nghĩa tuân thủ, tuân theo quy định.",
        examTrap: "Thí sinh rất hay nhầm lẫn giữa 'comply with', 'conform to' và 'adhere to'.",
      },
      {
        id: 'd15-q2',
        question:
          'Despite _______ multiple budget reductions, the engineering team successfully delivered the mobile app on schedule.',
        options: ['facing', 'faced', 'faces', 'face'],
        correctAnswer: 0,
        type: 'multiple-choice',
        difficulty: 'A1-A2 Foundation',
        translation:
          'Mặc dù phải đối mặt với nhiều lần cắt giảm ngân sách, đội ngũ kỹ thuật đã bàn giao thành công ứng dụng di động đúng tiến độ.',
        detailedExplanation:
          "Sau giới từ 'Despite', ta phải dùng danh từ, cụm danh từ hoặc Danh động từ V-ing ('facing').",
        examTrap: "Phân biệt: 'Despite + V-ing / Noun phrase' nhưng 'Although + S + V'.",
      },
    ],
  },
  {
    day: 16,
    title: 'DANH TỪ ĐẾM ĐƯỢC VÀ KHÔNG ĐẾM ĐƯỢC',
    titleEn: 'Countable vs Uncountable Nouns & Quantifiers',
    category: 'Parts of Speech',
    level: 'B1-B2 Intermediate',
    pageBookRef: 120,
    summary:
      'Danh từ không đếm được đặc trưng trong TOEIC (information, equipment, advice, luggage) và lượng từ (many/much, few/little).',
    coreFormulas: [
      {
        formula: 'Key Formula for Day 16: DANH TỪ ĐẾM ĐƯỢC VÀ KHÔNG ĐẾM ĐƯỢC',
        meaning: 'Công thức trọng tâm và nguyên lý cốt lõi của DANH TỪ ĐẾM ĐƯỢC VÀ KHÔNG ĐẾM ĐƯỢC.',
        exampleEn:
          'Professional English example demonstrating Countable vs Uncountable Nouns & Quantifiers.',
        exampleVi:
          'Ví dụ tiếng Anh chuyên nghiệp minh họa cấu trúc của DANH TỪ ĐẾM ĐƯỢC VÀ KHÔNG ĐẾM ĐƯỢC.',
        signals: ['crucial indicator', 'context cue', 'exam keyword'],
        tip: 'Ghi nhớ mẹo làm bài thi: xác định thành phần trước và sau chỗ trống để chọn đúng dạng từ / cấu trúc.',
      },
    ],
    examTraps: [
      'Bẫy thường gặp trong đề thi TOEIC về DANH TỪ ĐẾM ĐƯỢC VÀ KHÔNG ĐẾM ĐƯỢC: thí sinh hay nhầm lẫn giữa dạng chủ động và bị động hoặc từ loại tương đồng.',
      'Quy tắc loại trừ nhanh: kiểm tra cấu trúc câu trước khi dịch nghĩa để tiết kiệm thời gian làm bài.',
    ],
    exercises: [
      {
        id: 'd16-q1',
        question:
          'The regional director emphasized that all department staff must comply _______ updated safety regulations.',
        options: ['with', 'to', 'for', 'at'],
        correctAnswer: 0,
        type: 'multiple-choice',
        difficulty: 'B1-B2 Intermediate',
        translation:
          'Giám đốc khu vực nhấn mạnh rằng toàn thể nhân viên phòng ban phải tuân thủ các quy định an toàn đã cập nhật.',
        detailedExplanation:
          "Cụm giới từ cố định (Collocation / Dependent preposition): 'comply with something' mang nghĩa tuân thủ, tuân theo quy định.",
        examTrap: "Thí sinh rất hay nhầm lẫn giữa 'comply with', 'conform to' và 'adhere to'.",
      },
      {
        id: 'd16-q2',
        question:
          'Despite _______ multiple budget reductions, the engineering team successfully delivered the mobile app on schedule.',
        options: ['facing', 'faced', 'faces', 'face'],
        correctAnswer: 0,
        type: 'multiple-choice',
        difficulty: 'B1-B2 Intermediate',
        translation:
          'Mặc dù phải đối mặt với nhiều lần cắt giảm ngân sách, đội ngũ kỹ thuật đã bàn giao thành công ứng dụng di động đúng tiến độ.',
        detailedExplanation:
          "Sau giới từ 'Despite', ta phải dùng danh từ, cụm danh từ hoặc Danh động từ V-ing ('facing').",
        examTrap: "Phân biệt: 'Despite + V-ing / Noun phrase' nhưng 'Although + S + V'.",
      },
    ],
  },
  {
    day: 17,
    title: 'CÁC COLLOCATION DANH TỪ THƯỜNG GẶP',
    titleEn: 'Essential Business Noun Collocations',
    category: 'Collocations',
    level: 'B1-B2 Intermediate',
    pageBookRef: 127,
    summary:
      'Các cụm collocation danh từ kinh điển: take responsibility, make a decision, gain access to, express interest in.',
    coreFormulas: [
      {
        formula: 'Key Formula for Day 17: CÁC COLLOCATION DANH TỪ THƯỜNG GẶP',
        meaning: 'Công thức trọng tâm và nguyên lý cốt lõi của CÁC COLLOCATION DANH TỪ THƯỜNG GẶP.',
        exampleEn:
          'Professional English example demonstrating Essential Business Noun Collocations.',
        exampleVi:
          'Ví dụ tiếng Anh chuyên nghiệp minh họa cấu trúc của CÁC COLLOCATION DANH TỪ THƯỜNG GẶP.',
        signals: ['crucial indicator', 'context cue', 'exam keyword'],
        tip: 'Ghi nhớ mẹo làm bài thi: xác định thành phần trước và sau chỗ trống để chọn đúng dạng từ / cấu trúc.',
      },
    ],
    examTraps: [
      'Bẫy thường gặp trong đề thi TOEIC về CÁC COLLOCATION DANH TỪ THƯỜNG GẶP: thí sinh hay nhầm lẫn giữa dạng chủ động và bị động hoặc từ loại tương đồng.',
      'Quy tắc loại trừ nhanh: kiểm tra cấu trúc câu trước khi dịch nghĩa để tiết kiệm thời gian làm bài.',
    ],
    exercises: [
      {
        id: 'd17-q1',
        question:
          'The regional director emphasized that all department staff must comply _______ updated safety regulations.',
        options: ['with', 'to', 'for', 'at'],
        correctAnswer: 0,
        type: 'multiple-choice',
        difficulty: 'B1-B2 Intermediate',
        translation:
          'Giám đốc khu vực nhấn mạnh rằng toàn thể nhân viên phòng ban phải tuân thủ các quy định an toàn đã cập nhật.',
        detailedExplanation:
          "Cụm giới từ cố định (Collocation / Dependent preposition): 'comply with something' mang nghĩa tuân thủ, tuân theo quy định.",
        examTrap: "Thí sinh rất hay nhầm lẫn giữa 'comply with', 'conform to' và 'adhere to'.",
      },
      {
        id: 'd17-q2',
        question:
          'Despite _______ multiple budget reductions, the engineering team successfully delivered the mobile app on schedule.',
        options: ['facing', 'faced', 'faces', 'face'],
        correctAnswer: 0,
        type: 'multiple-choice',
        difficulty: 'B1-B2 Intermediate',
        translation:
          'Mặc dù phải đối mặt với nhiều lần cắt giảm ngân sách, đội ngũ kỹ thuật đã bàn giao thành công ứng dụng di động đúng tiến độ.',
        detailedExplanation:
          "Sau giới từ 'Despite', ta phải dùng danh từ, cụm danh từ hoặc Danh động từ V-ing ('facing').",
        examTrap: "Phân biệt: 'Despite + V-ing / Noun phrase' nhưng 'Although + S + V'.",
      },
    ],
  },
  {
    day: 18,
    title: 'BẪY DANH TỪ TRONG MỆNH ĐỀ TOEIC',
    titleEn: 'Noun Traps: Person vs Thing & Compounds',
    category: 'Parts of Speech',
    level: 'C1 / TOEIC 800+',
    pageBookRef: 131,
    summary:
      'Bẫy phân biệt danh từ chỉ người và chỉ vật (applicant vs application) và cụm danh từ ghép (compound nouns).',
    coreFormulas: [
      {
        formula: 'Key Formula for Day 18: BẪY DANH TỪ TRONG MỆNH ĐỀ TOEIC',
        meaning: 'Công thức trọng tâm và nguyên lý cốt lõi của BẪY DANH TỪ TRONG MỆNH ĐỀ TOEIC.',
        exampleEn:
          'Professional English example demonstrating Noun Traps: Person vs Thing & Compounds.',
        exampleVi:
          'Ví dụ tiếng Anh chuyên nghiệp minh họa cấu trúc của BẪY DANH TỪ TRONG MỆNH ĐỀ TOEIC.',
        signals: ['crucial indicator', 'context cue', 'exam keyword'],
        tip: 'Ghi nhớ mẹo làm bài thi: xác định thành phần trước và sau chỗ trống để chọn đúng dạng từ / cấu trúc.',
      },
    ],
    examTraps: [
      'Bẫy thường gặp trong đề thi TOEIC về BẪY DANH TỪ TRONG MỆNH ĐỀ TOEIC: thí sinh hay nhầm lẫn giữa dạng chủ động và bị động hoặc từ loại tương đồng.',
      'Quy tắc loại trừ nhanh: kiểm tra cấu trúc câu trước khi dịch nghĩa để tiết kiệm thời gian làm bài.',
    ],
    exercises: [
      {
        id: 'd18-q1',
        question:
          'The regional director emphasized that all department staff must comply _______ updated safety regulations.',
        options: ['with', 'to', 'for', 'at'],
        correctAnswer: 0,
        type: 'multiple-choice',
        difficulty: 'C1 / TOEIC 800+',
        translation:
          'Giám đốc khu vực nhấn mạnh rằng toàn thể nhân viên phòng ban phải tuân thủ các quy định an toàn đã cập nhật.',
        detailedExplanation:
          "Cụm giới từ cố định (Collocation / Dependent preposition): 'comply with something' mang nghĩa tuân thủ, tuân theo quy định.",
        examTrap: "Thí sinh rất hay nhầm lẫn giữa 'comply with', 'conform to' và 'adhere to'.",
      },
      {
        id: 'd18-q2',
        question:
          'Despite _______ multiple budget reductions, the engineering team successfully delivered the mobile app on schedule.',
        options: ['facing', 'faced', 'faces', 'face'],
        correctAnswer: 0,
        type: 'multiple-choice',
        difficulty: 'C1 / TOEIC 800+',
        translation:
          'Mặc dù phải đối mặt với nhiều lần cắt giảm ngân sách, đội ngũ kỹ thuật đã bàn giao thành công ứng dụng di động đúng tiến độ.',
        detailedExplanation:
          "Sau giới từ 'Despite', ta phải dùng danh từ, cụm danh từ hoặc Danh động từ V-ing ('facing').",
        examTrap: "Phân biệt: 'Despite + V-ing / Noun phrase' nhưng 'Although + S + V'.",
      },
    ],
  },
  {
    day: 19,
    title: 'TÍNH TỪ (ADJECTIVES)',
    titleEn: 'Adjective Functions, Suffixes & -ing vs -ed',
    category: 'Parts of Speech',
    level: 'A1-A2 Foundation',
    pageBookRef: 137,
    summary:
      'Vị trí tính từ trước danh từ và sau linking verbs; phân biệt tính từ đuôi -ing (bản chất) và -ed (cảm xúc).',
    coreFormulas: [
      {
        formula: 'Key Formula for Day 19: TÍNH TỪ (ADJECTIVES)',
        meaning: 'Công thức trọng tâm và nguyên lý cốt lõi của TÍNH TỪ (ADJECTIVES).',
        exampleEn:
          'Professional English example demonstrating Adjective Functions, Suffixes & -ing vs -ed.',
        exampleVi: 'Ví dụ tiếng Anh chuyên nghiệp minh họa cấu trúc của TÍNH TỪ (ADJECTIVES).',
        signals: ['crucial indicator', 'context cue', 'exam keyword'],
        tip: 'Ghi nhớ mẹo làm bài thi: xác định thành phần trước và sau chỗ trống để chọn đúng dạng từ / cấu trúc.',
      },
    ],
    examTraps: [
      'Bẫy thường gặp trong đề thi TOEIC về TÍNH TỪ (ADJECTIVES): thí sinh hay nhầm lẫn giữa dạng chủ động và bị động hoặc từ loại tương đồng.',
      'Quy tắc loại trừ nhanh: kiểm tra cấu trúc câu trước khi dịch nghĩa để tiết kiệm thời gian làm bài.',
    ],
    exercises: [
      {
        id: 'd19-q1',
        question:
          'The regional director emphasized that all department staff must comply _______ updated safety regulations.',
        options: ['with', 'to', 'for', 'at'],
        correctAnswer: 0,
        type: 'multiple-choice',
        difficulty: 'A1-A2 Foundation',
        translation:
          'Giám đốc khu vực nhấn mạnh rằng toàn thể nhân viên phòng ban phải tuân thủ các quy định an toàn đã cập nhật.',
        detailedExplanation:
          "Cụm giới từ cố định (Collocation / Dependent preposition): 'comply with something' mang nghĩa tuân thủ, tuân theo quy định.",
        examTrap: "Thí sinh rất hay nhầm lẫn giữa 'comply with', 'conform to' và 'adhere to'.",
      },
      {
        id: 'd19-q2',
        question:
          'Despite _______ multiple budget reductions, the engineering team successfully delivered the mobile app on schedule.',
        options: ['facing', 'faced', 'faces', 'face'],
        correctAnswer: 0,
        type: 'multiple-choice',
        difficulty: 'A1-A2 Foundation',
        translation:
          'Mặc dù phải đối mặt với nhiều lần cắt giảm ngân sách, đội ngũ kỹ thuật đã bàn giao thành công ứng dụng di động đúng tiến độ.',
        detailedExplanation:
          "Sau giới từ 'Despite', ta phải dùng danh từ, cụm danh từ hoặc Danh động từ V-ing ('facing').",
        examTrap: "Phân biệt: 'Despite + V-ing / Noun phrase' nhưng 'Although + S + V'.",
      },
    ],
  },
  {
    day: 20,
    title: 'CÁC COLLOCATION CỦA TÍNH TỪ THƯỜNG GẶP',
    titleEn: 'High-Frequency Adjective Collocations',
    category: 'Collocations',
    level: 'B1-B2 Intermediate',
    pageBookRef: 145,
    summary:
      'Các cụm tính từ chuyên nghiệp: highly competitive, strongly recommended, deeply concerned, mutually beneficial.',
    coreFormulas: [
      {
        formula: 'Key Formula for Day 20: CÁC COLLOCATION CỦA TÍNH TỪ THƯỜNG GẶP',
        meaning:
          'Công thức trọng tâm và nguyên lý cốt lõi của CÁC COLLOCATION CỦA TÍNH TỪ THƯỜNG GẶP.',
        exampleEn:
          'Professional English example demonstrating High-Frequency Adjective Collocations.',
        exampleVi:
          'Ví dụ tiếng Anh chuyên nghiệp minh họa cấu trúc của CÁC COLLOCATION CỦA TÍNH TỪ THƯỜNG GẶP.',
        signals: ['crucial indicator', 'context cue', 'exam keyword'],
        tip: 'Ghi nhớ mẹo làm bài thi: xác định thành phần trước và sau chỗ trống để chọn đúng dạng từ / cấu trúc.',
      },
    ],
    examTraps: [
      'Bẫy thường gặp trong đề thi TOEIC về CÁC COLLOCATION CỦA TÍNH TỪ THƯỜNG GẶP: thí sinh hay nhầm lẫn giữa dạng chủ động và bị động hoặc từ loại tương đồng.',
      'Quy tắc loại trừ nhanh: kiểm tra cấu trúc câu trước khi dịch nghĩa để tiết kiệm thời gian làm bài.',
    ],
    exercises: [
      {
        id: 'd20-q1',
        question:
          'The regional director emphasized that all department staff must comply _______ updated safety regulations.',
        options: ['with', 'to', 'for', 'at'],
        correctAnswer: 0,
        type: 'multiple-choice',
        difficulty: 'B1-B2 Intermediate',
        translation:
          'Giám đốc khu vực nhấn mạnh rằng toàn thể nhân viên phòng ban phải tuân thủ các quy định an toàn đã cập nhật.',
        detailedExplanation:
          "Cụm giới từ cố định (Collocation / Dependent preposition): 'comply with something' mang nghĩa tuân thủ, tuân theo quy định.",
        examTrap: "Thí sinh rất hay nhầm lẫn giữa 'comply with', 'conform to' và 'adhere to'.",
      },
      {
        id: 'd20-q2',
        question:
          'Despite _______ multiple budget reductions, the engineering team successfully delivered the mobile app on schedule.',
        options: ['facing', 'faced', 'faces', 'face'],
        correctAnswer: 0,
        type: 'multiple-choice',
        difficulty: 'B1-B2 Intermediate',
        translation:
          'Mặc dù phải đối mặt với nhiều lần cắt giảm ngân sách, đội ngũ kỹ thuật đã bàn giao thành công ứng dụng di động đúng tiến độ.',
        detailedExplanation:
          "Sau giới từ 'Despite', ta phải dùng danh từ, cụm danh từ hoặc Danh động từ V-ing ('facing').",
        examTrap: "Phân biệt: 'Despite + V-ing / Noun phrase' nhưng 'Although + S + V'.",
      },
    ],
  },
  {
    day: 21,
    title: 'BẪY TÍNH TỪ TRONG ĐỀ THI TOEIC',
    titleEn: 'Adjective Traps: -ly Adjectives & OSASCOMP',
    category: 'Parts of Speech',
    level: 'C1 / TOEIC 800+',
    pageBookRef: 153,
    summary:
      'Bẫy tính từ có đuôi -ly (friendly, timely, costly), trật tự tính từ trước danh từ và tính từ ghép.',
    coreFormulas: [
      {
        formula: 'Key Formula for Day 21: BẪY TÍNH TỪ TRONG ĐỀ THI TOEIC',
        meaning: 'Công thức trọng tâm và nguyên lý cốt lõi của BẪY TÍNH TỪ TRONG ĐỀ THI TOEIC.',
        exampleEn:
          'Professional English example demonstrating Adjective Traps: -ly Adjectives & OSASCOMP.',
        exampleVi:
          'Ví dụ tiếng Anh chuyên nghiệp minh họa cấu trúc của BẪY TÍNH TỪ TRONG ĐỀ THI TOEIC.',
        signals: ['crucial indicator', 'context cue', 'exam keyword'],
        tip: 'Ghi nhớ mẹo làm bài thi: xác định thành phần trước và sau chỗ trống để chọn đúng dạng từ / cấu trúc.',
      },
    ],
    examTraps: [
      'Bẫy thường gặp trong đề thi TOEIC về BẪY TÍNH TỪ TRONG ĐỀ THI TOEIC: thí sinh hay nhầm lẫn giữa dạng chủ động và bị động hoặc từ loại tương đồng.',
      'Quy tắc loại trừ nhanh: kiểm tra cấu trúc câu trước khi dịch nghĩa để tiết kiệm thời gian làm bài.',
    ],
    exercises: [
      {
        id: 'd21-q1',
        question:
          'The regional director emphasized that all department staff must comply _______ updated safety regulations.',
        options: ['with', 'to', 'for', 'at'],
        correctAnswer: 0,
        type: 'multiple-choice',
        difficulty: 'C1 / TOEIC 800+',
        translation:
          'Giám đốc khu vực nhấn mạnh rằng toàn thể nhân viên phòng ban phải tuân thủ các quy định an toàn đã cập nhật.',
        detailedExplanation:
          "Cụm giới từ cố định (Collocation / Dependent preposition): 'comply with something' mang nghĩa tuân thủ, tuân theo quy định.",
        examTrap: "Thí sinh rất hay nhầm lẫn giữa 'comply with', 'conform to' và 'adhere to'.",
      },
      {
        id: 'd21-q2',
        question:
          'Despite _______ multiple budget reductions, the engineering team successfully delivered the mobile app on schedule.',
        options: ['facing', 'faced', 'faces', 'face'],
        correctAnswer: 0,
        type: 'multiple-choice',
        difficulty: 'C1 / TOEIC 800+',
        translation:
          'Mặc dù phải đối mặt với nhiều lần cắt giảm ngân sách, đội ngũ kỹ thuật đã bàn giao thành công ứng dụng di động đúng tiến độ.',
        detailedExplanation:
          "Sau giới từ 'Despite', ta phải dùng danh từ, cụm danh từ hoặc Danh động từ V-ing ('facing').",
        examTrap: "Phân biệt: 'Despite + V-ing / Noun phrase' nhưng 'Although + S + V'.",
      },
    ],
  },
  {
    day: 22,
    title: 'TRẠNG TỪ (ADVERBS)',
    titleEn: 'Adverb Positions & Modifier Rules',
    category: 'Parts of Speech',
    level: 'A1-A2 Foundation',
    pageBookRef: 161,
    summary:
      'Vị trí và chức năng của trạng từ: bổ nghĩa cho động từ thường, tính từ, trạng từ khác và cả mệnh đề.',
    coreFormulas: [
      {
        formula: 'Key Formula for Day 22: TRẠNG TỪ (ADVERBS)',
        meaning: 'Công thức trọng tâm và nguyên lý cốt lõi của TRẠNG TỪ (ADVERBS).',
        exampleEn: 'Professional English example demonstrating Adverb Positions & Modifier Rules.',
        exampleVi: 'Ví dụ tiếng Anh chuyên nghiệp minh họa cấu trúc của TRẠNG TỪ (ADVERBS).',
        signals: ['crucial indicator', 'context cue', 'exam keyword'],
        tip: 'Ghi nhớ mẹo làm bài thi: xác định thành phần trước và sau chỗ trống để chọn đúng dạng từ / cấu trúc.',
      },
    ],
    examTraps: [
      'Bẫy thường gặp trong đề thi TOEIC về TRẠNG TỪ (ADVERBS): thí sinh hay nhầm lẫn giữa dạng chủ động và bị động hoặc từ loại tương đồng.',
      'Quy tắc loại trừ nhanh: kiểm tra cấu trúc câu trước khi dịch nghĩa để tiết kiệm thời gian làm bài.',
    ],
    exercises: [
      {
        id: 'd22-q1',
        question:
          'The regional director emphasized that all department staff must comply _______ updated safety regulations.',
        options: ['with', 'to', 'for', 'at'],
        correctAnswer: 0,
        type: 'multiple-choice',
        difficulty: 'A1-A2 Foundation',
        translation:
          'Giám đốc khu vực nhấn mạnh rằng toàn thể nhân viên phòng ban phải tuân thủ các quy định an toàn đã cập nhật.',
        detailedExplanation:
          "Cụm giới từ cố định (Collocation / Dependent preposition): 'comply with something' mang nghĩa tuân thủ, tuân theo quy định.",
        examTrap: "Thí sinh rất hay nhầm lẫn giữa 'comply with', 'conform to' và 'adhere to'.",
      },
      {
        id: 'd22-q2',
        question:
          'Despite _______ multiple budget reductions, the engineering team successfully delivered the mobile app on schedule.',
        options: ['facing', 'faced', 'faces', 'face'],
        correctAnswer: 0,
        type: 'multiple-choice',
        difficulty: 'A1-A2 Foundation',
        translation:
          'Mặc dù phải đối mặt với nhiều lần cắt giảm ngân sách, đội ngũ kỹ thuật đã bàn giao thành công ứng dụng di động đúng tiến độ.',
        detailedExplanation:
          "Sau giới từ 'Despite', ta phải dùng danh từ, cụm danh từ hoặc Danh động từ V-ing ('facing').",
        examTrap: "Phân biệt: 'Despite + V-ing / Noun phrase' nhưng 'Although + S + V'.",
      },
    ],
  },
  {
    day: 23,
    title: 'CÁC COLLOCATION CỦA TRẠNG TỪ',
    titleEn: 'Professional Adverb-Verb & Adverb-Adj Pairs',
    category: 'Collocations',
    level: 'B1-B2 Intermediate',
    pageBookRef: 165,
    summary:
      'Các cặp trạng từ - động từ chuẩn mực: promptly respond, strictly prohibited, substantially increase, closely monitor.',
    coreFormulas: [
      {
        formula: 'Key Formula for Day 23: CÁC COLLOCATION CỦA TRẠNG TỪ',
        meaning: 'Công thức trọng tâm và nguyên lý cốt lõi của CÁC COLLOCATION CỦA TRẠNG TỪ.',
        exampleEn:
          'Professional English example demonstrating Professional Adverb-Verb & Adverb-Adj Pairs.',
        exampleVi:
          'Ví dụ tiếng Anh chuyên nghiệp minh họa cấu trúc của CÁC COLLOCATION CỦA TRẠNG TỪ.',
        signals: ['crucial indicator', 'context cue', 'exam keyword'],
        tip: 'Ghi nhớ mẹo làm bài thi: xác định thành phần trước và sau chỗ trống để chọn đúng dạng từ / cấu trúc.',
      },
    ],
    examTraps: [
      'Bẫy thường gặp trong đề thi TOEIC về CÁC COLLOCATION CỦA TRẠNG TỪ: thí sinh hay nhầm lẫn giữa dạng chủ động và bị động hoặc từ loại tương đồng.',
      'Quy tắc loại trừ nhanh: kiểm tra cấu trúc câu trước khi dịch nghĩa để tiết kiệm thời gian làm bài.',
    ],
    exercises: [
      {
        id: 'd23-q1',
        question:
          'The regional director emphasized that all department staff must comply _______ updated safety regulations.',
        options: ['with', 'to', 'for', 'at'],
        correctAnswer: 0,
        type: 'multiple-choice',
        difficulty: 'B1-B2 Intermediate',
        translation:
          'Giám đốc khu vực nhấn mạnh rằng toàn thể nhân viên phòng ban phải tuân thủ các quy định an toàn đã cập nhật.',
        detailedExplanation:
          "Cụm giới từ cố định (Collocation / Dependent preposition): 'comply with something' mang nghĩa tuân thủ, tuân theo quy định.",
        examTrap: "Thí sinh rất hay nhầm lẫn giữa 'comply with', 'conform to' và 'adhere to'.",
      },
      {
        id: 'd23-q2',
        question:
          'Despite _______ multiple budget reductions, the engineering team successfully delivered the mobile app on schedule.',
        options: ['facing', 'faced', 'faces', 'face'],
        correctAnswer: 0,
        type: 'multiple-choice',
        difficulty: 'B1-B2 Intermediate',
        translation:
          'Mặc dù phải đối mặt với nhiều lần cắt giảm ngân sách, đội ngũ kỹ thuật đã bàn giao thành công ứng dụng di động đúng tiến độ.',
        detailedExplanation:
          "Sau giới từ 'Despite', ta phải dùng danh từ, cụm danh từ hoặc Danh động từ V-ing ('facing').",
        examTrap: "Phân biệt: 'Despite + V-ing / Noun phrase' nhưng 'Although + S + V'.",
      },
    ],
  },
  {
    day: 24,
    title: 'REVIEW TUẦN 3 (TỔNG ÔN TỪ LOẠI & COLLOCATIONS)',
    titleEn: 'Week 3 Comprehensive Review & Test',
    category: 'Review & Test',
    level: 'B1-B2 Intermediate',
    pageBookRef: 174,
    summary:
      'Tổng ôn tập và kiểm tra toàn diện danh từ, tính từ, trạng từ, đại từ và hệ thống collocations.',
    coreFormulas: [
      {
        formula: 'Key Formula for Day 24: REVIEW TUẦN 3 (TỔNG ÔN TỪ LOẠI & COLLOCATIONS)',
        meaning:
          'Công thức trọng tâm và nguyên lý cốt lõi của REVIEW TUẦN 3 (TỔNG ÔN TỪ LOẠI & COLLOCATIONS).',
        exampleEn: 'Professional English example demonstrating Week 3 Comprehensive Review & Test.',
        exampleVi:
          'Ví dụ tiếng Anh chuyên nghiệp minh họa cấu trúc của REVIEW TUẦN 3 (TỔNG ÔN TỪ LOẠI & COLLOCATIONS).',
        signals: ['crucial indicator', 'context cue', 'exam keyword'],
        tip: 'Ghi nhớ mẹo làm bài thi: xác định thành phần trước và sau chỗ trống để chọn đúng dạng từ / cấu trúc.',
      },
    ],
    examTraps: [
      'Bẫy thường gặp trong đề thi TOEIC về REVIEW TUẦN 3 (TỔNG ÔN TỪ LOẠI & COLLOCATIONS): thí sinh hay nhầm lẫn giữa dạng chủ động và bị động hoặc từ loại tương đồng.',
      'Quy tắc loại trừ nhanh: kiểm tra cấu trúc câu trước khi dịch nghĩa để tiết kiệm thời gian làm bài.',
    ],
    exercises: [
      {
        id: 'd24-q1',
        question:
          'The regional director emphasized that all department staff must comply _______ updated safety regulations.',
        options: ['with', 'to', 'for', 'at'],
        correctAnswer: 0,
        type: 'multiple-choice',
        difficulty: 'B1-B2 Intermediate',
        translation:
          'Giám đốc khu vực nhấn mạnh rằng toàn thể nhân viên phòng ban phải tuân thủ các quy định an toàn đã cập nhật.',
        detailedExplanation:
          "Cụm giới từ cố định (Collocation / Dependent preposition): 'comply with something' mang nghĩa tuân thủ, tuân theo quy định.",
        examTrap: "Thí sinh rất hay nhầm lẫn giữa 'comply with', 'conform to' và 'adhere to'.",
      },
      {
        id: 'd24-q2',
        question:
          'Despite _______ multiple budget reductions, the engineering team successfully delivered the mobile app on schedule.',
        options: ['facing', 'faced', 'faces', 'face'],
        correctAnswer: 0,
        type: 'multiple-choice',
        difficulty: 'B1-B2 Intermediate',
        translation:
          'Mặc dù phải đối mặt với nhiều lần cắt giảm ngân sách, đội ngũ kỹ thuật đã bàn giao thành công ứng dụng di động đúng tiến độ.',
        detailedExplanation:
          "Sau giới từ 'Despite', ta phải dùng danh từ, cụm danh từ hoặc Danh động từ V-ing ('facing').",
        examTrap: "Phân biệt: 'Despite + V-ing / Noun phrase' nhưng 'Although + S + V'.",
      },
    ],
  },
  {
    day: 25,
    title: 'CÁC COLLOCATION CỦA ĐỘNG TỪ',
    titleEn: 'Must-Know Business Verb Collocations',
    category: 'Collocations',
    level: 'B1-B2 Intermediate',
    pageBookRef: 178,
    summary:
      'Các cụm động từ công sở phổ biến: conduct a survey, meet expectations/deadlines, implement policies, address concerns.',
    coreFormulas: [
      {
        formula: 'Key Formula for Day 25: CÁC COLLOCATION CỦA ĐỘNG TỪ',
        meaning: 'Công thức trọng tâm và nguyên lý cốt lõi của CÁC COLLOCATION CỦA ĐỘNG TỪ.',
        exampleEn:
          'Professional English example demonstrating Must-Know Business Verb Collocations.',
        exampleVi:
          'Ví dụ tiếng Anh chuyên nghiệp minh họa cấu trúc của CÁC COLLOCATION CỦA ĐỘNG TỪ.',
        signals: ['crucial indicator', 'context cue', 'exam keyword'],
        tip: 'Ghi nhớ mẹo làm bài thi: xác định thành phần trước và sau chỗ trống để chọn đúng dạng từ / cấu trúc.',
      },
    ],
    examTraps: [
      'Bẫy thường gặp trong đề thi TOEIC về CÁC COLLOCATION CỦA ĐỘNG TỪ: thí sinh hay nhầm lẫn giữa dạng chủ động và bị động hoặc từ loại tương đồng.',
      'Quy tắc loại trừ nhanh: kiểm tra cấu trúc câu trước khi dịch nghĩa để tiết kiệm thời gian làm bài.',
    ],
    exercises: [
      {
        id: 'd25-q1',
        question:
          'The regional director emphasized that all department staff must comply _______ updated safety regulations.',
        options: ['with', 'to', 'for', 'at'],
        correctAnswer: 0,
        type: 'multiple-choice',
        difficulty: 'B1-B2 Intermediate',
        translation:
          'Giám đốc khu vực nhấn mạnh rằng toàn thể nhân viên phòng ban phải tuân thủ các quy định an toàn đã cập nhật.',
        detailedExplanation:
          "Cụm giới từ cố định (Collocation / Dependent preposition): 'comply with something' mang nghĩa tuân thủ, tuân theo quy định.",
        examTrap: "Thí sinh rất hay nhầm lẫn giữa 'comply with', 'conform to' và 'adhere to'.",
      },
      {
        id: 'd25-q2',
        question:
          'Despite _______ multiple budget reductions, the engineering team successfully delivered the mobile app on schedule.',
        options: ['facing', 'faced', 'faces', 'face'],
        correctAnswer: 0,
        type: 'multiple-choice',
        difficulty: 'B1-B2 Intermediate',
        translation:
          'Mặc dù phải đối mặt với nhiều lần cắt giảm ngân sách, đội ngũ kỹ thuật đã bàn giao thành công ứng dụng di động đúng tiến độ.',
        detailedExplanation:
          "Sau giới từ 'Despite', ta phải dùng danh từ, cụm danh từ hoặc Danh động từ V-ing ('facing').",
        examTrap: "Phân biệt: 'Despite + V-ing / Noun phrase' nhưng 'Although + S + V'.",
      },
    ],
  },
  {
    day: 26,
    title: 'CÁC CỤM ĐỘNG TỪ VÀ GIỚI TỪ (PHRASAL VERBS)',
    titleEn: 'Phrasal Verbs & Dependent Prepositions',
    category: 'Prepositions',
    level: 'B1-B2 Intermediate',
    pageBookRef: 188,
    summary:
      'Cụm động từ không thể bỏ qua: comply with, rely on, deal with, look forward to, call off, put off, bring about.',
    coreFormulas: [
      {
        formula: 'Key Formula for Day 26: CÁC CỤM ĐỘNG TỪ VÀ GIỚI TỪ (PHRASAL VERBS)',
        meaning:
          'Công thức trọng tâm và nguyên lý cốt lõi của CÁC CỤM ĐỘNG TỪ VÀ GIỚI TỪ (PHRASAL VERBS).',
        exampleEn:
          'Professional English example demonstrating Phrasal Verbs & Dependent Prepositions.',
        exampleVi:
          'Ví dụ tiếng Anh chuyên nghiệp minh họa cấu trúc của CÁC CỤM ĐỘNG TỪ VÀ GIỚI TỪ (PHRASAL VERBS).',
        signals: ['crucial indicator', 'context cue', 'exam keyword'],
        tip: 'Ghi nhớ mẹo làm bài thi: xác định thành phần trước và sau chỗ trống để chọn đúng dạng từ / cấu trúc.',
      },
    ],
    examTraps: [
      'Bẫy thường gặp trong đề thi TOEIC về CÁC CỤM ĐỘNG TỪ VÀ GIỚI TỪ (PHRASAL VERBS): thí sinh hay nhầm lẫn giữa dạng chủ động và bị động hoặc từ loại tương đồng.',
      'Quy tắc loại trừ nhanh: kiểm tra cấu trúc câu trước khi dịch nghĩa để tiết kiệm thời gian làm bài.',
    ],
    exercises: [
      {
        id: 'd26-q1',
        question:
          'The regional director emphasized that all department staff must comply _______ updated safety regulations.',
        options: ['with', 'to', 'for', 'at'],
        correctAnswer: 0,
        type: 'multiple-choice',
        difficulty: 'B1-B2 Intermediate',
        translation:
          'Giám đốc khu vực nhấn mạnh rằng toàn thể nhân viên phòng ban phải tuân thủ các quy định an toàn đã cập nhật.',
        detailedExplanation:
          "Cụm giới từ cố định (Collocation / Dependent preposition): 'comply with something' mang nghĩa tuân thủ, tuân theo quy định.",
        examTrap: "Thí sinh rất hay nhầm lẫn giữa 'comply with', 'conform to' và 'adhere to'.",
      },
      {
        id: 'd26-q2',
        question:
          'Despite _______ multiple budget reductions, the engineering team successfully delivered the mobile app on schedule.',
        options: ['facing', 'faced', 'faces', 'face'],
        correctAnswer: 0,
        type: 'multiple-choice',
        difficulty: 'B1-B2 Intermediate',
        translation:
          'Mặc dù phải đối mặt với nhiều lần cắt giảm ngân sách, đội ngũ kỹ thuật đã bàn giao thành công ứng dụng di động đúng tiến độ.',
        detailedExplanation:
          "Sau giới từ 'Despite', ta phải dùng danh từ, cụm danh từ hoặc Danh động từ V-ing ('facing').",
        examTrap: "Phân biệt: 'Despite + V-ing / Noun phrase' nhưng 'Although + S + V'.",
      },
    ],
  },
  {
    day: 27,
    title: 'LIÊN TỪ (1) - COORDINATING & CORRELATIVE',
    titleEn: 'Coordinating & Correlative Conjunctions',
    category: 'Conjunctions',
    level: 'A1-A2 Foundation',
    pageBookRef: 192,
    summary:
      'Liên từ kết hợp (FANBOYS: For, And, Nor, But, Or, Yet, So) và liên từ tương quan (either...or, neither...nor, both...and, not only...but also).',
    coreFormulas: [
      {
        formula: 'Key Formula for Day 27: LIÊN TỪ (1) - COORDINATING & CORRELATIVE',
        meaning:
          'Công thức trọng tâm và nguyên lý cốt lõi của LIÊN TỪ (1) - COORDINATING & CORRELATIVE.',
        exampleEn:
          'Professional English example demonstrating Coordinating & Correlative Conjunctions.',
        exampleVi:
          'Ví dụ tiếng Anh chuyên nghiệp minh họa cấu trúc của LIÊN TỪ (1) - COORDINATING & CORRELATIVE.',
        signals: ['crucial indicator', 'context cue', 'exam keyword'],
        tip: 'Ghi nhớ mẹo làm bài thi: xác định thành phần trước và sau chỗ trống để chọn đúng dạng từ / cấu trúc.',
      },
    ],
    examTraps: [
      'Bẫy thường gặp trong đề thi TOEIC về LIÊN TỪ (1) - COORDINATING & CORRELATIVE: thí sinh hay nhầm lẫn giữa dạng chủ động và bị động hoặc từ loại tương đồng.',
      'Quy tắc loại trừ nhanh: kiểm tra cấu trúc câu trước khi dịch nghĩa để tiết kiệm thời gian làm bài.',
    ],
    exercises: [
      {
        id: 'd27-q1',
        question:
          'The regional director emphasized that all department staff must comply _______ updated safety regulations.',
        options: ['with', 'to', 'for', 'at'],
        correctAnswer: 0,
        type: 'multiple-choice',
        difficulty: 'A1-A2 Foundation',
        translation:
          'Giám đốc khu vực nhấn mạnh rằng toàn thể nhân viên phòng ban phải tuân thủ các quy định an toàn đã cập nhật.',
        detailedExplanation:
          "Cụm giới từ cố định (Collocation / Dependent preposition): 'comply with something' mang nghĩa tuân thủ, tuân theo quy định.",
        examTrap: "Thí sinh rất hay nhầm lẫn giữa 'comply with', 'conform to' và 'adhere to'.",
      },
      {
        id: 'd27-q2',
        question:
          'Despite _______ multiple budget reductions, the engineering team successfully delivered the mobile app on schedule.',
        options: ['facing', 'faced', 'faces', 'face'],
        correctAnswer: 0,
        type: 'multiple-choice',
        difficulty: 'A1-A2 Foundation',
        translation:
          'Mặc dù phải đối mặt với nhiều lần cắt giảm ngân sách, đội ngũ kỹ thuật đã bàn giao thành công ứng dụng di động đúng tiến độ.',
        detailedExplanation:
          "Sau giới từ 'Despite', ta phải dùng danh từ, cụm danh từ hoặc Danh động từ V-ing ('facing').",
        examTrap: "Phân biệt: 'Despite + V-ing / Noun phrase' nhưng 'Although + S + V'.",
      },
    ],
  },
  {
    day: 28,
    title: 'LIÊN TỪ (2) - SUBORDINATING CONJUNCTIONS',
    titleEn: 'Subordinating Conjunctions vs Prepositions',
    category: 'Conjunctions',
    level: 'B1-B2 Intermediate',
    pageBookRef: 197,
    summary:
      'Phân biệt liên từ (nối mệnh đề) và giới từ (đi với danh từ/cụm danh từ): Although vs Despite, Because vs Because of, While vs During.',
    coreFormulas: [
      {
        formula: 'Key Formula for Day 28: LIÊN TỪ (2) - SUBORDINATING CONJUNCTIONS',
        meaning:
          'Công thức trọng tâm và nguyên lý cốt lõi của LIÊN TỪ (2) - SUBORDINATING CONJUNCTIONS.',
        exampleEn:
          'Professional English example demonstrating Subordinating Conjunctions vs Prepositions.',
        exampleVi:
          'Ví dụ tiếng Anh chuyên nghiệp minh họa cấu trúc của LIÊN TỪ (2) - SUBORDINATING CONJUNCTIONS.',
        signals: ['crucial indicator', 'context cue', 'exam keyword'],
        tip: 'Ghi nhớ mẹo làm bài thi: xác định thành phần trước và sau chỗ trống để chọn đúng dạng từ / cấu trúc.',
      },
    ],
    examTraps: [
      'Bẫy thường gặp trong đề thi TOEIC về LIÊN TỪ (2) - SUBORDINATING CONJUNCTIONS: thí sinh hay nhầm lẫn giữa dạng chủ động và bị động hoặc từ loại tương đồng.',
      'Quy tắc loại trừ nhanh: kiểm tra cấu trúc câu trước khi dịch nghĩa để tiết kiệm thời gian làm bài.',
    ],
    exercises: [
      {
        id: 'd28-q1',
        question:
          'The regional director emphasized that all department staff must comply _______ updated safety regulations.',
        options: ['with', 'to', 'for', 'at'],
        correctAnswer: 0,
        type: 'multiple-choice',
        difficulty: 'B1-B2 Intermediate',
        translation:
          'Giám đốc khu vực nhấn mạnh rằng toàn thể nhân viên phòng ban phải tuân thủ các quy định an toàn đã cập nhật.',
        detailedExplanation:
          "Cụm giới từ cố định (Collocation / Dependent preposition): 'comply with something' mang nghĩa tuân thủ, tuân theo quy định.",
        examTrap: "Thí sinh rất hay nhầm lẫn giữa 'comply with', 'conform to' và 'adhere to'.",
      },
      {
        id: 'd28-q2',
        question:
          'Despite _______ multiple budget reductions, the engineering team successfully delivered the mobile app on schedule.',
        options: ['facing', 'faced', 'faces', 'face'],
        correctAnswer: 0,
        type: 'multiple-choice',
        difficulty: 'B1-B2 Intermediate',
        translation:
          'Mặc dù phải đối mặt với nhiều lần cắt giảm ngân sách, đội ngũ kỹ thuật đã bàn giao thành công ứng dụng di động đúng tiến độ.',
        detailedExplanation:
          "Sau giới từ 'Despite', ta phải dùng danh từ, cụm danh từ hoặc Danh động từ V-ing ('facing').",
        examTrap: "Phân biệt: 'Despite + V-ing / Noun phrase' nhưng 'Although + S + V'.",
      },
    ],
  },
  {
    day: 29,
    title: 'GIỚI TỪ (PREPOSITIONS)',
    titleEn: 'Prepositions of Time, Place & Direction',
    category: 'Prepositions',
    level: 'A1-A2 Foundation',
    pageBookRef: 204,
    summary:
      'Quy tắc dùng giới từ thời gian (in, on, at, by, until, within, during) và nơi chốn (in, on, at, between, among).',
    coreFormulas: [
      {
        formula: 'Key Formula for Day 29: GIỚI TỪ (PREPOSITIONS)',
        meaning: 'Công thức trọng tâm và nguyên lý cốt lõi của GIỚI TỪ (PREPOSITIONS).',
        exampleEn:
          'Professional English example demonstrating Prepositions of Time, Place & Direction.',
        exampleVi: 'Ví dụ tiếng Anh chuyên nghiệp minh họa cấu trúc của GIỚI TỪ (PREPOSITIONS).',
        signals: ['crucial indicator', 'context cue', 'exam keyword'],
        tip: 'Ghi nhớ mẹo làm bài thi: xác định thành phần trước và sau chỗ trống để chọn đúng dạng từ / cấu trúc.',
      },
    ],
    examTraps: [
      'Bẫy thường gặp trong đề thi TOEIC về GIỚI TỪ (PREPOSITIONS): thí sinh hay nhầm lẫn giữa dạng chủ động và bị động hoặc từ loại tương đồng.',
      'Quy tắc loại trừ nhanh: kiểm tra cấu trúc câu trước khi dịch nghĩa để tiết kiệm thời gian làm bài.',
    ],
    exercises: [
      {
        id: 'd29-q1',
        question:
          'The regional director emphasized that all department staff must comply _______ updated safety regulations.',
        options: ['with', 'to', 'for', 'at'],
        correctAnswer: 0,
        type: 'multiple-choice',
        difficulty: 'A1-A2 Foundation',
        translation:
          'Giám đốc khu vực nhấn mạnh rằng toàn thể nhân viên phòng ban phải tuân thủ các quy định an toàn đã cập nhật.',
        detailedExplanation:
          "Cụm giới từ cố định (Collocation / Dependent preposition): 'comply with something' mang nghĩa tuân thủ, tuân theo quy định.",
        examTrap: "Thí sinh rất hay nhầm lẫn giữa 'comply with', 'conform to' và 'adhere to'.",
      },
      {
        id: 'd29-q2',
        question:
          'Despite _______ multiple budget reductions, the engineering team successfully delivered the mobile app on schedule.',
        options: ['facing', 'faced', 'faces', 'face'],
        correctAnswer: 0,
        type: 'multiple-choice',
        difficulty: 'A1-A2 Foundation',
        translation:
          'Mặc dù phải đối mặt với nhiều lần cắt giảm ngân sách, đội ngũ kỹ thuật đã bàn giao thành công ứng dụng di động đúng tiến độ.',
        detailedExplanation:
          "Sau giới từ 'Despite', ta phải dùng danh từ, cụm danh từ hoặc Danh động từ V-ing ('facing').",
        examTrap: "Phân biệt: 'Despite + V-ing / Noun phrase' nhưng 'Although + S + V'.",
      },
    ],
  },
  {
    day: 30,
    title: 'TEST TỔNG ÔN 30 NGÀY (FINAL COMPREHENSIVE EXAM)',
    titleEn: 'Final 30-Day TOEIC & Grammar Examination',
    category: 'Review & Test',
    level: 'C1 / TOEIC 800+',
    pageBookRef: 210,
    summary:
      'Đề thi tổng hợp toàn diện 30 ngày ngữ pháp chuẩn format đề thi TOEIC Part 5 & 6 với lời giải chi tiết từng câu.',
    coreFormulas: [
      {
        formula: 'Key Formula for Day 30: TEST TỔNG ÔN 30 NGÀY (FINAL COMPREHENSIVE EXAM)',
        meaning:
          'Công thức trọng tâm và nguyên lý cốt lõi của TEST TỔNG ÔN 30 NGÀY (FINAL COMPREHENSIVE EXAM).',
        exampleEn:
          'Professional English example demonstrating Final 30-Day TOEIC & Grammar Examination.',
        exampleVi:
          'Ví dụ tiếng Anh chuyên nghiệp minh họa cấu trúc của TEST TỔNG ÔN 30 NGÀY (FINAL COMPREHENSIVE EXAM).',
        signals: ['crucial indicator', 'context cue', 'exam keyword'],
        tip: 'Ghi nhớ mẹo làm bài thi: xác định thành phần trước và sau chỗ trống để chọn đúng dạng từ / cấu trúc.',
      },
    ],
    examTraps: [
      'Bẫy thường gặp trong đề thi TOEIC về TEST TỔNG ÔN 30 NGÀY (FINAL COMPREHENSIVE EXAM): thí sinh hay nhầm lẫn giữa dạng chủ động và bị động hoặc từ loại tương đồng.',
      'Quy tắc loại trừ nhanh: kiểm tra cấu trúc câu trước khi dịch nghĩa để tiết kiệm thời gian làm bài.',
    ],
    exercises: [
      {
        id: 'd30-q1',
        question:
          'The regional director emphasized that all department staff must comply _______ updated safety regulations.',
        options: ['with', 'to', 'for', 'at'],
        correctAnswer: 0,
        type: 'multiple-choice',
        difficulty: 'C1 / TOEIC 800+',
        translation:
          'Giám đốc khu vực nhấn mạnh rằng toàn thể nhân viên phòng ban phải tuân thủ các quy định an toàn đã cập nhật.',
        detailedExplanation:
          "Cụm giới từ cố định (Collocation / Dependent preposition): 'comply with something' mang nghĩa tuân thủ, tuân theo quy định.",
        examTrap: "Thí sinh rất hay nhầm lẫn giữa 'comply with', 'conform to' và 'adhere to'.",
      },
      {
        id: 'd30-q2',
        question:
          'Despite _______ multiple budget reductions, the engineering team successfully delivered the mobile app on schedule.',
        options: ['facing', 'faced', 'faces', 'face'],
        correctAnswer: 0,
        type: 'multiple-choice',
        difficulty: 'C1 / TOEIC 800+',
        translation:
          'Mặc dù phải đối mặt với nhiều lần cắt giảm ngân sách, đội ngũ kỹ thuật đã bàn giao thành công ứng dụng di động đúng tiến độ.',
        detailedExplanation:
          "Sau giới từ 'Despite', ta phải dùng danh từ, cụm danh từ hoặc Danh động từ V-ing ('facing').",
        examTrap: "Phân biệt: 'Despite + V-ing / Noun phrase' nhưng 'Although + S + V'.",
      },
    ],
  },
]

export const GRAMMAR_HANDBOOK_TOPICS = [
  { id: 'all', title: 'Tất cả chuyên đề' },
  { id: 'Tenses', title: 'Các thì tiếng Anh' },
  { id: 'S-V Agreement', title: 'Sự hòa hợp S-V' },
  { id: 'Passive', title: 'Câu bị động' },
  { id: 'Conditionals', title: 'Câu điều kiện' },
  { id: 'Clauses', title: 'Mệnh đề quan hệ' },
  { id: 'Parts of Speech', title: 'Từ loại (Danh/Tính/Trạng/Đại từ)' },
  { id: 'Collocations', title: 'Collocations công sở' },
  { id: 'Conjunctions', title: 'Liên từ & Nối câu' },
  { id: 'Prepositions', title: 'Giới từ & Cụm động từ' },
  { id: 'Review & Test', title: 'Review & Bài thi tổng ôn' },
]
