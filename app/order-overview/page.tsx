import { OrderOverview } from '#/components/order-overview/OrderOverview';
import { SortType } from '#/lib/types/sort';

export const revalidate = 30;

export default async function Page({
  searchParams,
}: {
  searchParams?: { sortField: string; sortDirection: SortType };
}) {
  return (
    <div>
      {/* @ts-expect-error Server Component */}
      <OrderOverview searchParams={searchParams} />
    </div>
  );
}
