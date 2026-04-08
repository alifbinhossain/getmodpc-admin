import React from 'react';

import { SettingsForm } from './_components/settings-form';
import { settingsService } from './_config/settings.service';

async function SettingPage() {
  const initialData = await settingsService.getSettings().catch(() => null);

  return (
    <div className='space-y-6'>
      <div className='space-y-1'>
        <h1 className='text-2xl font-bold tracking-tight'>Settings</h1>
        <p className='text-sm text-muted-foreground'>
          Manage SEO, theme tokens, ratings, link groups, footer copy, and brand
          assets from one screen.
        </p>
      </div>

      <SettingsForm initialData={initialData} />
    </div>
  );
}

export default SettingPage;
