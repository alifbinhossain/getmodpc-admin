import type { Metadata } from 'next';

import { UsersTable } from './_components/users-table';
import { MOCK_USERS } from './_config/mockdata';

export const metadata: Metadata = { title: 'Users' };

export default function UsersPage() {
  return <UsersTable data={MOCK_USERS} />;
}
