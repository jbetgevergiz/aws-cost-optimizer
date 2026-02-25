#!/bin/bash
set -e
cd /root/.openclaw/workspace/mvp/frontend

echo "⚛️  AGENT 2: FRONTEND (Next.js + Three.js) - Starting..."

# Initialize Next.js project
cat > package.json << 'PKG'
{
  "name": "aws-cost-optimizer",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "three": "^r158",
    "@react-three/fiber": "^8.15.0",
    "@react-three/postprocessing": "^2.10.0",
    "framer-motion": "^10.16.0",
    "next-auth": "^4.24.0",
    "axios": "^1.6.0",
    "tailwindcss": "^3.3.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "typescript": "^5.2.0",
    "eslint": "^8.50.0",
    "eslint-config-next": "^14.0.0"
  }
}
PKG

echo "✅ package.json created"

# Create Next.js config
cat > next.config.js << 'NEXTCONFIG'
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
NEXTCONFIG

echo "✅ next.config.js created"

# Create TypeScript config
cat > tsconfig.json << 'TSCONFIG'
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "resolveJsonModule": true,
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src", "next-env.d.ts"],
  "exclude": ["node_modules"]
}
TSCONFIG

echo "✅ tsconfig.json created"

# Create directory structure
mkdir -p src/app/api/auth
mkdir -p src/components/{layout,3d,ui}
mkdir -p src/lib/{hooks,utils}
mkdir -p src/styles
mkdir -p public

echo "✅ Directory structure created"

# Create main app file
cat > src/app/layout.tsx << 'LAYOUT'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AWS Cost Optimizer | Find $1000s in Wasted Spend',
  description: 'Free AWS cost analyzer. Find wasted spend in minutes.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
LAYOUT

