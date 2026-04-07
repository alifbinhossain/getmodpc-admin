'use client';

import { type FormEvent, startTransition, useState } from 'react';

import { LoaderCircle, Search } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Skeleton } from '@/components/ui/skeleton';

import { formatNumber } from '@/lib/utils';

import { useGetSearchPlayStoreApp } from '../../_config/scraping.hooks';
import PlayStoreAppCard from './play-store-app-card';

const SEARCH_PAGE_SIZE = 20;

function SearchResult() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const nextQuery = String(formData.get('query') ?? '').trim();

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
          name='query'
          placeholder='Example: whatsapp'
        />
        <Button size='lg' type='submit'>
          Search
        </Button>
      </form>
      <SearchResults page={page} query={query} setPage={setPage} />
    </div>
  );
}

function SearchResults({
  page,
  query,
  setPage,
}: {
  page: number;
  query: string;
  setPage: (page: number) => void;
}) {
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
  const startItem =
    apps.length > 0 && meta ? (meta.page - 1) * meta.limit + 1 : 0;
  const endItem = apps.length > 0 && meta ? startItem + apps.length - 1 : 0;
  const pageItems = buildPaginationItems(currentPage, totalPages);

  return (
    <div className='space-y-4'>
      <div className='rounded-md border bg-gray-100 p-4'>
        <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <h2 className='text-lg font-bold uppercase'>Result</h2>
            {meta ? (
              <p className='text-xs text-muted-foreground'>
                Showing {formatNumber(startItem)}-{formatNumber(endItem)} of{' '}
                {formatNumber(meta.total)} apps
              </p>
            ) : showLoadingCards ? (
              <p className='text-xs text-muted-foreground'>
                Loading results...
              </p>
            ) : null}
          </div>
          {showLoadingCards ? (
            <p className='flex items-center gap-1 text-xs font-medium text-muted-foreground'>
              <LoaderCircle className='size-3.5 animate-spin' />
              {isLoading ? 'Loading results...' : 'Updating results...'}
            </p>
          ) : null}
        </div>
      </div>
      <div className='grid gap-4 sm:grid-cols-2'>
        {showLoadingCards
          ? Array.from({
              length: meta?.limit ?? SEARCH_PAGE_SIZE,
            }).map((_, index) => <SearchResultCardSkeleton key={index} />)
          : apps.map((app) => (
              <PlayStoreAppCard
                key={app.appId}
                actionLabel='Open app'
                app={app}
              />
            ))}
      </div>
      {meta && totalPages > 1 ? (
        <Pagination className='flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <div className='text-xs text-muted-foreground'>
            Page {formatNumber(currentPage)} of {formatNumber(totalPages)}
          </div>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={
                  currentPage <= 1 ? 'pointer-events-none opacity-50' : ''
                }
                href='#'
                onClick={(event) => {
                  event.preventDefault();

                  if (currentPage > 1 && !isFetching) {
                    setPage(currentPage - 1);
                  }
                }}
              />
            </PaginationItem>
            {pageItems.map((item, index) => (
              <PaginationItem key={`${item}-${index}`}>
                {item === 'ellipsis' ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    href='#'
                    isActive={item === currentPage}
                    onClick={(event) => {
                      event.preventDefault();

                      if (item !== currentPage && !isFetching) {
                        setPage(item);
                      }
                    }}
                  >
                    {item}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                className={
                  currentPage >= totalPages
                    ? 'pointer-events-none opacity-50'
                    : ''
                }
                href='#'
                onClick={(event) => {
                  event.preventDefault();

                  if (currentPage < totalPages && !isFetching) {
                    setPage(currentPage + 1);
                  }
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      ) : null}
    </div>
  );
}

function buildPaginationItems(currentPage: number, totalPages: number) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4, 'ellipsis', totalPages] as const;
  }

  if (currentPage >= totalPages - 2) {
    return [
      1,
      'ellipsis',
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ] as const;
  }

  return [
    1,
    'ellipsis',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    'ellipsis',
    totalPages,
  ] as const;
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
