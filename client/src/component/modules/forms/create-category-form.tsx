import * as React from "react";
import { LoaderCircle, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { postCategoryService } from "../../../lib/service/category-service";
import { toast } from "../../../hooks/use-toast";
import { useApiActionStore } from "../../../lib/zustand/store";

const CreateCategoryForm = () => {
  const { setIsAction, isAction } = useApiActionStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsAction(true);
      const data = await postCategoryService({ name: values.name });
      if (data?.success) {
        toast({
          title: "Category created successfully!",
          description: `${data.name} has been created successfully`,
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
      form.reset({ name: "" });
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus />
          <span>Create new Category</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new category</DialogTitle>
          <DialogDescription>
            Every item must belong to a category.
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
                      <Input placeholder="Burger" {...field} />
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
                  "Create category"
                )}
              </Button>
            </form>
          </Form>
        </section>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategoryForm;

const formSchema = z.object({
  name: z.string().min(2, "Category name must be at least 2 characters long"),
});
