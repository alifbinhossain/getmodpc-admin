import type { Metadata } from 'next';
import { cookies } from 'next/headers';

import { TagAndDeveloperRecord } from '@/types/tagAndDeveloper';

import api from '@/lib/axios';
import { fallBackData } from '@/lib/utils';

import TagsComp from './_components/tags';

export const metadata: Metadata = { title: 'Tags' };

export default async function TagsPage() {
  const token = (await cookies()).get('accessToken')?.value;
  const response = await api
    .list<TagAndDeveloperRecord>('/tags', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch(() => fallBackData<TagAndDeveloperRecord>());
  return <TagsComp initialData={response} />;
}
