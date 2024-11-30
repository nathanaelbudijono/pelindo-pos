import {
  categoryProps,
  deleteCategoryResponseProps,
  postCategoryResponseProps,
  putCategoryResponseProps,
} from "../../types/category-types";
import {
  deleteCategory,
  getCategory,
  postCategory,
  putCategory,
} from "../fetcher/category-fetcher";

export const postCategoryService = async ({
  name,
}: {
  name: string;
}): Promise<null | postCategoryResponseProps> => {
  try {
    const data = await postCategory({ name });
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getCategoryService = async (): Promise<categoryProps[] | null> => {
  try {
    const data = await getCategory();
    if (data) {
      return data;
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const deleteCategoryService = async ({
  id,
}: {
  id: number;
}): Promise<void | deleteCategoryResponseProps> => {
  try {
    const data = await deleteCategory({ id });
    if (data?.success) {
      return;
    } else {
      return data;
    }
  } catch (err) {
    console.log(err);
  }
};

export const putCategoryService = async ({
  name,
  id,
}: {
  name: string;
  id: number;
}): Promise<null | putCategoryResponseProps> => {
  try {
    const data = await putCategory({ id, name });
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
