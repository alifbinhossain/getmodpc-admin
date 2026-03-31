import { PageRecord } from '@/types/page';
import type { ColumnMeta } from '@/types/table';
import { type ColumnDef } from '@tanstack/react-table';

import { Badge } from '@/components/ui/badge';

export const pageColumns: ColumnDef<PageRecord>[] = [
  {
    accessorKey: 'title',
    header: 'Page Name',
    // Hidden by default — shown in the name cell above.
    // Still here so global search can match on it.
    enableHiding: true,
    meta: { hideFromToggle: true } satisfies ColumnMeta,
  },
  {
    accessorKey: 'slug',
    header: 'Slug',
    cell: ({ getValue }) => {
      const slug = getValue<PageRecord['slug']>();
      return (
        <span className='text-sm text-muted-foreground line-clamp-2'>
          {slug}
        </span>
      );
    },
    filterFn: 'equals',
  },
  {
    accessorKey: 'content',
    header: 'Description',
    cell: ({ getValue }) => {
      const details = getValue<PageRecord['content']>();
      return (
        <span className='text-sm text-muted-foreground line-clamp-2'>
          {details}
        </span>
      );
    },
  },
  {
    accessorKey: 'page_type',
    header: 'Page Type',
  },
  {
    accessorKey: 'external_link',
    header: 'External Link',
  },
  {
    accessorKey: 'is_active',
    header: 'Status',
    cell: ({ getValue }) => {
      const isActive = getValue<PageRecord['is_active']>();
      const variant = isActive ? 'default' : 'destructive';
      return (
        <Badge variant={variant} className='capitalize'>
          {isActive ? 'active' : 'inactive'}
        </Badge>
      );
    },
    filterFn: 'equals',
  },
  {
    accessorKey: 'is_open_new_tab',
    header: 'Open in New Tab',
    cell: ({ getValue }) => {
      const isActive = getValue<PageRecord['is_open_new_tab']>();
      const variant = isActive ? 'default' : 'destructive';
      return (
        <Badge variant={variant} className='capitalize'>
          {isActive ? 'yes' : 'no'}
        </Badge>
      );
    },
    filterFn: 'equals',
  },
];
