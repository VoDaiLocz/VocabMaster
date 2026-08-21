#!/bin/bash
set -e

echo "===================================================="
echo "  🚀 CẬP NHẬT VOCABMASTER LÊN PHIÊN BẢN MỚI NHẤT   "
echo "===================================================="

# Check if running as root
if [ "$EUID" -ne 0 ]; then
  echo "❌ Vui lòng chạy lệnh với quyền sudo:"
  echo "👉 sudo ./install-update.sh"
  exit 1
fi

echo "1. Đang gỡ bỏ bản cài đặt cũ..."
rpm -e vocabmaster 2>/dev/null || true
rm -rf /opt/VocabMaster /usr/share/applications/vocabmaster.desktop

echo "2. Đang cài đặt bản mới nhất vào /opt/VocabMaster..."
mkdir -p /opt/VocabMaster
cp -rf /home/vodailoc/VocabMaster/release/linux-unpacked/* /opt/VocabMaster/
chmod +x /opt/VocabMaster/vocabmaster

echo "3. Đang tạo icon và shortcut hệ thống..."
mkdir -p /usr/share/applications /usr/share/icons/hicolor/512x512/apps/
cp /home/vodailoc/VocabMaster/resources/icon.png /usr/share/icons/hicolor/512x512/apps/vocabmaster.png 2>/dev/null || true

cat << 'DESKTOP_EOF' > /usr/share/applications/vocabmaster.desktop
[Desktop Entry]
Name=VocabMaster
Exec=/opt/VocabMaster/vocabmaster %U
Terminal=false
Type=Application
Icon=/home/vodailoc/VocabMaster/resources/icon.png
StartupWMClass=VocabMaster
Comment=English Vocabulary Learning App
Categories=Education;
DESKTOP_EOF

update-desktop-database /usr/share/applications 2>/dev/null || true

echo "===================================================="
echo "  ✅ HOÀN TẤT! ĐÃ GỠ BẢN CŨ & CÀI ĐẶT BẢN MỚI 100%  "
echo "  👉 Bạn có thể bấm vào icon VocabMaster để mở ngay! "
echo "===================================================="
