import { Card } from '../ui/Card';

interface KpiCardProps {
  label: string;
  value: string;
  changePercent: number;
}

export function KpiCard({ label, value, changePercent }: KpiCardProps) {
  const isPositive = changePercent >= 0;

  return (
    <Card className="relative overflow-hidden">
      <div className="pulse-line absolute inset-x-0 top-0 h-0.5" aria-hidden="true" />
      <p className="text-xs uppercase tracking-wider text-inkMuted">{label}</p>
      <p className="mt-2 font-mono text-2xl font-semibold">{value}</p>
      <p className={`mt-2 text-xs font-medium ${isPositive ? 'text-teal' : 'text-rose'}`}>
        {isPositive ? '↑' : '↓'} {Math.abs(changePercent)}% vs previous period
      </p>
    </Card>
  );
}
