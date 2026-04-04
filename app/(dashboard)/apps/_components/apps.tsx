'use client';

import React, { useMemo } from 'react';

import { useTablePagination } from '@/stores/use-table-pagination';
import { PaginatedResponse } from '@/types';
import { AppRecord } from '@/types/app';

import { useApps } from '../_config/app.hooks';
import { AppsTable } from './apps-table';

type Props = {
  initialData: PaginatedResponse<AppRecord>;
};
function Apps({ initialData }: Props) {
  const { getDefinedParams } = useTablePagination();
  const params = useMemo(() => getDefinedParams(), [getDefinedParams]);
  const {
    data: apps,
    isLoading,
    isFetching,
    refetch,
  } = useApps(params, initialData);
  return (
    <AppsTable
      isLoading={isLoading || isFetching}
      data={apps?.data ?? []}
      canDelete={true}
      rowCount={apps?.meta?.total ?? 0}
      refetch={refetch}
    />
  );
}

export default Apps;
