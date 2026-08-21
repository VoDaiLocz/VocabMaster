import { SentenceTopic } from './types'

export const STAGE_4_TOPICS: SentenceTopic[] = [
  {
    id: 's4_scrum_standup',
    stageId: '4_it_tech',
    title: 'Daily Scrum & Agile Standups',
    titleVi: 'Họp Daily Standup & Báo Cáo Agile/Scrum',
    description: 'Báo cáo tiến độ hôm qua, hôm nay và nêu rõ blocker/vướng mắc kỹ thuật',
    icon: 'Terminal',
    level: 'Advanced',
    sentences: [
      {
        id: 's4_1',
        textEn:
          'Yesterday I completed the user authentication flow. Today I will integrate the payment API.',
        textVi:
          'Hôm qua tôi đã hoàn thành luồng xác thực người dùng. Hôm nay tôi sẽ tích hợp API thanh toán.',
        pattern: 'Yesterday I [past action]. Today I will [future plan].',
        explanation: 'Khung báo cáo 3 câu chuẩn mực trong mọi buổi họp Daily Standup quốc tế.',
        wordTiles: [
          'Yesterday I completed',
          'the user authentication flow.',
          'Today I will integrate',
          'the payment API.',
        ],
      },
      {
        id: 's4_2',
        textEn: 'I am currently blocked by the missing database schema on staging.',
        textVi:
          'Tôi hiện đang bị nghẽn (block) do thiếu cấu trúc cơ sở dữ liệu trên môi trường staging.',
        pattern: 'I am currently blocked by + [impediment/issue].',
        explanation:
          '"Blocked by" là thuật ngữ kỹ thuật chỉ việc công việc bị tắc nghẽn do yếu tố bên ngoài.',
        wordTiles: [
          'I am currently',
          'blocked by',
          'the missing',
          'database schema',
          'on staging.',
        ],
      },
      {
        id: 's4_3',
        textEn: 'I have no blockers at the moment and everything is on schedule.',
        textVi: 'Hiện tại tôi không có vướng mắc nào và mọi thứ đều đang đúng tiến độ.',
        pattern: 'I have no blockers at the moment and + [status].',
        explanation:
          'Câu chốt báo cáo khi công việc trôi chảy, không cần đồng đội hỗ trợ khẩn cấp.',
        wordTiles: ['I have no blockers', 'at the moment', 'and everything', 'is on schedule.'],
      },
      {
        id: 's4_4',
        textEn: 'Could we pair up for fifteen minutes after this meeting to debug the memory leak?',
        textVi:
          'Liệu chúng ta có thể pair (làm việc cùng nhau) 15 phút sau cuộc họp để debug lỗi rò rỉ bộ nhớ không?',
        pattern: 'Could we pair up for [time] to + V-inf + [issue]?',
        explanation:
          '"Pair up / Pair programming" là văn hóa cùng nhau debug và viết code phổ biến trong ngành IT.',
        wordTiles: [
          'Could we',
          'pair up',
          'for fifteen minutes',
          'after this meeting',
          'to debug',
          'the memory leak?',
        ],
      },
    ],
  },
  {
    id: 's4_code_review',
    stageId: '4_it_tech',
    title: 'Code Review & GitHub Pull Requests',
    titleVi: 'Review Code & Nhận Xét Pull Request trên GitHub',
    description: 'Nhận xét code chuyên nghiệp, gợi ý refactor và thảo luận edge cases',
    icon: 'GitPullRequest',
    level: 'Advanced',
    sentences: [
      {
        id: 's4_5',
        textEn: 'Have you considered handling the edge case where the user token has expired?',
        textVi:
          'Bạn đã tính đến trường hợp biên (edge case) khi token của người dùng đã hết hạn chưa?',
        pattern: 'Have you considered handling the edge case where + [scenario]?',
        explanation:
          'Cách hỏi gợi mở lịch sự khi phát hiện bug tiềm ẩn trong quá trình review code.',
        wordTiles: [
          'Have you considered',
          'handling the edge case',
          'where the user token',
          'has expired?',
        ],
      },
      {
        id: 's4_6',
        textEn:
          'Nit: Might be cleaner to extract this helper function into a separate utility module.',
        textVi:
          'Góp ý nhỏ (Nit): Có thể sẽ gọn gàng hơn nếu tách hàm bổ trợ này sang một module tiện ích riêng.',
        pattern: 'Nit: Might be cleaner to + [suggestion] to avoid [downside].',
        explanation:
          '"Nit" (nitpick) dùng để chỉ những góp ý nhỏ về phong cách code, không bắt buộc phải sửa mới merge.',
        wordTiles: [
          'Nit: Might be cleaner',
          'to extract this helper function',
          'into a separate',
          'utility module.',
        ],
      },
      {
        id: 's4_7',
        textEn: 'LGTM! Great test coverage and clean architectural abstraction.',
        textVi:
          'Trông ổn lắm (LGTM)! Độ phủ test rất tốt và sự trừu tượng hóa kiến trúc rất sạch sẽ.',
        pattern: 'LGTM (Looks Good To Me)! + [compliments].',
        explanation:
          '"LGTM" là viết tắt kinh điển trên GitHub/GitLab khi duyệt và approve một Pull Request.',
        wordTiles: ['LGTM!', 'Great test coverage', 'and clean', 'architectural abstraction.'],
      },
      {
        id: 's4_8',
        textEn:
          'I chose this implementation because it reduces the time complexity from quadratic to linear.',
        textVi:
          'Tôi chọn cách triển khai này vì nó giảm độ phức tạp thời gian từ O(n²) xuống O(n).',
        pattern: 'I chose this implementation because it reduces [metric] from X to Y.',
        explanation:
          'Cách lập trình viên bảo vệ giải pháp thuật toán và tối ưu hiệu năng của mình.',
        wordTiles: [
          'I chose this implementation',
          'because it reduces',
          'the time complexity',
          'from quadratic',
          'to linear.',
        ],
      },
    ],
  },
  {
    id: 's4_bug_incident',
    stageId: '4_it_tech',
    title: 'Bug Triaging & Production Incidents',
    titleVi: 'Phân Tích Lỗi & Xử Lý Sự Cố Production',
    description: 'Trình bày các bước tái hiện lỗi, tìm nguyên nhân gốc rễ và rollback hệ thống',
    icon: 'AlertTriangle',
    level: 'Advanced',
    sentences: [
      {
        id: 's4_9',
        textEn:
          'We have identified the root cause in the webhook handler and a hotfix is being deployed.',
        textVi:
          'Chúng tôi đã xác định được nguyên nhân gốc rễ ở hàm xử lý webhook và bản vá nóng đang được triển khai.',
        pattern: 'We have identified the root cause in + [module] and + [action].',
        explanation:
          '"Root cause" (nguyên nhân gốc rễ) và "hotfix" (bản vá nóng khẩn cấp trên production).',
        wordTiles: [
          'We have identified',
          'the root cause',
          'in the webhook handler',
          'and a hotfix',
          'is being deployed.',
        ],
      },
      {
        id: 's4_10',
        textEn:
          'Could you provide the exact steps to reproduce this bug along with the server logs?',
        textVi:
          'Bạn có thể cung cấp các bước chính xác để tái hiện lỗi này kèm theo log máy chủ không?',
        pattern: 'Could you provide the exact steps to reproduce + [issue] along with [logs]?',
        explanation:
          '"Steps to reproduce" là yêu cầu bắt buộc khi tester/khách hàng báo lỗi phần mềm.',
        wordTiles: [
          'Could you provide',
          'the exact steps',
          'to reproduce this bug',
          'along with',
          'the server logs?',
        ],
      },
      {
        id: 's4_11',
        textEn:
          'To prevent further data corruption, we recommend rolling back to the previous stable release.',
        textVi:
          'Để ngăn ngừa dữ liệu tiếp tục bị hỏng, chúng tôi khuyến nghị nên rollback về bản phát hành ổn định trước đó.',
        pattern: 'To prevent [risk], we recommend rolling back to + [version].',
        explanation:
          '"Roll back" nghĩa là hoàn tác, quay ngược phiên bản phần mềm về trạng thái cũ an toàn.',
        wordTiles: [
          'To prevent further',
          'data corruption,',
          'we recommend',
          'rolling back to',
          'the previous stable release.',
        ],
      },
    ],
  },
  {
    id: 's4_tech_interview',
    stageId: '4_it_tech',
    title: 'Technical Interviews & System Design',
    titleVi: 'Phỏng Vấn Kỹ Thuật & Thiết Kế Hệ Thống',
    description: 'Thuyết trình kinh nghiệm dự án, giải thích trade-offs và trả lời phỏng vấn IT',
    icon: 'Award',
    level: 'Advanced',
    sentences: [
      {
        id: 's4_12',
        textEn:
          'In my previous project, I redesigned the database indexing which improved query performance by forty percent.',
        textVi:
          'Trong dự án trước, tôi đã thiết kế lại index cơ sở dữ liệu giúp cải thiện hiệu năng truy vấn lên 40%.',
        pattern: 'In my previous project, I [action] which improved [metric] by [percentage].',
        explanation: 'Công thức STAR kinh điển khi trả lời phỏng vấn thành tích kỹ thuật.',
        wordTiles: [
          'In my previous project,',
          'I redesigned the database indexing',
          'which improved query performance',
          'by forty percent.',
        ],
      },
      {
        id: 's4_13',
        textEn:
          'The primary trade-off between SQL and NoSQL in this scenario is ACID compliance versus horizontal scalability.',
        textVi:
          'Sự đánh đổi cốt lõi giữa SQL và NoSQL trong kịch bản này là tính toàn vẹn ACID so với khả năng mở rộng ngang.',
        pattern: 'The primary trade-off between X and Y is + [factor A] versus [factor B].',
        explanation:
          'Từ khóa "trade-off" (sự đánh đổi) là điểm mấu chốt trong mọi bài phỏng vấn System Design.',
        wordTiles: [
          'The primary trade-off',
          'between SQL and NoSQL',
          'in this scenario is',
          'ACID compliance',
          'versus horizontal scalability.',
        ],
      },
    ],
  },
]
