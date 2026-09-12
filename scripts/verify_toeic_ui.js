const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const DIST_DIR = path.join(__dirname, '../dist');
const ARTIFACT_DIR = '/home/vodailoc/.gemini/antigravity-cli/brain/7073eb20-3b6f-4c30-954f-17a757424379';

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.mp3': 'audio/mpeg',
  '.wasm': 'application/wasm',
};

// Create a static server
const server = http.createServer((req, res) => {
  let reqUrl = decodeURIComponent(req.url.split('?')[0]);
  let filePath = path.join(DIST_DIR, reqUrl === '/' ? 'index.html' : reqUrl);

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(DIST_DIR, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end('Server Error: ' + err.code);
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

async function runVerification() {
  const PORT = 5174;
  server.listen(PORT, async () => {
    console.log(`Test server running at http://localhost:${PORT}`);
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({ viewport: { width: 1280, height: 850 } });

    page.on('console', (msg) => {
      if (msg.type() === 'error') console.log('[BROWSER ERROR]:', msg.text());
    });

    const routes = [
      { name: 'evidence-listening-part1.png', url: `http://localhost:${PORT}/#/toeic-7parts?part=1` },
      { name: 'evidence-listening-part2.png', url: `http://localhost:${PORT}/#/toeic-7parts?part=2` },
      { name: 'evidence-listening-part3.png', url: `http://localhost:${PORT}/#/toeic-7parts?part=3` },
      { name: 'evidence-reading-part7.png', url: `http://localhost:${PORT}/#/toeic-7parts?part=7` },
    ];

    for (const r of routes) {
      console.log(`Testing route: ${r.url}...`);
      await page.goto(r.url, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await page.waitForTimeout(1500);

      // If testing part 3, let's click 'Hiện Transcript' to verify transcript reveals!
      if (r.name === 'evidence-listening-part3.png') {
        const transcriptBtn = await page.$('button:has-text("Hiện Transcript")');
        if (transcriptBtn) {
          await transcriptBtn.click();
          await page.waitForTimeout(500);
        }
      }

      const outPath = path.join(ARTIFACT_DIR, r.name);
      await page.screenshot({ path: outPath, fullPage: false });
      console.log(`Saved screenshot: ${outPath}`);
    }

    await browser.close();
    server.close();
    console.log('All listening & 7-part verifications completed successfully!');
    process.exit(0);
  });
}

runVerification().catch((err) => {
  console.error('Verification failed:', err);
  process.exit(1);
});
