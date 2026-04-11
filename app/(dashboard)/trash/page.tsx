import type { Metadata } from 'next';
import { cookies } from 'next/headers';

import { AppRecord } from '@/types/app';

import api from '@/lib/axios';
import { fallBackData } from '@/lib/utils';

import TrashApps from './_components/trash-apps';

export const metadata: Metadata = { title: 'Trash' };

export default async function TrashPage() {
  const token = (await cookies()).get('accessToken')?.value;
  const response = await api
    .list<AppRecord>('/apps/soft-deleted-apps', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch(() => fallBackData<AppRecord>());
  return <TrashApps initialData={response} />;
}
