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
  mobile menu-to-hero gap to 20px.
- Rebuilt the documents scene as the selected d6 folder animation, including
  five sequential cards, the 0–5 counter, mobile scaling, and a static final
  arrangement for reduced-motion users. Offset its sticky stage below the
  persistent header.
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

## Pending

- Amit still needs to review the final visuals and content; open business and
  launch items remain tracked in `docs/PENDING.md`.

## Later discussion

- Confirm final prices, service copy, legal-page text, analytics/tracking, and
  custom domains when ready; none should be invented for this visual pass.
- Keep any unconfirmed prices clearly marked as placeholders.
