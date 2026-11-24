/* AUTO-GENERATED runtime ported from the final design HTML (canvas and scroll animations unchanged). */
(function(){
/* ================= THEMES (10) ================= */
const THEMES = [
 {n:'Royal Navy & Gold',d:'Trust + premium, serif headlines',v:{navy:'#0A1630',navy2:'#13224A',blue:'#1D3F9E',  'blue-d':'#152F78','blue-50':'#EEF2FB','blue-100':'#D9E1F5',soft:'#F7F6F1',amber:'#C9A227','amber-50':'#FBF6E6','amber-d':'#7A5F0E','on-dark-accent':'#E6C766','dark-line':'#2A3B66','dark-line2':'#1C2B52','on-primary-muted':'#DCE4FA',grad:'linear-gradient(135deg,#1D3F9E,#0A1630)',head:"'Fraunces',Georgia,serif",sans:"Inter,system-ui,sans-serif",hw:'600','r-card':'16px','btn-r':'10px'}},
 {n:'Midnight Indigo',d:'Modern SaaS, gradient buttons',v:{navy:'#0F0B2E',navy2:'#1B1650',blue:'#4F46E5','blue-d':'#3730A3','blue-50':'#EEF0FF','blue-100':'#DCDDFE',soft:'#F6F5FF',amber:'#06B6D4','amber-50':'#E6FAFD','amber-d':'#0E7490','on-dark-accent':'#A5B4FC','dark-line':'#3A3480','dark-line2':'#2A2563','on-primary-muted':'#E0E7FF',grad:'linear-gradient(135deg,#4F46E5,#06B6D4)','btn-bg':'linear-gradient(135deg,#4F46E5,#0891B2)',head:"'Sora',system-ui,sans-serif",sans:"Inter,system-ui,sans-serif",hw:'700','r-card':'20px','btn-r':'12px'}},
 {n:'Emerald Trust',d:'Calm, financial, reassuring',v:{navy:'#052E2B',navy2:'#0B3F3A',blue:'#047857','blue-d':'#065F46','blue-50':'#ECFDF5','blue-100':'#D1FAE5',soft:'#F3FAF7',amber:'#F59E0B','amber-50':'#FFF7E6','amber-d':'#92400E','on-dark-accent':'#6EE7B7','dark-line':'#1F5A53','dark-line2':'#134A44','on-primary-muted':'#D1FAE5',grad:'linear-gradient(135deg,#047857,#0D9488)',head:"'Manrope',system-ui,sans-serif",sans:"'Manrope',system-ui,sans-serif",hw:'800','r-card':'18px','btn-r':'12px'}},
 {n:'Ocean Blue (current brand)',d:'Our white-blue, refined',v:{navy:'#0B1B3F',navy2:'#13285A',blue:'#1D4ED8','blue-d':'#1E3A8A','blue-50':'#EFF4FF','blue-100':'#DCE6FB',soft:'#F5F8FF',amber:'#F59E0B','amber-50':'#FFF7E6','amber-d':'#92400E','on-dark-accent':'#93B4FF','dark-line':'#3B5287','dark-line2':'#22335C','on-primary-muted':'#DBEAFE',grad:'linear-gradient(135deg,#1D4ED8,#6366F1)',head:"'Plus Jakarta Sans',system-ui,sans-serif",sans:"Inter,system-ui,sans-serif",hw:'800','r-card':'18px','btn-r':'12px'}},
 {n:'Charcoal & Coral',d:'Bold, confident, startup',v:{navy:'#111827',navy2:'#1F2937',blue:'#C2410C','blue-d':'#9A3412','blue-50':'#FFF4ED','blue-100':'#FED7C3',soft:'#FAF7F5',amber:'#FB923C','amber-50':'#FFF7ED','amber-d':'#9A3412','on-dark-accent':'#FDBA74','dark-line':'#374151','dark-line2':'#2B3442','on-primary-muted':'#FFEDD5',grad:'linear-gradient(135deg,#C2410C,#BE123C)',head:"'Outfit',system-ui,sans-serif",sans:"Inter,system-ui,sans-serif",hw:'700','r-card':'14px','btn-r':'10px'}},
 {n:'Saffron India',d:'Warm, Indian, classic serif',v:{navy:'#1C1917',navy2:'#292524',blue:'#B45309','blue-d':'#92400E','blue-50':'#FFF7ED','blue-100':'#FDE7C7',soft:'#FFFBF3',amber:'#15803D','amber-50':'#ECFDF3','amber-d':'#14532D','on-dark-accent':'#FCD34D','dark-line':'#44403C','dark-line2':'#36302B','on-primary-muted':'#FEF3C7',grad:'linear-gradient(135deg,#B45309,#9A3412)',head:"'DM Serif Display',Georgia,serif",sans:"'DM Sans',system-ui,sans-serif",hw:'400','r-card':'12px','btn-r':'10px'}},
 {n:'Royal Purple Luxe',d:'Luxury, elegant serif',v:{navy:'#1E1033',navy2:'#2E1A4D',blue:'#6D28D9','blue-d':'#5B21B6','blue-50':'#F5F0FF','blue-100':'#E6DBFE',soft:'#FAF7FF',amber:'#D4AF37','amber-50':'#FBF6E3','amber-d':'#7A6212','on-dark-accent':'#E9D5FF','dark-line':'#4A2E73','dark-line2':'#3A235C','on-primary-muted':'#EDE9FE',grad:'linear-gradient(135deg,#6D28D9,#BE185D)','btn-bg':'linear-gradient(135deg,#6D28D9,#9D174D)',head:"'Playfair Display',Georgia,serif",sans:"Inter,system-ui,sans-serif",hw:'700','r-card':'18px','btn-r':'999px'}},
 {n:'Teal Fintech',d:'Techy, crisp, fintech',v:{navy:'#062A35',navy2:'#0B3A47',blue:'#0E7490','blue-d':'#155E75','blue-50':'#ECFEFF','blue-100':'#CFF5FA',soft:'#F2FAFB',amber:'#84CC16','amber-50':'#F4FBE6','amber-d':'#3F6212','on-dark-accent':'#67E8F9','dark-line':'#1D5563','dark-line2':'#144652','on-primary-muted':'#CFFAFE',grad:'linear-gradient(135deg,#0E7490,#0F766E)',head:"'Space Grotesk',system-ui,sans-serif",sans:"Inter,system-ui,sans-serif",hw:'700','r-card':'12px','btn-r':'8px'}},
 {n:'Monochrome Minimal',d:'Apple-like black & white',v:{navy:'#0A0A0A',navy2:'#1A1A1A',blue:'#171717','blue-d':'#000000','blue-50':'#F4F4F5','blue-100':'#E4E4E7',soft:'#FAFAF9',amber:'#2563EB','amber-50':'#EFF6FF','amber-d':'#1E40AF','on-dark-accent':'#D4D4D8','dark-line':'#3F3F46','dark-line2':'#27272A','on-primary-muted':'#E4E4E7',grad:'linear-gradient(135deg,#171717,#3F3F46)',head:"'Inter Tight',Inter,system-ui,sans-serif",sans:"Inter,system-ui,sans-serif",hw:'800','r-card':'10px','btn-r':'999px'}},
 {n:'Sky & Sunset',d:'Friendly, energetic gradient',v:{navy:'#0C1A3A',navy2:'#15275A',blue:'#2563EB','blue-d':'#1D4ED8','blue-50':'#EFF6FF','blue-100':'#DBEAFE',soft:'#F5F9FF',amber:'#F97316','amber-50':'#FFF4EC','amber-d':'#9A3412','on-dark-accent':'#FDBA74','dark-line':'#2C4280','dark-line2':'#1F3366','on-primary-muted':'#DBEAFE',grad:'linear-gradient(135deg,#2563EB,#F97316)','btn-bg':'linear-gradient(135deg,#2563EB,#C2410C)',head:"'Urbanist',system-ui,sans-serif",sans:"'Urbanist',system-ui,sans-serif",hw:'800','r-card':'24px','btn-r':'14px'}}
];
const LAYOUTS_OLD = [
 ['Classic','Clean sections, alternating light backgrounds'],
 ['Bento grid','Big featured tiles for services and stats'],
 ['Dark luxury','Whole site dark with gold/accent lines'],
 ['Editorial','Numbered sections, left headings, magazine feel'],
 ['Glass gradient','Soft colour glow behind frosted cards'],
 ['Swiss minimal','Lots of white space, sharp corners, hairlines'],
 ['Conversion-first','Pricing right after hero + sticky “Launch” bar'],
 ['Storytelling','Journey first, alternating left/right sections'],
 ['Soft cards','Grey canvas with floating white cards'],
 ['Bold bands','Gradient and dark bands for key sections']
];

/* ================= DATA (from current website) ================= */
const SERVICES = {
  llc:{name:'US LLC Formation',group:'Start',price:'$249',unit:'+ state fee',time:'~7 business days',desc:'LLC in Delaware, Wyoming, Texas and 6 more states. The simplest way to own a US company from India.',who:'E-commerce sellers, IT services, freelancers and consultants billing US clients.',incl:['Name availability check (LLC)','Articles of organization','Basic operating agreement','State filing','Email support'],good:['You don’t need to be a US citizen or visit the US','Owners can live in India','EIN is a separate step ($80)','Not sure LLC is right? Take the quiz or talk to an expert'],plan:'starter'},
  ccorp:{name:'US C-Corp Formation',group:'Start',price:'$849',unit:'+ state fee',time:'~7 business days',desc:'C-Corporation for startups that plan to raise money from investors.',who:'Startups and founders planning to raise investment or issue shares.',incl:['Name availability check for C-Corp','C-Corp formation','Bylaws & certificates','Articles of incorporation','Registered agent (1 year)','EIN included','State filing'],good:['Investors usually prefer a Delaware C-Corp','You can issue shares to co-founders','Owners can live in India'],plan:'premium'},
  ein:{name:'EIN & Tax Registration',group:'Start',price:'$80',unit:'one-time',time:'[timeline to confirm]',desc:'Your US tax ID from the IRS — needed for a bank account, payments and taxes.',who:'Every new US company, and existing companies without an EIN.',incl:['Preparation of IRS Form SS-4','Filing with the IRS','EIN letter shared in your dashboard'],good:['No SSN needed','Required to open a US bank account']},
  agent:{name:'Registered Agent',group:'Start',price:'[Price]',unit:'per year',time:'Yearly',desc:'The official address in your state where legal notices are received.',who:'Every US company (required in each state).',incl:['Registered address in your state','Legal notices scanned & forwarded','Compliance reminders'],good:['Included for 1 year in the Premium plan']},
  bank:{name:'Bank Account Assistance',group:'Run',price:'$100',unit:'one-time',time:'After EIN',desc:'Help opening a US business bank account, step by step.',who:'New companies that have their EIN.',incl:['Document checklist','Application support','Follow-up until approved'],good:['Needs your EIN first']},
  mailbox:{name:'Virtual Address & Mailbox',group:'Run',price:'$25',unit:'per month',time:'Monthly',desc:'A US mailing address with scanned mail in your dashboard.',who:'Founders who need a US address for mail and websites.',incl:['US mailing address','Mail scanned and uploaded','Forwarding on request'],good:['Cancel any time <span class="ph">[confirm terms]</span>']},
  office:{name:'Physical Office Address',group:'Run',price:'$200',unit:'per month',time:'Monthly',desc:'A real office address for bank and platform verifications.',who:'Sellers and companies that need a verifiable physical address.',incl:['Physical US office address','Usable for verifications'],good:['Useful for marketplace and bank checks']},
  books:{name:'Accounting & Bookkeeping',group:'Run',price:'$200',unit:'per month',time:'Monthly',desc:'Monthly books kept by our accounting team.',who:'Companies with regular US income and expenses.',incl:['Monthly bookkeeping','Reports in your dashboard','Year-end ready books'],good:['Makes tax filing simple']},
  warehouse:{name:'Warehousing & Fulfilment',group:'Grow',price:'$49',unit:'one-time',time:'[timeline to confirm]',desc:'Store and ship your products from New York, Texas or California.',who:'E-commerce and import-export sellers shipping to US customers.',incl:['Warehousing in NY, TX or CA','Order processing & fulfilment','<span class="ph">[What the $49 covers vs ongoing fees]</span>'],good:['Only warehousing questions are asked — no company-formation form'],plan:'warehouse'},
  compliance:{name:'Compliance & Annual Filings',group:'Grow',price:'[Price]',unit:'per year',time:'Yearly',desc:'Annual reports and state filings, done on time.',who:'Every active US company.',incl:['Annual report filing','Deadline reminders'],good:['Avoid state penalties']},
  tax:{name:'US Tax Filing',group:'Grow',price:'[Price]',unit:'per year',time:'Yearly',desc:'Federal and state tax returns for your US company.',who:'Every US company with an EIN.',incl:['Federal return','State return where needed'],good:['Prepared with your bookkeeping data']},
  expert:{name:'Talk to an Expert',group:'Help',price:'$49',unit:'30 minutes',time:'30 min call',desc:'A paid 30-minute call to plan your structure, state and next steps.',who:'Anyone unsure which company type or state to choose.',incl:['30-minute video call','Structure & state recommendation','Written next steps'],good:['Booked after payment']}
};
const STATES = [{n:'Wyoming',fee:103.75},{n:'Texas',fee:310},{n:'Delaware',fee:90},{n:'Florida',fee:125},{n:'Nevada',fee:425},{n:'New York',fee:200},{n:'California',fee:70},{n:'New Mexico',fee:50},{n:'Washington',fee:200}];
const PLANS = {
  starter:{name:'Starter',sub:'LLC',price:249,who:'Freelancers, IT services and e-commerce sellers.',incl:['Name availability check (LLC)','Articles of organization','Basic operating agreement','State filing','Email support'],not:['EIN ($80 extra)','Registered agent'],form:true},
  premium:{name:'Premium',sub:'C-Corp',price:849,rec:true,who:'Startups planning to raise money from investors.',incl:['Name availability check for C-Corp','C-Corp formation','Bylaws & certificates','Articles of incorporation','Registered agent (1 year)','EIN included'],not:[],form:true},
  warehouse:{name:'Warehousing',sub:'Fulfilment',price:49,who:'Sellers shipping products to US customers.',incl:['Warehousing in NY, TX or CA','Order processing & fulfilment'],not:[],form:false}
};
const ADDONS = [{id:'ein',n:'EIN (US tax ID)',one:80},{id:'bank',n:'Bank account assistance',one:100},{id:'mail',n:'Virtual mailbox',mo:25},{id:'books',n:'Bookkeeping',mo:200},{id:'office',n:'Physical office address',mo:200}];
const CHANGES = [
  [1,'Sticky glass header + Services mega-menu','home','top','Phone, “Talk to an Expert” and “Launch” always visible.'],
  [2,'Hero — 20 designs (switch in the toolbar)','home','hero','See all 20 together in the Design gallery.'],
  [3,'Real trust strip + money-back guarantee','home','trust','No other companies’ logos; space for our real numbers.'],
  [21,'Scroll story: company travels India → USA','home','story','Pinned scroll scene with day counter, route and milestones (reference-inspired).'],
  [5,'Animated “Your journey with us” tracker','home','journey','Every step the client goes through, with timelines.'],
  [6,'“Who is this for?” — pick your business type','home','who','Right setup for e-commerce, import-export, IT, startups.'],
  [7,'Services cards + giant moving “SERVICES” text','home','services','Details first, payment after; outline word slides as you scroll.'],
  [23,'Plane flyover through clouds','home','fly','Scroll-driven plane crossing the screen between sections.'],
  [8,'1-minute quiz + LLC vs C-Corp vs S-Corp','home','quiz','Helps visitors choose; correct S-Corp info.'],
  [22,'Documents stacking animation','home','stack','Formation documents drop and stack as you scroll (like the containers).'],
  [9,'Pricing: 3 plans + “Recommended” + calculator','home','pricing','Live total with state fee and add-ons.'],
  [10,'Why an Indian team — our edge','home','why','IST hours, CA/CS experts, Hindi & English.'],
  [4,'Client stories row (real logos & quotes)','home','clients','Filled with real clients, with permission.'],
  [11,'Free guide (lead magnet)','home','magnet','Captures emails from visitors not ready to buy.'],
  [12,'FAQ accordion','home','faq','Answers top questions before they leave.'],
  [13,'Final call-to-action band','home','final','Last nudge: launch or talk to an expert.'],
  [14,'Blog: contents, CTA box, related services','blog/states','blogtop','Turns blog readers into leads (SEO).'],
  [15,'Short sign-up: 4 fields, checks, correct summary','start','obtop','Data kept on Back; phone/email checks.'],
  [16,'WhatsApp button on every page','home','wa','Bottom-right on every page.'],
  [17,'Order tracker + ZIP/state checks','track','tracktop','Client sees status like a delivery.'],
  [18,'Footer with contacts, guarantee, disclaimer','home','footer','Real numbers, WhatsApp, policies.'],
  [19,'20 colour & font themes (10 dark futuristic)','gallery','gThemes','Pick the brand look in the gallery or toolbar.'],
  [20,'20 home page layouts','gallery','gLayouts','Same content, 20 different page styles.'],
  [24,'Custom cursor + glow effects','home','hero','Ring cursor that grows on buttons (desktop).']
];

/* ================= HELPERS ================= */
const $=(s,el=document)=>el.querySelector(s);
const $$=(s,el=document)=>[...el.querySelectorAll(s)];
const money=n=>'$'+(Math.round(n*100)/100).toFixed(2).replace(/\.00$/,'');
const FINAL={theme3:'10',hero3:'11',layout3:'19',anim4:'8,8,7,6,1,5,1'};
const store={get(k,d){return k in FINAL?FINAL[k]:d},set(k,v){}};
const ICON={
  shield:'<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/></svg>',
  arrow:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  plus:'<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
  chart:'<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 20h16M6 16V9M10 16V5M14 16v-6M18 16V8"/></svg>',
  lock:'<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>',
  chat:'<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/></svg>',
  clock:'<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>'
};
let cur={theme:+store.get('theme3',19),hero:+store.get('hero3',11),layout:+store.get('layout3',19)};
const state={flow:'start',need:'',loggedIn:false,step:1,name:'',email:'',cc:'+91',phone:'',company:'',plan:'starter',st:'Wyoming',add:{},agree:false};

/* ================= HEROES (10) ================= */
const stateOpts=(sel)=>STATES.map(s=>`<option ${s.n===sel?'selected':''}>${s.n}</option>`).join('');
const HEROES=[
 ['Split + live tracker','Promise on the left, animated order progress on the right',(id)=>`
 <section class="hero" ${id} data-chg="2"><div class="blob" style="width:420px;height:420px;background:var(--blue);right:-120px;top:-120px"></div><div class="container hero-grid">
  <div style="display:flex;flex-direction:column;gap:22px">
    <span class="pill" style="align-self:flex-start">For founders in India starting a US company</span>
    <h1>Everything you need to start and run your U.S. business</h1>
    <p class="lead">We don’t just handle the paperwork. Our experts guide you on the right structure, state and compliance — from India, in your time zone.</p>
    <div style="display:flex;gap:12px;flex-wrap:wrap"><a class="btn btn-primary btn-lg" href="#/start">Launch Your Company ${ICON.arrow}</a><a class="btn btn-outline btn-lg" href="#/contact">Talk to an Expert</a></div>
    <div class="ticks"><span>Plans from $249 + state fee</span><span>~7 business days to form</span><span><span class="mbg"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/></svg>Money-Back Guarantee</span></span></div>
  </div>
  <div class="mini-track"><div style="font-family:var(--head);font-weight:700;font-size:19px">Your company in 4 steps</div>
    <div class="mt-row"><div class="mt-dot" style="background:var(--green);color:#fff">✓</div><div style="flex:1"><b>Company formed (LLC / C-Corp)</b><div class="muted" style="font-size:13px">~7 business days</div></div><span class="st done">Done</span></div>
    <div class="mt-row"><div class="mt-dot pulse" style="background:var(--blue);color:var(--btn-fg)">2</div><div style="flex:1"><b>EIN (US tax ID)</b><div class="muted" style="font-size:13px"><span class="ph">[timeline to confirm]</span></div></div><span class="st now">In progress</span></div>
    <div class="mt-row"><div class="mt-dot" style="background:var(--blue-100);color:var(--text)">3</div><div style="flex:1"><b>US bank account help</b><div class="muted" style="font-size:13px">After EIN</div></div><span class="st next">Up next</span></div>
    <div class="mt-row"><div class="mt-dot" style="background:var(--blue-100);color:var(--text)">4</div><div style="flex:1"><b>Registered agent, address &amp; compliance</b><div class="muted" style="font-size:13px">Ongoing</div></div></div>
  </div></div></section>`],
 ['Two doors (dark)','New business or existing business — one click each',(id)=>`
 <section class="hero on-dark" ${id} data-chg="2" style="background:var(--navy)"><div class="blob" style="width:520px;height:520px;background:var(--blue);left:-180px;top:-200px;opacity:.35"></div><div class="blob" style="width:420px;height:420px;background:var(--amber);right:-160px;bottom:-200px;opacity:.25"></div>
 <div class="container" style="text-align:center;display:flex;flex-direction:column;align-items:center;gap:20px;position:relative;z-index:1">
  <span class="pill" style="background:rgba(255,255,255,.1);color:#fff"><span class="fl fl-in" role="img" aria-label="India"></span> → <span class="fl fl-us" role="img" aria-label="USA"></span> US companies for Indian founders</span>
  <h1 style="max-width:940px">Everything you need to start and run your U.S. business</h1>
  <p class="lead" style="margin:0 auto">Tell us where you are. Our experts take you from formation to banking to compliance.</p>
  <div class="grid g2" style="width:100%;max-width:940px;margin-top:14px">
    <a class="door" href="#/start" style="background:#fff;color:#0B1B3F"><span style="width:46px;height:46px;border-radius:12px;background:var(--blue-50);color:var(--blue);display:flex;align-items:center;justify-content:center">${ICON.plus}</span><h3 style="font-size:22px">Start a new business</h3><p style="font-size:15px;color:#475569">Register a new company, choose your structure, and get everything set up from scratch.</p><b style="color:var(--blue)">Launch your company →</b></a>
    <a class="door" href="#/services" style="background:var(--navy2);color:#fff;border:1.5px solid var(--dark-line)"><span style="width:46px;height:46px;border-radius:12px;background:var(--blue);display:flex;align-items:center;justify-content:center">${ICON.chart}</span><h3 style="font-size:22px">Manage an existing business</h3><p style="font-size:15px;color:#CBD5E1">Compliance, taxes, bookkeeping, or legal support for your current company.</p><b style="color:var(--on-dark-accent)">See services →</b></a>
  </div>
  <div style="display:flex;gap:20px;flex-wrap:wrap;justify-content:center;font-size:14px;color:#CBD5E1"><span class="ph">[X] companies formed</span><span>·</span><span class="ph">[Rating] on Google</span><span>·</span><span>Indian CA / CS team</span></div>
 </div></section>`],
 ['Price & proof up front','Reviews, two help paths and plan prices on first screen',(id)=>`
 <section class="hero" ${id} data-chg="2" style="background:var(--soft)"><div class="container hero-grid">
  <div style="display:flex;flex-direction:column;gap:20px">
    <div style="font-size:14px"><span class="stars">★★★★★</span> <b class="ph">[Rating]</b> from <span class="ph">[N]</span> verified reviews</div>
    <h1>Start your US company from India, with experts beside you</h1>
    <p class="lead">Pick how much help you want. Same fast filing either way.</p>
    <label class="radio-card sel rc"><input type="radio" name="path${Math.random()}" checked data-go="#/start"><span><b>I know what I need</b><br><span class="muted" style="font-size:14px">Choose a plan and pay online in 5 minutes.</span></span></label>
    <label class="radio-card rc"><input type="radio" name="pathx" data-go="#/service/expert"><span><b>I want an expert to guide me</b><br><span class="muted" style="font-size:14px">Book a 30-minute call ($49) with our team first.</span></span></label>
    <a class="btn btn-primary btn-lg rc-go" style="align-self:flex-start" href="#/start">Continue ${ICON.arrow}</a>
  </div>
  <div style="display:flex;flex-direction:column;gap:16px">
    <div class="card" style="display:flex;justify-content:space-between;align-items:center;gap:12px"><div><h3 style="font-size:19px">Starter · LLC</h3><p class="muted" style="font-size:14px">Name check, articles, operating agreement, state filing</p></div><div style="text-align:right"><div style="font-family:var(--head);font-size:30px;font-weight:var(--hw)">$249</div><div class="muted" style="font-size:13px">+ state fee</div></div></div>
    <div class="card" style="display:flex;justify-content:space-between;align-items:center;gap:12px;border:2px solid var(--blue);position:relative"><span class="badge-rec">Recommended</span><div><h3 style="font-size:19px">Premium · C-Corp</h3><p class="muted" style="font-size:14px">Formation, bylaws, EIN, registered agent (1 year)</p></div><div style="text-align:right"><div style="font-family:var(--head);font-size:30px;font-weight:var(--hw)">$849</div><div class="muted" style="font-size:13px">+ state fee</div></div></div>
    <div style="display:flex;gap:12px;align-items:center;background:var(--amber-50);border-radius:14px;padding:16px;color:var(--amber-d);font-size:14px">${ICON.shield}<span><span class="mbg"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/></svg>Money-Back Guarantee</span> If your company isn’t formed because of our mistake, we refund our fee.</span></div>
    <a href="#/pricing" style="font-weight:600">Compare all plans →</a>
  </div></div></section>`],
 ['Spotlight + instant quote','Big centred promise with a live “state → total” quote bar',(id)=>`
 <section class="hero h4" ${id} data-chg="2"><div class="container" style="text-align:center;display:flex;flex-direction:column;align-items:center;gap:22px">
  <span class="pill">Trusted by founders across India · <span class="ph">[X]</span> companies formed</span>
  <h1 style="max-width:980px">Your US company, launched from India in <span style="background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent">~7 business days</span></h1>
  <p class="lead" style="margin:0 auto;text-align:center">LLC or C-Corp, EIN, bank account and compliance — handled by Indian CA/CS experts who work in your time zone.</p>
  <div class="quote-bar q4">
    <select class="q4-plan" aria-label="Plan"><option value="starter">LLC · Starter</option><option value="premium">C-Corp · Premium</option></select>
    <select class="q4-state" aria-label="State">${stateOpts('Wyoming')}</select>
    <div class="tot"><span class="muted" style="font-size:12px">All-in today</span><b class="q4-tot">$352.75</b></div>
    <a class="btn btn-primary q4-go" href="#/start?plan=starter&state=Wyoming">Launch now ${ICON.arrow}</a>
  </div>
  <div class="ticks" style="justify-content:center;margin-top:6px"><span>No US visit needed</span><span>Owners can live in India</span><span>Support in IST</span><span><span class="mbg"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/></svg>Money-Back Guarantee</span></span></div>
 </div></section>`],
 ['India → USA route','Animated route map from India to the US with key promises',(id)=>`
 <section class="hero" ${id} data-chg="2"><div class="container hero-grid">
  <div style="display:flex;flex-direction:column;gap:22px">
    <span class="eyebrow">From India to the USA</span>
    <h1>We take your business across the world. You stay home.</h1>
    <p class="lead">Form your US company, get your EIN and open a US bank account — without leaving India.</p>
    <div style="display:flex;gap:12px;flex-wrap:wrap"><a class="btn btn-primary btn-lg" href="#/start">Launch Your Company</a><a class="btn btn-outline btn-lg" href="#/how">See how it works</a></div>
  </div>
  <div class="route">
   <svg viewBox="0 0 520 300" role="img" aria-label="Route from India to the USA">
    <defs><linearGradient id="rg" x1="0" x2="1"><stop offset="0" style="stop-color:var(--amber)"/><stop offset="1" style="stop-color:var(--blue)"/></linearGradient></defs>
    <g style="fill:var(--blue-100)">${Array.from({length:120},(_,i)=>{const x=20+(i%20)*25,y=40+Math.floor(i/20)*40;return `<circle cx="${x}" cy="${y}" r="2.2"/>`}).join('')}</g>
    <path id="arc" d="M420 200 C 360 40, 160 40, 100 150" fill="none" stroke="url(#rg)" stroke-width="3" class="dash"/>
    <circle r="8" style="fill:var(--blue)"><animateMotion dur="3.2s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1"><mpath href="#arc"/></animateMotion></circle>
    <circle cx="420" cy="200" r="12" style="fill:var(--amber)"/><circle cx="100" cy="150" r="12" style="fill:var(--blue)"/>
    <text x="420" y="236" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--text)">India</text>
    <text x="100" y="186" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--text)">USA</text>
   </svg>
   <div class="route-tags"><span class="pill">✓ LLC / C-Corp</span><span class="pill">✓ EIN</span><span class="pill">✓ Bank account</span><span class="pill">✓ Registered agent</span></div>
  </div></div></section>`],
 ['Bento hero','Headline tile plus price, guarantee, states and support tiles',(id)=>`
 <section class="hero" ${id} data-chg="2" style="padding-top:40px"><div class="container"><div class="bento">
  <div class="big"><div><span class="pill" style="background:rgba(255,255,255,.12);color:#fff">For Indian founders</span><h1 style="margin-top:18px;font-size:clamp(34px,4vw,52px)">Start and run your US business — from India.</h1></div>
   <div style="display:flex;gap:12px;flex-wrap:wrap"><a class="btn btn-white btn-lg" href="#/start">Launch Your Company</a><a class="btn btn-ghost-w btn-lg" href="#/contact">Talk to an Expert</a></div></div>
  <div class="accent"><span style="font-size:14px;opacity:.9">LLC from</span><span class="num">$249</span><span style="font-size:14px;opacity:.9">+ state fee · ~7 business days</span></div>
  <div><span style="color:var(--amber-d)">${ICON.shield}</span><b>Money-back guarantee</b><span class="muted" style="font-size:14px"></span></div>
  <div><span style="color:var(--blue)">${ICON.chat}</span><b>Support in IST hours</b><span class="muted" style="font-size:14px">Indian CA / CS experts answer you.</span></div>
  <div><b>9 states</b><div style="display:flex;gap:6px;flex-wrap:wrap">${['WY','DE','TX','FL','NV','NY','CA','NM','WA'].map(s=>`<span class="pill" style="padding:4px 8px">${s}</span>`).join('')}</div></div>
 </div></div></section>`],
 ['Dark + floating updates','Dark grid backdrop with live “order update” cards floating',(id)=>`
 <section class="hero h7 on-dark" ${id} data-chg="2" style="padding:110px 0 120px"><div class="float-card" style="left:6%;top:22%"><i style="background:#22C55E">✓</i>Articles filed — Wyoming</div>
 <div class="float-card" style="right:6%;top:18%;animation-delay:1.2s"><i style="background:var(--blue)">$</i>EIN received from IRS</div>
 <div class="float-card" style="left:9%;bottom:16%;animation-delay:2.2s"><i style="background:var(--amber);color:#0B1B3F">🏦</i>Bank account approved</div>
 <div class="float-card" style="right:8%;bottom:20%;animation-delay:.6s"><i style="background:#25D366">💬</i>New message from your expert</div>
 <div class="container" style="text-align:center;display:flex;flex-direction:column;align-items:center;gap:22px;position:relative;z-index:2">
  <span class="pill" style="background:rgba(255,255,255,.1);color:#fff">Live status at every step</span>
  <h1 style="max-width:900px">Launch your US company. Watch every step happen.</h1>
  <p class="lead" style="margin:0 auto">From filing to EIN to bank account — tracked in your dashboard and sent to your WhatsApp.</p>
  <div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center"><a class="btn btn-white btn-lg" href="#/start">Launch Your Company</a><a class="btn btn-ghost-w btn-lg" href="#/track">See a sample tracker</a></div>
 </div></section>`],
 ['Editorial','Huge headline, minimal, stats row with hairlines',(id)=>`
 <section class="hero h8" ${id} data-chg="2" style="padding:90px 0 60px"><div class="container">
  <div style="display:grid;grid-template-columns:1.6fr 1fr;gap:48px;align-items:end">
   <h1>Go global.<br><em>Stay home.</em></h1>
   <div style="display:flex;flex-direction:column;gap:18px"><p class="lead" style="font-size:18px">US company formation, EIN, banking and compliance for Indian founders — by the team behind Juris Consultants India.</p>
   <div style="display:flex;gap:12px;flex-wrap:wrap"><a class="btn btn-primary btn-lg" href="#/start">Launch Your Company</a><a class="btn btn-outline btn-lg" href="#/pricing">Pricing</a></div></div>
  </div>
  <div class="h8-stats"><div><b>$249</b><span class="muted">LLC + state fee</span></div><div><b>~7 days</b><span class="muted">to form your company</span></div><div><b>9</b><span class="muted">US states</span></div><div><b class="ph">[X]+</b><span class="muted">companies formed</span></div></div>
 </div></section>`],
 ['Company name search','“Is my company name available?” search box — instant engagement',(id)=>`
 <section class="hero h9" ${id} data-chg="2"><div class="container" style="text-align:center;display:flex;flex-direction:column;align-items:center;gap:22px">
  <span class="pill">Step 1 takes 10 seconds</span>
  <h1 style="max-width:900px">Find your US company name. We’ll do the rest.</h1>
  <p class="lead" style="margin:0 auto">Type the name you want. Our team checks it with the state and starts your formation.</p>
  <form class="search s9" novalidate><input class="s9-in" placeholder="e.g. Sharma Tech" aria-label="Company name"><select class="s9-suf" aria-label="Type"><option>LLC</option><option>Inc.</option></select><button class="btn btn-primary" type="submit">Check &amp; start</button></form>
  <div class="s9-res" style="min-height:24px;font-weight:600"></div>
  <div class="chips"><span class="muted" style="padding:8px 4px;font-size:14px">Popular states:</span>${['Wyoming','Delaware','Texas','Florida'].map(s=>`<a class="chip" href="#/start?plan=starter&state=${s}">${s}</a>`).join('')}</div>
 </div></section>`],
 ['Expert chat preview','WhatsApp-style chat showing how an expert helps',(id)=>`
 <section class="hero" ${id} data-chg="2"><div class="blob" style="width:420px;height:420px;background:#25D366;right:-140px;top:40px;opacity:.18"></div><div class="container hero-grid">
  <div style="display:flex;flex-direction:column;gap:22px">
    <span class="pill" style="background:#E7F8EE;color:#166534">${ICON.chat} Real experts, not a chatbot</span>
    <h1>Questions? Ask a real CA on WhatsApp.</h1>
    <p class="lead">Indian experts guide you on structure, state, EIN and banking — in Hindi or English, during your day.</p>
    <div style="display:flex;gap:12px;flex-wrap:wrap"><a class="btn btn-primary btn-lg" href="#/start">Launch Your Company</a><a class="btn btn-outline btn-lg" href="https://wa.me/919999630777" target="_blank" rel="noopener">Chat on WhatsApp</a></div>
  </div>
  <div class="phone"><div class="top"><span class="av">JC</span><div><b style="font-size:15px">Juris Consultants USA</b><div style="font-size:12px;color:#8696A0">Expert · online</div></div></div>
   <div class="msgs">
    <div class="bub me" style="animation-delay:.2s">Hi! Can I form a US LLC while living in Pune?<small>10:02</small></div>
    <div class="bub them" style="animation-delay:1s">Yes 🙂 Most founders choose a Wyoming LLC. It takes ~7 business days.<small>10:03</small></div>
    <div class="bub me" style="animation-delay:1.8s">What’s the total cost?<small>10:03</small></div>
    <div class="bub them" style="animation-delay:2.6s">$249 + $103.75 state fee = $352.75. EIN is $80 extra, and we file it for you.<small>10:04</small></div>
    <div class="bub me" style="animation-delay:3.4s">Great, let’s start 🚀<small>10:04</small></div>
   </div></div>
 </div></section>`]
];


/* ================= v3: DARK FUTURISTIC THEMES 11–20 ================= */
const DK={text:'#F1F5F9',body:'#CBD5E1',muted:'#94A3B8',line:'rgba(255,255,255,.10)','card-bg':'rgba(255,255,255,.04)','dark-line':'rgba(255,255,255,.16)','dark-line2':'rgba(255,255,255,.08)','on-primary-muted':'#E2E8F0'};
const dk=(pg,soft,n2,o)=>Object.assign({},DK,{'page-bg':pg,navy:pg,soft:soft,navy2:n2,'card-solid':n2},o);
THEMES.push(
 {n:'Obsidian Neon Blue',d:'Deep black + electric blue glow',dark:1,v:dk('#05070D','#0A0E1A','#0D1324',{blue:'#3B82F6','blue-d':'#93C5FD','blue-50':'rgba(59,130,246,.14)','blue-100':'rgba(59,130,246,.28)',amber:'#22D3EE','amber-50':'rgba(34,211,238,.12)','amber-d':'#67E8F9','on-dark-accent':'#7DD3FC',grad:'linear-gradient(135deg,#3B82F6,#22D3EE)','btn-bg':'linear-gradient(135deg,#2563EB,#0891B2)',head:"'Sora',system-ui,sans-serif",sans:"Inter,system-ui,sans-serif",hw:'700','r-card':'18px','btn-r':'12px'})},
 {n:'Cyber Violet',d:'Violet + cyan, very futuristic',dark:1,v:dk('#0A0612','#120B1F','#170E28',{blue:'#8B5CF6','blue-d':'#C4B5FD','blue-50':'rgba(139,92,246,.16)','blue-100':'rgba(139,92,246,.30)',amber:'#22D3EE','amber-50':'rgba(34,211,238,.12)','amber-d':'#67E8F9','on-dark-accent':'#C4B5FD',grad:'linear-gradient(135deg,#8B5CF6,#22D3EE)','btn-bg':'linear-gradient(135deg,#7C3AED,#0891B2)',head:"'Space Grotesk',system-ui,sans-serif",sans:"Inter,system-ui,sans-serif",hw:'700','r-card':'16px','btn-r':'10px'})},
 {n:'Midnight Gold',d:'Black & gold — luxury consultancy',dark:1,v:dk('#07080C','#0E1016','#13151D',{blue:'#E5B649','blue-d':'#F3D98B','blue-50':'rgba(229,182,73,.12)','blue-100':'rgba(229,182,73,.26)',amber:'#E5B649','amber-50':'rgba(229,182,73,.12)','amber-d':'#F3D98B','on-dark-accent':'#F3D98B',grad:'linear-gradient(135deg,#F3D98B,#B8860B)','btn-bg':'linear-gradient(135deg,#F3D98B,#C9971F)','btn-fg':'#0B0B0B',head:"'Playfair Display',Georgia,serif",sans:"Inter,system-ui,sans-serif",hw:'700','r-card':'14px','btn-r':'999px'})},
 {n:'Aurora Teal',d:'Teal + lime, fresh & techy',dark:1,v:dk('#04110F','#071A17','#0A211D',{blue:'#14B8A6','blue-d':'#5EEAD4','blue-50':'rgba(20,184,166,.14)','blue-100':'rgba(20,184,166,.28)',amber:'#A3E635','amber-50':'rgba(163,230,53,.12)','amber-d':'#BEF264','on-dark-accent':'#5EEAD4',grad:'linear-gradient(135deg,#14B8A6,#A3E635)','btn-bg':'linear-gradient(135deg,#0D9488,#4D7C0F)',head:"'Manrope',system-ui,sans-serif",sans:"'Manrope',system-ui,sans-serif",hw:'800','r-card':'20px','btn-r':'12px'})},
 {n:'Graphite Orange',d:'Graphite with bold orange energy',dark:1,v:dk('#0C0C0D','#141416','#19191C',{blue:'#FF7A1A','blue-d':'#FDBA74','blue-50':'rgba(255,122,26,.14)','blue-100':'rgba(255,122,26,.28)',amber:'#FACC15','amber-50':'rgba(250,204,21,.12)','amber-d':'#FDE047','on-dark-accent':'#FDBA74',grad:'linear-gradient(135deg,#FF7A1A,#FACC15)','btn-bg':'linear-gradient(135deg,#C2410C,#9A3412)',head:"'Outfit',system-ui,sans-serif",sans:"Inter,system-ui,sans-serif",hw:'700','r-card':'14px','btn-r':'10px'})},
 {n:'Deep Space Indigo',d:'Indigo + pink nebula glow',dark:1,v:dk('#070B1F','#0C1230','#10173A',{blue:'#6366F1','blue-d':'#A5B4FC','blue-50':'rgba(99,102,241,.16)','blue-100':'rgba(99,102,241,.30)',amber:'#F472B6','amber-50':'rgba(244,114,182,.12)','amber-d':'#F9A8D4','on-dark-accent':'#A5B4FC',grad:'linear-gradient(135deg,#6366F1,#F472B6)','btn-bg':'linear-gradient(135deg,#4F46E5,#BE185D)',head:"'Urbanist',system-ui,sans-serif",sans:"'Urbanist',system-ui,sans-serif",hw:'800','r-card':'22px','btn-r':'14px'})},
 {n:'Carbon Emerald',d:'Carbon black + emerald money feel',dark:1,v:dk('#060A08','#0B120F','#0F1813',{blue:'#10B981','blue-d':'#6EE7B7','blue-50':'rgba(16,185,129,.14)','blue-100':'rgba(16,185,129,.28)',amber:'#FBBF24','amber-50':'rgba(251,191,36,.12)','amber-d':'#FCD34D','on-dark-accent':'#6EE7B7',grad:'linear-gradient(135deg,#10B981,#FBBF24)','btn-bg':'linear-gradient(135deg,#059669,#047857)',head:"'Inter Tight',Inter,system-ui,sans-serif",sans:"Inter,system-ui,sans-serif",hw:'800','r-card':'16px','btn-r':'12px'})},
 {n:'Nebula Pink',d:'Pink + violet, bold & youthful',dark:1,v:dk('#0D0714','#150C1F','#1B1028',{blue:'#EC4899','blue-d':'#F9A8D4','blue-50':'rgba(236,72,153,.15)','blue-100':'rgba(236,72,153,.30)',amber:'#8B5CF6','amber-50':'rgba(139,92,246,.14)','amber-d':'#C4B5FD','on-dark-accent':'#F9A8D4',grad:'linear-gradient(135deg,#EC4899,#8B5CF6)','btn-bg':'linear-gradient(135deg,#DB2777,#7C3AED)',head:"'Sora',system-ui,sans-serif",sans:"Inter,system-ui,sans-serif",hw:'700','r-card':'20px','btn-r':'999px'})},
 {n:'Arctic Ice',d:'Icy blue on deep navy, clean',dark:1,v:dk('#08131C','#0C1B27','#102231',{blue:'#38BDF8','blue-d':'#BAE6FD','blue-50':'rgba(56,189,248,.14)','blue-100':'rgba(56,189,248,.28)',amber:'#E2E8F0','amber-50':'rgba(226,232,240,.10)','amber-d':'#F1F5F9','on-dark-accent':'#BAE6FD',grad:'linear-gradient(135deg,#38BDF8,#E0F2FE)','btn-bg':'linear-gradient(135deg,#0284C7,#0369A1)',head:"'Plus Jakarta Sans',system-ui,sans-serif",sans:"Inter,system-ui,sans-serif",hw:'800','r-card':'18px','btn-r':'12px'})},
 {n:'Royal Navy Night (brand, dark)',d:'Our brand blue — dark & futuristic',dark:1,v:dk('#050B1E','#0A1430','#0D1839',{blue:'#2F6BFF','blue-d':'#A9C2FF','blue-50':'rgba(47,107,255,.15)','blue-100':'rgba(47,107,255,.30)',amber:'#F5B841','amber-50':'rgba(245,184,65,.12)','amber-d':'#FCD58A','on-dark-accent':'#A9C2FF',grad:'linear-gradient(135deg,#2F6BFF,#7C9CFF)','btn-bg':'linear-gradient(135deg,#2F6BFF,#1D4ED8)',head:"'Plus Jakarta Sans',system-ui,sans-serif",sans:"Inter,system-ui,sans-serif",hw:'800','r-card':'18px','btn-r':'12px'})}
);
const ALLKEYS=[...new Set(THEMES.flatMap(t=>Object.keys(t.v)))];

/* ================= v3: LAYOUTS (20) ================= */
const LAYOUTS=[...LAYOUTS_OLD.map((l,i)=>({n:l[0],d:l[1],cls:'L'+(i+1)})),
 {n:'Cinematic scroll',d:'Closest to the reference: long pinned scroll scenes, giant headings',cls:'L11'},
 {n:'Neon glass',d:'Glowing gradient borders on every card',cls:'L12'},
 {n:'Command center',d:'Tech grid, corner brackets, code-style labels',cls:'L13'},
 {n:'Split sticky',d:'Heading stays fixed on the left while content scrolls',cls:'L14'},
 {n:'Horizontal scroll',d:'Services and plans slide sideways like an app',cls:'L15'},
 {n:'Giant type',d:'Huge outline words behind every section',cls:'L16'},
 {n:'Card spotlight',d:'Cards light up where the mouse moves',cls:'L17'},
 {n:'Timeline spine',d:'A glowing line connects every section',cls:'L18'},
 {n:'Immersive full-screen',d:'Each section fills the screen and snaps',cls:'L19'},
 {n:'Cinematic + Conversion',d:'Scroll animations + pricing early + sticky Launch bar + neon cards',cls:'L20 L7 L12'}
];

/* ================= v3: RECOMMENDATIONS ================= */
const RECS={
 theme:[[19,'Our brand blue and Juris logo, but dark and futuristic. Keeps continuity with Juris Consultants India while feeling premium and modern.'],
        [10,'The most futuristic look: deep black with electric-blue glow — feels like a modern fintech (Stripe / Mercury style).'],
        [12,'Black & gold = luxury consultancy. Best if management wants “premium advisory” more than “tech startup”.']],
 hero:[[11,'Rotating globe with a live India → USA flight arc tells our whole story in one look. Futuristic, premium and memorable.'],
       [3,'Best for sales: visitor picks a state and sees the full total instantly — interactive and transparent.'],
       [8,'Strongest “magnet”: visitor types their company name and is already inside the sign-up.']],
 layout:[[19,'Scroll animations for the “wow” (like the reference), plus pricing early, neon cards and a sticky Launch bar for conversions.'],
         [10,'Closest to the reference video: long pinned scroll scenes and giant headings — maximum premium feel.'],
         [6,'Simplest and fastest to build; puts pricing right after the hero with a sticky Launch bar.']]
};
const COMBOS=[{n:'★ Best combo',t:19,h:11,l:19,why:'Brand-dark theme + globe hero + cinematic-conversion layout'},
 {n:'Combo 2 — most futuristic',t:10,h:3,l:10,why:'Obsidian Neon + instant-quote hero + cinematic scroll'},
 {n:'Combo 3 — luxury',t:12,h:8,l:6,why:'Midnight Gold + name-search hero + conversion-first'}];
const rankOf=(cat,i)=>{const k=RECS[cat].findIndex(r=>r[0]===i);return k<0?0:k+1;};

/* ================= v3: HEROES 11–20 ================= */
const CTA2=(dark)=>`<div style="display:flex;gap:12px;flex-wrap:wrap"><a class="btn btn-primary btn-lg" href="#/start">Launch Your Company ${ICON.arrow}</a><a class="btn ${dark?'btn-ghost-w':'btn-outline'} btn-lg" href="#/contact">Talk to an Expert</a></div>`;
HEROES.push(
 ['Aurora glow','Moving aurora light behind a glass stats card',(id)=>`
 <section class="hero on-dark" ${id} data-chg="2" style="background:var(--navy);padding:120px 0"><div class="aurora"><i></i><i></i><i></i></div>
 <div class="container" style="position:relative;z-index:1;text-align:center;display:flex;flex-direction:column;align-items:center;gap:24px">
  <span class="pill" style="background:rgba(255,255,255,.1);color:#fff">US company formation · for Indian founders</span>
  <h1 style="max-width:980px">Launch your <span class="grad-text">US company</span> from India</h1>
  <p class="lead" style="margin:0 auto">Formation, EIN, bank account and compliance — guided by Indian CA / CS experts in your time zone.</p>
  <div class="glass" style="padding:18px 26px;display:flex;gap:34px;flex-wrap:wrap;justify-content:center">
   <div><b style="font-size:28px;font-family:var(--head)">$249</b><div style="font-size:13px;color:#CBD5E1">LLC + state fee</div></div>
   <div><b style="font-size:28px;font-family:var(--head)">~7 days</b><div style="font-size:13px;color:#CBD5E1">to form</div></div>
   <div><b style="font-size:28px;font-family:var(--head)">9</b><div style="font-size:13px;color:#CBD5E1">US states</div></div>
   <div><b style="font-size:28px;font-family:var(--head)" class="ph">[X]+</b><div style="font-size:13px;color:#CBD5E1">companies formed</div></div></div>
  ${CTA2(1)}</div></section>`],
 ['Futuristic globe','Rotating dotted globe with a live India → USA flight arc',(id)=>`
 <section class="hero on-dark" ${id} data-chg="2" style="background:radial-gradient(800px 520px at 75% 45%,color-mix(in srgb,var(--blue) 32%,transparent),transparent 70%),var(--navy);padding:70px 0"><div class="container hero-grid">
  <div style="display:flex;flex-direction:column;gap:22px"><span class="pill" style="background:rgba(255,255,255,.08);color:#fff;border:1px solid rgba(255,255,255,.15)"><span class="live" style="color:#4ADE80">LIVE</span> Forming US companies for founders worldwide</span>
  <h1>Go global from anywhere. <span class="grad-text">Launch in the US.</span></h1>
  <p class="lead">LLC or C-Corp, EIN, bank account and compliance — handled end-to-end by Indian CA / CS experts in your time zone.</p>
  ${CTA2(1)}<div class="ticks"><span>From $249 + state fee</span><span>~7 business days</span><span>Support in IST</span></div></div>
  <div class="globe-wrap"><canvas class="cv cv-globe" aria-label="Rotating globe showing a route from India to the USA" role="img"></canvas>
   <span class="tag" style="left:0;bottom:10%;animation-delay:2s">✓ Formed in ~7 business days</span><span class="tag" style="right:0;top:6%;animation-delay:1s"><span class="live" style="color:#4ADE80">LIVE</span> World → USA</span><span class="drag-hint">⟲ drag to rotate</span></div>
 </div></section>`],
 ['Constellation network','Interactive particle network that follows the mouse',(id)=>`
 <section class="hero on-dark" ${id} data-chg="2" style="background:var(--navy);padding:130px 0"><canvas class="cv cv-full cv-net" aria-hidden="true"></canvas>
 <div class="container" style="position:relative;z-index:1;display:flex;flex-direction:column;gap:22px;align-items:center;text-align:center">
  <span class="pill" style="background:rgba(255,255,255,.08);color:#fff">Everything connected</span>
  <h1 style="max-width:960px">One expert team. <span class="grad-text">Every step</span> of your US company.</h1>
  <p class="lead" style="margin:0 auto">Formation · EIN · Banking · Registered agent · Bookkeeping · Tax — all connected, all tracked.</p>${CTA2(1)}</div></section>`],
 ['Neon horizon','Retro-futuristic neon grid and sun',(id)=>`
 <section class="hero on-dark" ${id} data-chg="2" style="background:linear-gradient(180deg,#04020C,var(--navy));padding:110px 0 240px"><div class="sun"></div><div class="synth"></div>
 <div class="container" style="position:relative;z-index:1;text-align:center;display:flex;flex-direction:column;align-items:center;gap:22px">
  <span class="pill" style="background:rgba(255,255,255,.08);color:#fff">The next step for Indian founders</span>
  <h1 style="max-width:980px">Your business. <span class="grad-text">Now in the USA.</span></h1>
  <p class="lead" style="margin:0 auto">Form your US company in ~7 business days — from India, with experts beside you.</p>${CTA2(1)}</div></section>`],
 ['Command launch','Typing terminal that “launches” a company',(id)=>`
 <section class="hero" ${id} data-chg="2"><div class="container hero-grid">
  <div style="display:flex;flex-direction:column;gap:22px"><span class="eyebrow">Built like software</span><h1>Launch a US company like you ship code.</h1>
  <p class="lead">Fill 4 fields. Our experts run the rest — filing, EIN, bank and compliance — and you watch every step.</p>${CTA2(0)}</div>
  <div class="term"><div class="bar"><i></i><i></i><i></i></div><pre class="typer" aria-label="Example launch log"></pre></div>
 </div></section>`],
 ['7-day countdown ring','Big animated ring counting business days to launch',(id)=>`
 <section class="hero" ${id} data-chg="2"><div class="container hero-grid">
  <div style="display:flex;flex-direction:column;gap:22px"><span class="eyebrow">Sign-up to US company</span><h1>About 7 business days. We count them with you.</h1>
  <p class="lead">Day 0 you tell us about you. By day ~7 your company is formed — then EIN and bank account follow.</p>${CTA2(0)}</div>
  <div class="ring-wrap cd"><svg viewBox="0 0 200 200" aria-hidden="true"><circle cx="100" cy="100" r="88" fill="none" style="stroke:var(--blue-100)" stroke-width="10"/><circle class="cd-arc" cx="100" cy="100" r="88" fill="none" style="stroke:var(--blue)" stroke-width="10" stroke-linecap="round" stroke-dasharray="553" stroke-dashoffset="553"/></svg>
   <div class="ring-c"><span class="muted" style="font-size:13px;letter-spacing:3px">BUSINESS DAY</span><b class="cd-n">0</b><span class="cd-l" style="font-weight:600">Tell us about you</span></div></div>
 </div></section>`],
 ['Spotlight reveal','Mouse moves a light that reveals a hidden grid',(id)=>`
 <section class="hero h17 on-dark" ${id} data-chg="2" style="padding:140px 0"><div class="glow"></div><div class="reveal-layer"></div>
 <div class="container" style="position:relative;z-index:1;text-align:center;display:flex;flex-direction:column;align-items:center;gap:22px">
  <span class="pill" style="background:rgba(255,255,255,.08);color:#fff">Move your mouse ✦</span>
  <h1 style="max-width:980px">Every detail of your US company — <span class="grad-text">handled.</span></h1>
  <p class="lead" style="margin:0 auto">We see what others miss: the right state, the right structure, every filing on time.</p>${CTA2(1)}</div></section>`],
 ['3D document stack','Sample formation documents in 3D that tilt with the mouse',(id)=>`
 <section class="hero" ${id} data-chg="2"><div class="container hero-grid">
  <div style="display:flex;flex-direction:column;gap:22px"><span class="eyebrow">What you receive</span><h1>Real documents. Real company. In ~7 business days.</h1>
  <p class="lead">Articles of organization, operating agreement and EIN letter — delivered to your dashboard.</p>${CTA2(0)}</div>
  <div class="tilt"><div class="tilt-inner">
   <div class="doc" style="transform:translateZ(-80px) translateX(-70px) rotate(-9deg)"><small style="color:#94A3B8">SAMPLE</small><b>Operating Agreement</b><span class="ln" style="width:90%"></span><span class="ln" style="width:70%"></span><span class="ln" style="width:80%"></span></div>
   <div class="doc" style="transform:translateZ(-40px) translateX(60px) rotate(6deg)"><small style="color:#94A3B8">SAMPLE</small><b>EIN Confirmation</b><span class="ln" style="width:85%"></span><span class="ln" style="width:60%"></span></div>
   <div class="doc" style="transform:translateZ(30px)"><small style="color:#94A3B8">SAMPLE · STATE FILING</small><b style="font-size:20px">Articles of Organization</b><span class="ln" style="width:92%"></span><span class="ln" style="width:76%"></span><span class="ln" style="width:84%"></span><span class="ln" style="width:58%"></span><div class="seal">FILED<br>✓</div></div>
  </div></div></div></section>`],
 ['Kinetic typography','Giant moving words: LLC · C-CORP · EIN · BANK',(id)=>{const w='LLC · C-CORP · EIN · BANK ACCOUNT · ',w2='REGISTERED AGENT · BOOKKEEPING · TAX · ';return `
 <section class="hero" ${id} data-chg="2" style="padding:56px 0 80px">
  <div class="kin"><div class="row">${(w+w).repeat(2)}</div></div>
  <div class="kin"><div class="row rev o">${(w2+w2).repeat(2)}</div></div>
  <div class="container" style="display:flex;justify-content:space-between;align-items:flex-end;gap:30px;flex-wrap:wrap;margin-top:44px">
   <div style="max-width:640px"><h1 style="font-size:clamp(30px,3.8vw,52px)">Start and run your US business from India.</h1><p class="lead" style="margin-top:12px">Everything above, done by one Indian expert team — from ~7 business days.</p></div>${CTA2(0)}</div></section>`;}],
 ['Glass dashboard','Live futuristic dashboard preview with progress',(id)=>`
 <section class="hero on-dark" ${id} data-chg="2" style="background:radial-gradient(700px 420px at 80% 25%,color-mix(in srgb,var(--blue) 32%,transparent),transparent 70%),var(--navy)"><div class="container hero-grid">
  <div style="display:flex;flex-direction:column;gap:22px"><span class="pill" style="background:rgba(255,255,255,.08);color:#fff">Your company, live</span><h1>Your US company on one <span class="grad-text">live dashboard.</span></h1>
  <p class="lead">Every filing, document and message in one place — and on WhatsApp.</p>${CTA2(1)}</div>
  <div class="dash-ui">
   <div class="glass p" style="grid-row:span 2"><div style="display:flex;justify-content:space-between;align-items:center"><b>Sharma Tech LLC</b><span class="live">LIVE</span></div><span style="font-size:13px;color:#94A3B8">Wyoming · sample order</span>
    ${[['done','Payment received'],['done','Expert review'],['now','Filed with the state'],['next','EIN application'],['next','Bank account']].map(r=>`<div style="display:flex;justify-content:space-between;gap:8px;align-items:center;padding:8px 0;border-top:1px solid rgba(255,255,255,.08);font-size:14px"><span>${r[1]}</span><span class="st ${r[0]}">${r[0]==='done'?'Done':r[0]==='now'?'In progress':'Up next'}</span></div>`).join('')}</div>
   <div class="glass p"><span style="font-size:13px;color:#94A3B8">Formation progress</span><b style="font-family:var(--head);font-size:36px">72%</b><div class="bars">${[30,45,38,60,72,58,84].map((h,i)=>`<i style="height:${h}%;animation-delay:${i*.08}s"></i>`).join('')}</div></div>
   <div class="glass p"><span style="font-size:13px;color:#94A3B8">Next step</span><b>EIN application</b><span style="font-size:13px;color:#CBD5E1">Your expert: <span class="ph">[Name]</span> · on WhatsApp</span></div>
  </div></div></section>`]
);

/* ================= v3: SCROLL SCENES ================= */
const MILES=[[.02,'DAY 0 · 5 MIN','Tell us about you','Name, email, phone'],[.2,'DAY 0 · 2 MIN','Choose plan & pay','See the total first'],[.4,'DAY 1','Expert review','We check every detail'],[.62,'DAY 1 – 7','Filed with the state','Your company is formed'],[.82,'AFTER FORMATION','EIN from the IRS','[timeline to confirm]'],[.99,'AFTER EIN','US bank account','Ready to do business']];
const ST_PATH_MAP='M154 257 C 420 470, 780 470, 1018 197';
const ST_PATH='M90 560 C 300 560, 330 300, 520 330 S 760 600, 900 400 S 1050 190, 1110 170';
function storyHTML(){const SP=ANIM.s===8?ST_PATH_MAP:ST_PATH;return `<section class="story sm${ANIM.s}" id="story" data-chg="21"><div class="story-stage">
 ${ANIM.s===9?'<div class="ghost" id="stGhost">INDIA → USA · INDIA → USA · INDIA → USA</div>':'<canvas class="cv cv-full st-bg" aria-hidden="true"></canvas>'}
 <div class="speed">BUSINESS DAY<b id="stDay">00</b>OF ~7 TO FORM</div>
 <div class="head"><span class="eyebrow">Scroll to launch</span><h2 style="margin-top:8px">Watch your company travel from India to the USA</h2></div>
 <svg class="route-svg" viewBox="0 0 1200 700" preserveAspectRatio="none" aria-hidden="true">
  <defs><linearGradient id="stg" x1="0" x2="1"><stop offset="0" style="stop-color:var(--amber)"/><stop offset="1" style="stop-color:var(--blue)"/></linearGradient></defs>
  <path id="stPath" d="${SP}" fill="none" stroke="rgba(255,255,255,.16)" stroke-width="2" stroke-dasharray="6 10" vector-effect="non-scaling-stroke"/>
  <path id="stTrail" d="${SP}" fill="none" stroke="url(#stg)" stroke-width="3.4" stroke-linecap="round"/></svg>
 <span class="city" style="left:3%;top:84%">INDIA</span><span class="city" id="stUsa" style="right:3%;top:16%">USA</span>
 ${MILES.map((m,i)=>`<div class="ms" data-at="${m[0]}" data-i="${i}"><small>${m[1]}</small><b>${m[2]}</b><span>${m[3].startsWith('[')?'<span class="ph">'+m[3]+'</span>':m[3]}</span></div>`).join('')}
 <div class="file-dot" id="stFile"><b class="fd-plane">${PLANE_ICON}</b><small>YOUR COMPANY</small></div>
 <div class="hint">SCROLL ↓</div><div class="pbar"><i id="stBar"></i></div>
</div></section>`;}
const PLANE_SVG=`<svg class="plane" viewBox="0 0 440 300" aria-hidden="true" style="overflow:visible"><defs>
 <linearGradient id="pfus" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".5" stop-color="#E8EDF5"/><stop offset="1" stop-color="#8E9CB4"/></linearGradient>
 <linearGradient id="pwing" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#B9C5D8"/><stop offset="1" stop-color="#F3F6FB"/></linearGradient>
 <linearGradient id="pwing2" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8E9CB4"/><stop offset="1" stop-color="#D9E1EE"/></linearGradient>
 <linearGradient id="ptrail" x1="1" x2="0"><stop offset="0" stop-color="#fff" stop-opacity=".75"/><stop offset=".4" stop-color="#fff" stop-opacity=".35"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>
 <polygon points="222,92 222,97 -900,104 -900,82" fill="url(#ptrail)" opacity=".55"/><polygon points="222,203 222,208 -900,218 -900,196" fill="url(#ptrail)" opacity=".55"/>
 <path d="M292 130 L206 16 Q198 8 188 14 L214 130 Z" fill="url(#pwing)" stroke="#A3B0C5"/>
 <path d="M292 170 L206 284 Q198 292 188 286 L214 170 Z" fill="url(#pwing2)" stroke="#8E9CB4"/>
 <rect x="222" y="86" width="44" height="16" rx="8" fill="#DCE3EE" stroke="#8E9CB4"/><rect x="222" y="198" width="44" height="16" rx="8" fill="#C3CDDC" stroke="#8E9CB4"/>
 <path d="M82 136 L52 94 Q47 89 42 94 L58 136 Z" fill="url(#pwing)" stroke="#A3B0C5"/><path d="M82 164 L52 206 Q47 211 42 206 L58 164 Z" fill="url(#pwing2)" stroke="#8E9CB4"/>
 <path d="M36 150 C36 140 60 131 100 130 L360 130 C402 130 432 141 437 150 C432 159 402 170 360 170 L100 170 C60 169 36 160 36 150 Z" fill="url(#pfus)" stroke="#8E9CB4"/>
 <path d="M46 148.5 L118 147.5 L118 152.5 L46 151.5 Z" fill="#A3B0C5"/>
 <path d="M96 139 L380 139" stroke="#fff" stroke-opacity=".9" stroke-width="3" stroke-linecap="round"/>
 <path d="M404 143 Q419 146 422 150 Q419 154 404 157 Q408 150 404 143 Z" fill="#1E293B"/>
 <rect x="120" y="153" width="230" height="4" rx="2" style="fill:var(--blue)"/>
 <text x="170" y="167" font-size="10" font-weight="800" fill="#7C8AA3" font-family="Inter,sans-serif" letter-spacing="2.5">JURIS · USA</text></svg>`;
function flyHTML(){const far=[[4,10,260],[30,4,220],[58,16,300],[84,6,240],[16,34,200],[70,40,230]],mid=[[-6,56,520,1.1],[40,66,560,1.3],[78,52,500,1]],fr=[[12,70,820,2.1],[64,-12,700,2.5]];return `<section class="fly m${ANIM.f}" id="fly" data-chg="23">${flyExtrasHTML()}
 <div class="stars"></div><div class="moon"></div>
 ${far.map((c,i)=>`<div class="cloud far" data-t="${i%4}" data-s=".45" style="left:${c[0]}%;top:${c[1]}%;width:${c[2]}px;height:${c[2]*.48}px"></div>`).join('')}
 ${mid.map((c,i)=>`<div class="cloud" data-t="${(i+1)%4}" data-s="${c[3]}" style="left:${c[0]}%;top:${c[1]}%;width:${c[2]}px;height:${c[2]*.48}px"></div>`).join('')}
 ${PLANE_SVG}
 ${fr.map((c,i)=>`<div class="cloud front" data-t="${(i+2)%4}" data-s="${c[3]}" style="left:${c[0]}%;top:${c[1]}%;width:${c[2]}px;height:${c[2]*.48}px"></div>`).join('')}
 <div class="mist"></div>
 <div class="fly-text"><small>FROM INDIA · TO THE USA</small>Your business.<br>Now flying in the US.</div></section>`;}
const SDOCS=[['AO','Articles of Organization','Filed with the state','-2'],['OA','Operating Agreement','Signed & stored','3'],['EIN','EIN Letter','From the IRS','-3'],['RA','Registered Agent','Address active','2'],['$','Bank account','Approved','-1']];
function stackHTML(){return `<section class="stack m${ANIM.d}" id="stack" data-chg="22"><div class="stack-stage">
 <div><span class="eyebrow">What you receive</span><h2 style="font-size:clamp(30px,3.8vw,52px);margin:12px 0">Every document, stacked and ready.</h2>
 <p class="muted" style="font-size:17px">Scroll to watch your company’s paperwork arrive — formed, filed and stored in your dashboard.</p>
 <div style="margin-top:22px;display:flex;align-items:baseline;gap:10px"><span class="count" id="skCount">0</span><span class="muted" style="font-size:20px">/ 5 ready</span></div>
 <a class="btn btn-primary" style="margin-top:20px" href="#/start">Get my documents</a></div>
 <div class="pile" id="skPile"><div class="folder-b"></div>${SDOCS.map((d,i)=>`<div class="sdoc" data-r="${d[3]}" style="--i:${i};--r:${d[3]};z-index:${i+2};top:${440-i*98}px"><i>${d[0]}</i><div><b>${d[1]}</b><span>${d[2]}</span></div><em>✓ Ready</em></div>`).join('')}<div class="folder-f"><b>Your US Company</b><span>Formation documents</span></div></div>
</div></section>`;}

/* ================= v3: FX ENGINE ================= */
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
function fxUpdate(){const vh=innerHeight;
 const st=$('#story');if(st){const r=st.getBoundingClientRect(),p=clamp(-r.top/(r.height-vh));
  const path=$('#stPath'),trail=$('#stTrail');if(path){const L=path.getTotalLength();trail.style.strokeDasharray=L;trail.style.strokeDashoffset=L*(1-p);const pt=path.getPointAtLength(L*p);const f=$('#stFile');f.style.left=(pt.x/12)+'%';f.style.top=(pt.y/7)+'%';const pa=path.getPointAtLength(Math.max(0,L*p-2)),pb=path.getPointAtLength(Math.min(L,L*p+2)),sw=st.clientWidth/1200,sh=innerHeight/700,fp=$('.fd-plane',f);if(fp)fp.style.transform=`rotate(${Math.atan2((pb.y-pa.y)*sh,(pb.x-pa.x)*sw)}rad)`;}
  $('#stDay').textContent=String(Math.round(p*7)).padStart(2,'0');$('#stBar').style.width=(p*100)+'%';const hd=$('#story .head'),ho=clamp(1-(p-.06)*7);if(hd){hd.style.opacity=ho;hd.style.transform=`translateY(${(1-ho)*-30}px)`;}const us=$('#stUsa');if(us)us.style.opacity=1-ho;
  $$('#story .ms').forEach(m=>m.classList.toggle('on',p>=(+m.dataset.at)-0.03));}
 const fl=$('#fly');if(fl){const r=fl.getBoundingClientRect(),p=clamp((vh-r.top)/(vh+r.height)),W=fl.clientWidth;const pl=$('.plane',fl);pl.style.transform=ANIM.f===7?`translateX(${-520+p*(W+620)}px) translateY(${fl.clientHeight*(.34-p*.78)}px) rotate(-15deg) scale(${.8+p*.35})`:`translateX(${-480+p*(W+700)}px) translateY(${(p-.5)*-60}px) rotate(${-6+p*10}deg)`;
  $$('.cloud',fl).forEach(c=>c.style.transform=`translateX(${(0.5-p)*(+c.dataset.s)*W*0.6}px)`);$('.fly-text',fl).style.opacity=clamp(1-Math.abs(p-.5)*2.2,0.15,1);}
 const sk=$('#stack');if(sk){const r=sk.getBoundingClientRect(),p=clamp(-r.top/(r.height-vh));const n=Math.min(5,Math.floor(p*6.2));
  $$('#skPile .sdoc').forEach((d,i)=>{const on=i<n;d.classList.toggle('in',on);d.style.setProperty('--k',on?1:0);});const pile=$('#skPile');if(pile)pile.style.setProperty('--spin',(-p*360)+'deg');$('#skCount').textContent=n;}
 $$('.ghost-word').forEach(g=>{const r=g.parentElement.getBoundingClientRect(),p=(vh-r.top)/(vh+r.height);g.style.transform=`translateX(${-p*30}%)`;});
 const sc=$('#stickyCta');if(sc)sc.classList.toggle('show',scrollY>700&&parseHash().page==='home');}
function initStory(){$$('#story .ms').forEach(m=>{const path=$('#stPath');if(!path)return;const L=path.getTotalLength(),pt=path.getPointAtLength(L*(+m.dataset.at));const i=+m.dataset.i;
  m.style.left=clamp(pt.x/12,9,91)+'%';m.style.top=`calc(${pt.y/7}% + ${i%2?26:-118}px)`;});}
let fxTick=false;addEventListener('scroll',()=>{if(!fxTick){fxTick=true;requestAnimationFrame(()=>{fxTick=false;fxUpdate();});}},{passive:true});
addEventListener('resize',()=>{initStory();fxUpdate();});

/* custom cursor */
(function(){if(matchMedia('(pointer:coarse)').matches)return;const ring=document.createElement('div'),dot=document.createElement('div');ring.className='cur-ring';dot.className='cur-dot';document.body.append(ring,dot);
 let x=-100,y=-100,rx=-100,ry=-100;addEventListener('pointermove',e=>{x=e.clientX;y=e.clientY;dot.style.transform=`translate(${x}px,${y}px)`;
  if(document.body.classList.contains('L17')){const c=e.target.closest&&e.target.closest('.card,.stat');if(c){const r=c.getBoundingClientRect();c.style.setProperty('--mx',(x-r.left)+'px');c.style.setProperty('--my',(y-r.top)+'px');}}});
 addEventListener('pointerover',e=>{ring.classList.toggle('big',!!(e.target.closest&&e.target.closest('a,button,select,label,input,.card')));});
 (function loop(){rx+=(x-rx)*.18;ry+=(y-ry)*.18;ring.style.transform=`translate(${rx}px,${ry}px)`;requestAnimationFrame(loop);})();})();

/* ================= v3: HERO ENGINES ================= */
const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;');
function startGlobe(cv){if(cv.dataset.on)return;cv.dataset.on=1;const ctx=cv.getContext('2d'),N=1100,pts=[],ga=Math.PI*(3-Math.sqrt(5));
 for(let i=0;i<N;i++){const y=1-(i/(N-1))*2,r=Math.sqrt(1-y*y),th=ga*i;pts.push([Math.cos(th)*r,y,Math.sin(th)*r]);}
 const ll=(la,lo)=>{la*=Math.PI/180;lo*=Math.PI/180;return [Math.cos(la)*Math.sin(lo),Math.sin(la),Math.cos(la)*Math.cos(lo)];};
 const A=ll(21,78),B=ll(38,-97),C=ll(51,0),D=ll(1,104),E=ll(25,55);const routes=[[A,B,1],[A,C,.45],[A,D,.35],[A,E,.3]];
 const slerp=(p,q,t)=>{const d=Math.acos(clamp(p[0]*q[0]+p[1]*q[1]+p[2]*q[2],-1,1)),s=Math.sin(d)||1e-6,k1=Math.sin((1-t)*d)/s,k2=Math.sin(t*d)/s;return [p[0]*k1+q[0]*k2,p[1]*k1+q[1]*k2,p[2]*k1+q[2]*k2];};
 let a=2.2,c1='#93B4FF',c2='#F59E0B',fr=0;
 (function tick(){if(!cv.isConnected)return;requestAnimationFrame(tick);const r=cv.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight||!r.width)return;
  const dpr=Math.min(2,devicePixelRatio||1),W=r.width,H=r.height;if(cv.width!==Math.round(W*dpr)){cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);}
  ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,W,H);
  if(fr++%30===0){const cs=getComputedStyle(document.body);c1=cs.getPropertyValue('--on-dark-accent').trim()||c1;c2=cs.getPropertyValue('--amber').trim()||c2;}
  a+=0.0022;const t=0.5,ca=Math.cos(a),sa=Math.sin(a),ct=Math.cos(t),stt=Math.sin(t),R=Math.min(W,H)*0.36,cx=W/2,cy=H/2;
  const P=v=>{const x=v[0]*ca+v[2]*sa,z=-v[0]*sa+v[2]*ca,y=v[1]*ct-z*stt,z2=v[1]*stt+z*ct;return [cx+x*R,cy-y*R,z2];};
  const g=ctx.createRadialGradient(cx,cy,R*.6,cx,cy,R*1.35);g.addColorStop(0,'rgba(120,150,255,.0)');g.addColorStop(.75,'rgba(120,150,255,.10)');g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
  ctx.strokeStyle='rgba(255,255,255,.14)';ctx.lineWidth=1;ctx.beginPath();ctx.arc(cx,cy,R,0,Math.PI*2);ctx.stroke();
  ctx.fillStyle=c1;for(const v of pts){const q=P(v);if(q[2]<0)continue;ctx.globalAlpha=.12+q[2]*.75;ctx.fillRect(q[0],q[1],1.7,1.7);}ctx.globalAlpha=1;
  const now=performance.now()/1000;
  routes.forEach(([p,q,w],k)=>{ctx.beginPath();let on=false;for(let i=0;i<=70;i++){const tt=i/70,v=slerp(p,q,tt),h=1+.2*w*Math.sin(Math.PI*tt),s=P([v[0]*h,v[1]*h,v[2]*h]);if(s[2]<-.2){on=false;continue;}if(!on){ctx.moveTo(s[0],s[1]);on=true;}else ctx.lineTo(s[0],s[1]);}
   ctx.strokeStyle=k===0?c2:'rgba(255,255,255,.35)';ctx.lineWidth=k===0?2.4:1.1;ctx.shadowColor=k===0?c2:'transparent';ctx.shadowBlur=k===0?12:0;ctx.stroke();ctx.shadowBlur=0;
   const tt=((now*.22)+k*.27)%1,v=slerp(p,q,tt),h=1+.2*w*Math.sin(Math.PI*tt),s=P([v[0]*h,v[1]*h,v[2]*h]);if(s[2]>-.2){ctx.fillStyle=k===0?'#fff':c1;ctx.beginPath();ctx.arc(s[0],s[1],k===0?4.5:2.4,0,7);ctx.fill();}});
  [[A,c2],[B,c1]].forEach(([v,c])=>{const s=P(v);if(s[2]>0){ctx.fillStyle=c;ctx.beginPath();ctx.arc(s[0],s[1],5,0,7);ctx.fill();ctx.strokeStyle=c;ctx.globalAlpha=.5;ctx.beginPath();ctx.arc(s[0],s[1],5+(now*14%16),0,7);ctx.stroke();ctx.globalAlpha=1;}});
 })();}
