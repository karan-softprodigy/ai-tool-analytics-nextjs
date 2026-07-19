import { Topbar } from '@/components/layout/Topbar';
import { Card } from '@/components/ui/Card';
import { modelBreakdown } from '@/lib/mockData';
import { formatCompactNumber, formatMilliseconds } from '@/lib/format';

// Server component: this data is read directly at render time rather than
// through a client fetch, since the page has no interactive filters.
export default async function ModelsPage() {
  const models = modelBreakdown;

  return (
    <>
      <Topbar title="Models" subtitle="Compare cost, latency, and reliability across models" />

      <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 xl:grid-cols-4">
        {models.map((model) => (
          <Card key={model.model}>
            <p className="font-mono text-xs text-inkMuted">{model.model}</p>
            <p className="mt-3 font-display text-xl font-semibold">
              {formatCompactNumber(model.requests)}
            </p>
            <p className="text-xs text-inkMuted">requests this period</p>

            <dl className="mt-5 space-y-2 border-t border-panelBorder pt-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-inkMuted">Avg latency</dt>
                <dd className="font-mono">{formatMilliseconds(model.avgLatencyMs)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-inkMuted">Cost / 1k tokens</dt>
                <dd className="font-mono">${model.costPerThousand.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-inkMuted">Error rate</dt>
                <dd className={`font-mono ${model.errorRate > 0.7 ? 'text-rose' : 'text-teal'}`}>
                  {model.errorRate}%
                </dd>
              </div>
            </dl>
          </Card>
        ))}
      </div>
    </>
  );
}
