import { PaginatedResponse } from '@/types';
import type {
  CreateDeveloperPayload,
  DeveloperQueryParams,
  DeveloperRecord,
  UpdateDeveloperPayload,
} from '@/types/developer';

import { useApiListQuery, useApiMutation } from '@/hooks/api';

import { queryKeys } from '@/lib/react-query';
import { developersService } from './developers.service';


// =============================================================================
// REPORTS QUERY HOOKS
// =============================================================================

/** Fetch paginated developers */
export function useDevelopers(
  params?: DeveloperQueryParams,
  initialData?: PaginatedResponse<DeveloperRecord>
) {
  return useApiListQuery({
    queryKey: queryKeys.developer.list((params ?? {}) as Record<string, unknown>),
    queryFn: () => developersService.getDevelopers(params),
    initialData,
  });
}

/** Fetch single developer */
export function useUser(id: string) {
  return useApiListQuery({
    queryKey: queryKeys.developer.detail(id),
    queryFn: () => developersService.getDevelopers({ searchTerm: id }),
    enabled: !!id,
  });
}

// =============================================================================
// USERS MUTATION HOOKS
// =============================================================================

/** Create developer */
export function useCreateDeveloper() {
  return useApiMutation({
    mutationFn: (payload: CreateDeveloperPayload) =>
      developersService.createDeveloper(payload),
    invalidateKeys: [queryKeys.developer.lists()],
    successMessage: 'Developer created successfully.',
  });
}

/** Update developer */
export function useUpdateDeveloper() {
  return useApiMutation({
    mutationFn: (payload: UpdateDeveloperPayload) =>
      developersService.updateDeveloper(payload),
    invalidateKeys: [queryKeys.developer.lists()],
    successMessage: 'Developer updated successfully.',
  });
}

/** Delete developer */
export function useDeleteDeveloper() {
  return useApiMutation({
    mutationFn: (id: string) => developersService.deleteDeveloper(id),
    invalidateKeys: [queryKeys.developer.lists()],
    successMessage: 'Developer deleted successfully.',
  });
}

/** Bulk delete developer */
export function useDeleteDevelopers() {
  return useApiMutation({
    mutationFn: (ids: string[]) => developersService.deleteDevelopers(ids),
    invalidateKeys: [queryKeys.developer.lists()],
    successMessage: 'Developers deleted successfully.',
  });
}
