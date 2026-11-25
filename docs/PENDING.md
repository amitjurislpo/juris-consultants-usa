# Pending work and discussions (project memory — keep this updated)

Every agent: update this file when you finish or stop. Move items to "Done" with the date and PR link.
For active public website progress and handoff details, see [WORK_MEMORY.md](./WORK_MEMORY.md).

## Done in planning

- 2026-11-23 · Hero headline + sub-line written (see DECISIONS #22).

## Waiting on Amit / business (do not block on these — use placeholders/mocks)

- [ ] **AWS setup** — postponed. Later: IAM user/role for the project, region choice (ap-south-1 Mumbai vs us-east-1), move admin + DB + files + email + auth to AWS (Cognito user pool + admin pool, RDS, S3, SES, WAF, Secrets Manager).
- [ ] **Google login** — needs a Google Cloud OAuth client. Which company Google account owns it: to discuss later. Until then: email OTP only (keep the Google button behind a feature flag).
- [ ] **Payment gateway** — Razorpay or Stripe + test keys (Amit will share). Until then: MockPaymentProvider; build the real provider behind the same PaymentProvider interface when keys arrive.
- [ ] **Sender + support email** addresses and credentials (Amit will share). Until then: Resend test mode / console logging; FROM and REPLY-TO from env vars.
- [ ] **Final prices** for plans, add-ons, express service, consultations — team to confirm. Until then seed values marked PLACEHOLDER; final values entered in admin, no code change.
- [ ] **KYC document list** per service (operations). Until then seed: passport + address proof per owner; list editable in admin.
- [ ] **BOIR** — legal view pending; add-on exists but stays OFF (US-formed companies exempt since Mar 2025).
- [ ] **Calendly** account and event links (expert call, warehousing call). Until then: env vars with placeholder URLs; booking step shows "link not configured" in test.
- [ ] **Legal pages** content: Privacy Policy, Terms, Refund Policy (payment gateways require them).
- [ ] **Invoice entity** — which company issues receipts (India or US entity) and GST treatment.
- [ ] **Tracking** — Google Analytics / Search Console / Meta Pixel: which, and who has access.
- [ ] **Content** — final review/approval of the 12 service-page drafts and blog content; which old blog URLs to migrate (keep old URLs or 301).
- [ ] **Real testimonials / client logos** with permission (section hidden until provided).
- [ ] **Language** — English only? (assume yes)
- [ ] **WhatsApp** — +91 99996 30777 only, or a US number too?
- [ ] **Custom domains** — staging/admin subdomains later; Vercel preview URLs for now.
- [ ] **Marketing visual sign-off** — site is now an exact port of the final design HTML (see WORK_MEMORY 2026-11-24). Amit to review; later move prices/states/copy into DB-driven admin content, replace `[bracket]` placeholders with confirmed copy, and re-generate via `tools/port-final-design`.

## Open questions raised by agents

(add here: date · agent · question)

- [ ] 2026-11-23 · Foundation agent · What labels should replace the placeholder business types in the seed? Confirm the admin-facing business-type list; seed currently contains only an inactive `PLACEHOLDER business type`.
- [ ] 2026-11-23 · Foundation agent · `.env.local` and a database connection are not present in this workspace. Before running the real seed, supply `DATABASE_URL`, `SEED_SUPER_ADMIN_EMAIL`, `SEED_SUPER_ADMIN_PASSWORD` (12+ characters), and `SEED_SUPER_ADMIN_TOTP_SECRET` (base32); configure `RESEND_API_KEY` and `AUTH_EMAIL_FROM` for live OTP delivery. Then run `pnpm db:push` and `pnpm db:seed`.

## Requests to Foundation (schema / shared types)

(add here: date · agent · request)

- 2026-11-25 · Admin orders agent · Add an explicit `detailsComplete` flag (or a `DETAILS_SUBMITTED` marker) on Order. Admin now treats details as complete when the order has a company with at least one member, so staff cannot send an order back for incomplete details unless a KYC document is rejected.
- 2026-11-25 · Admin orders agent · Add a `reason` column on Order status changes (or a StatusChange model). The rejection reason is stored in the AuditLog `after` JSON for now.
- 2026-11-25 · Admin orders agent · Decide how admin knows an EIN was bought. Admin uses the catalog item slug `ein` (`einOrdered` for the status machine).

- 2026-11-25 · admin settings/staff/activity/export · (1) `User.mfaSecret` is stored in clear text (needed to verify TOTP); production should encrypt it (KMS) or move MFA to Cognito. (2) No audit `before` column is written by the shared `writeAudit` helper; settings changes store `{ before, after }` (changed fields only) inside the `after` column. Add a `before` argument to the helper when convenient. (3) Staff creation shows the authenticator secret and otpauth link as text; adding a QR image needs a `qrcode` dependency in apps/admin.

- 2026-11-24 · Admin leads/customers · `Note` requires an `orderId`, so notes on leads and customers cannot use it. They are stored as `AuditLog` rows (`LEAD_CONTACTED`, `CUSTOMER_NOTE`, note text in `after.note`). Request: make `Note.orderId` optional and add optional `userId` and `leadId`, then move these notes over.

## Done

(date · what · PR)

- 2026-11-23 · Phase 0 Foundation scaffold; build, test, lint, typecheck, format, Playwright smoke, Prisma validation, and client generation pass. Database seed awaits the required local connection/bootstrap values. · https://github.com/amitjurislpo/juris-consultants-usa/pull/1
- 2026-11-24 · Agent A public marketing site updated to the user-provided final design selections (Theme 11, Hero 12, Layout 20; globe, story route, take-off, document folder, blur-in headings, comet cursor, and lift-and-glow cards). Fixed mobile take-off positioning and removed an overlapping documents disclaimer. Responsive and reduced-motion scenes checked; build, lint, typecheck, and four route probes pass. Core's 15 Vitest tests pass; the aggregate test parser reports `parse-failed` for mixed package output, including packages with no tests. Final copy, prices, and legal text remain pending. · https://github.com/amitjurislpo/juris-consultants-usa/pull/5
- 2026-11-24 · Hero globe now follows the supplied HTML's detailed land/water mask, 18,000 desktop / 9,000 mobile dots, ten illustrative routes with animated aircraft, origin labels and markers, and split orbit ring with satellite; mobile uses fewer routes and reduced-motion remains static. Desktop and mobile visuals checked. Build, lint, typecheck, and route probes pass; aggregate test task exits 0 but its parser reports `parse-failed` with zero tests counted. · https://github.com/amitjurislpo/juris-consultants-usa/pull/5
- 2026-11-24 · Final design comparison reviewed for hero, story, plane, departures board, documents, and pricing on desktop and mobile. Fixed mobile story milestone state and header alignment; comparison runs without browser console errors. Web build, lint, typecheck, and formatting pass; the web package has no test files. · https://github.com/amitjurislpo/juris-consultants-usa/pull/5
- 2026-11-24 · Follow-up Theme 11 color pass: browser-computed styles match the final HTML for global glows/grid, hero background/title/body/CTA, story route and milestones, take-off scene, departures board, and documents background. Globe route markers and story accents now resolve to Theme 11 cyan; intentional gold flight-board details remain gold. Lint, typecheck, Prettier, and `git diff --check` pass. Localhost is responsive. Build was not rerun to avoid disturbing the active dev server's Next output; the PR's prior build passed. · https://github.com/amitjurislpo/juris-consultants-usa/pull/5
- 2026-11-24 · Latest visual follow-up: updated the hero headline/gradient/CTAs and reduced mobile menu-to-hero spacing; rebuilt the d6 document-folder animation with sequential cards and a 0–5 counter; completed the departures board with a live IST clock, five desktop columns, six illustrative rows, and its explanatory footer. Mobile and desktop checked in the browser. Web lint, typecheck, formatting, and whitespace checks pass; no web test files exist. Build not rerun to avoid disrupting the active localhost dev server. · https://github.com/amitjurislpo/juris-consultants-usa/pull/5
- In progress · Removed the preview notice and sticky "Formation fees to be confirmed" title; reduced desktop and mobile menu-to-hero spacing. Browser confirms a 20px gap; lint, typecheck, formatting, and whitespace checks pass. Changes are uncommitted and unpushed on `fix/web-marketing-final-design`; resume in Claude Code and commit/push only when requested. The detached localhost dev process on port 3000 has exited and will need restarting.

## 2026-11-24 — marketing flow update (web)
- Done: announce bar and header CTA buttons removed, menu aligned right, Log in / My account button, /login (email OTP) and /account pages, hero CTAs follow the flow PDF (start / manage / expert / global), /start?flow=... steps, pricing card-and-chips builder, globe no longer clipped, document cards hidden until scroll.
- `components/marketing/final/generated.ts` is now hand-maintained (no longer regenerated from the design HTML).
- Open: leads for people who leave before paying are not saved yet (needs Lead API + DB); Calendly link comes from env `CALENDLY_EXPERT_URL` (unset = placeholder message); login and /account need DATABASE_URL, AUTH_SECRET to be tested end to end; payment steps are still demo.

## 2026-11-24 — content fill (web)
- Stats set by owner: 500+ US companies, 7+ years, 4.5 Google rating (review count not given, so not shown).
- Terms, Privacy and Refund pages written as DRAFTS by Claude. Must be reviewed by a lawyer / CA before launch. Assumptions to confirm: India law and New Delhi courts, 2-business-day reply and 7-10 day refund time, 24h reschedule rule, cancel-before-work = full refund.
- Still open: state fees for 7 states, EIN timeline, Registered Agent / Compliance / Tax Filing prices, mailbox terms, warehousing details, client logos, testimonials, team names, office address, Calendly URL, payment provider, blog URL (plan: redirect /blog to the existing blog).

## 2026-11-24 — test-link defaults (TEAM MUST CONFIRM BEFORE LIVE)
- Timelines used: formation ~7 business days; EIN ~7-10 days after formation; IRS EIN letter 20-25 more days; warehousing ~7 business days.
- State filing fees used (approximate, confirm): DE $90, FL $125, NV $425 (articles + initial list + business licence), NY $200, CA $70, NM $50, WA $200; WY $103.75 and TX $310 unchanged. NY also has a newspaper publication cost and CA an $800 yearly franchise tax, not included.
- Blog: /blog redirects (temporary) to https://www.jurisconsultantsusa.com/blogs, override with NEXT_PUBLIC_BLOG_URL. If the new site later takes over that same domain, move the blog or the redirect will loop.
- Removed until real content exists: client logos and testimonials (home), team section (about), office address (contact).

## 2026-11-24 — login, architecture, memory
- Checkout now sends logged-out users to /login (Google or email code) and returns them to their order. /track-order and /account need login. Cannot be tested end to end locally (needs DATABASE_URL, AUTH_SECRET, AUTH_GOOGLE_ID/SECRET).
- Real order creation must check the session on the server. The pay button is still a demo.
- Waiting on owner: approval of docs/ARCHITECTURE.md, old-site sitemap (URL mapping), Google OAuth client, Calendly link, payment provider.
- Before go-live set ALLOW_INDEXING=true on the live website project.

## 2026-11-25 — localhost verification (web + admin)
- Web (3000): 18 routes return 200 with no console errors; old URLs (/contact, /legal/*) redirect; /signup shows login; customer email-OTP login and the 5-step order flow work. Fixed LegalDoc import paths after the folder rename.
- Admin (3001): fixed two crashes (`"use server"` file exporting a constant in login/actions.ts; missing `"use client"` in packages/ui Modal.tsx). Verified: login with password + TOTP (bad password/TOTP rejected), reauth for settings/staff/export, order status change, notes, KYC approve (unlocks "Ready for review"), activity log.
- Gaps: web "Pay (demo)" shows "Payment received" but creates no Order/Payment row (only a Lead); catalog prices are seeded as 0.00 while the site shows hard-coded prices; no admin Dockerfile yet; KYC file preview needs Vercel Blob token; one React hydration warning in admin order page.
- Local test setup: Docker Postgres `juris-pg` on 127.0.0.1:5440; `.env.local` in apps/web, apps/admin, packages/db (gitignored); admin@test.local / TestAdmin!2345 / TOTP secret JBSWY3DPEHPK3PXP. Port 5433 on this PC is taken by another Postgres.

## 2026-11-25 — admin email-OTP, 6-digit codes
- Done: admin login now password + emailed 6-digit code (no TOTP); admin forgot-password; reauth via emailed code; staff create/reset show a temporary password only; seed creates amit@ and ritz@ super admins (bcrypt). Customer + admin codes are 6 boxes, digits only, with a resend button (30 s). Google button is now always visible on the customer login (disabled until AUTH_GOOGLE_ID/SECRET are set).
- To deliver codes by real email set RESEND_API_KEY and AUTH_EMAIL_FROM in both apps (a verified sender domain is needed). Until then codes print in the dev server console.
- Cleanup later: `User.mfaSecret` column and `otplib` dependency are now unused (Foundation to drop). Starting passwords for amit@/ritz@ are temporary test values: change before real use.
- 2026-11-25 · Strict admin lockout (DECISIONS #32) and fixed test OTP 999963 (DECISIONS #33) added. New table `AdminLoginLock` (schema change made by admin agent at Amit's request; Foundation to review). Before go-live: unset FIXED_TEST_OTP, set RESEND_API_KEY + AUTH_EMAIL_FROM, change the temporary amit@/ritz@ passwords. Customer-side lockout is not escalating yet (only 5 tries per code).
- 2026-11-25 · Removed the "confirm it is you" re-authentication step (password + code again for settings/staff/export) at Amit's request. Sign-in itself needs password + emailed code; role checks still protect those pages. `requireRecentAuth` is now just `requireAdmin` (kept so callers did not change). Reconsider before production if stricter control is wanted.
- 2026-11-25 · Admin UI pass: all pages responsive (slide-in menu on tablet/phone, one filter/pager style, tables become labelled cards on phones); time zone dropdown + seconds on all dates (DECISIONS #34); account menu with avatar/photo and My details (DECISIONS #35). New column `User.timezone`. NOT done: the same photo/My-details option for customers on the website account page (`User.image` already exists, needs the customer dashboard).
- 2026-11-25 · Customer portal built at /account (DECISIONS #36-38). Done: profile + business details, My Orders (+ order page with progress), Documents (checklist from KYC requirements, uploads, team deliverables with signed download), Payments, logout confirmation, avatar pencil. NOT built: customer KYC file upload (needs the storage token and the upload UI), editing business/company details, paying a pending order from the portal. Customer dates are shown as plain dates (UTC); the time zone switcher is admin-only.
- 2026-11-25 · `packages/db` now has a baseline migration and `db:bootstrap` (DECISIONS #39). From now on schema changes need a migration (`db:migrate:dev`), not only `db push`. The local dev database was created with `db push`; to move it onto migrations run `prisma migrate resolve --applied 20261125000000_init`.
- Known dev-only noise: Next shows a React style-mixing warning on the marketing /about page (from the ported final design) and "Could not sign KYC file URL" on the KYC detail page until a Blob token exists.
- 2026-11-25 · Completed the items listed as "not built" for the portal (DECISIONS #40-41): customer KYC upload (+ admin preview/approve works end to end), company address/member editing with a lock after filing, "Pay now" for unpaid orders (mock provider), customer time zone. Tested end to end with Playwright; core has 4 new tests for the local storage adapter.
- Still open: (1) the website checkout still does not create Order/Payment rows (it only saves a lead), so real orders from the site do not exist yet; the portal and admin work on orders created in the database. Needs the order-creation step with DB prices. (2) Catalog prices in the database are 0.00 placeholders while the site shows fixed prices. (3) Email delivery (Resend) and Google login keys. (4) Company-name change requests and EIN entry stay admin-only by design.

## 2026-11-26 — checkout, catalog prices, enquiries
- Done: website checkout now creates a DRAFT order (+ company) from database prices and sends the customer to the order page to pay (DECISIONS #42, #43). Catalog and state fees seeded with the launch prices; the order pages read them from `/api/catalog`. Enquiries inbox in admin (#44). Time shown on the departures board is US Eastern.
- WAITING (decided by Amit 2026-11-26): payment provider (Stripe or Razorpay) is not chosen. Keep `MockPaymentProvider`; real webhook that marks orders paid comes after the choice.
- TOMORROW (2026-11-27): (1) email integration (Resend / SES, real delivery of OTPs, receipts, enquiry notices); (2) Google login client ID/secret; (3) admin Dockerfile and AWS deploy.
- Open questions: is "Total today" meant to include the first month of monthly add-ons (current behaviour)? Price of Registered agent (inactive for now). Static prices written in page text (home, pricing cards, service pages) are not read from the database yet; the compliance and tax prices still show "[Price]" in places.
- Before go-live (unchanged): remove FIXED_TEST_OTP, change the temporary admin passwords, distinct AUTH_SECRETs, drop `User.mfaSecret` / `otplib`.

## 2026-11-26 — admin dashboard (admin fork)
- Done: new admin shell (dashboard design kit in packages/ui/src/dashboard) and Dashboard at `/` with all widgets (revenue, paid orders, details pending, KYC, revenue chart, status donut, pipeline, needs attention, orders by state/service, States on/off switches, latest orders), 7/30/90 day range and Export CSV (`/export/dashboard`, super admin only). Orders list accepts `stale=3|7` (used by the "needs attention" buttons). New pages: States on/off, and "Coming soon" for Reports, Documents, Invoices, Email templates.
- To confirm with Gopal: STAFF currently does NOT see revenue widgets (Revenue KPI, Revenue by week, Amount column). The list is one constant `STAFF_HIDDEN_WIDGETS` in `apps/admin/src/lib/dashboard.ts`.
- "Assigned" column in Latest orders always shows "Unassigned": orders have no assigned-staff field yet (needs a schema change by Foundation).
- "Details pending over 3 days" / "waiting on state over 7 days" use the order's last-updated time, because status changes are not stored with their own dates.
- Local sample data: `pnpm --filter @juris/db db:seed-sample-admin` (dev only, never in production). Local staff test user: sample-staff@example.com.

## 2026-11-27 — website polish (web)
- Removed the "1-minute quiz" section from the home page (it also held the LLC / C-Corp / S-Corp cards) and every link to it; FAQ and footer text no longer mention a quiz. `docs/SPEC.md` and `docs/DECISIONS.md` still describe the quiz: update them if the quiz is meant to be gone for good.
- Removed "India"-only wording from marketing copy ("from anywhere in the world"). Kept the company name "Juris Consultants India", the India phone line and the legal-page facts (governing law, team location).
- About page now has real sections (who we are, what we do, how we work) and a placeholder illustration at `apps/web/public/about/team.svg`; replace with a real team photo. Page text is in `components/marketing/final/generated.ts` (`about`).
- Desktop (>1000px) content is scaled to 90% via CSS `zoom` at the end of `public/final.css`; containers widened to keep side gaps. Mobile/tablet unchanged.
- Tightened the gap between the departures board and "What you receive".

## 2026-11-27 — FAQ flip cards (branch feat/faq-flip-cards)
- Done: every FAQ on the website now uses the shared `@juris/ui/faq` component (Home, /faq, pricing, services, all 12 service pages). Old accordion markup/CSS and the old `faqs` list in `components/marketing/content.ts` are removed. Unit tests (`apps/web/content/faq/faq.test.ts`) and Playwright (`e2e/faq.spec.ts`: mouse and keyboard flip, one valid FAQPage JSON-LD per page, Show all) pass.
- Changes from the brief, on purpose: (1) no "Ask on WhatsApp" button (Amit's request); (2) cards about 40% smaller than the demo file, plus hover/flip animations; (3) the "[Draft: to confirm]" text is NOT shown on the site (rule: no bracket placeholders in the live UI); items needing wording sign-off carry `draft: true` in `content/faq/general.ts`; (4) answer-face links work, so the back face is a div with a "flip back" button instead of one big button.
- To confirm with Vansh: the new short lines (every item in `general.ts` is marked draft), the money-back guarantee wording (terms), and the two extra /faq questions. All service pages still share the same 6 questions; per-service content can be added as `content/faq/<service>.ts`.
- Not changed: the legacy demo templates inside `public/final-runtime.js` still contain old FAQ markup but are not rendered by the site.
- Dev-only: the portal "help" pages have no FAQ today, nothing to replace there.
