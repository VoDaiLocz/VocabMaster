// ============================================
// Philosophical Fables & Wisdom Stories Dataset
// ============================================

import { BilingualStory } from '@/types/story'

export const FABLES_STORIES: BilingualStory[] = [
  {
    id: 'story-echoes-of-the-tao',
    slug: 'echoes-of-the-tao',
    titleEn: 'Echoes of the Tao: Timeless Tales of Wisdom',
    titleVi: 'Tiếng Vọng Đạo Gia: Những Điển Tích & Bài Học Minh Triết',
    author: 'AI Philosophy Sage',
    rating: 4.98,
    readsCount: '9.2M',
    coverImage:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
    category: 'fables',
    level: 'A2 - Cơ bản',
    descriptionVi:
      'Tuyển tập các điển tích ngụ ngôn triết học phương Đông kinh điển: Tái Ông Thất Mã, Trang Chu Mộng Điệp, Bán Dầu Lão Ông, Chiếc Thuyền Trống. Giúp người đọc nuôi dưỡng tâm hồn và học tiếng Anh qua những bài học nhân sinh sâu sắc.',
    tags: [
      'Triết Lý Đạo Gia',
      'Ngụ Ngôn Cổ Điển',
      'Tiểu Thuyết Dài Tập',
      'Nuôi Dưỡng Tâm Hồn',
      'Dễ Học',
    ],
    chapters: [
      {
        id: 1,
        chapterNumber: 1,
        volume: 'Quyển 1: Minh Triết Phương Đông',
        titleEn: 'Chapter 1: The Old Man on the Northern Frontier (Sai Weng Lost His Horse)',
        titleVi: 'Chương 1: Tái Ông Thất Mã — Họa Phúc Khôn Lường',
        estimatedMinutes: 12,
        wordCount: 1520,
        descriptionVi:
          'Điển tích Tái Ông Thất Mã với triết lý sâu sắc: Trong họa có phúc, trong phúc có họa, giữ tâm an nhiên trước mọi biến đổi cuộc đời.',
        targetVocabulary: [
          { word: 'Northern Frontier', ipa: '/ˈnɔːðən frʌnˈtɪə/', meaningVi: 'Biên ải phía bắc' },
          {
            word: 'Blessing in Disguise',
            ipa: '/ˈblesɪŋ ɪn dɪsˈɡaɪz/',
            meaningVi: 'Trong cái rủi có cái may',
          },
          {
            word: 'Serenity of Mind',
            ipa: '/səˈrenəti əv maɪnd/',
            meaningVi: 'Tâm hồn an nhiên thanh thản',
          },
          {
            word: 'Unforeseen Calamity',
            ipa: '/ˌʌnfɔːˈsiːn kəˈlæməti/',
            meaningVi: 'Tai họa không lường trước được',
          },
        ],
        paragraphs: [
          {
            id: 1,
            textEn:
              'Long ago, along the rugged borderlands of the northern frontier, an elderly sage named Sai Weng lived in a humble wooden cabin with his only son. While most border dwellers worried constantly about tribal skirmishes and fluctuating seasons, the old man spent his days tending to his small vegetable garden and grazing his prized white stallion across the windswept hills.',
            textVi:
              'Thuở xa xưa, dọc theo vùng biên cương hiểm trở nơi biên ải phía bắc, có một vị hiền triết cao tuổi tên là Tái Ông sống trong một căn nhà gỗ mộc mạc cùng người con trai duy nhất. Trong khi phần lớn cư dân biên giới luôn lo lắng khôn nguôi về những cuộc giao tranh bộ lạc và thời tiết thất thường, ông lão lại dành trọn ngày tháng chăm sóc mảnh vườn rau nhỏ và chăn thả con tuấn mã màu trắng quý giá trên những sườn đồi lộng gió.',
            sentences: [
              {
                id: 1,
                textEn:
                  'Long ago along the northern frontier, an elderly sage named Sai Weng lived with his only son.',
                textVi:
                  'Thuở xa xưa nơi biên ải phía bắc, một vị hiền triết cao tuổi tên Tái Ông sống cùng con trai.',
              },
              {
                id: 2,
                textEn:
                  'The old man spent his days tending to his vegetable garden and grazing his white stallion.',
                textVi:
                  'Ông lão dành ngày tháng chăm sóc vườn rau và chăn thả con tuấn mã màu trắng quý giá.',
              },
            ],
          },
          {
            id: 2,
            textEn:
              'One evening, the wooden stable door swung open in a sudden gust of wind, and the prized white horse bolted across the border into nomadic territory. Neighbors gathered around his fence, offering profound condolences for his immense loss. Yet the old man merely smiled and whispered: "Who knows if this loss might turn out to be a blessing?"',
            textVi:
              'Một buổi chiều tà, cánh cửa chuồng ngựa bằng gỗ bị gió lốc thổi tung, và con tuấn mã trắng đã phóng vút qua biên giới chạy vào lãnh thổ của các bộ lạc du mục. Những người hàng xóm vội vã vây quanh hàng rào, bày tỏ lời chia buồn sâu sắc trước sự mất mát tài sản to lớn của ông. Thế nhưng ông lão chỉ khẽ mỉm cười và ôn tồn nói: "Biết đâu sự mất mát này lại là một điều may mắn thì sao?"',
            sentences: [
              {
                id: 3,
                textEn: 'One evening, the horse bolted across the border into nomadic territory.',
                textVi:
                  'Một buổi chiều, con ngựa phóng qua biên giới chạy vào lãnh thổ bộ lạc du mục.',
              },
              {
                id: 4,
                textEn:
                  'Neighbors offered condolences, but the old man whispered: "Who knows if this is a blessing?"',
                textVi:
                  'Hàng xóm chia buồn, nhưng ông lão nói: "Biết đâu sự mất mát này lại là điều may mắn?"',
              },
            ],
          },
          {
            id: 3,
            textEn:
              'Several months later, the white stallion returned, leading a magnificent, swift nomadic mare behind it. The villagers rushed over to celebrate his newfound wealth, but the old sage remained imperturbable: "Who knows if this sudden fortune might bring unforeseen sorrow?" When his son later broke his leg while riding the spirited mare, the neighbors again wept, but the old man stayed peaceful.',
            textVi:
              'Vài tháng sau, con tuấn mã trắng bất ngờ quay trở về, dẫn theo sau một con tuấn mã hoang dã tuyệt đẹp của vùng thảo nguyên. Dân làng nô nức kéo đến chúc mừng sự giàu có bất ngờ của gia đình ông, nhưng vị hiền triết già vẫn giữ tâm bất biến: "Biết đâu vận may bất ngờ này lại đem đến nỗi buồn khôn lường?" Khi người con trai sau đó bị gãy chân do ngã ngựa, hàng xóm lại đến than khóc, nhưng ông lão vẫn an nhiên tự tại.',
            sentences: [
              {
                id: 5,
                textEn:
                  'Several months later, the white stallion returned leading a magnificent nomadic mare.',
                textVi:
                  'Vài tháng sau, con ngựa trắng quay về dẫn theo một con tuấn mã thảo nguyên tuyệt đẹp.',
              },
              {
                id: 6,
                textEn:
                  'The sage asked: "Who knows if this fortune might bring unforeseen sorrow?"',
                textVi:
                  'Vị hiền triết hỏi: "Biết đâu vận may bất ngờ này lại đem đến nỗi buồn khôn lường?"',
              },
              {
                id: 7,
                textEn: 'When his son broke his leg, the old man remained peaceful and unbothered.',
                textVi:
                  'Khi con trai bị ngã ngựa gãy chân, ông lão vẫn giữ tâm an nhiên thanh thản.',
              },
            ],
          },
          {
            id: 4,
            textEn:
              "A year later, a brutal war erupted along the frontier, and all healthy young men were forcefully drafted into the army, where nine out of ten perished in battle. Because of his lame leg, Sai Weng's son was spared, and both father and son survived peacefully to old age. Fortune and misfortune are inextricably intertwined; true wisdom lies in maintaining serenity through all the seasons of existence.",
            textVi:
              'Một năm sau, chiến tranh tàn khốc bùng nổ dọc theo biên cương, toàn bộ thanh niên trai tráng khỏe mạnh đều bị bắt lính cưỡng bức ra trận, nơi mười người thì có tới chín người bỏ mạng nơi sa trường. Nhờ cái chân gãy tật nguyền, con trai Tái Ông được miễn đi lính, và cả hai cha con đều sống yên bình đến lúc đầu bạc răng long. Phúc họa trong đời đan xen khôn lường; minh triết đích thực là giữ trọn sự an nhiên qua mọi thăng trầm của kiếp nhân sinh.',
            sentences: [
              {
                id: 8,
                textEn:
                  'A brutal war erupted and all healthy young men were drafted into the army.',
                textVi:
                  'Chiến tranh tàn khốc bùng nổ và toàn bộ thanh niên trai tráng đều bị bắt lính ra trận.',
              },
              {
                id: 9,
                textEn: "Because of his injury, Sai Weng's son was spared, surviving peacefully.",
                textVi:
                  'Nhờ vết thương ở chân, con trai Tái Ông được miễn lính, sống yên bình bên cha.',
              },
              {
                id: 10,
                textEn:
                  'Fortune and misfortune are intertwined; true wisdom lies in maintaining serenity.',
                textVi:
                  'Họa phúc đan xen khôn lường; minh triết đích thực là giữ trọn sự an nhiên thanh thản.',
              },
            ],
          },
        ],
        comprehensionQuiz: [
          {
            id: 'q1',
            question: 'Why was Sai Weng’s son saved from being killed in the frontier war?',
            options: [
              'Because his broken leg exempted him from military draft',
              'Because he hid in a cave',
              'Because he was too rich',
              'Because he moved to another country',
            ],
            correctIndex: 0,
            explanation:
              'The broken leg—initially seen as a tragedy—turned out to be the exact blessing that saved his life.',
          },
        ],
      },
    ],
  },
]
