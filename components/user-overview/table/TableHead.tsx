import {
  Bars4Icon,
  BarsArrowUpIcon,
  BarsArrowDownIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

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
}: {
  sorting: {
    sortField: string;
    sortDirection: '' | 'asc' | 'desc';
  };
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
                  <Link
                    href={{
                      pathname: '/user-overview',
                      query: {
                        sortField: col.fieldName,
                        sortDirection: 'desc',
                      },
                    }}
                    replace
                  >
                    <cols.ascIcon className="h-3 w-3 hover:cursor-pointer" />
                  </Link>
                ) : col.fieldName === sortField && sortDirection === 'desc' ? (
                  <Link
                    href={{
                      pathname: '/user-overview',
                    }}
                    replace
                  >
                    <cols.descIcon className="h-3 w-3 hover:cursor-pointer" />
                  </Link>
                ) : (
                  <Link
                    href={{
                      pathname: '/user-overview',
                      query: {
                        sortField: col.fieldName,
                        sortDirection: 'asc',
                      },
                    }}
                    replace
                  >
                    <cols.noFilterIcon className="h-3 w-3 hover:cursor-pointer" />
                  </Link>
                )
              ) : null}
            </p>
          </th>
        ))}
      </tr>
    </thead>
  );
};
