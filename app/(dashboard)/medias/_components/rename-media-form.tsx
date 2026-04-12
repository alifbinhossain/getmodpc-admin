'use client';

import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { FormInput, FormWrapper } from '@/components/forms';
import { Button } from '@/components/ui/button';

import { mediasService } from '../_config/medias.service';

type RenameMediaFormValues = {
  oldKey: string;
  newKey: string;
};

type Props = {
  data: string;
  isFolder: boolean;
  onClose?: (isRefreshData?: boolean) => void;
};

export default function RenameMediaForm({ data, isFolder, onClose }: Props) {
  const form = useForm<RenameMediaFormValues>({
    defaultValues: {
      oldKey: data,
      newKey: '',
    },
  });

  const {
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: RenameMediaFormValues) => {
    try {
      if (isFolder) {
        await mediasService.renameFolder({
          newFolder: values.newKey,
          oldFolder: values.oldKey,
        });
      } else {
        await mediasService.renameFile({
          newKey: values.newKey,
          oldKey: values.oldKey,
        });
      }
      onClose?.(true);
      toast.success('Media renamed successfully');
      form.reset();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to rename media';
      setError('root', { message });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
      <FormWrapper>
        <FormInput
          control={control}
          name='oldKey'
          label='Old File Name'
          disabled
        />
        <FormInput
          control={control}
          name='newKey'
          label='New File Name'
          placeholder='e.g. new-image.jpg'
        />
        <Button
          type='submit'
          className='w-full'
          disabled={isSubmitting}
          loading={isSubmitting}
        >
          Rename File
        </Button>
      </FormWrapper>
    </form>
  );
}
