import type { Metadata } from 'next';

import Medias from './_components/medias';
import { mediasService } from './_config/medias.service';

export const metadata: Metadata = { title: 'Medias' };

export default async function MediasPage() {
  const response = await mediasService.getAllMedias();
  return <Medias initialData={response} />;
}