function startNet(cv){if(cv.dataset.on)return;cv.dataset.on=1;const ctx=cv.getContext('2d');let ps=[],m={x:-999,y:-999},col='#93B4FF',fr=0;const host=cv.parentElement;
 host.addEventListener('pointermove',e=>{const r=cv.getBoundingClientRect();m.x=e.clientX-r.left;m.y=e.clientY-r.top;});host.addEventListener('pointerleave',()=>{m.x=m.y=-999;});
 (function tick(){if(!cv.isConnected)return;requestAnimationFrame(tick);const r=cv.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight||!r.width)return;const dpr=Math.min(2,devicePixelRatio||1),W=r.width,H=r.height;
  if(cv.width!==Math.round(W*dpr)||!ps.length){cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);ps=Array.from({length:Math.min(140,Math.round(W*H/11000))},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.5,vy:(Math.random()-.5)*.5}));}
  if(fr++%30===0)col=getComputedStyle(document.body).getPropertyValue('--on-dark-accent').trim()||col;
  ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,W,H);ctx.strokeStyle=col;ctx.fillStyle=col;
  for(const p of ps){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;const dx=p.x-m.x,dy=p.y-m.y,d=Math.hypot(dx,dy);if(d<140){p.x+=dx/d*.6;p.y+=dy/d*.6;}}
  for(let i=0;i<ps.length;i++){const a=ps[i];for(let j=i+1;j<ps.length;j++){const b=ps[j],d=(a.x-b.x)**2+(a.y-b.y)**2;if(d<16900){ctx.globalAlpha=(1-d/16900)*.4;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}}
   const d=(a.x-m.x)**2+(a.y-m.y)**2;if(d<40000){ctx.globalAlpha=(1-d/40000)*.9;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(m.x,m.y);ctx.stroke();}}
  ctx.globalAlpha=.9;for(const p of ps){ctx.beginPath();ctx.arc(p.x,p.y,1.8,0,7);ctx.fill();}ctx.globalAlpha=1;})();}
