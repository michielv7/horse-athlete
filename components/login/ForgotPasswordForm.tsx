'use client';

import { useForgotPasswordForm } from '#/hooks/login/useForgotPasswordForm';
import { Button } from '#/ui/SubmitButton';

export const ForgotPasswordForm = () => {
  const { register, errors, handleSubmit } = useForgotPasswordForm();
  return (
    <form
      className="mx-auto grid w-1/2  grid-rows-2 p-3"
      onSubmit={handleSubmit()}
    >
      <p className="text-center font-bold text-red-500">
        {errors.email?.message}
      </p>
      <label htmlFor="email">E-mail</label>
      <input
        type="email"
        {...register('email')}
        className="rounded-md text-black"
      />

      <Button
        type="submit"
        text="Send email to reset password"
        className="mt-2 flex flex-row items-center justify-center rounded-md bg-slate-500 p-2 hover:bg-slate-800"
        isLoading={false}
      />
    </form>
  );
};
