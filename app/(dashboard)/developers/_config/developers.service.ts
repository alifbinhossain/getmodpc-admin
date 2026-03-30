import type { ApiResponse, PaginatedResponse } from '@/types';
import {
  CreateDeveloperPayload,
  DeveloperQueryParams,
  DeveloperRecord,
  UpdateDeveloperPayload,
} from '@/types/developer';

import { api } from '@/lib/axios';
import { buildQueryString } from '@/lib/utils';

// =============================================================================
// USERS API SERVICE
// =============================================================================

export const developersService = {
  /** Fetch paginated list of users */
  getDevelopers(
    params?: DeveloperQueryParams
  ): Promise<PaginatedResponse<DeveloperRecord>> {
    const qs = params
      ? buildQueryString(params as Record<string, unknown>)
      : '';
    return api.list<DeveloperRecord>(`/developers${qs ? `?${qs}` : ''}`);
  },

  /** Fetch a single user by ID */
  getDeveloper(id: string): Promise<ApiResponse<DeveloperRecord>> {
    return api.get<DeveloperRecord>(`/developers/${id}`);
  },

  /** Create a new user */
  createDeveloper(
    payload: CreateDeveloperPayload
  ): Promise<ApiResponse<DeveloperRecord>> {
    return api.post<DeveloperRecord, CreateDeveloperPayload>('/developers', payload);
  },

  /** Update an existing user */
  updateDeveloper({
    id,
    ...payload
  }: UpdateDeveloperPayload): Promise<ApiResponse<DeveloperRecord>> {
    return api.patch<DeveloperRecord, Omit<UpdateDeveloperPayload, 'id'>>(
      `/developers/${id}`,
      payload
    );
  },

  /** Delete a user */
  deleteDeveloper(id: string): Promise<ApiResponse<void>> {
    return api.delete<void>(`/developers/${id}`);
  },

  /** Bulk delete users */
  deleteDevelopers(ids: string[]): Promise<ApiResponse<void>> {
    return api.post<void, { ids: string[] }>('/developers/bulk-delete', {
      ids,
    });
  },
};
