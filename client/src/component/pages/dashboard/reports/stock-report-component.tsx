import { Info, OctagonAlert, ThumbsUp, TriangleAlert } from "lucide-react";
import * as React from "react";
import { getStockReportService } from "../../../../lib/service/item-service";
import { stockItemsProps } from "../../../../types/item-types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../ui/dropdown-menu";
import Typography from "../../../ui/typography";
import { formatToIDR } from "../../../../lib/helper";
import { RESOURCE_URL } from "../../../../constant/env";
import { Button } from "../../../ui/button";
import { useIsMobile } from "../../../../hooks/use-mobile";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../ui/tooltip";

const StockReportComponent = () => {
  const [stockReportData, setStockReportData] =
    React.useState<stockItemsProps>();
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const itemsPerPage = useIsMobile() ? 4 : 6;

  const handleGetStockReport = async (): Promise<void> => {
    try {
      const data = await getStockReportService();
      if (data) {
        setStockReportData(data.items);
      }
    } catch (err) {
      console.error(err);
    }
  };

  React.useEffect(() => {
    handleGetStockReport();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = stockReportData?.stocks?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = stockReportData
    ? Math.ceil(stockReportData?.stocks?.length ?? 0 / itemsPerPage)
    : 1;

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <main className="p-4">
      <Typography variant="p" affects="muted">
        A quick overview of your stock levels can help you make informed
        decisions about your inventory. This report provides a snapshot of your
        current stock levels.
      </Typography>
      <section className="mt-5">
        <div className="space-x-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="bg-red-100 text-red-500"
                  size="sm"
                >
                  <TriangleAlert className="text-red-500" />
                  Low
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Less than 10</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="bg-orange-100 text-orange-500"
                  size="sm"
                >
                  <OctagonAlert className="text-red-500" />
                  Medium
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Less than 20</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="bg-green-100 text-green-500"
                  size="sm"
                >
                  <ThumbsUp className="text-green-500" />
                  High
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>More than 20</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <section className="grid auto-rows-min gap-4 md:grid-cols-3 mt-3">
          <TotalStockComponent
            count={stockReportData?.lowStockLevel ?? 0}
            stock={stockReportData?.stocks?.filter(
              (item) => item.level === "Low"
            )}
            label="Low Stock Level"
            icon={<TriangleAlert className="text-red-500" />}
            textColor="text-red-500"
            bgColor="bg-red-100"
          />
          <TotalStockComponent
            count={stockReportData?.mediumStockLevel ?? 0}
            stock={stockReportData?.stocks?.filter(
              (item) => item.level === "Medium"
            )}
            label="Medium Stock Level"
            icon={<OctagonAlert className="text-orange-500" />}
            textColor="text-orange-500"
            bgColor="bg-orange-100"
          />
          <TotalStockComponent
            count={stockReportData?.highStockLevel ?? 0}
            stock={stockReportData?.stocks?.filter(
              (item) => item.level === "High"
            )}
            label="High Stock Level"
            icon={<ThumbsUp className="text-green-500" />}
            textColor="text-green-500"
            bgColor="bg-green-100"
          />
        </section>
        <section className="mt-5 grid auto-rows-min gap-4 md:grid-cols-3">
          {currentItems?.map((item, index) => {
            return (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-nowrap">{item.itemName}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="w-full h-48 overflow-hidden rounded-xl flex items-center justify-center max-md:h-72">
                    <img
                      src={`${RESOURCE_URL}/${item.imagePath}`}
                      alt={item.itemName}
                      className="object-cover w-full h-48 max-md:h-72 max-md:object-fill"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="space-y-3">
                    <Typography variant="h3" affects="lead">
                      {formatToIDR(item.price)}
                    </Typography>
                    <Typography variant="p" affects="muted">
                      {item.quantity} stocks remaining
                    </Typography>
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </section>
        {stockReportData?.stocks && stockReportData?.stocks?.length > 0 && (
          <div className="flex items-center justify-end space-x-2 py-4">
            <Button
              variant="outline"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </section>
    </main>
  );
};
export default StockReportComponent;

const TotalStockComponent = ({
  count,
  label,
  icon,
  textColor,
  bgColor,
  stock,
}: {
  count: number;
  label: string;
  icon: JSX.Element;
  textColor: string;
  bgColor: string;
  stock: stockItemsProps["stocks"];
}) => {
  return (
    <div className={`rounded-xl ${bgColor} p-4 flex justify-center flex-col`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <Typography variant="h4" affects="large" className={`${textColor}`}>
            {label}
          </Typography>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Info size={15} className="text-gray-500" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {stock && stock?.length > 0 ? (
              stock?.map((item, index) => {
                return (
                  <DropdownMenuItem key={index}>
                    {item.itemName}
                  </DropdownMenuItem>
                );
              })
            ) : (
              <DropdownMenuItem>No items</DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="mt-3 text-center">
        <h1 className={`font-bold ${textColor} text-4xl max:md:text-3xl`}>
          {count}
        </h1>
      </div>
    </div>
  );
};
