import { NewsForm } from '#/components/news-forum/NewsForum';
import { fetchServerSideData } from '#/lib/helpers/fetchServer';
import { NewslettersOverviewData } from '#/lib/types/newsletter';
import { stringify } from 'qs';

export default async function Page() {
  const query = stringify(
    { populate: '*', pagination: { pageSize: 100 } },
    { encodeValuesOnly: true },
  );
  const data = await fetchServerSideData({
    url: `/api/newsletters?${query}`,
    method: 'GET',
    authorized: false,
    options: {
      next: {
        revalidate: 60,
      },
    },
  }).then(NewslettersOverviewData.safeParse);

  if (!data.success)
    return <div>There was an issue fetching the newsletters</div>;

  return (
    <section className="flex h-full flex-col flex-wrap items-stretch justify-center gap-5 text-white">
      <h1 className="self-center text-4xl font-bold">News Forum</h1>
      <NewsForm data={data} />
    </section>
  );
}
