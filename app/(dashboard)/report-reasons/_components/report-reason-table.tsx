'use client';

import { useRouter } from 'next/navigation';

import { useFormModal } from '@/stores/use-form-modal';
import { ReportReasonRecord } from '@/types/report-reason';

import { DataTable } from '@/components/table';

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
}

export function ReportReasonTable({
  data,
  isLoading,
  isFetching,
  canEdit = true,
  canDelete = false,
  rowCount,
  onStateChange,
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
      pageSizeOptions={[10, 20, 50]}
      defaultPageSize={10}
    />
  );
}
