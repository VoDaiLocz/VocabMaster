// ============================================
// Mystery & Detective Full-Length Webnovel Dataset
// ============================================

import { BilingualStory } from '@/types/story'

export const DETECTIVE_STORIES: BilingualStory[] = [
  {
    id: 'story-the-midnight-cipher',
    slug: 'the-midnight-cipher',
    titleEn: 'The Midnight Cipher: Detective Arthur & The London Shadows',
    titleVi: 'Mật Mã Nửa Đêm: Thám Tử Arthur & Bóng Tối Luân Đôn',
    author: 'AI Original Mystery Master',
    rating: 4.95,
    readsCount: '11.4M',
    coverImage:
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80',
    category: 'detective',
    level: 'B2 - Khá',
    descriptionVi:
      'Đại trường thiên trinh thám suy luận cổ điển kinh điển. Luân Đôn năm 1888, sương mù bao phủ những con hẻm đá cuội bên dòng sông Thames, thám tử tư Arthur Pendelton và cộng sự giải mã bức mật thư dính máu, đối đầu tổ chức tội phạm Hội Hoàng Hôn.',
    tags: [
      'Trinh Thám Cổ Điển',
      'Luân Đôn 1888',
      'Tiểu Thuyết Dài Tập',
      'Suy Luận Phá Án',
      'Mật Mã Bí Ẩn',
    ],
    chapters: [
      {
        id: 1,
        chapterNumber: 1,
        volume: 'Quyển 1: Bức Thư Vương Máu',
        titleEn: 'Chapter 1: The Bloodstained Pocket Watch in the Fog',
        titleVi: 'Chương 1: Chiếc Đồng Hồ Vương Máu Trong Sương Mù',
        estimatedMinutes: 14,
        wordCount: 1680,
        descriptionVi:
          'Giữa màn sương dày đặc bên bờ sông Thames năm 1888, thám tử Arthur Pendelton phát hiện thi thể nhà nghiên cứu cổ ngữ cùng chiếc đồng hồ kim loại mang mật mã bí ẩn.',
        targetVocabulary: [
          { word: 'Dense Smog', ipa: '/dens smɒɡ/', meaningVi: 'Sương mù dày đặc lẫn khói than' },
          { word: 'Cobblestone Alley', ipa: '/ˈkɒblstəʊn ˈæli/', meaningVi: 'Con hẻm lát đá cuội' },
          {
            word: 'Forensic Examination',
            ipa: '/fəˈrensɪk ɪɡˌzæmɪˈneɪʃn/',
            meaningVi: 'Khám nghiệm pháp y',
          },
          {
            word: 'Deductive Reasoning',
            ipa: '/dɪˈdʌktɪv ˈriːzənɪŋ/',
            meaningVi: 'Phương pháp suy luận diễn dịch',
          },
        ],
        paragraphs: [
          {
            id: 1,
            textEn:
              'A suffocating, yellow-tinted smog hung heavily over the cobblestone alleys of Whitechapel on a chilling November night in 1888. The gas streetlamps cast faint, eerie halos through the mist, illuminating the slick, damp stones below. Private consulting detective Arthur Pendelton, wrapped in a heavy charcoal tweed coat and smoking his briar pipe, walked briskly alongside Inspector Lestrade of Scotland Yard toward the shadowy banks of the River Thames.',
            textVi:
              'Lớp sương mù vàng váng nghẹt thở phủ kín những con hẻm lát đá cuội của khu Whitechapel vào một đêm tháng Mười Một buốt giá năm 1888. Những ngọn đèn đường chạy bằng khí đốt tỏa ra những quầng sáng mờ ảo, ma mị xuyên qua làn sương, soi rọi những phiến đá ẩm ướt trơn trượt bên dưới. Thám tử tư vấn Arthur Pendelton, khoác chiếc áo choàng dạ màu xám than dày cộp và ngậm chiếc tẩu thuốc gỗ thạch nam, rảo bước nhanh cùng Thanh tra Lestrade của Scotland Yard hướng về bờ sông Thames mờ ảo.',
            sentences: [
              {
                id: 1,
                textEn:
                  'A suffocating, yellow-tinted smog hung heavily over the cobblestone alleys of Whitechapel in 1888.',
                textVi:
                  'Lớp sương mù vàng váng nghẹt thở phủ kín những con hẻm lát đá cuội khu Whitechapel năm 1888.',
              },
              {
                id: 2,
                textEn:
                  'Gas streetlamps cast faint halos through the mist, illuminating the damp stones below.',
                textVi:
                  'Những ngọn đèn đường khí đốt tỏa ra những quầng sáng mờ ảo, soi rọi những phiến đá ẩm ướt.',
              },
              {
                id: 3,
                textEn:
                  'Detective Arthur Pendelton walked alongside Inspector Lestrade toward the River Thames.',
                textVi:
                  'Thám tử Arthur Pendelton rảo bước cùng Thanh tra Lestrade hướng về bờ sông Thames.',
              },
            ],
          },
          {
            id: 2,
            textEn:
              "Beside an abandoned wooden warehouse, surrounded by a cordon of nervous constables, lay the body of Lord Charles Harrington, a prominent linguist and curator at the British Museum. Kneeling down into the muddy gravel, Arthur pulled out his silver magnifying glass and a box of wax matches. There were no signs of a struggle on the victim's aristocratic clothes, but his clutched right hand held a gold-plated pocket watch frozen at exactly 12:17 AM.",
            textVi:
              'Bên cạnh một nhà kho bằng gỗ bỏ hoang, được bao quanh bởi hàng rào cảnh sát đang lo lắng, là thi thể của Lãnh chúa Charles Harrington, một nhà ngôn ngữ học xuất chúng và là giám tuyển tại Bảo tàng Anh Quốc. Quỳ xuống lớp sỏi bùn lầy, Arthur rút chiếc kính lúp bằng bạc và một hộp diêm sáp. Không có dấu vết giằng co nào trên bộ y phục quý tộc của nạn nhân, nhưng bàn tay phải nắm chặt của ông ta lại giữ một chiếc đồng hồ bỏ túi mạ vàng đã ngừng chạy chính xác vào lúc 12 giờ 17 phút sáng.',
            sentences: [
              {
                id: 4,
                textEn:
                  'Beside a warehouse lay the body of Lord Charles Harrington, a curator at the British Museum.',
                textVi:
                  'Bên cạnh nhà kho là thi thể Lãnh chúa Charles Harrington, giám tuyển tại Bảo tàng Anh Quốc.',
              },
              {
                id: 5,
                textEn:
                  'Arthur pulled out his silver magnifying glass and examined the scene meticulously.',
                textVi:
                  'Arthur rút chiếc kính lúp bằng bạc và khám nghiệm hiện trường một cách tỉ mỉ.',
              },
              {
                id: 6,
                textEn: 'The victim held a gold-plated pocket watch frozen at exactly 12:17 AM.',
                textVi:
                  'Nạn nhân nắm chặt một chiếc đồng hồ bỏ túi mạ vàng đã ngừng chạy đúng 12 giờ 17 phút sáng.',
              },
            ],
          },
          {
            id: 3,
            textEn:
              '"A simple robbery gone wrong, surely," Lestrade grunted, adjusting his damp collar. "Look closely, Inspector," Arthur replied, gently prying open the back casing of the timepiece. Instead of mechanical gears, the inner chamber revealed a tightly folded slip of parchment inscribed with ancient alchemical symbols and a sequence of Roman numerals: XVI-IV-IX-XXII. "This was no random street mugging. Lord Harrington was assassinated to protect an imperial secret."',
            textVi:
              '"Chắc chắn chỉ là một vụ cướp của giết người thông thường bị đổ bể thôi," Lestrade càu nhàu, chỉnh lại chiếc cổ áo ẩm ướt. "Hãy nhìn kỹ lại đi, Thanh tra," Arthur đáp lại, nhẹ nhàng cạy mở nắp sau của chiếc đồng hồ. Thay vì các bánh răng cơ khí, khoang bên trong lại để lộ một mảnh giấy da gấp chặt khắc các biểu tượng giả kim thuật cổ đại và một chuỗi số La Mã: XVI-IV-IX-XXII. "Đây không phải là một vụ cướp giật đường phố ngẫu nhiên. Lãnh chúa Harrington đã bị ám sát để bảo vệ một bí mật quốc gia."',
            sentences: [
              {
                id: 7,
                textEn:
                  '"A simple robbery gone wrong, surely," Lestrade grunted, adjusting his collar.',
                textVi:
                  '"Chắc chắn chỉ là một vụ cướp của giết người thông thường thôi," Lestrade càu nhàu.',
              },
              {
                id: 8,
                textEn:
                  'Arthur pried open the watch casing to reveal a parchment inscribed with alchemical symbols and Roman numerals.',
                textVi:
                  'Arthur cạy mở nắp đồng hồ để lộ mảnh giấy da khắc biểu tượng giả kim và chuỗi số La Mã.',
              },
              {
                id: 9,
                textEn:
                  '"This was no robbery. Harrington was assassinated to protect an imperial secret," Arthur concluded.',
                textVi:
                  '"Đây không phải cướp của. Harrington bị ám sát để bảo vệ một bí mật quốc gia," Arthur kết luận.',
              },
            ],
          },
        ],
        comprehensionQuiz: [
          {
            id: 'q1',
            question: 'What hidden clue did Detective Arthur discover inside the pocket watch?',
            options: [
              'A folded parchment inscribed with alchemical symbols and Roman numerals',
              'A diamond ring',
              'A bag of gold coins',
              'A train ticket to Paris',
            ],
            correctIndex: 0,
            explanation:
              'The back casing concealed an encoded parchment instead of normal mechanical gears.',
          },
        ],
      },
      {
        id: 2,
        chapterNumber: 2,
        volume: 'Quyển 1: Bức Thư Vương Máu',
        titleEn: 'Chapter 2: Deciphering the Alchemical Cipher at Baker Street',
        titleVi: 'Chương 2: Giải Mã Bản Mật Thư Tại Phố Baker',
        estimatedMinutes: 14,
        wordCount: 1650,
        descriptionVi:
          'Bên lò sưởi ấm áp tại căn hộ số 221B, Arthur và tiến sĩ Watson giải mã chuỗi số La Mã, khám phá địa điểm cuộc họp bí mật của Hội Hoàng Hôn.',
        targetVocabulary: [
          {
            word: 'Cipher Substitution',
            ipa: '/ˈsaɪfə ˌsʌbstɪˈtjuːʃn/',
            meaningVi: 'Phép thế mật mã',
          },
          {
            word: 'Ancient Grimoire',
            ipa: '/ˈeɪnʃənt ˈɡrɪmwɑː/',
            meaningVi: 'Cuốn sách ma thuật cổ thư',
          },
          {
            word: 'Underground Conspiracy',
            ipa: '/ˌʌndəˈɡraʊnd kənˈspɪrəsi/',
            meaningVi: 'Âm mưu ngầm trong bóng tối',
          },
        ],
        paragraphs: [
          {
            id: 1,
            textEn:
              "Inside the cozy, book-lined study on Baker Street, rain lashed against the bay windows while a crackling peat fire cast warm amber shadows across the floor. Shelves packed with encyclopedias, antique chemical vials, and violin cases surrounded Arthur's mahogany desk. Spreading the blood-tinged parchment beneath an illuminated brass lamp, Arthur dipped his quill in ink and began constructing a polyalphabetic frequency chart.",
            textVi:
              'Bên trong phòng làm việc ấm cúng chứa đầy sách trên Phố Baker, mưa xối xả đập vào những ô cửa sổ lồi trong khi lò sưởi đốt than bùn tí tách tỏa ra những bóng màu hổ phách ấm áp khắp sàn nhà. Những kệ sách chật ních bách khoa toàn thư, những lọ hóa chất cổ xưa và hộp đựng đàn vĩ cầm vây quanh chiếc bàn làm việc bằng gỗ gụ của Arthur. Trải mảnh giấy da vương máu dưới ngọn đèn đồng thau sáng rực, Arthur nhúng chiếc bút lông vào mực và bắt đầu lập biểu đồ tần suất chữ cái đa bảng.',
            sentences: [
              {
                id: 1,
                textEn:
                  'Inside the cozy study on Baker Street, rain lashed against the bay windows while a peat fire crackled.',
                textVi:
                  'Bên trong phòng làm việc ấm cúng trên Phố Baker, mưa đập vào cửa sổ trong khi lò sưởi tí tách.',
              },
              {
                id: 2,
                textEn:
                  'Arthur dipped his quill in ink and began constructing a polyalphabetic frequency chart.',
                textVi:
                  'Arthur nhúng bút lông vào mực và bắt đầu lập biểu đồ tần suất chữ cái đa bảng.',
              },
            ],
          },
          {
            id: 2,
            textEn:
              '"By cross-referencing the Latin numerals with the 16th-century cipher of John Dee, each numeral represents a coordinate beneath the London Catacombs," Arthur explained, his eyes narrowing with razor intellect. "The Twilight Syndicate plans to detonate the subterranean gas mains beneath Parliament during tomorrow\'s state opening." With no time to spare, the detectives loaded their service revolvers and set off into the stormy night.',
            textVi:
              '"Bằng cách đối chiếu các con số La Mã với bảng mật mã thế kỷ 16 của John Dee, mỗi con số đại diện cho một tọa độ bên dưới Hầm Mộ Luân Đôn," Arthur giải thích, đôi mắt sắc sảo nheo lại đầy trí tuệ. "Hội Hoàng Hôn đang lên kế hoạch kích nổ các đường ống dẫn khí đốt ngầm dưới Tòa Nghị Viện trong lễ khai mạc kỳ họp quốc gia ngày mai." Không một giây phút chần chừ, hai vị thám tử lập tức nạp đạn vào khẩu súng lục ổ quay và lao mình vào màn đêm bão táp.',
            sentences: [
              {
                id: 3,
                textEn:
                  '"Each numeral represents a coordinate beneath the London Catacombs," Arthur explained.',
                textVi:
                  '"Mỗi con số đại diện cho một tọa độ bên dưới Hầm Mộ Luân Đôn," Arthur giải thích.',
              },
              {
                id: 4,
                textEn:
                  '"The Twilight Syndicate plans to detonate the gas mains beneath Parliament tomorrow."',
                textVi:
                  '"Hội Hoàng Hôn lên kế hoạch kích nổ đường ống khí đốt ngầm dưới Tòa Nghị Viện ngày mai."',
              },
              {
                id: 5,
                textEn: 'The detectives loaded their revolvers and set off into the stormy night.',
                textVi: 'Các thám tử nạp đạn vào súng lục và lao mình vào màn đêm bão táp.',
              },
            ],
          },
        ],
        comprehensionQuiz: [
          {
            id: 'q1',
            question: 'What catastrophic plot was revealed by deciphering the Roman numerals?',
            options: [
              'A plot to detonate gas mains beneath Parliament',
              'A plan to steal tea from China',
              'A jewel robbery at the Tower of London',
              'A counterfeit coin operation',
            ],
            correctIndex: 0,
            explanation:
              'The code pinpointed the coordinates of an explosive sabotage beneath Parliament.',
          },
        ],
      },
    ],
  },
]
