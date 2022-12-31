import { fetchData } from '#/lib/helpers/fetch';
import { ForgotPasswordFormType, ForgotPasswordForm } from '#/lib/types/login';
import { ForgotPasswordRes } from '#/lib/types/personalAccount';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-hot-toast';

export const useForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormType>({
    resolver: zodResolver(ForgotPasswordForm),
  });
  const onSubmit: SubmitHandler<ForgotPasswordFormType> = (data) =>
    toast.promise(
      fetchData({
        url: '/api/auth/forgot-password',
        method: 'POST',
        authorized: false,
        body: data,
      }).then(ForgotPasswordRes.parse),
      {
        loading: 'Sending email...',
        success: 'Email has been sent!',
        error: 'There was an error sending an email',
      },
    );

  return {
    register,
    handleSubmit: () => handleSubmit(onSubmit),
    errors,
  };
};
