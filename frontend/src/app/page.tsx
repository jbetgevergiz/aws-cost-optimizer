'use client';

import { useState } from 'react';
import { Button, Card, CardBody, CardHeader, Input, Modal, Hero, Navigation } from '@/components';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Navigation */}
      <Navigation
        logoText="AWS Cost Optimizer"
        navItems={[
          { label: 'Features', href: '#features', isActive: false },
          { label: 'Pricing', href: '#pricing', isActive: false },
          { label: 'Documentation', href: '/docs', isActive: false },
          { label: 'Blog', href: '/blog', isActive: false },
        ]}
        ctaButton={{
          text: 'Get Started',
          onClick: () => setIsModalOpen(true),
        }}
      />

      {/* Hero Section */}
      <Hero
        title="Find $1000s in Wasted AWS Spend"
        subtitle="AWS Cost Optimization"
        description="Analyze your AWS costs in minutes and find unused resources, inefficient configurations, and quick savings opportunities."
        primaryCTA={{
          text: 'Start Free Analysis',
          onClick: () => setIsModalOpen(true),
        }}
        secondaryCTA={{
          text: 'Watch Demo',
          onClick: () => console.log('Demo clicked'),
        }}
      />

      {/* Component Showcase */}
      <section className="bg-bg-primary py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-text-primary mb-12 text-center">Design System Components</h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Buttons */}
            <Card variant="elevated">
              <CardHeader>
                <h3 className="text-2xl font-bold text-text-primary">Buttons</h3>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  <Button variant="primary">Primary Button</Button>
                  <Button variant="secondary">Secondary Button</Button>
                  <Button variant="outline">Outline Button</Button>
                  <Button variant="ghost">Ghost Button</Button>
                  <Button variant="danger">Danger Button</Button>
                  <Button variant="primary" isLoading>
                    Loading...
                  </Button>
                </div>
              </CardBody>
            </Card>

            {/* Cards */}
            <Card variant="glass">
              <CardHeader>
                <h3 className="text-2xl font-bold text-text-primary">Card Variants</h3>
              </CardHeader>
              <CardBody>
                <div className="space-y-3">
                  <Card variant="default">
                    <CardBody>Default Card</CardBody>
                  </Card>
                  <Card variant="elevated">
                    <CardBody>Elevated Card</CardBody>
                  </Card>
                  <Card variant="hover">
                    <CardBody>Hover Card (interactive)</CardBody>
                  </Card>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Forms */}
          <Card variant="elevated" className="mb-12">
            <CardHeader>
              <h3 className="text-2xl font-bold text-text-primary">Form Inputs</h3>
            </CardHeader>
            <CardBody className="space-y-6">
              <Input label="Email Address" type="email" placeholder="you@example.com" />
              <Input
                label="Password"
                type="password"
                placeholder="Enter password"
                error="Password must be at least 8 characters"
              />
              <Input
                label="API Key"
                type="text"
                placeholder="aws-****"
                helperText="Your API key is encrypted and stored securely"
              />
            </CardBody>
          </Card>

          {/* Sizes and States */}
          <Card variant="default">
            <CardHeader>
              <h3 className="text-2xl font-bold text-text-primary">Button Sizes & Widths</h3>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="space-y-2">
                <label className="text-text-secondary text-sm">Small</label>
                <Button size="sm">Small Button</Button>
              </div>
              <div className="space-y-2">
                <label className="text-text-secondary text-sm">Medium</label>
                <Button size="md">Medium Button</Button>
              </div>
              <div className="space-y-2">
                <label className="text-text-secondary text-sm">Large</label>
                <Button size="lg">Large Button</Button>
              </div>
              <div className="space-y-2">
                <label className="text-text-secondary text-sm">Full Width</label>
                <Button fullWidth>Full Width Button</Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </section>

      {/* Modal Test */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Get Started with AWS Cost Optimizer"
        size="lg"
        footer={
          <div className="flex gap-4 justify-end">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setIsModalOpen(false)}>
              Continue
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <p className="text-text-secondary">
            Connect your AWS account to start analyzing your costs. We'll scan your infrastructure in real-time.
          </p>
          <Input label="AWS Account ID" placeholder="123456789012" />
        </div>
      </Modal>

      {/* Footer */}
      <footer className="bg-bg-secondary border-t border-border-light py-12 px-4">
        <div className="max-w-7xl mx-auto text-center text-text-tertiary">
          <p>&copy; 2025 AWS Cost Optimizer. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
