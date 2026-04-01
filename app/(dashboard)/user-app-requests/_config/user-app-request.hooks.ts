import { PaginatedResponse } from '@/types';
import type {
  CreateUserAppRequestPayload,
  UpdateUserAppRequestPayload,
  UserAppRequestQueryParams,
  UserAppRequestRecord,
} from '@/types/user-app-request';

import { useApiListQuery, useApiMutation } from '@/hooks/api';

import { queryKeys } from '@/lib/react-query';

import { userAppRequestsService } from './user-app-requests.service';

// =============================================================================
// USER APP REQUEST QUERY HOOKS
// =============================================================================

/** Fetch paginated userAppRequests */
export function useUserAppRequests(
  params?: UserAppRequestQueryParams,
  initialData?: PaginatedResponse<UserAppRequestRecord>
) {
  return useApiListQuery({
    queryKey: queryKeys.userAppRequest.list(
      (params ?? {}) as Record<string, unknown>
    ),
    queryFn: () => userAppRequestsService.getUserAppRequests(params),
    initialData,
  });
}

/** Fetch single userAppRequest */
export function useUserAppRequest(id: string) {
  return useApiListQuery({
    queryKey: queryKeys.userAppRequest.detail(id),
    queryFn: () =>
      userAppRequestsService.getUserAppRequests({ searchTerm: id }),
    enabled: !!id,
  });
}

// =============================================================================
// USER APP REQUEST MUTATION HOOKS
// =============================================================================

/** Create userAppRequest */
export function useCreateUserAppRequest() {
  return useApiMutation({
    mutationFn: (payload: CreateUserAppRequestPayload) =>
      userAppRequestsService.createUserAppRequest(payload),
    invalidateKeys: [queryKeys.userAppRequest.lists()],
    successMessage: 'User app request created successfully.',
  });
}

/** Update userAppRequest */
export function useUpdateUserAppRequest() {
  return useApiMutation({
    mutationFn: (payload: UpdateUserAppRequestPayload) =>
      userAppRequestsService.updateUserAppRequest(payload),
    invalidateKeys: [queryKeys.userAppRequest.lists()],
    successMessage: 'User app request updated successfully.',
  });
}

/** Delete userAppRequest */
export function useDeleteUserAppRequest() {
  return useApiMutation({
    mutationFn: (id: string) => userAppRequestsService.deleteUserAppRequest(id),
    invalidateKeys: [queryKeys.userAppRequest.lists()],
    successMessage: 'User app request deleted successfully.',
  });
}

/** Bulk delete userAppRequests */
export function useDeleteUserAppRequests() {
  return useApiMutation({
    mutationFn: (ids: string[]) =>
      userAppRequestsService.deleteUserAppRequests(ids),
    invalidateKeys: [queryKeys.userAppRequest.lists()],
    successMessage: 'User app requests deleted successfully.',
  });
}
