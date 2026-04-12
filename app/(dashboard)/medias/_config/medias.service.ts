import type { ApiResponse, PaginatedResponse, PaginationMeta } from '@/types';
import type {
  FolderMediaRecord,
  IFolderMeta,
  MediaQueryParams,
  MediaRecord,
} from '@/types/media';

import { api, apiClient } from '@/lib/axios';
import { buildQueryString } from '@/lib/utils';

// =============================================================================
// MEDIAS API SERVICE
// =============================================================================

export const mediasService = {
  /** Fetch paginated list of medias */
  getAllMedias(
    params?: MediaQueryParams
  ): Promise<PaginatedResponse<MediaRecord>> {
    const qs = params
      ? buildQueryString(params as Record<string, unknown>)
      : '';
    return api.list<MediaRecord>(`/medias${qs ? `?${qs}` : ''}`);
  },

  getAllMediasByFolder(
    params?: MediaQueryParams
  ): Promise<{
    data: FolderMediaRecord;
    meta: PaginationMeta;
    success: boolean;
  }> {
    const qs = params
      ? buildQueryString(params as Record<string, unknown>)
      : '';
    return apiClient.get(`/medias/folder${qs ? `?${qs}` : ''}`);
  },

  getAllFolders(
    params?: MediaQueryParams
  ): Promise<PaginatedResponse<IFolderMeta>> {
    const qs = params
      ? buildQueryString(params as Record<string, unknown>)
      : '';
    return api.list<IFolderMeta>(`/medias/get-folders${qs ? `?${qs}` : ''}`);
  },

  /** Fetch a single media by key */
  getMediaKey(key: string): Promise<ApiResponse<MediaRecord>> {
    return api.get<MediaRecord>(`/medias/${key}`);
  },

  // create a new folder
  createFolder(payload: { folderName: string }): Promise<ApiResponse<string>> {
    return api.post<string>('/medias/create-folder', payload);
  },

  //rename file name
  renameFile(payload: {
    oldKey: string;
    newKey: string;
  }): Promise<ApiResponse<any>> {
    return api.put<any>('/medias/rename-file', payload);
  },

  // rename a folder
  renameFolder(payload: {
    oldFolder: string;
    newFolder: string;
  }): Promise<ApiResponse<{ moved: number }>> {
    return api.put<{ moved: number }>('/medias/rename-folder', payload);
  },

  // delete folder
  deleteFolder(payload: {
    folderName: string;
  }): Promise<ApiResponse<{ success: string[]; failed: string[] }>> {
    return api.post<{ success: string[]; failed: string[] }>(
      '/medias/delete-folder',
      payload
    );
  },

  /** Upload a new media */
  uploadMedias(payload: FormData): Promise<ApiResponse<MediaRecord>> {
    return api.upload<MediaRecord>('/medias', payload);
  },

  /** Bulk delete medias */
  deleteMedias(fileKeys: string[]): Promise<ApiResponse<void>> {
    return api.post<void, { fileKeys: string[] }>('/medias/bulk-delete', {
      fileKeys,
    });
  },
};
