import type { Metadata } from 'next';
import { cookies } from 'next/headers';

import { ReportReasonRecord } from '@/types/report-reason';

import api from '@/lib/axios';
import { fallBackData } from '@/lib/utils';

import ReportReasons from './_components/report-reasons';

export const metadata: Metadata = { title: 'Report Reasons' };

export default async function ReportReasonPage() {
  const token = (await cookies()).get('accessToken')?.value;
  const response = await api
    .list<ReportReasonRecord>('/report-reasons', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch(() => fallBackData<ReportReasonRecord>());
  return <ReportReasons initialData={response} />;
}
