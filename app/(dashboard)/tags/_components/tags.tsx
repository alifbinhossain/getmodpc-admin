'use client';
import React from 'react';

import { useTablePagination } from '@/stores/use-table-pagination';
import { PaginatedResponse } from '@/types';
import { TagAndDeveloperRecord } from '@/types/tagAndDeveloper';

import { useTags } from '../_config/tags.hooks';
import { TagsTable } from './tags-table';

type Props = {
  initialData: PaginatedResponse<TagAndDeveloperRecord>;
};
function TagsComp({ initialData }: Props) {
  const { getDefinedParams } = useTablePagination();
  const params = getDefinedParams();
  const {
    data: reports,
    isLoading,
    isFetching,
    refetch,
  } = useTags(params, initialData);
  return (
    <TagsTable
      isLoading={isLoading || isFetching}
      data={reports?.data ?? []}
      canDelete={true}
      rowCount={reports?.meta?.total ?? 0}
      refetch={refetch}
    />
  );
}

export default TagsComp;
