'use client';

import type { FormEvent } from 'react';

import { Search } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { useGetPlayStoreAppByUrl } from '../../_config/scraping.hooks';
import PlayStoreAppCard from './play-store-app-card';

function AddManual() {
  const { data, isPending, mutateAsync } = useGetPlayStoreAppByUrl();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const url = String(formData.get('url') ?? '').trim();

    if (!url || isPending) {
      return;
    }

    await mutateAsync({ url });
    form.reset();
  };

  return (
    <div className='space-y-5'>
      <form
        className='border rounded-md p-2 flex items-center justify-between focus-within:ring-2 gap-2'
        onSubmit={handleSubmit}
      >
        <Input
          autoComplete='off'
          className='focus-visible:ring-0 border-none'
          name='url'
          placeholder='Example: https://play.google.com/store/apps/details?id=com.example.app'
        />
        <Button
          disabled={isPending}
          loading={isPending}
          size='lg'
          type='submit'
        >
          Get Now
        </Button>
      </form>

      {data?.data ? (
        <div className='space-y-4'>
          <div className='bg-gray-100 p-4 rounded-md border'>
            <h2 className='text-lg font-bold uppercase'>Fetched App</h2>
          </div>
          <PlayStoreAppCard app={data.data} />
        </div>
      ) : (
        <Alert>
          <Search className='size-4' />
          <AlertTitle>Paste a Play Store URL</AlertTitle>
          <AlertDescription>
            Submit a full app details URL to fetch a single record.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}

export default AddManual;
