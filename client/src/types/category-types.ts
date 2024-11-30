import { itemsProps } from "./item-types";
import { responseTypes } from "./response-types";

export interface postCategoryResponseProps extends responseTypes {
  id?: string;
  name?: string;
  createdAt?: string;
  items?: itemsProps[];
  errorTitle?: string;
  error?: string;
  statusText?: string;
}

export interface categoryProps {
  id: number;
  name: string;
  items: itemsProps[];
}

export interface deleteCategoryResponseProps extends responseTypes {
  error?: string;
}

export interface putCategoryResponseProps extends responseTypes {
  error?: string;
  name?: string;
  id?: string;
  createdAt?: string;
  items?: itemsProps[];
}
