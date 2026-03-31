'use client';

import { PageType, UpdatePagePayload } from '@/types/page';
import { MantineProvider } from '@mantine/core';
import { toast } from 'sonner';

import { useAppForm } from '@/hooks/form';

import {
  FormInput,
  FormRichText,
  FormSelect,
  FormTextarea,
  FormWrapper,
} from '@/components/forms';
import { FormSwitch } from '@/components/forms/_fields/switch';
import { Button } from '@/components/ui/button';

import { IPageSchema, pageSchema } from '@/lib/schemas/page-schema';

import { pagesService } from '../_config/pages.service';

type Props = {
  isEditing?: boolean;
  data?: UpdatePagePayload;
  onClose?: (isRefreshData?: boolean) => void;
};
export function PageForm({ isEditing, data, onClose }: Props) {
  const form = useAppForm({
    schema: pageSchema,
    defaultValues: isEditing
      ? data
      : {
          content: '',
          is_active: true,
          page_type: PageType.INTERNAL,
          title: '',
        },
  });

  const {
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting },
    watch,
  } = form;

  const onSubmit = async (values: IPageSchema) => {
    try {
      if (isEditing) {
        await pagesService.updatePage({
          id: data!.id,
          ...values,
        });
      } else {
        await pagesService.createPage(values);
      }
      onClose?.(true);
      form.reset();
      toast.success(`Page updated successfully`);
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
          label='Page Name'
          placeholder='Name'
          required
        />

        <FormSelect
          control={control}
          name='page_type'
          label='Page Type'
          options={[
            { label: 'Internal', value: PageType.INTERNAL },
            { label: 'External', value: PageType.EXTERNAL },
          ]}
          required
        />
        <MantineProvider>
          <FormRichText
            control={control}
            name='content'
            label='Content'
            placeholder='Content'
            required
          />
        </MantineProvider>
        {watch('page_type') === PageType.EXTERNAL && (
          <>
            <FormInput
              control={control}
              name='external_link'
              label='External Link'
              placeholder='https://example.com'
            />
            <FormSwitch
              control={control}
              name='is_open_new_tab'
              label='Open in New Tab'
            />
          </>
        )}

        <FormSwitch control={control} name='is_active' label='Active' />
        <FormInput
          control={control}
          name='meta_title'
          label='Meta Title'
          placeholder='Meta Title'
        />
        <FormTextarea
          control={control}
          name='meta_description'
          label='Meta Description'
          placeholder='Meta Description'
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
          {isEditing ? 'Update Page' : 'Create Page'}
        </Button>
      </FormWrapper>
    </form>
  );
}
