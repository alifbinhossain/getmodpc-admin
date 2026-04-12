// =============================================================================
// MEDIAS MODULE TYPES
// =============================================================================
import { BaseQueryParams, BaseRecord } from '.';

export interface MediaRecord extends BaseRecord {
  name: string;
  key: string;
  size: number;
  ext: string;
  type: string;
  created_at: string;
  url: string;
}
export interface MediaQueryParams extends BaseQueryParams {
  dateFilter?: string;
  searchTerm?: string;
  limit?: number;
  page?: number;
  folder?: string;
}

export interface FolderMediaRecord {
  folders: string[];
  files: MediaRecord[];
}
