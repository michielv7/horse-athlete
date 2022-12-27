import Link from 'next/link';

const buttonStyle =
  'rounded-md bg-slate-500 p-2 transition delay-150 duration-300 ease-in-out  hover:-translate-y-1 hover:scale-110  hover:bg-slate-800';

export default function Page() {
  return (
    <div className="rounded-md bg-slate-700 p-3 text-white">
      <h1 className="text-center text-xl font-bold">
        What would you like to do?
      </h1>
      <div className="selection mx-auto mt-4 flex w-3/4 flex-row justify-evenly">
        <Link href={'/add-order/choice/previous-order'} className={buttonStyle}>
          Copy a previous order
        </Link>
        <Link href={'/add-order/choice/saddle'} className={buttonStyle}>
          Choose a saddle to order
        </Link>
      </div>
    </div>
  );
}
