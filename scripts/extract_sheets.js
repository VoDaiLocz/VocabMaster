/**
 * ==============================================================================
 * GOOGLE SHEETS METADATA & LINK EXTRACTOR (TRUSTED-HTML IMMUNE v2.0)
 * Chống lỗi TrustedHTML CSP của Google, trích xuất 100% Text và Hyperlink Drive
 * Chạy trực tiếp trên: Developer Tools Console (F12) của Google Chrome.
 * ==============================================================================
 */

(async function GoogleSheetsExtractor() {
  console.clear();
  console.log("%c[GS-Extractor v2.0] Đang khởi tạo hệ thống trích xuất...", "color: #1a73e8; font-size: 15px; font-weight: bold;");

  const match = window.location.pathname.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  const SPREADSHEET_ID = match ? match[1] : null;
  const urlParams = new URLSearchParams(window.location.hash.replace("#", "?") || window.location.search);
  const GID = urlParams.get("gid") || "0";

  console.log(`%c[Thông tin] Sheet ID: ${SPREADSHEET_ID} | GID: ${GID}`, "color: #5f6368; font-weight: bold;");

  if (!SPREADSHEET_ID) {
    console.error("[Lỗi] Không tìm thấy SPREADSHEET_ID trên URL hiện tại!");
    return;
  }

  const ExtractionResult = {
    metadata: {
      spreadsheetId: SPREADSHEET_ID,
      gid: GID,
      timestamp: new Date().toISOString(),
      extractionMethod: "UNKNOWN"
    },
    rows: []
  };

  function cleanText(str) {
    if (!str) return "";
    return str
      .replace(/<[^>]+>/g, "")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .trim();
  }

  function cleanUrl(rawUrl) {
    if (!rawUrl) return null;
    try {
      if (rawUrl.includes("google.com/url?q=")) {
        const u = new URL(rawUrl);
        return u.searchParams.get("q") || rawUrl;
      }
    } catch (e) {}
    return rawUrl;
  }

  /**
   * TẦNG 1: TRÍCH XUẤT QUA HTMLVIEW BẰNG REGEX (MIỄN NHIỄM TRUSTED-HTML)
   */
  async function tryHtmlViewRegex() {
    console.log("%c[Tầng 1] Đang tải bản HTMLView bằng regex thuần (bỏ qua DOMParser)...", "color: #188038; font-weight: bold;");
    try {
      const htmlUrl = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/htmlview?gid=${GID}`;
      const res = await fetch(htmlUrl, { credentials: "include" });
      if (!res.ok) {
        console.warn(`[Tầng 1] Fetch HTMLView trả về HTTP ${res.status}`);
        return false;
      }

      const html = await res.text();
      console.log(`[Tầng 1] Đã nhận ${html.length} bytes HTML từ server.`);

      const trRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
      const tdRegex = /<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi;
      const linkRegex = /<a\s+[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/i;

      const parsedRows = [];
      let trMatch;
      while ((trMatch = trRegex.exec(html)) !== null) {
        const rowHtml = trMatch[1];
        const cells = [];
        let tdMatch;
        while ((tdMatch = tdRegex.exec(rowHtml)) !== null) {
          const cellHtml = tdMatch[1];
          const linkMatch = cellHtml.match(linkRegex);
          const rawLink = linkMatch ? linkMatch[1] : null;
          const link = cleanUrl(rawLink);
          const text = cleanText(cellHtml);
          cells.push({ text, link });
        }
        if (cells.length > 0) {
          parsedRows.push(cells);
        }
      }

      if (parsedRows.length > 0) {
        console.log(`%c[Tầng 1 Thành công] Đã trích xuất ${parsedRows.length} hàng và toàn bộ liên kết!`, "color: #188038; font-weight: bold;");
        ExtractionResult.metadata.extractionMethod = "HTML_VIEW_REGEX";
        ExtractionResult.rows = parsedRows;
        return true;
      }
    } catch (err) {
      console.warn("[Tầng 1] Thất bại:", err.message);
    }
    return false;
  }

  /**
   * TẦNG 2: TRÍCH XUẤT QUA GVIZ API BẰNG JSON PARSE THUẦN
   */
  async function tryGvizApi() {
    console.log("%c[Tầng 2] Thử trích xuất qua Google Visualization API (/gviz/tq)...", "color: #188038; font-weight: bold;");
    try {
      const gvizUrl = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:json&gid=${GID}`;
      const res = await fetch(gvizUrl, { credentials: "include" });
      if (!res.ok) return false;

      const text = await res.text();
      const jsonMatch = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\);/);
      if (jsonMatch && jsonMatch[1]) {
        const data = JSON.parse(jsonMatch[1]);
        if (data.status === "ok" && data.table && data.table.rows) {
          const rows = [];
          for (const r of data.table.rows) {
            const cells = [];
            if (r.c) {
              for (const c of r.c) {
                if (!c) {
                  cells.push({ text: "", link: null });
                } else {
                  const val = c.f !== undefined ? String(c.f) : (c.v !== null && c.v !== undefined ? String(c.v) : "");
                  const link = (typeof c.v === "string" && /^https?:\/\//i.test(c.v)) ? c.v : null;
                  cells.push({ text: val, link });
                }
              }
            }
            rows.push(cells);
          }
          if (rows.length > 0) {
            ExtractionResult.metadata.extractionMethod = "GVIZ_JSON";
            ExtractionResult.rows = rows;
            return true;
          }
        }
      }
    } catch (e) {
      console.warn("[Tầng 2] GVIZ API lỗi:", e.message);
    }
    return false;
  }

  function downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  let success = await tryHtmlViewRegex();
  if (!success) {
    success = await tryGvizApi();
  }

  if (success && ExtractionResult.rows.length > 0) {
    console.log("%c================ KẾT QUẢ TRÍCH XUẤT THÀNH CÔNG ================", "color: #188038; font-size: 14px; font-weight: bold;");
    console.log(`Phương thức: ${ExtractionResult.metadata.extractionMethod}`);
    console.log(`Tổng số hàng trích xuất: ${ExtractionResult.rows.length}`);
    console.log("Xem trước 5 hàng đầu tiên:");
    console.table(ExtractionResult.rows.slice(0, 5).map(r => r.map(c => c.link ? `${c.text} ➔ [${c.link}]` : c.text)));

    const baseName = `Sheet_${SPREADSHEET_ID.substring(0, 8)}_gid_${GID}`;
    
    // Xuất CSV
    const csvContent = "\uFEFF" + ExtractionResult.rows.map(row => 
      row.map(cell => {
        let val = cell.text || "";
        if (cell.link) val += ` (${cell.link})`;
        return `"${val.replace(/"/g, '""')}"`;
      }).join(",")
    ).join("\r\n");

    downloadFile(csvContent, `${baseName}.csv`, "text/csv;charset=utf-8;");
    downloadFile(JSON.stringify(ExtractionResult, null, 2), `${baseName}.json`, "application/json");

    console.log(`%c[Thành công] Đã tải xuống file: ${baseName}.csv và ${baseName}.json`, "color: #188038; font-size: 14px; font-weight: bold;");
    window.__EXTRACTED_SHEET__ = ExtractionResult;
  } else {
    console.error("%c[Thất bại] Cả 2 tầng đều không lấy được dữ liệu.", "color: #d93025; font-size: 14px; font-weight: bold;");
    console.log("👉 Bạn hãy thử mở trực tiếp liên kết sau trên tab trình duyệt để kiểm tra:");
    console.log(`https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/htmlview?gid=${GID}`);
  }
})();
