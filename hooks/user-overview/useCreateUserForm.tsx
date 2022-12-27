import { fetchData } from '#/lib/helpers/fetch';
import { UserCreateFormType, User } from '#/lib/types/userOverview';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export const useCreateUserForm = () => {
  const { push } = useRouter();
  const [message, setMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserCreateFormType>({
    defaultValues: {
      type: 'fitter',
      blocked: false,
      confirmed: true,
      provider: 'local',
    },
    resolver: zodResolver(User),
  });

  const onSubmit: SubmitHandler<UserCreateFormType> = (data) =>
    fetchData({
      url: '/api/users',
      method: 'POST',
      authorized: true,
      body: data,
    })
      .then(User.omit({ password: true }).parse)
      .then(() => push('/user-overview'))
      .catch(() => setMessage('There was an error creating the user'));

  return {
    register,
    handleSubmit: () => handleSubmit(onSubmit),
    message,
    errors,
    isSubmitting,
  };
};
