'use client';

import { useCreateSaddleForm } from '#/hooks/saddles/useCreateSaddleForm';
import { SaddleType } from '#/lib/types/saddleTypes';
import { Button } from '#/ui/SubmitButton';
import { BasicInput, ChoiceInput, NumberInput } from './SaddleFormInputs';

export const SaddleEditForm = ({ saddle }: { saddle: SaddleType }) => {
  const {
    id,
    attributes: { name, basePrice, description },
  } = saddle;

  const { setBaseSaddle, handleSubmit, errors } = useCreateSaddleForm({
    update: true,
    saddleInfo: { saddleId: id, name, description, basePrice },
  });

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
        className="col-span-2 mt-2 grid grid-cols-2 items-center gap-1"
        onSubmit={handleSubmit}
      >
        <label htmlFor="saddleName">Saddle name</label>
        <input
          type="text"
          name="saddleName"
          id="saddleName"
          defaultValue={saddle.attributes.name}
          onChange={(e) =>
            setBaseSaddle((old) => ({ ...old, name: e.target.value }))
          }
        />

        <label htmlFor="saddleDescription">Saddle description</label>
        <input
          type="text"
          name="saddleDescription"
          id="saddleDescription"
          defaultValue={saddle.attributes.description}
          onChange={(e) =>
            setBaseSaddle((old) => ({ ...old, description: e.target.value }))
          }
        />

        <label htmlFor="saddleBasePrice">Saddle base price</label>
        <input
          type="number"
          name="saddleBasePrice"
          id="saddleBasePrice"
          defaultValue={saddle.attributes.basePrice}
          onChange={(e) =>
            setBaseSaddle((old) => ({
              ...old,
              basePrice: parseFloat(e.target.value),
            }))
          }
        />

        <div
          id="customFields"
          className="col-span-2 my-2 grid grid-cols-3 gap-4"
        >
          {saddle.attributes.attributes.map((attribute, i) => {
            if (attribute.type === 'text')
              return (
                <div
                  key={i}
                  className="grid grid-cols-2 items-center rounded-md border p-3"
                  id={`${attribute.type}-${i + 1}`}
                  data-type={attribute.type}
                >
                  <BasicInput
                    id={i + 1}
                    type={attribute.type}
                    defaultValues={attribute}
                  />
                </div>
              );

            if (attribute.type === 'number')
              return (
                <div
                  key={i}
                  className="grid grid-cols-2 items-center rounded-md border p-3"
                  id={`${attribute.type}-${i + 1}`}
                  data-type={attribute.type}
                >
                  <NumberInput
                    id={i + 1}
                    type={attribute.type}
                    defaultValues={attribute}
                  />
                </div>
              );

            if (attribute.type === 'selection')
              return (
                <div
                  key={i}
                  className="grid grid-cols-2 items-center rounded-md border p-3"
                  id={`${attribute.type}-${i + 1}`}
                  data-type={attribute.type}
                >
                  <ChoiceInput
                    id={i + 1}
                    type={attribute.type}
                    defaultValues={attribute}
                  />
                </div>
              );
          })}
        </div>
        <Button
          text="Edit"
          type="submit"
          isLoading={false}
          className="col-span-2 rounded-md bg-slate-500 p-2 hover:bg-slate-800"
        />
      </form>
    </>
  );
};
