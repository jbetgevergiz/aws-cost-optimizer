#!/bin/bash
set -e
cd /root/.openclaw/workspace/mvp

echo "⚙️  AGENT 5: OPS - Infrastructure Setup - Starting..."

# Create GitHub repo structure
mkdir -p github-setup

cat > github-setup/GITHUB_SETUP.md << 'GITHUB'
# GitHub Repository Setup - aws-cost-optimizer

## Repo Creation

```bash
gh repo create costoptimizer/aws-analyzer \
  --public \
  --source=/root/.openclaw/workspace/mvp \
  --remote=origin \
  --push
```

## Branch Protection Rules

**Main Branch Protection:**
- Require pull request reviews (1 approval)
- Require status checks to pass
- Require branches to be up to date
- Require code review from code owners

## Repo Structure

```
aws-analyzer/
├── frontend/                    # Next.js app
├── backend/                     # Express API
├── design/                      # Design system
├── research/                    # Marketing assets
├── .github/
│   ├── workflows/
│   │   ├── test.yml
│   │   ├── deploy-staging.yml
│   │   └── deploy-prod.yml
│   ├── CODEOWNERS
│   └── pull_request_template.md
├── docs/
│   ├── DEPLOY.md
│   ├── SETUP.md
│   └── API.md
├── .env.example
├── .gitignore
└── README.md
```

## CODEOWNERS

```
# Frontend
/frontend/ @frontend-team

# Backend
/backend/ @backend-team

# Design
/design/ @design-team
```

GITHUB

# Create CI/CD workflows
mkdir -p .github/workflows

cat > .github/workflows/test.yml << 'TEST'
name: Test & Lint

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 20
          cache: 'npm'
      - run: cd frontend && npm ci
      - run: cd frontend && npm run type-check
      - run: cd frontend && npm run lint

  backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 20
          cache: 'npm'
      - run: cd backend && npm ci
      - run: cd backend && npm run type-check
      - run: cd backend && npm run build
TEST

echo "✅ test.yml created"

cat > .github/workflows/deploy-staging.yml << 'STAGING'
name: Deploy to Staging

on:
  push:
    branches: [develop]

jobs:
  deploy-api:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Railway
        uses: rail wayapp/railway@v1
        with:
          environment: staging
          service: api
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Vercel
        uses: vercel/action@main
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          scope: costoptimizer
          environment: preview
STAGING

echo "✅ deploy-staging.yml created"

cat > .github/workflows/deploy-prod.yml << 'PROD'
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy-api:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build Docker image
        run: cd backend && docker build -t api:${{ github.sha }} .
      - name: Deploy to Railway
        uses: railwayapp/railway@v1
        with:
          environment: production
          service: api
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Vercel Production
        uses: vercel/action@main
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          scope: costoptimizer
          environment: production
PROD

echo "✅ deploy-prod.yml created"

# Create environment templates
mkdir -p env-templates

cat > env-templates/.env.development << 'DEVENV'
# Development Environment Variables

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_STRIPE_KEY=pk_test_51234567890
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=dev-secret-key-change-in-production

# Backend
PORT=3001
NODE_ENV=development
DATABASE_URL=postgresql://postgres:password@localhost:5432/aws_optimizer
JWT_SECRET=dev-jwt-secret-change-in-production

# AWS
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-test-key
AWS_SECRET_ACCESS_KEY=your-test-secret

# Stripe
STRIPE_SECRET_KEY=sk_test_123456789
STRIPE_WEBHOOK_SECRET=whsec_test_123456789

# OAuth
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret

# Encryption
ENCRYPTION_KEY=00000000000000000000000000000000
DEVENV

echo "✅ .env.development created"

cat > env-templates/.env.production << 'PRODENV'
# Production Environment Variables
# These should be set in Railway/Vercel/GitHub Secrets

# Frontend (Vercel)
NEXT_PUBLIC_API_URL=https://api.costoptimizer.dev
NEXT_PUBLIC_STRIPE_KEY=pk_live_...
NEXTAUTH_URL=https://costoptimizer.dev
NEXTAUTH_SECRET=<use GitHub Secrets>

# Backend (Railway)
PORT=3001
NODE_ENV=production
DATABASE_URL=<Railway PostgreSQL connection string>
JWT_SECRET=<use GitHub Secrets>

AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=<use GitHub Secrets>
AWS_SECRET_ACCESS_KEY=<use GitHub Secrets>

STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=<use GitHub Secrets>

GOOGLE_CLIENT_ID=<use GitHub Secrets>
GOOGLE_CLIENT_SECRET=<use GitHub Secrets>

ENCRYPTION_KEY=<use GitHub Secrets - 32-char hex>
PRODENV

echo "✅ .env.production created"

# Create deployment guide
cat > DEPLOY.md << 'DEPLOY'
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

