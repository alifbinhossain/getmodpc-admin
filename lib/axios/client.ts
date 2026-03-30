import type { ApiError } from '@/types';
import axios, {
  type AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';

import { getTokenFromCookie, removeTokenCookie } from '@/lib/utils';

// =============================================================================
// AXIOS INSTANCE
// =============================================================================

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000/api/v1';
const API_TIMEOUT = Number(process.env.NEXT_PUBLIC_API_TIMEOUT ?? 30000);

const token =
  getTokenFromCookie() ??
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0NDQxYmNlZS0xZDYyLTRlZTQtODVlNC01YjA3MTE4OTJiYzUiLCJpYXQiOjE3NzM5NTE1MDgsImV4cCI6MTc3NjU0MzUwOH0.YquhqkaarOgITLKKsp6AXrvT9tMRwVOH0e-WqtCqfR4';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

// =============================================================================
// REQUEST INTERCEPTOR — Attach auth token
// =============================================================================

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getTokenFromCookie();

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add request timestamp for debugging
    config.metadata = { startTime: Date.now() };

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// =============================================================================
// RESPONSE INTERCEPTOR — Normalize errors, handle 401
// =============================================================================

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log response time in development
    if (process.env.NODE_ENV === 'development' && response.config.metadata) {
      const duration =
        Date.now() - (response.config.metadata.startTime as number);
      console.warn(
        `[API] ${response.config.method?.toUpperCase()} ${response.config.url} — ${duration}ms`
      );
    }
    return response;
  },
  async (error: AxiosError<ApiError>) => {
    const { response, config } = error;

    // Handle 401 Unauthorized — clear auth and redirect to sign-in
    if (response?.status === 401) {
      removeTokenCookie();

      if (typeof window !== 'undefined') {
        window.location.href = '/sign-in';
      }
      return Promise.reject(new Error('Unauthorized. Please sign in again.'));
    }

    // Handle 403 Forbidden
    if (response?.status === 403) {
      return Promise.reject(
        new Error('You do not have permission to perform this action.')
      );
    }

    // Handle 404 Not Found
    if (response?.status === 404) {
      return Promise.reject(new Error('The requested resource was not found.'));
    }

    // Handle 422 Validation Errors
    if (response?.status === 422) {
      const validationErrors = response.data?.errors;
      const errorMessage = validationErrors
        ? Object.values(validationErrors).flat().join(', ')
        : (response.data?.message ?? 'Validation failed.');
      return Promise.reject(new Error(errorMessage));
    }

    // Handle 429 Rate Limiting
    if (response?.status === 429) {
      return Promise.reject(
        new Error('Too many requests. Please wait a moment and try again.')
      );
    }

    // Handle 500+ Server Errors
    if (response && response.status >= 500) {
      return Promise.reject(
        new Error('A server error occurred. Please try again later.')
      );
    }

    // Handle Network Errors (no response)
    if (!response) {
      const isTimeout = error.code === 'ECONNABORTED';
      return Promise.reject(
        new Error(
          isTimeout
            ? 'Request timed out. Check your connection.'
            : 'Network error. Check your internet connection.'
        )
      );
    }

    // Default: use server error message or fallback
    const message =
      response.data?.message ??
      error.message ??
      'An unexpected error occurred.';
    return Promise.reject(new Error(message));
  }
);

// Augment AxiosRequestConfig to include metadata
declare module 'axios' {
  interface InternalAxiosRequestConfig {
    metadata?: {
      startTime: number;
    };
  }
}

export default apiClient;
