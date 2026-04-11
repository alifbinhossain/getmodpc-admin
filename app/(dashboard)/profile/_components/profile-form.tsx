import React from 'react';

import { FormInput } from '@/components/forms';
import { MediaInput } from '@/components/media';

import { profileSchema } from '@/lib/schemas/profile-schema';

import { ProfilePanel } from './profile-panel';
import { ProfileSectionForm } from './profile-section-form';

type Props = {
  initialValues: {
    full_name: string;
    avatar: string | null;
  };
};
function ProfileForm({ initialValues }: Props) {
  return (
    <ProfilePanel title='Profile' description='Update your profile'>
      <ProfileSectionForm
        schema={profileSchema}
        defaultValues={initialValues}
        submitLabel='Save Profile'
        tab='profile'
      >
        {({ control, getValues, setValue, formState: { errors } }) => (
          <div className='grid md:grid-cols-2 gap-5'>
            <FormInput
              control={control}
              name='full_name'
              label='Full Name'
              placeholder='John Doe'
              required
            />
            <div className='space-y-3'>
              <MediaInput
                label='Avatar'
                value={getValues('avatar') || undefined}
                onChange={(value) => {
                  setValue('avatar', value, {
                    shouldValidate: true,
                    shouldDirty: true,
                    shouldTouch: true,
                  });
                }}
              />
              {errors?.avatar?.message && (
                <p className='text-sm text-destructive'>
                  {errors?.avatar?.message}
                </p>
              )}
            </div>
          </div>
        )}
      </ProfileSectionForm>
    </ProfilePanel>
  );
}

export default ProfileForm;
