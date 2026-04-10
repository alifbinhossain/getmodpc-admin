'use client';

import { IButtonSetting } from '@/types/settings';

import { FormInput, FormRichText } from '@/components/forms';
import { FormCheckbox } from '@/components/forms/_fields/checkbox';

import { buttonsSettingsSchema } from '@/lib/schemas/settings-schema';

import { SettingsPanel } from './settings-panel';
import { SettingsSectionForm } from './settings-section-form';

type Props = {
  initialValues: IButtonSetting;
};

export function LinksSettingsForm({ initialValues }: Props) {
  return (
    <SettingsPanel
      title='All Buttons'
      description='Define the main call-to-action buttons and any supporting useful buttons.'
    >
      <SettingsSectionForm
        schema={buttonsSettingsSchema}
        defaultValues={initialValues}
        submitLabel='Save Buttons'
      >
        {({ control }) => (
          <>
            <div className='grid gap-4 md:grid-cols-2'>
              <div className='flex flex-col gap-5'>
                <FormInput
                  control={control}
                  name='value.download_button.label'
                  label='Download Button Label'
                  placeholder='Download'
                />
                <FormCheckbox
                  control={control}
                  name='value.download_button.is_enabled'
                  label='Enabled'
                  showLabel={false}
                />
              </div>
              <div className='flex flex-col gap-5'>
                <FormInput
                  control={control}
                  name='value.telegram_button.label'
                  label='Telegram Button Label'
                  placeholder='Telegram'
                />
                <FormInput
                  control={control}
                  name='value.telegram_button.url'
                  label='Telegram Button URL'
                  placeholder='https://example.com/changelog'
                  fieldProps={{
                    type: 'url',
                  }}
                />
                <div className='flex items-center gap-5'>
                  <FormCheckbox
                    control={control}
                    name='value.telegram_button.is_enabled'
                    label='Enabled'
                    showLabel={false}
                  />
                  <FormCheckbox
                    control={control}
                    name='value.telegram_button.is_open_new_tab'
                    label='Open in New Tab'
                    showLabel={false}
                  />
                </div>
              </div>
            </div>
            <FormRichText
              control={control}
              name='value.installation_guideline'
              label='Installation Guide'
              placeholder='Write your installation guide here'
            />
          </>
        )}
      </SettingsSectionForm>
    </SettingsPanel>
  );
}
