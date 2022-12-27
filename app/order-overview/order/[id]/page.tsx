import { OrderDetail } from '#/components/order-overview/OrderDetails';
import { fetchServerSideData } from '#/lib/helpers/fetchServer';
import { DetailedOrder } from '#/lib/types/orderOverview';
import { stringify } from 'qs';

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const query = stringify(
    {
      populate: '*',
    },
    { encodeValuesOnly: true, addQueryPrefix: true },
  );

  const data = await fetchServerSideData({
    url: `/api/orders/${id}${query}`,
    method: 'GET',
    authorized: true,
    options: {
      cache: 'force-cache',
    },
  }).then((res) => DetailedOrder.safeParse(res.data));

  if (!data.success) return <div>Unable to fetch the order</div>;

  const { data: order } = data;

  return <OrderDetail order={order} />;
}
