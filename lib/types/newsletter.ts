import { z } from 'zod';
import { MetaData } from './meta';

export const NewsLetterImages = z.object({
  id: z.number(),
  attributes: z.object({
    name: z.string(),
    alternativeText: z.string(),
    width: z.number(),
    height: z.number(),
    url: z.string(),
  }),
});

export const NewsletterAttributes = z.object({
  title: z.string(),
  shortForm: z.string(),
  longForm: z.string().optional(),
  slug: z.string(),
  updatedAt: z.string().datetime({ offset: true }),
  createdAt: z.string().datetime({ offset: true }),
  image: z
    .object({
      data: z.union([z.array(NewsLetterImages), z.null()]),
    })
    .optional(),
});

export const Newsletters = z.object({
  id: z.number(),
  attributes: NewsletterAttributes,
});

export const NewsletterOverviewAttributes = NewsletterAttributes.pick({
  title: true,
  shortForm: true,
  slug: true,
  image: true,
});

export const NewsletterOverview = z.object({
  id: z.number(),
  attributes: NewsletterOverviewAttributes,
});

export const NewslettersOverviewArray = z.array(NewsletterOverview);

export const NewslettersOverviewData = z.object({
  data: NewslettersOverviewArray,
  meta: MetaData,
});

export type NewsletterAttributesType = z.infer<typeof NewsletterAttributes>;

export type NewslettersOverviewType = z.infer<typeof NewslettersOverviewData>;

export type NewslettersOverviewArrayType = z.infer<
  typeof NewslettersOverviewArray
>;

export type NewsletterOverviewAttributesType = z.infer<
  typeof NewsletterOverviewAttributes
>;
