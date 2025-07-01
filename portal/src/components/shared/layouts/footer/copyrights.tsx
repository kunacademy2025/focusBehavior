import moment from "moment";
import Link from "next/link";
import React from "react";

const Copyrights = ({ t }: { t: any }) => {
  const currentYear = moment().year();
  const siteName = process.env.SITE_NAME_EN || "Focus Behavior";

  return (
    <div className="flex flex-col sm:flex-row gap-y-6 items-center justify-start pt-10 pb-3 text-white">
      <div className="white-space-nowrap text-sm lg:text-base ">
        © {currentYear} - {siteName}
      </div>
      <span className="mx-2 hidden sm:block">|</span>
      <div className="flex items-center justify-end">
        <div className=" order-2 sm:order-1 flex flex-col sm:flex-row items-center justify-end text-sm">
          {t("designed_developed")}&nbsp;
          {/* <Link
            href="https://egv.com.tr/"
            className="ml-1 hover:underline"
            target="_blank"
            rel="nofollow"
          >
            EGV
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default Copyrights;
