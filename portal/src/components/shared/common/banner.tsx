"use client";
import Link from "next/link";
import React from "react";

export const Banner = ({ isVisible, banner }: any) => {
  if (!isVisible || !banner) return null;

  const { title, link_title, link } = banner;

  return (
    <div className="flex justify-between w-full h-12 bg-primary">
      <div className="flex items-center mx-auto">
        <div className="flex flex-col md:flex-row md:flex-wrap items-center text-sm font-normal text-white">
          <span>{title}</span>
          <Link
            href={link || "#"}
            className="ltr:ml-2 rtl:mr-2 inline font-semibold underline underline-offset-2 decoration-600 decoration-solid hover:no-underline"
          >
            {link_title}
          </Link>
        </div>
      </div>
    </div>
  );
};
