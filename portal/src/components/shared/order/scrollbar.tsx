import React from "react";

export const Scrollbar: React.FC<{
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}> = ({ className = "", children, style, ...props }) => {
  return (
    <div
      className={`overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent hover:scrollbar-thumb-gray-500 ${className}`}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
};