DEPLOY

echo "✅ DEPLOY.md created"

# Create setup checklist
cat > SETUP.md << 'SETUP'
# MVP Setup Checklist - AWS Cost Optimizer

## Phase 1: Local Development (Day 1)

- [ ] Clone GitHub repo
- [ ] Install dependencies (frontend + backend)
- [ ] Setup .env files locally
- [ ] Run database migrations
- [ ] Frontend: `npm run dev` works
- [ ] Backend: `npm run dev` works
- [ ] Can sign in with Google OAuth (test credentials)
- [ ] Dashboard loads with mock data

## Phase 2: Cloud Infrastructure (Day 2)

### Vercel (Frontend)
- [ ] Create Vercel project
- [ ] Connect GitHub repository
- [ ] Set environment variables
- [ ] Deploy preview
- [ ] Frontend URL live

### Railway (Backend)
- [ ] Create Railway project
- [ ] Add PostgreSQL plugin
- [ ] Connect GitHub repository
- [ ] Set environment variables
- [ ] Deploy to staging
- [ ] API health check passing

### Supabase (Database)
- [ ] Create PostgreSQL project
- [ ] Get connection string
- [ ] Run migrations
- [ ] Setup Row-Level Security
- [ ] Test queries

## Phase 3: External Services (Day 1-2)

### Google OAuth
- [ ] Create Google Cloud project
- [ ] Enable Google+ API
- [ ] Create OAuth credentials
- [ ] Add redirect URIs
- [ ] Add credentials to .env

### Stripe
- [ ] Create Stripe account
- [ ] Get API keys
- [ ] Create "Premium" product
- [ ] Setup webhook endpoint
- [ ] Test checkout flow

### AWS
- [ ] (Optional for MVP) Setup test AWS account
- [ ] Create IAM user for Cost Explorer
- [ ] Document connection flow

## Phase 4: Pre-Launch (Day 3-5)

- [ ] All pages functional
- [ ] Mobile responsive
- [ ] Three.js renders (hero + cube)
- [ ] Animations working
- [ ] API endpoints responding
- [ ] Database queries working
- [ ] OAuth flow end-to-end
- [ ] Stripe payment flow tested
- [ ] Error handling implemented
- [ ] Security review (encrypted credentials, etc.)
- [ ] TypeScript strict mode passing
- [ ] CI/CD tests passing
- [ ] Performance audit (Lighthouse score > 80)
- [ ] Accessibility audit (WCAG AA)

## Phase 5: Launch (Day 5)

- [ ] Deploy to production
- [ ] All health checks passing
- [ ] Monitor for errors
- [ ] Ready for beta users
- [ ] Documentation complete
- [ ] Support contact configured

## Post-Launch (Days 6-30)

- [ ] Monitor analytics
- [ ] Gather user feedback
- [ ] Fix critical bugs
- [ ] Optimize performance
- [ ] Start outreach campaigns
- [ ] Iterate on copy/design based on feedback

SETUP

echo "✅ SETUP.md created"

# Create main README
cat > README.md << 'README'
# AWS Cost Optimizer

Find $1000s in wasted AWS spend. Free audit in 2 minutes.

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- PostgreSQL (via Supabase)
- Google OAuth credentials
- Stripe account

### Local Development

```bash
# Frontend
cd frontend
npm install
cp .env.example .env.local
npm run dev

# Backend (new terminal)
cd backend
npm install
cp .env.example .env.local
npm run dev
```

### Deployment

See [DEPLOY.md](./DEPLOY.md) for detailed instructions.

**Frontend:** https://costoptimizer.dev (Vercel)
**Backend:** https://api.costoptimizer.dev (Railway)

---

## 📋 Features

- **Free Audit:** Connect AWS account → Get cost breakdown in 2 minutes
- **Smart Recommendations:** AI-powered waste detection
- **One-Click Fixes:** Remediate issues directly
- **Real-Time Monitoring:** Premium tier with live updates
- **Slack Integration:** Get alerts on cost anomalies

---

## 🏗️ Architecture

```
┌─────────────────┐
│   Frontend      │  Next.js 14 + React + Three.js + Tailwind
│  (Vercel)       │  Framer Motion animations, liquid glass UI
└────────┬────────┘
         │
    API Bridge
    (Next.js API routes)
         │
         ↓
┌─────────────────┐
│   Backend API   │  Express.js + TypeScript
│   (Railway)     │  Prisma ORM, Supabase PostgreSQL
└────────┬────────┘
         │
    ┌────┴────┬──────────┬─────────┐
    ↓         ↓          ↓         ↓
   AWS       Stripe    Google    Supabase
   Cost      Payments   OAuth     DB
  Explorer
```

---

## 📊 Technology Stack

**Frontend**
- Next.js 14 (App Router)
- React 18
- Three.js + @react-three/fiber
- Framer Motion
- Tailwind CSS
- TypeScript

