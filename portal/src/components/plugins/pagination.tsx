"use client";

import cn from "classnames";

export const Pagination: React.FC<{
  meta: any;
  pageLimit?: number;
  addFirst?: boolean;
  addLast?: boolean;
  addPrev?: boolean;
  addNext?: boolean;
  handleChange: (page: number) => void;
}> = ({
  meta,
  handleChange,
  pageLimit = 5,
  addFirst = true,
  addLast = true,
  addNext = true,
  addPrev = true,
}) => {
  const { page, pageCount } = meta || {};

  if (pageCount <= 1) return <></>;

  let pages: Array<{ page: number; isIcon: boolean; icon: any }> = [];

  if (addFirst)
    pages = [
      ...pages,
      {
        page: 1,
        isIcon: true,
        icon: "First",
      },
    ];

  if (addPrev)
    pages = [
      ...pages,
      {
        page: Math.max(page - 1, 1),
        isIcon: true,
        icon: "Previous",
      },
    ];

  let startIndex = 1;
  let endIndex = pageCount;

  if (pageCount > pageLimit) {
    const median = Math.floor(pageLimit / 2);
    startIndex = Math.max(1, page - median);
    endIndex = Math.min(pageCount, page + median);
    if (endIndex - startIndex < pageLimit)
      endIndex = startIndex + pageLimit - 1;
  }

  let i: number = startIndex;
  for (i; i <= endIndex; i++) {
    pages = [...pages, { page: i, isIcon: false, icon: <></> }];
  }

  if (addNext)
    pages = [
      ...pages,
      {
        page: Math.min(page + 1, pageCount),
        isIcon: true,
        icon: "Next",
      },
    ];

  if (addLast)
    pages = [
      ...pages,
      {
        page: pageCount,
        isIcon: true,
        icon: "Last",
      },
    ];

  return (
    <div className="mt-8 flex items-center justify-center bg-white px-6 py-3 sm:px-6">
      <div className="flex flex-1 sm:items-center sm:justify-center">
        <div>
          <nav className="isolate inline-flex space-x-4">
            {pages.map((item: any, index: number) => (
              <button
                key={index}
                onClick={() => handleChange(item.page)}
                {...(item.page === page ? { "aria-current": "page" } : {})}
                className={cn(
                  "relative z-10 inline-flex items-center justify-center rounded-xl font-medium p-1 min-w-12 h-12 text-sm font-semibold focus:z-20",
                  {
                    "text-gray-900 ring-1 ring-inset ring-gray-200 hover:bg-gray-50 focus:outline-offset-0":
                      item.isIcon || item.page !== page,
                    "z-10 bg-dark_blue text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600":
                      !item.isIcon && item.page === page,
                  }
                )}
              >
                {item.isIcon ? item.icon : item.page}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};
