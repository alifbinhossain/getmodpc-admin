'use client';

import { UpdateCategoryPayload } from '@/types/category';
import { toast } from 'sonner';

import { useAppForm } from '@/hooks/form';

import { FormInput, FormTextarea, FormWrapper } from '@/components/forms';
import { MediaInput } from '@/components/media';
import { Button } from '@/components/ui/button';

import { categorySchema, ICategorySchema } from '@/lib/schemas/category-schema';

import { categoriesService } from '../_config/categories.service';
import SelectCategoryField from './select-category-field';

type Props = {
  isEditing?: boolean;
  data?: UpdateCategoryPayload;
  onClose?: (isRefreshData?: boolean) => void;
};
export function CategoryForm({ isEditing, data, onClose }: Props) {
  const form = useAppForm({
    schema: categorySchema,
    defaultValues: isEditing
      ? data
      : {
          category_bg_color: '#f9f9f9',
          category_icon_bg_color: '#f9f9f9',
          description: '',
          name: '',
          category_icon: '',
        },
  });

  const {
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: ICategorySchema) => {
    try {
      if (isEditing) {
        await categoriesService.updateCategory({
          id: data!.id,
          ...values,
        });
      } else {
        await categoriesService.createCategory(values);
      }
      onClose?.(true);
      form.reset();
      toast.success(`Category updated successfully`);
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

        <MediaInput
          value={form.getValues('category_icon') || ''}
          onChange={(e) => {
            form.setValue('category_icon', e, {
              shouldValidate: true,
              shouldDirty: true,
              shouldTouch: true,
            });
          }}
        />

        <SelectCategoryField control={control} />

        <div className='grid grid-cols-2 gap-4'>
          <FormInput
            control={control}
            name='category_bg_color'
            label='BG Color'
            fieldProps={{
              type: 'color',
            }}
          />

          <FormInput
            control={control}
            name='category_icon_bg_color'
            label='Icon BG Color'
            fieldProps={{
              type: 'color',
            }}
          />
        </div>

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
          {isEditing ? 'Update Category' : 'Create Category'}
        </Button>
      </FormWrapper>
    </form>
  );
}
