// =============================================================================
//  FAQ MODULE TYPES
// =============================================================================
import { BaseQueryParams, BaseRecord, EnumPlatformType } from '.';

export interface CreateFaqPayload {
  title: string;
  platform: EnumPlatformType | string;
  content: string;
}
export interface UpdateFaqPayload extends Partial<CreateFaqPayload> {
  id: string;
}

export interface FaqRecord extends BaseRecord {
  title: string;
  platform: EnumPlatformType;
  content: string;
}
export interface FaqQueryParams extends BaseQueryParams {
  platform?: EnumPlatformType;
}
