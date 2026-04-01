import type { ApiResponse, PaginatedResponse } from '@/types';
import type {
  ContactQueryParams,
  ContactRecord,
  CreateContactPayload,
  UpdateContactPayload,
} from '@/types/contact';

import { api } from '@/lib/axios';
import { buildQueryString } from '@/lib/utils';

// =============================================================================
// CONTACTS API SERVICE
// =============================================================================

export const contactsService = {
  /** Fetch paginated list of contacts */
  getContacts(
    params?: ContactQueryParams
  ): Promise<PaginatedResponse<ContactRecord>> {
    const qs = params
      ? buildQueryString(params as Record<string, unknown>)
      : '';
    return api.list<ContactRecord>(`/contacts${qs ? `?${qs}` : ''}`);
  },

  /** Fetch a single contact by ID */
  getContact(id: string): Promise<ApiResponse<ContactRecord>> {
    return api.get<ContactRecord>(`/contacts/${id}`);
  },

  /** Create a new contact */
  createContact(
    payload: CreateContactPayload
  ): Promise<ApiResponse<ContactRecord>> {
    return api.post<ContactRecord, CreateContactPayload>('/contacts', payload);
  },

  /** Update an existing contact */
  updateContact({
    id,
    ...payload
  }: UpdateContactPayload): Promise<ApiResponse<ContactRecord>> {
    return api.patch<ContactRecord, Omit<UpdateContactPayload, 'id'>>(
      `/contacts/${id}`,
      payload
    );
  },

  /** Delete a contact */
  deleteContact(id: string): Promise<ApiResponse<void>> {
    return api.delete<void>(`/contacts/${id}`);
  },

  /** bulk a deleted contact */
  deleteContacts(ids: string[]): Promise<ApiResponse<void>> {
    return api.post<void>(`/contacts/bulk-delete`, { ids });
  },
};
