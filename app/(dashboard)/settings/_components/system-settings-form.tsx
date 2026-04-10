'use client';

import { ISystemSetting } from '@/types/settings';

import { FormInput, FormSelect } from '@/components/forms';
import { MediaInput } from '@/components/media';
import { Separator } from '@/components/ui/separator';

import { systemSettingsSchema } from '@/lib/schemas/settings-schema';

import { SettingsPanel } from './settings-panel';
import { SettingsSectionForm } from './settings-section-form';

type Props = {
  initialValues: ISystemSetting;
};

export function SystemSettingsForm({ initialValues }: Props) {
  return (
    <SettingsPanel
      title='System Controls'
      description='Configure the default site settings used across landing pages and app detail pages.'
    >
      <SettingsSectionForm
        schema={systemSettingsSchema}
        defaultValues={initialValues}
        submitLabel='Save System Settings'
      >
        {({ control, formState: { errors }, getValues, setValue }) => (
          <>
            <h2 className='text-base font-medium'>Site Setting</h2>
            <div className='grid md:grid-cols-2 gap-4'>
              <div className='space-y-3'>
                <MediaInput
                  label='Site Logo'
                  value={getValues('value.site.logo_url') || ''}
                  onChange={(value) => {
                    setValue('value.site.logo_url', value, {
                      shouldValidate: true,
                      shouldDirty: true,
                      shouldTouch: true,
                    });
                  }}
                />
                {errors?.value?.site?.logo_url?.message && (
                  <p className='text-sm text-destructive'>
                    {errors?.value?.site?.logo_url?.message}
                  </p>
                )}
              </div>
              <div className='space-y-3'>
                <MediaInput
                  label='Favicon Icon'
                  value={getValues('value.site.favicon_url') || ''}
                  onChange={(value) => {
                    setValue('value.site.favicon_url', value, {
                      shouldValidate: true,
                      shouldDirty: true,
                      shouldTouch: true,
                    });
                  }}
                />
                {errors?.value?.site?.favicon_url?.message && (
                  <p className='text-sm text-destructive'>
                    {errors?.value?.site?.favicon_url?.message}
                  </p>
                )}
              </div>
            </div>
            <Separator />

            <h2 className='text-base font-medium'>Theme Setting</h2>
            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
              <div className='space-y-2'>
                <FormInput
                  control={control}
                  name='value.theme.primary_color'
                  label='Primary Color'
                  fieldProps={{ type: 'color' }}
                />
                <FormInput
                  control={control}
                  name='value.theme.primary_color'
                  label='Primary Color'
                  showLabel={false}
                />
              </div>
              <div className='space-y-2'>
                <FormInput
                  control={control}
                  name='value.theme.secondary_color'
                  label='Secondary Color'
                  fieldProps={{ type: 'color' }}
                />
                <FormInput
                  control={control}
                  name='value.theme.secondary_color'
                  label='Secondary Color'
                  showLabel={false}
                />
              </div>
              <div className='space-y-2'>
                <FormInput
                  control={control}
                  name='value.theme.accent_color'
                  label='Accent Color'
                  fieldProps={{ type: 'color' }}
                />
                <FormInput
                  control={control}
                  name='value.theme.accent_color'
                  label='Accent Color'
                  showLabel={false}
                />
              </div>
              <div className='space-y-2'>
                <FormInput
                  control={control}
                  name='value.theme.background_color'
                  label='Background Color'
                  fieldProps={{ type: 'color' }}
                />
                <FormInput
                  control={control}
                  name='value.theme.background_color'
                  label='Background Color'
                  showLabel={false}
                />
              </div>
            </div>
            <Separator />
            <h2 className='text-base font-medium'>Trash Setting</h2>
            <div className='grid md:grid-cols-2 lg:grid-cols-3'>
              <FormSelect
                control={control}
                name='value.setting.app_deleted_time'
                label='Trash App Deleted Time'
                options={[
                  { label: 'Off', value: 'off' },
                  { label: '1 Day', value: '1' },
                  { label: '5 Days', value: '5' },
                  { label: '10 Days', value: '10' },
                  { label: '15 Days', value: '15' },
                  { label: '20 Days', value: '20' },
                  { label: '25 Days', value: '25' },
                  { label: '1 Month', value: '30' },
                  { label: '2 Months', value: '90' },
                ]}
              />
            </div>
          </>
        )}
      </SettingsSectionForm>
    </SettingsPanel>
  );
}
