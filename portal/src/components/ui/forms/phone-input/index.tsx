"use client";

import React from "react";
import PhoneNumberInput from "react-phone-number-input/react-hook-form";
import { getCountries } from "react-phone-number-input/input";
import { Label } from "../label";
import { ErrorText } from "../error-text";
import { cn } from "@/utils/cn";
import "react-phone-number-input/style.css";
import "./phone.style.scss";

type PhoneInputProps = {
  control?: any;
  id: string;
  label?: string;
  name?: string;
  placeholder?: string;
  className?: string;
  defaultCountry: any;
  error: any;
  rule?: any;
  value?: any;
  onChange?: any;
  defaultValue?: any;
  required?: boolean;
};

export const PhoneInput: React.FC<PhoneInputProps> = ({
  id,
  control,
  label,
  placeholder,
  defaultCountry,
  className,
  error,
  rule,
  required = false,
}) => {
  const countries = getCountries().filter(
    (countryCode) => countryCode !== "IL"
  );

  return (
    <div className="w-full flex flex-col ">
      {label && <Label required={required}>{label}</Label>}
      <PhoneNumberInput
        control={control}
        id={id}
        name={id}
        international
        countries={countries}
        defaultCountry={defaultCountry}
        className={cn("custom-phone-input", className)}
        placeholder={placeholder}
        rules={rule}
      />
      {error && <ErrorText message={error || ""} />}
    </div>
  );
};
