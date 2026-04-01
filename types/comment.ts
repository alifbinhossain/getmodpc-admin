// =============================================================================
// COMMENTS MODULE TYPES
// =============================================================================
import { BaseQueryParams, BaseRecord, EnumAppCommentStatus } from '.';

export interface CreateCommentPayload {
  content: string;
  name: string;
  app_id: string;
  email: boolean;
}

export interface UpdateCommentPayload extends Partial<CreateCommentPayload> {
  id: string;
}

export interface CommentRecord extends BaseRecord {
  content: string;
  name: string;
  app_id: string;
  email: boolean;
  app: {
    id: string;
    name: string;
    comment_status: EnumAppCommentStatus;
  };
  replies?: Array<{
    id: string;
    content: string;
    name: string;
    email: boolean;
    app_id: string;
  }>;
}

export interface CommentQueryParams extends BaseQueryParams {
  searchTerm?: string;
  app_id?: string;
}
