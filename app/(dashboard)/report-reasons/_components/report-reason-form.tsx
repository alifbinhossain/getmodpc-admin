'use client';

import { toast } from 'sonner';

import { useAppForm } from '@/hooks/form';

import { FormInput, FormWrapper } from '@/components/forms';
import { FormSwitch } from '@/components/forms/_fields/switch';
import { Button } from '@/components/ui/button';

import {
  createReportReasonSchema,
  ICreateReportReasonSchema,
} from '@/lib/schemas/report-schema';

import { createReportReason, updateReportReason } from '../_actions';

type Props = {
  isEditing?: boolean;
  data?: ICreateReportReasonSchema & { id: string };
  onClose?: () => void;
};
export function ReportReasonForm({ isEditing, data, onClose }: Props) {
  const form = useAppForm({
    schema: createReportReasonSchema,
    defaultValues: isEditing ? data : { is_active: true, title: '' },
  });

  const {
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: ICreateReportReasonSchema) => {
    try {
      if (isEditing) {
        await updateReportReason<ICreateReportReasonSchema>(
          data?.id ?? '',
          values
        );
      } else {
        await createReportReason<ICreateReportReasonSchema>(values);
      }
      onClose?.();
      form.reset();
      toast.success(
        `Report reason ${isEditing ? 'updated' : 'created'} successfully`
      );
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
          name='title'
          placeholder='Enter title'
          required
        />
        <FormSwitch control={control} name='is_active' />

        {form.formState.errors.root && (
          <div className='rounded-md border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive'>
            {form.formState.errors.root.message}
          </div>
        )}

        <Button
          disabled={isSubmitting || !form.formState.isDirty}
          type='submit'
          className='w-full'
          loading={isSubmitting}
        >
          {isEditing ? 'Update' : 'Create'}
        </Button>
      </FormWrapper>
    </form>
  );
}
