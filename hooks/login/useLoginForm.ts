import { fetchData } from '#/lib/helpers/fetch';
import { LoginFormType, LoginForm, Login } from '#/lib/types/login';
import { zodResolver } from '@hookform/resolvers/zod';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

export const useLoginForm = () => {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(LoginForm),
  });

  const onSubmit: SubmitHandler<LoginFormType> = (data) =>
    fetchData({
      url: '/api/auth/local',
      method: 'POST',
      authorized: false,
      body: data,
    })
      .then(Login.parse)
      .then((res) => {
        setCookie('user', res, {
          sameSite: true,
          maxAge: 3_600 * 4,
          path: '/',
        });
        router.push('/');
      })
      .catch(() => setMessage('Incorrect credentials'));

  return {
    register,
    handleSubmit: () => handleSubmit(onSubmit),
    errors,
    message,
  };
};
