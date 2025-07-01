import { FiLoader } from "react-icons/fi";
import { memo } from "react";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

type ButtonTypes = "button" | "submit" | "reset";
type ButtonVariant = "text" | "outline" | "flat" | "solid" | "ghost";
type ButtonColor =
  | "default"
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "danger";
type ButtonSize = "none" | "sm" | "md" | "lg";
type ButtonRadius = "none" | "sm" | "md" | "lg" | "full";

type ButtonProps = {
  children: React.ReactNode;
  type?: ButtonTypes;
  color?: ButtonColor;
  variant?: ButtonVariant;
  size?: ButtonSize;
  radius?: ButtonRadius;
  className?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  loadingIcon?: React.ReactNode;
  fullWidth?: boolean;
  isLink?: boolean;
} & ({ isLink: true; href: string } | { isLink?: false; href?: never }) &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

const baseStyles =
  "rounded-md font-medium transition-all duration-300 flex items-center justify-center";
const defaultLoadingIcon = <FiLoader className="animate-spin" />;

const variantStyles: Record<ButtonVariant, Record<ButtonColor, string>> = {
  solid: {
    default: "bg-gray-500 text-white hover:bg-gray-600",
    primary: "bg-primary text-white hover:bg-primary-dark",
    secondary: "bg-secondary text-white hover:bg-secondary-dark",
    info: "bg-blue-500 text-white hover:bg-blue-600",
    success: "bg-green-500 text-white hover:bg-green-600",
    warning: "bg-orange-500 text-white hover:bg-orange-600",
    danger: "bg-red-500 text-white hover:bg-red-600",
  },
  outline: {
    default: "bg-transparent ring-1 ring-gray-500 text-gray-500 hover:ring-2",
    primary: "bg-transparent ring-1 ring-primary text-primary hover:ring-2",
    secondary:
      "bg-transparent ring-1 ring-secondary text-secondary hover:ring-2",
    info: "bg-transparent ring-1 ring-blue-500 text-blue-500 hover:ring-2",
    success: "bg-transparent ring-1 ring-green-500 text-green-500 hover:ring-2",
    warning:
      "bg-transparent ring-1 ring-orange-500 text-orange-500 hover:ring-2",
    danger: "bg-transparent ring-1 ring-red-500 text-red-500 hover:ring-2",
  },
  flat: {
    default: "bg-gray-500/25 text-gray-500 hover:bg-gray-500/25",
    primary: "bg-primary/25 text-primary hover:bg-primary/25",
    secondary: "bg-secondary/25 text-secondary hover:bg-secondary/25",
    info: "bg-blue-500/25 text-blue-500 hover:bg-blue-500/25",
    success: "bg-green-500/25 text-green-500 hover:bg-green-500/25",
    warning: "bg-orange-500/25 text-orange-500 hover:bg-orange-500/25",
    danger: "bg-red-500/25 text-red-500 hover:bg-red-500/25",
  },
  ghost: {
    default:
      "bg-transparent ring-2 ring-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white",
    primary:
      "bg-transparent ring-2 ring-primary text-primary hover:bg-primary hover:text-white",
    secondary:
      "bg-transparent ring-2 ring-secondary text-secondary hover:bg-secondary hover:text-white",
    info: "bg-transparent ring-2 ring-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white",
    success:
      "bg-transparent ring-2 ring-green-500 text-green-500 hover:bg-green-500 hover:text-white",
    warning:
      "bg-transparent ring-2 ring-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white",
    danger:
      "bg-transparent ring-2 ring-red-500 text-red-500 hover:bg-red-500 hover:text-white",
  },
  text: {
    default: "hover:text-gray-500",
    primary: "hover:text-primary",
    secondary: "hover:text-secondary",
    info: "hover:text-blue-500",
    success: "hover:text-green-500",
    warning: "hover:text-orange-500",
    danger: "hover:text-red-500",
  },
};

const sizeStyles: Record<ButtonSize, string> = {
  none: "",
  sm: "px-3 py-1.5 text-sm leading-4",
  md: "px-4 py-2 text-base leading-5",
  lg: "px-6 py-3 text-lg leading-6",
};

const radiusStyles: Record<ButtonRadius, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

export const Button = memo(function Button({
  children,
  color = "primary",
  variant = "text",
  size = "none",
  radius = "md",
  className = "",
  type = "button",
  leftIcon,
  rightIcon,
  isLoading = false,
  loadingIcon = defaultLoadingIcon,
  fullWidth = false,
  disabled,
  isLink,
  href,
  ...props
}: ButtonProps) {
  let variantColorStyles = variantStyles[variant][color];

  if (variant === "text" && className) {
    variantColorStyles = className;
  }

  const mergedClassName = twMerge(
    baseStyles,
    variantColorStyles,
    sizeStyles[size],
    radiusStyles[radius],
    fullWidth && "w-full",
    isLoading && "cursor-not-allowed opacity-70",
    className
  );

  const leftContent = (isLoading ? loadingIcon : leftIcon) ? (
    <span className="mr-2">{isLoading ? loadingIcon : leftIcon}</span>
  ) : null;

  const rightContent = rightIcon ? (
    <span className="ml-2">{rightIcon}</span>
  ) : null;

  if (isLink && href) {
    return (
      <Link href={href} className={mergedClassName}>
        {leftContent}
        {children}
        {rightContent}
      </Link>
    );
  }

  return (
    <button
      className={mergedClassName}
      disabled={disabled ?? isLoading}
      type={type}
      {...props}
    >
      {leftContent}
      {children}
      {rightContent}
    </button>
  );
});
