import z from 'zod/v3';

export const commentSchema = z.object({
  content: z.string().min(1, 'Content is required'),
});

export type ICommentSchema = z.infer<typeof commentSchema>;
