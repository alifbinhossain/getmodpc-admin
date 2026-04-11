import type { Metadata } from 'next';
import { cookies } from 'next/headers';

import { CommentRecord } from '@/types/comment';

import api from '@/lib/axios';
import { fallBackData } from '@/lib/utils';

import Comments from './_components/comments';

export const metadata: Metadata = { title: 'Comments' };

export default async function CommentsPage() {
  const token = (await cookies()).get('accessToken')?.value;
  const response = await api
    .list<CommentRecord>('/comments', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch(() => fallBackData<CommentRecord>());
  return <Comments initialData={response} />;
}
