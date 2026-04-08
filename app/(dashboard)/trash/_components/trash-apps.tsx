'use client';

import React, { useMemo } from 'react';

import { useTablePagination } from '@/stores/use-table-pagination';
import { PaginatedResponse } from '@/types';
import { AppRecord } from '@/types/app';

import { useSoftDeleteApps } from '@/app/(dashboard)/apps/_config/app.hooks';

import { TrashAppsTable } from './trash-apps-table';

type Props = {
  initialData: PaginatedResponse<AppRecord>;
};

function TrashApps({ initialData }: Props) {
  const { getDefinedParams } = useTablePagination();
  const params = useMemo(() => getDefinedParams(), [getDefinedParams]);
  const {
    data: apps,
    isLoading,
    isFetching,
    refetch,
  } = useSoftDeleteApps(params, initialData);

  return (
    <TrashAppsTable
      isLoading={isLoading}
      isFetching={isFetching}
      data={apps?.data ?? []}
      rowCount={apps?.meta?.total ?? 0}
      refetch={refetch}
    />
  );
}

export default TrashApps;
