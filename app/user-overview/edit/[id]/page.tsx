import { UserEditForm } from '#/components/user-overview/edit/UserEditForm';
import { fetchServerSideData } from '#/lib/helpers/fetchServer';
import { isAdmin } from '#/lib/helpers/serverAuthorization';
import { UserWithId } from '#/lib/types/userOverview';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  if (!isAdmin()) notFound();
  const { id } = params;

  const data = await fetchServerSideData({
    url: `/api/users/${id}`,
    method: 'GET',
    authorized: true,
  }).then(UserWithId.omit({ password: true, provider: true }).safeParse);

  if (!data.success) return <div>Unable to fetch the user you needed.</div>;

  const { data: user } = data;

  return (
    <div className="rounded-md bg-slate-600 p-3">
      <UserEditForm user={user} />
    </div>
  );
}
