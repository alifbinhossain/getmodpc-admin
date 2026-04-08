import type { ApiResponse, PaginatedResponse } from '@/types';
import type {
  CategoryRecord,
  CreateCategoryPayload,
  ParentCategoryGroup,
  UpdateCategoryPayload,
} from '@/types/category';
import { CategoryQueryParams } from '@/types/category';

import { api } from '@/lib/axios';
import { buildQueryString } from '@/lib/utils';

// =============================================================================
// CATEGORIES API SERVICE
// =============================================================================

export const categoriesService = {
  /** Fetch paginated list of users */
  getCategories(
    params?: CategoryQueryParams
  ): Promise<PaginatedResponse<CategoryRecord>> {
    const qs = params
      ? buildQueryString(params as Record<string, unknown>)
      : '';
    return api.list<CategoryRecord>(`/categories${qs ? `?${qs}` : ''}`);
  },

  getCategoriesByGroup(): Promise<PaginatedResponse<ParentCategoryGroup>> {
    return api.list<ParentCategoryGroup>(`/categories/group-by-parent-cat`);
  },

  /** Fetch a single user by ID */
  getCategory(id: string): Promise<ApiResponse<CategoryRecord>> {
    return api.get<CategoryRecord>(`/categories/${id}`);
  },

  /** Create a new user */
  createCategory(
    payload: CreateCategoryPayload
  ): Promise<ApiResponse<CategoryRecord>> {
    return api.post<CategoryRecord, CreateCategoryPayload>(
      '/categories',
      payload
    );
  },

  /** Update an existing user */
  updateCategory({
    id,
    ...payload
  }: UpdateCategoryPayload): Promise<ApiResponse<CategoryRecord>> {
    return api.patch<CategoryRecord, Omit<UpdateCategoryPayload, 'id'>>(
      `/categories/${id}`,
      payload
    );
  },

  /** Delete a user */
  deleteCategory(id: string): Promise<ApiResponse<void>> {
    return api.delete<void>(`/categories/${id}`);
  },

  /** Bulk delete users */
  deleteCategories(ids: string[]): Promise<ApiResponse<void>> {
    return api.post<void, { ids: string[] }>('/categories/bulk-delete', {
      ids,
    });
  },
};
