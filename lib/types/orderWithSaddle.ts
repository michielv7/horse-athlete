import { z } from 'zod';
import { Saddle } from './saddleTypes';

export const orderWithSaddle = z.object({
  id: z.number(),
  attributes: z.object({
    orderAttributes: z.record(z.union([z.string(), z.number()])),
    saddle: z.object({
      data: Saddle,
    }),
  }),
});

export type SpecificOrderDataType = z.infer<typeof orderWithSaddle>;
