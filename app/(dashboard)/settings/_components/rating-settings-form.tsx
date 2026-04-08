'use client';

import { FormInput, FormSelect, FormTextarea } from '@/components/forms';
import { FormSwitch } from '@/components/forms/_fields/switch';

import {
  ratingSettingsDefaults,
  ratingSettingsSchema,
} from '@/lib/schemas/settings-schema';

import { SettingsPanel } from './settings-panel';
import { SettingsSectionForm } from './settings-section-form';

export function RatingSettingsForm() {
  return (
    <SettingsPanel
      title='Rating Presentation'
      description='Decide how ratings, vote counts, and editor badges appear throughout the site.'
    >
      <SettingsSectionForm
        schema={ratingSettingsSchema}
        defaultValues={ratingSettingsDefaults}
        successMessage='Rating settings saved'
        submitLabel='Save Rating'
      >
        {({ control }) => (
          <>
            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
              <FormSelect
                control={control}
                name='rating_style'
                label='Rating Style'
                options={[
                  { label: 'Stars', value: 'stars' },
                  { label: 'Score', value: 'score' },
                  { label: 'Badge', value: 'badge' },
                ]}
              />
              <FormInput
                control={control}
                name='default_rating_value'
                label='Default Rating'
                fieldProps={{ type: 'number', min: 0, max: 5, step: '0.1' }}
              />
              <FormInput
                control={control}
                name='default_rating_count'
                label='Default Vote Count'
                fieldProps={{ type: 'number', min: 1, step: '1' }}
              />
              <FormInput
                control={control}
                name='rating_badge_text'
                label='Badge Text'
                placeholder='Editor Approved'
              />
            </div>

            <div className='mt-4 space-y-4'>
              <FormTextarea
                control={control}
                name='rating_description'
                label='Rating Description'
                placeholder='Explain how ratings are displayed'
                maxChars={280}
              />
            </div>

            <div className='mt-4 grid gap-4 md:grid-cols-2'>
              <FormSwitch
                control={control}
                name='show_editor_pick_badge'
                label='Show editor pick badge'
              />
              <FormSwitch
                control={control}
                name='show_user_rating'
                label='Show user rating summary'
              />
            </div>
          </>
        )}
      </SettingsSectionForm>
    </SettingsPanel>
  );
}
