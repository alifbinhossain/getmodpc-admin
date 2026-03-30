import { PaginatedResponse } from '@/types';
import type {
  CreateReportReasonPayload,
  ReportReasonQueryParams,
  ReportReasonRecord,
  UpdateReportReasonPayload,
} from '@/types/report-reason';

import { useApiListQuery, useApiMutation, useApiQuery } from '@/hooks/api';

import { queryKeys } from '@/lib/react-query';

import { reportReasonsService } from './report-reasons.service';

// =============================================================================
// REPORT REASONS QUERY HOOKS
// =============================================================================

/** Fetch paginated report reasons */
export function useReportReasons(
  params?: ReportReasonQueryParams,
  initialData?: PaginatedResponse<ReportReasonRecord>
) {
  return useApiListQuery({
    queryKey: queryKeys.reportReason.list(
      (params ?? {}) as Record<string, unknown>
    ),
    queryFn: () => reportReasonsService.getReportReasons(params),
    initialData,
  });
}

/** Fetch active report reasons */
export function useActiveReportReasons() {
  return useApiQuery({
    queryKey: queryKeys.reportReason.active(),
    queryFn: () => reportReasonsService.getAllActiveReportReasons(),
  });
}

/** Fetch single report reason */
export function useReportReason(id: string) {
  return useApiListQuery({
    queryKey: queryKeys.reportReason.detail(id),
    queryFn: () => reportReasonsService.getReportReasons({ searchTerm: id }),
    enabled: !!id,
  });
}

// =============================================================================
// REPORT REASONS MUTATION HOOKS
// =============================================================================

/** Create report reason */
export function useCreateReportReason() {
  return useApiMutation({
    mutationFn: (payload: CreateReportReasonPayload) =>
      reportReasonsService.createReportReason(payload),
    invalidateKeys: [queryKeys.reportReason.lists()],
    successMessage: 'Report Reason created successfully.',
  });
}

/** Update report reason */
export function useUpdateReportReason() {
  return useApiMutation({
    mutationFn: (payload: UpdateReportReasonPayload) =>
      reportReasonsService.updateReportReason(payload),
    invalidateKeys: [queryKeys.reportReason.lists()],
    successMessage: 'Report Reason updated successfully.',
  });
}

/** Delete report reason */
export function useDeleteReportReason() {
  return useApiMutation({
    mutationFn: (id: string) => reportReasonsService.deleteReportReason(id),
    invalidateKeys: [queryKeys.reportReason.lists()],
    successMessage: 'Report Reason deleted successfully.',
  });
}

/** Bulk delete report reasons */
export function useDeleteReportReasons() {
  return useApiMutation({
    mutationFn: (ids: string[]) =>
      reportReasonsService.deleteReportReasons(ids),
    invalidateKeys: [queryKeys.reportReason.lists()],
    successMessage: 'Report Reasons deleted successfully.',
  });
}
