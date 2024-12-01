import { ITEM_API_KEY } from "../../constant/env";
import { deleteCategoryResponseProps } from "../../types/category-types";
import {
  getItemsResponseProps,
  getStockItemsResponseProps,
  postItemResponseProps,
  putItemResponseProps,
} from "../../types/item-types";

export const postItem = async (
  formData: FormData
): Promise<postItemResponseProps> => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${ITEM_API_KEY}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      return {
        success: res.ok,
        status: res.status,
        id: data.id,
        itemName: data.itemName,
        price: data.price,
        imagePath: data.imagePath,
        category: data.category,
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

export const getItem = async (): Promise<getItemsResponseProps> => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${ITEM_API_KEY}`, {
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
        items: data,
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

export const deleteItem = async ({
  id,
}: {
  id: number;
}): Promise<void | deleteCategoryResponseProps> => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${ITEM_API_KEY}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      return;
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

export const putItem = async (
  formData: FormData,
  id: number
): Promise<putItemResponseProps> => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${ITEM_API_KEY}/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      return {
        success: res.ok,
        status: res.status,
        id: data.id,
        itemName: data.itemName,
        price: data.price,
        imagePath: data.imagePath,
        category: data.category,
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

export const getStockReport = async (): Promise<getStockItemsResponseProps> => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${ITEM_API_KEY}/stock`, {
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
        items: data,
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
