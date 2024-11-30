import { Helmet } from "react-helmet";
import { AppSidebar } from "../../../component/modules/sidebar/app-sidebar";
import ManageCategoryComponent from "../../../component/pages/dashboard/manage-items/manage-category-component";
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

const ManageCategory = () => {
  return (
    <main>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Manage Category | Dashboard</title>
        <link rel="canonical" href={`${BASE_URL}/dashboard/managecategory`} />
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
                  <BreadcrumbItem>Manage Items</BreadcrumbItem>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Manage Category</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <ManageCategoryComponent />
        </SidebarInset>
      </SidebarProvider>
    </main>
  );
};

export default ManageCategory;
