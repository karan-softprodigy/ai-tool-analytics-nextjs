'use client';

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card } from '../ui/Card';
import type { ModelUsage } from '@/types';

export function ModelBreakdownChart({ data }: { data: ModelUsage[] }) {
  return (
    <Card>
      <h3 className="mb-4 font-display font-semibold">Requests by model</h3>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2C2836" horizontal={false} />
          <XAxis type="number" tickLine={false} axisLine={false} fontSize={11} stroke="#A69FB0" />
          <YAxis
            type="category"
            dataKey="model"
            tickLine={false}
            axisLine={false}
            fontSize={11}
            width={130}
            stroke="#A69FB0"
          />
          <Tooltip
            contentStyle={{
              background: '#1D1A26',
              border: '1px solid #2C2836',
              borderRadius: 8,
              fontSize: 12,
              color: '#F5F1EA'
            }}
          />
          <Bar dataKey="requests" fill="#4FD1C5" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
