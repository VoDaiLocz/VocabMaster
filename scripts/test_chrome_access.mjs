import { chromium } from 'playwright';

async function main() {
  console.log('Launching browser with persistent context...');
  const context = await chromium.launchPersistentContext('/home/vodailoc/.config/google-chrome', {
    executablePath: '/usr/bin/google-chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = context.pages().length > 0 ? context.pages()[0] : await context.newPage();
  
  const url1 = 'https://docs.google.com/spreadsheets/d/186zD9xpUpIHsZlol6uoO0_HIa9b6x8W6/edit?usp=drive_link';
  console.log('Navigating to Sheet 1:', url1);
  try {
    await page.goto(url1, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(5000);
  } catch (err) {
    console.log('Navigation warning:', err.message);
  }

  const title = await page.title();
  const currentUrl = page.url();
  console.log('Current URL:', currentUrl);
  console.log('Page Title:', title);

  await page.screenshot({ path: '/home/vodailoc/.gemini/antigravity-cli/brain/7073eb20-3b6f-4c30-954f-17a757424379/scratch/sheet1_access.png' });
  console.log('Screenshot saved to sheet1_access.png');

  await context.close();
}

main().catch(console.error);
