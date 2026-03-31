'use client';

import { EnumPlatformType } from '@/types';
import type { UpdateFaqPayload } from '@/types/faq';
import { toast } from 'sonner';

import { useAppForm } from '@/hooks/form';

import {
  FormInput,
  FormSelect,
  FormTextarea,
  FormWrapper,
} from '@/components/forms';
import { Button } from '@/components/ui/button';

import { IFaqSchema } from '@/lib/schemas/faq-schema';
import { faqSchema } from '@/lib/schemas/faq-schema';

import { faqsService } from '../_config/faqs.service';

type Props = {
  isEditing?: boolean;
  data?: UpdateFaqPayload;
  onClose?: (isRefreshData?: boolean) => void;
};
export function FaqForm({ isEditing, data, onClose }: Props) {
  const form = useAppForm({
    schema: faqSchema,
    defaultValues: isEditing
      ? data
      : {
          content: '',
          platform: EnumPlatformType.ANDROID,
          title: '',
        },
  });

  const {
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: IFaqSchema) => {
    try {
      if (isEditing) {
        await faqsService.updateFaq({
          id: data!.id,
          ...values,
        });
      } else {
        await faqsService.createFaq(values);
      }
      onClose?.(true);
      form.reset();
      toast.success(`Faq updated successfully`);
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
          label='Title'
          placeholder='Title'
          required
        />

        <FormSelect
          control={control}
          name='platform'
          label='Platform'
          options={Object.values(EnumPlatformType).map((v) => {
            return {
              label: v,
              value: v,
            };
          })}
          required
        />
        <FormTextarea
          control={control}
          name='content'
          label='Content'
          placeholder='Content'
          required
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
          {isEditing ? 'Update Faq' : 'Create Faq'}
        </Button>
      </FormWrapper>
    </form>
  );
}
