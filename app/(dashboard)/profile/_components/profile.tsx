'use client';

import React from 'react';

import { User } from '@/types/auth';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import ChangePasswordForm from './change-password-form';
import ProfileForm from './profile-form';

type Props = {
  initialValues: User;
};
function Profile({ initialValues }: Props) {
  return (
    <Tabs defaultValue='profile'>
      <TabsList className='h-auto flex-wrap justify-start'>
        <TabsTrigger value='profile'>Profile</TabsTrigger>
        <TabsTrigger value='change-password'>Change Password</TabsTrigger>
      </TabsList>
      <TabsContent value='profile'>
        <ProfileForm
          key={'profile'}
          initialValues={{
            full_name: initialValues.full_name,
            avatar: initialValues.avatar || null,
          }}
        />
      </TabsContent>
      <TabsContent value='change-password'>
        <ChangePasswordForm key={'change-password'} />
      </TabsContent>
    </Tabs>
  );
}

export default Profile;
