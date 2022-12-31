'use client';

import { useCreateUserForm } from '#/hooks/user-overview/useCreateUserForm';
import { Button } from '#/ui/SubmitButton';

export const CreateUserForm = () => {
  const { register, handleSubmit, isSubmitting } = useCreateUserForm();
  return (
    <>
      <form
        className=" mx-auto grid w-1/2 grid-cols-2 items-center justify-center gap-y-2"
        onSubmit={handleSubmit()}
      >
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          className="text-black"
          {...register('username')}
        />
        <label htmlFor="email">E-email</label>
        <input
          type="email"
          id="email"
          className="text-black"
          {...register('email')}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          className="text-black"
          {...register('password')}
        />
        <div className="flex flex-row items-center gap-2">
          <input type="checkbox" id="blocked" {...register('blocked')} />
          <label htmlFor="blocked">Blocked?</label>
        </div>
        <div className="flex flex-row items-center gap-2">
          <input
            type="checkbox"
            id="isSubscribed"
            {...register('isSubscribed')}
          />
          <label htmlFor="isSubscribed">Is Subscribed?</label>
        </div>
        <div className="flex flex-row items-center gap-2">
          <input type="checkbox" id="confirmed" {...register('confirmed')} />
          <label htmlFor="confirmed">Confirmed?</label>
        </div>
        <Button
          type="submit"
          text={'Add user'}
          isLoading={isSubmitting}
          className="col-span-2 mx-auto flex w-1/2 flex-row items-center justify-center rounded-md bg-slate-500 p-2 hover:bg-slate-800"
        />
      </form>
    </>
  );
};
