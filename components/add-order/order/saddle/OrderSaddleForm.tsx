'use client';

import { useSubmitOrder } from '#/hooks/add-order/useSubmitOrder';
import { saveNameKeysLocalStorage } from '#/lib/helpers/add-order/saveToLocalStorage';
import { SaddleType } from '#/lib/types/saddleTypes';
import { CustomInput } from '#/ui/CustomInput';
import { AttrProcess } from '../../AttrProccess';

export const SaddleOrderForm = ({
  saddle,
  userId,
}: {
  saddle: SaddleType;
  userId: string;
}) => {
  saveNameKeysLocalStorage(saddle.attributes.attributes);
  const { handleSubmitOrder } = useSubmitOrder({
    saddleId: saddle.id.toString(),
    userId,
  });
  console.log(userId);
  return (
    <form className="grid grid-flow-row gap-3" onSubmit={handleSubmitOrder}>
      <h2 className="border-b border-b-black pb-2 text-center text-xl font-bold">
        Information
      </h2>
      <CustomInput
        htmlFor="customersName"
        type="text"
        label="Customer's name *"
        id="customerName"
        required={true}
        name="customersName"
      />

      <CustomInput
        htmlFor="customersEmail"
        type="email"
        label="Customer's e-mail"
        id="customerEmail"
        name="customersEmail"
      />

      <CustomInput
        htmlFor="horseBreed"
        type="text"
        label="Horse breed"
        id="horseBreed"
        name="horseBreed"
      />

      <CustomInput
        htmlFor="horseHeight"
        type="text"
        label="Horse height"
        id="horseHeight"
        name="horseHeight"
      />

      <h2 className="border-b border-b-black pb-2 text-center text-xl font-bold">
        Saddle Information
      </h2>

      <CustomInput
        htmlFor="saddleName"
        type="text"
        label="Saddle name"
        id="saddleName"
        name="saddleName"
        value={saddle.attributes.name}
        disabled={true}
      />

      {saddle.attributes.attributes.map((attr, i) => (
        <AttrProcess key={i} attr={attr} />
      ))}

      <h2 className="border-b border-b-black pb-2 text-center text-xl font-bold">
        Additional Information
      </h2>

      <label htmlFor="notes">Notes</label>
      <textarea
        name="notes"
        id="notes"
        rows={2}
        className="rounded-md border-gray-300 bg-slate-600 focus:border-blue-500"
        placeholder="Place any additional notes you have here"
      ></textarea>

      <button
        type="submit"
        className="mx-auto w-1/3 rounded-md bg-slate-500 p-2 transition delay-150 duration-300 ease-in-out hover:-translate-y-1  hover:scale-110 hover:bg-slate-800"
      >
        Order
      </button>
    </form>
  );
};
