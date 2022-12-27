import {
  SaddleFieldsAmountType,
  SaddleFieldsAmount,
} from '#/lib/types/saddleTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { stringify } from 'qs';
import { SubmitHandler, useForm } from 'react-hook-form';

export const useSaddleFieldAmountForm = () => {
  const { push } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SaddleFieldsAmountType>({
    defaultValues: { numberAmount: 0, textAmount: 0, selectionAmount: 0 },
    resolver: zodResolver(SaddleFieldsAmount),
  });

  const onSubmit: SubmitHandler<SaddleFieldsAmountType> = (data) => {
    const query = stringify(data, {
      encodeValuesOnly: true,
      addQueryPrefix: true,
    });
    push(`/saddles/create/new${query}`);
  };

  return { register, handleSubmit: () => handleSubmit(onSubmit), errors };
};