function startTyper(pre){if(pre.dataset.on)return;pre.dataset.on=1;const L=[['cm','$ juris launch --name "Sharma Tech" --type LLC --state WY'],['dim','› Checking name availability…'],['ok','  ✓ Name looks available'],['dim','› Preparing articles of organization…'],['ok','  ✓ Ready for filing'],['dim','› Filing with the State of Wyoming…'],['ok','  ✓ Filed · ~7 business days'],['dim','› EIN application with the IRS… [timeline to confirm]'],['cm','  Total: $249 + $103.75 state fee = $352.75'],['ok','✓ Your US company is on its way 🚀']];
 let li=0,ci=0,html='';const caret='<span class="caret"></span>';
 (function step(){if(!pre.isConnected)return;if(li>=L.length){setTimeout(()=>{li=0;ci=0;html='';step();},3500);return;}const [c,t]=L[li];ci++;pre.innerHTML=html+`<span class="${c}">${esc(t.slice(0,ci))}</span>`+caret;
  if(ci>=t.length){html+=`<span class="${c}">${esc(t)}</span>\n`;li++;ci=0;setTimeout(step,c==='dim'?450:200);}else setTimeout(step,c==='cm'?26:12);})();}
function startCountdown(el){if(el.dataset.on)return;el.dataset.on=1;const lab=['Tell us about you','Expert review','Filing with the state','Filing with the state','Filing with the state','Filing with the state','Filing with the state','Company formed ✓'];let d=0;const arc=$('.cd-arc',el);arc.style.transition='stroke-dashoffset .8s ease';
 (function step(){if(!el.isConnected)return;$('.cd-n',el).textContent=d;$('.cd-l',el).textContent=lab[d];arc.style.strokeDashoffset=553*(1-d/7);const wait=d===7?2400:850;d=d>=7?0:d+1;setTimeout(step,wait);})();}
function initHeroFx(root){
 $$('.cv-globe',root).forEach(startGlobe2);$$('.cv-net',root).forEach(startNet);$$('.typer',root).forEach(startTyper);$$('.cd',root).forEach(startCountdown);
 $$('.h17',root).forEach(h=>h.onpointermove=e=>{const r=h.getBoundingClientRect();h.style.setProperty('--mx',(e.clientX-r.left)+'px');h.style.setProperty('--my',(e.clientY-r.top)+'px');});
 $$('.tilt',root).forEach(t=>{const inn=$('.tilt-inner',t);t.onpointermove=e=>{const r=t.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;inn.style.transform=`rotateY(${x*26}deg) rotateX(${-y*20}deg)`;};t.onpointerleave=()=>inn.style.transform='';});}

