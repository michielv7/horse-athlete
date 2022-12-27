import { StatsType } from 'types/personalAccount';
import { MultiStatDetail } from './MultiStatDetail';
import { SingleStatDetail } from './SingleStatDetail';

export const StatDetail = ({ stats }: { stats: StatsType }) => {
  return (
    <div className="grid h-5/6 grid-cols-2 border">
      <SingleStatDetail statName={'Total Orders'} stat={stats.totalOrders} />
      <MultiStatDetail stats={stats.orderStatuses} />
    </div>
  );
};
