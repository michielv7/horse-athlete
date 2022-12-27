export const BasicInput = ({
  id,
  type,
  defaultValues,
}: {
  id: number;
  type: string;
  defaultValues?: {
    name: string;
    description: string;
    addedPrice: number;
    isRequired: boolean;
    isSaddleFitterOnly: boolean;
  };
}) => {
  return (
    <>
      <label htmlFor={`name-${type}-${id}`}>Attribute name</label>
      <input
        type="text"
        name={`name-${type}-${id}`}
        id={`name-${type}-${id}`}
        defaultValue={defaultValues?.name ?? ''}
        required
      />

      <label htmlFor={`type-${type}-${id}`}>Type</label>
      <input
        type="text"
        name={`type-${type}-${id}`}
        id={`type-${type}-${id}`}
        value={type}
        readOnly
      />

      <label htmlFor={`description-${type}-${id}`}>Description</label>
      <input
        type="text"
        name={`description-${type}-${id}`}
        id={`description-${type}-${id}`}
        defaultValue={defaultValues?.description ?? ''}
      />

      <label htmlFor={`addedPrice-${type}-${id}`}>Added price</label>
      <input
        type="number"
        name={`addedPrice-${type}-${id}`}
        id={`addedPrice-${type}-${id}`}
        min="0"
        defaultValue={defaultValues?.addedPrice ?? 0}
      />

      <div className="flex flex-row items-center justify-start gap-2">
        <input
          type="checkbox"
          name={`required-${type}-${id}`}
          id={`required-${type}-${id}`}
          defaultChecked={defaultValues?.isRequired ?? false}
        />
        <label htmlFor={`required-${type}-${id}`}>Is required?</label>
      </div>

      <div className="flex flex-row items-center justify-start gap-2">
        <input
          type="checkbox"
          name={`saddleFitterOnly-${type}-${id}`}
          id={`saddleFitterOnly-${type}-${id}`}
          defaultChecked={defaultValues?.isSaddleFitterOnly ?? false}
        />
        <label htmlFor={`saddleFitterOnly-${type}-${id}`}>
          Is saddle fitter only option?
        </label>
      </div>
    </>
  );
};

export const NumberInput = ({
  id,
  type,
  defaultValues,
}: {
  id: number;
  type: string;
  defaultValues?: {
    name: string;
    description: string;
    addedPrice: number;
    isRequired: boolean;
    isSaddleFitterOnly: boolean;
    limit?: { min: number; max: number };
  };
}) => {
  const divStyle = 'grid grid-cols-2 items-center';
  return (
    <>
      <BasicInput id={id} type={type} defaultValues={defaultValues} />
      <div className={divStyle}>
        <label htmlFor={`min-${type}-${id}`}>Minimum</label>
        <input
          type="number"
          name={`min-${type}-${id}`}
          id={`min-${type}-${id}`}
          min={0}
          defaultValue={defaultValues?.limit?.min ?? 0}
        />
      </div>
      <div className={divStyle}>
        <label htmlFor={`max-${type}-${id}`}>Maximum</label>
        <input
          type="number"
          name={`max-${type}-${id}`}
          id={`max-${type}-${id}`}
          defaultValue={defaultValues?.limit?.max ?? 0}
        />
      </div>
    </>
  );
};

export const ChoiceInput = ({
  id,
  type,
  defaultValues,
}: {
  id: number;
  type: string;
  defaultValues?: {
    name: string;
    description: string;
    addedPrice: number;
    isRequired: boolean;
    isSaddleFitterOnly: boolean;
    options?: (
      | {
          name: string;
          addedPrice: number;
        }
      | undefined
    )[];
  };
}) => {
  return (
    <>
      <BasicInput id={id} type={type} defaultValues={defaultValues} />

      <label htmlFor={`textArea-${type}-${id}`}>Options</label>
      <textarea
        name={`textArea-${type}-${id}`}
        id={`textArea-${type}-${id}`}
        rows={3}
        placeholder={
          'List your options with added price seperated by an enter (New added price is extra on the previous added price)\nE.g. Red, 20\nBlue, 10'
        }
        defaultValue={defaultValues?.options
          ?.map((option) => `${option?.name}, ${option?.addedPrice}\n`)
          .join('')}
      ></textarea>
    </>
  );
};
