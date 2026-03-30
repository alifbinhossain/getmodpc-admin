import type { ColumnMeta } from '@/types/table';
import { TagAndDeveloperRecord } from '@/types/tagAndDeveloper';
import { type ColumnDef } from '@tanstack/react-table';

export const tagColumns: ColumnDef<TagAndDeveloperRecord>[] = [
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
      const slug = getValue<TagAndDeveloperRecord['slug']>();
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
      const details = getValue<TagAndDeveloperRecord['description']>();
      return (
        <span className='text-sm text-muted-foreground line-clamp-2'>
          {details}
        </span>
      );
    },
  },
];
