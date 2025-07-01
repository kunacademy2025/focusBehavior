import { isAuthorized } from "@/auth";
import { AccountWrapper } from "@/components/shared/my-accounts";
import { getAccountNav } from "@/interfaces";
import { redirect } from "next/navigation";

type Params = Promise<{ lang: string }>;

export default async function AccountLayout({
  params,
  children,
}: {
  params: Params;
  children: React.ReactNode;
}) {
  const { lang } = await params;

  const session = await isAuthorized();
  const navigation = await getAccountNav(lang);

  if (!session) {
    return redirect("/");
    // return notFound();
  }

  return (
    <section className="relative min-h-screen w-full h-full">
      <div className="relative w-full h-[20vh] py-10">
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-neutral-950/90 to-neutral-950/0 from-[15%]" />
      </div>
      <AccountWrapper navigation={navigation}>{children}</AccountWrapper>
    </section>
  );
}
