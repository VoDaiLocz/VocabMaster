const fs = require("fs");
const path = "/home/vodailoc/Downloads/Tài liệu TOEIC.xlsx_raw.html";
if (!fs.existsSync(path)) {
  console.log("File không tồn tại");
  process.exit(1);
}
const content = fs.readFileSync(path, "utf8");
console.log("Dung lượng:", content.length);

const driveLinks = Array.from(new Set(content.match(/https?:\/\/(?:drive|docs)\.google\.com\/[^\s"'\\]+/g) || []));
console.log("Số link Drive trong file:", driveLinks.length);
console.log("Mẫu 10 link:", driveLinks.slice(0, 10));

const unescaped = content.replace(/\\"/g, "\"").replace(/\\\\/g, "\\");
const regexItem = /\{"2":(\d+),"3":(?:\[2,"([^"]+)"\]|\{"1":\d+,"3":([\d.]+)\})(?:,"6":\d+)?(?:,"24":"([^"]+)")?/g;

const items = [];
let match;
while ((match = regexItem.exec(unescaped)) !== null) {
  const textVal = match[2] !== undefined ? match[2] : match[3];
  const linkVal = match[4] || null;
  items.push({ text: textVal, link: linkVal });
}
console.log("Số cell trích xuất:", items.length);
console.log("Mẫu 15 cell đầu:", items.slice(0, 15));
