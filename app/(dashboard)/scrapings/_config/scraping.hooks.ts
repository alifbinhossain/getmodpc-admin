import { IScrapingQueryParams } from '@/types/scrapping';

import { useApiListQuery, useApiMutation } from '@/hooks/api';

import { queryKeys } from '@/lib/react-query';

import { scrapingService } from './scrapings.service';

// =============================================================================
// SCRAPING QUERY HOOKS
// =============================================================================

/** Fetch paginated scrapping app */
export function useGetSearchPlayStoreApp(
  params?: IScrapingQueryParams,
  enabled?: boolean
) {
  return useApiListQuery({
    queryKey: queryKeys.scrapping.searchPlaystoreApp(
      (params ?? {}) as Record<string, unknown>
    ),
    queryFn: () => scrapingService.getSearchPlayStoreApp(params),
    enabled,
  });
}

export function useGetPlayStoreAppByUrl() {
  return useApiMutation({
    mutationFn: (payload: { url: string }) =>
      scrapingService.getPlayStoreAppByUrl(payload),
    invalidateKeys: [queryKeys.scrapping.getPlayStoreAppByUrl()],
    successMessage: 'Play store app fetched successfully.',
  });
}
