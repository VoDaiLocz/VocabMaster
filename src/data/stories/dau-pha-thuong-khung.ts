// ============================================
// Battle Through the Heavens (Đấu Phá Thương Khung)
// Authentic Canonical Bilingual Dataset
// Author: Heavenly Silkworm Potato (Thiên Tằm Thổ Đậu)
// ============================================

import { StoryChapter } from '@/types/story'

export const DAU_PHA_CHAPTERS: StoryChapter[] = [
  {
    id: 1,
    chapterNumber: 1,
    volume: 'Quyển 1: Ô Thản Thành & Phế Vật Thiếu Niên',
    titleEn: 'Chapter 1: The Fallen Genius',
    titleVi: 'Chương 1: Sụp Đổ Thiên Tài',
    estimatedMinutes: 15,
    wordCount: 2250,
    descriptionVi:
      'Tại quảng trường diễn võ của Ô Thản Thành Tiêu gia, tấm bia ma thạch phát sáng hiện lên dòng chữ lạnh lùng: "Đấu Chi Khí, Tam Đoạn!". Thiếu niên Tiêu Viêm từng là thiên tài chấn động đế quốc nay phải gánh chịu những ánh mắt khinh bỉ của đồng tộc.',
    targetVocabulary: [
      { word: 'Fallen Genius', ipa: '/ˈfɔːlən ˈdʒiːniəs/', meaningVi: 'Thiên tài sa sút / sa cơ' },
      { word: 'Dou Qi', ipa: '/doʊ tʃiː/', meaningVi: 'Đấu Khí (năng lượng tu luyện)' },
      {
        word: 'Magic Testing Stele',
        ipa: '/ˈmædʒɪk ˈtestɪŋ stiːli/',
        meaningVi: 'Ma Thạch Bia trắc nghiệm',
      },
      { word: 'Contemptuous', ipa: '/kənˈtemptʃuəs/', meaningVi: 'Khinh bỉ, coi thường' },
      { word: 'Humiliation', ipa: '/hjuːˌmɪliˈeɪʃn/', meaningVi: 'Nỗi nhục nhã, sỉ nhục' },
    ],
    paragraphs: [
      {
        id: 1,
        textEn:
          '"Dou Qi: Third Stage!" Looking at the five glaring words shining atop the colossal magic testing monument, the young boy stood frozen in utter silence. His fists clenched tightly beneath his long sleeves until his fingernails dug deeply into his palms, piercing the flesh and drawing faint traces of blood.',
        textVi:
          '"Đấu Chi Khí: Tam Đoạn!" Nhìn năm chữ chói mắt hiển hiện trên đỉnh tấm bia ma thạch trắc nghiệm khổng lồ, thiếu niên đứng sững người trong sự im lặng tuyệt đối. Đôi bàn tay giấu dưới tay áo siết chặt lại, móng tay cắm sâu vào lòng bàn tay đến mức bật ra những vệt máu tươi.',
        sentences: [
          {
            id: 1,
            textEn: '"Dou Qi: Third Stage!"',
            textVi: '"Đấu Chi Khí: Tam Đoạn!"',
          },
          {
            id: 2,
            textEn:
              'Looking at the five glaring words shining atop the magic testing monument, the boy stood frozen in silence.',
            textVi:
              'Nhìn năm chữ chói mắt hiển hiện trên đỉnh tấm bia ma thạch trắc nghiệm, thiếu niên đứng sững người trong im lặng.',
          },
          {
            id: 3,
            textEn:
              'His fists clenched tightly until his fingernails dug deeply into his palms, drawing faint traces of blood.',
            textVi:
              'Hai nắm đấm siết chặt đến mức móng tay ghim sâu vào lòng bàn tay, bật ra những vệt máu tươi.',
          },
        ],
      },
      {
        id: 2,
        textEn:
          '"Xiao Yan, Dou Qi: Third Stage! Level: Low grade!" Next to the giant stone stele, a middle-aged examiner glanced at the glowing results and announced indifferently to the packed training square. Instantly, countless whispers and sneers rippled through the gathered crowd of Xiao clan youths.',
        textVi:
          '"Tiêu Viêm, Đấu Chi Khí: Tam Đoạn! Cấp bậc: Hạ cấp!" Bên cạnh tấm bia đá khổng lồ, vị trắc nghiệm viên trung niên liếc nhìn kết quả phát sáng rồi cất giọng hờ hững thông báo vang khắp quảng trường diễn võ. Ngay lập tức, vô số tiếng xì xào và chế giễu lan truyền giữa đám đông thiếu niên Tiêu gia.',
        sentences: [
          {
            id: 4,
            textEn: '"Xiao Yan, Dou Qi: Third Stage! Level: Low grade!"',
            textVi: '"Tiêu Viêm, Đấu Chi Khí: Tam Đoạn! Cấp bậc: Hạ cấp!"',
          },
          {
            id: 5,
            textEn:
              'Next to the stone stele, a middle-aged examiner glanced at the results and announced indifferently.',
            textVi:
              'Bên cạnh bia đá, người trắc nghiệm viên trung niên liếc nhìn kết quả rồi cất giọng hờ hững thông báo.',
          },
          {
            id: 6,
            textEn:
              'Instantly, whispers and sneers rippled through the gathered crowd of clan youths.',
            textVi:
              'Ngay lập tức, những tiếng xì xào và chế giễu gợn sóng lan khắp đám đông thiếu niên gia tộc.',
          },
        ],
      },
      {
        id: 3,
        textEn:
          '"Haha, as expected, this once-in-a-century genius has not improved by even a single step over the past three years!" sneered a youth in silk robes. Three years ago, Xiao Yan had created an unprecedented miracle in Wu Tan City by advancing to the Tenth Stage of Dou Qi at the mere age of eleven. Yet overnight, his cultivation inexplicably plummeted, making him the laughingstock of the entire Jia Ma Empire.',
        textVi:
          '"Haha, đúng như dự đoán, vị thiên tài trăm năm khó gặp này suốt ba năm qua chẳng hề tiến bộ lấy nửa bước!" Một thiếu niên mặc gấm bào cười nhạo. Ba năm trước, Tiêu Viêm từng lập nên kỳ tích chưa từng có tại Ô Thản Thành khi đột phá Đấu Chi Khí Thập Đoạn khi mới tròn mười một tuổi. Thế nhưng chỉ sau một đêm, tu vi của hắn bỗng nhiên tụt dốc không phanh, biến hắn thành trò cười cho toàn bộ Gia Mã Đế Quốc.',
        sentences: [
          {
            id: 7,
            textEn:
              '"Haha, as expected, this once-in-a-century genius has not improved by even a single step over the past three years!"',
            textVi:
              '"Haha, đúng như dự đoán, vị thiên tài trăm năm khó gặp này suốt ba năm qua chẳng hề tiến bộ lấy nửa bước!"',
          },
          {
            id: 8,
            textEn:
              'Three years ago, Xiao Yan had advanced to the Tenth Stage of Dou Qi at the mere age of eleven.',
            textVi:
              'Ba năm trước, Tiêu Viêm từng đột phá đến Đấu Chi Khí Thập Đoạn khi mới tròn mười một tuổi.',
          },
          {
            id: 9,
            textEn:
              'Yet overnight, his cultivation inexplicably plummeted, making him the laughingstock of the entire empire.',
            textVi:
              'Thế nhưng chỉ sau một đêm, tu vi tụt dốc khó hiểu, biến hắn thành trò cười cho toàn bộ đế quốc.',
          },
        ],
      },
      {
        id: 4,
        textEn:
          'Amidst the mockery, a graceful purple-clothed maiden stepped forward. Xiao Xun\'er approached Xiao Yan with eyes filled with gentle loyalty. "Xiao Yan ge-ge, Xun\'er knows you will rise again," she whispered softly. Xiao Yan looked up at the azure sky, touched the mysterious pitch-black ring upon his finger, and felt an unquenchable fire burning within his heart.',
        textVi:
          'Giữa muôn vàn lời chế giễu, một thiếu nữ áo tím thanh nhã bước tới. Tiêu Huân Nhi tiến đến bên cạnh Tiêu Viêm, ánh mắt tràn đầy sự dịu dàng và tin tưởng tuyệt đối: "Tiêu Viêm ca ca, Huân Nhi biết huynh nhất định sẽ quật khởi trở lại." Tiêu Viêm ngẩng đầu nhìn bầu trời xanh thẳm, khẽ chạm tay vào chiếc nhẫn đen tuyền bí ẩn đeo trên ngón tay, cảm nhận ngọn lửa bất khuất đang bùng cháy trong tim.',
        sentences: [
          {
            id: 10,
            textEn: 'Amidst the mockery, a graceful purple-clothed maiden stepped forward.',
            textVi: 'Giữa muôn vàn lời chế giễu, một thiếu nữ áo tím thanh nhã bước tới.',
          },
          {
            id: 11,
            textEn: '"Xiao Yan ge-ge, Xun\'er knows you will rise again," she whispered softly.',
            textVi:
              '"Tiêu Viêm ca ca, Huân Nhi biết huynh nhất định sẽ quật khởi trở lại," nàng khẽ thì thầm.',
          },
          {
            id: 12,
            textEn:
              'Touching the mysterious pitch-black ring upon his finger, he felt an unquenchable fire burning in his heart.',
            textVi:
              'Khẽ chạm vào chiếc nhẫn đen tuyền bí ẩn trên ngón tay, hắn cảm nhận ngọn lửa bất khuất bùng cháy trong tim.',
          },
        ],
      },
    ],
    comprehensionQuiz: [
      {
        id: 'dp-q1-1',
        question: 'Kết quả trắc nghiệm Đấu Chi Khí của Tiêu Viêm tại quảng trường là bao nhiêu?',
        options: [
          'Đấu Chi Khí Cửu Đoạn',
          'Đấu Chi Khí Tam Đoạn',
          'Đấu Giả Nhất Tinh',
          'Đấu Chi Khí Thất Đoạn',
        ],
        correctIndex: 1,
        explanation:
          'Tấm bia trắc nghiệm ma thạch thông báo rõ: "Tiêu Viêm, Đấu Chi Khí: Tam Đoạn! Cấp bậc: Hạ cấp!".',
      },
      {
        id: 'dp-q1-2',
        question:
          'Ai là người đã an ủi và đặt niềm tin tuyệt đối vào Tiêu Viêm giữa đám đông chế giễu?',
        options: ['Nạp Lan Yên Nhiên', 'Tiêu Ninh', 'Tiêu Huân Nhi', 'Cát Diệp'],
        correctIndex: 2,
        explanation:
          'Tiêu Huân Nhi dịu dàng bước tới và khẳng định niềm tin rằng Tiêu Viêm ca ca nhất định sẽ quật khởi trở lại.',
      },
    ],
  },
  {
    id: 2,
    chapterNumber: 2,
    volume: 'Quyển 1: Ô Thản Thành & Phế Vật Thiếu Niên',
    titleEn: 'Chapter 2: The Dou Qi Continent',
    titleVi: 'Chương 2: Đấu Khí Đại Lục',
    estimatedMinutes: 15,
    wordCount: 2100,
    descriptionVi:
      'Tiêu Viêm ngồi trên sườn đồi phía sau gia tộc, hồi tưởng về quy luật vận hành của Đấu Khí Đại Lục: nơi không có ma pháp hoa mỹ, chỉ có Đấu Khí phồn thịnh đỉnh phong.',
    targetVocabulary: [
      { word: 'Cultivation Realm', ipa: '/ˌkʌltɪˈveɪʃn relm/', meaningVi: 'Cảnh giới tu luyện' },
      { word: 'Heavenly Flame', ipa: '/ˈhevnli fleɪm/', meaningVi: 'Dị Hỏa thiên địa' },
      { word: 'Mantra', ipa: '/ˈmæntrə/', meaningVi: 'Công pháp tu hành' },
      { word: 'Alchemist', ipa: '/ˈælkəmɪst/', meaningVi: 'Luyện Dược Sư' },
      { word: 'Sovereign', ipa: '/ˈsɒvrɪn/', meaningVi: 'Bậc chí tôn / Hoàng giả' },
    ],
    paragraphs: [
      {
        id: 1,
        textEn:
          'Sitting alone on the grassy cliff behind the mountain, Xiao Yan picked up a blade of grass and placed it in his mouth, savoring the bitter taste. This vast land was known as the Dou Qi Continent. Here, there was no flashy magic of fairy tales, nor were there mechanical technologies. Everything revolved around the peak prosperity of Dou Qi.',
        textVi:
          'Ngồi một mình trên vách đá xanh mướt phía sau ngọn núi, Tiêu Viêm ngậm một cọng cỏ trong miệng, chậm rãi nhấm nháp vị đắng chát. Vùng đất mênh mông này được gọi là Đấu Khí Đại Lục. Nơi đây không có thứ ma pháp hoa mỹ trong truyện cổ tích, cũng chẳng có công nghệ cơ khí. Mọi thứ đều xoay quanh sự phồn thịnh tột bậc của Đấu Khí.',
        sentences: [
          {
            id: 1,
            textEn:
              'Sitting on the cliff behind the mountain, Xiao Yan placed a blade of grass in his mouth, savoring the bitter taste.',
            textVi:
              'Ngồi trên vách đá sau núi, Tiêu Viêm ngậm một cọng cỏ trong miệng, nhấm nháp vị đắng chát.',
          },
          {
            id: 2,
            textEn:
              'This vast land was known as the Dou Qi Continent, where everything revolved around the prosperity of Dou Qi.',
            textVi:
              'Vùng đất mênh mông này được gọi là Đấu Khí Đại Lục, nơi mọi thứ xoay quanh sự phồn thịnh của Đấu Khí.',
          },
        ],
      },
      {
        id: 2,
        textEn:
          'The hierarchy of cultivation on the continent was strictly ordered: Dou Disciple, Dou Practitioner, Dou Master, Grand Dou Master, Dou Spirit, Dou King, Dou Emperor, Dou Ancestor, Dou Venerate, Dou Saint, and the legendary Dou God. Each breakthrough meant an exponential leap in destructive power and life expectancy.',
        textVi:
          'Hệ thống cấp bậc tu luyện trên đại lục được phân chia vô cùng nghiêm ngặt: Đấu Chi Khí, Đấu Giả, Đấu Sư, Đại Đấu Sư, Đấu Linh, Đấu Vương, Đấu Hoàng, Đấu Tông, Đấu Tôn, Đấu Thánh, và cảnh giới chí cao trong truyền thuyết: Đấu Đế. Mỗi một lần đột phá cảnh giới đồng nghĩa với sự gia tăng kinh thiên động địa về uy lực hủy diệt và tuổi thọ sinh mệnh.',
        sentences: [
          {
            id: 3,
            textEn:
              'The hierarchy of cultivation was strictly ordered from Dou Disciple to the legendary Dou God.',
            textVi:
              'Hệ thống tu luyện được phân chia nghiêm ngặt từ Đấu Chi Khí cho đến Đấu Đế trong truyền thuyết.',
          },
          {
            id: 4,
            textEn:
              'Each breakthrough meant an exponential leap in destructive power and life expectancy.',
            textVi:
              'Mỗi một lần đột phá đồng nghĩa với sự gia tăng vượt bậc về uy lực hủy diệt và thọ nguyên.',
          },
        ],
      },
      {
        id: 3,
        textEn:
          '"I used to be hailed as a peerless prodigy who condensed the Dou Qi cyclone at eleven years old. Why did all my Dou Qi vanish into thin air whenever I tried to train?" Xiao Yan murmured with a bitter smile, gazing at the pitch-black ring handed down from his deceased mother. Little did he know, an ancient, slumbering consciousness within the ring was slowly beginning to stir.',
        textVi:
          '"Mình từng được xưng tụng là thiên tài tuyệt thế ngưng tụ Đấu Khí Toàn Khí khi mới mười một tuổi. Tại sao cứ mỗi lần tu luyện, Đấu Khí lại biến mất vào hư không không một dấu vết?" Tiêu Viêm cười cay đắng tự lẩm bẩm, ánh mắt chăm chú nhìn vào chiếc nhẫn đen tuyền do người mẹ quá cố để lại. Hắn nào ngờ được rằng, một luồng ý thức cổ xưa đang say ngủ bên trong chiếc nhẫn đang dần dần thức tỉnh.',
        sentences: [
          {
            id: 5,
            textEn:
              '"Why did all my Dou Qi vanish into thin air whenever I tried to train?" Xiao Yan murmured with a bitter smile.',
            textVi:
              '"Tại sao cứ mỗi lần tu luyện, Đấu Khí lại biến mất không dấu vết?" Tiêu Viêm cay đắng tự nhủ.',
          },
          {
            id: 6,
            textEn:
              'An ancient, slumbering consciousness within the mysterious ring was slowly beginning to stir.',
            textVi:
              'Một luồng linh hồn ý thức cổ xưa đang say ngủ bên trong chiếc nhẫn bí ẩn bắt đầu khẽ cựa mình.',
          },
        ],
      },
    ],
  },
  {
    id: 3,
    chapterNumber: 3,
    volume: 'Quyển 1: Ô Thản Thành & Phế Vật Thiếu Niên',
    titleEn: 'Chapter 3: The Guests of the Misty Cloud Sect',
    titleVi: 'Chương 3: Khách Nhân Từ Vân Lam Tông',
    estimatedMinutes: 16,
    wordCount: 2300,
    descriptionVi:
      'Đại sảnh Tiêu gia náo nhiệt khác thường khi đón tiếp những vị khách tôn quý từ Vân Lam Tông - tông môn số một của Gia Mã Đế Quốc. Trưởng lão Cát Diệp và thiếu nữ xinh đẹp Nạp Lan Yên Nhiên xuất hiện với mục đích bí mật.',
    targetVocabulary: [
      { word: 'Sect', ipa: '/sekt/', meaningVi: 'Tông môn tu chân' },
      { word: 'Arrogance', ipa: '/ˈærəɡəns/', meaningVi: 'Sự kiêu ngạo, hống hách' },
      { word: 'Elder', ipa: '/ˈeldər/', meaningVi: 'Trưởng lão tông tộc' },
      { word: 'Clan Leader', ipa: '/klæn ˈliːdər/', meaningVi: 'Tộc trưởng' },
      { word: 'Betrothal', ipa: '/bɪˈtrəʊðl/', meaningVi: 'Hôn ước, đính hôn' },
    ],
    paragraphs: [
      {
        id: 1,
        textEn:
          "Early the next morning, Xiao Yan was summoned to the grand meeting hall. As he pushed open the heavy wooden doors, he found the atmosphere exceptionally solemn. Seated on the clan leader's throne was his father, Xiao Zhan, a powerful five-star Grand Dou Master. Across from him sat three honored guests wearing robes emblazoned with three swirling clouds.",
        textVi:
          'Sáng sớm hôm sau, Tiêu Viêm được triệu tập đến đại sảnh nghị sự của gia tộc. Khi đẩy cánh cửa gỗ nặng nề bước vào, hắn nhận thấy bầu không khí trang nghiêm khác thường. Ngồi trên bảo tọa tộc trưởng chính là phụ thân hắn - Tiêu Chiến, một cường giả Đại Đấu Sư ngũ tinh uy phong lẫm liệt. Đối diện ông là ba vị khách quý mặc trường bào thêu hình ba đám mây bạc lượn lờ.',
        sentences: [
          {
            id: 1,
            textEn:
              'Xiao Yan was summoned to the grand meeting hall where the atmosphere was exceptionally solemn.',
            textVi:
              'Tiêu Viêm được gọi đến đại sảnh nghị sự, nơi bầu không khí trang nghiêm khác thường.',
          },
          {
            id: 2,
            textEn:
              'Seated across from his father were three honored guests wearing robes emblazoned with three swirling clouds.',
            textVi:
              'Ngồi đối diện phụ thân hắn là ba vị khách quý mặc áo thêu hình ba áng mây lượn sóng.',
          },
        ],
      },
      {
        id: 2,
        textEn:
          '"Those are people from the Misty Cloud Sect," Xiao Xun\'er whispered softly beside him. Misty Cloud Sect was the undisputed titan of the Jia Ma Empire, an ancient power possessing peerless martial heritage. The leading guest was Elder Ge Ye, a formidable seven-star Grand Dou Master, but the focus of everyone\'s gaze was the haughty young maiden seated beside him: Nalan Yanran.',
        textVi:
          '"Đó là người của Vân Lam Tông," Tiêu Huân Nhi nhẹ nhàng thì thầm bên cạnh hắn. Vân Lam Tông chính là thế lực cự đầu số một của Gia Mã Đế Quốc, một tông phái cổ xưa nắm giữ truyền thừa vô song. Vị khách dẫn đầu là trưởng lão Cát Diệp, một Đại Đấu Sư thất tinh thâm sâu, nhưng tâm điểm ánh mắt của mọi người lại là thiếu nữ kiêu kỳ ngồi bên cạnh: Nạp Lan Yên Nhiên.',
        sentences: [
          {
            id: 3,
            textEn: '"Those are people from the Misty Cloud Sect," Xun\'er whispered beside him.',
            textVi: '"Đó là người của Vân Lam Tông," Huân Nhi thì thầm bên cạnh.',
          },
          {
            id: 4,
            textEn:
              "The focus of everyone's gaze was the haughty maiden seated beside the elder: Nalan Yanran.",
            textVi:
              'Tâm điểm của mọi ánh mắt chính là thiếu nữ kiêu kỳ ngồi cạnh trưởng lão: Nạp Lan Yên Nhiên.',
          },
        ],
      },
    ],
  },
  {
    id: 4,
    chapterNumber: 4,
    volume: 'Quyển 1: Ô Thản Thành & Phế Vật Thiếu Niên',
    titleEn: 'Chapter 4: The Broken Betrothal and the Qi Gathering Pill',
    titleVi: 'Chương 4: Hủy Bỏ Hôn Ước & Tụ Khí Đan',
    estimatedMinutes: 16,
    wordCount: 2350,
    descriptionVi:
      'Nạp Lan Yên Nhiên công khai yêu cầu giải trừ hôn ước với Tiêu Viêm ngay trước mặt các trưởng lão Tiêu gia, đồng thời lấy ra viên Tụ Khí Đan quý giá do Đan Vương Cổ Hà luyện chế để bồi thường.',
    targetVocabulary: [
      { word: 'Qi Gathering Pill', ipa: '/tʃiː ˈɡæðərɪŋ pɪl/', meaningVi: 'Tụ Khí Đan' },
      { word: 'Annulment', ipa: '/əˈnʌlmənt/', meaningVi: 'Sự bãi bỏ, hủy hôn' },
      { word: 'Compensation', ipa: '/ˌkɒmpenˈseɪʃn/', meaningVi: 'Sự đền bù, bồi thường' },
      { word: 'Indignation', ipa: '/ˌɪndɪɡˈneɪʃn/', meaningVi: 'Sự phẫn nộ, căm phẫn' },
      { word: 'Pill Master', ipa: '/pɪl ˈmɑːstər/', meaningVi: 'Đan sư / Luyện dược sư' },
    ],
    paragraphs: [
      {
        id: 1,
        textEn:
          'Elder Ge Ye coughed lightly, stood up, and cupped his hands toward Xiao Zhan. "Clan Leader Xiao, we have traveled far from the capital with a special request from our Sect Leader. Miss Nalan wishes to annul the marriage agreement arranged by the clan grandfathers years ago."',
        textVi:
          'Trưởng lão Cát Diệp khẽ ho một tiếng, đứng dậy chắp tay về phía Tiêu Chiến: "Tiêu tộc trưởng, chúng ta từ đế đô xa xôi đến đây mang theo thỉnh cầu đặc biệt của Tông chủ. Nạp Lan tiểu thư muốn giải trừ hôn ước do các vị lão gia tử định ra năm xưa."',
        sentences: [
          {
            id: 1,
            textEn:
              '"Clan Leader Xiao, Miss Nalan wishes to annul the marriage agreement arranged years ago."',
            textVi: '"Tiêu tộc trưởng, Nạp Lan tiểu thư muốn giải trừ hôn ước đã định năm xưa."',
          },
        ],
      },
      {
        id: 2,
        textEn:
          "The entire hall fell dead silent. Xiao Zhan's hand crushed the armrest of his wooden chair into fine sawdust as furious Dou Qi surged through his veins. To force an annulment in the public eye was the ultimate disgrace to the Xiao Clan. To sweeten the bitter humiliation, Ge Ye produced a jade box revealing a shimmering green medicinal pill: the legendary Qi Gathering Pill concocted by Pill King Gu He, capable of guaranteeing a breakthrough to Dou Practitioner.",
        textVi:
          'Cả đại sảnh rơi vào sự im lặng như tờ. Bàn tay Tiêu Chiến bóp nát tay vịn chiếc ghế gỗ thành bột mịn khi luồng Đấu Khí phẫn nộ sôi sục trong huyết quản. Công khai ép buộc từ hôn trước mặt mọi người chính là sự sỉ nhục tột cùng đối với Tiêu Gia. Để bù đắp nỗi nhục ấy, Cát Diệp lấy ra một hộp ngọc, để lộ một viên đan dược xanh biếc lấp lánh: Tụ Khí Đan do chính Đan Vương Cổ Hà luyện chế, có thể đảm bảo 100% đột phá lên Đấu Giả.',
        sentences: [
          {
            id: 2,
            textEn:
              'Xiao Zhan crushed the wooden armrest into fine sawdust as furious Dou Qi surged through his veins.',
            textVi:
              'Tiêu Chiến bóp nát tay vịn ghế thành vụn gỗ khi Đấu Khí phẫn nộ cuộn trào trong huyết quản.',
          },
          {
            id: 3,
            textEn:
              'Ge Ye produced a jade box revealing a Qi Gathering Pill concocted by Pill King Gu He.',
            textVi:
              'Cát Diệp lấy ra chiếc hộp ngọc để lộ viên Tụ Khí Đan do Đan Vương Cổ Hà luyện chế.',
          },
        ],
      },
    ],
  },
  {
    id: 5,
    chapterNumber: 5,
    volume: 'Quyển 1: Ô Thản Thành & Phế Vật Thiếu Niên',
    titleEn: 'Chapter 5: The Thirty-Year Vow & The Divorce Letter',
    titleVi: 'Chương 5: Hẹn Ba Năm & Thư Hưu Thê',
    estimatedMinutes: 18,
    wordCount: 2500,
    descriptionVi:
      'Đối diện với sự trịch thượng của Nạp Lan Yên Nhiên, Tiêu Viêm cất tiếng chấn động đại sảnh: "Ba mươi năm Hà Đông, ba mươi năm Hà Tây, đừng khinh thiếu niên nghèo!". Hắn cắt máu viết giấy từ hôn và ước định ba năm sau sẽ bước lên đỉnh Vân Lam Tông.',
    targetVocabulary: [
      { word: 'Defiance', ipa: '/dɪˈfaɪəns/', meaningVi: 'Sự bất khuất, thách thức' },
      { word: 'Solemn Vow', ipa: '/ˈsɒləm vaʊ/', meaningVi: 'Lời thề long trọng' },
      { word: 'Blood Oath', ipa: '/blʌd əʊθ/', meaningVi: 'Huyết thệ / Lời thề bằng máu' },
      { word: 'Severance', ipa: '/ˈsevərəns/', meaningVi: 'Sự đoạn tuyệt, cắt đứt' },
      { word: 'Indomitable', ipa: '/ɪnˈdɒmɪtəbl/', meaningVi: 'Bất khuất, kiên cường' },
    ],
    paragraphs: [
      {
        id: 1,
        textEn:
          'Stepping into the center of the hall, Xiao Yan looked squarely into Nalan Yanran\'s haughty eyes. "Miss Nalan, do you truly believe that because you are a disciple of the Misty Cloud Sect, you can tread upon the dignity of my father and the Xiao clan at will?"',
        textVi:
          'Bước ra chính giữa đại sảnh, Tiêu Viêm nhìn thẳng vào đôi mắt kiêu kỳ của Nạp Lan Yên Nhiên: "Nạp Lan tiểu thư, nàng thực sự cho rằng nhờ có thân phận đệ tử Vân Lam Tông mà có thể tùy ý chà đạp lên tôn nghiêm của phụ thân ta và Tiêu gia hay sao?"',
        sentences: [
          {
            id: 1,
            textEn:
              "Stepping into the center of the hall, Xiao Yan looked squarely into Nalan Yanran's haughty eyes.",
            textVi:
              'Bước ra giữa đại sảnh, Tiêu Viêm nhìn thẳng vào mắt kiêu ngạo của Nạp Lan Yên Nhiên.',
          },
          {
            id: 2,
            textEn:
              '"Do you believe you can tread upon the dignity of my father and clan at will?"',
            textVi:
              '"Nàng tin rằng nàng có thể tùy ý chà đạp lên tôn nghiêm của phụ thân ta và gia tộc hay sao?"',
          },
        ],
      },
      {
        id: 2,
        textEn:
          'With a swift draw of a dagger across his palm, blood gushed onto white parchment as Xiao Yan wrote with searing defiance. "Thirty years east of the river, thirty years west of the river—never bully a young man just because he is poor! Nalan Yanran, today it is not you who annuls this engagement; it is I, Xiao Yan, who expels you from our household! Three years from now, I will ascend the Misty Cloud Sect to settle this debt!"',
        textVi:
          'Rút thanh đoản đao rạch một đường dứt khoát qua lòng bàn tay, máu tươi bắn lên trang giấy trắng khi Tiêu Viêm vung bút viết trong sự kiêu hãnh bất khuất: "Ba mươi năm Hà Đông, ba mươi năm Hà Tây, đừng khinh thiếu niên nghèo! Nạp Lan Yên Nhiên, hôm nay không phải cô hủy hôn; mà chính là ta, Tiêu Viêm, trục xuất cô ra khỏi cửa! Ba năm sau, ta sẽ đích thân bước lên đỉnh Vân Lam Tông thanh toán món nợ này!"',
        sentences: [
          {
            id: 3,
            textEn:
              '"Thirty years east of the river, thirty years west of the river—never bully a young man just because he is poor!"',
            textVi: '"Ba mươi năm Hà Đông, ba mươi năm Hà Tây, đừng khinh thiếu niên nghèo!"',
          },
          {
            id: 4,
            textEn:
              '"Three years from now, I will ascend the Misty Cloud Sect to settle this debt!"',
            textVi:
              '"Ba năm sau, ta sẽ đích thân bước lên đỉnh Vân Lam Tông thanh toán món nợ này!"',
          },
        ],
      },
    ],
  },
  {
    id: 6,
    chapterNumber: 6,
    volume: 'Quyển 1: Ô Thản Thành & Phế Vật Thiếu Niên',
    titleEn: 'Chapter 6: Awakening Yao Lao in the Black Ring',
    titleVi: 'Chương 6: Thức Tỉnh Dược Lão Trong Chiếc Nhẫn Đen',
    estimatedMinutes: 18,
    wordCount: 2450,
    descriptionVi:
      'Trong đêm thanh vắng, Tiêu Viêm bất ngờ phát hiện luồng khí tức kỳ dị phát ra từ chiếc nhẫn đen của mẫu thân. Một lão nhân râu tóc bạc phơ hư ảo hiện ra, tự xưng là Dược Lão.',
    targetVocabulary: [
      { word: 'Spiritual Soul', ipa: '/ˈspɪrɪtʃuəl səʊl/', meaningVi: 'Linh hồn thể' },
      { word: 'Medicinal Sage', ipa: '/məˈdɪsɪnl seɪdʒ/', meaningVi: 'Dược Thánh / Đan Tôn' },
      { word: 'Heirloom', ipa: '/ˈeəluːm/', meaningVi: 'Kỷ vật gia truyền' },
      { word: 'Absorption', ipa: '/əbˈzɔːpʃn/', meaningVi: 'Sự hấp thụ, hút lấy' },
      { word: 'Mentor', ipa: '/ˈmentɔːr/', meaningVi: 'Người thầy, ân sư' },
    ],
    paragraphs: [
      {
        id: 1,
        textEn:
          'Under the silver moonlight, Xiao Yan examined the plain black ring on his finger. Suddenly, the ring flashed with an eerie white glow, and a translucent, ghostly figure of an old man floated out, laughing heartlessly. "Little fellow, thanks to your three years of pure Dou Qi, this old man has finally awakened!"',
        textVi:
          'Dưới ánh trăng bạc, Tiêu Viêm chăm chú nhìn chiếc nhẫn đen mộc mạc trên tay. Đột nhiên, chiếc nhẫn lóe lên một luồng bạch quang quái dị, một bóng hình linh hồn hư ảo của một lão nhân trôi bồng bềnh bay ra, cất tiếng cười sảng khoái: "Tiểu tử kia, nhờ có ba năm Đấu Khí tinh khiết của ngươi mà lão phu mới rốt cuộc tỉnh lại đấy!"',
        sentences: [
          {
            id: 1,
            textEn:
              'The ring flashed with an eerie white glow as a ghostly figure of an old man floated out.',
            textVi:
              'Chiếc nhẫn lóe lên luồng bạch quang kỳ dị khi bóng hình linh hồn lão nhân bay lượn ra ngoài.',
          },
          {
            id: 2,
            textEn:
              '"Little fellow, thanks to your three years of pure Dou Qi, this old man has finally awakened!"',
            textVi:
              '"Tiểu tử kia, nhờ có ba năm Đấu Khí tinh khiết của ngươi mà lão phu mới rốt cuộc tỉnh lại đấy!"',
          },
        ],
      },
      {
        id: 2,
        textEn:
          'Xiao Yan felt his blood boil with rage. "It was you?! You were the parasite that sucked away all my Dou Qi and made me a laughingstock for three whole years?!" The old man smiled mysteriously: "Calm down, boy. Do you wish to surpass Nalan Yanran? Do you wish to become a legendary Alchemist? If you take me as your master, I will teach you secrets beyond your wildest dreams."',
        textVi:
          'Tiêu Viêm cảm thấy máu trong người sôi lên sùng sục vì phẫn nộ: "Là ngươi sao?! Chính ngươi là kẻ đã hút cạn sạch Đấu Khí của ta, khiến ta thành trò cười suốt ba năm qua sao?!" Lão nhân mỉm cười đầy bí hiểm: "Bình tĩnh lại đi tiểu tử. Ngươi có muốn vượt qua Nạp Lan Yên Nhiên không? Ngươi có muốn trở thành một Luyện Dược Sư truyền kỳ không? Nếu bái ta làm sư phụ, ta sẽ dạy cho ngươi những bí mật vượt xa trí tưởng tượng của ngươi."',
        sentences: [
          {
            id: 3,
            textEn:
              '"You were the parasite that sucked away all my Dou Qi for three whole years?!"',
            textVi: '"Ngươi là kẻ đã hút cạn sạch Đấu Khí của ta suốt ba năm qua sao?!"',
          },
          {
            id: 4,
            textEn:
              '"If you take me as your master, I will teach you secrets beyond your wildest dreams."',
            textVi:
              '"Nếu bái ta làm sư phụ, ta sẽ dạy cho ngươi những bí mật vượt xa trí tưởng tượng của ngươi."',
          },
        ],
      },
    ],
  },
]
