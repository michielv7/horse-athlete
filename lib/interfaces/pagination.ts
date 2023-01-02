import { Dispatch, SetStateAction } from 'react';

export interface IPagination extends IPaginationDefault {
  setPagination: Dispatch<SetStateAction<IPaginationDefault>>;
  pageCount: number;
  multiplyValue: number;
}

export interface IPaginationDefault {
  page: number;
  pageSize: number;
}
