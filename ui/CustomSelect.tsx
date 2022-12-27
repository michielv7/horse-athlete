interface CustomSelect extends React.HTMLProps<HTMLSelectElement> {
  children: React.ReactNode;
  htmlFor: string;
  text: string;
}

export const CustomSelect = ({
  children,
  htmlFor,
  text,
  ...props
}: CustomSelect) => {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-sm font-medium text-gray-400 "
      >
        {text}
      </label>
      <select
        {...props}
        className="block w-full rounded-lg border border-gray-300 bg-slate-600 p-2.5 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
      >
        <option hidden value={' '}>
          Choose a {text.toLowerCase()}
        </option>
        {children}
      </select>
    </div>
  );
};
