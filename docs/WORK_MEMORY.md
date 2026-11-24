# Work Memory — Public Website

Updated: 2026-11-24

## Current scope

Match the public marketing site to the final visual reference at
`docs/design/final/Juris_USA_Website_Final_Design.html`, including Theme 11
colors, text contrast, hero copy, and selected animation scenes. This work does
not include login, dashboard, admin, email, or payment features.

## Current branch and PR

- Branch: `fix/web-marketing-final-design`
- Existing PR: [#5](https://github.com/amitjurislpo/juris-consultants-usa/pull/5)
- Color follow-up committed and pushed as `97a8238`; PR #5 summary is updated.
- Hero, folder, and departures-board follow-up committed and pushed as `9b8c931`.
- Handoff note committed and pushed as `6a64fb6`.
- Preserve unrelated existing worktree items; do not stage them.

## Reference findings

- Main palette tokens already match: page `#05070D`, surfaces `#0A0E1A` and
  `#0D1324`, blue `#3B82F6`, cyan/Theme 11 amber `#22D3EE`, heading `#F1F5F9`,
  body `#CBD5E1`, and muted text `#94A3B8`.
- The final reference renders the hero heading white and lead copy `#CBD5E1`.
- The story milestone accent resolves `--amber` to cyan (`#22D3EE`); the globe
  route markers must use that token color rather than hard-coded gold.
- The departures board surface is `#0B0F17` with a `#1F2937` border. Gold is
  intentionally retained for the board's flight/status details.
- Remaining gold warning/illustrative treatments should only be changed when
  the reference confirms they are not intentional status colors.
- The documents animation selection is d6: five document cards descend behind
  the cyan folder front according to scroll progress; the count advances from
  0 to 5.

## Implemented and checked

- Matched the global dark glows/grid, hero background, title/body colors, and
  primary CTA to the final HTML's computed styles.
- Matched the story background/route/milestones, take-off scene, departures
  board, and documents-scene background; globe routes now use Theme 11 cyan.
- Preserved intentional gold flight-board header/status colors.
- Updated the hero headline to "Go global from anywhere. Launch in the US.",
  applied the reference blue-to-cyan gradient and CTA labels, and reduced the
  menu-to-hero gap to 20px on desktop and mobile. Removed the top preview notice.
- Rebuilt the documents scene as the selected d6 folder animation, including
  five sequential cards, the 0–5 counter, mobile scaling, and a static final
  arrangement for reduced-motion users. Offset its sticky stage below the
  persistent header.
- Removed the "Formation fees to be confirmed" title from the sticky launch
  button while retaining its small illustrative-fee note.
- Completed the departures board with a live IST clock, five desktop columns,
  six illustrative rows, status colors, and an explanatory footer. The company
  column is hidden on mobile as in the reference.
- Added no service integrations, environment requirements, or database access.
- Browser-checked the hero spacing and documents scene on mobile, the folder
  count at each scroll milestone, and the five-column board on desktop. On
  mobile, verified all six rows fit without horizontal overflow.
- Web lint, typecheck, Prettier, and `git diff --check` pass. The web package
  has no test files. Localhost remains responsive. Build was not rerun to avoid
  disrupting the active Next dev server; the existing PR's build passed before
  this visual follow-up.

## Current uncommitted continuation

- Removed the top "Preview site · Copy and prices are illustrative placeholders"
  banner and its CSS.
- Reduced the desktop hero top spacing to 20px, matching the existing mobile
  spacing; aligned the copy to the top of its grid cell.
- Removed the bold "Formation fees to be confirmed" text from the sticky launch
  CTA. The small illustrative-fee note and Start now button remain.
- Browser verified desktop and mobile header-to-badge gaps of 20px, no preview
  banner, and no sticky-CTA title.
- Lint, typecheck, Prettier, and `git diff --check` pass; the web package has no
  test files. Build was not rerun because localhost was active during validation.
- These changes are **uncommitted and unpushed** on
  `fix/web-marketing-final-design`. Continue from the existing worktree in
  Claude Code; preserve the unrelated untracked files. Do not stage or commit
  anything unless Amit asks.
- The detached `pnpm --filter @juris/web dev` process on port 3000 has since
  exited. Restart it from the repo when continuing if localhost is needed.

## Pending

- Amit still needs to review the final visuals and content; open business and
  launch items remain tracked in `docs/PENDING.md`.

## Later discussion

- Confirm final prices, service copy, legal-page text, analytics/tracking, and
  custom domains when ready; none should be invented for this visual pass.
- Keep any unconfirmed prices clearly marked as placeholders.

## 2026-11-24 — Exact port of the final design (supersedes the notes above)

Amit asked for a 100% match with `docs/design/final/Juris_USA_Final_Design_All_Screens.pdf`
(colors, fonts, copy, animations, all screens). The earlier hand-built marketing components were
replaced by a faithful port of `Juris_USA_Website_Final_Design.html`:

- `apps/web/public/final.css` — the HTML's CSS verbatim + Theme 11 variables. Served as a static
  file on purpose: Next's CSS pipeline (lightningcss) silently dropped `backdrop-filter`.
- `apps/web/public/final-runtime.js` — the HTML's own JS (globe, story, take-off, departures
  board, documents folder, quiz, calculator, order flow...) minus demo/gallery code; loaded with
  `next/script`. Real URLs replace `#/` hashes (click + hashchange translator at the end of file).
- `apps/web/components/marketing/final/generated.ts` — server-rendered markup of every page,
  generated from the HTML's `PAGES.*` templates. `Shell.tsx` = announce bar, header, footer,
  WhatsApp button, sticky CTA. Routes: `/`, `/services`, `/services/[slug]`, `/pricing`,
  `/how-it-works`, `/blog`, `/blog/[slug]`, `/about`, `/contact`, `/start`, `/track-order`.
- Regenerate with `tools/port-final-design/` (`dump.mjs` then `gen.mjs`; `cmp.mjs` pixel-compares
  app vs. HTML; `func.mjs` smoke-tests interactions). FAQ/legal/coming-soon are not in the PDF;
  they use `subpages.css` with the same tokens.
- Verified at 1280px and 390px: page heights equal the HTML's, pixel diff ≈0% on every page except
  the live-animated globe; quiz, tabs, filters, calculator, start flow, contact validation, mega
  and mobile menus work. Lint/typecheck pass.

**Conflicts with CLAUDE.md, accepted because Amit asked for an exact match (confirm later):**
prices/states/copy are hard-coded in the generated markup (rule: from DB); `[bracket]` placeholders
and "from India" wording are kept as in the design. `final-runtime.js` still contains unused
gallery/hero-variant code (could be pruned). Page links are plain `<a>` (full page loads).
Nothing committed.
