"use client";

import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { cn } from "@/utils";

type BreadcrumbData = {
  text: string;
  href?: string;
  isCurrent?: boolean;
};

export interface BreadcrumbsGroupProps {
  breadcrumbItems: BreadcrumbData[];
}

export const BreadcrumbsGroup: React.FC<BreadcrumbsGroupProps> = ({
  breadcrumbItems,
}) => {
  return (
    <Breadcrumbs
      maxItems={4}
      itemsBeforeCollapse={2}
      itemsAfterCollapse={2}
      separator="/"
      size="lg"
      itemClasses={{
        separator: "px-2 text-white",
        item: "text-white data-[current=true]:text-gray-300",
      }}
      classNames={{
        base: "text-white",
      }}
    >
      {breadcrumbItems.map((crumb, index) => (
        <BreadcrumbItem
          key={index}
          isCurrent={crumb.isCurrent}
          isDisabled={!crumb.href}
          className={cn("!text-white")}
        >
          {crumb.href && !crumb.isCurrent ? (
            <Link href={crumb.href} className="hover:underline">
              {crumb.text}
            </Link>
          ) : (
            <span>{crumb.text}</span>
          )}
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
  );
};
