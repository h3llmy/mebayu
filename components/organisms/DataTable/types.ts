"use client";

import { ReactNode } from "react";

export type Primitive =
  | string
  | number
  | boolean
  | bigint
  | symbol
  | null
  | undefined
  | Date;

export type DeepKeys<T> = T extends Primitive
  ? never
  : {
    [K in keyof T & string]: T[K] extends Primitive
    ? K
    : K | `${K}.${DeepKeys<T[K]>}`;
  }[keyof T & string];

export interface Column<T, P extends DeepKeys<T> = DeepKeys<T>> {
  header: string;
  accessor: P;
  sortable?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: (value: any, row: T) => ReactNode;
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  bulkActions?: {
    label: string;
    onClick: (selected: T[]) => void;
  }[];
  defaultPageSize?: number;
  isLoading?: boolean;
  totalItems?: number; 
  rowIdKey?: string;
}
