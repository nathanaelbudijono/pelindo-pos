import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../ui/alert-dialog";
import { Button } from "../../ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "../../../hooks/use-toast";
import { deleteCategoryService } from "../../../lib/service/category-service";
import { useApiActionStore } from "../../../lib/zustand/store";

const DeleteCategoryAlertDialog = ({
  categoryName,
  categoryItems,
  categoryId,
}: {
  categoryName: string;
  categoryItems: number;
  categoryId: number;
}) => {
  const { setIsAction } = useApiActionStore();
  const handleDeleteCategory = async ({ id }: { id: number }) => {
    try {
      setIsAction(true);
      const data = await deleteCategoryService({ id });
      if (!data?.success && data) {
        toast({
          title: "Error",
          description: `We encountered the following issues: ${data.error}`,
          variant: "destructive",
        });
        return;
      }
    } catch (err) {
      console.log(err);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsAction(false);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm" variant="destructive" className="w-full">
          <Trash2 />
          Delete Category
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete{" "}
            {categoryItems} item that is linked with {categoryName}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              handleDeleteCategory({ id: categoryId });
            }}
            className="bg-red-500"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCategoryAlertDialog;
