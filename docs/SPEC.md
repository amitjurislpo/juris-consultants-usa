# Functional spec (v1)

Flow picture: `docs/flows/customer-admin-flow.png`. Decisions: `docs/DECISIONS.md`.

## 1. Public website (apps/web)

Pages (real URLs, SSR/SSG, metadata + JSON-LD, sitemap.xml, robots.txt):

- `/` Home — sections in this order: sticky header (Services mega menu, Pricing, How it works, Blogs, About, Contact, Talk to an Expert, Start your business) · Hero globe (canvas, illustrative flights from founders worldwide to US destinations; drag to rotate) · pricing preview (three plan cards and a placeholder calculator; no invented prices or catalog data) · trust strip · Story scroll scene (world-map route + journey-day counter + milestones) · journey steps · "who is this for" · services cards · take-off plane with World→USA progress · live departures board (auto-updating split-flap rows, clearly illustrative) · documents-into-folder scene · why us · client stories (hidden until real content) · FAQ · final CTA · footer. Design and animation selections: `docs/DECISIONS.md` #25.
- `/services` and `/services/[slug]` (12 services; content from DB/MDX; each page has price "from", what's included, timeline, FAQ, CTA, Talk to an Expert).
- `/pricing`, `/how-it-works`, `/about`, `/contact`, `/blog`, `/blog/[slug]` (MDX, TOC, CTA box, related services), `/legal/privacy`, `/legal/terms`, `/legal/refund`.
- Reference implementation of every animation: `docs/design/demo-v3.4.html` (open in a browser; use the toolbar's ✦ Animations panel to see each chosen option).

## 2. Order flows (apps/web, `/start`, `/manage`, `/expert`, `/global`)

Max 4 steps to payment, breadcrumb, Back keeps data, data saved server-side as a draft after step 1.

- **Start (new company):** 1 About you (name, email, phone with country code, business type from DB, existing business y/n) → account via email OTP (Google later) · 2 Plan (Starter LLC / Premium C-Corp, Premium only in states flagged for it — Texas), state (active list with fee), entity type · 3 Add-ons (registered agent mandatory + locked; one-time / monthly / yearly labels; EIN and virtual bank warnings) + live total · 4 Review (itemised USD total, terms checkbox) → pay → confirmation (order no., receipt PDF, timeline, "complete details" CTA).
- **Manage (existing company):** 1 About you + company (name, state, LLC/C-Corp, EIN y/n) · 2 Services (multi-select; quote-only services route to Expert) · 3 Total · 4 Pay. Order tag `EXISTING_BUSINESS`.
- **Expert:** details + topic → pay consultation fee → Calendly embed (prefill name/email; store event via Calendly webhook or redirect params) → Consultation order.
- **Global (warehousing):** details → intake questions (from DB, 3 groups, each with "Not sure") → pay fee → Calendly.
- Abandoned after step 1 → Lead record + one reminder email after 24 h.

## 3. Customer dashboard (apps/web `/dashboard`, auth required)

Home (status timeline + next action), Company details (filing form; name-rejection warning), KYC & Documents (required list per order from DB; upload; status Pending/Approved/Rejected + reason; re-upload), My documents (download deliverables via short-lived signed URL), Orders & payments (items at price paid, receipts), Buy more, Profile.

## 4. Order status machine (packages/core)

`DRAFT → PAID → DETAILS_PENDING → READY_FOR_REVIEW → FILING_SUBMITTED → APPROVED_BY_STATE → EIN_RECEIVED (only if EIN ordered) → COMPLETED`

- `READY_FOR_REVIEW → DETAILS_PENDING` when any KYC doc is rejected or details are incomplete.
- `FILING_SUBMITTED` allowed only when all required KYC docs are APPROVED and details complete.
- Consultation orders: `DRAFT → PAID → BOOKED → COMPLETED`.
- Every transition: audit log entry + customer email + dashboard update (via a domain event).

## 5. Admin panel (apps/admin)

Login: email + password + TOTP MFA; lockout after 5 failed attempts; 30 min idle timeout; re-auth for sensitive actions (settings, export, admin users).
Screens: Dashboard (counts: new paid orders, details pending, KYC to review, failed payments) · Customers & leads (search, filter) · Orders (detail: items, payment, company details, intake answers, KYC, documents, notes, timeline) · Status change · KYC review (approve / reject + reason) · Deliverable upload · Internal notes · Consultations · Export CSV/XLSX (SUPER_ADMIN, logged) · Settings (plans, add-ons, prices, states on/off + fees + premium availability, business types, warehousing questions, KYC requirement list, BOIR toggle OFF, headline text, feature flags) · Admin users (SUPER_ADMIN) · Activity log (append-only).
Lists mask phone/email partially; full value on the order page.

## 6. Emails (packages/emails, sent through EmailAdapter, queued)

Customer: OTP · payment success + receipt · payment failed + retry link · details pending (day 1, day 3) · status changed · document ready · abandoned form (once) · KYC rejected · consultation booked. Team: new paid order · ready for review · payment failed.

## 7. Data model (packages/db, Prisma — starting point; Foundation agent owns it)

User (id, email, name, phone, country, role CUSTOMER|STAFF|SUPER_ADMIN, mfaSecret?, status) · Session/Account/VerificationToken (Auth.js) · Lead (contact info, flow, step reached, source, createdAt) · Company (userId, name, state, entityType LLC|CCORP, isExisting, ein?, address JSON) · Member (companyId, name, role, ownership %, country) · Order (userId, companyId?, kind FORMATION|SERVICES|CONSULTATION|GLOBAL, status, tags[], totalUsd, currency, createdAt, paidAt) · OrderItem (orderId, catalogItemId, nameSnapshot, priceUsdSnapshot, billing ONE_TIME|MONTHLY|YEARLY, qty) · Payment (orderId, provider, providerRef, amount, status, rawEvent JSON) · CatalogItem (type PLAN|ADDON|SERVICE|FEE, slug, name, description, priceUsd, billing, mandatory, active, sort, warnings JSON) · StateFee (state, feeUsd, active, premiumAvailable, notes) · BusinessType (label, active, sort) · KycRequirement (appliesTo, docType, label, active) · KycDocument (orderId, memberId?, docType, fileKey, status, rejectReason, reviewedBy, reviewedAt) · Deliverable (orderId, type, fileKey, uploadedBy) · IntakeQuestion (group, label, inputType, options, active, sort) · IntakeAnswer (orderId, questionId, value) · Consultation (orderId, calendlyEventUri, startsAt, status) · Note (orderId, authorId, body) · AuditLog (actorId, action, entity, entityId, before JSON, after JSON, ip, at) · EmailLog (to, template, orderId?, status, at) · Setting (key, value JSON).

## 8. Quality bar

Lighthouse ≥ 90 on Home (mobile, animations deferred) · WCAG AA contrast · forms validated client + server (zod) · phone validation per country (libphonenumber) · unit tests for pricing, status machine, permissions · Playwright: Start flow to mock payment, admin status change sends email, KYC reject → re-upload.
