<div align="center">

# 🎓 VocabMaster

### Ứng dụng Học Từ Vựng & Phản Xạ Đặt Câu Tiếng Anh Thông Minh

[![Version](https://img.shields.io/badge/version-1.2.7-blue.svg?style=flat-square)](https://github.com/VoDaiLocz/VocabMaster/releases)
[![License](https://img.shields.io/badge/license-MIT-green.svg?style=flat-square)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20Linux%20%7C%20Android-orange.svg?style=flat-square)](https://github.com/VoDaiLocz/VocabMaster)
[![React](https://img.shields.io/badge/React-18-61dafb.svg?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178c6.svg?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![SQLite](https://img.shields.io/badge/Database-SQLite%20Offline-003B57.svg?style=flat-square&logo=sqlite)](https://sqlite.org/)

**VocabMaster** là nền tảng học tiếng Anh đa nền tảng (Desktop & Mobile) kết hợp thuật toán **Lặp lại ngắt quãng (SM2)**, **Phản xạ tư duy đặt câu đa mệnh đề (Sentence Master)** và **Học qua video YouTube song ngữ tương tác**.

[Tính năng](#-tính-năng-cốt-lõi) • [Cài đặt](#-cài-đặt--sử-dụng) • [Công nghệ](#-kiến-trúc-công-nghệ) • [Đóng góp](#-đóng-góp)

---

</div>

## 🚀 Tính năng Cốt lõi

### 1. 🧩 Sentence Master – Luyện Phản Xạ Đặt Câu & Đoạn Văn

- **5 Giai đoạn chuyên sâu**: Nền tảng cấu trúc $\rightarrow$ Giao tiếp đời sống $\rightarrow$ Tiếng Anh công sở $\rightarrow$ Chuyên ngành IT $\rightarrow$ Luyện đặt câu dài & Đoạn văn đa mệnh đề.
- **Sơ đồ Lego Blocks**: Bóc tách trực quan từng thành phần câu _(Mệnh đề chính $\rightarrow$ Cầu nối logic $\rightarrow$ Mệnh đề mở rộng)_.
- **Cẩm nang 4 bước từng ly từng tý**: Hướng dẫn tư duy đặt câu từ người mới bắt đầu đến nâng cao, so sánh tư duy Việt - Anh và loại bỏ bẫy dịch word-by-word.
- **Phát âm SpeechSynthesis chuẩn**: Bấm nghe phát âm cả câu hoặc từng từ vựng riêng biệt với 2 tốc độ (`1.0x` và `🐢 0.8x`).

### 2. 🎬 Video Learning – Học Tiếng Anh Qua Video Song Ngữ

- **Phụ đề đồng bộ thời gian thực**: Xem video kèm phụ đề Anh - Việt trực quan, tự động cuộn theo tiến trình nói.
- **Tra từ điển tức thì (Instant Lookup)**: Chạm vào bất kỳ từ nào trong video để xem phiên âm IPA, giải nghĩa chi tiết và lưu thẳng vào Flashcard chỉ với 1 cú click.

### 3. 🧠 Spaced Repetition (SRS - SM2) & Active Recall

- **Thuật toán ghi nhớ dài hạn**: Tự động tính toán chu kỳ lặp lại ngắt quãng dựa trên độ ghi nhớ của não bộ.
- **Luyện gõ từ vựng (Typing Arena)**: Ép não bộ nhớ chính tả từng ký tự thay vì chỉ nhìn lướt qua.
- **Chế độ Hell Mode**: Giới hạn thời gian phản xạ 10s để rèn luyện tốc độ xử lý ngôn ngữ dưới áp lực cao.

### 4. 📚 Thư Viện Giáo Trình Toàn Diện (Curated Library)

- **TOEIC Roadmap (0 - 990+)**: Phân bổ từ vựng theo 5 chặng mục tiêu rõ ràng.
- **Oxford 3000™ & IELTS Academic**: Bộ từ vựng học thuật chuẩn quốc tế.
- **Chuyên ngành công nghệ (IT & Tech)**: Thuật ngữ Daily Scrum, Code Review, Architecture và phỏng vấn phần mềm.

### 5. 💾 100% Offline & Đồng Bộ Đa Nền Tảng

- **SQLite Engine**: Lưu trữ toàn bộ dữ liệu từ vựng, flashcard và tiến độ học offline cục bộ mà không cần kết nối mạng.
- **Chạy mượt mà trên mọi thiết bị**: Hỗ trợ Windows, Linux (AppImage) và Android (Capacitor).

---

## 💻 Cài đặt & Sử dụng

### Dành cho Người dùng (Downloads)

Tải phiên bản mới nhất tại mục [**Releases (v1.2.7)**](https://github.com/VoDaiLocz/VocabMaster/releases):

| Nền tảng       | Định dạng   | Hướng dẫn                                                     |
| :------------- | :---------- | :------------------------------------------------------------ |
| **🐧 Linux**   | `.AppImage` | `chmod +x VocabMaster-*.AppImage && ./VocabMaster-*.AppImage` |
| **💻 Windows** | `.exe`      | Tải file Setup và cài đặt bình thường                         |
| **📱 Android** | `.apk`      | Tải và cài đặt file APK trên điện thoại                       |

---

### Dành cho Lập trình viên (Developer Setup)

**Yêu cầu hệ thống:** Node.js $\ge$ 18, npm $\ge$ 9, Git.

```bash
# 1. Clone mã nguồn
git clone https://github.com/VoDaiLocz/VocabMaster.git
cd VocabMaster

# 2. Cài đặt phụ thuộc
npm install

# 3. Khởi chạy môi trường phát triển (Desktop Electron)
npm run electron:dev

# 4. Kiểm tra kiểu dữ liệu & Linting
npm run typecheck
npm run lint

# 5. Đóng gói ứng dụng (Build Release)
npm run build:linux    # Tạo Linux AppImage
npm run build:win      # Tạo Windows Executable (.exe)
npm run build:android  # Đồng bộ và build Android
```

---

## 🛠️ Kiến trúc Công nghệ

```
VocabMaster/
├── src/
│   ├── components/       # UI Components (Sentence, Video, Common, Quiz)
│   ├── data/             # Sentence Master patterns & Real vocabulary datasets
│   ├── pages/            # Ứng dụng chính (Home, Learn, Video, SentenceMaster...)
│   ├── services/         # SQLite Polyfill, Dictionary & YouTube Transcript
│   └── store/            # Quản lý State bằng Zustand
├── electron/             # Main process, IPC handlers & SQLite connection
└── android/              # Mã nguồn Capacitor Native Android
```

- **Frontend:** React 18, TypeScript, Tailwind CSS, Framer Motion, Lucide Icons.
- **Desktop Core:** Electron 29, Better-SQLite3, Python Transcript Helper.
- **Mobile Core:** Capacitor 8, SQLite WASM + IndexedDB Persistent Polyfill.
- **Audio Engine:** Web SpeechSynthesis API + Google TTS fallback.

---

## 🤝 Đóng góp (Contributing)

Mọi đóng góp cho VocabMaster đều được trân trọng!

1. Fork dự án
2. Tạo nhánh tính năng (`git checkout -b feature/AmazingFeature`)
3. Commit thay đổi (`git commit -m 'feat: Add some AmazingFeature'`)
4. Đẩy lên nhánh (`git push origin feature/AmazingFeature`)
5. Mở **Pull Request**

---

## 📄 Giấy phép

Phát hành dưới giấy phép [MIT License](LICENSE). Hoàn toàn miễn phí cho mục đích học tập và phát triển cá nhân.

<div align="center">
  <sub>Xây dựng với ❤️ bởi <a href="https://github.com/VoDaiLocz">LocFaker</a></sub>
</div>
