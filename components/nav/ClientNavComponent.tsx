'use client';

import { useRouter } from 'next/navigation';
import { deleteCookie } from 'cookies-next';
import clsx from 'clsx';
import Link from 'next/link';

export const ClientNavComponent = ({
  item,
  isActive,
}: {
  item: any;
  isActive: boolean;
}) => {
  const { push, refresh } = useRouter();
  return (
    <div>
      {item.isDisabled ? (
        <div
          className="block rounded-md px-3 py-2 text-sm font-medium text-gray-600"
          title="Coming Soon"
        >
          {item.name}
        </div>
      ) : (
        <button
          className={clsx(
            'block rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-800 hover:text-gray-100',
            {
              'text-gray-400': !isActive,
              'text-white': isActive,
            },
          )}
          onClick={() => {
            deleteCookie('user', { path: '/' });
            console.log('delete cookie..');
            push('/');
            refresh()
          }}
        >
          {item.name}
        </button>
      )}
    </div>
  );
};
