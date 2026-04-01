'use client';

import { EnumMediaType } from '@/types/ad';
import type { UpdateAdPayload } from '@/types/ad';
import { toast } from 'sonner';

import { useAppForm } from '@/hooks/form';

import {
  FormInput,
  FormSelect,
  FormTextarea,
  FormWrapper,
} from '@/components/forms';
import { FormSwitch } from '@/components/forms/_fields/switch';
import { MediaInput } from '@/components/media';
import { Button } from '@/components/ui/button';

import { adSchema, IAdSchema } from '@/lib/schemas/ad-schema';
import { formatToDatetimeLocal } from '@/lib/utils';

import { adsService } from '../_config/ads.service';

type Props = {
  isEditing?: boolean;
  data?: UpdateAdPayload;
  onClose?: (isRefreshData?: boolean) => void;
};
export function AdForm({ isEditing, data, onClose }: Props) {
  const form = useAppForm({
    schema: adSchema,
    defaultValues: isEditing
      ? {
          ...data,
          start_at: formatToDatetimeLocal(data?.start_at || new Date()),
          end_at: formatToDatetimeLocal(data?.end_at || new Date()),
        }
      : {
          cta_label: '',
          description: '',
          media_type: EnumMediaType.IMAGE,
          title: '',
          cta_url: '',
          is_active: true,
          start_at: formatToDatetimeLocal(new Date()),
          end_at: formatToDatetimeLocal(new Date()),
        },
  });

  const {
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: IAdSchema) => {
    try {
      if (isEditing) {
        await adsService.updateAd({
          id: data!.id,
          ...values,
        });
      } else {
        await adsService.createAd(values);
      }
      onClose?.(true);
      form.reset();
      toast.success(`Ad updated successfully`);
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
        />

        <MediaInput
          label='Media URL *'
          value={form.getValues('media_url') || ''}
          onChange={(e) => {
            form.setValue('media_url', e, {
              shouldValidate: true,
              shouldDirty: true,
              shouldTouch: true,
            });
          }}
        />

        <FormSelect
          control={control}
          name='media_type'
          label='Media Type'
          options={[
            { label: 'Image', value: EnumMediaType.IMAGE },
            { label: 'Video', value: EnumMediaType.VIDEO },
          ]}
          required
        />

        <FormInput
          control={control}
          name='cta_label'
          label='Call to Action Label'
          placeholder='Call to Action Label'
        />

        <FormInput
          control={control}
          name='cta_url'
          label='Call to Action URL'
          placeholder='Call to Action URL'
          required
          fieldProps={{
            type: 'url',
          }}
        />

        <div className='grid sm:grid-cols-2 gap-4'>
          <FormInput
            control={control}
            name='start_at'
            label='Start At'
            placeholder='Start At'
            fieldProps={{
              type: 'datetime-local',
            }}
          />

          <FormInput
            control={control}
            name='end_at'
            label='End At'
            placeholder='End At'
            fieldProps={{
              type: 'datetime-local',
            }}
          />
        </div>

        <FormTextarea
          control={control}
          name='description'
          label='Content'
          placeholder='Content'
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
          {isEditing ? 'Update Ad' : 'Create Ad'}
        </Button>
      </FormWrapper>
    </form>
  );
}
