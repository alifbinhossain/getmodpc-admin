import { PaginatedResponse } from '@/types';
import type {
  PageQueryParams,
  PageRecord,
  CreatePagePayload,
  UpdatePagePayload,
} from '@/types/page';

import { useApiListQuery, useApiMutation, useApiQuery } from '@/hooks/api';

import { queryKeys } from '@/lib/react-query';

import { pagesService } from './pages.service';

// =============================================================================
// PAGE QUERY HOOKS
// =============================================================================

/** Fetch paginated pages */
export function usePages(
  params?: PageQueryParams,
  initialData?: PaginatedResponse<PageRecord>
) {
  return useApiListQuery({
    queryKey: queryKeys.page.list(
      (params ?? {}) as Record<string, unknown>
    ),
    queryFn: () => pagesService.getPages(params),
    initialData,
  });
}

/** Fetch single page */
export function usePage(id: string) {
  return useApiListQuery({
    queryKey: queryKeys.page.detail(id),
    queryFn: () => pagesService.getPages({ searchTerm: id }),
    enabled: !!id,
  });
}

// =============================================================================
// PAGE MUTATION HOOKS
// =============================================================================

/** Create page */
export function useCreatePage() {
  return useApiMutation({
    mutationFn: (payload: CreatePagePayload) =>
      pagesService.createPage(payload),
    invalidateKeys: [queryKeys.page.lists()],
    successMessage: 'Page created successfully.',
  });
}

/** Update page */
export function useUpdatePage() {
  return useApiMutation({
    mutationFn: (payload: UpdatePagePayload) =>
      pagesService.updatePage(payload),
    invalidateKeys: [queryKeys.page.lists()],
    successMessage: 'Page updated successfully.',
  });
}

/** Delete page */
export function useDeletePage() {
  return useApiMutation({
    mutationFn: (id: string) => pagesService.deletePage(id),
    invalidateKeys: [queryKeys.page.lists()],
    successMessage: 'Page deleted successfully.',
  });
}

/** Bulk delete page */
export function useDeletePages() {
  return useApiMutation({
    mutationFn: (ids: string[]) => pagesService.deletePages(ids),
    invalidateKeys: [queryKeys.page.lists()],
    successMessage: 'Pages deleted successfully.',
  });
}
