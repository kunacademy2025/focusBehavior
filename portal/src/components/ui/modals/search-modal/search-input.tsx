import { useTranslation } from "@/i18n/client";
import React, { forwardRef, InputHTMLAttributes } from "react";
import { RiSearchLine } from "react-icons/ri";
import { MdOutlineClear } from "react-icons/md";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  searchTerm: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleSearch: () => void;
  onSearch: (e: string) => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ searchTerm, onSearch, onInputChange, onToggleSearch, ...props }, ref) => {
    const { t } = useTranslation("common");

    return (
      <form className="overflow-hidden w-full border-b border-gray-100">
        <div className="relative flex items-center ltr:pl-4 rtl:pr-4">
          <button
            type="button"
            onClick={() => onSearch(searchTerm)}
            className="border border-gray-100 hover:bg-white text-white hover:text-black transition-all p-2 rounded-full"
          >
            <RiSearchLine className="w-6 h-6" />
          </button>
          <input
            className="block w-full appearance-none bg-transparent font-medium py-4 ltr:pl-4 rtl:pr-4 lrt:pr-12 rtl:pl-12 text-base placeholder:text-white sm:text-sm sm:leading-6 focus:outline-none focus:ring-0 focus:border-transparent border-none ring-0 m-2 text-white"
            placeholder={
              t("search.type_and_press_enter") ||
              "Type and press Enter to search..."
            }
            aria-label="Search components"
            role="combobox"
            aria-controls="search-results"
            type="text"
            aria-owns="search-results"
            aria-expanded="true"
            aria-autocomplete="list"
            data-headlessui-state="open"
            tabIndex={0}
            value={searchTerm}
            onChange={onInputChange}
            autoFocus={true}
            ref={ref}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                onSearch(searchTerm);
              }
            }}
            {...props}
          />
          <button
            title="close"
            type="reset"
            className="absolute w-8 h-8 ltr:right-2.5 rtl:left-2.5 transform top-1/2 -translate-y-1/2 transition duration-300  opacity-90 font-semibold rounded-lg text-xs p-1"
            onClick={onToggleSearch}
          >
            <MdOutlineClear className="text-white w-6 h-6" />
          </button>
        </div>
      </form>
    );
  }
);

SearchInput.displayName = "SearchInput";
