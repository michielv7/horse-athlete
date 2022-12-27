import { fetchData } from '#/lib/helpers/fetch';
import { EditUserForm, User, UserWithIdType } from '#/lib/types/userOverview';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

export const useUserEditForm = ({ user }: { user: EditUserForm }) => {
  const [message, setMessage] = useState('');
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<EditUserForm>({
    defaultValues: user,
  });

  const onSubmit: SubmitHandler<EditUserForm> = (data) =>
    fetchData({
      url: `/api/users/${user.id}`,
      method: 'PUT',
      authorized: true,
      body: data,
    })
      .then(User.omit({ password: true }).parse)
      .then(() => push('/user-overview'))
      .catch(() => setMessage('Something went wrong updating the user'));

  return {
    register,
    handleSubmit: () => handleSubmit(onSubmit),
    message,
    isSubmitting,
  };
};
