import { z } from 'zod';

export const Sort = z.union([
  z.literal(''),
  z.literal('asc'),
  z.literal('desc'),
]);

export type SortType = z.infer<typeof Sort>;
