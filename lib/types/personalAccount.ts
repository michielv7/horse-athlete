import { z } from 'zod';
import { profilePicture } from './images';

export const Stats = z.object({
  totalOrders: z.number(),
  orderStatuses: z.record(z.number()),
});

export const Details = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string().email(),
  type: z.enum(['admin', 'fitter']),
  isSubscribed: z.boolean(),
  profilePicture,
});

export const PasswordChange = z
  .object({
    currentPassword: z.string(),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' }),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'The new passwords do not match',
    path: ['passwordConfirmation'],
  });

export const ForgotPasswordRes = z.object({
  ok: z.literal(true),
});

export const DetailsForm = z.object({
  username: z.string().min(1, { message: 'Please provide a username' }),
  email: z.string().email(),
  isSubscribed: z.boolean(),
});

export const UpdateResponse = Details.omit({ profilePicture: true });

export type DetailsType = z.infer<typeof Details>;

export type StatsType = z.infer<typeof Stats>;

export type PasswordChangeType = z.infer<typeof PasswordChange>;

export type DetailsFormType = z.infer<typeof DetailsForm>;
