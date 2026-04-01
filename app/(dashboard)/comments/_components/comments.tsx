'use client';
import React from 'react';

import { useTablePagination } from '@/stores/use-table-pagination';
import { PaginatedResponse } from '@/types';
import type { CommentRecord } from '@/types/comment';

import { useComments } from '../_config/comment.hooks';
import { CommentsTable } from './comments-table';

type Props = {
  initialData: PaginatedResponse<CommentRecord>;
};

function Comments({ initialData }: Props) {
  const { getDefinedParams } = useTablePagination();
  const params = getDefinedParams();
  const {
    data: comments,
    isLoading,
    isFetching,
    refetch,
  } = useComments(params, initialData);
  return (
    <CommentsTable
      isLoading={isLoading || isFetching}
      data={comments?.data ?? []}
      canDelete={true}
      refetch={refetch}
    />
  );
}

export default Comments;
