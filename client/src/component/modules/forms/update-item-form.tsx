import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, Pen } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "../../../hooks/use-toast";
import {
  fetchImageService,
  putItemService,
} from "../../../lib/service/item-service";
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
import { RESOURCE_URL } from "../../../constant/env";

const UpdateItemForm = ({
  categoryData,
  itemName,
  quantity,
  price,
  categoryId,
  imagePath,
  itemId,
}: {
  itemName: string;
  categoryData: categoryProps[];
  quantity: number;
  price: number;
  categoryId: number;
  imagePath: string;
  itemId: number | undefined;
}) => {
  const { setIsAction, isAction } = useApiActionStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      itemName: itemName,
      quantity: quantity,
      price: price,
      categoryId: categoryId,
      file: [],
    },
  });

  React.useEffect(() => {
    const loadImage = async () => {
      const imageFile = await fetchImageService(
        `${RESOURCE_URL}/${imagePath}`,
        imagePath
      );
      console.log(imageFile);
      if (imageFile) {
        form.setValue("file", [imageFile]);
      }
    };

    loadImage();
  }, [imagePath, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!itemId) return;
      setIsAction(true);
      const formData = new FormData();
      formData.append("itemName", values.itemName);
      formData.append("quantity", values.quantity.toString());
      formData.append("price", values.price.toString());
      formData.append("categoryId", values.categoryId.toString());
      formData.append("imagePath", values.file[0]);
      const data = await putItemService(formData, itemId);

      if (data?.success) {
        toast({
          title: "Item Updated successfully!",
          description: `${itemName} has been updated to ${data.itemName}`,
        });
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
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">
          <Pen />
          <span>Update {itemName}</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update {itemName}</DialogTitle>
          <DialogDescription>Upate item details here</DialogDescription>
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
                        <Input
                          placeholder="Cheese Burger"
                          readOnly
                          {...field}
                        />
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
                        <Input placeholder="12" type="number" {...field} />
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
                        <Input
                          placeholder="Rp 12 000"
                          type="number"
                          {...field}
                        />
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
                          onValueChange={(value) =>
                            field.onChange(Number(value))
                          }
                          defaultValue={field.value?.toString()}
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
                  "Update Item"
                )}
              </Button>
            </form>
          </Form>
        </section>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateItemForm;

const formSchema = z.object({
  itemName: z.string().min(2, "Item name must be at least 2 characters long"),
  quantity: z.coerce
    .number()
    .int()
    .positive()
    .max(9999999999999, "Quantity must be less than or equal to 9999999999999"),
  price: z.coerce
    .number()
    .positive()
    .max(
      999999999999999999,
      "Price must be less than or equal to 999999999999999999"
    ),
  file: z.custom<File>().array().min(1).max(1),
  categoryId: z.number().min(1, "Category must be selected"),
});
