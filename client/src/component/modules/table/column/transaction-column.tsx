import { ColumnDef } from "@tanstack/react-table";
import { getTransactionProps } from "../../../../types/transaction-types";
import { formatDate, formatToIDR } from "../../../../lib/helper";

export const transactionColumns: ColumnDef<getTransactionProps>[] = [
  {
    accessorKey: "itemName",
    header: "Item",
  },
  {
    accessorKey: "categoryName",
    header: "Category",
  },
  {
    accessorKey: "quantityBought",
    header: "Quantity",
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
    cell: ({ row }) => {
      return <span>{formatToIDR(row.original.totalPrice)}</span>;
    },
  },
  {
    accessorKey: "dateTime",
    header: "Date",
    cell: ({ row }) => {
      return <span>{formatDate(row.original.dateTime)}</span>;
    },
  },
];
