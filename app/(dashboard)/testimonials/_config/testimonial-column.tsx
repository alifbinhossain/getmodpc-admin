import Image from 'next/image';

import type { ColumnMeta } from '@/types/table';
import { TestimonialRecord } from '@/types/testimonial';
import { type ColumnDef } from '@tanstack/react-table';

import { Badge } from '@/components/ui/badge';

export const testimonialColumns: ColumnDef<TestimonialRecord>[] = [
  {
    accessorKey: 'image_url',
    header: 'Photo',
    cell: ({ getValue }) => {
      const src = getValue<TestimonialRecord['image_url']>();
      if (!src) return <div className='h-6 w-6 rounded overflow-hidden'></div>;
      return (
        <Image
          src={src}
          className='h-6 w-6 rounded overflow-hidden'
          alt='Testimonial icon'
          width={24}
          height={24}
        />
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    // Hidden by default — shown in the name cell above.
    // Still here so global search can match on it.
    enableHiding: true,
    meta: { hideFromToggle: true } satisfies ColumnMeta,
  },
  {
    accessorKey: 'company_logo',
    header: 'Company Logo',
    cell: ({ getValue }) => {
      const src = getValue<TestimonialRecord['company_logo']>();
      if (!src) return <div className='h-6 w-6 rounded overflow-hidden'></div>;
      return (
        <Image
          src={src}
          className='h-6 w-6 rounded overflow-hidden'
          alt='Testimonial icon'
          width={24}
          height={24}
        />
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: 'designation',
    header: 'Designation',
    cell: ({ getValue }) => {
      const designation = getValue<TestimonialRecord['designation']>();
      return (
        <span className='text-sm text-muted-foreground line-clamp-2'>
          {designation}
        </span>
      );
    },
    filterFn: 'equals',
  },
  {
    accessorKey: 'content',
    header: 'Description',
    cell: ({ getValue }) => {
      const details = getValue<TestimonialRecord['content']>();
      return (
        <span className='editor text-sm text-muted-foreground line-clamp-2'>
          {details}
        </span>
      );
    },
  },
  {
    accessorKey: 'sort_order',
    header: 'Sort Order',
    cell: ({ getValue }) => {
      const sort_order = getValue<TestimonialRecord['sort_order']>();
      return (
        <span className='text-sm text-muted-foreground'>{sort_order}</span>
      );
    },
  },

  {
    accessorKey: 'is_active',
    header: 'Status',
    cell: ({ getValue }) => {
      const isActive = getValue<TestimonialRecord['is_active']>();
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
