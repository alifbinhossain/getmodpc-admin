import { PaginatedResponse } from '@/types';
import { AppRecord, UpdateAppPayload } from '@/types/app';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// =============================================================================
// TAILWIND / CLASS UTILITIES
// =============================================================================

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// =============================================================================
// STRING UTILITIES
// =============================================================================

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return `${str.slice(0, maxLength)}...`;
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

// =============================================================================
// DATE UTILITIES
// =============================================================================

export function formatDate(
  dateString: string,
  options?: Intl.DateTimeFormatOptions
): string {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options,
  };
  return new Date(dateString).toLocaleDateString('en-US', defaultOptions);
}

export function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function timeAgo(dateString: string): string {
  const now = new Date();
  const past = new Date(dateString);
  const diffMs = now.getTime() - past.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(dateString);
}

// =============================================================================
// NUMBER UTILITIES
// =============================================================================

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatCompact(num: number): string {
  return new Intl.NumberFormat('en-US', { notation: 'compact' }).format(num);
}

// =============================================================================
// FILE SIZE UTILITIES
// =============================================================================

/**
 * Convert bytes to human readable file size (B, KB, MB, GB, TB)
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';

  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
}

/**
 * Convert bytes to megabytes
 */
export function bytesToMB(bytes: number): number {
  return bytes / (1024 * 1024);
}

/**
 * Format bytes to MB with unit
 */
export function formatBytesToMB(bytes: number): string {
  return `${bytesToMB(bytes).toFixed(2)} MB`;
}

/**
 * Format bytes to GB with unit
 */
export function formatBytesToGB(bytes: number): string {
  return `${bytesToGB(bytes).toFixed(2)} GB`;
}

/**
 * Convert bytes to gigabytes
 */
export function bytesToGB(bytes: number): number {
  return bytes / (1024 * 1024 * 1024);
}

// =============================================================================
// OBJECT UTILITIES
// =============================================================================

/** Remove undefined/null values from an object */
export function cleanObject<T extends Record<string, unknown>>(
  obj: T
): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([, value]) => value !== undefined && value !== null
    )
  ) as Partial<T>;
}

/** Pick specific keys from an object */
export function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  return keys.reduce(
    (acc, key) => {
      if (key in obj) acc[key] = obj[key];
      return acc;
    },
    {} as Pick<T, K>
  );
}

// =============================================================================
// URL UTILITIES
// =============================================================================

export function buildQueryString(params: Record<string, unknown>): string {
  const clean = cleanObject(params as Record<string, unknown>);
  return new URLSearchParams(
    Object.entries(clean).reduce(
      (acc, [k, v]) => {
        acc[k] = String(v);
        return acc;
      },
      {} as Record<string, string>
    )
  ).toString();
}

// =============================================================================
// COOKIE UTILITIES (CLIENT SIDE)
// =============================================================================

export const TOKEN_COOKIE_NAME =
  process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME ?? 'accessToken';

export function getTokenFromCookie(): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(
    new RegExp(`(^| )${TOKEN_COOKIE_NAME}=([^;]+)`)
  );
  return match ? (match[2] ?? null) : null;
}

export function setTokenCookie(token: string, days = 7): void {
  if (typeof document === 'undefined') return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${TOKEN_COOKIE_NAME}=${token}; expires=${expires}; path=/; SameSite=Strict; Secure`;
}

export function removeTokenCookie(): void {
  if (typeof document === 'undefined') return;
  document.cookie = `${TOKEN_COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}

export function generateMonthsFromStart(start?: string) {
  const now = new Date();

  // fallback → current month if no start provided
  const [startYear, startMonth] = start
    ? start.split('-').map(Number)
    : [now.getFullYear(), now.getMonth() + 1];

  const startDate = new Date(startYear, startMonth - 1);

  const months: { label: string; value: string | undefined }[] = [
    { label: 'All Dates', value: undefined },
  ];

  const current = new Date(startDate);

  while (current <= now) {
    months.push({
      label: current.toLocaleString('default', {
        month: 'long',
        year: 'numeric',
      }),
      value: `${current.getFullYear()}-${String(
        current.getMonth() + 1
      ).padStart(2, '0')}`,
    });

    // move to next month
    current.setMonth(current.getMonth() + 1);
  }

  return months;
}

export function formatToDatetimeLocal(date: string | Date) {
  const d = new Date(date);

  const pad = (n: number) => n.toString().padStart(2, '0');

  const year = d.getFullYear();
  const month = pad(d.getMonth() + 1);
  const day = pad(d.getDate());
  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

// generate edit form app data//

export function getAppFormDefaults(data?: AppRecord): UpdateAppPayload {
  return {
    id: data?.id ?? '',
    name: data?.name ?? '',
    source: data?.source ?? undefined,
    description: data?.description ?? '',
    summary: data?.summary ?? '',
    header_image: data?.header_image ?? '',
    icon: data?.icon ?? '',
    platform: data?.platform ?? undefined,
    type: data?.type ?? undefined,
    os_version: data?.os_version ?? '',
    version: data?.version ?? '',
    latest_version: data?.latest_version ?? '',
    url: data?.url ?? '',
    package_name: data?.package_name ?? '',
    installs: data?.installs ?? '',
    score_text: data?.score_text ?? '',
    status: data?.status,
    comment_status: data?.comment_status,
    show_in_slider: data?.show_in_slider ?? false,
    is_verified: data?.is_verified ?? false,
    categories: data?.categories?.map((c) => c.id) ?? [],
    app_tags: data?.app_tags ?? [],
    app_developers: data?.app_developers ?? [],
    developer: data?.developer ?? '',
    tags: data?.tags?.map((t) => t.id) ?? [],
    latest_news: data?.latest_news ?? '',
    genre: data?.genre ?? '',
    youtube_id: data?.youtube_id ?? '',
    screenshots: data?.screenshots ?? [],
    updated: data?.updated ?? '',
    links:
      data?.links?.map((link) => ({
        name: link.name,
        link: link.link,
        type: link.type ?? undefined,
        size: link.size ?? undefined,
        note: link.note ?? undefined,
      })) ?? [],
    reviews: data?.reviews ?? 0,
    size: data?.size ?? '',
    ratings: data?.ratings ?? 0,
    modders: data?.modders ?? [],
    short_mode: data?.short_mode ?? '',
    title: data?.title ?? '',
  };
}

export function fallBackData<T>() {
  return {
    data: [] as T[],
    meta: {
      total: 0,
      page: 0,
      limit: 0,
      totalPages: 0,
      hasNextPage: false,
      hasPreviousPage: false,
    },
    success: false,
    statusCode: 200,
    message: '',
  } satisfies PaginatedResponse<T>;
}
