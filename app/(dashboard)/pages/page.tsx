import type { Metadata } from 'next';

import Pages from './_components/pages';
import { pagesService } from './_config/pages.service';

export const metadata: Metadata = { title: 'Pages' };

export default async function PagesPage() {
  const response = await pagesService.getPages();
  return <Pages initialData={response} />;
}
