import type { BaseQueryParams, BaseRecord } from './index';

// =============================================================================
// USER MODULE TYPES
// =============================================================================

export interface UserRecord extends BaseRecord {
  full_name: string;
  email: string;
  is_active: boolean;
  avatar?: string;
}

export interface CreateUserPayload {
  full_name: string;
  email: string;
  password: string;
  is_active: boolean;
}

export interface UpdateUserPayload extends Partial<
  Omit<CreateUserPayload, 'password'>
> {
  id: string;
}

export interface UserQueryParams extends BaseQueryParams {
  email?: string;
  full_name?: string;
  is_active?: boolean;
}
