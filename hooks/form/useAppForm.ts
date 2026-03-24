import { zodResolver } from '@hookform/resolvers/zod';
import {
  type DefaultValues,
  useForm,
  type UseFormProps,
} from 'react-hook-form';
import type { z, ZodSchema } from 'zod/v3';

// =============================================================================
// useAppForm — integrates React Hook Form with Zod resolver
// =============================================================================

interface UseAppFormOptions<TSchema extends ZodSchema> {
  schema: TSchema;
  defaultValues?: DefaultValues<z.infer<TSchema>>;
  formOptions?: Omit<
    UseFormProps<z.infer<TSchema>>,
    'resolver' | 'defaultValues'
  >;
}

export function useAppForm<TSchema extends ZodSchema>({
  schema,
  defaultValues,
  formOptions,
}: UseAppFormOptions<TSchema>) {
  return useForm<z.infer<TSchema>>({
    resolver: zodResolver(schema as any),
    defaultValues,
    mode: 'onBlur', // Validate on blur for better UX
    reValidateMode: 'onChange', // Re-validate as user types after first error
    ...formOptions,
  });
}

export type AppForm<TSchema extends ZodSchema> = ReturnType<
  typeof useAppForm<TSchema>
>;
