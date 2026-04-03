'use client';
import React, { useMemo } from 'react';

import { useTablePagination } from '@/stores/use-table-pagination';
import { PaginatedResponse } from '@/types';
import { ReportRecord } from '@/types/report';

import { useReports } from '../_config/report.hooks';
import { ReportTable } from './report-table';

type Props = {
  initialData: PaginatedResponse<ReportRecord>;
};
function Reports({ initialData }: Props) {
  const { getDefinedParams } = useTablePagination();
  const params = useMemo(() => getDefinedParams(), [getDefinedParams]);
  const {
    data: reports,
    isLoading,
    isFetching,
    refetch,
  } = useReports(params, initialData);
  return (
    <ReportTable
      isLoading={isLoading || isFetching}
      data={reports?.data ?? []}
      canDelete={true}
      rowCount={reports?.meta?.total ?? 0}
      refetch={refetch}
    />
  );
}

export default Reports;
