import { chromium } from 'playwright-core';
const url = process.argv[2] || 'http://localhost:3100/';
const out = process.argv[3];
const width = parseInt(process.argv[4] || '1440');
const fullPage = process.argv[5] !== 'noscroll';
const scrollBottom = process.argv[6] === 'bottom';
const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', headless: true });
const page = await browser.newPage({ viewport: { width, height: 900 } });
await page.goto(url, { waitUntil: 'networkidle' });
// wait for preloader to finish
await page.waitForFunction(() => !document.body.innerText.includes('LOADING'), { timeout: 30000 }).catch(()=>{});
await page.waitForTimeout(2500);
if (scrollBottom) {
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1500);
  await page.screenshot({ path: out });
} else {
  await page.screenshot({ path: out, fullPage });
}
await browser.close();
console.log('saved', out);
