import React from 'react';

import { cookies } from 'next/headers';

import { AppRecord } from '@/types/app';

import api from '@/lib/axios';
import { getAppFormDefaults } from '@/lib/utils';

import NotFound from '@/app/not-found';

import { AppForm } from '../_components/app-form';

export const dynamic = 'force-dynamic';
type Props = {
  params: Promise<{ id: string }>;
};
async function AppDetailsPage({ params }: Props) {
  const { id } = await params;
  const token = (await cookies())?.get('accessToken')?.value;
  const data = await api
    .get<AppRecord>(`/apps/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch(() => null);
  if (!data) {
    return (
      <NotFound
        title='App Not Found'
        description="The app you're looking for doesn't exist or has been deleted."
      />
    );
  }

  return (
    <div className='space-y-6'>
      <h1 className='text-2xl font-bold tracking-tight '>
        Edit {data.name} {data.type}
      </h1>
      <AppForm isEditing data={getAppFormDefaults(data)} />
    </div>
  );
}

export default AppDetailsPage;
