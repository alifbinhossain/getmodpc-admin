'use client';

import { IThemeSetting } from '@/types/settings';

import { FormInput } from '@/components/forms';

import { themeSettingsSchema } from '@/lib/schemas/settings-schema';

import { SettingsPanel } from './settings-panel';
import { SettingsSectionForm } from './settings-section-form';

type Props = {
  initialValues: IThemeSetting;
};

export function ThemeSettingsForm({ initialValues }: Props) {
  return (
    <SettingsPanel
      title='Theme Controls'
      description='Tune the default visual direction for the dashboard and storefront surfaces.'
    >
      <SettingsSectionForm
        schema={themeSettingsSchema}
        defaultValues={initialValues}
        submitLabel='Save Theme'
      >
        {({ control }) => (
          <>
            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
              <div className='space-y-2'>
                <FormInput
                  control={control}
                  name='value.primary_color'
                  label='Primary Color'
                  fieldProps={{ type: 'color' }}
                />
                <FormInput
                  control={control}
                  name='value.primary_color'
                  label='Primary Color'
                  showLabel={false}
                />
              </div>
              <div className='space-y-2'>
                <FormInput
                  control={control}
                  name='value.secondary_color'
                  label='Secondary Color'
                  fieldProps={{ type: 'color' }}
                />
                <FormInput
                  control={control}
                  name='value.secondary_color'
                  label='Secondary Color'
                  showLabel={false}
                />
              </div>
              <div className='space-y-2'>
                <FormInput
                  control={control}
                  name='value.accent_color'
                  label='Accent Color'
                  fieldProps={{ type: 'color' }}
                />
                <FormInput
                  control={control}
                  name='value.accent_color'
                  label='Accent Color'
                  showLabel={false}
                />
              </div>
              <div className='space-y-2'>
                <FormInput
                  control={control}
                  name='value.background_color'
                  label='Background Color'
                  fieldProps={{ type: 'color' }}
                />
                <FormInput
                  control={control}
                  name='value.background_color'
                  label='Background Color'
                  showLabel={false}
                />
              </div>
            </div>
          </>
        )}
      </SettingsSectionForm>
    </SettingsPanel>
  );
}
