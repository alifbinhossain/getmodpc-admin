import Image from 'next/image';

import type { MediaRecord } from '@/types/media';
import type { ColumnMeta } from '@/types/table';
import { type ColumnDef } from '@tanstack/react-table';

import { formatFileSize } from '@/lib/utils';

export const mediaColumns: ColumnDef<MediaRecord>[] = [
  {
    accessorKey: 'url',
    header: 'File',
    cell: ({ getValue }) => {
      const src = getValue<MediaRecord['url']>();
      if (!src) return <div className='size-10 rounded overflow-hidden'></div>;
      return (
        <Image
          src={src}
          className='size-10 rounded overflow-hidden'
          alt='category icon'
          width={40}
          height={40}
        />
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: 'name',
    header: 'name',
    // Hidden by default — shown in the name cell above.
    // Still here so global search can match on it.
    enableHiding: true,
    meta: { hideFromToggle: true } satisfies ColumnMeta,
  },
  {
    accessorKey: 'folder',
    header: 'Folder',
    cell: ({ getValue }) => {
      const folder = getValue<MediaRecord['folder']>();
      return (
        <span className='text-sm text-muted-foreground line-clamp-2'>
          {folder === '.' ? 'root' : folder}
        </span>
      );
    },
    enableHiding: true,
    meta: { hideFromToggle: true } satisfies ColumnMeta,
  },
  {
    accessorKey: 'size',
    header: 'Size',
    cell: ({ getValue }) => {
      const size = getValue<MediaRecord['size']>();
      return (
        <span className='text-sm text-muted-foreground line-clamp-2'>
          {formatFileSize(size)}
        </span>
      );
    },
    filterFn: 'equals',
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ getValue }) => {
      const type = getValue<MediaRecord['type']>();
      return (
        <span className='text-sm text-muted-foreground line-clamp-2'>
          {type}
        </span>
      );
    },
  },
];
