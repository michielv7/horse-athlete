import {
  fetchOrders,
  fetchStatuses,
} from '#/lib/helpers/order-overview/fetchingData';
import { getUser } from '#/lib/helpers/serverAuthorization';
import { SortType } from '#/lib/types/sort';
import { OrderOverviewTable } from './OrderOverviewTable';

export const OrderOverview = async ({
  searchParams,
}: {
  searchParams: { sortField: string; sortDirection: SortType };
}) => {
  const user = getUser();
  const { sortField, sortDirection } = searchParams ?? {
    sortField: '',
    sortDirection: '',
  };

  const statusData = await fetchStatuses();

  const orderData = await fetchOrders({
    sorting: { sortField, sortDirection },
    userInfo: user,
  });

  if (!statusData.success) return <div>Unable to fetch the statuses</div>;
  if (!orderData.success) return <div>Unable to fetch your orders</div>;

  const { data: statuses } = statusData;
  const {
    data: { data: orders, meta },
  } = orderData;

  return (
    <>
      <OrderOverviewTable
        sorting={{ sortField, sortDirection }}
        orders={orders}
        orderStatuses={statuses}
      />
    </>
  );
};
