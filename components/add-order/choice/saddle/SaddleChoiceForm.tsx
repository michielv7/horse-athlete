'use client';

import { useSelectSaddle } from '#/hooks/add-order/useSelectSaddle';
import { SaddlesDataType } from '#/lib/types/addOrder';

export const SaddleChoiceForm = ({ saddles }: { saddles: SaddlesDataType }) => {
  const { handleSubmit } = useSelectSaddle();
  return (
    <form
      id={'saddle-choice'}
      onSubmit={handleSubmit}
      className="mx-auto grid w-3/4 grid-cols-2 gap-3"
    >
      <div className="grid grid-rows-2 items-center">
        <label htmlFor="options">Saddles</label>
        <select
          name="options"
          id="options"
          className="text-black"
          defaultValue={''}
          onChange={() => {
            document.querySelector<HTMLInputElement>('#description')!.value =
              document
                .querySelector<HTMLSelectElement>('#options')
                ?.selectedOptions[0].getAttribute('data-description')!;
          }}
          required
        >
          <option value={''} hidden>
            Select a saddle
          </option>
          {saddles.map((saddle) => (
            <option
              key={saddle.id}
              id={saddle.id.toString()}
              data-description={saddle.attributes.description}
            >
              {saddle.attributes.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-rows-2 items-center">
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          id="description"
          className="text-black"
          disabled
        />
      </div>
      <button
        type="submit"
        className="col-span-2 mx-auto w-1/3 rounded-md bg-slate-500 p-2 transition delay-150 duration-300 ease-in-out hover:-translate-y-1  hover:scale-110 hover:bg-slate-800"
      >
        Choose saddle
      </button>
    </form>
  );
};
