"use client";
import "./input.style.css";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import React Icons for show/hide password
import { Label } from "../label";
import { ErrorText } from "../error-text";
import { IoClose } from "react-icons/io5";
import { cn } from "@/utils/cn";

type InputProps = {
  label?: string;
  placeholder?: string;
  className?: string;
  wrapperClassName?: string;
  error?: string;
  type?: string;
  required?: boolean;
  onClear?: () => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function Input({
  label,
  required,
  placeholder,
  className = "",
  wrapperClassName = "",
  error = "",
  type = "text",
  leftIcon,
  rightIcon,
  onClear,
  value,
  ...props
}: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handlePasswordToggle = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className={`flex flex-col ${wrapperClassName}`}>
      {label && <Label required={required}>{label}</Label>}

      <div className="relative flex items-center">
        {leftIcon && <span className="absolute left-3">{leftIcon}</span>}

        <input
          type={
            type === "password"
              ? !isPasswordVisible
                ? "password"
                : "text"
              : type
          }
          value={value}
          placeholder={placeholder}
          className={cn(
            `h-10 bg-white py-2 px-4 ring-1 ring-gray-300 rounded-md focus:outline-none focus:ring-1 w-full text-sm/6 transition duration-200 ease-in-out`,
            leftIcon ? "pl-10" : "",
            rightIcon ? "pr-10" : "",
            error ? " ring-red-600 " : "focus:ring-primary",
            className
          )}
          {...props}
        />

        {/* Add the password toggle icon if the input type is password */}
        {type === "password" && (
          <span
            className="absolute right-3 cursor-pointer"
            onClick={handlePasswordToggle}
          >
            {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
          </span>
        )}
        {onClear && value && (
          <button
            onClick={onClear}
            className="absolute right-3 rounded-full text-primary bg-gray-200 p-1"
          >
            <IoClose className="size-3" />
          </button>
        )}

        {rightIcon && <span className="absolute right-3">{rightIcon}</span>}
      </div>

      {error && <ErrorText message={error} />}
    </div>
  );
}
