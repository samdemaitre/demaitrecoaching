# Weekly Review — going live

Take the weekly check-in + feedback dashboard from your laptop to a real link your
clients can open. No coding — accounts and clicks. ~30 minutes the first time.

The app is dual-mode: on your machine it stores data in local files; once deployed
with a database it uses that automatically. Same code, nothing to change.

---

## What you'll set up
1. **Vercel** — hosts the site (built for Next.js, free to start).
2. **Vercel Postgres** — the durable database (free tier, one click).
3. **An admin password** — locks `/admin` so only you can enter client numbers.
4. **Your domain** — so links read `https://demaitrecoaching.com/check-in/...`.

---

## Step 1 — Push the latest code to GitHub
The project is already a Git repo connected to `samdemaitre/demaitrecoaching`.
In a terminal in the project folder:

```
git add -A
git commit -m "Weekly review: go-live setup"
git push
```

## Step 2 — Deploy on Vercel
1. Go to vercel.com and sign up with your GitHub account.
2. **Add New… → Project**, then import the **demaitrecoaching** repo.
3. Framework preset auto-detects **Next.js**. Leave defaults. Click **Deploy**.
4. You'll get a temporary URL like `demaitrecoaching.vercel.app`. The marketing site
   works immediately. `/admin` will show "Admin not configured" until Step 4 — that's expected.

## Step 3 — Add the database
1. In your Vercel project: **Storage → Create Database → Postgres → Continue**.
2. Name it anything, pick the region closest to you, **Create**, then **Connect** it to
   this project. Vercel injects the `POSTGRES_URL` settings automatically.
3. No schema to run — the app creates its table on first use.

## Step 4 — Set the admin password
1. **Settings → Environment Variables.**
2. Add `ADMIN_PASSWORD` = a strong password (and optionally `ADMIN_USER`, default `coach`).
3. Apply to all environments. Save.

## Step 5 — Redeploy
**Deployments → ⋯ on the latest → Redeploy** (so the database + password take effect).

## Step 6 — Connect your domain
**Settings → Domains → add `demaitrecoaching.com`** and follow the DNS instructions.
(Until then, your `.vercel.app` URL works fine for testing.)

---

## Your weekly routine
1. Open `https://demaitrecoaching.com/admin` (log in with `coach` + your password).
2. First time per client: **Add a client** (name, goal, maintenance kcal, step target,
   their habits, WhatsApp number).
3. Each week: open the client → **New check-in week** → type their numbers from
   Trainerize (prefilled from last week) → **Save**.
4. On the client's card, **Send via WhatsApp** (or copy the link).
5. The client taps the link, does the ~3-minute check-in, and lands on their dashboard.
6. You see their result and any flags back in `/admin`.

---

## Notes
- **Privacy:** `/admin` is password-protected; client links use long random tokens
  (`/check-in/ab12cd34ef56`) that are unguessable but not individually password-gated —
  fine for sharing directly with that client.
- **Data safety:** Vercel Postgres is backed up by the provider. Your local `./data`
  files are only used in development and are gitignored.
- **Costs:** Vercel Hobby + Postgres free tiers cover a solo coach comfortably. You only
  pay if you outgrow them.
- **If you ever move off Vercel:** the only file that knows about the database is
  `lib/weekly-review/store.ts`. Swap that one file; everything else stays.
