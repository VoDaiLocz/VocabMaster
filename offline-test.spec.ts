import { test, expect } from '@playwright/test';

test('Android Offline Fallback renders SE video correctly', async ({ page }) => {
  // 1. Chặn request ra internet để ép lỗi Invidious
  await page.route('**/*', (route) => {
    const url = route.request().url();
    if (url.includes('localhost') || url.includes('127.0.0.1')) {
      route.continue();
    } else {
      route.abort(); 
    }
  });

  // 2. Ép mode Web/Android (ko có electron)
  await page.addInitScript(() => {
    window.electronAPI = undefined; 
  });

  // 3. Truy cập thẳng video (Hash Router)
  await page.goto('http://localhost:5173/#/video/fu4p96ca5H4', { waitUntil: 'networkidle' });
  
  // 4. Chờ cue item render (fake data)
  await page.waitForSelector('.border.transition-all', { timeout: 15000 });
  await page.waitForTimeout(2000); // render UI đầy đủ

  // 5. Chụp ảnh minh chứng
  await page.screenshot({ path: 'offline-se-video-evidence.png' });

  const cues = await page.$$('.border.transition-all');
  expect(cues.length).toBeGreaterThan(0);
});
