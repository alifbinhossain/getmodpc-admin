'use client';

import { UpdateCommentPayload } from '@/types/comment';
import { toast } from 'sonner';

import { useAppForm } from '@/hooks/form';

import { FormInput, FormTextarea, FormWrapper } from '@/components/forms';
import { FormSwitch } from '@/components/forms/_fields/switch';
import { Button } from '@/components/ui/button';

import { commentSchema, ICommentSchema } from '@/lib/schemas/comment-schema';

import { commentsService } from '../_config/comments.service';

type Props = {
  isEditing?: boolean;
  data?: UpdateCommentPayload;
  onClose?: (isRefreshData?: boolean) => void;
};

export function CommentForm({ isEditing, data, onClose }: Props) {
  const form = useAppForm({
    schema: commentSchema,
    defaultValues: data,
  });

  const {
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: ICommentSchema) => {
    try {
      await commentsService.updateComment({
        id: data!.id,
        ...values,
      });
      onClose?.(true);
      form.reset();
      toast.success(`Comment Updated successfully`);
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
          name='content'
          label='Content'
          placeholder='Enter comment content'
          required
        />

        <div className='flex justify-end gap-2 pt-4'>
          <Button
            type='button'
            variant='outline'
            onClick={() => onClose?.(false)}
          >
            Cancel
          </Button>
          <Button type='submit' disabled={isSubmitting}>
            {isEditing ? 'Update' : 'Create'} Comment
          </Button>
        </div>
      </FormWrapper>
    </form>
  );
}
