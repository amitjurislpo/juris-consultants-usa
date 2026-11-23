# Parallel agents plan

Goal: finish the test environment as fast as possible with several Claude Code agents in parallel.
Each agent works in its own git worktree and branch, owns its folders, and opens a PR into `dev`.

## Phase 0 — Foundation (ONE agent, must finish first, ~1 session)
Branch `feat/foundation`. Owns `packages/*`, root config.
1. pnpm + Turborepo monorepo: `apps/web`, `apps/admin`, `packages/db`, `packages/core`, `packages/ui`, `packages/emails`.
2. TypeScript strict, ESLint, Prettier, Vitest, Playwright skeleton, GitHub Actions (lint, typecheck, test).
3. Prisma schema from `docs/SPEC.md` §7 + seed (placeholder prices marked `// PLACEHOLDER`, 6 states, business types, KYC list, warehousing questions, BOIR add-on inactive).
4. `packages/core`: pricing calculator, order status machine (§4), permissions (role → actions), domain events, adapter interfaces (Auth, Storage, Email, Payment) + test implementations (MockPaymentProvider, console/Resend email, Vercel Blob storage).
5. `packages/ui`: design tokens from the demo theme 11 (colors, fonts Sora/Inter, radii, shadows, glow), base components (Button, Card, Input, Select, Stepper/Breadcrumb, Badge, Modal, Toast, Table).
6. Auth.js setup shared config: customer email OTP; admin credentials + TOTP; role in session.
7. Both apps deploy to Vercel preview; `.env.example` documented.
Done when: `pnpm build` passes, seed runs, both apps show a placeholder page on Vercel.

## Phase 1 — Parallel (start after Foundation is merged into dev)
| Agent | Branch | Owns | Scope |
| --- | --- | --- | --- |
| A · Marketing site | `feat/web-marketing` | `apps/web/app/(marketing)`, `apps/web/components/marketing` | All public pages + every chosen animation from the demo (globe, story map route, take-off plane, departures board, documents folder, blur-in headings, comet cursor, lift & glow cards, fanned pricing cards). Mobile + reduced-motion fallbacks. SEO. |
| B · Order flows | `feat/web-flows` | `apps/web/app/(flows)` | Start / Manage / Expert / Global flows, drafts, leads, review, mock payment, confirmation, receipt PDF, Calendly step. |
| C · Customer dashboard | `feat/web-dashboard` | `apps/web/app/(dashboard)` | Dashboard pages, company details form, KYC upload + re-upload, documents download, orders & payments, buy more. |
| D · Admin panel | `feat/admin` | `apps/admin` | All admin screens, roles, MFA, lockout, activity log, settings editors, export. |
| E · Notifications | `feat/notifications` | `packages/emails`, `apps/web/app/api/jobs`, `apps/admin/app/api/jobs` | All email templates, event → email wiring, scheduled reminders (Vercel Cron), abandoned-form email, team alerts. |
| F · QA | `feat/qa` | `e2e/`, test files | Playwright e2e for main journeys, accessibility checks, Lighthouse budget, bug reports into `docs/PENDING.md`. Starts once A–D have first screens. |

Rules: agents do not edit folders they don't own. Need a schema/type change → write it under "Requests to Foundation" in `docs/PENDING.md`; the Foundation agent (or Amit) applies it in a small PR. Rebase on `dev` often.

## Phase 2 — Integrate & review
Merge order: Foundation → E → D → B → C → A → F. Fix integration issues, run full e2e, deploy previews, Amit reviews on Vercel. Update `docs/PENDING.md`.

## How to run agents in parallel (Claude Code)
```bash
git worktree add ../jc-web-marketing -b feat/web-marketing dev
git worktree add ../jc-web-flows     -b feat/web-flows dev
git worktree add ../jc-dashboard     -b feat/web-dashboard dev
git worktree add ../jc-admin         -b feat/admin dev
git worktree add ../jc-notify        -b feat/notifications dev
# open one Claude Code session per folder and paste that agent's prompt from KICKOFF_PROMPTS.md
```
