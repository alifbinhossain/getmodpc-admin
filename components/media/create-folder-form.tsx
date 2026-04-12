'use client';

import { toast } from 'sonner';
import z from 'zod/v3';

import { useAppForm } from '@/hooks/form';

import { FormInput, FormWrapper } from '@/components/forms';
import { Button } from '@/components/ui/button';

import { mediasService } from '@/app/(dashboard)/medias/_config/medias.service';

const createFolderSchema = z.object({
  folderName: z.string().min(1, 'Folder name is required'),
});

type RenameMediaFormValues = z.infer<typeof createFolderSchema>;

type Props = {
  data: string;
  isEditing: boolean;
  onClose?: (isRefreshData?: boolean) => void;
};
export default function CreateFolderForm({ data, isEditing, onClose }: Props) {
  const form = useAppForm({
    schema: createFolderSchema,
    defaultValues: {
      folderName: data,
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
      await mediasService.createFolder(values);
      toast.success('Folder created successfully');
      onClose?.(true);
      form.reset();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to create folder';
      setError('root', { message });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
      <FormWrapper>
        <FormInput
          control={control}
          name='folderName'
          label='Folder name'
          placeholder='Enter a folder name'
        />

        <Button
          type='submit'
          className='w-full'
          disabled={isSubmitting}
          loading={isSubmitting}
        >
          Create Folder
        </Button>
      </FormWrapper>
    </form>
  );
}
