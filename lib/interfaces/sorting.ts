import { Dispatch, SetStateAction } from 'react';
import { SortType } from '../types/sort';

export interface ISorting {
  sortField: string;
  sortDirection: SortType;
}

export interface ISortingSetters extends ISorting {
  setSorting: Dispatch<SetStateAction<ISorting>>;
}
