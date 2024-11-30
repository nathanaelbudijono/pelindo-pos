import {
  createTransactionProps,
  getTransactionResponseProps,
  postTransactionResponseProps,
} from "../../types/transaction-types";
import {
  getTransaction,
  postTransaction,
} from "../fetcher/transaction-fetcher";

export const postTransactionService = async ({
  quantityBought,
  itemName,
  itemId,
  categoryName,
  categoryId,
}: createTransactionProps): Promise<null | postTransactionResponseProps> => {
  try {
    const data = await postTransaction({
      quantityBought,
      itemName,
      itemId,
      categoryName,
      categoryId,
    });
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getTransactionService =
  async (): Promise<null | getTransactionResponseProps> => {
    try {
      const data = await getTransaction();
      return data;
    } catch (err) {
      console.error(err);
      return null;
    }
  };
