'use client';

import { type FormEvent, startTransition, useState } from 'react';

import { LoaderCircle, Search } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { useGetSearchPlayStoreApp } from '../../_config/scraping.hooks';
import PlayStoreAppCard from './play-store-app-card';

function SearchResult() {
  const [query, setQuery] = useState('');

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const nextQuery = String(formData.get('query') ?? '').trim();

    if (!nextQuery || nextQuery === query) {
      return;
    }

    startTransition(() => {
      setQuery(nextQuery);
    });
  };

  return (
    <div className='space-y-5'>
      <form
        className='border rounded-md p-2 flex items-center justify-between focus-within:ring-2 gap-2'
        onSubmit={handleSearch}
      >
        <Input
          autoComplete='off'
          className='focus-visible:ring-0 border-none'
          defaultValue={query}
          name='query'
          placeholder='Example: whatsapp'
        />
        <Button size='lg' type='submit'>
          Search
        </Button>
      </form>
      <SearchResults query={query} />
    </div>
  );
}

function SearchResults({ query }: { query: string }) {
  const { data, isFetching, isLoading } = useGetSearchPlayStoreApp(query);
  const apps = data?.data ?? [];

  if (!query) {
    return (
      <Alert>
        <Search className='size-4' />
        <AlertTitle>Start a search</AlertTitle>
        <AlertDescription>
          Submit a Play Store keyword to fetch matching apps.
        </AlertDescription>
      </Alert>
    );
  }

  if (isLoading) {
    return (
      <div className='mt-4 bg-gray-100 p-4 border'>
        <h2 className='text-lg font-bold uppercase'>Loading...</h2>
      </div>
    );
  }

  if (!apps.length) {
    return (
      <Alert>
        <Search className='size-4' />
        <AlertTitle>No apps found</AlertTitle>
        <AlertDescription>
          No Play Store apps matched{' '}
          <span className='font-semibold'>{query}</span>.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className='space-y-4'>
      <div className='bg-gray-100 p-4 rounded-md border'>
        <div className='flex items-center justify-between gap-3'>
          <h2 className='text-lg font-bold uppercase'>Result</h2>
          {isFetching ? (
            <p className='flex items-center gap-1 text-xs font-medium text-muted-foreground'>
              <LoaderCircle className='size-3.5 animate-spin' />
              Updating results...
            </p>
          ) : null}
        </div>
      </div>
      <div className='grid gap-4 sm:grid-cols-2'>
        {apps.map((app) => (
          <PlayStoreAppCard key={app.appId} actionLabel='Open app' app={app} />
        ))}
      </div>
    </div>
  );
}

export default SearchResult;
