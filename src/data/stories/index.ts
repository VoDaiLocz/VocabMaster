// ============================================
// Bilingual Stories Library (Xianxia, Tech, Fables)
// ============================================

import { BilingualStory } from '@/types/story'

export const BILINGUAL_STORIES_DATA: BilingualStory[] = [
  // 1. Xianxia: Awakening Spirit Root
  {
    id: 'story-xianxia-spirit-root',
    slug: 'awakening-spirit-root',
    titleEn: 'The Path of the Immortal: Awakening the Spirit Root',
    titleVi: 'Đại Đạo Tu Tiên: Thức Tỉnh Linh Căn Cửu Thiên',
    author: 'Er Gen & I Eat Tomatoes (Adapted)',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    category: 'xianxia',
    level: 'B2 - Khá',
    estimatedMinutes: 6,
    wordCount: 420,
    descriptionVi: 'Hành trình bước vào con đường tu tiên nghịch thiên, hấp thu linh khí đất trời và ngưng tụ Linh Căn Cửu Thiên.',
    targetVocabulary: [
      { word: 'Cultivation', ipa: '/ˌkʌltɪˈveɪʃn/', meaningVi: 'Sự tu luyện, tu chân' },
      { word: 'Spiritual Energy', ipa: '/ˈspɪrɪtʃuəl ˈenədʒi/', meaningVi: 'Linh khí đất trời' },
      { word: 'Dantian', ipa: '/dænˈtjæn/', meaningVi: 'Đan điền (nơi tụ khí)' },
      { word: 'Meridians', ipa: '/məˈrɪdiənz/', meaningVi: 'Kinh mạch' },
      { word: 'Tribulation', ipa: '/ˌtrɪbjuˈleɪʃn/', meaningVi: 'Thiên kiếp, lôi kiếp' },
      { word: 'Foundation Establishment', ipa: '/faʊnˈdeɪʃn ɪˈstæblɪʃmənt/', meaningVi: 'Trúc Cơ kỳ' },
    ],
    paragraphs: [
      {
        id: 1,
        textEn: 'In the vast realm of the Azure Cloud Continent, mortal beings looked up at the towering mountains with boundless reverence.',
        textVi: 'Tại đại lục Thanh Vân mênh mông vô tận, phàm nhân luôn ngước nhìn những rặng núi sừng sững với sự tôn kính vô bờ bến.',
        sentences: [
          { id: 1, textEn: 'In the vast realm of the Azure Cloud Continent, mortal beings looked up at the towering mountains with boundless reverence.', textVi: 'Tại đại lục Thanh Vân mênh mông vô tận, phàm nhân luôn ngước nhìn những rặng núi sừng sững với sự tôn kính vô bờ bến.' },
          { id: 2, textEn: 'Legends said that immortal cultivators dwelt above the sea of clouds, commanding flying swords and defying the heavens.', textVi: 'Truyền thuyết kể rằng các bậc tiên nhân tu chân cư ngụ trên biển mây, ngự phi kiếm và nghịch thiên cải mệnh.' }
        ]
      },
      {
        id: 2,
        textEn: 'Lin Feng sat cross-legged atop a lonely granite cliff, his breathing synchronized with the rising dawn.',
        textVi: 'Lâm Phong ngồi xếp bằng trên đỉnh vách đá hoa cương cô độc, hơi thở hòa nhịp cùng ánh bình minh đang lên.',
        sentences: [
          { id: 3, textEn: 'Lin Feng sat cross-legged atop a lonely granite cliff, his breathing synchronized with the rising dawn.', textVi: 'Lâm Phong ngồi xếp bằng trên đỉnh vách đá hoa cương cô độc, hơi thở hòa nhịp cùng ánh bình minh đang lên.' },
          { id: 4, textEn: 'For three years, he had been ridiculed as a discarded disciple with crippled meridians.', textVi: 'Suốt ba năm qua, hắn bị chế giễu là đệ tử phế vật với kinh mạch tàn phế.' },
          { id: 5, textEn: 'Yet beneath his calm gaze burned an unyielding determination to forge his own Dao.', textVi: 'Thế nhưng bên dưới ánh mắt bình thản ấy là ý chí kiên định bất khuất muốn khắc họa Đạo của riêng mình.' }
        ]
      },
      {
        id: 3,
        textEn: 'As the first ray of golden sunlight pierced the morning mist, a surge of primordial spiritual energy resonated within his Dantian.',
        textVi: 'Khi tia nắng vàng đầu tiên xuyên qua làn sương sớm, một luồng hồng hoang linh khí bỗng cộng hưởng mãnh liệt trong đan điền hắn.',
        sentences: [
          { id: 6, textEn: 'As the first ray of golden sunlight pierced the morning mist, a surge of primordial spiritual energy resonated within his Dantian.', textVi: 'Khi tia nắng vàng đầu tiên xuyên qua làn sương sớm, một luồng hồng hoang linh khí bỗng cộng hưởng mãnh liệt trong đan điền hắn.' },
          { id: 7, textEn: 'The ancient dragon pendant on his chest glowed with dazzling azure radiance.', textVi: 'Mảnh ngọc bội hình rồng cổ xưa trên ngực hắn phát ra ánh hào quang xanh biếc rực rỡ.' },
          { id: 8, textEn: 'The blocked meridians shattered like brittle ice under the roaring torrent of celestial power.', textVi: 'Những kinh mạch bế tắc vỡ vụn như băng mỏng trước dòng thác thần lực ngập tràn trời đất.' }
        ]
      },
      {
        id: 4,
        textEn: 'Thunder roared across the cloudless sky as a nine-colored spiritual root materialized behind him.',
        textVi: 'Sấm sét ầm vang khắp bầu trời không một gợn mây khi một gốc Cửu Thải Linh Căn hiển hiện sau lưng hắn.',
        sentences: [
          { id: 9, textEn: 'Thunder roared across the cloudless sky as a nine-colored spiritual root materialized behind him.', textVi: 'Sấm sét ầm vang khắp bầu trời không một gợn mây khi một gốc Cửu Thải Linh Căn hiển hiện sau lưng hắn.' },
          { id: 10, textEn: 'He had broken through the barrier of Qi Condensation and touched the threshold of Foundation Establishment.', textVi: 'Hắn đã phá vỡ rào cản Luyện Khí kỳ và chạm tới ngưỡng cửa Trúc Cơ.' },
          { id: 11, textEn: '"From this day forward," Lin Feng murmured, looking at the distant immortal sects, "my destiny belongs to no heaven."', textVi: '"Kể từ ngày hôm nay," Lâm Phong lẩm bẩm, nhìn về các tiên môn xa xăm, "vận mệnh của ta không do trời định."' }
        ]
      }
    ],
    comprehensionQuiz: [
      {
        id: 'q1',
        question: 'Why was Lin Feng ridiculed for three years before his breakthrough?',
        options: [
          'He was believed to have crippled meridians',
          'He refused to practice sword techniques',
          'He stole a treasure from the sect',
          'He was a mortal prince without ambitions'
        ],
        correctIndex: 0,
        explanation: 'Lin Feng was mocked as a discarded disciple because his meridians were thought to be crippled.'
      },
      {
        id: 'q2',
        question: 'What artifact awakened Lin Feng’s primordial spiritual energy?',
        options: [
          'A flying sword',
          'An ancient dragon pendant',
          'A celestial pill',
          'A golden talisman'
        ],
        correctIndex: 1,
        explanation: 'The ancient dragon pendant on his chest glowed with azure radiance and shattered his blocked meridians.'
      }
    ]
  },

  // 2. Xianxia: Coiling Dragon
  {
    id: 'story-xianxia-coiling-dragon',
    slug: 'coiling-dragon-sovereign-ring',
    titleEn: 'Coiling Dragon: The Ring of the Sovereign',
    titleVi: 'Bàn Long: Chiếc Nhẫn Thần Bí Của Chủ Thần',
    author: 'I Eat Tomatoes (Adapted)',
    coverImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80',
    category: 'xianxia',
    level: 'B2 - Khá',
    estimatedMinutes: 5,
    wordCount: 380,
    descriptionVi: 'Linley khám phá bí mật của chiếc nhẫn Bàn Long và bước chân vào thế giới của các Ma Pháp Sư và Chiến Sĩ Đỉnh Cao.',
    targetVocabulary: [
      { word: 'Sovereign', ipa: '/ˈsɒvrɪn/', meaningVi: 'Chủ Thần, Đấng Tối Cao' },
      { word: 'Elemental Laws', ipa: '/ˌelɪˈmentl lɔːz/', meaningVi: 'Quy luật Nguyên tố' },
      { word: 'Magus', ipa: '/ˈmeɪɡəs/', meaningVi: 'Ma Pháp Sư' },
      { word: 'Lineage', ipa: '/ˈlɪniɪdʒ/', meaningVi: 'Huyết thống gia tộc' },
    ],
    paragraphs: [
      {
        id: 1,
        textEn: 'In the ancient town of Wushan, the Baruch clan possessed a glorious ancestry as the legendary Dragonblood Warriors.',
        textVi: 'Tại thị trấn Ô Sơn cổ kính, gia tộc Baruch từng sở hữu tổ tiên lẫy lừng là các Chiến Sĩ Long Huyết huyền thoại.',
        sentences: [
          { id: 1, textEn: 'In the ancient town of Wushan, the Baruch clan possessed a glorious ancestry as the legendary Dragonblood Warriors.', textVi: 'Tại thị trấn Ô Sơn cổ kính, gia tộc Baruch từng sở hữu tổ tiên lẫy lừng là các Chiến Sĩ Long Huyết huyền thoại.' },
          { id: 2, textEn: 'However, centuries of decline had left the clan in poverty, with only ancestral relics remaining.', textVi: 'Tuy nhiên, hàng thế kỷ suy tàn đã khiến gia tộc rơi vào cảnh bần hàn, chỉ còn lại những di vật của tổ tiên.' }
        ]
      },
      {
        id: 2,
        textEn: 'While exploring the dilapidated manor, young Linley stumbled upon an unassuming black ring buried beneath the rubble.',
        textVi: 'Khi khám phá trang viên đổ nát, cậu bé Linley tình cờ phát hiện một chiếc nhẫn đen bình dị bị chôn vùi dưới đống gạch vụn.',
        sentences: [
          { id: 3, textEn: 'While exploring the dilapidated manor, young Linley stumbled upon an unassuming black ring buried beneath the rubble.', textVi: 'Khi khám phá trang viên đổ nát, cậu bé Linley tình cờ phát hiện một chiếc nhẫn đen bình dị bị chôn vùi dưới đống gạch vụn.' },
          { id: 4, textEn: 'When a drop of his blood accidentally touched the ring, a powerful soul entity emerged from the void.', textVi: 'Khi một giọt máu của cậu vô tình chạm vào chiếc nhẫn, một linh hồn cường đại bỗng xuất hiện từ hư không.' }
        ]
      },
      {
        id: 3,
        textEn: 'It was Doehring Cowart, a Grand Magus of the Saint realm whose soul had been sealed inside the Coiling Dragon ring for thousands of years.',
        textVi: 'Đó chính là Đức Lâm Kha Hoạt, một Thánh Vực Đại Ma Đạo Sư có linh hồn bị phong ấn bên trong chiếc nhẫn Bàn Long suốt hàng ngàn năm.',
        sentences: [
          { id: 5, textEn: 'It was Doehring Cowart, a Grand Magus of the Saint realm whose soul had been sealed inside the Coiling Dragon ring for thousands of years.', textVi: 'Đó chính là Đức Lâm Kha Hoạt, một Thánh Vực Đại Ma Đạo Sư có linh hồn bị phong ấn bên trong chiếc nhẫn Bàn Long suốt hàng ngàn năm.' },
          { id: 6, textEn: 'Under Doehring Cowart’s guidance, Linley embarked on a dual path of earth magic and martial sword mastery.', textVi: 'Dưới sự chỉ dẫn của Đức Lâm, Linley bắt đầu con đường song tu ma pháp hệ Thổ và kiếm thuật đỉnh cao.' }
        ]
      }
    ],
    comprehensionQuiz: [
      {
        id: 'q1',
        question: 'Who was sealed inside the Coiling Dragon ring?',
        options: [
          'A Saint-realm Grand Magus named Doehring Cowart',
          'An ancient evil dragon demon',
          'Linley’s ancestor from the Baruch clan',
          'A Sovereign god of the Netherworld'
        ],
        correctIndex: 0,
        explanation: 'Doehring Cowart was a Saint-realm Grand Magus sealed inside the ring.'
      }
    ]
  },

  // 3. Tech: The Story of Linux & Linus Torvalds
  {
    id: 'story-tech-linux',
    slug: 'story-of-linux',
    titleEn: 'The Penguin Revolution: How Linus Torvalds Created Linux',
    titleVi: 'Cuộc Cách Mạng Chim Cánh Cụt: Linus Torvalds Đã Tạo Ra Linux Như Thế Nào',
    author: 'VocabMaster Tech Stories',
    coverImage: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&auto=format&fit=crop&q=80',
    category: 'tech',
    level: 'B1 - Trung cấp',
    estimatedMinutes: 5,
    wordCount: 360,
    descriptionVi: 'Câu chuyện chàng sinh viên 21 tuổi người Phần Lan đã viết nên hạt nhân hệ điều hành làm thay đổi toàn bộ thế giới công nghệ.',
    targetVocabulary: [
      { word: 'Operating System', ipa: '/ˈɒpəreɪtɪŋ ˈsɪstəm/', meaningVi: 'Hệ điều hành' },
      { word: 'Open Source', ipa: '/ˌəʊpən ˈsɔːs/', meaningVi: 'Mã nguồn mở' },
      { word: 'Kernel', ipa: '/ˈkɜːnl/', meaningVi: 'Nhân hệ điều hành' },
      { word: 'Collaboration', ipa: '/kəˌlæbəˈreɪʃn/', meaningVi: 'Sự hợp tác' },
    ],
    paragraphs: [
      {
        id: 1,
        textEn: 'In 1991, a 21-year-old computer science student at the University of Helsinki named Linus Torvalds was frustrated with the limitations of existing operating systems.',
        textVi: 'Năm 1991, một sinh viên khoa học máy tính 21 tuổi tại Đại học Helsinki tên là Linus Torvalds cảm thấy thất vọng trước những hạn chế của các hệ điều hành lúc bấy giờ.',
        sentences: [
          { id: 1, textEn: 'In 1991, a 21-year-old computer science student at the University of Helsinki named Linus Torvalds was frustrated with the limitations of existing operating systems.', textVi: 'Năm 1991, một sinh viên khoa học máy tính 21 tuổi tại Đại học Helsinki tên là Linus Torvalds cảm thấy thất vọng trước những hạn chế của các hệ điều hành lúc bấy giờ.' },
          { id: 2, textEn: 'Commercial Unix licenses were exorbitantly expensive, while Minix was strictly educational.', textVi: 'Bản quyền Unix thương mại thì đắt đỏ một cách quá đáng, trong khi Minix chỉ giới hạn cho mục đích học tập.' }
        ]
      },
      {
        id: 2,
        textEn: 'Sitting in his small bedroom, Linus began writing a new kernel from scratch for his Intel 386 PC.',
        textVi: 'Ngồi trong căn phòng ngủ nhỏ của mình, Linus bắt đầu tự tay viết một kernel mới từ đầu cho chiếc máy tính Intel 386 của mình.',
        sentences: [
          { id: 3, textEn: 'Sitting in his small bedroom, Linus began writing a new kernel from scratch for his Intel 386 PC.', textVi: 'Ngồi trong căn phòng ngủ nhỏ của mình, Linus bắt đầu tự tay viết một kernel mới từ đầu cho chiếc máy tính Intel 386 của mình.' },
          { id: 4, textEn: 'On August 25, 1991, he posted a legendary message on the Usenet newsgroup: "I\'m doing a free operating system, just a hobby, won\'t be big and professional like gnu."', textVi: 'Vào ngày 25 tháng 8 năm 1991, anh đăng một thông điệp huyền thoại lên nhóm tin tức Usenet: "Tôi đang làm một hệ điều hành miễn phí, chỉ là sở thích thôi, sẽ không lớn và chuyên nghiệp như gnu đâu."' }
        ]
      },
      {
        id: 3,
        textEn: 'Developers around the globe joined in to contribute code, fix bugs, and add hardware drivers.',
        textVi: 'Các lập trình viên trên toàn thế giới đã cùng nhau đóng góp mã nguồn, sửa lỗi và thêm driver phần cứng.',
        sentences: [
          { id: 5, textEn: 'Developers around the globe joined in to contribute code, fix bugs, and add hardware drivers.', textVi: 'Các lập trình viên trên toàn thế giới đã cùng nhau đóng góp mã nguồn, sửa lỗi và thêm driver phần cứng.' },
          { id: 6, textEn: 'Today, Linux powers over ninety percent of the world\'s supercomputers, cloud servers, and billions of Android smartphones.', textVi: 'Ngày nay, Linux vận hành hơn 90% siêu máy tính trên thế giới, các máy chủ đám mây và hàng tỷ điện thoại thông minh Android.' }
        ]
      }
    ],
    comprehensionQuiz: [
      {
        id: 'q1',
        question: 'What inspired Linus Torvalds to start writing Linux?',
        options: [
          'Expensive Unix licenses and limitations of Minix',
          'A school assignment from his professor',
          'A multi-million dollar corporate contract',
          'He wanted to build a video game engine'
        ],
        correctIndex: 0,
        explanation: 'Linus was frustrated because commercial Unix was too expensive and Minix was limited.'
      }
    ]
  },

  // 4. Fables: The Boy Who Cried Wolf
  {
    id: 'story-fable-cried-wolf',
    slug: 'the-boy-who-cried-wolf',
    titleEn: 'Aesop’s Fables: The Boy Who Cried Wolf',
    titleVi: 'Truyện Ngụ Ngôn Aesop: Cậu Bé Chăn Cừu Và Con Sói',
    author: 'Aesop',
    coverImage: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=800&auto=format&fit=crop&q=80',
    category: 'fables',
    level: 'A2 - Cơ bản',
    estimatedMinutes: 3,
    wordCount: 220,
    descriptionVi: 'Bài học kinh điển về sự trung thực và lòng tin: Kẻ hay nói dối sẽ không ai tin kể cả khi nói thật.',
    targetVocabulary: [
      { word: 'Shepherd', ipa: '/ˈʃepəd/', meaningVi: 'Người chăn cừu' },
      { word: 'Villagers', ipa: '/ˈvɪlɪdʒəz/', meaningVi: 'Dân làng' },
      { word: 'Deceive', ipa: '/dɪˈsiːv/', meaningVi: 'Lừa dối' },
      { word: 'Trustworthiness', ipa: '/ˈtrʌstwɜːðinəs/', meaningVi: 'Sự đáng tin cậy' },
    ],
    paragraphs: [
      {
        id: 1,
        textEn: 'There once was a shepherd boy who was bored as he sat on the hillside watching the village sheep.',
        textVi: 'Ngày xưa có một cậu bé chăn cừu cảm thấy buồn chán khi ngồi trên sườn đồi trông nom đàn cừu của làng.',
        sentences: [
          { id: 1, textEn: 'There once was a shepherd boy who was bored as he sat on the hillside watching the village sheep.', textVi: 'Ngày xưa có một cậu bé chăn cừu cảm thấy buồn chán khi ngồi trên sườn đồi trông nom đàn cừu của làng.' },
          { id: 2, textEn: 'To amuse himself, he took a great breath and sang out, "Wolf! Wolf! The Wolf is chasing the sheep!"', textVi: 'Để giải khuây, cậu hít một hơi thật sâu và hét to: "Sói! Sói! Có sói đang đuổi cừu!"' }
        ]
      },
      {
        id: 2,
        textEn: 'The villagers came running up the hill to help the boy drive the wolf away.',
        textVi: 'Dân làng vội vã chạy lên đồi để giúp cậu bé xua đuổi con sói.',
        sentences: [
          { id: 3, textEn: 'The villagers came running up the hill to help the boy drive the wolf away.', textVi: 'Dân làng vội vã chạy lên đồi để giúp cậu bé xua đuổi con sói.' },
          { id: 4, textEn: 'When they arrived at the top of the hill, they found no wolf, but the boy laughed at their angry faces.', textVi: 'Khi lên tới đỉnh đồi, họ chẳng thấy con sói nào, chỉ thấy cậu bé đang cười lớn trước vẻ mặt tức giận của họ.' }
        ]
      },
      {
        id: 3,
        textEn: 'A few days later, a real wolf came out from the forest and attacked the flock.',
        textVi: 'Vài ngày sau, một con sói thật sự từ trong rừng xông ra và tấn công đàn cừu.',
        sentences: [
          { id: 5, textEn: 'A few days later, a real wolf came out from the forest and attacked the flock.', textVi: 'Vài ngày sau, một con sói thật sự từ trong rừng xông ra và tấn công đàn cừu.' },
          { id: 6, textEn: 'The boy cried out in terror, "Wolf! Wolf!", but the villagers thought he was trying to fool them again, and nobody came.', textVi: 'Cậu bé hét lên trong hoảng sợ: "Sói! Sói!", nhưng dân làng nghĩ cậu lại lừa họ nên chẳng một ai chạy đến.' },
          { id: 7, textEn: 'The moral of the story is that nobody believes a liar, even when he tells the truth.', textVi: 'Bài học của câu chuyện là không ai tin kẻ nói dối, ngay cả khi hắn nói sự thật.' }
        ]
      }
    ],
    comprehensionQuiz: [
      {
        id: 'q1',
        question: 'Why did the villagers not come when the real wolf attacked?',
        options: [
          'They thought the boy was lying again',
          'They were too busy working in the fields',
          'They did not hear the boy shouting',
          'They were afraid of the dark forest'
        ],
        correctIndex: 0,
        explanation: 'Because the boy had lied before, the villagers assumed he was playing another prank.'
      }
    ]
  }
]
