'use client';

import type { ISetting } from '@/types/settings';
import { MantineProvider } from '@mantine/core';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { useGetSettingValuesDividedByKeys } from '../_config/settings.hooks';
import { LinksSettingsForm } from './button-settings-form';
import { FooterSettingsForm } from './footer-settings-form';
import { IconSettingsForm } from './icon-settings-form';
import { RatingSettingsForm } from './rating-settings-form';
import { SeoSettingsForm } from './seo-settings-form';
import { SocialLinksSettingsForm } from './social-links-settings-form';
import { SystemSettingsForm } from './system-settings-form';

type Props = {
  initialData: ISetting[] | [];
};

export function SettingsForm({ initialData }: Props) {
  const { footer, icons, buttons, rating, seo, social_links, system_settings } =
    useGetSettingValuesDividedByKeys(initialData);
  return (
    <MantineProvider>
      <Tabs defaultValue='system_settings'>
        <TabsList className='h-auto flex-wrap justify-start'>
          <TabsTrigger value='system_settings'>System</TabsTrigger>
          <TabsTrigger value='seo'>Seo</TabsTrigger>
          <TabsTrigger value='rating'>Rating</TabsTrigger>
          <TabsTrigger value='buttons'>Buttons</TabsTrigger>
          <TabsTrigger value='social_links'>Social Links</TabsTrigger>
          <TabsTrigger value='footer'>Footer</TabsTrigger>
          <TabsTrigger value='icons'>Icons</TabsTrigger>
        </TabsList>

        <TabsContent value='seo' className='space-y-5'>
          <SeoSettingsForm
            key={`seo`}
            initialValues={{
              key: 'seo',
              value: seo,
            }}
          />
        </TabsContent>

        <TabsContent value='system_settings' className='space-y-5'>
          <SystemSettingsForm
            key={`system_settings`}
            initialValues={{
              key: 'system_settings',
              value: system_settings,
            }}
          />
        </TabsContent>

        <TabsContent value='rating' className='space-y-5'>
          <RatingSettingsForm
            key={`rating`}
            initialValues={{
              key: 'rating',
              value: rating,
            }}
          />
        </TabsContent>

        <TabsContent value='buttons' className='space-y-5'>
          <LinksSettingsForm
            key={`buttons`}
            initialValues={{
              key: 'buttons',
              value: buttons,
            }}
          />
        </TabsContent>

        <TabsContent value='social_links' className='space-y-5'>
          <SocialLinksSettingsForm
            key={`social_links`}
            initialValues={{
              key: 'social_links',
              value: social_links,
            }}
          />
        </TabsContent>

        <TabsContent value='footer' className='space-y-5'>
          <FooterSettingsForm
            key={`footer`}
            initialValues={{
              key: 'footer',
              value: footer,
            }}
          />
        </TabsContent>

        <TabsContent value='icons' className='space-y-5'>
          <IconSettingsForm
            key={`icons`}
            initialValues={{
              key: 'icons',
              value: icons,
            }}
          />
        </TabsContent>
      </Tabs>
    </MantineProvider>
  );
}
