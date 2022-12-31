import {
  DetailedOrderType,
  OrderStatusArrayType,
} from '#/lib/types/orderOverview';
import { format, parseISO } from 'date-fns';
import Link from 'next/link';
import { StatusChoice } from './StatusChoice';

export const OrderOverviewTableRow = ({
  order,
  orderStatuses,
}: {
  order: DetailedOrderType;
  orderStatuses: OrderStatusArrayType;
}) => {
  return (
    <tr
      className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
      key={order.id}
    >
      <td scope="row" className="py-3 px-6 capitalize">
        {order.id}
      </td>
      <td>{order.attributes.orderAttributes.seatSize}</td>
      <td>{order.attributes.orderAttributes.colourOfSaddle}</td>
      <td>
        <StatusChoice
          orderId={order.id}
          currentStatusId={
            order.attributes.orderStatus.data.id
          }
          orderStatuses={orderStatuses}
        />
      </td>
      <td>{order.attributes.orderAttributes.customersName}</td>
      <td>{format(parseISO(order.attributes.createdAt), 'MM/dd/yyyy')}</td>
      <td>{format(parseISO(order.attributes.updatedAt), 'MM/dd/yyyy')}</td>
      <td>
        {order.attributes.saddleFitter.data?.attributes.username ??
          'No saddle fitter available'}
      </td>
      <td>
        <Link href={`/order-overview/order/${order.id}`}>View the order</Link>
      </td>
    </tr>
  );
};
