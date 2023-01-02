import { ISorting } from '#/lib/interfaces/sorting';
import {
  Bars4Icon,
  BarsArrowUpIcon,
  BarsArrowDownIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';

const cols = {
  names: [
    {
      displayName: 'User ID',
      fieldName: 'id',
    },
    {
      displayName: 'Username',
      fieldName: 'username',
    },
    {
      displayName: 'E-mail',
      fieldName: 'email',
    },
    {
      displayName: 'Type',
      fieldName: 'type',
    },
    {
      displayName: 'Is Subscribed',
      fieldName: 'isSubscribed',
    },
    {
      displayName: 'Blocked',
      fieldName: 'blocked',
    },
    {
      displayName: 'Action',
      fieldName: '',
    },
  ],
  noFilterIcon: Bars4Icon,
  ascIcon: BarsArrowUpIcon,
  descIcon: BarsArrowDownIcon,
} as const;

export const TableHead = ({
  sorting: { sortField, sortDirection },
  setSorting,
}: {
  sorting: {
    sortField: string;
    sortDirection: '' | 'asc' | 'desc';
  };
  setSorting: Dispatch<SetStateAction<ISorting>>;
}) => {
  return (
    <thead className="bg-slate-800 text-xs uppercase">
      <tr>
        {cols.names.map((col, i) => (
          <th key={i} className="py-2 font-bold">
            <p className="flex flex-row items-center justify-center gap-1">
              {col.displayName}
              {col.fieldName !== '' ? (
                col.fieldName === sortField && sortDirection === 'asc' ? (
                  <cols.ascIcon
                    className="h-3 w-3 hover:cursor-pointer"
                    onClick={() => {
                      setSorting({
                        sortField: col.fieldName,
                        sortDirection: 'desc',
                      });
                    }}
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
