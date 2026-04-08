'use client';

import { FormInput } from '@/components/forms';

import {
  getThemeSettingsDefaults,
  type IThemeSettingsSchema,
  themeSettingsSchema,
} from '@/lib/schemas/settings-schema';

import { SettingsPanel } from './settings-panel';
import { SettingsSectionForm } from './settings-section-form';

type Props = {
  initialValues?: IThemeSettingsSchema;
};

export function ThemeSettingsForm({ initialValues }: Props) {
  return (
    <SettingsPanel
      title='Theme Controls'
      description='Tune the default visual direction for the dashboard and storefront surfaces.'
    >
      <SettingsSectionForm
        schema={themeSettingsSchema}
        defaultValues={getThemeSettingsDefaults(initialValues)}
        submitLabel='Save Theme'
      >
        {({ control }) => (
          <>
            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
              <FormInput
                control={control}
                name='primary_color'
                label='Primary Color'
                fieldProps={{ type: 'color' }}
              />
              <FormInput
                control={control}
                name='secondary_color'
                label='Secondary Color'
                fieldProps={{ type: 'color' }}
              />
              <FormInput
                control={control}
                name='accent_color'
                label='Accent Color'
                fieldProps={{ type: 'color' }}
              />
              <FormInput
                control={control}
                name='background_color'
                label='Background Color'
                fieldProps={{ type: 'color' }}
              />
            </div>
          </>
        )}
      </SettingsSectionForm>
    </SettingsPanel>
  );
}
