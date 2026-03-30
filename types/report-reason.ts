// =============================================================================
// REPORT REASON MODULE TYPES
// =============================================================================
import { BaseQueryParams, BaseRecord } from '.';

export interface CreateReportReasonPayload {
  title: string;
  is_active: boolean;
}
export interface UpdateReportReasonPayload extends Partial<
  Omit<CreateReportReasonPayload, 'password'>
> {
  id: string;
}
export interface ReportReasonRecord extends BaseRecord {
  title: string;
  is_active: boolean;
}
export interface ReportReasonQueryParams extends BaseQueryParams {
  title?: string;
  is_active?: boolean;
}
