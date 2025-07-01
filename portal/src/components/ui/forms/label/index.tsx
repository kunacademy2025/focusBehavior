import React from "react";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  required?: boolean;
}

export const Label = ({
  children,
  required,
  className = "",
  ...props
}: LabelProps) => {
  return (
    <label
      className={`mb-2 capitalize text-sm font-semibold text-stone-800 ${className}`}
      {...props}
    >
      {children}
      {required && (
        <span className="text-red-500 text-sm ltr:ml-1 rtl:mr-1">*</span>
      )}
    </label>
  );
};
