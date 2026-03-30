import type { ApiResponse, PaginatedResponse } from '@/types';
import {
  CreateReportPayload,
  ReportQueryParams,
  ReportRecord,
  UpdateReportPayload,
} from '@/types/report';

import { api } from '@/lib/axios';
import { buildQueryString } from '@/lib/utils';

// =============================================================================
// USERS API SERVICE
// =============================================================================

export const reportsService = {
  /** Fetch paginated list of users */
  getReports(
    params?: ReportQueryParams
  ): Promise<PaginatedResponse<ReportRecord>> {
    const qs = params
      ? buildQueryString(params as Record<string, unknown>)
      : '';
    return api.list<ReportRecord>(`/reports${qs ? `?${qs}` : ''}`);
  },

  /** Fetch a single user by ID */
  getReport(id: string): Promise<ApiResponse<ReportRecord>> {
    return api.get<ReportRecord>(`/reports/${id}`);
  },

  /** Create a new user */
  createReport(
    payload: CreateReportPayload
  ): Promise<ApiResponse<ReportRecord>> {
    return api.post<ReportRecord, CreateReportPayload>('/reports', payload);
  },

  /** Update an existing user */
  updateReport({
    id,
    ...payload
  }: UpdateReportPayload): Promise<ApiResponse<ReportRecord>> {
    return api.patch<ReportRecord, Omit<UpdateReportPayload, 'id'>>(
      `/reports/${id}`,
      payload
    );
  },

  /** Delete a user */
  deleteReport(id: string): Promise<ApiResponse<void>> {
    return api.delete<void>(`/reports/${id}`);
  },

  /** Bulk delete users */
  deleteReports(ids: string[]): Promise<ApiResponse<void>> {
    return api.post<void, { ids: string[] }>('/reports/bulk-delete', {
      ids,
    });
  },
};
