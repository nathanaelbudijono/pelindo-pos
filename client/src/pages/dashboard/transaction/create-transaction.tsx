import { Helmet } from "react-helmet";
import { AppSidebar } from "../../../component/modules/sidebar/app-sidebar";
import CreateTransactionComponent from "../../../component/pages/dashboard/transaction/create-transaction-component";
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

const CreateTransaction = () => {
  return (
    <main>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Dashboard | Create Transaction</title>
        <link
          rel="canonical"
          href={`${BASE_URL}/dashboard/createtransaction`}
        />
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
                  <BreadcrumbItem>Transactions</BreadcrumbItem>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Create Transaction</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <CreateTransactionComponent />
        </SidebarInset>
      </SidebarProvider>
    </main>
  );
};

export default CreateTransaction;