/* ================= v3: RECOMMENDATION PANEL ================= */
function recPanel(){const p=$('#recp');if(!p)return;const T=THEMES,H=HEROES,Ly=LAYOUTS;
 const now=(cat,i,name)=>{const k=rankOf(cat,i);return `<div class="now">Current ${cat}: <b>${i+1}. ${name}</b> ${k?`— ★ Recommended #${k}<br><span style="color:#CBD5E1">${RECS[cat][k-1][1]}</span>`:'<span style="color:#94A3B8">— not in our top 3</span>'}</div>`;};
 const list=(cat,arr,nameOf)=>RECS[cat].map((r,k)=>`<div class="ri ${cur[cat]===r[0]?'sel':''}" data-apply="${cat}:${r[0]}"><span class="m">${k+1}</span><div><b>${r[0]+1}. ${nameOf(arr[r[0]])}</b><br><span>${r[1]}</span></div></div>`).join('');
 p.innerHTML=`<div style="display:flex;justify-content:space-between;align-items:center"><b style="font-size:16px">★ Our recommendations</b><button type="button" id="recClose" style="background:#3B2A7A;color:#fff;border:0;border-radius:8px;padding:6px 10px;cursor:pointer">Close</button></div>
 <h4>One-click combos</h4><div class="combos">${COMBOS.map((c,i)=>`<button type="button" data-combo="${i}"><b>${c.n}</b><br>Theme ${c.t+1} + Hero ${c.h+1} + Layout ${c.l+1} — ${c.why}</button>`).join('')}</div>
 <h4>Theme</h4>${now('theme',cur.theme,T[cur.theme].n)}${list('theme',T,x=>x.n)}
 <h4>Hero</h4>${now('hero',cur.hero,H[cur.hero][0])}${list('hero',H,x=>x[0])}
 <h4>Home layout</h4>${now('layout',cur.layout,Ly[cur.layout].n)}${list('layout',Ly,x=>x.n)}`;
 $('#recClose').onclick=()=>p.classList.remove('open');
 $$('[data-combo]',p).forEach(b=>b.onclick=()=>{const c=COMBOS[+b.dataset.combo];applyTheme(c.t);applyLayout(c.l);cur.hero=c.h;store.set('hero3',c.h);if(parseHash().page!=='home')location.hash='#/home';else render();updRanks();});
 $$('[data-apply]',p).forEach(d=>d.onclick=()=>{const [cat,i]=d.dataset.apply.split(':');const n=+i;if(cat==='theme')applyTheme(n);if(cat==='layout'){applyLayout(n);if(parseHash().page!=='home')location.hash='#/home';}if(cat==='hero'){if(parseHash().page!=='home'){cur.hero=n;store.set('hero3',n);location.hash='#/home';}else applyHero(n);}updRanks();});}
function updRanks(){const f=(cat,i)=>{const k=rankOf(cat,i);return k?'★'+k:'';};$('#rkT').textContent=f('theme',cur.theme);$('#rkH').textContent=f('hero',cur.hero);$('#rkL').textContent=f('layout',cur.layout);recPanel();}

/* coarse hand-drawn continents [lat,lon] — impressionistic dotted globe */
const LAND=[
 [[66,-168],[71,-156],[70,-141],[69,-133],[70,-128],[68,-115],[68,-100],[69,-94],[67,-87],[69,-81],[64,-87],[62,-78],[60,-77],[60,-70],[58,-64],[55,-60],[52,-56],[47,-53],[45,-61],[44,-66],[41,-70],[35,-76],[31,-81],[25,-80],[27,-82],[30,-84],[29,-89],[29,-94],[26,-97],[21,-97],[18,-95],[21,-87],[18,-88],[15,-83],[11,-83],[9,-79],[8,-77],[8,-82],[13,-88],[16,-95],[20,-105],[23,-110],[31,-114],[32,-117],[34,-120],[38,-123],[42,-124],[48,-125],[54,-130],[58,-137],[60,-146],[59,-153],[57,-158],[55,-163],[60,-165],[64,-166]],
 [[60,-44],[65,-40],[70,-22],[76,-19],[82,-25],[83,-40],[82,-60],[78,-72],[76,-68],[70,-54],[65,-52]],
 [[70,-120],[74,-125],[77,-118],[80,-100],[83,-75],[80,-65],[76,-78],[73,-80],[70,-85],[72,-95]],
 [[12,-72],[11,-64],[10,-62],[8,-60],[5,-52],[2,-50],[-1,-48],[-3,-40],[-5,-35],[-8,-35],[-13,-38],[-18,-39],[-23,-42],[-25,-48],[-29,-49],[-33,-52],[-35,-55],[-37,-57],[-39,-62],[-42,-63],[-46,-67],[-50,-68],[-53,-69],[-55,-67],[-55,-71],[-52,-75],[-46,-75],[-40,-74],[-33,-72],[-27,-71],[-18,-70],[-14,-76],[-6,-81],[-2,-80],[1,-79],[4,-77],[8,-77],[9,-76],[11,-75]],
 [[37,-9],[43,-9],[43,-2],[47,-2],[48,-5],[50,1],[53,5],[54,9],[57,8],[58,6],[62,5],[66,13],[70,19],[71,26],[70,30],[69,40],[67,44],[68,55],[69,67],[73,70],[72,80],[76,95],[77,105],[74,112],[73,128],[72,140],[71,150],[70,160],[69,170],[69,180],[65,180],[62,177],[60,170],[60,163],[57,162],[51,157],[57,156],[59,155],[59,143],[54,137],[50,140],[46,138],[42,132],[40,129],[35,129],[37,126],[39,125],[40,122],[38,118],[35,120],[31,122],[27,120],[23,117],[22,113],[21,109],[18,106],[16,108],[11,109],[9,105],[10,104],[13,100],[7,100],[2,103],[1,104],[4,100],[8,98],[16,97],[16,94],[22,91],[22,88],[20,86],[16,81],[13,80],[8,77],[10,76],[15,74],[21,72],[23,68],[25,62],[25,57],[27,56],[30,49],[29,48],[24,54],[22,60],[17,55],[13,45],[15,43],[20,40],[28,34],[30,33],[31,32],[33,35],[36,36],[37,30],[36,28],[39,26],[41,29],[41,28],[40,26],[38,24],[36,22],[39,20],[42,19],[45,13],[40,18],[38,16],[41,13],[44,9],[43,6],[43,3],[41,1],[38,0],[36,-5]],
 [[50,-5],[51,1],[53,0],[55,-2],[58,-3],[58,-5],[55,-6],[52,-5]],
 [[52,-10],[54,-10],[55,-7],[54,-6],[52,-6]],
 [[64,-22],[66,-23],[66,-15],[64,-14]],
 [[31,-10],[35,-6],[37,10],[33,11],[32,20],[31,25],[31,32],[30,33],[22,37],[15,39],[12,43],[11,51],[2,46],[-4,40],[-10,40],[-15,41],[-20,35],[-25,35],[-30,31],[-34,26],[-35,20],[-32,18],[-28,16],[-22,14],[-17,12],[-12,14],[-6,12],[-1,9],[4,9],[4,6],[6,2],[5,-5],[4,-8],[7,-13],[11,-15],[15,-17],[21,-17],[26,-14],[28,-12]],
 [[-12,49],[-16,50],[-25,47],[-25,44],[-16,44]],
 [[6,80],[9,80],[8,82],[6,81.5]],
 [[5,95],[0,99],[-6,105],[-3,106],[2,101],[5,98]],
 [[7,117],[1,119],[-4,116],[-3,110],[1,109],[4,114]],
 [[-6,105],[-8,114],[-8,111],[-6,106]],
 [[1,125],[-5,123],[-5,119],[0,120]],
 [[-1,131],[-3,141],[-8,148],[-10,150],[-8,143],[-9,140],[-5,135],[-4,132]],
 [[18,121],[14,124],[7,126],[6,122],[10,119],[14,120]],
 [[31,130],[34,131],[35,136],[36,140],[41,140],[41,142],[38,141],[35,140],[34,136],[33,132]],
 [[42,140],[45,142],[43,145],[42,143]],
 [[25,121],[22,120.5],[23,120]],
 [[-11,142],[-17,141],[-12,136],[-12,131],[-15,129],[-14,126],[-18,122],[-21,116],[-22,114],[-26,113],[-32,115],[-35,117],[-34,123],[-32,127],[-32,133],[-35,136],[-35,139],[-38,140],[-39,146],[-37,150],[-33,152],[-28,153],[-24,152],[-19,147],[-15,145]],
 [[-41,145],[-41,148],[-43,147],[-43,146]],
 [[-35,173],[-37,176],[-41,176],[-41,174],[-46,170],[-46,167],[-43,170],[-40,172]],
 [[23,-84],[23,-80],[20,-74],[20,-77],[22,-80]],
 [[20,-74],[20,-69],[18,-68],[18,-74]]
];
const WATER=[
 [[60,-94],[55,-88],[52,-80],[56,-77],[62,-78],[64,-87]],
 [[54,14],[55,21],[59,23],[60,30],[61,22],[65,25],[66,22],[63,18],[59,18],[56,16]],
 [[41,29],[42,35],[41,41],[44,39],[46,37],[46,31],[44,29]],
 [[37,53],[41,50],[45,47],[47,51],[45,53],[41,53],[37,54]]
];
function inPoly(la,lo,P){let c=false;for(let i=0,j=P.length-1;i<P.length;j=i++){const a=P[i],b=P[j];if(((a[0]>la)!==(b[0]>la))&&(lo<(b[1]-a[1])*(la-a[0])/(b[0]-a[0])+a[1]))c=!c;}return c;}
function isLand(la,lo){if(la<-68)return true;if(WATER.some(P=>inPoly(la,lo,P)))return false;return LAND.some(P=>inPoly(la,lo,P));}
if(typeof module!=='undefined')module.exports={isLand};


/* ================= v3.1: helpers ================= */
const hexRGB=h=>{h=(h||'').trim();if(h.startsWith('rgb')){const m=h.match(/[\d.]+/g);return m?m.slice(0,3).map(Number):[150,180,255];}h=h.replace('#','');if(h.length===3)h=h.split('').map(c=>c+c).join('');const n=parseInt(h,16);return isNaN(n)?[150,180,255]:[n>>16&255,n>>8&255,n&255];};
const rgba=(c,a)=>`rgba(${c[0]},${c[1]},${c[2]},${a})`;
const themeCols=()=>{const cs=getComputedStyle(document.body);return {c1:hexRGB(cs.getPropertyValue('--on-dark-accent')),c2:hexRGB(cs.getPropertyValue('--amber')),c3:hexRGB(cs.getPropertyValue('--blue'))};};
let fxSpeed=0,fxLastY=scrollY;
const scrollProg=document.createElement('div');scrollProg.className='scroll-prog';document.body.appendChild(scrollProg);
addEventListener('scroll',()=>{const y=scrollY;fxSpeed=Math.min(4,fxSpeed+Math.abs(y-fxLastY)*0.002);fxLastY=y;const h=document.documentElement.scrollHeight-innerHeight;scrollProg.style.transform=`scaleX(${h>0?y/h:0})`;},{passive:true});

/* ================= v3.1: REALISTIC GLOBE ================= */
const GLOBE_DOTS=(()=>{let cache=null;return ()=>{if(cache)return cache;const N=18000,ga=Math.PI*(3-Math.sqrt(5)),land=[],sea=[];
 for(let i=0;i<N;i++){const y=1-(i/(N-1))*2,r=Math.sqrt(1-y*y),th=ga*i,x=Math.cos(th)*r,z=Math.sin(th)*r;const la=Math.asin(y)*180/Math.PI,lo=Math.atan2(x,z)*180/Math.PI;
  if(isLand(la,lo))land.push([x,y,z,Math.random()]);else if(i%4===0)sea.push([x,y,z]);}
 return cache={land,sea};};})();
function startGlobe2(cv){if(cv.dataset.on)return;cv.dataset.on=1;const M=ANIM.g;if(M===4)return startTiltMap(cv);const ctx=cv.getContext('2d'),{land,sea}=GLOBE_DOTS();const spikes=land.filter((_,i)=>i%45===0).map(v=>[v,.05+Math.random()*.14,Math.random()*6]);
 const ll=(la,lo)=>{la*=Math.PI/180;lo*=Math.PI/180;return [Math.cos(la)*Math.sin(lo),Math.sin(la),Math.cos(la)*Math.cos(lo)];};
 const C={syd:ll(-33.9,151.2),los:ll(6.5,3.4),gru:ll(-23.5,-46.6),tyo:ll(35.7,139.7),fra:ll(50.1,8.7),del:ll(28.6,77.2),bom:ll(19.1,72.9),blr:ll(12.97,77.6),nyc:ll(40.7,-74),sfo:ll(37.8,-122.4),wy:ll(41.1,-104.8),de:ll(39.2,-75.5),tx:ll(30.3,-97.7),lon:ll(51.5,-.1),dxb:ll(25.2,55.3),sin:ll(1.35,103.8)};
 const routes=[[C.del,C.nyc,1,1],[C.lon,C.nyc,.55,1],[C.dxb,C.tx,.8,1],[C.sin,C.sfo,.9,1],[C.syd,C.sfo,.8,1],[C.los,C.de,.6,1],[C.gru,C.tx,.5,1],[C.tyo,C.wy,.75,1],[C.fra,C.de,.6,1],[C.bom,C.sfo,.85,1]];
 const ORIG=[[C.del,'INDIA'],[C.lon,'UK'],[C.dxb,'UAE'],[C.sin,'SINGAPORE'],[C.syd,'AUSTRALIA'],[C.los,'NIGERIA'],[C.gru,'BRAZIL'],[C.tyo,'JAPAN'],[C.fra,'GERMANY']];
 const slerp=(p,q,t)=>{const d=Math.acos(clamp(p[0]*q[0]+p[1]*q[1]+p[2]*q[2],-1,1)),s=Math.sin(d)||1e-6,k1=Math.sin((1-t)*d)/s,k2=Math.sin(t*d)/s;return [p[0]*k1+q[0]*k2,p[1]*k1+q[1]*k2,p[2]*k1+q[2]*k2];};
 const rpts=routes.map(([p,q,w])=>Array.from({length:91},(_,i)=>{const t=i/90,v=slerp(p,q,t),h=1+.26*w*Math.sin(Math.PI*t);return [v[0]*h,v[1]*h,v[2]*h];}));
 const stars=Array.from({length:90},()=>[Math.random(),Math.random(),Math.random()*1.4+.3,Math.random()*6]);
 const L=(()=>{const v=[-.55,.5,.67],n=Math.hypot(...v);return v.map(x=>x/n);})();
 let col=themeCols(),fr=0,rot=0,vel=0,drag=null;
 cv.style.touchAction='pan-y';cv.style.cursor='grab';
 cv.addEventListener('pointerdown',e=>{drag={x:e.clientX};cv.setPointerCapture(e.pointerId);cv.style.cursor='grabbing';});
 cv.addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-drag.x;drag.x=e.clientX;rot+=dx*0.006;vel=dx*0.006;});
 const up=()=>{drag=null;cv.style.cursor='grab';};cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',up);
 (function tick(){if(!cv.isConnected)return;requestAnimationFrame(tick);const r=cv.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight||!r.width)return;
  const dpr=Math.min(2,devicePixelRatio||1),W=r.width,H=r.height;if(cv.width!==Math.round(W*dpr)){cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);}
  if(fr++%40===0)col=themeCols();let {c1,c2,c3}=col;if(M===5){c1=[243,217,139];c2=[229,182,73];c3=[120,90,30];}if(M===9){c1=[226,232,240];c3=[71,85,105];}
  ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,W,H);
  const now=performance.now()/1000;if(!drag){vel*=.95;rot+=vel;rot*=.995;}
  const center=172-now*6,a=-center*Math.PI/180+rot,T=.55,ca=Math.cos(a),sa=Math.sin(a),ct=Math.cos(T),st=Math.sin(T);
  const R=Math.min(W,H)*.33,cx=W/2,cy=H/2+R*.04;
  const rotv=v=>{const x=v[0]*ca+v[2]*sa,z=-v[0]*sa+v[2]*ca;return [x,v[1]*ct-z*st,v[1]*st+z*ct];};
  const scr=q=>[cx+q[0]*R,cy-q[1]*R];
  /* stars */
  if(M!==9)for(const s of stars){const x=s[0]*W,y=s[1]*H;if(Math.hypot(x-cx,y-cy)<R*1.1)continue;ctx.globalAlpha=.15+.35*(.5+.5*Math.sin(now*1.5+s[3]));ctx.fillStyle='#fff';ctx.fillRect(x,y,s[2],s[2]);}ctx.globalAlpha=1;
  /* atmosphere */
  let g=ctx.createRadialGradient(cx,cy,R*.92,cx,cy,R*1.38);g.addColorStop(0,rgba(c1,.42));g.addColorStop(.3,rgba(c3,.16));g.addColorStop(1,rgba(c3,0));ctx.fillStyle=g;ctx.beginPath();ctx.arc(cx,cy,R*1.38,0,7);ctx.fill();
  /* orbit ring – back half */
  const ring=[],inc=1.22,rz=-.32;for(let i=0;i<=120;i++){const th=i/120*Math.PI*2;let x=Math.cos(th)*1.24,y=0,z=Math.sin(th)*1.24;const y2=y*Math.cos(inc)-z*Math.sin(inc),z2=y*Math.sin(inc)+z*Math.cos(inc);ring.push([x*Math.cos(rz)-y2*Math.sin(rz),x*Math.sin(rz)+y2*Math.cos(rz),z2]);}
  const drawRing=front=>{ctx.strokeStyle=rgba(c1,front?.35:.12);ctx.lineWidth=1;ctx.setLineDash([3,6]);ctx.beginPath();let on=false;for(const q of ring){if((q[2]>=0)!==front){on=false;continue;}const s=scr(q);if(!on){ctx.moveTo(s[0],s[1]);on=true;}else ctx.lineTo(s[0],s[1]);}ctx.stroke();ctx.setLineDash([]);};
  if(M!==9)drawRing(false);
  /* body */
  if(M===1){g=ctx.createRadialGradient(cx,cy,R*.2,cx,cy,R);g.addColorStop(0,rgba(c3,.04));g.addColorStop(1,rgba(c1,.10));}else if(M===2){g=ctx.createRadialGradient(cx-R*.4,cy-R*.4,R*.05,cx,cy,R*1.02);g.addColorStop(0,'#0B1226');g.addColorStop(1,'#010207');}else{g=ctx.createRadialGradient(cx-R*.42,cy-R*.45,R*.05,cx,cy,R*1.02);g.addColorStop(0,rgba(c3,.55));g.addColorStop(.45,'#0A1430');g.addColorStop(1,'#02040B');}ctx.fillStyle=g;ctx.beginPath();ctx.arc(cx,cy,R,0,7);ctx.fill();
  /* graticule */
  ctx.strokeStyle=M===1?rgba(c1,.22):'rgba(255,255,255,.055)';ctx.lineWidth=1;
  const line=pts=>{ctx.beginPath();let on=false;for(const v of pts){const q=rotv(v);if(q[2]<0){on=false;continue;}const s=scr(q);if(!on){ctx.moveTo(s[0],s[1]);on=true;}else ctx.lineTo(s[0],s[1]);}ctx.stroke();};
  const gs=M===1?15:30;if(M!==9){for(let la=-90+gs;la<90;la+=gs)line(Array.from({length:61},(_,i)=>ll(la,i*6)));
  for(let lo=0;lo<180;lo+=gs)line(Array.from({length:61},(_,i)=>ll(-90+i*3,lo)).concat(Array.from({length:61},(_,i)=>ll(90-i*3,lo+180))));}
  /* sea dots */
  ctx.fillStyle=rgba(c1,1);if(M!==2&&M!==9)for(const v of sea){const q=rotv(v);if(q[2]<.02)continue;const s=scr(q);ctx.globalAlpha=.05+.1*q[2];ctx.fillRect(s[0],s[1],1,1);}
  /* land dots + night lights */
  const lights=[];
  const scan=((now*.22)%1.3)-.15;
  for(const v of land){const q=rotv(v);if(q[2]<0){if(M===1){const s=scr(q);ctx.globalAlpha=.07;ctx.fillRect(s[0],s[1],1,1);}continue;}const lam=q[0]*L[0]+q[1]*L[1]+q[2]*L[2],day=clamp(lam*1.5+.3);const s=scr(q),sz=1+q[2]*1.25;
   if(M===1){const dy=(s[1]-(cy-R))/(2*R)-scan;ctx.globalAlpha=(.25+.5*q[2])+Math.exp(-dy*dy*400)*.8;ctx.fillRect(s[0]-sz/2,s[1]-sz/2,sz,sz);continue;}
   if(M===2){if(v[3]<.22){lights.push([s[0],s[1],v[3]]);continue;}ctx.globalAlpha=.07+.08*q[2];ctx.fillRect(s[0]-sz/2,s[1]-sz/2,sz,sz);continue;}
   if(M===6){const f=1+.03*Math.sin(now*2.2+v[3]*40),s2=scr([q[0]*f,q[1]*f,q[2]]),z=1.2+1.6*q[2]*(.5+.5*Math.sin(now*1.5+v[3]*30));ctx.globalAlpha=.25+.6*q[2];ctx.fillStyle=rgba(v[3]<.3?c2:c1,1);ctx.beginPath();ctx.arc(s2[0],s2[1],z/2,0,7);ctx.fill();continue;}
   if(M===7){let an=Math.atan2(s[1]-cy,s[0]-cx);const sw=(now*1.3)%(Math.PI*2);let dd=(sw-an+Math.PI*4)%(Math.PI*2);ctx.globalAlpha=(.12+.88*Math.exp(-dd*2.2))*(.4+.6*q[2]);ctx.fillRect(s[0]-sz/2,s[1]-sz/2,sz,sz);continue;}
   if(M===9){if(v[3]>.5)continue;ctx.globalAlpha=.3+.6*q[2];ctx.beginPath();ctx.arc(s[0],s[1],1.1+q[2]*.6,0,7);ctx.fill();continue;}
   if(M===3||M===5||M===8){ctx.globalAlpha=M===3?.2+.45*q[2]:(.15+.85*day)*(.45+.55*q[2]);ctx.fillRect(s[0]-sz/2,s[1]-sz/2,sz,sz);continue;}
   if(day<.35&&v[3]<.09){lights.push([s[0],s[1],v[3]]);continue;}
   ctx.globalAlpha=(.1+.9*day)*(.45+.55*q[2]);ctx.fillRect(s[0]-sz/2,s[1]-sz/2,sz,sz);}
  ctx.fillStyle=rgba(c1,1);
  if(M===7){const sw=(now*1.3)%(Math.PI*2);ctx.save();ctx.beginPath();ctx.arc(cx,cy,R,0,7);ctx.clip();if(ctx.createConicGradient){const cg=ctx.createConicGradient(sw-1.1,cx,cy);cg.addColorStop(0,rgba(c1,0));cg.addColorStop(1.1/(Math.PI*2),rgba(c1,.32));cg.addColorStop(1.1/(Math.PI*2)+.003,rgba(c1,0));cg.addColorStop(1,rgba(c1,0));ctx.globalAlpha=1;ctx.fillStyle=cg;ctx.fillRect(cx-R,cy-R,2*R,2*R);}ctx.strokeStyle=rgba(c1,.8);ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.cos(sw)*R,cy+Math.sin(sw)*R);ctx.stroke();ctx.strokeStyle=rgba(c1,.15);[.33,.66].forEach(f=>{ctx.beginPath();ctx.arc(cx,cy,R*f,0,7);ctx.stroke();});ctx.restore();ctx.fillStyle=rgba(c1,1);}
  if(M===1){ctx.save();ctx.beginPath();ctx.arc(cx,cy,R,0,7);ctx.clip();const sy=cy-R+scan*2*R;const gg=ctx.createLinearGradient(0,sy-30,0,sy+4);gg.addColorStop(0,rgba(c1,0));gg.addColorStop(1,rgba(c1,.35));ctx.globalAlpha=1;ctx.fillStyle=gg;ctx.fillRect(cx-R,sy-30,2*R,34);ctx.fillStyle=rgba(c1,.9);ctx.fillRect(cx-R,sy+3,2*R,1.2);ctx.restore();}
  if(M===3){ctx.globalAlpha=1;ctx.lineCap='round';for(const [v,h,ph] of spikes){const q=rotv(v);if(q[2]<.05)continue;const hh=h*(.6+.4*Math.sin(now*1.4+ph)),s0=scr(q),s1=scr([q[0]*(1+hh),q[1]*(1+hh),q[2]]);ctx.strokeStyle=rgba(c1,.35+.5*q[2]);ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(s0[0],s0[1]);ctx.lineTo(s1[0],s1[1]);ctx.stroke();}
   [C.del,C.bom,C.blr,C.nyc,C.sfo,C.wy,C.tx].forEach((v,i)=>{const q=rotv(v);if(q[2]<.05)return;const hh=(i<3?.32:.26)*(.85+.15*Math.sin(now*2+i)),s0=scr(q),s1=scr([q[0]*(1+hh),q[1]*(1+hh),q[2]]);const cc=i<3?c2:c1;const gg=ctx.createLinearGradient(s0[0],s0[1],s1[0],s1[1]);gg.addColorStop(0,rgba(cc,.2));gg.addColorStop(1,rgba(cc,1));ctx.strokeStyle=gg;ctx.lineWidth=4;ctx.shadowColor=rgba(cc,1);ctx.shadowBlur=12;ctx.beginPath();ctx.moveTo(s0[0],s0[1]);ctx.lineTo(s1[0],s1[1]);ctx.stroke();ctx.shadowBlur=0;});ctx.lineCap='butt';}
  ctx.globalAlpha=1;
  /* night side shading */
  if(M===0||M===2||M===5||M===8){ctx.save();ctx.beginPath();ctx.arc(cx,cy,R,0,7);ctx.clip();
  g=ctx.createRadialGradient(cx+L[0]*R*.75,cy-L[1]*R*.75,R*.1,cx+L[0]*R*.3,cy-L[1]*R*.3,R*1.75);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(.5,'rgba(0,0,0,.05)');g.addColorStop(1,'rgba(0,2,10,.72)');ctx.fillStyle=g;ctx.fillRect(cx-R,cy-R,R*2,R*2);
  g=ctx.createRadialGradient(cx,cy,R*.78,cx,cy,R);g.addColorStop(0,rgba(c1,0));g.addColorStop(1,rgba(c1,.22));ctx.fillStyle=g;ctx.fillRect(cx-R,cy-R,R*2,R*2);
  ctx.restore();}
  /* city lights */
  ctx.fillStyle=rgba(c2,1);ctx.shadowColor=rgba(c2,1);ctx.shadowBlur=6;const ls=M===2?2.2:1.8;ctx.shadowBlur=M===2?9:6;for(const l of lights){ctx.globalAlpha=.5+.5*Math.sin(now*2+l[2]*60);ctx.fillRect(l[0]-ls/2,l[1]-ls/2,ls,ls);}ctx.shadowBlur=0;ctx.globalAlpha=1;
  /* rim light */
  g=ctx.createLinearGradient(cx-R,cy-R,cx+R,cy+R);g.addColorStop(0,rgba(c1,.85));g.addColorStop(.5,rgba(c1,.15));g.addColorStop(1,rgba(c1,0));ctx.strokeStyle=g;ctx.lineWidth=1.6;ctx.beginPath();ctx.arc(cx,cy,R,0,7);ctx.stroke();
  /* routes */
  const vis=q=>q[2]>=0||Math.hypot(q[0],q[1])>1;
  rpts.forEach((pts,k)=>{if(M===9&&k>3)return;const main=routes[k][3],cc=(M===2||k%2===0)?c2:c1;const P=pts.map(rotv);
   ctx.lineWidth=k===0?1.6:1;ctx.strokeStyle=rgba(cc,main?.28:.16);ctx.beginPath();let on=false;for(const q of P){if(!vis(q)){on=false;continue;}const s=scr(q);if(!on){ctx.moveTo(s[0],s[1]);on=true;}else ctx.lineTo(s[0],s[1]);}ctx.stroke();
   if(!main)return;const head=((now*.16)+k*.29)%1,hi=Math.round(head*90),tl=24;
   for(let i=Math.max(1,hi-tl);i<=hi;i++){const q0=P[i-1],q1=P[i];if(!vis(q0)||!vis(q1))continue;const f=1-(hi-i)/tl,s0=scr(q0),s1=scr(q1);ctx.strokeStyle=rgba(cc,f*.95);ctx.lineWidth=(k===0?3.2:2.2)*f+.3;ctx.beginPath();ctx.moveTo(s0[0],s0[1]);ctx.lineTo(s1[0],s1[1]);ctx.stroke();}
   const qh=P[hi];if(M===8){const qa=P[Math.max(0,hi-1)],qb2=P[Math.min(90,hi+1)];if(vis(qh)){const s=scr(qh),sa2=scr(qa),sb=scr(qb2);drawPlaneGlyph(ctx,s[0],s[1],Math.atan2(sb[1]-sa2[1],sb[0]-sa2[0]),1.5,'#fff');}return;}if(vis(qh)){const s=scr(qh);ctx.fillStyle='#fff';ctx.shadowColor=rgba(cc,1);ctx.shadowBlur=16;ctx.beginPath();ctx.arc(s[0],s[1],k===0?3.6:2.6,0,7);ctx.fill();ctx.shadowBlur=0;}});
  /* city markers + labels */
  const mk=(v,cc,label,dx)=>{const q=rotv(v);if(q[2]<.05)return;const s=scr(q),ph=(now*.9)%1;if(dx===0)dx=s[0]<cx?-1:1;ctx.fillStyle=rgba(cc,1);ctx.beginPath();ctx.arc(s[0],s[1],3.4,0,7);ctx.fill();ctx.strokeStyle=rgba(cc,.8*(1-ph));ctx.lineWidth=1.4;ctx.beginPath();ctx.arc(s[0],s[1],4+ph*16,0,7);ctx.stroke();
   if(label){ctx.font='700 12px Inter,system-ui,sans-serif';const tw=ctx.measureText(label).width,x=clamp(s[0]+dx*(tw/2+22),tw/2+14,W-tw/2-14),y=s[1]-22;ctx.globalAlpha=Math.min(1,q[2]*4);ctx.fillStyle='rgba(8,12,28,.75)';ctx.strokeStyle=rgba(cc,.6);ctx.lineWidth=1;ctx.beginPath();ctx.roundRect?ctx.roundRect(x-tw/2-10,y-12,tw+20,24,12):ctx.rect(x-tw/2-10,y-12,tw+20,24);ctx.fill();ctx.stroke();ctx.fillStyle='#fff';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(label,x,y+1);ctx.globalAlpha=1;}};
  mk(C.bom,c2);mk(C.sfo,c1);mk(C.wy,c1);mk(C.tx,c1);mk(C.de,c1);ORIG.forEach(([v,l])=>{const q=rotv(v);mk(v,c2,q[2]>.3?l:'',0);});mk(C.nyc,c1,'USA',0);
  /* ring front + satellite */
  if(M!==9){drawRing(true);}const si=Math.floor((now*6)%120),sq=ring[si];if(M!==9&&sq[2]>=0||Math.hypot(sq[0],sq[1])>1){const s=scr(sq);ctx.fillStyle='#fff';ctx.shadowColor=rgba(c1,1);ctx.shadowBlur=12;ctx.beginPath();ctx.arc(s[0],s[1],2.6,0,7);ctx.fill();ctx.shadowBlur=0;}
 })();}

/* ================= v3.1: STORY BACKGROUND (warp road) ================= */
function startStoryBg(cv){if(cv.dataset.on)return;cv.dataset.on=1;if(ANIM.s>0)return startStoryAlt(cv,ANIM.s);const ctx=cv.getContext('2d');let col=themeCols(),fr=0,off=0,last=performance.now();
 const P=Array.from({length:240},()=>({x:(Math.random()-.5)*2.2,y:(Math.random()-.5)*1.2,z:Math.random()}));
 (function tick(){if(!cv.isConnected)return;requestAnimationFrame(tick);const r=cv.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight||!r.width)return;
  const now=performance.now(),dt=Math.min(.05,(now-last)/1000);last=now;fxSpeed*=.94;
  const dpr=Math.min(2,devicePixelRatio||1),W=r.width,H=r.height;if(cv.width!==Math.round(W*dpr)){cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);}
  if(fr++%40===0)col=themeCols();const {c1,c2,c3}=col;ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,W,H);
  const sp=.08+fxSpeed*.55;off=(off+dt*(.35+fxSpeed*2.2))%1;
  const hy=H*.6,vx=W/2;
  /* horizon glow */
  let g=ctx.createLinearGradient(0,hy-120,0,hy+60);g.addColorStop(0,rgba(c3,0));g.addColorStop(.7,rgba(c3,.16));g.addColorStop(.85,rgba(c2,.18));g.addColorStop(1,rgba(c3,0));ctx.fillStyle=g;ctx.fillRect(0,hy-120,W,180);
  ctx.strokeStyle=rgba(c1,.35);ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(0,hy);ctx.lineTo(W,hy);ctx.stroke();
  /* perspective floor */
  ctx.save();ctx.beginPath();ctx.rect(0,hy,W,H-hy);ctx.clip();
  for(let i=-16;i<=16;i++){const xb=vx+i*W*.09;ctx.strokeStyle=rgba(c1,i===0?.0:.10);ctx.beginPath();ctx.moveTo(vx+i*6,hy);ctx.lineTo(xb,H);ctx.stroke();}
  for(let j=0;j<16;j++){const d=(j+off)/16,y=hy+(H-hy)*d*d;ctx.strokeStyle=rgba(c1,.03+.22*d);ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
  /* centre lane dashes */
  for(let j=0;j<10;j++){const d=((j+off*2)%10)/10,d2=Math.min(1,d+.04),y1=hy+(H-hy)*d*d,y2=hy+(H-hy)*d2*d2;ctx.strokeStyle=rgba(c2,.15+.5*d);ctx.lineWidth=1+d*4;ctx.beginPath();ctx.moveTo(vx,y1);ctx.lineTo(vx,y2);ctx.stroke();}
  ctx.restore();ctx.lineWidth=1;
  /* speed streaks */
  for(const p of P){const z0=p.z;p.z-=dt*sp;if(p.z<=.03){p.z=1;p.x=(Math.random()-.5)*2.2;p.y=(Math.random()-.5)*1.2;continue;}
   const s=k=>[vx+p.x/k*W*.18,hy*.82+p.y/k*H*.18],a=s(p.z),b=s(Math.min(1,p.z+.02+fxSpeed*.05));
   if(a[1]>hy+10&&p.y>0)continue;ctx.strokeStyle=rgba(p.x>0?c1:c2,(1-p.z)*.55);ctx.lineWidth=(1-p.z)*1.8;ctx.beginPath();ctx.moveTo(a[0],a[1]);ctx.lineTo(b[0],b[1]);ctx.stroke();}
  /* vignette */
  g=ctx.createRadialGradient(W/2,H/2,H*.3,W/2,H/2,W*.75);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.45)');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
 })();}

/* ================= v3.1: REALISTIC CLOUD TEXTURES ================= */
const CLOUD_TEX=[];
function cloudTex(seed,w=420,h=200){let s=seed*9301+49297;const rnd=()=>(s=(s*9301+49297)%233280)/233280;
 const G=64,grid=new Float32Array(G*G).map(()=>rnd());const sm=t=>t*t*(3-2*t);
 const noise=(x,y)=>{const xi=Math.floor(x),yi=Math.floor(y),xf=sm(x-xi),yf=sm(y-yi),i=(a,b)=>grid[((b&63)*G)+(a&63)];const a=i(xi,yi),b=i(xi+1,yi),c=i(xi,yi+1),d=i(xi+1,yi+1);return a+(b-a)*xf+(c-a)*yf+(a-b-c+d)*xf*yf;};
 const fbm=(x,y)=>{let v=0,amp=.5,f=1;for(let o=0;o<5;o++){v+=amp*noise(x*f,y*f);f*=2.03;amp*=.5;}return v;};
 const blobs=Array.from({length:7},(_,k)=>({x:w*(.22+.56*(k/6))+(rnd()-.5)*w*.08,y:h*(.6-rnd()*.22),r:h*(.2+rnd()*.17)}));
 const D=new Float32Array(w*h);
 for(let y=0;y<h;y++)for(let x=0;x<w;x++){let m=0;for(const b of blobs){const dx=(x-b.x)/(b.r*1.35),dy=(y-b.y)/b.r,d=1-Math.sqrt(dx*dx+dy*dy);if(d>m)m=d;}
  const base=y>h*.7?Math.max(0,1-(y-h*.7)/(h*.12)):1;const n=fbm(x/w*7+seed*3,y/h*3.4);const ex=sm(clamp(Math.min(x,w-1-x)/(w*.16))),ey=sm(clamp(y/(h*.2)));D[y*w+x]=(m*1.6+(n-.5)*1.1-.12)*base*ex*ey;}
 const c=document.createElement('canvas');c.width=w;c.height=h;const cx=c.getContext('2d'),img=cx.createImageData(w,h),px=img.data;
 for(let y=0;y<h;y++)for(let x=0;x<w;x++){const d=D[y*w+x],k=(y*w+x)*4;if(d<=0){px[k+3]=0;continue;}const u1=y>5?D[(y-5)*w+x]:0,u2=y>12?D[(y-12)*w+x]:0,up=(u1+u2)/2;
  const lit=clamp(.55+(d-up)*.9+(1-y/h)*.3),al=clamp(d/.4);
  px[k]=78+(240-78)*lit;px[k+1]=92+(244-92)*lit;px[k+2]=130+(252-130)*lit;px[k+3]=Math.round(255*Math.pow(al,1.3));}
 cx.putImageData(img,0,0);return c.toDataURL();}
function paintClouds(root){const go=()=>{$$('.cloud[data-t]',root).forEach(el=>{const t=CLOUD_TEX[+el.dataset.t];if(t)el.style.backgroundImage=`url(${t})`;});};
 if(CLOUD_TEX.length>=4)return go();let i=CLOUD_TEX.length;(function next(){if(i>=4)return go();CLOUD_TEX[i]=cloudTex(i+1);i++;go();setTimeout(next,30);})();}

/* ================= v3.1: SECTION MICRO-ANIMATIONS ================= */
const fx2io=('IntersectionObserver' in window)?new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const t=e.target;fx2io.unobserve(t);t.classList.add('in');
  if(t.classList.contains('amt')){const m=t.textContent.match(/\$([\d,]+)/);if(!m)return;const to=+m[1].replace(/,/g,''),pre=t.textContent.slice(0,m.index),post=t.textContent.slice(m.index+m[0].length),t0=performance.now();
   (function st(){const k=Math.min(1,(performance.now()-t0)/1100),e2=1-Math.pow(1-k,3);t.textContent=pre+'$'+Math.round(to*e2).toLocaleString('en-US')+post;if(k<1)requestAnimationFrame(st);})();}
 }),{threshold:.3}):null;
function fx2(root){
 $$('.cv-globe',root).forEach(startGlobe2);$$('.st-bg',root).forEach(startStoryBg);if($('#fly',root))paintClouds(root);fx3(root);
 if(!fx2io)return;
 $$('.sec h2, .stack h2',root).forEach(h=>{if(h.dataset.split||h.children.length||!h.textContent.trim())return;h.dataset.split=1;h.classList.add('wsplit');
  h.innerHTML=h.textContent.trim().split(/\s+/).map((w,i)=>`<span class="w"><span style="transition-delay:${i*55}ms">${esc(w)}</span></span>`).join(' ');fx2io.observe(h);});
 $$('.plan .amt',root).forEach(a=>{if(!a.dataset.cu){a.dataset.cu=1;fx2io.observe(a);}});
}


