import type { ApiResponse, PaginatedResponse } from '@/types';
import type {
  CommentQueryParams,
  CommentRecord,
  CreateCommentPayload,
  UpdateCommentPayload,
} from '@/types/comment';

import { api } from '@/lib/axios';
import { buildQueryString } from '@/lib/utils';

// =============================================================================
// COMMENTS API SERVICE
// =============================================================================

export const commentsService = {
  /** Fetch paginated list of comments */
  getComments(
    params?: CommentQueryParams
  ): Promise<PaginatedResponse<CommentRecord>> {
    const qs = params
      ? buildQueryString(params as Record<string, unknown>)
      : '';
    return api.list<CommentRecord>(`/comments${qs ? `?${qs}` : ''}`);
  },

  /** Fetch a single comment by ID */
  getComment(id: string): Promise<ApiResponse<CommentRecord>> {
    return api.get<CommentRecord>(`/comments/${id}`);
  },

  /** Create a new comment */
  createComment(
    payload: CreateCommentPayload
  ): Promise<ApiResponse<CommentRecord>> {
    return api.post<CommentRecord, CreateCommentPayload>('/comments', payload);
  },

  /** Update an existing comment */
  updateComment({
    id,
    ...payload
  }: UpdateCommentPayload): Promise<ApiResponse<CommentRecord>> {
    return api.patch<CommentRecord, Omit<UpdateCommentPayload, 'id'>>(
      `/comments/${id}`,
      payload
    );
  },

  /** Delete a comment */
  deleteComment(id: string): Promise<ApiResponse<void>> {
    return api.delete<void>(`/comments/${id}`);
  },

  /** bulk a deleted comment */
  deleteComments(ids: string[]): Promise<ApiResponse<void>> {
    return api.post<void>(`/comments/bulk-delete`, { ids });
  },
};
