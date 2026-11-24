import { chromium } from 'file:///C:/JurisLPO/juris-consultant-usa/node_modules/.pnpm/playwright-core@1.65.1/node_modules/playwright-core/index.mjs';
const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const p = await b.newPage({ viewport: { width: 1280, height: 800 } });
const errs = [];
p.on('pageerror', (e) => errs.push('PAGEERR ' + e.message));
p.on('console', (m) => { if (m.type() === 'error') errs.push('console ' + m.text().slice(0, 200)); });
const ok = (n, v) => console.log(v ? 'PASS' : 'FAIL', n);
await p.goto('http://localhost:3000/'); await p.waitForTimeout(2500);
// quiz
await p.locator('#quizBox .q-opt').first().click(); await p.waitForTimeout(300);
await p.locator('#quizBox .q-opt').first().click(); await p.waitForTimeout(300);
await p.locator('#quizBox .q-opt').first().click(); await p.waitForTimeout(400);
ok('quiz result', (await p.locator('#quizBox').innerText()).includes('Our suggestion'));
// who tabs
await p.locator('[data-who="1"]').click(); await p.waitForTimeout(200);
ok('who tab', (await p.locator('#whoPanel').innerText()).includes('Import'));
// filter
await p.locator('[data-filter="Run"]').first().click(); await p.waitForTimeout(300);
ok('service filter', (await p.locator('.svc-grid .card.svc').count()) === 4);
// pricing calc
await p.locator('[data-pv="calc"]').first().click(); await p.waitForTimeout(300);
ok('calc visible', await p.locator('#cTotal, .calc').first().isVisible());
// FAQ open
await p.locator('.faq details').nth(1).locator('summary').click();
ok('faq open', await p.locator('.faq details').nth(1).evaluate((e) => e.open));
// mega + nav link navigation
await p.hover('.dd > button'); await p.waitForTimeout(400);
ok('mega visible', await p.locator('#mega a').first().isVisible());
await p.locator('#mega a').first().click(); await p.waitForTimeout(1500);
ok('mega nav -> ' + p.url(), p.url().includes('/services/llc-formation'));
// service state select total
await p.selectOption('#dState', 'Texas'); await p.waitForTimeout(200);
ok('service total texas', (await p.locator('#dTotal').innerText()).includes('559'));
await p.click('#dGo'); await p.waitForTimeout(1500);
ok('start url ' + p.url(), p.url().includes('/start?plan=starter&state=Texas'));
// start flow
await p.fill('#oName', 'Test Founder'); await p.fill('#oEmail', 'test@example.com'); await p.fill('#oPhone', '9876543210');
await p.locator('#ob1 button[type=submit], #ob1 .btn-primary').first().click(); await p.waitForTimeout(500);
ok('start step2', (await p.locator('#ob').innerText()).toLowerCase().includes('plan'));
// contact validation
await p.goto('http://localhost:3000/contact'); await p.waitForTimeout(1500);
await p.click('#contactForm button'); await p.waitForTimeout(300);
ok('contact validation', (await p.locator('#contactForm .field.err').count()) > 0);
// mobile menu
const m = await b.newPage({ viewport: { width: 390, height: 844 } });
await m.goto('http://localhost:3000/'); await m.waitForTimeout(2000);
await m.click('.burger'); await m.waitForTimeout(300);
ok('mobile menu', await m.locator('#mm.open').count() === 1);
console.log('errors:', errs);
await b.close();
