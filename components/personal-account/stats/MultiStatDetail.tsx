import { SingleStatDetail } from './SingleStatDetail';

export const MultiStatDetail = ({ stats }: { stats: Object }) => {
  const entries = Object.entries(stats);

  return (
    <div className="grid grid-cols-2">
      {entries.map(([label, value]) => (
        <SingleStatDetail key={label} statName={label} stat={value} />
      ))}
    </div>
  );
};
