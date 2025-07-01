"use server";
import { getUserInfo } from "@/auth";
import { AccountDetailsForm } from "@/components/forms/account/info";
import { UserApis } from "@/services/api/collections/user";

type Params = Promise<{ lang: string }>;

const Page = async ({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: Record<string, any>;
}) => {
  const { lang } = await params;

  const user = await getUserInfo();

  const { data: userData } = await UserApis.getById(user.user.id, {
    queryParams: {
      populate: "deep",
    },
  });

  return (
    <div className="overflow-hidden">
      <AccountDetailsForm lang={lang} userData={userData} />
    </div>
  );
};

export default Page;
