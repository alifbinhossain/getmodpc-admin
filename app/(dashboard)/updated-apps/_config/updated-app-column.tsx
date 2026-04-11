import Image from 'next/image';

import { UpdatedAppRecord } from '@/types/app';
import { type ColumnDef } from '@tanstack/react-table';

export const updatedAppsColumns: ColumnDef<UpdatedAppRecord>[] = [
  {
    accessorKey: 'icon',
    header: 'Icon',
    cell: ({ getValue }) => {
      const src = getValue<string>();
      if (!src) {
        return <div className='size-10 overflow-hidden rounded' />;
      }
      return (
        <Image
          src={src}
          alt='app icon'
          width={40}
          height={40}
          className='size-10 overflow-hidden rounded'
        />
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'version',
    header: 'Version',
    cell: ({ getValue }) => {
      const version = getValue<string>();
      return (
        <span className='capitalize text-muted-foreground'>
          {version || '--'}
        </span>
      );
    },

    enableSorting: false,
  },
  {
    accessorKey: 'latest_version',
    header: 'Latest Version',
    cell: ({ getValue }) => {
      const version = getValue<string>();
      return (
        <span className='capitalize text-green-500 font-semibold'>
          {version || '--'}
        </span>
      );
    },

    enableSorting: false,
  },
];
