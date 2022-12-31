'use client';

import { fetchData } from '#/lib/helpers/fetch';
import { User } from '#/lib/types/userOverview';
import clsx from 'clsx';
import { mutate } from 'swr';
import toast from 'react-hot-toast';

export const BlockingButton = ({
  userId,
  blocking,
}: {
  userId: number;
  blocking: boolean;
}) => {
  const askToConfirm = () =>
    toast((t) => (
      <span className="grid grid-cols-2 gap-2">
        <p className="col-span-2">
          You sure you want to {blocking ? 'block' : 'unblock'} this person?
        </p>
        <button
          className="block rounded-md border p-2 hover:bg-gray-300"
          onClick={() => toast.dismiss(t.id)}
        >
          No
        </button>
        <button
          className="block rounded-md border bg-slate-600/50 p-2 hover:bg-slate-800/50"
          onClick={async () => {
            handleUserChangeState();
            toast.remove(t.id);
          }}
        >
          Yes
        </button>
      </span>
    ));

  const handleUserChangeState = () =>
    toast.promise(
      fetchData({
        url: `/api/users/${userId}`,
        method: 'PUT',
        authorized: true,
        body: { blocked: blocking },
      }).then(User.omit({ password: true }).parse),
      {
        loading: `${blocking ? 'Blocking' : 'Unblocking'} the user...`,
        success: ({ username }) => {
          mutate(
            (key) => typeof key === 'string' && key.startsWith('/api/users'),
            undefined,
          );
          return `${blocking ? 'Blocked' : 'Unblocked'} ${username}!`;
        },
        error: `Something went wrong while ${
          blocking ? 'blocking' : 'unblocking'
        } the user`,
      },
    );

  return (
    <>
      <span
        className={clsx('font-bold hover:cursor-pointer', {
          'text-red-500': blocking,
          'text-green-300': !blocking,
        })}
        onClick={askToConfirm}
      >
        {blocking ? 'Block' : 'Unblock'}
      </span>
    </>
  );
};
