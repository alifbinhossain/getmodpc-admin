'use client';

import { IFooterSetting } from '@/types/settings';

import {
  FormArrayField,
  FormInput,
  FormRichText,
  FormTextarea,
} from '@/components/forms';

import { footerSettingsSchema } from '@/lib/schemas/settings-schema';

import { SettingsPanel } from './settings-panel';
import { SettingsSectionForm } from './settings-section-form';

type Props = {
  initialValues: IFooterSetting;
};

export function FooterSettingsForm({ initialValues }: Props) {
  return (
    <SettingsPanel
      title='Footer Content'
      description='Control footer messaging, newsletter copy, and supporting navigation links.'
    >
      <SettingsSectionForm
        schema={footerSettingsSchema}
        defaultValues={initialValues}
        submitLabel='Save Footer'
      >
        {({ control }) => (
          <>
            <div className='grid gap-4 md:grid-cols-2'>
              <FormInput
                control={control}
                name='value.footer_heading'
                label='Footer Heading'
                placeholder='Stay Updated'
              />
              <FormInput
                control={control}
                name='value.newsletter_title'
                label='Newsletter Title'
                placeholder='Weekly Release Digest'
              />
            </div>

            <div className='mt-4 space-y-4'>
              <FormRichText
                control={control}
                name='value.footer_description'
                label='Footer Description'
                placeholder='Write footer about content'
                required
              />
              <FormTextarea
                control={control}
                name='value.newsletter_description'
                label='Newsletter Description'
                placeholder='Summarize the newsletter offer'
                maxChars={240}
              />
              <FormInput
                control={control}
                name='value.copyright_text'
                label='Copyright Text'
                placeholder='© 2026 GetModPC. All rights reserved.'
              />
              <FormTextarea
                control={control}
                name='value.footer_note'
                label='Footer Note'
                placeholder='Add compliance or trust note'
                maxChars={320}
              />
            </div>

            <div className='mt-5'>
              <FormArrayField
                control={control}
                name='value.footer_links'
                label='Footer Links'
                fieldProps={{
                  type: 'array',
                  arrayType: 'object',
                  defaultItem: { label: '', url: '' },
                }}
                render={({ index }) => (
                  <div className='grid w-full gap-4 rounded-lg border bg-muted/30 p-4 md:grid-cols-2'>
                    <FormInput
                      control={control}
                      name={`value.footer_links.${index}.label`}
                      label={`Footer Link Label ${index + 1}`}
                      placeholder='About Us'
                    />
                    <FormInput
                      control={control}
                      name={`value.footer_links.${index}.url`}
                      label={`Footer Link URL ${index + 1}`}
                      placeholder='https://example.com/about'
                    />
                  </div>
                )}
              />
            </div>
          </>
        )}
      </SettingsSectionForm>
    </SettingsPanel>
  );
}
