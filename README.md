# VocabMaster 🎓 - Ứng dụng Học Từ Vựng Tiếng Anh Thông Minh

![VocabMaster Banner](https://via.placeholder.com/1200x400/6366f1/ffffff?text=VocabMaster+-+Hoc+Tieng+Anh+Cho+Nguoi+Viet)

**VocabMaster** là ứng dụng máy tính (Desktop App) mã nguồn mở, được thiết kế chuyên biệt giúp người Việt chinh phục từ vựng tiếng Anh một cách hiệu quả nhất. Ứng dụng kết hợp thuật toán **Lặp lại ngắt quãng (Spaced Repetition - SM2)** với các phương pháp học tập chủ động (Active Recall) để đảm bảo bạn nhớ từ vĩnh viễn.

## ✨ Tính năng Nổi bật

### 1. 🛤️ Lộ trình TOEIC & IELTS Chuyên Sâu
Không còn học lan man! VocabMaster cung cấp lộ trình học được chia nhỏ theo trình độ:
- **TOEIC Roadmap (0 - 990+):** 5 cấp độ từ mất gốc (Starter) đến cao thủ (Master).
- **Oxford 3000™:** 3000 từ vựng cốt lõi bắt buộc phải biết.
- **IELTS Academic:** Từ vựng học thuật Band 7.0+.
- **Chuyên ngành:** CNTT, Y tế, Du lịch, Khởi nghiệp (Startup Lingo)...

### 2. 🔥 Chế độ "Địa Ngục" (Hell Mode)
Dành cho những ai muốn thử thách cực hạn:
- **Áp lực thời gian:** Chỉ 10 giây để nhớ nghĩa của từ.
- **Kỷ luật thép:** Trả lời sai hoặc hết giờ? Từ vựng sẽ bị reset về mức 0 ngay lập tức.
- **Hiệu quả gấp đôi:** Ép não bộ phải phản xạ tức thì, loại bỏ thói quen chần chừ.

### 3. ⌨️ Active Recall (Gõ để nhớ)
Thay vì chỉ lật thẻ thụ động, bạn phải **tự tay gõ lại từ vựng**. Hệ thống sẽ kiểm tra chính tả từng ký tự. Đây là cách tốt nhất để không bao giờ viết sai từ nữa.

### 4. 🎨 Giao diện Glassmorphism Hiện đại
- Thiết kế tối giản, đẹp mắt với hiệu ứng kính mờ (Glassmorphism).
- **Dark Mode** xịn xò bảo vệ mắt khi học đêm.
- Biểu đồ thống kê chi tiết (Streak, XP, Tỷ lệ thuộc bài).

---

## 🛠️ Cài đặt & Sử dụng

### Dành cho Người dùng (User)

**💻 Windows:**
1. Tải file cài đặt `.exe` mới nhất tại mục [Releases](https://github.com/locfaker/VocabMaster/releases).
2. Cài đặt và mở ứng dụng.

**🐧 Linux:**
1. Tải file `.AppImage` hoặc `.deb` tại mục [Releases](https://github.com/locfaker/VocabMaster/releases).
2. Cấp quyền thực thi và chạy ứng dụng.

**📱 Android (Mobile Web / PWA):**
1. Tải file `.apk` tại mục [Releases](https://github.com/locfaker/VocabMaster/releases) hoặc truy cập phiên bản Web.
2. Giao diện đã được tối ưu hoàn toàn cho màn hình cảm ứng di động.

Sau khi cài đặt, vào mục **Library (Kho từ vựng)** -> Chọn bộ từ yêu thích -> Nhấn **Tải về** và bắt đầu học!

### Dành cho Lập trình viên (Developer)

Yêu cầu: Node.js (v16 trở lên), Git.

```bash
# 1. Clone dự án
git clone https://github.com/locfaker/VocabMaster.git
cd VocabMaster

# 2. Cài đặt thư viện
npm install

# 3. Chạy môi trường Dev (vừa code vừa xem)
npm run electron:dev

# 4. Đóng gói ứng dụng (Build)
npm run build:win   # Build cho Windows
npm run build:linux # Build cho Linux
```

---

## 🧠 Công nghệ sử dụng

Dự án được xây dựng trên nền tảng công nghệ hiện đại, hiệu năng cao:

- **Electron:** Khung ứng dụng đa nền tảng.
- **React 18:** Thư viện UI mạnh mẽ.
- **TypeScript:** Code an toàn, ít lỗi.
- **Tailwind CSS:** Thiết kế giao diện siêu tốc.
- **SQLite / Better-SQLite3:** Cơ sở dữ liệu cục bộ cực nhanh.
- **Zustand:** Quản lý trạng thái (State Management) nhẹ nhàng.
- **Recharts:** Vẽ biểu đồ thống kê.

---

## 🤝 Đóng góp (Contributing)

Chúng tôi rất hoan nghênh mọi sự đóng góp từ cộng đồng! Nếu bạn có ý tưởng hay, bộ từ vựng mới hoặc tìm thấy lỗi, hãy:
1. **Fork** dự án.
2. Tạo nhánh mới (`git checkout -b feature/TinhNangMoi`).
3. Commit thay đổi (`git commit -m 'Thêm tính năng ABC'`).
4. Push lên nhánh (`git push origin feature/TinhNangMoi`).
5. Tạo **Pull Request**.

---

## 📄 Giấy phép

Dự án được phát hành dưới giấy phép **MIT License**. Miễn phí cho mọi mục đích sử dụng cá nhân và giáo dục.

---

**Code with ❤️ by [LocFaker](https://github.com/locfaker)**
