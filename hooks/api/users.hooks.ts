import type { UserQueryParams } from '@/types/users';
import type { CreateUserPayload, UpdateUserPayload } from '@/types/users';
import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/lib/react-query';

import { useApiListQuery, useApiMutation } from './index';
import { usersService } from './users.service';

// =============================================================================
// USERS QUERY HOOKS
// =============================================================================

/** Fetch paginated users */
export function useUsers(params?: UserQueryParams) {
  return useApiListQuery({
    queryKey: queryKeys.users.list((params ?? {}) as Record<string, unknown>),
    queryFn: () => usersService.getUsers(params),
  });
}

/** Fetch single user */
export function useUser(id: string) {
  return useQuery({
    queryKey: queryKeys.users.detail(id),
    queryFn: () => usersService.getUser(id),
    enabled: !!id,
  });
}

/** Fetch single user */
export function useGetMe() {
  return useQuery({
    queryKey: queryKeys.users.profile(),
    queryFn: () => usersService.getMe(),
    enabled: true,
  });
}

// =============================================================================
// USERS MUTATION HOOKS
// =============================================================================

/** Create user */
export function useCreateUser() {
  return useApiMutation({
    mutationFn: (payload: CreateUserPayload) =>
      usersService.createUser(payload),
    invalidateKeys: [queryKeys.users.lists()],
    successMessage: 'User created successfully.',
  });
}

/** Update user */
export function useUpdateUser() {
  return useApiMutation({
    mutationFn: (payload: UpdateUserPayload) =>
      usersService.updateUser(payload),
    invalidateKeys: [queryKeys.users.lists()],
    successMessage: 'User updated successfully.',
  });
}

/** Delete user */
export function useDeleteUser() {
  return useApiMutation({
    mutationFn: (id: string) => usersService.deleteUser(id),
    invalidateKeys: [queryKeys.users.lists()],
    successMessage: 'User deleted successfully.',
  });
}

/** Bulk delete users */
export function useDeleteUsers() {
  return useApiMutation({
    mutationFn: (ids: string[]) => usersService.deleteUsers(ids),
    invalidateKeys: [queryKeys.users.lists()],
    successMessage: 'Users deleted successfully.',
  });
}
