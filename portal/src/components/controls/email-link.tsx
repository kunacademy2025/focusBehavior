"use client";

import parse from "html-react-parser";
import { formatEmail } from "@/utils/";

export const EmailLink: React.FC<{
  email: string;
  children?: any;
  className?: string;
}> = ({ email, children, className }) => {
  const handleClick = (e: any) => {
    e.preventDefault();
    window.location.href = `mailto:${email}`;
  };
  const classNames = `${className} cursor-pointer`;
  return (
    <div dir="ltr" className={classNames} onClick={handleClick}>
      {children ||
        (formatEmail(email) ? parse(formatEmail(email) as string) : null)}
    </div>
  );
};
