import { Archive } from "lucide-react";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { navData } from "../../../constant/config";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "../../ui/sidebar";
import { SearchForm } from "./search-form";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const navigate = useNavigate();

  const filteredNavMain = navData.navMain.map((group) => ({
    ...group,
    items: group.items.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  }));

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate(`/`);
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="px-2 flex items-center space-x-2 mt-[11px]">
          <Archive />
          <span className="font-semibold text-lg">EDI POS</span>
        </div>
        <SearchForm value={searchQuery} onChange={setSearchQuery} />
      </SidebarHeader>
      <SidebarContent>
        {filteredNavMain.map(
          (item) =>
            item.items.length > 0 && (
              <SidebarGroup key={item.title}>
                <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {item.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <a href={item.url}>{item.title}</a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            )
        )}
        <SidebarGroup>
          <SidebarGroupLabel>Manage Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout}>
                  Logout
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
