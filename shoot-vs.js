const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const outDir = path.join(__dirname, 'screenshots');
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch();
  // The poster is a fixed 1400x950 canvas; give the viewport some breathing room.
  const page = await browser.newPage({
    viewport: { width: 1440, height: 990 },
    deviceScaleFactor: 2,
  });

  const url = 'file://' + path.join(__dirname, 'o11y-vs-aiops.html');
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  // Full poster
  await page.screenshot({ path: path.join(outDir, 'vs-00-full-page.png'), fullPage: true });

  const shots = [
    { file: 'vs-hero.png', sel: '.header-row' },
    { file: 'vs-bestfor.png', sel: '.bestfor-row' },
    { file: 'vs-bridge.png', sel: '.bridge-center' },
    { file: 'vs-strengths.png', sel: '.strengths-row' },
    { file: 'vs-pipeline.png', sel: '.pipeline-center' },
    { file: 'vs-future-pipeline.png', sel: '.future-row' },
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
