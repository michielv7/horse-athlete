'use client';

import { useResetPasswordForm } from '#/hooks/reset-password/useResetPasswordForm';
import { Button } from '#/ui/SubmitButton';
import { useRouter, useSearchParams } from 'next/navigation';

export const ResetPasswordForm = () => {
  const code = useSearchParams().get('code') ?? '';
  const { back } = useRouter();
  const { register, handleSubmit, errors } = useResetPasswordForm({ code });

  if (!code)
    return (
      <div className="flex w-full flex-col items-center justify-center rounded-md bg-slate-600">
        <p>You need a specific code on this page</p>
        <button
          onClick={() => back()}
          className="rounded-md bg-slate-500 p-3 hover:bg-slate-800"
        >
          Please go back
        </button>
      </div>
    );

  return (
    <form
      onSubmit={handleSubmit()}
      className="mx-auto grid w-1/2 grid-cols-2 items-center gap-y-2"
    >
      <ul className="col-span-2 flex flex-col items-center text-red-500">
        <li>{errors.password?.message}</li>
        <li>{errors.passwordConfirmation?.message}</li>
      </ul>
      <label htmlFor="password">Password</label>
      <input
        type="password"
        {...register('password')}
        className="rounded-md text-black"
      />

      <label htmlFor="passwordConfirmation">Confirm password</label>
      <input
        type="password"
        {...register('passwordConfirmation')}
        className="rounded-md text-black"
      />

      <Button
        type="submit"
        text="Reset password"
        isLoading={false}
        className="col-span-2 mt-2 flex flex-row items-center justify-center rounded-md bg-slate-500 p-2 hover:bg-slate-800"
      />
    </form>
  );
};
