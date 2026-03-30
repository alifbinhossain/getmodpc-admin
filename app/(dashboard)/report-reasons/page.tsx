import type { Metadata } from 'next';

import ReportReasons from './_components/report-reasons';
import { reportReasonsService } from './_config/report-reasons.service';

export const metadata: Metadata = { title: 'Report Reason' };

export default async function ReportReasonPage() {
  const response = await reportReasonsService.getReportReasons();
  return <ReportReasons initialData={response} />;
}
