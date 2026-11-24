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
