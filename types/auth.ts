// =============================================================================
// AUTH TYPES
// =============================================================================

export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar?: string;
  is_active: boolean;
  last_login_at: string;
}

export type UserRole = 'super_admin' | 'admin' | 'manager' | 'viewer';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  admin: User;
  accessToken: string;
  refreshToken: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// JWT Payload (what's stored in the token)
export interface JWTPayload {
  sub: string; // user id
  email: string;
  role: UserRole;
  iat: number;
  exp: number;
}
