# Deployment Guide — Curriculum Interactivo

This guide explains how to deploy the frontend to Vercel, the backend to Google Cloud Run, and connect a free MongoDB Atlas database so the whole stack runs in production.

> Quick summary
> - Frontend: Vercel (Nuxt 3)
> - Backend: Google Cloud Run (Dockerized FastAPI)
> - Database: MongoDB Atlas (free tier)

---

## Prerequisites

- GitHub repository for this project.
- Vercel account (free tier). Connect with your GitHub account.
- Google Cloud account with a project (Cloud Run requires billing enabled; you can use the free trial credits).
- MongoDB Atlas account (free cluster available).
- `gcloud` CLI installed and authenticated (`gcloud auth login`).
- `docker` and `docker compose` installed locally for local testing.

---

## 1) MongoDB Atlas (free cluster)

1. Sign in to https://www.mongodb.com/cloud/atlas and create a free cluster.
2. Create a database user with a secure password (e.g. `cv_user`).
3. In Network Access, add an IP whitelist. For Cloud Run and Vercel use `0.0.0.0/0` temporarily (or better: use Atlas network peering or restrict by your production IPs).
4. Get the connection string (SRV). Example:

```
mongodb+srv://cv_user:<PASSWORD>@cluster0.abcd.mongodb.net/cv?retryWrites=true&w=majority
```

Store the filled connection string as the production `MONGODB_URI`.

---

## 2) Backend → Google Cloud Run

This project already has `backend/Dockerfile`. The steps below build the container, push it, and deploy to Cloud Run.

1. Authenticate and select project:

```bash
gcloud auth login
gcloud config set project YOUR_PROJECT_ID
gcloud config set run/region YOUR_REGION # e.g. us-central1
```

2. Build and push image (using Artifact Registry or GCR). Example with GCR:

```bash
cd backend
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/curriculuminteractivo-backend
```

3. Deploy to Cloud Run (allow unauthenticated if you want public API):

```bash
gcloud run deploy cv-backend \
  --image gcr.io/YOUR_PROJECT_ID/curriculuminteractivo-backend \
  --platform managed \
  --region YOUR_REGION \
  --allow-unauthenticated \
  --set-env-vars MONGODB_URI="mongodb+srv://cv_user:PASS@cluster0.abcd.mongodb.net/cv?retryWrites=true&w=majority"
```

Notes:
- If your backend expects other envs (contact rate limit, etc.), pass them with `--set-env-vars` or configure via the Cloud Console.
- After deploy, Cloud Run will give you a HTTPS URL like `https://cv-backend-<hash>-uc.a.run.app`.
- Use that URL for the frontend API base.

### Backend environment variables (example)

Set these in Cloud Run (or via `--set-env-vars`):

- `MONGODB_URI` — connection string from Atlas
- `CONTACT_RATE_LIMIT_MAX_REQUESTS` — optional
- `CONTACT_RATE_LIMIT_WINDOW_SECONDS` — optional
- `SMTP_USER` — mailbox used as sender and recipient
- `SMTP_PASSWORD` — app password or SMTP password
- `SMTP_HOST` — SMTP server host, for example `smtp.gmail.com`
- `SMTP_PORT` — SMTP port, for example `465`
- `SMTP_USE_SSL` — `true` for implicit SSL, `false` for STARTTLS
- `SMTP_USE_TLS` — `true` when using STARTTLS with `SMTP_USE_SSL=false`
- `SMTP_TIMEOUT_SECONDS` — optional socket timeout for the SMTP connection

---

## 3) Frontend → Vercel (Nuxt 3)

1. Push your repo to GitHub (if not already).
2. On Vercel dashboard, click "New Project" → Import Git Repository → pick this repo.
3. Configure project settings:
   - Framework: `Nuxt` (should be detected)
   - Build command: `npm run build` (or `yarn build`)
   - Output directory: leave default (Nuxt handles it)

4. Add Environment Variables in Vercel (Settings → Environment Variables):

