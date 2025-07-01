"use server";

import { isAuthorized } from "@/auth";
import { CheckoutForm } from "@/components/forms/checkout-forms";
import { LoginForm } from "@/components/shared/auth";
import { BackButton } from "@/components/shared/checkout/back-button";
import { getTranslation } from "@/i18n";
import { CurrenciesApis } from "@/services/api/collections/currencies";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return { title: "Checkouts" };
}

type Params = Promise<{ lang: string }>;

const Page = async ({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: Promise<Record<string, any>>;
}) => {
  const { lang } = await params;
  const { t } = await getTranslation("common");

  const { data: currenciesData } = await CurrenciesApis.getAll({
    queryParams: {
      populate: "deep",
    },
  });

  const user = await isAuthorized();

  let loggedIn: boolean = user ?? false;

  return (
    <>
      <div className="overflow-hidden bg-white">
        <div className="relative w-full h-[25vh] py-10">
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-neutral-950/90 to-neutral-950/0 from-[15%]" /> 
        </div>
        <BackButton />
        <div className="mx-auto lg:max-w-screen-2xl px-6 sm:px-8 lg:px-10">
          {loggedIn && <CheckoutForm lang={lang} currencies={currenciesData} />}
          {!loggedIn && (
            <div className="w-full lg:w-1/2 mx-auto py-10 lg:py-20 px-6 lg:px-10">
              <h2 className="text-3xl text-primary mb-10">
                {t("messages.please_login")}
              </h2>
              <LoginForm lang={lang} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
