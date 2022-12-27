'use client';

import { usePasswordForm } from '#/hooks/personal-account/usePasswordForm';
import { Button } from '#/ui/SubmitButton';

export const PasswordForm = () => {
  const { register, handleSubmit, errors, message } = usePasswordForm();
  return (
    <form
      className="mx-auto mt-4 grid w-1/2 grid-flow-row space-y-2"
      onSubmit={handleSubmit()}
    >
      <ul className="flex flex-col items-center justify-center text-red-500">
        <li>{errors.currentPassword?.message}</li>
        <li>{errors.password?.message}</li>
        <li>{errors.passwordConfirmation?.message}</li>
        <li>{message}</li>
      </ul>
      <label htmlFor="currentPassword">Current Password</label>
      <input
        type="password"
        id="currentPassword"
        className="form-input mb-3 rounded-md text-black"
        {...register('currentPassword', { required: true })}
      />
      <label htmlFor="password">New Password</label>
      <input
        type="password"
        id="password"
        className="form-input mb-3 rounded-md text-black"
        {...register('password', { required: true })}
      />

      <label htmlFor="passwordConfirmation">Confirm password</label>
      <input
        type="password"
        id="passwordConfirmation"
        className="form-input mb-3 rounded-md text-black"
        {...register('passwordConfirmation', { required: true })}
      />
      <Button
        type="submit"
        text="Change password"
        isLoading={false}
        className="flex w-1/4 flex-row items-center justify-center justify-self-center rounded-md bg-slate-800 p-2 hover:bg-slate-900"
      />
    </form>
  );
};
