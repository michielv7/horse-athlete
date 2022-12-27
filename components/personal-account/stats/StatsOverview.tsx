import { StatsType } from '#/lib/types/personalAccount';

import { StatDetail } from './StatDetail';

export const StatsOverview = ({ stats }: { stats: StatsType }) => {
  return <StatDetail stats={stats} />;
};
