import { responseTypes } from "./response-types";

export interface itemsProps {
  id?: number;
  itemName?: string;
  quantity?: number;
  price?: number;
  imagePath?: string;
  category?: string;
}

export interface stockItemsProps {
  lowStockLevel?: number;
  mediumStockLevel?: number;
  highStockLevel?: number;
  stocks?: {
    itemName?: string;
    quantity?: number;
    price?: number;
    imagePath?: string;
    level?: string;
  }[];
}

export interface postItemResponseProps extends responseTypes, itemsProps {
  error?: string;
}

export interface putItemResponseProps extends responseTypes, itemsProps {
  error?: string;
}

export interface getItemsResponseProps extends responseTypes {
  error?: string;
  items?: itemsProps[];
}

export interface deleteItemResponseProps extends responseTypes {
  error?: string;
}

export interface getStockItemsResponseProps extends responseTypes {
  items?: stockItemsProps;
  error?: string;
}
