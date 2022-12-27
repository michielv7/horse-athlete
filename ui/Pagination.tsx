import clsx from 'clsx';
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from '@heroicons/react/24/outline';
import { Dispatch, SetStateAction } from 'react';

export const Pagination = ({
  pagination: {
    pageCount,
    multiplyValue = 4,
    page,
    setPage,
    pageSize,
    setPageSize,
  },
}: {
  pagination: {
    pageCount: number;
    multiplyValue: number;
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
    pageSize: number;
    setPageSize: Dispatch<SetStateAction<number>>;
  };
}) => {
  return (
    <>
      <div className="pagination grid grid-cols-[10%_80%_10%] content-center">
        <div className="pageSize grid grid-cols-1">
          <select
            name="pageSize"
            id="pageSize"
            defaultValue={pageSize}
            className="form-select w-2/3 self-end rounded-md bg-slate-600"
            onChange={(e) => setPageSize(parseInt(e.currentTarget.value))}
          >
            {[...Array(10)].map((_, i) => (
              <option key={i} value={(i + 1) * multiplyValue}>
                {(i + 1) * multiplyValue}
              </option>
            ))}
          </select>
        </div>

        <div className="pagination mx-auto mt-4 flex w-1/5 flex-row justify-around rounded-md bg-slate-600 p-2">
          <button
            disabled={page - 1 === 0}
            onClick={() => setPage((old) => old - 1)}
          >
            <ArrowLongLeftIcon className="h-5 w-5" />
          </button>

          {[...Array(pageCount)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={clsx({
                'border-b border-b-slate-900': i + 1 === page,
              })}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={page + 1 > pageCount}
            onClick={() => setPage((old) => old + 1)}
          >
            <ArrowLongRightIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </>
  );
};
