'use client';

import { useState } from 'react';
import { Topbar } from '@/components/layout/Topbar';
import { KpiCard } from '@/components/dashboard/KpiCard';
import { UsageChart } from '@/components/dashboard/UsageChart';
import { ModelBreakdownChart } from '@/components/dashboard/ModelBreakdownChart';
import { InsightsList } from '@/components/dashboard/InsightsList';
import { Spinner, ErrorState, CardSkeleton } from '@/components/ui/States';
import { Card } from '@/components/ui/Card';
import { useApiData } from '@/hooks/useApiData';
import { formatCompactNumber, formatCurrency, formatMilliseconds } from '@/lib/format';
import type { Insight, MetricsResponse } from '@/types';

export default function DashboardOverviewPage() {
  const [range, setRange] = useState<'7d' | '30d'>('30d');

  const metrics = useApiData<MetricsResponse>(`/api/metrics?range=${range}`, [range]);
  const insightsData = useApiData<{ insights: Insight[] }>('/api/insights');

  return (
    <>
      <Topbar title="Overview" subtitle="Model usage, cost, and reliability at a glance" />

      <div className="space-y-6 p-6">
        <div className="flex justify-end gap-2">
          {(['7d', '30d'] as const).map((option) => (
            <button
              key={option}
              onClick={() => setRange(option)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                range === option ? 'bg-amber-soft text-amber' : 'text-inkMuted hover:bg-white/5'
              }`}
            >
              Last {option}
            </button>
          ))}
        </div>

        {metrics.status === 'loading' || metrics.status === 'idle' ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Card key={index}>
                <CardSkeleton />
              </Card>
            ))}
          </div>
        ) : metrics.status === 'error' ? (
          <ErrorState message={metrics.error} onRetry={metrics.refetch} />
        ) : (
          metrics.data && (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <KpiCard
                  label="Total requests"
                  value={formatCompactNumber(metrics.data.summary.totalRequests)}
                  changePercent={metrics.data.summary.requestsChangePercent}
                />
                <KpiCard
                  label="Tokens processed"
                  value={formatCompactNumber(metrics.data.summary.totalTokens)}
                  changePercent={metrics.data.summary.tokensChangePercent}
                />
                <KpiCard
                  label="Total spend"
                  value={formatCurrency(metrics.data.summary.totalCost)}
                  changePercent={metrics.data.summary.costChangePercent}
                />
                <KpiCard
                  label="Avg latency"
                  value={formatMilliseconds(metrics.data.summary.avgLatencyMs)}
                  changePercent={metrics.data.summary.latencyChangePercent}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <UsageChart data={metrics.data.usageOverTime} />
                <ModelBreakdownChart data={metrics.data.modelBreakdown} />
              </div>
            </>
          )
        )}

        {insightsData.status === 'loading' || insightsData.status === 'idle' ? (
          <Spinner label="Loading insights" />
        ) : insightsData.status === 'error' ? (
          <ErrorState message={insightsData.error} onRetry={insightsData.refetch} />
        ) : (
          insightsData.data && <InsightsList items={insightsData.data.insights} />
        )}
      </div>
    </>
  );
}
