import type { ApiResponse, PaginatedResponse } from '@/types';
import type {
  CreateFaqPayload,
  FaqQueryParams,
  FaqRecord,
  UpdateFaqPayload,
} from '@/types/faq';

import { api } from '@/lib/axios';
import { buildQueryString } from '@/lib/utils';

// =============================================================================
// FAQS API SERVICE
// =============================================================================

export const faqsService = {
  /** Fetch paginated list of faqs */
  getFaqs(
    params?: FaqQueryParams
  ): Promise<PaginatedResponse<FaqRecord>> {
    const qs = params
      ? buildQueryString(params as Record<string, unknown>)
      : '';
    return api.list<FaqRecord>(`/faqs${qs ? `?${qs}` : ''}`);
  },

  /** Fetch a single faq by ID */
  getFaq(id: string): Promise<ApiResponse<FaqRecord>> {
    return api.get<FaqRecord>(`/faqs/${id}`);
  },

  /** Create a new faq */
  createFaq(
    payload: CreateFaqPayload
  ): Promise<ApiResponse<FaqRecord>> {
    return api.post<FaqRecord, CreateFaqPayload>(
      '/faqs',
      payload
    );
  },

  /** Update an existing faq */
  updateFaq({
    id,
    ...payload
  }: UpdateFaqPayload): Promise<ApiResponse<FaqRecord>> {
    return api.patch<FaqRecord, Omit<UpdateFaqPayload, 'id'>>(
      `/faqs/${id}`,
      payload
    );
  },

  /** Delete a faq */
  deleteFaq(id: string): Promise<ApiResponse<void>> {
    return api.delete<void>(`/faqs/${id}`);
  },

  /** Bulk delete faqs */
  deleteFaqs(ids: string[]): Promise<ApiResponse<void>> {
    return api.post<void, { ids: string[] }>('/faqs/bulk-delete', {
      ids,
    });
  },
};
