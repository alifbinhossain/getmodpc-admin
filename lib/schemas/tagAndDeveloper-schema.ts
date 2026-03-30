import z from 'zod/v3';

export const tagDeveloperSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(255),
  description: z.string().max(1000).optional().nullable(),
});

export type ITagDeveloperSchema = z.infer<typeof tagDeveloperSchema>;
