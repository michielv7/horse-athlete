import { SaddleOrderForm } from '#/components/add-order/order/saddle/OrderSaddleForm';
import { fetchServerSideData } from '#/lib/helpers/fetchServer';
import { getUser } from '#/lib/helpers/serverAuthorization';
import { Saddle } from '#/lib/types/saddleTypes';

export default async function Page({
  searchParams,
}: {
  searchParams?: { saddleId: string };
}) {
  if (!searchParams?.saddleId)
    return (
      <div>No saddle provided, we cannot load the form to make an order</div>
    );

  const { id } = getUser();
  const { saddleId } = searchParams;

  const data = await fetchServerSideData({
    url: `/api/saddles/${saddleId}`,
    method: 'GET',
    authorized: true,
  }).then((res) => Saddle.safeParse(res.data));

  if (!data.success) return <div>We were unable to fetch the saddle</div>;

  const { data: saddle } = data;

  return (
    <div className="grid grid-cols-2 rounded-md bg-slate-600 p-3 text-white">
      <h1 className="col-span-2 m-3 text-center text-2xl font-bold">
        Order a saddle
      </h1>
      <SaddleOrderForm saddle={saddle} userId={id.toString()} />
    </div>
  );
}
