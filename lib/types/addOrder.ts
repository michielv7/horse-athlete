import { z } from 'zod';

export const SaddlesData = z.array(
  z.object({
    id: z.number(),
    attributes: z.object({
      name: z.string(),
      description: z.string(),
    }),
  }),
);

export type SaddlesDataType = z.infer<typeof SaddlesData>;
