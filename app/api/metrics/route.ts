import { NextRequest, NextResponse } from 'next/server';
import { modelBreakdown, summaryStats, usageOverTime30d, usageOverTime7d } from '@/lib/mockData';

// Simulates network latency and an occasional transient failure so the
// client-side loading/error states are exercised by a real request.
async function simulateLatency() {
  await new Promise((resolve) => setTimeout(resolve, 400));
}

export async function GET(request: NextRequest) {
  await simulateLatency();

  const range = request.nextUrl.searchParams.get('range') ?? '30d';

  if (Math.random() < 0.03) {
    return NextResponse.json({ error: 'Upstream metrics service timed out.' }, { status: 503 });
  }

  return NextResponse.json({
    summary: summaryStats,
    usageOverTime: range === '7d' ? usageOverTime7d : usageOverTime30d,
    modelBreakdown
  });
}
