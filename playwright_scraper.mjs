import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  try {
    console.log("Navigating to YouTube...");
    await page.goto('https://www.youtube.com/watch?v=fu4p96ca5H4', { waitUntil: 'domcontentloaded' });
    
    // Đợi một chút
    await page.waitForTimeout(3000);
    
    // Thử click nút Accept Cookies nếu có
    try {
      const rejectAll = await page.$('button[aria-label="Reject all"]');
      if (rejectAll) await rejectAll.click();
    } catch(e) {}

    console.log("Looking for description expand...");
    // Mở phần description
    const moreBtn = await page.$('tp-yt-paper-button#expand');
    if (moreBtn) await moreBtn.click();
    
    await page.waitForTimeout(1000);
    
    console.log("Looking for Show Transcript button...");
    // Bấm nút Show Transcript
    const transcriptBtn = await page.$('button[aria-label="Show transcript"]');
    if (transcriptBtn) {
        await transcriptBtn.click();
        console.log("Clicked! Waiting for transcript panel...");
        
        await page.waitForSelector('ytd-transcript-segment-renderer', { timeout: 10000 });
        
        const segments = await page.$$eval('ytd-transcript-segment-renderer', (nodes) => {
            return nodes.map(n => ({
                time: n.querySelector('.segment-timestamp')?.innerText.trim(),
                text: n.querySelector('.segment-text')?.innerText.trim()
            }));
        });
        
        console.log("SUCCESS! Got", segments.length, "segments");
        console.log(segments.slice(0, 5));
    } else {
        console.log("Transcript button not found.");
        const html = await page.content();
        if (html.includes('unavailable') || html.includes('automated')) {
            console.log("IP BLOCKED BY YOUTUBE!");
        }
    }
  } catch (e) {
    console.error("Error:", e);
  } finally {
    await browser.close();
  }
})();
