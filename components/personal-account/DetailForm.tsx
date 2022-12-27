'use client';

import { useDetailForm } from '#/hooks/personal-account/useDetailForm';
import { Button } from '#/ui/SubmitButton';

export const DetailForm = () => {
  const { register, handleSubmit, errors, message } = useDetailForm();
  return (
    <form
      className="mx-auto grid w-1/2 grid-flow-row"
      onSubmit={handleSubmit()}
    >
      <ul className="flex flex-col items-center text-red-500">
        <li>{message}</li>
        <li>{errors.username?.message}</li>
        <li>{errors.email?.message}</li>
        <li>{errors.isSubscribed?.message}</li>
      </ul>
      <label htmlFor="username">Your name</label>
      <input
        type="text"
        id="username"
        className="form-input mb-3 rounded-md text-black"
        {...register('username')}
      />

      <label htmlFor="email">Your e-mail</label>
      <input
        type="email"
        id="email"
        className="form-input mb-3 rounded-md text-black"
        {...register('email')}
      />

      <div className="mb-3">
        <label
          htmlFor="subscribed"
          className="inline-flex items-center justify-center"
        >
          <input
            type="checkbox"
            id="isSubscribed"
            className="form-checkbox mr-3 rounded-md align-middle"
            {...register('isSubscribed')}
          />
          Do you want to be subscribed?
        </label>
      </div>
      <Button
        text="Save"
        isLoading={false}
        type="submit"
        className="flex w-1/4 flex-row justify-center justify-self-center rounded-md bg-slate-800 p-2 hover:bg-slate-900"
      />
    </form>
  );
};
