# Setup guide: Vercel, GoDaddy DNS, Google login, email, AWS admin

Written 2026-11-24. Owner: Amit. Do the steps in this order. Items marked (Claude) can be done by Claude Code once you give the value.

## 0. Environment variables used by the website (Vercel project settings, Environment Variables)
| Name | What it is |
| --- | --- |
| `DATABASE_URL` | Neon Postgres connection string |
| `AUTH_SECRET` | random 32+ character secret (generate with `openssl rand -base64 32`) |
| `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET` | from Google Cloud (section 2) |
| `RESEND_API_KEY`, `AUTH_EMAIL_FROM` | from Resend (section 3), e.g. `Juris Consultants USA <no-reply@jurisconsultantsusa.com>` |
| `CALENDLY_EXPERT_URL` | your Calendly event link for the expert call |
| `BLOG_ORIGIN` | live site only: address of the OLD site that keeps serving /blogs (section 1b) |
| `ALLOW_INDEXING` | `true` only on the live site; leave unset on the test link |
| `NEXT_PUBLIC_APP_URL` | the site address, e.g. `https://www.jurisconsultantsusa.com` |

## 1. Vercel + GoDaddy
### 1a. Test link (no DNS needed)
1. Vercel > Add New > Project > import the GitHub repo `juris-consultants-usa`.
2. Root Directory: `apps/web`. Framework: Next.js. Install command: `corepack pnpm install`. Build command: `corepack pnpm turbo run build --filter=@juris/web`.
3. Add the environment variables above (except `ALLOW_INDEXING`).
4. Settings > Git > Ignored Build Step: `npx turbo-ignore` (a change that only touches apps/admin will not redeploy the website).
5. Neon: Vercel > Storage > Marketplace > Neon, then run once from your computer: `corepack pnpm db:push` and `corepack pnpm db:seed` with that `DATABASE_URL`.
6. Share the `*.vercel.app` URL with the team.

### 1b. Going live on your domain (GoDaddy)
The old website is currently served from this domain. When DNS moves to Vercel, the old site disappears, so first keep it alive on a different name:
1. In GoDaddy DNS, add a record for the old site's server under a new name, for example `old` (A record to the old server IP, or CNAME to the old host). Check that `https://old.jurisconsultantsusa.com/blogs` opens the blog.
2. Set `BLOG_ORIGIN=https://old.jurisconsultantsusa.com` in Vercel. Then `/blogs/...` on the new site is served from the old one with the same URLs.
3. Lower the TTL of the current records to 600 seconds a day before the switch.
4. Vercel project > Settings > Domains: add `www.jurisconsultantsusa.com` and `jurisconsultantsusa.com`. Vercel shows the exact records to create.
5. GoDaddy > DNS: change the `www` CNAME to `cname.vercel-dns.com` (or the value Vercel shows) and the `@` A record to `76.76.21.21`. Do NOT touch MX, SPF, DKIM, TXT records: they run your email.
6. Wait for Vercel to show the domain as valid and for HTTPS to be issued (usually minutes).
7. Set `ALLOW_INDEXING=true`, redeploy, then submit `https://www.jurisconsultantsusa.com/sitemap.xml` in Google Search Console.
Old URLs kept the same on the new site: `/about`, `/services`, `/pricing`, `/contacts`, `/privacy`, `/terms`, `/signup` (shows login), `/blogs` and all `/blogs/...`.

## 2. Google login
1. Open https://console.cloud.google.com and create a project, for example "Juris Consultants USA".
2. APIs & Services > OAuth consent screen > User type External > fill: app name, support email, app logo, authorized domain `jurisconsultantsusa.com`, developer email. Scopes: only `openid`, `email`, `profile` (these need no Google review). Click "Publish app" so any Google user can sign in (otherwise only listed test users can).
3. APIs & Services > Credentials > Create credentials > OAuth client ID > Web application.
   - Authorized JavaScript origins: `https://www.jurisconsultantsusa.com`, your test link `https://<project>.vercel.app`, `http://localhost:3000`.
   - Authorized redirect URIs (exact): `https://www.jurisconsultantsusa.com/api/auth/callback/google`, `https://<project>.vercel.app/api/auth/callback/google`, `http://localhost:3000/api/auth/callback/google`.
