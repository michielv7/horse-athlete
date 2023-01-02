import { ISortingSetters } from '#/lib/interfaces/sorting';
import {
  OrderArrayType,
  OrderStatusArrayType,
} from '#/lib/types/orderOverview';
import { OrderOverviewTableHead } from './OrderOverviewTableHead';
import { OrderOverviewTableRow } from './OrderOverviewTableRow';

export const OrderOverviewTable = ({
  orderStatuses,
  orders,
  sorting,
}: {
  orderStatuses: OrderStatusArrayType;
  orders: OrderArrayType;
  sorting: ISortingSetters;
}) => {
  return (
    <>
      <div className="relative overflow-x-auto rounded">
        <table className="w-full text-center text-sm text-gray-500 dark:text-gray-400">
          <OrderOverviewTableHead sorting={sorting} />
          <tbody>
            {orders?.map((order) => (
              <OrderOverviewTableRow
                key={order.id}
                order={order}
                orderStatuses={orderStatuses}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
