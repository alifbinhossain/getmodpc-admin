import { PaginatedResponse } from '@/types';
import type {
  CreateTestimonialPayload,
  TestimonialQueryParams,
  TestimonialRecord,
  UpdateTestimonialPayload,
} from '@/types/testimonial';

import { useApiListQuery, useApiMutation } from '@/hooks/api';

import { queryKeys } from '@/lib/react-query';

import { testimonialsService } from './testimonials.service';

// =============================================================================
// TESTIMONIAL QUERY HOOKS
// =============================================================================

/** Fetch paginated testimonials */
export function useTestimonials(
  params?: TestimonialQueryParams,
  initialData?: PaginatedResponse<TestimonialRecord>
) {
  return useApiListQuery({
    queryKey: queryKeys.testimonial.list(
      (params ?? {}) as Record<string, unknown>
    ),
    queryFn: () => testimonialsService.getTestimonials(params),
    initialData,
  });
}

/** Fetch single testimonial */
export function useTestimonial(id: string) {
  return useApiListQuery({
    queryKey: queryKeys.testimonial.detail(id),
    queryFn: () => testimonialsService.getTestimonials({ searchTerm: id }),
    enabled: !!id,
  });
}

// =============================================================================
// TESTIMONIAL MUTATION HOOKS
// =============================================================================

/** Create testimonial */
export function useCreateTestimonial() {
  return useApiMutation({
    mutationFn: (payload: CreateTestimonialPayload) =>
      testimonialsService.createTestimonial(payload),
    invalidateKeys: [queryKeys.testimonial.lists()],
    successMessage: 'Testimonial created successfully.',
  });
}

/** Update testimonial */
export function useUpdateTestimonial() {
  return useApiMutation({
    mutationFn: (payload: UpdateTestimonialPayload) =>
      testimonialsService.updateTestimonial(payload),
    invalidateKeys: [queryKeys.testimonial.lists()],
    successMessage: 'Testimonial updated successfully.',
  });
}

/** Delete testimonial */
export function useDeleteTestimonial() {
  return useApiMutation({
    mutationFn: (id: string) => testimonialsService.deleteTestimonial(id),
    invalidateKeys: [queryKeys.testimonial.lists()],
    successMessage: 'Testimonial deleted successfully.',
  });
}

/** Bulk delete testimonial */
export function useDeleteTestimonials() {
  return useApiMutation({
    mutationFn: (ids: string[]) => testimonialsService.deleteTestimonials(ids),
    invalidateKeys: [queryKeys.testimonial.lists()],
    successMessage: 'Testimonials deleted successfully.',
  });
}
