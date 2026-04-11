import React from 'react';

import { cookies } from 'next/headers';

import { ISetting } from '@/types/settings';

import api from '@/lib/axios';
import { fallBackData } from '@/lib/utils';

import { SettingsForm } from './_components/settings-form';

async function SettingPage() {
  const token = (await cookies()).get('accessToken')?.value;
  const response = await api
    .get<ISetting[]>('settings', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch(() => fallBackData<ISetting>());
  return (
    <div className='space-y-6'>
      <div className='space-y-1'>
        <h1 className='text-2xl font-bold tracking-tight'>Settings</h1>
        <p className='text-sm text-muted-foreground'>
          Manage SEO, theme tokens, ratings, link groups, footer copy, and brand
          assets from one screen.
        </p>
      </div>

      <SettingsForm initialData={response?.data ?? []} />
    </div>
  );
}

export default SettingPage;
