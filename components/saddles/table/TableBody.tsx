import { SaddlesDataType } from '#/lib/types/addOrder';
import { SaddlesOverviewType } from '#/lib/types/saddleTypes';
import {
  DocumentPlusIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';

export const TableBody = ({ saddles }: { saddles: SaddlesDataType }) => {
  return (
    <tbody>
      {saddles.map((saddle, i) => (
        <tr
          key={saddle.id}
          className={clsx('text-center', {
            'bg-slate-400': i % 2 === 0,
            'bg-slate-600': i % 2 !== 0,
          })}
        >
          <td className="py-2" scope="row">
            {saddle.attributes.name}
          </td>
          <td>{saddle.attributes.description}</td>
          <td className="grid grid-cols-1 items-center justify-center">
            <Link
              href={{
                pathname: '/saddles/edit',
                query: { saddleId: saddle.id },
              }}
              className="inline-flex flex-row items-center justify-center gap-2 hover:text-blue-500"
            >
              <PencilSquareIcon className="h-4 w-4" />
              Edit{' '}
            </Link>
            <Link
              href={{
                pathname: '/add-order/order/saddle',
                query: { saddleId: saddle.id },
              }}
              className="inline-flex flex-row items-center justify-center gap-2 hover:text-blue-500"
            >
              <DocumentPlusIcon className="h-4 w-4" />
              Order{' '}
            </Link>
          </td>
        </tr>
      ))}
    </tbody>
  );
};
