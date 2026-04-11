'use client';

import type { ReactNode } from 'react';

import type { DefaultValues } from 'react-hook-form';
import { toast } from 'sonner';
import type { z, ZodSchema } from 'zod/v3';

import type { AppForm } from '@/hooks/form';
import { useAppForm } from '@/hooks/form';

import { FormWrapper } from '@/components/forms';
import { Button } from '@/components/ui/button';

import api from '@/lib/axios';

type ProfileSectionFormProps<TSchema extends ZodSchema> = {
  schema: TSchema;
  defaultValues: DefaultValues<z.infer<TSchema>>;
  submitLabel: string;
  children: (form: AppForm<TSchema>) => ReactNode;
  tab: 'profile' | 'change-password';
};

export function ProfileSectionForm<TSchema extends ZodSchema>({
  schema,
  defaultValues,
  submitLabel,
  children,
  tab,
}: ProfileSectionFormProps<TSchema>) {
  const form = useAppForm({
    schema,
    defaultValues,
  });

  const {
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: z.infer<TSchema>) => {
    try {
      if (tab === 'change-password') {
        await api.post('/auth/change-password', values);
      } else {
        await api.patch('/auth/profile', values);
        window.location.reload();
      }
      form.reset(values);
      toast.success(
        `${tab === 'change-password' ? 'Password' : 'Profile'} updated successfully`
      );
    } catch (err: any) {
      const message =
        (err instanceof Error ? err.message : err?.response?.message) ??
        'Invalid request';
      setError('root', { message });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormWrapper>
        {children(form)}

        {form.formState.errors.root && (
          <div className='rounded-md border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive'>
            {form.formState.errors.root.message}
          </div>
        )}

        <div className='flex justify-end'>
          <Button
            disabled={!form.formState.isDirty || isSubmitting}
            type='submit'
            loading={isSubmitting}
          >
            {submitLabel}
          </Button>
        </div>
      </FormWrapper>
    </form>
  );
}
