import type { Metadata } from 'next';
import { cookies } from 'next/headers';

import { PageRecord } from '@/types/page';

import api from '@/lib/axios';
import { fallBackData } from '@/lib/utils';

import Pages from './_components/pages';

export const metadata: Metadata = { title: 'Pages' };

export default async function PagesPage() {
  const token = (await cookies()).get('accessToken')?.value;
  const response = await api
    .list<PageRecord>('/pages', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch(() => fallBackData<PageRecord>());
  return <Pages initialData={response} />;
}
