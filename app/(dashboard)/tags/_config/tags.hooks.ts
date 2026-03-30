import { PaginatedResponse } from '@/types';
import type {
  CreateTagAndDeveloperPayload,
  TagAndDeveloperQueryParams,
  TagAndDeveloperRecord,
  UpdateTagAndDeveloperPayload,
} from '@/types/tagAndDeveloper';

import { useApiListQuery, useApiMutation } from '@/hooks/api';

import { queryKeys } from '@/lib/react-query';

import { tagsService } from './tags.service';

// =============================================================================
// TAGS QUERY HOOKS
// =============================================================================

/** Fetch paginated tags */
export function useTags(
  params?: TagAndDeveloperQueryParams,
  initialData?: PaginatedResponse<TagAndDeveloperRecord>
) {
  return useApiListQuery({
    queryKey: queryKeys.tag.list((params ?? {}) as Record<string, unknown>),
    queryFn: () => tagsService.getTags(params),
    initialData,
  });
}

/** Fetch single tag */
export function useTag(id: string) {
  return useApiListQuery({
    queryKey: queryKeys.tag.detail(id),
    queryFn: () => tagsService.getTags({ searchTerm: id }),
    enabled: !!id,
  });
}

// =============================================================================
// TAG MUTATION HOOKS
// =============================================================================

/** Create tag */
export function useCreateTag() {
  return useApiMutation({
    mutationFn: (payload: CreateTagAndDeveloperPayload) =>
      tagsService.createTag(payload),
    invalidateKeys: [queryKeys.tag.lists()],
    successMessage: 'Tag created successfully.',
  });
}

/** Update tag */
export function useUpdateTag() {
  return useApiMutation({
    mutationFn: (payload: UpdateTagAndDeveloperPayload) =>
      tagsService.updateTag(payload),
    invalidateKeys: [queryKeys.tag.lists()],
    successMessage: 'Tag updated successfully.',
  });
}

/** Delete tag */
export function useDeleteTag() {
  return useApiMutation({
    mutationFn: (id: string) => tagsService.deleteTag(id),
    invalidateKeys: [queryKeys.tag.lists()],
    successMessage: 'Tag deleted successfully.',
  });
}

/** Bulk delete tag */
export function useDeleteTags() {
  return useApiMutation({
    mutationFn: (ids: string[]) => tagsService.deleteTags(ids),
    invalidateKeys: [queryKeys.tag.lists()],
    successMessage: 'Tag deleted successfully.',
  });
}
