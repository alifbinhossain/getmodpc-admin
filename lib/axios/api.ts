import type { ApiResponse, PaginatedResponse } from '@/types';
import type { AxiosRequestConfig } from 'axios';

import apiClient from './client';

// =============================================================================
// CENTRALIZED API METHODS
// =============================================================================
// Wraps axios with typed responses and consistent patterns.

export const api = {
  // GET — single resource
  async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return apiClient.get<ApiResponse<T>>(url, config).then((r) => r.data);
  },

  // GET — paginated list
  async list<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<PaginatedResponse<T>> {
    return apiClient.get<PaginatedResponse<T>>(url, config).then((r) => r.data);
  },

  // POST — create resource
  async post<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return apiClient
      .post<ApiResponse<T>>(url, data, config)
      .then((r) => r.data);
  },

  // PUT — full update
  async put<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return apiClient.put<ApiResponse<T>>(url, data, config).then((r) => r.data);
  },

  // PATCH — partial update
  async patch<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return apiClient
      .patch<ApiResponse<T>>(url, data, config)
      .then((r) => r.data);
  },

  // DELETE — remove resource
  async delete<T = void>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return apiClient.delete<ApiResponse<T>>(url, config).then((r) => r.data);
  },

  // UPLOAD — multipart/form-data
  async upload<T>(
    url: string,
    formData: FormData,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return apiClient
      .post<ApiResponse<T>>(url, formData, {
        ...config,
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((r) => r.data);
  },
};

export default api;
