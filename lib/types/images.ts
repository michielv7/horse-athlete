import { z } from 'zod';

export const profilePicture = z.object({
  id: z.number(),
  name: z.string(),
  alternativeText: z.string(),
  width: z.number(),
  height: z.number(),
  url: z.string(),
});

export type ProfilePictureType = z.infer<typeof profilePicture>;
