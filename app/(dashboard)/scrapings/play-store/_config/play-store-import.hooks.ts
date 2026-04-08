'use client';

import { useState } from 'react';

import { IPlayStoreScrapingApp } from '@/types/scrapping';

import { useCreateScrapingApp } from '@/app/(dashboard)/apps/_config/app.hooks';
import { categoriesService } from '@/app/(dashboard)/categories/_config/categories.service';
import { useCreateCategory } from '@/app/(dashboard)/categories/_config/category.hooks';

import {
  buildCategoryPayload,
  buildPlayStoreAppPayload,
  categoryMatchesName,
  normalizeValidationErrors,
  type PlayStoreImportDebugData,
  validatePlayStoreAppPayload,
} from '../../_config/scraping-import';
import { useGetPlayStoreAppByUrl } from '../../_config/scraping.hooks';

type UsePlayStoreImportOptions = {
  onImportComplete?: (
    debugData: PlayStoreImportDebugData<IPlayStoreScrapingApp>
  ) => void;
};

export function usePlayStoreImport({
  onImportComplete,
}: UsePlayStoreImportOptions = {}) {
  const [lastImport, setLastImport] =
    useState<PlayStoreImportDebugData<IPlayStoreScrapingApp> | null>(null);
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);

  const scrapeApp = useGetPlayStoreAppByUrl();
  const createCategory = useCreateCategory();
  const createApp = useCreateScrapingApp();

  const isPending =
    Boolean(currentUrl) ||
    scrapeApp.isPending ||
    createCategory.isPending ||
    createApp.isPending;

  const importByUrl = async (url: string) => {
    const normalizedUrl = url.trim();

    if (!normalizedUrl || isPending) {
      return null;
    }

    const startedAt = new Date().toISOString();
    const debugData: PlayStoreImportDebugData<IPlayStoreScrapingApp> = {
      requestedUrl: normalizedUrl,
      startedAt,
      finishedAt: startedAt,
      status: 'idle',
    };

    setCurrentUrl(normalizedUrl);

    try {
      const scrapedResponse = await scrapeApp.mutateAsync({
        url: normalizedUrl,
      });
      const scrapedApp = scrapedResponse.data;
      debugData.scrapedResponse = scrapedResponse;
      debugData.scrapedApp = scrapedApp;

      const generatedCategoryPayload = buildCategoryPayload(scrapedApp);
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
        return debugData;
      }

      const createdAppResponse = await createApp.mutateAsync(
        validationResult.data
      );
      debugData.createdAppResponse = createdAppResponse;
      debugData.status = 'success';
    } catch (error) {
      debugData.status = 'error';
      debugData.errorMessage =
        error instanceof Error ? error.message : 'Failed to import app.';
    } finally {
      debugData.finishedAt = new Date().toISOString();
      setCurrentUrl(null);
      setLastImport(debugData);
      onImportComplete?.(debugData);
    }

    return debugData;
  };

  return {
    currentUrl,
    importByUrl,
    isPending,
    lastImport,
  };
}
