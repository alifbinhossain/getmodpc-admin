import z from 'zod/v3';

export const contactSchema = z.object({
  message: z.string().min(1, 'Message is required'),
});

export type IContactSchema = z.infer<typeof contactSchema>;
