'use client';

import { ILinkSetting } from '@/types/settings';

import { FormArrayField, FormInput } from '@/components/forms';

import { linksSettingsSchema } from '@/lib/schemas/settings-schema';

import { SettingsPanel } from './settings-panel';
import { SettingsSectionForm } from './settings-section-form';

type Props = {
  initialValues: ILinkSetting;
};

export function LinksSettingsForm({ initialValues }: Props) {
  return (
    <SettingsPanel
      title='Primary Links'
      description='Define the main call-to-action links and any supporting useful links.'
    >
      <SettingsSectionForm
        schema={linksSettingsSchema}
        defaultValues={initialValues}
        submitLabel='Save Links'
      >
        {({ control }) => (
          <>
            <div className='grid gap-4 md:grid-cols-2'>
              <FormInput
                control={control}
                name='value.primary_cta_label'
                label='Primary CTA Label'
                placeholder='Download App'
              />
              <FormInput
                control={control}
                name='value.primary_cta_url'
                label='Primary CTA URL'
                placeholder='https://example.com/download'
              />
              <FormInput
                control={control}
                name='value.secondary_cta_label'
                label='Secondary CTA Label'
                placeholder='View Changelog'
              />
              <FormInput
                control={control}
                name='value.secondary_cta_url'
                label='Secondary CTA URL'
                placeholder='https://example.com/changelog'
              />
            </div>

            <div className='mt-5'>
              <FormArrayField
                control={control}
                name='value.useful_links'
                label='Useful Links'
                fieldProps={{
                  type: 'array',
                  arrayType: 'object',
                  defaultItem: { label: '', url: '' },
                }}
                render={({ index }) => (
                  <div className='grid w-full gap-4 rounded-lg border bg-muted/30 p-4 md:grid-cols-2'>
                    <FormInput
                      control={control}
                      name={`value.useful_links.${index}.label`}
                      label={`Link Label ${index + 1}`}
                      placeholder='Support Center'
                    />
                    <FormInput
                      control={control}
                      name={`value.useful_links.${index}.url`}
                      label={`Link URL ${index + 1}`}
                      placeholder='https://example.com'
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
