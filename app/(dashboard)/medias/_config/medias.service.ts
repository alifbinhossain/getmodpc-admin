import type { ApiResponse, PaginatedResponse } from '@/types';
import type {
  CreateMediaPayload,
  MediaQueryParams,
  MediaRecord,
} from '@/types/media';

import { api } from '@/lib/axios';
import { buildQueryString } from '@/lib/utils';

// =============================================================================
// MEDIAS API SERVICE
// =============================================================================

export const mediasService = {
  /** Fetch paginated list of medias */
  getAllMedias(
    params?: MediaQueryParams
  ): Promise<PaginatedResponse<MediaRecord>> {
    const qs = params
      ? buildQueryString(params as Record<string, unknown>)
      : '';
    return api.list<MediaRecord>(`/medias${qs ? `?${qs}` : ''}`);
  },

  /** Fetch a single media by key */
  getMediaKey(key: string): Promise<ApiResponse<MediaRecord>> {
    return api.get<MediaRecord>(`/medias/${key}`);
  },

  /** Upload a new media */
  uploadMedias(payload: CreateMediaPayload): Promise<ApiResponse<MediaRecord>> {
    return api.post<MediaRecord, CreateMediaPayload>('/medias', payload);
  },

  /** Bulk delete medias */
  deleteMedias(fileKeys: string[]): Promise<ApiResponse<void>> {
    return api.post<void, { fileKeys: string[] }>('/medias/bulk-delete', {
      fileKeys,
    });
  },
};
