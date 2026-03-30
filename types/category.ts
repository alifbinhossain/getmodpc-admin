// =============================================================================
// REPORT REASON MODULE TYPES
// =============================================================================
import { BaseQueryParams, BaseRecord } from '.';

export interface CreateCategoryPayload {
  description?: string | null;
  name: string;
  parent_cat_id?: string | null;
  category_icon?: string | null;
  category_bg_color?: string | null;
  category_icon_bg_color?: string | null;
}
export interface UpdateCategoryPayload extends Partial<CreateCategoryPayload> {
  id: string;
}

export interface CategoryRecord extends BaseRecord {
  description: string;
  name: string;
  parent_cat_id?: string;
  category_icon?: string;
  category_bg_color?: string;
  category_icon_bg_color?: string;
  slug: string;
}
export interface CategoryQueryParams extends BaseQueryParams {
  slug?: string;
  name?: string;
  parent_id?: string;
}
