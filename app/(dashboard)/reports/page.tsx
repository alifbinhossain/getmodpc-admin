import type { Metadata } from 'next';
import { cookies } from 'next/headers';

import { ReportRecord } from '@/types/report';

import api from '@/lib/axios';
import { fallBackData } from '@/lib/utils';

import Reports from './_components/reports';

export const metadata: Metadata = { title: 'Reports' };

export default async function ReportsPage() {
  const token = (await cookies()).get('accessToken')?.value;
  const response = await api
    .list<ReportRecord>('/reports', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch(() => fallBackData<ReportRecord>());
  return <Reports initialData={response} />;
}
