import type { Metadata } from 'next';

import Developers from './_components/developers';
import { developersService } from './_config/developers.service';

export const metadata: Metadata = { title: 'Developers' };

export default async function DevelopersPage() {
  const response = await developersService.getDevelopers();
  return <Developers initialData={response} />;
}
