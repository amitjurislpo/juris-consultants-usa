# Work Memory — Public Website

Updated: 2026-11-24

## Current scope

Match the public marketing site to the final visual reference at
`docs/design/final/Juris_USA_Website_Final_Design.html`, focusing on Theme 11
colors, text contrast, and the selected animation scenes. This work does not
include login, dashboard, admin, email, or payment features.

## Current branch and PR

- Branch: `fix/web-marketing-final-design`
- Existing PR: [#5](https://github.com/amitjurislpo/juris-consultants-usa/pull/5)
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

## Implemented and checked

- Matched the global dark glows/grid, hero background, title/body colors, and
  primary CTA to the final HTML's computed styles.
- Matched the story background/route/milestones, take-off scene, departures
  board, and documents-scene background; globe routes now use Theme 11 cyan.
- Preserved intentional gold flight-board header/status colors.
- Added no service integrations, environment requirements, or database access.
- Browser-computed desktop styles for the selected scenes match the reference.
- Web lint, typecheck, Prettier, and `git diff --check` pass. Localhost is
  responsive. Build was not rerun to avoid disrupting the active Next dev
  server; the existing PR's build passed before this color follow-up.

## Pending

- Commit only the focused marketing/docs changes, push the branch, and update
  PR #5 with this follow-up.
- Amit still needs to review the final visuals and content; open business and
  launch items remain tracked in `docs/PENDING.md`.

## Later discussion

- Confirm final prices, service copy, legal-page text, analytics/tracking, and
  custom domains when ready; none should be invented for this visual pass.
- Keep any unconfirmed prices clearly marked as placeholders.
