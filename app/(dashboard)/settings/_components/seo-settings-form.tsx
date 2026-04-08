'use client';

import { FormInput, FormTextarea } from '@/components/forms';
import { FormSwitch } from '@/components/forms/_fields/switch';

import {
  getSeoSettingsDefaults,
  type ISeoSettingsSchema,
  seoSettingsSchema,
} from '@/lib/schemas/settings-schema';

import { SettingsPanel } from './settings-panel';
import { SettingsSectionForm } from './settings-section-form';

type Props = {
  initialValues?: ISeoSettingsSchema;
};

export function SeoSettingsForm({ initialValues }: Props) {
  return (
    <SettingsPanel
      title='Search Engine Defaults'
      description='Configure the default metadata used across landing pages and app detail pages.'
    >
      <SettingsSectionForm
        schema={seoSettingsSchema}
        defaultValues={getSeoSettingsDefaults(initialValues)}
        submitLabel='Save Seo'
      >
        {({ control }) => (
          <>
            <div className='grid gap-4 md:grid-cols-2'>
              <FormInput
                control={control}
                name='site_name'
                label='Site Name'
                placeholder='GetModPC'
                required
              />
              <FormInput
                control={control}
                name='site_tagline'
                label='Tagline'
                placeholder='Short product tagline'
                required
              />
              <FormInput
                control={control}
                name='meta_title'
                label='Meta Title'
                placeholder='Default meta title'
                required
              />
              <FormInput
                control={control}
                name='canonical_url'
                label='Canonical URL'
                placeholder='https://example.com'
                required
              />
            </div>

            <div className='mt-4 space-y-4'>
              <FormTextarea
                control={control}
                name='meta_description'
                label='Meta Description'
                placeholder='Default meta description'
                maxChars={320}
                required
              />
              <FormInput
                control={control}
                name='meta_keywords'
                label='Meta Keywords'
                placeholder='apk, android, games'
                required
              />
              <FormInput
                control={control}
                name='og_title'
                label='Open Graph Title'
                placeholder='Default social title'
                required
              />
              <FormTextarea
                control={control}
                name='og_description'
                label='Open Graph Description'
                placeholder='Default social description'
                maxChars={320}
                required
              />
            </div>

            <div className='mt-4 grid gap-4 md:grid-cols-2'>
              <FormSwitch
                control={control}
                name='robots_index'
                label='Allow indexing'
              />
              <FormSwitch
                control={control}
                name='robots_follow'
                label='Allow link following'
              />
            </div>
          </>
        )}
      </SettingsSectionForm>
    </SettingsPanel>
  );
}
