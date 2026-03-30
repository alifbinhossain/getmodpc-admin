'use client';

import { EnumReportStatus, UpdateReportPayload } from '@/types/report';
import { toast } from 'sonner';

import { useAppForm } from '@/hooks/form';

import { FormSelect, FormWrapper } from '@/components/forms';
import { Button } from '@/components/ui/button';

import {
  IUpdateReportSchema,
  updateReportSchema,
} from '@/lib/schemas/report-schema';

import { reportsService } from '../_config/reports.service';

type Props = {
  isEditing?: boolean;
  data?: UpdateReportPayload;
  onClose?: (isRefreshData?: boolean) => void;
};
export function ReportForm({ isEditing, data, onClose }: Props) {
  const form = useAppForm({
    schema: updateReportSchema,
    defaultValues: data,
  });

  const {
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: IUpdateReportSchema) => {
    try {
      await reportsService.updateReport({
        id: data!.id,
        ...values,
      });
      onClose?.(true);
      form.reset();
      toast.success(`Report updated successfully`);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Invalid credentials';
      setError('root', { message });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormWrapper>
        <FormSelect
          control={control}
          name='status'
          required
          options={Object.values(EnumReportStatus).map((status) => ({
            label: status.toString(),
            value: status.toString(),
          }))}
        />

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
          {isEditing ? 'Update report' : 'Create report'}
        </Button>
      </FormWrapper>
    </form>
  );
}
