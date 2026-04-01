import { PaginatedResponse } from '@/types';
import type {
  ContactQueryParams,
  ContactRecord,
  CreateContactPayload,
  UpdateContactPayload,
} from '@/types/contact';

import { useApiListQuery, useApiMutation, useApiQuery } from '@/hooks/api';

import { queryKeys } from '@/lib/react-query';

import { contactsService } from './contacts.service';

// =============================================================================
// CONTACT QUERY HOOKS
// =============================================================================

/** Fetch paginated contacts */
export function useContacts(
  params?: ContactQueryParams,
  initialData?: PaginatedResponse<ContactRecord>
) {
  return useApiListQuery({
    queryKey: queryKeys.contact.list((params ?? {}) as Record<string, unknown>),
    queryFn: () => contactsService.getContacts(params),
    initialData,
  });
}

/** Fetch single contact */
export function useContact(id: string) {
  return useApiQuery({
    queryKey: queryKeys.contact.detail(id),
    queryFn: () => contactsService.getContact(id),
    enabled: !!id,
  });
}

// =============================================================================
// CONTACT MUTATION HOOKS
// =============================================================================

/** Create contact */
export function useCreateContact() {
  return useApiMutation({
    mutationFn: (payload: CreateContactPayload) =>
      contactsService.createContact(payload),
    invalidateKeys: [queryKeys.contact.lists()],
    successMessage: 'Contact created successfully.',
  });
}

/** Update contact */
export function useUpdateContact() {
  return useApiMutation({
    mutationFn: (payload: UpdateContactPayload) =>
      contactsService.updateContact(payload),
    invalidateKeys: [queryKeys.contact.lists()],
    successMessage: 'Contact updated successfully.',
  });
}

/** Delete contact */
export function useDeleteContact() {
  return useApiMutation({
    mutationFn: (id: string) => contactsService.deleteContact(id),
    invalidateKeys: [queryKeys.contact.lists()],
    successMessage: 'Contact deleted successfully.',
  });
}
