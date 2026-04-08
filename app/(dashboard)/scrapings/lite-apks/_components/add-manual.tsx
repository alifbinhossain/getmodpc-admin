'use client';

import { type FormEvent } from 'react';

import { ILiteApksApp } from '@/types/scrapping';
import { AlertCircle, Search } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import type { PlayStoreImportDebugData } from '@/app/(dashboard)/scrapings/_config/scraping-import';

import { useLiteApksImport } from '../_config/lite-apks-import.hooks';

type AddManualProps = {
  onImportComplete?: (
    debugData: PlayStoreImportDebugData<ILiteApksApp>
  ) => void;
};

function AddManual({ onImportComplete }: AddManualProps) {
  const { importByUrl, isPending, lastImport } = useLiteApksImport({
    onImportComplete,
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const url = String(formData.get('lite-apks-url') ?? '').trim();

    if (!url || isPending) {
      return;
    }

    const debugData = await importByUrl(url);

    if (debugData?.status === 'success') {
      form.reset();
    }
  };

  return (
    <div className='space-y-5'>
      <form
        className='border rounded-md p-2 flex items-center justify-between focus-within:ring-2 gap-2'
        onSubmit={handleSubmit}
      >
        <Input
          autoComplete='on'
          className='focus-visible:ring-0 border-none'
          name='lite-apks-url'
          placeholder='Example: https://liteapks.com/your-app.html'
        />
        <Button
          disabled={isPending}
          loading={isPending}
          size='lg'
          type='submit'
        >
          Get App
        </Button>
      </form>

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

      {!lastImport?.scrapedApp ? (
        <Alert>
          <Search className='size-4' />
          <AlertTitle>Paste a LiteApks URL</AlertTitle>
          <AlertDescription>
            Submit a full LiteApks app URL to fetch a single record.
          </AlertDescription>
        </Alert>
      ) : null}
    </div>
  );
}

export default AddManual;
