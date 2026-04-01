// =============================================================================
// ADS MODULE TYPES
// =============================================================================
import { BaseQueryParams, BaseRecord } from '.';

export interface CreateAdPayload {
  media_url: string;
  media_type: EnumMediaType;
  cta_url: string;
  cta_label?: string;
  title?: string;
  description?: string;
  is_active?: boolean;
  start_at: string;
  end_at: string;
}
export interface UpdateAdPayload extends Partial<CreateAdPayload> {
  id: string;
}

export interface AdRecord extends BaseRecord {
  media_url: string;
  media_type: EnumMediaType;
  cta_url: string;
  cta_label?: string;
  title?: string;
  description?: string;
  is_active: boolean;
  start_at: Date;
  end_at: Date;
}
export interface AdQueryParams extends BaseQueryParams {
  start_date?: string;
  end_date?: string;
  media_type?: EnumMediaType;
  is_active?: boolean;
}

export enum EnumMediaType {
  IMAGE = 'image',
  VIDEO = 'video',
}
