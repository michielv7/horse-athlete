import { OrderOverview, OrderStatusArray } from '#/lib/types/orderOverview';
import { stringify } from 'qs';
import { fetchServerSideData } from '../fetchServer';

export const fetchOrders = async ({
  sorting: { sortField, sortDirection },
  userInfo,
}: {
  sorting: { sortField: string; sortDirection: string };
  userInfo: { id: number; type: string };
}) => {
  const { id, type } = userInfo;
  const orderQuery = stringify(
    {
      sort: sortField ? `${sortField}:${sortDirection}` : undefined,
      populate: '*',
      filters: {
        saddleFitter: {
          id: type === 'fitter' ? id : undefined,
        },
      },
    },
    { encodeValuesOnly: true, addQueryPrefix: true },
  );

  return await fetchServerSideData({
    url: `/api/orders${orderQuery}`,
    method: 'GET',
    authorized: true,
  }).then(OrderOverview.safeParse);
};

export const fetchStatuses = async () => {
  const query = stringify(
    { populate: '*', sort: ['statusLevel'] },
    { encodeValuesOnly: true, addQueryPrefix: true },
  );

  return await fetchServerSideData({
    url: `/api/orderstatuses${query}`,
    method: 'GET',
    authorized: true,
  }).then((res) => OrderStatusArray.safeParse(res.data));
};
