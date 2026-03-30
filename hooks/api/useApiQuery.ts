// =============================================================================
// useApiListQuery — convenience wrapper for paginated list queries
// =============================================================================
import type { PaginatedResponse } from '@/types';
import {
  type QueryKey,
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from '@tanstack/react-query';

// =============================================================================
// useApiQuery — typed wrapper around useQuery
// =============================================================================
// Standardizes loading/error handling and enforces consistent patterns.

interface UseApiQueryOptions<TData> extends Omit<
  UseQueryOptions<TData, Error>,
  'queryKey' | 'queryFn'
> {
  queryKey: QueryKey;
  queryFn: () => Promise<TData>;
  enabled?: boolean;
}

export function useApiQuery<TData>({
  queryKey,
  queryFn,
  enabled = true,
  ...options
}: UseApiQueryOptions<TData>): UseQueryResult<TData, Error> {
  return useQuery<TData, Error>({
    queryKey,
    queryFn,
    enabled,
    ...options,
  });
}

interface UseApiListQueryOptions<TItem> {
  queryKey: QueryKey;
  queryFn: () => Promise<PaginatedResponse<TItem>>;
  enabled?: boolean;
  staleTime?: number;
  initialData?: PaginatedResponse<TItem>;
}

export function useApiListQuery<TItem>({
  queryKey,
  queryFn,
  enabled = true,
  initialData,
}: UseApiListQueryOptions<TItem>) {
  return useQuery<PaginatedResponse<TItem>, Error>({
    queryKey,
    queryFn,
    enabled,
    placeholderData: initialData,
  });
}
