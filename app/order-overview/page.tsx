import { OrderOverview } from '#/components/order-overview/OrderOverview';

export default function Page() {
  return (
    <div>
      <h1 className='text-center font-bold text-2xl mb-2'>Order Overview</h1>
      <OrderOverview />
    </div>
  );
}
