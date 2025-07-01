import Link from "next/link";
import { RenderIcon } from ".";
import { PiArrowRightBold } from "react-icons/pi";
import { cn } from "@/utils";

export const SingleMenuItem = ({ subItem }: any) => (
  <div
    className={cn(
      "group flex relative items-center gap-x-3 p-2 text-sm font-medium transition-all duration-300 rounded-lg leading-6",
      "text-mediumGray hover:text-primary hover:bg-veryLightGray"
    )}
  >
    {subItem.icon && <RenderIcon icon={subItem.icon} className={"w-10 h-8"} />}
    <Link href={subItem.url} className="flex-auto block">
      {subItem.title}
    </Link>
    <PiArrowRightBold className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all duration-300 rtl:scale-x-[-1]" />
  </div>
);
