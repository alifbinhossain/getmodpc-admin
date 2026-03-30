import type { ApiResponse, PaginatedResponse } from '@/types';
import {
  CreateReportReasonPayload,
  ReportReasonQueryParams,
  ReportReasonRecord,
  UpdateReportReasonPayload,
} from '@/types/report-reason';

import { api } from '@/lib/axios';
import { buildQueryString } from '@/lib/utils';

// =============================================================================
// USERS API SERVICE
// =============================================================================

export const reportReasonsService = {
  /** Fetch paginated list of report reasons */
  getReportReasons(
    params?: ReportReasonQueryParams
  ): Promise<PaginatedResponse<ReportReasonRecord>> {
    const qs = params
      ? buildQueryString(params as Record<string, unknown>)
      : '';
    return api.list<ReportReasonRecord>(`/report-reasons${qs ? `?${qs}` : ''}`);
  },

  /** Fetch a all active report reasons */
  getReportReason(id: string): Promise<ApiResponse<ReportReasonRecord>> {
    return api.get<ReportReasonRecord>(`/report-reasons/${id}`);
  },

  /** Fetch a single report reason by ID */
  getAllActiveReportReasons(): Promise<ApiResponse<ReportReasonRecord[]>> {
    return api.get<ReportReasonRecord[]>(`/report-reasons/active`);
  },

  /** Create a new report reason */
  createReportReason(
    payload: CreateReportReasonPayload
  ): Promise<ApiResponse<ReportReasonRecord>> {
    return api.post<ReportReasonRecord, CreateReportReasonPayload>(
      '/report-reasons',
      payload
    );
  },

  /** Update an existing report reason */
  updateReportReason({
    id,
    ...payload
  }: UpdateReportReasonPayload): Promise<ApiResponse<ReportReasonRecord>> {
    return api.patch<ReportReasonRecord, Omit<UpdateReportReasonPayload, 'id'>>(
      `/report-reasons/${id}`,
      payload
    );
  },

  /** Delete a report reason */
  deleteReportReason(id: string): Promise<ApiResponse<void>> {
    return api.delete<void>(`/report-reasons/${id}`);
  },

  /** Bulk delete report reasons */
  deleteReportReasons(ids: string[]): Promise<ApiResponse<void>> {
    return api.post<void, { ids: string[] }>('/report-reasons/bulk-delete', {
      ids,
    });
  },
};
