import { z } from 'zod';

export const MetaData = z.object({
  pagination: z.object({
    page: z.number(),
    pageSize: z.number(),
    pageCount: z.number(),
    total: z.number(),
  }),
});

export type metaType = z.infer<typeof MetaData>;
