# Deployment Guide - AWS Cost Optimizer

## Prerequisites

- GitHub account (create repo)
- Vercel account (for frontend)
- Railway account (for backend)
- Supabase account (for PostgreSQL)
- Stripe account (for payments)
- Google Cloud Console (for OAuth)

---

## Step 1: Local Development Setup

### Clone & Install

```bash
git clone https://github.com/costoptimizer/aws-analyzer.git
cd aws-analyzer

# Frontend
cd frontend
npm install
cp .env.example .env.local
npm run dev # http://localhost:3000

# Backend (new terminal)
cd backend
npm install
cp .env.example .env.local
npm run dev # http://localhost:3001
```

### Database Setup

```bash
# Using Supabase free tier
# Create PostgreSQL project at supabase.com
# Copy connection string to backend/.env.local

# Run migrations
cd backend
npx prisma migrate dev
```

---

## Step 2: Configure OAuth (Google)

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials (Web application)
5. Add authorized redirect URIs:
   - http://localhost:3000/api/auth/callback/google
   - https://costoptimizer.dev/api/auth/callback/google
6. Copy Client ID & Secret → `.env.local`

---

## Step 3: Setup Stripe

1. Create [Stripe account](https://stripe.com)
2. Get API keys from Dashboard
3. Create Product "Premium Plan" ($49/month)
4. Add to `.env.local`:
   - STRIPE_SECRET_KEY
   - STRIPE_PUBLISHABLE_KEY
5. Setup webhook endpoint:
   - URL: https://api.costoptimizer.dev/api/webhook/stripe
   - Events: customer.subscription.updated, customer.subscription.deleted

---

## Step 4: Deploy to Vercel (Frontend)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel --prod

# Set environment variables in Vercel dashboard:
- NEXT_PUBLIC_API_URL = https://api.costoptimizer.dev
- NEXT_PUBLIC_STRIPE_KEY = pk_live_...
- NEXTAUTH_SECRET = (generate via: openssl rand -base64 32)
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET
```

**Live URL:** https://aws-analyzer.vercel.app (custom: costoptimizer.dev)

---

## Step 5: Deploy to Railway (Backend)

1. Create Railway project
2. Add PostgreSQL plugin (uses Supabase connection)
3. Connect GitHub repo (auto-deploy on push)
4. Set environment variables in Railway:
   - DATABASE_URL (from Supabase)
   - JWT_SECRET
   - STRIPE_SECRET_KEY
   - AWS credentials
   - Encryption key
5. Deploy: Push to main branch

**Live API:** https://api.costoptimizer.up.railway.app

---

## Step 6: Configure DNS

Point your domain to:
- Frontend: Vercel nameservers
- Backend: Railway URL (or CNAME)
- API: api.costoptimizer.dev → Railway

---

## Verification Checklist

- [ ] Frontend loads at costoptimizer.dev
- [ ] Backend health check: /health returns 200
- [ ] Google OAuth login works
- [ ] Stripe checkout creates session
- [ ] Database connection successful
- [ ] All secrets configured in production
- [ ] GitHub Actions CI/CD passing

---

## Monitoring

- **Frontend:** Vercel Analytics
- **Backend:** Railway logs
- **Errors:** Sentry (optional)
- **Uptime:** UptimeRobot