# Create landing page
cat > src/app/page.tsx << 'LANDING'
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-black text-white font-mono">
      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-center items-start px-16 py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl font-bold mb-4 font-mono">
            Find <span className="text-cyan-400">$1000s</span>
            <br />
            in Wasted AWS Spend
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mb-8 leading-relaxed">
            AWS cost analyzer built for startups. Get a free audit in 2 minutes.
            Discover exactly where your money is going.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Link href="/auth/signin">
            <button className="px-8 py-4 bg-cyan-400 text-black font-bold hover:bg-cyan-300 transition">
              START FREE AUDIT
            </button>
          </Link>
          <Link href="/login">
            <button className="px-8 py-4 border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition">
              LOGIN
            </button>
          </Link>
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section className="py-32 px-16 border-t border-gray-800">
        <h2 className="text-4xl font-bold mb-16">What You'll Find</h2>
        <div className="grid grid-cols-3 gap-16">
          {[
            { label: 'EC2 Waste', desc: 'Idle & oversized instances' },
            { label: 'RDS Waste', desc: 'Underutilized databases' },
            { label: 'Storage Waste', desc: 'Unused S3 buckets & volumes' },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="p-6 bg-gray-900 border border-gray-700 hover:border-cyan-400 transition"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <p className="text-cyan-400 font-bold mb-2">{item.label}</p>
              <p className="text-gray-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="py-32 px-16 border-t border-gray-800">
        <h2 className="text-4xl font-bold mb-16">Pricing</h2>
        <div className="grid grid-cols-2 gap-8 max-w-4xl">
          <div className="p-8 border border-gray-700">
            <h3 className="text-2xl font-bold mb-4">Free</h3>
            <p className="text-cyan-400 text-3xl font-bold mb-4">$0</p>
            <ul className="text-gray-400 space-y-2">
              <li>✓ One-time audit</li>
              <li>✓ Cost breakdown</li>
              <li>✓ Basic recommendations</li>
            </ul>
          </div>
          <div className="p-8 border border-cyan-400 bg-cyan-400/5">
            <h3 className="text-2xl font-bold mb-4">Premium</h3>
            <p className="text-cyan-400 text-3xl font-bold mb-4">$49<span className="text-lg">/mo</span></p>
            <ul className="text-gray-400 space-y-2">
              <li>✓ Live cost monitoring</li>
              <li>✓ Advanced remediation</li>
              <li>✓ Scheduled audits</li>
              <li>✓ Slack integration</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}
LANDING

echo "✅ Landing page created"

# Create auth page
cat > src/app/auth/signin/page.tsx << 'AUTH'
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function SignIn() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <h1 className="text-3xl font-bold mb-8 font-mono text-center">LOGIN</h1>
        
        <button className="w-full py-3 bg-white text-black font-bold hover:bg-gray-100 transition mb-4">
          SIGN IN WITH GOOGLE
        </button>

        <p className="text-center text-gray-400">
          Don't have an account?{' '}
          <Link href="/" className="text-cyan-400 hover:underline">
            Try free audit
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
AUTH

echo "✅ Auth page created"

# Create dashboard page
cat > src/app/dashboard/page.tsx << 'DASHBOARD'
'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Dashboard() {
  const [costs, setCosts] = useState<any>(null)

  useEffect(() => {
    // Fetch from API
    fetch('/api/costs')
      .then(r => r.json())
      .then(setCosts)
      .catch(e => console.error(e))
  }, [])

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-8 font-mono">DASHBOARD</h1>

      {/* Cost Summary */}
      <motion.div
        className="grid grid-cols-3 gap-6 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="p-6 bg-gray-900 border border-cyan-400/20 hover:border-cyan-400 transition">
          <p className="text-gray-400 mb-2">Current Monthly Cost</p>
          <p className="text-4xl font-bold text-cyan-400">
            ${costs?.monthly || '0.00'}
          </p>
        </div>
        <div className="p-6 bg-gray-900 border border-cyan-400/20 hover:border-cyan-400 transition">
          <p className="text-gray-400 mb-2">Estimated Waste</p>
          <p className="text-4xl font-bold text-red-400">
            ${costs?.waste || '0.00'}
          </p>
        </div>
        <div className="p-6 bg-gray-900 border border-cyan-400/20 hover:border-cyan-400 transition">
          <p className="text-gray-400 mb-2">Potential Savings</p>
          <p className="text-4xl font-bold text-green-400">
            {costs?.savingsPercent || '0'}%
          </p>
        </div>
      </motion.div>

      {/* Recommendations */}
      <h2 className="text-2xl font-bold mb-4 font-mono">RECOMMENDATIONS</h2>
      <div className="space-y-3">
        {[
          { service: 'EC2', savings: '$240/mo', action: 'Right-size t3.large → t3.small' },
          { service: 'RDS', savings: '$180/mo', action: 'Delete unused staging database' },
          { service: 'S3', savings: '$95/mo', action: 'Enable intelligent tiering' },
        ].map((rec, i) => (
          <motion.div
            key={i}
            className="p-4 bg-gray-900 border border-gray-700 hover:border-cyan-400 transition cursor-pointer"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-cyan-400 font-bold">{rec.service}</p>
                <p className="text-gray-400">{rec.action}</p>
              </div>
              <p className="text-green-400 font-bold">{rec.savings}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
DASHBOARD

echo "✅ Dashboard page created"

# Create global styles
cat > src/app/globals.css << 'GLOBALS'
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;700&family=JetBrains+Mono:wght@400;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  background: #000000;
  color: #FFFFFF;
  font-family: 'IBM Plex Mono', 'JetBrains Mono', monospace;
  line-height: 1.6;
}

/* Liquid Glass */
.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

/* Smooth transitions */
button, a {
  transition: all 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #000000;
}

::-webkit-scrollbar-thumb {
  background: #00FFFF;
  border-radius: 0;
}
GLOBALS

echo "✅ Global styles created"

# Create Tailwind config
cat > tailwind.config.js << 'TAILWIND'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cyan: {
          400: '#00FFFF',
        },
      },
      fontFamily: {
        mono: ['IBM Plex Mono', 'JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
TAILWIND

echo "✅ Tailwind config created"

# Create PostCSS config
cat > postcss.config.js << 'POSTCSS'
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
POSTCSS

echo "✅ PostCSS config created"

# Create .env.example
cat > .env.example << 'ENV'
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_STRIPE_KEY=pk_test_...

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
ENV

echo "✅ .env.example created"

# Create .gitignore
cat > .gitignore << 'GITIGNORE'
# dependencies
node_modules/
.pnp
.pnp.js

# testing
coverage/

# next.js
.next/
out/

# production
build/

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE
.vscode/
.idea/
*.swp
*.swo
