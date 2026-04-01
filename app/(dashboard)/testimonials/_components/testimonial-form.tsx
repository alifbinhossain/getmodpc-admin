'use client';

import type { UpdateTestimonialPayload } from '@/types/testimonial';
import { toast } from 'sonner';

import { useAppForm } from '@/hooks/form';

import { FormInput, FormTextarea, FormWrapper } from '@/components/forms';
import { FormSwitch } from '@/components/forms/_fields/switch';
import { MediaInput } from '@/components/media';
import { Button } from '@/components/ui/button';

import { ITestimonialSchema } from '@/lib/schemas/testimonial-schema';
import { testimonialSchema } from '@/lib/schemas/testimonial-schema';

import { testimonialsService } from '../_config/testimonials.service';

type Props = {
  isEditing?: boolean;
  data?: UpdateTestimonialPayload;
  onClose?: (isRefreshData?: boolean) => void;
};
export function TestimonialForm({ isEditing, data, onClose }: Props) {
  const form = useAppForm({
    schema: testimonialSchema,
    defaultValues: isEditing
      ? data
      : {
          company_logo: undefined,
          content: '',
          designation: '',
          image_url: undefined,
          is_active: true,
          name: '',
          sort_order: 1,
        },
  });

  const {
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: ITestimonialSchema) => {
    try {
      if (isEditing) {
        await testimonialsService.updateTestimonial({
          id: data!.id,
          ...values,
        });
      } else {
        await testimonialsService.createTestimonial(values);
      }
      onClose?.(true);
      form.reset();
      toast.success(`Testimonial updated successfully`);
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

        <MediaInput
          label='Image Url'
          value={form.getValues('image_url') || ''}
          onChange={(e) => {
            form.setValue('image_url', e, {
              shouldValidate: true,
              shouldDirty: true,
              shouldTouch: true,
            });
          }}
        />

        <FormInput
          control={control}
          name='designation'
          label='Designation'
          placeholder='Designation'
          required
        />
        <MediaInput
          label='Company Logo'
          value={form.getValues('company_logo') || ''}
          onChange={(e) => {
            form.setValue('company_logo', e, {
              shouldValidate: true,
              shouldDirty: true,
              shouldTouch: true,
            });
          }}
        />

        <FormInput
          control={control}
          name='sort_order'
          label='Sort Order'
          placeholder='Sort Order'
          fieldProps={{
            type: 'number',
            min: 0,
          }}
        />

        <FormTextarea
          control={control}
          name='content'
          label='Content'
          placeholder='Content'
          required
        />

        <FormSwitch control={control} name='is_active' label='Active' />

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
          {isEditing ? 'Update Testimonial' : 'Create Testimonial'}
        </Button>
      </FormWrapper>
    </form>
  );
}
