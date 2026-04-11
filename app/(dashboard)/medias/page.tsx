import type { Metadata } from 'next';
import { cookies } from 'next/headers';

import { MediaRecord } from '@/types/media';

import api from '@/lib/axios';
import { fallBackData } from '@/lib/utils';

import Medias from './_components/medias';

export const metadata: Metadata = { title: 'Medias' };

export default async function MediasPage() {
  const token = (await cookies()).get('accessToken')?.value;
  const response = await api
    .list<MediaRecord>('/medias', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch(() => fallBackData<MediaRecord>());
  return <Medias initialData={response} />;
}
