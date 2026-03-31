import type { ApiResponse, PaginatedResponse } from '@/types';
import type {
  CreatePagePayload,
  PageQueryParams,
  PageRecord,
  UpdatePagePayload,
} from '@/types/page';

import { api } from '@/lib/axios';
import { buildQueryString } from '@/lib/utils';

// =============================================================================
// PAGES API SERVICE
// =============================================================================

export const pagesService = {
  /** Fetch paginated list of pages */
  getPages(params?: PageQueryParams): Promise<PaginatedResponse<PageRecord>> {
    const qs = params
      ? buildQueryString(params as Record<string, unknown>)
      : '';
    return api.list<PageRecord>(`/pages${qs ? `?${qs}` : ''}`);
  },

  /** Fetch a single page by ID */
  getPage(id: string): Promise<ApiResponse<PageRecord>> {
    return api.get<PageRecord>(`/pages/${id}`);
  },

  /** Create a new page */
  createPage(payload: CreatePagePayload): Promise<ApiResponse<PageRecord>> {
    return api.post<PageRecord, CreatePagePayload>('/pages', payload);
  },

  /** Update an existing page */
  updatePage({
    id,
    ...payload
  }: UpdatePagePayload): Promise<ApiResponse<PageRecord>> {
    return api.patch<PageRecord, Omit<UpdatePagePayload, 'id'>>(
      `/pages/${id}`,
      payload
    );
  },

  /** Delete a page */
  deletePage(id: string): Promise<ApiResponse<void>> {
    return api.delete<void>(`/pages/${id}`);
  },

  /** Bulk delete users */
  deletePages(ids: string[]): Promise<ApiResponse<void>> {
    return api.post<void, { ids: string[] }>('/pages/bulk-delete', {
      ids,
    });
  },
};
