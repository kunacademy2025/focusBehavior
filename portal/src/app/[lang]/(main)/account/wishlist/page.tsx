"use server";

import { MyWishlist } from "@/components/shared/my-accounts";

type Params = Promise<{ lang: string }>;

const Page = async ({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: Record<string, any>;
}) => {
  const { lang } = await params;
  const { page: selectedPage } = searchParams || {};

  return (
    <div className="overflow-hidden min-h-screen w-full h-full">
      <MyWishlist selectedPage={Number(selectedPage) || 1} lang={lang} />
    </div>
  );
};

export default Page;
