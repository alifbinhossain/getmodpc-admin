// =============================================================================
// USER APP REQUEST MODULE TYPES
// =============================================================================
import { BaseQueryParams, BaseRecord } from '.';

export interface CreateUserAppRequestPayload {
  app_name: string;
  app_url: string;
  status: EnumUserAppRequestStatus;
}
export interface UpdateUserAppRequestPayload {
  id: string;
  app_name?: string;
  app_url?: string;
  status?: string;
}

export interface UserAppRequestRecord extends BaseRecord {
  app_name: string;
  app_url: string;
  status: EnumUserAppRequestStatus;
}
export interface UserAppRequestQueryParams extends BaseQueryParams {
  status?: EnumUserAppRequestStatus;
  app_name?: string;
  app_url?: string;
}

export enum EnumUserAppRequestStatus {
  PENDING = 'pending',
  DECLINED = 'declined',
  RESOLVED = 'resolved',
}
