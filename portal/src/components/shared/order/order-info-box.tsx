import React from "react";

export const OrderInfoBox = ({
  title,
  children,
}: React.PropsWithChildren<{ title: string }>) => {
  return (
    <div className="bg-white">
      <div className="bg-secondary py-3 px-2 rounded-[3px] text-white text-[12px] md:text-[14px] font-bold">
        {title}
      </div>
      <div className="p-2">{children}</div>
    </div>
  );
};
