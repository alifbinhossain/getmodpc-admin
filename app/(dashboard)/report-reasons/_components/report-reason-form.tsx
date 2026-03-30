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

import { reportReasonsService } from '../_config/report-reasons.service';

type Props = {
  isEditing?: boolean;
  data?: ICreateReportReasonSchema & { id: string };
  onClose?: (isRefreshData?: boolean) => void;
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
        await reportReasonsService.updateReportReason({
          id: data!.id,
          ...values,
        });
      } else {
        await reportReasonsService.createReportReason(values);
      }
      onClose?.(true);
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
          disabled={isSubmitting || (isEditing && !form.formState.isDirty)}
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
