import { useRouter } from 'next/navigation';
import { stringify } from 'qs';
import { FormEvent } from 'react';

export const useSelectSaddle = () => {
  const { push } = useRouter();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const saddleId =
      document.querySelector<HTMLSelectElement>('form select')
        ?.selectedOptions[0].id!;
    const query = stringify(
      { saddleId },
      { encodeValuesOnly: true, addQueryPrefix: true },
    );

    push(`/add-order/order/saddle${query}`);
  };

  return { handleSubmit };
};
