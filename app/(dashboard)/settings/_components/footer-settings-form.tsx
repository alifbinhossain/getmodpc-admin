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
            <div className='mt-4 gap-4 grid md:grid-cols-2 lg:grid-cols-3'>
              <FormInput
                control={control}
                name='value.footer_heading'
                label='Footer Heading'
                placeholder='Stay Updated'
              />
              <FormRichText
                control={control}
                name='value.footer_description'
                label='Footer Description'
                placeholder='Write footer about content'
                required
              />
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
