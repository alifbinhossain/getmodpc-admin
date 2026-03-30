import type { Metadata } from 'next';

import { ReportReasonTable } from './_components/report-reason-table';

export const metadata: Metadata = { title: 'Report Reason' };

export default async function ReportReasonPage() {

  return <ReportReasonTable data={[]} />;
}
