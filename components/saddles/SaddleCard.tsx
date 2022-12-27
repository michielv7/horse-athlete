import { SaddleOverview } from '#/lib/types/saddleTypes';
import {
  DocumentPlusIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export const SaddleCard = ({ saddle }: { saddle: SaddleOverview }) => {
  return (
    <div
      id={saddle.id.toString()}
      className="grid-row-3 grid rounded-md bg-slate-600 p-2 text-center"
    >
      <h1 className="text-lg font-bold">{saddle.attributes.name}</h1>
      <p>{saddle.attributes.description}</p>
      <div className="mt-3 grid grid-cols-2 gap-x-3 self-end">
        <Link
          href={{ pathname: '/saddles/edit', query: { saddleId: saddle.id } }}
          className={
            'flex flex-row items-center justify-center gap-2 rounded-md bg-slate-500 font-semibold hover:bg-slate-800'
          }
        >
          <PencilSquareIcon className="h-4 w-4" />
          Edit{' '}
        </Link>
        <Link
          href={{
            pathname: '/add-order/order/saddle',
            query: { saddleId: saddle.id },
          }}
          className={
            'flex flex-row items-center justify-center gap-2 rounded-md bg-slate-500 font-semibold hover:bg-slate-800'
          }
        >
          <DocumentPlusIcon className="h-4 w-4" />
          Order{' '}
        </Link>
      </div>
    </div>
  );
};
