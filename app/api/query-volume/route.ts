import { NextRequest, NextResponse } from 'next/server';
import { queryLog } from '@/lib/mockData';

async function simulateLatency() {
  await new Promise((resolve) => setTimeout(resolve, 400));
}

export async function GET(request: NextRequest) {
  await simulateLatency();

  const model = request.nextUrl.searchParams.get('model');
  const status = request.nextUrl.searchParams.get('status');

  let result = [...queryLog];
  if (model && model !== 'All') {
    result = result.filter((entry) => entry.model === model);
  }
  if (status && status !== 'All') {
    result = result.filter((entry) => entry.status === status);
  }

  return NextResponse.json({ entries: result });
}
