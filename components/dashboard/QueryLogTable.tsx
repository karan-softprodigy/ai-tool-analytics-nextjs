'use client';

import { Badge } from '../ui/Badge';
import { formatMilliseconds } from '@/lib/format';
import type { QueryLogEntry } from '@/types';

const STATUS_VARIANT: Record<QueryLogEntry['status'], 'success' | 'critical' | 'warning'> = {
  success: 'success',
  error: 'critical',
  timeout: 'warning'
};

export function QueryLogTable({ entries }: { entries: QueryLogEntry[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-panelBorder text-xs uppercase tracking-wider text-inkMuted">
            <th className="py-3 pr-4 font-medium">Prompt</th>
            <th className="py-3 pr-4 font-medium">Model</th>
            <th className="py-3 pr-4 font-medium">Latency</th>
            <th className="py-3 pr-4 font-medium">Tokens</th>
            <th className="py-3 pr-4 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.id} className="border-b border-panelBorder/60 last:border-0">
              <td className="max-w-xs truncate py-3 pr-4">{entry.prompt}</td>
              <td className="py-3 pr-4 font-mono text-xs text-inkMuted">{entry.model}</td>
              <td className="py-3 pr-4 font-mono text-xs">{formatMilliseconds(entry.latencyMs)}</td>
              <td className="py-3 pr-4 font-mono text-xs">{entry.tokens.toLocaleString()}</td>
              <td className="py-3 pr-4">
                <Badge variant={STATUS_VARIANT[entry.status]}>{entry.status}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
