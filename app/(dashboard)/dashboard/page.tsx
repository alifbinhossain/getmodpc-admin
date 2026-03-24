import type { Metadata } from 'next';

import { StatsCards } from '@/components/shared/stats-cards';

export const metadata: Metadata = { title: 'Dashboard' };

export default function DashboardPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-2xl font-bold tracking-tight'>Dashboard</h1>
        <p className='text-muted-foreground'>
          Welcome back! Here&apos;s what&apos;s happening today.
        </p>
      </div>
      <StatsCards />
    </div>
  );
}
