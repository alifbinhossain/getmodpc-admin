'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import type { LoginResponse } from '@/types/auth';
import { z } from 'zod/v3';

import { useAppForm } from '@/hooks/form';

import { FormInput, FormWrapper } from '@/components/forms';
import { Button } from '@/components/ui/button';

import { api } from '@/lib/axios';

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
      await api.post<LoginResponse, SignInFormValues>('/auth/login', values);
      router.push(callbackUrl);
    } catch (err: any) {
      const message =
        (err instanceof Error ? err.message : err.response.message) ??
        'Invalid credentials';
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
        <div className='flex justify-end'>
          <Link
            href='/forgot-password'
            className='text-center text-sm text-muted-foreground hover:underline hover:text-primary'
          >
            Forgot password
          </Link>
        </div>

        {form.formState.errors.root && (
          <div className='rounded-md border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive'>
            {form.formState.errors.root.message}
          </div>
        )}

        <Button type='submit' className='w-full' loading={isSubmitting}>
          Sign In
        </Button>

        <p className='text-center text-xs text-slate-500'>
          Note: Provide your email and password to sign in.
        </p>
      </FormWrapper>
    </form>
  );
}
