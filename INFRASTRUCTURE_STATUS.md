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

