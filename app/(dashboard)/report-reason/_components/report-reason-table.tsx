// example/UsersTable.tsx
//
// Usage example — shows how to wire DataTable for the Users module.
// This component owns only the Users-specific concern:
// - which columns to show
// - which permissions apply
// - which action handlers to call

'use client';

import { useRouter } from 'next/navigation';

import { ReportReasonRecord } from '@/types/report-reason';

import { DataTable } from '@/components/table';

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

  return (
    <DataTable<ReportReasonRecord>
      // ── Data
      data={data}
      columns={reportReasonColumns}
      isLoading={isLoading}
      isFetching={isFetching}
      // ── Header
      title='Report Reason'
      description='Manage all report reason.'
      // ── Permissions
      permissions={{ canEdit, canDelete, canView: true }}
      // ── Action handlers
      actions={{
        onView: (user) => router.push(`/dashboard/users/${user.id}`),
        onEdit: (user) => {
          console.log({ user });
          // router.push(`/dashboard/users/${user.id}/edit`);
        },
        onDelete: async (user) => {
          // In production: call your mutation hook here, e.g.:
          // await deleteUser(user.id)
          console.warn('Delete user', user.id);
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
