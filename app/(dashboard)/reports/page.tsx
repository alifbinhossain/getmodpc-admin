import type { Metadata } from 'next';

import Reports from './_components/reports';
import { reportsService } from './_config/reports.service';

export const metadata: Metadata = { title: 'Report Reason' };

export default async function ReportsPage() {
  const response = await reportsService.getReports();
  return <Reports initialData={response} />;
}
