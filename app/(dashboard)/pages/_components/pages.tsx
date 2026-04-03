'use client';
import React, { useMemo } from 'react';

import { useTablePagination } from '@/stores/use-table-pagination';
import { PaginatedResponse } from '@/types';
import type { PageRecord } from '@/types/page';

import { usePages } from '../_config/page.hooks';
import { PagesTable } from './pages-table';

type Props = {
  initialData: PaginatedResponse<PageRecord>;
};
function Pages({ initialData }: Props) {
  const { getDefinedParams } = useTablePagination();
  const params = useMemo(() => getDefinedParams(), [getDefinedParams]);
  const {
    data: categories,
    isLoading,
    isFetching,
    refetch,
  } = usePages(params, initialData);
  return (
    <PagesTable
      isLoading={isLoading || isFetching}
      data={categories?.data ?? []}
      canDelete={true}
      rowCount={categories?.meta?.total ?? 0}
      refetch={refetch}
    />
  );
}

export default Pages;
