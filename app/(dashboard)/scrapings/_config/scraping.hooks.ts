import type {
  ILiteApksScrapingQueryParams,
  IScrapingQueryParams,
} from '@/types/scrapping';
import { keepPreviousData } from '@tanstack/react-query';

import { useApiListQuery, useApiMutation } from '@/hooks/api';

import { queryKeys } from '@/lib/react-query';

import { scrapingService } from './scrapings.service';

// =============================================================================
// SCRAPING QUERY HOOKS
// =============================================================================

/** Fetch paginated scrapping app */
export function useGetSearchPlayStoreApp(params?: IScrapingQueryParams) {
  const normalizedAppName = params?.appName?.trim();
  const page = params?.page ?? 1;
  const limit = params?.limit ?? 20;

  return useApiListQuery({
    queryKey: queryKeys.scrapping.searchPlaystoreApp({
      appName: normalizedAppName ?? '',
      page,
      limit,
    }),
    queryFn: () =>
      scrapingService.getSearchPlayStoreApp(
        normalizedAppName
          ? { ...params, appName: normalizedAppName, page, limit }
          : undefined
      ),
    enabled: Boolean(normalizedAppName),
    staleTime: 5 * 60 * 1000,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });
}

export function useGetPlayStoreAppByUrl() {
  return useApiMutation({
    mutationFn: (payload: { url: string }) =>
      scrapingService.getPlayStoreAppByUrl(payload),
    successMessage: 'Play store app fetched successfully.',
  });
}

export function useGetLiteApksAppByType(params?: ILiteApksScrapingQueryParams) {
  const type = params?.type;
  const page = params?.page ?? 1;
  const limit = params?.limit ?? 20;

  return useApiListQuery({
    queryKey: queryKeys.scrapping.liteApksByType({
      type: type ?? '',
      page,
      limit,
    }),
    queryFn: () =>
      scrapingService.getLiteApksAppByType(
        type ? { ...params, type, page, limit } : undefined
      ),
    enabled: Boolean(type),
    staleTime: 5 * 60 * 1000,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });
}

export function useGetLiteApksAppByUrl() {
  return useApiMutation({
    mutationFn: (payload: { url: string }) =>
      scrapingService.getLiteApksAppByUrl(payload),
    successMessage: 'LiteApks app fetched successfully.',
  });
}
