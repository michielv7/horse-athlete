'use client';

import { fetchData } from '#/lib/helpers/fetch';
import { Order } from '#/lib/types/order';
import {
  ChangeStatus,
  ChangeStatusType,
  OrderStatusArrayType,
} from '#/lib/types/orderOverview';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export const StatusChoice = ({
  orderId,
  currentStatusId,
  orderStatuses,
}: {
  orderId: number;
  currentStatusId: number;
  orderStatuses: OrderStatusArrayType;
}) => {
  const { refresh } = useRouter();
  const [, startTransition] = useTransition();
  const { register, handleSubmit } = useForm<ChangeStatusType>({
    defaultValues: { orderStatus: currentStatusId },
    resolver: zodResolver(ChangeStatus),
  });

  const onSubmit: SubmitHandler<ChangeStatusType> = async (data) => {
    const response = await fetchData({
      url: `/api/orders/${orderId}`,
      method: 'PUT',
      authorized: true,
      body: { data },
    })
      .then((res) => Order.parse(res.data))
      .catch(() => alert('Something went wrong updating the orderstatus'));

    if (response) startTransition(() => refresh());
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={'flex w-full flex-row items-center justify-center gap-1'}
    >
      <select {...register('orderStatus')} id={`orderStatus-${orderId}`}>
        {orderStatuses.map(({ id, attributes: { statusName } }) => (
          <option key={id} id={id.toString()} value={id}>
            {statusName}
          </option>
        ))}
      </select>
      <input
        type="submit"
        value="Save"
        className="block h-1/2 rounded-md bg-slate-600 p-2 hover:cursor-pointer hover:bg-slate-800"
      />
    </form>
  );
};
