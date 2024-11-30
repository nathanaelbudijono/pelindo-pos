import * as React from "react";

import { toast } from "../../../../hooks/use-toast";
import { getCategoryService } from "../../../../lib/service/category-service";
import { categoryProps } from "../../../../types/category-types";
import CreateItemForm from "../../../modules/forms/create-item-form";
import Typography from "../../../ui/typography";
import { itemsProps } from "../../../../types/item-types";
import { getItemService } from "../../../../lib/service/item-service";
import { useApiActionStore } from "../../../../lib/zustand/store";
import { ItemDataTable } from "../../../modules/table/item-data-table";
import { itemColumns } from "../../../modules/table/column/item-column";

const ManageItemComponent = () => {
  const [categoryData, setCategoryData] = React.useState<categoryProps[]>();
  const [itemsData, setItemsData] = React.useState<itemsProps[]>();

  const { isAction } = useApiActionStore();

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
        description:
          "Something went wrong when receiving category. Please try again later.",
        variant: "destructive",
      });
    }
  };
  const handleGetItems = async (): Promise<void> => {
    try {
      const data = await getItemService();
      if (data) {
        setItemsData(data.items);
      }
    } catch (err) {
      console.log(err);
      toast({
        title: "Error",
        description:
          "Something went wrong when receiving items. Please try again later.",
        variant: "destructive",
      });
    }
  };

  React.useEffect(() => {
    handleGetCategory();
    handleGetItems();
  }, [isAction]);

  return (
    <main className="p-4">
      <Typography variant="p" affects="muted">
        Here, you can create new items, update existing ones, or delete those
        that are no longer needed. Organizing your categories ensures a more
        streamlined and efficient workflow tailored to your needs.
      </Typography>
      <section className="mt-5">
        <CreateItemForm categoryData={categoryData || []} />
        <div className="mt-5">
          <ItemDataTable
            columns={itemColumns(categoryData || [])}
            data={itemsData || []}
          />
        </div>
      </section>
    </main>
  );
};
export default ManageItemComponent;
