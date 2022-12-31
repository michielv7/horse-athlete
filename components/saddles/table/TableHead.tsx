const cols = ['Name', 'Description', 'Action'];

export const TableHead = () => {
  return (
    <thead className="bg-slate-800 text-xs uppercase">
      <tr>
        {cols.map((name, i) => (
          <th key={i}>
            <p className="flex flex-row items-center justify-center gap-1 p-2">
              {name}
            </p>
          </th>
        ))}
      </tr>
    </thead>
  );
};
