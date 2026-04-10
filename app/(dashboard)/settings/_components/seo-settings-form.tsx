'use client';

import { ISeoSetting } from '@/types/settings';

import { FormInput, FormTextarea } from '@/components/forms';
import { FormSwitch } from '@/components/forms/_fields/switch';

import { seoSettingsSchema } from '@/lib/schemas/settings-schema';

import { SettingsPanel } from './settings-panel';
import { SettingsSectionForm } from './settings-section-form';

type Props = {
  initialValues: ISeoSetting;
};

export function SeoSettingsForm({ initialValues }: Props) {
  return (
    <SettingsPanel
      title='Search Engine Defaults'
      description='Configure the default metadata used across landing pages and app detail pages.'
    >
      <SettingsSectionForm
        schema={seoSettingsSchema}
        defaultValues={initialValues}
        submitLabel='Save Seo'
      >
        {({ control }) => (
          <>
            <div className='grid gap-4 md:grid-cols-2'>
              <FormInput
                control={control}
                name='value.site_name'
                label='Site Name'
                placeholder='GetModPC'
                required
              />
              <FormInput
                control={control}
                name='value.site_tagline'
                label='Tagline'
                placeholder='Short product tagline'
              />
              <FormInput
                control={control}
                name='value.meta_title'
                label='Meta Title'
                placeholder='Default meta title'
              />
              <FormInput
                control={control}
                name='value.canonical_url'
                label='Canonical URL'
                placeholder='https://example.com'
              />
            </div>

            <div className='mt-4 space-y-4'>
              <FormTextarea
                control={control}
                name='value.meta_description'
                label='Meta Description'
                placeholder='Default meta description'
                maxChars={320}
              />
              <FormInput
                control={control}
                name='value.meta_keywords'
                label='Meta Keywords'
                placeholder='apk, android, games'
              />
              <FormInput
                control={control}
                name='value.og_title'
                label='Open Graph Title'
                placeholder='Default social title'
              />
              <FormTextarea
                control={control}
                name='value.og_description'
                label='Open Graph Description'
                placeholder='Default social description'
                maxChars={320}
              />
            </div>

            <div className='mt-4 grid gap-4 md:grid-cols-2'>
              <FormSwitch
                control={control}
                name='value.robots_index'
                label='Allow indexing'
                showLabel={false}
              />
              <FormSwitch
                control={control}
                name='value.robots_follow'
                label='Allow link following'
                showLabel={false}
              />
            </div>
          </>
        )}
      </SettingsSectionForm>
    </SettingsPanel>
  );
}
