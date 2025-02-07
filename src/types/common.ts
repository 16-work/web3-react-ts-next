import { ReactNode } from 'react';

export interface Option {
  label: string;
  value: any;
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;

  [key: string]: any;
}

export enum ORDER {
  ASC = 1,
  DESC = 2,
}

export type ActiveStatus = 'Upcoming' | 'Live' | 'Ended';
