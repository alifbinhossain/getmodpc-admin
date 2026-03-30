import type { BaseQueryParams, BaseRecord } from './index';

// =============================================================================
// USER MODULE TYPES
// =============================================================================

export interface UserRecord extends BaseRecord {
  name: string;
  email: string;
  role: string;
  status: UserStatus;
  avatar?: string;
  phone?: string;
  department?: string;
  lastLoginAt?: string;
}

export type UserStatus = 'active' | 'inactive' | 'suspended' | 'pending';

export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  role: string;
  status: UserStatus;
  phone?: string;
  department?: string;
}

export interface UpdateUserPayload extends Partial<
  Omit<CreateUserPayload, 'password'>
> {
  id: string;
}

export interface UserQueryParams extends BaseQueryParams {
  role?: string;
  status?: UserStatus;
  department?: string;
}
