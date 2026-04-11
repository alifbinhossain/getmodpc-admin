import type { Metadata } from 'next';
import { cookies } from 'next/headers';

import { IDashboard } from '@/types';

import { StatsCards } from '@/components/shared/stats-cards';

import api from '@/lib/axios';

import { DateFilters } from './_components/date-filters';

export const metadata: Metadata = { title: 'Dashboard' };

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
export default async function DashboardPage({ searchParams }: Props) {
  const searchParamsResolved = await searchParams;
  const token = (await cookies()).get('accessToken')?.value;
  const data = await api
    .get<IDashboard[]>('/apps/dashboard', {
      params: {
        startDate: searchParamsResolved?.startDate,
        endDate: searchParamsResolved?.endDate,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((r) => r.data)
    .catch(() => {});
  return (
    <div className='space-y-6'>
      <div className='flex justify-between gap-2'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>Dashboard</h1>
          <p className='text-muted-foreground'>
            Welcome back! Here&apos;s what&apos;s happening today.
          </p>
        </div>
        <DateFilters />
      </div>
      <StatsCards stats={data ?? []} />
    </div>
  );
}
