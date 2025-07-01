import Link from "next/link";
import { getFooterNav } from "@/interfaces";
import { LogoFooter } from ".";
import { cn, getStrapiData } from "@/utils";
import Copyrights from "./copyrights";
import { social_links } from "@/assets/data/social.data";
import { getTranslation } from "@/i18n";
import { SocialLinks } from "../social-links";

export const Menu = async ({
  lang,
  footer_slogan,
  footer_intro,
}: {
  lang: string;
  footer_slogan: string;
  footer_intro: string;
}) => {
  const navigation = await getFooterNav(lang);
  const { t } = await getTranslation("footer", lang);

  return (
    <div className="container bg- w-full h-full">
      <div className="flex flex-col lg:flex-row items-start lg:justify-between gap-x-24 gap-y-8 text-white pt-10 pb-10">
        <div className="flex flex-col gap-y-4 lg:w-4/12 items-start h-full">
          <LogoFooter />
          <h3 className="text-lg lg:text-2xl uppercase font-black">
            {footer_slogan}
          </h3>
          <div className="text-sm lg:text-base">{footer_intro}</div>
        </div>
        <div className="lg:w-5/12 h-full">
          <h3 className="w-fit font-medium text-lg text-primary-lighter pb-2">
            {t("quick_links")}
          </h3>
          <ul className="mt-4 gap-y-3 grid grid-cols-2 w-full">
            {navigation.map((item, index: number) => (
              <li key={index} className="">
                <Link href={item.url ?? "#"}>
                  <p className="font-medium whitespace-nowrap lg:whitespace-normal text-base text-white hover:text-primary transition duration-300">
                    {item.title}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:w-3/12 h-full flex flex-col items-start justify-start ">
          <span className="text-white text-lg lg:text-base mb-6">
            {t("follow_us")}:
          </span>
          <SocialLinks
            className={"text-white hover:text-primary gap-x-4"}
            size="fa-xl"
          />
        </div>
      </div>

      <Copyrights t={t} />
    </div>
  );
};
