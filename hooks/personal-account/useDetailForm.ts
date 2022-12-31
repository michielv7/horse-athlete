import { fetchData } from '#/lib/helpers/fetch';
import {
  DetailsFormType,
  DetailsForm,
  UpdateResponse,
} from '#/lib/types/personalAccount';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { mutate } from 'swr';

export const useDetailForm = () => {
  const searchParams = useSearchParams();
  const profileData = {
    username: searchParams.get('username')!,
    email: searchParams.get('email')!,
    isSubscribed: searchParams.get('isSubscribed') === 'true',
  };
  const { back } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DetailsFormType>({
    defaultValues: profileData,
    resolver: zodResolver(DetailsForm),
  });

  const onSubmit: SubmitHandler<DetailsFormType> = (data) =>
    toast.promise(
      fetchData({
        url: '/api/users/me',
        method: 'PUT',
        authorized: true,
        body: data,
      }).then(UpdateResponse.parse),
      {
        loading: 'Updating your details',
        success: (data) => {
          mutate(
            (key) => typeof key === 'string' && key.startsWith('/api/users/me'),
            undefined,
            { optimisticData: data, revalidate: true },
          );
          back();
          return 'Updated your details';
        },
        error: 'There was an error updating your details',
      },
    );

  return {
    register,
    handleSubmit: () => handleSubmit(onSubmit),
    errors,
  };
};
