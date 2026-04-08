'use client';

import type { AppRecord } from '@/types/app';
import { RefreshCw } from 'lucide-react';

import { DataTable } from '@/components/table';
import { Button } from '@/components/ui/button';

import { appsService } from '../../apps/_config/apps.service';
import { trashColumns } from '../_config/app-column';

interface TrashAppsTableProps {
  data: AppRecord[];
  isLoading?: boolean;
  isFetching?: boolean;
  rowCount?: number;
  onStateChange?: Parameters<typeof DataTable<AppRecord>>[0]['onStateChange'];
  refetch: () => void;
}

export function TrashAppsTable({
  data,
  isLoading,
  isFetching,
  rowCount,
  onStateChange,
  refetch,
}: TrashAppsTableProps) {
  return (
    <DataTable<AppRecord>
      data={data}
      columns={trashColumns}
      isLoading={isLoading}
      isFetching={isFetching}
      title='Trash'
      description='Review apps in trash.'
      permissions={{ canEdit: false, canDelete: true, canView: false }}
      actions={{
        onDelete: async (app) => {
          await appsService.emptyTrash([app.id]);
          refetch();
        },
        custom: [
          {
            label: 'Restore',
            onClick: async (app) => {
              await appsService.restoreApps([app.id]);
              refetch();
            },
            icon: <RefreshCw />,
            variant: 'default',
          },
        ],
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
        <Button variant='ghost' size='sm' onClick={() => refetch()}>
          <RefreshCw />
        </Button>
      }
      deleteBulkAction={async (ids) => {
        await appsService.emptyTrash(ids);
        refetch();
      }}
    />
  );
}
