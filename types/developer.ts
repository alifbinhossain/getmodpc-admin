// =============================================================================
// REPORT REASON MODULE TYPES
// =============================================================================
import { BaseQueryParams, BaseRecord } from '.';

export interface CreateDeveloperPayload {
  name: string;
  description?: string | null;
}
export interface UpdateDeveloperPayload extends CreateDeveloperPayload {
  id: string;
}

export interface DeveloperRecord extends BaseRecord {
  name: string;
  description: string;
  slug: string;
}
export interface DeveloperQueryParams extends BaseQueryParams {
  name?: string;
  slug?: string;
}
