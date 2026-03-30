// =============================================================================
// REPORT REASON MODULE TYPES
// =============================================================================
import { BaseQueryParams, BaseRecord } from '.';

export interface CreateTagAndDeveloperPayload {
  name: string;
  description?: string | null;
}
export interface UpdateTagAndDeveloperPayload extends CreateTagAndDeveloperPayload {
  id: string;
}

export interface TagAndDeveloperRecord extends BaseRecord {
  name: string;
  description: string;
  slug: string;
}
export interface TagAndDeveloperQueryParams extends BaseQueryParams {
  name?: string;
  slug?: string;
}
