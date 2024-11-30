import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { categoryProps } from "../../../types/category-types";
import { itemsProps } from "../../../types/item-types";
import { Button } from "../../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { postTransactionService } from "../../../lib/service/transaction-service";
import { toast } from "../../../hooks/use-toast";

const CreateTransactionForm = ({
  categoryData,
  itemsData,
}: {
  categoryData: categoryProps[];
  itemsData: itemsProps[];
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const itemId = itemsData?.find(
        (item) => item.itemName === values.itemName
      )?.id;

      const categoryId = categoryData?.find(
        (item) =>
          item.name ===
          itemsData?.find((item) => item.itemName === values.itemName)?.category
      )?.id;

      const categoryName = categoryData?.find(
        (item) =>
          item.name ===
          itemsData?.find((item) => item.itemName === values.itemName)?.category
      )?.name;
      if (!itemId || !categoryId || !categoryName) return;
      const data = await postTransactionService({
        quantityBought: parseInt(values.quantityBought),
        itemName: values.itemName,
        itemId: itemId,
        categoryId: categoryId,
        categoryName: categoryName,
      });

      if (data?.success) {
        toast({
          title: "Transaction Created!",
          description: "Transaction has been created successfully.",
        });
      } else {
        if (data?.error && data) {
          toast({
            title: "Transaction Failed!",
            description: `We encountered the following issues: ${data.error}`,
            variant: "destructive",
          });
        }
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "Unexpected Error!",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      form.reset({ quantityBought: "", itemName: "" });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <FormField
          control={form.control}
          name="itemName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Items</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select item" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {itemsData?.length > 0 ? (
                    itemsData?.map((item, index) => {
                      return (
                        <SelectItem
                          key={index}
                          //@ts-expect-error There will always  be a value
                          value={item.itemName}
                        >
                          {item.itemName}
                        </SelectItem>
                      );
                    })
                  ) : (
                    <SelectItem value="No item found">No item found</SelectItem>
                  )}
                </SelectContent>
              </Select>
              <FormDescription>
                Choose item to begin a transaction,
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantityBought"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity Bought</FormLabel>
              <FormControl>
                <Input placeholder="Input quantity" {...field} />
              </FormControl>
              <FormDescription>
                Enter the quantity of the item you bought.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Create Transaction
        </Button>
      </form>
    </Form>
  );
};

export default CreateTransactionForm;

const formSchema = z.object({
  quantityBought: z.string().min(1),
  itemName: z.string().min(1),
});