**Backend**
- Express.js
- Prisma ORM
- PostgreSQL (Supabase)
- Stripe SDK
- AWS SDK
- TypeScript

**Deployment**
- Vercel (frontend)
- Railway (backend)
- Supabase (database)
- GitHub Actions (CI/CD)

---

## 📝 Documentation

- [Setup Guide](./SETUP.md) - Local development & pre-launch checklist
- [Deployment Guide](./DEPLOY.md) - Production deployment steps
- [Design System](./design/system.md) - Brutalist UI specs
- [API Docs](./backend/README.md) - Endpoint reference

---

## 💼 Business Model

- **Free:** One-time audit + basic recommendations
- **Premium:** $49/month for continuous monitoring + remediation

---

## 🤝 Contributing

1. Fork the repo
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 📄 License

MIT

---

## 👥 Team

Built in 5 days for startup founders who care about burn.

---

## 📧 Support

Questions? Email support@costoptimizer.dev

README

echo "✅ README.md created"

# Create .gitignore
cat > .gitignore << 'GITIGNORE'
# Dependencies
node_modules/
pnpm-lock.yaml
package-lock.json
yarn.lock

# Builds
dist/
build/
.next/
out/

# Environment
.env
.env.local
.env.*.local
.env.production.local

# IDE
.vscode/
.idea/
*.swp
*.swo
*.sublime-project
.DS_Store

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Testing
coverage/
.nyc_output/

# Misc
.cache/
GITIGNORE

echo "✅ .gitignore created"

# Create infrastructure status doc
cat > INFRASTRUCTURE_STATUS.md << 'STATUS'
# Infrastructure Status

## Services Configuration

### Frontend (Vercel)
```
Project: aws-analyzer
URL: costoptimizer.dev
Environment: Production
Build Command: npm run build
Start Command: npm start
Node Version: 18+
Framework: Next.js 14
```

### Backend (Railway)
```
Service: api
URL: api.costoptimizer.dev
Environment: Production
Build Command: npm run build
Start Command: npm start
Node Version: 20
Framework: Express.js
Database: PostgreSQL (Supabase)
```

### Database (Supabase)
```
Project: aws-cost-optimizer
Region: us-east-1
Database: PostgreSQL 15
SSL: Required
Backups: Daily
```

### CI/CD (GitHub Actions)
```
- test.yml: Runs on PR and push to develop/main
- deploy-staging.yml: Triggers on push to develop
- deploy-prod.yml: Triggers on merge to main
```

## Environment Variables Checklist

### Vercel (Frontend)
- [ ] NEXT_PUBLIC_API_URL
- [ ] NEXT_PUBLIC_STRIPE_KEY
- [ ] NEXTAUTH_URL
- [ ] NEXTAUTH_SECRET
- [ ] GOOGLE_CLIENT_ID
- [ ] GOOGLE_CLIENT_SECRET

### Railway (Backend)
- [ ] DATABASE_URL
- [ ] JWT_SECRET
- [ ] NODE_ENV=production
- [ ] STRIPE_SECRET_KEY
- [ ] STRIPE_WEBHOOK_SECRET
- [ ] AWS_REGION
- [ ] AWS_ACCESS_KEY_ID
- [ ] AWS_SECRET_ACCESS_KEY
- [ ] ENCRYPTION_KEY
- [ ] GOOGLE_CLIENT_ID
- [ ] GOOGLE_CLIENT_SECRET

## Health Checks

**Frontend:**
```bash
curl https://costoptimizer.dev
# Should return 200 OK
```

**Backend:**
```bash
curl https://api.costoptimizer.dev/health
# Should return {"status":"ok"}
```

**Database:**
```bash
# Check Supabase dashboard for connection status
```

STATUS

echo "✅ INFRASTRUCTURE_STATUS.md created"

echo ""
echo "⚙️  AGENT 5: OPS - Infrastructure Setup - Complete! ✨"
echo "Outputs:"
echo "  ✓ GitHub setup guide + CODEOWNERS"
echo "  ✓ CI/CD workflows (test, deploy-staging, deploy-prod)"
echo "  ✓ Environment templates (dev, production)"
echo "  ✓ Deployment guide (step-by-step)"
echo "  ✓ Setup checklist (5 phases)"
echo "  ✓ README.md with architecture"
echo "  ✓ Infrastructure status tracking"
echo "  ✓ .gitignore configured"
echo ""
echo "Next steps:"
echo "  1. Create GitHub repo"
echo "  2. Add GitHub Secrets for CI/CD"
echo "  3. Create Vercel + Railway projects"
echo "  4. Setup Supabase PostgreSQL"
echo "  5. Configure OAuth + Stripe"
echo "  6. Push to main branch"
echo "  7. Monitor deployments"

