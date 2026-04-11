'use client';

import { useRouter } from 'next/navigation';

import { z } from 'zod/v3';

import { useAppForm } from '@/hooks/form';

import { FormInput, FormWrapper } from '@/components/forms';
import { Button } from '@/components/ui/button';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { Label } from '@/components/ui/label';

import { api } from '@/lib/axios';

// =============================================================================
// SCHEMA
// =============================================================================

const resetPasswordSchema = z.object({
  otp: z.number().min(1, 'OTP is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

// =============================================================================
// COMPONENT
// =============================================================================

export function ResetPasswordForm() {
  const router = useRouter();

  const form = useAppForm({
    schema: resetPasswordSchema,
    defaultValues: { otp: undefined, password: '' },
  });

  const {
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: ResetPasswordFormValues) => {
    try {
      await api.post<void, ResetPasswordFormValues>(
        '/auth/reset-password',
        values
      );
      router.push('/sign-in');
    } catch (err: any) {
      const message =
        (err instanceof Error ? err.message : err.response.message) ||
        'Invalid otp';
      setError('root', { message });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormWrapper>
        <div className='space-y-3'>
          <Label htmlFor='otp'>OTP</Label>
          <InputOTP
            className='w-full'
            maxLength={6}
            onChange={(otp) =>
              form.setValue('otp', Number(otp), {
                shouldValidate: true,
                shouldDirty: true,
                shouldTouch: true,
              })
            }
          >
            <InputOTPGroup>
              <InputOTPSlot className='size-11' index={0} />
              <InputOTPSlot className='size-11' index={1} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot className='size-11' index={2} />
              <InputOTPSlot className='size-11' index={3} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot className='size-11' index={4} />
              <InputOTPSlot className='size-11' index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <FormInput
          control={control}
          name='password'
          placeholder='Password'
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
          Reset Password
        </Button>
      </FormWrapper>
    </form>
  );
}
