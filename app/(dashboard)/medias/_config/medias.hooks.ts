import { PaginatedResponse } from '@/types';
import type {
  CreateMediaPayload,
  MediaQueryParams,
  MediaRecord,
} from '@/types/media';

import { useApiListQuery, useApiMutation, useApiQuery } from '@/hooks/api';

import { queryKeys } from '@/lib/react-query';

import { mediasService } from './medias.service';

// =============================================================================
// MEDIAS QUERY HOOKS
// =============================================================================

/** Fetch paginated medias */
export function useMedias(
  params?: MediaQueryParams,
  initialData?: PaginatedResponse<MediaRecord>,
  enabled?: boolean
) {
  return useApiListQuery({
    queryKey: queryKeys.media.list((params ?? {}) as Record<string, unknown>),
    queryFn: () => mediasService.getAllMedias(params),
    initialData,
    enabled: enabled != undefined ? enabled : true,
  });
}

/** Fetch single media */
export function useMedia(key: string) {
  return useApiQuery({
    queryKey: queryKeys.media.detail(key),
    queryFn: () => mediasService.getMediaKey(key),
    enabled: !!key,
  });
}

// =============================================================================
// MEDIA MUTATION HOOKS
// =============================================================================

/** Upload media */
export function useUploadMedias() {
  return useApiMutation({
    mutationFn: (payload: CreateMediaPayload) =>
      mediasService.uploadMedias(payload),
    invalidateKeys: [queryKeys.media.lists()],
    successMessage: 'Media created successfully.',
  });
}

/** Bulk delete media */
export function useDeleteMedias() {
  return useApiMutation({
    mutationFn: (ids: string[]) => mediasService.deleteMedias(ids),
    invalidateKeys: [queryKeys.media.lists()],
    successMessage: 'Media deleted successfully.',
  });
}
