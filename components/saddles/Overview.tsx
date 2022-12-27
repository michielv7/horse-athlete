import { fetchServerSideData } from '#/lib/helpers/fetchServer';
import { SaddlesOverview } from '#/lib/types/saddleTypes';
import { stringify } from 'qs';
import { SaddleCard } from './SaddleCard';

export const SaddleOverview = async () => {
  const query = stringify(
    {
      fields: ['name', 'description'],
    },
    { encodeValuesOnly: true, addQueryPrefix: true },
  );
  const data = await fetchServerSideData({
    url: `/api/saddles${query}`,
    method: 'GET',
    authorized: true,
  })
    .then(SaddlesOverview.parse)
    .catch(() => console.log('something went wrong'));

  if (!data) return <div>There was problem fetching your data</div>;

  const { data: saddles, meta } = data;

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {saddles.map((saddle) => (
          <SaddleCard key={saddle.id} saddle={saddle} />
        ))}
      </div>
      {/* <Pagination
        pagination={{
          page,
          setPage,
          pageSize,
          setPageSize,
          pageCount: meta.pagination.pageCount,
          multiplyValue: 4,
        }}
      /> */}
    </>
  );
};
