import React, { useState } from 'react';

import { IFolderMeta } from '@/types/media';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';

import { cn, formatFileSize } from '@/lib/utils';

import { mediasService } from '@/app/(dashboard)/medias/_config/medias.service';

import DeleteAlertModal from '../shared/delete-alert-modal';
import { Button } from '../ui/button';

type Props = {
  folder: IFolderMeta;
  selectFolder: string;
  setSelectedFolder: (folder: string) => void;
  onDelete: () => void;
};

function Folder({ folder, selectFolder, setSelectedFolder, onDelete }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className={cn(
          'cursor-pointer p-3 hover:bg-muted/50 transition flex justify-between gap-3 rounded-md shadow border',
          selectFolder === folder.name && 'border-blue-500'
        )}
        onClick={() => setSelectedFolder(folder.name)}
      >
        <div className='flex-1'>
          <h4 className='text-sm font-semibold'>{folder?.name}</h4>

          <div className='flex items-center gap-2'>
            <p className='text-xs text-muted-foreground'>
              {folder?.totalFiles} files
            </p>
            -
            <span className='text-xs text-muted-foreground'>
              {formatFileSize(folder?.totalSize)}
            </span>
          </div>
        </div>

        {/* ✅ FIX: stop propagation + open modal */}
        <Button
          variant='destructive'
          onClick={(e) => {
            e.stopPropagation();
            setOpen(true);
          }}
        >
          <Trash2 />
        </Button>
      </div>

      <DeleteAlertModal
        open={open}
        setOpen={setOpen}
        description={`If you delete this folder, all the files inside it will be permanently deleted.`}
        onSubmit={async () => {
          try {
            await mediasService.deleteFolder({
              folderName: folder.name,
            });

            toast.success('Folder deleted successfully');
            onDelete();
            setOpen(false);
          } catch (error) {
            const message =
              error instanceof Error ? error.message : 'Failed to delete';
            toast.error(message);
          }
        }}
      />
    </>
  );
}

export default Folder;