/* ================= v3.3: ANIMATION OPTIONS (7 groups × 10) ================= */
const ANIM_KEYS=['g','s','f','d','h','c','k'];
const ANIM=(()=>{const a=String(store.get('anim4','0,0,0,0,0,0,0')).split(',').map(Number),o={};ANIM_KEYS.forEach((k,i)=>o[k]=(a[i]|0)%10);return o;})();
const ANIM_OPTS={
 g:{t:'Globe',tip:'Hero 12 — India on the left, USA on the right',target:'hero',o:[
  ['Realistic Earth','Continents, day & night side, city lights, atmosphere, satellite ring'],
  ['Hologram wireframe','See-through glowing wireframe with a scanning laser line'],
  ['Night lights','Dark Earth from space; only golden city lights and routes'],
  ['Data spikes','Light bars rise from cities — India & USA tallest'],
  ['Tilted holo-map','Flat world map tilted in 3D like a hologram table'],
  ['Gold luxury','Black & gold globe, gold flight routes — premium consultancy'],
  ['Living particles','Continents made of breathing, floating particles'],
  ['Radar sweep','A radar beam sweeps the globe and lights up the land'],
  ['Flight over globe','A real plane icon flies India → USA over the globe'],
  ['Minimal clean','Very simple: white dots, one route — Apple-style calm']]},
 s:{t:'Story background',tip:'The pinned “India → USA” scroll scene',target:'story',o:[
  ['Warp highway','Moving grid road + speed streaks; faster when you scroll faster'],
  ['Starfield & nebula','Deep-space stars in layers with soft coloured nebula'],
  ['Particle stream','Thousands of particles flowing from India (left) to USA (right)'],
  ['Aurora waves','Slow glowing light ribbons — calm and premium'],
  ['Hex grid pulse','Honeycomb tiles light up from India side to USA side as you scroll'],
  ['Data rain','Falling columns of $ ₹ LLC EIN characters — techy'],
  ['Searchlights','Stage spotlights sweep the sky — “launch event” feel'],
  ['Constellation','Connected star network that lights up left → right'],
  ['World map route','Dotted world map; your company travels from India to the USA on it'],
  ['Original giant text','The old outline “INDIA → USA” words (for comparison)']]},
 f:{t:'Plane section',tip:'All start in India (left) and end in the USA (right)',target:'fly',o:[
  ['Night clouds','Moonlit sky, realistic clouds in 3 depths, contrails'],
  ['Sunset flight','Warm orange-pink sunset sky with golden clouds and sun'],
  ['Above the clouds (day)','Bright blue sky, white clouds, sunlit plane'],
  ['Paper plane loop','A paper plane draws a looping path as you scroll'],
  ['Map flight','Plane flies across a world map from India to the USA'],
  ['Storm & lightning','Dark storm clouds, rain and lightning flashes — dramatic'],
  ['Neon synthwave','Neon outline plane over a glowing retro grid'],
  ['Take-off','Plane takes off from an Indian runway and climbs towards the USA'],
  ['Boarding pass','A big boarding pass DEL → USA; status changes as you scroll'],
  ['Departure board','Airport flip-board: flights from India land in the USA one by one']]},
 d:{t:'Documents',tip:'“Every document, stacked and ready” scene',target:'stack',o:[
  ['Drop & stack','Documents fall from the top and stack up'],
  ['Fly in from India','Documents fly in from the left side and settle'],
  ['Card fan','Documents fan out like a hand of cards'],
  ['Flip down','Each document flips down into place in 3D'],
  ['Checklist','Documents appear as a list with ticks'],
  ['3D carousel','Documents rotate on a 3D carousel as you scroll'],
  ['Into the folder','Documents slide into your company folder'],
  ['Approved stamp','Each document gets an “approved” stamp'],
  ['Pop-in','Documents pop in with a bounce'],
  ['Typewriter','Document names type themselves in']]},
 h:{t:'Headings',tip:'How section headings appear while scrolling',target:'journey',o:[
  ['Slide up','Words slide up one by one'],['Blur in','Words come into focus from blur'],['3D flip','Words flip up in 3D'],['Zoom in','Words grow from small'],['From the left','Words slide in from the left'],
  ['Colour sweep','Words light up one after another'],['Typewriter','Words appear one at a time'],['Skew rise','Words rise with a slight slant'],['Glitch','Short digital glitch, then settles'],['No animation','Headings are simply shown']]},
 c:{t:'Cursor',tip:'Desktop mouse pointer style',target:'services',o:[
  ['Ring + dot','Ring follows the mouse, grows on buttons'],['Glow light','Soft coloured light follows the mouse'],['Crosshair','Thin target crosshair'],['Diamond','Rotating diamond that squares up on buttons'],['Plane pointer','A tiny plane that turns where you move'],
  ['Comet trail','Dots trail behind the mouse'],['Spotlight','Page is dimmed except around the mouse'],['“Open” label','Circle shows “OPEN” over links'],['Invert circle','Circle inverts colours under it'],['Normal cursor','Standard system cursor']]},
 k:{t:'Card hover',tip:'What cards do when the mouse is on them',target:'services',o:[
  ['3D tilt','Cards tilt in 3D with the mouse'],['Lift & glow','Card lifts up with a coloured glow'],['Running border','A light runs around the border'],['Mouse spotlight','A light follows the mouse inside the card'],['Zoom','Card grows slightly'],
  ['Gradient border','Border turns into a brand gradient'],['Shine sweep','A shine passes across the card'],['Layered depth','Coloured layers appear behind the card'],['Colour fill','Card fills with colour from the bottom'],['No effect','Cards stay still']]}
};
const ANIM_RECS={
 g:[[0,'Most realistic and premium; India → USA visible at a glance.'],[8,'A real plane flying India → USA — the clearest story.'],[2,'Most dramatic and luxurious on dark themes.']],
 s:[[8,'Literally shows the journey India → USA on a map — best for non-technical visitors.'],[0,'Closest to the reference (truck + KM/H): reacts to scroll speed.'],[2,'Shows direction India → USA without any words.']],
 f:[[8,'Boarding pass DEL → USA is instantly understood and memorable.'],[0,'Realistic and cinematic; works with every dark theme.'],[7,'Take-off from India feels like “launching” your company.']],
 d:[[5,'3D carousel feels premium and futuristic.'],[0,'Simple and satisfying; mirrors the containers in the reference.'],[6,'Clear meaning: everything goes into your company folder.']],
 h:[[0,'Premium and smooth, used by top SaaS sites.'],[1,'Elegant and calm.'],[5,'Subtle, good for long headings.']],
 c:[[0,'Premium but not distracting.'],[1,'Futuristic glow, matches dark themes.'],[4,'Fun brand touch — fits the flight theme.']],
 k:[[3,'Premium “light follows mouse” effect.'],[1,'Simple and clear.'],[0,'Interactive and modern.']]
};
const animRank=(c,i)=>{const k=ANIM_RECS[c].findIndex(r=>r[0]===i);return k<0?0:k+1;};
let animTab='g';
function applyAnimClasses(){const b=document.body;b.className=b.className.replace(/\b(hr|cu|ck)\d\b/g,'').replace(/\s+/g,' ').trim()+` hr${ANIM.h} cu${ANIM.c} ck${ANIM.k}`;}
function setAnim(c,i){ANIM[c]=i;store.set('anim4',ANIM_KEYS.map(k=>ANIM[k]).join(','));applyAnimClasses();const tgt=ANIM_OPTS[c].target;
 if(c==='g'&&cur.hero!==11){cur.hero=11;store.set('hero3',11);}
 const go=()=>{const el=tgt==='hero'?$('#hero'):$('#'+tgt);if(!el)return;const y=el.getBoundingClientRect().top+scrollY+(tgt==='story'?innerHeight*.9:tgt==='stack'?innerHeight*1.1:tgt==='fly'?-innerHeight*.12:-80);scrollTo({top:Math.max(0,y),behavior:'instant'});};
 if(parseHash().page!=='home'){location.hash='#/home';setTimeout(go,150);}else if(c==='c'||c==='k'){go();}else{render();setTimeout(go,60);}
 animTab=c;animPanel();if(typeof updRanks==='function')updRanks();}
function animPanel(){const p=$('#animp');if(!p)return;const g=ANIM_OPTS[animTab];
 p.innerHTML=`<div style="display:flex;justify-content:space-between;align-items:center"><b style="font-size:16px">✦ Animation options</b><button type="button" id="animClose" style="background:#3B2A7A;color:#fff;border:0;border-radius:8px;padding:6px 10px;cursor:pointer">Close</button></div>
 <div class="atabs">${ANIM_KEYS.map(k=>`<button type="button" data-atab="${k}" class="${k===animTab?'on':''}">${ANIM_OPTS[k].t} <small>${ANIM[k]+1}</small></button>`).join('')}</div>
 <p style="color:#CBD5E1;margin:4px 0 0">${g.tip}. Click an option to see it live. ★ = our pick.</p>
 ${g.o.map((o,i)=>{const k=animRank(animTab,i);return `<div class="ri ${ANIM[animTab]===i?'sel':''}" data-anim="${animTab}:${i}"><span class="m" style="${k?'':'background:#3B2A7A;color:#fff'}">${k?'★'+k:i+1}</span><div><b>${i+1}. ${o[0]}</b>${ANIM[animTab]===i?' <span style="color:#4ADE80">● showing</span>':''}<br><span>${o[1]}</span>${k?`<br><span style="color:#FBBF24">★ Recommended #${k}: ${ANIM_RECS[animTab][k-1][1]}</span>`:''}</div></div>`;}).join('')}`;
 $('#animClose').onclick=()=>p.classList.remove('open');
 $$('[data-atab]',p).forEach(b=>b.onclick=()=>{animTab=b.dataset.atab;animPanel();});
 $$('[data-anim]',p).forEach(d=>d.onclick=()=>{const [c,i]=d.dataset.anim.split(':');setAnim(c,+i);});}

/* ---------- flat-map dots (shared) ---------- */
const FLAT_CACHE={};
function flatDots(lon0,lon1,lat0,lat1,step){const k=[lon0,lon1,lat0,lat1,step].join();if(FLAT_CACHE[k])return FLAT_CACHE[k];const out=[];
 for(let la=lat1;la>=lat0;la-=step)for(let lo=lon0;lo<=lon1;lo+=step)if(isLand(la,lo>180?lo-360:lo))out.push([(lo-lon0)/(lon1-lon0),(lat1-la)/(lat1-lat0),Math.random()]);return FLAT_CACHE[k]=out;}
const PLANE_ICON='<svg viewBox="-17 -13 34 26" aria-hidden="true"><path d="M16 0 L12 -1.6 L3 -2 L-3 -12 L-6.5 -12 L-3.5 -2 L-10 -2 L-13 -6 L-15.5 -6 L-13.5 0 L-15.5 6 L-13 6 L-10 2 L-3.5 2 L-6.5 12 L-3 12 L3 2 L12 1.6 Z" fill="currentColor"/></svg>';
const PLANE_PTS=[[16,0],[12,-1.6],[3,-2],[-3,-12],[-6.5,-12],[-3.5,-2],[-10,-2],[-13,-6],[-15.5,-6],[-13.5,0]];
function drawPlaneGlyph(ctx,x,y,ang,s,fill){ctx.save();ctx.translate(x,y);ctx.rotate(ang);ctx.scale(s,s);ctx.beginPath();PLANE_PTS.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));for(let i=PLANE_PTS.length-2;i>0;i--)ctx.lineTo(PLANE_PTS[i][0],-PLANE_PTS[i][1]);ctx.closePath();ctx.fillStyle=fill;ctx.shadowColor=fill;ctx.shadowBlur=14;ctx.fill();ctx.restore();}
const qb=(a,c,b,t)=>[(1-t)*(1-t)*a[0]+2*(1-t)*t*c[0]+t*t*b[0],(1-t)*(1-t)*a[1]+2*(1-t)*t*c[1]+t*t*b[1]];

/* ---------- Globe option 5: tilted holo-map ---------- */
function startTiltMap(cv){const ctx=cv.getContext('2d'),lon0=40,lon1=330,lat0=-56,lat1=80,dots=flatDots(lon0,lon1,lat0,lat1,2.4);let col=themeCols(),fr=0;
 const uv=(la,lo)=>{if(lo<lon0)lo+=360;return [(lo-lon0)/(lon1-lon0),(lat1-la)/(lat1-lat0)];};
 const IN=[uv(28.6,77.2),uv(19.1,72.9),uv(12.97,77.6)],US=[uv(40.7,-74),uv(37.8,-122.4),uv(41.1,-104.8),uv(30.3,-97.7)];
 (function tick(){if(!cv.isConnected)return;requestAnimationFrame(tick);const r=cv.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight||!r.width)return;
  const dpr=Math.min(2,devicePixelRatio||1),W=r.width,H=r.height;if(cv.width!==Math.round(W*dpr)){cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);}
  if(fr++%40===0)col=themeCols();const {c1,c2,c3}=col,now=performance.now()/1000;ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,W,H);
  const Wm=W*1.05,Hm=Wm*.55,cx=W/2,cy=H*.55+Math.sin(now*.8)*4,sway=Math.sin(now*.25)*.05;
  const P=(u,v)=>{const d=1+(1-v)*.7;return [cx+((u-.5)*Wm/d)*(1+sway*(v-.5)),cy+(v-.5)*Hm*.8/d];};
  let g=ctx.createRadialGradient(cx,cy+Hm*.1,10,cx,cy+Hm*.1,Wm*.55);g.addColorStop(0,rgba(c3,.28));g.addColorStop(1,rgba(c3,0));ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
  ctx.strokeStyle=rgba(c1,.10);for(let i=0;i<=12;i++){const a=P(i/12,0),b=P(i/12,1);ctx.beginPath();ctx.moveTo(a[0],a[1]);ctx.lineTo(b[0],b[1]);ctx.stroke();}
  for(let j=0;j<=6;j++){const a=P(0,j/6),b=P(1,j/6);ctx.beginPath();ctx.moveTo(a[0],a[1]);ctx.lineTo(b[0],b[1]);ctx.stroke();}
  ctx.fillStyle=rgba(c1,1);for(const d of dots){const s=P(d[0],d[1]),sz=1.5+d[1]*1.3;ctx.globalAlpha=Math.min(1,.45+.5*d[1]+.12*Math.sin(now*2+d[2]*20));ctx.fillRect(s[0]-sz/2,s[1]-sz/2,sz,sz);}ctx.globalAlpha=1;
  const sl=((now*.12)%1);const s1=P(sl,0),s2=P(sl,1);g=ctx.createLinearGradient(s1[0]-30,0,s1[0]+30,0);g.addColorStop(0,rgba(c1,0));g.addColorStop(.5,rgba(c1,.25));g.addColorStop(1,rgba(c1,0));ctx.strokeStyle=g;ctx.lineWidth=40;ctx.beginPath();ctx.moveTo(s1[0],s1[1]);ctx.lineTo(s2[0],s2[1]);ctx.stroke();ctx.lineWidth=1;
  const pairs=[[IN[0],US[0],1],[IN[1],US[1],0],[IN[2],US[2],0],[IN[0],US[3],0]];
  pairs.forEach(([a,b,m],k)=>{const A=P(...a),B=P(...b),C=[(A[0]+B[0])/2,Math.min(A[1],B[1])-H*(m?.38:.26)];ctx.strokeStyle=rgba(m?c2:c1,.3);ctx.lineWidth=m?1.6:1;ctx.beginPath();ctx.moveTo(A[0],A[1]);ctx.quadraticCurveTo(C[0],C[1],B[0],B[1]);ctx.stroke();
   const t=((now*.2)+k*.25)%1;for(let i=0;i<20;i++){const t0=Math.max(0,t-i*.012),q=qb(A,C,B,t0);ctx.fillStyle=rgba(m?c2:c1,(1-i/20)*.9);ctx.beginPath();ctx.arc(q[0],q[1],(m?3:2)*(1-i/20)+.4,0,7);ctx.fill();}});
  const pin=(u,cc,label,up)=>{const s=P(...u),ph=(now*.8)%1,h=up?36:22;ctx.strokeStyle=rgba(cc,.8);ctx.beginPath();ctx.moveTo(s[0],s[1]);ctx.lineTo(s[0],s[1]-h);ctx.stroke();ctx.fillStyle=rgba(cc,1);ctx.beginPath();ctx.arc(s[0],s[1]-h,3.5,0,7);ctx.fill();
   ctx.strokeStyle=rgba(cc,.7*(1-ph));ctx.beginPath();ctx.ellipse(s[0],s[1],4+ph*18,(4+ph*18)*.45,0,0,7);ctx.stroke();
   if(label){ctx.font='700 12px Inter,system-ui,sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';const tw=ctx.measureText(label).width;ctx.fillStyle='rgba(8,12,28,.8)';ctx.beginPath();ctx.roundRect?ctx.roundRect(s[0]-tw/2-10,s[1]-h-34,tw+20,22,11):ctx.rect(s[0]-tw/2-10,s[1]-h-34,tw+20,22);ctx.fill();ctx.fillStyle='#fff';ctx.fillText(label,s[0],s[1]-h-22);}};
  US.forEach((u,i)=>pin(u,c1,i===0?'USA':'',i===0));IN.forEach((u,i)=>pin(u,c2,i===0?'INDIA':'',i===0));
 })();}

/* ---------- Plane option 4: paper plane, option 5: map flight ---------- */
const PAPER_PATH='M-60 390 C 200 400, 300 120, 470 170 S 640 430, 780 300 C 860 225, 930 180, 880 130 C 830 85, 760 150, 810 205 C 880 280, 1010 120, 1280 80';
const BOARD=[['JC-001','DEL','NEW YORK','Sharma Tech LLC'],['JC-002','BOM','WYOMING','Patel Exports LLC'],['JC-003','BLR','DELAWARE','Rao Labs Inc.'],['JC-004','HYD','TEXAS','Mehta Retail LLC']];
function flyExtrasHTML(){const F=ANIM.f;let h='';
 if(F===3)h=`<svg class="pp-svg" viewBox="0 0 1200 500" preserveAspectRatio="none" aria-hidden="true"><path d="${PAPER_PATH}" fill="none" stroke="rgba(255,255,255,.14)" stroke-width="2" stroke-dasharray="4 10" vector-effect="non-scaling-stroke"/><path id="ppTrail" d="${PAPER_PATH}" fill="none" style="stroke:var(--on-dark-accent)" stroke-width="2.6" stroke-linecap="round"/></svg>
 <div class="pplane" id="ppPlane"><svg viewBox="0 0 64 40" aria-hidden="true"><path d="M2 21 L62 3 L24 25 Z" fill="#FFFFFF"/><path d="M24 25 L62 3 L32 38 Z" fill="#CBD5E1"/><path d="M24 25 L32 38 L27 27 Z" fill="#94A3B8"/></svg></div>`;
 if(F===4)h=`<canvas class="cv cv-full fly-map" aria-hidden="true"></canvas>`;
 if(F===1)h=`<div class="fly-sun"></div>`;
 if(F===5)h=`<div class="rain"></div><div class="flash"></div>`;
 if(F===6)h=`<div class="sun"></div><div class="synth"></div>`;
 if(F===7)h=`<div class="runway"><span>RUNWAY · NEW DELHI</span></div>`;
 if(F===8)h=`<div class="bpass"><div class="bp-main"><div class="bp-top"><b>JURIS AIR</b><span>BOARDING PASS</span></div>
  <div class="bp-route"><div><small>FROM</small><b>DEL</b><span>New Delhi, India</span></div><div class="bp-line"><i id="bpPlane">${PLANE_ICON}</i></div><div style="text-align:right"><small>TO</small><b>USA</b><span>Your US company</span></div></div>
  <div class="bp-info"><div><small>PASSENGER</small><b>Your Company LLC</b></div><div><small>FLIGHT</small><b>JC-001</b></div><div><small>GATE</small><b>WY / DE</b></div><div><small>STATUS</small><b id="bpStatus">BOARDING</b></div></div></div>
  <div class="bp-stub"><small>ARRIVAL</small><b>~7</b><span>business days</span><div class="bp-stamp" id="bpStamp">FORMED ✓</div></div></div>`;
 if(F===9)h=`<div class="fboard"><div class="fb-head"><span>✈ DEPARTURES · INDIA → USA</span><span id="fbClock">00:00 IST</span></div>
  <div class="fb-row fb-th"><span>FLIGHT</span><span>FROM</span><span>TO</span><span>COMPANY</span><span>STATUS</span></div>
  ${BOARD.map((b,i)=>`<div class="fb-row"><span>${b[0]}</span><span>${b[1]}</span><span>${b[2]}</span><span>${b[3]}</span><span class="fb-st" id="fbSt${i}">BOARDING</span></div>`).join('')}
  <small class="fb-note">Sample names for demo only</small></div>`;
 if(![4,8,9].includes(F))h+=`<div class="fly-ends"><span><b>INDIA</b> DEL</span><div class="fe-bar"><i id="feBar"></i><em id="fePlane">${PLANE_ICON}</em></div><span><b>USA</b> ARRIVAL</span></div>`;
 return h;}
function flyExtrasUpdate(){const fl=$('#fly');if(!fl)return;const vh=innerHeight,r=fl.getBoundingClientRect(),p=clamp((vh-r.top)/(vh+r.height));
 const fb=$('#feBar');if(fb){fb.style.width=(p*100)+'%';$('#fePlane').style.left=(p*100)+'%';}
 if(ANIM.f===3){const path=$('#ppTrail'),pl=$('#ppPlane');if(!path||!pl)return;const L=path.getTotalLength(),t=clamp((p-.12)/.7);path.style.strokeDasharray=L;path.style.strokeDashoffset=L*(1-t);
  const a=path.getPointAtLength(Math.max(0,L*t-1)),b=path.getPointAtLength(Math.min(L,L*t+1)),W=fl.clientWidth,H=fl.clientHeight,sx=W/1200,sy=H/500,ang=Math.atan2((b.y-a.y)*sy,(b.x-a.x)*sx);
  pl.style.transform=`translate(${a.x*sx}px,${a.y*sy}px) rotate(${ang}rad)`;}
 if(ANIM.f===8){const t=clamp((p-.2)/.55),pl=$('#bpPlane');if(pl)pl.style.left=(t*100)+'%';const st=$('#bpStatus');if(st)st.textContent=t<.05?'BOARDING':t<1?'IN FLIGHT · '+Math.round(t*100)+'%':'LANDED ✓';const sp=$('#bpStamp');if(sp)sp.classList.toggle('on',t>=1);}
 if(ANIM.f===9){const t=clamp((p-.15)/.6);BOARD.forEach((b,i)=>{const el=$('#fbSt'+i);if(!el)return;const s0=i*.2,v=t<s0?'BOARDING':t<s0+.2?'IN FLIGHT':'LANDED ✓';if(el.textContent!==v){el.textContent=v;el.classList.remove('flip');void el.offsetWidth;el.classList.add('flip');}el.classList.toggle('ok',v==='LANDED ✓');});
  const ck=$('#fbClock');if(ck){const m=Math.round(t*7*24*60);ck.textContent=`DAY ${Math.floor(m/1440)} · ${String(Math.floor(m/60)%24).padStart(2,'0')}:${String(m%60).padStart(2,'0')} IST`;}}}
addEventListener('scroll',()=>requestAnimationFrame(flyExtrasUpdate),{passive:true});
function startFlyMap(cv){if(cv.dataset.on)return;cv.dataset.on=1;const ctx=cv.getContext('2d'),lon0=50,lon1=300,lat0=0,lat1=68,dots=flatDots(lon0,lon1,lat0,lat1,1.7);let col=themeCols(),fr=0;const sec=cv.closest('.fly');
 const uv=(la,lo)=>{if(lo<lon0)lo+=360;return [(lo-lon0)/(lon1-lon0),(lat1-la)/(lat1-lat0)];};const A0=uv(28.6,77.2),B0=uv(40.7,-74);
 (function tick(){if(!cv.isConnected)return;requestAnimationFrame(tick);const r=cv.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight||!r.width)return;
  const dpr=Math.min(2,devicePixelRatio||1),W=r.width,H=r.height;if(cv.width!==Math.round(W*dpr)){cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);}
  if(fr++%40===0)col=themeCols();const {c1,c2}=col,now=performance.now()/1000;ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,W,H);
  const mx=W*.04,my=H*.2,mw=W-2*mx,mh=H*.72,P=u=>[mx+u[0]*mw,my+u[1]*mh];
  ctx.fillStyle=rgba(c1,1);for(const d of dots){const s=P(d);ctx.globalAlpha=.42+.18*Math.sin(now*1.6+d[2]*30);ctx.beginPath();ctx.arc(s[0],s[1],1.9,0,7);ctx.fill();}ctx.globalAlpha=1;
  const p=clamp((innerHeight-sec.getBoundingClientRect().top)/(innerHeight+sec.offsetHeight)),t=clamp((p-.18)/.6);
  const A=P(A0),B=P(B0),C=[(A[0]+B[0])/2,Math.min(A[1],B[1])-mh*.55];
  ctx.setLineDash([5,8]);ctx.strokeStyle='rgba(255,255,255,.22)';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(A[0],A[1]);ctx.quadraticCurveTo(C[0],C[1],B[0],B[1]);ctx.stroke();ctx.setLineDash([]);
  ctx.strokeStyle=rgba(c2,.95);ctx.lineWidth=3;ctx.shadowColor=rgba(c2,1);ctx.shadowBlur=12;ctx.beginPath();for(let i=0;i<=60;i++){const q=qb(A,C,B,t*i/60);i?ctx.lineTo(q[0],q[1]):ctx.moveTo(q[0],q[1]);}ctx.stroke();ctx.shadowBlur=0;
  [[A,c2,'INDIA'],[B,c1,'USA']].forEach(([s,cc,l])=>{const ph=(now*.8)%1;ctx.fillStyle=rgba(cc,1);ctx.beginPath();ctx.arc(s[0],s[1],5,0,7);ctx.fill();ctx.strokeStyle=rgba(cc,.8*(1-ph));ctx.beginPath();ctx.arc(s[0],s[1],6+ph*22,0,7);ctx.stroke();
   ctx.font='800 15px Inter,system-ui,sans-serif';ctx.textAlign='center';ctx.fillStyle='#fff';ctx.fillText(l,s[0],s[1]+30);});
  const q=qb(A,C,B,t),q2=qb(A,C,B,Math.min(1,t+.01));drawPlaneGlyph(ctx,q[0],q[1],t>=1?0:Math.atan2(q2[1]-q[1],q2[0]-q[0]),1.9,'#fff');
  ctx.font='700 12px ui-monospace,Menlo,monospace';ctx.textAlign='left';ctx.fillStyle=rgba(c1,.9);ctx.fillText(`FLIGHT JC-001 · ${Math.round(t*100)}% · ${t>=1?'LANDED ✓':'EN ROUTE'}`,mx,H-24);
 })();}

/* ---------- Story backgrounds 2–5 ---------- */
const RAIN_CH='$₹01LLCEINUSA→✓'.split('');
function storyProg(){const st=$('#story');if(!st)return 0;const r=st.getBoundingClientRect();return clamp(-r.top/(r.height-innerHeight));}
function startStoryAlt(cv,M){const ctx=cv.getContext('2d');let col=themeCols(),fr=0,last=performance.now(),W0=0;
 let stars=[],parts=[],rain=[],nodes=[];const mapDots=M===8?flatDots(40,330,-60,80,2.2):null;
 (function tick(){if(!cv.isConnected)return;requestAnimationFrame(tick);const r=cv.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight||!r.width)return;
  const nowMs=performance.now(),dt=Math.min(.05,(nowMs-last)/1000),now=nowMs/1000;last=nowMs;fxSpeed*=.94;
  const dpr=Math.min(2,devicePixelRatio||1),W=r.width,H=r.height;if(cv.width!==Math.round(W*dpr)){cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);}
  if(W0!==W){W0=W;stars=Array.from({length:380},()=>({x:Math.random()*W,y:Math.random()*H,l:Math.random(),tw:Math.random()*6}));parts=Array.from({length:700},()=>({x:Math.random()*W,y0:Math.random()*H,ph:Math.random()*6,sp:.4+Math.random(),c:Math.random()}));rain=Array.from({length:Math.ceil(W/20)},()=>({y:Math.random()*H,sp:60+Math.random()*140,ch:Array.from({length:12},()=>RAIN_CH[Math.floor(Math.random()*RAIN_CH.length)])}));nodes=Array.from({length:110},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3}));}
  if(fr++%40===0)col=themeCols();const {c1,c2,c3}=col;ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,W,H);const p=storyProg();
  if(M===1){[[.25,.35,c3,.22],[.7,.6,c2,.12],[.55,.25,c1,.12]].forEach(([x,y,c,a],i)=>{const gx=W*(x+.06*Math.sin(now*.07+i*2)-p*.15),gy=H*(y+.05*Math.cos(now*.06+i)),R=Math.max(W,H)*.45;const g=ctx.createRadialGradient(gx,gy,0,gx,gy,R);g.addColorStop(0,rgba(c,a));g.addColorStop(1,rgba(c,0));ctx.fillStyle=g;ctx.fillRect(0,0,W,H);});
   for(const s of stars){s.x-=(.05+s.l*.6)*(1+fxSpeed*6);if(s.x<0)s.x+=W;const sz=.6+s.l*1.8;ctx.globalAlpha=(.25+.6*s.l)*(.6+.4*Math.sin(now*2+s.tw));ctx.fillStyle=s.l>.92?rgba(c1,1):'#fff';ctx.fillRect(s.x,s.y,sz,sz);if(fxSpeed>.3&&s.l>.6){ctx.fillRect(s.x,s.y,sz+fxSpeed*10*s.l,sz*.6);}}ctx.globalAlpha=1;}
  if(M===2){for(const q of parts){const x0=q.x;q.x+=q.sp*(1.2+fxSpeed*8);if(q.x>W){q.x=0;continue;}const f=x=>q.y0+Math.sin(x*.004+now*.6+q.ph)*40+Math.sin(x*.011+q.ph)*14;const t=q.x/W;const cc=[c2[0]+(c1[0]-c2[0])*t,c2[1]+(c1[1]-c2[1])*t,c2[2]+(c1[2]-c2[2])*t];
    ctx.strokeStyle=rgba(cc,.15+.35*q.c);ctx.lineWidth=.6+q.c*1.4;ctx.beginPath();ctx.moveTo(q.x-8-q.sp*6,f(q.x-8-q.sp*6));ctx.lineTo(q.x,f(q.x));ctx.stroke();}}
  if(M===3){for(let i=0;i<5;i++){const base=H*(.22+i*.14),A=40+i*12,cc=[c1,c3,c2,c1,c3][i];ctx.beginPath();for(let x=0;x<=W;x+=12){const y=base+Math.sin(x*.0035+now*(.25+i*.07)+i)*A+Math.sin(x*.009-now*.4+i*2)*A*.35;x?ctx.lineTo(x,y):ctx.moveTo(x,y);}
    const g=ctx.createLinearGradient(0,base-A,0,base+H*.3);g.addColorStop(0,rgba(cc,.16));g.addColorStop(1,rgba(cc,0));ctx.save();ctx.lineTo(W,H);ctx.lineTo(0,H);ctx.closePath();ctx.fillStyle=g;ctx.globalAlpha=.7;ctx.fill();ctx.restore();
    ctx.beginPath();for(let x=0;x<=W;x+=12){const y=base+Math.sin(x*.0035+now*(.25+i*.07)+i)*A+Math.sin(x*.009-now*.4+i*2)*A*.35;x?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.strokeStyle=rgba(cc,.5);ctx.lineWidth=1.5;ctx.shadowColor=rgba(cc,1);ctx.shadowBlur=14;ctx.stroke();ctx.shadowBlur=0;}}
  if(M===4){const s=30,hw=s*Math.sqrt(3),front=p*W*1.1;ctx.lineWidth=1;for(let row=-1;row*s*1.5<H+s;row++)for(let col2=-1;col2*hw<W+hw;col2++){const x=col2*hw+(row%2?hw/2:0),y=row*s*1.5;const d=Math.abs(x-front),glow=Math.max(0,1-d/220),passed=x<front?.10:0,tw=.03+.05*Math.max(0,Math.sin(now*1.3+x*.05+y*.08));
    ctx.beginPath();for(let k=0;k<6;k++){const a=Math.PI/3*k+Math.PI/6,px=x+s*.92*Math.cos(a),py=y+s*.92*Math.sin(a);k?ctx.lineTo(px,py):ctx.moveTo(px,py);}ctx.closePath();
    const cc=x<front?c2:c1;ctx.strokeStyle=rgba(c1,.07+glow*.5);ctx.stroke();if(glow+passed+tw>.04){ctx.fillStyle=rgba(cc,glow*.35+passed*.6+tw);ctx.fill();}}
   const g=ctx.createLinearGradient(front-60,0,front+60,0);g.addColorStop(0,rgba(c1,0));g.addColorStop(.5,rgba(c1,.35));g.addColorStop(1,rgba(c1,0));ctx.fillStyle=g;ctx.fillRect(front-60,0,120,H);}
  if(M===5){ctx.font='600 14px ui-monospace,Menlo,monospace';ctx.textAlign='center';rain.forEach((c,i)=>{c.y+=c.sp*dt*(1+fxSpeed*3);if(c.y-12*18>H)c.y=-20;const x=i*20+10;for(let j=0;j<12;j++){const y=c.y-j*18;if(y<-20||y>H+20)continue;if(Math.random()<.02)c.ch[j]=RAIN_CH[Math.floor(Math.random()*RAIN_CH.length)];const cc=x/W<p?c2:c1;ctx.fillStyle=j===0?'#fff':rgba(cc,(1-j/12)*.45);ctx.fillText(c.ch[j],x,y);}});}
  if(M===6){for(let i=0;i<6;i++){const ox=W*(.08+i*.168),oy=H+20,ang=-Math.PI/2+Math.sin(now*(.35+i*.05)+i*1.7)*.55,len=H*1.4,sp=.07,cc=i%2?c2:c1;const g=ctx.createLinearGradient(ox,oy,ox+Math.cos(ang)*len,oy+Math.sin(ang)*len);g.addColorStop(0,rgba(cc,.28));g.addColorStop(1,rgba(cc,0));ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(ox,oy);ctx.lineTo(ox+Math.cos(ang-sp)*len,oy+Math.sin(ang-sp)*len);ctx.lineTo(ox+Math.cos(ang+sp)*len,oy+Math.sin(ang+sp)*len);ctx.closePath();ctx.fill();}
   const g=ctx.createLinearGradient(0,H*.7,0,H);g.addColorStop(0,rgba(c3,0));g.addColorStop(1,rgba(c3,.25));ctx.fillStyle=g;ctx.fillRect(0,H*.7,W,H*.3);}
  if(M===7){const front=p*W*1.05;for(const n of nodes){n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>W)n.vx*=-1;if(n.y<0||n.y>H)n.vy*=-1;}
   for(let i=0;i<nodes.length;i++){const a=nodes[i];for(let j=i+1;j<nodes.length;j++){const b=nodes[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d<150){const lit=(a.x<front&&b.x<front);ctx.strokeStyle=rgba(lit?c2:c1,(1-d/150)*(lit?.55:.18));ctx.lineWidth=lit?1.2:.8;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}}}
   for(const n of nodes){const lit=n.x<front;ctx.fillStyle=rgba(lit?c2:c1,lit?.95:.5);ctx.beginPath();ctx.arc(n.x,n.y,lit?2.6:1.8,0,7);ctx.fill();}}
  if(M===8){const inBox=(u,v)=>u>.06&&u<.2&&v>.33&&v<.52,usBox=(u,v)=>u>.67&&u<.87&&v>.22&&v<.4;for(const d of mapDots){const x=d[0]*W,y=d[1]*H,ii=inBox(d[0],d[1]),uu=usBox(d[0],d[1]);ctx.fillStyle=ii?rgba(c2,.75+.25*Math.sin(now*3+d[2]*9)):uu?rgba(c1,p>.9?.95:.55):rgba(c1,.18);ctx.beginPath();ctx.arc(x,y,ii||uu?2.2:1.6,0,7);ctx.fill();}}
  const g=ctx.createRadialGradient(W/2,H/2,H*.3,W/2,H/2,W*.75);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.4)');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
 })();}
