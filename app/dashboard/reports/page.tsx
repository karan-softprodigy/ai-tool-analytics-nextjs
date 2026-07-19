'use client';

import { useState } from 'react';
import { Topbar } from '@/components/layout/Topbar';
import { Card } from '@/components/ui/Card';
import { QueryLogTable } from '@/components/dashboard/QueryLogTable';
import { Spinner, ErrorState, EmptyState } from '@/components/ui/States';
import { useApiData } from '@/hooks/useApiData';
import { modelBreakdown } from '@/lib/mockData';
import type { QueryLogEntry } from '@/types';

const MODEL_OPTIONS = ['All', ...modelBreakdown.map((m) => m.model)];
const STATUS_OPTIONS = ['All', 'success', 'error', 'timeout'];

export default function ReportsPage() {
  const [model, setModel] = useState('All');
  const [status, setStatus] = useState('All');

  const { data, status: fetchStatus, error, refetch } = useApiData<{ entries: QueryLogEntry[] }>(
    `/api/query-volume?model=${model}&status=${status}`,
    [model, status]
  );

  return (
    <>
      <Topbar title="Query logs" subtitle="Recent requests across all connected models" />

      <div className="p-6">
        <Card>
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-2">
              <select
                value={model}
                onChange={(event) => setModel(event.target.value)}
                className="rounded-md border border-panelBorder bg-transparent px-3 py-2 text-sm"
              >
                {MODEL_OPTIONS.map((option) => (
                  <option key={option} value={option} className="bg-panel">
                    {option}
                  </option>
                ))}
              </select>
              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="rounded-md border border-panelBorder bg-transparent px-3 py-2 text-sm"
              >
                {STATUS_OPTIONS.map((option) => (
                  <option key={option} value={option} className="bg-panel">
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <span className="text-xs text-inkMuted">
              {data ? `${data.entries.length} results` : ''}
            </span>
          </div>

          {fetchStatus === 'loading' || fetchStatus === 'idle' ? (
            <Spinner label="Loading query logs" />
          ) : fetchStatus === 'error' ? (
            <ErrorState message={error} onRetry={refetch} />
          ) : data && data.entries.length === 0 ? (
            <EmptyState title="No requests match your filters" description="Try a different model or status." />
          ) : (
            data && <QueryLogTable entries={data.entries} />
          )}
        </Card>
      </div>
    </>
  );
}
