'use client';
import React, { useMemo } from 'react';

import { useTablePagination } from '@/stores/use-table-pagination';
import { PaginatedResponse } from '@/types';
import { TagAndDeveloperRecord } from '@/types/tagAndDeveloper';

import { useDevelopers } from '../_config/developer.hooks';
import { DevelopersTable } from './developers-table';

type Props = {
  initialData: PaginatedResponse<TagAndDeveloperRecord>;
};
function Developers({ initialData }: Props) {
  const { getDefinedParams } = useTablePagination();
  const params = useMemo(() => getDefinedParams(), [getDefinedParams]);
  const {
    data: reports,
    isLoading,
    isFetching,
    refetch,
  } = useDevelopers(params, initialData);
  return (
    <DevelopersTable
      isLoading={isLoading || isFetching}
      data={reports?.data ?? []}
      canDelete={true}
      rowCount={reports?.meta?.total ?? 0}
      refetch={refetch}
    />
  );
}

export default Developers;
