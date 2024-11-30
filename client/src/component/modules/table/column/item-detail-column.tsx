import { ColumnDef } from "@tanstack/react-table";
import { formatToIDR } from "../../../../lib/helper";

interface itemDetailColumnsProps {
  itemName?: string;
  itemSold?: number;
  totalItemRevenue?: number;
}

export const itemDetailColumns: ColumnDef<itemDetailColumnsProps>[] = [
  {
    accessorKey: "itemName",
    header: "Item",
  },
  {
    accessorKey: "itemSold",
    header: "Item Sold",
  },
  {
    accessorKey: "totalItemRevenue",
    header: "Total Revenue",
    cell: ({ row }) => {
      return <span>{formatToIDR(row.original.totalItemRevenue)}</span>;
    },
  },
];
