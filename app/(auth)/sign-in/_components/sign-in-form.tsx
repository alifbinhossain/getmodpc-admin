'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import type { LoginResponse } from '@/types/auth';
import { z } from 'zod/v3';

import { useAppForm } from '@/hooks/form';

import { FormInput, FormWrapper } from '@/components/forms';
import { Button } from '@/components/ui/button';

import { api } from '@/lib/axios';
import { setTokenCookie } from '@/lib/utils';

// =============================================================================
// SCHEMA
// =============================================================================

const signInSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type SignInFormValues = z.infer<typeof signInSchema>;

// =============================================================================
// COMPONENT
// =============================================================================

export function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? '/dashboard';

  const form = useAppForm({
    schema: signInSchema,
    defaultValues: { email: '', password: '' },
  });

  const {
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: SignInFormValues) => {
    try {
      const response = await api.post<LoginResponse, SignInFormValues>(
        '/auth/login',
        values
      );
      setTokenCookie(response.data.tokens.accessToken);
      router.push(callbackUrl);
      router.refresh();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Invalid credentials';
      setError('root', { message });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormWrapper>
        <FormInput
          control={control}
          name='email'
          placeholder='admin@company.com'
          fieldProps={{
            type: 'email',
          }}
        />
        <FormInput
          control={control}
          name='password'
          placeholder='••••••••'
          fieldProps={{
            type: 'password',
          }}
        />

        {form.formState.errors.root && (
          <div className='rounded-md border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive'>
            {form.formState.errors.root.message}
          </div>
        )}

        <Button type='submit' className='w-full' loading={isSubmitting}>
          Sign In
        </Button>

        <p className='text-center text-xs text-slate-500'>
          Demo: any email + password (8+ chars) to test validation
        </p>
      </FormWrapper>
    </form>
  );
}
