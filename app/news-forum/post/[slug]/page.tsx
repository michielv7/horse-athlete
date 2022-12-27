import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline';
import { NewsletterAttributes } from '#/lib/types/newsletter';
import { stringify } from 'qs';
import { fetchServerSideData } from '#/lib/helpers/fetchServer';

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const query = stringify({ populate: '*' }, { encodeValuesOnly: true });
  const data = await fetchServerSideData({
    url: `/api/newsletters/slug/${slug}?${query}`,
    method: 'GET',
    authorized: false,
    options: {
      cache: 'default',
    },
  }).then(NewsletterAttributes.safeParse);

  if (!data.success) return <div>There was an error fetching this article</div>;

  const { data: news } = data;

  return (
    <section className="flex flex-col flex-wrap items-start justify-start text-white">
      <h1 className="text-center text-3xl font-extrabold">{news!.title}</h1>
      <div className="mb-2 self-end text-end">
        <p>{`Created on ${format(parseISO(news!.createdAt), 'dd/MM/YYY')}`}</p>
        <p>{`Last update on ${format(
          parseISO(news!.updatedAt),
          'dd/MM/YYY',
        )}`}</p>
      </div>
      <p className="whitespace-pre-line">{news!.longForm}</p>
      <Link
        href={'/news-forum'}
        className="mt-5 flex flex-row items-center justify-center gap-2 self-center rounded-md bg-gray-500 p-2 hover:bg-gray-600"
      >
        <ArrowLeftCircleIcon className="h-4 w-4" />
        Go back
      </Link>
    </section>
  );
}
