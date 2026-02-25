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
