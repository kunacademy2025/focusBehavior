"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const Searchbar = () => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const { replace } = useRouter();

  const search = params.get("search") as string;

  const [inputValue, setInputValue] = React.useState<string>(search);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue) params.set("search", inputValue);
    else params.delete("search");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <form onSubmit={onSubmit} className="relative">
      <button
        type="submit"
        className="absolute ltr:right-3 rtl:left-3 top-[50%] transform -translate-y-1/2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM8 14a6 6 0 100-12 6 6 0 000 12z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <input
        name="search"
        value={inputValue || ""}
        onChange={handleSearchChange}
        placeholder="Search your orders..."
        className="h-[46px] w-full bg-white border border-[#E3E8EC] rounded-md focus:border-2 focus:outline-none focus:border-primary ltr:pl-2 rtl:pr-2"
      />
    </form>
  );
};

export default Searchbar;
