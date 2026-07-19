import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { formatRelativeTime } from '@/lib/format';
import type { Insight } from '@/types';

const SEVERITY_VARIANT: Record<Insight['severity'], 'info' | 'warning' | 'critical'> = {
  info: 'info',
  warning: 'warning',
  critical: 'critical'
};

export function InsightsList({ items }: { items: Insight[] }) {
  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display font-semibold">AI-generated insights</h3>
        <span className="text-xs text-inkMuted">Updated hourly</span>
      </div>
      <ul className="space-y-4">
        {items.map((insight) => (
          <li key={insight.id} className="border-b border-panelBorder pb-4 last:border-0 last:pb-0">
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm font-medium">{insight.title}</p>
              <Badge variant={SEVERITY_VARIANT[insight.severity]}>{insight.severity}</Badge>
            </div>
            <p className="mt-1.5 text-sm text-inkMuted">{insight.detail}</p>
            <p className="mt-2 font-mono text-xs text-inkMuted/70">
              {formatRelativeTime(insight.timestamp)}
            </p>
          </li>
        ))}
      </ul>
    </Card>
  );
}
