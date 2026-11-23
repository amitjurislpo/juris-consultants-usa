# Juris Consultants USA — project memory for Claude Code

Read this file first in every session. It is the source of truth for decisions.
Also read `docs/DECISIONS.md`, `docs/PENDING.md` and `docs/SPEC.md` before starting any task.
When resuming public website work, also read `docs/WORK_MEMORY.md`.

## What we are building

A brand-new system for Juris Consultants USA (US company formation for founders worldwide, team in India):

1. **Public website** (marketing pages + order flows) — design choices are in `docs/DECISIONS.md` #25; the latest user-provided final design supersedes the older `docs/design/demo-v3.4.html` reference (visual reference only, NOT production code).
2. **Customer dashboard** — order status, company details, KYC uploads, documents, payments.
3. **Admin panel** — customers, leads, orders, payments, status changes, KYC review, document upload, settings, roles, activity log.

Owner / tech lead: Amit. Only Amit + Claude Code work on this repo.

## Current phase: TEST ENVIRONMENT ON VERCEL (no AWS yet)

AWS is postponed (see `docs/PENDING.md`). For now everything runs on Vercel with swappable adapters, so the later move to AWS (Cognito, S3, SES, RDS) changes adapters only, not features.

| Concern        | Test environment now                                                   | Later (production, pending)  |
| -------------- | ---------------------------------------------------------------------- | ---------------------------- |
| Hosting        | Vercel (two projects: web, admin) — preview URLs, no custom domain yet | Vercel (web) + AWS (admin)   |
| Database       | PostgreSQL (Neon via Vercel Marketplace) + Prisma                      | AWS RDS PostgreSQL           |
| Customer login | Auth.js: email OTP (Google login added later)                          | AWS Cognito user pool        |
| Admin login    | Auth.js credentials + TOTP (authenticator app) MFA                     | AWS Cognito admin pool + WAF |
| File storage   | Vercel Blob (private, signed short-lived URLs)                         | AWS S3 + KMS                 |
| Email          | Resend in test mode; log to console in local dev                       | AWS SES or provided SMTP     |
| Payments       | `MockPaymentProvider` (success/fail switch)                            | Razorpay or Stripe (pending) |
| Booking        | Calendly link per event type (env var)                                 | same                         |

Every external service sits behind an interface in `packages/core/src/adapters/*` (AuthAdapter, StorageAdapter, EmailAdapter, PaymentProvider). Never call a vendor SDK outside its adapter.

## Repository layout (monorepo, pnpm + Turborepo)

```
apps/web        Next.js (App Router, TS) — website + order flows + customer dashboard
apps/admin      Next.js (App Router, TS) — admin panel (separate Vercel project)
packages/db     Prisma schema, migrations, seed (plans, add-ons, states, business types)
packages/core   domain logic: pricing, order status machine, permissions, adapters
packages/ui     shared design system (tokens from the demo: theme 11 "Obsidian Neon Blue")
packages/emails React Email templates
docs/           decisions, spec, pending list, design references
```

## Non-negotiable rules

- Real URLs, server-rendered pages (no `#/` routing). Keep SEO in mind on every public page.
- Prices, states, add-ons, business types, KYC document list, warehousing questions, headline text: **data from the database, editable in admin**. Never hard-code them.
- Store the price of every order line at purchase time.
- An order is "paid" only after the payment provider's verified server-side confirmation (webhook), never from the browser.
- Every server action / API route checks the user's role on the server.
- Customers see only their own data. Admin roles: `SUPER_ADMIN`, `STAFF` (see SPEC).
- Card data never touches our servers.
- No fake data presented as real: sample names must be labelled "illustrative". No `[bracket]` placeholders in production UI.
- Copy must not say the service is only for India (customers come from any country).
- Animations: lighter on mobile, static for `prefers-reduced-motion`, start after page load.
- TypeScript strict, ESLint + Prettier, tests for pricing, status machine and permissions (Vitest), Playwright e2e for main flows.

## Working rules for agents

- Branch from `dev`; one workstream = one branch = one folder area (see `docs/AGENTS.md`).
- Changes to `packages/db` schema or `packages/core` public types go through the **Foundation** owner; other agents request them in `docs/PENDING.md` under "Requests".
- Small commits, clear messages. Open a PR into `dev`; Amit reviews and merges.
- When you finish or stop, update `docs/PENDING.md` (what is done, what is left, open questions). This is the project's memory.
- If a requirement is unclear, do NOT invent it: add it to `docs/PENDING.md` → "Open questions" and continue with the rest.
