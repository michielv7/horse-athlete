import { CreateSaddleForm } from '#/components/saddles/CreateSaddleForm';
import { isAdmin } from '#/lib/helpers/serverAuthorization';
import { notFound } from 'next/navigation';

export default function Page({
  searchParams,
}: {
  searchParams?: {
    textAmount: string;
    numberAmount: string;
    selectionAmount: string;
  };
}) {
  if (!isAdmin()) notFound();

  const textAmount = searchParams?.textAmount ?? '0',
    numberAmount = searchParams?.numberAmount ?? '0',
    selectionAmount = searchParams?.selectionAmount ?? '0';
  return (
    <div className="grid grid-cols-2 gap-x-2 rounded-md bg-slate-600 p-3 text-white">
      <h1 className="col-span-2 text-center text-2xl font-bold">
        Create a new saddle
      </h1>
      <CreateSaddleForm
        fieldAmounts={{ textAmount, numberAmount, selectionAmount }}
      />
    </div>
  );
}
