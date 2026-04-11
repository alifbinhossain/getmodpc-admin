import React from 'react';

import { FormInput } from '@/components/forms';

import { changePasswordSchema } from '@/lib/schemas/profile-schema';

import { ProfilePanel } from './profile-panel';
import { ProfileSectionForm } from './profile-section-form';

function ChangePasswordForm() {
  return (
    <ProfilePanel title='Profile' description='Update your profile'>
      <ProfileSectionForm
        schema={changePasswordSchema}
        defaultValues={{
          confirm_password: '',
          newPassword: '',
          oldPassword: '',
        }}
        submitLabel='Change Password'
        tab='change-password'
      >
        {({ control }) => (
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
            <FormInput
              control={control}
              name='oldPassword'
              label='Current Password'
              placeholder='••••••••'
              fieldProps={{
                type: 'password',
              }}
              required
            />
            <FormInput
              control={control}
              name='newPassword'
              label='New Password'
              placeholder='••••••••'
              fieldProps={{
                type: 'password',
              }}
              required
            />
            <FormInput
              control={control}
              name='confirm_password'
              label='Confirm Password'
              placeholder='••••••••'
              fieldProps={{
                type: 'password',
              }}
              required
            />
          </div>
        )}
      </ProfileSectionForm>
    </ProfilePanel>
  );
}

export default ChangePasswordForm;
