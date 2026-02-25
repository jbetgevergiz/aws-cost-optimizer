'use client';

import { useState } from 'react';
import { Button, Card, CardBody, CardHeader, Input, Modal, Hero, Navigation } from '@/components';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleGetStarted = () => {
    setIsModalOpen(true);
  };

  const handleSubmitEmail = () => {
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setEmail('');
        setSubmitted(false);
      }, 2000);
    }
  };

  const handleWatchDemo = () => {
    // Link to demo video
    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
  };

  const features = [
    {
      title: 'Real-time Monitoring',
      description: 'Track your AWS costs as they happen with live dashboards',
      icon: '📊',
    },
    {
      title: 'AI-Powered Recommendations',
      description: 'Machine learning identifies hidden waste in your infrastructure',
      icon: '🤖',
    },
    {
      title: 'Safe & Read-Only',
      description: 'We never modify your infrastructure without explicit approval',
      icon: '🔒',
    },
    {
      title: 'Easy Integration',
      description: 'Connect your AWS account in 60 seconds with read-only IAM role',
      icon: '⚡',
    },
    {
      title: 'Compliance Compliant',
      description: 'SOC 2 Type II certified, GDPR and HIPAA compliant',
      icon: '✅',
    },
    {
      title: '24/7 Support',
      description: 'Dedicated support team ready to help optimize your costs',
      icon: '🎯',
    },
  ];

  const faqs = [
    {
      question: 'How secure is AWS integration?',
      answer:
        'We integrate via read-only IAM role. We analyze your infrastructure but never make changes without explicit approval. All data is encrypted in transit and at rest. We are SOC 2 Type II certified.',
    },
    {
      question: 'What if I disagree with recommendations?',
      answer:
        'No problem. Our platform lets you approve or reject each recommendation individually. You stay in complete control of your infrastructure.',
    },
    {
      question: 'Does this work with reserved instances?',
      answer:
        'Yes! Our AI analyzes reserved instances, savings plans, and on-demand pricing to find the optimal configuration for your workloads.',
    },
    {
      question: 'How much can I save?',
      answer:
        'Our customers save an average of $8,400/month. Most companies waste 20-30% of their AWS spend on unused resources. We help you recover that.',
    },
    {
      question: 'Is there a setup fee?',
      answer:
        "No setup fees. We operate on a 15% success-based model: you only pay when you save money. Free 14-day trial to see recommendations for your account.",
    },
  ];

  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <>
      {/* Navigation */}
      <Navigation
        logoText="AWS Cost Optimizer"
        navItems={[
          { label: 'Features', href: '#features', isActive: false },
          { label: 'Pricing', href: '#pricing', isActive: false },
          { label: 'FAQ', href: '#faq', isActive: false },
        ]}
        ctaButton={{
          text: 'Get Started',
          onClick: handleGetStarted,
        }}
      />

      {/* Hero Section */}
      <Hero
        title="Stop Wasting Thousands on AWS"
        subtitle="Problem-First"
        description="Find hidden costs in minutes. Recover up to $50K+ per year without reducing performance."
        primaryCTA={{
          text: 'See Your Savings Now',
          onClick: handleGetStarted,
        }}
        secondaryCTA={{
          text: 'Watch Demo',
          onClick: handleWatchDemo,
        }}
        backgroundColor="bg-gradient-to-b from-bg-secondary to-bg-primary"
        minHeight="min-h-[600px] md:min-h-[700px]"
      />

      {/* Value Props Section */}
      <section className="bg-bg-primary py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary text-center mb-4">
            How It Works in 3 Steps
          </h2>
          <p className="text-center text-text-secondary text-lg mb-16 max-w-2xl mx-auto">
            Most companies waste 30% of AWS spend on unused instances, oversized configurations, and redundant resources.
            We find it. You fix it. You save money.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Connect Card */}
            <Card variant="elevated">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="text-4xl">🔗</div>
                  <div>
                    <h3 className="text-2xl font-bold text-text-primary">Connect</h3>
                    <p className="text-sm text-text-secondary">60 seconds setup</p>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <p className="text-text-secondary leading-relaxed">
                  Link your AWS account securely via read-only IAM role. All permissions are restricted — we
                  never modify your infrastructure.
                </p>
              </CardBody>
            </Card>

            {/* Analyze Card */}
            <Card variant="elevated">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="text-4xl">🔍</div>
                  <div>
                    <h3 className="text-2xl font-bold text-text-primary">Analyze</h3>
                    <p className="text-sm text-text-secondary">AI-powered scan</p>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <p className="text-text-secondary leading-relaxed">
                  Our AI scans your infrastructure and finds optimization opportunities custom to your setup.
                  Get detailed reports in minutes, not weeks.
                </p>
              </CardBody>
            </Card>

            {/* Optimize Card */}
            <Card variant="elevated">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="text-4xl">⚙️</div>
                  <div>
                    <h3 className="text-2xl font-bold text-text-primary">Optimize</h3>
                    <p className="text-sm text-text-secondary">Save up to 30%</p>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <p className="text-text-secondary leading-relaxed">
                  Approve recommendations one-by-one. We implement the changes and you see savings immediately
                  in your AWS billing.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="bg-bg-secondary py-20 px-4 sm:px-6 lg:px-8 border-y border-border-light">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-text-tertiary text-lg font-semibold mb-12 uppercase tracking-wide">
            Trusted by engineering teams at:
          </h2>

          {/* Company Logos */}
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 mb-16">
            {['Stripe', 'Notion', 'Retool', 'Figma', 'Vercel'].map((company) => (
              <div
                key={company}
                className="text-text-secondary font-bold text-lg px-6 py-4 rounded-lg border border-border-light bg-bg-primary"
              >
                {company}
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <Card variant="glass">
            <CardBody className="space-y-4">
              <p className="text-lg text-text-primary italic">
                "Found $8,400/month in wasted spend within the first week. Their recommendations were surgical — no
                performance impact, just pure savings."
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-border-light">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-text-inverse font-bold">
                  SC
                </div>
                <div>
                  <p className="font-semibold text-text-primary">Sarah Chen</p>
                  <p className="text-sm text-text-tertiary">Senior Cloud Architect, TechCorp</p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </section>

      {/* Key Metrics Section */}
      <section className="bg-bg-primary py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-5xl font-bold text-primary mb-2">$50K+</p>
              <p className="text-text-secondary">Average annual savings per customer</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-success mb-2">500+</p>
              <p className="text-text-secondary">Engineering teams optimizing costs</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-secondary mb-2">30%</p>
              <p className="text-text-secondary">Average AWS cost reduction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-bg-secondary py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary text-center mb-4">Powerful Features</h2>
          <p className="text-center text-text-secondary text-lg mb-16 max-w-2xl mx-auto">
            Everything you need to optimize your AWS infrastructure and reduce costs permanently.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <Card key={idx} variant="default">
                <CardBody className="space-y-4">
                  <div className="text-4xl">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-text-primary">{feature.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{feature.description}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="bg-bg-primary py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary text-center mb-4">Frequently Asked Questions</h2>
          <p className="text-center text-text-secondary text-lg mb-16">Everything you need to know about AWS Cost Optimizer</p>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <Card
                key={idx}
                variant="hover"
                className="cursor-pointer"
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
              >
                <CardBody className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-text-primary">{faq.question}</h3>
                    <span className={`text-2xl transition-transform duration-normal ${expandedFaq === idx ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
                  </div>
                  {expandedFaq === idx && (
                    <p className="text-text-secondary leading-relaxed border-t border-border-light pt-4">{faq.answer}</p>
                  )}
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="pricing" className="bg-bg-secondary py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">Ready to Reclaim Your AWS Budget?</h2>
          <p className="text-text-secondary text-xl mb-8 leading-relaxed">
            Get a free audit of your AWS account and see exactly how much you're overspending. No credit card. No
            commitment. Takes just 60 seconds.
          </p>

          <div className="bg-bg-tertiary border border-border-light rounded-lg p-8 md:p-12 space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-text-primary">Free Account Audit</h3>
              <p className="text-text-secondary">See personalized recommendations for your AWS infrastructure</p>
            </div>

            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleGetStarted}
              className="md:w-auto md:px-12"
            >
              Start Free Audit
            </Button>

            <p className="text-text-tertiary text-sm">← No credit card required. Results in 5 minutes.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-bg-primary border-t border-border-light py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-text-primary">AWS Cost Optimizer</h3>
              <p className="text-text-secondary text-sm">Stop wasting money on cloud infrastructure.</p>
              <div className="flex gap-4">
                <a href="#" className="text-text-tertiary hover:text-primary transition-colors">
                  Twitter
                </a>
                <a href="#" className="text-text-tertiary hover:text-primary transition-colors">
                  LinkedIn
                </a>
                <a href="#" className="text-text-tertiary hover:text-primary transition-colors">
                  GitHub
                </a>
              </div>
            </div>

            {/* Product */}
            <div className="space-y-4">
              <h4 className="font-semibold text-text-primary">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#features" className="text-text-secondary hover:text-primary transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-text-secondary hover:text-primary transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#faq" className="text-text-secondary hover:text-primary transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-text-secondary hover:text-primary transition-colors">
                    Documentation
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-4">
              <h4 className="font-semibold text-text-primary">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-text-secondary hover:text-primary transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-text-secondary hover:text-primary transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-text-secondary hover:text-primary transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-text-secondary hover:text-primary transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div className="space-y-4">
              <h4 className="font-semibold text-text-primary">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-text-secondary hover:text-primary transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-text-secondary hover:text-primary transition-colors">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="text-text-secondary hover:text-primary transition-colors">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="text-text-secondary hover:text-primary transition-colors">
                    Compliance
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border-light pt-8">
            <p className="text-text-tertiary text-sm text-center">
              &copy; 2025 AWS Cost Optimizer. All rights reserved. AWS is a registered trademark of Amazon Web Services,
              Inc.
            </p>
          </div>
        </div>
      </footer>

      {/* CTA Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Start Your Free Audit"
        size="md"
        footer={
          !submitted && (
            <div className="flex gap-4 justify-end">
              <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSubmitEmail} disabled={!email}>
                Get Audit
              </Button>
            </div>
          )
        }
      >
        {submitted ? (
          <div className="text-center space-y-4 py-8">
            <div className="text-5xl">✅</div>
            <p className="text-text-primary text-lg font-semibold">Check your email!</p>
            <p className="text-text-secondary">We'll send you a detailed cost analysis within 5 minutes.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-text-secondary">
              Enter your email to connect your AWS account and see personalized cost optimization recommendations. No
              credit card required.
            </p>
            <Input
              label="Work Email"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && email) {
                  handleSubmitEmail();
                }
              }}
            />
            <div className="bg-glass-light border border-glass-medium rounded-base p-4 text-sm text-text-secondary">
              <p>✓ Read-only AWS access</p>
              <p>✓ SOC 2 Type II certified</p>
              <p>✓ Free 14-day trial</p>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
