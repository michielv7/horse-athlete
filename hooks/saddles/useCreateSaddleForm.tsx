import { fetchData } from '#/lib/helpers/fetch';
import { processAttributes } from '#/lib/helpers/saddles/proccessInput';
import { Saddle, SaddleBody } from '#/lib/types/saddleTypes';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { toast } from 'react-hot-toast';
import { ZodError } from 'zod';

interface IBaseSaddle {
  name: string;
  description: string;
  basePrice: number;
}

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
  const [baseSaddle, setBaseSaddle] = useState<IBaseSaddle>({
    ...(saddleInfo ?? { name: '', description: '', basePrice: 0 }),
  });
  const [errors, setErrors] = useState<string[]>([]);
  const { push } = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const body = { ...baseSaddle };
    processAttributes(body);

    const result = SaddleBody.safeParse(body);
    if (!result.success) return showErrors(result.error);
    toast.promise(
      fetchData({
        url: `/api/saddles${update ? '/' + saddleInfo?.saddleId : ''}`,
        method: update ? 'PUT' : 'POST',
        body: { data: result.data },
        authorized: true,
      }).then((res) => Saddle.parse(res.data)),
      {
        loading: `${update ? 'Updating' : 'Creating'} saddle...`,
        success: (data) => {
          push('/saddles');
          return `${update ? 'Updated' : 'Created'} saddle (${
            data.attributes.name
          })`;
        },
        error: `There was an error ${
          update ? 'updating' : 'creating'
        } the saddle`,
      },
    );
  };

  const showErrors = (formErrors: ZodError) => {
    for (let error of formErrors.errors)
      setErrors((oldArr) => [...oldArr, error.message]);
  };

  return { setBaseSaddle, handleSubmit, errors };
};