function fx3(root){$$('#lboard',root).forEach(startLiveBoard);const fl=$('#fly',root);if(fl){$$('.fly-map',fl).forEach(startFlyMap);flyExtrasUpdate();}
 const g=$('#stGhost');if(g){const upd=()=>{if(!g.isConnected)return;g.style.transform=`translate(${-storyProg()*45}%,-50%)`;};addEventListener('scroll',upd,{passive:true});upd();}}

/* ---------- cursor modes ---------- */
(function(){if(matchMedia('(pointer:coarse)').matches)return;const ring=$('.cur-ring');if(!ring)return;ring.innerHTML='<i class="cur-in"></i>';
 const spot=document.createElement('div');spot.className='cur-spot';document.body.appendChild(spot);
 const trail=Array.from({length:10},(_,i)=>{const d=document.createElement('div');d.className='cur-trail';d.style.opacity=(1-i/10)*.8;d.style.width=d.style.height=(10-i*.7)+'px';document.body.appendChild(d);return {el:d,x:-99,y:-99};});
 let mx=-99,my=-99,px=-99,py=-99,ang=0;addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY;document.documentElement.style.setProperty('--cx',mx+'px');document.documentElement.style.setProperty('--cy',my+'px');
  const c=e.target.closest&&e.target.closest('.card');if(c&&document.body.classList.contains('ck3')){const r=c.getBoundingClientRect();c.style.setProperty('--mx',(mx-r.left)+'px');c.style.setProperty('--my',(my-r.top)+'px');}},{passive:true});
 (function loop(){requestAnimationFrame(loop);const M=ANIM.c;if(M===4){const dx=mx-px,dy=my-py;if(Math.hypot(dx,dy)>2)ang=Math.atan2(dy,dx);ring.style.setProperty('--ca',ang+'rad');}px=mx;py=my;
  if(M===5){let x=mx,y=my;trail.forEach(t=>{t.x+=(x-t.x)*.35;t.y+=(y-t.y)*.35;t.el.style.transform=`translate(${t.x}px,${t.y}px)`;x=t.x;y=t.y;});}})();})();

/* ---------- v3.4: live departures board (auto, not scroll) ---------- */
const LB_FROM=[['DEL','INDIA'],['BOM','INDIA'],['BLR','INDIA'],['LHR','UK'],['DXB','UAE'],['SIN','SINGAPORE'],['SYD','AUSTRALIA'],['LOS','NIGERIA'],['GRU','BRAZIL'],['NRT','JAPAN'],['FRA','GERMANY'],['YYZ','CANADA'],['JNB','S. AFRICA'],['KUL','MALAYSIA'],['DAC','BANGLADESH'],['AMS','NETHERLANDS']];
const LB_TO=['WYOMING','DELAWARE','TEXAS','FLORIDA','NEW YORK','CALIFORNIA'];
const LB_CO=['Nova Labs','Kite Exports','Bluepeak Retail','Saffron Foods','Orbit Analytics','Lotus Textiles','Atlas Trading','Zenith Health','Coral Logistics','Maple Edtech','Harbor Goods','Pixel Forge','Indigo Apparel','Summit SaaS','Cedar Organics','Vertex Robotics','Monsoon Media','Quartz Fintech'];
const LB_ST=['CHECK-IN','BOARDING','IN FLIGHT','LANDED ✓'];
const lbPick=a=>a[Math.floor(Math.random()*a.length)];
let lbSeq=100+Math.floor(Math.random()*400);
const lbNew=(st)=>{const f=lbPick(LB_FROM),co=lbPick(LB_CO);return {fl:'JC-'+(lbSeq++),from:f[0]+' · '+f[1],to:lbPick(LB_TO),co:co+(Math.random()<.7?' LLC':' Inc.'),st:st};};
function liveBoardHTML(){return `<section class="lboard-sec" id="lboard" data-ghost="LIVE"><div class="container">
 <div class="sec-head" style="margin-bottom:26px"><span class="eyebrow">Live from around the world</span><h2>Founders everywhere are landing in the USA</h2></div>
 <div class="fboard lboard"><div class="fb-head"><span>✈ DEPARTURES · WORLD → USA</span><span id="lbClock">--:-- ET</span></div>
 <div class="fb-row fb-th"><span>FLIGHT</span><span>FROM</span><span>TO</span><span>COMPANY</span><span>STATUS</span></div>
 ${Array.from({length:6},(_,i)=>`<div class="fb-row" data-r="${i}"><span data-k="fl"></span><span data-k="from"></span><span data-k="to"></span><span data-k="co"></span><span data-k="st" class="fb-st"></span></div>`).join('')}
 <div class="lb-foot"><small>LANDED ✓ = company formed · Illustrative example names, not real clients</small><small id="lbCount"></small></div></div></div></section>`;}
const FLAP_CH='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-·';
function flapTo(el,text,fast){if(el._t)clearInterval(el._t);const from=el.textContent||'',L=Math.max(from.length,text.length);let step=0;const maxStep=fast?6:14;
 el._t=setInterval(()=>{step++;let out='';for(let i=0;i<L;i++){const settle=Math.floor(maxStep*.4)+i*.6;const t=text[i]||' ';if(step>=settle||t===' '||t==='·'||t==='✓')out+=t;else out+=FLAP_CH[Math.floor(Math.random()*FLAP_CH.length)];}
  el.textContent=out.replace(/\s+$/,'');if(step>=maxStep*.4+L*.6+1){el.textContent=text;clearInterval(el._t);el._t=null;}},45);}
