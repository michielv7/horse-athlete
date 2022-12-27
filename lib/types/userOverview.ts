import { z } from 'zod';
import { Details } from './personalAccount';

export const User = z.object({
  username: z.string(),
  email: z.string().email(),
  provider: z.string(),
  password: z.string(),
  type: z.string(),
  isSubscribed: z.boolean(),
  blocked: z.boolean(),
  confirmed: z.boolean(),
});

export const EditUser = User.omit({ password: true, provider: true }).extend({
  id: z.number(),
});

export const UserWithId = User.extend({ id: z.number() });

export const UserOverview = z.array(
  UserWithId.omit({ confirmed: true, password: true, provider: true }),
);

export const BlockUser = z.object({ blocked: z.boolean() });

export type UserOverviewType = z.infer<typeof UserOverview>;

export type UserCreateFormType = z.infer<typeof User>;

export type BlockedUserType = z.infer<typeof BlockUser>;

export type EditUserForm = z.infer<typeof EditUser>;

export type UserWithIdType = z.infer<typeof UserWithId>;
