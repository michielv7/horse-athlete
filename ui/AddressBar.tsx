'use client';

import { Fragment } from 'react';
import { usePathname } from 'next/navigation';

const AddressBar = () => {
  const pathname = usePathname();

  return (
    <div className="flex w-full items-center space-x-2 rounded-xl border border-gray-800 bg-black px-4 py-3 text-gray-600">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="flex space-x-1 text-sm font-medium">
        <div>
          <span className="px-2 text-gray-500">horse-athlete.be</span>
        </div>
        {pathname ? (
          <>
            {pathname
              .split('/')
              .slice(1)
              .map((segment) => (
                <Fragment key={segment}>
                  <span className="text-gray-600">/</span>
                  <span>
                    <span
                      key={segment}
                      className="rounded-full px-1.5 py-0.5 text-gray-100"
                    >
                      {segment}
                    </span>
                  </span>
                </Fragment>
              ))}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default AddressBar;
