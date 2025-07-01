import { cn } from "@/utils/cn";

export const Container = ({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) => {
  return (
    <div className={cn("container mx-auto sm:px-6 px-4 lg:px-10", className)}>
      {children}
    </div>
  );
};
