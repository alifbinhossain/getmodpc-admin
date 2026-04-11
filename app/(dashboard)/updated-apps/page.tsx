import type { Metadata } from 'next';
import { cookies } from 'next/headers';

import { AppRecord, UpdatedAppRecord } from '@/types/app';

import api from '@/lib/axios';
import { fallBackData } from '@/lib/utils';

import UpdatedApps from './_components/updated-apps';

export const metadata: Metadata = { title: 'Updated Apps' };

export default async function UpdatedAppsPage() {
  const token = (await cookies()).get('accessToken')?.value;
  const response = await api
    .list<UpdatedAppRecord>('/apps/updated-apps', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch(() => fallBackData<UpdatedAppRecord>());
  return <UpdatedApps initialData={response} />;
}
