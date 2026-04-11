import React from 'react';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { User } from '@/types/auth';

import api from '@/lib/axios';

import Profile from './_components/profile';

export const metadata = {
  title: 'Profile',
  description: 'Profile page',
};
async function ProfilePage() {
  const token = (await cookies()).get('accessToken')?.value;
  if (!token) redirect('/sign-in');
  const profile = await api
    .get('/auth/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    })
    .then((res) => res.data)
    .catch(() => null);
  return (
    <div className='space-y-6'>
      <div className='space-y-1'>
        <h1 className='text-2xl font-bold tracking-tight'>Profile</h1>
        <p className='text-sm text-muted-foreground'>
          Manage your account settings and change your password.
        </p>
      </div>
      <Profile initialValues={profile as User} />
    </div>
  );
}

export default ProfilePage;
