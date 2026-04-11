import type { Metadata } from 'next';
import { cookies } from 'next/headers';

import { TagAndDeveloperRecord } from '@/types/tagAndDeveloper';

import api from '@/lib/axios';
import { fallBackData } from '@/lib/utils';

import Developers from './_components/developers';

export const metadata: Metadata = { title: 'Developers' };

export default async function DevelopersPage() {
  const token = (await cookies()).get('accessToken')?.value;
  const response = await api
    .list<TagAndDeveloperRecord>('/developers', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch(() => fallBackData<TagAndDeveloperRecord>());
  return <Developers initialData={response} />;
}
