interface IBody {
  name: string;
  description: string;
  basePrice: number;
  attributes?: IFields[];
}

export interface IFields {
  name: string;
  type: string;
  description: string;
  addedPrice: Number;
  isRequired: boolean;
  isSaddleFitterOnly: boolean;
  options?: IOptions[];
  limit?: {
    min: number;
    max: number;
  };
}

export interface IOptions {
  name: string;
  addedPrice: Number;
}

export function processAttributes(body: IBody) {
  const childDivs = document.querySelectorAll('form > div > div');
  body.attributes = [];
  childDivs.forEach((child) => {
    const type = child.getAttribute('data-type'),
      id = child.id;
    switch (type) {
      case 'selection':
        body.attributes?.push(processSelection(child, id, type));
        break;
      case 'number':
        body.attributes?.push(processNumber(child, id, type));
        break;
      case 'text':
        body.attributes?.push(processInput(child, id, type));
        break;
    }
  });
}

function processSelection(child: Element, id: string, type: string): IFields {
  const json = processInput(child, id, type);
  const text = getValue(child, `textarea#textArea-${id}`);
  const textArr = text.split('\n').map((el) => el.split(','));
  const options: IOptions[] = [];

  for (let [name, addedPrice] of textArr) {
    if (name === '') continue;
    options.push({ name: name.trim(), addedPrice: parseInt(addedPrice) });
  }

  json.options = options;
  return json;
}

function processInput(child: Element, id: string, type: string): IFields {
  const name = getValue(child, `input#name-${id}`);
  const description = getValue(child, `input#description-${id}`);
  const addedPrice = parseInt(getValue(child, `input#addedPrice-${id}`));
  const isRequired = getBoolean(child, `input#required-${id}`);
  const isSaddleFitterOnly = getBoolean(child, `input#saddleFitterOnly-${id}`);

  return {
    name,
    type,
    description,
    addedPrice,
    isRequired,
    isSaddleFitterOnly,
  } as IFields;
}

function processNumber(child: Element, id: string, type: string): IFields {
  const json = processInput(child, id, type);
  const min: number = parseInt(getValue(child, `input#min-${id}`));
  const max: number = parseInt(getValue(child, `input#max-${id}`));

  json.limit = {
    min,
    max,
  };

  return json;
}

const getValue = (node: Element, selector: string): string =>
  node.querySelector<HTMLInputElement>(selector)!.value;

const getBoolean = (node: Element, selector: string): boolean =>
  node.querySelector<HTMLInputElement>(selector)!.checked;
