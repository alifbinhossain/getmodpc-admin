import type { ApiResponse, PaginatedResponse } from '@/types';
import type {
  AppQueryParams,
  AppRecord,
  CreateAppPayload,
  UpdateAppPayload,
} from '@/types/app';

import { api } from '@/lib/axios';
import { buildQueryString } from '@/lib/utils';

export const appsService = {
  getApps(params?: AppQueryParams): Promise<PaginatedResponse<AppRecord>> {
    const qs = params
      ? buildQueryString(params as Record<string, unknown>)
      : '';
    return api.list<AppRecord>(`/apps${qs ? `?${qs}` : ''}`);
  },

  getApp(id: string): Promise<ApiResponse<AppRecord>> {
    return api.get<AppRecord>(`/apps/${id}`);
  },

  createApp(payload: CreateAppPayload): Promise<ApiResponse<AppRecord>> {
    return api.post<AppRecord, CreateAppPayload>('/apps', payload);
  },

  updateApp({
    id,
    ...payload
  }: UpdateAppPayload): Promise<ApiResponse<AppRecord>> {
    return api.patch<AppRecord, Omit<UpdateAppPayload, 'id'>>(
      `/apps/${id}`,
      payload
    );
  },

  deleteApps(ids: string[]): Promise<ApiResponse<void>> {
    return api.post<void, { ids: string[] }>('/apps/deletes', { ids });
  },
};
