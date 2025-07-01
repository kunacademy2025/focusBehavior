import { cn } from "@/utils";
import React from "react";

interface Props {
  title: string;
  subtitle?: string;
  subtitleAbove?: boolean;
  className?: string;
}

export const SectionTitle: React.FC<Props> = ({
  title,
  subtitle,
  subtitleAbove = true,
  className,
}) => {
  return (
    <div className="container">
      <h2
        className={cn(
          "title lg:pl-12 py-10",
          !subtitle
            ? "text-primary"
            : subtitleAbove
            ? "text-secondary"
            : "text-primary",
          className
        )}
      >
        {subtitle && subtitleAbove && (
          <span className="text-primary block mb-1">{subtitle}</span>
        )}
        {title}
        {subtitle && !subtitleAbove && (
          <span className="text-secondary block mt-1">{subtitle}</span>
        )}
      </h2>
    </div>
  );
};
