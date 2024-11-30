import * as React from "react";

import { getCategoryService } from "../../../../lib/service/category-service";
import CreateCategoryForm from "../../../modules/forms/create-category-form";
import { categoryColumns } from "../../../modules/table/column/category-column";
import { CategoryDataTable } from "../../../modules/table/category-data-table";
import Typography from "../../../ui/typography";
import { categoryProps } from "../../../../types/category-types";
import { toast } from "../../../../hooks/use-toast";
import { useApiActionStore } from "../../../../lib/zustand/store";

const ManageCategoryComponent = () => {
  const { isAction } = useApiActionStore();
  const [categoryData, setCategoryData] = React.useState<categoryProps[]>();

  const handleGetCategory = async (): Promise<void> => {
    try {
      const data = await getCategoryService();
      if (data) {
        setCategoryData(data);
      }
    } catch (err) {
      console.log(err);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    }
  };

  React.useEffect(() => {
    handleGetCategory();
  }, [isAction]);

  return (
    <main className="p-4">
      <Typography variant="p" affects="muted">
        Here, you can create new categories, update existing ones, or delete
        those that are no longer needed. Organizing your categories ensures a
        more streamlined and efficient workflow tailored to your needs.
      </Typography>
      <section className="mt-5">
        <CreateCategoryForm />
        <div className="mt-5">
          <CategoryDataTable
            columns={categoryColumns}
            data={categoryData || []}
          />
        </div>
      </section>
    </main>
  );
};

export default ManageCategoryComponent;
