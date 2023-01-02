import { z } from 'zod';
import { MetaData } from './meta';
import { Saddle } from './saddleTypes';

export const OrderStatus = z.object({
  id: z.number(),
  attributes: z.object({
    statusName: z.string(),
    statusLevel: z.number(),
  }),
});

export const ChangeStatus = z.object({
  orderStatus: z.coerce.number(),
});

export const OrderStatusArray = z.array(OrderStatus);

export const DetailedOrder = z.object({
  id: z.number(),
  attributes: z.object({
    orderAttributes: z.record(z.string(), z.union([z.string(), z.number()])),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
    orderStatus: z.object({
      data: OrderStatus,
    }),
    saddleFitter: z.object({
      data: z
        .object({
          id: z.number(),
          attributes: z.object({
            username: z.string(),
            email: z.string().email(),
          }),
        })
        .nullable(),
    }),
    saddle: z.object({
      data: Saddle,
    }),
  }),
});

export const OrderArray = z.array(DetailedOrder);

export const OrderOverview = z.object({
  data: z.array(DetailedOrder),
  meta: MetaData,
});

export type OrderStatusType = z.infer<typeof OrderStatus>;

export type OrderStatusArrayType = z.infer<typeof OrderStatusArray>;

export type OrderArrayType = z.infer<typeof OrderArray>;

export type DetailedOrderType = z.infer<typeof DetailedOrder>;

export type OrderOverviewType = z.infer<typeof OrderOverview>;

export type ChangeStatusType = z.infer<typeof ChangeStatus>;
