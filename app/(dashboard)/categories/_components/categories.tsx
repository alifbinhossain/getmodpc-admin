'use client';
import React, { useMemo } from 'react';

import { useTablePagination } from '@/stores/use-table-pagination';
import { PaginatedResponse } from '@/types';
import type { CategoryRecord } from '@/types/category';

import { useCategories } from '../_config/category.hooks';
import { CategoriesTable } from './categories-table';

type Props = {
  initialData: PaginatedResponse<CategoryRecord>;
};
function Categories({ initialData }: Props) {
  const { getDefinedParams } = useTablePagination();
  const params = useMemo(() => getDefinedParams(), [getDefinedParams]);
  const {
    data: categories,
    isLoading,
    isFetching,
    refetch,
  } = useCategories(params, initialData);
  return (
    <CategoriesTable
      isLoading={isLoading || isFetching}
      data={categories?.data ?? []}
      canDelete={true}
      rowCount={categories?.meta?.total ?? 0}
      refetch={refetch}
    />
  );
}

export default Categories;
