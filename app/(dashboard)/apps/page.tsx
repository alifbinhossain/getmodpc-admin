import type { Metadata } from 'next';

import Apps from './_components/apps';
import { appsService } from './_config/apps.service';

export const metadata: Metadata = { title: 'Apps' };

export default async function AppsPage() {
  const response = await appsService.getApps();
  return <Apps initialData={response} />;
}
