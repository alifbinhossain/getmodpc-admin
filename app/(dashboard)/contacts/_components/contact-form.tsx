'use client';

import { UpdateContactPayload } from '@/types/contact';
import { toast } from 'sonner';

import { useAppForm } from '@/hooks/form';

import { FormTextarea, FormWrapper } from '@/components/forms';
import { Button } from '@/components/ui/button';

import { contactSchema, IContactSchema } from '@/lib/schemas/contact-schema';

import { contactsService } from '../_config/contacts.service';

type Props = {
  isEditing?: boolean;
  data?: UpdateContactPayload;
  onClose?: (isRefreshData?: boolean) => void;
};

export function ContactForm({ isEditing, data, onClose }: Props) {
  const form = useAppForm({
    schema: contactSchema,
    defaultValues: data,
  });

  const {
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: IContactSchema) => {
    try {
      await contactsService.updateContact({
        id: data!.id,
        ...values,
      });
      onClose?.(true);
      form.reset();
      toast.success(`Contact updated successfully`);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setError('root', { message });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormWrapper>
        <FormTextarea
          control={control}
          name='message'
          label='Message'
          placeholder='Enter message'
          required
        />

        <Button
          disabled={isSubmitting || (isEditing && !form.formState.isDirty)}
          type='submit'
          className='w-full'
          loading={isSubmitting}
        >
          Update Contact
        </Button>
      </FormWrapper>
    </form>
  );
}
