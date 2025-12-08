import type React from "react";
import { cn } from "@/lib/utils";

type ContainerProps = React.HTMLAttributes<HTMLDivElement>;

function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full h-full max-w-6xl px-6 md:px-14 lg:px-20 z-10",
        className,
      )}
    >
      {children}
    </div>
  );
}

export default Container;
