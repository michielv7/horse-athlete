import { CustomInput } from '#/ui/CustomInput';
import { CustomSelect } from '#/ui/CustomSelect';
import { type CustomSaddleAttribute } from 'types/saddleTypes';

export const AttrProcess = ({
  attr,
  def,
}: {
  attr: CustomSaddleAttribute;
  def?: string | number;
}) => {
  const id = attr.name.replaceAll(' ', '-');
  let toRender;
  switch (attr.type) {
    case 'number':
      toRender = (
        <CustomInput
          htmlFor={id}
          name={id}
          type={attr.type}
          id={id}
          label={attr.name}
          required={attr.isRequired}
          min={attr.limit?.min}
          max={attr.limit?.max}
        />
      );
      break;
    /*case 'selectionOg':
      toRender = (
        <CustomSelect htmlFor={id} text={attr.name} name={id} >
          {attr.options?.map((opt, i) => (
            <option key={i} data-added-price={opt?.addedPrice}>
              {opt?.name}
            </option>
          ))}
        </CustomSelect>
      );
      break;*/
    case 'selection':
      toRender = (
        <CustomSelect
          htmlFor={id}
          text={attr.name}
          name={id}
          defaultValue={def}
        >
          {attr.options?.map((opt, i) => (
            <option
              key={i}
              data-added-price={opt?.addedPrice}
              value={opt?.name}
            >
              {opt?.name}
            </option>
          ))}
        </CustomSelect>
      );
      break;
    case 'text':
      toRender = (
        <CustomInput
          name={id}
          htmlFor={id}
          type={attr.type}
          id={id}
          label={attr.name}
          required={attr.isRequired}
          defaultValue={def}
        />
      );
      break;
  }
  return toRender;
};
