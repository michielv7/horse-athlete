import { isAdmin } from '@lib/helpers/serverAuthorization';
import { notFound } from 'next/navigation';
import { UserOverview } from '#/components/user-overview/UserOverview';
import { PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default async function Page() {
  if (!isAdmin()) notFound();

  return (
    <div>
      <h1 className="mb-2 text-center text-2xl font-bold">
        Overview of all the users
      </h1>
      <Link
        className="mb-3 ml-auto flex w-auto flex-row items-center gap-1 rounded-md bg-slate-500 p-2 hover:bg-slate-800"
        href={'/user-overview/create'}
        passHref
      >
        <PlusIcon className="h-4 w-4" />
        Create a new user
      </Link>
      <UserOverview />
    </div>
  );
}
