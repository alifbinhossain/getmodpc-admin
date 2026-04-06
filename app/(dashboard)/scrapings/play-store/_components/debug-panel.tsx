'use client';

import Link from 'next/link';

import { AlertCircle, Bug, CheckCircle2, ExternalLink } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

import type { PlayStoreImportDebugData } from '../_config/play-store-import';

type DebugPanelProps = {
  debugData: PlayStoreImportDebugData | null;
};

function DebugPanel({ debugData }: DebugPanelProps) {
  if (!debugData) {
    return (
      <Alert>
        <Bug className='size-4' />
        <AlertTitle>No debug data yet</AlertTitle>
        <AlertDescription>
          Run the manual import flow to populate this tab.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className='space-y-5'>
      <div className='rounded-md border bg-gray-100 p-4'>
        <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <div className='space-y-1'>
            <h2 className='text-lg font-bold uppercase'>Debugs</h2>
            <p className='text-xs text-muted-foreground'>
              Started: {debugData.startedAt}
            </p>
            <p className='text-xs text-muted-foreground'>
              Finished: {debugData.finishedAt}
            </p>
          </div>
          <div className='flex flex-wrap items-center gap-2'>
            <Badge variant={getStatusBadgeVariant(debugData.status)}>
              {debugData.status.replace('_', ' ')}
            </Badge>
            {debugData.resolvedCategory ? (
              <Badge variant='outline'>
                Category: {debugData.resolvedCategory.mode}
              </Badge>
            ) : null}
          </div>
        </div>
      </div>

      <div className='rounded-md border bg-background p-4 space-y-3'>
        <div className='flex items-center gap-2'>
          <ExternalLink className='size-4 text-muted-foreground' />
          <p className='text-sm font-semibold'>Requested URL</p>
        </div>
        <Link
          href={debugData.requestedUrl}
          target='_blank'
          rel='noreferrer'
          className='break-all text-sm text-red-500 underline-offset-4 hover:underline'
        >
          {debugData.requestedUrl}
        </Link>
      </div>

      {debugData.errorMessage ? (
        <Alert variant='destructive'>
          <AlertCircle className='size-4' />
          <AlertTitle>Import Error</AlertTitle>
          <AlertDescription>{debugData.errorMessage}</AlertDescription>
        </Alert>
      ) : null}

      {debugData.createdAppResponse?.data ? (
        <Alert>
          <CheckCircle2 className='size-4' />
          <AlertTitle>Created App Record</AlertTitle>
          <AlertDescription>
            <span className='mr-2'>
              Created app ID: {debugData.createdAppResponse.data.id}
            </span>
            <Link
              href={`/apps/${debugData.createdAppResponse.data.id}`}
              className='font-semibold text-red-500 underline-offset-4 hover:underline'
            >
              Open app details
            </Link>
          </AlertDescription>
        </Alert>
      ) : null}

      <DebugJsonCard
        title='Generated Category Payload'
        value={debugData.generatedCategoryPayload}
      />
      <DebugJsonCard
        title='Resolved Category'
        value={debugData.resolvedCategory}
      />
      <DebugJsonCard
        title='Generated App Payload'
        value={debugData.generatedAppPayload}
      />
      <DebugJsonCard
        title='Validation Errors'
        value={debugData.validationErrors}
      />
      <DebugJsonCard title='Form Errors' value={debugData.formErrors} />
      <DebugJsonCard
        title='Scraped Response'
        value={debugData.scrapedResponse}
      />
      <DebugJsonCard
        title='Created App Response'
        value={debugData.createdAppResponse}
      />
    </div>
  );
}

function DebugJsonCard({ title, value }: { title: string; value: unknown }) {
  return (
    <div className='space-y-2 rounded-md border bg-background p-4'>
      <h3 className='text-sm font-semibold uppercase text-muted-foreground'>
        {title}
      </h3>
      <pre className='max-h-96 overflow-auto rounded-md bg-muted p-4 text-xs leading-5 whitespace-pre-wrap break-all'>
        {formatDebugValue(value)}
      </pre>
    </div>
  );
}

function formatDebugValue(value: unknown) {
  if (value === undefined) {
    return 'Not available';
  }

  return JSON.stringify(value, null, 2);
}

function getStatusBadgeVariant(status: PlayStoreImportDebugData['status']) {
  switch (status) {
    case 'success':
      return 'default';
    case 'validation_error':
      return 'outline';
    case 'error':
      return 'destructive';
    default:
      return 'secondary';
  }
}

export default DebugPanel;
