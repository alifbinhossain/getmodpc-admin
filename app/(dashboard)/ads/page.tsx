import type { Metadata } from 'next';
import { cookies } from 'next/headers';

import { AdRecord } from '@/types/ad';

import api from '@/lib/axios';
import { fallBackData } from '@/lib/utils';

import Ads from './_components/ads';

export const metadata: Metadata = {
  title: 'Ads',
};

export default async function AdsPage() {
  const token = (await cookies()).get('accessToken')?.value;
  const response = await api
    .list<AdRecord>('/ads', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch(() => fallBackData<AdRecord>());
  return <Ads initialData={response} />;
}
