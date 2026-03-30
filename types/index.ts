// =============================================================================
// GLOBAL TYPES
// =============================================================================

// Generic API response wrapper
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  timestamp: string;
}

// Paginated response
export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
  message: string;
  success: boolean;
  statusCode: number;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// API error structure
export interface ApiError {
  message: string;
  code: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

// Query params base
export interface BaseQueryParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

// Generic select option
export interface SelectOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
  description?: string;
}

// Navigation item
export interface NavItem {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  children?: NavItem[];
  disabled?: boolean;
}

// Status badge variant
export type StatusVariant =
  | 'default'
  | 'secondary'
  | 'destructive'
  | 'outline'
  | 'success'
  | 'warning';

export interface StatusConfig {
  label: string;
  variant: StatusVariant;
}

export interface BaseRecord {
  id: string;
  created_at: string;
  updated_at: string;
}
