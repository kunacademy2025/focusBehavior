"use client";
import { Skeleton } from "@nextui-org/react";

export const CardSkeleton = () => {
  return (
    <div className="bg-white space-y-5 p-4 rounded-lg">
      <Skeleton className="rounded-lg">
        <div className="aspect-square w-full rounded-lg bg-default-300"></div>
      </Skeleton>
      <div className="space-y-3 py-4">
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
  );
};
