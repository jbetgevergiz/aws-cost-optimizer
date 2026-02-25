'use client';

import { useState } from 'react';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { MetricCard } from '@/components/MetricCard';
import { RecommendationItem } from '@/components/RecommendationItem';
import { CostVisualization } from '@/components/3d/CostVisualization';
import { SavingsAnimation } from '@/components/3d/SavingsAnimation';

interface RecommendationState {
  id: string;
  status: 'pending' | 'applied' | 'rolled_back';
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'settings'>('dashboard');
  const [recommendations, setRecommendations] = useState<RecommendationState[]>([
    { id: 'rds', status: 'pending' },
    { id: 'ec2', status: 'pending' },
    { id: 's3', status: 'pending' },
  ]);

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '📊',
      isActive: activeTab === 'dashboard',
      onClick: () => setActiveTab('dashboard'),
    },
    {
      id: 'recommendations',
      label: 'Recommendations',
      icon: '💡',
      isActive: false,
      onClick: () => setActiveTab('dashboard'),
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: '⚙️',
      isActive: activeTab === 'settings',
      onClick: () => setActiveTab('settings'),
    },
    {
      id: 'logout',
      label: 'Logout',
      icon: '🚪',
      isActive: false,
      onClick: () => console.log('Logout clicked'),
    },
  ];

  const recommendationsData = [
    {
      id: 'rds',
      title: 'Stop Unused RDS Database',
      description: 'Database "prod-old" has no connections for 30 days.',
      savingsPerMonth: 1200,
    },
    {
      id: 'ec2',
      title: 'Rightsize EC2 Instances',
      description: '5 instances are consistently underutilized (avg CPU <5%).',
      savingsPerMonth: 850,
    },
    {
      id: 's3',
      title: 'Enable S3 Lifecycle Policies',
      description: '42GB of old data in standard tier could be moved to Glacier.',
      savingsPerMonth: 420,
    },
  ];

  const handleApplyRecommendation = (id: string) => {
    setRecommendations((prev) =>
      prev.map((rec) => (rec.id === id ? { ...rec, status: 'applied' as const } : rec))
    );
  };

  const handleRollbackRecommendation = (id: string) => {
    setRecommendations((prev) =>
      prev.map((rec) => (rec.id === id ? { ...rec, status: 'rolled_back' as const } : rec))
    );
  };

  const appliedCount = recommendations.filter((r) => r.status === 'applied').length;

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <DashboardSidebar navItems={navItems} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <DashboardHeader title="AWS Cost Optimizer" />

        <main
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '2rem',
            backgroundColor: 'var(--color-bg-primary)',
          }}
        >
          {activeTab === 'dashboard' && (
            <div>
              {/* Top Metrics */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '1.5rem',
                  marginBottom: '2rem',
                }}
              >
                <MetricCard
                  title="Current Month Cost"
                  value="$12,450"
                  icon="💰"
                  change="↑ 5% vs last month"
                  trend="up"
                />
                <MetricCard
                  title="Potential Savings"
                  value="$3,720"
                  icon="🎯"
                  change="From 23 recommendations"
                  trend="neutral"
                />
                <MetricCard
                  title="Savings Rate"
                  value="29.8%"
                  icon="📈"
                  change={`${appliedCount} applied`}
                  trend="up"
                />
                <MetricCard
                  title="Active Recommendations"
                  value="23"
                  icon="⚡"
                  change="High priority"
                  trend="neutral"
                />
              </div>

              {/* Three.js Cost Visualization */}
              <section style={{ marginBottom: '2rem' }}>
                <h2
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    marginBottom: '1rem',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  Cost Breakdown by Service
                </h2>
                <div
                  style={{
                    borderRadius: '0.75rem',
                    overflow: 'hidden',
                    backgroundColor: 'var(--color-bg-secondary)',
                    border: '1px solid var(--color-border-light)',
                  }}
                >
                  <CostVisualization />
                </div>
              </section>

              {/* Savings Animation */}
              <section style={{ marginBottom: '2rem' }}>
                <div
                  style={{
                    borderRadius: '0.75rem',
                    overflow: 'hidden',
                    backgroundColor: 'var(--color-bg-secondary)',
                    border: '1px solid var(--color-border-light)',
                    position: 'relative',
                    minHeight: '300px',
                  }}
                >
                  <SavingsAnimation amount={3720} />
                </div>
              </section>

              {/* Recommendations */}
              <section>
                <h2
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    marginBottom: '1rem',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  Top Recommendations
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {recommendationsData.map((rec) => {
                    const recState = recommendations.find((r) => r.id === rec.id);
                    return (
                      <RecommendationItem
                        key={rec.id}
                        title={rec.title}
                        description={rec.description}
                        savingsPerMonth={rec.savingsPerMonth}
                        status={recState?.status || 'pending'}
                        onApply={() => handleApplyRecommendation(rec.id)}
                        onRollback={() => handleRollbackRecommendation(rec.id)}
                      />
                    );
                  })}
                </div>
              </section>
            </div>
          )}

          {activeTab === 'settings' && (
            <div style={{ maxWidth: '600px' }}>
              <h1
                style={{
                  fontSize: '2rem',
                  fontWeight: 700,
                  marginBottom: '2rem',
                  color: 'var(--color-text-primary)',
                }}
              >
                Settings
              </h1>

              {/* AWS Credentials */}
              <div
                style={{
                  marginBottom: '2rem',
                  padding: '1.5rem',
                  borderRadius: '0.75rem',
                  border: '1px solid var(--color-border-light)',
                  backgroundColor: 'var(--color-bg-secondary)',
                }}
              >
                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    marginBottom: '1rem',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  AWS Credentials
                </h3>
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
                  Currently connected to: <strong>AWS Account 123456789012</strong>
                </p>
                <button
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: 'var(--color-primary)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    fontWeight: 600,
                  }}
                >
                  Reconnect Account
                </button>
              </div>

              {/* Notification Preferences */}
              <div
                style={{
                  marginBottom: '2rem',
                  padding: '1.5rem',
                  borderRadius: '0.75rem',
                  border: '1px solid var(--color-border-light)',
                  backgroundColor: 'var(--color-bg-secondary)',
                }}
              >
                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    marginBottom: '1rem',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  Notification Preferences
                </h3>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '0.75rem',
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="checkbox"
                    defaultChecked
                    style={{ width: '1.25rem', height: '1.25rem', cursor: 'pointer' }}
                  />
                  <span style={{ color: 'var(--color-text-primary)' }}>
                    Email alerts for new recommendations
                  </span>
                </label>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '0.75rem',
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="checkbox"
                    defaultChecked
                    style={{ width: '1.25rem', height: '1.25rem', cursor: 'pointer' }}
                  />
                  <span style={{ color: 'var(--color-text-primary)' }}>
                    Weekly cost summary
                  </span>
                </label>
              </div>

              {/* Data Management */}
              <div
                style={{
                  padding: '1.5rem',
                  borderRadius: '0.75rem',
                  border: '1px solid var(--color-border-light)',
                  backgroundColor: 'var(--color-bg-secondary)',
                }}
              >
                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    marginBottom: '1rem',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  Data Management
                </h3>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <button
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: 'transparent',
                      color: 'var(--color-primary)',
                      border: '1px solid var(--color-primary)',
                      borderRadius: '0.5rem',
                      cursor: 'pointer',
                      fontWeight: 600,
                    }}
                  >
                    Export Data
                  </button>
                  <button
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: 'var(--color-error)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.5rem',
                      cursor: 'pointer',
                      fontWeight: 600,
                    }}
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
