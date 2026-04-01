import { PaginatedResponse } from '@/types';
import type {
  CommentQueryParams,
  CommentRecord,
  CreateCommentPayload,
  UpdateCommentPayload,
} from '@/types/comment';

import { useApiListQuery, useApiMutation, useApiQuery } from '@/hooks/api';

import { queryKeys } from '@/lib/react-query';

import { commentsService } from './comments.service';

// =============================================================================
// COMMENT QUERY HOOKS
// =============================================================================

/** Fetch paginated comments */
export function useComments(
  params?: CommentQueryParams,
  initialData?: PaginatedResponse<CommentRecord>
) {
  return useApiListQuery({
    queryKey: queryKeys.comment.list((params ?? {}) as Record<string, unknown>),
    queryFn: () => commentsService.getComments(params),
    initialData,
  });
}

/** Fetch single comment */
export function useComment(id: string) {
  return useApiQuery({
    queryKey: queryKeys.comment.detail(id),
    queryFn: () => commentsService.getComment(id),
    enabled: !!id,
  });
}

// =============================================================================
// COMMENT MUTATION HOOKS
// =============================================================================

/** Create comment */
export function useCreateComment() {
  return useApiMutation({
    mutationFn: (payload: CreateCommentPayload) =>
      commentsService.createComment(payload),
    invalidateKeys: [queryKeys.comment.lists()],
    successMessage: 'Comment created successfully.',
  });
}

/** Update comment */
export function useUpdateComment() {
  return useApiMutation({
    mutationFn: (payload: UpdateCommentPayload) =>
      commentsService.updateComment(payload),
    invalidateKeys: [queryKeys.comment.lists()],
    successMessage: 'Comment updated successfully.',
  });
}

/** Delete comment */
export function useDeleteComment() {
  return useApiMutation({
    mutationFn: (id: string) => commentsService.deleteComment(id),
    invalidateKeys: [queryKeys.comment.lists()],
    successMessage: 'Comment deleted successfully.',
  });
}
