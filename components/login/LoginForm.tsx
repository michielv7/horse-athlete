'use client';

import { useLoginForm } from '#/hooks/login/useLoginForm';
import { Button } from '#/ui/SubmitButton';
import Link from 'next/link';

export const LoginForm = () => {
  const { register, handleSubmit, errors, message } = useLoginForm();

  return (
    <>
      <form onSubmit={handleSubmit()}>
        <p className="mb-4 text-center text-black">
          Please login to your account
        </p>
        <ul className="pb-2 text-center font-bold text-red-600">
          <li>{errors.identifier?.message}</li>
          <li>{errors.password?.message}</li>
          <li>{message}</li>
        </ul>
        <div className="mb-4 flex flex-col items-center justify-center">
          <input
            type="text"
            className="form-control m-0 block w-[300px] rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
            placeholder="email"
            {...register('identifier')}
          />
        </div>
        <div className="mb-4 flex flex-col items-center justify-center">
          <input
            type="password"
            className="form-control m-0 block w-[300px] rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
            placeholder="password"
            {...register('password')}
          />
        </div>
        <div className="mb-12 pt-1 pb-1 text-center">
          <Button
            text="Sign in"
            isLoading={false}
            className="mx-auto mb-3 flex w-[300px] flex-row items-center justify-center  rounded px-6 py-2.5 text-xs font-medium uppercase leading-tight text-black shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:text-white hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
            type="submit"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
          />

          <Link className="block text-gray-500" href={'/login/forgot-password'}>
            Forgot password?
          </Link>
        </div>
      </form>
    </>
  );
};
