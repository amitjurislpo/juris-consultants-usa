# Decisions (agreed with Amit, Nov 2026)

| # | Topic | Decision |
| --- | --- | --- |
| 1 | System | Brand-new system. No data migration from the old site (no admin existed; little data). |
| 2 | Before vs after payment | Minimum details before payment (4 steps). Filing details + KYC after payment in the dashboard. Order stays "Details pending" until complete; reminders day 1 and day 3. Filing starts only after details + KYC approved. |
| 3 | Customer login | Account created right after step 1. Methods: Google (later) and email OTP. URL `/login`. |
| 4 | Admin login | Separate entry (`admin` app). Email + password + authenticator-app MFA. Access from anywhere for now (IP/VPN restriction later). |
| 5 | Company types | LLC and C-Corp only. No S-Corp. |
| 6 | States | Texas, California, Wyoming, Delaware, Florida, New York. Each switchable on/off in admin. Nevada and New Mexico removed. |
| 7 | Registered agent | Mandatory on every formation order. |
| 8 | Entry buttons | "Start your business" (new company) and "Manage your business" (existing company). |
| 9 | Manage your business | Company details → choose services → total → pay → rest in dashboard. Tax / warehousing go to Talk to an Expert. Orders tagged "Existing business". |
| 10 | Talk to an Expert / Global plan | Details (or warehousing intake) → pay fee → Calendly booking. Booking shows in admin as a Consultation order + in customer dashboard + email. |
| 11 | Warehousing intake | 3 parts: Product (exporting now?, product, HSN code, units/shipment), Packing (palletised?, pallet count, box size cm, weight/box, units/box, total weight), Operations (order frequency, returns, logistics partner, start date). Every question has "Not sure". Questions editable in admin. |
| 12 | KYC | Dashboard "KYC & Documents": passport + address proof per owner + extra per service (list from admin). Admin approves or rejects with reason; customer re-uploads. |
| 13 | Admin panel | Dashboard, customers & leads, orders, status change (emails customer), KYC review, document upload, internal notes, consultations, export (super admin), settings (plans, add-ons, prices, states, business types, warehousing questions, KYC list, BOIR switch), admin users, immutable activity log. |
| 14 | Roles | SUPER_ADMIN: everything. STAFF: orders, status, KYC, documents, notes, consultations. No export/settings/users. |
| 15 | Emails (customer) | Login OTP, payment success (order no. + receipt), payment failed (retry link), details pending reminders, status change, document ready, abandoned form (one email), KYC rejected, consultation booked. |
| 16 | Emails (team) | New paid order, details/KYC ready for review, payment failed. |
| 17 | BOIR add-on | Exists in data but switched OFF (US-formed companies are exempt since Mar 2025; legal to confirm). |
| 18 | Brand | Juris Consultants USA. Customers from any country. |
| 19 | Payment | Gateway not decided (Razorpay or Stripe). Build behind `PaymentProvider`; use mock for now. Charges in USD. |
| 20 | Prices | Not final. Seed placeholder values, clearly marked; all editable in admin. Do not spend time on pricing logic beyond: plan + state fee + add-ons (one-time / monthly / yearly) = total. |
| 21 | Design | Demo v3.4 with: Theme 11 Obsidian Neon Blue (dark); Hero 12 Futuristic globe with flights from many countries to US states; Home layout 20 Cinematic + Conversion; Story background = World map route; Plane section = Take-off with World → USA progress bar; Live departures board under the plane section (auto-changing rows, split-flap effect, "illustrative" label); Documents scene = Into the folder; Headings = Blur in; Cursor = Comet trail (desktop only); Card hover = Lift & glow; Pricing = fanned card stack ("Pick a card · see the price") with state, add-ons and live total below (see `docs/design/ref-pricing-cards.png`). |
| 22 | Hero copy | Headline: **"Your US company, from anywhere in the world."** Sub-line: **"Formation, EIN, bank account and compliance, handled end to end by our CA/CS-led expert team. Talk to us on WhatsApp or email, wherever you are."** Badge: "Forming US companies for founders worldwide". All three editable in admin (Settings → Home page). Never say the service is only for India or "in your time zone". |
| 23 | Hosting now | Vercel only (test). AWS later. |
| 24 | Team | Amit + Claude Code, many agents in parallel, finish as fast as possible. |
