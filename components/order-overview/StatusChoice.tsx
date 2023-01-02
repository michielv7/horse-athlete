'use client';

import { fetchData } from '#/lib/helpers/fetch';
import { Order } from '#/lib/types/order';
import {
  ChangeStatus,
  ChangeStatusType,
  DetailedOrder,
  OrderStatusArrayType,
} from '#/lib/types/orderOverview';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

export const StatusChoice = ({
  orderId,
  currentStatusId,
  orderStatuses,
}: {
  orderId: number;
  currentStatusId: number;
  orderStatuses: OrderStatusArrayType;
}) => {
  const { register, handleSubmit } = useForm<ChangeStatusType>({
    defaultValues: { orderStatus: currentStatusId },
    resolver: zodResolver(ChangeStatus),
  });

  const onSubmit: SubmitHandler<ChangeStatusType> = (data) => {
    return toast.promise(
      fetchData({
        url: `/api/orders/${orderId}?populate=*`,
        method: 'PUT',
        authorized: true,
        body: { data },
      }).then((res) => DetailedOrder.parse(res.data)),
      {
        loading: `Updating the status of order with id ${orderId}`,
        success: (data) =>
          `Updated the status to '${data.attributes.orderStatus.data.attributes.statusName}' for order with id ${orderId}`,
        error: 'There was an error updating the saddle',
      },
    );
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
