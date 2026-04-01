'use client';

import { useRouter } from 'next/navigation';

import { useFormModal } from '@/stores/use-form-modal';
import type { UserAppRequestRecord } from '@/types/user-app-request';
import { RefreshCw } from 'lucide-react';

import { DataTable } from '@/components/table';
import { Button } from '@/components/ui/button';

import { userAppRequestColumns } from '../_config/user-app-request-column';
import { userAppRequestsService } from '../_config/user-app-requests.service';

interface UserAppRequestsTableProps {
  data: UserAppRequestRecord[];
  isLoading?: boolean;
  isFetching?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
  // Server-side pagination props (optional)
  rowCount?: number;
  onStateChange?: Parameters<
    typeof DataTable<UserAppRequestRecord>
  >[0]['onStateChange'];
  refetch: () => void;
}

export function UserAppRequestsTable({
  data,
  isLoading,
  isFetching,
  canEdit = true,
  canDelete = false,
  rowCount,
  onStateChange,
  refetch,
}: UserAppRequestsTableProps) {
  const router = useRouter();
  const { openModal } = useFormModal();

  return (
    <DataTable<UserAppRequestRecord>
      data={data}
      columns={userAppRequestColumns}
      isLoading={isLoading}
      isFetching={isFetching}
      title='User App Requests'
      description='Manage all user app requests.'
      permissions={{ canEdit, canDelete, canView: false }}
      actions={{
        onView: (ad) => router.push(`/user-app-requests/${ad.id}`),
        onEdit: (raw) => {
          openModal('EDIT_USER_APP_REQUEST', raw, refetch);
        },
        onDelete: async (ad) => {
          await userAppRequestsService.deleteUserAppRequest(ad.id);
          refetch();
        },
      }}
      // ── Features
      enableSearch
      enableColumnToggle
      enablePagination
      enableSorting
      searchPlaceholder='Search by app name or app url...'
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
        await userAppRequestsService.deleteUserAppRequests(ids);
        refetch();
      }}
    />
  );
}
