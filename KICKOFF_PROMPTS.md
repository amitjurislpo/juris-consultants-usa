# Claude Code kickoff prompts

Copy this whole starter kit into the repo root (branch `dev`), commit, push. Then use the prompts below.
Step 1: run the Foundation prompt alone. Step 2: after it is merged, open one Claude Code session per agent (A–E) in separate git worktrees (see `docs/AGENTS.md`), then F.

---

## 0 · Foundation (run first, alone)
```
You are the Foundation agent for the Juris Consultants USA project.
Read CLAUDE.md, docs/DECISIONS.md, docs/SPEC.md, docs/AGENTS.md and docs/PENDING.md fully before writing code.
Work on branch feat/foundation from dev. Do exactly "Phase 0 — Foundation" in docs/AGENTS.md:
monorepo (pnpm + Turborepo), strict TypeScript, lint/test/CI, Prisma schema + seed from SPEC §7,
packages/core (pricing, status machine, permissions, domain events, adapter interfaces + test adapters),
packages/ui design tokens from docs/design/demo-v3.4.html theme 11 "Obsidian Neon Blue",
Auth.js config (customer email OTP, admin credentials + TOTP, role in session), .env.example, Vercel-ready apps.
Use subagents for independent parts (e.g. one for packages/ui tokens, one for Prisma schema + seed, one for core logic + tests) and integrate their results.
Write unit tests for pricing, status machine and permissions.
Do not invent business data: use PLACEHOLDER values and list anything unclear in docs/PENDING.md.
When done: make sure `pnpm build`, `pnpm test` and seed pass, update docs/PENDING.md (Done + open questions), and open a PR into dev with a clear summary.
```

## A · Marketing site
```
You are Agent A (Marketing site). Read CLAUDE.md and all files in docs/ first.
Branch feat/web-marketing from dev. You own apps/web/app/(marketing) and apps/web/components/marketing only.
Build every public page in docs/SPEC.md §1 with the final design and animations in docs/DECISIONS.md #21,
using docs/design/demo-v3.4.html as the visual reference (open it in a browser; the ✦ Animations panel shows each chosen option;
pricing cards follow docs/design/ref-pricing-cards.png; departures board follows docs/design/ref-departures-board.png).
Rebuild the animations as clean React components (canvas/SVG, requestAnimationFrame, IntersectionObserver), lazy-loaded after first paint,
with mobile and prefers-reduced-motion fallbacks. Hero copy from DECISIONS #22, read from Settings.
Prices, states and add-ons come from the database via packages/core — never hard-coded. Add metadata, JSON-LD, sitemap, robots.
Use subagents per section group if useful. Do not edit folders you don't own; request schema changes in docs/PENDING.md.
Finish with Lighthouse ≥ 90 mobile on Home, update docs/PENDING.md, open a PR into dev.
```

## B · Order flows
```
You are Agent B (Order flows). Read CLAUDE.md and all files in docs/ first.
Branch feat/web-flows from dev. You own apps/web/app/(flows).
Build Start / Manage / Expert / Global flows exactly as docs/SPEC.md §2 (max 4 steps to payment, breadcrumb, Back keeps data,
server-side drafts after step 1, leads for drop-offs, email OTP account creation, itemised USD review, MockPaymentProvider,
webhook-style confirmation, confirmation page with order number and receipt PDF, Calendly step with placeholder URLs).
Use packages/core for pricing and status transitions. Validate with zod on client and server; phone via libphonenumber.
Write Playwright tests for the Start flow to a successful and a failed mock payment.
Update docs/PENDING.md and open a PR into dev.
```

## C · Customer dashboard
```
You are Agent C (Customer dashboard). Read CLAUDE.md and all files in docs/ first.
Branch feat/web-dashboard from dev. You own apps/web/app/(dashboard).
Build the dashboard in docs/SPEC.md §3: status timeline + next action, company details form, KYC & Documents
(required list from DB, upload via StorageAdapter, Pending/Approved/Rejected with reason, re-upload), My documents
(short-lived signed download URLs), Orders & payments, Buy more, Profile. Customers must only ever see their own data — enforce on the server.
When details + required KYC are complete, move the order to READY_FOR_REVIEW through packages/core.
Update docs/PENDING.md and open a PR into dev.
```

## D · Admin panel
```
You are Agent D (Admin panel). Read CLAUDE.md and all files in docs/ first.
Branch feat/admin from dev. You own apps/admin.
Build everything in docs/SPEC.md §5: login with password + TOTP MFA, lockout, idle timeout, re-auth for sensitive actions,
dashboard counts, customers & leads, order detail, status change (through packages/core; emits domain events),
KYC approve/reject with reason, deliverable upload, internal notes, consultations, export (SUPER_ADMIN only, logged),
settings editors (plans, add-ons, prices, states on/off + fees, business types, warehousing questions, KYC list, BOIR toggle, hero copy),
admin users and roles (SUPER_ADMIN, STAFF), append-only activity log. Mask phone/email in lists. noindex on every page.
Check permissions on the server for every action. Use subagents for independent screens.
Update docs/PENDING.md and open a PR into dev.
```

## E · Notifications
```
You are Agent E (Notifications). Read CLAUDE.md and all files in docs/ first.
Branch feat/notifications from dev. You own packages/emails and the jobs API routes listed in docs/AGENTS.md.
Build every email in docs/SPEC.md §6 with React Email (brand: theme 11), send through EmailAdapter,
wire domain events (payment success/fail, status change, document ready, KYC rejected, consultation booked) to emails,
add Vercel Cron jobs for details-pending reminders (day 1, day 3) and the single abandoned-form email, plus team alerts.
Log every email in EmailLog. FROM / REPLY-TO from env vars (real addresses pending).
Update docs/PENDING.md and open a PR into dev.
```

## F · QA (start when A–D have first screens)
```
You are Agent F (QA). Read CLAUDE.md and all files in docs/ first.
Branch feat/qa from dev. You own e2e/ and test files.
Write Playwright journeys: Start flow → mock payment → dashboard → details + KYC → admin approves → status changes → emails logged;
KYC rejection → re-upload; Manage flow; Expert flow to the Calendly step; admin role restrictions (STAFF cannot export or edit settings).
Add accessibility checks (axe) and a Lighthouse budget for Home. Report every bug in docs/PENDING.md with steps to reproduce.
Open a PR into dev.
```

## Anytime · Integrator
```
Read CLAUDE.md and docs/. Merge open PRs into dev in this order: foundation → notifications → admin → flows → dashboard → marketing → qa.
Resolve conflicts without changing agreed behaviour, run pnpm build, pnpm test and the e2e suite, fix integration bugs,
deploy Vercel previews for web and admin, and update docs/PENDING.md with what is done and what is left.
```
