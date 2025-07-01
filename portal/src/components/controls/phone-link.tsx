"use client";

import React from "react";

interface PhoneLinkProps {
  phone_number?: string;
  children?: React.ReactNode;
  className?: string;
}

export const PhoneLink: React.FC<PhoneLinkProps> = ({
  phone_number,
  children,
  className = "underline",
}) => {
  const handleClick = (e: React.MouseEvent<any>) => {
    if (!phone_number) {
      e.preventDefault();
      console.warn("Phone number is not provided");
      return;
    }

    // Proceed to open the dialer
    window.location.href = `tel:${phone_number}`;
  };
  const classNames = `${className} cursor-pointer no-underline text-black`;
  return (
    <div
      dir="ltr"
      onClick={handleClick}
      aria-label={`Call ${phone_number || "unknown number"}`}
      className={classNames}
      rel="nofollow"
    >
      {children || phone_number || "N/A"}
    </div>
  );
};
