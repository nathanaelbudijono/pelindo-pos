import {
  deleteItemResponseProps,
  getItemsResponseProps,
  getStockItemsResponseProps,
  postItemResponseProps,
  putItemResponseProps,
} from "../../types/item-types";
import {
  deleteItem,
  getItem,
  getStockReport,
  postItem,
  putItem,
} from "../fetcher/item-fetcher";

export const postItemService = async (
  formData: FormData
): Promise<null | postItemResponseProps> => {
  try {
    const data = await postItem(formData);
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getItemService =
  async (): Promise<null | getItemsResponseProps> => {
    try {
      const data = await getItem();
      return data;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

export const deleteItemService = async ({
  id,
}: {
  id: number;
}): Promise<void | deleteItemResponseProps> => {
  try {
    const data = await deleteItem({ id });
    if (!data?.success && data) {
      return data;
    }
    return;
  } catch (err) {
    console.log(err);
    return;
  }
};

export const putItemService = async (
  formData: FormData,
  id: number
): Promise<null | putItemResponseProps> => {
  try {
    const data = await putItem(formData, id);
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getStockReportService =
  async (): Promise<null | getStockItemsResponseProps> => {
    try {
      const data = await getStockReport();
      return data;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

export const fetchImageService = async (
  imageUrl: string,
  imagePath: string
): Promise<File | null> => {
  try {
    const response = await fetch(imageUrl, {
      method: "GET",
      headers: {
        "Content-Type": "image/jpeg",
      },
      mode: "cors",
    });

    if (!response.ok) {
      return null;
    }

    const blob = await response.blob();

    if (!blob) {
      return null;
    }

    const file = new File([blob], imagePath, { type: blob.type });

    return file;
  } catch (error) {
    return null;
  }
};
