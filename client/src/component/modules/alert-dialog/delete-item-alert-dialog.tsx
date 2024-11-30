import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { Trash2 } from "lucide-react";
import { toast } from "../../../hooks/use-toast";
import { deleteItemService } from "../../../lib/service/item-service";
import { useApiActionStore } from "../../../lib/zustand/store";
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

const DeleteItemAlertDialog = ({
  itemName,
  itemId,
}: {
  itemName: string | undefined;
  itemId: number | undefined;
}) => {
  const { setIsAction } = useApiActionStore();
  const handleDeleteItem = async ({ id }: { id: number | undefined }) => {
    try {
      if (itemId === undefined) return;
      setIsAction(true);
      const data = await deleteItemService({ id: itemId });
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
          Delete Item
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete{" "}
            {itemName}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              handleDeleteItem({ id: itemId });
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

export default DeleteItemAlertDialog;
