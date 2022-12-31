import { z } from 'zod';
import { MetaData } from './meta';

export const CustomSaddleAttribute = z.object({
  name: z.string(),
  addedPrice: z.number(),
  description: z.string(),
  type: z.enum(['text', 'number', 'selection']),
  isRequired: z.boolean(),
  isSaddleFitterOnly: z.boolean(),
  options: z
    .array(
      z
        .object({
          name: z.string().min(2, {
            message: 'Add your custom options to the right textarea.',
          }),
          addedPrice: z
            .number({
              invalid_type_error:
                'Make sure to provide an added price for each of the options.',
            })
            .min(0, {
              message: 'The added value should be a positive number',
            }),
        })
        .optional(),
    )
    .optional(),
  limit: z
    .object({
      min: z.number(),
      max: z.number(),
    })
    .optional(),
});

const CustomSaddleAttributes = z.array(CustomSaddleAttribute);

const SaddleAttributes = z.object({
  name: z.string(),
  description: z.string(),
  basePrice: z.number(),
  attributes: CustomSaddleAttributes,
});

export const SaddleBody = SaddleAttributes.deepPartial();

export const Saddle = z.object({
  id: z.number(),
  attributes: SaddleAttributes,
});

export const Saddles = z.array(Saddle);

export const SaddlesOverviewData = z.array(
  z.object({
    id: z.number(),
    attributes: SaddleAttributes.pick({ name: true, description: true }),
  }),
);

export const SaddlesOverview = z.object({
  data: SaddlesOverviewData,
  meta: MetaData,
});

export type CustomSaddleAttribute = z.infer<typeof CustomSaddleAttribute>;

export type CustomSaddleAttributesArrayType = z.infer<
  typeof CustomSaddleAttributes
>;

export type SaddlesType = z.infer<typeof Saddles>;

export type SaddleType = z.infer<typeof Saddle>;

export type SaddleOverview = z.infer<typeof SaddlesOverviewData.element>;

export const SaddleFieldsAmount = z.object({
  textAmount: z.coerce.number().min(0).default(0),
  numberAmount: z.coerce.number().min(0).default(0),
  selectionAmount: z.coerce.number().min(0).default(0),
});

export type SaddleFieldsAmountType = z.infer<typeof SaddleFieldsAmount>;

export type SaddlesOverviewType = z.infer<typeof SaddlesOverview>;
