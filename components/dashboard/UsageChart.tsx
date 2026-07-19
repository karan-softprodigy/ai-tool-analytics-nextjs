'use client';

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card } from '../ui/Card';
import type { UsagePoint } from '@/types';

export function UsageChart({ data }: { data: UsagePoint[] }) {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display font-semibold">Request volume</h3>
        <span className="text-xs text-inkMuted">Daily requests</span>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="requestsFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F2A93B" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#F2A93B" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#2C2836" vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            fontSize={11}
            stroke="#A69FB0"
            tickFormatter={(value: string) => value.slice(5)}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            fontSize={11}
            stroke="#A69FB0"
            tickFormatter={(value: number) => `${Math.round(value / 1000)}k`}
          />
          <Tooltip
            contentStyle={{
              background: '#1D1A26',
              border: '1px solid #2C2836',
              borderRadius: 8,
              fontSize: 12,
              color: '#F5F1EA'
            }}
            formatter={(value: number) => [value.toLocaleString(), 'Requests']}
          />
          <Area type="monotone" dataKey="requests" stroke="#F2A93B" strokeWidth={2} fill="url(#requestsFill)" />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}
