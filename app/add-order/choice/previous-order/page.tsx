import { fetchServerSideData } from '#/lib/helpers/fetchServer';
import { specificOrdersData } from '#/lib/types/specificOrders';
import Link from 'next/link';

export default async function Page() {
  const data = await fetchServerSideData({
    url: '/api/orders?populate=*',
    method: 'GET',
    authorized: true,
  }).then((res) => specificOrdersData.safeParse(res.data));

  if (!data.success) return <div>Unable to fetch the previous orders</div>;

  const { data: orders } = data;

  return (
    <ul className="rounded border-2 border-solid border-black bg-white text-black">
      {orders.map((order) => (
        <li
          className="mb-[2rem] ml-[1rem]"
          key={order.id}
          id={order.attributes.saddle.data.id.toString()}
        >
          <h1 className="text-[2rem]">
            {order.attributes.saddle.data.attributes.name}
          </h1>
          {Object.entries(order.attributes.orderAttributes).map(
            ([key, value]) => (
              <p key={key}>
                {key.toString()}: {value.toString()}
              </p>
            ),
          )}
          <Link
            href={{
              pathname: '/add-order/order/previous-order',
              query: { orderId: order.id },
            }}
            className="col-span-2 block w-1/3 rounded-md bg-slate-500 p-2 text-center text-white transition delay-150 duration-300 ease-in-out  hover:-translate-y-1 hover:scale-110 hover:bg-slate-800"
          >
            Choose order
          </Link>
        </li>
      ))}
    </ul>
  );
}
