import { Helmet } from "react-helmet";
import { AppSidebar } from "../../../component/modules/sidebar/app-sidebar";
import SalesReportComponent from "../../../component/pages/dashboard/reports/sales-report-component";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../../component/ui/breadcrumb";
import { Separator } from "../../../component/ui/seperator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../../../component/ui/sidebar";
import { BASE_URL } from "../../../constant/env";

const SalesReport = () => {
  return (
    <main>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Dashboard | Sales Report</title>
        <link rel="canonical" href={`${BASE_URL}/dashboard/salesreport`} />
      </Helmet>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbItem>Reports</BreadcrumbItem>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Sales Report</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <SalesReportComponent />
        </SidebarInset>
      </SidebarProvider>
      s
    </main>
  );
};

export default SalesReport;
