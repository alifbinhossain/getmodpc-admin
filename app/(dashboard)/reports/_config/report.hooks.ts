import { PaginatedResponse } from '@/types';
import type {
  CreateReportPayload,
  ReportQueryParams,
  ReportRecord,
  UpdateReportPayload,
} from '@/types/report';

import { useApiListQuery, useApiMutation } from '@/hooks/api';

import { queryKeys } from '@/lib/react-query';

import { reportsService } from './reports.service';

// =============================================================================
// REPORTS QUERY HOOKS
// =============================================================================

/** Fetch paginated reports */
export function useReports(
  params?: ReportQueryParams,
  initialData?: PaginatedResponse<ReportRecord>
) {
  return useApiListQuery({
    queryKey: queryKeys.report.list((params ?? {}) as Record<string, unknown>),
    queryFn: () => reportsService.getReports(params),
    initialData,
  });
}

/** Fetch single report */
export function useUser(id: string) {
  return useApiListQuery({
    queryKey: queryKeys.report.detail(id),
    queryFn: () => reportsService.getReports({ searchTerm: id }),
    enabled: !!id,
  });
}

// =============================================================================
// USERS MUTATION HOOKS
// =============================================================================

/** Create report */
export function useCreateReport() {
  return useApiMutation({
    mutationFn: (payload: CreateReportPayload) =>
      reportsService.createReport(payload),
    invalidateKeys: [queryKeys.report.lists()],
    successMessage: 'Report created successfully.',
  });
}

/** Update report */
export function useUpdateReport() {
  return useApiMutation({
    mutationFn: (payload: UpdateReportPayload) =>
      reportsService.updateReport(payload),
    invalidateKeys: [queryKeys.report.lists()],
    successMessage: 'Report updated successfully.',
  });
}

/** Delete report */
export function useDeleteReport() {
  return useApiMutation({
    mutationFn: (id: string) => reportsService.deleteReport(id),
    invalidateKeys: [queryKeys.report.lists()],
    successMessage: 'Report deleted successfully.',
  });
}

/** Bulk delete report */
export function useDeleteReports() {
  return useApiMutation({
    mutationFn: (ids: string[]) => reportsService.deleteReports(ids),
    invalidateKeys: [queryKeys.report.lists()],
    successMessage: 'Reports deleted successfully.',
  });
}
