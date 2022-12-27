'use client';

import { useSaddleFieldAmountForm } from '#/hooks/saddles/useSaddleFieldAmountForm';

export const SaddleFieldAmountForm = () => {
  const { register, handleSubmit, errors } = useSaddleFieldAmountForm();
  return (
    <form
      className="mx-auto grid w-1/2 grid-cols-2 items-center gap-1 rounded-md bg-slate-600 p-4 text-white"
      onSubmit={handleSubmit()}
    >
      <style jsx>{`
        input {
          color: black;
        }
      `}</style>
      <h1 className="col-span-2 mb-3 text-center text-2xl font-bold">
        Create a new saddle
      </h1>
      <label htmlFor="textInputs">Amount of text fields</label>
      <input
        type="number"
        id="textInputs"
        {...register('textAmount', { min: 0 })}
      />
      <p className="col-span-2 place-self-end text-red-500">
        {errors.textAmount?.message}
      </p>

      <label htmlFor="numberInputs">Amount of number fields</label>
      <input
        type="number"
        id="numberInputs"
        {...register('numberAmount', { min: 0 })}
      />
      <p className="col-span-2 place-self-end text-red-500">
        {errors.numberAmount?.message}
      </p>

      <label htmlFor="optionInputs">Amount of selection fields</label>
      <input
        type="number"
        id="optionInputs"
        {...register('selectionAmount', { min: 0 })}
      />
      <p className="col-span-2 place-self-end text-red-500">
        {errors.selectionAmount?.message}
      </p>

      <button
        type="submit"
        className="col-span-2 mx-auto mt-2 w-1/4 rounded-md bg-slate-500 hover:bg-slate-800"
      >
        Create
      </button>
    </form>
  );
};
