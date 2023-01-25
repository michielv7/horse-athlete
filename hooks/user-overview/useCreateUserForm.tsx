import { fetchData } from '#/lib/helpers/fetch';
import { UserCreateFormType, User } from '#/lib/types/userOverview';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

export const useCreateUserForm = () => {
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
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
    toast.promise(
      fetchData({
        url: '/api/users',
        method: 'POST',
        authorized: true,
        body: data,
      }).then(User.omit({ password: true }).parse),
      {
        loading: 'Creating user...',
        success: () => {
          push('/user-overview');
          return 'User created!';
        },
        error: 'There was an error creating the user',
      },
    );

  return {
    register,
    handleSubmit: () => handleSubmit(onSubmit),
    isSubmitting,
  };
};
