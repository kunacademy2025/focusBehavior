"use client";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { cn } from "@/utils";
import React from "react";
import {motion } from "framer-motion";

import { DisclosureMenu } from "./disclosure-menu";
import { SingleMenuItem } from "./single-menu-item";

export const NavItem = React.memo(
  ({ item, isSticky, isHovered, onMouseEnter, onMouseLeave }: any) => {
    const renderSubLinks = () => (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : -10,
          x: item?.size === "sm" ? "-50%" : 0,
          display: isHovered ? "" : "none",
        }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "absolute top-full z-10 w-screen overflow-hidden bg-white bg-opacity-90 backdrop-blur-lg shadow-lg items-start",
          item?.size === "sm"
            ? "max-w-[18rem] left-1/2 transform -translate-x-1/2"
            : "left-0",
          isSticky ? "rounded-b-xl" : "rounded-xl"
        )}
      >
        <div
          className={cn(
            "p-4 grid gap-x-1 gap-y-1",
            item.size === "sm" ? "grid-cols-1" : "grid-cols-2 xl:grid-cols-4"
          )}
        >
          {item.subLinks.map((subItem: any, subIndex: number) =>
            subItem.subLinks ? (
              <DisclosureMenu key={subIndex} subItem={subItem} />
            ) : (
              <SingleMenuItem key={subIndex} subItem={subItem} />
            )
          )}
        </div>
      </motion.div>
    );

    return (
      <li
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="relative h-full flex items-center"
      >
        {item?.url ? (
          <Link
            href={item.url}
            className={cn(
              "uppercase flex items-center gap-x-1 text-xs xl:text-sm font-medium transition-all duration-300 relative group",
              isSticky ? "text-secondary" : "text-white"
            )}
          >
            {item.title}
            {item.subLinks && <ChevronDownIcon className="h-5 w-5" />}

            {!item.subLinks && (
              <span className="absolute -bottom-2 -left-2 -right-2 h-1 origin-left scale-x-0 rounded-full bg-primary transform transition-transform duration-300 ease-out group-hover:scale-x-100" />
            )}
          </Link>
        ) : (
          <span
            className={cn(
              "uppercase flex items-center gap-x-1 text-xs xl:text-sm font-medium transition-all duration-300 relative group",
              isSticky ? "text-secondary" : "text-white"
            )}
          >
            {item.title}
            {item.subLinks && <ChevronDownIcon className="h-5 w-5" />}
          </span>
        )}
        {item.subLinks && renderSubLinks()}
      </li>
    );
  }
);

NavItem.displayName = "NavItem";
