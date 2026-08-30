// ============================================
// Mindful Life & Growth Full-Length Novel Dataset
// ============================================

import { BilingualStory } from '@/types/story'

export const LIFE_STORIES: BilingualStory[] = [
  {
    id: 'story-little-bookstore-kyoto',
    slug: 'the-little-bookstore-in-kyoto',
    titleEn: 'The Little Bookstore in Kyoto',
    titleVi: 'Tiệm Sách Nhỏ Nơi Cố Đô Kyoto',
    author: 'AI Original Literary Artist',
    rating: 4.97,
    readsCount: '8.7M',
    coverImage:
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&auto=format&fit=crop&q=80',
    category: 'life',
    level: 'B1 - Trung cấp',
    descriptionVi:
      'Trường thiên tiểu thuyết chữa lành & đời sống. Sau nhiều năm kiệt sức giữa nhịp sống hối hả Tokyo, cô gái Maya quyết định trở về tiếp quản tiệm sách cũ của ông nội ở cố đô Kyoto, tìm lại sự bình yên bên hương trà rang hojicha và khu vườn rêu phong.',
    tags: [
      'Chữa Lành Tâm Hồn',
      'Kyoto Bình Yên',
      'Tiểu Thuyết Dài Tập',
      'Tiệm Sách Cũ',
      'Đời Sống',
    ],
    chapters: [
      {
        id: 1,
        chapterNumber: 1,
        volume: 'Quyển 1: Tiếng Mưa Trên Mái Ngói Rêu',
        titleEn: 'Chapter 1: Raindrops on the Ancient Moss Roof',
        titleVi: 'Chương 1: Tiếng Mưa Rơi Trên Mái Ngói Rêu Phong',
        estimatedMinutes: 13,
        wordCount: 1620,
        descriptionVi:
          'Rời bỏ Tokyo náo nhiệt, Maya trở về con hẻm lát đá cố đô Kyoto trong một chiều mưa thu lất phất, bước chân vào tiệm sách cũ ngập tràn ký ức tuổi thơ.',
        targetVocabulary: [
          { word: 'Eaves', ipa: '/iːvz/', meaningVi: 'Mái hiên nhà' },
          {
            word: 'Aroma of Roasted Tea',
            ipa: '/əˈrəʊmə əv ˈrəʊstɪd tiː/',
            meaningVi: 'Hương thơm trà rang',
          },
          {
            word: 'Wabi-sabi',
            ipa: '/ˈwɑːbi ˈsɑːbi/',
            meaningVi: 'Vẻ đẹp mộc mạc bất toàn của thời gian',
          },
          { word: 'Tranquility', ipa: '/træŋˈkwɪləti/', meaningVi: 'Sự thanh bình, tĩnh lặng' },
        ],
        paragraphs: [
          {
            id: 1,
            textEn:
              'Gentle autumn rain tapped a soft, rhythmic melody against the weathered clay roof tiles of Gion district in Kyoto. The narrow cobblestone street, lined with traditional wooden machiya townhouses, was veiled in a soft mist. Maya stood under her transparent vinyl umbrella, holding a damp paper suitcase, gazing at the wooden signboard that read "Kamogawa Books" in her late grandfather\'s elegant calligraphy.',
            textVi:
              'Cơn mưa thu dịu êm gõ nhịp điệu êm ái, tí tách lên những viên ngói đất nung phong hóa của khu phố Gion ở Kyoto. Con phố hẹp lát đá cuội, nép mình bên những ngôi nhà phố machiya bằng gỗ truyền thống, chìm trong làn sương mờ ảo. Maya đứng dưới chiếc ô trong suốt, tay cầm chiếc vali giấy còn ẩm hơi sương, ngắm nhìn tấm biển gỗ khắc dòng chữ "Hiệu Sách Kamogawa" bằng nét thư pháp thanh thoát của người ông quá cố.',
            sentences: [
              {
                id: 1,
                textEn:
                  'Gentle autumn rain tapped a soft melody against clay roof tiles in Gion, Kyoto.',
                textVi:
                  'Cơn mưa thu dịu êm gõ nhịp điệu tí tách lên những viên ngói đất nung ở Gion, Kyoto.',
              },
              {
                id: 2,
                textEn:
                  'Maya stood under her umbrella, gazing at the signboard that read "Kamogawa Books".',
                textVi:
                  'Maya đứng dưới chiếc ô, ngắm nhìn tấm biển gỗ mang tên "Hiệu Sách Kamogawa".',
              },
            ],
          },
          {
            id: 2,
            textEn:
              "Sliding open the cedar lattice door, a bronze brass chime rang softly. The interior air was warm, smelling of cedarwood, aged paper, dried chamomile, and freshly roasted hojicha tea. Shelves upon shelves of secondhand novels, poetry collections, and botanical drawings stretched from the tatami floor to the high ceiling. For five years in Tokyo's corporate jungle, Maya had forgotten how to breathe; stepping into this bookstore felt like stepping into an embrace.",
            textVi:
              'Khẽ đẩy cánh cửa trượt bằng gỗ tuyết tùng, chiếc chuông đồng kêu lên một tiếng ngân trong trẻo. Không gian bên trong ấm áp lạ thường, phảng phất mùi gỗ tuyết tùng, giấy sách ố màu thời gian, hoa cúc khô và hương trà rang hojicha thơm lừng. Hàng kệ sách cũ xếp đầy tiểu thuyết, tập thơ và các bản vẽ thực vật kéo dài từ sàn chiếu tatami lên tận trần nhà cao. Suốt năm năm chôn vùi trong guồng quay công sở ngột ngạt ở Tokyo, Maya dường như đã quên mất cách hít thở; bước chân vào tiệm sách này như được trở về trong một vòng tay ấm áp.',
            sentences: [
              {
                id: 3,
                textEn: 'Sliding open the cedar door, a bronze brass chime rang softly.',
                textVi:
                  'Khẽ đẩy cánh cửa trượt gỗ tuyết tùng, chiếc chuông đồng kêu lên một tiếng ngân trong trẻo.',
              },
              {
                id: 4,
                textEn:
                  'The interior air was warm, smelling of aged paper and freshly roasted hojicha tea.',
                textVi:
                  'Không gian bên trong ấm áp, phảng phất mùi giấy sách cũ và hương trà rang hojicha.',
              },
              {
                id: 5,
                textEn: 'Stepping into this bookstore felt like stepping into a peaceful embrace.',
                textVi:
                  'Bước chân vào tiệm sách này mang lại cảm giác bình yên như được trở về trong vòng tay ấm áp.',
              },
            ],
          },
        ],
        comprehensionQuiz: [
          {
            id: 'q1',
            question: 'What comforting scents filled the little bookstore in Kyoto?',
            options: [
              'Cedarwood, aged paper, dried chamomile, and roasted hojicha tea',
              'Gasoline and exhaust smoke',
              'Fresh paint and plastic',
              'Chemical cleaner',
            ],
            correctIndex: 0,
            explanation:
              'The sensory atmosphere was filled with aged paper, cedarwood, and soothing roasted tea.',
          },
        ],
      },
    ],
  },
]
