import z from 'zod/v3';

export const testimonialSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(150),
  designation: z.string().min(2).max(150),
  content: z.string().min(5, 'Content must be at least 5 characters'),
  image_url: z.string().url('Invalid image URL').optional().nullable(),
  company_logo: z
    .string()
    .url('Invalid company logo URL')
    .optional()
    .nullable(),
  is_active: z.boolean().optional(),
  sort_order: z.number().int().optional(),
});

export type ITestimonialSchema = z.infer<typeof testimonialSchema>;
