import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "../../../hooks/use-toast";
import { postItemService } from "../../../lib/service/item-service";
import { useApiActionStore } from "../../../lib/zustand/store";
import { categoryProps } from "../../../types/category-types";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import DropzoneInput from "../../ui/dropzone";
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

const CreateItemForm = ({
  categoryData,
}: {
  categoryData: categoryProps[];
}) => {
  const { setIsAction, isAction } = useApiActionStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsAction(true);
      const formData = new FormData();
      formData.append("itemName", values.itemName);
      formData.append("quantity", values.quantity);
      formData.append("price", values.price);
      formData.append("categoryId", values.categoryId.toString());
      formData.append("imagePath", values.file[0]);
      const data = await postItemService(formData);

      if (data?.success) {
        toast({
          title: "Item created successfully!",
          description: `${data.itemName} has been created successfully`,
        });
      } else {
        if (data?.error && data !== null) {
          toast({
            title: "Item creation failed!",
            description: `We encountered the following issues: ${data.error}`,
            variant: "destructive",
          });
        }
      }
    } catch (err) {
      console.log(err);
      toast({
        title: "Unexpected Error!",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsAction(false);
      form.reset({
        itemName: "",
        quantity: "",
        price: "",
        categoryId: "",
        file: [],
      });
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus />
          <span>Create new Item</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new Item</DialogTitle>
          <DialogDescription>
            Every item must belong to a category.
          </DialogDescription>
        </DialogHeader>
        <section>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name="itemName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Item Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Cheese Burger" {...field} />
                      </FormControl>
                      <FormDescription>
                        Item name minimal character is two
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Item Quantity</FormLabel>
                      <FormControl>
                        <Input placeholder="12" {...field} />
                      </FormControl>
                      <FormDescription>
                        Item Quantity must be greater than 0
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-3">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Item Price</FormLabel>
                      <FormControl>
                        <Input placeholder="Rp 12 000" {...field} />
                      </FormControl>
                      <FormDescription>
                        Item Price must be greater than 0
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Item Category</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categoryData?.map((item, index) => {
                              return (
                                <SelectItem
                                  value={item.id.toString()}
                                  key={index}
                                >
                                  {item.name}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription>
                        You must select an existing category
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload Image</FormLabel>
                    <FormControl>
                      <DropzoneInput
                        id="file"
                        type="image"
                        accept={{ "image/*": [".png", ".jpg", ".jpeg"] }}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Image size must be less than 1mb and in jpg, jpeg, or png
                      format
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                {isAction ? (
                  <LoaderCircle strokeWidth={1} className="animate-spin" />
                ) : (
                  "Create Item"
                )}
              </Button>
            </form>
          </Form>
        </section>
      </DialogContent>
    </Dialog>
  );
};

export default CreateItemForm;

const formSchema = z.object({
  itemName: z.string().min(2, "Item name must be at least 2 characters long"),
  quantity: z.string().min(1, "Quantity must be at least 1"),
  price: z.string().min(1, "Price must be at least 1"),
  file: z.custom<File>().array().min(1).max(1),
  categoryId: z.string().min(1, "Category must be selected"),
});
