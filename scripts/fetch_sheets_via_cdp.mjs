import { spawn } from 'child_process';
import { chromium } from 'playwright';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function waitForPort(port, timeoutMs = 20000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (res.ok) {
        return await res.json();
      }
    } catch {}
    await sleep(500);
  }
  throw new Error(`Port ${port} did not become ready in ${timeoutMs}ms`);
}

async function main() {
  console.log('Spawning Chrome with profile in /tmp/chrome_auto...');
  const chromeProcess = spawn('/usr/bin/google-chrome', [
    '--user-data-dir=/tmp/chrome_auto',
    '--remote-debugging-port=9222',
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    'about:blank'
  ], {
    env: {
      ...process.env,
      DISPLAY: ':0',
      DBUS_SESSION_BUS_ADDRESS: 'unix:path=/run/user/1000/bus'
    },
    stdio: 'ignore'
  });

  try {
    console.log('Waiting for DevTools port 9222...');
    const versionInfo = await waitForPort(9222);
    console.log('DevTools ready! WebSocket URL:', versionInfo.webSocketDebuggerUrl);

    console.log('Connecting Playwright over CDP...');
    const browser = await chromium.connectOverCDP('http://127.0.0.1:9222');
    const context = browser.contexts()[0] || await browser.newContext();
    const page = context.pages()[0] || await context.newPage();

    console.log('Navigating to Sheet 1...');
    const url1 = 'https://docs.google.com/spreadsheets/d/186zD9xpUpIHsZlol6uoO0_HIa9b6x8W6/edit?usp=drive_link';
    await page.goto(url1, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.waitForTimeout(6000);

    console.log('Sheet 1 URL:', page.url());
    console.log('Sheet 1 Title:', await page.title());
    await page.screenshot({ path: '/home/vodailoc/.gemini/antigravity-cli/brain/7073eb20-3b6f-4c30-954f-17a757424379/scratch/sheet1_cdp.png' });

    console.log('Navigating to Sheet 2...');
    const url2 = 'https://docs.google.com/spreadsheets/d/15LEfRffN1xzoWtQLu4H6d5efNkBv_V1d/edit?usp=drive_link';
    await page.goto(url2, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.waitForTimeout(6000);

    console.log('Sheet 2 URL:', page.url());
    console.log('Sheet 2 Title:', await page.title());
    await page.screenshot({ path: '/home/vodailoc/.gemini/antigravity-cli/brain/7073eb20-3b6f-4c30-954f-17a757424379/scratch/sheet2_cdp.png' });

    await browser.close();
  } finally {
    console.log('Killing spawned Chrome process...');
    chromeProcess.kill('SIGKILL');
  }
}

main().catch(err => {
  console.error('Execution error:', err);
  process.exit(1);
});
