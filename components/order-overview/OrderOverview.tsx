'use client';

import { OrderOverviewTable } from './OrderOverviewTable';
import { LoadingElement } from '#/ui/SkeletonCard';
import { useOrderOverview } from '#/hooks/order-overview/useOrderOverview';
import { Pagination } from '#/ui/Pagination';

export const OrderOverview = () => {
  const {
    sorting,
    pagination,
    statuses: { statuses, isStatusLoading },
    orders: { orderData, isOrdersLoading, error },
  } = useOrderOverview();

  if (isOrdersLoading || isStatusLoading) return <LoadingElement />;
  if (error) return <div>Error</div>;

  const { data: orders, meta } = orderData!;

  return (
    <>
      <OrderOverviewTable
        sorting={sorting}
        orders={orders}
        orderStatuses={statuses!}
      />
      <Pagination
        pagination={{
          ...pagination,
          multiplyValue: 5,
          pageCount: meta.pagination.pageCount,
        }}
      />
    </>
  );
};
