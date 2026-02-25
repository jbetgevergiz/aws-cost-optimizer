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

