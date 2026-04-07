'use client';

import Link from 'next/link';

import { Bug } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import type { PlayStoreImportDebugData } from '../_config/play-store-import';

type DebugPanelProps = {
  debugData: PlayStoreImportDebugData | null;
};

type DebugDetails = {
  id: string;
  packageId: string;
  appName: string;
  osVersion: string;
  category: string;
  developer: string;
  latestUpdated: string;
  rated: string;
  voted: string;
  summary: string;
  latestNews: string;
  content: string;
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

  const details = getDebugDetails(debugData);

  if (!details) {
    return (
      <Alert>
        <Bug className='size-4' />
        <AlertTitle>No app details available</AlertTitle>
        <AlertDescription>
          The import flow did not return app detail fields for this debug
          snapshot.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className='space-y-5'>
      <div className='rounded-md border bg-gray-100 p-4'>
        <h2 className='text-lg font-bold uppercase'>App Details</h2>
      </div>

      <div className='grid gap-4 rounded-md border bg-gray-100 p-4 md:grid-cols-2 xl:grid-cols-3'>
        <DebugInputField
          id='package_id'
          label='Package ID'
          value={details.packageId}
        />
        <DebugInputField
          id='app_name'
          label='App Name'
          value={details.appName}
        />
        <DebugInputField
          id='os_version'
          label='OS Version'
          value={details.osVersion}
        />
        <DebugInputField
          id='category'
          label='Category'
          value={details.category}
        />
        <DebugInputField
          id='developer'
          label='Developer'
          value={details.developer}
        />
        <DebugInputField
          id='latest_updated'
          label='Latest Updated'
          value={details.latestUpdated}
        />
        <DebugInputField id='rated' label='Rated' value={details.rated} />
        <DebugInputField id='voted' label='Voted' value={details.voted} />
      </div>

      <div className='grid gap-4 md:grid-cols-2'>
        <DebugTextareaField
          id='summary'
          label='Summary'
          value={details.summary}
          rows={6}
        />
        <DebugTextareaField
          id='latest_news'
          label='Latest News'
          value={details.latestNews}
          rows={6}
        />
      </div>

      <DebugTextareaField
        id='content'
        label='Content'
        value={details.content}
        rows={14}
      />
      <div className='flex justify-end gap-2 items-center'>
        <Link
          className='bg-primary text-white rounded py-3 w-30 flex justify-center items-center'
          href={`/apps/${details.id}`}
          target='_blank'
        >
          View
        </Link>
        <Link
          className='bg-destructive text-white rounded py-3 w-30 flex justify-center items-center'
          href={`/apps/${details.id}`}
        >
          Edit
        </Link>
      </div>
    </div>
  );
}

function DebugInputField({
  id,
  label,
  value,
}: {
  id: string;
  label: string;
  value: string;
}) {
  return (
    <div className='space-y-2'>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        value={value}
        placeholder='Not available'
        disabled
        readOnly
        className='bg-background text-foreground disabled:cursor-default disabled:opacity-100'
      />
    </div>
  );
}

function DebugTextareaField({
  id,
  label,
  value,
  rows,
}: {
  id: string;
  label: string;
  value: string;
  rows: number;
}) {
  return (
    <div className='space-y-2 rounded-md border bg-gray-100 p-4'>
      <Label htmlFor={id}>{label}</Label>
      <Textarea
        id={id}
        value={value}
        placeholder='Not available'
        disabled
        readOnly
        rows={rows}
        className='bg-background text-foreground disabled:cursor-default disabled:opacity-100'
      />
    </div>
  );
}

function getDebugDetails(
  debugData: PlayStoreImportDebugData
): DebugDetails | null {
  const payload = debugData.generatedAppPayload;
  const scrapedApp = debugData.scrapedApp;
  const category =
    firstNonEmpty(
      debugData.resolvedCategory?.record.name,
      debugData.generatedCategoryPayload?.name,
      payload?.genre,
      scrapedApp?.genre,
      scrapedApp?.categories.find((item) => item.name.trim())?.name
    ) ?? '';

  const details: DebugDetails = {
    id: debugData.createdAppResponse?.data.id ?? '',
    packageId: firstNonEmpty(payload?.package_name, scrapedApp?.appId) ?? '',
    appName:
      firstNonEmpty(payload?.name, payload?.title, scrapedApp?.title) ?? '',
    osVersion:
      firstNonEmpty(
        payload?.os_version,
        scrapedApp?.androidVersion,
        scrapedApp?.androidVersionText
      ) ?? '',
    category,
    developer: firstNonEmpty(payload?.developer, scrapedApp?.developer) ?? '',
    latestUpdated:
      firstNonEmpty(
        payload?.updated,
        scrapedApp?.updated_text,
        scrapedApp?.released
      ) ?? '',
    rated:
      firstNonEmpty(
        payload?.score_text,
        scrapedApp?.scoreText,
        toDisplayNumber(scrapedApp?.score)
      ) ?? '',
    voted:
      firstNonEmpty(
        toDisplayNumber(payload?.ratings),
        toDisplayNumber(scrapedApp?.ratings)
      ) ?? '',
    summary: firstNonEmpty(payload?.summary, scrapedApp?.summary) ?? '',
    latestNews:
      firstNonEmpty(payload?.latest_news, scrapedApp?.recentChanges) ?? '',
    content:
      firstNonEmpty(
        payload?.description,
        scrapedApp?.descriptionHTML,
        scrapedApp?.description
      ) ?? '',
  };

  return Object.values(details).some(Boolean) ? details : null;
}

function firstNonEmpty(...values: Array<string | null | undefined>) {
  return values.find((value) => value?.trim());
}

function toDisplayNumber(value?: number | null) {
  return typeof value === 'number' && !Number.isNaN(value) ? String(value) : '';
}

export default DebugPanel;
