'use client';

import { EnumAppCommentStatus, EnumPlatformType } from '@/types';
import {
  EnumAppSource,
  EnumAppStatus,
  EnumAppType,
  UpdateAppPayload,
} from '@/types/app';
import { MantineProvider } from '@mantine/core';
import { toast } from 'sonner';

import { useAppForm } from '@/hooks/form';

import {
  FormArrayField,
  FormInput,
  FormRichText,
  FormSelect,
  FormTextarea,
  FormWrapper,
} from '@/components/forms';
import { FormSwitch } from '@/components/forms/_fields/switch';
import { MediaInput } from '@/components/media';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { appSchema, IAppSchema } from '@/lib/schemas/app-schema';

import { appsService } from '../_config/apps.service';

type Props = {
  isEditing?: boolean;
  data: UpdateAppPayload;
};

export function AppForm({ isEditing, data }: Props) {
  const form = useAppForm({
    schema: appSchema,
    defaultValues: data,
  });

  const {
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: IAppSchema) => {
    try {
      if (isEditing) {
        await appsService.updateApp({
          id: data!.id,
          ...values,
        });
      } else {
        await appsService.createApp(values);
      }

      form.reset();
      toast.success(`App ${isEditing ? 'updated' : 'created'} successfully`);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid request';
      setError('root', { message });
    }
  };

  return (
    <MantineProvider>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormWrapper>
          <FormInput
            control={control}
            name='title'
            label='App Title'
            placeholder='App title'
          />

          <FormRichText
            control={control}
            name='description'
            label='Description'
            placeholder='App description'
            required
          />

          <Tabs>
            <TabsList defaultValue={'general'}>
              <TabsTrigger value='general'>General</TabsTrigger>
              <TabsTrigger value='summary'>Summary</TabsTrigger>
              <TabsTrigger value='modder'>Modder</TabsTrigger>
              <TabsTrigger value='link'>Download Links</TabsTrigger>
            </TabsList>
            <TabsContent value='general' className='space-y-5'>
              <div className='bg-gray-100 p-4 rounded-md'>
                <FormInput
                  control={control}
                  name='url'
                  label='Google Play URL'
                  placeholder='example:https://play.google.com/store/apps/details?id=com.example.app'
                  className='bg-background'
                />
              </div>
              <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 bg-gray-100 p-4 rounded-md'>
                <FormInput
                  control={control}
                  name='package_name'
                  label='Package Name'
                  placeholder='com.example.app'
                  className='bg-background'
                />

                <FormInput
                  control={control}
                  name='name'
                  label='App Name'
                  placeholder='App name'
                  required
                  className='bg-background'
                />

                <FormInput
                  control={control}
                  name='developer'
                  label='Developer'
                  placeholder='example: Google'
                  required
                  className='bg-background'
                />

                <FormInput
                  control={control}
                  name='os_version'
                  label='OS Version'
                  placeholder='OS version'
                  required
                  className='bg-background'
                />
                <FormInput
                  control={control}
                  name='version'
                  label='App Version'
                  placeholder='App version'
                  required
                  className='bg-background'
                />
                <FormInput
                  control={control}
                  name='youtube_id'
                  label='Youtube ID'
                  placeholder='Youtube ID'
                  className='bg-background'
                />
                <FormInput
                  control={control}
                  name='score_text'
                  label='Rated'
                  placeholder='Example: 1-5'
                  className='bg-background'
                />

                <FormInput
                  control={control}
                  name='ratings'
                  label='Voted'
                  placeholder='Ratings'
                  className='bg-background'
                />
                <FormInput
                  control={control}
                  name='installs'
                  label='Downloads'
                  placeholder='10M+'
                  required
                  className='bg-background'
                />
              </div>
            </TabsContent>
            <TabsContent value='summary' className='space-y-5'>
              <div className='bg-gray-100 p-4 rounded-md '>
                <FormTextarea
                  control={control}
                  name='summary'
                  label='Summary'
                  placeholder='Summary'
                  className='bg-background'
                />
              </div>
              <div className='bg-gray-100 p-4 rounded-md '>
                <FormRichText
                  control={control}
                  name='latest_news'
                  label="What's Latest New"
                  placeholder='Write about latest news'
                  className='bg-background'
                />
              </div>
            </TabsContent>
            <TabsContent value='modder' className='space-y-5'>
              <FormArrayField
                control={control}
                name='modders'
                label='Modders'
                fieldProps={{
                  defaultItem: form.getValues('modders') ?? [
                    { title: '', descriptions: '' },
                  ],
                  type: 'array',
                }}
                render={({ index }) => {
                  return (
                    <div className='space-y-5 bg-gray-100 rounded-md p-4 w-full'>
                      <FormInput
                        control={control}
                        name={`modders.${index}.title`}
                        label={`Title Mod ${index + 1}`}
                        placeholder=' title'
                        className='bg-background'
                      />
                      <FormRichText
                        control={control}
                        name={`modders.${index}.descriptions`}
                        label={`Full Mod ${index + 1}`}
                        placeholder='Description'
                        className='bg-background'
                      />
                    </div>
                  );
                }}
              />
            </TabsContent>
            <TabsContent value='link' className='space-y-5'>
              <FormArrayField
                control={control}
                name='links'
                fieldProps={{
                  defaultItem: form.getValues('links') ?? [
                    { name: '', link: '', type: '', size: '', note: '' },
                  ],
                  type: 'array',
                  arrayType: 'object',
                }}
                render={({ index }) => {
                  return (
                    <div className='space-y-5 bg-gray-100 p-4 w-full rounded-md'>
                      <div className='grid gap-4 md:grid-cols-2'>
                        <FormInput
                          control={control}
                          name={`links.${index}.name`}
                          label={'Name'}
                          placeholder='example: roblox mod menu'
                          className='bg-background'
                        />
                        <FormInput
                          control={control}
                          name={`links.${index}.link`}
                          label='Link'
                          placeholder='example: your apk link'
                          className='bg-background'
                        />
                      </div>
                      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                        <FormInput
                          control={control}
                          name={`links.${index}.type`}
                          label='Type'
                          placeholder='example: apk,zip,robo'
                          className='bg-background'
                        />
                        <FormInput
                          control={control}
                          name={`links.${index}.size`}
                          label='Size'
                          placeholder='example: 100 mb'
                          className='bg-background'
                        />
                        <FormInput
                          control={control}
                          name={`links.${index}.note`}
                          label='Note'
                          placeholder='example: mod menu'
                          className='bg-background'
                        />
                      </div>
                    </div>
                  );
                }}
              />
            </TabsContent>
          </Tabs>

          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
            <FormSelect
              control={control}
              name='platform'
              label='Platform'
              options={Object.values(EnumPlatformType).map((value) => ({
                label: value,
                value,
              }))}
            />

            <FormSelect
              control={control}
              name='type'
              label='Type'
              options={Object.values(EnumAppType).map((value) => ({
                label: value,
                value,
              }))}
            />

            <FormSelect
              control={control}
              name='status'
              label='Status'
              options={Object.values(EnumAppStatus).map((value) => ({
                label: value,
                value,
              }))}
            />

            <FormSelect
              control={control}
              name='comment_status'
              label='Comment Status'
              options={Object.values(EnumAppCommentStatus).map((value) => ({
                label: value,
                value,
              }))}
            />

            <div className='md:col-span-2'>
              <MediaInput
                label='Icon'
                value={form.getValues('icon') || ''}
                onChange={(value) => {
                  form.setValue('icon', value, {
                    shouldValidate: true,
                    shouldDirty: true,
                    shouldTouch: true,
                  });
                }}
              />
            </div>

            <div className='md:col-span-2'>
              <MediaInput
                label='Header Image'
                value={form.getValues('header_image') || ''}
                onChange={(value) => {
                  form.setValue('header_image', value, {
                    shouldValidate: true,
                    shouldDirty: true,
                    shouldTouch: true,
                  });
                }}
              />
            </div>

            <FormSwitch
              control={control}
              name='show_in_slider'
              label='Show In Slider'
            />

            <FormSwitch control={control} name='is_verified' label='Verified' />

            {form.formState.errors.root && (
              <div className='rounded-md border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive md:col-span-2'>
                {form.formState.errors.root.message}
              </div>
            )}

            <div className='md:col-span-2'>
              <Button
                disabled={
                  isSubmitting || (isEditing && !form.formState.isDirty)
                }
                type='submit'
                className='w-full'
                loading={isSubmitting}
              >
                {isEditing ? 'Update App' : 'Create App'}
              </Button>
            </div>
          </div>
        </FormWrapper>
      </form>
    </MantineProvider>
  );
}
