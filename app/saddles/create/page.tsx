import { SaddleFieldAmountForm } from '#/components/saddles/SaddleFieldsAmountForm';
import { isAdmin } from '#/lib/helpers/serverAuthorization';
import { notFound } from 'next/navigation';

export default async function Page() {
  if (!isAdmin()) notFound();

  return <SaddleFieldAmountForm />;
}
