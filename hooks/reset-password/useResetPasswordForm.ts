import { useForm, SubmitHandler } from 'react-hook-form';
import {
  ResetPasswordFormType,
  ResetPasswordForm,
} from '#/lib/types/resetPassword';
import { zodResolver } from '@hookform/resolvers/zod';
import { setCookie } from 'cookies-next';
import { fetchData } from '#/lib/helpers/fetch';
import { Login } from '#/lib/types/login';
import { useRouter } from 'next/navigation';

export const useResetPasswordForm = ({ code }: { code: string }) => {
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormType>({
    defaultValues: { code },
    resolver: zodResolver(ResetPasswordForm),
  });

  const onSubmit: SubmitHandler<ResetPasswordFormType> = (data) =>
    fetchData({
      url: '/api/auth/reset-password',
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

        push('/home');
      });

  return {
    register,
    handleSubmit: () => handleSubmit(onSubmit),
    errors,
  };
};
