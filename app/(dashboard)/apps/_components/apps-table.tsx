'use client';

import { useRouter } from 'next/navigation';

import { useFormModal } from '@/stores/use-form-modal';
import type { AppRecord } from '@/types/app';
import { RefreshCw } from 'lucide-react';

import { DataTable } from '@/components/table';
import { Button } from '@/components/ui/button';

import { appColumns } from '../_config/app-column';
import { appsService } from '../_config/apps.service';

interface AppsTableProps {
  data: AppRecord[];
  isLoading?: boolean;
  isFetching?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
  rowCount?: number;
  onStateChange?: Parameters<typeof DataTable<AppRecord>>[0]['onStateChange'];
  refetch: () => void;
}

export function AppsTable({
  data,
  isLoading,
  isFetching,
  canEdit = true,
  canDelete = false,
  rowCount,
  onStateChange,
  refetch,
}: AppsTableProps) {
  const { openModal } = useFormModal();
  const router = useRouter();

  return (
    <DataTable<AppRecord>
      data={data}
      columns={appColumns}
      isLoading={isLoading}
      isFetching={isFetching}
      title='Apps'
      description='Manage all apps.'
      permissions={{ canEdit, canDelete, canView: false }}
      actions={{
        onEdit: (raw) => router.push(`/apps/${raw.id}`),
        onDelete: async (app) => {
          await appsService.deleteApps([app.id]);
          refetch();
        },
      }}
      enableSearch
      enableColumnToggle
      enablePagination
      enableSorting
      searchPlaceholder='Search by app name, summary or description...'
      rowCount={rowCount}
      onStateChange={onStateChange}
      pageSizeOptions={[20, 30, 50]}
      defaultPageSize={20}
      toolbarExtra={
        <div className='flex items-center gap-2'>
          <Button onClick={() => router.push('/apps/add')}>Add App</Button>
          <Button variant='ghost' size='sm' onClick={() => refetch()}>
            <RefreshCw />
          </Button>
        </div>
      }
      deleteBulkAction={async (ids) => {
        await appsService.deleteApps(ids);
        refetch();
      }}
    />
  );
}
