# AWS Cost Optimizer MVP - Agent Specifications

**Project:** AWS cost analyzer for startups
**Value Prop:** "Find $1000s in wasted AWS spend"
**Business Model:** Freemium (free scan) + $49/mo premium
**Design:** Three.js brutalist UI, liquid glass, microinteractions
**Timeline:** MVP in 5 days
**Repository:** github.com/costoptimizer/aws-analyzer

---

## AGENT 1: DESIGNER
**Task ID:** design
**Owner:** Design System Lead
**Due:** Day 1

### Deliverables
1. **Design System Document** → `/design/system.md`
   - Brutalist layout principles (monospace, asymmetrical, generous whitespace)
   - Color palette: Black (#000000), White (#FFFFFF), Neon Cyan (#00FFFF), Dark Gray (#1A1A1A)
   - Typography: Monospace fonts (IBM Plex Mono, JetBrains Mono)
   - Component library specs

2. **Liquid Glass CSS** → `/design/glass.css`
   - backdrop-filter blur effects for cards
   - Translucent overlays
   - Accessibility compliant

3. **Three.js Concepts** → `/design/threejs-specs.md`
   - Hero particle background (animated, performance-optimized)
   - 3D cost cube visualization
   - Staggered loading animations

4. **Figma/Mockups** → `/design/mockups/`
   - Landing page
   - Dashboard
   - Settings panel

5. **CSS Tokens** → `/design/tokens.css`
   - Custom properties for colors, spacing, typography, shadows

### Key Design Principles
- Aggressive use of whitespace (30% empty space minimum)
- Monospace everything (headings, body, UI labels)
- No rounded corners (sharp edges or none)
- High contrast for accessibility (WCAG AAA)
- Microinteractions: Spring easing (framer-motion defaults)

### No Blockers
- Start immediately, no dependencies
- Make all design decisions autonomously

---

## AGENT 2: FRONTEND (Next.js + Three.js)
**Task ID:** frontend
**Owner:** Frontend Lead
**Due:** Day 3

### Tech Stack
- **Framework:** Next.js 14+ (App Router)
- **UI:** React 18+
- **Animations:** Framer Motion
- **3D:** Three.js + @react-three/fiber
- **Styling:** Tailwind CSS + custom CSS modules
- **Auth:** next-auth with Google OAuth
- **Language:** TypeScript (strict mode)
- **Package Manager:** pnpm

### Pages to Build
1. **Landing** (`/`)
   - Three.js particle background
   - Value prop headline
   - CTA buttons (Sign up free / Login)
   - Benefits section (brutalist layout)
   - Pricing table

2. **Login** (`/auth/signin`)
   - Google OAuth button
   - Minimal design

3. **Dashboard** (`/dashboard`)
   - Cost summary (live updates)
   - 3D cost cube visualization
   - Cost ticker (animated)
   - Top waste categories
   - Recommendations list
   - Upgrade CTA for premium features

4. **Settings** (`/settings`)
   - AWS credential management UI (connect/disconnect)
   - Billing information
   - Profile settings

### 3D Visualizations
- **Hero Particles:** Floating points, responsive to cursor/scroll
- **Cost Cube:** 3D rotating cube showing cost distribution per service
- **Live Ticker:** Animated numbers updating cost real-time

### Deployment
- **Host:** Vercel
- **Environment:** Production-ready
- **Output:** GitHub repo URL + live dashboard URL

### API Integration
- Connects to backend at `API_URL` (from .env)
- POST `/api/auth/*` for next-auth
- GET `/api/costs` for dashboard data
- POST `/api/recommendations` for waste analysis

### No Blockers
- Design system (AGENT 1) provides CSS tokens
- API endpoints documented (AGENT 3 provides spec)

---

## AGENT 3: BACKEND (Node.js Express)
**Task ID:** backend
**Owner:** Backend Lead
**Due:** Day 2

### Tech Stack
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** Supabase PostgreSQL
- **ORM:** Prisma
- **Auth:** Passport.js + JWT
- **Payment:** Stripe SDK
- **Docker:** Multi-stage build, Railway-ready

### Database Schema
```
users (id, email, stripe_id, tier: free|premium, created_at)
aws_credentials (id, user_id, access_key_encrypted, secret_key_encrypted)
costs (id, user_id, service, amount, date, refreshed_at)
recommendations (id, user_id, service, savings_potential, action)
```

### Core Endpoints

**Auth**
- `POST /api/auth/google` - OAuth login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Current user

**AWS Data**
- `POST /api/aws/connect` - Store encrypted AWS credentials
- `GET /api/aws/status` - Check credential status
- `GET /api/costs` - Fetch current costs (calls AWS Cost Explorer)
- `GET /api/costs/history` - Cost trends over 90 days
- `POST /api/costs/refresh` - Force refresh from AWS

**Recommendations**
- `GET /api/recommendations` - List waste opportunities
- `POST /api/recommendations/{id}/remediate` - Apply cost-saving action
  - Right-size instances
  - Delete idle resources
  - Enable savings plans recommendations

**Billing**
- `POST /api/checkout` - Stripe checkout session
- `POST /api/webhook/stripe` - Webhook for subscription updates

### AWS Integration
- **Service:** AWS Cost Explorer API
- **Rate Limit:** Cached for 24 hours
- **Security:** AWS credentials encrypted (AES-256) at rest
- **Scope:** Read-only access (no destructive actions in MVP)

### Docker & Deployment
- `Dockerfile` with Node 20+ Alpine
- `.dockerignore` configured
- Environment variables via Railway .env
- Output: Docker image on Railway + live API URL

### No Blockers
- Database schema designed autonomously
- Mock AWS data for testing (real integration after user connects)

---

## AGENT 4: RESEARCHER + MARKETING
**Task ID:** research
**Owner:** Growth/Marketing Lead
**Due:** Day 2

### Deliverables

1. **Startup Outreach List** → `/research/targets.csv`
   - Scrape 500 AWS-using startups
   - Sources: GitHub (AWS tags/topics), ProductHunt (AWS mentions), Hacker News (AWS hiring)
   - Fields: Company Name, Email, LinkedIn, GitHub, Twitter
   - Tools: curl, jq, grep, manual research

2. **Cold Email Templates** → `/research/emails.md`
   - 3 variations (casual, professional, urgent/FOMO)
   - Subject lines A/B tested concepts
   - CTA: "Free AWS cost audit" link

3. **Twitter Thread Template** → `/research/twitter-thread.md`
   - Thread idea: "We analyzed 100 AWS bills. Here's what we found..."
   - Post outline with hooks
   - Call-to-action

4. **Landing Page Copy** → `/research/landing-copy.md`
   - Headline variations
   - Subheadline
   - Value prop refinements
   - Social proof placeholder text

### No Blockers
- Autonomous research and writing
- No code dependencies

---

## AGENT 5: OPS
**Task ID:** ops
**Owner:** DevOps/Infrastructure Lead
**Due:** Day 1

### Setup Tasks

1. **GitHub Repository** → https://github.com/costoptimizer/aws-analyzer
   - Create org/repo structure
   - Setup branch protection (main)
   - Add CI/CD workflows

2. **Vercel Project** (Frontend)
   - Connect GitHub repo
   - Setup environment variables
   - Enable preview deployments
   - Output: Live URL

3. **Railway Project** (Backend)
   - Create Node.js service
   - Attach Supabase PostgreSQL
   - Setup environment variables
   - Output: Live API URL

4. **Supabase Setup** (Database)
   - Create PostgreSQL project
   - Run schema migrations
   - Setup Row-Level Security (RLS)
   - Create service role API key

5. **CI/CD Workflows** → `.github/workflows/`
   - `test.yml` - Run tests on PR
   - `deploy-staging.yml` - Deploy to staging on push to dev
   - `deploy-prod.yml` - Deploy to production on merge to main

6. **Environment Templates** → `.env.example`
   ```
   NEXT_PUBLIC_API_URL=https://api.costoptimizer.dev
   DATABASE_URL=postgresql://...
   STRIPE_SECRET_KEY=sk_live_...
   AWS_REGION=us-east-1
   JWT_SECRET=...
   GOOGLE_CLIENT_ID=...
   GOOGLE_CLIENT_SECRET=...
   ```

7. **Deployment Guide** → `/DEPLOY.md`
   - Step-by-step setup for local development
   - How to run each service
   - Environment variable checklist
   - Troubleshooting

8. **Setup Checklist** → `/SETUP.md`
   - Pre-deployment verification
   - Credentials to obtain (Google OAuth, Stripe, AWS)
   - Database migration status
   - Health check endpoints

### No Blockers
- All infrastructure setup is autonomous
- Assumes Jason has AWS, Stripe, Supabase, GitHub accounts

---

## Cross-Agent Coordination

**No Dependencies Between Agents** - Each agent works independently and outputs their deliverables. On completion, main agent aggregates all outputs.

**Integration Points (After MVP Launch):**
- Frontend connects to Backend API (done via .env)
- Backend calls AWS Cost Explorer API (user-provided credentials)
- Stripe webhooks route to Backend (done via env var)
- Designer outputs feed into Frontend components

---

## Success Criteria

✅ **Design System:** System.md complete with tokens, mockups, and Three.js specs
✅ **Frontend:** Vercel URL live, all 4 pages functional, Three.js rendering
✅ **Backend:** Railway URL live, /costs endpoint returns mock data, Stripe integration stubbed
✅ **Research:** 500-contact CSV, 3 email templates, Twitter thread, copy variations
✅ **Ops:** All infrastructure live, CI/CD working, .env templates ready

**Final Output:** All URLs + GitHub repo links + what's working + what needs Jason's input

