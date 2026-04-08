'use client';

import { type FormEvent, startTransition, useState } from 'react';

import { IPlayStoreScrapingApp } from '@/types/scrapping';
import { AlertCircle, Search } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';

import ResultsHeader from '../../_components/results-header';
import ResultsPagination from '../../_components/results-pagination';
import type { PlayStoreImportDebugData } from '../../_config/scraping-import';
import { useGetSearchPlayStoreApp } from '../../_config/scraping.hooks';
import { usePlayStoreImport } from '../_config/play-store-import.hooks';
import PlayStoreAppCard from './play-store-app-card';

const SEARCH_PAGE_SIZE = 20;

type SearchResultProps = {
  onImportComplete?: (
    debugData: PlayStoreImportDebugData<IPlayStoreScrapingApp>
  ) => void;
};

function SearchResult({ onImportComplete }: SearchResultProps) {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const nextQuery = String(formData.get('plystore-search') ?? '').trim();

    if (!nextQuery) {
      return;
    }

    startTransition(() => {
      setQuery(nextQuery);
      setPage(1);
    });
  };

  return (
    <div className='space-y-5'>
      <form
        className='border rounded-md p-2 flex items-center justify-between gap-2 focus-within:ring-2'
        onSubmit={handleSearch}
      >
        <Input
          autoComplete='on'
          className='border-none focus-visible:ring-0'
          defaultValue={query}
          name='plystore-search'
          placeholder='Example: whatsapp'
        />
        <Button size='lg' type='submit'>
          Search
        </Button>
      </form>
      <SearchResults
        onImportComplete={onImportComplete}
        page={page}
        query={query}
        setPage={setPage}
      />
    </div>
  );
}

function SearchResults({
  onImportComplete,
  page,
  query,
  setPage,
}: {
  onImportComplete?: (
    debugData: PlayStoreImportDebugData<IPlayStoreScrapingApp>
  ) => void;
  page: number;
  query: string;
  setPage: (page: number) => void;
}) {
  const {
    currentUrl,
    importByUrl,
    isPending: isImportPending,
    lastImport,
  } = usePlayStoreImport({
    onImportComplete,
  });
  const { data, isFetching, isLoading } = useGetSearchPlayStoreApp({
    appName: query,
    limit: SEARCH_PAGE_SIZE,
    page,
  });
  const apps = data?.data ?? [];
  const meta = data?.meta;
  const showLoadingCards = isLoading || isFetching;

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

  if (!showLoadingCards && !apps.length) {
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

  const totalPages = Math.max(meta?.totalPages ?? 1, 1);
  const currentPage = meta?.page ?? page;

  return (
    <div className='space-y-4'>
      <ResultsHeader
        isFetching={isFetching}
        isLoading={isLoading}
        meta={meta}
        resultsCount={apps.length}
        title={<h2 className='text-lg font-bold uppercase'>Result</h2>}
        totalLabel='apps'
      />
      {lastImport?.status === 'validation_error' ? (
        <Alert variant='destructive'>
          <AlertCircle className='size-4' />
          <AlertTitle>Payload validation failed</AlertTitle>
          <AlertDescription>
            The generated app payload did not satisfy the app schema. Open the
            Debugs tab to inspect the validation errors.
          </AlertDescription>
        </Alert>
      ) : null}
      {lastImport?.status === 'error' ? (
        <Alert variant='destructive'>
          <AlertCircle className='size-4' />
          <AlertTitle>Import failed</AlertTitle>
          <AlertDescription>
            {lastImport.errorMessage ?? 'The import flow did not complete.'}
          </AlertDescription>
        </Alert>
      ) : null}
      <div className='grid gap-4 sm:grid-cols-2'>
        {showLoadingCards
          ? Array.from({
              length: meta?.limit ?? SEARCH_PAGE_SIZE,
            }).map((_, index) => <SearchResultCardSkeleton key={index} />)
          : apps.map((app) => (
              <PlayStoreAppCard
                key={app.appId}
                app={app}
                actionDisabled={isImportPending}
                actionLoading={currentUrl === app.url}
                onAction={() => {
                  void importByUrl(app.url);
                }}
              />
            ))}
      </div>
      <ResultsPagination
        currentPage={currentPage}
        isPending={isFetching}
        onPageChange={setPage}
        totalPages={totalPages}
      />
    </div>
  );
}

function SearchResultCardSkeleton() {
  return (
    <div className='flex flex-col justify-between gap-4 rounded-md border bg-background p-4 shadow-xs sm:flex-row sm:items-center'>
      <div className='flex flex-1 gap-3'>
        <Skeleton className='size-14 shrink-0 rounded-md' />
        <div className='flex-1 space-y-2'>
          <Skeleton className='h-4 w-32' />
          <Skeleton className='h-3 w-24' />
          <Skeleton className='h-3 w-full' />
          <Skeleton className='h-3 w-5/6' />
        </div>
      </div>
      <div className='flex items-center justify-between gap-3 sm:flex-col sm:items-end'>
        <Skeleton className='h-3 w-12' />
        <Skeleton className='h-8 w-28' />
      </div>
    </div>
  );
}

export default SearchResult;