- For Production (and Preview if desired):
  - `NUXT_PUBLIC_API_URL` = `https://<CLOUD_RUN_URL>/api/v1`
  - `API_URL` = `https://<CLOUD_RUN_URL>/api/v1` (server-side config fallback)
  - `NODE_ENV` = `production`

> Notes: In `nuxt.config.ts` the runtime config uses `API_URL` (server) and `public.apiUrl` uses `NUXT_PUBLIC_API_URL` for client.

5. Deploy: Vercel will build and publish. The frontend will be available at `https://<your-vercel-app>.vercel.app`.

---

## 4) Local `.env` examples

Place these in project root for local dev (do NOT commit real secrets).

`backend/.env` (or root `.env` used by backend during local run):

```env
# backend/.env (example)
MONGODB_URI=mongodb+srv://cv_user:YOUR_PASSWORD@cluster0.abcd.mongodb.net/cv?retryWrites=true&w=majority
CONTACT_RATE_LIMIT_MAX_REQUESTS=5
CONTACT_RATE_LIMIT_WINDOW_SECONDS=3600
SMTP_USER=yourmail@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USE_SSL=true
SMTP_USE_TLS=false
# If you expose host-specific variables
API_PORT=8000
```

`frontend/.env` or project root `.env` for local Nuxt dev:

```env
# frontend/.env
NUXT_PUBLIC_API_URL=http://localhost:8000/api/v1
API_URL=http://localhost:8000/api/v1
```

Start locally:

```bash
# backend
cd backend
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

# frontend
cd frontend
npm install
npm run dev
```

---

## 5) CORS and networking notes

- If your backend returns CORS errors, enable CORS in FastAPI to allow your frontend domain:

```py
from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(CORSMiddleware, allow_origins=["https://your-frontend.vercel.app"], allow_methods=["*"], allow_headers=["*"])
```

- MongoDB Atlas: allow access from Cloud Run (Atlas allows connections from any IP if you whitelist `0.0.0.0/0`), but for security prefer restricting to known IP ranges or use private networking.

---

## 6) DNS / custom domain (optional)

- Vercel: add a custom domain in Vercel settings for the frontend. Vercel provides DNS instructions.
- Cloud Run: use Cloud Run domain mapping via Cloud Run or put Cloud Run behind Cloud CDN / HTTPS load balancer for custom domain.

---

## 7) Quick checklist before switching to production

- [ ] Replace temporary Atlas whitelist `0.0.0.0/0` with safer network rules if possible.
- [ ] Use strong DB user password and a limited-role user for the app.
- [ ] Configure secrets in Vercel and Cloud Run (never commit `.env` to Git).
- [ ] Test endpoints: `curl https://<CLOUD_RUN_URL>/api/v1/profile` should return the profile JSON.
- [ ] Ensure Nuxt `NUXT_PUBLIC_API_URL` points to `https://<CLOUD_RUN_URL>/api/v1`.

---

## 8) Troubleshooting

- If build fails on Vercel: check build logs in Vercel dashboard. Make sure Node version in Vercel matches your `package.json` engines (if set).
- If backend cannot connect to MongoDB: check Atlas connection string and network access list.
- If Cloud Run deploy fails: check `gcloud run deploy` output and `gcloud run services describe cv-backend --region YOUR_REGION` for logs.

---

## 9) Useful commands recap

```bash
# Build and push backend image
cd backend
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/curriculuminteractivo-backend

# Deploy Cloud Run
gcloud run deploy cv-backend --image gcr.io/YOUR_PROJECT_ID/curriculuminteractivo-backend --platform managed --region YOUR_REGION --allow-unauthenticated --set-env-vars MONGODB_URI="<MONGODB_URI>"

# Deploy frontend: use Vercel import UI or
# via CLI (if you have vercel CLI):
cd frontend
vercel --prod

# Local testing
# Start backend
cd backend
uvicorn app.main:app --reload --port 8000

# Start frontend
cd frontend
npm run dev
```

---

If you want, I can now:

- Generate ready-to-copy env entries in a secure `.env.example` file.
- Create a `vercel.json` with build settings if you want a reproducible Vercel configuration.
- Create a small script to automate Cloud Build + Cloud Run deploy.

Tell me which one you want next.