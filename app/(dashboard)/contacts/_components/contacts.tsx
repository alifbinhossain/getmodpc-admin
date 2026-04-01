'use client';
import React from 'react';

import { useTablePagination } from '@/stores/use-table-pagination';
import { PaginatedResponse } from '@/types';
import type { ContactRecord } from '@/types/contact';

import { useContacts } from '../_config/contact.hooks';
import { ContactsTable } from './contacts-table';

type Props = {
  initialData: PaginatedResponse<ContactRecord>;
};

function Contacts({ initialData }: Props) {
  const { getDefinedParams } = useTablePagination();
  const params = getDefinedParams();
  const {
    data: contacts,
    isLoading,
    isFetching,
    refetch,
  } = useContacts(params, initialData);
  return (
    <ContactsTable
      isLoading={isLoading || isFetching}
      data={contacts?.data ?? []}
      canDelete={true}
      refetch={refetch}
    />
  );
}

export default Contacts;
