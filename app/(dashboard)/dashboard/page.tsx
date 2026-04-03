import type { Metadata } from 'next';

import { IDashboard } from '@/types';

import { StatsCards } from '@/components/shared/stats-cards';

import api from '@/lib/axios';

export const metadata: Metadata = { title: 'Dashboard' };

export default async function DashboardPage() {
  const data = await api
    .get<IDashboard[]>('/apps/dashboard')
    .then((r) => r.data)
    .catch((e) => {});
  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-2xl font-bold tracking-tight'>Dashboard</h1>
        <p className='text-muted-foreground'>
          Welcome back! Here&apos;s what&apos;s happening today.
        </p>
      </div>
      <StatsCards stats={data ?? []} />
    </div>
  );
}
