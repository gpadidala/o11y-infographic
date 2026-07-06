const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const outDir = path.join(__dirname, 'screenshots');
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1040, height: 900 },
    deviceScaleFactor: 2,
  });

  const url = 'file://' + path.join(__dirname, 'o11y-vs-aiops.html');
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  // Full page
  await page.screenshot({ path: path.join(outDir, 'vs-00-full-page.png'), fullPage: true });

  const shots = [
    { file: 'vs-hero.png', sel: '.hero' },
    { file: 'vs-comparison.png', sel: '.comparison' },
    { file: 'vs-o11y-panel.png', sel: '.panel-o11y' },
    { file: 'vs-aiops-panel.png', sel: '.panel-aiops' },
    { file: 'vs-bridge.png', sel: '.bridge-section' },
    { file: 'vs-future-pipeline.png', sel: '.future-section' },
    { file: 'vs-footer.png', sel: '.footer' },
  ];

  for (const s of shots) {
    const el = await page.$(s.sel);
    if (!el) { console.log('MISSING', s.sel); continue; }
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    await el.screenshot({ path: path.join(outDir, s.file) });
    console.log('OK', s.file);
  }

  await browser.close();
  console.log('DONE');
})();
