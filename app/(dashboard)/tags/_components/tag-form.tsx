'use client';

import { UpdateTagAndDeveloperPayload } from '@/types/tagAndDeveloper';
import { toast } from 'sonner';

import { useAppForm } from '@/hooks/form';

import { FormInput, FormTextarea, FormWrapper } from '@/components/forms';
import { Button } from '@/components/ui/button';

import {
  ITagDeveloperSchema,
  tagDeveloperSchema,
} from '@/lib/schemas/tagAndDeveloper-schema';

import { tagsService } from '../_config/tags.service';

type Props = {
  isEditing?: boolean;
  data?: UpdateTagAndDeveloperPayload;
  onClose?: (isRefreshData?: boolean) => void;
};
export function TagForm({ isEditing, data, onClose }: Props) {
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
        await tagsService.updateTag({
          id: data!.id,
          ...values,
        });
      } else {
        await tagsService.createTag(values);
      }
      onClose?.(true);
      form.reset();
      toast.success(`Tag updated successfully`);
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
          {isEditing ? 'Update Tag' : 'Create Tag'}
        </Button>
      </FormWrapper>
    </form>
  );
}
