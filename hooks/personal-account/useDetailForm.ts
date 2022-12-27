import { fetchData } from '#/lib/helpers/fetch';
import {
  DetailsFormType,
  DetailsForm,
  UpdateResponse,
} from '#/lib/types/personalAccount';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

export const useDetailForm = () => {
  const searchParams = useSearchParams();
  const [message, setMessage] = useState('');
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
    fetchData({
      url: '/api/users/me',
      method: 'PUT',
      authorized: true,
      body: data,
    })
      .then(UpdateResponse.parse)
      .then(() => back())
      .catch(() => setMessage('There was a problem updating your profile'));

  return {
    register,
    handleSubmit: () => handleSubmit(onSubmit),
    errors,
    message,
  };
};
