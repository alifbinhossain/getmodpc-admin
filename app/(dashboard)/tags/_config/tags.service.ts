import type { ApiResponse, PaginatedResponse } from '@/types';
import {
  CreateTagAndDeveloperPayload,
  TagAndDeveloperQueryParams,
  TagAndDeveloperRecord,
  UpdateTagAndDeveloperPayload,
} from '@/types/tagAndDeveloper';

import { api } from '@/lib/axios';
import { buildQueryString } from '@/lib/utils';

// =============================================================================
// USERS API SERVICE
// =============================================================================

export const tagsService = {
  /** Fetch paginated list of users */
  getTags(
    params?: TagAndDeveloperQueryParams
  ): Promise<PaginatedResponse<TagAndDeveloperRecord>> {
    const qs = params
      ? buildQueryString(params as Record<string, unknown>)
      : '';
    return api.list<TagAndDeveloperRecord>(`/tags${qs ? `?${qs}` : ''}`);
  },

  /** Fetch a single user by ID */
  getTag(id: string): Promise<ApiResponse<TagAndDeveloperRecord>> {
    return api.get<TagAndDeveloperRecord>(`/tags/${id}`);
  },

  /** Create a new user */
  createTag(
    payload: CreateTagAndDeveloperPayload
  ): Promise<ApiResponse<TagAndDeveloperRecord>> {
    return api.post<TagAndDeveloperRecord, CreateTagAndDeveloperPayload>(
      '/tags',
      payload
    );
  },

  /** Update an existing user */
  updateTag({
    id,
    ...payload
  }: UpdateTagAndDeveloperPayload): Promise<
    ApiResponse<TagAndDeveloperRecord>
  > {
    return api.patch<
      TagAndDeveloperRecord,
      Omit<UpdateTagAndDeveloperPayload, 'id'>
    >(`/tags/${id}`, payload);
  },

  /** Delete a user */
  deleteTag(id: string): Promise<ApiResponse<void>> {
    return api.delete<void>(`/tags/${id}`);
  },

  /** Bulk delete users */
  deleteTags(ids: string[]): Promise<ApiResponse<void>> {
    return api.post<void, { ids: string[] }>('/tags/bulk-delete', {
      ids,
    });
  },
};
