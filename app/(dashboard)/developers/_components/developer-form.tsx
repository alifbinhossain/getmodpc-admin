'use client';

import { UpdateDeveloperPayload } from '@/types/developer';
import { toast } from 'sonner';

import { useAppForm } from '@/hooks/form';

import { FormInput, FormTextarea, FormWrapper } from '@/components/forms';
import { Button } from '@/components/ui/button';

import {
  ITagDeveloperSchema,
  tagDeveloperSchema,
} from '@/lib/schemas/tagAndDeveloper-schema';

import { developersService } from '../_config/developers.service';

type Props = {
  isEditing?: boolean;
  data?: UpdateDeveloperPayload;
  onClose?: (isRefreshData?: boolean) => void;
};
export function DeveloperForm({ isEditing, data, onClose }: Props) {
  const form = useAppForm({
    schema: tagDeveloperSchema,
    defaultValues: data,
  });

  const {
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: ITagDeveloperSchema) => {
    try {
      if (isEditing) {
        await developersService.updateDeveloper({
          id: data!.id,
          ...values,
        });
      } else {
        await developersService.createDeveloper(values);
      }
      onClose?.(true);
      form.reset();
      toast.success(`Developer updated successfully`);
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
          name='name'
          label='Name'
          placeholder='Name'
          required
        />

        <FormTextarea
          control={control}
          name='description'
          label='Description'
          placeholder='Description'
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
