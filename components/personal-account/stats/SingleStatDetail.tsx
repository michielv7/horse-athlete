export const SingleStatDetail = ({
  statName,
  stat,
}: {
  statName: string;
  stat: Number;
}) => {
  return (
    <div className="flex flex-col items-center justify-evenly border">
      <h1 className="text-2xl font-bold">{statName}</h1>
      <p className="text-lg font-bold">{stat.toString()}</p>
    </div>
  );
};
