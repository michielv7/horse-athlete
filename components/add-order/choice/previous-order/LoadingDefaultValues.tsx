export const LoadingDefaultValues = ({
  orderAttributes,
}: {
  orderAttributes: Record<string, string | number>;
}) => {
  return (
    <div className="flex w-1/4 flex-col">
      <label className="text-gray-400" htmlFor="name">
        customer&apos;s name
      </label>
      <input
        type="text"
        id="name"
        name="customersName"
        defaultValue={orderAttributes.customersName}
      ></input>
      <label className="text-gray-400" htmlFor="email">
        email
      </label>
      <input
        type="text"
        id="email"
        name="customersEmail"
        defaultValue={orderAttributes.email}
      ></input>
      <label className="text-gray-400" htmlFor="breed">
        horse breed
      </label>
      <input
        type="text"
        id="breed"
        name="horseBreed"
        defaultValue={orderAttributes.horseBreed ?? ''}
      ></input>
      <label className="text-gray-400" htmlFor="height">
        horse height
      </label>
      <input
        type="text"
        id="height"
        name="horseHeight"
        defaultValue={orderAttributes.horseHeight}
      ></input>
      <label className="text-gray-400" htmlFor="notes">
        notes
      </label>
      <input
        type="text"
        id="notes"
        name="notes"
        defaultValue={orderAttributes.notes}
      ></input>
    </div>
  );
};
