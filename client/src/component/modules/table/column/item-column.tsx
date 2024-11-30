import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { formatToIDR } from "../../../../lib/helper";
import { itemsProps } from "../../../../types/item-types";
import { Button } from "../../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../../ui/dropdown-menu";
import DeleteItemAlertDialog from "../../alert-dialog/delete-item-alert-dialog";
import UpdateItemForm from "../../forms/update-item-form";
import { categoryProps } from "../../../../types/category-types";

export const itemColumns = (
  categoryData: categoryProps[]
): ColumnDef<itemsProps>[] => [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "itemName",
    header: "Item Name",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "quantity",
    header: "Stock",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      return <span>{formatToIDR(row.original.price)}</span>;
    },
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
              }}
            >
              <UpdateItemForm
                categoryData={categoryData}
                itemName={row.original.itemName ?? ""}
                quantity={row.original.quantity ?? 0}
                price={row.original.price ?? 0}
                categoryId={
                  categoryData.find(
                    (item) => item.name === row.original.category
                  )?.id ?? 0
                }
                imagePath={row.original.imagePath ?? ""}
                itemId={row.original.id}
              />
            </DropdownMenuItem>

            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
              }}
            >
              <DeleteItemAlertDialog
                itemId={row.original.id}
                itemName={row.original.itemName}
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
