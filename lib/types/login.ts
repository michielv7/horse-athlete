import { z } from 'zod';
import { Details } from './personalAccount';

export const LoginForm = z.object({
  identifier: z.string().email(),
  password: z
    .string()
    .min(6, { message: 'Password is at least 6 character long' }),
});

export const ForgotPasswordForm = z.object({
  email: z.string().email(),
});

export const Login = z.object({
  jwt: z.string(),
  user: z.object({
    id: z.number(),
    username: z.string(),
    email: z.string().email(),
    type: z.string(),
  }),
});

export type LoginFormType = z.infer<typeof LoginForm>;

export type ForgotPasswordFormType = z.infer<typeof ForgotPasswordForm>;

export type CookieType = z.infer<typeof Login>;
