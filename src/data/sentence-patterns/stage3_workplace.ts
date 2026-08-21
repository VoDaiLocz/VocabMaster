import { SentenceTopic } from './types'

export const STAGE_3_TOPICS: SentenceTopic[] = [
  {
    id: 's3_emails',
    stageId: '3_workplace',
    title: 'Professional Business Emails',
    titleVi: 'Viết Email Doanh Nghiệp Chuyên Nghiệp',
    description: 'Mẫu mở đầu thư, đính kèm tài liệu và thúc đẩy hành động (Call to Action)',
    icon: 'Mail',
    level: 'Advanced',
    sentences: [
      {
        id: 's3_1',
        textEn: 'I am writing to follow up on our discussion regarding the project timeline.',
        textVi: 'Tôi viết thư này để tiếp tục trao đổi về tiến độ dự án mà chúng ta đã thảo luận.',
        pattern: 'I am writing to follow up on + [subject] regarding [details].',
        explanation: '"Follow up on" là cụm từ vàng trong giao tiếp email công sở.',
        wordTiles: [
          'I am writing to',
          'follow up on',
          'our discussion',
          'regarding',
          'the project timeline.',
        ],
      },
      {
        id: 's3_2',
        textEn: 'Please find attached the updated report for your review and feedback.',
        textVi: 'Xin vui lòng xem bản báo cáo đã cập nhật được đính kèm để xem xét và cho ý kiến.',
        pattern: 'Please find attached + [document] for your review.',
        explanation: 'Cách thông báo file đính kèm lịch sự và trang trọng nhất.',
        wordTiles: [
          'Please find',
          'attached',
          'the updated report',
          'for your review',
          'and feedback.',
        ],
      },
      {
        id: 's3_3',
        textEn: 'Please let me know if you need any further information or clarification.',
        textVi: 'Vui lòng cho tôi biết nếu bạn cần thêm thông tin hoặc giải thích nào khác.',
        pattern: 'Please let me know if you need + [details].',
        explanation: 'Mẫu câu kết thúc email chuyên nghiệp trước khi ký tên.',
        wordTiles: [
          'Please let me know',
          'if you need',
          'any further information',
          'or clarification.',
        ],
      },
      {
        id: 's3_4',
        textEn: 'I look forward to hearing from you at your earliest convenience.',
        textVi: 'Tôi rất mong sớm nhận được phản hồi từ bạn vào thời gian thuận tiện nhất.',
        pattern: 'I look forward to + V-ing + at your earliest convenience.',
        explanation:
          'Sau "look forward to" luôn đi kèm V-ing; "earliest convenience" nghĩa là sớm nhất khi có thể.',
        wordTiles: ['I look forward to', 'hearing from you', 'at your earliest', 'convenience.'],
      },
    ],
  },
  {
    id: 's3_meetings_standup',
    stageId: '3_workplace',
    title: 'Meetings & Status Reports',
    titleVi: 'Họp Hành, Báo Cáo Tiến Độ & Điều Phối',
    description: 'Báo cáo công việc, ngắt lời lịch sự và tóm tắt biên bản cuộc họp',
    icon: 'Users',
    level: 'Advanced',
    sentences: [
      {
        id: 's3_5',
        textEn: 'Sorry to interrupt, but could you clarify what you mean by that?',
        textVi: 'Xin lỗi vì đã ngắt lời, nhưng bạn có thể giải thích rõ hơn ý của bạn là gì không?',
        pattern: 'Sorry to interrupt, but could you clarify + [point]?',
        explanation: 'Cách ngắt lời lịch sự trong cuộc họp khi cần làm rõ một ý kiến chưa rõ ràng.',
        wordTiles: ['Sorry to interrupt,', 'but could you', 'clarify', 'what you mean', 'by that?'],
      },
      {
        id: 's3_6',
        textEn: 'Let us wrap up today meeting by assigning action items to each owner.',
        textVi:
          'Chúng ta hãy khép lại cuộc họp hôm nay bằng cách phân công đầu việc cho từng người phụ trách.',
        pattern: 'Let us wrap up by + V-ing + [action items].',
        explanation:
          '"Wrap up" (kết thúc) và "action items" (các đầu việc cụ thể cần thực hiện sau họp).',
        wordTiles: [
          'Let us',
          'wrap up',
          'today meeting',
          'by assigning',
          'action items',
          'to each owner.',
        ],
      },
      {
        id: 's3_7',
        textEn: 'We are currently on track to meet our deadline by Friday.',
        textVi: 'Chúng tôi hiện đang đúng tiến độ để kịp hoàn thành hạn chót vào thứ Sáu này.',
        pattern: 'S + be on track to + V-inf + by [time]',
        explanation: '"On track" nghĩa là đang tiến hành đúng kế hoạch, không bị trễ hạn.',
        wordTiles: ['We are', 'currently', 'on track to', 'meet our deadline', 'by Friday.'],
      },
    ],
  },
  {
    id: 's3_negotiations',
    stageId: '3_workplace',
    title: 'Deadlines & Polite Pushback',
    titleVi: 'Đàm Phán Deadline & Từ Chối Lịch Sự',
    description: 'Thương lượng khối lượng công việc, đề xuất gia hạn và từ chối khéo',
    icon: 'Scale',
    level: 'Advanced',
    sentences: [
      {
        id: 's3_8',
        textEn:
          'Given our current workload, would it be possible to push the deadline back by two days?',
        textVi:
          'Xét theo khối lượng công việc hiện tại, liệu có thể lùi hạn chót lại hai ngày được không?',
        pattern: 'Given [context], would it be possible to + [request]?',
        explanation: '"Given..." (Xét về mặt/Căn cứ theo) + "push back" (lùi lịch).',
        wordTiles: [
          'Given our',
          'current workload,',
          'would it be possible',
          'to push the deadline back',
          'by two days?',
        ],
      },
      {
        id: 's3_9',
        textEn:
          'I would love to help, but I am currently tied up with another critical deliverable.',
        textVi:
          'Tôi rất muốn giúp, nhưng hiện tại tôi đang bận tối mắt với một sản phẩm bàn giao quan trọng khác.',
        pattern: 'I would love to help, but I am currently tied up with + [task].',
        explanation: '"Tied up with" là cách diễn đạt tự nhiên thay cho "I am busy".',
        wordTiles: [
          'I would love to help,',
          'but I am currently',
          'tied up with',
          'another critical',
          'deliverable.',
        ],
      },
    ],
  },
]
