'use client';

import { FormInput, FormSelect } from '@/components/forms';
import { FormSwitch } from '@/components/forms/_fields/switch';

import {
  themeSettingsDefaults,
  themeSettingsSchema,
} from '@/lib/schemas/settings-schema';

import { SettingsPanel } from './settings-panel';
import { SettingsSectionForm } from './settings-section-form';

export function ThemeSettingsForm() {
  return (
    <SettingsPanel
      title='Theme Controls'
      description='Tune the default visual direction for the dashboard and storefront surfaces.'
    >
      <SettingsSectionForm
        schema={themeSettingsSchema}
        defaultValues={themeSettingsDefaults}
        successMessage='Theme settings saved'
        submitLabel='Save Theme'
      >
        {({ control }) => (
          <>
            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
              <FormSelect
                control={control}
                name='theme_mode'
                label='Theme Mode'
                options={[
                  { label: 'System', value: 'system' },
                  { label: 'Light', value: 'light' },
                  { label: 'Dark', value: 'dark' },
                ]}
              />
              <FormInput
                control={control}
                name='primary_color'
                label='Primary Color'
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
                name='surface_color'
                label='Surface Color'
                fieldProps={{ type: 'color' }}
              />
            </div>

            <div className='mt-4 grid gap-4 md:grid-cols-2'>
              <FormSwitch
                control={control}
                name='enable_soft_shadows'
                label='Enable soft shadows'
              />
              <FormSwitch
                control={control}
                name='show_glass_cards'
                label='Enable glass cards'
              />
            </div>
          </>
        )}
      </SettingsSectionForm>
    </SettingsPanel>
  );
}
