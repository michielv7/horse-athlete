import { fetchData } from '#/lib/helpers/fetch';
import { ForgotPasswordFormType, ForgotPasswordForm } from '#/lib/types/login';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';

export const useForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormType>({
    resolver: zodResolver(ForgotPasswordForm),
  });

  const { push } = useRouter();

  const onSubmit: SubmitHandler<ForgotPasswordFormType> = (data) =>
    fetchData({
      url: '/api/auth/forgot-password',
      method: 'POST',
      authorized: false,
      body: data,
    }).then(() => {
      alert('Please check your email for the link to reset your password!');
      push('/');
    });

  return {
    register,
    handleSubmit: () => handleSubmit(onSubmit),
    errors,
  };
};
