import * as React from "react";
import { getCategoryService } from "../../../../lib/service/category-service";
import { getItemService } from "../../../../lib/service/item-service";
import { categoryProps } from "../../../../types/category-types";
import { itemsProps } from "../../../../types/item-types";
import CreateTransactionForm from "../../../modules/forms/create-transaction-form";
import Typography from "../../../ui/typography";

const CreateTransactionComponent = () => {
  const [categoryData, setCategoryData] = React.useState<categoryProps[]>();
  const [itemsData, setItemsData] = React.useState<itemsProps[]>();

  const handleGetCategory = async (): Promise<void> => {
    try {
      const data = await getCategoryService();
      if (data) {
        setCategoryData(data);
      }
    } catch (err) {
      console.log(err);
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
    }
  };

  React.useEffect(() => {
    handleGetCategory();
    handleGetItems();
  }, []);

  return (
    <main className="p-4">
      <Typography variant="p" affects="muted">
        Create dummy transaction to test the transaction feature.
      </Typography>
      <section className="mt-5 flex mx-auto justify-center max-w-4xl">
        <CreateTransactionForm
          categoryData={categoryData || []}
          itemsData={itemsData || []}
        />
      </section>
    </main>
  );
};

export default CreateTransactionComponent;
