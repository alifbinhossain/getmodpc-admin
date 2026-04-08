'use client';

import { useState } from 'react';

import Image from 'next/image';

import { EnumAppType } from '@/types/app';
import {
  AlertCircle,
  Gamepad2,
  LoaderCircle,
  Smartphone,
  Star,
} from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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

import type { PlayStoreImportDebugData } from '@/app/(dashboard)/scrapings/play-store/_config/play-store-import';

import { useGetLiteApksAppByType } from '../../_config/scraping.hooks';
import { useLiteApksImport } from '../_config/lite-apks-import.hooks';

const LATEST_PAGE_SIZE = 18;

type LatestByTypeProps = {
  description: string;
  onImportComplete?: (debugData: PlayStoreImportDebugData) => void;
  title: string;
  type: EnumAppType;
};

function LatestByType({
  description,
  onImportComplete,
  title,
  type,
}: LatestByTypeProps) {
  const [page, setPage] = useState(1);
  const {
    currentUrl,
    importByUrl,
    isPending: isImportPending,
    lastImport,
  } = useLiteApksImport({
    defaultAppType: type,
    onImportComplete,
  });
  const { data, isFetching, isLoading } = useGetLiteApksAppByType({
    page,
    type,
  });

  const apps = data?.data ?? [];
  const meta = data?.meta;
  const showLoadingCards = isLoading || isFetching;
  const totalPages = Math.max(meta?.totalPages ?? 1, 1);
  const currentPage = meta?.page ?? page;
  const startItem =
    apps.length > 0 && meta ? (meta.page - 1) * meta.limit + 1 : 0;
  const endItem = apps.length > 0 && meta ? startItem + apps.length - 1 : 0;
  const pageItems = buildPaginationItems(currentPage, totalPages);
  const HeaderIcon = type === EnumAppType.GAME ? Gamepad2 : Smartphone;

  return (
    <div className='space-y-4'>
      <div className='rounded-md border bg-gray-100 p-4'>
        <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <h2 className='flex items-center gap-2 text-lg font-bold uppercase'>
              <HeaderIcon className='size-4' />
              <span>{title}</span>
            </h2>
            <p className='text-xs text-muted-foreground'>{description}</p>
            {meta ? (
              <p className='text-xs text-muted-foreground'>
                Showing {formatNumber(startItem)}-{formatNumber(endItem)} of{' '}
                {formatNumber(meta.total)} listings
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

      {!showLoadingCards && !apps.length ? (
        <Alert>
          <HeaderIcon className='size-4' />
          <AlertTitle>No apps found</AlertTitle>
          <AlertDescription>
            No LiteApks records are available for this tab right now.
          </AlertDescription>
        </Alert>
      ) : null}

      <div className='grid gap-4 sm:grid-cols-2'>
        {showLoadingCards
          ? Array.from({
              length: meta?.limit ?? LATEST_PAGE_SIZE,
            }).map((_, index) => <LatestCardSkeleton key={index} />)
          : apps.map((app) => (
              <LiteApksAppCard
                key={app.link}
                app={app}
                actionDisabled={isImportPending}
                actionLoading={currentUrl === app.link}
                onAction={() => {
                  void importByUrl(app.link, { type });
                }}
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

function LiteApksAppCard({
  actionDisabled = false,
  actionLoading = false,
  app,
  onAction,
}: {
  actionDisabled?: boolean;
  actionLoading?: boolean;
  app: {
    icon: string;
    link: string;
    scoreText: string;
    shortMode: string;
    title: string;
  };
  onAction?: () => void;
}) {
  return (
    <article className='flex flex-col justify-between gap-4 rounded-md border bg-background p-4 shadow-xs sm:flex-row sm:items-center'>
      <div className='flex flex-1 gap-3'>
        <div className='relative size-16 shrink-0 overflow-hidden rounded-md border bg-muted'>
          <Image
            src={app.icon}
            alt={app.title}
            className='object-cover'
            fill
            sizes='64px'
          />
        </div>
        <div className='space-y-2'>
          <div>
            <p className='font-semibold text-foreground'>{app.title}</p>
            <p className='text-sm text-muted-foreground'>Source: LiteApks</p>
          </div>
          {app.shortMode ? (
            <Badge variant='outline'>{app.shortMode}</Badge>
          ) : null}
        </div>
      </div>
      <div className='flex items-center justify-between gap-3 sm:flex-col sm:items-end'>
        <p className='flex items-center gap-1 text-xs text-muted-foreground'>
          <Star className='size-3.5 text-yellow-500' />
          <span>{app.scoreText}</span>
        </p>
        <Button
          type='button'
          size='sm'
          disabled={!onAction || actionDisabled || actionLoading}
          loading={actionLoading}
          onClick={onAction}
        >
          Import
        </Button>
      </div>
    </article>
  );
}

function LatestCardSkeleton() {
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

export default LatestByType;
