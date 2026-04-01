import { ContactRecord } from '@/types/contact';
import { type ColumnDef } from '@tanstack/react-table';

export const contactColumns: ColumnDef<ContactRecord>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ getValue }) => {
      const name = getValue<ContactRecord['name']>();
      return <span className='text-sm font-medium'>{name}</span>;
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ getValue }) => {
      const email = getValue<ContactRecord['email']>();
      return <span className='text-sm text-muted-foreground'>{email}</span>;
    },
  },
  {
    accessorKey: 'message',
    header: 'Message',
    cell: ({ getValue }) => {
      const message = getValue<ContactRecord['message']>();
      return <span className='text-sm line-clamp-2 max-w-xs'>{message}</span>;
    },
  },
];
