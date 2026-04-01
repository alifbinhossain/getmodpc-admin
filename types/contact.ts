// =============================================================================
// CONTACTS MODULE TYPES
// =============================================================================
import { BaseQueryParams, BaseRecord } from '.';

export interface CreateContactPayload {
  name: string;
  email: string;
  message: string;
}

export interface UpdateContactPayload extends Partial<CreateContactPayload> {
  id: string;
}

export interface ContactRecord extends BaseRecord {
  name: string;
  email: string;
  message: string;
}

export interface ContactQueryParams extends BaseQueryParams {
  // Add any specific query params if needed
}
