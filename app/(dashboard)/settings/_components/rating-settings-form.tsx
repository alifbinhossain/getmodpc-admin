'use client';

import { IRatingSetting } from '@/types/settings';

import { FormRichText } from '@/components/forms';
import { FormCheckbox } from '@/components/forms/_fields/checkbox';

import { ratingSettingsSchema } from '@/lib/schemas/settings-schema';

import { SettingsPanel } from './settings-panel';
import { SettingsSectionForm } from './settings-section-form';

type Props = {
  initialValues: IRatingSetting;
};

export function RatingSettingsForm({ initialValues }: Props) {
  return (
    <SettingsPanel
      title='Rating Presentation'
      description='Decide how ratings, vote counts, and editor badges appear throughout the site.'
    >
      <SettingsSectionForm
        schema={ratingSettingsSchema}
        defaultValues={initialValues}
        submitLabel='Save Rating'
      >
        {({ control }) => (
          <>
            <div className='grid gap-4 md:grid-cols-2'>
              <FormRichText
                control={control}
                name='value.success_message'
                label='Success Message'
                placeholder='Write success message'
                required
              />
              <FormRichText
                control={control}
                name='value.error_message'
                label='Error Message'
                placeholder='Write error message'
                required
              />
            </div>
            <div className='space-y-1'>
              <FormCheckbox
                control={control}
                name='value.is_active'
                label='Active'
                showLabel={false}
              />
              <span className='text-muted-foreground text-sm'>
                If active is true , user cannot one more rating within 24 hours
              </span>
            </div>
          </>
        )}
      </SettingsSectionForm>
    </SettingsPanel>
  );
}
