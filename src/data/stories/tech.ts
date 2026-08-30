// ============================================
// Tech Startup & AI Full-Length Webnovel Dataset
// ============================================

import { BilingualStory } from '@/types/story'

export const TECH_STORIES: BilingualStory[] = [
  {
    id: 'story-the-silicon-alchemist',
    slug: 'the-silicon-alchemist',
    titleEn: 'The Silicon Alchemist: Zero to Unicorn',
    titleVi: 'Giả Kim Thuật Thung Lũng Silicon: Từ Zero Đến Kỳ Lân',
    author: 'AI Original Tech Master',
    rating: 5.0,
    readsCount: '15.8M',
    coverImage:
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    category: 'tech',
    level: 'B2 - Khá',
    descriptionVi:
      'Đại trường thiên tiểu thuyết công nghệ & khởi nghiệp AI. Từ căn phòng trọ chật chội tại San Francisco, kỹ sư Alex Vance thức trắng 48 giờ tại Hackathon, kiến trúc lại mô hình suy luận lượng tử, đối đầu các gã khổng lồ công nghệ và đưa startup vươn mình thành kỳ lân tỷ đô tại sàn Nasdaq.',
    tags: [
      'Khởi Nghiệp Tech',
      'Trí Tuệ Nhân Tạo AI',
      'Tiểu Thuyết Dài Tập',
      'Silicon Valley',
      'Kỳ Lân Tỷ Đô',
    ],
    chapters: [
      {
        id: 1,
        chapterNumber: 1,
        volume: 'Quyển 1: Ngọn Lửa Hackathon',
        titleEn: 'Chapter 1: Forty-Eight Hours in the San Francisco Warehouse',
        titleVi: 'Chương 1: Bốn Mươi Tám Giờ Trong Nhà Kho San Francisco',
        estimatedMinutes: 14,
        wordCount: 1720,
        descriptionVi:
          'Giữa mùi cà phê đen cháy khét và tiếng gõ phím như bão táp tại SF Tech Hackathon, Alex Vance tìm ra giải pháp tối ưu bộ nhớ đột phá cho mô hình AI.',
        targetVocabulary: [
          {
            word: 'High-Latency Bottleneck',
            ipa: '/haɪ ˈleɪtənsi ˈbɒtlnek/',
            meaningVi: 'Nút thắt cổ chai độ trễ cao',
          },
          {
            word: 'Neural Architecture',
            ipa: '/ˈnjʊərəl ˈɑːkɪtektʃə/',
            meaningVi: 'Kiến trúc mạng nơ-ron',
          },
          {
            word: 'Vector Quantization',
            ipa: '/ˈvektə ˌkwɒntaɪˈzeɪʃn/',
            meaningVi: 'Lượng tử hóa vector',
          },
          {
            word: 'Algorithmic Breakthrough',
            ipa: '/ˌælɡəˈrɪðmɪk ˈbreɪkθruː/',
            meaningVi: 'Đột phá thuật toán',
          },
          {
            word: 'Disruptive Innovation',
            ipa: '/dɪsˈrʌptɪv ˌɪnəˈveɪʃn/',
            meaningVi: 'Đổi mới đột phá mang tính thay đổi cuộc chơi',
          },
        ],
        paragraphs: [
          {
            id: 1,
            textEn:
              "The scent of burnt espresso, stale pizza boxes, and overheated server racks hung heavy inside the converted brick warehouse in San Francisco's Mission District. It was 3:42 AM on the final night of the Global AI Pioneer Hackathon. Under the flickering fluorescent tubes, more than two hundred bleary-eyed software engineers, data scientists, and startup founders slumped over their dual-monitor laptops in various stages of sleep-deprived exhaustion.",
            textVi:
              'Mùi cà phê espresso cháy khét, những hộp bánh pizza ăn dở và những kệ máy chủ quá nhiệt tỏa ra nồng nặc bên trong nhà kho gạch cải tạo ở Quận Mission, San Francisco. Lúc ấy đã là 3 giờ 42 phút sáng trong đêm cuối cùng của Cuộc thi Lập trình Toàn cầu Tiên phong AI. Dưới những bóng đèn huỳnh quang nhấp nháy, hơn hai trăm kỹ sư phần mềm, nhà khoa học dữ liệu và nhà sáng lập startup với đôi mắt thâm quầng đang gục đầu bên những chiếc laptop màn hình kép trong tình trạng kiệt sức vì thiếu ngủ trầm trọng.',
            sentences: [
              {
                id: 1,
                textEn:
                  'The scent of burnt espresso and overheated server racks hung heavy inside the brick warehouse in San Francisco.',
                textVi:
                  'Mùi cà phê espresso cháy khét và những kệ máy chủ quá nhiệt tỏa ra nồng nặc bên trong nhà kho gạch ở San Francisco.',
              },
              {
                id: 2,
                textEn: 'It was 3:42 AM on the final night of the Global AI Pioneer Hackathon.',
                textVi:
                  'Lúc ấy đã là 3 giờ 42 phút sáng trong đêm cuối cùng của Cuộc thi Lập trình Toàn cầu Tiên phong AI.',
              },
              {
                id: 3,
                textEn:
                  'More than two hundred software engineers slumped over their laptops in various stages of exhaustion.',
                textVi:
                  'Hơn hai trăm kỹ sư phần mềm đang gục đầu bên những chiếc laptop trong tình trạng kiệt sức.',
              },
            ],
          },
          {
            id: 2,
            textEn:
              "In the furthest corner of the industrial hall, twenty-four-year-old backend architect Alex Vance stared intently at a wall of scrolling red terminal logs. His fingertips moved across his mechanical keyboard with relentless, rhythmic cadence, typing low-level CUDA kernels and asynchronous Rust routines. For the past twenty-four hours, their team's distributed inference engine had suffered from a catastrophic memory bandwidth bottleneck whenever the neural network processed context windows exceeding one million tokens.",
            textVi:
              'Nơi góc xa nhất của sảnh công nghiệp, kiến trúc sư backend hai mươi tư tuổi Alex Vance chăm chú nhìn vào màn hình terminal đang cuộn trào những dòng nhật ký lỗi đỏ rực. Các đầu ngón tay của anh lướt trên bàn phím cơ với nhịp điệu dồn dập, đều đặn, gõ những đoạn mã kernel CUDA cấp thấp và các luồng xử lý Rust bất đồng bộ. Suốt hai mươi tư giờ qua, công cụ suy luận phân tán của nhóm anh đã gặp phải nút thắt cổ chai băng thông bộ nhớ thảm họa mỗi khi mạng nơ-ron xử lý ngữ cảnh vượt quá một triệu token.',
            sentences: [
              {
                id: 4,
                textEn:
                  'In the furthest corner, twenty-four-year-old backend architect Alex Vance stared at scrolling red terminal logs.',
                textVi:
                  'Nơi góc xa nhất, kiến trúc sư backend hai mươi tư tuổi Alex Vance chăm chú nhìn vào màn hình terminal cuộn nhật ký đỏ.',
              },
              {
                id: 5,
                textEn:
                  'His fingertips moved across his mechanical keyboard, typing low-level CUDA kernels and asynchronous Rust routines.',
                textVi:
                  'Các đầu ngón tay của anh lướt trên bàn phím cơ, gõ những đoạn mã kernel CUDA cấp thấp và luồng Rust bất đồng bộ.',
              },
              {
                id: 6,
                textEn:
                  'Their distributed engine suffered from a memory bandwidth bottleneck on context windows exceeding one million tokens.',
                textVi:
                  'Công cụ phân tán của họ gặp nút thắt băng thông bộ nhớ khi xử lý ngữ cảnh vượt quá một triệu token.',
              },
            ],
          },
          {
            id: 3,
            textEn:
              '"Alex, give it up," his co-founder Maya sighed, rubbing her bloodshot eyes while tossing an empty energy drink can into the overflowing recycling bin. "Even Google and OpenAI have three hundred research scientists working on KV-cache compression. There is no way two people in a drafty warehouse can bypass the GPU memory wall before the 8:00 AM demo deadline."',
            textVi:
              '"Alex à, bỏ cuộc đi thôi," người đồng sáng lập Maya thở dài, vừa dụi đôi mắt đỏ hoe vừa ném lon nước tăng lực rỗng vào thùng rác tái chế đã tràn ngập. "Ngay cả Google và OpenAI cũng có ba trăm nhà khoa học nghiên cứu về tối ưu nén KV-cache. Không đời nào hai đứa mình trong một nhà kho gió lùa này có thể vượt qua được bức tường giới hạn bộ nhớ GPU trước hạn chót demo lúc 8 giờ sáng đâu."',
            sentences: [
              {
                id: 7,
                textEn:
                  '"Alex, give it up," his co-founder Maya sighed, rubbing her bloodshot eyes.',
                textVi:
                  '"Alex à, bỏ cuộc đi thôi," người đồng sáng lập Maya thở dài, vừa dụi đôi mắt đỏ hoe.',
              },
              {
                id: 8,
                textEn:
                  '"Even Google and OpenAI have three hundred scientists working on KV-cache compression."',
                textVi:
                  '"Ngay cả Google và OpenAI cũng có ba trăm nhà khoa học nghiên cứu về tối ưu nén KV-cache."',
              },
              {
                id: 9,
                textEn:
                  '"There is no way two people in a warehouse can bypass the memory wall before 8:00 AM."',
                textVi:
                  '"Không đời nào hai đứa mình trong nhà kho này có thể vượt qua bức tường bộ nhớ trước 8 giờ sáng."',
              },
            ],
          },
          {
            id: 4,
            textEn:
              'Alex paused, took a sip of lukewarm black coffee, and turned his monitor toward her. A brilliant flash of inspiration struck his tired mind. "What if we don\'t compress the entire key-value cache linearly? What if we treat attention tokens as continuous topological vectors and dynamically prune inactive semantic clusters using sparse dimensional projections?" he whispered, his eyes sparkling with intellectual fire.',
            textVi:
              'Alex dừng tay, nhấp một ngụm cà phê đen nguội ngắt và xoay màn hình về phía cô. Một tia cảm hứng chói lọi lóe lên trong tâm trí mệt mỏi của anh. "Sẽ ra sao nếu chúng ta không nén toàn bộ bộ nhớ đệm KV theo đường thẳng tuyến tính? Nếu chúng ta coi các token chú ý như những vector topo liên tục và tự động cắt tỉa các cụm ngữ nghĩa không kích hoạt bằng các phép chiếu chiều không gian thưa thớt thì sao?" anh thì thầm, đôi mắt sáng rực ngọn lửa trí tuệ.',
            sentences: [
              {
                id: 10,
                textEn:
                  'Alex paused, took a sip of black coffee, and turned his monitor toward her with a flash of inspiration.',
                textVi:
                  'Alex dừng tay, nhấp một ngụm cà phê đen và xoay màn hình về phía cô với một tia cảm hứng lóe lên.',
              },
              {
                id: 11,
                textEn:
                  '"What if we treat attention tokens as continuous topological vectors and prune inactive semantic clusters?"',
                textVi:
                  '"Nếu chúng ta coi các token chú ý như vector topo liên tục và tự động cắt tỉa các cụm ngữ nghĩa không kích hoạt?"',
              },
            ],
          },
          {
            id: 5,
            textEn:
              'For the next four hours, the warehouse echoed with the furious clatter of code compilation. Lines of mathematical proofs transformed into blazing fast machine code. At 7:54 AM, as the morning sunlight poured through the warehouse skylights, the benchmark completed. The inference speed jumped by 800% while RAM consumption plummeted to one-tenth of existing standards. They had just invented the kernel that would launch a billion-dollar revolution.',
            textVi:
              'Suốt bốn giờ tiếp theo, nhà kho vang rền tiếng gõ phím biên dịch mã nguồn như bão táp. Những dòng chứng minh toán học phức tạp dần biến thành mã máy siêu tốc. Vào lúc 7 giờ 54 phút sáng, khi ánh nắng ban mai rọi qua những ô cửa kính trên mái nhà kho, bài kiểm tra hiệu năng hoàn tất. Tốc độ suy luận tăng vọt 800% trong khi mức tiêu thụ RAM giảm xuống chỉ còn một phần mười so với tiêu chuẩn hiện hành. Họ vừa phát minh ra nhân thuật toán sẽ khởi đầu cho một cuộc cách mạng tỷ đô.',
            sentences: [
              {
                id: 12,
                textEn:
                  'For the next four hours, lines of mathematical proofs transformed into blazing fast machine code.',
                textVi:
                  'Suốt bốn giờ tiếp theo, những dòng chứng minh toán học biến thành mã máy siêu tốc.',
              },
              {
                id: 13,
                textEn:
                  'At 7:54 AM, inference speed jumped by 800% while RAM consumption plummeted to one-tenth.',
                textVi:
                  'Lúc 7 giờ 54 sáng, tốc độ suy luận tăng 800% trong khi mức tiêu thụ RAM giảm xuống một phần mười.',
              },
              {
                id: 14,
                textEn:
                  'They had just invented the kernel that would launch a billion-dollar revolution.',
                textVi:
                  'Họ vừa phát minh ra nhân thuật toán sẽ khởi đầu cho một cuộc cách mạng tỷ đô.',
              },
            ],
          },
        ],
        comprehensionQuiz: [
          {
            id: 'q1',
            question:
              'What mathematical breakthrough did Alex Vance propose to solve the AI memory bottleneck?',
            options: [
              'Treating attention tokens as topological vectors and dynamically pruning inactive semantic clusters',
              'Buying 1,000 more expensive graphics cards',
              'Deleting half the user data randomly',
              'Switching from Python to Javascript only',
            ],
            correctIndex: 0,
            explanation:
              'Alex used topological sparse vector projection to prune inactive semantic attention tokens.',
          },
        ],
      },
      {
        id: 2,
        chapterNumber: 2,
        volume: 'Quyển 1: Ngọn Lửa Hackathon',
        titleEn: 'Chapter 2: The Sand Hill Road Pitch',
        titleVi: 'Chương 2: Cuộc Thuyết Trình Trên Con Đường Sand Hill',
        estimatedMinutes: 15,
        wordCount: 1780,
        descriptionVi:
          'Bước vào phòng họp kính nhìn ra thung lũng của quỹ đầu tư mạo hiểm hàng đầu Sequoia & Benchmark, Alex và Maya bảo vệ tầm nhìn công nghệ trước những câu hỏi hóc búa.',
        targetVocabulary: [
          { word: 'Venture Capital', ipa: '/ˈventʃə ˈkæpɪtl/', meaningVi: 'Vốn đầu tư mạo hiểm' },
          { word: 'Term Sheet', ipa: '/tɜːm ʃiːt/', meaningVi: 'Bản điều khoản đầu tư' },
          { word: 'Valuation', ipa: '/ˌvæljuˈeɪʃn/', meaningVi: 'Định giá công ty' },
          {
            word: 'Unfair Advantage',
            ipa: '/ʌnˈfeər ədˈvɑːntɪdʒ/',
            meaningVi: 'Lợi thế cạnh tranh áp đảo',
          },
        ],
        paragraphs: [
          {
            id: 1,
            textEn:
              'The manicured eucalyptus trees and modernist glass facades of Sand Hill Road in Menlo Park reflected the intense California sunshine. This three-mile stretch of asphalt held more concentrated financial firepower than almost any other place on Earth. Inside the sleek boardroom of Apex Horizon Ventures, seven veteran partners in tailored casual blazers sat around a polished walnut conference table, evaluating the young founders.',
            textVi:
              'Những hàng cây khuynh diệp được tỉa tót cẩn thận và những mặt tiền kính hiện đại trên đường Sand Hill ở Menlo Park phản chiếu ánh nắng rực rỡ của California. Đoạn đường nhựa dài ba dặm này nắm giữ hỏa lực tài chính tập trung lớn hơn bất kỳ nơi nào trên Trái Đất. Bên trong phòng họp sang trọng của Quỹ Đầu tư Mạo hiểm Apex Horizon, bảy đối tác kỳ cựu mặc áo blazer chỉnh tề ngồi quanh bàn hội nghị bằng gỗ óc chó đánh bóng, quan sát và đánh giá hai nhà sáng lập trẻ tuổi.',
            sentences: [
              {
                id: 1,
                textEn:
                  'Modernist glass facades of Sand Hill Road reflected the intense California sunshine.',
                textVi:
                  'Những mặt tiền kính hiện đại trên đường Sand Hill phản chiếu ánh nắng rực rỡ của California.',
              },
              {
                id: 2,
                textEn:
                  'Inside the boardroom of Apex Horizon Ventures, seven veteran partners sat around a walnut table.',
                textVi:
                  'Bên trong phòng họp của Quỹ Apex Horizon, bảy đối tác kỳ cựu ngồi quanh bàn gỗ óc chó.',
              },
            ],
          },
          {
            id: 2,
            textEn:
              'Lead Partner Marcus Croft, notorious for tearing startup pitches to shreds with brutal analytical skepticism, leaned forward. "Alex, your benchmarks look impressive on paper, but what stops Microsoft or Amazon from assigning a hundred engineers to reverse-engineer your algorithm within six months?" Croft challenged, tapping his gold fountain pen against the glass table.',
            textVi:
              'Đối tác Trưởng Marcus Croft, người nổi tiếng với phong cách băm vằn các bài thuyết trình khởi nghiệp bằng sự hoài nghi phân tích sắc lẹm, nghiêng người về phía trước. "Alex à, các chỉ số đo lường của cậu trên giấy tờ trông rất ấn tượng, nhưng điều gì ngăn cản Microsoft hay Amazon cử một trăm kỹ sư dịch ngược thuật toán của cậu trong vòng sáu tháng?" Croft chất vấn, gõ nhẹ chiếc bút máy bằng vàng lên mặt bàn kính.',
            sentences: [
              {
                id: 3,
                textEn:
                  'Lead Partner Marcus Croft leaned forward with brutal analytical skepticism.',
                textVi:
                  'Đối tác Trưởng Marcus Croft nghiêng người về phía trước với sự hoài nghi phân tích sắc lẹm.',
              },
              {
                id: 4,
                textEn:
                  '"What stops Microsoft or Amazon from reverse-engineering your algorithm within six months?" Croft challenged.',
                textVi:
                  '"Điều gì ngăn cản Microsoft hay Amazon dịch ngược thuật toán của cậu trong vòng sáu tháng?" Croft chất vấn.',
              },
            ],
          },
          {
            id: 3,
            textEn:
              'Alex smiled calmly, plugged his laptop into the main projection display, and launched a live benchmark executing inference on a decentralized cluster across three continents. "Because our breakthrough is not merely software—it is an end-to-end hardware-aware compilation architecture. We hold four core mathematical patents, and our open-source developer ecosystem has already gathered fifty thousand GitHub stars in seven days. Big tech moves slowly; we move at the speed of light."',
            textVi:
              'Alex điềm tĩnh mỉm cười, cắm laptop vào màn hình máy chiếu chính và khởi chạy bài kiểm tra hiệu năng thực tế trên một cụm máy chủ phi tập trung trải dài qua ba châu lục. "Bởi vì đột phá của chúng tôi không đơn thuần là phần mềm—đó là một kiến trúc biên dịch toàn diện tương thích phần cứng ở tầng sâu nhất. Chúng tôi nắm giữ bốn bằng sáng chế toán học cốt lõi, và hệ sinh thái lập trình viên nguồn mở của chúng tôi đã thu hút năm mươi ngàn ngôi sao GitHub chỉ trong bảy ngày. Các ông lớn công nghệ di chuyển chậm chạp; còn chúng tôi di chuyển với tốc độ của ánh sáng."',
            sentences: [
              {
                id: 5,
                textEn:
                  'Alex smiled calmly, plugged his laptop, and launched a live benchmark on a decentralized cluster.',
                textVi:
                  'Alex mỉm cười, cắm laptop và khởi chạy bài kiểm tra hiệu năng trực tiếp trên cụm máy chủ phân tán.',
              },
              {
                id: 6,
                textEn:
                  '"Our breakthrough is an end-to-end hardware-aware architecture with four mathematical patents."',
                textVi:
                  '"Đột phá của chúng tôi là kiến trúc toàn diện tương thích phần cứng với bốn bằng sáng chế toán học."',
              },
              {
                id: 7,
                textEn: '"Big tech moves slowly; we move at the speed of light," Alex declared.',
                textVi:
                  '"Các ông lớn công nghệ di chuyển chậm chạp; còn chúng tôi di chuyển với tốc độ ánh sáng," Alex tuyên bố.',
              },
            ],
          },
          {
            id: 4,
            textEn:
              'Silence gripped the boardroom as the partners exchanged astonished glances. Fifteen minutes later, Marcus Croft slid a signed term sheet across the table: twenty million dollars in Series A funding at a hundred-million-dollar valuation. The startup journey had officially graduated into hyperscale.',
            textVi:
              'Sự im lặng bao trùm khắp phòng họp khi các đối tác nhìn nhau đầy kinh ngạc. Mười lăm phút sau, Marcus Croft trượt bản điều khoản đầu tư có chữ ký qua mặt bàn: hai mươi triệu đô la vốn đầu tư Vòng Series A với mức định giá một trăm triệu đô la. Hành trình khởi nghiệp đã chính thức bước vào giai đoạn tăng trưởng thần tốc.',
            sentences: [
              {
                id: 8,
                textEn:
                  'Silence gripped the boardroom as the partners exchanged astonished glances.',
                textVi:
                  'Sự im lặng bao trùm khắp phòng họp khi các đối tác nhìn nhau đầy kinh ngạc.',
              },
              {
                id: 9,
                textEn:
                  'Marcus Croft slid a signed term sheet: twenty million dollars in Series A funding at a $100M valuation.',
                textVi:
                  'Marcus Croft trượt bản điều khoản đầu tư: 20 triệu USD vốn Series A ở mức định giá 100 triệu USD.',
              },
            ],
          },
        ],
        comprehensionQuiz: [
          {
            id: 'q1',
            question: 'What made Alex’s startup defensible against giant tech competitors?',
            options: [
              'End-to-end hardware-aware compilation architecture, patents, and a viral developer ecosystem',
              'Having more office snacks',
              'Lower pricing than everyone else',
              'A celebrity endorsement',
            ],
            correctIndex: 0,
            explanation:
              'Alex demonstrated technical moat through deep architectural patents and viral open-source adoption.',
          },
        ],
      },
    ],
  },
]
