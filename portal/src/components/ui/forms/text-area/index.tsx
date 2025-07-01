"use client";
import { Label } from "../label";
import { ErrorText } from "../error-text";
import { cn } from "@/utils/cn";

type TextAreaProps = {
  label?: string;
  placeholder?: string;
  className?: string;
  wrapperClassName?: string;
  error?: string;
  required?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextArea({
  label,
  required,
  placeholder,
  className = "",
  wrapperClassName = "",
  error = "",
  leftIcon,
  rightIcon,
  value,
  ...props
}: TextAreaProps) {
  return (
    <div className={`flex flex-col ${wrapperClassName}`}>
      {label && <Label required={required}>{label}</Label>}

      <div className="relative flex items-center">
        {leftIcon && <span className="absolute left-3">{leftIcon}</span>}

        <textarea
          value={value}
          rows={4}
          placeholder={placeholder}
          className={cn(
            `bg-white py-2 px-4 ring-1 ring-gray-300 rounded-md focus:outline-none focus:ring-1 w-full text-sm/6 transition duration-200 ease-in-out`,
            leftIcon ? "pl-10" : "",
            rightIcon ? "pr-10" : "",
            error ? "ring-red-600" : "focus:ring-primary",
            className
          )}
          {...props}
        />

        {rightIcon && <span className="absolute right-3">{rightIcon}</span>}
      </div>

      {error && <ErrorText message={error} />}
    </div>
  );
}
