'use client';

import { MediaInput } from '@/components/media';

import {
  iconSettingsDefaults,
  iconSettingsSchema,
} from '@/lib/schemas/settings-schema';

import { SettingsPanel } from './settings-panel';
import { SettingsSectionForm } from './settings-section-form';

export function IconSettingsForm() {
  return (
    <SettingsPanel
      title='Brand Icons'
      description='Upload the visual assets used in navigation, metadata, and touch icons.'
    >
      <SettingsSectionForm
        schema={iconSettingsSchema}
        defaultValues={iconSettingsDefaults}
        successMessage='Icon settings saved'
        submitLabel='Save Icons'
      >
        {(form) => {
          const siteLogo = form.watch('site_logo');
          const headerLogo = form.watch('header_logo');
          const favicon = form.watch('favicon');
          const appleTouchIcon = form.watch('apple_touch_icon');
          const ogImage = form.watch('og_image');

          return (
            <>
              <div className='grid gap-5 lg:grid-cols-2'>
                <div className='rounded-lg border bg-muted/30 p-4'>
                  <MediaInput
                    label='Site Logo'
                    value={siteLogo}
                    onChange={(value) => {
                      form.setValue('site_logo', value, {
                        shouldValidate: true,
                        shouldDirty: true,
                        shouldTouch: true,
                      });
                    }}
                  />
                </div>
                <div className='rounded-lg border bg-muted/30 p-4'>
                  <MediaInput
                    label='Header Logo'
                    value={headerLogo}
                    onChange={(value) => {
                      form.setValue('header_logo', value, {
                        shouldValidate: true,
                        shouldDirty: true,
                        shouldTouch: true,
                      });
                    }}
                  />
                </div>
                <div className='rounded-lg border bg-muted/30 p-4'>
                  <MediaInput
                    label='Favicon'
                    value={favicon}
                    onChange={(value) => {
                      form.setValue('favicon', value, {
                        shouldValidate: true,
                        shouldDirty: true,
                        shouldTouch: true,
                      });
                    }}
                  />
                </div>
                <div className='rounded-lg border bg-muted/30 p-4'>
                  <MediaInput
                    label='Apple Touch Icon'
                    value={appleTouchIcon}
                    onChange={(value) => {
                      form.setValue('apple_touch_icon', value, {
                        shouldValidate: true,
                        shouldDirty: true,
                        shouldTouch: true,
                      });
                    }}
                  />
                </div>
              </div>

              <div className='mt-5 rounded-lg border bg-muted/30 p-4'>
                <MediaInput
                  label='Open Graph Image'
                  value={ogImage}
                  onChange={(value) => {
                    form.setValue('og_image', value, {
                      shouldValidate: true,
                      shouldDirty: true,
                      shouldTouch: true,
                    });
                  }}
                />
              </div>
            </>
          );
        }}
      </SettingsSectionForm>
    </SettingsPanel>
  );
}
