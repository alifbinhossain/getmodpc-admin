'use client';

import { FormArrayField, FormInput } from '@/components/forms';

import {
  socialLinksSettingsDefaults,
  socialLinksSettingsSchema,
} from '@/lib/schemas/settings-schema';

import { SettingsPanel } from './settings-panel';
import { SettingsSectionForm } from './settings-section-form';

export function SocialLinksSettingsForm() {
  return (
    <SettingsPanel
      title='Social Links'
      description='Manage the public social profiles displayed in the header, footer, and app pages.'
    >
      <SettingsSectionForm
        schema={socialLinksSettingsSchema}
        defaultValues={socialLinksSettingsDefaults}
        successMessage='Social links saved'
        submitLabel='Save Social Links'
      >
        {({ control }) => (
          <FormArrayField
            control={control}
            name='social_links'
            label='Social Profiles'
            fieldProps={{
              type: 'array',
              arrayType: 'object',
              defaultItem: { label: '', url: '' },
            }}
            render={({ index }) => (
              <div className='grid w-full gap-4 rounded-lg border bg-muted/30 p-4 md:grid-cols-2'>
                <FormInput
                  control={control}
                  name={`social_links.${index}.label`}
                  label={`Platform ${index + 1}`}
                  placeholder='Facebook'
                />
                <FormInput
                  control={control}
                  name={`social_links.${index}.url`}
                  label={`Profile URL ${index + 1}`}
                  placeholder='https://example.com/profile'
                />
              </div>
            )}
          />
        )}
      </SettingsSectionForm>
    </SettingsPanel>
  );
}
