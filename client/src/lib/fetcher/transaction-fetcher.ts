import { TRANSACTION_API_KEY } from "../../constant/env";
import {
  createTransactionProps,
  getTransactionResponseProps,
  postTransactionResponseProps,
} from "../../types/transaction-types";

export const postTransaction = async ({
  quantityBought,
  itemName,
  itemId,
  categoryName,
  categoryId,
}: createTransactionProps): Promise<postTransactionResponseProps> => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${TRANSACTION_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        quantityBought,
        itemName,
        itemId,
        categoryName,
        categoryId,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      return {
        success: res.ok,
        status: res.status,
        data: data,
      };
    } else {
      const errorText = await res.text();
      return {
        success: res.ok,
        status: res.status,
        error: errorText,
      };
    }
  } catch (err) {
    console.error(err);
    return {
      success: false,
      status: 500,
      error: "Internal Server Error",
    };
  }
};

export const getTransaction =
  async (): Promise<getTransactionResponseProps> => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${TRANSACTION_API_KEY}?IsDescending=true`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        return {
          success: res.ok,
          status: res.status,
          item: data,
        };
      } else {
        const errorText = await res.text();
        return {
          success: res.ok,
          status: res.status,
          error: errorText,
        };
      }
    } catch (err) {
      console.log(err);
      return {
        success: false,
        status: 500,
        error: "Internal Server Error",
      };
    }
  };
