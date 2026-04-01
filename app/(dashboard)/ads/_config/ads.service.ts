import type { ApiResponse, PaginatedResponse } from '@/types';
import type {
  AdQueryParams,
  AdRecord,
  CreateAdPayload,
  UpdateAdPayload,
} from '@/types/ad';

import { api } from '@/lib/axios';
import { buildQueryString } from '@/lib/utils';

// =============================================================================
// ADS API SERVICE
// =============================================================================

export const adsService = {
  /** Fetch paginated list of ads */
  getAds(params?: AdQueryParams): Promise<PaginatedResponse<AdRecord>> {
    const qs = params
      ? buildQueryString(params as Record<string, unknown>)
      : '';
    return api.list<AdRecord>(`/ads${qs ? `?${qs}` : ''}`);
  },

  /** Fetch a single ad by ID */
  getAd(id: string): Promise<ApiResponse<AdRecord>> {
    return api.get<AdRecord>(`/ads/${id}`);
  },

  /** Create a new ad */
  createAd(payload: CreateAdPayload): Promise<ApiResponse<AdRecord>> {
    return api.post<AdRecord, CreateAdPayload>('/ads', payload);
  },

  /** Update an existing ad */
  updateAd({
    id,
    ...payload
  }: UpdateAdPayload): Promise<ApiResponse<AdRecord>> {
    return api.patch<AdRecord, Omit<UpdateAdPayload, 'id'>>(
      `/ads/${id}`,
      payload
    );
  },

  /** Delete a ad */
  deleteAd(id: string): Promise<ApiResponse<void>> {
    return api.delete<void>(`/ads/${id}`);
  },

  /** Bulk delete ads */
  deleteAds(ids: string[]): Promise<ApiResponse<void>> {
    return api.post<void, { ids: string[] }>('/ads/bulk-delete', {
      ids,
    });
  },
};
