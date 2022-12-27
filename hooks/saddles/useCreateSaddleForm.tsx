import { fetchData } from '#/lib/helpers/fetch';
import { processAttributes } from '#/lib/helpers/saddles/proccessInput';
import { SaddleBody } from '#/lib/types/saddleTypes';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { ZodError } from 'zod';

export const useCreateSaddleForm = ({
  update = false,
  saddleInfo,
}: {
  update: boolean;
  saddleInfo?: {
    saddleId: number;
    name: string;
    description: string;
    basePrice: number;
  };
}) => {
  const [name, setName] = useState(saddleInfo?.name ?? '');
  const [description, setDescription] = useState(saddleInfo?.description ?? '');
  const [basePrice, setBasePrice] = useState(saddleInfo?.basePrice ?? 0);
  const [errors, setErrors] = useState<string[]>([]);
  const { push } = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const body = {
      name,
      description,
      basePrice,
    };
    processAttributes(body);

    const result = SaddleBody.safeParse(body);
    if (!result.success) return showErrors(result.error);

    await fetchData({
      url: `/api/saddles${update ? '/' + saddleInfo?.saddleId : ''}`,
      method: update ? 'PUT' : 'POST',
      body: { data: result.data },
      authorized: true,
    });

    push('/saddles');
  };

  const showErrors = (formErrors: ZodError) => {
    for (let error of formErrors.errors)
      setErrors((oldArr) => [...oldArr, error.message]);
  };

  return { setName, setDescription, setBasePrice, handleSubmit, errors };
};
