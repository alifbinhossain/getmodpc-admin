import type { Metadata } from 'next';
import { cookies } from 'next/headers';

import { UserAppRequestRecord } from '@/types/user-app-request';

import api from '@/lib/axios';
import { fallBackData } from '@/lib/utils';

import UserAppRequests from './_components/user-app-requests';

export const metadata: Metadata = { title: 'User App Requests' };

export default async function UserAppRequestsPage() {
  const token = (await cookies()).get('accessToken')?.value;
  const response = await api
    .list<UserAppRequestRecord>('/user-app-requests', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch(() => fallBackData<UserAppRequestRecord>());
  return <UserAppRequests initialData={response} />;
}
