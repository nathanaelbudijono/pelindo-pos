import { Search } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
} from "../../ui/sidebar";
import { Label } from "../../ui/label";

interface SearchFormProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchForm({ value, onChange }: SearchFormProps) {
  return (
    <form className="mt-1.5">
      <SidebarGroup className="py-0">
        <SidebarGroupContent className="relative">
          <Label htmlFor="search" className="sr-only">
            Search
          </Label>
          <SidebarInput
            id="search"
            placeholder="Search the pos..."
            className="pl-8"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
          <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
        </SidebarGroupContent>
      </SidebarGroup>
    </form>
  );
}
