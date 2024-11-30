import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { categoryProps } from "../../../../types/category-types";
import { Button } from "../../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../../ui/dropdown-menu";
import DeleteCategoryAlertDialog from "../../alert-dialog/delete-category-alert-dialog";
import UpdateCategoryForm from "../../forms/update-category-form";

export const categoryColumns: ColumnDef<categoryProps>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "item",
    header: "Items",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="secondary">
              {row.original.items.length} Items
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{row.original.name} Items</DropdownMenuLabel>
            {row.original.items.length > 0 ? (
              row.original.items?.map((item, index) => {
                return (
                  <DropdownMenuItem key={index}>
                    {item.itemName}
                  </DropdownMenuItem>
                );
              })
            ) : (
              <DropdownMenuItem>No items</DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
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
              <UpdateCategoryForm
                categoryName={row.original.name}
                categoryId={row.original.id}
              />
            </DropdownMenuItem>

            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
              }}
            >
              <DeleteCategoryAlertDialog
                categoryName={row.original.name}
                categoryItems={row.original.items.length}
                categoryId={row.original.id}
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
