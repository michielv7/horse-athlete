import { ISortingSetters } from '#/lib/interfaces/sorting';
import {
  Bars4Icon,
  BarsArrowUpIcon,
  BarsArrowDownIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

const cols = {
  names: [
    {
      displayName: 'Order Nr.',
      fieldName: 'id',
    },
    {
      displayName: 'Seat Size',
      fieldName: '',
    },
    {
      displayName: 'Saddle Colour',
      fieldName: '',
    },
    {
      displayName: 'Status',
      fieldName: 'orderStatus.statusLevel',
    },
    {
      displayName: 'Customer',
      fieldName: '',
    },
    {
      displayName: 'Order Date',
      fieldName: 'createdAt',
    },
    {
      displayName: 'Date Updated',
      fieldName: 'updatedAt',
    },
    {
      displayName: 'Saddle Fitter',
      fieldName: 'saddleFitter.username',
    },
    {
      displayName: '',
      fieldName: '',
    },
  ],
  noFilterIcon: Bars4Icon,
  ascIcon: BarsArrowUpIcon,
  descIcon: BarsArrowDownIcon,
} as const;

export const OrderOverviewTableHead = ({
  sorting: { sortField, sortDirection, setSorting },
}: {
  sorting: ISortingSetters;
}) => {
  return (
    <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        {cols.names.map((col, i) => (
          <th key={i} className="py-3 px-6 font-bold">
            <p className="flex flex-row items-center justify-center gap-1">
              {col.displayName}
              {col.fieldName !== '' ? (
                col.fieldName === sortField && sortDirection === 'asc' ? (
                  <cols.ascIcon
                    className="h-3 w-3 hover:cursor-pointer"
                    onClick={() =>
                      setSorting({
                        sortField: col.fieldName,
                        sortDirection: 'desc',
                      })
                    }
                  />
                ) : col.fieldName === sortField && sortDirection === 'desc' ? (
                  <cols.descIcon
                    className="h-3 w-3 hover:cursor-pointer"
                    onClick={() =>
                      setSorting({ sortField: '', sortDirection: '' })
                    }
                  />
                ) : (
                  <cols.noFilterIcon
                    className="h-3 w-3 hover:cursor-pointer"
                    onClick={() =>
                      setSorting({
                        sortField: col.fieldName,
                        sortDirection: 'asc',
                      })
                    }
                  />
                )
              ) : null}
            </p>
          </th>
        ))}
      </tr>
    </thead>
  );
};
