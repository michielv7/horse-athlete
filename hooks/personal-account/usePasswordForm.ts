import { fetchData } from '#/lib/helpers/fetch';
import { Login } from '#/lib/types/login';
import {
  PasswordChangeType,
  PasswordChange,
} from '#/lib/types/personalAccount';
import { zodResolver } from '@hookform/resolvers/zod';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';

export const usePasswordForm = () => {
  const { back } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordChangeType>({
    resolver: zodResolver(PasswordChange),
  });

  const onSubmit: SubmitHandler<PasswordChangeType> = (data) =>
    toast.promise(
      fetchData({
        url: '/api/auth/change-password',
        method: 'POST',
        authorized: true,
        body: data,
      }).then(Login.parse),
      {
        loading: 'Updating your password...',
        success: (data) => {
          setCookie('user', data, {
            path: '/',
            maxAge: 3_600 * 4,
            sameSite: true,
          });

          back();
          return 'Updated your password';
        },
        error: 'There was an error updating your password',
      },
    );

  return {
    register,
    handleSubmit: () => handleSubmit(onSubmit),
    errors,
  };
};
