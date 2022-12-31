'use client';

import { useSubmitOrder } from '#/hooks/add-order/useSubmitOrder';
import { saveNameKeysLocalStorage } from '#/lib/helpers/add-order/saveToLocalStorage';
import { CustomSaddleAttributesArrayType } from '#/lib/types/saddleTypes';
import { AttrProcess } from '../../AttrProccess';
import { LoadingDefaultValues } from './LoadingDefaultValues';

export const PreviousOrderForm = ({
  data,
  orderAttributes,
  saddleAttributes,
}: {
  data: { saddleId: string; userId: string };
  orderAttributes: Record<string, string | number>;
  saddleAttributes: CustomSaddleAttributesArrayType;
}) => {
  const { handleSubmitOrder } = useSubmitOrder(data);
  saveNameKeysLocalStorage(saddleAttributes);
  return (
    <form onSubmit={handleSubmitOrder}>
      <style>{`
        input,
        textarea,
        select {
          color: black;
        }
      `}</style>
      <LoadingDefaultValues orderAttributes={orderAttributes} />
      {saddleAttributes.map((attr, i) => (
        <div key={i}>
          <AttrProcess attr={attr} def={orderAttributes[attr.name]} />
        </div>
      ))}
      <button
        type="submit"
        className="col-span-2 mx-auto w-1/3 rounded-md bg-slate-500 p-2 transition delay-150 duration-300 ease-in-out hover:-translate-y-1  hover:scale-110 hover:bg-slate-800"
      >
        Submit
      </button>
    </form>
  );
};
