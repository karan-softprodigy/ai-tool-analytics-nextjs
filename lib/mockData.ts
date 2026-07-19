import type {
  Insight,
  ModelUsage,
  QueryLogEntry,
  SummaryStats,
  UsagePoint
} from '@/types';

export const summaryStats: SummaryStats = {
  totalRequests: 428_940,
  requestsChangePercent: 12.4,
  totalTokens: 96_400_000,
  tokensChangePercent: 18.1,
  totalCost: 8420.55,
  costChangePercent: 9.7,
  avgLatencyMs: 612,
  latencyChangePercent: -6.3
};

function buildUsageOverTime(days: number): UsagePoint[] {
  const points: UsagePoint[] = [];
  const today = new Date('2026-07-16');

  for (let i = days - 1; i >= 0; i -= 1) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const weekday = date.getDay();
    const isWeekend = weekday === 0 || weekday === 6;
    const base = isWeekend ? 9500 : 14800;
    const noise = Math.round(Math.sin(i / 3) * 1800 + Math.random() * 1200);
    const requests = Math.max(4000, base + noise);

    points.push({
      date: date.toISOString().slice(0, 10),
      requests,
      tokens: requests * (180 + Math.round(Math.random() * 60)),
      cost: Number((requests * 0.014 + Math.random() * 20).toFixed(2))
    });
  }

  return points;
}

export const usageOverTime30d = buildUsageOverTime(30);
export const usageOverTime7d = usageOverTime30d.slice(-7);

export const modelBreakdown: ModelUsage[] = [
  { model: 'claude-sonnet-5', requests: 218400, avgLatencyMs: 540, costPerThousand: 3.2, errorRate: 0.4 },
  { model: 'claude-haiku-4-5', requests: 142900, avgLatencyMs: 280, costPerThousand: 0.8, errorRate: 0.6 },
  { model: 'claude-opus-4-8', requests: 51600, avgLatencyMs: 980, costPerThousand: 12.5, errorRate: 0.3 },
  { model: 'claude-fable-5', requests: 16040, avgLatencyMs: 710, costPerThousand: 6.1, errorRate: 0.9 }
];

export const insights: Insight[] = [
  {
    id: 'ins-1',
    title: 'Latency regression on claude-opus-4-8',
    detail:
      'Average response time rose 22% over the last 24 hours for the summarization pipeline, concentrated in the EU region.',
    severity: 'warning',
    timestamp: '2026-07-16T06:40:00Z'
  },
  {
    id: 'ins-2',
    title: 'Cost efficiency opportunity',
    detail:
      'About 14% of claude-opus-4-8 requests use prompts under 200 tokens — these are strong candidates for claude-haiku-4-5 with minimal quality loss.',
    severity: 'info',
    timestamp: '2026-07-16T02:15:00Z'
  },
  {
    id: 'ins-3',
    title: 'Error spike resolved',
    detail:
      'The elevated timeout rate on claude-fable-5 between 11:00 and 11:40 UTC has returned to baseline after upstream retry logic was deployed.',
    severity: 'info',
    timestamp: '2026-07-15T11:55:00Z'
  },
  {
    id: 'ins-4',
    title: 'Unusual traffic pattern detected',
    detail:
      'Request volume from the "billing-service" API key is running 4x above its 30-day average. Confirm this is expected before it affects your monthly quota.',
    severity: 'critical',
    timestamp: '2026-07-15T09:02:00Z'
  }
];

const PROMPT_SAMPLES = [
  'Summarize the attached quarterly earnings call transcript.',
  'Draft a release note for the new billing API.',
  'Classify this support ticket by urgency and topic.',
  'Generate test cases for the checkout flow.',
  'Translate this onboarding email into Spanish.',
  'Extract line items from this invoice PDF.',
  'Explain why this SQL query is running slowly.',
  'Write a changelog entry summarizing this diff.'
];

function buildQueryLog(count: number): QueryLogEntry[] {
  const entries: QueryLogEntry[] = [];
  const models = modelBreakdown.map((m) => m.model);
  const start = new Date('2026-07-16T08:00:00Z').getTime();

  for (let i = 0; i < count; i += 1) {
    const model = models[i % models.length];
    const roll = Math.random();
    const status: QueryLogEntry['status'] = roll < 0.92 ? 'success' : roll < 0.97 ? 'error' : 'timeout';

    entries.push({
      id: `q-${1000 + i}`,
      model,
      prompt: PROMPT_SAMPLES[i % PROMPT_SAMPLES.length],
      latencyMs: Math.round(220 + Math.random() * 900),
      tokens: Math.round(120 + Math.random() * 2400),
      status,
      timestamp: new Date(start - i * 6 * 60 * 1000).toISOString()
    });
  }

  return entries;
}

export const queryLog: QueryLogEntry[] = buildQueryLog(48);
