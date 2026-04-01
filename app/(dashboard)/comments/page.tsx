import type { Metadata } from 'next';

import Comments from './_components/comments';
import { commentsService } from './_config/comments.service';

export const metadata: Metadata = { title: 'Comments' };

export default async function CommentsPage() {
  const response = await commentsService.getComments();
  return <Comments initialData={response} />;
}
