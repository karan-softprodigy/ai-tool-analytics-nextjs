import { NextResponse } from 'next/server';
import { insights } from '@/lib/mockData';

async function simulateLatency() {
  await new Promise((resolve) => setTimeout(resolve, 350));
}

export async function GET() {
  await simulateLatency();
  return NextResponse.json({ insights });
}
