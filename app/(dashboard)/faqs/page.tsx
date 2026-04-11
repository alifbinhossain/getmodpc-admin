import type { Metadata } from 'next';
import { cookies } from 'next/headers';

import { FaqRecord } from '@/types/faq';

import api from '@/lib/axios';
import { fallBackData } from '@/lib/utils';

import Faqs from './_components/faqs';

export const metadata: Metadata = { title: 'Faqs' };

export default async function FaqsPage() {
  const token = (await cookies()).get('accessToken')?.value;
  const response = await api
    .list<FaqRecord>('/faqs', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch(() => fallBackData<FaqRecord>());
  return <Faqs initialData={response} />;
}
