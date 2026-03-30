'use client';

import { useRouter } from 'next/navigation';

import { useFormModal } from '@/stores/use-form-modal';
import { ReportRecord } from '@/types/report';
import { RefreshCw } from 'lucide-react';

import { DataTable } from '@/components/table';
import { Button } from '@/components/ui/button';

import { reportColumns } from '../_config/report-column';
import { reportsService } from '../_config/reports.service';

interface ReportTableProps {
  data: ReportRecord[];
  isLoading?: boolean;
  isFetching?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
  // Server-side pagination props (optional)
  rowCount?: number;
  onStateChange?: Parameters<
    typeof DataTable<ReportRecord>
  >[0]['onStateChange'];
  refetch: () => void;
}

export function ReportTable({
  data,
  isLoading,
  isFetching,
  canEdit = true,
  canDelete = false,
  rowCount,
  onStateChange,
  refetch,
}: ReportTableProps) {
  const router = useRouter();
  const { openModal } = useFormModal();

  return (
    <DataTable<ReportRecord>
      data={data}
      columns={reportColumns}
      isLoading={isLoading}
      isFetching={isFetching}
      title='Reports'
      description='Manage all report.'
      permissions={{ canEdit, canDelete, canView: false }}
      actions={{
        onView: (report) => router.push(`/reports/${report.id}`),
        onEdit: (raw) => {
          openModal('EDIT_REPORT', raw, refetch);
        },
        onDelete: async (report) => {
          await reportsService.deleteReport(report.id);
          refetch();
        },
      }}
      // ── Features
      enableSearch
      enableColumnToggle
      enablePagination
      enableSorting
      searchPlaceholder='Search by details or email...'
      // ── Server-side (optional)
      rowCount={rowCount}
      onStateChange={onStateChange}
      pageSizeOptions={[20, 30, 50]}
      defaultPageSize={20}
      toolbarExtra={
        <Button variant='ghost' size='sm' onClick={() => refetch()}>
          <RefreshCw />
        </Button>
      }
      deleteBulkAction={async (ids) => {
        await reportsService.deleteReports(ids);
        refetch();
      }}
    />
  );
}
