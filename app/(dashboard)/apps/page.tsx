import type { Metadata } from 'next';
import { cookies } from 'next/headers';

import { AppRecord } from '@/types/app';

import api from '@/lib/axios';
import { fallBackData } from '@/lib/utils';

import Apps from './_components/apps';

export const metadata: Metadata = { title: 'Apps' };

export default async function AppsPage() {
  const token = (await cookies()).get('accessToken')?.value;
  const response = await api
    .list<AppRecord>('/apps', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch(() => fallBackData<AppRecord>());
  return <Apps initialData={response} />;
}
