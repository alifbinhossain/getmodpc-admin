/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from 'react';

import { IFolderMeta } from '@/types/media';
import { FolderPlus } from 'lucide-react';

import { useGetAllFolders } from '@/app/(dashboard)/medias/_config/medias.hooks';

import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Separator } from '../ui/separator';
import { Skeleton } from '../ui/skeleton';
import CreateFolderForm from './create-folder-form';
import Folder from './folder';

type Props = {
  setSelectedFolder: (folder: string) => void;
  selectFolder: string;
};

export function SelectFolders({ selectFolder, setSelectedFolder }: Props) {
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [folders, setFolders] = useState<IFolderMeta[]>([]);

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
      <div className='p-1 flex grow gap-3'>
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className='max-w-70 shadow border rounded-md flex justify-between gap-3 p-3 h-full'
          >
            <div className='flex-1 w-full space-y-2'>
              <Skeleton className='w-full h-4' />
              <div className='flex gap-2'>
                <Skeleton className='w-full h-3' />
                <Skeleton className='w-full h-3' />
              </div>
            </div>
            <Skeleton className='w-2 h-5' />
          </div>
        ))}
      </div>
    );
  }

  if (!folders.length && !isLoading) {
    // Added !isLoading to prevent showing "No folders found" while loading
    return (
      <div className='w-full h-full flex items-center justify-center'>
        <span className='text-sm text-muted-foreground'>No folders found</span>
      </div>
    );
  }

  return (
    <>
      <div className='w-full h-full overflow-y-auto space-y-5'>
        <div className='flex justify-end'>
          <Button onClick={() => setOpen(true)}>
            <FolderPlus />
          </Button>
        </div>
        <div className='p-1 flex grow 6 gap-3'>
          {folders.map((folder) => (
            <Folder
              selectFolder={selectFolder}
              setSelectedFolder={setSelectedFolder}
              key={folder.name}
              folder={folder}
              onDelete={() => refetch()}
            />
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
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='uppercase'>Create a new folder</DialogTitle>
          </DialogHeader>
          <Separator />
          <CreateFolderForm
            onClose={() => {
              setOpen(false);
              refetch();
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
