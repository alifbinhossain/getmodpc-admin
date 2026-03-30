'use client';

import { useRouter } from 'next/navigation';

import { useFormModal } from '@/stores/use-form-modal';
import { ReportReasonRecord } from '@/types/report-reason';
import { RefreshCw } from 'lucide-react';

import { DataTable } from '@/components/table';
import { Button } from '@/components/ui/button';

import { deleteReportReason } from '../_actions';
import { reportReasonColumns } from '../_config/report-reason-column';

interface ReportReasonTableProps {
  data: ReportReasonRecord[];
  isLoading?: boolean;
  isFetching?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
  // Server-side pagination props (optional)
  rowCount?: number;
  onStateChange?: Parameters<
    typeof DataTable<ReportReasonRecord>
  >[0]['onStateChange'];
  refetch: () => void;
}

export function ReportReasonTable({
  data,
  isLoading,
  isFetching,
  canEdit = true,
  canDelete = false,
  rowCount,
  onStateChange,
  refetch,
}: ReportReasonTableProps) {
  const router = useRouter();
  const { openModal } = useFormModal();

  return (
    <DataTable<ReportReasonRecord>
      data={data}
      columns={reportReasonColumns}
      isLoading={isLoading}
      isFetching={isFetching}
      title='Report Reason'
      description='Manage all report reason.'
      permissions={{ canEdit, canDelete, canView: true }}
      actions={{
        onView: (reportReason) =>
          router.push(`/report-reasons/${reportReason.id}`),
        onEdit: (raw) => {
          openModal('EDIT_REPORT_REASON', raw);
        },
        onDelete: async (reportReason) => {
          await deleteReportReason(reportReason.id);
        },
      }}
      // ── Features
      enableSearch
      enableColumnToggle
      enablePagination
      enableSorting
      searchPlaceholder='Search by name or email...'
      // ── Server-side (optional)
      rowCount={rowCount}
      onStateChange={onStateChange}
      pageSizeOptions={[20, 30, 50]}
      defaultPageSize={20}
      toolbarExtra={
        <div className='flex items-center gap-2'>
          <Button variant='ghost' size='sm' onClick={() => refetch()}>
            <RefreshCw />
          </Button>
          <Button onClick={() => openModal('ADD_REPORT_REASON')}>Add</Button>
        </div>
      }
    />
  );
}
