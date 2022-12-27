import { SaddleChoiceForm } from '#/components/add-order/choice/saddle/SaddleChoiceForm';
import { fetchServerSideData } from '#/lib/helpers/fetchServer';
import { SaddlesData } from '#/lib/types/addOrder';

export default async function Page() {
  const data = await fetchServerSideData({
    url: '/api/saddles',
    method: 'GET',
    authorized: true,
  }).then((res) => SaddlesData.safeParse(res.data));

  if (!data.success) return <div>We were unable to fetch the saddles.</div>;

  const { data: saddles } = data;

  return (
    <div className="rounded-md bg-slate-600 p-3 text-white">
      <h1 className="mb-4 text-center text-xl font-bold">
        Choose the saddle you want to order
      </h1>
      <SaddleChoiceForm saddles={saddles} />
    </div>
  );
}
