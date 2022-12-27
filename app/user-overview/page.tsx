import { isAdmin } from '@lib/helpers/serverAuthorization';
import { redirect } from 'next/navigation';
import { UserOverview } from '#/components/user-overview/UserOverview';
import { SortType } from '#/lib/types/sort';

export default async function Page({
  searchParams,
}: {
  searchParams?: { sortField: string; sortDirection: SortType };
}) {
  if (!isAdmin()) redirect('/');

  return (
    <div>
      <h1 className="mb-2 text-center text-2xl font-bold">
        Overview of all the users
      </h1>
      {/* @ts-expect-error Server Component */}
      <UserOverview searchParams={searchParams} />
    </div>
  );
}
