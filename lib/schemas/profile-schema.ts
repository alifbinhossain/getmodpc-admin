import z from 'zod/v3';

export const profileSchema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters').max(255),
  avatar: z.string().url('Invalid avatar URL').optional().nullable(),
});

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(6, 'Password must be at least 6 characters'),
    newPassword: z.string().min(6, 'Password must be at least 6 characters'),
    confirm_password: z
      .string()
      .min(6, 'Password must be at least 6 characters'),
  })
  .refine((data) => data.newPassword === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  });
