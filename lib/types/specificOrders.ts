import { z } from 'zod';
//import { Saddle } from './saddleTypes'

export const specificOrdersData = z.array(
  z.object({
    id: z.number(),
    attributes: z.object({
      orderAttributes: z.object({
        customersName: z.string().optional(),
        colourOfSaddle: z.string().optional(),
        horseBreed: z.string().optional(),
        horseHeight: z.string().optional(),
      }),
      saddle: z.object({
        data: z.object({
          id: z.number(),
          attributes: z.object({
            name: z.string(),
          }),
        }),
      }),
    }),
  }),
);

export type SpecificOrdersDataType = z.infer<typeof specificOrdersData>;
