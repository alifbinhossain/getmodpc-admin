import { FaqRecord } from '@/types/faq';
import type { ColumnMeta } from '@/types/table';
import { type ColumnDef } from '@tanstack/react-table';

export const faqColumns: ColumnDef<FaqRecord>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
    // Hidden by default — shown in the title cell above.
    // Still here so global search can match on it.
    enableHiding: true,
    meta: { hideFromToggle: true } satisfies ColumnMeta,
  },
  {
    accessorKey: 'platform',
    header: 'Platform',
    cell: ({ getValue }) => {
      const platform = getValue<FaqRecord['platform']>();
      return <span className='text-sm text-muted-foreground'>{platform}</span>;
    },
  },
  {
    accessorKey: 'content',
    header: 'Content',
    cell: ({ getValue }) => {
      const content = getValue<FaqRecord['content']>();
      return (
        <span className='text-sm text-muted-foreground line-clamp-2'>
          {content}
        </span>
      );
    },
    filterFn: 'equals',
  },
];
