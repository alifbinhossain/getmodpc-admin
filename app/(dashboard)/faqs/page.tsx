import type { Metadata } from 'next';

import Faqs from './_components/faqs';
import { faqsService } from './_config/faqs.service';

export const metadata: Metadata = { title: 'Faqs' };

export default async function FaqsPage() {
  const response = await faqsService.getFaqs();
  return <Faqs initialData={response} />;
}
