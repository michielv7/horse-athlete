'use client';

import { fetchData } from '#/lib/helpers/fetch';
import { SaddlesOverview } from '#/lib/types/saddleTypes';
import { stringify } from 'qs';
import useSWR from 'swr';
import { LoadingElement } from '#/ui/SkeletonCard';
import { TableHead } from './table/TableHead';
import { TableBody } from './table/TableBody';
import { toast } from 'react-hot-toast';

export const SaddleOverview = () => {
  const query = stringify(
    {
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
        success: 'Loaded the saddles',
        error: 'There was an error loading the saddles',
      },
    );

  const { data, isLoading, error } = useSWR(`/api/saddles${query}`, fetcher);

  if (isLoading) return <LoadingElement />;
  if (error) return <div>Error...</div>;

  return (
    <>
      <div className="relative overflow-x-auto rounded-md">
        <table className="w-full table-auto">
          <TableHead />
          <TableBody data={data!} />
        </table>
      </div>
      {/* <Pagination
        pagination={{
          page,
          setPage,
          pageSize,
          setPageSize,
          pageCount: meta.pagination.pageCount,
          multiplyValue: 4,
        }}
      /> */}
    </>
  );
};
