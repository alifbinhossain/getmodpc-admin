import type { ApiResponse, PaginatedResponse } from '@/types';
import type {
  CreateUserPayload,
  UpdateUserPayload,
  UserQueryParams,
  UserRecord,
} from '@/types/users';

import { api } from '@/lib/axios';
import { buildQueryString } from '@/lib/utils';

// =============================================================================
// USERS API SERVICE
// =============================================================================

export const usersService = {
  /** Fetch paginated list of users */
  getUsers(params?: UserQueryParams): Promise<PaginatedResponse<UserRecord>> {
    const qs = params
      ? buildQueryString(params as Record<string, unknown>)
      : '';
    return api.list<UserRecord>(`/users${qs ? `?${qs}` : ''}`);
  },

  /** Fetch a single user by ID */
  getUser(id: string): Promise<ApiResponse<UserRecord>> {
    return api.get<UserRecord>(`/users/${id}`);
  },

  /** Create a new user */
  createUser(payload: CreateUserPayload): Promise<ApiResponse<UserRecord>> {
    return api.post<UserRecord, CreateUserPayload>('/users', payload);
  },

  /** Update an existing user */
  updateUser({
    id,
    ...payload
  }: UpdateUserPayload): Promise<ApiResponse<UserRecord>> {
    return api.patch<UserRecord, Omit<UpdateUserPayload, 'id'>>(
      `/users/${id}`,
      payload
    );
  },

  /** Delete a user */
  deleteUser(id: string): Promise<ApiResponse<void>> {
    return api.delete<void>(`/users/${id}`);
  },

  /** Bulk delete users */
  deleteUsers(ids: string[]): Promise<ApiResponse<void>> {
    return api.post<void, { ids: string[] }>('/users/bulk-delete', { ids });
  },
};
