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

  const url = 'file://' + path.join(__dirname, 'index.html');
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);

  // Full page
  await page.screenshot({ path: path.join(outDir, '00-full-page.png'), fullPage: true });

  // Section captures via bounding boxes of anchor elements.
  const shots = [
    { file: '01-hero.png', sel: '.hero' },
    { file: '02-decision-matrix.png', sel: '.matrix' },
    { file: '03-signal-flow.png', sel: '.signal-flow' },
    { file: '04-use-cases.png', sel: '.cards' },
    { file: '05-over-engineering-test.png', sel: '.tests' },
    { file: '06-spectrum.png', sel: '.spectrum' },
    { file: '07-anti-patterns.png', sel: '.anti' },
    { file: '08-decision-tree.png', sel: '.tree' },
    { file: '09-cost-comparison.png', sel: '.costs' },
  ];

  for (const s of shots) {
    const el = await page.$(s.sel);
    if (!el) { console.log('MISSING', s.sel); continue; }
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(150);
    await el.screenshot({ path: path.join(outDir, s.file) });
    console.log('OK', s.file);
  }

  await browser.close();
  console.log('DONE');
})();
