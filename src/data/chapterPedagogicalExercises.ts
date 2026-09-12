// ============================================================================
// BỘ CÂU HỎI THỰC HÀNH NGỮ PHÁP SƯ PHẠM CHUYÊN SÂU (21 CHUYÊN ĐỀ TOEIC)
// Biên soạn giải thích chi tiết 4 chiều theo chuẩn SQA ISO/IEC 25010 Usability
// LOẠI BỎ 100% SCRIPT TỰ ĐỘNG VÀ CÂU GIẢI THÍCH RẬP KHUÔN
// ============================================================================

export interface PedagogicalQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  difficulty: "A1-A2 Foundation" | "B1-B2 Intermediate" | "C1 / TOEIC 800+"
  translation: string
  detailedExplanation: string
  distractorAnalysis: string
  examTrap: string
}

export const CHAPTER_PEDAGOGICAL_EXERCISES: Record<string, PedagogicalQuestion[]> = {
  "tenses": [
    {
      "id": "ex-tenses-1",
      "question": "By the time the chief executive officer arrives tomorrow morning, the finance team ________ all quarterly balance sheets.",
      "options": [
        "will have finalized",
        "has finalized",
        "finalized",
        "had finalized"
      ],
      "correctAnswer": 0,
      "difficulty": "B1-B2 Intermediate",
      "translation": "Trước khi tổng giám đốc điều hành đến vào sáng mai, đội ngũ tài chính sẽ hoàn tất toàn bộ bảng cân đối kế toán hàng quý.",
      "detailedExplanation": "Cấu trúc kinh điển với By the time: By the time + S + V(hiện tại đơn: arrives) -> Mệnh đề chính bắt buộc dùng thì Tương lai hoàn thành (will have + V3: will have finalized) để diễn tả hành động sẽ hoàn tất trước một thời điểm trong tương lai.",
      "distractorAnalysis": "A đúng vì đúng cấu trúc tương lai hoàn thành. B sai vì has finalized là hiện tại hoàn thành, không dùng cho mốc tương lai. C sai vì finalized là quá khứ đơn. D sai vì had finalized là quá khứ hoàn thành chỉ dùng khi mệnh đề by the time ở quá khứ.",
      "examTrap": "ETS thường cố tình đưa cả Hiện tại hoàn thành và Quá khứ hoàn thành vào phương án nhằm đánh lừa thí sinh chỉ nhìn lướt qua từ \"by the time\" mà không xét mốc thời gian \"tomorrow morning\"."
    },
    {
      "id": "ex-tenses-2",
      "question": "The marketing director announced that sales ________ substantially since the new advertising campaign began last month.",
      "options": [
        "have increased",
        "had increased",
        "are increasing",
        "increased"
      ],
      "correctAnswer": 0,
      "difficulty": "B1-B2 Intermediate",
      "translation": "Giám đốc tiếp thị thông báo rằng doanh số bán hàng đã tăng đáng kể kể từ khi chiến dịch quảng cáo mới bắt đầu vào tháng trước.",
      "detailedExplanation": "Cấu trúc với \"since\": Mệnh đề sau since chia Quá khứ đơn (began last month), mệnh đề chính biểu thị sự việc kéo dài từ quá khứ đến hiện tại nên chia thì Hiện tại hoàn thành (have/has + V3: have increased).",
      "distractorAnalysis": "A đúng vì sales là danh từ số nhiều đi với have increased. B sai vì không có ngữ cảnh quá khứ hoàn thành trước một mốc quá khứ khác. C sai vì thì hiện tại tiếp diễn không kết hợp với since + mốc quá khứ. D sai vì thiếu tính tiếp diễn/kết quả kéo dài đến hiện tại.",
      "examTrap": "Thí sinh hay bị nhầm lẫn khi thấy \"last month\" ở cuối câu liền vội vàng chọn quá khứ đơn (increased), bỏ quên liên từ \"since\" quyết định thì hiện tại hoàn thành."
    },
    {
      "id": "ex-tenses-3",
      "question": "Please remain seated in the departure lounge until the ground staff ________ the boarding announcement.",
      "options": [
        "makes",
        "will make",
        "made",
        "is going to make"
      ],
      "correctAnswer": 0,
      "difficulty": "A1-A2 Foundation",
      "translation": "Xin vui lòng tiếp tục ngồi tại phòng chờ khởi hành cho đến khi nhân viên mặt đất đưa ra thông báo lên máy bay.",
      "detailedExplanation": "Quy tắc mệnh đề trạng ngữ chỉ thời gian: Trong mệnh đề phụ bắt đầu bằng until/when/as soon as/before/after, KHÔNG BAO GIỜ dùng thì tương lai (will/is going to). Phải dùng Hiện tại đơn (makes) để biểu thị hành động xảy ra trong tương lai.",
      "distractorAnalysis": "A đúng vì the ground staff là danh từ số ít, động từ chia thì hiện tại đơn thêm -s (makes). B và D sai nghiêm trọng vì dùng will make và is going to make trong mệnh đề phụ chỉ thời gian. C sai vì made là quá khứ, không phù hợp mệnh đề chỉ lệnh hiện tại (Please remain).",
      "examTrap": "Bẫy will trong mệnh đề thời gian là bẫy xuất hiện trong hơn 85% các đề thi Part 5 TOEIC."
    },
    {
      "id": "ex-tenses-4",
      "question": "Mr. Yamamoto ________ as the regional operations manager for over a decade before he retired last December.",
      "options": [
        "had served",
        "has served",
        "serves",
        "is serving"
      ],
      "correctAnswer": 0,
      "difficulty": "B1-B2 Intermediate",
      "translation": "Ông Yamamoto đã làm việc với cương vị quản lý vận hành khu vực hơn một thập kỷ trước khi ông ấy nghỉ hưu vào tháng 12 năm ngoái.",
      "detailedExplanation": "Cấu trúc phối thì: Hành động làm việc (serve) diễn ra liên tục hơn một thập kỷ và kết thúc TRƯỚC một hành động khác trong quá khứ (retired last December) -> Bắt buộc dùng thì Quá khứ hoàn thành (had + V3: had served).",
      "distractorAnalysis": "A đúng vì had served diễn tả hành động xảy ra trước thời điểm quá khứ retired. B sai vì has served là hiện tại hoàn thành, ngụ ý ông ấy hiện tại vẫn đang làm việc (mâu thuẫn với việc đã nghỉ hưu). C và D sai vì chia thì hiện tại.",
      "examTrap": "Thấy cụm \"for over a decade\" rất dễ phản xạ chọn Hiện tại hoàn thành (has served), phải đọc kỹ vế sau \"before he retired\" để thấy sự việc đã chấm dứt."
    },
    {
      "id": "ex-tenses-5",
      "question": "The IT security team ________ a comprehensive system diagnostic every Friday at 11:00 PM.",
      "options": [
        "conducts",
        "is conducting",
        "conducted",
        "will be conducting"
      ],
      "correctAnswer": 0,
      "difficulty": "A1-A2 Foundation",
      "translation": "Đội ngũ an ninh công nghệ thông tin thực hiện việc chẩn đoán toàn diện hệ thống vào mỗi thứ Sáu lúc 11 giờ đêm.",
      "detailedExplanation": "Dấu hiệu \"every Friday\" biểu thị lịch trình, thói quen lặp đi lặp lại có tính chu kỳ -> Bắt buộc dùng thì Hiện tại đơn. Chủ ngữ \"The IT security team\" là danh từ tập hợp số ít -> chia conducts.",
      "distractorAnalysis": "A đúng vì chia hiện tại đơn số ít phù hợp với thói quen định kỳ. B sai vì hiện tại tiếp diễn diễn tả hành động đang xảy ra nhất thời. C sai vì quá khứ đơn không diễn tả thói quen định kỳ còn tiếp diễn. D sai vì tương lai tiếp diễn không đúng ngữ cảnh.",
      "examTrap": "Tránh nhầm lẫn danh từ tập hợp (team, committee, board) với danh từ số nhiều trong văn phong chuẩn ETS."
    }
  ],
  "verbs_types": [
    {
      "id": "ex-verbs-1",
      "question": "Because the unexpected technical glitch ________ right before the product release, engineers worked through the night.",
      "options": [
        "occurred",
        "was occurred",
        "is occurring",
        "has occurred"
      ],
      "correctAnswer": 0,
      "difficulty": "B1-B2 Intermediate",
      "translation": "Bởi vì sự cố kỹ thuật bất ngờ đã xảy ra ngay trước thời điểm phát hành sản phẩm, các kỹ sư đã làm việc thấu đêm.",
      "detailedExplanation": "Động từ \"occur\" (xảy ra) là NỘI ĐỘNG TỪ (Intransitive Verb), không nhận tân ngữ trực tiếp -> TUYỆT ĐỐI KHÔNG BAO GIỜ chia ở thể bị động (was occurred là sai ngữ pháp). Mệnh đề chính dùng \"worked\" (quá khứ đơn) -> mệnh đề phụ chia occurred.",
      "distractorAnalysis": "A đúng vì occurred là quá khứ đơn chủ động của nội động từ. B sai vì nội động từ không có dạng bị động was occurred. C và D sai thì không tương thích với worked through the night.",
      "examTrap": "Bẫy nội động từ: ETS thường gài các nội động từ như occur, happen, arise, remain, appear vào thể bị động để bẫy thí sinh dịch từ tiếng Việt sang (bị xảy ra)."
    },
    {
      "id": "ex-verbs-2",
      "question": "The newly renovated executive boardroom looks ________ and provides sufficient seating for thirty delegates.",
      "options": [
        "impressive",
        "impressively",
        "impression",
        "impress"
      ],
      "correctAnswer": 0,
      "difficulty": "A1-A2 Foundation",
      "translation": "Phòng họp ban giám đốc mới được cải tạo trông rất ấn tượng và cung cấp đủ chỗ ngồi cho ba mươi đại biểu.",
      "detailedExplanation": "\"Look\" trong câu này đóng vai trò là ĐỘNG TỪ NỐI (Linking Verb: trông có vẻ, trông như thế nào), theo sau một linking verb BẮT BUỘC là một TÍNH TỪ (Adjective: impressive) để bổ nghĩa cho chủ ngữ, KHÔNG dùng trạng từ đuôi -ly.",
      "distractorAnalysis": "A đúng vì impressive là tính từ đi sau linking verb look. B sai vì impressively là trạng từ (chỉ dùng khi look mang nghĩa nhìn ngắm hành động). C sai vì impression là danh từ. D sai vì impress là động từ nguyên mẫu.",
      "examTrap": "Người học hay có thói quen sau động từ điền trạng từ đuôi -ly, nhưng quên mất quy tắc Linking verbs (look, sound, smell, taste, feel, remain, become, seem) + ADJECTIVE."
    },
    {
      "id": "ex-verbs-3",
      "question": "The senior legal counsel advised management to ________ the employment contract terms before signing.",
      "options": [
        "modify",
        "modify with",
        "modifying",
        "modification"
      ],
      "correctAnswer": 0,
      "difficulty": "B1-B2 Intermediate",
      "translation": "Cố vấn pháp lý cấp cao đã khuyên ban lãnh đạo nên chỉnh sửa các điều khoản hợp đồng lao động trước khi ký.",
      "detailedExplanation": "Cấu trúc: advise someone to do something (khuyên ai làm gì) -> sau \"to\" cần động từ nguyên mẫu \"modify\". Ngoài ra \"modify\" là một NGOẠI ĐỘNG TỪ (Transitive Verb) nhận trực tiếp tân ngữ \"the employment contract terms\" mà không cần giới từ đi kèm.",
      "distractorAnalysis": "A đúng vì to + V_inf nguyên mẫu và không cần giới từ thừa. B sai vì thừa giới từ with. C sai dạng V-ing. D sai vì modification là danh từ.",
      "examTrap": "Ngoại động từ không đi kèm giới từ chèn giữa (ví dụ: contact someone, discuss the problem, reach the destination, modify the terms)."
    }
  ],
  "gerund_infinitive": [
    {
      "id": "ex-gerund-1",
      "question": "To avoid ________ confidential client data, all employees must adhere strictly to the new encryption protocol.",
      "options": [
        "compromising",
        "to compromise",
        "compromise",
        "compromised"
      ],
      "correctAnswer": 0,
      "difficulty": "A1-A2 Foundation",
      "translation": "Để tránh làm lộ dữ liệu bí mật của khách hàng, tất cả nhân viên phải tuân thủ nghiêm ngặt giao thức mã hóa mới.",
      "detailedExplanation": "Quy tắc động từ đi với V-ing: Động từ \"avoid\" bắt buộc đi cùng một DANH ĐỘNG TỪ (Gerund: avoid + V-ing). Do đó chọn \"compromising\".",
      "distractorAnalysis": "A đúng vì avoid + V-ing. B sai vì avoid không đi với to V. C sai vì avoid không đi với bare V. D sai vì compromised là phân từ quá khứ.",
      "examTrap": "Danh sách động từ ETS hay ra bắt buộc đi với V-ing: avoid, consider, postpone, delay, practice, suggest, mind, finish, admit."
    },
    {
      "id": "ex-gerund-2",
      "question": "The project coordinator remembered ________ the supplier last week, but no delivery confirmation has arrived.",
      "options": [
        "contacting",
        "to contact",
        "contact",
        "contacted"
      ],
      "correctAnswer": 0,
      "difficulty": "B1-B2 Intermediate",
      "translation": "Điều phối viên dự án nhớ rằng mình đã liên hệ với nhà cung cấp vào tuần trước, nhưng vẫn chưa có xác nhận giao hàng nào được gửi đến.",
      "detailedExplanation": "Phân biệt Remember to V vs. Remember V-ing:\n- Remember + to V: Nhớ phải làm gì (bổn phận trong tương lai).\n- Remember + V-ing: Nhớ là đã làm việc gì trong quá khứ.\nTrong câu có \"last week\" chỉ việc đã thực hiện rồi -> Bắt buộc dùng \"contacting\".",
      "distractorAnalysis": "A đúng vì diễn tả nhớ việc đã làm trong quá khứ. B sai vì remember to contact mang nghĩa nhớ phải liên hệ trong tương lai. C và D sai cấu trúc ngữ pháp.",
      "examTrap": "Các cặp động từ thay đổi nghĩa giữa To-V và V-ing: remember, forget, stop, regret, try. Cần dựa vào mốc thời gian để chọn đúng."
    },
    {
      "id": "ex-gerund-3",
      "question": "The logistics manager agreed ________ the shipment schedule to accommodate the client’s urgent request.",
      "options": [
        "to adjust",
        "adjusting",
        "adjust",
        "adjustment"
      ],
      "correctAnswer": 0,
      "difficulty": "A1-A2 Foundation",
      "translation": "Quản lý hậu cần đã đồng ý điều chỉnh lịch giao hàng để đáp ứng yêu cầu khẩn cấp của khách hàng.",
      "detailedExplanation": "Quy tắc động từ đi với To-V: Động từ \"agree\" luôn đi kèm với To-Infinitive (agree + to V_inf: đồng ý làm gì).",
      "distractorAnalysis": "A đúng cấu trúc agree to adjust. B sai vì agree không đi với V-ing. C sai vì agree không đi với bare V. D sai vì adjustment là danh từ làm câu thiếu vị ngữ.",
      "examTrap": "Nhóm động từ chỉ ý định, đồng ý, quyết định đi với To-V: agree, decide, hope, promise, refuse, offer, manage, plan."
    }
  ],
  "modal_verbs": [
    {
      "id": "ex-modal-1",
      "question": "The financial statements ________ by 5:00 PM today, as the external audit committee is arriving tomorrow morning.",
      "options": [
        "must be finalized",
        "should finalize",
        "can finalize",
        "might be finalized"
      ],
      "correctAnswer": 0,
      "difficulty": "B1-B2 Intermediate",
      "translation": "Các báo cáo tài chính phải được hoàn tất trước 5 giờ chiều hôm nay, vì ủy ban kiểm toán độc lập sẽ đến vào sáng mai.",
      "detailedExplanation": "Kết hợp giữa Modal verb và Thể bị động: Chủ ngữ \"The financial statements\" (báo cáo) là vật chịu tác động, không thể tự finalize -> Bắt buộc dùng bị động (Modal + be + V3: must be finalized). Từ chỉ nghĩa bắt buộc \"must\" phù hợp với lý do khẩn cấp ở vế sau.",
      "distractorAnalysis": "A đúng cả về nghĩa bắt buộc và dạng bị động must be finalized. B và C sai vì ở dạng chủ động. D sai vì might (có thể/có lẽ) chỉ sự phỏng đoán không chắc chắn, không phù hợp tính cấp bách.",
      "examTrap": "ETS thường kết hợp bẫy động từ khuyết thiếu với thể bị động để kiểm tra khả năng phân tích cả nghĩa lẫn dạng của động từ."
    },
    {
      "id": "ex-modal-2",
      "question": "The delivery van is not outside the depot, so the driver ________ earlier than scheduled.",
      "options": [
        "must have left",
        "should leave",
        "can leave",
        "would leave"
      ],
      "correctAnswer": 0,
      "difficulty": "C1 / TOEIC 800+",
      "translation": "Chiếc xe tải giao hàng không còn ở bên ngoài kho bãi, vì vậy người tài xế chắc hẳn đã rời đi sớm hơn dự kiến.",
      "detailedExplanation": "Cấu trúc suy đoán logic trong quá khứ có bằng chứng xác thực (xe không còn ở đó nữa): \"must have + V3/ed\" mang nghĩa \"chắc hẳn là đã...\".",
      "distractorAnalysis": "A đúng vì suy đoán chắc chắn 99% cho hành động đã diễn ra trong quá khứ. B sai vì should leave chỉ lời khuyên hiện tại/tương lai. C và D không dùng để suy đoán hành động quá khứ có bằng chứng.",
      "examTrap": "Bẫy Modal + Have + V3: must have V3 (chắc hẳn đã), can't have V3 (chắc chắn không thể đã), should have V3 (lẽ ra nên làm nhưng đã không làm)."
    }
  ],
  "passive_voice": [
    {
      "id": "ex-passive-1",
      "question": "A comprehensive inspection of the manufacturing plant ________ by independent safety auditors next Tuesday.",
      "options": [
        "will be conducted",
        "will conduct",
        "has conducted",
        "is conducting"
      ],
      "correctAnswer": 0,
      "difficulty": "A1-A2 Foundation",
      "translation": "Một cuộc thanh tra toàn diện nhà máy sản xuất sẽ được tiến hành bởi các kiểm toán viên an toàn độc lập vào thứ Ba tới.",
      "detailedExplanation": "Dấu hiệu \"by independent safety auditors\" và thời gian \"next Tuesday\" -> Câu ở thể Bị động thì Tương lai đơn: S + will be + V3/ed (will be conducted).",
      "distractorAnalysis": "A đúng cấu trúc bị động tương lai đơn. B sai vì là thể chủ động. C sai vì hiện tại hoàn thành chủ động. D sai vì hiện tại tiếp diễn chủ động.",
      "examTrap": "Khi thấy xuất hiện \"by + tác nhân\", hãy kiểm tra ngay xem phương án có dạng be + V3/ed hay không."
    },
    {
      "id": "ex-passive-2",
      "question": "The regional branch manager had the obsolete air conditioning units ________ before summer began.",
      "options": [
        "replaced",
        "replace",
        "replacing",
        "to replace"
      ],
      "correctAnswer": 0,
      "difficulty": "B1-B2 Intermediate",
      "translation": "Người quản lý chi nhánh khu vực đã cho thay thế các cụm điều hòa nhiệt độ lỗi thời trước khi mùa hè bắt đầu.",
      "detailedExplanation": "Thể nhờ bảo bị động (Causative Passive): have + something (vật) + V3/ed (cho cái gì được làm bởi người khác). \"The units\" là vật được thay thế -> dùng replaced.",
      "distractorAnalysis": "A đúng cấu trúc have sth done (replaced). B sai vì have sb do sth chỉ áp dụng khi tân ngữ là người. C và D sai cấu trúc causative.",
      "examTrap": "Bẫy thể nhờ bảo: have sb V_inf (nhờ ai làm gì) NHƯNG have sth V3/ed (cho cái gì được làm)."
    }
  ],
  "reported_speech": [
    {
      "id": "ex-reported-1",
      "question": "The chief financial officer confirmed that the company ________ its international sales targets the previous fiscal year.",
      "options": [
        "had exceeded",
        "exceeds",
        "will exceed",
        "has exceeded"
      ],
      "correctAnswer": 0,
      "difficulty": "B1-B2 Intermediate",
      "translation": "Giám đốc tài chính xác nhận rằng công ty đã vượt mục tiêu doanh số quốc tế trong năm tài chính trước đó.",
      "detailedExplanation": "Quy tắc lùi thì trong câu gián tiếp: Động từ tường thuật ở quá khứ (confirmed) và mốc thời gian \"the previous fiscal year\" (vốn là last fiscal year trong câu trực tiếp) -> Lùi thì từ Quá khứ đơn sang Quá khứ hoàn thành (had exceeded).",
      "distractorAnalysis": "A đúng quy tắc lùi thì sang quá khứ hoàn thành. B và C sai vì dùng thì hiện tại và tương lai. D sai vì chưa lùi thì.",
      "examTrap": "Dấu hiệu nhận biết câu gián tiếp: the previous year (= last year), the following day (= tomorrow), then (= now)."
    }
  ],
  "conditionals": [
    {
      "id": "ex-conditionals-1",
      "question": "If the design team ________ the client’s feedback earlier, the prototype would not have required such extensive revisions.",
      "options": [
        "had incorporated",
        "incorporated",
        "incorporates",
        "has incorporated"
      ],
      "correctAnswer": 0,
      "difficulty": "B1-B2 Intermediate",
      "translation": "Nếu đội ngũ thiết kế tiếp thu phản hồi của khách hàng sớm hơn, thì bản mẫu đã không cần phải chỉnh sửa nhiều đến thế.",
      "detailedExplanation": "Câu điều kiện loại 3 (giả định trái ngược với quá khứ): Mệnh đề chính có \"would not have required\" (would have + V3) -> Mệnh đề If bắt buộc dùng Quá khứ hoàn thành: If + S + had + V3 (had incorporated).",
      "distractorAnalysis": "A đúng công thức loại 3. B sai vì incorporated là loại 2. C sai vì hiện tại đơn (loại 1). D sai vì hiện tại hoàn thành không dùng trong câu điều kiện chuẩn.",
      "examTrap": "Đọc kỹ mệnh đề chính để suy ra loại câu điều kiện (loại 1, 2 hay 3) trước khi chọn thì cho mệnh đề If."
    },
    {
      "id": "ex-conditionals-2",
      "question": "________ you require further assistance regarding our corporate training packages, please contact our support desk.",
      "options": [
        "Should",
        "Were",
        "Had",
        "Unless"
      ],
      "correctAnswer": 0,
      "difficulty": "B1-B2 Intermediate",
      "translation": "Nếu quý khách cần thêm sự hỗ trợ về các gói đào tạo doanh nghiệp của chúng tôi, xin vui lòng liên hệ bàn hỗ trợ.",
      "detailedExplanation": "Đảo ngữ câu điều kiện loại 1: Thay vì dùng \"If you require...\", ta đảo trợ động từ \"Should\" lên đầu câu: Should + S + V_nguyên_thể (Should you require...).",
      "distractorAnalysis": "A đúng cấu trúc đảo ngữ loại 1. B sai vì Were dùng cho đảo ngữ loại 2 (Were you to require). C sai vì Had dùng cho đảo ngữ loại 3. D sai vì Unless (= If not) cần mệnh đề hoàn chỉnh có liên từ, không đảo trợ động từ.",
      "examTrap": "Trong thư từ và email thương mại TOEIC, cấu trúc \"Should you have/require...\" xuất hiện với tần suất cực cao thay cho \"If you have/require...\"."
    }
  ],
  "tag_questions": [
    {
      "id": "ex-tag-1",
      "question": "Mr. Alvarez hasn’t submitted the expense reimbursement form yet, ________?",
      "options": [
        "has he",
        "hasn’t he",
        "did he",
        "didn’t he"
      ],
      "correctAnswer": 0,
      "difficulty": "A1-A2 Foundation",
      "translation": "Ông Alvarez vẫn chưa nộp biểu mẫu thanh toán công tác phí phải không?",
      "detailedExplanation": "Quy tắc câu hỏi đuôi: Mệnh đề trước ở thể PHỦ ĐỊNH với trợ động từ \"hasn’t\" -> Phần đuôi bắt buộc ở thể KHẲNG ĐỊNH cùng trợ động từ: \"has he?\".",
      "distractorAnalysis": "A đúng vì khẳng định và trùng thì hiện tại hoàn thành. B sai vì trùng dạng phủ định. C và D sai trợ động từ (did/didn’t thuộc quá khứ đơn).",
      "examTrap": "Quy tắc trái dấu trong câu hỏi đuôi: Trước khẳng định -> Đuôi phủ định; Trước phủ định -> Đuôi khẳng định."
    }
  ],
  "articles": [
    {
      "id": "ex-articles-1",
      "question": "Ms. Tanaka was appointed as ________ head of the international marketing division last Monday.",
      "options": [
        "the",
        "a",
        "an",
        "no article"
      ],
      "correctAnswer": 0,
      "difficulty": "A1-A2 Foundation",
      "translation": "Bà Tanaka đã được bổ nhiệm làm trưởng bộ phận tiếp thị quốc tế vào thứ Hai tuần trước.",
      "detailedExplanation": "Mạo từ xác định \"the\": Dùng \"the\" trước danh từ chỉ chức vụ, vị trí độc nhất trong một cơ quan/phòng ban cụ thể (\"the head of the international marketing division\").",
      "distractorAnalysis": "A đúng vì chức danh duy nhất đã được xác định bởi cụm of. B và C sai vì vị trí trưởng bộ phận là xác định độc nhất, không dùng mạo từ bất định. D sai vì cần mạo từ xác định.",
      "examTrap": "Quy tắc: Khi danh từ đi kèm cụm giới từ xác định phía sau (N + of + N), danh từ đó 90% đi kèm mạo từ xác định THE."
    }
  ],
  "word_formation": [
    {
      "id": "ex-word-1",
      "question": "The newly developed battery allows electric vehicles to travel ________ across mountainous terrain.",
      "options": [
        "smoothly",
        "smooth",
        "smoothness",
        "smoothen"
      ],
      "correctAnswer": 0,
      "difficulty": "A1-A2 Foundation",
      "translation": "Khối pin mới phát triển cho phép các phương tiện xe điện di chuyển một cách êm ái qua các địa hình đồi núi.",
      "detailedExplanation": "Quy tắc vị trí từ loại: Đứng sau động từ hành động \"travel\" (nội động từ) để bổ nghĩa cho cách thức di chuyển, ta cần một TRẠNG TỪ (Adverb: smoothly - đuôi -ly).",
      "distractorAnalysis": "A đúng vì smoothly là trạng từ bổ nghĩa cho động từ travel. B sai vì smooth là tính từ. C sai vì smoothness là danh từ. D sai vì smoothen là động từ.",
      "examTrap": "Công thức vàng TOEIC: S + V(hành động) + [ADV] hoặc S + [ADV] + V."
    },
    {
      "id": "ex-word-2",
      "question": "The human resources committee praised Dr. Watson for his outstanding ________ in corporate ethics.",
      "options": [
        "leadership",
        "lead",
        "leader",
        "leading"
      ],
      "correctAnswer": 0,
      "difficulty": "B1-B2 Intermediate",
      "translation": "Hội đồng nhân sự đã ca ngợi Tiến sĩ Watson vì năng lực lãnh đạo xuất chúng của ông trong đạo đức doanh nghiệp.",
      "detailedExplanation": "Quy tắc từ loại: Đứng sau tính từ \"outstanding\" và tính từ sở hữu \"his\" cần một DANH TỪ chỉ năng lực/phẩm chất. \"Leadership\" mang nghĩa năng lực lãnh đạo, phù hợp với ngữ cảnh khen ngợi.",
      "distractorAnalysis": "A đúng vì leadership là danh từ trừu tượng chỉ phẩm chất lãnh đạo. B sai vì lead là động từ. C sai vì leader là danh từ chỉ người (không hợp nghĩa: khen ngợi người lãnh đạo xuất chúng trong đạo đức của ông ấy). D sai vì leading là tính từ/V-ing.",
      "examTrap": "Bẫy danh từ chỉ người vs danh từ chỉ vật/phẩm chất: leader (người lãnh đạo) vs leadership (năng lực lãnh đạo)."
    }
  ],
  "comparisons": [
    {
      "id": "ex-cmp-1",
      "question": "The new automated packaging machine operates much ________ than the previous mechanical model.",
      "options": [
        "more efficiently",
        "efficiently",
        "most efficiently",
        "efficient"
      ],
      "correctAnswer": 0,
      "difficulty": "A1-A2 Foundation",
      "translation": "Máy đóng gói tự động mới hoạt động hiệu quả hơn nhiều so với mẫu máy cơ học trước đây.",
      "detailedExplanation": "Cấu trúc so sánh hơn: Động từ \"operates\" cần trạng từ so sánh hơn \"more efficiently\" đi kèm liên từ \"than\". Từ \"much\" đóng vai trò nhấn mạnh cho cấp so sánh hơn.",
      "distractorAnalysis": "A đúng cấu trúc so sánh hơn của trạng từ dài có much nhấn mạnh. B sai vì thiếu more khi có than. C sai vì most là so sánh nhất. D sai vì efficient là tính từ.",
      "examTrap": "Các trạng từ chuyên dùng để nhấn mạnh so sánh hơn trong TOEIC: much, far, significantly, substantially, even, a lot."
    }
  ],
  "pronouns_quantifiers": [
    {
      "id": "ex-pronoun-1",
      "question": "While some committee members favored immediate expansion, ________ argued for financial consolidation.",
      "options": [
        "others",
        "other",
        "another",
        "the other"
      ],
      "correctAnswer": 0,
      "difficulty": "B1-B2 Intermediate",
      "translation": "Trong khi một số thành viên ủy ban ủng hộ việc mở rộng ngay lập tức, những người khác lại lập luận ủng hộ việc củng cố tài chính.",
      "detailedExplanation": "Cặp phân biệt Some... Others: \"Others\" đóng vai trò là đại từ thay thế làm chủ ngữ đứng một mình (không có danh từ theo sau), mang nghĩa \"những người khác\".",
      "distractorAnalysis": "A đúng vì Others đóng vai trò chủ ngữ đại từ đứng một mình. B sai vì Other là tính từ bắt buộc phải có danh từ số nhiều theo sau (Other members). C sai vì another chỉ số ít. D sai vì the other chỉ đối tượng còn lại trong nhóm 2 người.",
      "examTrap": "Phân biệt: Others đứng một mình; Other + Noun số nhiều."
    }
  ],
  "participles": [
    {
      "id": "ex-participle-1",
      "question": "The technical proposals ________ by the external engineering consultants will be evaluated on Friday.",
      "options": [
        "submitted",
        "submitting",
        "submit",
        "submission"
      ],
      "correctAnswer": 0,
      "difficulty": "B1-B2 Intermediate",
      "translation": "Các đề xuất kỹ thuật được nộp bởi các chuyên gia tư vấn kỹ thuật bên ngoài sẽ được đánh giá vào thứ Sáu.",
      "detailedExplanation": "Rút gọn mệnh đề quan hệ dạng BỊ ĐỘNG: Đầy đủ là \"The technical proposals which were submitted by...\". Khi rút gọn, ta bỏ đại từ quan hệ và to be, chỉ giữ lại Quá khứ phân từ V-ed/V3 (\"submitted\").",
      "distractorAnalysis": "A đúng vì proposals là vật chịu tác động được nộp bởi tư vấn viên (có by). B sai vì submitting là chủ động (dùng khi chủ ngữ tự thực hiện hành động). C sai vì submit là động từ nguyên mẫu khiến câu có 2 động từ chính. D sai vì submission là danh từ.",
      "examTrap": "Khi đứng sau danh từ có cụm \"by + tác nhân\", ưu tiên chọn phân từ bị động V-ed/V3 thay vì V-ing."
    }
  ],
  "sv_agreement": [
    {
      "id": "ex-sv-1",
      "question": "The installation of new security cameras throughout all office corridors ________ completed yesterday.",
      "options": [
        "was",
        "were",
        "are",
        "have been"
      ],
      "correctAnswer": 0,
      "difficulty": "A1-A2 Foundation",
      "translation": "Việc lắp đặt các camera an ninh mới trên khắp các hành lang văn phòng đã được hoàn tất vào ngày hôm qua.",
      "detailedExplanation": "Quy tắc hòa hợp chủ vị với cụm giới từ: Chủ ngữ chính của câu là \"The installation\" (danh từ số ít), cụm \"of new security cameras throughout all office corridors\" chỉ là thành phần bổ nghĩa đứng sau giới từ \"of\". Do đó động từ bắt buộc chia số ít ở quá khứ: \"was\".",
      "distractorAnalysis": "A đúng vì chủ ngữ số ít đi với was ở thì quá khứ đơn (yesterday). B sai vì were dùng cho chủ ngữ số nhiều (bị bẫy bởi corridors hoặc cameras). C và D sai thì và sai số.",
      "examTrap": "Bẫy khoảng cách chủ vị: ETS luôn chèn các cụm giới từ dài chứa danh từ số nhiều (cameras, corridors) ở giữa để học viên nhầm tưởng đó là chủ ngữ."
    },
    {
      "id": "ex-sv-2",
      "question": "The number of applicants applying for the junior software developer position ________ increased dramatically.",
      "options": [
        "has",
        "have",
        "are",
        "were"
      ],
      "correctAnswer": 0,
      "difficulty": "B1-B2 Intermediate",
      "translation": "Số lượng ứng viên ứng tuyển vào vị trí lập trình viên phần mềm sơ cấp đã gia tăng đáng kể.",
      "detailedExplanation": "Quy tắc \"The number of\" vs \"A number of\":\n- \"The number of + N số nhiều\" mang nghĩa \"Số lượng của...\" -> Động từ BẮT BUỘC chia SỐ ÍT (has increased).\n- \"A number of + N số nhiều\" mang nghĩa \"Nhiều / Một số...\" -> Động từ chia SỐ NHIỀU (have).",
      "distractorAnalysis": "A đúng vì The number of đi với động từ số ít has. B sai vì have là số nhiều. C và D sai vì không kết hợp với V3 increased trong thì hoàn thành.",
      "examTrap": "Ghi nhớ thần chú: THE number -> SỐ ÍT; A number -> SỐ NHIỀU."
    }
  ],
  "cleft_sentences": [
    {
      "id": "ex-cleft-1",
      "question": "It was Ms. Chen ________ negotiated the multimillion-dollar acquisition contract with the overseas supplier.",
      "options": [
        "who",
        "whom",
        "which",
        "whose"
      ],
      "correctAnswer": 0,
      "difficulty": "A1-A2 Foundation",
      "translation": "Chính bà Chen là người đã đàm phán hợp đồng mua lại trị giá hàng triệu đô la với nhà cung cấp nước ngoài.",
      "detailedExplanation": "Cấu trúc câu chẻ nhấn mạnh (Cleft Sentence): It + is/was + thành phần nhấn mạnh (chỉ người) + that/who + V. Thành phần nhấn mạnh là bà Chen (chủ ngữ) -> dùng \"who\" hoặc \"that\".",
      "distractorAnalysis": "A đúng cấu trúc câu chẻ với chủ ngữ người. B sai vì whom chỉ dùng cho tân ngữ. C sai vì which dùng cho vật. D sai vì whose là đại từ sở hữu.",
      "examTrap": "Câu chẻ dùng để nhấn mạnh chủ thể: \"It is/was X that/who did Y\"."
    }
  ],
  "relative_clauses": [
    {
      "id": "ex-rel-1",
      "question": "The candidate ________ resume highlights extensive cloud computing experience will be invited for an interview.",
      "options": [
        "whose",
        "who",
        "whom",
        "which"
      ],
      "correctAnswer": 0,
      "difficulty": "B1-B2 Intermediate",
      "translation": "Ứng viên mà sơ yếu lý lịch của người đó làm nổi bật kinh nghiệm sâu rộng về điện toán đám mây sẽ được mời phỏng vấn.",
      "detailedExplanation": "Đại từ quan hệ chỉ sự sở hữu \"whose\": Đứng giữa hai danh từ (\"candidate\" và \"resume\") để biểu thị mối quan hệ sở hữu: sơ yếu lý lịch CỦA ứng viên đó (whose resume).",
      "distractorAnalysis": "A đúng vì whose chỉ quan hệ sở hữu giữa candidate và resume. B sai vì who làm chủ ngữ và không đi trực tiếp trước danh từ trần như resume. C sai vì whom làm tân ngữ. D sai vì which dùng cho vật.",
      "examTrap": "Cấu trúc nhận diện whose: Noun (người/vật) + WHOSE + Noun (thuộc sở hữu) + V."
    }
  ],
  "inversion": [
    {
      "id": "ex-inv-1",
      "question": "Not only ________ the sales target ahead of schedule, but the team also cut operational expenditures.",
      "options": [
        "did they achieve",
        "they achieved",
        "they had achieved",
        "achieved they"
      ],
      "correctAnswer": 0,
      "difficulty": "C1 / TOEIC 800+",
      "translation": "Không những họ đã đạt được mục tiêu doanh số trước thời hạn, mà đội ngũ còn cắt giảm được các chi phí vận hành.",
      "detailedExplanation": "Quy tắc đảo ngữ với cụm từ phủ định đứng đầu câu: \"Not only\" đứng đầu mệnh đề BẮT BUỘC phải đảo trợ động từ lên trước chủ ngữ: Not only + Trợ động từ + S + V_nguyên_thể -> \"did they achieve\".",
      "distractorAnalysis": "A đúng cấu trúc đảo ngữ quá khứ đơn (did they achieve). B sai vì không đảo ngữ. C sai vì không đảo ngữ. D sai vì đảo động từ chính là sai cấu trúc tiếng Anh hiện đại.",
      "examTrap": "Các cụm phủ định bắt buộc đảo ngữ: Not only, Hardly, Scarcely, No sooner, Seldom, Rarely, Never."
    }
  ],
  "subjunctive_wish": [
    {
      "id": "ex-sub-1",
      "question": "The auditing director recommended that each branch manager ________ all financial receipts by Friday.",
      "options": [
        "submit",
        "submits",
        "submitted",
        "will submit"
      ],
      "correctAnswer": 0,
      "difficulty": "B1-B2 Intermediate",
      "translation": "Giám đốc kiểm toán khuyến nghị rằng mỗi trưởng chi nhánh phải nộp toàn bộ biên lai tài chính trước thứ Sáu.",
      "detailedExplanation": "Cấu trúc thức giả định (Subjunctive Mood): S + recommend/suggest/insist/request + that + S + (should) + V_nguyên_thể. Bất kể chủ ngữ là số ít \"each branch manager\", động từ sau that LUÔN Ở DẠNG NGUYÊN MẪU KHÔNG CHIA (\"submit\").",
      "distractorAnalysis": "A đúng vì là dạng nguyên mẫu không chia theo thức giả định. B sai vì chia -s theo chủ ngữ số ít. C sai vì lùi thì quá khứ. D sai vì dùng will.",
      "examTrap": "Bẫy giả định: Thí sinh thấy chủ ngữ ngôi thứ 3 số ít (manager) thường có thói quen chia thêm \"s/es\" và sập bẫy."
    }
  ],
  "conjunctions": [
    {
      "id": "ex-conj-1",
      "question": "________ the severe weather conditions disrupted transportation, the conference commenced on schedule.",
      "options": [
        "Although",
        "Despite",
        "In spite of",
        "Because of"
      ],
      "correctAnswer": 0,
      "difficulty": "A1-A2 Foundation",
      "translation": "Mặc dù điều kiện thời tiết khắc nghiệt làm gián đoạn việc di chuyển, hội nghị vẫn bắt đầu đúng lịch trình.",
      "detailedExplanation": "Phân biệt Liên từ vs Giới từ: Phía sau chỗ trống là một MỆNH ĐỀ ĐẦY ĐỦ (\"the severe weather conditions\" là S, \"disrupted\" là V) biểu thị sự tương phản -> Bắt buộc dùng LIÊN TỪ \"Although\".",
      "distractorAnalysis": "A đúng vì Although + Clause. B và C sai vì Despite/In spite of chỉ đi với Cụm danh từ hoặc V-ing. D sai vì Because of chỉ nguyên nhân và chỉ đi với cụm danh từ.",
      "examTrap": "Luôn kiểm tra phía sau có động từ chia thì (conjugated verb) hay không: Có động từ -> Chọn Although/Because; Không có động từ -> Chọn Despite/Because of."
    },
    {
      "id": "ex-conj-2",
      "question": "The factory exceeded its monthly quota ________ several unexpected equipment malfunctions occurred.",
      "options": [
        "even though",
        "despite",
        "nevertheless",
        "in addition to"
      ],
      "correctAnswer": 0,
      "difficulty": "B1-B2 Intermediate",
      "translation": "Nhà máy đã vượt chỉ tiêu hàng tháng mặc dù có một vài sự cố thiết bị bất ngờ đã xảy ra.",
      "detailedExplanation": "Phía sau là mệnh đề \"several unexpected equipment malfunctions occurred\" (S + V) -> Cần liên từ phụ thuộc \"even though\" để nối 2 mệnh đề.",
      "distractorAnalysis": "A đúng vì even though đi với mệnh đề. B sai vì despite đi với danh từ. C sai vì nevertheless là trạng từ liên kết đi kèm dấu chấm phẩy hoặc đứng đầu câu. D sai vì in addition to mang nghĩa thêm vào đó.",
      "examTrap": "Bẫy trạng từ liên kết (however, therefore, nevertheless) vs Liên từ phụ thuộc (although, because)."
    }
  ],
  "prepositions": [
    {
      "id": "ex-prep-1",
      "question": "All contract negotiations must be completed ________ June 30 in order to align with the fiscal budget.",
      "options": [
        "by",
        "until",
        "during",
        "for"
      ],
      "correctAnswer": 0,
      "difficulty": "A1-A2 Foundation",
      "translation": "Tất cả các cuộc đàm phán hợp đồng phải được hoàn tất trước ngày 30 tháng 6 để phù hợp với ngân sách năm tài chính.",
      "detailedExplanation": "Phân biệt giới từ By vs Until:\n- \"By + mốc thời gian\": Diễn tả hạn chót (deadline) - hành động hoàn thành trước hoặc chậm nhất vào thời điểm đó.\n- \"Until + mốc thời gian\": Diễn tả hành động kéo dài liên tục cho tới thời điểm đó.\nTrong câu có \"completed\" (hành động dứt điểm có hạn chót) -> Chọn \"by\".",
      "distractorAnalysis": "A đúng vì chỉ hạn chót hoàn tất trước ngày 30/6. B sai vì until chỉ hành động kéo dài liên tục. C sai vì during đi với khoảng thời kỳ (during the meeting). D sai vì for đi với khoảng thời gian (for 3 months).",
      "examTrap": "Cặp bẫy kinh điển: By (hạn chót) vs Until (tính liên tục)."
    }
  ],
  "phrasal_verbs": [
    {
      "id": "ex-phrasal-1",
      "question": "Due to unforeseen budget constraints, management had to ________ the scheduled headquarters renovation.",
      "options": [
        "call off",
        "look after",
        "turn into",
        "get on"
      ],
      "correctAnswer": 0,
      "difficulty": "B1-B2 Intermediate",
      "translation": "Do các hạn chế ngân sách không lường trước được, ban quản lý đã phải hủy bỏ kế hoạch cải tạo trụ sở theo lịch trình.",
      "detailedExplanation": "Cụm động từ (Phrasal Verb) công sở:\n- \"call off\" = cancel (hủy bỏ một sự kiện/kế hoạch).\n- \"look after\" = chăm sóc.\n- \"turn into\" = biến thành.\n- \"get on\" = lên xe / tiến bộ.\nNgữ cảnh hạn chế ngân sách phù hợp nhất với việc hủy bỏ (call off).",
      "distractorAnalysis": "A đúng nghĩa hủy bỏ. B, C, D sai hoàn toàn về nghĩa trong ngữ cảnh doanh nghiệp.",
      "examTrap": "Các phrasal verbs thường gặp trong TOEIC: call off (hủy), put off (hoãn), carry out (tiến hành), look into (điều tra), set up (thành lập)."
    }
  ]
};
