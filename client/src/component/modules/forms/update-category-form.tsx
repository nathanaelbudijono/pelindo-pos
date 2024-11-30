import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, Pen } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "../../../hooks/use-toast";
import { putCategoryService } from "../../../lib/service/category-service";
import { useApiActionStore } from "../../../lib/zustand/store";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
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

const UpdateCategoryForm = ({
  categoryName,
  categoryId,
}: {
  categoryName: string;
  categoryId: number;
}) => {
  const { setIsAction, isAction } = useApiActionStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: categoryName },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsAction(true);
      const data = await putCategoryService({
        name: values.name,
        id: categoryId,
      });
      if (data?.success) {
        toast({
          title: "Category updated successfully!",
          description: `${categoryName} has been updated to ${data.name}`,
        });
      } else {
        if (data?.error && data !== null) {
          toast({
            title: "Category creation failed!",
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
      setIsAction(false);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="w-full">
          <Pen />
          <span>Update {categoryName}</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update {categoryName} Name</DialogTitle>
          <DialogDescription>
            Updating the category name does not affect the items in the category
          </DialogDescription>
        </DialogHeader>
        <section>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Name</FormLabel>
                    <FormControl>
                      <Input placeholder="New category name" {...field} />
                    </FormControl>
                    <FormDescription>
                      Category name minimal character is two
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                {isAction ? (
                  <LoaderCircle strokeWidth={1} className="animate-spin" />
                ) : (
                  "Update category"
                )}
              </Button>
            </form>
          </Form>
        </section>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateCategoryForm;

const formSchema = z.object({
  name: z.string().min(2, "Category name must be at least 2 characters long"),
});