4. Copy the Client ID and Client secret into Vercel as `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET`, then redeploy. The "Continue with Google" button appears automatically.
5. Google gives name, email and photo only. The phone number is asked once in the checkout form.

## 3. Email codes and receipts (Resend)
1. resend.com > create account > Domains > Add `jurisconsultantsusa.com`.
2. Resend shows 3 to 4 DNS records (SPF, DKIM, optional DMARC). Add them in GoDaddy DNS as shown. Add, never replace, existing email records.
3. After the domain shows "Verified", create an API key and set `RESEND_API_KEY` and `AUTH_EMAIL_FROM` in Vercel.

## 4. Calendly and payment
- Calendly: create an event "Expert call (30 min)", copy its link into `CALENDLY_EXPERT_URL`.
- Payment: choose Stripe or Razorpay. Until then the pay button is a demo. Tell Claude which one; it will build the provider behind the PaymentProvider adapter and the webhook that marks orders paid.

## 5. Admin panel on AWS (container)
The admin is a Node.js app packaged as a Docker image (no JAR).
1. AWS account: enable MFA on the root user; create an admin IAM user; choose one region (for example ap-south-1 Mumbai or us-east-1).
2. ECR: create a private repository `juris-admin`.
3. Build and push the image (GitHub Actions workflow with path filter `apps/admin/**` and `packages/**`, using the Dockerfile in `apps/admin`). Claude can write the workflow.
4. Database: either keep Neon (set `DATABASE_URL`) or create RDS PostgreSQL (private subnet, backups on). Use a separate database user for the admin.
5. Secrets Manager: store `DATABASE_URL`, `AUTH_SECRET` (a DIFFERENT value from the website), email keys.
6. ECS Fargate: create a cluster, a task definition (the ECR image, 0.5 vCPU / 1 GB to start, secrets from Secrets Manager, port 3000), and a service behind an Application Load Balancer.
7. HTTPS: Certificate Manager certificate for `admin.jurisconsultantsusa.com`, attach it to the load balancer.
8. GoDaddy DNS: CNAME `admin` to the load balancer address.
9. Protect it: AWS WAF on the load balancer, and (recommended) allow only your office/VPN IP addresses.
10. First super admin: run the seed once with `SEED_SUPER_ADMIN_EMAIL`, `SEED_SUPER_ADMIN_PASSWORD`, `SEED_SUPER_ADMIN_TOTP_SECRET`, then add the TOTP secret to your authenticator app.
Keep a small staging copy of the admin (same steps, smaller) before you point the live admin at the live database.

## Creating the database and tables on a new server (AWS RDS, Neon, any PostgreSQL)

1. Set `DATABASE_URL` to the database you want, for example
   `postgresql://USER:PASSWORD@HOST:5432/juris_consultants_usa` (the database does not have to exist).
2. First deploy only, also set `SEED_SUPER_ADMINS` (JSON list of `{email, name, password}`) so the first super admins are created.
3. Run once per deploy (container start command or CI step):
   `pnpm --filter @juris/db db:bootstrap`
   - creates the database if it is missing (the DB user needs the CREATEDB privilege; if RDS does not allow it, create the empty database once by hand, the script skips that step when it exists),
   - applies every migration in `packages/db/prisma/migrations`,
   - seeds plans, add-ons, states and the super admins only when the User table is empty (`BOOTSTRAP_SEED=always|never` overrides).
4. Running it again is safe ("No pending migrations", seed skipped).
5. Production must have a DIFFERENT `AUTH_SECRET` for the website and the admin app, and `FIXED_TEST_OTP` must NOT be set.
