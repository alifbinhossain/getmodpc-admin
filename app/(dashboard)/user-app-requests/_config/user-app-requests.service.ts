import type { ApiResponse, PaginatedResponse } from '@/types';
import type {
  CreateUserAppRequestPayload,
  UpdateUserAppRequestPayload,
  UserAppRequestQueryParams,
  UserAppRequestRecord,
} from '@/types/user-app-request';

import { api } from '@/lib/axios';
import { buildQueryString } from '@/lib/utils';

// =============================================================================
// USER APP REQUESTS API SERVICE
// =============================================================================

export const userAppRequestsService = {
  /** Fetch paginated list of user-app-requests */
  getUserAppRequests(
    params?: UserAppRequestQueryParams
  ): Promise<PaginatedResponse<UserAppRequestRecord>> {
    const qs = params
      ? buildQueryString(params as Record<string, unknown>)
      : '';
    return api.list<UserAppRequestRecord>(
      `/user-app-requests${qs ? `?${qs}` : ''}`
    );
  },

  /** Fetch a single userAppRequest by ID */
  getUserAppRequest(id: string): Promise<ApiResponse<UserAppRequestRecord>> {
    return api.get<UserAppRequestRecord>(`/user-app-requests/${id}`);
  },

  /** Create a new userAppRequest */
  createUserAppRequest(
    payload: CreateUserAppRequestPayload
  ): Promise<ApiResponse<UserAppRequestRecord>> {
    return api.post<UserAppRequestRecord, CreateUserAppRequestPayload>(
      '/user-app-requests',
      payload
    );
  },

  /** Update an existing userAppRequest */
  updateUserAppRequest({
    id,
    ...payload
  }: UpdateUserAppRequestPayload): Promise<ApiResponse<UserAppRequestRecord>> {
    return api.patch<
      UserAppRequestRecord,
      Omit<UpdateUserAppRequestPayload, 'id'>
    >(`/user-app-requests/${id}`, payload);
  },

  /** Delete a userAppRequest */
  deleteUserAppRequest(id: string): Promise<ApiResponse<void>> {
    return api.delete<void>(`/user-app-requests/${id}`);
  },

  /** Bulk delete user-app-requests */
  deleteUserAppRequests(ids: string[]): Promise<ApiResponse<void>> {
    return api.post<void, { ids: string[] }>('/user-app-requests/bulk-delete', {
      ids,
    });
  },
};
