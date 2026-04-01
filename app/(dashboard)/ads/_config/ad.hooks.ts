import { PaginatedResponse } from '@/types';
import type {
  AdQueryParams,
  AdRecord,
  CreateAdPayload,
  UpdateAdPayload,
} from '@/types/ad';
import { useApiListQuery, useApiMutation } from '@/hooks/api';
import { queryKeys } from '@/lib/react-query';
import { adsService } from './ads.service';

// =============================================================================
// AD QUERY HOOKS
// =============================================================================

/** Fetch paginated ads */
export function useAds(
  params?: AdQueryParams,
  initialData?: PaginatedResponse<AdRecord>
) {
  return useApiListQuery({
    queryKey: queryKeys.testimonial.list(
      (params ?? {}) as Record<string, unknown>
    ),
    queryFn: () => adsService.getAds(params),
    initialData,
  });
}

/** Fetch single ad */
export function useAd(id: string) {
  return useApiListQuery({
    queryKey: queryKeys.testimonial.detail(id),
    queryFn: () => adsService.getAds({ searchTerm: id }),
    enabled: !!id,
  });
}

// =============================================================================
// AD MUTATION HOOKS
// =============================================================================

/** Create ad */
export function useCreateAd() {
  return useApiMutation({
    mutationFn: (payload: CreateAdPayload) => adsService.createAd(payload),
    invalidateKeys: [queryKeys.ad.lists()],
    successMessage: 'Ad created successfully.',
  });
}

/** Update ad */
export function useUpdateAd() {
  return useApiMutation({
    mutationFn: (payload: UpdateAdPayload) => adsService.updateAd(payload),
    invalidateKeys: [queryKeys.ad.lists()],
    successMessage: 'Ad updated successfully.',
  });
}

/** Delete ad */
export function useDeleteAd() {
  return useApiMutation({
    mutationFn: (id: string) => adsService.deleteAd(id),
    invalidateKeys: [queryKeys.ad.lists()],
    successMessage: 'Ad deleted successfully.',
  });
}

/** Bulk delete ads */
export function useDeleteAds() {
  return useApiMutation({
    mutationFn: (ids: string[]) => adsService.deleteAds(ids),
    invalidateKeys: [queryKeys.ad.lists()],
    successMessage: 'Ads deleted successfully.',
  });
}
