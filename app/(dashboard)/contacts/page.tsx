import type { Metadata } from 'next';
import { cookies } from 'next/headers';

import { ContactRecord } from '@/types/contact';

import api from '@/lib/axios';
import { fallBackData } from '@/lib/utils';

import Contacts from './_components/contacts';

export const metadata: Metadata = { title: 'Contacts' };

export default async function ContactsPage() {
  const token = (await cookies()).get('accessToken')?.value;
  const response = await api
    .list<ContactRecord>('/contacts', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch(() => fallBackData<ContactRecord>());
  return <Contacts initialData={response} />;
}
