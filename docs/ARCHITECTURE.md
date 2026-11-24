# Architecture: how website and admin stay independent

Status: proposed on 2026-11-24, waiting for the owner's approval before any restructuring.
Design, animations and colours of the website do not change.

## The two apps
| | Website (`apps/web`) | Admin (`apps/admin`) |
| --- | --- | --- |
| Users | Visitors and customers | Staff and super admin |
| Login | Customer login (Google or email OTP), its own cookie | Staff login with authenticator app (MFA), its own cookie |
| Hosting | Vercel | AWS (container) |
| Can read/write | Only the logged-in customer's own rows | Everything, by role |

Rules that keep them apart:
1. No app calls the other app over HTTP. They only share the database and the code in `packages/`.
2. Customer login lives in the website. If admin is down, customers still log in and see their orders.
3. Admin login lives in admin. If the website is down, staff still work.
4. A bug in one app must never be needed to run the other (no shared runtime, no shared cookies).

## Shared parts (the only coupling)
- `packages/db`: one Prisma schema and one database. This is the single shared dependency.
- `packages/core`: pricing, status machine, permissions, adapters.
- Database changes must be backward compatible (add first, remove later), so one app can be deployed before the other.
- Give each app its own database user and connection limit, so a heavy admin report cannot starve customer pages.

## Deploy
- Website: Vercel project, deploys on push to `main`.
- Admin: Docker container (Next.js standalone build) on AWS, for example ECS Fargate behind a load balancer. It is a Node app, not a JAR.
- Separate CI pipeline per app, triggered only by changes in its own folder and the shared packages.

## Environments
- Website: test (Vercel + Neon) now; production later.
- Admin: even if production-only, keep one small staging copy. Admin edits live data, and a schema change affects both apps.

## Old URLs and SEO
- When the old sitemap arrives, map every old URL to the new site. Same path where possible, otherwise a 301 redirect.
- The blog stays on the old site; serve it through a rewrite/proxy so `/blogs` keeps working after the domain moves.
