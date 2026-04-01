'use client';

import { useRouter } from 'next/navigation';

import { useFormModal } from '@/stores/use-form-modal';
import { AdRecord } from '@/types/ad';
import { RefreshCw } from 'lucide-react';

import { DataTable } from '@/components/table';
import { Button } from '@/components/ui/button';

import { adColumns } from '../_config/ad-column';
import { adsService } from '../_config/ads.service';

interface AdsTableProps {
  data: AdRecord[];
  isLoading?: boolean;
  isFetching?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
  // Server-side pagination props (optional)
  rowCount?: number;
  onStateChange?: Parameters<typeof DataTable<AdRecord>>[0]['onStateChange'];
  refetch: () => void;
}

export function AdsTable({
  data,
  isLoading,
  isFetching,
  canEdit = true,
  canDelete = false,
  rowCount,
  onStateChange,
  refetch,
}: AdsTableProps) {
  const router = useRouter();
  const { openModal } = useFormModal();

  return (
    <DataTable<AdRecord>
      data={data}
      columns={adColumns}
      isLoading={isLoading}
      isFetching={isFetching}
      title='Ads'
      description='Manage all ad.'
      permissions={{ canEdit, canDelete, canView: false }}
      actions={{
        onView: (ad) => router.push(`/ads/${ad.id}`),
        onEdit: (raw) => {
          openModal('EDIT_AD', raw, refetch);
        },
        onDelete: async (ad) => {
          await adsService.deleteAd(ad.id);
          refetch();
        },
      }}
      // ── Features
      enableSearch
      enableColumnToggle
      enablePagination
      enableSorting
      searchPlaceholder='Search by title, cta_label or description...'
      // ── Server-side (optional)
      rowCount={rowCount}
      onStateChange={onStateChange}
      pageSizeOptions={[20, 30, 50]}
      defaultPageSize={20}
      toolbarExtra={
        <div className='flex items-center gap-2'>
          <Button onClick={() => openModal('ADD_AD', null, refetch)}>
            Add Ad
          </Button>
          <Button variant='ghost' size='sm' onClick={() => refetch()}>
            <RefreshCw />
          </Button>
        </div>
      }
      deleteBulkAction={async (ids) => {
        await adsService.deleteAds(ids);
        refetch();
      }}
    />
  );
}
