'use client';

import { IFooterSetting } from '@/types/settings';

import { FormArrayField, FormInput, FormRichText } from '@/components/forms';
import { FormCheckbox } from '@/components/forms/_fields/checkbox';
import { MediaInput } from '@/components/media';

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
        {({ control, getValues, setValue, formState: { errors } }) => (
          <>
            <div className='mt-4 gap-5 grid md:grid-cols-2'>
              <div className='space-y-5'>
                <FormInput
                  control={control}
                  name='value.footer_heading'
                  label='Footer Heading'
                  placeholder='Stay Updated'
                />
                <MediaInput
                  label='Footer Logo'
                  value={getValues(`value.footer_logo`)}
                  onChange={(value) => {
                    setValue(`value.footer_logo`, value, {
                      shouldValidate: true,
                      shouldDirty: true,
                      shouldTouch: true,
                    });
                  }}
                />
                {errors.value?.footer_logo && (
                  <p className='text-destructive text-sm mt-2'>
                    {errors.value?.footer_logo.message}
                  </p>
                )}
              </div>

              <FormArrayField
                control={control}
                name='value.footer_links'
                label='Footer Links'
                fieldProps={{
                  type: 'array',
                  arrayType: 'object',
                  defaultItem: {
                    label: '',
                    url: '',
                    is_enabled: true,
                    is_open_new_tab: true,
                  },
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
                    <FormCheckbox
                      control={control}
                      name={`value.footer_links.${index}.is_enabled`}
                      showLabel={false}
                      label='Enabled'
                    />
                    <FormCheckbox
                      control={control}
                      name={`value.footer_links.${index}.is_open_new_tab`}
                      showLabel={false}
                      label='Open in New Tab'
                    />
                  </div>
                )}
              />
            </div>
            <FormRichText
              control={control}
              name='value.footer_description'
              label='Footer Description'
              placeholder='Write footer about content'
            />
          </>
        )}
      </SettingsSectionForm>
    </SettingsPanel>
  );
}
