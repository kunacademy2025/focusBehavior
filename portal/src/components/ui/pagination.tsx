import Link from "next/link";
import { cn } from "@/utils";
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsRight,
  FiChevronsLeft,
} from "react-icons/fi";
import { PiDotsThreeBold } from "react-icons/pi";
import { buildQueryString } from "@/services/api-services/helpers";
import { JSX } from "react";

export default function Pagination({
  pageCount,
  pageIndex,
  routeName,
  extraData,
  className,
  showNextPrev = true,
}: any) {
  const route = routeName.toString().startsWith("/")
    ? routeName
    : `/${routeName}`;

  const buildPageLink = (page: number) =>
    `${route}${buildQueryString({ ...extraData, page })}`;

  const previewsStep =
    Number(pageIndex) > 1 ? `${route}?page=${Number(pageIndex) - 1}` : "#";
  const nextStep =
    Number(pageIndex) < Number(pageCount)
      ? `${route}?page=${Number(pageIndex) + 1}`
      : "#";

  const renderPageNumbers = () => {
    const pages: JSX.Element[] = [];

    const addPage = (page: number, isActive: boolean = false) => {
      pages.push(
        <Link href={buildPageLink(page)} key={page}>
          <button
            className={cn(
              "aspect-square w-10 rounded-xl transition",
              isActive
                ? "bg-primary text-white"
                : "bg-[#f4f4f5] hover:bg-[#e4e4e7]"
            )}
          >
            {page}
          </button>
        </Link>
      );
    };

    const addDots = (key: string, targetPage: number) => {
      pages.push(
        <button
          key={key}
          className="flex items-center justify-center group aspect-square w-10 rounded-xl transition bg-[#f4f4f5] hover:bg-[#e4e4e7]"
        >
          <Link href={buildPageLink(targetPage)} key={key}>
            <PiDotsThreeBold className="w-4 h-4 group-hover:hidden" />
            {key === "start-dots" ? (
              <FiChevronsLeft className="w-4 h-4 hidden group-hover:block rtl:rotate-180" />
            ) : (
              <FiChevronsRight className="w-4 h-4 hidden group-hover:block rtl:rotate-180" />
            )}
          </Link>
        </button>
      );
    };

    if (pageCount <= 1) return pages;

    // Always show the first page
    addPage(1, pageIndex === 1);

    if (pageIndex > 4) {
      const page = Math.floor(pageIndex < 5 ? 1 : pageIndex - 5);
      addDots("start-dots", page);
    }

    const getPageRange = (pageIndex: number, pageCount: number) => {
      let startPage = Math.max(2, pageIndex - 1);
      let endPage = Math.min(pageCount - 1, pageIndex + 1);

      if (pageIndex < 5) {
        endPage = Math.min(pageCount, 5);
      } else if (pageCount - pageIndex <= 3) {
        startPage = Math.max(2, pageIndex - (4 - (pageCount - pageIndex)));
        endPage = Math.min(
          pageCount - 1,
          pageIndex + (5 - (pageCount - pageIndex))
        );
      }

      return { startPage, endPage };
    };

    const { startPage, endPage } = getPageRange(pageIndex, pageCount);

    for (let i = startPage; i <= endPage; i++) {
      addPage(i, i === pageIndex);
    }

    if (pageIndex < pageCount - 3) {
      const page = Math.floor(
        pageCount - pageIndex < 5 ? pageCount : pageIndex + 5
      );
      addDots("end-dots", page);
    }

    // show the last page if pageCount > 5
    pageCount > 5 && addPage(pageCount, pageIndex === pageCount);

    return pages;
  };

  return (
    <>
      {Number(pageCount) > 1 && (
        <div className={cn("justify-center flex relative z-10", className)}>
          <div className="flex justify-center items-center gap-x-2 py-4">
            {/* Previous Button */}
            {showNextPrev && (
              <button
                className={`flex items-center justify-center aspect-square w-10 rounded-xl transition rtl:rotate-180 ${pageIndex === 1
                    ? "cursor-not-allowed opacity-50"
                    : "bg-[#f4f4f5] hover:bg-[#e4e4e7]"
                  }`}
                disabled={pageIndex === 1}
              >
                <Link href={previewsStep}>
                  <FiChevronLeft className="w-5 h-5" />
                </Link>
              </button>
            )}

            {/* Page Numbers */}
            {renderPageNumbers()}

            {/* Next Button */}
            {showNextPrev && (
              <button
                className={`flex items-center justify-center aspect-square w-10 rounded-xl transition rtl:rotate-180 ${pageIndex === pageCount
                    ? "cursor-not-allowed opacity-50"
                    : "bg-[#f4f4f5] hover:bg-[#e4e4e7]"
                  }`}
                disabled={pageIndex === pageCount}
              >
                <Link href={nextStep}>
                  <FiChevronRight className="w-5 h-5" />
                </Link>
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
