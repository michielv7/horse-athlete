import { StatsType } from '#/lib/types/personalAccount';
import { SafeParseError, SafeParseSuccess } from 'zod';
import { StatsOverview } from './StatsOverview';

export default function Statistics({
  statsData,
}: {
  statsData: SafeParseSuccess<StatsType> | SafeParseError<StatsType>;
}) {
  if (!statsData.success) return <div>Unable to fetch your stats</div>;

  const { data: stats } = statsData;

  return (
    <div className="rounded-md bg-slate-600 p-2">
      <h1 className="flex h-1/6 flex-row items-center justify-center text-2xl font-bold">
        Some stats about your orders
      </h1>
      <StatsOverview stats={stats} />
    </div>
  );
}
