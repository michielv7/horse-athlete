import { z } from 'zod';
//import { Saddle } from './saddleTypes'

export const specificOrderData = z.object({
  id: z.number(),
  attributes: z.object({
    orderAttributes: z.object({
      customersName: z.string().optional(),
      colourOfSaddle: z.string().optional(),
      email: z.string().optional(),
      horseBreed: z.string().optional(),
      horseHeight: z.string().optional(),
      notes: z.string().optional(),
    }),
  }),
});

export type SpecificOrderDataType = z.infer<typeof specificOrderData>;
