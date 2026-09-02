# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: offline-test.spec.ts >> Android Offline Fallback renders SE video correctly
- Location: offline-test.spec.ts:3:5

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5173/#/video/fu4p96ca5H4
Call log:
  - navigating to "http://localhost:5173/#/video/fu4p96ca5H4", waiting until "networkidle"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('Android Offline Fallback renders SE video correctly', async ({ page }) => {
  4  |   // 1. Chặn request ra internet để ép lỗi Invidious
  5  |   await page.route('**/*', (route) => {
  6  |     const url = route.request().url();
  7  |     if (url.includes('localhost') || url.includes('127.0.0.1')) {
  8  |       route.continue();
  9  |     } else {
  10 |       route.abort(); 
  11 |     }
  12 |   });
  13 | 
  14 |   // 2. Ép mode Web/Android (ko có electron)
  15 |   await page.addInitScript(() => {
  16 |     window.electronAPI = undefined; 
  17 |   });
  18 | 
  19 |   // 3. Truy cập thẳng video (Hash Router)
> 20 |   await page.goto('http://localhost:5173/#/video/fu4p96ca5H4', { waitUntil: 'networkidle' });
     |              ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5173/#/video/fu4p96ca5H4
  21 |   
  22 |   // 4. Chờ cue item render (fake data)
  23 |   await page.waitForSelector('.border.transition-all', { timeout: 15000 });
  24 |   await page.waitForTimeout(2000); // render UI đầy đủ
  25 | 
  26 |   // 5. Chụp ảnh minh chứng
  27 |   await page.screenshot({ path: 'offline-se-video-evidence.png' });
  28 | 
  29 |   const cues = await page.$$('.border.transition-all');
  30 |   expect(cues.length).toBeGreaterThan(0);
  31 | });
  32 | 
```