import { fetchData } from '#/lib/helpers/fetch';
import { EditUserForm, User } from '#/lib/types/userOverview';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-hot-toast';

export const useUserEditForm = ({ user }: { user: EditUserForm }) => {
  const {
    register,
    handleSubmit,
  } = useForm<EditUserForm>({
    defaultValues: user,
  });

  const onSubmit: SubmitHandler<EditUserForm> = (data) =>
    toast.promise(
      fetchData({
        url: `/api/users/${user.id}`,
        method: 'PUT',
        authorized: true,
        body: data,
      }).then(User.omit({ password: true }).parse),
      {
        loading: 'Updating the user...',
        success: (data) => `Succussfully updated ${data.username}`,
        error: 'There was an error updating the user',
      },
    );

  return {
    register,
    handleSubmit: () => handleSubmit(onSubmit),
  };
};
