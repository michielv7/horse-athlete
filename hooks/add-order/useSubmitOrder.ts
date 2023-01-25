import { fetchData } from '#/lib/helpers/fetch';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';

export const useSubmitOrder = ({
  saddleId,
  userId,
}: {
  saddleId: string;
  userId: string;
}) => {
  const { push } = useRouter();
  const handleSubmitOrder = async (e: FormEvent) => {
    e.preventDefault();
    const keys: string[] = JSON.parse(localStorage.getItem('keys')!);
    const formData = new FormData(
      document.querySelector<HTMLFormElement>('form')!,
    );

    const orderAttributes: Record<string, string | number> = {};

    for (let key of keys) {
      orderAttributes[key.replaceAll('-', ' ')] = formData.get(key)?.toString() ?? "weird";
    }

    const data = {
      orderAttributes,
      saddleFitter: userId,
      orderStatus: 3,
      saddle: saddleId,
    };

    await fetchData({
      url: '/api/orders',
      method: 'POST',
      body: { data },
      authorized: true,
    })
    // .then(() => push('/order-overview'));
  };

  return { handleSubmitOrder };
};
