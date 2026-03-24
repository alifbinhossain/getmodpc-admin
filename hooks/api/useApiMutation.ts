import {
  type QueryKey,
  useMutation,
  type UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';

import { toast } from '../use-toast';

// =============================================================================
// useApiMutation — typed wrapper around useMutation
// =============================================================================

interface UseApiMutationOptions<TData, TVariables> extends Omit<
  UseMutationOptions<TData, Error, TVariables>,
  'mutationFn'
> {
  mutationFn: (variables: TVariables) => Promise<TData>;
  // Keys to invalidate on success
  invalidateKeys?: QueryKey[];
  // Toast messages
  successMessage?: string;
  errorMessage?: string;
}

export function useApiMutation<TData, TVariables = void>({
  mutationFn,
  invalidateKeys,
  successMessage,
  errorMessage,
  onSuccess,
  onError,
  ...options
}: UseApiMutationOptions<TData, TVariables>) {
  const queryClient = useQueryClient();

  return useMutation<TData, Error, TVariables>({
    mutationFn,
    onSuccess: async (data, variables, onMutateResult, context) => {
      // Invalidate related queries
      if (invalidateKeys?.length) {
        await Promise.all(
          invalidateKeys.map((key) =>
            queryClient.invalidateQueries({ queryKey: key })
          )
        );
      }

      // Show success toast
      if (successMessage) {
        toast({
          title: 'Success',
          description: successMessage,
          variant: 'default',
        });
      }

      onSuccess?.(data, variables, onMutateResult, context);
    },
    onError: (error, variables, onMutateResult, context) => {
      // Show error toast
      const message = errorMessage ?? error.message ?? 'Something went wrong.';
      toast({ title: 'Error', description: message, variant: 'destructive' });

      onError?.(error, variables, onMutateResult, context);
    },
    ...options,
  });
}
