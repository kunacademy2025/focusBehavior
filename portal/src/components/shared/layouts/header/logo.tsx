import { cn } from "@/utils";
import Link from "next/link";
import logo from "@/assets/logo/logo.png";
import { CustomImage } from "@/components/controls";

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <Link href="/">
      <CustomImage
        src={logo}
        alt="logo"
        width={1000}
        height={261}
        priority={true}
        className={cn("object-contain w-auto h-10 xl:h-12", className)}
      />
    </Link>
  );
};
