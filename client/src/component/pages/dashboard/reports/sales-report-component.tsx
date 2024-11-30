import {
  Box,
  CircleDollarSign,
  List,
  Receipt,
  ShoppingCart,
} from "lucide-react";
import * as React from "react";
import { toast } from "../../../../hooks/use-toast";
import { formatToIDR } from "../../../../lib/helper";
import { getReportService } from "../../../../lib/service/report-service";
import { getTransactionService } from "../../../../lib/service/transaction-service";
import { reportProps } from "../../../../types/report-types";
import { getTransactionProps } from "../../../../types/transaction-types";
import { categoriesDetailColumns } from "../../../modules/table/column/category-detail-column";
import { itemDetailColumns } from "../../../modules/table/column/item-detail-column";
import { transactionColumns } from "../../../modules/table/column/transaction-column";
import { SalesDetailTable } from "../../../modules/table/sales-detail-table";
import { TransactionDataTable } from "../../../modules/table/transaction-data-table";
import Typography from "../../../ui/typography";

const SalesReportComponent = () => {
  const [reportData, setReportData] = React.useState<reportProps>();
  const [transactionData, setTransactionData] =
    React.useState<getTransactionProps[]>();

  const handleGetReport = async (): Promise<void> => {
    try {
      const data = await getReportService();
      if (data) {
        setReportData(data.report);
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "An unexpected error occurred",
        description: "Failed to fetch report data",
        variant: "destructive",
      });
    }
  };

  const handleGetTransaction = async (): Promise<void> => {
    try {
      const data = await getTransactionService();
      if (data) {
        setTransactionData(data.item);
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "An unexpected error occurred",
        description: "Failed to fetch report data",
        variant: "destructive",
      });
    }
  };

  React.useEffect(() => {
    handleGetReport();
    handleGetTransaction();
  }, []);

  return (
    <main className="p-4">
      <Typography variant="p" affects="muted">
        A quick overview of your sales can help you make informed decisions.
      </Typography>
      <section className="mt-5">
        <Typography variant="h3" affects="large">
          Overview
        </Typography>
        <section className="grid grid-cols-2 gap-4 box:grid-cols-5 mt-3">
          <InformationBlock
            bgColor="bg-blue-100"
            textColor="text-blue-500"
            label="Best Selling Item"
            infoLabel={reportData?.bestSellingItem}
            icon={<Box className="text-blue-500" />}
          />
          <InformationBlock
            bgColor="bg-lime-100"
            textColor="text-lime-500"
            label="Best Selling Category"
            infoLabel={reportData?.bestSellingCategory}
            icon={<List className="text-lime-500" />}
          />
          <InformationBlock
            bgColor="bg-teal-100"
            textColor="text-teal-500"
            label="Total Item Transactions"
            infoNum={reportData?.totalTransaction}
            icon={<Receipt className="text-teal-500" />}
          />
          <InformationBlock
            bgColor="bg-rose-100"
            textColor="text-rose-500"
            label="Total Item Sold"
            infoNum={reportData?.totalItemSold}
            icon={<ShoppingCart className="text-rose-500" />}
          />
          <InformationBlock
            bgColor="bg-slate-100"
            textColor="text-slate-500"
            label="Total Revenue"
            infoLabel={formatToIDR(reportData?.totalRevenue)}
            icon={<CircleDollarSign className="text-slate-500" />}
          />
        </section>
      </section>
      <section className="grid auto-rows-min gap-4 box:grid-cols-2 mt-5">
        <div>
          <Typography variant="h3" affects="large">
            Sales Transaction History
          </Typography>
          <TransactionDataTable
            columns={transactionColumns}
            data={transactionData || []}
          />
        </div>
        <div>
          <Typography variant="h3" affects="large">
            Sales Detail
          </Typography>
          <div className="mt-5">
            <SalesDetailTable
              data={reportData?.items || []}
              columns={itemDetailColumns}
            />
            <SalesDetailTable
              data={reportData?.categories || []}
              columns={categoriesDetailColumns}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default SalesReportComponent;

const InformationBlock = ({
  bgColor,
  textColor,
  icon,
  label,
  infoNum,
  infoLabel,
}: {
  bgColor: string;
  textColor: string;
  icon: JSX.Element;
  label: string;
  infoNum?: number;
  infoLabel?: string;
}) => {
  return (
    <div className={`rounded-xl ${bgColor} p-4 flex justify-center flex-col`}>
      <div className="flex items-center gap-2">
        {icon}
        <Typography
          variant="h4"
          affects="small"
          className={`${textColor} text-nowrap`}
        >
          {label}
        </Typography>
      </div>

      <div className="mt-3 text-center">
        <h1 className={`font-bold ${textColor} text-3xl max:md:text-2xl`}>
          {infoNum} {infoLabel}
        </h1>
      </div>
    </div>
  );
};
