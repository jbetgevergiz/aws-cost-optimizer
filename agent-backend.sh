#!/bin/bash
set -e
cd /root/.openclaw/workspace/mvp/backend

echo "🔧 AGENT 3: BACKEND (Express.js + Supabase) - Starting..."

# Create package.json
cat > package.json << 'PKG'
{
  "name": "aws-cost-optimizer-api",
  "version": "0.1.0",
  "type": "module",
  "engines": {
    "node": ">=20.0.0"
  },
  "scripts": {
    "dev": "node --watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "migrate": "prisma migrate deploy",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "express": "^4.18.2",
    "typescript": "^5.2.0",
    "@types/node": "^20.0.0",
    "@types/express": "^4.17.0",
    "dotenv": "^16.3.0",
    "@prisma/client": "^5.4.0",
    "passport": "^0.7.0",
    "passport-jwt": "^4.0.1",
    "jsonwebtoken": "^9.1.0",
    "bcryptjs": "^2.4.3",
    "aws-sdk": "^2.1500.0",
    "stripe": "^13.10.0",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "crypto": "^1.0.1"
  },
  "devDependencies": {
    "prisma": "^5.4.0"
  }
}
PKG

echo "✅ package.json created"

# Create TypeScript config
cat > tsconfig.json << 'TSCONFIG'
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ES2020",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
TSCONFIG

echo "✅ tsconfig.json created"

# Create directory structure
mkdir -p src/{routes,middleware,services,models}

# Create main app file
cat > src/index.ts << 'INDEX'
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Auth routes
app.post('/api/auth/google', (req, res) => {
  res.json({ success: true, message: 'Google OAuth handler' });
});

app.post('/api/auth/logout', (req, res) => {
  res.json({ success: true });
});

app.get('/api/auth/me', (req, res) => {
  res.json({ 
    user: { 
      id: '1', 
      email: 'user@example.com', 
      tier: 'free' 
    } 
  });
});

// AWS Routes
app.post('/api/aws/connect', (req, res) => {
  res.json({ 
    success: true, 
    message: 'AWS credentials encrypted and stored' 
  });
});

app.get('/api/aws/status', (req, res) => {
  res.json({ 
    connected: true, 
    lastSync: new Date().toISOString() 
  });
});

// Cost Routes
app.get('/api/costs', (req, res) => {
  res.json({
    monthly: '2,456.78',
    waste: '612.50',
    savingsPercent: 25,
    byService: {
      EC2: 1200,
      RDS: 600,
      S3: 300,
      Lambda: 356.78,
    },
    history: [
      { date: '2024-02-25', cost: 2456.78 },
      { date: '2024-02-24', cost: 2410.50 },
      { date: '2024-02-23', cost: 2380.25 },
    ]
  });
});

app.get('/api/costs/history', (req, res) => {
  const days = Array.from({ length: 90 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return {
      date: date.toISOString().split('T')[0],
      cost: 2400 + Math.random() * 500,
    };
  }).reverse();
  
  res.json({ history: days });
});

app.post('/api/costs/refresh', (req, res) => {
  res.json({ 
    success: true, 
    refreshedAt: new Date().toISOString() 
  });
});

// Recommendations Routes
app.get('/api/recommendations', (req, res) => {
  res.json({
    recommendations: [
      {
        id: '1',
        service: 'EC2',
        title: 'Right-size t3.large to t3.small',
        savings: 240,
        savingsPercent: 60,
        complexity: 'low'
      },
      {
        id: '2',
        service: 'RDS',
        title: 'Delete unused staging database',
        savings: 180,
        savingsPercent: 100,
        complexity: 'medium'
      },
      {
        id: '3',
        service: 'S3',
        title: 'Enable intelligent tiering',
        savings: 95,
        savingsPercent: 35,
        complexity: 'low'
      },
    ]
  });
});

app.post('/api/recommendations/:id/remediate', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Remediation action queued' 
  });
});

// Billing Routes
app.post('/api/checkout', (req, res) => {
  res.json({
    sessionId: 'cs_test_' + Math.random().toString(36).substring(7),
    url: 'https://checkout.stripe.com/pay/...'
  });
});

app.post('/api/webhook/stripe', (req, res) => {
  res.json({ received: true });
});

// Error handler
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err);
  res.status(500).json({ 
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message 
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 API server running on http://localhost:${PORT}`);
});
INDEX

echo "✅ Main app created"

# Create Prisma schema
mkdir -p prisma
cat > prisma/schema.prisma << 'PRISMA'
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id              String    @id @default(cuid())
  email           String    @unique
  stripeId        String?   @unique
  tier            String    @default("free") // free | premium
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  
  awsCredentials  AWSCredential[]
  costs           Cost[]
  recommendations Recommendation[]
}

model AWSCredential {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  // Encrypted
  accessKeyEncrypted    String
  secretKeyEncrypted    String
  
  connectedAt DateTime @default(now())
  lastSync    DateTime @updatedAt
  
  @@unique([userId])
}

model Cost {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  service   String   // EC2, RDS, S3, etc
  amount    Float
  currency  String   @default("USD")
  date      DateTime
  
  createdAt DateTime @default(now())
  
  @@index([userId, date])
}

model Recommendation {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  service   String
  title     String
  savings   Float
  complexity String // low | medium | high
  
  applied   Boolean  @default(false)
  appliedAt DateTime?
  
  createdAt DateTime @default(now())
  
  @@index([userId])
}
PRISMA

echo "✅ Prisma schema created"

# Create .env.example
cat > .env.example << 'ENV'
PORT=3001
NODE_ENV=development

DATABASE_URL="postgresql://user:password@localhost:5432/aws_optimizer"

JWT_SECRET=your-super-secret-key-change-in-production

AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret

STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret

ENCRYPTION_KEY=your-32-char-hex-encryption-key
ENV

echo "✅ .env.example created"

# Create .gitignore
cat > .gitignore << 'GITIGNORE'
node_modules/
dist/
.env
.env.local
.DS_Store
*.log
.vscode/
.idea/
.env.*.local
GITIGNORE

echo "✅ .gitignore created"

# Create Docker config
cat > Dockerfile << 'DOCKER'
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY dist ./dist

EXPOSE 3001

CMD ["node", "dist/index.js"]
DOCKER

echo "✅ Dockerfile created"

cat > docker-compose.yml << 'COMPOSE'
version: '3.8'

services:
  api:
    build: .
    ports:
      - "3001:3001"
    environment:
      DATABASE_URL: postgresql://postgres:password@db:5432/aws_optimizer
      NODE_ENV: development
    depends_on:
      - db
    volumes:
      - .:/app
      - /app/node_modules

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: aws_optimizer
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
COMPOSE

echo "✅ Docker config created"

echo ""
echo "🔧 AGENT 3: BACKEND - Complete! ✨"
echo "Outputs:"
echo "  ✓ Express.js app with TypeScript"
echo "  ✓ All required endpoints mocked"
echo "  ✓ Prisma ORM configured"
echo "  ✓ PostgreSQL schema ready"
echo "  ✓ Docker & docker-compose configured"
echo "  ✓ Environment template created"
echo ""
echo "Next steps:"
echo "  1. npm install (or pnpm install)"
echo "  2. Setup Supabase PostgreSQL"
echo "  3. npx prisma migrate dev"
echo "  4. npm run dev"
echo "  5. Deploy to Railway"

