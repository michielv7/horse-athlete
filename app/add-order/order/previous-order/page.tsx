import { PreviousOrderForm } from '#/components/add-order/choice/previous-order/PreviousOrderForm';
import { fetchServerSideData } from '#/lib/helpers/fetchServer';
import { getUser } from '#/lib/helpers/serverAuthorization';
import { orderWithSaddle } from '#/lib/types/orderWithSaddle';
import { stringify } from 'qs';

export default async function Page({
  searchParams,
}: {
  searchParams: { orderId: string };
}) {
  if (!searchParams?.orderId)
    return <div>There was no order ID given to the server</div>;

  const query = stringify(
    { populate: 'saddle' },
    { encodeValuesOnly: true, addQueryPrefix: true },
  );

  const data = await fetchServerSideData({
    url: `/api/orders/${searchParams.orderId}${query}`,
    method: 'GET',
    authorized: true,
  }).then((res) => orderWithSaddle.safeParse(res.data));

  if (!data.success) return <div>Unable to fetch your previous order</div>;

  const {
    data: {
      attributes: {
        orderAttributes,
        saddle: {
          data: { id: saddleId, attributes: saddleAttributes },
        },
      },
    },
  } = data;
  const { id: userId } = getUser();

  return (
    <PreviousOrderForm
      data={{ saddleId: saddleId.toString(), userId: userId.toString() }}
      orderAttributes={orderAttributes}
      saddleAttributes={saddleAttributes.attributes}
    />
  );
}
