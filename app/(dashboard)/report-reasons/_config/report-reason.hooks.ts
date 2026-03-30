import { PaginatedResponse } from '@/types';
import type {
  CreateReportReasonPayload,
  ReportReasonQueryParams,
  ReportReasonRecord,
  UpdateReportReasonPayload,
} from '@/types/report-reason';

import { useApiListQuery, useApiMutation } from '@/hooks/api';

import { queryKeys } from '@/lib/react-query';

import { reportReasonsService } from './report-reasons.service';

// =============================================================================
// USERS QUERY HOOKS
// =============================================================================

/** Fetch paginated users */
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

/** Fetch single user */
export function useUser(id: string) {
  return useApiListQuery({
    queryKey: queryKeys.users.detail(id),
    queryFn: () => reportReasonsService.getReportReasons({ searchTerm: id }),
    enabled: !!id,
  });
}

// =============================================================================
// USERS MUTATION HOOKS
// =============================================================================

/** Create user */
export function useCreateReportReason() {
  return useApiMutation({
    mutationFn: (payload: CreateReportReasonPayload) =>
      reportReasonsService.createReportReason(payload),
    invalidateKeys: [queryKeys.users.lists()],
    successMessage: 'Report Reason created successfully.',
  });
}

/** Update user */
export function useUpdateReportReason() {
  return useApiMutation({
    mutationFn: (payload: UpdateReportReasonPayload) =>
      reportReasonsService.updateReportReason(payload),
    invalidateKeys: [queryKeys.users.lists()],
    successMessage: 'Report Reason updated successfully.',
  });
}

/** Delete user */
export function useDeleteReportReason() {
  return useApiMutation({
    mutationFn: (id: string) => reportReasonsService.deleteReportReason(id),
    invalidateKeys: [queryKeys.users.lists()],
    successMessage: 'Report Reason deleted successfully.',
  });
}

/** Bulk delete users */
export function useDeleteReportReasons() {
  return useApiMutation({
    mutationFn: (ids: string[]) =>
      reportReasonsService.deleteReportReasons(ids),
    invalidateKeys: [queryKeys.users.lists()],
    successMessage: 'Report Reasons deleted successfully.',
  });
}
