import type { Metadata } from 'next';

import TagsComp from './_components/tags';
import { tagsService } from './_config/tags.service';

export const metadata: Metadata = { title: 'Report Reason' };

export default async function TagsPage() {
  const response = await tagsService.getTags();
  return <TagsComp initialData={response} />;
}
