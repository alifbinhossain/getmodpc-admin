import { PaginatedResponse } from '@/types';
import type {
  CreateFaqPayload,
  FaqQueryParams,
  FaqRecord,
  UpdateFaqPayload,
} from '@/types/faq';

import { useApiListQuery, useApiMutation } from '@/hooks/api';

import { queryKeys } from '@/lib/react-query';

import { faqsService } from './faqs.service';

// =============================================================================
// FAQ QUERY HOOKS
// =============================================================================

/** Fetch paginated FAQs */
export function useFaqs(
  params?: FaqQueryParams,
  initialData?: PaginatedResponse<FaqRecord>
) {
  return useApiListQuery({
    queryKey: queryKeys.faq.list((params ?? {}) as Record<string, unknown>),
    queryFn: () => faqsService.getFaqs(params),
    initialData,
  });
}

/** Fetch single faq */
export function useFaq(id: string) {
  return useApiListQuery({
    queryKey: queryKeys.faq.detail(id),
    queryFn: () => faqsService.getFaqs({ searchTerm: id }),
    enabled: !!id,
  });
}

// =============================================================================
// FAQ MUTATION HOOKS
// =============================================================================

/** Create faq */
export function useCreateFaq() {
  return useApiMutation({
    mutationFn: (payload: CreateFaqPayload) => faqsService.createFaq(payload),
    invalidateKeys: [queryKeys.faq.lists()],
    successMessage: 'Faq created successfully.',
  });
}

/** Update faq */
export function useUpdateFaq() {
  return useApiMutation({
    mutationFn: (payload: UpdateFaqPayload) => faqsService.updateFaq(payload),
    invalidateKeys: [queryKeys.faq.lists()],
    successMessage: 'Faq updated successfully.',
  });
}

/** Delete faq */
export function useDeleteFaq() {
  return useApiMutation({
    mutationFn: (id: string) => faqsService.deleteFaq(id),
    invalidateKeys: [queryKeys.faq.lists()],
    successMessage: 'Faq deleted successfully.',
  });
}

/** Bulk delete faq */
export function useDeleteFaqs() {
  return useApiMutation({
    mutationFn: (ids: string[]) => faqsService.deleteFaqs(ids),
    invalidateKeys: [queryKeys.faq.lists()],
    successMessage: 'Faqs deleted successfully.',
  });
}
