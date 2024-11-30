import { CATEGORY_API_KEY } from "../../constant/env";
import {
  categoryProps,
  deleteCategoryResponseProps,
  postCategoryResponseProps,
  putCategoryResponseProps,
} from "../../types/category-types";

export const postCategory = async ({
  name,
}: {
  name: string;
}): Promise<postCategoryResponseProps> => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${CATEGORY_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    });

    if (res.ok) {
      const data = await res.json();
      return {
        success: res.ok,
        status: res.status,
        id: data.id,
        name: data.name,
        createdAt: data.createdAt,
        items: data.items,
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
      errorTitle: "Internal Server Error",
      error: "Something went wrong. Please try again later.",
    };
  }
};

export const getCategory = async (): Promise<categoryProps[] | null> => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${CATEGORY_API_KEY}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      const data = await res.json();
      return data;
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const deleteCategory = async ({
  id,
}: {
  id: number;
}): Promise<void | deleteCategoryResponseProps> => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${CATEGORY_API_KEY}/${id}`, {
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
    return;
  }
};

export const putCategory = async ({
  id,
  name,
}: {
  id: number;
  name: string;
}): Promise<putCategoryResponseProps> => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${CATEGORY_API_KEY}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    });

    if (res.ok) {
      const data = await res.json();
      return {
        success: res.ok,
        status: res.status,
        id: data.id,
        name: data.name,
        createdAt: data.createdAt,
        items: data.items,
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
      error: "Something went wrong. Please try again later.",
    };
  }
};
