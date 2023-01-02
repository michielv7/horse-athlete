import { getUser } from '#/lib/helpers/authorization';
import { fetchData } from '#/lib/helpers/fetch';
import { IPaginationDefault } from '#/lib/interfaces/pagination';
import { ISorting } from '#/lib/interfaces/sorting';
import { OrderStatusArray } from '#/lib/types/orderOverview';
import { stringify } from 'qs';
import { useState } from 'react';
import { OrderOverview } from '#/lib/types/orderOverview';
import useSWR from 'swr';
import { toast } from 'react-hot-toast';

export const useOrderOverview = () => {
  const { id, type } = getUser() ?? { id: 0, type: undefined };
  const [sorting, setSorting] = useState<ISorting>({
    sortField: '',
    sortDirection: '',
  });

  const [pagination, setPagination] = useState<IPaginationDefault>({
    page: 1,
    pageSize: 20,
  });

  const statusQuery = stringify(
    { populate: '*', sort: ['statusLevel'] },
    { encodeValuesOnly: true, addQueryPrefix: true },
  );

  const orderQuery = stringify(
    {
      sort: sorting.sortField
        ? `${sorting.sortField}:${sorting.sortDirection}`
        : undefined,
      populate: '*',
      pagination,
      filters: {
        saddleFitter: {
          id: type === 'fitter' ? id : undefined,
        },
      },
    },
    { encodeValuesOnly: true, addQueryPrefix: true },
  );

  const fetchStatuses = (url: string) =>
    fetchData({ url, method: 'GET', authorized: true }).then((res) =>
      OrderStatusArray.parse(res.data),
    );

  const fetchOrders = (url: string) =>
    toast.promise(
      fetchData({ url, method: 'GET', authorized: true }).then(
        OrderOverview.parse,
      ),
      {
        loading: 'Loading your orders...',
        success: `Loaded your orders, page: ${pagination.page}`,
        error: 'There was an error loading your orders!',
      },
    );

  const { data: statuses, isLoading: isStatusLoading } = useSWR(
    `/api/orderstatuses${statusQuery}`,
    fetchStatuses,
    {
      keepPreviousData: true,
      dedupingInterval: 120_000,
    },
  );

  const {
    data: orderData,
    isLoading: isOrdersLoading,
    error,
  } = useSWR(`/api/orders${orderQuery}`, fetchOrders, {
    keepPreviousData: true,
    dedupingInterval: 60_000,
  });

  return {
    sorting: { ...sorting, setSorting },
    pagination: { ...pagination, setPagination },
    statuses: { statuses, isStatusLoading },
    orders: { orderData, isOrdersLoading, error },
  };
};
