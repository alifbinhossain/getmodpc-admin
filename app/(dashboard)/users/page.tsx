import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Users' };

export default function UsersPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-2xl font-bold tracking-tight'>Users</h1>
        <p className='text-muted-foreground'>
          Manage your team members and their roles.
        </p>
      </div>
    </div>
  );
}
