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

