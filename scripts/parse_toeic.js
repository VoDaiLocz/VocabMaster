const fs = require("fs");
const path = "/home/vodailoc/Downloads/raw_toeic_data.txt";
const content = fs.readFileSync(path, "utf8");

console.log("Dung lượng:", content.length);

const unescaped = content.replace(/\\"/g, "\"").replace(/\\\\/g, "\\");
const regexItem = /\{"2":(\d+),"3":(?:\[2,"([^"]+)"\]|\{"1":\d+,"3":([\d.]+)\})(?:,"6":\d+)?(?:,"24":"([^"]+)")?/g;

const items = [];
let match;
while ((match = regexItem.exec(unescaped)) !== null) {
  const textVal = match[2] !== undefined ? match[2] : match[3];
  const linkVal = match[4] || null;
  items.push({ text: textVal, link: linkVal });
}

console.log("Tổng số cell trích xuất:", items.length);
console.log("Mẫu 25 cell đầu:", items.slice(0, 25));

// Lọc các cặp (Tiêu đề, Link)
const resources = [];
for (let i = 0; i < items.length; i++) {
  const item = items[i];
  if (item.link) {
    let title = "Không có tiêu đề";
    if (i > 0 && items[i-1].text && !items[i-1].link && !items[i-1].text.includes("LINK")) {
      title = items[i-1].text.trim();
    } else if (i > 1 && items[i-2].text && !items[i-2].link && !items[i-2].text.includes("LINK")) {
      title = items[i-2].text.trim();
    }
    resources.push({
      id: resources.length + 1,
      title: title,
      driveUrl: item.link.replace(/\\u003d/g, "=")
    });
  }
}

console.log("=== DANH SÁCH TÀI LIỆU TOEIC ĐÃ TRÍCH XUẤT ===");
console.log("Tổng cộng:", resources.length, "tài liệu.");
console.table(resources);

fs.writeFileSync("/home/vodailoc/VocabMaster/src/data/tai_lieu_toeic.json", JSON.stringify(resources, null, 2));
console.log("Đã lưu vào src/data/tai_lieu_toeic.json");
