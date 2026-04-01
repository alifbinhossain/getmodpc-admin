'use client';

import { useFormModal } from '@/stores/use-form-modal';
import { ContactRecord } from '@/types/contact';
import { RefreshCw } from 'lucide-react';

import { DataTable } from '@/components/table';
import { Button } from '@/components/ui/button';

import { contactColumns } from '../_config/contact-column';
import { contactsService } from '../_config/contacts.service';

interface ContactsTableProps {
  data: ContactRecord[];
  isLoading?: boolean;
  isFetching?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
  refetch: () => void;
}

export function ContactsTable({
  data,
  isLoading,
  isFetching,
  canEdit = true,
  canDelete = true,
  refetch,
}: ContactsTableProps) {
  const { openModal } = useFormModal();

  return (
    <DataTable<ContactRecord>
      data={data}
      columns={contactColumns}
      isLoading={isLoading}
      isFetching={isFetching}
      title='Contacts'
      description='Manage all contact messages.'
      permissions={{ canEdit, canDelete, canView: false }}
      actions={{
        onEdit: (contact) => openModal('EDIT_CONTACT', contact, refetch),
        onDelete: async (contact) => {
          try {
            await contactsService.deleteContact(contact.id);
            refetch();
          } catch (error) {
            console.error('Failed to delete contact:', error);
          }
        },
      }}
      toolbarExtra={
        <Button variant='ghost' size='sm' onClick={() => refetch()}>
          <RefreshCw />
        </Button>
      }
      deleteBulkAction={async (ids: string[]) => {
        try {
          await contactsService.deleteContacts(ids);
          refetch();
        } catch (error) {
          console.error('Failed to delete contacts:', error);
        }
      }}
    />
  );
}
