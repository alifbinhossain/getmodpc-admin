'use client';
import React from 'react';

import { useTablePagination } from '@/stores/use-table-pagination';
import { PaginatedResponse } from '@/types';
import { ReportReasonRecord } from '@/types/report-reason';

import { useReportReasons } from '../_config/report-reason.hooks';
import { ReportReasonTable } from './report-reason-table';

type Props = {
  initialData: PaginatedResponse<ReportReasonRecord>;
};
function ReportReasons({ initialData }: Props) {
  const { getDefinedParams } = useTablePagination();
  const params = getDefinedParams();
  const {
    data: reportReasons,
    isLoading,
    isFetching,
    refetch,
  } = useReportReasons(params, initialData);
  return (
    <ReportReasonTable
      isLoading={isLoading || isFetching}
      data={reportReasons?.data ?? []}
      canDelete={true}
      rowCount={reportReasons?.meta?.total ?? 0}
      refetch={refetch}
    />
  );
}

export default ReportReasons;
