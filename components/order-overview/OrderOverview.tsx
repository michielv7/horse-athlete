import { OrderOverview as OrderOverviewParser } from '#/lib/types/orderOverview';
import { fetchServerSideData } from '#/lib/helpers/fetchServer';
import { SortType } from '#/lib/types/sort';
import { stringify } from 'qs';
import { cookies } from 'next/headers';
import { CookieType } from '#/lib/types/login';
import { OrderOverviewTable } from './OrderOverviewTable';

export const OrderOverview = async ({
  searchParams,
}: {
  searchParams: { sortField: string; sortDirection: SortType };
}) => {
  const cookie = JSON.parse(cookies().get('user')?.value!) as CookieType;
  const { sortField, sortDirection } = searchParams ?? {
    sortField: '',
    sortDirection: '',
  };
  const orderQuery = stringify(
    {
      sort: sortField ? `${sortField}:${sortDirection}` : undefined,
      populate: '*',
      filters: {
        saddleFitter: {
          id: cookie.user.type === 'fitter' ? cookie.user.id : undefined,
        },
      },
    },
    { encodeValuesOnly: true, addQueryPrefix: true },
  );

  const data = await fetchServerSideData({
    url: `/api/orders${orderQuery}`,
    method: 'GET',
    authorized: true,
  }).then(OrderOverviewParser.safeParse);

  if (!data.success) return <div>Unable to fetch your orders</div>;

  const {
    data: { data: orders, meta },
  } = data;

  return (
    <>
      <OrderOverviewTable
        sorting={{ sortField, sortDirection }}
        orders={orders}
      />
    </>
  );
};
