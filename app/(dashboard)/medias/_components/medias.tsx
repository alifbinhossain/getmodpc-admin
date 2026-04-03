'use client';
import React, { useMemo } from 'react';

import { useTablePagination } from '@/stores/use-table-pagination';
import { PaginatedResponse } from '@/types';
import type { MediaRecord } from '@/types/media';

import { useMedias } from '../_config/medias.hooks';
import { MediasTable } from './medias-table';

type Props = {
  initialData: PaginatedResponse<MediaRecord>;
};
function Medias({ initialData }: Props) {
  const { getDefinedParams } = useTablePagination();
  const params = useMemo(() => getDefinedParams(), [getDefinedParams]);
  const {
    data: reports,
    isLoading,
    isFetching,
    refetch,
  } = useMedias(params, initialData);
  return (
    <MediasTable
      isLoading={isLoading || isFetching}
      data={reports?.data ?? []}
      canDelete={true}
      rowCount={reports?.meta?.total ?? 0}
      refetch={refetch}
    />
  );
}

export default Medias;