function startLiveBoard(sec){if(sec.dataset.on)return;sec.dataset.on=1;const rows=$$('.fb-row[data-r]',sec);const data=rows.map(()=>lbNew(Math.floor(Math.random()*4)));let landed=0;
 const paint=(i,keys)=>{const r=rows[i],d=data[i];(keys||['fl','from','to','co','st']).forEach(k=>{const el=$(`[data-k="${k}"]`,r);flapTo(el,k==='st'?LB_ST[d.st]:d[k],!keys);if(k==='st'){el.classList.toggle('ok',d.st===3);el.classList.toggle('st-fly',d.st===2);el.classList.toggle('st-brd',d.st===1);}});};
 rows.forEach((_,i)=>paint(i));
 const clock=()=>{const c=$('#lbClock',sec);if(c)c.textContent=new Date().toLocaleTimeString('en-GB',{timeZone:'America/New_York',hour:'2-digit',minute:'2-digit',second:'2-digit'})+' '+(new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',timeZoneName:'short'}).formatToParts(new Date()).find(x=>x.type==='timeZoneName')||{value:'ET'}).value;const n=$('#lbCount',sec);if(n)n.textContent=landed?`${landed} landed while you were here`:'';};
 const tick=()=>{if(!sec.isConnected)return;const r=sec.getBoundingClientRect();if(r.bottom>0&&r.top<innerHeight){const i=Math.floor(Math.random()*rows.length),d=data[i];
   if(d.st===3){data[i]=lbNew(0);paint(i,['fl','from','to','co','st']);}else{d.st++;if(d.st===3)landed++;paint(i,['st']);}}
  setTimeout(tick,1600+Math.random()*1800);};
 clock();const ci=setInterval(()=>{if(!sec.isConnected)return clearInterval(ci);clock();},1000);setTimeout(tick,1200);}

/* ================= MEGA ================= */
function buildMega(){
  const g={Start:[],Run:[],Grow:[],Help:[]};
  Object.entries(SERVICES).forEach(([id,s])=>g[s.group].push(`<a href="#/service/${id}">${s.name}<small>${s.price} ${s.unit}</small></a>`));
  $('#mega').innerHTML=Object.entries(g).map(([k,l])=>`<div><h5>${k}</h5>${l.join('')}</div>`).join('')+`<div class="foot"><span class="muted">Not sure what you need? <a href="#/home" data-jump="quiz">Take the 1-minute quiz</a></span><a class="btn btn-primary btn-sm" href="#/services">See all services</a></div>`;
}

/* ================= SHARED BLOCKS ================= */
function svcCards(f){return Object.entries(SERVICES).filter(([,s])=>!f||f==='All'||s.group===f).map(([id,s])=>`
 <a class="card svc reveal" href="#/service/${id}"><div class="top"><span class="pill">${s.group}</span><span class="muted" style="font-size:13px">${s.time}</span></div><h3>${s.name}</h3><p class="desc">${s.desc}</p>
 <div class="bottom"><span class="price">From <b>${s.price}</b> ${s.unit}</span><span style="font-weight:600;color:var(--blue);display:flex;gap:4px;align-items:center">Learn more ${ICON.arrow}</span></div></a>`).join('');}
function servicesBlock(id){return `<section class="sec" id="${id}" data-chg="7" data-ghost="SERVICES" style="overflow:hidden"><div class="ghost-word" aria-hidden="true">SERVICES · SERVICES · SERVICES</div><div class="container">
 <div class="sec-head"><span class="eyebrow">Our services</span><h2>See what’s included before you pay</h2><p>Every service has its own page with details, timelines and FAQs.</p></div>
 <div class="tabs">${['All','Start','Run','Grow','Help'].map((t,i)=>`<button type="button" class="tab ${i?'':'on'}" data-filter="${t}">${t}</button>`).join('')}</div>
 <div class="grid g3 svc-grid">${svcCards('All')}</div></div></section>`;}
function faqBlock(id,plain){const f=[
 ['Do I need to be a U.S. citizen to start a business?','No. Founders living in India can own a US LLC or C-Corp. You don’t need to visit the US.'],
 ['Which state should I choose from India?','Most founders pick Wyoming or Delaware. Our quiz and experts help you choose based on your business and plans to raise money.'],
 ['How long does it take?','Company formation takes about 7 business days. The EIN usually takes longer for founders without an SSN — <span class="ph">[timeline to confirm]</span>.'],
 ['Do you help with EIN and bank account setup?','Yes. EIN is included in Premium and available as an $80 add-on with Starter. Bank account assistance is $100.'],
 ['What is your money-back guarantee?','If your company isn’t formed because of our mistake, we refund our service fee in full. State fees are paid to the government and are not refundable. See our <a href="/refund">refund policy</a>.'],
 ['Can I talk to someone before paying?','Yes — message us or book a paid 30-minute expert call ($49).']];
 const inner=`<div class="faq">${f.map((q,i)=>`<details ${i?'':'open'}><summary>${q[0]}</summary><p>${q[1]}</p></details>`).join('')}</div>`;
 if(plain) return `<div><h3 style="margin-bottom:10px">FAQs</h3>${inner}</div>`;
 return `<section class="sec" id="${id}" data-chg="12" data-ghost="FAQ"><div class="container"><div class="sec-head"><span class="eyebrow">FAQ</span><h2>Questions founders ask us</h2></div>${inner}</div></section>`;}

/* ================= PAGES ================= */
const PAGES={};
PAGES.home=()=>`<div id="top"></div><div class="home-wrap">
${HEROES[cur.hero][2]('id="hero"')}
<section class="sec" id="trust" data-chg="3" data-ghost="TRUST" style="padding-top:28px"><div class="container">
 <div class="grid g4">
  <div class="stat reveal"><b class="ph">[X]+</b><span class="muted">US companies formed for our clients</span></div>
  <div class="stat reveal"><b class="ph">[Y] years</b><span class="muted">of Juris Consultants India in corporate &amp; secretarial work</span></div>
  <div class="stat reveal"><b class="ph">[4.x] ★</b><span class="muted">average from <span class="ph">[N]</span> Google reviews</span></div>
  <div class="stat reveal"><b>9</b><span class="muted">US states we form in, incl. Delaware, Wyoming &amp; Texas</span></div></div>
 <div class="guarantee reveal"><div class="g-icon">${ICON.shield}</div><div style="flex:1"><h3 style="font-size:21px">Flawless Filing or Your Money Back</h3><p style="color:#CBD5E1;margin-top:6px">If your company isn’t formed because of our mistake, we refund our service fee. State fees go to the government.</p></div><a class="btn btn-white btn-sm" href="#/home" data-jump="faq">Read the terms</a></div>
</div></section>
${storyHTML()}
<section class="sec soft" id="journey" data-chg="5" data-ghost="JOURNEY"><div class="container">
 <div class="sec-head"><span class="eyebrow">Your journey with us</span><h2>Every step, and how long it takes</h2><p>No surprises. This is exactly what happens after you click “Launch”.</p></div>
 <div class="journey"><div class="line"><i></i></div>${[['5 min','Tell us about you','Name, email, phone. That’s it.'],['2 min','Choose plan &amp; pay','See your full total first.'],['1 business day','Expert review','We check your details with you.'],['~7 business days','Company formed','We file with the state.'],['<span class="ph">[to confirm]</span>','EIN (US tax ID)','We apply to the IRS.'],['After EIN','Bank account','We help you open it.']].map((s,i)=>`<div class="j-step"><div class="j-dot">${i+1}</div><span class="j-time">${s[0]}</span><h4>${s[1]}</h4><p>${s[2]}</p></div>`).join('')}</div>
 <div style="text-align:center;margin-top:36px"><a class="btn btn-primary" href="#/start">Start step 1 now ${ICON.arrow}</a></div>
</div></section>
<section class="sec" id="who" data-chg="6" data-ghost="FOR YOU"><div class="container">
 <div class="sec-head"><span class="eyebrow">Who is this for?</span><h2>Pick your business. We’ll show what you need.</h2></div>
 <div class="tabs" id="whoTabs">${['E-Commerce','Import-Export','IT Services','Startups & Founders'].map((t,i)=>`<button type="button" class="tab ${i?'':'on'}" data-who="${i}">${t}</button>`).join('')}</div>
 <div class="who-panel" id="whoPanel"></div></div></section>
${servicesBlock('services')}
${flyHTML()}
${liveBoardHTML()}
<section class="sec soft" id="quiz" data-chg="8" data-ghost="CHOOSE"><div class="container">
 <div class="sec-head"><span class="eyebrow">1-minute quiz</span><h2>Which company type is right for me?</h2><p>Three quick questions. General guidance, not legal or tax advice.</p></div>
 <div class="quiz" id="quizBox"></div>
 <div class="grid g3" style="margin-top:36px">
  <div class="card entity reveal"><span class="pill" style="align-self:flex-start">Most Indian founders</span><h3>LLC</h3><ul><li>Owners can live in India</li><li>Simple to run, fewer filings</li><li>No shares — not ideal for raising VC money</li></ul><a href="#/service/llc">LLC Formation from $249 →</a></div>
  <div class="card entity reveal"><span class="pill" style="align-self:flex-start">Raising investment</span><h3>C-Corp</h3><ul><li>Owners can live in India</li><li>Can issue shares to investors</li><li>Investors usually prefer Delaware</li></ul><a href="#/service/ccorp">C-Corp Formation from $849 →</a></div>
  <div class="card entity reveal"><span class="pill" style="align-self:flex-start;background:#FEF2F2;color:var(--red)">US owners only</span><h3>S-Corp</h3><ul><li>A tax status, not a separate company type</li><li><b>Only US citizens / residents</b> can be shareholders</li><li>Usually not available to founders in India</li></ul><a href="#/contact">Ask an expert →</a></div></div>
</div></section>
${stackHTML()}
<section class="sec dark" id="why" data-chg="10" data-ghost="WHY US"><div class="container"><div class="hero-grid" style="gap:44px">
 <div style="display:flex;flex-direction:column;gap:16px"><span class="eyebrow">Why Juris Consultants USA</span><h2 style="font-size:clamp(30px,3.6vw,44px)">The US formation team that works in your time zone</h2>
 <p style="color:#CBD5E1;font-size:17px">Other platforms give you a form. We give you Indian CA / CS experts who answer your questions, explain in plain words, and stay with you after formation.</p>
 <div style="display:flex;gap:12px;flex-wrap:wrap"><a class="btn btn-white" href="#/contact">Talk to an Expert</a></div></div>
 <div class="grid g2"><div class="why-card reveal"><h4>IST working hours</h4><p>Calls and replies during your day, not at 2 AM.</p></div><div class="why-card reveal"><h4>CA / CS experts</h4><p>Backed by Juris Consultants India’s corporate team.</p></div><div class="why-card reveal"><h4>Hindi &amp; English</h4><p>Ask in the language you’re comfortable with.</p></div><div class="why-card reveal"><h4>India + US numbers</h4><p>+91 99996 30777 · +1 (646) 233-8454</p></div></div>
</div></div></section>
<section class="sec" id="clients" data-chg="4" data-ghost="CLIENTS"><div class="container">
 <div class="sec-head"><span class="eyebrow">Client stories</span><h2>Founders who started with us</h2><p>Real clients only — logos and quotes added with their permission.</p></div>
 <div class="grid g3">${[1,2,3].map(()=>`<div class="card quote reveal"><span class="stars">★★★★★</span><p style="font-size:16px"><span class="ph">[Short quote from a real client about their experience]</span></p><div style="display:flex;gap:12px;align-items:center"><span class="avatar"></span><div><b class="ph">[Name]</b><div class="muted" style="font-size:13px"><span class="ph">[Company · City]</span></div></div></div></div>`).join('')}</div>
 <div class="logos">${[1,2,3,4,5,6].map(()=>`<div class="logo-ph">[Client logo]</div>`).join('')}</div></div></section>
<section class="sec" id="magnet" data-chg="11" style="padding-top:20px"><div class="container"><div class="magnet reveal">
 <div style="display:flex;flex-direction:column;gap:14px"><span class="pill" style="align-self:flex-start;background:var(--amber-50);color:var(--amber-d)">Free guide</span><h2 style="font-size:clamp(26px,3vw,36px)">Starting a US company from India: the complete checklist</h2><p class="muted">States compared, real costs, EIN without SSN, and opening a US bank account — in one PDF.</p>
 <form class="form" id="magnetForm" novalidate style="flex-direction:row;flex-wrap:wrap;align-items:flex-start"><div class="field" style="flex:1;min-width:220px"><input type="email" id="mEmail" placeholder="Your email" aria-label="Your email"><span class="msg"></span></div><button class="btn btn-primary" type="submit">Send me the guide</button></form>
 <div class="ok-msg hide" id="magnetOk">✓ Thanks! The guide is on its way to your inbox. (demo)</div></div>
 <div class="guide-mock" aria-hidden="true"><div style="font-family:var(--head);font-weight:700;font-size:18px">US Company from India</div><div style="font-size:13px;color:#475569">Checklist 2026 · Juris Consultants USA</div><div class="bar" style="width:90%"></div><div class="bar" style="width:75%"></div><div class="bar" style="width:82%"></div><div class="bar" style="width:60%"></div><div class="bar" style="width:70%"></div></div>
</div></div></section>
${faqBlock('faq')}
<section class="sec" id="final" data-chg="13" style="padding-top:20px"><div class="container"><div class="final reveal"><div><h2>Ready to launch your US company?</h2><p style="color:var(--on-primary-muted);margin-top:8px">Most founders finish step 1 in under 5 minutes.</p></div>
 <div style="display:flex;gap:12px;flex-wrap:wrap"><a class="btn btn-white btn-lg" href="#/start">Launch Your Company</a><a class="btn btn-ghost-w btn-lg" href="#/contact">Talk to an Expert</a></div></div></div></section>
</div>`;

PAGES.gallery=()=>{const rib=(cat,i)=>{const k=rankOf(cat,i);return k?`<span class="rec-ribbon">★ Recommended #${k}</span>`:'';};return `
<section class="sec soft" style="padding:50px 0"><div class="container"><div class="sec-head" style="margin-bottom:0"><span class="eyebrow">Design gallery</span><h1 style="font-size:clamp(32px,4vw,48px)">20 themes · 20 hero designs · 20 home layouts</h1><p>Click a theme or layout to apply it to the whole site. ★ marks our top 3 in each category. Every hero below uses the current theme.</p>
<div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-top:10px">${COMBOS.map((c,i)=>`<button type="button" class="btn ${i?'btn-outline':'btn-primary'}" data-gcombo="${i}">${c.n}</button>`).join('')}</div></div></div></section>
<section class="sec" id="gThemes" data-chg="19" style="padding-top:50px"><div class="container"><h2 style="margin-bottom:8px">Colour &amp; font themes</h2><p class="muted" style="margin-bottom:22px">1–10 light · 11–20 dark &amp; futuristic</p>
 <div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(210px,1fr))">${THEMES.map((t,i)=>`<div class="theme-card ${t.dark?'dk':''} ${i===cur.theme?'sel':''}" data-theme="${i}" role="button" tabindex="0">${rib('theme',i)}<div class="sw"><i style="background:${t.v.navy}"></i><i style="background:${t.v.blue}"></i><i style="background:${t.v.amber}"></i><i style="background:${t.v.soft}"></i></div><div class="tc"><span style="font-size:12px;color:#64748B">Theme ${i+1}${t.dark?' · dark':''}</span><b style="font-family:${t.v.head};font-weight:${t.v.hw}">${t.n}</b><span style="font-size:13px;color:#475569">${t.d}</span></div></div>`).join('')}</div></div></section>
<section class="sec" id="gLayouts" data-chg="20" style="padding-top:20px"><div class="container"><h2 style="margin-bottom:22px">Home page layouts</h2>
 <div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(210px,1fr))">${LAYOUTS.map((l,i)=>`<div class="layout-card ${i===cur.layout?'sel':''}" data-layout="${i}" role="button" tabindex="0">${rib('layout',i)}<span style="font-size:12px;color:#64748B">Layout ${i+1}</span><b style="display:block;font-size:17px">${l.n}</b><span style="font-size:13px;color:#475569">${l.d}</span><div style="margin-top:10px;font-size:13px;font-weight:600;color:#7C3AED">Apply &amp; open home →</div></div>`).join('')}</div></div></section>
<div style="padding:20px 0 0"><div class="container"><h2>Hero designs</h2></div></div>
${HEROES.map((h,i)=>{const k=rankOf('hero',i);return `<div class="gal-label"><span><b>Hero ${i+1} — ${h[0]}</b> · ${h[1]} ${k?`<span class="rk" style="background:#FBBF24;color:#1F1147;border-radius:999px;padding:3px 8px;font-weight:800;font-size:12px;margin-left:6px">★ Recommended #${k}</span>`:''}</span><button type="button" data-usehero="${i}">Use this hero</button></div><div class="gal-hero">${h[2]('')}</div>`;}).join('')}`;};

PAGES.services=()=>`<section class="sec soft" style="padding:56px 0"><div class="container"><div class="sec-head" style="margin-bottom:0"><span class="eyebrow">Services</span><h1 style="font-size:clamp(32px,4vw,48px)">Everything to start, run and grow your US company</h1><p>Click any service to see details first. Payment comes after.</p></div></div></section>${servicesBlock('services')}${faqBlock('faq')}`;
PAGES.service=(id)=>{const s=SERVICES[id]||SERVICES.llc,plan=s.plan;return `<section class="sec" style="padding-top:40px"><div class="container"><div class="crumb"><a href="#/services">Services</a> / ${s.group} / ${s.name}</div><div class="detail">
 <div style="display:flex;flex-direction:column;gap:28px">
  <div><h1 style="font-size:clamp(32px,4vw,48px)">${s.name}</h1><p style="font-size:18px;color:var(--muted);margin-top:12px">${s.desc}</p><p style="margin-top:10px"><b>Best for:</b> ${s.who}</p></div>
  <div class="grid g2"><div class="card"><h4 style="margin-bottom:12px">What’s included</h4>${s.incl.map(x=>`<div style="padding:4px 0"><span class="check">✓</span> ${x}</div>`).join('')}</div><div class="card"><h4 style="margin-bottom:12px">Good to know</h4>${s.good.map(x=>`<div style="padding:4px 0">• ${x}</div>`).join('')}</div></div>
  <div><h3 style="margin-bottom:14px">How it works</h3><div class="grid g3"><div class="mini-step"><b>STEP 1 · 5 MIN</b><h4 style="margin:6px 0 4px">Choose &amp; pay</h4><p class="muted" style="font-size:14px">Name, email, phone and plan.</p></div><div class="mini-step"><b>STEP 2 · 1 DAY</b><h4 style="margin:6px 0 4px">Share details</h4><p class="muted" style="font-size:14px">In your dashboard, with our team’s help.</p></div><div class="mini-step"><b>STEP 3 · ${s.time.toUpperCase()}</b><h4 style="margin:6px 0 4px">We deliver</h4><p class="muted" style="font-size:14px">Track status live until it’s done.</p></div></div></div>
  <div class="card locked"><div style="display:flex;gap:10px;align-items:center;color:var(--muted)">${ICON.lock}<h4 style="color:var(--text)">Unlocked after payment</h4></div><div class="grid g3" style="margin-top:12px;font-size:14px;color:var(--muted)"><span>Document checklist for your case</span><span>Your filing copies &amp; certificates</span><span>Expert review of your details</span></div></div>
  ${faqBlock('',true)}
 </div>
 <aside class="card buy"><div class="muted" style="font-size:14px">${s.group} · ${s.time}</div><div><span style="font-family:var(--head);font-size:40px;font-weight:var(--hw)">${s.price}</span> <span class="muted">${s.unit}</span></div>
  ${plan&&plan!=='warehouse'?`<div class="field"><label for="dState">State</label><select id="dState">${stateOpts('Wyoming')}</select></div><div class="trow" style="border-top:1px solid var(--line);padding-top:12px"><span>Total today</span><b id="dTotal"></b></div>`:''}
  <a class="btn btn-primary" id="dGo" href="${plan?'#/start?plan='+plan:'#/start'}">Get started</a><a class="btn btn-outline" href="#/contact">Talk to an Expert</a>
  <div style="display:flex;gap:10px;background:var(--amber-50);border-radius:12px;padding:12px;font-size:13px;color:var(--amber-d)">${ICON.shield}<span><span class="mbg"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/></svg>Money-Back Guarantee</span> if filing fails due to our error.</span></div></aside>
</div></div></section>`;};
PAGES.pricing=()=>`<section class="sec"><div class="container"><div class="sec-head"><h2>Compare plans in detail</h2></div><div style="overflow-x:auto"><table class="cmp">
 <tr><th>What you get</th><th>Starter · LLC</th><th>Premium · C-Corp</th><th>Warehousing</th></tr><tr><td>Price</td><td>$249 + state fee</td><td>$849 + state fee</td><td>$49</td></tr>
 <tr><td>Name availability check</td><td class="check">✓</td><td class="check">✓</td><td>–</td></tr><tr><td>Company formation &amp; state filing</td><td class="check">✓ LLC</td><td class="check">✓ C-Corp</td><td>–</td></tr>
 <tr><td>Operating agreement / bylaws</td><td class="check">✓ Basic</td><td class="check">✓ Bylaws</td><td>–</td></tr><tr><td>EIN (US tax ID)</td><td>$80 add-on</td><td class="check">✓ Included</td><td>–</td></tr>
 <tr><td>Registered agent</td><td>–</td><td class="check">✓ 1 year</td><td>–</td></tr><tr><td>Warehousing &amp; fulfilment</td><td>–</td><td>–</td><td class="check">✓ NY / TX / CA</td></tr>
 <tr><td>Timeline</td><td>~7 business days</td><td>~7 business days</td><td><span class="ph">[to confirm]</span></td></tr></table></div>
 <div class="sec-head" style="margin-top:56px"><h2>Add-ons</h2></div><div class="grid g3">${ADDONS.map(a=>`<div class="card"><h4>${a.n}</h4><p class="muted" style="margin-top:6px">${a.one?money(a.one)+' one-time':money(a.mo)+' per month'}</p></div>`).join('')}</div></div></section>${faqBlock('faq')}`;
PAGES.how=()=>`<section class="sec soft" style="padding:56px 0"><div class="container"><div class="sec-head" style="margin-bottom:0"><span class="eyebrow">How it works</span><h1 style="font-size:clamp(32px,4vw,48px)">From India to a US company — step by step</h1><p>Honest timelines for founders outside the US.</p></div></div></section>
<section class="sec" data-chg="5"><div class="container"><div class="journey in"><div class="line"><i></i></div>${[['5 min','Tell us about you'],['2 min','Choose plan &amp; pay'],['1 business day','Expert review'],['~7 business days','Company formed'],['<span class="ph">[to confirm]</span>','EIN (US tax ID)'],['After EIN','Bank account']].map((s,i)=>`<div class="j-step"><div class="j-dot">${i+1}</div><span class="j-time">${s[0]}</span><h4>${s[1]}</h4></div>`).join('')}</div>
 <div class="grid g2" style="margin-top:56px"><div class="card"><h3 style="margin-bottom:12px">What we need from you</h3><div>• Passport copy <span class="ph">[confirm list]</span></div><div>• Address proof</div><div>• 2–3 company name options</div><div>• Business activity in one line</div></div><div class="card"><h3 style="margin-bottom:12px">What you get</h3><div><span class="check">✓</span> Formation documents &amp; certificate</div><div><span class="check">✓</span> EIN letter (if chosen)</div><div><span class="check">✓</span> Live status in your dashboard</div><div><span class="check">✓</span> Email updates at every step</div></div></div>
 <div style="text-align:center;margin-top:36px"><a class="btn btn-primary btn-lg" href="#/start">Launch Your Company</a> &nbsp; <a class="btn btn-outline btn-lg" href="#/track">See a sample tracker</a></div></div></section>`;
const BLOGS=[{id:'states',t:'Which US State Should You Choose to Start a Business from India? Texas vs Delaware vs Wyoming vs Florida',tag:'US Company Formation',real:true},{id:'ein',t:'EIN without SSN: how Indian founders get a US tax ID',tag:'EIN & Tax'},{id:'cost',t:'US LLC cost from India: the full breakdown',tag:'Pricing'},{id:'bank',t:'Opening a US business bank account from India',tag:'Banking'}];
PAGES.blogs=()=>`<section class="sec soft" style="padding:56px 0"><div class="container"><div class="sec-head" style="margin-bottom:0"><span class="eyebrow">Blogs</span><h1 style="font-size:clamp(32px,4vw,48px)">Guides for Indian founders</h1><p>Each guide links to the service you need next.</p></div></div></section>
<section class="sec"><div class="container"><div class="grid g2">${BLOGS.map(b=>`<a class="card svc" href="#/blog/${b.id}"><div class="top"><span class="pill">${b.tag}</span>${b.real?'<span class="muted" style="font-size:13px">10 min read</span>':'<span class="pill" style="background:var(--amber-50);color:var(--amber-d)">Suggested topic</span>'}</div><h3 style="font-size:21px">${b.t}</h3><p class="muted" style="font-size:14px">By <span class="ph">[Author], CA</span> · Updated <span class="ph">[date]</span></p><span style="font-weight:600;color:var(--blue)">Read guide →</span></a>`).join('')}</div></div></section>`;
PAGES.blog=(id)=>{const b=BLOGS.find(x=>x.id===id)||BLOGS[0];return `<section class="sec" style="padding-top:40px" id="blogtop" data-chg="14"><div class="container"><div class="blog-grid">
 <nav class="toc" aria-label="On this page"><b class="muted" style="font-size:12px;letter-spacing:1px">ON THIS PAGE</b><a href="#/blog/${b.id}" data-jump="b1">Quick answer</a><a href="#/blog/${b.id}" data-jump="b2">State fees compared</a><a href="#/blog/${b.id}" data-jump="b3">Which state suits you</a><a href="#/blog/${b.id}" data-jump="b4">FAQs</a></nav>
 <article class="article"><span class="pill">${b.tag}</span><h1 style="font-size:clamp(28px,3.4vw,40px);margin:14px 0">${b.t}</h1>
  <div class="muted" style="font-size:14px;display:flex;gap:10px;align-items:center"><span class="avatar" style="width:34px;height:34px"></span><span><b class="ph">[Author name], CA</b> · Updated <span class="ph">[date]</span> · 10 min read</span></div>
  <div id="b1" style="background:var(--soft);border-radius:14px;padding:18px 20px;margin:22px 0"><b>Quick answer:</b> <span class="ph">[2–3 line summary Google can show as a snippet]</span></div>
  <p><span class="ph">[Existing blog text continues here: filing fees, franchise taxes, sales tax and compliance for each state…]</span></p>
  <div class="cta-box"><div><h3 style="font-size:20px">Still not sure which state fits you?</h3><p style="color:#CBD5E1;margin-top:6px">Our experts pick the right state and structure with you in a 30-minute call.</p></div><a class="btn btn-white" href="#/service/expert">Talk to an Expert · $49</a></div>
  <h2 id="b2">State fees compared</h2><div style="overflow-x:auto"><table class="cmp"><tr><th>State</th><th>State filing fee</th><th>Start here</th></tr><tr><td>Wyoming</td><td>$103.75</td><td><a href="#/start?plan=starter&state=Wyoming">Form in Wyoming →</a></td></tr><tr><td>Texas</td><td>$310</td><td><a href="#/start?plan=starter&state=Texas">Form in Texas →</a></td></tr><tr><td>Delaware</td><td><span class="ph">[fee]</span></td><td><a href="#/start?plan=premium&state=Delaware">Form in Delaware →</a></td></tr><tr><td>Florida</td><td><span class="ph">[fee]</span></td><td><a href="#/start?plan=starter&state=Florida">Form in Florida →</a></td></tr></table></div>
  <h2 id="b3">Which state suits you</h2><p><span class="ph">[Existing content]</span></p><h2 id="b4">FAQs</h2><p><span class="ph">[3–5 FAQs with schema markup for Google]</span></p></article>
 <aside style="display:flex;flex-direction:column;gap:14px;position:sticky;top:96px"><div class="card buy" style="position:static"><h3 style="font-size:19px">Ready to start your US company?</h3><p class="muted" style="font-size:14px">LLC from $249 + state fee. ~7 business days.</p><a class="btn btn-primary" href="#/start">Launch Your Company</a><span class="muted" style="font-size:13px"><span class="mbg"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/></svg>Money-Back Guarantee</span></span></div>
  <b class="muted" style="font-size:12px;letter-spacing:1px">RELATED SERVICES</b><a class="card" style="padding:14px;font-weight:600;color:var(--text)" href="#/service/llc">US LLC Formation →</a><a class="card" style="padding:14px;font-weight:600;color:var(--text)" href="#/service/ein">EIN &amp; Tax Registration →</a><a class="card" style="padding:14px;font-weight:600;color:var(--text)" href="#/service/agent">Registered Agent →</a></aside>
</div></div></section>`;};
PAGES.about=()=>`<section class="sec soft" style="padding:56px 0"><div class="container"><div class="sec-head" style="margin-bottom:0"><span class="eyebrow">About us</span><h1 style="font-size:clamp(32px,4vw,48px)">The team behind Juris Consultants India — now helping you go global</h1><p>Indian CA / CS experts helping founders start and run US companies.</p></div></div></section>
<section class="sec"><div class="container"><div class="grid g3">${['Years in corporate &amp; secretarial work','Companies formed in the US','Founders served across India'].map((t,i)=>`<div class="stat"><b class="ph">[${['Y','X','N'][i]}]</b><span class="muted">${t}</span></div>`).join('')}</div>
<div class="sec-head" style="margin-top:60px"><h2>Meet the team</h2><p>Real photos and qualifications build trust.</p></div><div class="grid g4">${[1,2,3,4].map(()=>`<div class="card" style="text-align:center"><div class="avatar" style="width:84px;height:84px;margin:0 auto 12px"></div><b class="ph">[Name]</b><div class="muted" style="font-size:14px"><span class="ph">[Role · CA / CS]</span></div></div>`).join('')}</div></div></section>`;
PAGES.contact=()=>`<section class="sec" style="padding-top:48px"><div class="container"><div class="hero-grid" style="align-items:start">
 <div style="display:flex;flex-direction:column;gap:18px"><span class="eyebrow">Contact</span><h1 style="font-size:clamp(32px,4vw,48px)">Talk to an expert</h1><p class="lead" style="color:var(--muted)">Call or email us. We reply in Indian working hours.</p>
 <div class="card"><div><b>India:</b> +91 99996 30777</div><div><b>USA:</b> +1 (646) 233-8454</div><div><b>Email:</b> <a href="mailto:contact@jurisconsultantsusa.com">contact@jurisconsultantsusa.com</a></div><div><b>Office:</b> <span class="ph">[office address]</span></div></div>
 <div class="card" style="background:var(--soft)"><b>Prefer a full planning call?</b><p class="muted" style="margin-top:6px">Book a 30-minute expert call for $49 — booked after payment.</p><a href="#/service/expert" style="font-weight:600">Book an expert call →</a></div></div>
 <form class="card form" id="contactForm" novalidate data-chg="15"><h3>Send us a message</h3>
  <div class="field"><label for="cfName">Full name</label><input id="cfName" placeholder="e.g. Priya Sharma"><span class="msg"></span></div>
  <div class="field"><label for="cfEmail">Email</label><input id="cfEmail" type="email" placeholder="you@company.com"><span class="msg"></span></div>
  <div class="field"><label for="cfPhone">Phone</label><div class="phone-row"><select id="cfCc" aria-label="Country code"><option>+91</option><option>+1</option><option>+44</option><option>+971</option></select><input id="cfPhone" type="tel" placeholder="98765 43210"></div><span class="msg"></span></div>
  <div class="field"><label for="cfMsg">How can we help?</label><textarea id="cfMsg" rows="4" placeholder="e.g. I sell on Amazon US and need an LLC"></textarea><span class="msg"></span></div>
  <button class="btn btn-primary" type="submit">Send message</button><div class="ok-msg hide" id="cfOk">✓ Thanks! Our team will reply by email.</div></form>
</div></div></section>`;
PAGES.start=()=>`<section class="sec soft" style="padding-top:40px;min-height:70vh" id="obtop" data-chg="15"><div class="container" id="ob"></div></section>`;
PAGES.track=()=>`<section class="sec soft" style="padding-top:40px" id="tracktop" data-chg="17"><div class="container" style="max-width:1060px">
 <div style="display:flex;justify-content:space-between;align-items:flex-end;gap:16px;flex-wrap:wrap;margin-bottom:24px"><div><span class="eyebrow">Your dashboard</span><h1 style="font-size:36px;margin-top:6px">Your Business LLC · Wyoming</h1><p class="muted">Order #<span class="ph">[ID]</span> · Updates also sent by email</p></div><a class="btn btn-outline btn-sm" href="/contacts">Contact your expert</a></div>
 <div class="ob" style="max-width:none"><div class="card"><h3 style="margin-bottom:18px">Progress</h3><div class="trk">
 ${[['done','Payment received','Receipt emailed','Done'],['done','Details reviewed by our expert','Within 1 business day','Done'],['now','Filed with the state','~7 business days','In progress'],['','EIN application','[timeline to confirm]','Up next'],['','Bank account assistance','After EIN','Up next']].map((r,i,a)=>`<div class="trk-row"><div class="trk-l"><span class="d ${r[0]} ${r[0]==='now'?'pulse':''}"></span>${i<a.length-1?'<span class="ln"></span>':''}</div><div class="trk-c"><div><b>${r[1]}</b><div class="muted" style="font-size:13px">${r[2].startsWith('[')?'<span class="ph">'+r[2]+'</span>':r[2]}</div></div><span class="st ${r[0]==='done'?'done':r[0]==='now'?'now':'next'}">${r[3]}</span></div></div>`).join('')}</div></div>
 <form class="card form summary" id="addrForm" novalidate><h3>Complete your business details</h3><p class="muted" style="font-size:14px">Asked after payment — only what this service needs.</p>
  <div class="field"><label for="aStreet">Street address</label><input id="aStreet" placeholder="Street and number"><span class="msg"></span></div>
  <div class="field"><label for="aCity">City</label><input id="aCity" placeholder="e.g. Austin"><span class="msg"></span></div>
  <div class="grid g2" style="gap:12px"><div class="field"><label for="aState">State</label><select id="aState">${stateOpts('Wyoming')}</select><span class="msg"></span></div><div class="field"><label for="aZip">ZIP code</label><input id="aZip" inputmode="numeric" placeholder="5 digits"><span class="msg"></span></div></div>
  <button class="btn btn-primary" type="submit">Save details</button><div class="ok-msg hide" id="addrOk">✓ Saved. Your expert will review it. (demo)</div></form></div></div></section>`;

/* ================= ONBOARDING ================= */
/* Country data: phone digits (national number, no leading 0) and postal-code rules.
   cc = dial code; re = allowed national numbers; zip = postal pattern; zf = characters to strip while typing. */
const D=/\D/g,DH=/[^\d-]/g,AN=/[^A-Za-z0-9 ]/g;
const COUNTRIES=[
 {iso:'IN',name:'India',cc:'+91',re:/^[6-9]\d{9}$/,len:'10 digits, starting with 6, 7, 8 or 9',max:10,ph:'98765 43210',zip:/^[1-9]\d{5}$/,zn:'PIN code',zh:'6 digits, e.g. 110001',zmax:6,zf:D},
 {iso:'US',name:'United States',cc:'+1',re:/^[2-9]\d{2}[2-9]\d{6}$/,len:'10 digits (area code + number)',max:10,ph:'415 555 0132',zip:/^\d{5}(-\d{4})?$/,zn:'ZIP code',zh:'5 digits, e.g. 78701',zmax:10,zf:DH},
 {iso:'CA',name:'Canada',cc:'+1',re:/^[2-9]\d{2}[2-9]\d{6}$/,len:'10 digits (area code + number)',max:10,ph:'416 555 0132',zip:/^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z] ?\d[ABCEGHJ-NPRSTV-Z]\d$/i,zn:'Postal code',zh:'e.g. M5V 2T6',zmax:7,zf:AN},
 {iso:'GB',name:'United Kingdom',cc:'+44',re:/^[1-9]\d{8,9}$/,len:'9 or 10 digits, without the leading 0',max:10,ph:'7911 123456',zip:/^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i,zn:'Postcode',zh:'e.g. SW1A 1AA',zmax:8,zf:AN},
 {iso:'AE',name:'United Arab Emirates',cc:'+971',re:/^(5\d{8}|[2-467-9]\d{7})$/,len:'9 digits for mobile (starting with 5) or 8 digits for landline',max:9,ph:'50 123 4567',zip:null},
 {iso:'AU',name:'Australia',cc:'+61',re:/^[2-478]\d{8}$/,len:'9 digits, without the leading 0',max:9,ph:'412 345 678',zip:/^\d{4}$/,zn:'Postcode',zh:'4 digits, e.g. 2000',zmax:4,zf:D},
 {iso:'SG',name:'Singapore',cc:'+65',re:/^[3689]\d{7}$/,len:'8 digits, starting with 3, 6, 8 or 9',max:8,ph:'9123 4567',zip:/^\d{6}$/,zn:'Postal code',zh:'6 digits, e.g. 018956',zmax:6,zf:D},
 {iso:'DE',name:'Germany',cc:'+49',re:/^[1-9]\d{9,10}$/,len:'10 or 11 digits, without the leading 0',max:11,ph:'1512 3456789',zip:/^\d{5}$/,zn:'Postleitzahl',zh:'5 digits, e.g. 10115',zmax:5,zf:D},
 {iso:'FR',name:'France',cc:'+33',re:/^[1-9]\d{8}$/,len:'9 digits, without the leading 0',max:9,ph:'6 12 34 56 78',zip:/^\d{5}$/,zn:'Code postal',zh:'5 digits, e.g. 75001',zmax:5,zf:D},
 {iso:'NL',name:'Netherlands',cc:'+31',re:/^[1-9]\d{8}$/,len:'9 digits, without the leading 0',max:9,ph:'6 12345678',zip:/^\d{4} ?[A-Z]{2}$/i,zn:'Postcode',zh:'e.g. 1012 AB',zmax:7,zf:AN},
 {iso:'JP',name:'Japan',cc:'+81',re:/^[1-9]\d{9}$/,len:'10 digits, without the leading 0',max:10,ph:'90 1234 5678',zip:/^\d{3}-?\d{4}$/,zn:'Postal code',zh:'7 digits, e.g. 100-0001',zmax:8,zf:DH},
 {iso:'NG',name:'Nigeria',cc:'+234',re:/^[789]\d{9}$/,len:'10 digits, without the leading 0',max:10,ph:'802 123 4567',zip:/^\d{6}$/,zn:'Postal code',zh:'6 digits, e.g. 100001',zmax:6,zf:D},
 {iso:'BR',name:'Brazil',cc:'+55',re:/^[1-9]{2}9?\d{8}$/,len:'10 or 11 digits (area code + number)',max:11,ph:'11 91234 5678',zip:/^\d{5}-?\d{3}$/,zn:'CEP',zh:'8 digits, e.g. 01310-100',zmax:9,zf:DH},
 {iso:'ZA',name:'South Africa',cc:'+27',re:/^[1-9]\d{8}$/,len:'9 digits, without the leading 0',max:9,ph:'82 123 4567',zip:/^\d{4}$/,zn:'Postal code',zh:'4 digits, e.g. 2001',zmax:4,zf:D},
 {iso:'MY',name:'Malaysia',cc:'+60',re:/^[1-9]\d{7,9}$/,len:'8 to 10 digits, without the leading 0',max:10,ph:'12 345 6789',zip:/^\d{5}$/,zn:'Postcode',zh:'5 digits, e.g. 50450',zmax:5,zf:D},
 {iso:'BD',name:'Bangladesh',cc:'+880',re:/^1[3-9]\d{8}$/,len:'10 digits, starting with 1',max:10,ph:'1712 345678',zip:/^\d{4}$/,zn:'Postal code',zh:'4 digits, e.g. 1207',zmax:4,zf:D}
];
const PHONE_RULES={};
COUNTRIES.forEach(c=>{if(!PHONE_RULES[c.cc])PHONE_RULES[c.cc]={re:c.re,max:c.max,ph:c.ph,name:c.cc==='+1'?'US / Canada':c.name,msg:'Enter a valid '+(c.cc==='+1'?'US / Canada':c.name)+' number: '+c.len+'.'};});
const phoneOk=(cc,d)=>!!PHONE_RULES[cc]&&PHONE_RULES[cc].re.test(d);
const zipOk=(c,v)=>!c.zip||c.zip.test(v.trim());
const ccOptions=sel=>{const seen={};return COUNTRIES.filter(c=>!seen[c.cc]&&(seen[c.cc]=1)).map(c=>'<option value="'+c.cc+'"'+(c.cc===sel?' selected':'')+'>'+(c.cc==='+1'?'US/CA':c.iso)+' '+c.cc+'</option>').join('');};
function bindPhone(inp,sel){if(!inp||!sel||inp.dataset.pv)return;inp.dataset.pv=1;
 const ap=()=>{const r=PHONE_RULES[sel.value];inp.maxLength=r.max;inp.placeholder=r.ph;inp.inputMode='numeric';};ap();
 sel.addEventListener('change',()=>{ap();inp.value=inp.value.replace(D,'').slice(0,PHONE_RULES[sel.value].max);});
 inp.addEventListener('input',()=>{const d=inp.value.replace(D,'').slice(0,PHONE_RULES[sel.value].max);if(inp.value!==d)inp.value=d;});}
function bindAddr(af){if(!af||af.dataset.on)return;af.dataset.on=1;
 const st=$('#aStreet'),z=$('#aZip'),s=$('#aState'),c0=$('#aCity'),zl=$('label[for=aZip]',af),sl=$('label[for=aState]',af);
 const cf=document.createElement('div');cf.className='field';cf.innerHTML='<label for="aCountry">Country</label><select id="aCountry">'+COUNTRIES.map(c=>'<option value="'+c.iso+'"'+(c.iso==='US'?' selected':'')+'>'+c.name+'</option>').join('')+'</select>';
 st.closest('.field').before(cf);
 const rg=document.createElement('input');rg.id='aRegion';rg.placeholder='State / province / region';rg.style.display='none';s.after(rg);
 const cur=()=>COUNTRIES.find(x=>x.iso===$('#aCountry').value);
 const ap=()=>{const c=cur(),us=c.iso==='US';s.style.display=us?'':'none';rg.style.display=us?'none':'';sl.textContent=us?'State':'State / region';
  if(c.zip){zl.textContent=c.zn;z.placeholder=c.zh;z.maxLength=c.zmax;z.inputMode=c.zf===D?'numeric':'text';}else{zl.textContent='Postal code (optional)';z.placeholder='Not used in '+c.name;z.maxLength=12;z.inputMode='text';}};
 $('#aCountry').addEventListener('change',()=>{ap();z.value='';});
 z.addEventListener('input',()=>{const c=cur();let v=c.zf?z.value.replace(c.zf,''):z.value;if(c.iso==='GB'||c.iso==='CA'||c.iso==='NL')v=v.toUpperCase();if(v!==z.value)z.value=v;});
 ap();
 af.onsubmit=e=>{e.preventDefault();let ok=true;const c=cur(),us=c.iso==='US';
  ok=setErr(st,st.value.trim().length<4?'Please enter the street address.':'')&&ok;
  const city=c0.value.trim(),reg=us?s.value:rg.value.trim();
  ok=setErr(c0,!/^[\p{L} .'-]{2,}$/u.test(city)?'City should contain letters only.':(city.toLowerCase()===reg.toLowerCase()?'This looks like a state name — please enter the city.':''))&&ok;
  if(!us)ok=setErr(rg,/^[\p{L} .'-]{2,}$/u.test(reg)?'':'Please enter your state, province or region.')&&ok;
  const zv=z.value.trim();
  ok=setErr(z,c.zip?(zipOk(c,zv)?'':'Enter a valid '+c.zn+' for '+c.name+' ('+c.zh+').'):(zv&&!/^[A-Za-z0-9 -]{3,12}$/.test(zv)?'Enter a valid postal code.':''))&&ok;
  if(ok){af.querySelector('button').classList.add('hide');$('#addrOk').classList.remove('hide');}};}
const EMAIL_RE=/^(?!.*\.\.)[A-Za-z0-9](?:[A-Za-z0-9._%+-]{0,62}[A-Za-z0-9])?@(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,24}$/;
const REQ_IDS=['oName','oEmail','oPhone','oNeed','cfName','cfEmail','cfPhone','cfMsg','aStreet','aCity','aState','aRegion','aZip','aCountry'];
function markReq(){REQ_IDS.forEach(id=>{const l=document.querySelector('label[for='+id+']'),i=document.getElementById(id);if(l)l.classList.add('req');if(i)i.setAttribute('aria-required','true');});}
function setErr(input,msg){const f=input.closest('.field');f.classList.toggle('err',!!msg);$('.msg',f).textContent=msg||'';return !msg;}
let FEE_CONSULT=49;
const isConsult=()=>state.flow==='expert'||state.flow==='global';
function obTotals(){const manage=state.flow==='manage',p=manage?{name:'Existing company services',sub:'',price:0,form:false}:PLANS[state.plan],st=STATES.find(s=>s.n===state.st),showFee=!manage&&p.form,fee=showFee?st.fee:0,einInc=!manage&&state.plan==='premium';let one=0,mo=0,lines=[];
 if(p.form||manage)ADDONS.forEach(a=>{if(state.add[a.id]&&!(a.id==='ein'&&einInc)){one+=a.one||0;mo+=a.mo||0;lines.push([a.n,a.one?money(a.one):money(a.mo)+'/mo']);}});
 return {p,st,fee,showFee,one,mo,lines,manage,einInc,total:p.price+(fee||0)+one+mo};}
function summaryHTML(){if(isConsult())return `<div class="card summary" style="display:flex;flex-direction:column;gap:10px"><h4>Your order</h4>
 <div class="trow"><span>${state.flow==='global'?'Global plan — warehousing consultation':'Expert consultation (30 min)'}</span><b>${money(FEE_CONSULT)}</b></div>
 <div class="trow" style="font-size:17px;border-top:1px solid var(--line);padding-top:10px"><b>Total today</b><b>${money(FEE_CONSULT)}</b></div>
 <div style="background:var(--amber-50);border-radius:12px;padding:12px;font-size:13px;color:var(--amber-d)">After payment you book a time on our calendar. Secure payment by card.</div></div>`;
 const t=obTotals();return `<div class="card summary" style="display:flex;flex-direction:column;gap:10px"><h4>Your order</h4>
 ${t.manage?'':`<div class="trow"><span>${t.p.name} plan${t.p.form?' ('+t.p.sub+') · '+state.st:''}</span><b>${money(t.p.price)}</b></div>`}
 ${t.showFee?`<div class="trow muted"><span>${state.st} state fee</span><span>${t.fee==null?'To be confirmed':money(t.fee)}</span></div>`:''}
 ${t.lines.map(l=>`<div class="trow muted"><span>${l[0]}</span><span>${l[1]}</span></div>`).join('')}
 ${t.einInc?'<div class="trow" style="color:var(--green)"><span>EIN</span><span>Included</span></div>':''}
 ${t.manage&&!t.lines.length?'<div class="trow muted"><span>No services chosen yet</span><span>—</span></div>':''}
 <div class="trow muted"><span>Tax</span><span>Confirmed at checkout</span></div>
 <div class="trow" style="font-size:17px;border-top:1px solid var(--line);padding-top:10px"><b>Total today</b><b>${money(t.total)}${t.fee==null&&t.showFee?' + state fee':''}</b></div>
 ${t.mo?`<div class="trow muted"><span>Then every month</span><span>${money(t.mo)}/mo</span></div>`:''}
 <div style="background:var(--amber-50);border-radius:12px;padding:12px;font-size:13px;color:var(--amber-d)">Secure card payment — card details never touch our servers.</div></div>`;}
function stepperHTML(){const s=isConsult()?['Your details','Pay consultation fee','Book a call']:state.flow==='manage'?['About you','Your services','Total & notices','Review & pay','Done']:['About you','Plan, state & type','Add-ons & total','Review & pay','Done'];return `<div class="stepper">${s.map((x,i)=>`<span class="stp ${state.step===i+1?'on':state.step>i+1?'done':''}"><i>${state.step>i+1?'✓':i+1}</i>${x}</span>${i<s.length-1?'<span class="stp-line"></span>':''}`).join('')}</div>`;}
function chipsHTML(attr){const t=obTotals();return `<div class="opt-grid">${ADDONS.map(a=>{const inc=a.id==='ein'&&t.einInc,on=inc||state.add[a.id];return `<button type="button" class="opt ${on?'on':''}" data-${attr}="${a.id}"><b>${on?'✓':'+'} ${a.n}</b><span>${inc?'Included':a.one?money(a.one)+' one-time':money(a.mo)+'/month'}</span></button>`}).join('')}</div>`;}
function warningsHTML(){const t=obTotals(),w=[];
 if(t.showFee&&t.fee==null)w.push(`The ${state.st} state fee is not final yet. We confirm it with you before we file, and you pay it only then.`);
 if(!t.manage&&state.plan==='starter'&&!state.add.ein)w.push('Without an EIN you cannot open a US bank account or file US taxes. You can add it now ($80) or later.');
 if(t.mo)w.push(`Monthly services (${money(t.mo)}/mo) renew every month until you cancel. The first month is included in today’s total.`);
 if(t.manage&&!t.lines.length)w.push('You have not chosen any service yet. Go back and pick at least one.');
 return w.length?`<div class="ok-msg" style="background:var(--amber-50);color:var(--amber-d);display:flex;flex-direction:column;gap:6px"><b>Please note</b>${w.map(x=>`<span>• ${x}</span>`).join('')}</div>`:`<div class="ok-msg" style="background:var(--green-50);color:var(--green)">Nothing to flag — your selection looks complete.</div>`;}
function loginHintHTML(){return `<p class="muted" id="obAcct" style="font-size:14px">Your account is created from your email. <a href="/login" style="color:var(--blue);font-weight:600">Already have an account? Log in</a></p>`;}
function renderOB(){const ob=$('#ob');if(!ob)return;let body='';
 const consult=isConsult(),manage=state.flow==='manage',last=consult?3:5;
 if(state.step===1)body=`<form class="card form" id="ob1" novalidate><div><h2 style="font-size:30px">${consult?'Tell us what you need':'Tell us about you'}</h2><p class="muted" style="margin-top:4px">${consult?(state.flow==='global'?'Global plan (warehousing): tell us what you sell and where it ships.':'Share your details and what you want to discuss. A US-business expert will take your call.'):'Takes under a minute. Company details come later, with our team’s help.'}</p></div>${loginHintHTML()}
  <div class="field"><label for="oName">Full name</label><input id="oName" value="${state.name}" placeholder="e.g. Priya Sharma" autocomplete="name"><span class="msg"></span></div>
  <div class="field"><label for="oEmail">Email</label><input id="oEmail" type="email" value="${state.email}" placeholder="you@company.com" autocomplete="email"><span class="msg"></span></div>
  <div class="field"><label for="oPhone">Phone</label><div class="phone-row"><select id="oCc" aria-label="Country code">${ccOptions(state.cc)}</select><input id="oPhone" type="tel" inputmode="numeric" value="${state.phone}" placeholder="98765 43210"></div><span class="msg"></span></div>
  ${consult?`<div class="field"><label for="oNeed">${state.flow==='global'?'What will you ship, and to which US states?':'What do you want to discuss?'}</label><textarea id="oNeed" rows="4" placeholder="${state.flow==='global'?'e.g. Skincare products to customers in NY, TX and CA':'e.g. LLC or C-Corp, which state, EIN without SSN'}">${state.need}</textarea><span class="msg"></span></div>`:`<div class="field"><label for="oCompany">Company name you want <span class="muted" style="font-weight:400">(optional)</span></label><input id="oCompany" value="${state.company}" placeholder="e.g. Sharma Tech LLC"><span class="hint">We’ll check availability for you. Not decided? Leave it blank.</span></div>`}
  <button class="btn btn-primary btn-lg" type="submit">${consult?'Continue to payment':'Continue'}</button><p class="muted" style="font-size:13px;text-align:center">Your progress is saved — you can go back any time.</p></form>`;
 if(consult&&state.step===2)body=`<div class="card form"><h2 style="font-size:30px">Pay the consultation fee</h2><p class="muted">One 30-minute call with a US-business expert. If you go ahead with us afterwards, your expert can set up your Premium plan.</p>
  <div class="card locked" style="text-align:center;color:var(--muted)">${ICON.lock}<div style="margin-top:6px"><b style="color:var(--text)">Secure card payment</b></div><div style="font-size:13px">Card details are entered on the payment provider’s secure page — never stored by us.</div></div>
  <label style="display:flex;gap:10px;align-items:flex-start;font-size:14px"><input type="checkbox" id="oAgree" ${state.agree?'checked':''} style="margin-top:3px;width:18px;height:18px;accent-color:var(--blue)"> I agree to the <a href="/terms" target="_blank" rel="noopener" style="color:var(--blue)">Terms</a> and <a href="/refund" target="_blank" rel="noopener" style="color:var(--blue)">Refund policy</a></label>
  <span id="agreeMsg" style="color:var(--red);font-size:13px"></span>
  <div style="display:flex;gap:12px;justify-content:space-between"><button type="button" class="btn btn-outline" data-back>← Back</button><button type="button" class="btn btn-primary" data-pay>Place order · ${money(FEE_CONSULT)}</button></div></div>`;
 if(consult&&state.step===3){const cal=($('#app')&&$('#app').dataset.calendly)||'';body=`<div class="card" style="text-align:center;display:flex;flex-direction:column;gap:14px;align-items:center;padding:40px"><div style="width:70px;height:70px;border-radius:50%;background:var(--green-50);color:var(--green);display:flex;align-items:center;justify-content:center;font-size:34px">✓</div><h2>Payment received — book your call</h2><p class="muted">Pick a time that suits you. You will get a confirmation email and the call appears in your dashboard.</p>${cal?`<a class="btn btn-primary btn-lg" href="${cal}" target="_blank" rel="noopener">Book on Calendly</a>`:'<div class="ok-msg" style="background:var(--amber-50);color:var(--amber-d)">The booking calendar is being connected. Our team will email you a booking link shortly.</div>'}<a class="btn btn-outline" href="/track-order">Go to my dashboard</a></div>`;}
 if(!consult&&state.step===2){body=manage?`<div class="card form"><h2 style="font-size:30px">Choose your services</h2><p class="muted">Already have a US company? Pick what you want us to handle.</p>${chipsHTML('oadd')}<span id="stepMsg" style="color:var(--red);font-size:13px"></span>
  <div style="display:flex;gap:12px;justify-content:space-between"><button type="button" class="btn btn-outline" data-back>← Back</button><button type="button" class="btn btn-primary" data-next>Continue</button></div></div>`
  :`<div class="card form"><h2 style="font-size:30px">Plan, state &amp; type</h2>
  <div class="opt-grid">${['starter','premium'].map(id=>{const x=PLANS[id];return `<button type="button" class="opt ${state.plan===id?'on':''}" data-plan="${id}"><b>${x.sub}${x.rec?' ★':''} · ${x.name}</b><span>${money(x.price)} + state fee</span></button>`}).join('')}</div>
  <div class="field"><label for="oState">State of formation</label><select id="oState">${STATES.map(s=>`<option ${s.n===state.st?'selected':''}>${s.n}${s.fee!=null?' — state fee '+money(s.fee):''}</option>`).join('')}</select><span class="hint">Not sure? Most founders choose Wyoming (LLC) or Delaware (C-Corp).</span></div>
  <div style="display:flex;gap:12px;justify-content:space-between"><button type="button" class="btn btn-outline" data-back>← Back</button><button type="button" class="btn btn-primary" data-next>Continue</button></div></div>`;}
 if(!consult&&state.step===3)body=`<div class="card form"><h2 style="font-size:30px">${manage?'Total &amp; notices':'Add-ons &amp; total'}</h2>${manage?'':`<div><h4 style="margin-bottom:10px">Add-ons (optional)</h4>${chipsHTML('oadd')}</div>`}${warningsHTML()}
  <div style="display:flex;gap:12px;justify-content:space-between"><button type="button" class="btn btn-outline" data-back>← Back</button><button type="button" class="btn btn-primary" data-next ${manage&&!obTotals().lines.length?'disabled':''}>Continue to review</button></div></div>`;
 if(!consult&&state.step===4)body=`<div class="card form"><h2 style="font-size:30px">Review &amp; pay</h2>
  <div class="card" style="background:var(--soft);border:0"><b>${state.name}</b><div class="muted">${state.email} · ${state.cc} ${state.phone}</div>${state.company?`<div class="muted">Company name: ${state.company}</div>`:''}<button type="button" class="btn btn-outline btn-sm" style="margin-top:10px" data-goto="1">Edit details</button></div>
  <div class="card locked" style="text-align:center;color:var(--muted)">${ICON.lock}<div style="margin-top:6px"><b style="color:var(--text)">Secure card payment</b></div><div style="font-size:13px">Card details are entered on the payment provider’s secure page — never stored by us.</div></div>
  <label style="display:flex;gap:10px;align-items:flex-start;font-size:14px"><input type="checkbox" id="oAgree" ${state.agree?'checked':''} style="margin-top:3px;width:18px;height:18px;accent-color:var(--blue)"> I agree to the <a href="/terms" target="_blank" rel="noopener" style="color:var(--blue)">Terms</a> and <a href="/refund" target="_blank" rel="noopener" style="color:var(--blue)">Refund policy</a></label>
  <span id="agreeMsg" style="color:var(--red);font-size:13px"></span>
  <div style="display:flex;gap:12px;justify-content:space-between"><button type="button" class="btn btn-outline" data-back>← Back</button><button type="button" class="btn btn-primary" data-pay>Place order · ${money(obTotals().total)}</button></div></div>`;
 if(!consult&&state.step===5)body=`<div class="card" style="text-align:center;display:flex;flex-direction:column;gap:14px;align-items:center;padding:40px"><div style="width:70px;height:70px;border-radius:50%;background:var(--green-50);color:var(--green);display:flex;align-items:center;justify-content:center;font-size:34px">✓</div><h2>Payment received — welcome aboard!</h2><p class="muted">A receipt is on its way to your email. Next: fill in your business details and upload your passport and address proof in the dashboard. Our team reviews them and files with the state.</p><a class="btn btn-primary" href="/track-order">Go to my dashboard</a></div>`;
 ob.innerHTML=stepperHTML()+`<div class="ob">${body}${state.step<last?summaryHTML():'<div></div>'}</div>`;bindOB();markReq();leadPing();}
let obAcctChecked=false;
let acctP=null;
function leadPing(){if(!state.loggedIn)return;const f=({start:'START',manage:'MANAGE',expert:'EXPERT',global:'GLOBAL'})[state.flow]||'START';const ph=state.phone?state.cc+state.phone:'';try{fetch('/api/leads',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({flow:f,stepReached:state.step,plan:isConsult()?undefined:state.plan,state:state.st,add:Object.keys(state.add).filter(k=>state.add[k]),name:state.name||undefined,phone:ph||undefined,company:state.company||undefined,need:state.need||undefined}),keepalive:true}).catch(()=>{});}catch(e){}}
function needLogin(step){try{sessionStorage.setItem('jc_draft',JSON.stringify({flow:state.flow,plan:state.plan,st:state.st,add:state.add,name:state.name,email:state.email,cc:state.cc,phone:state.phone,company:state.company,need:state.need,resume:step}));}catch(e){}location.href='/login?next='+encodeURIComponent(location.pathname+location.search);}
function restoreDraft(){try{const d=JSON.parse(sessionStorage.getItem('jc_draft')||'null');if(d&&d.flow===state.flow){const r=d.resume;delete d.resume;Object.assign(state,d);state.resumeStep=r;}}catch(e){}}
function checkAcct(){if(obAcctChecked)return acctP;obAcctChecked=true;acctP=fetch('/api/auth/session').then(r=>r.ok?r.json():null).then(s=>{if(!s||!s.user)return;if(!state.email)state.email=s.user.email||'';if(!state.name)state.name=s.user.name||'';state.loggedIn=true;if(state.step===1&&state.resumeStep){state.step=state.resumeStep;state.resumeStep=0;try{sessionStorage.removeItem('jc_draft');}catch(e){}}renderOB();}).catch(()=>{});return acctP;}
function bindOB(){const f1=$('#ob1');checkAcct();if(f1)bindPhone($('#oPhone'),$('#oCc'));
 const acct=$('#obAcct');if(acct&&state.loggedIn)acct.innerHTML='You are logged in. <a href="/account" style="color:var(--blue);font-weight:600">View my account</a>';
 if(f1){f1.addEventListener('submit',e=>{e.preventDefault();const n=$('#oName'),em=$('#oEmail'),ph=$('#oPhone'),nd=$('#oNeed');
   state.name=n.value.trim();state.email=em.value.trim();state.cc=$('#oCc').value;state.phone=ph.value.replace(/\D/g,'');if(nd)state.need=nd.value.trim();else state.company=$('#oCompany').value.trim();
   let ok=true;ok=setErr(n,state.name.length<2||/\d/.test(state.name)?'Please enter your full name (letters only).':'')&&ok;
   ok=setErr(em,EMAIL_RE.test(state.email)?'':'Please enter a valid email, e.g. name@company.com.')&&ok;
   ok=setErr(ph,phoneOk(state.cc,state.phone)?'':PHONE_RULES[state.cc].msg)&&ok;
   if(nd)ok=setErr(nd,state.need.length<10?'Tell us a little more (at least 10 characters).':'')&&ok;
   if(ok){(acctP||Promise.resolve()).then(()=>{if(!state.loggedIn){needLogin(2);return;}state.step=2;renderOB();window.scrollTo({top:0,behavior:'smooth'});});}});
  const ids={oName:'name',oEmail:'email',oPhone:'phone',oCompany:'company',oNeed:'need'};
  Object.keys(ids).forEach(id=>{const el=$('#'+id);if(el)el.addEventListener('input',e=>{state[ids[id]]=e.target.value;});});
  $('#oCc').addEventListener('change',e=>state.cc=e.target.value);}
 $$('[data-plan]').forEach(b=>b.onclick=()=>{state.plan=b.dataset.plan;renderOB();});
 $$('[data-oadd]').forEach(b=>b.onclick=()=>{const id=b.dataset.oadd;if(id==='ein'&&!obTotals().manage&&state.plan==='premium')return;state.add[id]=!state.add[id];renderOB();});
 const os=$('#oState');if(os)os.onchange=()=>{state.st=STATES[os.selectedIndex].n;renderOB();};
 $$('[data-back]').forEach(b=>b.onclick=()=>{state.step--;renderOB();});
 $$('[data-next]').forEach(b=>b.onclick=()=>{if(state.flow==='manage'&&state.step===2&&!obTotals().lines.length){const m=$('#stepMsg');if(m)m.textContent='Please choose at least one service.';return;}state.step++;renderOB();window.scrollTo({top:0,behavior:'smooth'});});
 $$('[data-goto]').forEach(b=>b.onclick=()=>{state.step=+b.dataset.goto;renderOB();});
 const ag=$('#oAgree');if(ag)ag.onchange=()=>state.agree=ag.checked;
 const pay=$('[data-pay]');if(pay)pay.onclick=()=>{if(!state.loggedIn){needLogin(isConsult()?2:4);return;}if(!state.agree){$('#agreeMsg').textContent='Please accept the terms to continue.';return;}pay.disabled=true;const msg=$('#agreeMsg');msg.textContent='';
  const f=({start:'START',manage:'MANAGE',expert:'EXPERT',global:'GLOBAL'})[state.flow]||'START';
  fetch('/api/checkout',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({flow:f,plan:isConsult()||f==='MANAGE'?undefined:state.plan,state:isConsult()||f==='MANAGE'?undefined:state.st,add:f==='MANAGE'||f==='START'?Object.keys(state.add).filter(k=>state.add[k]):[],company:state.company||undefined})})
   .then(r=>r.json().catch(()=>({})).then(j=>({ok:r.ok,status:r.status,j}))).then(({ok,status,j})=>{if(status===401){needLogin(isConsult()?2:4);return;}if(!ok||!j.orderId)throw new Error(j.error||'x');location.href='/account/orders/'+j.orderId;})
   .catch(e=>{pay.disabled=false;msg.textContent=e&&e.message&&e.message!=='x'?e.message:'We could not place your order. Please try again.';});};}
function applyStartParams(){const q=new URLSearchParams(location.search),f=q.get('flow'),pl=q.get('plan'),s=q.get('state');
 if(['start','manage','expert','global'].includes(f))state.flow=f;
 if(pl==='warehouse')state.flow='global';else if(pl&&PLANS[pl]&&PLANS[pl].form)state.plan=pl;
 if(s&&STATES.some(x=>x.n===s))state.st=s;
 (q.get('add')||'').split(',').forEach(id=>{if(ADDONS.some(a=>a.id===id))state.add[id]=true;});state.step=1;restoreDraft();}

/* ===== Pricing builder: pick a card, add chips, total updates ===== */
const pk={plan:'premium',st:'Wyoming',add:{}};
function pkTotals(){const p=PLANS[pk.plan],einInc=pk.plan==='premium',st=STATES.find(s=>s.n===pk.st);let one=0,mo=0;const parts=[`${p.name}${p.form?' ('+p.sub+')':''} ${money(p.price)}`];
 let feeUnknown=false;if(p.form){if(st.fee==null)feeUnknown=true;else parts.push(`${st.n} state fee ${money(st.fee)}`);ADDONS.forEach(a=>{if(pk.add[a.id]&&!(a.id==='ein'&&einInc)){one+=a.one||0;mo+=a.mo||0;parts.push(`${a.n} ${a.one?money(a.one):money(a.mo)+'/mo'}`);}});}
 return {p,einInc,st,one,mo,feeUnknown,parts,total:p.price+(p.form&&st.fee?st.fee:0)+one+mo};}
function renderPk(){const root=$('#pk');if(!root)return;const t=pkTotals();
 $('.pk-cards',root).style.setProperty('--s',['premium','starter','warehouse'].indexOf(pk.plan));
 $$('.pk-card',root).forEach(c=>{const on=c.dataset.pk===pk.plan;c.classList.toggle('sel',on);c.setAttribute('aria-pressed',on);});
 $('#pkOpts').classList.toggle('hide',!t.p.form);
 const sel=$('#pkState');if(sel&&sel.value!==pk.st)sel.value=pk.st;
 $('#pkChips').innerHTML=ADDONS.map(a=>{const inc=a.id==='ein'&&t.einInc,on=inc||pk.add[a.id];return `<button type="button" class="pk-chip ${on?'on':''}" data-chip="${a.id}" aria-pressed="${!!on}" ${inc?'disabled':''}>${inc?'✓':'+'} ${a.n} · ${inc?'Included':a.one?money(a.one):money(a.mo)+'/mo'}</button>`}).join('');
 $('#pkFormula').textContent=t.parts.join(' + ')+(t.feeUnknown?' + state fee (confirmed before filing)':'');
 $('#pkTotal').textContent=money(t.total);
 $('#pkSub').textContent=t.mo?`Includes the first month of monthly add-ons. Then ${money(t.mo)}/mo.`:(t.p.form?'One-time total. No hidden fees.':'One-time consultation fee.');
 const go=$('#pkGo'),on=Object.keys(pk.add).filter(k=>pk.add[k]);go.firstChild.textContent=t.p.form?'Launch Your Company':'Book the Global plan call';
 go.href=t.p.form?`/start?flow=start&plan=${pk.plan}&state=${encodeURIComponent(pk.st)}${on.length?'&add='+on.join(','):''}`:'/start?flow=global';}
function bindPk(){const root=$('#pk');if(!root||root.dataset.on)return;root.dataset.on=1;
 root.addEventListener('click',e=>{const c=e.target.closest('[data-pk]'),ch=e.target.closest('[data-chip]');if(c){pk.plan=c.dataset.pk;renderPk();}else if(ch&&!ch.disabled){pk.add[ch.dataset.chip]=!pk.add[ch.dataset.chip];renderPk();}});
 $('#pkState').addEventListener('change',e=>{pk.st=e.target.value;renderPk();});renderPk();}

/* ================= QUIZ & WHO ================= */
const QUIZ=[{q:'Where do the owners live?',o:['India / outside the US','US citizen or green-card holder']},{q:'Do you plan to raise money from investors (VCs / angels)?',o:['Yes, in the next 1–2 years','No / not sure']},{q:'What will your US company mainly do?',o:['Sell products online / import-export','IT services, consulting or freelancing','Build a startup product','Something else']}];
let qa=[];
function renderQuiz(){const box=$('#quizBox');if(!box)return;
 if(qa.length<QUIZ.length){const i=qa.length,q=QUIZ[i];box.innerHTML=`<div class="q-progress"><i style="width:${(i/QUIZ.length)*100}%"></i></div><div class="muted" style="font-size:13px;font-weight:600">QUESTION ${i+1} OF ${QUIZ.length}</div><h3 style="font-size:24px;margin-top:6px">${q.q}</h3><div class="q-opts">${q.o.map((o,j)=>`<button type="button" class="q-opt" data-qa="${j}">${o}</button>`).join('')}</div>`;
  $$('[data-qa]',box).forEach(b=>b.onclick=()=>{qa.push(+b.dataset.qa);renderQuiz();});}
 else{const raise=qa[1]===0,us=qa[0]===1;const r=raise?{t:'C-Corp (Premium plan)',why:'You plan to raise money, and investors usually prefer a Delaware C-Corp that can issue shares.',href:'#/start?plan=premium&state=Delaware',svc:'ccorp'}:{t:'LLC (Starter plan)',why:'An LLC is the simplest way for founders in India to own a US company, with fewer filings.',href:'#/start?plan=starter&state=Wyoming',svc:'llc'};
  box.innerHTML=`<div class="q-progress"><i style="width:100%"></i></div><span class="pill" style="background:var(--green-50);color:var(--green)">Our suggestion</span><h3 style="font-size:28px;margin:10px 0 8px">${r.t}</h3><p class="muted">${r.why}${us?' Since you are a US citizen/resident, an S-Corp tax election may also be an option — ask our expert.':''}</p><div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:18px"><a class="btn btn-primary" href="${r.href}">Start with this</a><a class="btn btn-outline" href="#/service/${r.svc}">See details</a><button type="button" class="btn btn-outline" id="qReset">Retake quiz</button></div><p class="muted" style="font-size:12px;margin-top:14px">General guidance, not legal or tax advice.</p>`;
  $('#qReset').onclick=()=>{qa=[];renderQuiz();};}}
const WHO=[{t:'E-Commerce sellers',d:'Sell on Amazon US, Shopify or your own store, and ship to US customers.',s:[['US LLC Formation','llc'],['EIN & Tax Registration','ein'],['Warehousing & Fulfilment','warehouse'],['Virtual Address & Mailbox','mailbox']]},{t:'Import-Export businesses',d:'Buy and sell across borders with a US company and bank account.',s:[['US LLC Formation','llc'],['EIN & Tax Registration','ein'],['Bank Account Assistance','bank'],['Physical Office Address','office']]},{t:'IT Services & freelancers',d:'Bill US clients in dollars, through a US company.',s:[['US LLC Formation','llc'],['EIN & Tax Registration','ein'],['Bank Account Assistance','bank'],['Accounting & Bookkeeping','books']]},{t:'Startups & Founders',d:'Raise money from US investors and issue shares.',s:[['US C-Corp Formation','ccorp'],['Registered Agent (1 year incl.)','agent'],['Bank Account Assistance','bank'],['US Tax Filing','tax']]}];
function renderWho(i){const w=WHO[i],p=$('#whoPanel');if(!p)return;p.innerHTML=`<div style="display:flex;flex-direction:column;gap:14px"><h3 style="font-size:30px">${w.t}</h3><p class="muted" style="font-size:17px">${w.d}</p><a class="btn btn-primary" style="align-self:flex-start" href="#/start?plan=${i===3?'premium':'starter'}">Start my setup</a></div><div class="who-list">${w.s.map(s=>`<a class="who-item" href="#/service/${s[1]}"><span><span class="check">✓</span> ${s[0]}</span><span class="muted" style="font-size:14px">${SERVICES[s[1]].price} ${SERVICES[s[1]].unit}</span></a>`).join('')}</div>`;}

/* ================= HERO BINDINGS (scoped) ================= */
function bindHero(root){
 $$('.q4',root).forEach(q=>{const pl=$('.q4-plan',q),st=$('.q4-state',q),upd=()=>{const s=STATES[st.selectedIndex],p=PLANS[pl.value].price;$('.q4-tot',q).innerHTML=s.fee==null?money(p)+' <small style="font-size:12px">+ fee</small>':money(p+s.fee);$('.q4-go',q).href=`#/start?plan=${pl.value}&state=${encodeURIComponent(s.n)}`;};pl.onchange=st.onchange=upd;upd();});
 $$('.s9',root).forEach(f=>{f.onsubmit=e=>{e.preventDefault();const v=$('.s9-in',f).value.trim(),res=$('.s9-res',f.parentElement);
   if(v.length<2){res.style.color='var(--red)';res.textContent='Please type the name you want.';return;}
   const full=v+' '+$('.s9-suf',f).value;res.style.color='var(--green)';res.innerHTML=`✓ “${full.replace(/</g,'')}” looks available — we’ll confirm with the state. Starting your order…`;state.company=full;state.step=1;setTimeout(()=>{location.hash='#/start?plan=starter';},1100);};});
 const rcs=$$('.rc',root);if(rcs.length){const go=$('.rc-go',root);rcs.forEach(rc=>rc.onclick=()=>{rcs.forEach(x=>{x.classList.toggle('sel',x===rc);$('input',x).checked=x===rc;});go.href=$('input',rc).dataset.go;});}
 initHeroFx(root);
}

/* ================= THEME / LAYOUT ================= */
function applyTheme(i){cur.theme=i;store.set('theme3',i);const T=THEMES[i],t=T.v,rt=document.documentElement;
 ALLKEYS.concat(['btn-bg','btn-fg','card-solid']).forEach(k=>rt.style.removeProperty('--'+k));
 Object.entries(t).forEach(([k,v])=>rt.style.setProperty('--'+k,v));
 if(!t['btn-bg'])rt.style.setProperty('--btn-bg','var(--blue)');
 document.body.classList.toggle('dm',!!T.dark);
 $('#selTheme').value=i;$$('.theme-card').forEach(c=>c.classList.toggle('sel',+c.dataset.theme===i));if(typeof updRanks==='function'&&$('#rkT'))updRanks();}
function applyLayout(i){cur.layout=i;store.set('layout3',i);document.body.className=document.body.className.replace(/\bL\d+\b/g,'').replace(/\s+/g,' ').trim()+' '+LAYOUTS[i].cls;$('#selLayout').value=i;$$('.layout-card').forEach(c=>c.classList.toggle('sel',+c.dataset.layout===i));initStory();fxUpdate();if($('#rkL'))updRanks();}
function applyHero(i){cur.hero=i;store.set('hero3',i);
 if(parseHash().page==='home'){const h=$('#hero');if(h){const tmp=document.createElement('div');tmp.innerHTML=HEROES[i][2]('id="hero"').trim();h.replaceWith(tmp.firstElementChild);bindHero($('#hero'));addBadges();window.scrollTo({top:0,behavior:'smooth'});}}if($('#rkH'))updRanks();}

/* ================= ROUTER ================= */
let pendingJump=null;
function parseHash(){const a=document.getElementById('app');return {page:(a&&a.dataset.page)||'home',arg:a&&a.dataset.arg,params:new URLSearchParams(location.search)};}
function render(){const {page,arg,params}=parseHash();const fn=PAGES[page]||PAGES.home;
 if(page==='start'){if(params.get('plan')&&PLANS[params.get('plan')])state.plan=params.get('plan');if(params.get('state')&&STATES.some(s=>s.n===params.get('state')))state.st=params.get('state');if(params.get('plan')&&state.step===4)state.step=1;}
 $('#app').innerHTML=fn(arg);
 $$('.menu > a').forEach(a=>a.classList.toggle('active',a.dataset.nav===page));$('#mm').classList.remove('open');
 bindPage(page,arg);addBadges();observe();initStory();fxUpdate();fx2(document);
 if(!pendingJump)window.scrollTo(0,0);else{const el=document.getElementById(pendingJump);pendingJump=null;if(el)setTimeout(()=>{el.scrollIntoView({behavior:'smooth',block:'start'});el.classList.add('flash');setTimeout(()=>el.classList.remove('flash'),1700);},80);}}
function bindPage(page,arg){
 $$('[data-filter]').forEach(b=>b.onclick=()=>{const sec=b.closest('section');$$('[data-filter]',sec).forEach(x=>x.classList.toggle('on',x===b));$('.svc-grid',sec).innerHTML=svcCards(b.dataset.filter);observe();});

 renderPk();bindPk();
 if($('#whoTabs')){renderWho(0);$$('[data-who]').forEach(b=>b.onclick=()=>{$$('[data-who]').forEach(x=>x.classList.toggle('on',x===b));renderWho(+b.dataset.who);});}
 if($('#quizBox'))renderQuiz();
 bindHero($('#app'));
 const mf=$('#magnetForm');if(mf)mf.onsubmit=e=>{e.preventDefault();const em=$('#mEmail');if(setErr(em,EMAIL_RE.test(em.value.trim())?'':'Please enter a valid email.')){mf.classList.add('hide');$('#magnetOk').classList.remove('hide');}};
 const cf=$('#contactForm');if(cf){markReq();const cc0=$('#cfCc');cc0.innerHTML=ccOptions('+91');bindPhone($('#cfPhone'),cc0);}if(cf)cf.onsubmit=e=>{e.preventDefault();let ok=true;const n=$('#cfName'),em=$('#cfEmail'),ph=$('#cfPhone'),cc=$('#cfCc').value,m=$('#cfMsg');
  ok=setErr(n,n.value.trim().length<2||/\d/.test(n.value)?'Please enter your full name (letters only).':'')&&ok;ok=setErr(em,EMAIL_RE.test(em.value.trim())?'':'Please enter a valid email, e.g. name@company.com.')&&ok;
  ok=setErr(ph,phoneOk(cc,ph.value.replace(/\D/g,''))?'':PHONE_RULES[cc].msg)&&ok;ok=setErr(m,m.value.trim().length<10?'Tell us a little more (at least 10 characters).':'')&&ok;
  if(ok){const btn=cf.querySelector('button');btn.disabled=true;const okm=$('#cfOk');
   fetch('/api/enquiries',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:n.value.trim(),email:em.value.trim(),phone:cc+' '+ph.value.trim(),message:m.value.trim()})}).then(r=>{if(!r.ok)throw 0;btn.classList.add('hide');okm.textContent='✓ Thanks! Our team will reply by email.';okm.classList.remove('hide');}).catch(()=>{btn.disabled=false;okm.textContent='Sorry, we could not send that. Please try again or email us.';okm.classList.remove('hide');});}};
 const ds=$('#dState');if(ds){const s=SERVICES[arg]||SERVICES.llc;const upd=()=>{$('#dGo').href=`/start?flow=start&plan=${s.plan}&state=${encodeURIComponent(STATES[ds.selectedIndex].n)}`;};ds.onchange=upd;upd();}
 bindAddr($('#addrForm'));markReq();
 $$('#app [data-jump]').forEach(a=>a.addEventListener('click',e=>{const id=a.dataset.jump,t=a.getAttribute('href');if(t===location.hash||(t==='#/home'&&parseHash().page==='home')){e.preventDefault();const el=document.getElementById(id);if(el)el.scrollIntoView({behavior:'smooth'});}else pendingJump=id;}));
 $$('[data-theme]').forEach(c=>{const f=()=>applyTheme(+c.dataset.theme);c.onclick=f;c.onkeydown=e=>{if(e.key==='Enter')f();};});
 $$('[data-layout]').forEach(c=>{const f=()=>{applyLayout(+c.dataset.layout);location.hash='#/home';};c.onclick=f;c.onkeydown=e=>{if(e.key==='Enter')f();};});
 $$('[data-gcombo]').forEach(b=>b.onclick=()=>{const c=COMBOS[+b.dataset.gcombo];applyTheme(c.t);applyLayout(c.l);cur.hero=c.h;store.set('hero3',c.h);updRanks();location.hash='#/home';});
 $$('[data-usehero]').forEach(b=>b.onclick=()=>{cur.hero=+b.dataset.usehero;store.set('hero',cur.hero);updRanks();location.hash='#/home';});
 if(page==='start'){applyStartParams();renderOB();(checkAcct()||Promise.resolve()).then(()=>{if(!state.loggedIn)needLogin(1);});}}

