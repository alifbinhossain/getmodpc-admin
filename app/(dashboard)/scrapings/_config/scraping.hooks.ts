import { keepPreviousData } from '@tanstack/react-query';

import { useApiListQuery, useApiMutation } from '@/hooks/api';

import { queryKeys } from '@/lib/react-query';

import { scrapingService } from './scrapings.service';

// =============================================================================
// SCRAPING QUERY HOOKS
// =============================================================================

/** Fetch paginated scrapping app */
export function useGetSearchPlayStoreApp(appName?: string) {
  const normalizedAppName = appName?.trim();

  return useApiListQuery({
    queryKey: queryKeys.scrapping.searchPlaystoreApp(normalizedAppName ?? ''),
    queryFn: () =>
      scrapingService.getSearchPlayStoreApp(
        normalizedAppName ? { appName: normalizedAppName } : undefined
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
