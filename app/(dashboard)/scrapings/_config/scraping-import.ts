import {
  type ApiResponse,
  EnumAppCommentStatus,
  EnumPlatformType,
} from '@/types';
import type { AppRecord, CreateAppPayload } from '@/types/app';
import { EnumAppSource, EnumAppStatus, EnumAppType } from '@/types/app';
import type { CategoryRecord, CreateCategoryPayload } from '@/types/category';
import type {
  Category,
  ILiteApksApp,
  IPlayStoreScrapingApp,
} from '@/types/scrapping';

import { appSchema } from '@/lib/schemas/app-schema';
import { slugify } from '@/lib/utils';

export type PlayStoreImportStatus =
  | 'idle'
  | 'success'
  | 'validation_error'
  | 'error';

export type PlayStoreResolvedCategory = {
  mode: 'created' | 'existing';
  record: CategoryRecord;
};

export type PlayStoreImportDebugData<T> = {
  requestedUrl: string;
  startedAt: string;
  finishedAt: string;
  status: PlayStoreImportStatus;
  errorMessage?: string;
  scrapedResponse?: ApiResponse<T>;
  scrapedApp?: T;
  generatedCategoryPayload?: CreateCategoryPayload;
  resolvedCategory?: PlayStoreResolvedCategory;
  generatedAppPayload?: CreateAppPayload;
  createdAppResponse?: ApiResponse<AppRecord>;
  validationErrors?: Record<string, string[]>;
  formErrors?: string[];
};

export function getScrapingCategoryName(app: {
  genre: string;
  categories: Category[];
}): string {
  const genre = app.genre?.trim();
  if (genre) {
    return genre;
  }

  const fallbackCategory = app.categories.find((category) =>
    category.name.trim()
  );
  if (fallbackCategory) {
    return fallbackCategory.name.trim();
  }

  throw new Error('The scraped app did not include a usable genre/category.');
}

export function buildCategoryPayload<T>(app: {
  genre: string;
  categories: Category[];
}): CreateCategoryPayload {
  const categoryName = getScrapingCategoryName(app);
  return {
    name: categoryName,
  };
}

export function buildPlayStoreAppPayload(
  app: IPlayStoreScrapingApp,
  categoryIds: string[],
  options: {
    source?: EnumAppSource;
    type?: EnumAppType;
  } = {}
): CreateAppPayload {
  const categoryName = getScrapingCategoryName(app);
  const developerNames = uniqueStrings([app.developer, app.developerLegalName]);
  const appTags = uniqueStrings([app.title]);

  return {
    name: app.title.trim(),
    title: asOptionalString(app.title) ?? app.title.trim(),
    platform: EnumPlatformType.ANDROID,
    type: options.type ?? inferAppType(app),
    source: options.source ?? EnumAppSource.PLAY_STORE,
    description: app.descriptionHTML ?? app.description,
    summary: asOptionalString(app.summary),
    latest_news: asOptionalString(app.recentChanges),
    header_image: asOptionalString(app.headerImage),
    icon: asOptionalString(app.icon),
    genre: categoryName,
    os_version:
      asOptionalString(app.androidVersion) ??
      asOptionalString(app.androidVersionText) ??
      'Android',
    screenshots: uniqueStrings(app.screenshots),
    developer: app.developer.trim(),
    app_tags: appTags,
    app_developers: developerNames,
    version: asOptionalString(app.version),
    latest_version: null,
    show_in_slider: false,
    updated: resolveUpdatedDate({
      updated: app.updated,
      updated_text: app.updated_text,
      released: app.released,
    }),
    status: EnumAppStatus.DRAFT,
    comment_status: EnumAppCommentStatus.OPEN,
    categories: categoryIds,
    url: app.url,
    package_name: app.appId,
    installs: app.installs,
    score_text: app.scoreText || String(app.score),
    ratings: toOptionalInt(app.ratings),
    reviews: toOptionalInt(app.reviews),
    size: asOptionalString(app.size),
    is_verified: false,
  };
}

export function buildLiteApksAppPayload(
  app: ILiteApksApp,
  categoryIds: string[],
  options: {
    source?: EnumAppSource;
    type?: EnumAppType;
  } = {}
): CreateAppPayload {
  const categoryName = getScrapingCategoryName({
    categories: app.categories,
    genre: app.genre ?? '',
  });
  const developerNames = uniqueStrings([app.developer]);
  const appTags = uniqueStrings([app.title]);

  return {
    name: app?.title?.trim() ?? '',
    title: asOptionalString(app.title) ?? app?.title?.trim(),
    platform: EnumPlatformType.ANDROID,
    type: options.type ?? inferAppType(app),
    source: options.source ?? EnumAppSource.PLAY_STORE,
    description: app.description,
    summary: asOptionalString(app.summary),
    latest_news: asOptionalString(app.recentChanges),
    header_image: asOptionalString(app.headerImage),
    icon: asOptionalString(app.icon),
    genre: categoryName,
    os_version: null,
    screenshots: uniqueStrings(app.screenshots),
    developer: app?.developer?.trim(),
    app_tags: appTags,
    app_developers: developerNames,
    version: asOptionalString(app.version),
    latest_version: null,
    show_in_slider: false,
    updated: resolveUpdatedDate({
      updated_text: app.updated_text!,
    }),
    status: EnumAppStatus.DRAFT,
    comment_status: EnumAppCommentStatus.OPEN,
    categories: categoryIds,
    url: app.url,
    installs: app.installs!,
    score_text: app.scoreText!,
    ratings: toOptionalInt(app.ratings),
    reviews: toOptionalInt(app.reviews),
    size: asOptionalString(app.size),
    is_verified: false,
    short_mode: asOptionalString(app.shortMode),
  };
}

export function validatePlayStoreAppPayload(payload: CreateAppPayload) {
  return appSchema.safeParse(payload);
}

export function normalizeValidationErrors(
  fieldErrors: Record<string, string[] | undefined>
): Record<string, string[]> {
  return Object.fromEntries(
    Object.entries(fieldErrors).filter(([, value]) => Array.isArray(value))
  ) as Record<string, string[]>;
}

export function categoryMatchesName(
  category: Pick<CategoryRecord, 'name' | 'slug'>,
  name: string
) {
  const normalizedName = slugify(name);
  return (
    slugify(category.name) === normalizedName ||
    slugify(category.slug) === normalizedName
  );
}

function inferAppType(app: { url: string; type?: EnumAppType }): EnumAppType {
  const url = app.url?.toLowerCase() ?? '';

  if (
    url.includes('/store/games') ||
    (app.type && app.type === EnumAppType.GAME)
  ) {
    return EnumAppType.GAME;
  }

  return EnumAppType.APP;
}

function resolveUpdatedDate(app: {
  updated?: number;
  updated_text?: string;
  released?: string;
}) {
  const candidates = [app.updated, app.updated_text, app.released];

  for (const value of candidates) {
    const normalized = formatDateInput(value);
    if (normalized) {
      return normalized;
    }
  }

  return undefined;
}

function formatDateInput(value: number | string | undefined) {
  if (!value) {
    return undefined;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return undefined;
  }

  return date.toISOString().slice(0, 10);
}

function asOptionalString(value?: string | null) {
  const normalized = value?.trim();
  return normalized ? normalized : undefined;
}

function uniqueStrings(values: Array<string | undefined | null>) {
  const normalized = values
    .map((value) => value?.trim())
    .filter((value): value is string => Boolean(value));

  return normalized.length ? [...new Set(normalized)] : undefined;
}

function toOptionalInt(value?: number | null) {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return undefined;
  }

  return Math.trunc(value);
}
