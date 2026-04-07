'use client';

import { type FormEvent, useState } from 'react';

import { AlertCircle, Search } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { useCreateScrapingApp } from '@/app/(dashboard)/apps/_config/app.hooks';
import { categoriesService } from '@/app/(dashboard)/categories/_config/categories.service';
import { useCreateCategory } from '@/app/(dashboard)/categories/_config/category.hooks';
import {
  buildPlayStoreAppPayload,
  buildPlayStoreCategoryPayload,
  categoryMatchesName,
  normalizeValidationErrors,
  type PlayStoreImportDebugData,
  validatePlayStoreAppPayload,
} from '@/app/(dashboard)/scrapings/play-store/_config/play-store-import';

import { useGetPlayStoreAppByUrl } from '../../_config/scraping.hooks';

type AddManualProps = {
  onImportComplete?: (debugData: PlayStoreImportDebugData) => void;
};

function AddManual({ onImportComplete }: AddManualProps) {
  const [lastImport, setLastImport] = useState<PlayStoreImportDebugData | null>(
    null
  );
  const scrapeApp = useGetPlayStoreAppByUrl();
  const createCategory = useCreateCategory();
  const createApp = useCreateScrapingApp();
  const isPending =
    scrapeApp.isPending || createCategory.isPending || createApp.isPending;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const url = String(formData.get('url') ?? '').trim();

    if (!url || isPending) {
      return;
    }

    const debugData: PlayStoreImportDebugData = {
      requestedUrl: url,
      startedAt: new Date().toISOString(),
      finishedAt: new Date().toISOString(),
      status: 'idle',
    };

    try {
      const scrapedResponse = await scrapeApp.mutateAsync({ url });
      const scrapedApp = scrapedResponse.data;
      debugData.scrapedResponse = scrapedResponse;
      debugData.scrapedApp = scrapedApp;

      const generatedCategoryPayload =
        buildPlayStoreCategoryPayload(scrapedApp);
      debugData.generatedCategoryPayload = generatedCategoryPayload;

      const existingCategories = await categoriesService.getCategories({
        limit: 50,
        searchTerm: generatedCategoryPayload.name,
      });
      const matchedCategory = existingCategories.data.find((category) =>
        categoryMatchesName(category, generatedCategoryPayload.name)
      );

      if (matchedCategory) {
        debugData.resolvedCategory = {
          mode: 'existing',
          record: matchedCategory,
        };
      } else {
        const createdCategoryResponse = await createCategory.mutateAsync(
          generatedCategoryPayload
        );
        debugData.resolvedCategory = {
          mode: 'created',
          record: createdCategoryResponse.data,
        };
      }

      const generatedAppPayload = buildPlayStoreAppPayload(scrapedApp, [
        debugData.resolvedCategory.record.id,
      ]);
      debugData.generatedAppPayload = generatedAppPayload;

      const validationResult = validatePlayStoreAppPayload(generatedAppPayload);

      if (!validationResult.success) {
        const flattenedErrors = validationResult.error.flatten();
        debugData.status = 'validation_error';
        debugData.validationErrors = normalizeValidationErrors(
          flattenedErrors.fieldErrors
        );
        debugData.formErrors = flattenedErrors.formErrors;
        return;
      }

      const createdAppResponse = await createApp.mutateAsync(
        validationResult.data
      );
      debugData.createdAppResponse = createdAppResponse;
      debugData.status = 'success';
      form.reset();
    } catch (error) {
      debugData.status = 'error';
      debugData.errorMessage =
        error instanceof Error ? error.message : 'Failed to import app.';
    } finally {
      debugData.finishedAt = new Date().toISOString();
      setLastImport(debugData);
      onImportComplete?.(debugData);
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
          name='url'
          placeholder='Example: https://play.google.com/store/apps/details?id=com.example.app'
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

      {!lastImport?.scrapedApp && (
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
