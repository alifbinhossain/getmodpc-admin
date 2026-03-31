import type { ApiResponse, PaginatedResponse } from '@/types';
import type {
  CreateTestimonialPayload,
  TestimonialQueryParams,
  TestimonialRecord,
  UpdateTestimonialPayload,
} from '@/types/testimonial';

import { api } from '@/lib/axios';
import { buildQueryString } from '@/lib/utils';

// =============================================================================
// TESTIMONIALS API SERVICE
// =============================================================================

export const testimonialsService = {
  /** Fetch paginated list of testimonials */
  getTestimonials(
    params?: TestimonialQueryParams
  ): Promise<PaginatedResponse<TestimonialRecord>> {
    const qs = params
      ? buildQueryString(params as Record<string, unknown>)
      : '';
    return api.list<TestimonialRecord>(`/testimonials${qs ? `?${qs}` : ''}`);
  },

  /** Fetch a single testimonial by ID */
  getTestimonial(id: string): Promise<ApiResponse<TestimonialRecord>> {
    return api.get<TestimonialRecord>(`/testimonials/${id}`);
  },

  /** Create a new testimonial */
  createTestimonial(
    payload: CreateTestimonialPayload
  ): Promise<ApiResponse<TestimonialRecord>> {
    return api.post<TestimonialRecord, CreateTestimonialPayload>(
      '/testimonials',
      payload
    );
  },

  /** Update an existing testimonial */
  updateTestimonial({
    id,
    ...payload
  }: UpdateTestimonialPayload): Promise<ApiResponse<TestimonialRecord>> {
    return api.patch<TestimonialRecord, Omit<UpdateTestimonialPayload, 'id'>>(
      `/testimonials/${id}`,
      payload
    );
  },

  /** Delete a testimonial */
  deleteTestimonial(id: string): Promise<ApiResponse<void>> {
    return api.delete<void>(`/testimonials/${id}`);
  },

  /** Bulk delete testimonials */
  deleteTestimonials(ids: string[]): Promise<ApiResponse<void>> {
    return api.post<void, { ids: string[] }>('/testimonials/bulk-delete', {
      ids,
    });
  },
};
