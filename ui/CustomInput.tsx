interface CustomInput extends React.HTMLProps<HTMLInputElement> {
  label: string;
  htmlFor: string;
}

export const CustomInput = ({ label, htmlFor, ...props }: CustomInput) => (
  <div className="relative">
    <input
      className="border-1 peer block w-full appearance-none rounded-lg border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm focus:border-blue-600 focus:outline-none focus:ring-0"
      placeholder=" "
      {...props}
    />
    <label
      htmlFor={htmlFor}
      className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform bg-slate-600 px-2 text-sm text-gray-400 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-white"
    >
      {label}
    </label>
  </div>
);
