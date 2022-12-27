import { type NewsletterOverviewAttributesType } from 'types/newsletter';
import Link from 'next/link';
import { ForwardIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

export const NewsForumShort = ({
  news,
}: {
  news: NewsletterOverviewAttributesType;
}) => {
  const image = news.image?.data?.shift()?.attributes;
  return (
    <section className="flex flex-col flex-wrap justify-around rounded-lg bg-gray-700 p-5">
      <h1 className="text-lg font-bold">{news.title}</h1>
      <p>{news.shortForm}</p>
      <Image
        src={process.env.NEXT_PUBLIC_API_URL! + image?.url}
        alt={image?.alternativeText ?? 'No image was provided'}
        width={200}
        height={200}
      />
      <Link
        href={`/news-forum/post/${news.slug}`}
        className="flex w-[20%] flex-row items-center justify-center gap-2 self-end rounded-md bg-gray-500 p-1 hover:bg-gray-600"
      >
        Read more
        <ForwardIcon className="h-4 w-4" />
      </Link>
    </section>
  );
};
