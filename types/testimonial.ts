// =============================================================================
// REPORT REASON MODULE TYPES
// =============================================================================
import { BaseQueryParams, BaseRecord } from '.';

export interface CreateTestimonialPayload {
  name: string;
  designation: string;
  content: string;
  image_url?: string | null;
  company_logo?: string | null;
  is_active?: boolean;
  sort_order?: number;
}
export interface UpdateTestimonialPayload extends Partial<CreateTestimonialPayload> {
  id: string;
}

export interface TestimonialRecord extends BaseRecord {
  name: string;
  designation: string;
  content: string;
  image_url?: string | null;
  company_logo?: string | null;
  is_active: boolean;
  sort_order: number;
}
export interface TestimonialQueryParams extends BaseQueryParams {
  name?: string;
  designation?: string;
  is_active?: boolean;
}
