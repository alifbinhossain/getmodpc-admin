'use client';

import { IIconSetting } from '@/types/settings';

import { FormArrayField, FormInput, FormRichText } from '@/components/forms';
import { MediaInput } from '@/components/media';

import { iconSettingsSchema } from '@/lib/schemas/settings-schema';

import { SettingsPanel } from './settings-panel';
import { SettingsSectionForm } from './settings-section-form';

type Props = {
  initialValues: IIconSetting;
};

export function IconSettingsForm({ initialValues }: Props) {
  return (
    <SettingsPanel
      title='Brand Icons'
      description='Upload the visual assets used in navigation, metadata, and touch icons.'
    >
      <SettingsSectionForm
        schema={iconSettingsSchema}
        defaultValues={initialValues}
        submitLabel='Save Icons'
      >
        {({ control, getValues, setValue, formState: { errors } }) => (
          <>
            <FormArrayField
              control={control}
              name='value.icons'
              label='Icons'
              fieldProps={{
                type: 'array',
                arrayType: 'object',
                defaultItem: {
                  url: '',
                  name: '',
                  alt_text: '',
                },
              }}
              render={({ index }) => (
                <div className='w-full space-y-5 rounded-lg border bg-muted/30 p-4'>
                  <FormInput
                    control={control}
                    name={`value.icons.${index}.name`}
                    label={`Name ${index + 1}`}
                    placeholder='Example Logo'
                  />

                  <div className='space-y-3'>
                    <MediaInput
                      label='Icon'
                      value={getValues(`value.icons.${index}.url`)}
                      onChange={(value) => {
                        setValue(`value.icons.${index}.url`, value, {
                          shouldValidate: true,
                          shouldDirty: true,
                          shouldTouch: true,
                        });
                      }}
                    />
                    {errors?.value?.icons?.[index]?.['url']?.message && (
                      <p className='text-sm text-destructive'>
                        {errors?.value?.icons?.[index]?.['url']?.message}
                      </p>
                    )}
                  </div>
                  <FormInput
                    control={control}
                    name={`value.icons.${index}.alt_text`}
                    label={`Alt Text ${index + 1}`}
                    placeholder='Example Logo'
                  />
                </div>
              )}
            />
            <FormRichText
              control={control}
              name='value.verified_badge_tooltip_text'
              label='Verified Badge Tooltip Text'
              placeholder='Verified badge tooltip text'
            />
          </>
        )}
      </SettingsSectionForm>
    </SettingsPanel>
  );
}
