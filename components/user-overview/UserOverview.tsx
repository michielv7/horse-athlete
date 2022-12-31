'use client';

import { fetchData } from '#/lib/helpers/fetch';
import { ISorting } from '#/lib/intefaces/sorting';
import { UserOverview as UserOverviewSchema } from '#/lib/types/userOverview';
import { LoadingElement } from '#/ui/SkeletonCard';
import { stringify } from 'qs';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import useSWR from 'swr';
import { TableBody } from './table/TableBody';
import { TableHead } from './table/TableHead';

export const UserOverview = () => {
  const [sorting, setSorting] = useState<ISorting>({
    sortField: '',
    sortDirection: '',
  });

  const query = stringify(
    {
      sort: sorting.sortField
        ? `${sorting.sortField}:${sorting.sortDirection}`
        : undefined,
      fields: ['username', 'email', 'isSubscribed', 'type', 'blocked'],
    },
    { encodeValuesOnly: true, addQueryPrefix: true },
  );

  const fetcher = (url: string) =>
    toast.promise(
      fetchData({ url, method: 'GET', authorized: true }).then(
        UserOverviewSchema.parse,
      ),
      {
        loading: `Sorting on ${
          sorting.sortField ? sorting.sortField : 'no specific field'
        }`,
        success: `Sorted on ${
          sorting.sortField ? sorting.sortField : 'no specific field.'
        }`,
        error: 'Failed to sort...',
      },
    );

  const {
    data: users,
    isLoading,
    error,
  } = useSWR(`/api/users${query}`, fetcher, { keepPreviousData: true });

  if (isLoading) return <LoadingElement />;

  if (error) return <div>Error..</div>;

  return (
    <div className="relative overflow-x-auto rounded-md">
      <table className="w-full table-auto">
        <TableHead sorting={sorting} setSorting={setSorting} />
        <TableBody users={users!} />
      </table>
    </div>
  );
};
