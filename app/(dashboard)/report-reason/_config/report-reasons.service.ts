import type { ApiResponse, PaginatedResponse } from '@/types';
import {
  CreateReportReasonPayload,
  ReportReasonQueryParams,
  ReportReasonRecord,
} from '@/types/report-reason';
import type { UpdateUserPayload } from '@/types/users';

import { api } from '@/lib/axios';
import { buildQueryString } from '@/lib/utils';

// =============================================================================
// USERS API SERVICE
// =============================================================================

export const reportReasonsService = {
  /** Fetch paginated list of users */
  getReportReasons(
    params?: ReportReasonQueryParams
  ): Promise<PaginatedResponse<ReportReasonRecord>> {
    const qs = params
      ? buildQueryString(params as Record<string, unknown>)
      : '';
    return api.list<ReportReasonRecord>(`/report-reasons${qs ? `?${qs}` : ''}`);
  },

  /** Fetch a single user by ID */
  getReportReason(id: string): Promise<ApiResponse<ReportReasonRecord>> {
    return api.get<ReportReasonRecord>(`/report-reasons/${id}`);
  },

  /** Create a new user */
  createReportReason(
    payload: CreateReportReasonPayload
  ): Promise<ApiResponse<ReportReasonRecord>> {
    return api.post<ReportReasonRecord, CreateReportReasonPayload>(
      '/report-reasons',
      payload
    );
  },

  /** Update an existing user */
  updateReportReason({
    id,
    ...payload
  }: UpdateUserPayload): Promise<ApiResponse<ReportReasonRecord>> {
    return api.patch<ReportReasonRecord, Omit<UpdateUserPayload, 'id'>>(
      `/report-reasons/${id}`,
      payload
    );
  },

  /** Delete a user */
  deleteReportReason(id: string): Promise<ApiResponse<void>> {
    return api.delete<void>(`/report-reasons/${id}`);
  },

  /** Bulk delete users */
  deleteReportReasons(ids: string[]): Promise<ApiResponse<void>> {
    return api.post<void, { ids: string[] }>('/report-reasons/bulk-delete', {
      ids,
    });
  },
};
