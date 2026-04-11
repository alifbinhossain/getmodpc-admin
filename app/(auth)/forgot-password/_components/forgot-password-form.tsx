'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { z } from 'zod/v3';

import { useAppForm } from '@/hooks/form';

import { FormInput, FormWrapper } from '@/components/forms';
import { Button } from '@/components/ui/button';

import { api } from '@/lib/axios';

// =============================================================================
// SCHEMA
// =============================================================================

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

// =============================================================================
// COMPONENT
// =============================================================================

export function ForgotPasswordForm() {
  const router = useRouter();

  const form = useAppForm({
    schema: forgotPasswordSchema,
    defaultValues: { email: '' },
  });

  const {
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    try {
      await api.post<void, ForgotPasswordFormValues>(
        '/auth/forgot-password',
        values
      );
      router.push('/reset-password');
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Invalid email address';
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

        <div className='flex justify-end'>
          <Link
            href='/sign-in'
            className='text-center text-sm text-muted-foreground hover:underline hover:text-primary'
          >
            Remember Password
          </Link>
        </div>

        {form.formState.errors.root && (
          <div className='rounded-md border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive'>
            {form.formState.errors.root.message}
          </div>
        )}

        <Button type='submit' className='w-full' loading={isSubmitting}>
          Send OTP
        </Button>
      </FormWrapper>
    </form>
  );
}
