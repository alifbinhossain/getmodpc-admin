// =============================================================================
// REPORT REASON MODULE TYPES
// =============================================================================
import { BaseQueryParams, BaseRecord } from '.';

export interface CreatePagePayload {
  title: string;
  content: string;
  is_active: boolean;
  external_link?: string | null;
  is_open_new_tab?: boolean;
  page_type: PageType | string;
  meta_title?: string | null;
  meta_description?: string | null;
}
export interface UpdatePagePayload extends Partial<CreatePagePayload> {
  id: string;
}

export interface PageRecord extends BaseRecord {
  title: string;
  content: string;
  is_active: boolean;
  external_link?: string | null;
  is_open_new_tab: boolean;
  page_type: PageType;
  meta_title?: string | null;
  meta_description?: string | null;
  slug: string;
}
export interface PageQueryParams extends BaseQueryParams {
  slug?: string;
  title?: string;
  page_type?: PageType;
  is_active?: boolean;
  external_link?: string;
}

export enum PageType {
  INTERNAL = 'internal',
  EXTERNAL = 'external',
}
