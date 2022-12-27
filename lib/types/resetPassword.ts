import { z } from 'zod';

export const ResetPasswordForm = z
  .object({
    password: z
      .string()
      .min(6, { message: 'Password needs to be at least 6 characters long' }),
    passwordConfirmation: z.string(),
    code: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'The passwords do not match',
    path: ['passwordConfirmation'],
  });

export type ResetPasswordFormType = z.infer<typeof ResetPasswordForm>;
