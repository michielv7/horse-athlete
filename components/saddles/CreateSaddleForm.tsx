'use client';

import { useCreateSaddleForm } from '#/hooks/saddles/useCreateSaddleForm';
import { BasicInput, ChoiceInput, NumberInput } from './SaddleFormInputs';

export const CreateSaddleForm = ({
  fieldAmounts: { textAmount, numberAmount, selectionAmount },
}: {
  fieldAmounts: {
    textAmount: string;
    numberAmount: string;
    selectionAmount: string;
  };
}) => {
  const childDivStyle = 'grid grid-cols-2 items-center border p-3 rounded-md';
  const { setName, setDescription, setBasePrice, handleSubmit, errors } =
    useCreateSaddleForm({ update: false });

  return (
    <>
      <style>
        {`
          input,
          select,
          textarea {
            color: black;
          }
        `}
      </style>
      <ul className="col-span-2 text-center text-xl font-bold text-red-600">
        {errors.map((err, i) => (
          <li key={i}>{err}</li>
        ))}
      </ul>
      <form
        id="main-form"
        className="col-span-2 mt-2 grid grid-cols-2 items-center gap-1"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Saddle Name</label>
        <input
          type="text"
          name="name"
          id="name"
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          id="description"
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label htmlFor="basePrice">Base price</label>
        <input
          type="number"
          name="basePrice"
          id="basePrice"
          min={0}
          onChange={(e) => setBasePrice(parseInt(e.target.value))}
          required
        />
        <div
          id="customFields"
          className="col-span-2 my-2 grid grid-cols-3 gap-4"
        >
          {[...Array(parseInt(textAmount))].map((_, i) => (
            <div
              key={`text-${i + 1}`}
              id={`text-${i + 1}`}
              className={childDivStyle}
              data-type="text"
            >
              <BasicInput id={i + 1} type="text" />
            </div>
          ))}

          {[...Array(parseInt(numberAmount))].map((_, i) => (
            <div
              key={`string-${i + 1}`}
              id={`string-${i + 1}`}
              className={childDivStyle}
              data-type="number"
            >
              <NumberInput id={i + 1} type="number" />
            </div>
          ))}

          {[...Array(parseInt(selectionAmount))].map((_, i) => (
            <div
              key={`selection-${i + 1}`}
              id={`selection-${i + 1}`}
              className={childDivStyle}
              data-type="selection"
            >
              <ChoiceInput id={i + 1} type="selection" />
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="col-span-2 rounded-md bg-slate-500 p-2 hover:bg-slate-800"
        >
          Add Saddle
        </button>
      </form>
    </>
  );
};
