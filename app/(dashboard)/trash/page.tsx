import type { Metadata } from 'next';

import { appsService } from '../apps/_config/apps.service';
import TrashApps from './_components/trash-apps';

export const metadata: Metadata = { title: 'Trash' };

export default async function TrashPage() {
  const response = await appsService.getAllSoftDeleteApps();
  return <TrashApps initialData={response} />;
}
