"use client";
import React, { FC, ReactNode } from "react";
import { usePagination } from "@/hooks";
import { CardSkeleton, Pagination } from "@/components/ui";
import { cn } from "@/utils";

interface Props {
  title?: ReactNode;
  subtitle?: string;
  brief?: ReactNode;
  headerChildren?: React.ReactNode;
  children?: React.ReactNode;
  meta?: any;
  twoColumn?: boolean;
  classNames?: string;
}

export const ListingWrapper: FC<Props> = ({
  title,
  subtitle,
  brief,
  headerChildren,
  children,
  meta,
  twoColumn = false,
  classNames,
}) => {
  const { handlePaginate, isPending: isPaginationPending } = usePagination();

  return (
    <section className="flex justify-center">
      <div className="container w-full h-full py-8">
        {title && (
          <div className="flex flex-col justify-center mb-6">
            <h2 className="title">
              {title}
              <br />
              <span className="text-secondary">{subtitle}</span>
            </h2>
            <div className="text-zinc-900 mt-4 lg:w-1/2">{brief}</div>
          </div>
        )}
        {headerChildren}
        <div
          className={cn(
            "grid gap-x-6 gap-y-6 ",
            twoColumn
              ? "grid-cols-1 md:grid-cols-2 gap-y-8"
              : "grid-cols-2 lg:grid-cols-3",
            classNames
          )}
        >
          {isPaginationPending
            ? Array.from(Array(6).keys()).map((_, index: number) => (
                <CardSkeleton key={index} />
              ))
            : children}
        </div>
        <div className="w-full grid place-content-center mt-4">
          <Pagination meta={meta} handleChange={handlePaginate} />
        </div>
      </div>
    </section>
  );
};
