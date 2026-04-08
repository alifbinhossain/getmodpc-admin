'use client';

import { useState } from 'react';

import Image from 'next/image';

import { EnumAppType } from '@/types/app';
import { ILiteApksApp } from '@/types/scrapping';
import { AlertCircle, Gamepad2, Smartphone, Star } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

import type { PlayStoreImportDebugData } from '@/app/(dashboard)/scrapings/_config/scraping-import';

import ResultsHeader from '../../_components/results-header';
import ResultsPagination from '../../_components/results-pagination';
import { useGetLiteApksAppByType } from '../../_config/scraping.hooks';
import { useLiteApksImport } from '../_config/lite-apks-import.hooks';

const LATEST_PAGE_SIZE = 18;

type LatestByTypeProps = {
  description: string;
  onImportComplete?: (
    debugData: PlayStoreImportDebugData<ILiteApksApp>
  ) => void;
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
  const HeaderIcon = type === EnumAppType.GAME ? Gamepad2 : Smartphone;

  return (
    <div className='space-y-4'>
      <ResultsHeader
        description={
          <p className='text-xs text-muted-foreground'>{description}</p>
        }
        isFetching={isFetching}
        isLoading={isLoading}
        meta={meta}
        resultsCount={apps.length}
        title={
          <h2 className='flex items-center gap-2 text-lg font-bold uppercase'>
            <HeaderIcon className='size-4' />
            <span>{title}</span>
          </h2>
        }
        totalLabel='listings'
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

      <ResultsPagination
        currentPage={currentPage}
        isPending={isFetching}
        onPageChange={setPage}
        totalPages={totalPages}
      />
    </div>
  );
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
