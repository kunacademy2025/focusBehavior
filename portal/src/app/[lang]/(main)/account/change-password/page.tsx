"use server";

import { ChangePasswordForm } from "@/components/forms/account/change-password";

type Params = Promise<{ lang: string }>;

const Page = async ({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: Record<string, any>;
}) => {
  const { lang } = await params;

  return (
    <div className="overflow-hidden">
      <ChangePasswordForm lang={lang} />
    </div>
  );
};

export default Page;
