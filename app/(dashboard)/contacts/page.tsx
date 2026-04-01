import type { Metadata } from 'next';

import Contacts from './_components/contacts';
import { contactsService } from './_config/contacts.service';

export const metadata: Metadata = { title: 'Contacts' };

export default async function ContactsPage() {
  const response = await contactsService.getContacts();
  return <Contacts initialData={response} />;
}