/* ================= REVEAL ================= */
let io;
function observe(){if(!('IntersectionObserver' in window)){$$('.reveal,.journey').forEach(e=>e.classList.add('in'));return;}
 if(io)io.disconnect();io=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}}),{threshold:.12});
 $$('.reveal:not(.in), .journey:not(.in)').forEach(e=>io.observe(e));}
window.addEventListener('scroll',()=>{$('#stickyCta').classList.toggle('show',window.scrollY>700&&parseHash().page==='home');},{passive:true});


/* ================= MOUNT (real URLs; markup is server-rendered) ================= */
function applyCatalog(c){if(!c)return;
 if(c.plans){if(c.plans.starter!=null)PLANS.starter.price=c.plans.starter;if(c.plans.premium!=null)PLANS.premium.price=c.plans.premium;}
 if(c.consult!=null){FEE_CONSULT=c.consult;PLANS.warehouse.price=c.consult;}
 if(c.addons)ADDONS.forEach(a=>{const x=c.addons[a.id];if(!x)return;delete a.one;delete a.mo;if(x.billing==='MONTHLY')a.mo=x.price;else a.one=x.price;});
 if(Array.isArray(c.states)&&c.states.length){STATES.length=0;c.states.forEach(s=>STATES.push({n:s.name,fee:s.fee}));if(!STATES.some(s=>s.n===state.st))state.st=STATES[0].n;}}
fetch('/api/catalog',{cache:'no-store'}).then(r=>r.ok?r.json():null).catch(()=>null).then(function(cat){applyCatalog(cat);
 const {page,arg,params}=parseHash();
 if(page==='start'){if(params.get('plan')&&PLANS[params.get('plan')])state.plan=params.get('plan');if(params.get('state')&&STATES.some(s=>s.n===params.get('state')))state.st=params.get('state');}
 const sc=document.getElementById('stickyCta');
 const stick=()=>{if(sc)sc.classList.toggle('show',window.scrollY>700&&page==='home');};
 window.addEventListener('scroll',stick,{passive:true});stick();
 const bg=document.querySelector('.burger');if(bg)bg.addEventListener('click',()=>document.getElementById('mm').classList.toggle('open'));
 const ROUTES={"home":"/","services":"/services","pricing":"/pricing","how":"/how-it-works","blogs":"/blog","about":"/about","contact":"/contacts","start":"/start","track":"/track-order"};
 const SV={"llc":"llc-formation","ccorp":"c-corp-formation","ein":"ein-tax-registration","agent":"registered-agent","bank":"bank-account-assistance","mailbox":"virtual-address-mailbox","office":"physical-office-address","books":"accounting-bookkeeping","warehouse":"warehousing-fulfilment","compliance":"compliance-annual-filings","tax":"us-tax-filing","expert":"talk-to-an-expert"},BL={"states":"choosing-a-state","ein":"ein-without-ssn","cost":"formation-costs","bank":"business-banking"};
 const toPath=h=>{const m=h.replace(/^#\/?/,''),q=m.split('?'),pp=q[0].split('/');let p=ROUTES[pp[0]];if(pp[0]==='service')p='/services/'+(SV[pp[1]]||pp[1]);if(pp[0]==='blog')p='/blog/'+(BL[pp[1]]||pp[1]);return p?p+(q[1]?'?'+q[1]:''):null;};
 document.addEventListener('click',e=>{const a=e.target.closest&&e.target.closest('a[href^="#/"]');if(!a)return;const p=toPath(a.getAttribute('href'));if(!p)return;e.preventDefault();const j=a.dataset.jump;
  if(j&&location.pathname===p.split('?')[0]){const el=document.getElementById(j);if(el)el.scrollIntoView({behavior:'smooth'});return;}location.href=p+(j?'#'+j:'');});
 window.addEventListener('hashchange',()=>{if(location.hash.indexOf('#/')===0){const p=toPath(location.hash);if(p){history.replaceState(null,'',location.pathname+location.search);location.href=p;}}});
 $$('.menu > a').forEach(a=>a.classList.toggle('active',a.dataset.nav===page));
 bindPage(page,arg);observe();initStory();fxUpdate();fx2(document);
});

})();
