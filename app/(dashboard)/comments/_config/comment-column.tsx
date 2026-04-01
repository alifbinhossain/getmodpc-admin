import { EnumAppCommentStatus } from '@/types';
import { CommentRecord } from '@/types/comment';
import { type ColumnDef } from '@tanstack/react-table';

import { Badge } from '@/components/ui/badge';

export const commentColumns: ColumnDef<CommentRecord>[] = [
  {
    accessorKey: 'content',
    header: 'Content',
    cell: ({ getValue }) => {
      const content = getValue<CommentRecord['content']>();
      return <span className='text-sm line-clamp-2 max-w-xs'>{content}</span>;
    },
  },
  {
    accessorKey: 'name',
    header: 'Commented By',
    cell: ({ row }) => {
      const user = row.original.name;
      return (
        <span className='text-sm text-muted-foreground'>
          {user || 'Unknown'}
        </span>
      );
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => {
      const email = row.original.email;
      return (
        <span className='text-sm text-muted-foreground'>
          {email || 'Unknown'}
        </span>
      );
    },
  },
  {
    accessorKey: 'app.name',
    header: 'App',
    cell: ({ row }) => {
      const app = row.original.app;
      return (
        <span className='text-sm text-muted-foreground'>
          {app?.name || 'Unknown'}
        </span>
      );
    },
  },
  {
    accessorKey: 'app.comment_status',
    header: 'App Comment Status',
    cell: ({ getValue }) => {
      const status = getValue<CommentRecord['app']['comment_status']>();
      return (
        <Badge
          variant={
            status === EnumAppCommentStatus.OPEN ? 'default' : 'destructive'
          }
        >
          {status === EnumAppCommentStatus.OPEN ? 'Open' : 'Closed'}
        </Badge>
      );
    },
  },
];
