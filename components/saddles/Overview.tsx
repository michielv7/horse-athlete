'use client';

import { fetchData } from '#/lib/helpers/fetch';
import { SaddlesOverview } from '#/lib/types/saddleTypes';
import { stringify } from 'qs';
import useSWR from 'swr';
import { LoadingElement } from '#/ui/SkeletonCard';
import { TableHead } from './table/TableHead';
import { TableBody } from './table/TableBody';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import { IPaginationDefault } from '#/lib/interfaces/pagination';
import { Pagination } from '#/ui/Pagination';

export const SaddleOverview = () => {
  const [pagination, setPagination] = useState<IPaginationDefault>({
    page: 1,
    pageSize: 20,
  });
  const query = stringify(
    {
      pagination,
      fields: ['name', 'description'],
    },
    { encodeValuesOnly: true, addQueryPrefix: true },
  );
  const fetcher = (url: string) =>
    toast.promise(
      fetchData({
        url,
        method: 'GET',
        authorized: true,
      }).then(SaddlesOverview.parse),
      {
        loading: 'Loading the saddles',
        success: `Loaded the saddles, page: ${pagination.page}`,
        error: 'There was an error loading the saddles',
      },
    );

  const { data, isLoading, error } = useSWR(`/api/saddles${query}`, fetcher, {
    keepPreviousData: true,
    dedupingInterval: 60_000,
  });

  if (isLoading) return <LoadingElement />;
  if (error) return <div>Error...</div>;

  const { data: saddles, meta } = data!;

  return (
    <>
      <div className="relative overflow-x-auto rounded-md">
        <table className="w-full table-auto">
          <TableHead />
          <TableBody saddles={saddles} />
        </table>
      </div>
      <Pagination
        pagination={{
          ...pagination,
          pageCount: meta.pagination.pageCount,
          multiplyValue: 4,
          setPagination,
        }}
      />
    </>
  );
};
