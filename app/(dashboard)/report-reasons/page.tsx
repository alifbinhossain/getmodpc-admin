import type { Metadata } from 'next';

import { ReportReasonTable } from './_components/report-reason-table';
import { reportReasonsService } from './_config/report-reasons.service';

export const metadata: Metadata = { title: 'Report Reason' };

export default async function ReportReasonPage() {
  const response = await reportReasonsService.getReportReasons({});
  const reportReasons = response.data ?? [];
  return <ReportReasonTable data={reportReasons} canDelete={true} />;
}
