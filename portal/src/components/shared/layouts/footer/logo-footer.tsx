import Link from "next/link";
import logo from "@/assets/logo/logo.png";
import { CustomImage } from "@/components/controls";
import { cn } from "@/utils";

export const LogoFooter: React.FC = () => {
  return (
    <div className={cn("flex items-center justify-center")}>
      <Link href="/">
        <CustomImage
          src={logo}
          alt="logo"
          width={261}
          height={53}
          className={cn("w-auto h-12 lg:h-16")}
        />
      </Link>
    </div>
  );
};
