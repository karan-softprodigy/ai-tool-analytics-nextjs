export interface UsagePoint {
  date: string;
  requests: number;
  tokens: number;
  cost: number;
}

export interface ModelUsage {
  model: string;
  requests: number;
  avgLatencyMs: number;
  costPerThousand: number;
  errorRate: number;
}

export interface Insight {
  id: string;
  title: string;
  detail: string;
  severity: 'info' | 'warning' | 'critical';
  timestamp: string;
}

export interface QueryLogEntry {
  id: string;
  model: string;
  prompt: string;
  latencyMs: number;
  tokens: number;
  status: 'success' | 'error' | 'timeout';
  timestamp: string;
}

export interface SummaryStats {
  totalRequests: number;
  requestsChangePercent: number;
  totalTokens: number;
  tokensChangePercent: number;
  totalCost: number;
  costChangePercent: number;
  avgLatencyMs: number;
  latencyChangePercent: number;
}

export interface MetricsResponse {
  summary: SummaryStats;
  usageOverTime: UsagePoint[];
  modelBreakdown: ModelUsage[];
}
