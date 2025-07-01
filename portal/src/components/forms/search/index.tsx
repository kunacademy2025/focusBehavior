"use client";
import { useTranslation } from "@/i18n/client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

const SearchInput = () => {
  const { t } = useTranslation("common");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  // Get initial search value from URL params
  const [query, setQuery] = useState(searchParams.get("search") || "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);

    if (query) {
      params.set("search", query);
    } else {
      params.delete("search");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  // Handle clearing search input
  const clearSearch = () => {
    setQuery("");
    const params = new URLSearchParams(searchParams);
    params.delete("search");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    // <div className="mb-6">
    //   <form className="sm:max-w-lg">
    //     <label
    //       htmlFor="default-search"
    //       className="mb-2 text-sm font-medium text-gray-900 sr-only"
    //     >
    //       {t("terms.search")}
    //     </label>
    //     <div className="relative w-full">
    //       <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
    //         <FiSearch className="text-primary w-5 h-5" />
    //       </div>
    //       <input
    //         id="search"
    //         name="search"
    //         type="search"
    //         value={query}
    //         onChange={(e) => setQuery(e.target.value)}
    //         className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-light focus:border-primary-light focus:outline-none min-w-64"
    //         placeholder={`${t("terms.search")}...`}
    //       />
    //       {query && (
    //         <button
    //           type="button"
    //           onClick={clearSearch}
    //           className="absolute end-[6rem] top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
    //         >
    //           <IoClose className="w-5 h-5" />
    //         </button>
    //       )}
    //       <button
    //         type="button"
    //         onClick={handleSearch}
    //         className="text-white absolute end-2.5 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary-light focus:ring-2 focus:outline-none focus:ring-primary-light font-medium rounded-lg text-sm px-4 py-2"
    //       >
    //         {t("terms.search")}
    //       </button>
    //     </div>
    //   </form>
    // </div>

    <div>
      <form className="sm:max-w-lg">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only"
        >
          {t("terms.search")}
        </label>
        <div className="relative w-full">
          <button
            type="button"
            onClick={handleSearch}
            className="absolute inset-y-0 start-0  flex items-center px-2 py-2 ltr:rounded-l-lg rtl:rounded-r-lg hover:bg-primary hover:text-white text-primary transition-all duration-300"
          >
            <FiSearch className="w-6 h-6" />
          </button>
          <input
            id="search"
            name="search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="block w-72 py-2 ps-11 text-sm text-gray-900 border border-gray-200 rounded-lg hover:ring-1 hover:ring-primary focus:outline-none bg-white focus:ring-[0.75px] focus:ring-primary focus:border-primary"
            placeholder={`${t("terms.search")}...`}
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute end-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <IoClose className="w-5 h-5" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SearchInput;
