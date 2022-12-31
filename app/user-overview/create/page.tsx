import { CreateUserForm } from '#/components/user-overview/create/CreateUserForm';
import { isAdmin } from '#/lib/helpers/serverAuthorization';
import { notFound } from 'next/navigation';

export default function Page() {
  if (!isAdmin()) notFound();

  return (
    <div className="rounded-md bg-slate-600 p-3">
      <h1 className="mb-2 text-center text-xl font-bold">Add a new user</h1>
      <CreateUserForm />
    </div>
  );
}
