'use client';

import { MantineProvider } from '@mantine/core';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { FooterSettingsForm } from './footer-settings-form';
import { IconSettingsForm } from './icon-settings-form';
import { LinksSettingsForm } from './links-settings-form';
import { RatingSettingsForm } from './rating-settings-form';
import { SeoSettingsForm } from './seo-settings-form';
import { SocialLinksSettingsForm } from './social-links-settings-form';
import { ThemeSettingsForm } from './theme-settings-form';

export function SettingsForm() {
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
          <SeoSettingsForm />
        </TabsContent>

        <TabsContent value='theme' className='space-y-5'>
          <ThemeSettingsForm />
        </TabsContent>

        <TabsContent value='rating' className='space-y-5'>
          <RatingSettingsForm />
        </TabsContent>

        <TabsContent value='links' className='space-y-5'>
          <LinksSettingsForm />
        </TabsContent>

        <TabsContent value='social-links' className='space-y-5'>
          <SocialLinksSettingsForm />
        </TabsContent>

        <TabsContent value='footer' className='space-y-5'>
          <FooterSettingsForm />
        </TabsContent>

        <TabsContent value='icon' className='space-y-5'>
          <IconSettingsForm />
        </TabsContent>
      </Tabs>
    </MantineProvider>
  );
}
