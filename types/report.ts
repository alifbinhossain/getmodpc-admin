// =============================================================================
// REPORT REASON MODULE TYPES
// =============================================================================
import { BaseQueryParams, BaseRecord } from '.';
import { ReportReasonRecord } from './report-reason';

export interface CreateReportPayload {
  email: string;
  reason: string;
  details: string;
}
export interface UpdateReportPayload {
  id: string;
  status: string;
}

export interface ReportRecord extends BaseRecord {
  email: string;
  reason: Pick<ReportReasonRecord, 'id' | 'title' | 'is_active'>;
  details: string;
  status: EnumReportStatus;
}
export interface ReportQueryParams extends BaseQueryParams {
  email?: string;
  reason?: string;
  status?: EnumReportStatus;
}

export enum EnumReportStatus {
  DECLINED = 'declined',
  CLOSED = 'closed',
  OPEN = 'open',
}
