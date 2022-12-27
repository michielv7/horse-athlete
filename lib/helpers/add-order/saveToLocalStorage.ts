import { CustomSaddleAttributesArrayType } from '#/lib/types/saddleTypes';

export function saveNameKeysLocalStorage(
  attributes: CustomSaddleAttributesArrayType,
) {
  let keys: string[] = [
    'customersName',
    'customersEmail',
    'horseBreed',
    'horseHeight',
    'notes',
  ];
  for (let attribute of attributes) {
    keys = [...keys, attribute.name.toString().replaceAll(' ', '-')];
  }
  localStorage.setItem('keys', JSON.stringify(keys));
}
