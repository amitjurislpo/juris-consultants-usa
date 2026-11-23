# juris-consultants-usa

## Project docs
- `CLAUDE.md` — project memory and rules for Claude Code (read first)
- `docs/DECISIONS.md` — everything agreed
- `docs/SPEC.md` — functional spec and data model
- `docs/AGENTS.md` — parallel agents plan
- `docs/PENDING.md` — pending work, open questions, done log (keep updated)
- `docs/design/` — final design demo + references · `docs/flows/` — customer & admin flow
- `KICKOFF_PROMPTS.md` — prompts to start each Claude Code agent

## Local development
1. Install Node.js 22+ and activate pnpm with `corepack enable`.
2. Run `pnpm install`.
3. Copy `.env.example` to `.env.local`, then fill in the required local values.
4. Run `pnpm db:generate`, `pnpm db:push`, and `pnpm db:seed` after configuring PostgreSQL.
5. Run `pnpm dev` to start the web app on port 3000 and admin app on port 3001.

Run `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build` before opening a PR.
