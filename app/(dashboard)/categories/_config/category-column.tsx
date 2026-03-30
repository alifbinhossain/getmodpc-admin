import Image from 'next/image';

import { CategoryRecord } from '@/types/category';
import type { ColumnMeta } from '@/types/table';
import { type ColumnDef } from '@tanstack/react-table';

export const categoryColumns: ColumnDef<CategoryRecord>[] = [
  {
    accessorKey: 'category_icon',
    header: 'Icon',
    cell: ({ getValue }) => {
      const src = getValue<CategoryRecord['category_icon']>();
      if (!src) return <div className='h-6 w-6 rounded overflow-hidden'></div>;
      return (
        <Image
          src={src}
          className='h-6 w-6 rounded overflow-hidden'
          alt='category icon'
          width={24}
          height={24}
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
    accessorKey: 'slug',
    header: 'Slug',
    cell: ({ getValue }) => {
      const slug = getValue<CategoryRecord['slug']>();
      return (
        <span className='text-sm text-muted-foreground line-clamp-2'>
          {slug}
        </span>
      );
    },
    filterFn: 'equals',
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ getValue }) => {
      const details = getValue<CategoryRecord['description']>();
      return (
        <span className='text-sm text-muted-foreground line-clamp-2'>
          {details}
        </span>
      );
    },
  },
  {
    accessorKey: 'category_bg_color',
    header: 'BG Color',
  },
  {
    accessorKey: 'category_icon_bg_color',
    header: 'Icon BG Color',
  },
];
