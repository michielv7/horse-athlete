import { OrderArrayType } from '#/lib/types/orderOverview';
import { OrderOverviewTableHead } from './OrderOverviewTableHead';
import { OrderOverviewTableRow } from './OrderOverviewTableRow';

export const OrderOverviewTable = ({
  orders,
  sorting,
}: {
  orders: OrderArrayType;
  sorting: { sortField: string; sortDirection: string };
}) => {
  return (
    <>
      <div className="relative overflow-x-auto rounded">
        <table className="w-full text-center text-sm text-gray-500 dark:text-gray-400">
          <OrderOverviewTableHead sorting={sorting} />
          <tbody>
            {orders.map((order) => (
              <OrderOverviewTableRow key={order.id} order={order} />
            ))}
          </tbody>
        </table>
      </div>
      {/* <Pagination
        pagination={{
          page,
          setPage,
          pageSize,
          setPageSize,
          pageCount,
          multiplyValue: 4,
        }}
      /> */}
    </>
  );
};
