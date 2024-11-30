import * as React from "react";
import { cn } from "../../lib/utils";

type LayoutProps = {
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<"div">;

export default function Layout({ className, children, ...rest }: LayoutProps) {
  return (
    <div
      className={cn(
        `max-w-6xl mx-auto px-6 py-2 max-md:px-4 xl:max-w-7xl 2xl:max-w-[88rem]`,
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
