import Image from 'next/image';

import { AdRecord } from '@/types/ad';
import type { ColumnMeta } from '@/types/table';
import { type ColumnDef } from '@tanstack/react-table';

import { Badge } from '@/components/ui/badge';

export const adColumns: ColumnDef<AdRecord>[] = [
  {
    accessorKey: 'title',
    header: 'Name',
    // Hidden by default — shown in the name cell above.
    // Still here so global search can match on it.
    enableHiding: true,
    meta: { hideFromToggle: true } satisfies ColumnMeta,
  },
  {
    accessorKey: 'media_url',
    header: 'Photo',
    cell: ({ getValue }) => {
      const src = getValue<AdRecord['media_url']>();
      if (!src) return <div className='size-10 rounded overflow-hidden'></div>;
      return (
        <Image
          src={src}
          className='size-10 rounded overflow-hidden'
          alt='Ad icon'
          width={40}
          height={40}
        />
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: 'media_type',
    header: 'Media Type',
    cell: ({ getValue }) => {
      const mediaType = getValue<AdRecord['media_type']>();
      return (
        <span className='text-sm text-muted-foreground line-clamp-2'>
          {mediaType}
        </span>
      );
    },
    filterFn: 'equals',
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ getValue }) => {
      const details = getValue<AdRecord['description']>();
      return (
        <span className='editor text-sm text-muted-foreground line-clamp-2'>
          {details}
        </span>
      );
    },
  },
  {
    accessorKey: 'cta_label',
    header: 'Call to Action',
    cell: ({ getValue }) => {
      const ctaLabel = getValue<AdRecord['cta_label']>();
      return <span className='text-sm text-muted-foreground'>{ctaLabel}</span>;
    },
  },
  {
    accessorKey: 'cta_url',
    header: 'Call to Action URL',
    cell: ({ getValue }) => {
      const ctaUrl = getValue<AdRecord['cta_url']>();
      return <span className='text-sm text-muted-foreground'>{ctaUrl}</span>;
    },
  },
  {
    accessorKey: 'start_at',
    header: 'Start Date',
    cell: ({ getValue }) => {
      const startAt = getValue<AdRecord['start_at']>();
      return (
        <span className='text-sm text-muted-foreground'>
          {new Intl.DateTimeFormat('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short',
          }).format(new Date(startAt))}
        </span>
      );
    },
  },
  {
    accessorKey: 'end_at',
    header: 'End Date',
    cell: ({ getValue }) => {
      const endAt = getValue<AdRecord['end_at']>();
      return (
        <span className='text-sm text-muted-foreground'>
          {new Intl.DateTimeFormat('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short',
          }).format(new Date(endAt))}
        </span>
      );
    },
  },
  {
    accessorKey: 'is_active',
    header: 'Status',
    cell: ({ getValue }) => {
      const isActive = getValue<AdRecord['is_active']>();
      const variant = isActive ? 'default' : 'destructive';
      return (
        <Badge variant={variant} className='capitalize'>
          {isActive ? 'active' : 'inactive'}
        </Badge>
      );
    },
    filterFn: 'equals',
  },
];
