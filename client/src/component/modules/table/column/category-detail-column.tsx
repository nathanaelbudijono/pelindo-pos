import { ColumnDef } from "@tanstack/react-table";
import { formatToIDR } from "../../../../lib/helper";

interface categoryDetailColumnsProps {
  categoryName?: string;
  categorySold?: number;
  totalCategoryRevenue?: number;
}

export const categoriesDetailColumns: ColumnDef<categoryDetailColumnsProps>[] =
  [
    {
      accessorKey: "categoryName",
      header: "Category",
    },
    {
      accessorKey: "categorySold",
      header: "categorySold",
    },
    {
      accessorKey: "totalCategoryRevenue",
      header: "Total Revenue",
      cell: ({ row }) => {
        return <span>{formatToIDR(row.original.totalCategoryRevenue)}</span>;
      },
    },
  ];
