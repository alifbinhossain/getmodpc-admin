import { PaginatedResponse } from '@/types';
import type {
  CategoryQueryParams,
  CategoryRecord,
  CreateCategoryPayload,
  UpdateCategoryPayload,
} from '@/types/category';

import { useApiListQuery, useApiMutation, useApiQuery } from '@/hooks/api';

import { queryKeys } from '@/lib/react-query';

import { categoriesService } from './categories.service';

// =============================================================================
// CATEGORY QUERY HOOKS
// =============================================================================

/** Fetch paginated categories */
export function useCategories(
  params?: CategoryQueryParams,
  initialData?: PaginatedResponse<CategoryRecord>
) {
  return useApiListQuery({
    queryKey: queryKeys.category.list(
      (params ?? {}) as Record<string, unknown>
    ),
    queryFn: () => categoriesService.getCategories(params),
    initialData,
  });
}

/** Fetch group categories */
export function useCategoriesByGroup() {
  return useApiQuery({
    queryKey: queryKeys.category.groups(),
    queryFn: () => categoriesService.getCategoriesByGroup(),
  });
}

/** Fetch single category */
export function useCategory(id: string) {
  return useApiListQuery({
    queryKey: queryKeys.category.detail(id),
    queryFn: () => categoriesService.getCategories({ searchTerm: id }),
    enabled: !!id,
  });
}

// =============================================================================
// CATEGORY MUTATION HOOKS
// =============================================================================

/** Create category */
export function useCreateCategory() {
  return useApiMutation({
    mutationFn: (payload: CreateCategoryPayload) =>
      categoriesService.createCategory(payload),
    invalidateKeys: [queryKeys.category.lists()],
    successMessage: 'Category created successfully.',
  });
}

/** Update category */
export function useUpdateCategory() {
  return useApiMutation({
    mutationFn: (payload: UpdateCategoryPayload) =>
      categoriesService.updateCategory(payload),
    invalidateKeys: [queryKeys.category.lists()],
    successMessage: 'Category updated successfully.',
  });
}

/** Delete category */
export function useDeleteCategory() {
  return useApiMutation({
    mutationFn: (id: string) => categoriesService.deleteCategory(id),
    invalidateKeys: [queryKeys.category.lists()],
    successMessage: 'Category deleted successfully.',
  });
}

/** Bulk delete category */
export function useDeleteCategories() {
  return useApiMutation({
    mutationFn: (ids: string[]) => categoriesService.deleteCategories(ids),
    invalidateKeys: [queryKeys.category.lists()],
    successMessage: 'Categories deleted successfully.',
  });
}
