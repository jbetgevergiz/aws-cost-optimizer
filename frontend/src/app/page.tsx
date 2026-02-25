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
