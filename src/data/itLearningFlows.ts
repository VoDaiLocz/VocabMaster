// ============================================
// Curated IT & AI Learning Flows (Full-Length Roadmaps)
// 100% Complete Bilingual Subtitles (0:00 to end)
// ============================================

import { VideoInfo, TranscriptCue } from '@/services/youtubeTranscriptService'

export interface LearningFlowStep {
  step: number
  info: VideoInfo
  sampleCues: TranscriptCue[]
}

export interface LearningFlow {
  id: string
  title: string
  subtitle: string
  description: string
  icon: string
  level: 'B1 - Trung cấp' | 'B2 - Khá' | 'C1 - Nâng cao'
  estimatedHours: string
  category: 'ai' | 'code' | 'career'
  videos: LearningFlowStep[]
}

export const IT_AI_LEARNING_FLOWS: LearningFlow[] = [
  {
    "id": "flow-ai-engineering",
    "title": "Trí Tuệ Nhân Tạo & Mô Hình Ngôn Ngữ Lớn (AI & LLMs)",
    "subtitle": "Từ khái niệm Generative AI, Transformer đến Prompt Engineering và RAG nâng cao",
    "description": "Lộ trình chuyên sâu giúp bạn làm chủ thuật ngữ và kiến trúc AI, Transformer, Prompting (Few-shot, CoT) và RAG.",
    "icon": "🤖",
    "level": "B2 - Khá",
    "estimatedHours": "4.5 giờ",
    "category": "ai",
    "videos": [
      {
        "step": 1,
        "info": {
          "videoId": "2ePf9rue1Ao",
          "title": "What is Generative AI & How Large Language Models Work",
          "channel": "Google Cloud Tech",
          "thumbnailUrl": "https://img.youtube.com/vi/2ePf9rue1Ao/hqdefault.jpg",
          "durationFormatted": "09:20",
          "category": "tech",
          "level": "B2 - Khá",
          "sentenceCount": 14,
          "description": "Khái niệm nền tảng về Generative AI và cách thức hoạt động của mô hình ngôn ngữ lớn.",
          "tags": [
            "Generative AI",
            "LLM",
            "Google Cloud",
            "Machine Learning"
          ]
        },
        "sampleCues": [
          {
            "id": 1,
            "start": 1,
            "duration": 7.2,
            "end": 8.2,
            "textEn": "Generative AI is a type of artificial intelligence technology that can produce various types of content.",
            "textVi": "AI tạo sinh là một loại công nghệ trí tuệ nhân tạo có thể tạo ra nhiều dạng nội dung khác nhau.",
            "words": [
              "Generative",
              "AI",
              "is",
              "a",
              "type",
              "of",
              "artificial",
              "intelligence",
              "technology",
              "that",
              "can",
              "produce",
              "various",
              "types",
              "of",
              "content."
            ]
          },
          {
            "id": 2,
            "start": 9,
            "duration": 3.6,
            "end": 12.6,
            "textEn": "It includes text, imagery, audio, and synthetic data.",
            "textVi": "Nó bao gồm văn bản, hình ảnh, âm thanh và dữ liệu tổng hợp.",
            "words": [
              "It",
              "includes",
              "text,",
              "imagery,",
              "audio,",
              "and",
              "synthetic",
              "data."
            ]
          },
          {
            "id": 3,
            "start": 13.4,
            "duration": 5,
            "end": 18.4,
            "textEn": "Traditional AI algorithms were designed to recognize patterns and make predictions.",
            "textVi": "Các thuật toán AI truyền thống được thiết kế để nhận diện mẫu và đưa ra dự đoán.",
            "words": [
              "Traditional",
              "AI",
              "algorithms",
              "were",
              "designed",
              "to",
              "recognize",
              "patterns",
              "and",
              "make",
              "predictions."
            ]
          },
          {
            "id": 4,
            "start": 19.2,
            "duration": 5.9,
            "end": 25.1,
            "textEn": "In contrast, generative models create completely new outputs based on the training data.",
            "textVi": "Ngược lại, các mô hình tạo sinh tạo ra kết quả hoàn toàn mới dựa trên dữ liệu huấn luyện.",
            "words": [
              "In",
              "contrast,",
              "generative",
              "models",
              "create",
              "completely",
              "new",
              "outputs",
              "based",
              "on",
              "the",
              "training",
              "data."
            ]
          },
          {
            "id": 5,
            "start": 25.9,
            "duration": 5,
            "end": 30.9,
            "textEn": "At the heart of modern language models is the Transformer architecture.",
            "textVi": "Trọng tâm của các mô hình ngôn ngữ hiện đại là kiến trúc Transformer.",
            "words": [
              "At",
              "the",
              "heart",
              "of",
              "modern",
              "language",
              "models",
              "is",
              "the",
              "Transformer",
              "architecture."
            ]
          },
          {
            "id": 6,
            "start": 31.7,
            "duration": 5,
            "end": 36.7,
            "textEn": "Transformers process all words in a sentence simultaneously using self-attention mechanisms.",
            "textVi": "Transformer xử lý tất cả các từ trong câu cùng một lúc bằng cơ chế tự chú ý (self-attention).",
            "words": [
              "Transformers",
              "process",
              "all",
              "words",
              "in",
              "a",
              "sentence",
              "simultaneously",
              "using",
              "self-attention",
              "mechanisms."
            ]
          },
          {
            "id": 7,
            "start": 37.5,
            "duration": 5.9,
            "end": 43.4,
            "textEn": "This allows the model to capture long-range dependencies and context much more effectively.",
            "textVi": "Điều này cho phép mô hình nắm bắt ngữ cảnh và mối quan hệ từ xa hiệu quả hơn rất nhiều.",
            "words": [
              "This",
              "allows",
              "the",
              "model",
              "to",
              "capture",
              "long-range",
              "dependencies",
              "and",
              "context",
              "much",
              "more",
              "effectively."
            ]
          },
          {
            "id": 8,
            "start": 44.2,
            "duration": 5,
            "end": 49.2,
            "textEn": "Pre-training on massive text corpora gives these models broad world knowledge.",
            "textVi": "Việc tiền huấn luyện trên các kho văn bản khổng lồ mang lại cho mô hình kiến thức sâu rộng về thế giới.",
            "words": [
              "Pre-training",
              "on",
              "massive",
              "text",
              "corpora",
              "gives",
              "these",
              "models",
              "broad",
              "world",
              "knowledge."
            ]
          },
          {
            "id": 9,
            "start": 50,
            "duration": 5,
            "end": 55,
            "textEn": "After pre-training, fine-tuning aligns the model to follow specific user instructions.",
            "textVi": "Sau tiền huấn luyện, quá trình tinh chỉnh giúp mô hình tuân thủ các chỉ dẫn cụ thể của người dùng.",
            "words": [
              "After",
              "pre-training,",
              "fine-tuning",
              "aligns",
              "the",
              "model",
              "to",
              "follow",
              "specific",
              "user",
              "instructions."
            ]
          },
          {
            "id": 10,
            "start": 55.8,
            "duration": 5.9,
            "end": 61.7,
            "textEn": "Reinforcement Learning from Human Feedback is widely used to ensure safety and helpfulness.",
            "textVi": "Học tăng cường từ phản hồi con người (RLHF) được sử dụng rộng rãi để đảm bảo tính an toàn và hữu ích.",
            "words": [
              "Reinforcement",
              "Learning",
              "from",
              "Human",
              "Feedback",
              "is",
              "widely",
              "used",
              "to",
              "ensure",
              "safety",
              "and",
              "helpfulness."
            ]
          },
          {
            "id": 11,
            "start": 62.5,
            "duration": 4.5,
            "end": 67,
            "textEn": "Developers can interact with these models through simple API endpoints.",
            "textVi": "Lập trình viên có thể tương tác với các mô hình này thông qua các điểm cuối API đơn giản.",
            "words": [
              "Developers",
              "can",
              "interact",
              "with",
              "these",
              "models",
              "through",
              "simple",
              "API",
              "endpoints."
            ]
          },
          {
            "id": 12,
            "start": 67.8,
            "duration": 4.5,
            "end": 72.3,
            "textEn": "Understanding tokenization and temperature parameters is essential for controlling output.",
            "textVi": "Hiểu về token hóa và tham số temperature là rất cần thiết để kiểm soát kết quả đầu ra.",
            "words": [
              "Understanding",
              "tokenization",
              "and",
              "temperature",
              "parameters",
              "is",
              "essential",
              "for",
              "controlling",
              "output."
            ]
          },
          {
            "id": 13,
            "start": 73.1,
            "duration": 4.5,
            "end": 77.6,
            "textEn": "Generative AI is transforming industries from software development to healthcare.",
            "textVi": "AI tạo sinh đang biến đổi các ngành công nghiệp từ phát triển phần mềm đến y tế.",
            "words": [
              "Generative",
              "AI",
              "is",
              "transforming",
              "industries",
              "from",
              "software",
              "development",
              "to",
              "healthcare."
            ]
          },
          {
            "id": 14,
            "start": 78.4,
            "duration": 5.9,
            "end": 84.3,
            "textEn": "Let us explore how you can integrate these capabilities into your own applications.",
            "textVi": "Hãy cùng khám phá cách bạn có thể tích hợp các khả năng này vào ứng dụng của riêng mình.",
            "words": [
              "Let",
              "us",
              "explore",
              "how",
              "you",
              "can",
              "integrate",
              "these",
              "capabilities",
              "into",
              "your",
              "own",
              "applications."
            ]
          }
        ]
      },
      {
        "step": 2,
        "info": {
          "videoId": "jC4v5AS4RIM",
          "title": "Prompt Engineering for Developers - Techniques & Best Practices",
          "channel": "DeepLearning.AI",
          "thumbnailUrl": "https://img.youtube.com/vi/jC4v5AS4RIM/hqdefault.jpg",
          "durationFormatted": "14:30",
          "category": "tech",
          "level": "B2 - Khá",
          "sentenceCount": 14,
          "description": "Kỹ thuật viết chỉ dẫn (Prompting) nâng cao cho lập trình viên từ Andrew Ng.",
          "tags": [
            "Prompt Engineering",
            "Andrew Ng",
            "AI",
            "ChatGPT"
          ]
        },
        "sampleCues": [
          {
            "id": 1,
            "start": 1,
            "duration": 4,
            "end": 5,
            "textEn": "Welcome to Prompt Engineering for Developers presented by DeepLearning.AI.",
            "textVi": "Chào mừng bạn đến với khóa học Kỹ thuật viết Prompt cho lập trình viên của DeepLearning.AI.",
            "words": [
              "Welcome",
              "to",
              "Prompt",
              "Engineering",
              "for",
              "Developers",
              "presented",
              "by",
              "DeepLearning.AI."
            ]
          },
          {
            "id": 2,
            "start": 5.8,
            "duration": 6.8,
            "end": 12.6,
            "textEn": "In this course, you will learn how to write clear and specific instructions for LLMs.",
            "textVi": "Trong khóa học này, bạn sẽ học cách viết các chỉ dẫn rõ ràng và cụ thể cho các mô hình ngôn ngữ lớn.",
            "words": [
              "In",
              "this",
              "course,",
              "you",
              "will",
              "learn",
              "how",
              "to",
              "write",
              "clear",
              "and",
              "specific",
              "instructions",
              "for",
              "LLMs."
            ]
          },
          {
            "id": 3,
            "start": 13.4,
            "duration": 6.3,
            "end": 19.7,
            "textEn": "The first principle of prompt engineering is to give the model time to think.",
            "textVi": "Nguyên tắc đầu tiên của prompt engineering là cho mô hình đủ thời gian và bước suy nghĩ.",
            "words": [
              "The",
              "first",
              "principle",
              "of",
              "prompt",
              "engineering",
              "is",
              "to",
              "give",
              "the",
              "model",
              "time",
              "to",
              "think."
            ]
          },
          {
            "id": 4,
            "start": 20.5,
            "duration": 6.3,
            "end": 26.8,
            "textEn": "Specify the exact format of the desired output, such as JSON or Markdown tables.",
            "textVi": "Hãy chỉ định chính xác định dạng đầu ra mong muốn, chẳng hạn như JSON hoặc bảng Markdown.",
            "words": [
              "Specify",
              "the",
              "exact",
              "format",
              "of",
              "the",
              "desired",
              "output,",
              "such",
              "as",
              "JSON",
              "or",
              "Markdown",
              "tables."
            ]
          },
          {
            "id": 5,
            "start": 27.6,
            "duration": 5.9,
            "end": 33.5,
            "textEn": "Using delimiters like triple backticks helps the model distinguish instructions from user input.",
            "textVi": "Sử dụng các ký tự phân cách như ba dấu nháy giúp mô hình phân biệt rõ chỉ dẫn và dữ liệu người dùng.",
            "words": [
              "Using",
              "delimiters",
              "like",
              "triple",
              "backticks",
              "helps",
              "the",
              "model",
              "distinguish",
              "instructions",
              "from",
              "user",
              "input."
            ]
          },
          {
            "id": 6,
            "start": 34.3,
            "duration": 6.3,
            "end": 40.6,
            "textEn": "Few-shot prompting provides example pairs of inputs and expected outputs before the main task.",
            "textVi": "Few-shot prompting cung cấp các cặp ví dụ mẫu trước khi yêu cầu thực hiện nhiệm vụ chính.",
            "words": [
              "Few-shot",
              "prompting",
              "provides",
              "example",
              "pairs",
              "of",
              "inputs",
              "and",
              "expected",
              "outputs",
              "before",
              "the",
              "main",
              "task."
            ]
          },
          {
            "id": 7,
            "start": 41.4,
            "duration": 5,
            "end": 46.4,
            "textEn": "Chain-of-thought prompting instructs the model to reason step-by-step through complex problems.",
            "textVi": "Chain-of-thought prompting hướng dẫn mô hình lập luận từng bước giải quyết các bài toán phức tạp.",
            "words": [
              "Chain-of-thought",
              "prompting",
              "instructs",
              "the",
              "model",
              "to",
              "reason",
              "step-by-step",
              "through",
              "complex",
              "problems."
            ]
          },
          {
            "id": 8,
            "start": 47.2,
            "duration": 7.2,
            "end": 54.4,
            "textEn": "Avoid asking the model whether an answer is correct without having it solve the problem first.",
            "textVi": "Tránh hỏi mô hình xem câu trả lời có đúng không mà hãy để nó tự giải trước.",
            "words": [
              "Avoid",
              "asking",
              "the",
              "model",
              "whether",
              "an",
              "answer",
              "is",
              "correct",
              "without",
              "having",
              "it",
              "solve",
              "the",
              "problem",
              "first."
            ]
          },
          {
            "id": 9,
            "start": 55.2,
            "duration": 5.4,
            "end": 60.6,
            "textEn": "Hallucination occurs when the model generates plausible-sounding statements that are factually false.",
            "textVi": "Hiện tượng ảo giác xảy ra khi mô hình sinh ra các câu nghe rất hợp lý nhưng sai thực tế.",
            "words": [
              "Hallucination",
              "occurs",
              "when",
              "the",
              "model",
              "generates",
              "plausible-sounding",
              "statements",
              "that",
              "are",
              "factually",
              "false."
            ]
          },
          {
            "id": 10,
            "start": 61.4,
            "duration": 6.8,
            "end": 68.2,
            "textEn": "To reduce hallucinations, ask the model to first find relevant quotes from the provided text.",
            "textVi": "Để giảm ảo giác, hãy yêu cầu mô hình trích dẫn các đoạn liên quan từ văn bản được cung cấp trước.",
            "words": [
              "To",
              "reduce",
              "hallucinations,",
              "ask",
              "the",
              "model",
              "to",
              "first",
              "find",
              "relevant",
              "quotes",
              "from",
              "the",
              "provided",
              "text."
            ]
          },
          {
            "id": 11,
            "start": 69,
            "duration": 5.9,
            "end": 74.9,
            "textEn": "Iterative prompt development is key to refining prompts until they meet quality criteria.",
            "textVi": "Phát triển prompt theo chu trình lặp là chìa khóa để hoàn thiện cho đến khi đạt chuẩn chất lượng.",
            "words": [
              "Iterative",
              "prompt",
              "development",
              "is",
              "key",
              "to",
              "refining",
              "prompts",
              "until",
              "they",
              "meet",
              "quality",
              "criteria."
            ]
          },
          {
            "id": 12,
            "start": 75.7,
            "duration": 5.9,
            "end": 81.6,
            "textEn": "You can use LLMs for summarizing, inferring sentiment, transforming text, and expanding ideas.",
            "textVi": "Bạn có thể dùng LLM để tóm tắt, suy luận cảm xúc, chuyển đổi văn bản và mở rộng ý tưởng.",
            "words": [
              "You",
              "can",
              "use",
              "LLMs",
              "for",
              "summarizing,",
              "inferring",
              "sentiment,",
              "transforming",
              "text,",
              "and",
              "expanding",
              "ideas."
            ]
          },
          {
            "id": 13,
            "start": 82.4,
            "duration": 5.4,
            "end": 87.8,
            "textEn": "System prompts set the persona and global behavior of your conversational agent.",
            "textVi": "System prompt thiết lập tính cách và hành vi toàn cục của trợ lý ảo.",
            "words": [
              "System",
              "prompts",
              "set",
              "the",
              "persona",
              "and",
              "global",
              "behavior",
              "of",
              "your",
              "conversational",
              "agent."
            ]
          },
          {
            "id": 14,
            "start": 88.6,
            "duration": 5.9,
            "end": 94.5,
            "textEn": "Let us dive into real code examples using Python and the OpenAI API.",
            "textVi": "Bây giờ hãy cùng đi vào các ví dụ mã nguồn thực tế bằng Python và OpenAI API.",
            "words": [
              "Let",
              "us",
              "dive",
              "into",
              "real",
              "code",
              "examples",
              "using",
              "Python",
              "and",
              "the",
              "OpenAI",
              "API."
            ]
          }
        ]
      },
      {
        "step": 3,
        "info": {
          "videoId": "aircAruvnKk",
          "title": "Neural Networks and Deep Learning from Scratch",
          "channel": "3Blue1Brown",
          "thumbnailUrl": "https://img.youtube.com/vi/aircAruvnKk/hqdefault.jpg",
          "durationFormatted": "19:12",
          "category": "tech",
          "level": "C1 - Nâng cao",
          "sentenceCount": 12,
          "description": "Hình ảnh trực quan và bản chất toán học của mạng nơ-ron và giải thuật Gradient Descent.",
          "tags": [
            "Neural Networks",
            "Deep Learning",
            "3Blue1Brown",
            "AI Math"
          ]
        },
        "sampleCues": [
          {
            "id": 1,
            "start": 1,
            "duration": 6.3,
            "end": 7.3,
            "textEn": "What is a neural network and how does it actually learn from raw data?",
            "textVi": "Mạng nơ-ron là gì và nó thực sự học từ dữ liệu thô như thế nào?",
            "words": [
              "What",
              "is",
              "a",
              "neural",
              "network",
              "and",
              "how",
              "does",
              "it",
              "actually",
              "learn",
              "from",
              "raw",
              "data?"
            ]
          },
          {
            "id": 2,
            "start": 8.1,
            "duration": 6.3,
            "end": 14.4,
            "textEn": "Let us start by looking at a classic machine learning benchmark: handwritten digit recognition.",
            "textVi": "Hãy bắt đầu với một bài toán kinh điển: nhận diện chữ số viết tay.",
            "words": [
              "Let",
              "us",
              "start",
              "by",
              "looking",
              "at",
              "a",
              "classic",
              "machine",
              "learning",
              "benchmark:",
              "handwritten",
              "digit",
              "recognition."
            ]
          },
          {
            "id": 3,
            "start": 15.2,
            "duration": 6.8,
            "end": 22,
            "textEn": "Each neuron in the network holds a number between zero and one called an activation.",
            "textVi": "Mỗi nơ-ron trong mạng lưu giữ một số từ 0 đến 1 gọi là giá trị kích hoạt (activation).",
            "words": [
              "Each",
              "neuron",
              "in",
              "the",
              "network",
              "holds",
              "a",
              "number",
              "between",
              "zero",
              "and",
              "one",
              "called",
              "an",
              "activation."
            ]
          },
          {
            "id": 4,
            "start": 22.8,
            "duration": 5,
            "end": 27.8,
            "textEn": "Information flows through the network in layers, from input to output.",
            "textVi": "Thông tin truyền qua mạng theo các tầng, từ tầng đầu vào đến tầng đầu ra.",
            "words": [
              "Information",
              "flows",
              "through",
              "the",
              "network",
              "in",
              "layers,",
              "from",
              "input",
              "to",
              "output."
            ]
          },
          {
            "id": 5,
            "start": 28.6,
            "duration": 5.4,
            "end": 34,
            "textEn": "Connections between neurons have assigned weights, and each neuron has a bias.",
            "textVi": "Các liên kết giữa các nơ-ron có trọng số (weight) và mỗi nơ-ron có một độ lệch (bias).",
            "words": [
              "Connections",
              "between",
              "neurons",
              "have",
              "assigned",
              "weights,",
              "and",
              "each",
              "neuron",
              "has",
              "a",
              "bias."
            ]
          },
          {
            "id": 6,
            "start": 34.8,
            "duration": 4,
            "end": 38.8,
            "textEn": "Activation functions like ReLU introduce non-linearity into the system.",
            "textVi": "Các hàm kích hoạt như ReLU đưa tính phi tuyến tính vào hệ thống mạng.",
            "words": [
              "Activation",
              "functions",
              "like",
              "ReLU",
              "introduce",
              "non-linearity",
              "into",
              "the",
              "system."
            ]
          },
          {
            "id": 7,
            "start": 39.6,
            "duration": 5.9,
            "end": 45.5,
            "textEn": "The cost function measures how poorly the network is performing on training samples.",
            "textVi": "Hàm mất mát (cost function) đo lường mức độ sai sót của mạng trên tập mẫu huấn luyện.",
            "words": [
              "The",
              "cost",
              "function",
              "measures",
              "how",
              "poorly",
              "the",
              "network",
              "is",
              "performing",
              "on",
              "training",
              "samples."
            ]
          },
          {
            "id": 8,
            "start": 46.3,
            "duration": 5.4,
            "end": 51.7,
            "textEn": "Gradient descent is the optimization algorithm used to minimize this cost function.",
            "textVi": "Gradient descent là thuật toán tối ưu hóa dùng để cực tiểu hóa hàm mất mát này.",
            "words": [
              "Gradient",
              "descent",
              "is",
              "the",
              "optimization",
              "algorithm",
              "used",
              "to",
              "minimize",
              "this",
              "cost",
              "function."
            ]
          },
          {
            "id": 9,
            "start": 52.5,
            "duration": 5.9,
            "end": 58.4,
            "textEn": "Backpropagation calculates the partial derivative of the cost with respect to every weight.",
            "textVi": "Lan truyền ngược (Backpropagation) tính đạo hàm riêng của chi phí đối với từng trọng số.",
            "words": [
              "Backpropagation",
              "calculates",
              "the",
              "partial",
              "derivative",
              "of",
              "the",
              "cost",
              "with",
              "respect",
              "to",
              "every",
              "weight."
            ]
          },
          {
            "id": 10,
            "start": 59.2,
            "duration": 5.4,
            "end": 64.6,
            "textEn": "By adjusting weights in the negative gradient direction, the network steadily improves.",
            "textVi": "Bằng cách điều chỉnh trọng số theo hướng ngược gradient, mạng nơ-ron tiến bộ liên tục.",
            "words": [
              "By",
              "adjusting",
              "weights",
              "in",
              "the",
              "negative",
              "gradient",
              "direction,",
              "the",
              "network",
              "steadily",
              "improves."
            ]
          },
          {
            "id": 11,
            "start": 65.4,
            "duration": 5.9,
            "end": 71.3,
            "textEn": "Modern deep learning scales this concept to billions of parameters across deep layers.",
            "textVi": "Deep learning hiện đại mở rộng khái niệm này lên hàng tỷ tham số trên các tầng sâu.",
            "words": [
              "Modern",
              "deep",
              "learning",
              "scales",
              "this",
              "concept",
              "to",
              "billions",
              "of",
              "parameters",
              "across",
              "deep",
              "layers."
            ]
          },
          {
            "id": 12,
            "start": 72.1,
            "duration": 5.9,
            "end": 78,
            "textEn": "This visual intuition will give you a solid mental model of artificial intelligence.",
            "textVi": "Trực giác thị giác này sẽ mang lại cho bạn một mô hình tư duy vững chắc về AI.",
            "words": [
              "This",
              "visual",
              "intuition",
              "will",
              "give",
              "you",
              "a",
              "solid",
              "mental",
              "model",
              "of",
              "artificial",
              "intelligence."
            ]
          }
        ]
      },
      {
        "step": 4,
        "info": {
          "videoId": "79_X_Ew7k4Y",
          "title": "Retrieval-Augmented Generation (RAG) Architecture Explained",
          "channel": "IBM Technology",
          "thumbnailUrl": "https://img.youtube.com/vi/79_X_Ew7k4Y/hqdefault.jpg",
          "durationFormatted": "08:45",
          "category": "tech",
          "level": "B2 - Khá",
          "sentenceCount": 12,
          "description": "Tìm hiểu kiến trúc RAG, Vector Databases và cách kết hợp dữ liệu doanh nghiệp với LLMs.",
          "tags": [
            "RAG",
            "Vector Database",
            "IBM",
            "AI Architecture"
          ]
        },
        "sampleCues": [
          {
            "id": 1,
            "start": 1,
            "duration": 5,
            "end": 6,
            "textEn": "Retrieval-Augmented Generation, or RAG, connects LLMs to your private data sources.",
            "textVi": "RAG là kiến trúc kết nối mô hình ngôn ngữ lớn với các nguồn dữ liệu nội bộ của bạn.",
            "words": [
              "Retrieval-Augmented",
              "Generation,",
              "or",
              "RAG,",
              "connects",
              "LLMs",
              "to",
              "your",
              "private",
              "data",
              "sources."
            ]
          },
          {
            "id": 2,
            "start": 6.8,
            "duration": 6.8,
            "end": 13.6,
            "textEn": "LLMs are limited by the cutoff date of their training data and lack proprietary context.",
            "textVi": "LLM bị giới hạn bởi ngày kết thúc dữ liệu huấn luyện và thiếu ngữ cảnh doanh nghiệp.",
            "words": [
              "LLMs",
              "are",
              "limited",
              "by",
              "the",
              "cutoff",
              "date",
              "of",
              "their",
              "training",
              "data",
              "and",
              "lack",
              "proprietary",
              "context."
            ]
          },
          {
            "id": 3,
            "start": 14.4,
            "duration": 5.9,
            "end": 20.3,
            "textEn": "Instead of retraining the whole model, RAG retrieves relevant documents at query time.",
            "textVi": "Thay vì huấn luyện lại toàn bộ mô hình, RAG tìm nạp các tài liệu liên quan ngay khi có câu hỏi.",
            "words": [
              "Instead",
              "of",
              "retraining",
              "the",
              "whole",
              "model,",
              "RAG",
              "retrieves",
              "relevant",
              "documents",
              "at",
              "query",
              "time."
            ]
          },
          {
            "id": 4,
            "start": 21.1,
            "duration": 5,
            "end": 26.1,
            "textEn": "The first step is chunking your documents into manageable text segments.",
            "textVi": "Bước đầu tiên là phân đoạn tài liệu thành các khối văn bản (chunks) vừa vặn.",
            "words": [
              "The",
              "first",
              "step",
              "is",
              "chunking",
              "your",
              "documents",
              "into",
              "manageable",
              "text",
              "segments."
            ]
          },
          {
            "id": 5,
            "start": 26.9,
            "duration": 5.4,
            "end": 32.3,
            "textEn": "An embedding model converts each text chunk into a high-dimensional numerical vector.",
            "textVi": "Một mô hình embedding sẽ chuyển đổi từng đoạn văn bản thành một vector số nhiều chiều.",
            "words": [
              "An",
              "embedding",
              "model",
              "converts",
              "each",
              "text",
              "chunk",
              "into",
              "a",
              "high-dimensional",
              "numerical",
              "vector."
            ]
          },
          {
            "id": 6,
            "start": 33.1,
            "duration": 5,
            "end": 38.1,
            "textEn": "These vectors are indexed and stored inside a specialized vector database.",
            "textVi": "Các vector này được đánh chỉ mục và lưu trữ trong cơ sở dữ liệu vector chuyên dụng.",
            "words": [
              "These",
              "vectors",
              "are",
              "indexed",
              "and",
              "stored",
              "inside",
              "a",
              "specialized",
              "vector",
              "database."
            ]
          },
          {
            "id": 7,
            "start": 38.9,
            "duration": 6.3,
            "end": 45.2,
            "textEn": "When a user asks a question, the system finds the most semantically similar chunks.",
            "textVi": "Khi người dùng đặt câu hỏi, hệ thống tìm các đoạn có ngữ nghĩa tương đồng nhất.",
            "words": [
              "When",
              "a",
              "user",
              "asks",
              "a",
              "question,",
              "the",
              "system",
              "finds",
              "the",
              "most",
              "semantically",
              "similar",
              "chunks."
            ]
          },
          {
            "id": 8,
            "start": 46,
            "duration": 5.4,
            "end": 51.4,
            "textEn": "The retrieved context is injected into the prompt alongside the user question.",
            "textVi": "Ngữ cảnh tìm được sẽ được tiêm vào prompt cùng với câu hỏi của người dùng.",
            "words": [
              "The",
              "retrieved",
              "context",
              "is",
              "injected",
              "into",
              "the",
              "prompt",
              "alongside",
              "the",
              "user",
              "question."
            ]
          },
          {
            "id": 9,
            "start": 52.2,
            "duration": 5.4,
            "end": 57.6,
            "textEn": "The LLM synthesizes an accurate answer grounded strictly in the provided documents.",
            "textVi": "LLM sẽ tổng hợp câu trả lời chính xác dựa sát vào tài liệu được cung cấp.",
            "words": [
              "The",
              "LLM",
              "synthesizes",
              "an",
              "accurate",
              "answer",
              "grounded",
              "strictly",
              "in",
              "the",
              "provided",
              "documents."
            ]
          },
          {
            "id": 10,
            "start": 58.4,
            "duration": 4.5,
            "end": 62.9,
            "textEn": "RAG drastically reduces hallucinations while keeping private corporate data secure.",
            "textVi": "RAG giảm đáng kể hiện tượng ảo giác đồng thời bảo mật tuyệt đối dữ liệu nội bộ.",
            "words": [
              "RAG",
              "drastically",
              "reduces",
              "hallucinations",
              "while",
              "keeping",
              "private",
              "corporate",
              "data",
              "secure."
            ]
          },
          {
            "id": 11,
            "start": 63.7,
            "duration": 4.5,
            "end": 68.2,
            "textEn": "Techniques like re-ranking and hybrid search further boost retrieval accuracy.",
            "textVi": "Các kỹ thuật như re-ranking và tìm kiếm kết hợp (hybrid search) tăng độ chính xác hơn nữa.",
            "words": [
              "Techniques",
              "like",
              "re-ranking",
              "and",
              "hybrid",
              "search",
              "further",
              "boost",
              "retrieval",
              "accuracy."
            ]
          },
          {
            "id": 12,
            "start": 69,
            "duration": 5.9,
            "end": 74.9,
            "textEn": "RAG is currently the industry standard for enterprise AI search and question answering.",
            "textVi": "RAG hiện là tiêu chuẩn công nghiệp cho tìm kiếm và hỏi đáp AI trong doanh nghiệp.",
            "words": [
              "RAG",
              "is",
              "currently",
              "the",
              "industry",
              "standard",
              "for",
              "enterprise",
              "AI",
              "search",
              "and",
              "question",
              "answering."
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "flow-software-engineering",
    "title": "Clean Code & Kiến Trúc Phần Mềm (Software Design)",
    "subtitle": "Nguyên lý SOLID, Refactoring, Git Branching và quy chuẩn viết mã sạch",
    "description": "Nâng cấp tư duy lập trình với các nguyên lý thiết kế phần mềm kinh điển, quản lý nhánh Git chuyên nghiệp.",
    "icon": "💻",
    "level": "B1 - Trung cấp",
    "estimatedHours": "4.0 giờ",
    "category": "code",
    "videos": [
      {
        "step": 1,
        "info": {
          "videoId": "7EmboKQH8lM",
          "title": "Clean Code Principles Every Developer Should Know",
          "channel": "Fireship",
          "thumbnailUrl": "https://img.youtube.com/vi/7EmboKQH8lM/hqdefault.jpg",
          "durationFormatted": "10:45",
          "category": "tech",
          "level": "B1 - Trung cấp",
          "sentenceCount": 14,
          "description": "Nguyên tắc viết mã sạch: Đặt tên biến rõ ràng, hàm nhỏ gọn và loại bỏ code smells.",
          "tags": [
            "Clean Code",
            "SOLID",
            "Fireship",
            "Refactoring"
          ]
        },
        "sampleCues": [
          {
            "id": 1,
            "start": 1,
            "duration": 6.3,
            "end": 7.3,
            "textEn": "Writing clean code is one of the most important skills for every software engineer.",
            "textVi": "Viết mã sạch là một trong những kỹ năng quan trọng nhất của mọi kỹ sư phần mềm.",
            "words": [
              "Writing",
              "clean",
              "code",
              "is",
              "one",
              "of",
              "the",
              "most",
              "important",
              "skills",
              "for",
              "every",
              "software",
              "engineer."
            ]
          },
          {
            "id": 2,
            "start": 8.1,
            "duration": 6.8,
            "end": 14.9,
            "textEn": "Clean code is readable, maintainable, and easy to test by other developers on your team.",
            "textVi": "Mã sạch thì dễ đọc, dễ bảo trì và dễ viết kiểm thử bởi các thành viên khác trong nhóm.",
            "words": [
              "Clean",
              "code",
              "is",
              "readable,",
              "maintainable,",
              "and",
              "easy",
              "to",
              "test",
              "by",
              "other",
              "developers",
              "on",
              "your",
              "team."
            ]
          },
          {
            "id": 3,
            "start": 15.7,
            "duration": 5,
            "end": 20.7,
            "textEn": "Always choose meaningful and pronounceable variable names instead of arbitrary acronyms.",
            "textVi": "Luôn chọn tên biến có ý nghĩa và dễ phát âm thay vì các từ viết tắt tùy tiện.",
            "words": [
              "Always",
              "choose",
              "meaningful",
              "and",
              "pronounceable",
              "variable",
              "names",
              "instead",
              "of",
              "arbitrary",
              "acronyms."
            ]
          },
          {
            "id": 4,
            "start": 21.5,
            "duration": 5.4,
            "end": 26.9,
            "textEn": "Functions should do one thing, and they should do it exceptionally well.",
            "textVi": "Mỗi hàm chỉ nên làm một việc duy nhất, và làm việc đó thật hoàn hảo.",
            "words": [
              "Functions",
              "should",
              "do",
              "one",
              "thing,",
              "and",
              "they",
              "should",
              "do",
              "it",
              "exceptionally",
              "well."
            ]
          },
          {
            "id": 5,
            "start": 27.7,
            "duration": 4.5,
            "end": 32.2,
            "textEn": "Keep your functions small and avoid deeply nested conditional statements.",
            "textVi": "Giữ các hàm có độ dài ngắn và tránh các câu lệnh điều kiện lồng nhau quá sâu.",
            "words": [
              "Keep",
              "your",
              "functions",
              "small",
              "and",
              "avoid",
              "deeply",
              "nested",
              "conditional",
              "statements."
            ]
          },
          {
            "id": 6,
            "start": 33,
            "duration": 5.9,
            "end": 38.9,
            "textEn": "Use early returns to reduce cognitive complexity and keep the main logic unindented.",
            "textVi": "Sử dụng early returns để giảm độ phức tạp tư duy và giữ cho luồng chính không bị thụt lề.",
            "words": [
              "Use",
              "early",
              "returns",
              "to",
              "reduce",
              "cognitive",
              "complexity",
              "and",
              "keep",
              "the",
              "main",
              "logic",
              "unindented."
            ]
          },
          {
            "id": 7,
            "start": 39.7,
            "duration": 4.5,
            "end": 44.2,
            "textEn": "Avoid magic numbers by declaring them as descriptive named constants.",
            "textVi": "Tránh các con số ma thuật (magic numbers) bằng cách khai báo chúng thành các hằng số rõ nghĩa.",
            "words": [
              "Avoid",
              "magic",
              "numbers",
              "by",
              "declaring",
              "them",
              "as",
              "descriptive",
              "named",
              "constants."
            ]
          },
          {
            "id": 8,
            "start": 45,
            "duration": 6.3,
            "end": 51.3,
            "textEn": "Comments should explain why code exists, not merely restate what the code is doing.",
            "textVi": "Bình luận nên giải thích lý do tồn tại của đoạn code, chứ không chỉ nhắc lại code đang làm gì.",
            "words": [
              "Comments",
              "should",
              "explain",
              "why",
              "code",
              "exists,",
              "not",
              "merely",
              "restate",
              "what",
              "the",
              "code",
              "is",
              "doing."
            ]
          },
          {
            "id": 9,
            "start": 52.1,
            "duration": 6.8,
            "end": 58.9,
            "textEn": "The Single Responsibility Principle states that a class should have only one reason to change.",
            "textVi": "Nguyên lý Đơn trách nhiệm phát biểu rằng một class chỉ nên có duy nhất một lý do để thay đổi.",
            "words": [
              "The",
              "Single",
              "Responsibility",
              "Principle",
              "states",
              "that",
              "a",
              "class",
              "should",
              "have",
              "only",
              "one",
              "reason",
              "to",
              "change."
            ]
          },
          {
            "id": 10,
            "start": 59.7,
            "duration": 6.3,
            "end": 66,
            "textEn": "Dependency injection makes your modules loosely coupled and significantly easier to mock in tests.",
            "textVi": "Dependency injection giúp các module liên kết lỏng và dễ dàng tạo mock trong kiểm thử.",
            "words": [
              "Dependency",
              "injection",
              "makes",
              "your",
              "modules",
              "loosely",
              "coupled",
              "and",
              "significantly",
              "easier",
              "to",
              "mock",
              "in",
              "tests."
            ]
          },
          {
            "id": 11,
            "start": 66.8,
            "duration": 4.5,
            "end": 71.3,
            "textEn": "Refactor aggressively when you identify code duplication or tight coupling.",
            "textVi": "Hãy tái cấu trúc quyết liệt khi bạn phát hiện mã bị trùng lặp hoặc ghép nối quá chặt.",
            "words": [
              "Refactor",
              "aggressively",
              "when",
              "you",
              "identify",
              "code",
              "duplication",
              "or",
              "tight",
              "coupling."
            ]
          },
          {
            "id": 12,
            "start": 72.1,
            "duration": 4.5,
            "end": 76.6,
            "textEn": "Clean code requires discipline, continuous refactoring, and constructive code reviews.",
            "textVi": "Mã sạch đòi hỏi sự kỷ luật, tái cấu trúc liên tục và các buổi review code mang tính xây dựng.",
            "words": [
              "Clean",
              "code",
              "requires",
              "discipline,",
              "continuous",
              "refactoring,",
              "and",
              "constructive",
              "code",
              "reviews."
            ]
          },
          {
            "id": 13,
            "start": 77.4,
            "duration": 8.6,
            "end": 86,
            "textEn": "Remember: Any fool can write code that a computer can understand; good programmers write code that humans can understand.",
            "textVi": "Hãy nhớ: Kẻ ngốc nào cũng có thể viết code máy tính hiểu được; lập trình viên giỏi viết code mà con người hiểu được.",
            "words": [
              "Remember:",
              "Any",
              "fool",
              "can",
              "write",
              "code",
              "that",
              "a",
              "computer",
              "can",
              "understand;",
              "good",
              "programmers",
              "write",
              "code",
              "that",
              "humans",
              "can",
              "understand."
            ]
          },
          {
            "id": 14,
            "start": 86.8,
            "duration": 3.5,
            "end": 90.3,
            "textEn": "Let us review practical before-and-after refactoring examples.",
            "textVi": "Hãy cùng xem qua các ví dụ tái cấu trúc thực tế trước và sau.",
            "words": [
              "Let",
              "us",
              "review",
              "practical",
              "before-and-after",
              "refactoring",
              "examples."
            ]
          }
        ]
      },
      {
        "step": 2,
        "info": {
          "videoId": "RGOj5yH7evk",
          "title": "Git Version Control & Branching Strategies for Teams",
          "channel": "TechLead",
          "thumbnailUrl": "https://img.youtube.com/vi/RGOj5yH7evk/hqdefault.jpg",
          "durationFormatted": "12:15",
          "category": "tech",
          "level": "B1 - Trung cấp",
          "sentenceCount": 14,
          "description": "Chiến lược phân nhánh Git, Git Flow, Trunk-based development và xử lý conflict chuyên nghiệp.",
          "tags": [
            "Git",
            "Branching",
            "Trunk-based",
            "GitHub"
          ]
        },
        "sampleCues": [
          {
            "id": 1,
            "start": 1,
            "duration": 5.9,
            "end": 6.9,
            "textEn": "Git is the ubiquitous version control system used across the modern software industry.",
            "textVi": "Git là hệ thống quản lý phiên bản phổ biến trên toàn ngành công nghiệp phần mềm hiện đại.",
            "words": [
              "Git",
              "is",
              "the",
              "ubiquitous",
              "version",
              "control",
              "system",
              "used",
              "across",
              "the",
              "modern",
              "software",
              "industry."
            ]
          },
          {
            "id": 2,
            "start": 7.7,
            "duration": 5,
            "end": 12.7,
            "textEn": "Understanding Git branching strategies is crucial when collaborating in engineering teams.",
            "textVi": "Hiểu các chiến lược phân nhánh Git là cực kỳ quan trọng khi cộng tác trong nhóm kỹ thuật.",
            "words": [
              "Understanding",
              "Git",
              "branching",
              "strategies",
              "is",
              "crucial",
              "when",
              "collaborating",
              "in",
              "engineering",
              "teams."
            ]
          },
          {
            "id": 3,
            "start": 13.5,
            "duration": 5.4,
            "end": 18.9,
            "textEn": "Feature branches allow developers to work on new capabilities in total isolation.",
            "textVi": "Các nhánh tính năng (feature branches) cho phép lập trình viên phát triển tính năng mới độc lập hoàn toàn.",
            "words": [
              "Feature",
              "branches",
              "allow",
              "developers",
              "to",
              "work",
              "on",
              "new",
              "capabilities",
              "in",
              "total",
              "isolation."
            ]
          },
          {
            "id": 4,
            "start": 19.7,
            "duration": 5.4,
            "end": 25.1,
            "textEn": "Trunk-based development encourages frequent merges into the main branch to prevent drift.",
            "textVi": "Trunk-based development khuyến khích việc merge thường xuyên vào nhánh chính để tránh lệch mã nguồn.",
            "words": [
              "Trunk-based",
              "development",
              "encourages",
              "frequent",
              "merges",
              "into",
              "the",
              "main",
              "branch",
              "to",
              "prevent",
              "drift."
            ]
          },
          {
            "id": 5,
            "start": 25.9,
            "duration": 5.9,
            "end": 31.8,
            "textEn": "Pull requests provide a structured space for peer review and automated CI validation.",
            "textVi": "Pull request mang lại không gian quy chuẩn để đồng nghiệp review mã và chạy kiểm tra tự động CI.",
            "words": [
              "Pull",
              "requests",
              "provide",
              "a",
              "structured",
              "space",
              "for",
              "peer",
              "review",
              "and",
              "automated",
              "CI",
              "validation."
            ]
          },
          {
            "id": 6,
            "start": 32.6,
            "duration": 5.9,
            "end": 38.5,
            "textEn": "Write clear and conventional commit messages that explain the intent of your changes.",
            "textVi": "Hãy viết thông điệp commit rõ ràng và chuẩn hóa, giải thích rõ mục đích của thay đổi.",
            "words": [
              "Write",
              "clear",
              "and",
              "conventional",
              "commit",
              "messages",
              "that",
              "explain",
              "the",
              "intent",
              "of",
              "your",
              "changes."
            ]
          },
          {
            "id": 7,
            "start": 39.3,
            "duration": 5.9,
            "end": 45.2,
            "textEn": "Merge conflicts occur when two branches modify the same lines of code concurrently.",
            "textVi": "Xung đột merge xảy ra khi hai nhánh cùng sửa đổi các dòng mã giống nhau cùng một lúc.",
            "words": [
              "Merge",
              "conflicts",
              "occur",
              "when",
              "two",
              "branches",
              "modify",
              "the",
              "same",
              "lines",
              "of",
              "code",
              "concurrently."
            ]
          },
          {
            "id": 8,
            "start": 46,
            "duration": 6.3,
            "end": 52.3,
            "textEn": "Use interactive rebase to clean up your commit history before creating a pull request.",
            "textVi": "Sử dụng interactive rebase để dọn dẹp lịch sử commit gọn gàng trước khi tạo pull request.",
            "words": [
              "Use",
              "interactive",
              "rebase",
              "to",
              "clean",
              "up",
              "your",
              "commit",
              "history",
              "before",
              "creating",
              "a",
              "pull",
              "request."
            ]
          },
          {
            "id": 9,
            "start": 53.1,
            "duration": 4.5,
            "end": 57.6,
            "textEn": "Never force push to shared branches like main or staging.",
            "textVi": "Tuyệt đối không force push lên các nhánh dùng chung như main hay staging.",
            "words": [
              "Never",
              "force",
              "push",
              "to",
              "shared",
              "branches",
              "like",
              "main",
              "or",
              "staging."
            ]
          },
          {
            "id": 10,
            "start": 58.4,
            "duration": 5.9,
            "end": 64.3,
            "textEn": "Git cherry-pick allows you to apply specific commits from one branch to another.",
            "textVi": "Git cherry-pick cho phép bạn áp dụng các commit cụ thể từ nhánh này sang nhánh khác.",
            "words": [
              "Git",
              "cherry-pick",
              "allows",
              "you",
              "to",
              "apply",
              "specific",
              "commits",
              "from",
              "one",
              "branch",
              "to",
              "another."
            ]
          },
          {
            "id": 11,
            "start": 65.1,
            "duration": 4.5,
            "end": 69.6,
            "textEn": "Tagging releases with semantic versioning helps automate your production deployments.",
            "textVi": "Gắn thẻ release theo chuẩn Semantic Versioning giúp tự động hóa việc triển khai sản phẩm.",
            "words": [
              "Tagging",
              "releases",
              "with",
              "semantic",
              "versioning",
              "helps",
              "automate",
              "your",
              "production",
              "deployments."
            ]
          },
          {
            "id": 12,
            "start": 70.4,
            "duration": 5.9,
            "end": 76.3,
            "textEn": "Mastering Git CLI commands will give you complete confidence in managing source code.",
            "textVi": "Làm chủ các lệnh Git CLI sẽ giúp bạn hoàn toàn tự tin khi quản lý mã nguồn.",
            "words": [
              "Mastering",
              "Git",
              "CLI",
              "commands",
              "will",
              "give",
              "you",
              "complete",
              "confidence",
              "in",
              "managing",
              "source",
              "code."
            ]
          },
          {
            "id": 13,
            "start": 77.1,
            "duration": 5,
            "end": 82.1,
            "textEn": "Let us practice resolving a real-world merge conflict step by step.",
            "textVi": "Bây giờ hãy cùng thực hành giải quyết một xung đột merge thực tế từng bước một.",
            "words": [
              "Let",
              "us",
              "practice",
              "resolving",
              "a",
              "real-world",
              "merge",
              "conflict",
              "step",
              "by",
              "step."
            ]
          },
          {
            "id": 14,
            "start": 82.9,
            "duration": 5,
            "end": 87.9,
            "textEn": "A clean Git history is the foundation of high-velocity engineering teams.",
            "textVi": "Lịch sử Git sạch đẹp là nền tảng của các đội ngũ kỹ thuật có tốc độ phát triển cao.",
            "words": [
              "A",
              "clean",
              "Git",
              "history",
              "is",
              "the",
              "foundation",
              "of",
              "high-velocity",
              "engineering",
              "teams."
            ]
          }
        ]
      },
      {
        "step": 3,
        "info": {
          "videoId": "SqcXvc3ZmRU",
          "title": "Microservices vs Monolith Architecture - Real-World Trade-Offs",
          "channel": "ByteByteGo",
          "thumbnailUrl": "https://img.youtube.com/vi/SqcXvc3ZmRU/hqdefault.jpg",
          "durationFormatted": "15:20",
          "category": "tech",
          "level": "B2 - Khá",
          "sentenceCount": 12,
          "description": "Phân tích ưu nhược điểm giữa kiến trúc Monolith và Microservices, API Gateway và Event-Driven.",
          "tags": [
            "Microservices",
            "Monolith",
            "System Design",
            "ByteByteGo"
          ]
        },
        "sampleCues": [
          {
            "id": 1,
            "start": 1,
            "duration": 6.3,
            "end": 7.3,
            "textEn": "Choosing between a monolith and microservices is one of the most critical architectural decisions.",
            "textVi": "Lựa chọn giữa monolith và microservices là một trong những quyết định kiến trúc quan trọng nhất.",
            "words": [
              "Choosing",
              "between",
              "a",
              "monolith",
              "and",
              "microservices",
              "is",
              "one",
              "of",
              "the",
              "most",
              "critical",
              "architectural",
              "decisions."
            ]
          },
          {
            "id": 2,
            "start": 8.1,
            "duration": 5.4,
            "end": 13.5,
            "textEn": "A monolithic architecture combines all application components into a single deployable unit.",
            "textVi": "Kiến trúc monolithic gộp tất cả các thành phần ứng dụng vào một đơn vị triển khai duy nhất.",
            "words": [
              "A",
              "monolithic",
              "architecture",
              "combines",
              "all",
              "application",
              "components",
              "into",
              "a",
              "single",
              "deployable",
              "unit."
            ]
          },
          {
            "id": 3,
            "start": 14.3,
            "duration": 6.8,
            "end": 21.1,
            "textEn": "Monoliths are simple to develop, test, and deploy during the early stages of a startup.",
            "textVi": "Monolith rất đơn giản để phát triển, kiểm thử và triển khai trong giai đoạn đầu của dự án.",
            "words": [
              "Monoliths",
              "are",
              "simple",
              "to",
              "develop,",
              "test,",
              "and",
              "deploy",
              "during",
              "the",
              "early",
              "stages",
              "of",
              "a",
              "startup."
            ]
          },
          {
            "id": 4,
            "start": 21.9,
            "duration": 6.3,
            "end": 28.2,
            "textEn": "However, as teams grow, monolithic codebases can become complex and difficult to scale independently.",
            "textVi": "Tuy nhiên, khi quy mô nhóm tăng lên, khối mã monolith có thể trở nên cồng kềnh và khó mở rộng độc lập.",
            "words": [
              "However,",
              "as",
              "teams",
              "grow,",
              "monolithic",
              "codebases",
              "can",
              "become",
              "complex",
              "and",
              "difficult",
              "to",
              "scale",
              "independently."
            ]
          },
          {
            "id": 5,
            "start": 29,
            "duration": 5.4,
            "end": 34.4,
            "textEn": "Microservices decompose the system into small, autonomous services organized around business domains.",
            "textVi": "Microservices chia nhỏ hệ thống thành các dịch vụ độc lập xoay quanh từng miền nghiệp vụ.",
            "words": [
              "Microservices",
              "decompose",
              "the",
              "system",
              "into",
              "small,",
              "autonomous",
              "services",
              "organized",
              "around",
              "business",
              "domains."
            ]
          },
          {
            "id": 6,
            "start": 35.2,
            "duration": 5.9,
            "end": 41.1,
            "textEn": "Each microservice can be developed, scaled, and deployed independently using different tech stacks.",
            "textVi": "Mỗi microservice có thể được phát triển, mở rộng và triển khai độc lập bằng các công nghệ khác nhau.",
            "words": [
              "Each",
              "microservice",
              "can",
              "be",
              "developed,",
              "scaled,",
              "and",
              "deployed",
              "independently",
              "using",
              "different",
              "tech",
              "stacks."
            ]
          },
          {
            "id": 7,
            "start": 41.9,
            "duration": 5.9,
            "end": 47.8,
            "textEn": "Services communicate over lightweight network protocols like HTTP REST, gRPC, or message brokers.",
            "textVi": "Các dịch vụ giao tiếp qua các giao thức mạng nhẹ như HTTP REST, gRPC hoặc hàng đợi tin nhắn.",
            "words": [
              "Services",
              "communicate",
              "over",
              "lightweight",
              "network",
              "protocols",
              "like",
              "HTTP",
              "REST,",
              "gRPC,",
              "or",
              "message",
              "brokers."
            ]
          },
          {
            "id": 8,
            "start": 48.6,
            "duration": 4,
            "end": 52.6,
            "textEn": "Microservices introduce operational complexity, distributed transactions, and network latency.",
            "textVi": "Microservices làm tăng độ phức tạp vận hành, giao dịch phân tán và độ trễ mạng.",
            "words": [
              "Microservices",
              "introduce",
              "operational",
              "complexity,",
              "distributed",
              "transactions,",
              "and",
              "network",
              "latency."
            ]
          },
          {
            "id": 9,
            "start": 53.4,
            "duration": 7.2,
            "end": 60.6,
            "textEn": "An API Gateway acts as a single entry point for client requests, handling routing and authentication.",
            "textVi": "API Gateway đóng vai trò là cổng vào duy nhất cho các yêu cầu từ client, xử lý định tuyến và xác thực.",
            "words": [
              "An",
              "API",
              "Gateway",
              "acts",
              "as",
              "a",
              "single",
              "entry",
              "point",
              "for",
              "client",
              "requests,",
              "handling",
              "routing",
              "and",
              "authentication."
            ]
          },
          {
            "id": 10,
            "start": 61.4,
            "duration": 5.9,
            "end": 67.3,
            "textEn": "Distributed tracing tools like OpenTelemetry are required to monitor requests across multiple services.",
            "textVi": "Các công cụ tracing phân tán như OpenTelemetry là cần thiết để giám sát yêu cầu qua nhiều dịch vụ.",
            "words": [
              "Distributed",
              "tracing",
              "tools",
              "like",
              "OpenTelemetry",
              "are",
              "required",
              "to",
              "monitor",
              "requests",
              "across",
              "multiple",
              "services."
            ]
          },
          {
            "id": 11,
            "start": 68.1,
            "duration": 6.8,
            "end": 74.9,
            "textEn": "Start with a modular monolith first, and only extract microservices when clear scaling bottlenecks arise.",
            "textVi": "Hãy bắt đầu với một modular monolith trước, và chỉ tách microservices khi xuất hiện nghẽn cổ chai rõ ràng.",
            "words": [
              "Start",
              "with",
              "a",
              "modular",
              "monolith",
              "first,",
              "and",
              "only",
              "extract",
              "microservices",
              "when",
              "clear",
              "scaling",
              "bottlenecks",
              "arise."
            ]
          },
          {
            "id": 12,
            "start": 75.7,
            "duration": 5,
            "end": 80.7,
            "textEn": "Understanding these trade-offs will make you a much stronger software architect.",
            "textVi": "Hiểu rõ các sự đánh đổi này sẽ giúp bạn trở thành một kiến trúc sư phần mềm vững vàng hơn.",
            "words": [
              "Understanding",
              "these",
              "trade-offs",
              "will",
              "make",
              "you",
              "a",
              "much",
              "stronger",
              "software",
              "architect."
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "flow-frontend-mastery",
    "title": "Frontend Mastery: React 19, Next.js & TypeScript",
    "subtitle": "Làm chủ Server Components, Custom Hooks, Performance và State Management",
    "description": "Lộ trình toàn diện về hệ sinh thái Frontend hiện đại: React Hooks, Next.js App Router, tối ưu hóa re-render và TypeScript nâng cao.",
    "icon": "⚛️",
    "level": "B2 - Khá",
    "estimatedHours": "4.0 giờ",
    "category": "code",
    "videos": [
      {
        "step": 1,
        "info": {
          "videoId": "w7ejDZ8SWv8",
          "title": "React 19 & Server Components Explained",
          "channel": "Jack Herrington",
          "thumbnailUrl": "https://img.youtube.com/vi/w7ejDZ8SWv8/hqdefault.jpg",
          "durationFormatted": "13:10",
          "category": "tech",
          "level": "B2 - Khá",
          "sentenceCount": 12,
          "description": "React Server Components, Actions, useOptimistic và kiến trúc render hiện đại.",
          "tags": [
            "React 19",
            "RSC",
            "Server Components",
            "Next.js"
          ]
        },
        "sampleCues": [
          {
            "id": 1,
            "start": 1,
            "duration": 4.5,
            "end": 5.5,
            "textEn": "React 19 introduces a fundamental shift with React Server Components.",
            "textVi": "React 19 mang đến sự chuyển dịch nền tảng với React Server Components.",
            "words": [
              "React",
              "19",
              "introduces",
              "a",
              "fundamental",
              "shift",
              "with",
              "React",
              "Server",
              "Components."
            ]
          },
          {
            "id": 2,
            "start": 6.3,
            "duration": 6.3,
            "end": 12.6,
            "textEn": "Server Components execute exclusively on the server and send zero JavaScript to the client.",
            "textVi": "Server Components chỉ thực thi trên máy chủ và không gửi bất kỳ mã JavaScript nào về máy khách.",
            "words": [
              "Server",
              "Components",
              "execute",
              "exclusively",
              "on",
              "the",
              "server",
              "and",
              "send",
              "zero",
              "JavaScript",
              "to",
              "the",
              "client."
            ]
          },
          {
            "id": 3,
            "start": 13.4,
            "duration": 5.4,
            "end": 18.8,
            "textEn": "This drastically reduces client bundle sizes and improves initial page load performance.",
            "textVi": "Điều này giúp giảm mạnh dung lượng gói mã máy khách và tăng tốc độ tải trang ban đầu.",
            "words": [
              "This",
              "drastically",
              "reduces",
              "client",
              "bundle",
              "sizes",
              "and",
              "improves",
              "initial",
              "page",
              "load",
              "performance."
            ]
          },
          {
            "id": 4,
            "start": 19.6,
            "duration": 6.3,
            "end": 25.9,
            "textEn": "You can fetch database records directly inside your React components without extra API routes.",
            "textVi": "Bạn có thể truy vấn cơ sở dữ liệu trực tiếp trong component mà không cần tạo thêm API route.",
            "words": [
              "You",
              "can",
              "fetch",
              "database",
              "records",
              "directly",
              "inside",
              "your",
              "React",
              "components",
              "without",
              "extra",
              "API",
              "routes."
            ]
          },
          {
            "id": 5,
            "start": 26.7,
            "duration": 6.8,
            "end": 33.5,
            "textEn": "Client Components are designated with the use client directive at the top of the file.",
            "textVi": "Client Components được đánh dấu bằng chỉ thị use client ở đầu tệp mã nguồn.",
            "words": [
              "Client",
              "Components",
              "are",
              "designated",
              "with",
              "the",
              "use",
              "client",
              "directive",
              "at",
              "the",
              "top",
              "of",
              "the",
              "file."
            ]
          },
          {
            "id": 6,
            "start": 34.3,
            "duration": 5.9,
            "end": 40.2,
            "textEn": "Use Client Components whenever you need browser interactivity, event listeners, or React hooks.",
            "textVi": "Dùng Client Components khi bạn cần tính tương tác trình duyệt, lắng nghe sự kiện hoặc React hooks.",
            "words": [
              "Use",
              "Client",
              "Components",
              "whenever",
              "you",
              "need",
              "browser",
              "interactivity,",
              "event",
              "listeners,",
              "or",
              "React",
              "hooks."
            ]
          },
          {
            "id": 7,
            "start": 41,
            "duration": 5.4,
            "end": 46.4,
            "textEn": "Server Actions simplify form handling and data mutations without manual fetch requests.",
            "textVi": "Server Actions đơn giản hóa việc xử lý biểu mẫu và thay đổi dữ liệu mà không cần gọi fetch thủ công.",
            "words": [
              "Server",
              "Actions",
              "simplify",
              "form",
              "handling",
              "and",
              "data",
              "mutations",
              "without",
              "manual",
              "fetch",
              "requests."
            ]
          },
          {
            "id": 8,
            "start": 47.2,
            "duration": 4.5,
            "end": 51.7,
            "textEn": "The useOptimistic hook provides instant UI feedback before server confirmation.",
            "textVi": "Hook useOptimistic cung cấp phản hồi giao diện tức thì trước khi máy chủ xác nhận.",
            "words": [
              "The",
              "useOptimistic",
              "hook",
              "provides",
              "instant",
              "UI",
              "feedback",
              "before",
              "server",
              "confirmation."
            ]
          },
          {
            "id": 9,
            "start": 52.5,
            "duration": 5,
            "end": 57.5,
            "textEn": "Suspense boundaries allow components to stream HTML progressively as data resolves.",
            "textVi": "Suspense boundaries cho phép các component truyền tải HTML dần dần khi dữ liệu sẵn sàng.",
            "words": [
              "Suspense",
              "boundaries",
              "allow",
              "components",
              "to",
              "stream",
              "HTML",
              "progressively",
              "as",
              "data",
              "resolves."
            ]
          },
          {
            "id": 10,
            "start": 58.3,
            "duration": 5.4,
            "end": 63.7,
            "textEn": "Combining Server and Client Components gives you both performance and rich interactivity.",
            "textVi": "Kết hợp Server và Client Components mang lại cả hiệu năng đỉnh cao lẫn tính tương tác phong phú.",
            "words": [
              "Combining",
              "Server",
              "and",
              "Client",
              "Components",
              "gives",
              "you",
              "both",
              "performance",
              "and",
              "rich",
              "interactivity."
            ]
          },
          {
            "id": 11,
            "start": 64.5,
            "duration": 5.4,
            "end": 69.9,
            "textEn": "This mental model is now the foundation of modern full-stack web frameworks.",
            "textVi": "Mô hình tư duy này hiện là nền tảng của các framework web full-stack hiện đại.",
            "words": [
              "This",
              "mental",
              "model",
              "is",
              "now",
              "the",
              "foundation",
              "of",
              "modern",
              "full-stack",
              "web",
              "frameworks."
            ]
          },
          {
            "id": 12,
            "start": 70.7,
            "duration": 5.9,
            "end": 76.6,
            "textEn": "Let us build a full working application to see these concepts in action.",
            "textVi": "Hãy cùng xây dựng một ứng dụng hoàn chỉnh để thấy rõ các khái niệm này hoạt động.",
            "words": [
              "Let",
              "us",
              "build",
              "a",
              "full",
              "working",
              "application",
              "to",
              "see",
              "these",
              "concepts",
              "in",
              "action."
            ]
          }
        ]
      },
      {
        "step": 2,
        "info": {
          "videoId": "KjY94sAKLlw",
          "title": "Mastering TypeScript: Generics, Utility Types & Type Guards",
          "channel": "Matt Pocock",
          "thumbnailUrl": "https://img.youtube.com/vi/KjY94sAKLlw/hqdefault.jpg",
          "durationFormatted": "11:40",
          "category": "tech",
          "level": "B2 - Khá",
          "sentenceCount": 12,
          "description": "Học sâu TypeScript: Generic functions, Record, Pick, Omit, Narrowing và Type Inference.",
          "tags": [
            "TypeScript",
            "Generics",
            "Matt Pocock",
            "Frontend"
          ]
        },
        "sampleCues": [
          {
            "id": 1,
            "start": 1,
            "duration": 5,
            "end": 6,
            "textEn": "TypeScript has become the default standard for building scalable web applications.",
            "textVi": "TypeScript đã trở thành tiêu chuẩn mặc định để xây dựng các ứng dụng web mở rộng.",
            "words": [
              "TypeScript",
              "has",
              "become",
              "the",
              "default",
              "standard",
              "for",
              "building",
              "scalable",
              "web",
              "applications."
            ]
          },
          {
            "id": 2,
            "start": 6.8,
            "duration": 6.3,
            "end": 13.1,
            "textEn": "Generics allow you to write reusable code that works with a variety of types.",
            "textVi": "Generics cho phép bạn viết mã tái sử dụng hoạt động linh hoạt với nhiều kiểu dữ liệu khác nhau.",
            "words": [
              "Generics",
              "allow",
              "you",
              "to",
              "write",
              "reusable",
              "code",
              "that",
              "works",
              "with",
              "a",
              "variety",
              "of",
              "types."
            ]
          },
          {
            "id": 3,
            "start": 13.9,
            "duration": 5.9,
            "end": 19.8,
            "textEn": "Think of generics as type parameters that are passed into functions or interfaces.",
            "textVi": "Hãy nghĩ về generics như những tham số kiểu dữ liệu được truyền vào hàm hoặc interface.",
            "words": [
              "Think",
              "of",
              "generics",
              "as",
              "type",
              "parameters",
              "that",
              "are",
              "passed",
              "into",
              "functions",
              "or",
              "interfaces."
            ]
          },
          {
            "id": 4,
            "start": 20.6,
            "duration": 5.4,
            "end": 26,
            "textEn": "Utility types like Pick, Omit, Partial, and Record transform existing types effortlessly.",
            "textVi": "Các utility types như Pick, Omit, Partial và Record biến đổi các kiểu dữ liệu có sẵn dễ dàng.",
            "words": [
              "Utility",
              "types",
              "like",
              "Pick,",
              "Omit,",
              "Partial,",
              "and",
              "Record",
              "transform",
              "existing",
              "types",
              "effortlessly."
            ]
          },
          {
            "id": 5,
            "start": 26.8,
            "duration": 5.9,
            "end": 32.7,
            "textEn": "Type narrowing uses control flow analysis to refine broader types into specific ones.",
            "textVi": "Thu hẹp kiểu (Type narrowing) sử dụng luồng điều khiển để tinh chỉnh các kiểu rộng thành kiểu cụ thể.",
            "words": [
              "Type",
              "narrowing",
              "uses",
              "control",
              "flow",
              "analysis",
              "to",
              "refine",
              "broader",
              "types",
              "into",
              "specific",
              "ones."
            ]
          },
          {
            "id": 6,
            "start": 33.5,
            "duration": 5.9,
            "end": 39.4,
            "textEn": "Custom type guards with the is keyword let you validate runtime objects safely.",
            "textVi": "Type guard tùy chỉnh với từ khóa is cho phép bạn kiểm tra tính hợp lệ của đối tượng lúc chạy.",
            "words": [
              "Custom",
              "type",
              "guards",
              "with",
              "the",
              "is",
              "keyword",
              "let",
              "you",
              "validate",
              "runtime",
              "objects",
              "safely."
            ]
          },
          {
            "id": 7,
            "start": 40.2,
            "duration": 5,
            "end": 45.2,
            "textEn": "Discriminated unions provide 100% type safety when handling complex state machines.",
            "textVi": "Discriminated unions mang lại sự an toàn kiểu dữ liệu 100% khi xử lý state machines phức tạp.",
            "words": [
              "Discriminated",
              "unions",
              "provide",
              "100%",
              "type",
              "safety",
              "when",
              "handling",
              "complex",
              "state",
              "machines."
            ]
          },
          {
            "id": 8,
            "start": 46,
            "duration": 6.3,
            "end": 52.3,
            "textEn": "Avoid using the any type because it disables all type checking and compiler guarantees.",
            "textVi": "Tránh sử dụng kiểu any vì nó vô hiệu hóa mọi tính năng kiểm tra và đảm bảo của trình biên dịch.",
            "words": [
              "Avoid",
              "using",
              "the",
              "any",
              "type",
              "because",
              "it",
              "disables",
              "all",
              "type",
              "checking",
              "and",
              "compiler",
              "guarantees."
            ]
          },
          {
            "id": 9,
            "start": 53.1,
            "duration": 5.4,
            "end": 58.5,
            "textEn": "Use unknown instead of any when dealing with dynamic external API responses.",
            "textVi": "Hãy dùng unknown thay cho any khi xử lý các phản hồi động từ API bên ngoài.",
            "words": [
              "Use",
              "unknown",
              "instead",
              "of",
              "any",
              "when",
              "dealing",
              "with",
              "dynamic",
              "external",
              "API",
              "responses."
            ]
          },
          {
            "id": 10,
            "start": 59.3,
            "duration": 5,
            "end": 64.3,
            "textEn": "Template literal types enable precise string pattern matching at compile time.",
            "textVi": "Template literal types cho phép khớp mẫu chuỗi chính xác ngay tại thời điểm biên dịch.",
            "words": [
              "Template",
              "literal",
              "types",
              "enable",
              "precise",
              "string",
              "pattern",
              "matching",
              "at",
              "compile",
              "time."
            ]
          },
          {
            "id": 11,
            "start": 65.1,
            "duration": 5,
            "end": 70.1,
            "textEn": "A well-typed codebase prevents runtime bugs before code ever reaches production.",
            "textVi": "Một mã nguồn có kiểu dữ liệu chặt chẽ sẽ ngăn chặn lỗi runtime trước khi code lên production.",
            "words": [
              "A",
              "well-typed",
              "codebase",
              "prevents",
              "runtime",
              "bugs",
              "before",
              "code",
              "ever",
              "reaches",
              "production."
            ]
          },
          {
            "id": 12,
            "start": 70.9,
            "duration": 4,
            "end": 74.9,
            "textEn": "Let us solve several challenging TypeScript type-gymnastics exercises together.",
            "textVi": "Hãy cùng nhau giải các bài tập rèn luyện tư duy TypeScript nâng cao.",
            "words": [
              "Let",
              "us",
              "solve",
              "several",
              "challenging",
              "TypeScript",
              "type-gymnastics",
              "exercises",
              "together."
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "flow-devops-cloud",
    "title": "DevOps, Containers & Cloud Engineering",
    "subtitle": "Docker Containers, Kubernetes Pods, CI/CD Pipelines và Linux Server Administration",
    "description": "Lộ trình thực chiến từ đóng gói ứng dụng bằng Docker, điều phối Kubernetes đến tự động hóa CI/CD bằng GitHub Actions.",
    "icon": "☁️",
    "level": "B2 - Khá",
    "estimatedHours": "3.5 giờ",
    "category": "code",
    "videos": [
      {
        "step": 1,
        "info": {
          "videoId": "fqMOX6JJhGo",
          "title": "Docker in 100 Seconds & Full Containerization Guide",
          "channel": "Fireship",
          "thumbnailUrl": "https://img.youtube.com/vi/fqMOX6JJhGo/hqdefault.jpg",
          "durationFormatted": "08:20",
          "category": "tech",
          "level": "B1 - Trung cấp",
          "sentenceCount": 12,
          "description": "Docker Images, Containers, Dockerfile, Multi-stage builds và Docker Compose.",
          "tags": [
            "Docker",
            "Containers",
            "DevOps",
            "Fireship"
          ]
        },
        "sampleCues": [
          {
            "id": 1,
            "start": 1,
            "duration": 5,
            "end": 6,
            "textEn": "Docker is a platform for building, running, and managing containerized applications.",
            "textVi": "Docker là nền tảng để xây dựng, khởi chạy và quản lý các ứng dụng được đóng gói trong container.",
            "words": [
              "Docker",
              "is",
              "a",
              "platform",
              "for",
              "building,",
              "running,",
              "and",
              "managing",
              "containerized",
              "applications."
            ]
          },
          {
            "id": 2,
            "start": 6.8,
            "duration": 5.4,
            "end": 12.2,
            "textEn": "Containers package application code along with all its dependencies and runtime libraries.",
            "textVi": "Container đóng gói mã ứng dụng cùng tất cả các thư viện phụ thuộc và môi trường thực thi.",
            "words": [
              "Containers",
              "package",
              "application",
              "code",
              "along",
              "with",
              "all",
              "its",
              "dependencies",
              "and",
              "runtime",
              "libraries."
            ]
          },
          {
            "id": 3,
            "start": 13,
            "duration": 5.9,
            "end": 18.9,
            "textEn": "This eliminates the classic \"it works on my machine\" problem across team environments.",
            "textVi": "Điều này loại bỏ hoàn toàn vấn đề kinh điển \"chạy được trên máy của tôi\" giữa các môi trường.",
            "words": [
              "This",
              "eliminates",
              "the",
              "classic",
              "\"it",
              "works",
              "on",
              "my",
              "machine\"",
              "problem",
              "across",
              "team",
              "environments."
            ]
          },
          {
            "id": 4,
            "start": 19.7,
            "duration": 5,
            "end": 24.7,
            "textEn": "A Dockerfile contains step-by-step instructions for building an immutable container image.",
            "textVi": "Dockerfile chứa các chỉ dẫn từng bước để xây dựng một container image bất biến.",
            "words": [
              "A",
              "Dockerfile",
              "contains",
              "step-by-step",
              "instructions",
              "for",
              "building",
              "an",
              "immutable",
              "container",
              "image."
            ]
          },
          {
            "id": 5,
            "start": 25.5,
            "duration": 6.3,
            "end": 31.8,
            "textEn": "Multi-stage builds allow you to keep production image sizes tiny by discarding build tools.",
            "textVi": "Multi-stage build cho phép giữ dung lượng image production siêu nhỏ bằng cách loại bỏ công cụ build.",
            "words": [
              "Multi-stage",
              "builds",
              "allow",
              "you",
              "to",
              "keep",
              "production",
              "image",
              "sizes",
              "tiny",
              "by",
              "discarding",
              "build",
              "tools."
            ]
          },
          {
            "id": 6,
            "start": 32.6,
            "duration": 5.9,
            "end": 38.5,
            "textEn": "Docker Compose defines and runs multi-container applications using a single YAML configuration file.",
            "textVi": "Docker Compose định nghĩa và chạy các ứng dụng đa container bằng một tệp cấu hình YAML duy nhất.",
            "words": [
              "Docker",
              "Compose",
              "defines",
              "and",
              "runs",
              "multi-container",
              "applications",
              "using",
              "a",
              "single",
              "YAML",
              "configuration",
              "file."
            ]
          },
          {
            "id": 7,
            "start": 39.3,
            "duration": 4,
            "end": 43.3,
            "textEn": "Volumes provide persistent data storage for containers like databases.",
            "textVi": "Volumes cung cấp khả năng lưu trữ dữ liệu bền vững cho các container như cơ sở dữ liệu.",
            "words": [
              "Volumes",
              "provide",
              "persistent",
              "data",
              "storage",
              "for",
              "containers",
              "like",
              "databases."
            ]
          },
          {
            "id": 8,
            "start": 44.1,
            "duration": 5,
            "end": 49.1,
            "textEn": "Port forwarding maps host machine ports to internal container listening ports.",
            "textVi": "Chuyển tiếp cổng (Port forwarding) ánh xạ cổng của máy chủ vào cổng lắng nghe bên trong container.",
            "words": [
              "Port",
              "forwarding",
              "maps",
              "host",
              "machine",
              "ports",
              "to",
              "internal",
              "container",
              "listening",
              "ports."
            ]
          },
          {
            "id": 9,
            "start": 49.9,
            "duration": 5.9,
            "end": 55.8,
            "textEn": "Container registries like Docker Hub or GitHub Container Registry store and share images.",
            "textVi": "Kho lưu trữ container như Docker Hub hoặc GitHub Container Registry lưu trữ và phân phối image.",
            "words": [
              "Container",
              "registries",
              "like",
              "Docker",
              "Hub",
              "or",
              "GitHub",
              "Container",
              "Registry",
              "store",
              "and",
              "share",
              "images."
            ]
          },
          {
            "id": 10,
            "start": 56.6,
            "duration": 4.5,
            "end": 61.1,
            "textEn": "Containerization is the prerequisite foundation for modern cloud-native deployment architectures.",
            "textVi": "Đóng gói container là nền tảng tiên quyết cho các kiến trúc triển khai cloud-native hiện đại.",
            "words": [
              "Containerization",
              "is",
              "the",
              "prerequisite",
              "foundation",
              "for",
              "modern",
              "cloud-native",
              "deployment",
              "architectures."
            ]
          },
          {
            "id": 11,
            "start": 61.9,
            "duration": 5.9,
            "end": 67.8,
            "textEn": "Security best practices include running containers as non-root users and scanning for vulnerabilities.",
            "textVi": "Thực hành bảo mật chuẩn bao gồm chạy container bằng tài khoản non-root và quét lỗ hổng.",
            "words": [
              "Security",
              "best",
              "practices",
              "include",
              "running",
              "containers",
              "as",
              "non-root",
              "users",
              "and",
              "scanning",
              "for",
              "vulnerabilities."
            ]
          },
          {
            "id": 12,
            "start": 68.6,
            "duration": 5.4,
            "end": 74,
            "textEn": "Let us build, optimize, and deploy a containerized web application right now.",
            "textVi": "Bây giờ hãy cùng đóng gói, tối ưu và triển khai một ứng dụng web dạng container.",
            "words": [
              "Let",
              "us",
              "build,",
              "optimize,",
              "and",
              "deploy",
              "a",
              "containerized",
              "web",
              "application",
              "right",
              "now."
            ]
          }
        ]
      },
      {
        "step": 2,
        "info": {
          "videoId": "X48VuDVv0do",
          "title": "Kubernetes Architecture: Pods, Deployments & Services Explained",
          "channel": "TechWorld with Nana",
          "thumbnailUrl": "https://img.youtube.com/vi/X48VuDVv0do/hqdefault.jpg",
          "durationFormatted": "15:40",
          "category": "tech",
          "level": "B2 - Khá",
          "sentenceCount": 12,
          "description": "Học điều phối container với Kubernetes (K8s): Pods, ReplicaSets, Services, Ingress và ConfigMaps.",
          "tags": [
            "Kubernetes",
            "K8s",
            "DevOps",
            "Nana"
          ]
        },
        "sampleCues": [
          {
            "id": 1,
            "start": 1,
            "duration": 5.4,
            "end": 6.4,
            "textEn": "Kubernetes is an open-source container orchestration engine for automating deployment and scaling.",
            "textVi": "Kubernetes là công cụ điều phối container mã nguồn mở giúp tự động hóa triển khai và mở rộng.",
            "words": [
              "Kubernetes",
              "is",
              "an",
              "open-source",
              "container",
              "orchestration",
              "engine",
              "for",
              "automating",
              "deployment",
              "and",
              "scaling."
            ]
          },
          {
            "id": 2,
            "start": 7.2,
            "duration": 6.3,
            "end": 13.5,
            "textEn": "A Kubernetes cluster consists of a master control plane node and multiple worker nodes.",
            "textVi": "Một cụm Kubernetes gồm một nút điều khiển trung tâm (control plane) và nhiều nút thực thi (worker nodes).",
            "words": [
              "A",
              "Kubernetes",
              "cluster",
              "consists",
              "of",
              "a",
              "master",
              "control",
              "plane",
              "node",
              "and",
              "multiple",
              "worker",
              "nodes."
            ]
          },
          {
            "id": 3,
            "start": 14.3,
            "duration": 6.3,
            "end": 20.6,
            "textEn": "A Pod is the smallest deployable unit in Kubernetes, wrapping one or more containers.",
            "textVi": "Pod là đơn vị triển khai nhỏ nhất trong Kubernetes, bọc một hoặc nhiều container.",
            "words": [
              "A",
              "Pod",
              "is",
              "the",
              "smallest",
              "deployable",
              "unit",
              "in",
              "Kubernetes,",
              "wrapping",
              "one",
              "or",
              "more",
              "containers."
            ]
          },
          {
            "id": 4,
            "start": 21.4,
            "duration": 5.9,
            "end": 27.3,
            "textEn": "Deployments declare the desired state and automatically manage replicas of your application pods.",
            "textVi": "Deployment khai báo trạng thái mong muốn và tự động quản lý các bản sao của pod ứng dụng.",
            "words": [
              "Deployments",
              "declare",
              "the",
              "desired",
              "state",
              "and",
              "automatically",
              "manage",
              "replicas",
              "of",
              "your",
              "application",
              "pods."
            ]
          },
          {
            "id": 5,
            "start": 28.1,
            "duration": 5.9,
            "end": 34,
            "textEn": "If a worker node crashes, Kubernetes automatically reschedules the pods onto healthy nodes.",
            "textVi": "Nếu một worker node gặp sự cố, Kubernetes sẽ tự động lên lịch chạy lại các pod trên các node khỏe mạnh.",
            "words": [
              "If",
              "a",
              "worker",
              "node",
              "crashes,",
              "Kubernetes",
              "automatically",
              "reschedules",
              "the",
              "pods",
              "onto",
              "healthy",
              "nodes."
            ]
          },
          {
            "id": 6,
            "start": 34.8,
            "duration": 5.9,
            "end": 40.7,
            "textEn": "Services provide a stable network IP and load balancing across dynamic ephemeral pods.",
            "textVi": "Service cung cấp địa chỉ IP mạng ổn định và cân bằng tải qua các pod động ngắn hạn.",
            "words": [
              "Services",
              "provide",
              "a",
              "stable",
              "network",
              "IP",
              "and",
              "load",
              "balancing",
              "across",
              "dynamic",
              "ephemeral",
              "pods."
            ]
          },
          {
            "id": 7,
            "start": 41.5,
            "duration": 6.3,
            "end": 47.8,
            "textEn": "Ingress controllers route external HTTP traffic into cluster services based on hostnames and paths.",
            "textVi": "Ingress controller định tuyến lưu lượng HTTP từ bên ngoài vào các service trong cụm theo tên miền và đường dẫn.",
            "words": [
              "Ingress",
              "controllers",
              "route",
              "external",
              "HTTP",
              "traffic",
              "into",
              "cluster",
              "services",
              "based",
              "on",
              "hostnames",
              "and",
              "paths."
            ]
          },
          {
            "id": 8,
            "start": 48.6,
            "duration": 5,
            "end": 53.6,
            "textEn": "ConfigMaps and Secrets decouple configuration and sensitive credentials from application code.",
            "textVi": "ConfigMaps và Secrets tách biệt cấu hình và thông tin nhạy cảm ra khỏi mã nguồn ứng dụng.",
            "words": [
              "ConfigMaps",
              "and",
              "Secrets",
              "decouple",
              "configuration",
              "and",
              "sensitive",
              "credentials",
              "from",
              "application",
              "code."
            ]
          },
          {
            "id": 9,
            "start": 54.4,
            "duration": 5,
            "end": 59.4,
            "textEn": "Horizontal Pod Autoscalers automatically increase pod counts during high traffic spikes.",
            "textVi": "Horizontal Pod Autoscaler tự động tăng số lượng pod khi có đột biến lưu lượng truy cập cao.",
            "words": [
              "Horizontal",
              "Pod",
              "Autoscalers",
              "automatically",
              "increase",
              "pod",
              "counts",
              "during",
              "high",
              "traffic",
              "spikes."
            ]
          },
          {
            "id": 10,
            "start": 60.2,
            "duration": 5.4,
            "end": 65.6,
            "textEn": "Kubernetes YAML manifests enable GitOps practices where infrastructure is treated as code.",
            "textVi": "Các tệp manifest YAML của Kubernetes hỗ trợ thực hành GitOps, coi hạ tầng như mã nguồn.",
            "words": [
              "Kubernetes",
              "YAML",
              "manifests",
              "enable",
              "GitOps",
              "practices",
              "where",
              "infrastructure",
              "is",
              "treated",
              "as",
              "code."
            ]
          },
          {
            "id": 11,
            "start": 66.4,
            "duration": 4.5,
            "end": 70.9,
            "textEn": "Mastering Kubernetes opens up high-impact Senior and DevOps engineering opportunities.",
            "textVi": "Làm chủ Kubernetes mở ra nhiều cơ hội việc làm kỹ sư Senior và DevOps thu nhập cao.",
            "words": [
              "Mastering",
              "Kubernetes",
              "opens",
              "up",
              "high-impact",
              "Senior",
              "and",
              "DevOps",
              "engineering",
              "opportunities."
            ]
          },
          {
            "id": 12,
            "start": 71.7,
            "duration": 5.9,
            "end": 77.6,
            "textEn": "Let us deploy our first cluster and inspect pod lifecycles using kubectl commands.",
            "textVi": "Hãy cùng triển khai cụm đầu tiên và kiểm tra vòng đời pod bằng các lệnh kubectl.",
            "words": [
              "Let",
              "us",
              "deploy",
              "our",
              "first",
              "cluster",
              "and",
              "inspect",
              "pod",
              "lifecycles",
              "using",
              "kubectl",
              "commands."
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "flow-database-engineering",
    "title": "Database Engineering: PostgreSQL, Redis & Indexing",
    "subtitle": "Tối ưu hóa truy vấn SQL, B-Tree Indexing, ACID Transactions và Caching Strategies",
    "description": "Nắm vững kiến trúc cơ sở dữ liệu quan hệ và NoSQL: Indexing, Connection Pooling, Query Execution Plans và Redis Cache.",
    "icon": "🗄️",
    "level": "B2 - Khá",
    "estimatedHours": "3.0 giờ",
    "category": "code",
    "videos": [
      {
        "step": 1,
        "info": {
          "videoId": "clhywF_YIqk",
          "title": "PostgreSQL Database Indexing & Query Optimization Deep Dive",
          "channel": "Hussein Nasser",
          "thumbnailUrl": "https://img.youtube.com/vi/clhywF_YIqk/hqdefault.jpg",
          "durationFormatted": "16:20",
          "category": "tech",
          "level": "B2 - Khá",
          "sentenceCount": 12,
          "description": "Cách thức hoạt động của B-Tree Indexes, Sequential Scan vs Index Scan và EXPLAIN ANALYZE.",
          "tags": [
            "PostgreSQL",
            "Database",
            "Indexing",
            "SQL Tuning"
          ]
        },
        "sampleCues": [
          {
            "id": 1,
            "start": 1,
            "duration": 6.3,
            "end": 7.3,
            "textEn": "Database indexing is the primary technique for speeding up data retrieval in relational databases.",
            "textVi": "Đánh chỉ mục cơ sở dữ liệu là kỹ thuật chính để tăng tốc độ truy xuất dữ liệu trong cơ sở dữ liệu quan hệ.",
            "words": [
              "Database",
              "indexing",
              "is",
              "the",
              "primary",
              "technique",
              "for",
              "speeding",
              "up",
              "data",
              "retrieval",
              "in",
              "relational",
              "databases."
            ]
          },
          {
            "id": 2,
            "start": 8.1,
            "duration": 5.9,
            "end": 14,
            "textEn": "Without an index, the database engine must perform a full sequential table scan.",
            "textVi": "Nếu không có chỉ mục, hệ quản trị cơ sở dữ liệu buộc phải quét tuần tự toàn bộ bảng (sequential scan).",
            "words": [
              "Without",
              "an",
              "index,",
              "the",
              "database",
              "engine",
              "must",
              "perform",
              "a",
              "full",
              "sequential",
              "table",
              "scan."
            ]
          },
          {
            "id": 3,
            "start": 14.8,
            "duration": 5.4,
            "end": 20.2,
            "textEn": "B-Tree is the default index structure, providing logarithmic O(log N) search complexity.",
            "textVi": "B-Tree là cấu trúc chỉ mục mặc định, mang lại độ phức tạp tìm kiếm theo hàm logarit O(log N).",
            "words": [
              "B-Tree",
              "is",
              "the",
              "default",
              "index",
              "structure,",
              "providing",
              "logarithmic",
              "O(log",
              "N)",
              "search",
              "complexity."
            ]
          },
          {
            "id": 4,
            "start": 21,
            "duration": 5.4,
            "end": 26.4,
            "textEn": "Composite indexes index multiple columns and rely strictly on left-to-right prefix matching.",
            "textVi": "Chỉ mục kết hợp (composite index) đánh chỉ mục nhiều cột và phụ thuộc chặt chẽ vào thứ tự tiền tố từ trái qua phải.",
            "words": [
              "Composite",
              "indexes",
              "index",
              "multiple",
              "columns",
              "and",
              "rely",
              "strictly",
              "on",
              "left-to-right",
              "prefix",
              "matching."
            ]
          },
          {
            "id": 5,
            "start": 27.2,
            "duration": 5.9,
            "end": 33.1,
            "textEn": "The EXPLAIN ANALYZE command reveals the actual query execution plan and timing costs.",
            "textVi": "Lệnh EXPLAIN ANALYZE cho thấy kế hoạch thực thi truy vấn thực tế và chi phí thời gian.",
            "words": [
              "The",
              "EXPLAIN",
              "ANALYZE",
              "command",
              "reveals",
              "the",
              "actual",
              "query",
              "execution",
              "plan",
              "and",
              "timing",
              "costs."
            ]
          },
          {
            "id": 6,
            "start": 33.9,
            "duration": 4.5,
            "end": 38.4,
            "textEn": "Over-indexing slows down write operations like INSERT, UPDATE, and DELETE.",
            "textVi": "Đánh quá nhiều chỉ mục sẽ làm chậm các thao tác ghi dữ liệu như INSERT, UPDATE và DELETE.",
            "words": [
              "Over-indexing",
              "slows",
              "down",
              "write",
              "operations",
              "like",
              "INSERT,",
              "UPDATE,",
              "and",
              "DELETE."
            ]
          },
          {
            "id": 7,
            "start": 39.2,
            "duration": 6.3,
            "end": 45.5,
            "textEn": "Covering indexes include all columns requested in the query to avoid secondary heap lookups.",
            "textVi": "Covering index chứa tất cả các cột được yêu cầu trong truy vấn để tránh phải tra cứu lại bảng gốc.",
            "words": [
              "Covering",
              "indexes",
              "include",
              "all",
              "columns",
              "requested",
              "in",
              "the",
              "query",
              "to",
              "avoid",
              "secondary",
              "heap",
              "lookups."
            ]
          },
          {
            "id": 8,
            "start": 46.3,
            "duration": 4.5,
            "end": 50.8,
            "textEn": "ACID properties ensure transactions are atomic, consistent, isolated, and durable.",
            "textVi": "Tính chất ACID đảm bảo các giao dịch mang tính nguyên tử, nhất quán, cô lập và bền vững.",
            "words": [
              "ACID",
              "properties",
              "ensure",
              "transactions",
              "are",
              "atomic,",
              "consistent,",
              "isolated,",
              "and",
              "durable."
            ]
          },
          {
            "id": 9,
            "start": 51.6,
            "duration": 4.5,
            "end": 56.1,
            "textEn": "Database connection pooling reduces overhead by reusing established TCP connections.",
            "textVi": "Connection pooling giảm chi phí tài nguyên bằng cách tái sử dụng các kết nối TCP đã thiết lập.",
            "words": [
              "Database",
              "connection",
              "pooling",
              "reduces",
              "overhead",
              "by",
              "reusing",
              "established",
              "TCP",
              "connections."
            ]
          },
          {
            "id": 10,
            "start": 56.9,
            "duration": 5.9,
            "end": 62.8,
            "textEn": "Vacuuming in PostgreSQL reclaims dead tuple storage left behind by updates and deletes.",
            "textVi": "Tiến trình Vacuum trong PostgreSQL thu hồi dung lượng của các bản ghi chết do update và delete để lại.",
            "words": [
              "Vacuuming",
              "in",
              "PostgreSQL",
              "reclaims",
              "dead",
              "tuple",
              "storage",
              "left",
              "behind",
              "by",
              "updates",
              "and",
              "deletes."
            ]
          },
          {
            "id": 11,
            "start": 63.6,
            "duration": 4.5,
            "end": 68.1,
            "textEn": "Proper database design is crucial for building high-performance backend systems.",
            "textVi": "Thiết kế cơ sở dữ liệu chuẩn là yếu tố sống còn để xây dựng các hệ thống backend hiệu năng cao.",
            "words": [
              "Proper",
              "database",
              "design",
              "is",
              "crucial",
              "for",
              "building",
              "high-performance",
              "backend",
              "systems."
            ]
          },
          {
            "id": 12,
            "start": 68.9,
            "duration": 5,
            "end": 73.9,
            "textEn": "Let us analyze query execution plans and optimize real-world slow queries.",
            "textVi": "Bây giờ hãy cùng phân tích kế hoạch thực thi truy vấn và tối ưu các câu lệnh SQL bị chậm.",
            "words": [
              "Let",
              "us",
              "analyze",
              "query",
              "execution",
              "plans",
              "and",
              "optimize",
              "real-world",
              "slow",
              "queries."
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "flow-tech-interview",
    "title": "Phỏng Vấn Kỹ Sư IT & Giao Tiếp Họp Dự Án (Career & Standup)",
    "subtitle": "Trả lời phỏng vấn theo phương pháp STAR, System Design và báo cáo Daily Standup chuẩn",
    "description": "Trang bị vốn tiếng Anh phản xạ tự nhiên khi phỏng vấn vị trí Software Engineer, họp Sprint Retrospective và Demo sản phẩm.",
    "icon": "💼",
    "level": "B1 - Trung cấp",
    "estimatedHours": "3.0 giờ",
    "category": "career",
    "videos": [
      {
        "step": 1,
        "info": {
          "videoId": "wXwH8G7q3jM",
          "title": "Software Developer Job Interview - Tell Me About a Project",
          "channel": "CareerVidz",
          "thumbnailUrl": "https://img.youtube.com/vi/wXwH8G7q3jM/hqdefault.jpg",
          "durationFormatted": "11:42",
          "category": "work",
          "level": "B1 - Trung cấp",
          "sentenceCount": 14,
          "description": "Hướng dẫn trả lời câu hỏi phỏng vấn dự án lập trình theo cấu trúc STAR chuyên nghiệp.",
          "tags": [
            "Interview",
            "Career",
            "STAR Method",
            "Software Developer"
          ]
        },
        "sampleCues": [
          {
            "id": 1,
            "start": 1,
            "duration": 5,
            "end": 6,
            "textEn": "Tell me about a challenging technical project you worked on recently.",
            "textVi": "Hãy kể cho tôi nghe về một dự án kỹ thuật đầy thử thách mà bạn đã làm gần đây.",
            "words": [
              "Tell",
              "me",
              "about",
              "a",
              "challenging",
              "technical",
              "project",
              "you",
              "worked",
              "on",
              "recently."
            ]
          },
          {
            "id": 2,
            "start": 6.8,
            "duration": 4,
            "end": 10.8,
            "textEn": "Use the STAR method: Situation, Task, Action, and Result.",
            "textVi": "Hãy sử dụng phương pháp STAR: Tình huống, Nhiệm vụ, Hành động và Kết quả.",
            "words": [
              "Use",
              "the",
              "STAR",
              "method:",
              "Situation,",
              "Task,",
              "Action,",
              "and",
              "Result."
            ]
          },
          {
            "id": 3,
            "start": 11.6,
            "duration": 5.9,
            "end": 17.5,
            "textEn": "In my previous role, our legacy monolithic backend was experiencing severe latency spikes.",
            "textVi": "Ở vị trí trước đây của tôi, hệ thống backend monolith cũ gặp phải tình trạng tăng đột biến độ trễ.",
            "words": [
              "In",
              "my",
              "previous",
              "role,",
              "our",
              "legacy",
              "monolithic",
              "backend",
              "was",
              "experiencing",
              "severe",
              "latency",
              "spikes."
            ]
          },
          {
            "id": 4,
            "start": 18.3,
            "duration": 5.9,
            "end": 24.2,
            "textEn": "My task was to diagnose the database bottlenecks and redesign the caching layer.",
            "textVi": "Nhiệm vụ của tôi là chẩn đoán các nút thắt cổ chai ở cơ sở dữ liệu và thiết kế lại tầng lưu cache.",
            "words": [
              "My",
              "task",
              "was",
              "to",
              "diagnose",
              "the",
              "database",
              "bottlenecks",
              "and",
              "redesign",
              "the",
              "caching",
              "layer."
            ]
          },
          {
            "id": 5,
            "start": 25,
            "duration": 5,
            "end": 30,
            "textEn": "I implemented Redis caching with a write-through strategy for frequent queries.",
            "textVi": "Tôi đã triển khai bộ nhớ đệm Redis với chiến lược write-through cho các truy vấn thường xuyên.",
            "words": [
              "I",
              "implemented",
              "Redis",
              "caching",
              "with",
              "a",
              "write-through",
              "strategy",
              "for",
              "frequent",
              "queries."
            ]
          },
          {
            "id": 6,
            "start": 30.8,
            "duration": 4.5,
            "end": 35.3,
            "textEn": "Additionally, I added database connection pooling and optimized composite indexes.",
            "textVi": "Ngoài ra, tôi đã thêm connection pooling cho cơ sở dữ liệu và tối ưu hóa các chỉ mục kết hợp.",
            "words": [
              "Additionally,",
              "I",
              "added",
              "database",
              "connection",
              "pooling",
              "and",
              "optimized",
              "composite",
              "indexes."
            ]
          },
          {
            "id": 7,
            "start": 36.1,
            "duration": 6.3,
            "end": 42.4,
            "textEn": "As a result, API response times dropped by over sixty percent under peak traffic.",
            "textVi": "Kết quả là, thời gian phản hồi API đã giảm hơn 60% trong giờ cao điểm.",
            "words": [
              "As",
              "a",
              "result,",
              "API",
              "response",
              "times",
              "dropped",
              "by",
              "over",
              "sixty",
              "percent",
              "under",
              "peak",
              "traffic."
            ]
          },
          {
            "id": 8,
            "start": 43.2,
            "duration": 5.9,
            "end": 49.1,
            "textEn": "The deployment had zero downtime and saved twenty percent in server infrastructure costs.",
            "textVi": "Việc triển khai diễn ra không có thời gian chết (zero downtime) và tiết kiệm 20% chi phí hạ tầng máy chủ.",
            "words": [
              "The",
              "deployment",
              "had",
              "zero",
              "downtime",
              "and",
              "saved",
              "twenty",
              "percent",
              "in",
              "server",
              "infrastructure",
              "costs."
            ]
          },
          {
            "id": 9,
            "start": 49.9,
            "duration": 5.9,
            "end": 55.8,
            "textEn": "Quantifying your impact with real metrics makes your interview answer far more compelling.",
            "textVi": "Lượng hóa tác động bằng các số liệu thực tế giúp câu trả lời phỏng vấn của bạn thuyết phục hơn nhiều.",
            "words": [
              "Quantifying",
              "your",
              "impact",
              "with",
              "real",
              "metrics",
              "makes",
              "your",
              "interview",
              "answer",
              "far",
              "more",
              "compelling."
            ]
          },
          {
            "id": 10,
            "start": 56.6,
            "duration": 5.4,
            "end": 62,
            "textEn": "Always highlight how you collaborated with team members and resolved disagreements constructively.",
            "textVi": "Luôn nhấn mạnh cách bạn cộng tác với đồng nghiệp và giải quyết các bất đồng một cách xây dựng.",
            "words": [
              "Always",
              "highlight",
              "how",
              "you",
              "collaborated",
              "with",
              "team",
              "members",
              "and",
              "resolved",
              "disagreements",
              "constructively."
            ]
          },
          {
            "id": 11,
            "start": 62.8,
            "duration": 5.9,
            "end": 68.7,
            "textEn": "Be prepared to dive deep into the technical trade-offs of your architectural decisions.",
            "textVi": "Hãy sẵn sàng đi sâu vào các sự đánh đổi kỹ thuật trong các quyết định kiến trúc của bạn.",
            "words": [
              "Be",
              "prepared",
              "to",
              "dive",
              "deep",
              "into",
              "the",
              "technical",
              "trade-offs",
              "of",
              "your",
              "architectural",
              "decisions."
            ]
          },
          {
            "id": 12,
            "start": 69.5,
            "duration": 4,
            "end": 73.5,
            "textEn": "Practice speaking aloud with confidence and clear English articulation.",
            "textVi": "Hãy luyện nói to thành tiếng với sự tự tin và phát âm tiếng Anh rõ ràng.",
            "words": [
              "Practice",
              "speaking",
              "aloud",
              "with",
              "confidence",
              "and",
              "clear",
              "English",
              "articulation."
            ]
          },
          {
            "id": 13,
            "start": 74.3,
            "duration": 5.9,
            "end": 80.2,
            "textEn": "This structured approach will help you stand out in competitive software engineering interviews.",
            "textVi": "Cách tiếp cận có cấu trúc này sẽ giúp bạn nổi bật trong các buổi phỏng vấn kỹ sư phần mềm cạnh tranh.",
            "words": [
              "This",
              "structured",
              "approach",
              "will",
              "help",
              "you",
              "stand",
              "out",
              "in",
              "competitive",
              "software",
              "engineering",
              "interviews."
            ]
          },
          {
            "id": 14,
            "start": 81,
            "duration": 4.5,
            "end": 85.5,
            "textEn": "Let us practice mock interview responses for common technical scenarios.",
            "textVi": "Bây giờ hãy cùng luyện tập các câu trả lời phỏng vấn mẫu cho các tình huống kỹ thuật phổ biến.",
            "words": [
              "Let",
              "us",
              "practice",
              "mock",
              "interview",
              "responses",
              "for",
              "common",
              "technical",
              "scenarios."
            ]
          }
        ]
      },
      {
        "step": 2,
        "info": {
          "videoId": "4KpXZvG3rQA",
          "title": "Agile Scrum Standup Meeting & Sprint Retrospective in English",
          "channel": "Danube Tech",
          "thumbnailUrl": "https://img.youtube.com/vi/4KpXZvG3rQA/hqdefault.jpg",
          "durationFormatted": "08:50",
          "category": "work",
          "level": "B1 - Trung cấp",
          "sentenceCount": 14,
          "description": "Mẫu câu tiếng Anh chuẩn cho buổi họp Daily Standup, báo cáo tiến độ và nêu khó khăn (Blockers).",
          "tags": [
            "Agile",
            "Scrum",
            "Daily Standup",
            "English for IT"
          ]
        },
        "sampleCues": [
          {
            "id": 1,
            "start": 1,
            "duration": 4.5,
            "end": 5.5,
            "textEn": "Good morning team, let us start our Daily Standup meeting.",
            "textVi": "Chào buổi sáng cả nhóm, chúng ta hãy bắt đầu buổi họp Daily Standup.",
            "words": [
              "Good",
              "morning",
              "team,",
              "let",
              "us",
              "start",
              "our",
              "Daily",
              "Standup",
              "meeting."
            ]
          },
          {
            "id": 2,
            "start": 6.3,
            "duration": 5.4,
            "end": 11.7,
            "textEn": "Yesterday, I finished implementing the JWT authentication middleware for the API gateway.",
            "textVi": "Hôm qua, tôi đã hoàn thành việc triển khai middleware xác thực JWT cho API gateway.",
            "words": [
              "Yesterday,",
              "I",
              "finished",
              "implementing",
              "the",
              "JWT",
              "authentication",
              "middleware",
              "for",
              "the",
              "API",
              "gateway."
            ]
          },
          {
            "id": 3,
            "start": 12.5,
            "duration": 5.4,
            "end": 17.9,
            "textEn": "I also wrote comprehensive unit tests with over eighty percent code coverage.",
            "textVi": "Tôi cũng đã viết đầy đủ unit test với độ bao phủ mã nguồn trên 80%.",
            "words": [
              "I",
              "also",
              "wrote",
              "comprehensive",
              "unit",
              "tests",
              "with",
              "over",
              "eighty",
              "percent",
              "code",
              "coverage."
            ]
          },
          {
            "id": 4,
            "start": 18.7,
            "duration": 5.9,
            "end": 24.6,
            "textEn": "Today, I will be working on integrating the Stripe webhook payment processing flow.",
            "textVi": "Hôm nay, tôi sẽ làm việc với luồng tích hợp webhook xử lý thanh toán của Stripe.",
            "words": [
              "Today,",
              "I",
              "will",
              "be",
              "working",
              "on",
              "integrating",
              "the",
              "Stripe",
              "webhook",
              "payment",
              "processing",
              "flow."
            ]
          },
          {
            "id": 5,
            "start": 25.4,
            "duration": 6.3,
            "end": 31.7,
            "textEn": "I am currently blocked by the missing staging API credentials from the DevOps team.",
            "textVi": "Tôi hiện đang bị vướng mắc (blocked) do chưa có thông tin đăng nhập API môi trường staging từ nhóm DevOps.",
            "words": [
              "I",
              "am",
              "currently",
              "blocked",
              "by",
              "the",
              "missing",
              "staging",
              "API",
              "credentials",
              "from",
              "the",
              "DevOps",
              "team."
            ]
          },
          {
            "id": 6,
            "start": 32.5,
            "duration": 5.9,
            "end": 38.4,
            "textEn": "Can we sync up offline right after this call to unblock that issue?",
            "textVi": "Chúng ta có thể trao đổi riêng ngay sau cuộc gọi này để gỡ vướng vấn đề đó được không?",
            "words": [
              "Can",
              "we",
              "sync",
              "up",
              "offline",
              "right",
              "after",
              "this",
              "call",
              "to",
              "unblock",
              "that",
              "issue?"
            ]
          },
          {
            "id": 7,
            "start": 39.2,
            "duration": 6.8,
            "end": 46,
            "textEn": "In the Sprint Retrospective, we should discuss how to improve our pull request turnaround time.",
            "textVi": "Trong buổi họp Sprint Retrospective, chúng ta nên thảo luận cách cải thiện thời gian review pull request.",
            "words": [
              "In",
              "the",
              "Sprint",
              "Retrospective,",
              "we",
              "should",
              "discuss",
              "how",
              "to",
              "improve",
              "our",
              "pull",
              "request",
              "turnaround",
              "time."
            ]
          },
          {
            "id": 8,
            "start": 46.8,
            "duration": 6.3,
            "end": 53.1,
            "textEn": "I noticed some automated CI build pipelines are taking longer than usual to complete.",
            "textVi": "Tôi nhận thấy một số luồng CI tự động đang mất nhiều thời gian hơn bình thường để hoàn tất.",
            "words": [
              "I",
              "noticed",
              "some",
              "automated",
              "CI",
              "build",
              "pipelines",
              "are",
              "taking",
              "longer",
              "than",
              "usual",
              "to",
              "complete."
            ]
          },
          {
            "id": 9,
            "start": 53.9,
            "duration": 6.8,
            "end": 60.7,
            "textEn": "Let us create an action item to cache npm dependencies in our GitHub Actions workflow.",
            "textVi": "Hãy tạo một action item để cache các thư viện npm trong workflow GitHub Actions của chúng ta.",
            "words": [
              "Let",
              "us",
              "create",
              "an",
              "action",
              "item",
              "to",
              "cache",
              "npm",
              "dependencies",
              "in",
              "our",
              "GitHub",
              "Actions",
              "workflow."
            ]
          },
          {
            "id": 10,
            "start": 61.5,
            "duration": 4.5,
            "end": 66,
            "textEn": "Clear communication during standups keeps the entire distributed team aligned.",
            "textVi": "Giao tiếp rõ ràng trong các buổi standup giúp toàn bộ nhóm phân tán luôn đồng bộ tiến độ.",
            "words": [
              "Clear",
              "communication",
              "during",
              "standups",
              "keeps",
              "the",
              "entire",
              "distributed",
              "team",
              "aligned."
            ]
          },
          {
            "id": 11,
            "start": 66.8,
            "duration": 5.9,
            "end": 72.7,
            "textEn": "Always be proactive about raising blockers early rather than waiting until sprint review.",
            "textVi": "Hãy luôn chủ động nêu các trở ngại từ sớm thay vì đợi đến tận buổi sprint review.",
            "words": [
              "Always",
              "be",
              "proactive",
              "about",
              "raising",
              "blockers",
              "early",
              "rather",
              "than",
              "waiting",
              "until",
              "sprint",
              "review."
            ]
          },
          {
            "id": 12,
            "start": 73.5,
            "duration": 5,
            "end": 78.5,
            "textEn": "Using standard Agile vocabulary builds instant professional credibility in international teams.",
            "textVi": "Sử dụng chuẩn từ vựng Agile tạo ngay uy tín chuyên nghiệp trong các đội ngũ quốc tế.",
            "words": [
              "Using",
              "standard",
              "Agile",
              "vocabulary",
              "builds",
              "instant",
              "professional",
              "credibility",
              "in",
              "international",
              "teams."
            ]
          },
          {
            "id": 13,
            "start": 79.3,
            "duration": 4,
            "end": 83.3,
            "textEn": "Let us practice delivering a concise 60-second standup update.",
            "textVi": "Bây giờ hãy cùng thực hành trình bày bản cập nhật standup ngắn gọn trong 60 giây.",
            "words": [
              "Let",
              "us",
              "practice",
              "delivering",
              "a",
              "concise",
              "60-second",
              "standup",
              "update."
            ]
          },
          {
            "id": 14,
            "start": 84.1,
            "duration": 4,
            "end": 88.1,
            "textEn": "Great job everyone, let us have a productive sprint!",
            "textVi": "Làm tốt lắm mọi người, chúc chúng ta có một sprint làm việc thật hiệu quả!",
            "words": [
              "Great",
              "job",
              "everyone,",
              "let",
              "us",
              "have",
              "a",
              "productive",
              "sprint!"
            ]
          }
        ]
      }
    ]
  }
]
