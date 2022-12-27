import { fetchData } from '#/lib/helpers/fetch';
import { Login } from '#/lib/types/login';
import {
  PasswordChangeType,
  PasswordChange,
} from '#/lib/types/personalAccount';
import { zodResolver } from '@hookform/resolvers/zod';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

export const usePasswordForm = () => {
  const { back } = useRouter();
  const [message, setMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordChangeType>({
    resolver: zodResolver(PasswordChange),
  });

  const onSubmit: SubmitHandler<PasswordChangeType> = (data) =>
    fetchData({
      url: '/api/auth/change-password',
      method: 'POST',
      authorized: true,
      body: data,
    })
      .then(Login.parse)
      .then((res) => {
        setCookie('user', res, {
          path: '/',
          maxAge: 3_600 * 4,
          sameSite: true,
        });

        back();
      })
      .catch(() => setMessage('Your current password is not correct'));

  return {
    register,
    handleSubmit: () => handleSubmit(onSubmit),
    errors,
    message,
  };
};
