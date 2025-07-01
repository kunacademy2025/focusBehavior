"use client"
import { cn } from "@/utils";
import { Skeleton } from "@nextui-org/react";

export const CardHorizontalSkeleton = () => {
  return (
    <div className={cn("bg-white space-y-5 p-4 rounded-lg")}>
      <div className="flex items-center gap-x-4 w-full">
        <Skeleton className="rounded-lg">
          <div className="aspect-square w-28 h-28 rounded-lg bg-default-300"></div>
        </Skeleton>
        <div className="space-y-3 py-4 h-32 w-full">
          <Skeleton className="w-3/5 rounded-lg">
            <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-4/5 rounded-lg">
            <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-2/5 rounded-lg">
            <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
          </Skeleton>
        </div>
      </div>
    </div>
  );
};
