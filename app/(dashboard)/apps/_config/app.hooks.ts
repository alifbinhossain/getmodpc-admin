import { BaseQueryParams, PaginatedResponse } from '@/types';
import type {
  AppQueryParams,
  AppRecord,
  CreateAppPayload,
  UpdateAppPayload,
} from '@/types/app';

import { useApiListQuery, useApiMutation } from '@/hooks/api';

import { queryKeys } from '@/lib/react-query';

import { appsService } from './apps.service';

export function useApps(
  params?: AppQueryParams,
  initialData?: PaginatedResponse<AppRecord>
) {
  return useApiListQuery({
    queryKey: queryKeys.app.list((params ?? {}) as Record<string, unknown>),
    queryFn: () => appsService.getApps(params),
    initialData,
  });
}

export function useSoftDeleteApps(
  params?: BaseQueryParams,
  initialData?: PaginatedResponse<AppRecord>
) {
  return useApiListQuery({
    queryKey: queryKeys.app.softDeleteAppList(
      (params ?? {}) as Record<string, unknown>
    ),
    queryFn: () => appsService.getAllSoftDeleteApps(params),
    initialData,
  });
}

export function useCreateApp() {
  return useApiMutation({
    mutationFn: (payload: CreateAppPayload) => appsService.createApp(payload),
    invalidateKeys: [queryKeys.app.lists()],
    successMessage: 'App created successfully.',
  });
}

export function useCreateScrapingApp() {
  return useApiMutation({
    mutationFn: (payload: CreateAppPayload) =>
      appsService.createScrapingApp(payload),
    invalidateKeys: [queryKeys.app.createScrapingApp()],
    successMessage: 'App created successfully.',
  });
}

export function useUpdateApp() {
  return useApiMutation({
    mutationFn: (payload: UpdateAppPayload) => appsService.updateApp(payload),
    invalidateKeys: [queryKeys.app.lists()],
    successMessage: 'App updated successfully.',
  });
}

export function useDeleteApps() {
  return useApiMutation({
    mutationFn: (ids: string[]) => appsService.deleteApps(ids),
    invalidateKeys: [queryKeys.app.lists()],
    successMessage: 'Apps deleted successfully.',
  });
}
