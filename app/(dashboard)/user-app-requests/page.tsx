import type { Metadata } from 'next';

import UserAppRequests from './_components/user-app-requests';
import { userAppRequestsService } from './_config/user-app-requests.service';

export const metadata: Metadata = { title: 'User App Requests' };

export default async function UserAppRequestsPage() {
  const response = await userAppRequestsService.getUserAppRequests();
  return <UserAppRequests initialData={response} />;
}
