import fs from 'fs';
const REPO = 'C:/JurisLPO/juris-consultant-usa';
const src = fs.readFileSync(REPO + '/docs/design/final/Juris_USA_Website_Final_Design.html', 'utf8').split('\n');
const d = JSON.parse(fs.readFileSync('dump.json', 'utf8'));
const SVC = { llc: 'llc-formation', ccorp: 'c-corp-formation', ein: 'ein-tax-registration', agent: 'registered-agent', bank: 'bank-account-assistance', mailbox: 'virtual-address-mailbox', office: 'physical-office-address', books: 'accounting-bookkeeping', warehouse: 'warehousing-fulfilment', compliance: 'compliance-annual-filings', tax: 'us-tax-filing', expert: 'talk-to-an-expert' };
const BLG = { states: 'choosing-a-state', ein: 'ein-without-ssn', cost: 'formation-costs', bank: 'business-banking' };
const ROUTES = { home: '/', services: '/services', pricing: '/pricing', how: '/how-it-works', blogs: '/blog', about: '/about', contact: '/contact', start: '/start', track: '/track-order' };
const mapHref = (h) => {
  const m = h.replace(/^#\/?/, '');
  const [p, qs] = m.split('?');
  const [a, b] = p.split('/');
  let path = ROUTES[a];
  if (a === 'service') path = '/services/' + (SVC[b] || b);
  if (a === 'blog') path = '/blog/' + (BLG[b] || b);
  if (!path) return h;
  return path + (qs ? '?' + qs : '');
};
const conv = (html) =>
  html
    .replace(/<a([^>]*?)href="(#\/[^"]*)"([^>]*?)data-jump="([a-z0-9]+)"/g, (m, a, h, c, j) => `<a${a}href="${mapHref(h).split('?')[0]}#${j}"${c}data-jump="${j}"`)
    .replace(/<a([^>]*?)data-jump="([a-z0-9]+)"([^>]*?)href="(#\/[^"]*)"/g, (m, a, j, c, h) => `<a${a}data-jump="${j}"${c}href="${mapHref(h).split('?')[0]}#${j}"`)
    .replace(/(href|data-go)="(#\/[^"]*)"/g, (m, k, h) => `${k}="${mapHref(h)}"`);
const exp = (n, o) => `export const ${n}: ${typeof o === 'string' ? 'string' : 'Record<string, string>'} = ${JSON.stringify(o)};\n`;
let ts = '/* AUTO-GENERATED from docs/design/final/Juris_USA_Website_Final_Design.html (see docs/WORK_MEMORY.md). Do not hand-edit. */\n';
const pages = {};
for (const [k, v] of Object.entries(d.pages)) pages[k] = conv(v);
ts += exp('FINAL_PAGES', pages);
const svc = {};
for (const [id, v] of Object.entries(d.service)) svc[SVC[id]] = conv(v);
ts += exp('FINAL_SERVICES', svc);
const blg = {};
for (const [id, v] of Object.entries(d.blog)) blg[BLG[id]] = conv(v);
ts += exp('FINAL_BLOGS', blg);
ts += exp('FINAL_MEGA', conv(d.mega));
fs.writeFileSync(REPO + '/apps/web/components/marketing/final/generated.ts', ts);

// CSS: lines 10..910 of the HTML (inside <style>)
const css = src.slice(9, 910).join('\n');
const root = ':root{' + d.rootStyle + '}\n';
fs.writeFileSync(
  REPO + '/apps/web/public/final.css',
  '/* AUTO-GENERATED from the final design HTML. Theme 11 (Obsidian Neon Blue) variables are appended last. */\n' +
    css.replace(/^<style>\n?/, '') + '\n' + root + '.demo-bar,#recp,#animp,#drawer,#scrim,.gal-link,.chg{display:none!important}\n',
);

// Runtime: script lines 995..2270
let js = src.slice(994, 2270).join('\n');
const i1 = js.indexOf('/* ================= DEMO ================= */');
if (i1 < 0) throw new Error('no demo marker');
js = js.slice(0, i1);
js = js.replace(
  /function parseHash\(\)\{[^\n]*\n/,
  "function parseHash(){const a=document.getElementById('app');return {page:(a&&a.dataset.page)||'home',arg:a&&a.dataset.arg,params:new URLSearchParams(location.search)};}\n",
);
js += `
/* ================= MOUNT (real URLs; markup is server-rendered) ================= */
(function(){
 const {page,arg,params}=parseHash();
 if(page==='start'){if(params.get('plan')&&PLANS[params.get('plan')])state.plan=params.get('plan');if(params.get('state')&&STATES.some(s=>s.n===params.get('state')))state.st=params.get('state');}
 const sc=document.getElementById('stickyCta');
 const stick=()=>{if(sc)sc.classList.toggle('show',window.scrollY>700&&page==='home');};
 window.addEventListener('scroll',stick,{passive:true});stick();
 const bg=document.querySelector('.burger');if(bg)bg.addEventListener('click',()=>document.getElementById('mm').classList.toggle('open'));
 const ROUTES=${JSON.stringify(ROUTES)};
 const SV=${JSON.stringify(SVC)},BL=${JSON.stringify(BLG)};
 const toPath=h=>{const m=h.replace(/^#\\/?/,''),q=m.split('?'),pp=q[0].split('/');let p=ROUTES[pp[0]];if(pp[0]==='service')p='/services/'+(SV[pp[1]]||pp[1]);if(pp[0]==='blog')p='/blog/'+(BL[pp[1]]||pp[1]);return p?p+(q[1]?'?'+q[1]:''):null;};
 document.addEventListener('click',e=>{const a=e.target.closest&&e.target.closest('a[href^="#/"]');if(!a)return;const p=toPath(a.getAttribute('href'));if(!p)return;e.preventDefault();const j=a.dataset.jump;
  if(j&&location.pathname===p.split('?')[0]){const el=document.getElementById(j);if(el)el.scrollIntoView({behavior:'smooth'});return;}location.href=p+(j?'#'+j:'');});
 window.addEventListener('hashchange',()=>{if(location.hash.indexOf('#/')===0){const p=toPath(location.hash);if(p){history.replaceState(null,'',location.pathname+location.search);location.href=p;}}});
 $$('.menu > a').forEach(a=>a.classList.toggle('active',a.dataset.nav===page));
 bindPage(page,arg);observe();initStory();fxUpdate();fx2(document);
})();
`;
js = js.replace(/\$\('#selHero'\)\.value=[^;]*;/g, '');
fs.writeFileSync(
  REPO + '/apps/web/public/final-runtime.js',
  '/* AUTO-GENERATED runtime ported from the final design HTML (canvas and scroll animations unchanged). */\n(function(){\n' + js + '\n})();\n',
);
console.log('done', ts.length, js.length);
