import React, { useEffect, useState } from 'react';

import { useFormModal } from '@/stores/use-form-modal';
import { IFolderMeta } from '@/types/media';
import { ArrowLeft, FolderPlus } from 'lucide-react';

import { cn, formatFileSize } from '@/lib/utils';

import { useGetAllFolders } from '@/app/(dashboard)/medias/_config/medias.hooks';

import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

type Props = {
  setSelectedFolder: (folder: string) => void;
  selectFolder: string;
};

function SelectFolders({ selectFolder, setSelectedFolder }: Props) {
  const [page, setPage] = useState(1);
  const [folders, setFolders] = useState<IFolderMeta[]>([]);
  const { openModal } = useFormModal();

  const { data, isLoading, isFetching, refetch } = useGetAllFolders({ page });

  useEffect(() => {
    if (!data?.data) return;

    setFolders((prev) => {
      const newFolders = data.data;
      const map = new Map<string, IFolderMeta>();

      [...prev, ...newFolders].forEach((folder) => {
        map.set(folder.name, folder);
      });

      return Array.from(map.values());
    });
  }, [data]);

  useEffect(() => {
    if (page === 1 && data?.data) {
      setFolders(data.data);
    }
  }, [page, data]);

  if (isLoading && page === 1) {
    return (
      <Card className='flex justify-between items-center gap-5'>
        <div className='flex-1'>
          <Skeleton className='w-full h-4' />
          <div className='flex flex-col gap-2'>
            <Skeleton className='w-full h-4' />
            <Skeleton className='w-full h-4' />
          </div>
        </div>
        <Skeleton className='w-1 h-6' />
      </Card>
    );
  }

  if (!folders.length) {
    return (
      <div className='w-full h-full flex items-center justify-center'>
        <span className='text-sm text-muted-foreground'>No folders found</span>
      </div>
    );
  }

  return (
    <div className='w-full h-full overflow-y-auto space-y-5'>
      <div className='flex justify-end'>
        <Button onClick={() => openModal('CREATE_FOLDER', '', refetch)}>
          <FolderPlus />
        </Button>
      </div>
      <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3'>
        {folders.map((folder) => (
          <Card
            className={cn(
              'cursor-pointer p-3 hover:bg-muted/50 transition',
              selectFolder === folder.name && 'border-blue-500'
            )}
            key={folder.name}
            onClick={() => setSelectedFolder(folder.name)}
          >
            <div className='flex-1'>
              <h4 className='text-sm font-semibold'>{folder.name}</h4>
              <div className='flex items-center gap-2'>
                <p className='text-xs text-muted-foreground'>
                  {folder.totalFiles} files
                </p>
                <span className='text-xs text-muted-foreground'>
                  {formatFileSize(folder.totalSize)}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
      {data?.meta?.hasNextPage && (
        <div className='flex justify-center items-center mt-4'>
          <Button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={isFetching}
          >
            {isFetching ? 'Loading...' : 'Load more'}
          </Button>
        </div>
      )}
    </div>
  );
}

export default SelectFolders;
