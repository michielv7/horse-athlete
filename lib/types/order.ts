import { z } from 'zod';

export const OrdersData = z.array(
  z.object({
    id: z.number(),
    attributes: z.object({
      orderAttributes: z.record(z.union([z.string(), z.number()])),
    }),
  }),
);

export const Order = z.object({
  id: z.number(),
  attributes: z.object({
    orderAttributes: z.record(z.union([z.string(), z.number()])),
  }),
});

export type OrderDataType = z.infer<typeof Order>;
