'use client';

import type { ApiResponse } from '@/types';
import type { SettingsRecord } from '@/types/settings';
import { MantineProvider } from '@mantine/core';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import {
  getFooterSettingsDefaults,
  getIconSettingsDefaults,
  getLinksSettingsDefaults,
  getRatingSettingsDefaults,
  getSeoSettingsDefaults,
  getSocialLinksSettingsDefaults,
  getThemeSettingsDefaults,
} from '@/lib/schemas/settings-schema';

import { useSettings } from '../_config/settings.hooks';
import { FooterSettingsForm } from './footer-settings-form';
import { IconSettingsForm } from './icon-settings-form';
import { LinksSettingsForm } from './links-settings-form';
import { RatingSettingsForm } from './rating-settings-form';
import { SeoSettingsForm } from './seo-settings-form';
import { SocialLinksSettingsForm } from './social-links-settings-form';
import { ThemeSettingsForm } from './theme-settings-form';

type Props = {
  initialData?: ApiResponse<SettingsRecord> | null;
};

export function SettingsForm({ initialData }: Props) {
  const { data, dataUpdatedAt } = useSettings(initialData ?? undefined);
  const settings = data?.data;
  const version = dataUpdatedAt || 0;

  return (
    <MantineProvider>
      <Tabs defaultValue='seo'>
        <TabsList className='h-auto flex-wrap justify-start'>
          <TabsTrigger value='seo'>Seo</TabsTrigger>
          <TabsTrigger value='theme'>Theme</TabsTrigger>
          <TabsTrigger value='rating'>Rating</TabsTrigger>
          <TabsTrigger value='links'>Links</TabsTrigger>
          <TabsTrigger value='social-links'>Social Links</TabsTrigger>
          <TabsTrigger value='footer'>Footer</TabsTrigger>
          <TabsTrigger value='icon'>Icon</TabsTrigger>
        </TabsList>

        <TabsContent value='seo' className='space-y-5'>
          <SeoSettingsForm
            key={`seo-${version}`}
            initialValues={getSeoSettingsDefaults(settings)}
          />
        </TabsContent>

        <TabsContent value='theme' className='space-y-5'>
          <ThemeSettingsForm
            key={`theme-${version}`}
            initialValues={getThemeSettingsDefaults(settings)}
          />
        </TabsContent>

        <TabsContent value='rating' className='space-y-5'>
          <RatingSettingsForm
            key={`rating-${version}`}
            initialValues={getRatingSettingsDefaults(settings)}
          />
        </TabsContent>

        <TabsContent value='links' className='space-y-5'>
          <LinksSettingsForm
            key={`links-${version}`}
            initialValues={getLinksSettingsDefaults(settings)}
          />
        </TabsContent>

        <TabsContent value='social-links' className='space-y-5'>
          <SocialLinksSettingsForm
            key={`social-links-${version}`}
            initialValues={getSocialLinksSettingsDefaults(settings)}
          />
        </TabsContent>

        <TabsContent value='footer' className='space-y-5'>
          <FooterSettingsForm
            key={`footer-${version}`}
            initialValues={getFooterSettingsDefaults(settings)}
          />
        </TabsContent>

        <TabsContent value='icon' className='space-y-5'>
          <IconSettingsForm
            key={`icon-${version}`}
            initialValues={getIconSettingsDefaults(settings)}
          />
        </TabsContent>
      </Tabs>
    </MantineProvider>
  );
}
