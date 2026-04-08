'use client';

import type { ReactNode } from 'react';

import type { UpdateSettingsPayload } from '@/types/settings';
import type { DefaultValues } from 'react-hook-form';
import type { z, ZodSchema } from 'zod/v3';

import type { AppForm } from '@/hooks/form';
import { useAppForm } from '@/hooks/form';

import { FormWrapper } from '@/components/forms';
import { Button } from '@/components/ui/button';

import { useUpdateSettings } from '../_config/settings.hooks';

type SettingsSectionFormProps<TSchema extends ZodSchema> = {
  schema: TSchema;
  defaultValues: DefaultValues<z.infer<TSchema>>;
  submitLabel: string;
  children: (form: AppForm<TSchema>) => ReactNode;
};

export function SettingsSectionForm<TSchema extends ZodSchema>({
  schema,
  defaultValues,
  submitLabel,
  children,
}: SettingsSectionFormProps<TSchema>) {
  const updateSettings = useUpdateSettings();
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
      await updateSettings.mutateAsync(values as UpdateSettingsPayload);
      form.reset(values);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid request';
      setError('root', { message });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
