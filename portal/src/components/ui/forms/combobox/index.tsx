import {
  Combobox as HeadlessCombobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Description,
  Field,
} from "@headlessui/react";
import clsx from "clsx";
import { ReactNode, useCallback, useState } from "react";
import { FaCheck, FaChevronDown } from "react-icons/fa6";
import { Label } from "../label";
import React from "react";
import { ErrorText } from "../error-text";
import { IoClose } from "react-icons/io5";
import { cn } from "@/utils/cn";

type Option = { value: string | number; label: string };

type ComboboxProps = {
  label?: string;
  options: Option[];
  description?: string;
  placeholder?: string;
  className?: string;
  error?: string;
  required?: boolean;
  value?: string | number;
  onChange?: (value: string | number) => void;
  onClear?: () => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  getOptionDisplayValue?: (option: Option) => ReactNode;
};

export const Combobox = ({
  label,
  description,
  options,
  required,
  placeholder,
  className = "",
  error = "",
  value,
  onChange,
  leftIcon,
  onClear,
  getOptionDisplayValue,
  ...props
}: ComboboxProps) => {
  const [query, setQuery] = useState("");

  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) => {
          return option.label.toLowerCase().includes(query.toLowerCase());
        });

  const displayValue = useCallback(
    (selected: string | number) => {
      const option = options.find((o) => o.value === selected);
      return option ? option.label : "";
    },
    [options]
  );

  const renderOptionDisplay = useCallback(
    (option: Option) => {
      return getOptionDisplayValue ? (
        getOptionDisplayValue(option)
      ) : (
        <>
          <FaCheck className="invisible size-4 fill-primary group-data-[selected]:visible group-hover:text-white" />
          <div className="text-sm/6 text-black group-data-[selected]:text-primary group-hover:text-white">
            {option.label}
          </div>
        </>
      );
    },
    [getOptionDisplayValue]
  );

  return (
    <div className="w-full">
      {label && <Label required={required}>{label}</Label>}
      {description && (
        <Description className="mb-1 text-sm/6 text-gray-500">
          {description}
        </Description>
      )}
      <div className="mt-[4px]">
        <HeadlessCombobox
          value={value}
          onChange={onChange}
          onClose={() => setQuery("")}
          {...props}
        >
          <div className="relative">
            {leftIcon && (
              <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
                {leftIcon}
              </span>
            )}
            <ComboboxInput
              className={clsx(
                "w-full rounded-md border-none bg-white h-10 ltr:pr-8 ltr:pl-4 rtl:pl-8 rtl:pr-4 text-sm/6",
                "focus:outline-none",
                "ring-1 ring-gray-300",
                "",
                "focus:outline-none data-[focus]:ring-1",
                error
                  ? " ring-red-600 "
                  : "data-[focus]:ring-primary data-[hover]:ring-primary",
                leftIcon ? "ps-10" : "",
                className
              )}
              placeholder={placeholder}
              displayValue={(selected: string) => displayValue(selected)}
              onChange={(event) => setQuery(event.target.value)}
            />
            {onClear && value && (
              <button
                onClick={onClear}
                className="absolute ltr:right-3 rtl:left-3 rounded-full text-primary bg-gray-200 p-1"
              >
                <IoClose className="size-3" />
              </button>
            )}
            <ComboboxButton className="group my-2 ltr:border-l rtl:border-r border-gray-300 absolute inset-y-0 lrt:right-0 rtl:left-0 px-2.5">
              <FaChevronDown className="size-4 fill-gray-300 group-data-[hover]:fill-gray-400 group-data-[focus]:fill-gray-500" />
            </ComboboxButton>
          </div>

          <ComboboxOptions
            anchor="bottom start"
            transition
            className={cn(
              "z-50 mt-2 w-[var(--input-width)] rounded-md ring-1 ring-gray-200 bg-white p-1 [--anchor-gap:var(--spacing-1)] empty:invisible shadow-md",
              "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0 overflow-auto",
              filteredOptions.length > 5 && "h-[224px]"
            )}
          >
            {filteredOptions.map((option, index) => {
              return (
                <React.Fragment key={`${option.value}-${index}`}>
                  <ComboboxOption
                    value={option.value}
                    className={cn(
                      "group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none",
                      "bg-white data-[selected]:bg-primary/10 hover:bg-primary"
                    )}
                  >
                    {renderOptionDisplay(option)}
                  </ComboboxOption>
                  {index !== filteredOptions.length - 1 && (
                    <div
                      className="my-1 h-px bg-gray-200 mx-3"
                      role="separator"
                    />
                  )}
                </React.Fragment>
              );
            })}
          </ComboboxOptions>
        </HeadlessCombobox>
      </div>
      {error && <ErrorText message={error} />}
    </div>
  );
};
