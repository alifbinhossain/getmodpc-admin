import Image from 'next/image';

import { AppRecord, EnumAppStatus } from '@/types/app';
import { type ColumnDef } from '@tanstack/react-table';

import { Badge } from '@/components/ui/badge';

export const appColumns: ColumnDef<AppRecord>[] = [
  {
    accessorKey: 'icon',
    header: 'App Icon',
    cell: ({ getValue }) => {
      const src = getValue<AppRecord['icon']>();
      if (!src) {
        return <div className='size-10 overflow-hidden rounded' />;
      }

      return (
        <Image
          src={src}
          alt='app icon'
          width={40}
          height={40}
          className='size-10 shrink-0 overflow-hidden rounded'
        />
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ getValue }) => {
      const name = getValue<AppRecord['name']>();
      return <span className='capitalize whitespace-break-spaces'>{name}</span>;
    },
  },

  {
    accessorKey: 'categories',
    header: 'Categories',
    cell: ({ getValue }) => {
      const categories =
        getValue<Array<{ id: string; name: string; slug: string }>>();
      return (
        <span className='capitalize text-muted-foreground whitespace-break-spaces'>
          {categories.map((category) => category.name).join(', ') || '--'}
        </span>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: 'app_tags',
    header: 'Tags',
    cell: ({ getValue }) => {
      const tags = getValue<string[]>();
      return (
        <span className='capitalize text-muted-foreground whitespace-break-spaces'>
          {tags.join(', ') || '--'}
        </span>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => {
      const status = getValue<EnumAppStatus | ''>();
      const variant =
        status === EnumAppStatus.PUBLISH ? 'default' : 'secondary';

      return (
        <Badge variant={variant} className='capitalize'>
          {status || 'unknown'}
        </Badge>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: 'is_verified',
    header: 'Verified',
    cell: ({ getValue }) => {
      const value = Boolean(getValue<boolean>());
      return (
        <Badge variant={value ? 'default' : 'outline'}>
          {value ? 'Yes' : 'No'}
        </Badge>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: 'show_in_slider',
    header: 'In Slider',
    cell: ({ getValue }) => {
      const value = Boolean(getValue<boolean>());
      return (
        <Badge variant={value ? 'default' : 'outline'}>
          {value ? 'Yes' : 'No'}
        </Badge>
      );
    },
    enableSorting: false,
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
    header: 'Update Available',
    cell: ({ getValue }) => {
      const latest_version = getValue<string>();
      return (
        <span className='capitalize text-green-600 font-bold'>
          {latest_version || '--'}
        </span>
      );
    },

    enableSorting: false,
  },
];
