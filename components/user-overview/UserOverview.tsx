import { fetchServerSideData } from '#/lib/helpers/fetchServer';
import { stringify } from 'qs';
import { UserOverview as UserOverviewSchema } from '#/lib/types/userOverview';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/outline';
import { TableHead } from './table/TableHead';
import { SortType } from '#/lib/types/sort';
import { TableBody } from './table/TableBody';

export const UserOverview = async ({
  searchParams,
}: {
  searchParams?: { sortField: string; sortDirection: SortType };
}) => {
  const { sortField, sortDirection } = searchParams ?? {
    sortField: '',
    sortDirection: '',
  };

  const query = stringify(
    {
      sort: sortField ? `${sortField}:${sortDirection}` : undefined,
      fields: ['username', 'email', 'isSubscribed', 'type', 'blocked'],
    },
    { encodeValuesOnly: true, addQueryPrefix: true },
  );

  const data = await fetchServerSideData({
    url: `/api/users${query}`,
    method: 'GET',
    authorized: true,
    options: {
      cache: 'reload',
      next: { revalidate: 60 },
    },
  }).then(UserOverviewSchema.safeParse);

  if (!data || !data.success) return <div>Unable to fetch userdata</div>;

  const { data: users } = data;

  return (
    <>
      <Link
        className="mb-3 ml-auto flex w-auto flex-row items-center gap-1 rounded-md bg-slate-500 p-2 hover:bg-slate-800"
        href={'/user-overview/create'}
      >
        <PlusIcon className="h-4 w-4" />
        Create a new user
      </Link>
      <div className="relative overflow-x-auto rounded-md">
        <table className="w-full table-auto">
          <TableHead
            sorting={{
              sortField,
              sortDirection,
            }}
          />
          <TableBody users={users} />
        </table>
      </div>
    </>
  );
};
