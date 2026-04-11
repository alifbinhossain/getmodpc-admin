import Image from 'next/image';

import { AppRecord } from '@/types/app';
import { type ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

export const trashColumns: ColumnDef<AppRecord>[] = [
  {
    accessorKey: 'icon',
    header: 'App Icon',
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
    accessorKey: 'deleted_at',
    header: 'Deleted At',
    cell: ({ getValue }) => {
      const latest_version = getValue<string>();
      return (
        <span className='capitalize text-green-600 font-bold'>
          {format(new Date(latest_version), 'dd MMM yyyy')}
        </span>
      );
    },

    enableSorting: true,
  },
];
