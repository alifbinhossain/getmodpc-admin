'use client';

import {
  EnumUserAppRequestStatus,
  UpdateUserAppRequestPayload,
} from '@/types/user-app-request';
import { toast } from 'sonner';

import { useAppForm } from '@/hooks/form';

import { FormInput, FormSelect, FormWrapper } from '@/components/forms';
import { Button } from '@/components/ui/button';

import { IUserAppRequestSchema, userAppRequestSchema } from '@/lib/schemas/user-app-request-schema';

import { userAppRequestsService } from '../_config/user-app-requests.service';

type Props = {
  isEditing?: boolean;
  data?: UpdateUserAppRequestPayload;
  onClose?: (isRefreshData?: boolean) => void;
};
export function UserAppRequestForm({ isEditing, data, onClose }: Props) {
  const form = useAppForm({
    schema: userAppRequestSchema,
    defaultValues: data,
  });

  const {
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: IUserAppRequestSchema) => {
    try {
      await userAppRequestsService.updateUserAppRequest({
        id: data!.id,
        ...values,
      });
      onClose?.(true);
      form.reset();
      toast.success(`User App Request updated successfully`);
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
          name='app_name'
          label='App Name'
          placeholder='App Name'
        />

        <FormInput
          control={control}
          name='app_url'
          label='App URL'
          placeholder='App URL'
        />

        <FormSelect
          control={control}
          name='status'
          label='Status'
          options={Object.values(EnumUserAppRequestStatus).map((status) => ({
            label: status,
            value: status,
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
          Update
        </Button>
      </FormWrapper>
    </form>
  );
}
