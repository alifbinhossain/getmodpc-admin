'use client';

import type { ISetting } from '@/types/settings';
import { MantineProvider } from '@mantine/core';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { useGetSettingValuesDividedByKeys } from '../_config/settings.hooks';
import { FooterSettingsForm } from './footer-settings-form';
import { IconSettingsForm } from './icon-settings-form';
import { LinksSettingsForm } from './links-settings-form';
import { RatingSettingsForm } from './rating-settings-form';
import { SeoSettingsForm } from './seo-settings-form';
import { SocialLinksSettingsForm } from './social-links-settings-form';
import { ThemeSettingsForm } from './theme-settings-form';

type Props = {
  initialData: ISetting[] | [];
};

export function SettingsForm({ initialData }: Props) {
  const { footer, icons, links, rating, seo, social_links, theme } =
    useGetSettingValuesDividedByKeys(initialData);
  return (
    <MantineProvider>
      <Tabs defaultValue='seo'>
        <TabsList className='h-auto flex-wrap justify-start'>
          <TabsTrigger value='seo'>Seo</TabsTrigger>
          <TabsTrigger value='theme'>Theme</TabsTrigger>
          <TabsTrigger value='rating'>Rating</TabsTrigger>
          <TabsTrigger value='links'>Links</TabsTrigger>
          <TabsTrigger value='social_links'>Social Links</TabsTrigger>
          <TabsTrigger value='footer'>Footer</TabsTrigger>
          <TabsTrigger value='icons'>Icon</TabsTrigger>
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

        <TabsContent value='theme' className='space-y-5'>
          <ThemeSettingsForm
            key={`theme`}
            initialValues={{
              key: 'theme',
              value: theme,
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

        <TabsContent value='links' className='space-y-5'>
          <LinksSettingsForm
            key={`links`}
            initialValues={{
              key: 'links',
              value: links,
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
