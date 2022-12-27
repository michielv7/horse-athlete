'use client';

import { fetchData } from '#/lib/helpers/fetch';
import { User } from '#/lib/types/userOverview';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

export const BlockingButton = ({
  userId,
  blocking,
}: {
  userId: number;
  blocking: boolean;
}) => {
  const { refresh } = useRouter();
  const [, startTransition] = useTransition();

  const handleUserChangeState = async () => {
    const message = confirm(
      `You sure you want to ${blocking ? 'block' : 'unblock'} this person?`,
    );
    if (!message) return;
    const data = await fetchData({
      url: `/api/users/${userId}`,
      method: 'PUT',
      authorized: true,
      body: { blocked: blocking },
    })
      .then(User.omit({ password: true }).parse)
      .catch(() => {
        alert(
          `Something went wrong while ${
            blocking ? 'blocking' : 'unblocking'
          } the user`,
        );
        return false;
      });

    if (data) startTransition(() => refresh());
  };

  return (
    <span
      className={clsx('font-bold hover:cursor-pointer', {
        'text-red-500': blocking,
        'text-green-300': !blocking,
      })}
      onClick={handleUserChangeState}
    >
      {blocking ? 'Block' : 'Unblock'}
    </span>
  );
};
