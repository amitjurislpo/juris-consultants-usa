import { chromium } from 'file:///C:/JurisLPO/juris-consultant-usa/node_modules/.pnpm/playwright-core@1.65.1/node_modules/playwright-core/index.mjs';
import fs from 'fs';
const REF = 'file:///C:/JurisLPO/juris-consultant-usa/docs/design/final/Juris_USA_Website_Final_Design.html#';
const APP = 'http://localhost:3000';
const pairs = [
  ['/home', '/'], ['/services', '/services'], ['/service/llc', '/services/llc-formation'], ['/service/ccorp', '/services/c-corp-formation'],
  ['/service/ein', '/services/ein-tax-registration'], ['/service/agent', '/services/registered-agent'], ['/service/expert', '/services/talk-to-an-expert'],
  ['/pricing', '/pricing'], ['/how', '/how-it-works'], ['/blogs', '/blog'], ['/blog/states', '/blog/choosing-a-state'], ['/about', '/about'],
  ['/contact', '/contact'], ['/start', '/start'], ['/track', '/track-order'],
];
const only = process.argv[2];
const sizes = process.argv[3] === 'm' ? [{ width: 390, height: 844 }] : [{ width: 1280, height: 800 }];
const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const cmpPage = await b.newPage();
const diff = async (a, c) => cmpPage.evaluate(async ([a, c]) => {
  const load = (s) => new Promise((r) => { const i = new Image(); i.onload = () => r(i); i.src = 'data:image/png;base64,' + s; });
  const [ia, ic] = await Promise.all([load(a), load(c)]);
  const w = Math.min(ia.width, ic.width), h = Math.min(ia.height, ic.height);
  const g = (im) => { const cv = document.createElement('canvas'); cv.width = w; cv.height = h; const x = cv.getContext('2d'); x.drawImage(im, 0, 0); return x.getImageData(0, 0, w, h).data; };
  const da = g(ia), dc = g(ic); let n = 0;
  for (let i = 0; i < da.length; i += 4) if (Math.abs(da[i] - dc[i]) + Math.abs(da[i + 1] - dc[i + 1]) + Math.abs(da[i + 2] - dc[i + 2]) > 60) n++;
  return +(100 * n / (w * h)).toFixed(2);
}, [a, c]);
for (const vp of sizes) {
  for (const [rh, ap] of pairs) {
    if (only && only !== 'all' && !rh.includes(only)) continue;
    const pr = await b.newPage({ viewport: vp }); const pa = await b.newPage({ viewport: vp });
    await pr.goto(REF + rh); await pa.goto(APP + ap);
    await pr.waitForTimeout(1500); await pa.waitForTimeout(2000);
    const hr = await pr.evaluate(() => document.documentElement.scrollHeight), ha = await pa.evaluate(() => document.documentElement.scrollHeight);
    const res = [];
    const maxY = Math.min(hr, ha) - vp.height;
    const step = vp.height * 0.9;
    for (let y = 0; y <= maxY + 1 && res.length < 14; y += step) {
      await pr.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), y); await pa.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), y);
      await pr.waitForTimeout(900); await pa.waitForTimeout(900);
      const s1 = (await pr.screenshot()).toString('base64'), s2 = (await pa.screenshot()).toString('base64');
      const d = await diff(s1, s2); res.push(d);
      if (d > 3) { fs.writeFileSync(`d-${vp.width}-${rh.replace(/\//g, '_')}-${Math.round(y)}-ref.png`, Buffer.from(s1, 'base64')); fs.writeFileSync(`d-${vp.width}-${rh.replace(/\//g, '_')}-${Math.round(y)}-app.png`, Buffer.from(s2, 'base64')); }
    }
    console.log(vp.width, rh, 'h', hr, ha, 'diff%', res.join(' '));
    await pr.close(); await pa.close();
  }
}
await b.close();
