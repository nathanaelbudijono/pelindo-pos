import { responseTypes } from "./response-types";

export interface reportProps {
  bestSellingItem?: string;
  bestSellingCategory?: string;
  totalTransaction?: number;
  totalItemSold?: number;
  totalRevenue?: number;
  items?: {
    itemName?: string;
    itemSold?: number;
    totalItemRevenue?: number;
  }[];
  categories?: {
    categoryName?: string;
    categorySold?: number;
    totalCategoryRevenue?: number;
  }[];
}

export interface getReportResponseProps extends responseTypes {
  report?: reportProps;
  error?: string;
}
