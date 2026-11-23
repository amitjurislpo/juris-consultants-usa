# Pending work and discussions (project memory — keep this updated)

Every agent: update this file when you finish or stop. Move items to "Done" with the date and PR link.

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

## Open questions raised by agents

(add here: date · agent · question)

- [ ] 2026-11-23 · Foundation agent · What labels should replace the placeholder business types in the seed? Confirm the admin-facing business-type list; seed currently contains only an inactive `PLACEHOLDER business type`.
- [ ] 2026-11-23 · Foundation agent · `.env.local` and a database connection are not present in this workspace. Before running the real seed, supply `DATABASE_URL`, `SEED_SUPER_ADMIN_EMAIL`, `SEED_SUPER_ADMIN_PASSWORD` (12+ characters), and `SEED_SUPER_ADMIN_TOTP_SECRET` (base32); configure `RESEND_API_KEY` and `AUTH_EMAIL_FROM` for live OTP delivery. Then run `pnpm db:push` and `pnpm db:seed`.

## Requests to Foundation (schema / shared types)

(add here: date · agent · request)

## Done

(date · what · PR)

- 2026-11-23 · Phase 0 Foundation scaffold; build, test, lint, typecheck, format, Playwright smoke, Prisma validation, and client generation pass. Database seed awaits the required local connection/bootstrap values. · https://github.com/amitjurislpo/juris-consultants-usa/pull/1
- 2026-11-24 · Agent A public marketing site updated to the user-provided final design selections (Theme 11, Hero 12, Layout 20; globe, story route, take-off, document folder, blur-in headings, comet cursor, and lift-and-glow cards). Fixed mobile take-off positioning and removed an overlapping documents disclaimer. Responsive and reduced-motion scenes checked; build, lint, typecheck, and four route probes pass. Core's 15 Vitest tests pass; the aggregate test parser reports `parse-failed` for mixed package output, including packages with no tests. Final copy, prices, and legal text remain pending. · https://github.com/amitjurislpo/juris-consultants-usa/pull/3
