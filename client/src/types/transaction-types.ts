import { responseTypes } from "./response-types";

export interface transactionProps {
  id?: number;
  quantityBought?: number;
  totalPrice?: number;
  dateTime?: string;
  itemName?: string;
  itemId?: number;
  categoryName?: string;
  categoryId?: number;
}

export interface postTransactionResponseProps extends responseTypes {
  error?: string;
  data?: transactionProps;
}

export interface createTransactionProps {
  quantityBought: number;
  itemName: string;
  itemId: number;
  categoryName: string;
  categoryId: number;
}

export interface getTransactionResponseProps extends responseTypes {
  error?: string;
  item?: getTransactionProps[];
}

export interface getTransactionProps {
  id?: number;
  quantityBought?: number;
  dateTime?: string;
  totalPrice?: number;
  itemName?: string;
  categoryName?: string;
}
