'use client';

import { useFormModal } from '@/stores/use-form-modal';
import { CommentRecord } from '@/types/comment';
import { RefreshCw } from 'lucide-react';

import { DataTable } from '@/components/table';
import { Button } from '@/components/ui/button';

import { commentColumns } from '../_config/comment-column';
import { commentsService } from '../_config/comments.service';

interface CommentsTableProps {
  data: CommentRecord[];
  isLoading?: boolean;
  isFetching?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
  refetch: () => void;
}

export function CommentsTable({
  data,
  isLoading,
  isFetching,
  canEdit = true,
  canDelete = true,
  refetch,
}: CommentsTableProps) {
  const { openModal } = useFormModal();

  return (
    <DataTable<CommentRecord>
      data={data}
      columns={commentColumns}
      isLoading={isLoading}
      isFetching={isFetching}
      title='Comments'
      description='Manage all comments.'
      permissions={{ canEdit, canDelete, canView: false }}
      actions={{
        onEdit: (comment) => openModal('EDIT_COMMENT', comment, refetch),
        onDelete: async (comment) => {
          try {
            await commentsService.deleteComment(comment.id);
            refetch();
          } catch (error) {
            console.error('Failed to delete comment:', error);
          }
        },
      }}
      toolbarExtra={
        <div className='flex items-center gap-2'>
          <Button variant='ghost' size='sm' onClick={() => refetch()}>
            <RefreshCw />
          </Button>
        </div>
      }
      deleteBulkAction={async (ids: string[]) => {
        try {
          await commentsService.deleteComments(ids);
          refetch();
        } catch (error) {
          console.error('Failed to delete comments:', error);
        }
      }}
    />
  );
}
