import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/outline';
import { SaddleOverview } from '#/components/saddles/Overview';
import { isAdmin } from '#/lib/helpers/serverAuthorization';
import { notFound } from 'next/navigation';

export default function Page() {
  if (!isAdmin()) notFound();
  return (
    <div className="text-white">
      <div className="heading mb-2 flex flex-col items-center justify-center gap-x-2">
        <h1 className="mb-4 text-center text-2xl font-bold">
          Overview of all the saddles
        </h1>
        <Link
          href={'/saddles/create'}
          className="flex flex-row items-center justify-evenly gap-2 self-end rounded-md bg-slate-500 p-3 hover:bg-slate-800"
        >
          <PlusIcon className="h-6 w-6" />
          Create a new saddle
        </Link>
      </div>
      <SaddleOverview />
    </div>
  );
}
