import { SaddleEditForm } from '#/components/saddles/SaddleEditForm';
import { fetchServerSideData } from '#/lib/helpers/fetchServer';
import { Saddle } from '#/lib/types/saddleTypes';

export default async function Page({
  searchParams,
}: {
  searchParams?: { saddleId: string };
}) {
  const data = await fetchServerSideData({
    url: `/api/saddles/${searchParams?.saddleId!}`,
    method: 'GET',
    authorized: true,
  }).then((res) => Saddle.safeParse(res.data));

  if (!data.success) return <div>Unable to fetch your saddle</div>;
  const { data: saddle } = data;

  return (
    <div className="grid grid-cols-2 gap-x-2 rounded-md bg-slate-600 p-3 text-white">
      <h1 className="col-span-2 text-center text-2xl font-bold">
        Edit your saddle
      </h1>
      <SaddleEditForm saddle={saddle} />
    </div>
  );
}
