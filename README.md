# Beit El Teb

A bilingual (English/Arabic) medical practice website and operations dashboard built with Next.js App Router, TypeScript, Tailwind CSS, PostgreSQL and Prisma.

## Local development

1. Install Node.js 20+ and PostgreSQL 15+.
2. Copy `.env.example` to `.env` and replace every secret. Create the configured database.
3. Run `npm install`, `npm run db:generate`, `npm run db:migrate`, and `npm run db:seed`.
4. Start with `npm run dev`. Public routes are `/en` and `/ar`; staff sign in at `/admin/login`.

The seed is idempotent. It creates three bilingual services and an administrator from `ADMIN_EMAIL`/`ADMIN_PASSWORD`. Never use the example password in production.

## Storage

Create a public Supabase Storage bucket matching `SUPABASE_STORAGE_BUCKET`. Set `SUPABASE_URL` and the **server-only** service-role key. Uploads are authenticated, limited to image MIME types and 5 MB, sent through `/api/admin/media`, and recorded in PostgreSQL. Never expose the service-role key with a `NEXT_PUBLIC_` prefix.

## Deployment

Deploy to Vercel or any Node.js host with a managed PostgreSQL database. Configure all `.env.example` values, run `npm run db:migrate && npm run db:seed` as the release command, then `npm run build` and `npm start`. Set `NEXT_PUBLIC_SITE_URL` to the canonical HTTPS origin. Supabase must allow public reads for the media bucket. Rotate the initial admin password immediately. Use database backups, HTTPS, log monitoring and rate limiting/WAF controls for public form endpoints.

## Verification checklist

Run `npm run format`, `npm run lint`, `npm run typecheck`, `npm test`, and `npm run build`. With a test PostgreSQL URL, run migrations and seed twice to verify idempotency. Exercise login/logout, each status transition, service create/delete, image upload, and both public forms. Check 375 px, 768 px and desktop widths in browser developer tools; verify Arabic pages expose `dir="rtl"`, keyboard focus, labels, and readable contrast.
