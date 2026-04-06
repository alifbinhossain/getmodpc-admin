import type { ApiResponse, PaginatedResponse } from '@/types';
import type {
  IPlayStoreScrapingApp,
  IScrapingQueryParams,
  ISearchAppRecord,
} from '@/types/scrapping';

import { api } from '@/lib/axios';
import { buildQueryString } from '@/lib/utils';

// =============================================================================
// SCRAPPING API SERVICE
// =============================================================================

export const scrapingService = {
  /** Fetch paginated list of scraping */
  getSearchPlayStoreApp(
    params?: IScrapingQueryParams
  ): Promise<PaginatedResponse<ISearchAppRecord>> {
    const qs = params
      ? buildQueryString(params as Record<string, unknown>)
      : '';
    return api.list<ISearchAppRecord>(
      `/scrapings/get-search-playstore-apps${qs ? `?${qs}` : ''}`
    );
  },

  getPlayStoreAppByUrl(payload: {
    url: string;
  }): Promise<ApiResponse<IPlayStoreScrapingApp>> {
    return api.post<IPlayStoreScrapingApp, { url: string }>(
      '/scrapings/playstore-app-by-url',
      payload
    );
  },
};
